"""Single window: a menu-driven "initial setup" screen for bc250-gpu-oc-bisect.sh. Pick the
options, hit Start, and the GUI hands off to a terminal running the real script and gets out of
the way."""

from __future__ import annotations

import shlex

from PyQt6.QtCore import QByteArray, QSettings, Qt
from PyQt6.QtGui import QPixmap
from PyQt6.QtWidgets import (
    QCheckBox, QFrame, QGridLayout, QHBoxLayout, QLabel, QMessageBox, QPushButton, QSpinBox,
    QVBoxLayout, QWidget,
)

from . import APP_NAME, LOGO_PATH, __version__
from .options import (
    DEFAULT_FREQ_STEP, DEFAULT_MAX_FREQ, DEFAULT_MIN_VOLT, DEFAULT_VOLT_STEP,
    HARD_MAX_FREQ, HARD_MAX_VOLT, HARD_MIN_VOLT, SweepOptions,
)
from .terminal import launch_in_terminal
from .widgets import AboutDialog, HelpDialog


class MainWindow(QWidget):
    def __init__(self, script: str, parent: QWidget | None = None):
        super().__init__(parent)
        self.script = script
        self.setWindowTitle(f"{APP_NAME} {__version__}")

        root = QVBoxLayout(self)
        root.addLayout(self._build_header())
        root.addWidget(self._build_options_frame())
        root.addLayout(self._build_buttons())
        root.addStretch(1)

        self._restore_geometry()
        self._on_sweep_toggled()

    # ------------------------------------------------------------------ UI
    def _build_header(self) -> QHBoxLayout:
        header = QHBoxLayout()
        header.setSpacing(14)
        if LOGO_PATH.is_file():
            logo = QLabel()
            logo.setPixmap(QPixmap(str(LOGO_PATH)).scaled(
                64, 64, Qt.AspectRatioMode.KeepAspectRatio, Qt.TransformationMode.SmoothTransformation))
            header.addWidget(logo)
        header_right = QVBoxLayout()
        header_right.setSpacing(4)
        title_row = QHBoxLayout()
        title = QLabel(APP_NAME)
        title.setStyleSheet("font-size:18px; font-weight:700;")
        title_row.addWidget(title)
        title_row.addStretch(1)
        help_btn = QPushButton(self.tr("Help"))
        help_btn.setFlat(True)
        help_btn.clicked.connect(lambda: HelpDialog(self.script, self).exec())
        title_row.addWidget(help_btn)
        about_btn = QPushButton(self.tr("About"))
        about_btn.setFlat(True)
        about_btn.clicked.connect(lambda: AboutDialog(self).exec())
        title_row.addWidget(about_btn)
        header_right.addLayout(title_row)
        sub = QLabel(self.tr(
            "Choose how you want to run bc250-gpu-oc-bisect.sh, then click Start. This window "
            "closes and the real sweep continues in a terminal, exactly like running the script "
            "by hand. An unstable step can freeze the system - save your work first."))
        sub.setWordWrap(True)
        header_right.addWidget(sub)
        header.addLayout(header_right, 1)
        return header

    def _build_options_frame(self) -> QFrame:
        frame = QFrame()
        frame.setFrameShape(QFrame.Shape.StyledPanel)
        grid = QGridLayout(frame)
        row = 0

        grid.addWidget(QLabel(self.tr("Load per attempt (seconds):")), row, 0)
        self.time_spin = QSpinBox()
        self.time_spin.setRange(60, 36000)
        self.time_spin.setSingleStep(30)
        self.time_spin.setValue(180)
        self.time_spin.setToolTip(self.tr("GPU load per attempt (-t). Minimum 60s, default 180s."))
        grid.addWidget(self.time_spin, row, 1)
        row += 1

        grid.addWidget(QLabel(self.tr("Rounds per step:")), row, 0)
        self.rounds_spin = QSpinBox()
        self.rounds_spin.setRange(2, 9)
        self.rounds_spin.setValue(3)
        self.rounds_spin.setToolTip(self.tr(
            "Attempts per step (-r). All rounds of a step finish before the next step is tried, "
            "so the sweep never drives past a step that is still failing. Minimum 2."))
        grid.addWidget(self.rounds_spin, row, 1)
        row += 1

        self.oc_check = QCheckBox(self.tr("Overclock sweep (raise frequency, more performance)"))
        self.oc_check.setChecked(True)
        self.oc_check.setToolTip(self.tr(
            "--oc: raise the top frequency one step at a time at a fixed voltage."))
        self.oc_check.toggled.connect(self._on_sweep_toggled)
        grid.addWidget(self.oc_check, row, 0, 1, 2)
        row += 1

        grid.addWidget(QLabel(self.tr("    Max frequency (MHz):")), row, 0)
        self.max_freq_spin = QSpinBox()
        self.max_freq_spin.setRange(100, HARD_MAX_FREQ)
        self.max_freq_spin.setSingleStep(50)
        self.max_freq_spin.setValue(DEFAULT_MAX_FREQ)
        self.max_freq_spin.setToolTip(self.tr(
            "--max-freq: highest frequency to try. Hard ceiling {0} MHz; the community record of "
            "hard-locks above ~1850-2000 MHz is the reason.").format(HARD_MAX_FREQ))
        grid.addWidget(self.max_freq_spin, row, 1)
        row += 1

        grid.addWidget(QLabel(self.tr("    Frequency step (MHz):")), row, 0)
        self.freq_step_spin = QSpinBox()
        self.freq_step_spin.setRange(25, 500)
        self.freq_step_spin.setSingleStep(25)
        self.freq_step_spin.setValue(DEFAULT_FREQ_STEP)
        self.freq_step_spin.setToolTip(self.tr("--freq-step: OC ladder step. Minimum 25 MHz."))
        grid.addWidget(self.freq_step_spin, row, 1)
        row += 1

        grid.addWidget(QLabel(self.tr("    OC voltage (mV, 0 = config's top voltage):")), row, 0)
        self.oc_volt_spin = QSpinBox()
        self.oc_volt_spin.setRange(0, HARD_MAX_VOLT)
        self.oc_volt_spin.setSingleStep(25)
        self.oc_volt_spin.setValue(0)
        self.oc_volt_spin.setSpecialValueText(self.tr("config default"))
        self.oc_volt_spin.setToolTip(self.tr(
            "--oc-volt: voltage used for the OC ladder. Hard ceiling {0} mV - one board was "
            "bricked by overvolting; leave at the default unless you know why not."
        ).format(HARD_MAX_VOLT))
        grid.addWidget(self.oc_volt_spin, row, 1)
        row += 1

        self.uv_check = QCheckBox(self.tr("Undervolt sweep (lower voltage, less heat and power)"))
        self.uv_check.setChecked(True)
        self.uv_check.setToolTip(self.tr(
            "--uv: lower the top voltage one step at a time at the stock top frequency."))
        self.uv_check.toggled.connect(self._on_sweep_toggled)
        grid.addWidget(self.uv_check, row, 0, 1, 2)
        row += 1

        grid.addWidget(QLabel(self.tr("    Min voltage (mV):")), row, 0)
        self.min_volt_spin = QSpinBox()
        self.min_volt_spin.setRange(HARD_MIN_VOLT, 1100)
        self.min_volt_spin.setSingleStep(25)
        self.min_volt_spin.setValue(DEFAULT_MIN_VOLT)
        self.min_volt_spin.setToolTip(self.tr(
            "--min-volt: lowest voltage to try. Hard floor {0} mV.").format(HARD_MIN_VOLT))
        grid.addWidget(self.min_volt_spin, row, 1)
        row += 1

        grid.addWidget(QLabel(self.tr("    Voltage step (mV):")), row, 0)
        self.volt_step_spin = QSpinBox()
        self.volt_step_spin.setRange(5, 100)
        self.volt_step_spin.setSingleStep(5)
        self.volt_step_spin.setValue(DEFAULT_VOLT_STEP)
        self.volt_step_spin.setToolTip(self.tr("--volt-step: UV ladder step. Minimum 5 mV."))
        grid.addWidget(self.volt_step_spin, row, 1)
        row += 1

        self.per_boot_check = QCheckBox(self.tr("One attempt per boot (strict isolation, slower)"))
        self.per_boot_check.setToolTip(self.tr(
            "--per-boot: reboot between attempts. Default is same boot with a cooldown; the "
            "governor restart resets its state."))
        grid.addWidget(self.per_boot_check, row, 0, 1, 2)
        row += 1

        grid.setColumnStretch(1, 1)
        return frame

    def _build_buttons(self) -> QHBoxLayout:
        buttons = QHBoxLayout()
        self.reset_btn = QPushButton(self.tr("Reset"))
        self.reset_btn.setToolTip(self.tr(
            "--reset: permanently deletes all saved results and logs in "
            "~/.local/share/bc250-gpu-oc-bisect, so the next run starts from scratch."))
        self.reset_btn.setStyleSheet(
            "QPushButton { background:#c62828; color:white; font-weight:600; "
            "padding:6px 14px; border-radius:4px; }"
            "QPushButton:hover { background:#b71c1c; }"
        )
        self.reset_btn.clicked.connect(self._on_reset)
        buttons.addWidget(self.reset_btn)
        self.status_btn = QPushButton(self.tr("Show status (--status)"))
        self.status_btn.setToolTip(self.tr("Show the results so far and write the report, then exit."))
        self.status_btn.clicked.connect(lambda: self._run_simple("--status"))
        buttons.addWidget(self.status_btn)
        self.install_btn = QPushButton(self.tr("Install result"))
        self.install_btn.setToolTip(self.tr(
            "--install: write the best validated step into the governor config (backup kept at "
            "config.toml.pre-oc-bisect). The script checks the sweep is complete and asks for "
            "confirmation in the terminal."))
        self.install_btn.clicked.connect(self._on_install)
        buttons.addWidget(self.install_btn)
        self.uninstall_btn = QPushButton(self.tr("Uninstall"))
        self.uninstall_btn.setToolTip(self.tr(
            "--uninstall: restore the governor config from the backup made by Install."))
        self.uninstall_btn.clicked.connect(lambda: self._run_simple("--uninstall"))
        buttons.addWidget(self.uninstall_btn)
        buttons.addStretch(1)
        self.start_btn = QPushButton(self.tr("Start GPU OC Bisect"))
        self.start_btn.setDefault(True)
        self.start_btn.setStyleSheet("font-weight:700; padding:6px 18px;")
        self.start_btn.clicked.connect(self._on_start)
        buttons.addWidget(self.start_btn)
        return buttons

    # --------------------------------------------------------------- window
    def _restore_geometry(self) -> None:
        settings = QSettings()
        geometry = settings.value("main_window/geometry")
        if isinstance(geometry, QByteArray) and self.restoreGeometry(geometry):
            return
        self.resize(600, 480)

    def closeEvent(self, event) -> None:  # noqa: N802 (Qt override)
        QSettings().setValue("main_window/geometry", self.saveGeometry())
        super().closeEvent(event)

    # ------------------------------------------------------------- behavior
    def _on_sweep_toggled(self) -> None:
        oc = self.oc_check.isChecked()
        uv = self.uv_check.isChecked()
        self.max_freq_spin.setEnabled(oc)
        self.freq_step_spin.setEnabled(oc)
        self.oc_volt_spin.setEnabled(oc)
        self.min_volt_spin.setEnabled(uv)
        self.volt_step_spin.setEnabled(uv)
        self.start_btn.setEnabled(oc or uv)

    def _collect_options(self) -> SweepOptions:
        return SweepOptions(
            time_secs=self.time_spin.value(),
            rounds=self.rounds_spin.value(),
            sweep_oc=self.oc_check.isChecked(),
            sweep_uv=self.uv_check.isChecked(),
            max_freq=self.max_freq_spin.value(),
            min_volt=self.min_volt_spin.value(),
            oc_volt=self.oc_volt_spin.value(),
            freq_step=self.freq_step_spin.value(),
            volt_step=self.volt_step_spin.value(),
            per_boot=self.per_boot_check.isChecked(),
        )

    def _run_simple(self, flag: str) -> None:
        try:
            launch_in_terminal(shlex.join(["bash", self.script, flag]))
        except RuntimeError as exc:
            QMessageBox.critical(self, APP_NAME, str(exc))

    def _on_install(self) -> None:
        confirm = QMessageBox(self)
        confirm.setIcon(QMessageBox.Icon.Warning)
        confirm.setWindowTitle(APP_NAME)
        confirm.setText(self.tr("Write the best validated step into the governor config?"))
        confirm.setInformativeText(self.tr(
            "This changes /etc/cyan-skillfish-governor-smu/config.toml (--install). A backup is "
            "kept at config.toml.pre-oc-bisect and Uninstall restores it. The script will show "
            "the chosen point and ask you to confirm once more in the terminal."))
        confirm.setStandardButtons(QMessageBox.StandardButton.Yes | QMessageBox.StandardButton.Cancel)
        confirm.setDefaultButton(QMessageBox.StandardButton.Cancel)
        if confirm.exec() == QMessageBox.StandardButton.Yes:
            self._run_simple("--install")

    def _on_reset(self) -> None:
        confirm = QMessageBox(self)
        confirm.setIcon(QMessageBox.Icon.Warning)
        confirm.setWindowTitle(APP_NAME)
        confirm.setText(self.tr("Delete all bc250-gpu-oc-bisect results?"))
        confirm.setInformativeText(self.tr(
            "This permanently deletes every saved result and log in "
            "~/.local/share/bc250-gpu-oc-bisect (--reset). This cannot be undone and there is no "
            "backup. The script will still ask you to confirm once more in the terminal."))
        confirm.setStandardButtons(QMessageBox.StandardButton.Yes | QMessageBox.StandardButton.Cancel)
        confirm.setDefaultButton(QMessageBox.StandardButton.Cancel)
        if confirm.exec() == QMessageBox.StandardButton.Yes:
            self._run_simple("--reset")

    def _on_start(self) -> None:
        opts = self._collect_options()
        errors = opts.validate()
        if errors:
            QMessageBox.warning(self, APP_NAME, "\n".join(errors))
            return

        sweep = (self.tr("overclock + undervolt") if opts.sweep_oc and opts.sweep_uv
                 else self.tr("overclock only") if opts.sweep_oc else self.tr("undervolt only"))
        summary = self.tr(
            "Start bc250-gpu-oc-bisect.sh with:\n\n"
            "  load time: {t}s\n  rounds: {r}\n  sweep: {s}\n"
            "  max frequency: {mf} MHz (step {fs})\n  min voltage: {mv} mV (step {vs})\n"
            "  OC voltage: {ov}\n  per boot: {pb}\n\n"
            "This window will close and the sweep continues in a terminal."
        ).format(t=opts.time_secs, r=opts.rounds, s=sweep,
                  mf=opts.max_freq, fs=opts.freq_step, mv=opts.min_volt, vs=opts.volt_step,
                  ov=(f"{opts.oc_volt} mV" if opts.oc_volt else self.tr("config default")),
                  pb=opts.per_boot)
        if QMessageBox.question(self, APP_NAME, summary) != QMessageBox.StandardButton.Yes:
            return

        try:
            launch_in_terminal(opts.to_command(self.script))
        except RuntimeError as exc:
            QMessageBox.critical(self, APP_NAME, str(exc))
            return

        self.close()
