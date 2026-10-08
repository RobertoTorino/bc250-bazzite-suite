# SPDX-License-Identifier: GPL-3.0-or-later
"""Shared fixtures: bc250_core from the checkout, an offscreen QApplication, and a sandboxed home folder."""

from __future__ import annotations

import os
import sys
from pathlib import Path

import pytest

os.environ.setdefault("QT_QPA_PLATFORM", "offscreen")

SUITE = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(SUITE / "core"))         # the release bundles core; in the checkout it lives beside


@pytest.fixture(scope="session")
def qapp():
    from PyQt6.QtWidgets import QApplication
    app = QApplication.instance() or QApplication([])
    yield app


@pytest.fixture
def home(tmp_path, monkeypatch):
    """HOME and XDG folders inside tmp_path, so detect paths like ~/.local/bin/x resolve there."""
    home = tmp_path / "home"
    (home / ".local" / "bin").mkdir(parents=True)
    for var in ("HOME", "USERPROFILE"):
        monkeypatch.setenv(var, str(home))
    monkeypatch.setenv("XDG_DATA_HOME", str(home / ".local" / "share"))
    monkeypatch.setenv("XDG_CONFIG_HOME", str(home / ".config"))
    return home


@pytest.fixture
def settings_dir(tmp_path, qapp, monkeypatch):
    """QSettings files in tmp_path; on Windows the native format (the registry) is turned into an .ini there."""
    from PyQt6.QtCore import QSettings
    for fmt in (QSettings.Format.NativeFormat, QSettings.Format.IniFormat):
        QSettings.setPath(fmt, QSettings.Scope.UserScope, str(tmp_path / "settings"))
    if sys.platform == "win32":
        import bc250_core.settings as core_settings

        class FileSettings(QSettings):
            def __init__(self, *args):
                if args and isinstance(args[0], str):
                    args = (QSettings.Format.IniFormat, QSettings.Scope.UserScope, *args)
                super().__init__(*args)

        monkeypatch.setattr(core_settings, "QSettings", FileSettings)
    return tmp_path / "settings"
