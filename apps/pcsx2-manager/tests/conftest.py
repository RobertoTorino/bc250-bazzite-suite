# SPDX-License-Identifier: GPL-3.0-or-later
"""Shared fixtures: an offscreen QApplication, settings and XDG folders in a temp folder, and PS2 games made here:
a small ISO 9660 with SYSTEM.CNF in its root, as a PS2 disc names its boot file, and PCSX2's own folder with a
BIOS dump."""

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
    """A small ISO 9660 with *files* in its root directory, as a PS2 DVD holds SYSTEM.CNF."""
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


def system_cnf(boot: str = "cdrom0:\\SLUS_123.45;1", version: str = "1.00") -> bytes:
    return f"BOOT2 = {boot}\r\nVER = {version}\r\nVMODE = NTSC\r\n".encode()


def make_disc(path: Path, serial_file: str = "SLUS_123.45", version: str = "1.00") -> Path:
    """A PS2 disc image on disk: an ISO whose SYSTEM.CNF boots *serial_file*."""
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_bytes(iso_bytes({"SYSTEM.CNF": system_cnf(f"cdrom0:\\{serial_file};1", version)}))
    return path


def make_bios(folder: Path, name: str = "SCPH-70012.bin") -> Path:
    """A BIOS dump in PCSX2's bios folder, with the files a dump brings beside it."""
    folder.mkdir(parents=True, exist_ok=True)
    dump = folder / name
    dump.write_bytes(b"\0" * 64)
    (folder / f"{dump.stem}.nvm").write_bytes(b"\0" * 16)
    return dump


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
