# SPDX-License-Identifier: GPL-3.0-or-later
"""The portal window: bazzite-test fixed in first place, then one card ("pill") per optional app.

Install, update and uninstall run the app's own installer in a terminal window (they may ask for the sudo
password and print what they do); the portal watches for the exit file the terminal writes and then refreshes.
An app that changes the board (unlocks, governor, ACPI) gets a warning before it is installed or opened."""

from __future__ import annotations

import shlex
import subprocess
import tempfile
import uuid
from dataclasses import dataclass
from pathlib import Path, PurePath

from PyQt6.QtCore import QTimer, Qt, pyqtSignal
from PyQt6.QtWidgets import (
    QFrame, QHBoxLayout, QLabel, QMainWindow, QMenu, QMessageBox, QPushButton, QScrollArea, QVBoxLayout, QWidget,
)

from bc250_core.platform import expand, launch_in_terminal
from bc250_core.settings import open_settings, restore_geometry, save_geometry
from bc250_core.theme import ORANGE, header_font
from bc250_core.updates import UpdateChecker
from bc250_core.widgets import ClickableLogo, StatusPill, accent_button, hint_label

from . import APP_NAME, INFO, LOGO_PATH, __version__
from .manifest import AppEntry
from .sources import Records, SourceError, Sources, is_installed

POLL_MS = 1000

BOARD_WARNING = (
    "<p><b>{name} changes how your BC-250 runs</b> (clocks, voltages, unlocked units or firmware tables).</p>"
    "<p>A wrong setting can make the board unstable or stop it from booting until the change is undone. Read the "
    "app's manual first, know how to undo the change, and keep a way to reach the board without its desktop.</p>"
    "<p>{action}?</p>")


@dataclass
class Pending:
    entry: AppEntry
    action: str                 # "install" | "uninstall"
    exit_file: Path
    tag: str


def shell_line(folder: PurePath, commands: tuple[str, ...]) -> str:
    """cd into the extracted app and run its commands in order, stopping at the first failure."""
    return " && ".join([f"cd {shlex.quote(str(folder))}", *commands])


class AppCard(QFrame):
    """One app: name, summary, pinned tag, state pill and its buttons."""

    install_clicked = pyqtSignal(object)
    uninstall_clicked = pyqtSignal(object)
    open_clicked = pyqtSignal(object, str)

    def __init__(self, entry: AppEntry, parent: QWidget | None = None):
        super().__init__(parent)
        self.entry = entry
        self.setObjectName("card")
        self.setStyleSheet("QFrame#card { border:1px solid palette(mid); border-radius:8px; }")
        row = QHBoxLayout(self)
        row.setContentsMargins(14, 10, 14, 10)
        text = QVBoxLayout()
        title = QLabel(entry.name)
        title.setStyleSheet(header_font() + "font-size:16px; font-weight:700;")
        text.addWidget(title)
        text.addWidget(hint_label(entry.summary))
        badges = [entry.tag]
        if entry.required:
            badges.append("always installed")
        if entry.changes_board:
            badges.append(f"<span style='color:{ORANGE}; font-weight:700;'>changes the board</span>")
        self.badges = QLabel(" · ".join(badges))
        self.badges.setStyleSheet("color:palette(placeholder-text); font-size:11px;")
        text.addWidget(self.badges)
        row.addLayout(text, 1)

        self.pill = StatusPill()
        row.addWidget(self.pill, 0, Qt.AlignmentFlag.AlignVCenter)
        self.open_button = QPushButton("Open")
        if len(entry.launch) > 1:
            menu = QMenu(self.open_button)
            for label, command in entry.launch:
                menu.addAction(label, lambda c=command: self.open_clicked.emit(self.entry, c))
            self.open_button.setMenu(menu)
        elif entry.launch:
            self.open_button.clicked.connect(lambda: self.open_clicked.emit(self.entry, entry.launch[0][1]))
        self.open_button.setVisible(bool(entry.launch))
        self.install_button = accent_button("Install")
        self.install_button.clicked.connect(lambda: self.install_clicked.emit(self.entry))
        self.uninstall_button = QPushButton("Uninstall")
        self.uninstall_button.clicked.connect(lambda: self.uninstall_clicked.emit(self.entry))
        # bazzite-test is part of the suite: it goes when the portal is uninstalled (packaging/install.sh --uninstall).
        self.uninstall_button.setVisible(not entry.required)
        for button in (self.open_button, self.install_button, self.uninstall_button):
            row.addWidget(button, 0, Qt.AlignmentFlag.AlignVCenter)

    def show_state(self, installed: bool, installed_tag: str, busy: str = "") -> None:
        entry = self.entry
        # An update needs a known, different tag: an app installed some other way has none recorded.
        update = installed and bool(installed_tag) and installed_tag not in (entry.tag, "local")
        if busy:
            self.pill.set_status(busy, "info")
        elif not installed:
            self.pill.set_status("Not installed", "neutral")
        elif update:
            self.pill.set_status("Update", "warn", f"Installed {installed_tag}; this portal pins {entry.tag}.")
        else:
            self.pill.set_status("Installed", "ok", f"Installed from {installed_tag}." if installed_tag else
                                 "Installed (not by this portal, so its version is unknown).")
        self.install_button.setText("Update" if update else ("Reinstall" if installed else "Install"))
        self.install_button.setEnabled(not busy)
        self.uninstall_button.setEnabled(installed and not busy)
        self.open_button.setEnabled(installed and not busy)


class MainWindow(QMainWindow):
    def __init__(self, entries: list[AppEntry], sources: Sources, records: Records, parent: QWidget | None = None):
        super().__init__(parent)
        self.entries = entries
        self.sources = sources
        self.records = records
        self.pending: Pending | None = None
        self.worker = UpdateChecker(self)               # generic: runs one job off the GUI thread
        self.worker.finished.connect(self._prepared)
        self._job: tuple[AppEntry, str] | None = None
        self.settings = open_settings(INFO, self)
        self.setWindowTitle(INFO.display_name)
        self.resize(900, 720)

        central = QWidget()
        root = QVBoxLayout(central)
        header = QHBoxLayout()
        if LOGO_PATH.is_file():
            header.addWidget(ClickableLogo(LOGO_PATH, 56))
        title = QLabel(f"{APP_NAME}  <span style='color:#9aa0a6; font-size:14px;'>v{__version__}</span>")
        title.setStyleSheet(header_font() + "font-size:24px; font-weight:800;")
        header.addWidget(title, 1)
        refresh = QPushButton("Refresh")
        refresh.setToolTip("Look again at which apps are installed.")
        refresh.clicked.connect(self._on_refresh)
        header.addWidget(refresh)
        root.addLayout(header)
        source = ("Development: apps install from the local checkout " + str(sources.checkout) if sources.local
                  else "Apps install from the releases this portal version pins, verified by checksum.")
        self.source_label = hint_label(source)
        root.addWidget(self.source_label)

        cards = QWidget()
        column = QVBoxLayout(cards)
        column.setContentsMargins(0, 0, 0, 0)
        self.cards: dict[str, AppCard] = {}
        for entry in entries:
            card = AppCard(entry)
            card.install_clicked.connect(self.install)
            card.uninstall_clicked.connect(self.uninstall)
            card.open_clicked.connect(self.open_app)
            self.cards[entry.key] = card
            column.addWidget(card)
        column.addStretch(1)
        scroll = QScrollArea()
        scroll.setWidgetResizable(True)
        scroll.setFrameShape(QFrame.Shape.NoFrame)
        scroll.setWidget(cards)
        root.addWidget(scroll, 1)
        self.setCentralWidget(central)

        self.poll = QTimer(self)
        self.poll.setInterval(POLL_MS)
        self.poll.timeout.connect(self._check_pending)
        restore_geometry(self, self.settings)
        self.refresh()

    # ------------------------------------------------------------------------------------------- state
    def busy(self) -> bool:
        return self.pending is not None or self._job is not None

    def refresh(self) -> None:
        for entry in self.entries:
            busy = ""
            if self._job and self._job[0] is entry:
                busy = "Downloading…" if not self.sources.local else "Preparing…"
            elif self.pending and self.pending.entry is entry:
                busy = "Installing…" if self.pending.action == "install" else "Removing…"
            card = self.cards[entry.key]
            card.show_state(is_installed(entry), self.records.get(entry.key), busy)
            if self.busy() and not busy:
                card.install_button.setEnabled(False)
                card.uninstall_button.setEnabled(False)

    # ----------------------------------------------------------------------------------------- actions
    def _confirm_board_change(self, entry: AppEntry, action: str) -> bool:
        if not entry.changes_board:
            return True
        answer = QMessageBox.warning(
            self, APP_NAME, BOARD_WARNING.format(name=entry.name, action=action),
            QMessageBox.StandardButton.Yes | QMessageBox.StandardButton.Cancel, QMessageBox.StandardButton.Cancel)
        return answer == QMessageBox.StandardButton.Yes

    def install(self, entry: AppEntry) -> None:
        if self.busy() or not self._confirm_board_change(entry, f"Install {entry.name}"):
            return
        self._start(entry, "install")

    def uninstall(self, entry: AppEntry) -> None:
        if self.busy():
            return
        answer = QMessageBox.question(self, APP_NAME, f"Uninstall {entry.name}? Its own uninstaller runs in a "
                                      "terminal; settings and results are kept unless it asks otherwise.")
        if answer == QMessageBox.StandardButton.Yes:
            self._start(entry, "uninstall")

    def _start(self, entry: AppEntry, action: str) -> None:
        self._job = (entry, action)
        self.refresh()
        self.worker.start(lambda: self._prepare(entry))

    def _prepare(self, entry: AppEntry) -> Path | Exception:
        """Worker thread: fetch or stage the app. Returns the folder, or the error to show."""
        try:
            return self.sources.prepare(entry)
        except (SourceError, OSError) as exc:
            return exc

    def _prepared(self, result: object) -> None:
        entry, action = self._job or (None, "")
        self._job = None
        if entry is None:
            return
        if isinstance(result, Exception):
            QMessageBox.critical(self, APP_NAME, f"{entry.name} could not be prepared:\n\n{result}")
            self.refresh()
            return
        folder = Path(result)
        commands = entry.install if action == "install" else entry.uninstall
        # A fresh name; the terminal creates the file when the commands end.
        exit_file = Path(tempfile.gettempdir()) / f"bc250-portal-{entry.key}-{uuid.uuid4().hex}.exit"
        try:
            launch_in_terminal(shell_line(folder, commands), exit_file=exit_file)
        except (RuntimeError, OSError) as exc:
            QMessageBox.critical(self, APP_NAME, f"Could not open a terminal for the installer:\n\n{exc}\n\n"
                                 f"Run it by hand instead:\n{shell_line(folder, commands)}")
            self.refresh()
            return
        self.pending = Pending(entry, action, exit_file, "local" if self.sources.local else entry.tag)
        self.poll.start()
        self.refresh()

    def _check_pending(self) -> None:
        pending = self.pending
        if pending is None:
            self.poll.stop()
            return
        try:
            status = pending.exit_file.read_text(encoding="utf-8").strip()
        except OSError:
            return                                      # still running (or the terminal was closed: see Refresh)
        self.poll.stop()
        self.pending = None
        pending.exit_file.unlink(missing_ok=True)
        entry = pending.entry
        ok = status == "0"
        if ok and pending.action == "install":
            self.records.set(entry.key, pending.tag)
        elif ok:
            self.records.remove(entry.key)
            self.sources.forget(entry)
        self.refresh()
        if not ok:
            QMessageBox.warning(self, APP_NAME, f"The {pending.action} of {entry.name} ended with exit status "
                                f"{status or '?'}. Its terminal window shows what happened.")

    def _on_refresh(self) -> None:
        if self.pending is not None:
            answer = QMessageBox.question(
                self, APP_NAME, f"Still waiting for the {self.pending.action} of {self.pending.entry.name} to end in "
                "its terminal window. Stop waiting (for example because that window was closed)?")
            if answer == QMessageBox.StandardButton.Yes:
                self.cancel_pending()
                return
        self.refresh()

    def cancel_pending(self) -> None:
        """Stop waiting for a terminal that was closed before its installer finished."""
        if self.pending is not None:
            self.pending.exit_file.unlink(missing_ok=True)
            self.pending = None
            self.poll.stop()
        self.refresh()

    def open_app(self, entry: AppEntry, command: str) -> None:
        if not self._confirm_board_change(entry, f"Open {entry.name}"):
            return
        argv = shlex.split(command)
        argv[0] = str(expand(argv[0]))
        try:
            subprocess.Popen(argv, start_new_session=True, stdin=subprocess.DEVNULL,
                             stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        except OSError as exc:
            QMessageBox.critical(self, APP_NAME, f"{entry.name} could not be started:\n\n{exc}")

    def closeEvent(self, event) -> None:
        save_geometry(self, self.settings)
        self.worker.stop(2000)
        super().closeEvent(event)
