# SPDX-License-Identifier: GPL-3.0-or-later
"""The volume the desktop remembers for an application's sound (owner, 24-10-2026, found on the board with RPCS3
muted: a game played without a sound). Bazzite's sound settings keep a volume and a mute per application, also once
the application is closed: WirePlumber's restore-stream module writes them to
~/.local/state/wireplumber/stream-properties, a line per stream with the application's name in the key and the
volume and mute as JSON. A manager shows the value for its emulator beside the emulator's own volume and says when
it is muted or turned down to nothing; it only reads the file (the stream is changed in the sound applet while it
plays), and the file is WirePlumber's."""

from __future__ import annotations

import json
import os
from pathlib import Path

STREAM_PROPERTIES = Path("wireplumber") / "stream-properties"


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
    return (f"{app}'s sound is muted in Bazzite's sound settings, which remember it: unmute {app} in the sound "
            "applet (the speaker in the panel, under Applications) while a game plays.")


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
