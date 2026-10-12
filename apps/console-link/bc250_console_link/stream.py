# SPDX-License-Identifier: AGPL-3.0-only
"""The stream connection (chiaki-ng's lib/src/streamconnection.c), once the control connection has the session ID.

1. Takion on UDP 9296: the handshake (the native core, bc250_console_link_core.Takion).
2. BIG: the session ID, the launch spec (resolution, frame rate, bitrate, codec) and our ECDH public key, signed
   with a random handshake key. The console answers BANG with its public key; both sides derive the stream keys.
3. STREAMINFO: the console's video headers per resolution and its audio header. We acknowledge it, report the
   controller and announce the microphone; from then on video and audio flow, and a heartbeat goes every second.
4. DISCONNECT from either side ends it.

The network test before this (Senkusha, senkusha.py) measures the MTU both ways and the round trip, which go into
the launch spec; without it, the values are chiaki-ng's for a failed test: 1454 bytes and 1 ms."""

from __future__ import annotations

import os
import time
from dataclasses import dataclass, field
from typing import Callable

from . import launchspec, tkproto
from .rpcrypt import RPCrypt
from .target import Target

PORT = 9296
EXPECT_TIMEOUT = 5.0
HEARTBEAT_INTERVAL = 1.0
MTU = 1454                              # chiaki-ng's values when the network test fails
RTT_MS = 1
HANDSHAKE_KEY_SIZE = 16
CHANNEL = 1
CHANNEL_STREAMINFO_ACK = 9
CHANNEL_FRAME_REPORTS = 2
DATA_PROTOBUF = 0
MTU_OVERHEAD = 50                       # chiaki-ng: the network's share of the MTU
DATA_OVERHEAD = 26                      # type byte, message header and DATA header; a continuation has one less


class StreamError(Exception):
    pass


def _core():
    try:
        import bc250_console_link_core
    except ImportError as error:
        raise StreamError("The stream needs the app's native core (bc250_console_link_core), which is not "
                          "installed: install Rust (rustup) and run install.sh again.") from error
    return bc250_console_link_core


@dataclass
class Profile:
    """What the launch spec asks for."""
    width: int = 1920
    height: int = 1080
    max_fps: int = 60
    bitrate: int = 15000                # kbit/s
    codec: str = "h264"


@dataclass
class StreamStats:
    video_packets: int = 0
    audio_packets: int = 0
    haptics_packets: int = 0
    frames: set[int] = field(default_factory=set)
    other_data: int = 0
    corrupt_reports: list[tuple[int, int]] = field(default_factory=list)


class StreamConnection:
    """One stream with a console whose control connection is running. connect() runs steps 1 to 3."""

    def __init__(self, host: str, target: Target, session_id: str, crypt: RPCrypt, profile: Profile | None = None,
                 dualsense: bool = False, port: int = PORT, timeout: float = EXPECT_TIMEOUT,
                 mtu_in: int | None = None, mtu_out: int | None = None, rtt_ms: int = RTT_MS,
                 random: Callable[[int], bytes] = os.urandom, core=None):
        self.host, self.target, self.session_id, self.crypt = host, target, session_id, crypt
        self.profile = profile or Profile()
        self.dualsense, self.port, self.timeout, self.random = dualsense, port, timeout, random
        self.mtu_in, self.mtu_out, self.rtt_ms = mtu_in or MTU, mtu_out or MTU, rtt_ms
        self.core = core or _core()
        self.takion = None
        self.handshake_key = b""
        self.ecdh = None
        self.bang: tkproto.Bang | None = None
        self.info: tkproto.StreamInfo | None = None
        self.audio: tkproto.AudioHeader | None = None
        self.stats = StreamStats()
        self.remote_reason: str | None = None
        self.log: list[str] = []
        self._early_streaminfo: tkproto.Message | None = None

    def __enter__(self) -> StreamConnection:
        return self

    def __exit__(self, *exc) -> None:
        self.close()

    def note(self, text: str) -> None:
        self.log.append(text)

    @property
    def version(self) -> int:
        return 12 if self.target.ps5 else 9

    # --- Sending --------------------------------------------------------------------------------------------

    def send(self, data: bytes, channel: int = CHANNEL) -> None:
        self.takion.send_data(data, channel=channel, flags=1)

    def send_big(self) -> None:
        """BIG, split over several DATA messages when it does not fit the MTU (chiaki-ng's arithmetic)."""
        spec = launchspec.format_spec(self.target, self.profile.width, self.profile.height, self.profile.max_fps,
                                      self.profile.codec, self.profile.bitrate, self.mtu_in, self.rtt_ms,
                                      self.handshake_key)
        public_key, signature = self.ecdh.signed_public_key(self.handshake_key)
        data = tkproto.big(self.version, self.session_id, launchspec.encode_for_big(self.crypt, spec), public_key,
                           signature)
        mtu = min(self.mtu_in, self.mtu_out) - MTU_OVERHEAD
        first = True
        while mtu < len(data) + DATA_OVERHEAD or (mtu < len(data) + DATA_OVERHEAD - 1 and not first):
            size = mtu - DATA_OVERHEAD + (0 if first else 1)
            self.takion.send_data(data[:size], channel=CHANNEL, flags=0, cont=not first)
            data, first = data[size:], False
        if data:
            self.takion.send_data(data, channel=CHANNEL, flags=1, cont=not first)

    def heartbeat(self) -> None:
        self.send(tkproto.heartbeat())

    def request_idr(self) -> None:
        self.send(tkproto.idr_request(), CHANNEL_FRAME_REPORTS)

    # --- Receiving ------------------------------------------------------------------------------------------

    def _count_av(self, header: dict) -> None:
        if header["video"]:
            self.stats.video_packets += 1
            self.stats.frames.add(header["frame_index"])
        elif header["haptics"]:
            self.stats.haptics_packets += 1
        else:
            self.stats.audio_packets += 1

    def poll(self, timeout: float) -> tkproto.Message | None:
        """The next protobuf message, or None after *timeout*. Video and audio are counted; a DISCONNECT from the
        console or a closed connection raises StreamError."""
        deadline = time.monotonic() + timeout
        while True:
            event = self.takion.next_event(max(0.0, deadline - time.monotonic()))
            if event is None:
                return None
            kind = event[0]
            if kind == "av":
                self._count_av(event[1])
            elif kind == "closed":
                raise StreamError(f"The stream connection closed: {event[1]}.")
            elif kind == "data":
                _kind, data_type, _channel, data = event
                if data_type != DATA_PROTOBUF:
                    self.stats.other_data += 1     # rumble, pad info, trigger effects: not used yet
                    continue
                try:
                    message = tkproto.parse(data)
                except tkproto.ProtoError as error:
                    self.note(f"The console sent a message that does not decode ({error}).")
                    continue
                reason = tkproto.disconnect_reason(message)
                if reason is not None:
                    self.remote_reason = reason
                    raise StreamError(f"The console ended the stream: {reason or 'no reason given'}.")
                corrupt = tkproto.corrupt_range(message)
                if corrupt is not None:
                    self.stats.corrupt_reports.append(corrupt)
                    continue
                return message
            if time.monotonic() >= deadline:
                return None

    def _expect(self, what: str, accept: Callable[[tkproto.Message], bool]) -> None:
        deadline = time.monotonic() + self.timeout
        while (remaining := deadline - time.monotonic()) > 0:
            message = self.poll(remaining)
            if message is not None and accept(message):
                return
        raise StreamError(f"The console sent no {what} within {self.timeout:g} seconds.")

    def _on_bang(self, message: tkproto.Message) -> bool:
        if message.type == tkproto.STREAMINFO and self._early_streaminfo is None:
            self._early_streaminfo = message                 # chiaki-ng keeps one that comes before BANG
            self.note("STREAMINFO came before BANG; kept for later.")
            return False
        bang = tkproto.bang(message)
        if bang is None:
            self.note(f"Expected BANG, got message type {message.type}.")
            return False
        self.bang = bang
        if not bang.version_accepted:
            raise StreamError(f"The console did not accept stream version {self.version} (it has "
                              f"{bang.server_version_string or bang.server_version}).")
        if not bang.encrypted_key_accepted:
            raise StreamError("The console did not accept the encrypted key in BIG.")
        if not bang.ecdh_public_key or not bang.ecdh_signature:
            raise StreamError("The console's BANG has no key for the stream crypto.")
        # chiaki-ng does not check this signature; this notes what the console does, without failing on it.
        signed = self.core.verify_signature(self.handshake_key, bang.ecdh_public_key, bang.ecdh_signature)
        self.note("The console's key signature " + ("checks out." if signed else "does not match (not required)."))
        try:
            secret = self.ecdh.derive_secret(bang.ecdh_public_key)
        except ValueError as error:
            raise StreamError("The console's public key for the stream is invalid.") from error
        self.takion.set_crypt(self.handshake_key, secret)
        self.note(f"BANG received (server version {bang.server_version}); the stream is encrypted.")
        return True

    def _on_streaminfo(self, message: tkproto.Message) -> bool:
        info = tkproto.streaminfo(message)
        if info is None:
            self.note(f"Expected STREAMINFO, got message type {message.type}.")
            return False
        try:
            self.audio = tkproto.AudioHeader.load(info.audio_header)
        except tkproto.ProtoError as error:
            raise StreamError(f"The console's STREAMINFO is invalid: {error}.") from error
        self.info = info
        self.send(tkproto.streaminfo_ack(), CHANNEL_STREAMINFO_ACK)
        self.send(tkproto.controller_connection(self.dualsense))
        self.send(tkproto.microphone(tkproto.MICROPHONE.save()))
        sizes = ", ".join(f"{r.width}×{r.height}" for r in info.resolutions) or "no resolution"
        self.note(f"STREAMINFO received ({sizes}; audio {self.audio.channels} channels at {self.audio.rate} Hz).")
        return True

    # --- The connection -------------------------------------------------------------------------------------

    def connect(self) -> tkproto.StreamInfo:
        try:
            self.takion = self.core.Takion(self.host, self.port, self.version, self.timeout)
        except TimeoutError as error:
            raise StreamError(f"The console did not answer on the stream port {self.port}: {error}.") from error
        except OSError as error:                         # ConnectionError included
            raise StreamError(f"The stream connection to {self.host} failed: {error}.") from error
        self.note(f"Stream connection open (Takion version {self.version}).")
        self.handshake_key = self.random(HANDSHAKE_KEY_SIZE)
        self.ecdh = self.core.Ecdh()
        self.send_big()
        self._expect("BANG", self._on_bang)
        early, self._early_streaminfo = self._early_streaminfo, None
        if early is None or not self._on_streaminfo(early):
            self._expect("STREAMINFO", self._on_streaminfo)
        return self.info

    def run(self, seconds: float, stop: Callable[[], bool] = lambda: False) -> None:
        """Keep the stream for *seconds*: heartbeats every second, everything that comes in counted."""
        deadline = time.monotonic() + seconds
        next_beat = time.monotonic()
        while (now := time.monotonic()) < deadline and not stop():
            if now >= next_beat:
                self.heartbeat()
                next_beat = now + HEARTBEAT_INTERVAL
            message = self.poll(min(next_beat, deadline) - now)
            if message is not None and message.type not in (tkproto.STREAMINFOACK, tkproto.CONNECTIONQUALITY,
                                                             tkproto.HEARTBEAT):
                self.note(f"Message type {message.type} received.")

    def close(self) -> None:
        if self.takion is None:
            return
        try:
            if self.remote_reason is None:
                self.send(tkproto.disconnect())
        except OSError:
            pass
        finally:
            self.takion.close()
            self.takion = None
