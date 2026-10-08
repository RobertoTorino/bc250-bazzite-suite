# SPDX-License-Identifier: GPL-3.0-or-later
"""QSettings for an app, opened at the file the app has always used, plus window-geometry helpers.

The org/app pair comes from AppInfo (settings_org/settings_app, default app_id), so moving an app onto core does
not move its settings file:
  governor, helixsr      QSettings(APP_ID, APP_ID)                          ~/.config/<id>/<id>.conf
  bazzite-test           QSettings(IniFormat, UserScope, APP_ID, APP_ID)    ~/.config/<id>/<id>.ini
  bisect/unlock GUIs     bare QSettings() with org/app set on the app       ~/.config/<org>/<app>.conf"""

from __future__ import annotations

from typing import Any, ClassVar

from PyQt6.QtCore import QObject, QSettings, pyqtSignal
from PyQt6.QtWidgets import QWidget

from .appinfo import AppInfo

GEOMETRY_KEY = "window/geometry"


def open_settings(info: AppInfo, parent: QObject | None = None) -> QSettings:
    if info.settings_ini:
        return QSettings(QSettings.Format.IniFormat, QSettings.Scope.UserScope, info.org, info.settings_name, parent)
    return QSettings(info.org, info.settings_name, parent)


def restore_geometry(widget: QWidget, settings: QSettings, key: str = GEOMETRY_KEY) -> bool:
    """Restore a window's saved geometry; False (and the window's own default size) when nothing usable is saved."""
    geometry = settings.value(key)
    return geometry is not None and widget.restoreGeometry(geometry)


def save_geometry(widget: QWidget, settings: QSettings, key: str = GEOMETRY_KEY) -> None:
    settings.setValue(key, widget.saveGeometry())


class SettingsStore(QObject):
    """Typed preferences with defaults, as bazzite-test's AppSettings: subclasses list DEFAULTS, get() returns a
    value of the default's type, set() writes, syncs and emits changed(key) only when the value really changes."""

    changed = pyqtSignal(str)       # key

    DEFAULTS: ClassVar[dict[str, Any]] = {}

    def __init__(self, info: AppInfo, parent: QObject | None = None):
        super().__init__(parent)
        self._s = open_settings(info, self)

    @property
    def qsettings(self) -> QSettings:
        return self._s

    def get(self, key: str):
        default = self.DEFAULTS[key]
        return self._s.value(key, default, type=type(default))

    def set(self, key: str, value) -> None:
        if self.get(key) != value:
            self._s.setValue(key, value)
            self._s.sync()
            self.changed.emit(key)

    # Window layout: saved on quit, not announced through `changed`.
    def window_state(self, key: str):
        return self._s.value(f"window/{key}")

    def set_window_state(self, key: str, value) -> None:
        self._s.setValue(f"window/{key}", value)

    def sync(self) -> None:
        self._s.sync()
