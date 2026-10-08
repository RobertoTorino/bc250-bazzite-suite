# SPDX-License-Identifier: GPL-3.0-or-later
"""Per-game launch option generator for the governor's cyan-skillfish-performance-mode wrapper.

The wrapper takes exactly one option, runs the command and sets Enabled=false on exit, which puts the
governor back on its start-up range. So every mode below is reverted when the game closes."""

from __future__ import annotations

from PyQt6.QtCore import QCoreApplication, Qt, QT_TRANSLATE_NOOP, QTimer, pyqtSignal
from PyQt6.QtWidgets import (
    QApplication, QButtonGroup, QComboBox, QDoubleSpinBox, QGridLayout, QGroupBox, QHBoxLayout, QLabel, QLineEdit,
    QRadioButton, QSpinBox, QVBoxLayout, QWidget,
)

from .backends.base import PerformanceState
from .widgets import ACCENT, GREEN, RED, accent_button, hint_label

WRAPPER = "cyan-skillfish-performance-mode"
FREQ_STEP = 25
FREQ_LIMIT = 3000

# Captions and tips are marked for extraction here and translated at the point of use; the keys and the
# "{cmd}"-style templates are not user-visible text and stay as-is.
MODES = (
    ("on", QT_TRANSLATE_NOOP("launch_options", "Performance mode"),
     QT_TRANSLATE_NOOP("launch_options", "Whole safe-points range, faster reaction to load. Same as the On "
                       "button.")),
    ("fixed", QT_TRANSLATE_NOOP("launch_options", "Fixed clock"),
     QT_TRANSLATE_NOOP("launch_options", "--fixed-frequency: pin the GPU clock for this game (must lie in the "
                       "allowed range).")),
    ("range", QT_TRANSLATE_NOOP("launch_options", "Clock range"),
     QT_TRANSLATE_NOOP("launch_options", "--range: a temporary min/max, 0 = no limit.")),
    ("load", QT_TRANSLATE_NOOP("launch_options", "Load target"),
     QT_TRANSLATE_NOOP("launch_options", "--load-target: lower/upper GPU load that drives up- and "
                       "downclocking.")),
    ("temp", QT_TRANSLATE_NOOP("launch_options", "Temperature"),
     QT_TRANSLATE_NOOP("launch_options", "--temperature: throttle / recovery thresholds in °C.")),
)

TARGETS = (
    ("steam", QT_TRANSLATE_NOOP("launch_options", "Steam launch options"), "{cmd} %command%",
     QT_TRANSLATE_NOOP("launch_options", "Steam → game → Properties → General → Launch options. Paste the "
                       "whole line.")),
    ("heroic", QT_TRANSLATE_NOOP("launch_options", "Heroic / Lutris wrapper"), "{cmd}",
     QT_TRANSLATE_NOOP("launch_options", "Heroic: game settings → Advanced → Wrapper command. Lutris: Runner "
                       "options → Command prefix. Only the wrapper part is needed; the launcher appends the "
                       "game itself.")),
    ("shell", QT_TRANSLATE_NOOP("launch_options", "Terminal / script"), "{cmd} <program>",
     QT_TRANSLATE_NOOP("launch_options", "Replace <program> with the command to run.")),
)


class LaunchOptionsBox(QGroupBox):
    """Builds the launch option line; prefilled from the runtime state when it arrives."""

    generated = pyqtSignal(str)

    def __init__(self, parent: QWidget | None = None):
        super().__init__(self.tr("Per game"), parent)
        layout = QVBoxLayout(self)
        layout.addWidget(hint_label(
            self.tr("The governor ships a wrapper that applies one of these settings for a single program and "
                   "turns performance mode off again when it exits, which also restores the normal range. Pick "
                   "what the game should get, copy the line into its launcher.")))

        grid = QGridLayout()
        grid.setHorizontalSpacing(12)
        grid.setVerticalSpacing(6)
        self.group = QButtonGroup(self)
        self.radios: dict[str, QRadioButton] = {}
        self.inputs: dict[str, QWidget] = {}
        for row, (key, caption, tip) in enumerate(MODES):
            radio = QRadioButton(QCoreApplication.translate("launch_options", caption))
            radio.setToolTip(QCoreApplication.translate("launch_options", tip))
            self.group.addButton(radio)
            self.radios[key] = radio
            grid.addWidget(radio, row, 0)
            editor = self._editor(key)
            if editor is not None:
                self.inputs[key] = editor
                grid.addWidget(editor, row, 1)
        grid.setColumnStretch(2, 1)
        layout.addLayout(grid)
        self.radios["on"].setChecked(True)
        self.group.buttonToggled.connect(lambda *_: self._refresh())

        target_row = QHBoxLayout()
        target_row.addWidget(QLabel(self.tr("For:")))
        self.target = QComboBox()
        for key, caption, _template, tip in TARGETS:
            self.target.addItem(QCoreApplication.translate("launch_options", caption), key)
            self.target.setItemData(self.target.count() - 1, QCoreApplication.translate("launch_options", tip),
                                    Qt.ItemDataRole.ToolTipRole)
        self.target.currentIndexChanged.connect(self._refresh)
        target_row.addWidget(self.target)
        target_row.addStretch(1)
        layout.addLayout(target_row)

        output_row = QHBoxLayout()
        self.output = QLineEdit()
        self.output.setReadOnly(True)
        self.output.setStyleSheet("font-family:monospace;")
        self.copy_button = accent_button(self.tr("Copy"), self.tr("Copy the line to the clipboard."))
        self._copy_style = self.copy_button.styleSheet()
        self.copy_button.clicked.connect(self._copy)
        output_row.addWidget(self.output, 1)
        output_row.addWidget(self.copy_button)
        layout.addLayout(output_row)
        self.note = hint_label("")
        layout.addWidget(self.note)
        self._refresh()

    # ------------------------------------------------------------------ building blocks
    def _editor(self, key: str) -> QWidget | None:
        if key == "on":
            return None
        box = QWidget()
        row = QHBoxLayout(box)
        row.setContentsMargins(0, 0, 0, 0)
        if key == "fixed":
            self.fixed = self._freq_spin(1500, self.tr("Clock to pin, MHz."))
            row.addWidget(self.fixed)
        elif key == "range":
            self.range_min = self._freq_spin(0, self.tr("Lower limit, 0 = no limit."))
            self.range_max = self._freq_spin(0, self.tr("Upper limit, 0 = no limit."))
            for spin in (self.range_min, self.range_max):
                spin.setSpecialValueText(self.tr("No limit"))
            row.addWidget(self.range_min)
            row.addWidget(QLabel(self.tr("to")))
            row.addWidget(self.range_max)
        elif key == "load":
            self.load_min = self._pct_spin(0.70, self.tr("Below this load the governor clocks down."))
            self.load_max = self._pct_spin(0.90, self.tr("Above this load the governor clocks up."))
            row.addWidget(self.load_min)
            row.addWidget(QLabel(self.tr("to")))
            row.addWidget(self.load_max)
        elif key == "temp":
            self.temp_throttle = self._temp_spin(90, self.tr("Throttle above this temperature."))
            self.temp_recover = self._temp_spin(80, self.tr("Resume normal clocks below this temperature."))
            row.addWidget(self.temp_throttle)
            row.addWidget(QLabel("/"))
            row.addWidget(self.temp_recover)
        row.addStretch(1)
        return box

    def _freq_spin(self, value: int, tip: str) -> QSpinBox:
        spin = QSpinBox()
        spin.setRange(0, FREQ_LIMIT)
        spin.setSingleStep(FREQ_STEP)
        spin.setSuffix(" MHz")
        spin.setValue(value)
        spin.setToolTip(tip)
        spin.valueChanged.connect(self._refresh)
        return spin

    def _pct_spin(self, value: float, tip: str) -> QDoubleSpinBox:
        spin = QDoubleSpinBox()
        spin.setRange(0.0, 1.0)
        spin.setDecimals(2)
        spin.setSingleStep(0.05)
        spin.setValue(value)
        spin.setToolTip(tip + self.tr(" Fraction of 1, as in config.toml."))
        spin.valueChanged.connect(self._refresh)
        return spin

    def _temp_spin(self, value: int, tip: str) -> QSpinBox:
        spin = QSpinBox()
        spin.setRange(0, 120)
        spin.setSuffix(" °C")
        spin.setValue(value)
        spin.setToolTip(tip)
        spin.valueChanged.connect(self._refresh)
        return spin

    # ------------------------------------------------------------------ state
    def mode(self) -> str:
        return next(key for key, radio in self.radios.items() if radio.isChecked())

    def wrapper_command(self) -> str:
        mode = self.mode()
        if mode == "fixed":
            return f"{WRAPPER} --fixed-frequency {self.fixed.value()}"
        if mode == "range":
            return f"{WRAPPER} --range {self.range_min.value()} {self.range_max.value()}"
        if mode == "load":
            return f"{WRAPPER} --load-target {self.load_min.value():g} {self.load_max.value():g}"
        if mode == "temp":
            return f"{WRAPPER} --temperature {self.temp_throttle.value()} {self.temp_recover.value()}"
        return WRAPPER

    def line(self) -> str:
        template = next(t for key, _c, t, _tip in TARGETS if key == self.target.currentData())
        return template.format(cmd=self.wrapper_command())

    def problem(self) -> str:
        """Human-readable validation problem, empty when the line is fine."""
        mode = self.mode()
        if mode == "range":
            low, high = self.range_min.value(), self.range_max.value()
            if low and high and low > high:
                return self.tr("The lower limit is above the upper limit.")
        elif mode == "load" and self.load_min.value() >= self.load_max.value():
            return self.tr("The lower load target must be below the upper one.")
        elif mode == "temp" and self.temp_recover.value() >= self.temp_throttle.value():
            return self.tr("Recovery must be below the throttling temperature.")
        return ""

    def prefill(self, state: PerformanceState) -> None:
        """Take the governor's current numbers as starting values, once they are known."""
        if not state.available or getattr(self, "_prefilled", False):
            return
        self._prefilled = True
        if state.allowed_max:
            self.fixed.setRange(state.allowed_min, state.allowed_max)
            self.fixed.setValue(state.allowed_max)
            self.range_min.setValue(state.allowed_min)
            self.range_max.setValue(state.allowed_max)
        if state.load_max:
            self.load_min.setValue(state.load_min)
            self.load_max.setValue(state.load_max)
        if state.temp_throttling:
            self.temp_throttle.setValue(state.temp_throttling)
            self.temp_recover.setValue(state.temp_recovery or state.temp_throttling - 10)
        self._refresh()

    def _refresh(self) -> None:
        for key, editor in self.inputs.items():
            editor.setEnabled(self.radios[key].isChecked())
        problem = self.problem()
        self.output.setText(self.line())
        self.copy_button.setEnabled(not problem)
        tip = next(t for key, _c, _t, t in TARGETS if key == self.target.currentData())
        self.note.setText(problem or QCoreApplication.translate("launch_options", tip))
        self.note.setStyleSheet(f"color:{RED};" if problem else "color:palette(placeholder-text);")

    def _copy(self) -> None:
        text = self.line()
        QApplication.clipboard().setText(text)
        self.generated.emit(text)
        self.copy_button.setText(self.tr("Copied"))
        self.copy_button.setStyleSheet(self._copy_style.replace(f"solid {ACCENT}", f"solid {GREEN}"))
        QTimer.singleShot(1500, self._reset_copy)

    def _reset_copy(self) -> None:
        self.copy_button.setText(self.tr("Copy"))
        self.copy_button.setStyleSheet(self._copy_style)
