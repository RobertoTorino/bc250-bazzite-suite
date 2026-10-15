# SPDX-License-Identifier: GPL-3.0-or-later
"""A Steam shortcut per game, for Game Mode: a non-Steam game that runs the run wrapper with PCSX2's launch line,
the game alone and full screen (bc250-pcsx2-run -nogui -fullscreen -- "<game>"; -nogui also makes PCSX2 exit when
the game does).

The file and its format are core's (bc250_core.steam). The shortcut runs the wrapper, not the AppImage, so its
Steam number (from the program and the name) stays the same when the app brings another PCSX2. A PS2 disc carries
no pictures, so the artwork is drawn: the game's title and the app's name on a dark background (the owner's images
come later)."""

from __future__ import annotations

import shlex
from collections.abc import Iterable
from pathlib import Path

from bc250_core import steam

from .games import Game

RUN = "~/.local/bin/bc250-pcsx2-run"
RUN_NAME = "bc250-pcsx2-run"
TAGS = ("PS2", "PCSX2 Manager")
PREFIX = f"[{TAGS[0]}] "    # before each name, so the same title on another system or on Steam itself is told apart


def launch_options(game: Game) -> str:
    """Steam's usual form, the path in double quotes; a path with a character that is special inside them gets
    single quotes instead."""
    path = str(game.file)
    quoted = f'"{path}"' if not any(c in path for c in '"$`\\') else shlex.quote(path)
    return f"-nogui -fullscreen -- {quoted}"


def _file(item: dict) -> str:
    """The game a shortcut of this app starts ("" for any other shortcut): the last word of its launch options,
    after -nogui."""
    if not str(item.get("Exe", "")).strip('"').endswith(RUN_NAME):
        return ""
    try:
        words = shlex.split(str(item.get("LaunchOptions", "")))
    except ValueError:
        return ""
    if "-nogui" not in words[:-1] or not words[-1] or words[-1].startswith("-"):
        return ""
    return words[-1]


def ours(item: dict) -> bool:
    """Any shortcut this app made."""
    return bool(_file(item))


def for_game(game: Game):
    """Recognises the game's shortcut, whatever its name now."""
    return lambda item: _file(item) == str(game.file)


def names(games: Iterable[Game]) -> dict[Path, str]:
    """The name in Steam per game: the system and its title ("[PS2] Title"), with its serial when two games have
    the same title (Steam numbers a shortcut by its program and name, so two names must differ)."""
    games = list(games)
    titles = [g.title for g in games]
    return {g.file: PREFIX + (g.title if titles.count(g.title) == 1 or not g.serial
                              else f"{g.title} ({g.serial})")
            for g in games}


def entry(game: Game, name: str, run: Path, logo: Path) -> dict:
    return steam.shortcut_entry(f'"{run}"', name, f'"{run.parent}/"', str(logo), launch_options(game), TAGS)


def in_steam(folder: Path) -> dict[str, str]:
    """The game files that have a shortcut of this app, for any Steam user, with the shortcut's name."""
    return {_file(item): str(item.get("AppName", "")) for item in steam.shortcuts(folder) if ours(item)}


def changes(add: Iterable[Game], remove: Iterable[Game], run: Path, logo: Path, existing: dict[str, str],
            art: bool = True) -> list[steam.Change]:
    """The changes for core's write_shortcuts: the games to add (or bring up to date) and to take out. The names
    are made unique over the games added; a shortcut taken out is named as in Steam (*existing*, from in_steam()),
    so its artwork, numbered by the name, goes too."""
    add, remove = list(add), list(remove)
    named = names(add)
    result = [steam.Change(entry(g, named[g.file], run, logo), for_game(g), draw_art(g) if art else {})
              for g in add]
    result += [steam.Change(entry(g, existing.get(str(g.file), g.title), run, logo), for_game(g), remove=True)
               for g in remove]
    return result


# --- The artwork -----------------------------------------------------------------------------------------------

def draw_art(game: Game) -> dict[str, bytes]:
    """The portrait, the wide picture and the banner as PNG bytes: the game's title and "PCSX2 Manager" on a dark
    background. The owner decides the real artwork later; a PS2 disc gives none of its own."""
    from PyQt6.QtCore import QRectF, Qt
    from PyQt6.QtGui import QColor, QFont, QImage, QLinearGradient, QPainter

    images = {}
    for suffix in ("p", "", "_hero"):
        width, height = steam.ART[suffix]
        image = QImage(width, height, QImage.Format.Format_ARGB32)
        painter = QPainter(image)
        painter.setRenderHint(QPainter.RenderHint.Antialiasing)
        gradient = QLinearGradient(0, 0, 0, height)
        gradient.setColorAt(0, QColor("#0b3540"))
        gradient.setColorAt(1, QColor("#04111a"))
        painter.fillRect(0, 0, width, height, gradient)
        font = QFont()
        font.setBold(True)
        painter.setPen(QColor("#ffffff"))
        if suffix != "_hero":
            font.setPixelSize(int(width * (0.08 if suffix == "p" else 0.05)))
            painter.setFont(font)
            painter.drawText(QRectF(width * 0.05, height * 0.2, width * 0.9, height * 0.5),
                             Qt.AlignmentFlag.AlignCenter | Qt.TextFlag.TextWordWrap, game.title)
        font.setPixelSize(int(height * (0.045 if suffix == "p" else 0.08)))
        painter.setFont(font)
        painter.setPen(QColor(255, 255, 255, 180))
        painter.drawText(QRectF(0, height * 0.78, width, height * 0.15), Qt.AlignmentFlag.AlignCenter,
                         "PCSX2 Manager")
        painter.end()
        images[suffix] = _png(image)
    return images


def _png(image) -> bytes:
    from PyQt6.QtCore import QBuffer, QByteArray, QIODevice
    data = QByteArray()
    buffer = QBuffer(data)
    buffer.open(QIODevice.OpenModeFlag.WriteOnly)
    image.save(buffer, "PNG")
    return bytes(data)
