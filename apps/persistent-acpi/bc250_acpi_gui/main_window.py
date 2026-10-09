# SPDX-License-Identifier: MIT
"""Single window: shows whether the ACPI override is installed and in use, and installs/removes it."""

from __future__ import annotations

from PyQt6.QtCore import QByteArray, QSettings, Qt
from PyQt6.QtGui import QCursor
from PyQt6.QtWidgets import (
    QApplication, QHBoxLayout, QLabel, QMessageBox, QPlainTextEdit, QPushButton, QVBoxLayout, QWidget,
)

from . import APP_NAME, __version__
from .runner import ScriptRunner
from .widgets import AboutDialog, SudoDialog

NEEDS_CONFIRMATION = 3      # bc250-acpi-override.sh: a warning needs "Continue anyway?" (--yes)

_BANNERS = {
    "installed": ("✔ INSTALLED", "#2e7d32"),
    "not installed": ("NOT INSTALLED", "#424242"),
    "incomplete": ("⚠ INCOMPLETE", "#ef6c00"),
}


def override_state(line: str) -> str | None:
    """'installed', 'not installed' or 'incomplete' from the script's "Override: ..." status line."""
    if not line.startswith("Override: "):
        return None
    value = line[len("Override: "):]
    for state in ("not installed", "incomplete", "installed"):
        if value.startswith(state):
            return state
    return None


class MainWindow(QWidget):
    _BANNER_BASE = "font-weight:700; font-size:14px; padding:8px; border-radius:4px;"

    def __init__(self, script: str, parent: QWidget | None = None):
        super().__init__(parent)
        self.setWindowTitle(f"{APP_NAME} {__version__}")
        self.runner = ScriptRunner(script, self)
        self.runner.line.connect(self._append_line)
        self.runner.auth_failed.connect(self._on_auth_failed)
        self.runner.finished.connect(self._on_finished)
        self._pending_action = ""  # what the running process is, for the right message when it ends
        self._pending_args: list[str] = []  # so a wrong password can be retried without re-clicking
        self._auth_failed_this_run = False
        self._run_lines: list[str] = []  # output of the running process, for the warnings it stopped on

        root = QVBoxLayout(self)

        header_row = QHBoxLayout()
        header = QLabel(APP_NAME)
        header.setStyleSheet("font-size:18px; font-weight:700;")
        header_row.addWidget(header)
        header_row.addStretch(1)
        about_btn = QPushButton("About")
        about_btn.setFlat(True)
        about_btn.clicked.connect(self._on_about)
        header_row.addWidget(about_btn)
        root.addLayout(header_row)
        sub = QLabel(
            "Gives the BC-250 CPU idle states (C-states) and frequency scaling (800 MHz - 3.2 GHz, 8 steps) "
            "through an ACPI override that GRUB loads at every boot. It survives kernel and image updates, "
            "and Uninstall reverses it completely.")
        sub.setWordWrap(True)
        root.addWidget(sub)

        self.banner = QLabel()
        self.banner.setStyleSheet(self._BANNER_BASE)
        root.addWidget(self.banner)
        self._set_banner(None)

        buttons = QHBoxLayout()
        self.install_btn = QPushButton("Install")
        self.install_btn.setToolTip("Copy the ACPI override to /boot, add the GRUB line and regenerate GRUB.")
        self.install_btn.clicked.connect(self._on_install)
        self.uninstall_btn = QPushButton("Uninstall")
        self.uninstall_btn.setToolTip("Remove the override and the GRUB line, and regenerate GRUB.")
        self.uninstall_btn.clicked.connect(self._on_uninstall)
        self.status_btn = QPushButton("Refresh status")
        self.status_btn.setToolTip("Show whether the override is installed, and the CPU's frequency steps and "
                                   "idle states.")
        self.status_btn.clicked.connect(self._refresh_status)
        self.sudo_status_btn = QPushButton("Status with sudo")
        self.sudo_status_btn.setToolTip("Run the status as root (asks for the sudo password), so it also checks "
                                        "the kernel log for the override tables.")
        self.sudo_status_btn.clicked.connect(self._on_sudo_status)
        self._buttons = (self.install_btn, self.uninstall_btn, self.status_btn, self.sudo_status_btn)
        for btn in self._buttons:
            buttons.addWidget(btn)
        root.addLayout(buttons)

        self.busy_label = QLabel()
        self.busy_label.setStyleSheet("color:#888; font-style:italic;")
        root.addWidget(self.busy_label)

        self.output = QPlainTextEdit()
        self.output.setReadOnly(True)
        self.output.setMaximumBlockCount(2000)
        self.output.setPlaceholderText("Output of bc250-acpi-override.sh appears here.")
        root.addWidget(self.output, stretch=1)

        self._restore_geometry()
        self._refresh_status()

    # --------------------------------------------------------------- window
    def _restore_geometry(self) -> None:
        geometry = QSettings().value("main_window/geometry")
        if isinstance(geometry, QByteArray) and self.restoreGeometry(geometry):
            return
        self.resize(700, 520)

    def closeEvent(self, event) -> None:  # noqa: N802 (Qt override)
        QSettings().setValue("main_window/geometry", self.saveGeometry())
        super().closeEvent(event)

    def _on_about(self) -> None:
        AboutDialog(self).exec()

    def _set_banner(self, state: str | None) -> None:
        text, color = _BANNERS.get(state or "", ("Checking…", "#424242"))
        self.banner.setText(text)
        self.banner.setStyleSheet(self._BANNER_BASE + f"background-color:{color}; color:white;")

    # ---------------------------------------------------------------- output
    def _append_line(self, text: str) -> None:
        self._run_lines.append(text)
        self.output.appendPlainText(text)
        state = override_state(text)
        if state:
            self._set_banner(state)

    def _set_busy(self, busy: bool) -> None:
        for btn in self._buttons:
            btn.setEnabled(not busy)
        if busy:
            QApplication.setOverrideCursor(QCursor(Qt.CursorShape.WaitCursor))
            label = {
                "install": "Working — installing (regenerating GRUB takes a moment)…",
                "uninstall": "Working — uninstalling (regenerating GRUB takes a moment)…",
            }.get(self._pending_action, "Working…")
            self.busy_label.setText(label)
        else:
            QApplication.restoreOverrideCursor()
            self.busy_label.setText("")

    def _on_auth_failed(self) -> None:
        self._auth_failed_this_run = True
        self._append_line("sudo: authentication failed.")

    def _on_finished(self, code: int) -> None:
        self._set_busy(False)
        action = self._pending_action
        auth_failed = self._auth_failed_this_run
        self._auth_failed_this_run = False
        if auth_failed and code != 0 and action:
            # Wrong password: let the user retry right away instead of re-clicking Install/Uninstall.
            entered = SudoDialog.ask(self, "Incorrect password, try again.")
            if entered is None:
                self._clear_pending()
                return
            self._start(self._pending_args, entered)
            return
        if action == "install" and code == NEEDS_CONFIRMATION and "--yes" not in self._pending_args:
            self._confirm_warnings()
            return
        self._clear_pending()
        if action in ("install", "uninstall"):
            self._append_line(f"({action} finished, exit code {code})")
            self._refresh_status()
            if code == 0:
                QMessageBox.information(self, APP_NAME, {
                    "install": "The override is installed. Reboot to load it.",
                    "uninstall": "The override is removed. Reboot to return to the BIOS-provided ACPI tables.",
                }[action])
        if code != 0 and action:
            QMessageBox.warning(self, APP_NAME, f"{action} failed (exit code {code}). See the output above.")

    def _confirm_warnings(self) -> None:
        """The script stopped on a warning that asks "Continue anyway?": ask here, then run it with --yes."""
        warnings = [line[len("[WARN] "):] for line in self._run_lines
                    if line.startswith("[WARN] ") and "--yes" not in line]
        answer = QMessageBox.warning(
            self, APP_NAME,
            "\n\n".join(warnings or ["The installer stopped on a warning; see the output."])
            + "\n\nContinue anyway?",
            QMessageBox.StandardButton.Yes | QMessageBox.StandardButton.No, QMessageBox.StandardButton.No)
        if answer != QMessageBox.StandardButton.Yes:
            self._append_line("Not installed.")
            self._clear_pending()
            return
        self._run_privileged([*self._pending_args, "--yes"], "install")

    def _clear_pending(self) -> None:
        self._pending_action = ""
        self._pending_args = []

    # --------------------------------------------------------------- actions
    def _start(self, args: list[str], pw: str | None) -> None:
        self._run_lines = []
        self._set_busy(True)
        self.runner.run(args, pw=pw)

    def _run_privileged(self, args: list[str], action: str) -> None:
        if self.runner.busy:
            return
        self._pending_action = action
        self._pending_args = args
        if self.runner.sudo_ready():
            self._start(args, None)
            return
        entered = SudoDialog.ask(self)
        if entered is None:
            self._clear_pending()
            return
        self._start(args, entered)

    def _on_install(self) -> None:
        answer = QMessageBox.question(
            self, APP_NAME,
            "Install the ACPI override?\n\n"
            "This copies acpi_override.cpio to /boot, adds one line to /etc/default/grub and regenerates the "
            "GRUB configuration. The new tables load after a reboot. Uninstall reverses all three.\n\n"
            "Don't combine it with a modded BIOS that already brings its own ACPI fixes.",
        )
        if answer != QMessageBox.StandardButton.Yes:
            return
        self._run_privileged(["--install"], "install")

    def _on_uninstall(self) -> None:
        answer = QMessageBox.question(
            self, APP_NAME,
            "Remove the ACPI override? After the next reboot the board uses the BIOS-provided ACPI tables "
            "again: no C-states and no frequency scaling.",
        )
        if answer != QMessageBox.StandardButton.Yes:
            return
        self._run_privileged(["--uninstall"], "uninstall")

    def _on_sudo_status(self) -> None:
        self._run_privileged(["--status"], "status")

    def _refresh_status(self) -> None:
        if self.runner.busy:
            return
        self._pending_action = ""
        self._run_lines = []
        self.runner.run_unprivileged(["--status"])
