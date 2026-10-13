# SPDX-License-Identifier: AGPL-3.0-or-later
"""The network steps the window starts, each run off the GUI thread. Each returns an Outcome, never raises: the
window only shows the message and uses the value."""

from __future__ import annotations

import math
import threading
import time
from dataclasses import dataclass, field, replace
from pathlib import Path
from typing import Callable

from . import LOGO_PATH, discovery, gamepad, psn, regist, senkusha, session, steam_settings, steam_shortcuts, stream
from .consoles import RegisteredConsole
from .httpmsg import ProtocolError
from .target import Target
from .video import Picture

TEST_SECONDS = 3.0                      # how long a test session stays open, answering heartbeats
STREAM_SECONDS = 5.0                    # how long a test stream runs
REST_GRACE = 0.5                        # time for the rest-mode message to reach the console before closing
# H.264 from a PS5 too, not HEVC (owner, 13-10-2026): the BC-250 decodes in software, where HEVC takes about twice
# as long; 1080p H.264 fits one thread.
STREAM_CODEC = "h264"


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


WAKE_TIMEOUT = 60.0                     # a PS4 takes about 20 seconds out of rest mode
WAKE_POLL = 2.0


def wake_and_wait(console: RegisteredConsole, progress: Callable[[str], None] = lambda text: None,
                  timeout: float = WAKE_TIMEOUT, search=discovery.search, wake=discovery.wake,
                  sleep=time.sleep, clock=time.monotonic) -> Outcome:
    """For the direct start: the console on and answering, woken from rest mode when it is there. When it does not
    answer at its address (the router gave it another one), a search of the network finds it by its host id. The
    value is the console, with the address it answered at."""
    name = console.nickname or console.address
    progress(f"Looking for {name}…")
    answers = search(console.address)
    if not answers and console.host_id:
        answers = [c for c in search() if c.host_id == console.host_id]
    if not answers:
        return Outcome(False, f"{name} does not answer. Is it on, or in rest mode with its rest-mode settings for "
                              "Remote Play (see the manual)?")
    console = replace(console, address=answers[0].address)
    if answers[0].state == "ready":
        return Outcome(True, f"{name} is on.", console)
    progress(f"Waking {name} from rest mode…")
    try:
        wake(console.address, console.regist_key, console.ps5)
    except (OSError, ValueError) as error:
        return Outcome(False, f"The wake-up could not be sent: {error}.")
    deadline = clock() + timeout
    while clock() < deadline:
        sleep(WAKE_POLL)
        answers = search(console.address)
        if answers and answers[0].state == "ready":
            return Outcome(True, f"{name} is on.", console)
    return Outcome(False, f"{name} did not come out of rest mode within {timeout:g} seconds.")


def _session(console: RegisteredConsole, then, **kwargs) -> Outcome:
    kwargs.setdefault("codec", STREAM_CODEC)
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


def stream_profile(console: RegisteredConsole, server_type: str = "") -> stream.Profile:
    """The reference's presets: 1080p at 15 Mbit/s for a PS5, 720p at 10 Mbit/s for a PS4. A PS4 Pro gets 1080p too
    (owner, 13-10-2026); the console says it is one when the control connection opens (*server_type*)."""
    if console.ps5 or server_type == "PS4 Pro":
        return stream.Profile(1920, 1080, 60, 15000)
    return stream.Profile(1280, 720, 60, 10000)


def _run_stream(console: RegisteredConsole, started: session.Session, seconds: float, stop: Callable[[], bool],
                stream_port: int, stream_timeout: float, senkusha_port: int,
                gamepads: Callable[[], object] | None = None, **stream_options):
    """The network test, then the stream for *seconds* or until *stop*; the control connection keeps answering
    heartbeats in a second thread meanwhile. When the network test fails, the stream goes on with safe values, as
    the reference does. With *gamepads* (gamepad.Sdl, or a stand-in), the board's controllers play from STREAMINFO
    on. Returns the connection (closed) and STREAMINFO."""
    done = threading.Event()
    ctrl_error: list[Exception] = []

    def ctrl() -> None:
        try:
            # Long enough for the network test and the handshake's three tries, BANG and STREAMINFO; the stream's
            # end stops it sooner.
            started.keep_alive(seconds + 12 * stream_timeout, done.is_set)
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
            test.note(f"{error} The stream uses safe values instead: MTU {stream.MTU}, {stream.RTT_MS} ms.")
        finally:
            started.info.log.extend(test.log)
        profile = replace(stream_profile(console, started.info.server_type), codec=started.codec)
        connection = stream.StreamConnection(
            console.address, started.info.target, started.info.session_id, started.crypt, profile,
            port=stream_port, timeout=stream_timeout, mtu_in=measured and measured.mtu_in,
            mtu_out=measured and measured.mtu_out, rtt_ms=measured.rtt_ms if measured else stream.RTT_MS,
            **stream_options)
        with connection:
            info = connection.connect()
            reader = None
            if gamepads is not None:
                reader = gamepad.Reader(connection.set_controller, console.ps5, connection.note, gamepads).start()
                connection.drive_controllers(reader.output)
            try:
                connection.run(seconds, lambda: bool(ctrl_error) or stop())
            finally:
                if reader is not None:
                    connection.drive_controllers(None)
                    reader.stop()
    finally:
        done.set()
        thread.join()
        if connection is not None:
            started.info.log.extend(connection.log)
    if ctrl_error:
        raise session.SessionError(f"The control connection broke off during the stream: {ctrl_error[0]}")
    return connection, info


def _stream_summary(connection: stream.StreamConnection, seconds: float) -> str:
    stats = connection.stats
    mbit = stats.frame_bytes * 8 / max(seconds, 1e-6) / 1e6
    decoded = (f"{stats.decoded} decoded ({'VA-API' if connection.decoder.hw else 'software'})"
               if connection.decoder is not None else "not decoded")
    return (f"{stats.frames} frames ({stats.fec_frames} rebuilt with FEC, {stats.frames_lost} lost; {decoded}), "
            f"{mbit:.1f} Mbit/s of video, {stats.audio_packets} audio packets")


def test_stream(console: RegisteredConsole, seconds: float = STREAM_SECONDS, stream_port: int = stream.PORT,
                stream_timeout: float = stream.EXPECT_TIMEOUT, senkusha_port: int = senkusha.PORT,
                **kwargs) -> Outcome:
    """Start a session, run the network test, then the stream for *seconds*, and close it all: proves the key
    exchange and that video and audio arrive and decode, without showing them."""
    def hold(started: session.Session) -> str:
        connection, info = _run_stream(console, started, seconds, lambda: False, stream_port, stream_timeout,
                                       senkusha_port)
        sizes = ", ".join(f"{r.width}×{r.height}" for r in info.resolutions) or "no resolution"
        return (f"Stream with {console.nickname or console.address} ran {seconds:g} s ({sizes}): "
                f"{_stream_summary(connection, seconds)}.")
    return _session(console, hold, **kwargs)


def watch_stream(console: RegisteredConsole, deliver: Callable[[Picture], None], wanted: Callable[[], bool],
                 stop: threading.Event, play: Callable[[bytes, int, int], None] | None = None,
                 gamepads: Callable[[], object] | None = gamepad.Sdl, stream_port: int = stream.PORT,
                 stream_timeout: float = stream.EXPECT_TIMEOUT, senkusha_port: int = senkusha.PORT,
                 **kwargs) -> Outcome:
    """The stream until *stop* is set (the stream window closes): each decoded picture goes to *deliver* while
    *wanted* says the window has taken the last one, the sound to *play* (PCM, rate, channels). The board's
    controllers play, read through *gamepads* (SDL3; None: the console sees a controller lying still)."""
    def hold(started: session.Session) -> str:
        began = time.monotonic()
        connection, _info = _run_stream(console, started, math.inf, stop.is_set, stream_port, stream_timeout,
                                        senkusha_port, gamepads, on_picture=deliver, picture_wanted=wanted,
                                        on_sound=play)
        seconds = time.monotonic() - began
        return (f"Stream with {console.nickname or console.address} ended after {seconds:.0f} s: "
                f"{_stream_summary(connection, seconds)}.")
    return _session(console, hold, **kwargs)


def steam_guide_focus(on: bool, steam: Path, **kwargs) -> Outcome:
    """Steam's Guide Button Focus Steam on or off; Steam restarts when it was running."""
    try:
        restarted = steam_settings.set_guide_focus(on, steam, **kwargs)
    except (steam_settings.SteamError, OSError) as error:
        return Outcome(False, f"Steam's setting was not changed: {error}")
    what = "comes to the front" if on else "no longer comes to the front"
    again = " Steam was closed for it and starts again in the background." if restarted else ""
    return Outcome(True, f"Steam {what} on the PS button.{again}", on)


STEAM_PICTURES = LOGO_PATH.parent / "steam"            # the app's own pictures for the shortcut, where it has them


def steam_shortcut(console: RegisteredConsole, steam: Path, remove: bool = False,
                   launcher: Path | None = None, logo: Path = LOGO_PATH, pictures: Path = STEAM_PICTURES,
                   **kwargs) -> Outcome:
    """The console's Steam shortcut for Game Mode, added (or brought up to date) or removed; Steam restarts when it
    was running."""
    launcher = launcher or Path(steam_shortcuts.LAUNCHER).expanduser()
    if not remove and not launcher.is_file():
        return Outcome(False, f"The shortcut runs {launcher}, which is not there: install BC250 Console Link through "
                              "the portal first.")
    name = steam_shortcuts.shortcut_name(console)
    art = {} if remove else steam_shortcuts.draw_art(console, logo, pictures)
    try:
        restarted = steam_settings.with_steam_closed(
            lambda: steam_shortcuts.write_shortcut(steam, console, launcher, logo, art, remove), **kwargs)
    except (steam_settings.SteamError, steam_shortcuts.ShortcutError, OSError) as error:
        return Outcome(False, f"The Steam shortcut was not changed: {error}")
    again = " Steam was closed for it and starts again in the background." if restarted else ""
    if remove:
        return Outcome(True, f"\"{name}\" is no longer in Steam.{again}")
    return Outcome(True, f"\"{name}\" is in Steam: in Game Mode, under Non-Steam in the library. It starts the "
                         f"stream full screen, waking the console when needed.{again}")
