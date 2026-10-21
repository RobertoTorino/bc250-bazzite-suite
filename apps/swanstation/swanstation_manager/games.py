# SPDX-License-Identifier: GPL-3.0-or-later
"""The PS1 games: the disc images SwanStation plays, with the disc ID (SLUS-00594) from the disc itself when the
app can read it. A PS1 disc holds no title, so a game is named after its file.

SwanStation (libretro) plays these, as its core info lists them: CUE sheets (with their BIN files), CHD, PBP, M3U
playlists (a game on several discs), and plain disc images (ISO, IMG, and BIN without a CUE). What is one game here:

* a CUE sheet: the game; the BIN files it names (one per track) are not listed apart. A CUE whose first file is
  not there is no game.
* an M3U playlist: the game, and the discs it names (CUE or CHD files) are not listed apart.
* a CHD, a PBP: the game, listed under its own name (the app does not look into them).
* an ISO, IMG or BIN that is no part of a CUE: a game when it is a PS1 disc (SYSTEM.CNF with a BOOT line); a BIOS
  dump or any other .bin in the folder is not.

The disc ID is the executable's name in SYSTEM.CNF (BOOT = cdrom:\\SLUS_005.94;1), written SLUS-00594 as
the games' databases do. ISO 9660 is read directly, from a cooked image (2048-byte sectors, as an ISO) or a raw one
(2352 bytes per sector, as a BIN: 16 bytes of sync and header, then 8 more in mode 2): the volume descriptor in
sector 16 names the root directory, whose records (length, sector, size, flags, name) lead to SYSTEM.CNF."""

from __future__ import annotations

import os
import re
import struct
from dataclasses import dataclass
from pathlib import Path

MAX_DEPTH = 5
SECTOR = 2048
RAW_SECTOR = 2352
IMAGE_SUFFIXES = (".iso", ".img", ".bin")
LISTED_SUFFIXES = (".cue", ".chd", ".pbp", ".m3u") + IMAGE_SUFFIXES
BOOT = re.compile(r"^\s*BOOT\d?\s*=\s*cdrom:[\\/]*(?:[^\s;]*[\\/])?([A-Z]{4})[_-]?(\d{3})\.?(\d{2})", re.I | re.M)
FILE_LINE = re.compile(r'^\s*FILE\s+(?:"([^"]+)"|(\S+))', re.I | re.M)


@dataclass(frozen=True)
class Game:
    file: Path                          # the CUE, CHD, PBP, M3U or disc image
    title: str
    disc_id: str = ""
    kind: str = "cue"                   # cue, chd, pbp, m3u, iso, img or bin

    @property
    def folder(self) -> Path:
        return self.file.parent


# --- The disc images --------------------------------------------------------------------------------------------

class _Image:
    """A disc image read as the 2048-byte sectors of its ISO 9660 file system, whatever its sector size."""

    def __init__(self, file, stride: int, skip: int):
        self.file, self.stride, self.skip = file, stride, skip

    def read_at(self, offset: int, size: int) -> bytes:
        parts = []
        while size > 0:
            sector, inside = divmod(offset, SECTOR)
            self.file.seek(sector * self.stride + self.skip + inside)
            part = self.file.read(min(size, SECTOR - inside))
            if not part:
                break
            parts.append(part)
            offset += len(part)
            size -= len(part)
        return b"".join(parts)


def _open(file) -> _Image | None:
    """The image with the layout its sector 16 shows (the ISO 9660 volume descriptor: 0x01 "CD001"); None for
    anything else."""
    for stride, skip in ((SECTOR, 0), (RAW_SECTOR, 16), (RAW_SECTOR, 24)):
        file.seek(16 * stride + skip)
        if file.read(6) == b"\x01CD001":
            return _Image(file, stride, skip)
    return None


def _records(image: _Image, sector: int, size: int):
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


def system_cnf(path: Path) -> str | None:
    """The text of SYSTEM.CNF in the root of a disc image; None when there is none or the file is no ISO 9660
    image. OSError is the caller's."""
    with path.open("rb") as file:
        image = _open(file)
        if image is None:
            return None
        pvd = image.read_at(16 * SECTOR, SECTOR)
        if len(pvd) < 190:
            return None
        sector, size = struct.unpack_from("<I", pvd, 158)[0], struct.unpack_from("<I", pvd, 166)[0]
        found = next((r for r in _records(image, sector, min(size, 1 << 20)) if r[0] == "SYSTEM.CNF" and not r[3]),
                     None)
        if found is None:
            return None
        return image.read_at(found[1] * SECTOR, min(found[2], 4096)).decode("ascii", "replace")


def disc_id(text: str) -> str:
    """The disc ID of a SYSTEM.CNF ("SLUS-00594"); "" when it has no BOOT line of a PS1 disc."""
    match = BOOT.search(text)
    return f"{match.group(1).upper()}-{match.group(2)}{match.group(3)}" if match else ""


def read_image(path: Path) -> Game | None:
    """The game in an ISO, IMG or BIN; None when it is no PS1 disc."""
    try:
        text = system_cnf(path)
    except OSError:
        return None
    if text is None or not BOOT.search(text):
        return None
    return Game(path, path.stem, disc_id(text), path.suffix.lower().lstrip("."))


# --- CUE sheets and playlists ------------------------------------------------------------------------------------

def _listed(path: Path) -> list[Path]:
    """The files a CUE sheet or an M3U names, next to it (a path in them is relative to the file); [] when it
    cannot be read."""
    try:
        text = path.read_text(encoding="utf-8", errors="replace")
    except OSError:
        return []
    if path.suffix.lower() == ".cue":
        names = [a or b for a, b in FILE_LINE.findall(text)]
    else:
        names = [line.strip() for line in text.splitlines() if line.strip() and not line.startswith("#")]
    return [path.parent / name.replace("\\", "/") for name in names]


def read_cue(path: Path) -> Game | None:
    """The game of a CUE sheet; None when the first file it names is not there."""
    files = _listed(path)
    if not files or not files[0].is_file():
        return None
    id_ = ""
    if files[0].suffix.lower() in IMAGE_SUFFIXES:
        try:
            id_ = disc_id(system_cnf(files[0]) or "")
        except OSError:
            pass
    return Game(path, path.stem, id_, "cue")


def _read(path: Path) -> Game | None:
    kind = path.suffix.lower().lstrip(".")
    if kind == "cue":
        return read_cue(path)
    if kind in ("chd", "pbp", "m3u"):
        return Game(path, path.stem, kind=kind)
    return read_image(path)


# --- The scan ---------------------------------------------------------------------------------------------------

def _found(root: Path, depth: int = MAX_DEPTH):
    """The files that may be games below *root*."""
    try:
        entries = sorted(os.scandir(root), key=lambda e: e.name)
    except OSError:
        return
    for entry in entries:
        if entry.is_file():
            if entry.name.lower().endswith(LISTED_SUFFIXES):
                yield Path(entry.path)
        elif depth > 0 and entry.is_dir(follow_symlinks=False) and not entry.name.startswith("."):
            yield from _found(Path(entry.path), depth - 1)


def scan(folders: list[Path]) -> list[Game]:
    """Every game below the chosen folders (a game found twice counted once), sorted by title. The files a CUE
    sheet or an M3U names are the game's, not games of their own."""
    paths = [p for folder in folders for p in _found(folder)]
    part_of = set()
    for path in paths:
        if path.suffix.lower() in (".cue", ".m3u"):
            part_of.update(f.resolve() for f in _listed(path))
    seen: set[Path] = set()
    games = []
    for path in paths:
        key = path.resolve()
        if key in seen or key in part_of:
            continue
        seen.add(key)
        game = _read(path)
        if game is not None:
            games.append(game)
    return sorted(games, key=lambda g: (g.title.casefold(), g.disc_id, str(g.file)))
