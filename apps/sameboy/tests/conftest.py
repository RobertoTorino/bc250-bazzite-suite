# SPDX-License-Identifier: GPL-3.0-or-later
"""Shared fixtures: an offscreen QApplication, settings and XDG folders in a temp folder, and Game Boy games made
here: a cartridge of 32 KB with its header (colour flag, ROM size code, checksum), as a .gb or .gbc or inside a .zip."""

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


def gb_bytes(colour: int = 0x00, size_code: int = 0, title: str = "TETRIS") -> bytes:
    """A Game Boy cartridge of 32 KB << *size_code*: the header with its title, colour flag and checksum."""
    data = bytearray(0x8000 << size_code)
    data[0x134:0x134 + len(title)] = title.encode()
    data[0x143] = colour
    data[0x148] = size_code
    check = 0
    for byte in data[0x134:0x14D]:
        check = (check - byte - 1) & 0xFF
    data[0x14D] = check
    return bytes(data)


def make_gb(path: Path, colour: int = 0x00, size_code: int = 0) -> Path:
    """A .gb or .gbc on disk; *path* is the file."""
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_bytes(gb_bytes(colour, size_code))
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
