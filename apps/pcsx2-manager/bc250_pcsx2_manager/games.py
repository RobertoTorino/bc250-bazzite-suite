# SPDX-License-Identifier: GPL-3.0-or-later
"""The PS2 games: disc images in the chosen folders. An ISO (plain ISO 9660, as a PS2 DVD is laid out) is read for
its serial and version: SYSTEM.CNF in the disc's root says which program the console boots
(BOOT2 = cdrom0:\\SLUS_123.45;1), and that name is the game's serial. The title is the file's own name: a PS2 disc
carries no title or pictures the way a PSP or PS3 disc does (PCSX2's own window knows the titles from its
catalogue). A CHD, CSO, ZSO or GZ holds the same disc compressed; the app does not look into those formats and
lists the file under its own name. PCSX2 plays them all the same.

ISO 9660 is read directly: the volume descriptor in sector 16 names the root directory, whose records (length,
sector, size, flags, name, each little-endian where both byte orders are stored) lead to SYSTEM.CNF."""

from __future__ import annotations

import os
import re
import struct
from dataclasses import dataclass
from pathlib import Path

MAX_DEPTH = 5
DISC_SUFFIXES = (".iso", ".chd", ".cso", ".zso", ".gz")
READ_SUFFIXES = (".iso",)
SECTOR = 2048
# "BOOT2 = cdrom0:\SLUS_123.45;1" (a CD boots with BOOT instead); the serial is the file's name.
_BOOT = re.compile(r"BOOT2?\s*=\s*cdrom0:\\?([^\s;]+)", re.IGNORECASE)
_VER = re.compile(r"VER\s*=\s*(\S+)", re.IGNORECASE)


@dataclass(frozen=True)
class Game:
    file: Path                          # the disc image
    title: str                          # the file's name
    serial: str = ""                    # SLUS-12345, as PCSX2 shows it
    version: str = ""
    kind: str = "iso"                   # iso, chd, cso, zso or gz

    @property
    def folder(self) -> Path:
        return self.file.parent


class _Iso:
    def __init__(self, file):
        self.file = file

    def read_at(self, offset: int, size: int) -> bytes:
        self.file.seek(offset)
        return self.file.read(size)


def _records(image, sector: int, size: int):
    """The records of one ISO 9660 directory: (name, sector, size, is a directory)."""
    data = image.read_at(sector * SECTOR, size)
    at = 0
    while at + 33 <= len(data):
        length = data[at]
        if length == 0:                                 # the rest of this sector is empty: the next one
            at = (at // SECTOR + 1) * SECTOR
            continue
        extent = struct.unpack_from("<I", data, at + 2)[0]
        file_size = struct.unpack_from("<I", data, at + 10)[0]
        flags, name_len = data[at + 25], data[at + 32]
        name = data[at + 33:at + 33 + name_len].decode("ascii", "replace").partition(";")[0]
        if name not in ("\0", "\x01"):                  # . and ..
            yield name.upper(), extent, file_size, bool(flags & 2)
        at += length


def _find(image, parts: tuple[str, ...]) -> bytes | None:
    """The file at /parts[0]/parts[1]/... in the image; None when the path is not there or it is no ISO 9660."""
    pvd = image.read_at(16 * SECTOR, SECTOR)
    if len(pvd) < 190 or pvd[0] != 1 or pvd[1:6] != b"CD001":
        return None
    sector, size = struct.unpack_from("<I", pvd, 158)[0], struct.unpack_from("<I", pvd, 166)[0]
    for depth, wanted in enumerate(parts):
        found = next((r for r in _records(image, sector, size) if r[0] == wanted.upper()), None)
        if found is None or found[3] != (depth < len(parts) - 1):
            return None
        _name, sector, size, _directory = found
    return image.read_at(sector * SECTOR, size)


def iso_file(path: Path, parts: tuple[str, ...]) -> bytes | None:
    """One file out of an ISO; None when it is not there. OSError is the caller's."""
    with path.open("rb") as file:
        try:
            return _find(_Iso(file), parts)
        except (ValueError, struct.error, EOFError):
            return None


def serial_of(boot: str) -> str:
    """The boot file's name as PCSX2 shows a serial: SLUS_123.45 (after any folders) becomes SLUS-12345."""
    name = boot.replace("\\", "/").rsplit("/", 1)[-1]
    return name.replace("_", "-").replace(".", "")


def read_system_cnf(data: bytes) -> tuple[str, str]:
    """(serial, version) from a SYSTEM.CNF; ("", "") when it names no boot file."""
    text = data.decode("ascii", "replace")
    boot = _BOOT.search(text)
    if not boot:
        return "", ""
    version = _VER.search(text)
    return serial_of(boot.group(1)), version.group(1) if version else ""


def read_disc(path: Path) -> Game | None:
    """The game of a disc image: an ISO read for its SYSTEM.CNF, the compressed formats under their own name; None
    when the file is not there. An ISO without a SYSTEM.CNF (not a PS2 disc) is no game."""
    kind = path.suffix.lower().lstrip(".")
    if not path.is_file():
        return None
    if kind != "iso":
        return Game(path, path.stem, kind=kind)
    try:
        data = iso_file(path, ("SYSTEM.CNF",))
    except OSError:
        return None
    if data is None:
        return None
    serial, version = read_system_cnf(data)
    if not serial:
        return None
    return Game(path, path.stem, serial, version, "iso")


def _found(root: Path, depth: int = MAX_DEPTH):
    """The disc images below *root*."""
    try:
        entries = sorted(os.scandir(root), key=lambda e: e.name)
    except OSError:
        return
    for entry in entries:
        if entry.is_file():
            if entry.name.lower().endswith(DISC_SUFFIXES):
                yield Path(entry.path)
        elif depth > 0 and entry.is_dir(follow_symlinks=False) and not entry.name.startswith("."):
            yield from _found(Path(entry.path), depth - 1)


def scan(folders: list[Path]) -> list[Game]:
    """Every game below the chosen folders (a game found twice counted once), sorted by title."""
    seen: set[Path] = set()
    games = []
    for folder in folders:
        for path in _found(folder):
            key = path.resolve()
            if key in seen:
                continue
            seen.add(key)
            game = read_disc(path)
            if game is not None:
                games.append(game)
    return sorted(games, key=lambda g: (g.title.casefold(), g.serial, str(g.file)))
