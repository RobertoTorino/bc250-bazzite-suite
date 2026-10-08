# SPDX-License-Identifier: GPL-3.0-or-later
from __future__ import annotations

from pathlib import Path

from PyQt6.QtWidgets import QWidget

from bc250_core.appinfo import AppInfo
from bc250_core.settings import SettingsStore, open_settings, restore_geometry, save_geometry


def _file(settings) -> Path:
    return Path(settings.fileName())


def test_native_file_matches_old_location(settings_dir, info):
    # QSettings(APP_ID, APP_ID), as governor and helixsr: <config>/<id>/<id>.conf on Linux
    s = open_settings(info)
    assert _file(s).parent.name == info.app_id
    assert _file(s).stem == info.app_id


def test_ini_and_org_override(settings_dir):
    bt = AppInfo("bc250-bazzite-test", "BC-250 Bazzite Test", "0.1.0", settings_ini=True)
    assert _file(open_settings(bt)).name == "bc250-bazzite-test.ini"
    cores = AppInfo("bc250-cores-unlock", "x", "0.1.0", settings_org="bc250-cores-bisect")
    assert _file(open_settings(cores)).parent.name == "bc250-cores-bisect"
    assert _file(open_settings(cores)).stem == "bc250-cores-unlock"


def test_geometry_round_trip(settings_dir, info, qapp):
    s = open_settings(info)
    w = QWidget()
    assert restore_geometry(w, s) is False
    w.resize(640, 480)
    save_geometry(w, s)
    other = QWidget()
    assert restore_geometry(other, s) is True
    assert other.size().width() == 640


class Prefs(SettingsStore):
    DEFAULTS = {"privacy/keep_history": True, "run/duration": 120}


def test_store_types_and_change_signal(settings_dir, info):
    prefs = Prefs(info)
    seen = []
    prefs.changed.connect(seen.append)
    assert prefs.get("run/duration") == 120
    prefs.set("run/duration", 120)                  # unchanged: no signal
    prefs.set("run/duration", 300)
    prefs.set("privacy/keep_history", False)
    again = Prefs(info)
    assert again.get("run/duration") == 300 and isinstance(again.get("run/duration"), int)
    assert again.get("privacy/keep_history") is False
    assert seen == ["run/duration", "privacy/keep_history"]
