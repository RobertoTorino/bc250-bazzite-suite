# SPDX-License-Identifier: GPL-3.0-or-later
"""Shared fixtures: an offscreen QApplication, settings and XDG folders in a temp folder, and PS1 games made here: a
small ISO 9660 with a SYSTEM.CNF (as an ISO, or as a raw BIN with 2352-byte sectors), CUE sheets, playlists and
RetroArch's folder with a BIOS."""

from __future__ import annotations

import os
import struct
import sys
from pathlib import Path

import pytest

os.environ.setdefault("QT_QPA_PLATFORM", "offscreen")
CORE = Path(__file__).resolve().parents[3] / "core"
if str(CORE) not in sys.path:
    sys.path.insert(0, str(CORE))           # bc250_core from the checkout, as the installer bundles it

SECTOR = 2048
RAW = 2352


def _record(name: bytes, sector: int, size: int, directory: bool) -> bytes:
    """One ISO 9660 directory record, both byte orders in place."""
    length = 33 + len(name)
    length += length % 2
    record = bytearray(length)
    record[0] = length
    struct.pack_into("<I", record, 2, sector)
    struct.pack_into(">I", record, 6, sector)
    struct.pack_into("<I", record, 10, size)
    struct.pack_into(">I", record, 14, size)
    record[25] = 2 if directory else 0
    record[32] = len(name)
    record[33:33 + len(name)] = name
    return bytes(record)


def iso_bytes(files: dict[str, bytes]) -> bytes:
    """A small ISO 9660: the volume descriptor and a root directory holding *files*."""
    sectors: dict[int, bytes] = {}
    root_dir = 18
    at = 19
    records = [_record(b"\0", root_dir, SECTOR, True), _record(b"\x01", root_dir, SECTOR, True)]
    for name, data in files.items():
        records.append(_record(name.encode() + b";1", at, len(data), False))
        for n in range(0, max(len(data), 1), SECTOR):
            sectors[at] = data[n:n + SECTOR]
            at += 1
    sectors[root_dir] = b"".join(records)
    pvd = bytearray(SECTOR)
    pvd[0] = 1
    pvd[1:6] = b"CD001"
    pvd[156:156 + 34] = _record(b"\0", root_dir, SECTOR, True)
    sectors[16] = bytes(pvd)
    sectors[17] = b"\xff" + b"CD001"                    # the terminator
    image = bytearray((max(sectors) + 1) * SECTOR)
    for n, data in sectors.items():
        image[n * SECTOR:n * SECTOR + len(data)] = data
    return bytes(image)


def raw_bytes(iso: bytes, header: int = 16) -> bytes:
    """The ISO as the raw sectors of a BIN: *header* bytes in front (16: mode 1, 24: mode 2), the data, padding."""
    out = bytearray()
    for n in range(0, len(iso), SECTOR):
        out += b"\0" * header + iso[n:n + SECTOR]
        out += b"\0" * (RAW - len(out) % RAW if len(out) % RAW else 0)
    return bytes(out)


def system_cnf(disc_id: str = "SLUS_005.94") -> bytes:
    return f"BOOT = cdrom:\\{disc_id};1\r\nTCB = 4\r\nEVENT = 10\r\nSTACK = 801FFF00\r\n".encode()


def make_disc(path: Path, title: str = "Game", disc_id: str = "SLUS_005.94", raw: int = 0) -> Path:
    """A disc image on disk, ISO or (with *raw*: the header size) BIN, named after *title* when *path* is a folder."""
    if path.suffix == "":
        path = path / f"{title}.iso"
    path.parent.mkdir(parents=True, exist_ok=True)
    iso = iso_bytes({"SYSTEM.CNF": system_cnf(disc_id), "SLUS_005.94": b"\0" * 16})
    path.write_bytes(raw_bytes(iso, raw) if raw else iso)
    return path


def make_cue(folder: Path, title: str, disc_id: str = "SLUS_005.94", tracks: int = 1) -> Path:
    """A CUE sheet with *tracks* BIN files (the first one a PS1 disc); returns the CUE."""
    folder.mkdir(parents=True, exist_ok=True)
    lines = []
    for n in range(1, tracks + 1):
        name = f"{title} (Track {n}).bin"
        if n == 1:
            make_disc(folder / name, disc_id=disc_id, raw=16)
        else:
            (folder / name).write_bytes(b"\0" * RAW)
        lines += [f'FILE "{name}" BINARY', f"  TRACK {n:02d} {'MODE2/2352' if n == 1 else 'AUDIO'}",
                  "    INDEX 01 00:00:00"]
    cue = folder / f"{title}.cue"
    cue.write_text("\n".join(lines) + "\n")
    return cue


def make_retroarch(home: Path, bios: tuple[str, ...] = ()) -> Path:
    """RetroArch's folder as the Flatpak leaves it, with the BIOS files named."""
    (home / "system").mkdir(parents=True, exist_ok=True)
    for name in bios:
        (home / "system" / name).write_bytes(b"\0" * 512)
    return home


@pytest.fixture(scope="session")
def qapp():
    from PyQt6.QtWidgets import QApplication
    app = QApplication.instance() or QApplication([])
    yield app


@pytest.fixture(autouse=True)
def settings_dir(tmp_path, monkeypatch):
    """The app keeps an .ini (AppInfo.settings_ini), so this also keeps the tests out of the Windows registry."""
    from PyQt6.QtCore import QSettings
    QSettings.setPath(QSettings.Format.IniFormat, QSettings.Scope.UserScope, str(tmp_path / "settings"))
    monkeypatch.setenv("XDG_CONFIG_HOME", str(tmp_path / "config"))
    monkeypatch.setenv("XDG_DATA_HOME", str(tmp_path / "data"))
    monkeypatch.setenv("XDG_CURRENT_DESKTOP", "KDE")
    return tmp_path / "settings"
