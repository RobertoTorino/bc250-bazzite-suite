# SPDX-License-Identifier: AGPL-3.0-or-later
"""The network steps the window starts, each run off the GUI thread. Each returns an Outcome, never raises: the
window only shows the message and uses the value."""

from __future__ import annotations

import threading
import time
from dataclasses import dataclass, field, replace

from . import discovery, psn, regist, senkusha, session, stream
from .consoles import RegisteredConsole
from .httpmsg import ProtocolError
from .target import Target

TEST_SECONDS = 3.0                      # how long a test session stays open, answering heartbeats
STREAM_SECONDS = 5.0                    # how long a test stream runs
REST_GRACE = 0.5                        # time for the rest-mode message to reach the console before closing


@dataclass
class Outcome:
    ok: bool
    message: str
    value: object = None
    log: list[str] = field(default_factory=list)


def find(address: str = discovery.BROADCAST, timeout: float = 2.0, **ports) -> Outcome:
    try:
        consoles = discovery.search(address, timeout, **ports)
    except OSError as error:
        return Outcome(False, f"The search could not be sent: {error}.")
    if not consoles:
        where = "on the network" if address == discovery.BROADCAST else f"at {address}"
        return Outcome(True, f"No console answered {where}.", [])
    return Outcome(True, f"{len(consoles)} console{'s' if len(consoles) != 1 else ''} found.", consoles)


def psn_account(redirect: str, **kwargs) -> Outcome:
    """The account ID from the PlayStation sign-in: *redirect* is the address the sign-in sent the browser to."""
    try:
        account = psn.account_id(psn.code_from_redirect(redirect), **kwargs)
    except psn.PsnError as error:
        return Outcome(False, str(error))
    name = f" ({account.online_id})" if account.online_id else ""
    return Outcome(True, f"Account ID of your PSN account{name}: {account.code}, filled in for registration.", account)


def register(console: discovery.Console, account_id: bytes, pin: int, **kwargs) -> Outcome:
    target = console.target
    if target.unknown:
        target = Target.PS5_1 if console.ps5 else Target.PS4_10
    try:
        registration = regist.register(console.address, target, account_id, pin, **kwargs)
    except regist.RegistError as error:
        return Outcome(False, str(error))
    except (OSError, ProtocolError) as error:
        return Outcome(False, f"Registration failed: {error}.")
    registered = RegisteredConsole.from_registration(registration, console.address, console.host_id)
    return Outcome(True, f"Registered with {registered.nickname or console.host_name or console.address}.", registered)


def wake(console: RegisteredConsole, **kwargs) -> Outcome:
    try:
        discovery.wake(console.address, console.regist_key, console.ps5, **kwargs)
    except (OSError, ValueError) as error:
        return Outcome(False, f"The wake-up could not be sent: {error}.")
    return Outcome(True, f"Wake-up sent to {console.nickname or console.address}. It takes the console about 20 "
                         "seconds to come out of rest mode.")


def _session(console: RegisteredConsole, then, **kwargs) -> Outcome:
    started = session.Session(console.address, console.target, console.regist_key, console.rp_key,
                              login_pin=console.login_pin, **kwargs)
    try:
        with started:
            info = started.start()
            message = then(started)
    except (session.SessionError, stream.StreamError) as error:
        return Outcome(False, str(error), started.info, started.info.log)
    except (OSError, ProtocolError) as error:
        return Outcome(False, f"The session broke off: {error}.", started.info, started.info.log)
    return Outcome(True, message, info, info.log)


def test_session(console: RegisteredConsole, seconds: float = TEST_SECONDS, **kwargs) -> Outcome:
    """Start a session, keep it for *seconds* and close it: proves the registration and the control connection."""
    def hold(started: session.Session) -> str:
        started.keep_alive(seconds)
        return (f"Session with {console.nickname or console.address} started and closed again "
                f"({started.info.server_type or console.target.console}).")
    return _session(console, hold, **kwargs)


def rest_mode(console: RegisteredConsole, **kwargs) -> Outcome:
    def bed(started: session.Session) -> str:
        started.goto_bed()
        time.sleep(REST_GRACE)
        return f"{console.nickname or console.address} goes to rest mode."
    return _session(console, bed, **kwargs)


def stream_profile(console: RegisteredConsole) -> stream.Profile:
    """chiaki-ng's presets: 1080p at 15 Mbit/s for a PS5, 720p at 10 Mbit/s for a PS4 (a PS4 Pro could do 1080p)."""
    if console.ps5:
        return stream.Profile(1920, 1080, 60, 15000)
    return stream.Profile(1280, 720, 60, 10000)


def test_stream(console: RegisteredConsole, seconds: float = STREAM_SECONDS, stream_port: int = stream.PORT,
                stream_timeout: float = stream.EXPECT_TIMEOUT, senkusha_port: int = senkusha.PORT,
                **kwargs) -> Outcome:
    """Start a session, run the network test, then the stream for *seconds*, and close it all: proves the key
    exchange and that video and audio arrive (nothing is decoded or shown yet). The control connection keeps
    answering heartbeats in a second thread meanwhile. When the network test fails, the stream goes on with
    chiaki-ng's values for that case, as chiaki-ng does."""
    def hold(started: session.Session) -> str:
        stop = threading.Event()
        ctrl_error: list[Exception] = []

        def ctrl() -> None:
            try:
                # Long enough for the network test and the handshake's three tries, BANG and STREAMINFO; the stop
                # ends it sooner.
                started.keep_alive(seconds + 12 * stream_timeout, stop.is_set)
            except (session.SessionError, OSError) as error:
                ctrl_error.append(error)

        thread = threading.Thread(target=ctrl, name="ctrl", daemon=True)
        thread.start()
        connection = None
        try:
            test = senkusha.Senkusha(console.address, senkusha_port, stream_timeout)
            try:
                measured = test.run()
            except senkusha.SenkushaError as error:
                measured = None
                test.note(f"{error} The stream uses chiaki-ng's values for this case: MTU {stream.MTU}, "
                          f"{stream.RTT_MS} ms.")
            finally:
                started.info.log.extend(test.log)
            profile = replace(stream_profile(console), codec=started.codec)
            connection = stream.StreamConnection(
                console.address, started.info.target, started.info.session_id, started.crypt, profile,
                port=stream_port, timeout=stream_timeout, mtu_in=measured and measured.mtu_in,
                mtu_out=measured and measured.mtu_out, rtt_ms=measured.rtt_ms if measured else stream.RTT_MS)
            with connection:
                info = connection.connect()
                connection.run(seconds, lambda: bool(ctrl_error))
        finally:
            stop.set()
            thread.join()
            if connection is not None:
                started.info.log.extend(connection.log)
        if ctrl_error:
            raise session.SessionError(f"The control connection broke off during the stream: {ctrl_error[0]}")
        stats = connection.stats
        sizes = ", ".join(f"{r.width}×{r.height}" for r in info.resolutions) or "no resolution"
        return (f"Stream with {console.nickname or console.address} ran {seconds:g} s ({sizes}): "
                f"{len(stats.frames)} frames in {stats.video_packets} video packets, {stats.audio_packets} audio "
                "packets. Nothing is shown yet.")
    return _session(console, hold, **kwargs)
