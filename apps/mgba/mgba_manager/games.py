# SPDX-License-Identifier: GPL-3.0-or-later
"""The Game Boy Advance games: the cartridge dumps mGBA plays, with the game code (BPEE) from the cartridge's own
header. The header's title is short and in capitals (POKEMON EMER), so a game is named after its file.

mGBA opens a .gba file, and a .zip that holds one (it unpacks it itself). What is one game here:

* a .gba file whose header is a GBA cartridge's: the fixed byte 0x96 at 0xB2 and the header checksum at 0xBD over
  0xA0 to 0xBC. The game code is the four letters at 0xAC.
* a .zip with a .gba file in it whose header is one: the game, listed under the zip's name. A .zip with anything else
  (a Game Boy game, a NES game) is not mGBA Manager's.

Game Boy and Game Boy Color games (.gb, .gbc) are SameBoy Manager's, though mGBA runs them too: a game is in Game Mode
once."""

from __future__ import annotations

import os
import zipfile
from dataclasses import dataclass
from pathlib import Path

MAX_DEPTH = 5
HEADER = 0xC0                           # the cartridge header ends at 0xBF
SUFFIXES = (".gba", ".zip")


@dataclass(frozen=True)
class Game:
    file: Path                          # the .gba or the .zip
    title: str
    code: str = ""                      # the game code in the header: BPEE
    kind: str = "gba"                   # gba or zip

    @property
    def folder(self) -> Path:
        return self.file.parent


def game_code(header: bytes) -> str | None:
    """The game code of a GBA cartridge header ("BPEE", "" when it has none); None when *header* is no GBA
    cartridge's."""
    if len(header) < HEADER or header[0xB2] != 0x96:
        return None
    if (-(sum(header[0xA0:0xBD]) + 0x19)) & 0xFF != header[0xBD]:
        return None
    code = header[0xAC:0xB0].decode("ascii", "replace")
    return code if code.isalnum() else ""


def _zipped_header(path: Path) -> bytes:
    """The header of the first .gba in a zip, b"" when it has none or is no zip."""
    try:
        with zipfile.ZipFile(path) as bundle:
            member = next((m for m in bundle.infolist() if m.filename.lower().endswith(".gba") and not m.is_dir()),
                          None)
            if member is None:
                return b""
            with bundle.open(member) as file:
                return file.read(HEADER)
    except (OSError, zipfile.BadZipFile, ValueError, NotImplementedError):
        return b""


def read_game(path: Path) -> Game | None:
    """The game in a .gba or a .zip; None when it is no GBA game."""
    kind = path.suffix.lower().lstrip(".")
    if kind == "zip":
        header = _zipped_header(path)
    else:
        try:
            with path.open("rb") as file:
                header = file.read(HEADER)
        except OSError:
            return None
    code = game_code(header)
    if code is None:
        return None
    return Game(path, path.stem, code, kind)


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
    return sorted(games, key=lambda g: (g.title.casefold(), g.code, str(g.file)))
