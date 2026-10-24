# SPDX-License-Identifier: GPL-3.0-or-later
"""The Settings tab: RPCS3's settings that matter for playing, in the app (owner, 24-10-2026: the picture settings
PCSX2 Manager has, at least). One box per group (rpcs3_settings.SETTINGS: the picture, the emulation, the sound,
the messages in a game), each setting a choice, a switch or a percentage, read from config.yml and written the
moment it is changed, while RPCS3 does not run. Built as PCSX2 Manager's settings_page. The Sound box also shows,
beside RPCS3's volume, the volume Bazzite's sound settings remember for RPCS3 (muted there, a game plays without
a sound; found on the board, 24-10-2026): read only, the window passes it (show_sound)."""

from __future__ import annotations

import logging
from collections.abc import Callable
from pathlib import Path

from PyQt6.QtCore import Qt
from PyQt6.QtWidgets import (QCheckBox, QComboBox, QFormLayout, QGridLayout, QGroupBox, QHBoxLayout, QLabel,
                             QSpinBox, QVBoxLayout, QWidget)

from bc250_core import sound
from bc250_core.widgets import hint_label

from . import rpcs3_settings, userdata
from .rpcs3_settings import CHOICE, PERCENT, SWITCH, Setting

RUNNING = "RPCS3 is running: close it first, it writes its own settings over the change when it closes."
STREAM = "RPCS3"                        # RPCS3's sound stream, as PipeWire names it (core's sound)
SOUND_TIP = sound.tip(STREAM)
SOUND_MUTED = sound.muted_text(STREAM)
SOUND_DOWN = sound.down_text(STREAM)


class SettingsPage(QWidget):
    """*rpcs3_home*: RPCS3's own folder; *running*: whether RPCS3 runs (tests pass their own); *log*: the app's
    log."""

    def __init__(self, rpcs3_home: Path, running: Callable[[], bool] = userdata.rpcs3_running,
                 log: logging.Logger | None = None, parent=None):
        super().__init__(parent)
        self.rpcs3_home = rpcs3_home
        self.running = running
        self.log = log or logging.getLogger(__name__)
        self.widgets: dict[str, QWidget] = {}
        self.status = QLabel()
        self.status.setWordWrap(True)
        self.status.setTextInteractionFlags(Qt.TextInteractionFlag.TextSelectableByMouse)

        # The picture's box on the left, the whole height; the three others under each other on the right (as
        # PCSX2 Manager's).
        groups: dict[str, QFormLayout] = {}
        grid = QGridLayout()
        grid.setHorizontalSpacing(14)
        others = (rpcs3_settings.EMULATION, rpcs3_settings.SOUND, rpcs3_settings.MESSAGES)
        for n, name in enumerate((rpcs3_settings.PICTURE, *others)):
            box = QGroupBox(name)
            form = QFormLayout(box)
            form.setLabelAlignment(Qt.AlignmentFlag.AlignRight)
            groups[name] = form
            if n == 0:
                grid.addWidget(box, 0, 0, len(others), 1, Qt.AlignmentFlag.AlignTop)
            else:
                grid.addWidget(box, n - 1, 1, Qt.AlignmentFlag.AlignTop)
        grid.setColumnStretch(0, 1)
        grid.setColumnStretch(1, 1)
        self.system_sound = QLabel("—")             # Bazzite's volume for RPCS3, read only (show_sound)
        self.system_sound.setToolTip(SOUND_TIP)
        for setting in rpcs3_settings.SETTINGS:
            widget = self._widget(setting)
            widget.setToolTip(setting.tip)
            self.widgets[setting.key] = widget
            label = QLabel(setting.label)
            label.setToolTip(setting.tip)
            field: QWidget = widget
            if setting.key == "volume":             # beside RPCS3's volume, on the same row (the tab's height)
                field = QWidget()
                row = QHBoxLayout(field)
                row.setContentsMargins(0, 0, 0, 0)
                row.setSpacing(8)
                row.addWidget(widget)
                system_label = QLabel("Bazzite's volume for RPCS3:")
                system_label.setToolTip(SOUND_TIP)
                row.addWidget(system_label)
                row.addWidget(self.system_sound)
                row.addStretch(1)
            groups[setting.group].addRow(label, field)

        lay = QVBoxLayout(self)
        lay.setContentsMargins(0, 8, 0, 0)
        lay.addWidget(hint_label("RPCS3's settings, written into RPCS3's own settings file the moment you change "
                                 "one, while RPCS3 does not run. A game's own settings in RPCS3 come before these. "
                                 "How a game fills the screen is set per game, in the Your games tab.",
                                 follow_height=True))        # its lines count in the page's minimum
        lay.addLayout(grid)
        lay.addStretch(1)
        lay.addWidget(self.status)
        self.load()

    def show_sound(self, state: tuple[float, bool] | None) -> tuple[str, bool]:
        """*state*: (volume, muted) as Bazzite remembers it for RPCS3, None while it has none (RPCS3 has not played
        yet). Returns (what is wrong in words, whether something is: muted, or turned down to nothing)."""
        text, problem = sound.describe(STREAM, state)
        self.system_sound.setStyleSheet("font-weight:600;color:#c62828;" if problem else "")
        self.system_sound.setText(text)
        return problem, bool(problem)

    def _widget(self, setting: Setting) -> QWidget:
        if setting.kind == CHOICE:
            box = QComboBox()
            for value, text in setting.choices:
                box.addItem(text, value)
            box.currentIndexChanged.connect(lambda _i, s=setting, b=box: self.change(s, b.currentData()))
            return box
        if setting.kind == PERCENT:
            spin = QSpinBox()
            spin.setRange(0, setting.top)
            spin.setSuffix(" %")
            spin.valueChanged.connect(lambda value, s=setting: self.change(s, str(value)))
            return spin
        check = QCheckBox()
        check.toggled.connect(lambda on, s=setting: self.change(s, "true" if on else "false"))
        return check

    def load(self) -> None:
        """The values as config.yml holds them (or RPCS3's defaults while there is none)."""
        values = rpcs3_settings.read_settings(self.rpcs3_home)
        for setting in rpcs3_settings.SETTINGS:
            widget = self.widgets[setting.key]
            value = values[setting.key]
            widget.blockSignals(True)
            if isinstance(widget, QComboBox):
                at = widget.findData(value)
                if at < 0 and value:                        # a value RPCS3 knows and the app does not: shown as is
                    widget.addItem(value, value)
                    at = widget.count() - 1
                widget.setCurrentIndex(max(at, 0))
            elif isinstance(widget, QSpinBox):
                try:
                    widget.setValue(int(float(value)))
                except ValueError:
                    widget.setValue(int(setting.default))
            elif isinstance(widget, QCheckBox):
                widget.setChecked(value == "true")
            widget.blockSignals(False)

    def shown(self, setting: Setting, value: str) -> str:
        """A value in words, for the status and the log."""
        if setting.kind == CHOICE:
            return next((text for v, text in setting.choices if v == value), value)
        if setting.kind == PERCENT:
            return f"{value} %"
        return "on" if value == "true" else "off"

    def change(self, setting: Setting, value: str) -> None:
        if self.running():
            self.status.setStyleSheet("font-weight:600;color:#c62828;")
            self.status.setText(RUNNING)
            self.load()
            return
        try:
            rpcs3_settings.write_setting(self.rpcs3_home, setting, value)
        except OSError as error:
            self.status.setStyleSheet("font-weight:600;color:#c62828;")
            self.status.setText(f"{setting.label} was not changed: {error}")
            self.log.error("Settings: %s was not changed: %s", setting.label, error)
            return
        text = f"{setting.label}: {self.shown(setting, value)}."
        self.status.setStyleSheet("")
        self.status.setText(text)
        self.log.info("Settings: %s", text)
