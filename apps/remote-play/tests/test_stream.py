# SPDX-License-Identifier: AGPL-3.0-or-later
"""The stream connection: the protobuf messages and the launch spec against vectors from chiaki-ng's own code
(launchspec.c, rpcrypt.c, and the messages encoded with nanopb as streamconnection.c builds them, at commit
c8bea2642d0e: tests/stream_vectors.json), then the whole connection against a fake console on localhost
(fake_stream.py). The connection tests need the native core and are skipped without it."""

from __future__ import annotations

import json
import sys
from pathlib import Path

import pytest

from bc250_remote_play import launchspec, stream, tkproto
from bc250_remote_play.rpcrypt import RPCrypt
from bc250_remote_play.target import Target

VECTORS = json.loads((Path(__file__).parent / "stream_vectors.json").read_text(encoding="utf-8"))
MESSAGES = VECTORS["messages"]
h = bytes.fromhex
NONCE = bytes(range(100, 116))
RP_KEY = bytes(range(0x40, 0x50))
SESSION_ID = "Ab1" * 10


# --- Messages and launch spec -----------------------------------------------------------------------------------

@pytest.mark.parametrize("name, built", [
    ("heartbeat", tkproto.heartbeat()),
    ("streaminfo_ack", tkproto.streaminfo_ack()),
    ("idr_request", tkproto.idr_request()),
    ("disconnect", tkproto.disconnect()),
    ("corrupt_frame", tkproto.corrupt_frame(300, 65535)),
    ("controller_dualshock4", tkproto.controller_connection(False)),
    ("controller_dualsense", tkproto.controller_connection(True)),
    ("microphone", tkproto.microphone(tkproto.MICROPHONE.save())),
])
def test_messages_match_chiaki(name, built):
    assert built == h(MESSAGES[name])


def test_console_messages_decode():
    bang = tkproto.bang(tkproto.parse(h(MESSAGES["bang"])))
    assert (bang.server_version, bang.token, bang.session_key) == (12, 0xdeadbeef, "consolesessionkey")
    assert bang.version_accepted and bang.encrypted_key_accepted
    assert (bang.ecdh_public_key, bang.ecdh_signature) == (h(MESSAGES["bang_pub"]), h(MESSAGES["bang_sig"]))
    refused = tkproto.bang(tkproto.parse(h(MESSAGES["bang_refused"])))
    assert not refused.version_accepted and refused.ecdh_public_key == b""

    info = tkproto.streaminfo(tkproto.parse(h(MESSAGES["streaminfo"])))
    assert [(r.width, r.height, r.video_header) for r in info.resolutions] == [
        (1920, 1080, h(MESSAGES["streaminfo_header_0"])), (1280, 720, h(MESSAGES["streaminfo_header_1"]))]
    assert info.audio_header == h(MESSAGES["streaminfo_audio_header"])
    assert (info.start_timeout, info.afk_timeout, info.afk_timeout_disconnect, info.congestion_control_interval) \
        == (100, 300000, None, 200)
    assert tkproto.AudioHeader.load(info.audio_header) == tkproto.AudioHeader(2, 16, 48000, 480)

    reason = tkproto.disconnect_reason(tkproto.parse(h(MESSAGES["disconnect_server"])))
    assert reason == "Server shutting down"
    assert tkproto.corrupt_range(tkproto.parse(h(MESSAGES["corrupt_frame"]))) == (300, 65535)
    assert tkproto.bang(tkproto.parse(h(MESSAGES["heartbeat"]))) is None


def test_bad_protobuf_is_refused():
    for data in (b"\x08", b"\x08\x03\x12\x05ab", b"\x0b", b"\x00\x01", b"\x12\x00"):   # cut, cut, group, 0, no type
        with pytest.raises(tkproto.ProtoError):
            tkproto.parse(data)
    with pytest.raises(tkproto.ProtoError):
        tkproto.AudioHeader.load(bytes(13))
    # Unknown fields, fixed-size ones included, are skipped.
    message = tkproto.parse(tkproto.uint(1, 3) + b"\x29" + bytes(8) + b"\x35" + bytes(4) + tkproto.uint(99, 7))
    assert message.type == tkproto.HEARTBEAT


@pytest.mark.parametrize("name", ["ps5_1080p_hevc", "ps5_720p_avc_hdr", "ps4_720p"])
def test_launch_spec_and_big_match_chiaki(name):
    v = VECTORS["launchspec"][name]
    target = Target(v["target"])
    codec = {0: "h264", 1: "h265", 2: "h265_hdr"}[v["codec"]]
    spec = launchspec.format_spec(target, v["width"], v["height"], v["max_fps"], codec, v["kbps"], 1454, 1,
                                  h(v["handshake_key"]))
    assert spec == v["json"]
    encoded = launchspec.encode_for_big(RPCrypt.for_session(target, h(v["nonce"]), h(v["morning"])), spec)
    assert encoded == v["b64"]
    big = VECTORS["launchspec"][f"big_{name}"]
    built = tkproto.big(12 if target.ps5 else 9, "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAsessionid", encoded,
                        h(VECTORS["launchspec"][f"big_{name}_pub"]), h(VECTORS["launchspec"][f"big_{name}_sig"]))
    assert built == h(big)


def test_missing_native_core_says_what_to_do(monkeypatch):
    monkeypatch.setitem(sys.modules, "bc250_remote_play_core", None)
    with pytest.raises(stream.StreamError, match="native core"):
        stream.StreamConnection("127.0.0.1", Target.PS5_1, SESSION_ID, None)


# --- The connection against a fake console ------------------------------------------------------------------------

@pytest.fixture
def console_factory():
    pytest.importorskip("bc250_remote_play_core", reason="the native core is not built: see native/pyproject.toml")
    from fake_stream import StreamConsole
    made = []

    def make(target=Target.PS5_1, **behaviour):
        console = StreamConsole(target, NONCE, RP_KEY, **behaviour)
        made.append(console)
        return console
    yield make
    for console in made:
        console.close()


def _connection(console, timeout=2.0, **kwargs) -> stream.StreamConnection:
    crypt = RPCrypt.for_session(console.target, NONCE, RP_KEY)
    return stream.StreamConnection("127.0.0.1", console.target, SESSION_ID, crypt, port=console.port, timeout=timeout,
                                   **kwargs)


@pytest.mark.parametrize("target", [Target.PS5_1, Target.PS4_10])
def test_stream_connects_runs_and_closes(console_factory, target):
    console = console_factory(target)
    profile = stream.Profile(1280, 720, 30, 10000, "h265")
    with _connection(console, profile=profile, dualsense=target.ps5) as connection:
        info = connection.connect()
        assert [(r.width, r.height) for r in info.resolutions] == [(1920, 1080)]
        assert connection.audio == tkproto.AudioHeader(2, 16, 48000, 480)
        connection.run(1.2)
    version = 12 if target.ps5 else 9
    # What reached the console: BIG with our session ID and a launch spec it could decrypt, signed correctly.
    assert console.big["version"] == version and console.big["session_key"] == SESSION_ID
    assert console.big["encrypted_key"] == bytes(4) and console.client_signature_ok
    resolution = console.spec["streamResolutions"][0]
    assert (resolution["resolution"], resolution["maxFps"]) == ({"width": 1280, "height": 720}, 30)
    assert console.spec["network"] == {"bwKbpsSent": 10000, "bwLoss": 0.001, "mtu": 1454, "rtt": 1, "ports": [53, 2053]}
    assert console.spec.get("videoCodec") == ("hevc" if target.ps5 else None)
    # Then the acknowledgement, the controller, the microphone, heartbeats and the goodbye; every packet signed.
    assert console.received[:4] == [tkproto.BIG, tkproto.STREAMINFOACK, tkproto.CONTROLLERCONNECTION,
                                    tkproto.STREAMINFO]
    assert console.heartbeats >= 2 and console.disconnect_reason == "Client Disconnecting"
    assert console.errors == []
    # Video and audio came through, decrypted and in order.
    assert connection.stats.video_packets == 6 and connection.stats.frames == {0, 1, 2}
    assert connection.stats.audio_packets == 3
    assert connection.stats.haptics_packets == (1 if target.ps5 else 0)
    assert "The console's key signature checks out." in connection.log


def test_streaminfo_before_bang_is_kept(console_factory):
    console = console_factory(early_streaminfo=True)
    with _connection(console) as connection:
        connection.connect()
        assert "STREAMINFO came before BANG; kept for later." in connection.log
    assert console.received[:2] == [tkproto.BIG, tkproto.STREAMINFOACK]


def test_wrong_signature_is_only_noted(console_factory):
    console = console_factory(wrong_signature=True)
    with _connection(console) as connection:
        connection.connect()
    assert "The console's key signature does not match (not required)." in connection.log


def test_big_split_over_packets(console_factory, monkeypatch):
    monkeypatch.setattr(stream, "MTU", 300)
    console = console_factory()
    with _connection(console) as connection:
        connection.connect()
    assert console.big_fragments >= 4 and console.big["session_key"] == SESSION_ID and console.spec


def test_console_refuses_the_version(console_factory):
    console = console_factory(refuse_version=True)
    with _connection(console) as connection, pytest.raises(stream.StreamError, match="did not accept stream version"):
        connection.connect()


def test_console_ends_the_stream(console_factory):
    console = console_factory(disconnect_after=1)
    with _connection(console) as connection:
        connection.connect()
        with pytest.raises(stream.StreamError, match="Server shutting down"):
            connection.run(3.0)
        assert connection.remote_reason == "Server shutting down"
    assert console.disconnect_reason is None             # no goodbye after the console's own


def test_no_answer_on_the_stream_port(console_factory):
    console = console_factory(silent=True)
    connection = _connection(console, timeout=0.2)
    with pytest.raises(stream.StreamError, match="did not answer on the stream port"):
        connection.connect()


def test_stream_job_runs_session_and_stream(console_factory):
    """jobs.test_stream end to end: the control connection (fake_console.py) and the stream (fake_stream.py)."""
    from fake_console import REGIST_KEY, SessionConsole

    from bc250_remote_play import jobs
    from bc250_remote_play.consoles import RegisteredConsole

    registered = RegisteredConsole("X", "PS5", "127.0.0.1", Target.PS5_1, REGIST_KEY, RP_KEY)
    ctrl = SessionConsole()
    console = console_factory()
    try:
        outcome = jobs.test_stream(registered, seconds=0.5, stream_port=console.port, port=ctrl.port, timeout=2.0)
    finally:
        ctrl.close()
    assert outcome.ok, outcome.message
    assert "1920×1080" in outcome.message and "3 frames in 6 video packets, 3 audio packets" in outcome.message
    assert "Session ID received: the session is running." in outcome.log
    assert any(line.startswith("STREAMINFO received") for line in outcome.log)
    assert console.spec["streamResolutions"][0]["resolution"] == {"width": 1920, "height": 1080}
    assert console.disconnect_reason == "Client Disconnecting" and console.errors == []

    # No stream port: the session works, the stream does not.
    silent = console_factory(silent=True)
    ctrl = SessionConsole()
    try:
        failed = jobs.test_stream(registered, seconds=0.5, stream_port=silent.port, stream_timeout=0.2, port=ctrl.port,
                                  timeout=2.0)
    finally:
        ctrl.close()
    assert not failed.ok and "did not answer on the stream port" in failed.message
