# SPDX-License-Identifier: GPL-3.0-or-later
"""Pages that edit config.toml: GPU Usage ([gpu-usage], [gpu]) and Tuning (frequency range, load target,
temperature, D-Bus, timing, frequency thresholds) with presets. Both collect their fields into one GovernorConfig
that the main window writes in a single pkexec call."""

from __future__ import annotations

from dataclasses import replace

from PyQt6.QtCore import QCoreApplication, QT_TRANSLATE_NOOP, Qt, pyqtSignal
from PyQt6.QtWidgets import (
    QCheckBox, QComboBox, QDoubleSpinBox, QFormLayout, QGroupBox, QHBoxLayout, QLabel, QPushButton, QSpinBox,
    QVBoxLayout, QWidget,
)

from . import fmt, plain_tooltip
from .backends.base import (
    BURST_SAMPLES_MAX, METHODS, SET_METHODS, TEMP_READS, GovernorConfig, PerformanceState,
)
from .profiles import ProfilesBox
from .widgets import Terminal, accent_button, hint_label, page_header

METHOD_HELP = {
    "busy-flag": QT_TRANSLATE_NOOP(
        "config_pages",
        "Samples the GPU's single busy bit at timing.intervals.sample (default). Cheapest, works everywhere."),
    "process": QT_TRANSLATE_NOOP("config_pages", "Scans every process that holds the GPU open. More CPU work than "
                                 "busy-flag."),
    "kernel": QT_TRANSLATE_NOOP("config_pages", "Reads the kernel's own load figure. Needs a patched kernel, which "
                                "stock Bazzite does not have."),
}
TEMP_HELP = {
    "drm": QT_TRANSLATE_NOOP("config_pages", "AMDGPU_INFO_SENSOR_GPU_TEMP ioctl; keeps a DRM device handle open "
                             "while the governor runs (default)."),
    "sysfs": QT_TRANSLATE_NOOP("config_pages", "Reads the amdgpu hwmon temp1_input instead, so no DRM client stays "
                               "open. Same sensor."),
}
SET_METHOD_HELP = {
    "smu": QT_TRANSLATE_NOOP("config_pages", "Talks to the SMU directly (bc250collective's API); applies the "
                             "safe-points voltage with the clock (default)."),
    "kernel": QT_TRANSLATE_NOOP("config_pages", "Goes through the amdgpu sysfs interface (pp_od_clk_voltage) "
                                "instead of the SMU."),
}

# Presets set the tuning fields only (never [gpu-usage] or [dbus]). Frequencies stay inside the
# safe-points range of the governor's shipped config (500..2000 MHz).
# (freq_min, freq_max, load_upper, load_lower, temp_throttling, temp_recovery)
PRESETS: dict[str, tuple[tuple[int, int, float, float, int, int], str]] = {
    QT_TRANSLATE_NOOP("config_pages", "Shipped defaults"): (
        (1000, 1850, 0.65, 0.50, 85, 75),
        QT_TRANSLATE_NOOP("config_pages", "The values of the config.toml the governor package installs.")),
    QT_TRANSLATE_NOOP("config_pages", "Quiet"): (
        (500, 1500, 0.80, 0.65, 80, 70),
        QT_TRANSLATE_NOOP("config_pages", "Lowest clocks that still keep up: ramps up late, tops out at 1500 MHz, "
                          "throttles at 80 °C.")),
    QT_TRANSLATE_NOOP("config_pages", "Responsive"): (
        (1000, 2000, 0.55, 0.40, 85, 75),
        QT_TRANSLATE_NOOP("config_pages", "Ramps up early and allows the full safe range, at the cost of more heat "
                          "and power.")),
    QT_TRANSLATE_NOOP("config_pages", "Maximum clock"): (
        (1850, 2000, 0.50, 0.35, 85, 75),
        QT_TRANSLATE_NOOP("config_pages", "Stays near the top of the safe range; close to a fixed clock while "
                          "leaving thermal throttling on.")),
}
CUSTOM = QT_TRANSLATE_NOOP("config_pages", "Custom")
FREQ_STEP = 25
FREQ_LIMIT = 3000


class ConfigPage(QWidget):
    """A page that owns some fields of GovernorConfig."""

    apply_requested = pyqtSignal(bool)      # restart afterwards
    dirty_changed = pyqtSignal(bool)

    def __init__(self, title: str, parent: QWidget | None = None):
        super().__init__(parent)
        self._saved = GovernorConfig()
        self._loading = False
        self.layout_ = QVBoxLayout(self)
        header, _ = page_header(title)
        self.reload = QPushButton(self.tr("Reload from disk"))
        self.reload.setToolTip(self.tr("Discard the edits on every page and show the values of config.toml again."))
        header.addWidget(self.reload)
        self.layout_.addLayout(header)

    def _apply_row(self, what: str) -> None:
        row = QHBoxLayout()
        self.restart_after = QCheckBox(self.tr("Restart the governor after applying"))
        self.restart_after.setChecked(True)
        self.restart_after.setToolTip(self.tr("The governor reads config.toml at start only."))
        row.addWidget(self.restart_after)
        row.addStretch(1)
        self.apply = accent_button(self.tr("Apply changes"),
                                   fmt(self.tr("Asks for your password once (pkexec), makes a timestamped backup "
                                               "of config.toml and writes %1. Pending edits on the other "
                                               "config page are written too."), what))
        self.apply.setEnabled(False)
        self.apply.clicked.connect(lambda: self.apply_requested.emit(self.restart_after.isChecked()))
        row.addWidget(self.apply)
        self.layout_.addLayout(row)

    # -- to override
    def collect(self, base: GovernorConfig) -> GovernorConfig:
        """`base` with this page's fields replaced by the form values."""
        raise NotImplementedError

    def _fill(self, config: GovernorConfig) -> None:
        raise NotImplementedError

    # -- shared
    def load(self, config: GovernorConfig) -> None:
        self._saved = config
        self._loading = True
        try:
            self._fill(config)
        finally:
            self._loading = False
        self._changed()

    def show_values(self, config: GovernorConfig) -> None:
        """Fill the form without changing what counts as saved, so the page turns dirty if it differs."""
        self._loading = True
        try:
            self._fill(config)
        finally:
            self._loading = False
        self._changed()

    def is_dirty(self) -> bool:
        return self.collect(self._saved) != self._saved

    def set_apply_enabled(self, enabled: bool) -> None:
        self.apply.setEnabled(enabled)

    def _changed(self, *_) -> None:
        if self._loading:
            return
        dirty = self.is_dirty()
        self.apply.setEnabled(dirty)
        self.dirty_changed.emit(dirty)


class GpuUsagePage(ConfigPage):
    """Editor for the [gpu-usage] and [gpu] sections, plus the raw config.toml."""

    def __init__(self, config_path: str, parent: QWidget | None = None):
        super().__init__(self.tr("GPU Usage"), parent)
        layout = self.layout_

        box = QGroupBox("[gpu-usage]")
        form = QFormLayout(box)
        form.setFieldGrowthPolicy(QFormLayout.FieldGrowthPolicy.ExpandingFieldsGrow)
        form.setVerticalSpacing(10)

        self.fix_metrics = QCheckBox(f"fix-metrics — {self.tr('patch GPU usage in gpu_metrics')}")
        self.fix_metrics.setToolTip(self.tr("Writes the load the governor measures into a patched gpu_metrics table "
                                           "and bind-mounts it over sysfs, so MangoHud, Steam's overlay, radeontop "
                                           "and this app show a real percentage instead of the 655% bug."))
        form.addRow(self.fix_metrics)

        self.fix_freq = QCheckBox(f"fix-freq — {self.tr('patch the GPU clock in hwmon')}")
        self.fix_freq.setToolTip(self.tr("Replaces the hwmon freq1_input with the clock read from the SMU. Fixes "
                                        "the wrong frequency reporting of sysfs, mainly after the 8-core unlock. "
                                        "Independent of fix-metrics."))
        form.addRow(self.fix_freq)

        self.method = QComboBox()
        for name in METHODS:
            self.method.addItem(name)
            self.method.setItemData(self.method.count() - 1, QCoreApplication.translate("config_pages",
                                    METHOD_HELP[name]), Qt.ItemDataRole.ToolTipRole)
        self.method.currentTextChanged.connect(
            lambda name: self.method.setToolTip(QCoreApplication.translate("config_pages", METHOD_HELP.get(name, ""))))
        form.addRow(self.tr("Load method:"), self.method)
        self.method_hint = hint_label("")
        form.addRow(self.method_hint)

        self.temp_read = QComboBox()
        for name in TEMP_READS:
            self.temp_read.addItem(name)
            self.temp_read.setItemData(self.temp_read.count() - 1, QCoreApplication.translate("config_pages",
                                       TEMP_HELP[name]), Qt.ItemDataRole.ToolTipRole)
        self.temp_read.currentTextChanged.connect(
            lambda name: self.temp_read.setToolTip(QCoreApplication.translate("config_pages", TEMP_HELP.get(name, ""))))
        form.addRow(self.tr("Temperature source:"), self.temp_read)
        self.temp_hint = hint_label("")
        form.addRow(self.temp_hint)

        self.flush_every = QSpinBox()
        self.flush_every.setRange(1, 1000)
        self.flush_every.setToolTip(self.tr("Flush the patched metrics table every N update cycles (default 10)."))
        form.addRow("flush-every:", self.flush_every)
        layout.addWidget(box)

        self.gpu_box = gpu_box = QGroupBox("[gpu]")
        gpu_form = QFormLayout(gpu_box)
        gpu_form.setFieldGrowthPolicy(QFormLayout.FieldGrowthPolicy.ExpandingFieldsGrow)
        self.set_method = QComboBox()
        for name in SET_METHODS:
            self.set_method.addItem(name)
            self.set_method.setItemData(self.set_method.count() - 1, QCoreApplication.translate("config_pages",
                                        SET_METHOD_HELP[name]), Qt.ItemDataRole.ToolTipRole)
        self.set_method.currentTextChanged.connect(
            lambda name: self.set_method.setToolTip(QCoreApplication.translate("config_pages",
                                                     SET_METHOD_HELP.get(name, ""))))
        gpu_form.addRow(f"set-method — {self.tr('apply clock/voltage via:')}", self.set_method)
        self.set_method_hint = hint_label("")
        gpu_form.addRow(self.set_method_hint)
        layout.addWidget(gpu_box)

        self._apply_row(self.tr("the new values"))

        file_box = QGroupBox("config.toml")
        file_layout = QVBoxLayout(file_box)
        path_label = QLabel(config_path)
        path_label.setTextInteractionFlags(Qt.TextInteractionFlag.TextSelectableByMouse)
        path_label.setToolTip(plain_tooltip(config_path))
        file_layout.addWidget(path_label)
        file_layout.addWidget(hint_label(self.tr(
            "Only the keys this app manages ([gpu-usage], [gpu], [frequency-range], [timing], [frequency-thresholds], "
            "[load-target], [temperature], [dbus]) are written; every other line of the file, including comments and "
            "the safe-points table, stays as it is. Before each write a copy named config.toml.bak-YYYYMMDD-HHMMSS "
            "is made next to it.")))
        self.raw = Terminal()
        self.raw.setMinimumHeight(120)
        file_layout.addWidget(self.raw, 1)
        layout.addWidget(file_box, 1)

        for widget in (self.fix_metrics, self.fix_freq):
            widget.toggled.connect(self._changed)
        self.method.currentTextChanged.connect(self._changed)
        self.temp_read.currentTextChanged.connect(self._changed)
        self.set_method.currentTextChanged.connect(self._changed)
        self.flush_every.valueChanged.connect(self._changed)
        self._changed()

    def set_features(self, *, set_method: bool) -> None:
        self.gpu_box.setVisible(set_method)

    def collect(self, base: GovernorConfig) -> GovernorConfig:
        config = replace(base, fix_metrics=self.fix_metrics.isChecked(), fix_freq=self.fix_freq.isChecked(),
                         method=self.method.currentText(), temp_read=self.temp_read.currentText(),
                         flush_every=self.flush_every.value())
        if not self.gpu_box.isHidden():
            config = replace(config, set_method=self.set_method.currentText())
        return config

    def _fill(self, config: GovernorConfig) -> None:
        self.fix_metrics.setChecked(config.fix_metrics)
        self.fix_freq.setChecked(config.fix_freq)
        self.method.setCurrentText(config.method)
        self.temp_read.setCurrentText(config.temp_read)
        self.set_method.setCurrentText(config.set_method)
        self.flush_every.setValue(config.flush_every)

    def show_raw(self, raw_text: str) -> None:
        self.raw.setPlainText(raw_text or self.tr("(config.toml does not exist yet; applying creates it)"))

    def _changed(self, *_) -> None:
        self.method_hint.setText(QCoreApplication.translate("config_pages", METHOD_HELP.get(self.method.currentText(), "")))
        self.temp_hint.setText(QCoreApplication.translate("config_pages", TEMP_HELP.get(self.temp_read.currentText(), "")))
        self.set_method_hint.setText(QCoreApplication.translate("config_pages",
                                     SET_METHOD_HELP.get(self.set_method.currentText(), "")))
        super()._changed()


def _freq_spin(tooltip: str) -> QSpinBox:
    spin = QSpinBox()
    spin.setRange(0, FREQ_LIMIT)
    spin.setSingleStep(FREQ_STEP)
    spin.setSuffix(" MHz")
    spin.setSpecialValueText(QCoreApplication.translate("config_pages", "No limit"))
    spin.setToolTip(tooltip)
    return spin


def _percent_spin(tooltip: str) -> QSpinBox:
    spin = QSpinBox()
    spin.setRange(0, 99)
    spin.setSuffix(" %")
    spin.setToolTip(tooltip)
    return spin


def _micro_spin(tooltip: str) -> QSpinBox:
    spin = QSpinBox()
    spin.setRange(50, 10_000_000)
    spin.setSingleStep(250)
    spin.setSuffix(" µs")
    spin.setGroupSeparatorShown(True)
    spin.setToolTip(tooltip)
    return spin


def _rate_spin(tooltip: str) -> QDoubleSpinBox:
    spin = QDoubleSpinBox()
    spin.setRange(0.01, 1000.0)
    spin.setDecimals(2)
    spin.setSingleStep(0.5)
    spin.setSuffix(" MHz/ms")
    spin.setToolTip(tooltip)
    return spin


class TuningPage(ConfigPage):
    """Editor for [frequency-range], [load-target], [temperature], [dbus], [timing] and [frequency-thresholds],
    with presets (which set the first three only)."""

    def __init__(self, parent: QWidget | None = None):
        super().__init__(self.tr("Tuning"), parent)
        layout = self.layout_

        self.profiles = ProfilesBox()
        layout.addWidget(self.profiles)

        preset_row = QHBoxLayout()
        preset_row.addWidget(QLabel(self.tr("Preset:")))
        self.preset = QComboBox()
        # The English preset name is kept in UserRole: it is the key of PRESETS, while the shown text is translated.
        self.preset.addItem(QCoreApplication.translate("config_pages", CUSTOM), CUSTOM)
        self.preset.setItemData(0, self.tr("The form does not match any preset."), Qt.ItemDataRole.ToolTipRole)
        for name, (_, description) in PRESETS.items():
            self.preset.addItem(QCoreApplication.translate("config_pages", name), name)
            self.preset.setItemData(self.preset.count() - 1, QCoreApplication.translate("config_pages", description),
                                    Qt.ItemDataRole.ToolTipRole)
        self.preset.setToolTip(self.tr("Fills the form below; nothing is written until you apply."))
        preset_row.addWidget(self.preset, 1)
        self.preset_hint = hint_label("")
        preset_row.addWidget(self.preset_hint, 2)
        layout.addLayout(preset_row)

        columns = QHBoxLayout()
        columns.setSpacing(12)
        left = QVBoxLayout()
        right = QVBoxLayout()
        columns.addLayout(left, 1)
        columns.addLayout(right, 1)
        layout.addLayout(columns)

        self.freq_box = freq_box = QGroupBox(f"[frequency-range] — {self.tr('clock limits at start')}")
        freq_form = QFormLayout(freq_box)
        freq_form.setVerticalSpacing(8)
        self.freq_min = _freq_spin(self.tr("Lowest clock the governor may choose. 0 (No limit) = lowest safe point."))
        self.freq_max = _freq_spin(self.tr("Highest clock the governor may choose. 0 (No limit) = highest safe point."))
        freq_form.addRow(self.tr("Minimum:"), self.freq_min)
        freq_form.addRow(self.tr("Maximum:"), self.freq_max)
        self.allowed_hint = hint_label(
            self.tr("Values outside the safe-points table of config.toml are clamped by the governor."))
        freq_form.addRow(self.allowed_hint)
        left.addWidget(freq_box)

        load_box = QGroupBox(f"[load-target] — {self.tr('when to change the clock')}")
        load_form = QFormLayout(load_box)
        load_form.setVerticalSpacing(8)
        self.load_upper = _percent_spin(self.tr("GPU load above which the governor raises the clock (upper)."))
        self.load_lower = _percent_spin(self.tr("GPU load below which the governor lowers the clock (lower)."))
        load_form.addRow(self.tr("Ramp up above:"), self.load_upper)
        load_form.addRow(self.tr("Ramp down below:"), self.load_lower)
        load_form.addRow(hint_label(self.tr("A wide gap keeps the clock steady; a narrow gap follows the load "
                                           "closely. Governor defaults when the section is missing: 95 % / 80 %.")))
        left.addWidget(load_box)

        temp_box = QGroupBox(f"[temperature] — {self.tr('thermal throttling')}")
        temp_form = QFormLayout(temp_box)
        temp_form.setVerticalSpacing(8)
        self.temp_throttling = QSpinBox()
        self.temp_throttling.setRange(0, 100)
        self.temp_throttling.setSuffix(" °C")
        self.temp_throttling.setToolTip(self.tr("Above this GPU temperature the governor lowers the clock (default "
                                               "85)."))
        self.temp_recovery = QSpinBox()
        self.temp_recovery.setRange(0, 99)
        self.temp_recovery.setSuffix(" °C")
        self.temp_recovery.setSpecialValueText(self.tr("Not set"))
        self.temp_recovery.setToolTip(self.tr("Below this temperature throttling ends. Must be lower than the "
                                             "throttling temperature; Not set leaves the key out of config.toml."))
        temp_form.addRow(self.tr("Throttle above:"), self.temp_throttling)
        temp_form.addRow(self.tr("Recover below:"), self.temp_recovery)
        left.addWidget(temp_box)

        self.dbus_box = dbus_box = QGroupBox(f"[dbus] — {self.tr('runtime control')}")
        dbus_layout = QVBoxLayout(dbus_box)
        self.dbus_enabled = QCheckBox(f"enabled — {self.tr('publish com.cyanskillfish.Governor on the system bus')}")
        self.dbus_enabled.setToolTip(self.tr("Needed by the Performance page of this app and by the "
                                            "cyan-skillfish-performance-mode launch wrapper."))
        dbus_layout.addWidget(self.dbus_enabled)
        left.addWidget(dbus_box)
        left.addStretch(1)

        timing_box = QGroupBox(f"[timing] — {self.tr('control loop')}")
        timing_form = QFormLayout(timing_box)
        timing_form.setVerticalSpacing(8)
        self.sample_us = _micro_spin(f"intervals.sample — {self.tr('how often the GPU busy flag is sampled '
                                     '(governor default 2000 µs, shipped file 250 µs). Used by the busy-flag load '
                                     'method.')}")
        self.adjust_us = _micro_spin(f"intervals.adjust — {self.tr('how often the clock target is recomputed '
                                     '(governor default 10 × sample, shipped file 100 000 µs). Must not be shorter '
                                     'than the sample interval.')}")
        timing_form.addRow(self.tr("Sample every:"), self.sample_us)
        timing_form.addRow(self.tr("Adjust every:"), self.adjust_us)
        self.ramp_normal = _rate_spin(f"ramp-rates.normal — {self.tr('how fast the clock moves towards its target '
                                      '(default 1 MHz/ms).')}")
        self.ramp_burst = _rate_spin(f"ramp-rates.burst — {self.tr('ramp rate while in burst mode; must be above '
                                     'the normal rate (governor default 200 × normal, shipped file 50 MHz/ms).')}")
        timing_form.addRow(self.tr("Ramp rate:"), self.ramp_normal)
        timing_form.addRow(self.tr("Burst ramp rate:"), self.ramp_burst)
        self.burst_samples = QSpinBox()
        self.burst_samples.setRange(0, BURST_SAMPLES_MAX)
        self.burst_samples.setSuffix(self.tr(" samples"))
        self.burst_samples.setSpecialValueText(self.tr("Off"))
        self.burst_samples.setToolTip(fmt(f"burst-samples — {self.tr('this many busy samples in a row switch to '
                                      'the burst ramp rate, so a game that suddenly loads the GPU gets its clock '
                                      'quickly (1..%1; Off leaves the key out, shipped file 60).')}",
                                      str(BURST_SAMPLES_MAX)))
        timing_form.addRow(self.tr("Burst after:"), self.burst_samples)
        self.down_events = QSpinBox()
        self.down_events.setRange(1, 1000)
        self.down_events.setSuffix(self.tr(" events"))
        self.down_events.setToolTip(f"down-events — {self.tr('adjust cycles with the load below the lower target '
                                    'before the clock steps down (governor default 10, shipped file 5). Higher = '
                                    'stickier clock.')}")
        self.down_events_label = QLabel(self.tr("Step down after:"))
        timing_form.addRow(self.down_events_label, self.down_events)
        timing_form.addRow(hint_label(self.tr("Faster sampling and adjusting react sooner but cost CPU time. Burst "
                                             "mode shortens the lag when a game starts; more down-events stop the "
                                             "clock from dropping during short pauses.")))
        right.addWidget(timing_box)

        thresh_box = QGroupBox(f"[frequency-thresholds] — {self.tr('dead band')}")
        thresh_form = QFormLayout(thresh_box)
        thresh_form.setVerticalSpacing(8)
        self.freq_adjust = QSpinBox()
        self.freq_adjust.setRange(0, 500)
        self.freq_adjust.setSingleStep(5)
        self.freq_adjust.setSuffix(" MHz")
        self.freq_adjust.setToolTip(f"adjust — {self.tr('a non-burst clock change smaller than this is not applied '
                                    '(default 10). Avoids constant tiny SMU writes.')}")
        thresh_form.addRow(self.tr("Ignore changes below:"), self.freq_adjust)
        right.addWidget(thresh_box)
        right.addStretch(1)

        self.problem = hint_label("")
        self.problem.setStyleSheet("color:#c62828;")
        layout.addWidget(self.problem)
        self._apply_row(self.tr("the tuning sections"))
        layout.addStretch(1)

        for spin in (self.freq_min, self.freq_max, self.load_upper, self.load_lower, self.temp_throttling,
                     self.temp_recovery, self.sample_us, self.adjust_us, self.ramp_normal, self.ramp_burst,
                     self.burst_samples, self.down_events, self.freq_adjust):
            spin.valueChanged.connect(self._changed)
        self.dbus_enabled.toggled.connect(self._changed)
        self.preset.currentIndexChanged.connect(self._preset_chosen)
        self._changed()

    def set_features(self, *, frequency_range: bool, dbus: bool, down_events: bool = True) -> None:
        """Hide the sections a backend does not have; their fields then keep the saved values."""
        self.freq_box.setVisible(frequency_range)
        self.dbus_box.setVisible(dbus)
        self.down_events.setVisible(down_events)
        self.down_events_label.setVisible(down_events)

    def collect(self, base: GovernorConfig) -> GovernorConfig:
        config = replace(base, load_upper=self.load_upper.value() / 100, load_lower=self.load_lower.value() / 100,
                         temp_throttling=self.temp_throttling.value(), temp_recovery=self.temp_recovery.value(),
                         sample_us=self.sample_us.value(), adjust_us=self.adjust_us.value(),
                         ramp_normal=self.ramp_normal.value(), ramp_burst=self.ramp_burst.value(),
                         burst_samples=self.burst_samples.value(), freq_adjust=self.freq_adjust.value())
        if not self.freq_box.isHidden():
            config = replace(config, freq_min=self.freq_min.value(), freq_max=self.freq_max.value())
        if not self.dbus_box.isHidden():
            config = replace(config, dbus_enabled=self.dbus_enabled.isChecked())
        if not self.down_events.isHidden():
            config = replace(config, down_events=self.down_events.value())
        return config

    def _fill(self, config: GovernorConfig) -> None:
        self.freq_min.setValue(config.freq_min)
        self.freq_max.setValue(config.freq_max)
        self.load_upper.setValue(round(config.load_upper * 100))
        self.load_lower.setValue(round(config.load_lower * 100))
        self.temp_throttling.setValue(config.temp_throttling)
        self.temp_recovery.setValue(config.temp_recovery)
        self.dbus_enabled.setChecked(config.dbus_enabled)
        self.sample_us.setValue(config.sample_us)
        self.adjust_us.setValue(config.adjust_us)
        self.ramp_normal.setValue(config.ramp_normal)
        self.ramp_burst.setValue(config.ramp_burst)
        self.burst_samples.setValue(config.burst_samples)
        self.down_events.setValue(config.down_events)
        self.freq_adjust.setValue(config.freq_adjust)

    def take_runtime(self, state: PerformanceState) -> None:
        """Copy the governor's current runtime values (Performance page) into the form."""
        self._loading = True
        try:
            self.freq_min.setValue(state.current_min)
            self.freq_max.setValue(state.current_max)
            self.load_upper.setValue(round(state.load_max * 100))
            self.load_lower.setValue(round(state.load_min * 100))
            self.temp_throttling.setValue(state.temp_throttling)
            self.temp_recovery.setValue(state.temp_recovery)
        finally:
            self._loading = False
        self._changed()

    def show_allowed_range(self, state: PerformanceState) -> None:
        if state.available and state.allowed_max:
            self.allowed_hint.setText(fmt(self.tr("The governor reports a safe-points range of %1–%2 MHz; values "
                                      "outside it are clamped."), str(state.allowed_min), str(state.allowed_max)))
        else:
            self.allowed_hint.setText(
                self.tr("Values outside the safe-points table of config.toml are clamped by the governor."))

    def _preset_chosen(self, index: int) -> None:
        name = self.preset.itemData(index)      # the English key, not the translated text shown
        if self._loading or name not in PRESETS:
            return
        values, _ = PRESETS[name]
        self._loading = True
        try:
            if not self.freq_box.isHidden():
                self.freq_min.setValue(values[0])
                self.freq_max.setValue(values[1])
            self.load_upper.setValue(round(values[2] * 100))
            self.load_lower.setValue(round(values[3] * 100))
            self.temp_throttling.setValue(values[4])
            self.temp_recovery.setValue(values[5])
        finally:
            self._loading = False
        self._changed()

    def _matching_preset(self) -> str:
        current = self.collect(self._saved).tuning_fields()
        for name, (values, _) in PRESETS.items():
            if tuple(values) == current or (self.freq_box.isHidden() and values[2:] == current[2:]):
                return name
        return CUSTOM

    def _validation_error(self) -> str:
        try:
            self.collect(self._saved).validate()
        except ValueError as exc:
            return str(exc)
        return ""

    def _changed(self, *_) -> None:
        if self._loading:
            return
        name = self._matching_preset()
        self.preset.blockSignals(True)
        self.preset.setCurrentIndex(max(self.preset.findData(name), 0))
        self.preset.blockSignals(False)
        self.preset_hint.setText(QCoreApplication.translate("config_pages", PRESETS[name][1]) if name in PRESETS else "")
        error = self._validation_error()
        self.problem.setText(error)
        super()._changed()
        if error:
            self.apply.setEnabled(False)
