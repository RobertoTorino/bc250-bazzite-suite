# SPDX-License-Identifier: GPL-3.0-or-later
"""Shared fixtures: an offscreen QApplication, settings and XDG folders in a temp folder, and PS4 game folders made
here: a param.sfo written in the PS4's layout, with the fields a game has."""

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


def make_sfo(fields: dict[str, str | int]) -> bytes:
    """A param.sfo: header, one 16-byte index entry per field, the key table, then the data table."""
    keys = b"".join(name.encode() + b"\0" for name in fields)
    keys += b"\0" * (-len(keys) % 4)
    index, data, key_at = b"", b"", 0
    for name, value in fields.items():
        if isinstance(value, int):
            raw, kind, room = struct.pack("<I", value), 0x0404, 4
        else:
            raw = value.encode() + b"\0"
            kind, room = 0x0204, len(raw) + (-len(raw) % 4)
        index += struct.pack("<HHIII", key_at, kind, len(raw), room, len(data))
        data += raw + b"\0" * (room - len(raw))
        key_at += len(name) + 1
    key_start = 20 + len(index)
    return b"\0PSF" + struct.pack("<4I", 0x101, key_start, key_start + len(keys), len(fields)) + index + keys + data


def make_game(folder: Path, title: str | None = None, title_id: str = "CUSA00001", version: str = "01.00",
              category: str = "gd", pictures: bool = False) -> Path:
    """A game folder with eboot.bin and, unless *title* is None, sce_sys/param.sfo. Returns eboot.bin."""
    (folder / "sce_sys").mkdir(parents=True)
    eboot = folder / "eboot.bin"
    eboot.write_bytes(b"\x7fELF")
    if title is not None:
        (folder / "sce_sys" / "param.sfo").write_bytes(make_sfo(
            {"APP_VER": version, "ATTRIBUTE": 0, "CATEGORY": category, "TITLE": title, "TITLE_ID": title_id}))
    if pictures:
        from PyQt6.QtGui import QColor, QImage
        for name, size, colour in (("icon0.png", (512, 512), "#ff0000"), ("pic1.png", (1920, 1080), "#00ff00")):
            image = QImage(*size, QImage.Format.Format_ARGB32)
            image.fill(QColor(colour))
            image.save(str(folder / "sce_sys" / name))
    return eboot


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
