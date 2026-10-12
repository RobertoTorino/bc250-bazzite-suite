# SPDX-License-Identifier: AGPL-3.0-or-later
"""The native core (native/, Rust through PyO3) as Python sees it, against the vectors printed by chiaki-ng's own C
code (gkcrypt.c, ecdh.c and takion.c at commit c8bea2642d0e, built with OpenSSL on 12-10-2026). The Rust tests
(cargo test) check the same vectors; these check the module the app imports.

The module is built from native/ (maturin build, then pip install the wheel); CI builds it before these tests. Without
it they are skipped, with the reason."""

from __future__ import annotations

import json
from pathlib import Path

import pytest

core = pytest.importorskip("bc250_remote_play_core", reason="the native core is not built: see native/pyproject.toml")

VECTORS = json.loads((Path(__file__).parent / "takion_vectors.json").read_text(encoding="utf-8"))
h = bytes.fromhex


@pytest.mark.parametrize("v", VECTORS["gkcrypt"], ids=lambda v: f"index{v['index']}")
def test_gkcrypt(v):
    crypt = core.GkCrypt(v["index"], h(v["handshake_key"]), h(v["secret"]))
    assert (crypt.key_base, crypt.iv, crypt.key_gmac_base) == (h(v["key_base"]), h(v["iv"]), h(v["key_gmac_base"]))
    assert crypt.key_stream(0, 64) == h(v["stream_0"])
    assert crypt.key_stream(0xfff0, 48) == h(v["stream_fff0"])
    assert crypt.crypt(0x105, h(v["plain"])) == h(v["crypt_105"])
    assert crypt.crypt(0x105, h(v["crypt_105"])) == h(v["plain"])
    for pos, mac in v["gmacs"]:                         # in this order: the GMAC key moves on and comes back
        assert crypt.gmac(pos, h(v["gmac_msg"])) == h(mac), pos


@pytest.mark.parametrize("v", VECTORS["ecdh"], ids=lambda v: v["private"][:8])
def test_ecdh(v):
    ecdh = core.Ecdh(h(v["private"]))
    public, signature = ecdh.signed_public_key(h(v["handshake_key"]))
    assert (public, signature) == (h(v["public"]), h(v["signature"]))
    assert core.verify_signature(h(v["handshake_key"]), public, signature)
    assert not core.verify_signature(h(v["handshake_key"]), public, bytes(32))
    assert ecdh.derive_secret(h(v["remote_public"])) == h(v["secret"])


def test_ecdh_both_sides_agree_and_bad_keys():
    a, b = core.Ecdh(), core.Ecdh()
    assert len(a.public_key()) == 65 and a.public_key()[0] == 4
    assert a.derive_secret(b.public_key()) == b.derive_secret(a.public_key())
    with pytest.raises(ValueError):
        a.derive_secret(b"\x04" * 65)
    with pytest.raises(ValueError):
        core.Ecdh(bytes(32))


def test_packet_mac_and_verify():
    v = VECTORS["packet_mac"]
    crypt = core.GkCrypt(v["index"], h(v["handshake_key"]), h(v["secret"]))
    for case in v["packets"]:
        packet, mac, _old = core.packet_mac(crypt, h(case["packet"]), case["key_pos"])
        assert (packet, mac) == (h(case["with_mac"]), h(case["mac"]))
        assert core.verify_packet(crypt, core.KeyState(), packet) == case["key_pos"]
        tampered = packet[:1] + bytes([packet[1] ^ 1]) + packet[2:]
        with pytest.raises(ValueError, match="MacMismatch"):
            core.verify_packet(crypt, core.KeyState(), tampered)
    # Without crypto (before the key exchange) the MAC field is zeroed and every packet passes.
    plain, mac, _old = core.packet_mac(None, h(v["packets"][0]["with_mac"]), 0)
    assert mac == bytes(4) and core.verify_packet(None, core.KeyState(), plain) == 0


@pytest.mark.parametrize("case", VECTORS["av"], ids=lambda c: f"{c['parser']}-{c['packet'][:2]}")
def test_av_parse(case):
    version = {"v7": 7, "v9": 9, "v12": 12}[case["parser"]]
    parsed = core.parse_av(version, h(case["packet"]), core.KeyState())
    for key in ("packet_index", "frame_index", "nalu", "video", "haptics", "unit_index", "units_total", "units_fec",
                "codec", "word_at_0x18", "adaptive_stream_index", "byte_at_0x2c", "key_pos", "data_offset"):
        assert parsed[key] == case[key], key
    assert len(h(case["packet"])) - parsed["data_offset"] == case["data_size"]


def test_av_parse_refuses_short_and_unknown():
    with pytest.raises(ValueError, match="TooSmall"):
        core.parse_av(12, b"\x13" * 0x14, core.KeyState())
    with pytest.raises(ValueError, match="InvalidData"):
        core.parse_av(10, b"\x02" * 0x40, core.KeyState())


def test_congestion_and_key_state():
    v = VECTORS["congestion"]
    assert core.congestion_packet(v["word_0"], v["received"], v["lost"], v["key_pos"]) == h(v["packet"])
    state = core.KeyState()
    assert [state.request_pos(low) for low, _pos in VECTORS["key_state"]] == [pos for _low, pos in VECTORS["key_state"]]


def test_handshake_messages():
    tag_local, tag_remote = 0x11223344, 0xcafe
    init = core.init_packet(tag_local, tag_local)
    message = core.parse_message(init[1:], 0, core.KeyState())
    assert message["chunk_type"] == core.CHUNK_INIT and message["payload"][:4] == tag_local.to_bytes(4, "big")
    payload = (tag_remote.to_bytes(4, "big") + core.A_RWND.to_bytes(4, "big") + (0x64).to_bytes(2, "big") * 2
               + (7).to_bytes(4, "big") + b"\xab" * 32)
    ack = core.message_packet(tag_local, 0, core.CHUNK_INIT_ACK, 0, payload)
    parsed = core.parse_init_ack(core.parse_message(ack[1:], tag_local, core.KeyState())["payload"])
    assert parsed["tag"] == tag_remote and parsed["cookie"] == b"\xab" * 32
    with pytest.raises(ValueError):
        core.parse_init_ack(payload[:-1])
    cookie = core.cookie_packet(tag_remote, parsed["cookie"])
    assert core.parse_message(cookie[1:], tag_remote, core.KeyState())["chunk_type"] == core.CHUNK_COOKIE


def test_data_and_ack():
    packet = core.data_packet(5, 0x40, 1, 9, 2, b"protobuf")
    message = core.parse_message(packet[1:], 5, core.KeyState())
    assert core.parse_data(message["payload"]) == (9, 2, 0, b"protobuf")
    ack = core.data_ack_packet(5, 0x60, 9, core.A_RWND)
    assert core.parse_data_ack(core.parse_message(ack[1:], 5, core.KeyState())["payload"]) == (9, core.A_RWND)
    with pytest.raises(ValueError, match="TagMismatch"):
        core.parse_message(packet[1:], 6, core.KeyState())
    assert core.key_pos_advance(20) == 24
