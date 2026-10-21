# SPDX-License-Identifier: GPL-3.0-or-later
"""The Game Boy and Game Boy Color games: the cartridge dumps SameBoy plays, with the system from the cartridge's
own header. The header's title is short and in capitals (POKEMON YELLOW), so a game is named after its file.

SameBoy (libretro) plays .gb and .gbc files, as its core info lists them; RetroArch unpacks a .zip for it. What is
one game here:

* a .gb or .gbc file whose header is a Game Boy cartridge's: the header checksum at 0x14D over 0x134 to 0x14C, and
  a ROM size code at 0x148 that matches the file (32 KB times a power of two).
* a .zip with such a file in it: the game, listed under the zip's name. A .zip with anything else (a GBA game, a NES
  game) is not SameBoy Manager's.

The system is the header's colour flag at 0x143: 0xC0 is a Game Boy Color game only, 0x80 a Game Boy game with
colour on a Game Boy Color, anything else a Game Boy game. The file's suffix says nothing: many .gb files are colour
games. Game Boy Advance games (.gba) are mGBA Manager's."""

from __future__ import annotations

import os
import zipfile
from dataclasses import dataclass
from pathlib import Path

MAX_DEPTH = 5
HEADER = 0x150                          # the cartridge header ends at 0x14F
ROM_SUFFIXES = (".gb", ".gbc")
SUFFIXES = ROM_SUFFIXES + (".zip",)
KB32 = 0x8000


@dataclass(frozen=True)
class Game:
    file: Path                          # the .gb, .gbc or .zip
    title: str
    system: str = "GB"                  # GB, or GBC for a colour game (also one that runs on a Game Boy)
    kind: str = "gb"                    # gb, gbc or zip

    @property
    def folder(self) -> Path:
        return self.file.parent


def system(header: bytes, size: int) -> str | None:
    """ "GBC" or "GB" for a Game Boy cartridge of *size* bytes with this header; None when it is none."""
    if len(header) < HEADER or header[0x148] > 8 or size != KB32 << header[0x148]:
        return None
    check = 0
    for byte in header[0x134:0x14D]:
        check = (check - byte - 1) & 0xFF
    if check != header[0x14D]:
        return None
    return "GBC" if header[0x143] in (0x80, 0xC0) else "GB"


def _zipped(path: Path) -> tuple[bytes, int]:
    """The header and size of the first .gb or .gbc in a zip, (b"", 0) when it has none or is no zip."""
    try:
        with zipfile.ZipFile(path) as bundle:
            member = next((m for m in bundle.infolist()
                           if m.filename.lower().endswith(ROM_SUFFIXES) and not m.is_dir()), None)
            if member is None:
                return b"", 0
            with bundle.open(member) as file:
                return file.read(HEADER), member.file_size
    except (OSError, zipfile.BadZipFile, ValueError, NotImplementedError):
        return b"", 0


def read_game(path: Path) -> Game | None:
    """The game in a .gb, .gbc or .zip; None when it is no Game Boy game."""
    kind = path.suffix.lower().lstrip(".")
    if kind == "zip":
        header, size = _zipped(path)
    else:
        try:
            with path.open("rb") as file:
                header = file.read(HEADER)
            size = path.stat().st_size
        except OSError:
            return None
    found = system(header, size)
    if found is None:
        return None
    return Game(path, path.stem, found, kind)


def _found(root: Path, depth: int = MAX_DEPTH):
    """The files that may be games below *root*."""
    try:
        entries = sorted(os.scandir(root), key=lambda e: e.name)
    except OSError:
        return
    for entry in entries:
        if entry.is_file():
            if entry.name.lower().endswith(SUFFIXES):
                yield Path(entry.path)
        elif depth > 0 and entry.is_dir(follow_symlinks=False) and not entry.name.startswith("."):
            yield from _found(Path(entry.path), depth - 1)


def scan(folders: list[Path]) -> list[Game]:
    """Every game below the chosen folders (a game found twice counted once), sorted by title."""
    seen: set[Path] = set()
    games = []
    for path in (p for folder in folders for p in _found(folder)):
        key = path.resolve()
        if key in seen:
            continue
        seen.add(key)
        game = read_game(path)
        if game is not None:
            games.append(game)
    return sorted(games, key=lambda g: (g.title.casefold(), g.system, str(g.file)))
