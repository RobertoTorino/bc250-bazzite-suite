# SPDX-License-Identifier: GPL-3.0-or-later
"""The volume the desktop remembers for an application's sound (owner, 24-10-2026, found on the board with RPCS3
muted: a game played without a sound). Bazzite's sound settings keep a volume and a mute per application, also once
the application is closed: WirePlumber's restore-stream module writes them to
~/.local/state/wireplumber/stream-properties, a line per stream with the application's name in the key and the
volume and mute as JSON. A manager shows the value for its emulator beside the emulator's own volume and says when
it is muted or turned down to nothing. The file is WirePlumber's, which keeps the values in memory and writes the
file itself, so the app never writes it: Unmute (owner, 24-10-2026) changes the stream instead, through PipeWire's
PulseAudio interface (pactl), and WirePlumber stores that as it stores a change in the sound applet. With no stream
of the application's playing, a short silent one is opened under its name (paplay) for the change."""

from __future__ import annotations

import json
import os
import subprocess
import tempfile
import time
import wave
from collections.abc import Callable
from pathlib import Path

STREAM_PROPERTIES = Path("wireplumber") / "stream-properties"
TIMEOUT = 10                            # s, for one pactl call (it answered in a moment on the board)
SILENCE = 2                             # s of silence the stream opened for a change plays
STREAM_WAIT = 5                         # s to wait for that stream, and then for WirePlumber to store the change


class SoundError(Exception):
    pass


def state_home() -> Path:
    return Path(os.environ.get("XDG_STATE_HOME") or Path.home() / ".local" / "state")


def stream_properties() -> Path:
    return state_home() / STREAM_PROPERTIES


def stream_sound(name: str, path: Path | None = None) -> tuple[float, bool] | None:
    """(volume, muted) the desktop remembers for the sound stream of the application *name* (its application.name
    in PipeWire: "RPCS3", "PCSX2", "shadPS4"), as WirePlumber keeps it: a line
    "Output/Audio:application.name:<name>={json}" (a space in the name is written as a backslash and an s). None
    when the file or the line is not there (the application has not played yet) or cannot be read; the volume is 0
    to 1 (1 is 100 %)."""
    key = "Output/Audio:application.name:" + name.replace(" ", "\\s") + "="
    try:
        lines = (path or stream_properties()).read_text(encoding="utf-8", errors="replace").splitlines()
    except OSError:
        return None
    for line in lines:
        if not line.startswith(key):
            continue
        try:
            value = json.loads(line[len(key):])
            return float(value.get("volume", 1.0)), bool(value.get("mute", False))
        except (ValueError, AttributeError, TypeError):
            return None
    return None


def tip(app: str) -> str:
    """The tooltip of the row that shows it."""
    return (f"The volume Bazzite's sound settings remember for {app}, apart from {app}'s own volume beside it and "
            "the system's: the sound applet (the speaker in the panel) under Applications while a game plays. "
            f"Bazzite keeps it for {app} after that; the app only reads it.")


def muted_text(app: str) -> str:
    return (f"{app}'s sound is muted in Bazzite's sound settings, which remember it: Unmute beside it in the "
            "Settings tab turns it on again.")


def down_text(app: str) -> str:
    return (f"{app}'s sound is turned down to 0 % in Bazzite's sound settings, which remember it: turn {app} up in "
            "the sound applet (the speaker in the panel, under Applications) while a game plays.")


def describe(app: str, sound: tuple[float, bool] | None) -> tuple[str, str]:
    """(what the row shows, what is wrong in words or ""): "— (<app> has not played yet)" while the desktop has
    nothing for it, "Muted", "0 %" or the volume in percent."""
    if sound is None:
        return f"— ({app} has not played yet)", ""
    volume, muted = sound
    if muted:
        return "Muted", muted_text(app)
    if volume <= 0:
        return "0 %", down_text(app)
    return f"{round(volume * 100)} %", ""


# --- Unmute ------------------------------------------------------------------------------------------------------

Run = Callable[..., subprocess.CompletedProcess]


def _streams(name: str, run: Run) -> list[int]:
    """The PulseAudio indexes of the playing streams whose application.name is *name*."""
    done = run(["pactl", "-f", "json", "list", "sink-inputs"], capture_output=True, text=True, timeout=TIMEOUT)
    if done.returncode != 0:
        raise SoundError(f"pactl could not list the sound streams: {done.stderr.strip() or done.returncode}")
    try:
        listed = json.loads(done.stdout or "[]")
    except ValueError as error:
        raise SoundError(f"pactl's list of the sound streams could not be read: {error}") from error
    return [int(item["index"]) for item in listed
            if isinstance(item, dict) and (item.get("properties") or {}).get("application.name") == name]


def _silence(folder: Path) -> Path:
    """SILENCE seconds of silence as a WAV file in *folder*."""
    path = folder / "silence.wav"
    with wave.open(str(path), "wb") as out:
        out.setnchannels(2)
        out.setsampwidth(2)
        out.setframerate(48000)
        out.writeframes(b"\0" * 48000 * 4 * SILENCE)
    return path


def unmute(name: str, path: Path | None = None, run: Run = subprocess.run, start=subprocess.Popen,
           sleep: Callable[[float], None] = time.sleep) -> tuple[float, bool] | None:
    """The sound of the application *name* unmuted in Bazzite's sound settings, and WirePlumber's stored value
    once it has written it (stream_sound; *path*: its file). A stream of the application that plays is unmuted
    itself; without one, a silent stream is opened under its name for the change (WirePlumber gives it the
    remembered mute) and closed again. SoundError when it cannot be done (pactl or paplay missing, no stream came,
    pactl refused); the volume is left as it is."""
    try:
        streams = _streams(name, run)
        with tempfile.TemporaryDirectory(prefix="bc250-sound-") as folder:
            player = None
            try:
                if not streams:
                    player = start(["paplay", f"--client-name={name}", str(_silence(Path(folder)))],
                                   stdin=subprocess.DEVNULL, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
                    for _ in range(STREAM_WAIT * 10):
                        sleep(0.1)
                        streams = _streams(name, run)
                        if streams:
                            break
                    if not streams:
                        raise SoundError(f"No sound stream for {name} came to unmute.")
                for index in streams:
                    done = run(["pactl", "set-sink-input-mute", str(index), "0"], capture_output=True, text=True,
                               timeout=TIMEOUT)
                    if done.returncode != 0:
                        raise SoundError(f"pactl did not unmute {name}: {done.stderr.strip() or done.returncode}")
            finally:
                if player is not None:
                    try:
                        player.wait(timeout=SILENCE + STREAM_WAIT)
                    except subprocess.TimeoutExpired:
                        player.terminate()
                        player.wait(timeout=STREAM_WAIT)
    except FileNotFoundError as error:
        raise SoundError(f"{Path(error.filename or 'pactl').name} is not installed: Unmute needs PipeWire's "
                         "PulseAudio tools (pactl and paplay).") from error
    except (OSError, subprocess.SubprocessError) as error:
        raise SoundError(f"{name} could not be unmuted: {error}") from error
    stored = stream_sound(name, path)                  # WirePlumber writes its file a moment after the change
    for _ in range(STREAM_WAIT * 10):
        if stored is not None and not stored[1]:
            break
        sleep(0.1)
        stored = stream_sound(name, path)
    return stored
