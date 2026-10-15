# SPDX-License-Identifier: GPL-3.0-or-later
"""Shared fixtures: an offscreen QApplication, settings and XDG folders in a temp folder, and a folder of
synthetic PSP ISO images (iso_builder.py), since no game image can ship with the tests."""

from __future__ import annotations

import os
import sys
from pathlib import Path

import pytest

os.environ.setdefault("QT_QPA_PLATFORM", "offscreen")
APP_ROOT = Path(__file__).resolve().parents[1]
CORE = Path(__file__).resolve().parents[3] / "core"
if str(CORE) not in sys.path:
    sys.path.insert(0, str(CORE))           # bc250_core from the checkout, as the installer bundles it
for folder in (APP_ROOT, Path(__file__).resolve().parent):
    if str(folder) not in sys.path:
        sys.path.insert(0, str(folder))


@pytest.fixture(scope="session")
def qapp():
    from PyQt6.QtWidgets import QApplication
    app = QApplication.instance() or QApplication(["bazzite-umd-file-renamer-test"])
    yield app


@pytest.fixture(autouse=True)
def settings_dir(tmp_path, monkeypatch):
    """The app keeps an .ini, so this keeps the tests out of the user's settings (and the Windows registry)."""
    from PyQt6.QtCore import QSettings
    QSettings.setPath(QSettings.Format.IniFormat, QSettings.Scope.UserScope, str(tmp_path / "settings"))
    monkeypatch.setenv("XDG_CONFIG_HOME", str(tmp_path / "config"))
    monkeypatch.setenv("XDG_DATA_HOME", str(tmp_path / "data"))
    return tmp_path / "settings"


@pytest.fixture
def games_dir(tmp_path):
    """Three PSP images with awkward names, one image without PARAM.SFO, one file that is not an ISO."""
    from iso_builder import build_iso, psp_tree, tiny_png
    folder = tmp_path / "games"
    folder.mkdir()
    build_iso(folder / "ever17.iso", psp_tree("Ever17", "ULJM05437", "1.01", "3.95",
                                             icon0=tiny_png(), pic0=tiny_png(8, 4), pic1=tiny_png(16, 8)))
    build_iso(folder / "download (1).iso", psp_tree("Crisis Core: Final Fantasy VII™", "ULUS10336",
                                                   "1.00", "3.71", icon0=tiny_png()))
    build_iso(folder / "ridge.ISO", psp_tree("RIDGE RACER", "UCUS98604", "1.01", "1.00"))
    build_iso(folder / "not-psp.iso", {"README.TXT": b"nothing to see"})
    (folder / "notes.txt").write_text("not an image", encoding="utf-8")
    return folder
