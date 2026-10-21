# SPDX-License-Identifier: GPL-3.0-or-later
"""Shared fixtures: an offscreen QApplication, settings and XDG folders in a temp folder, and GBA games made here: a
cartridge header with its game code and checksum, as a .gba or inside a .zip."""

from __future__ import annotations

import os
import sys
import zipfile
from pathlib import Path

import pytest

os.environ.setdefault("QT_QPA_PLATFORM", "offscreen")
CORE = Path(__file__).resolve().parents[3] / "core"
if str(CORE) not in sys.path:
    sys.path.insert(0, str(CORE))           # bc250_core from the checkout, as the installer bundles it


def gba_bytes(code: str = "BPEE", title: str = "POKEMON EMER") -> bytes:
    """The first bytes of a GBA cartridge: the header with its title, game code, fixed byte and checksum."""
    data = bytearray(0x200)
    data[0xA0:0xA0 + len(title)] = title.encode()
    data[0xAC:0xB0] = code.encode()
    data[0xB0:0xB2] = b"01"
    data[0xB2] = 0x96
    data[0xBD] = (-(sum(data[0xA0:0xBD]) + 0x19)) & 0xFF
    return bytes(data)


def make_gba(path: Path, code: str = "BPEE") -> Path:
    """A .gba on disk; *path* is the file."""
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_bytes(gba_bytes(code))
    return path


def make_zip(path: Path, members: dict[str, bytes]) -> Path:
    path.parent.mkdir(parents=True, exist_ok=True)
    with zipfile.ZipFile(path, "w") as bundle:
        for name, data in members.items():
            bundle.writestr(name, data)
    return path


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
