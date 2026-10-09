# SPDX-License-Identifier: GPL-3.0-or-later
"""The portal window: bazzite-test fixed in first place, then one card ("pill") per optional app.

Install, update and uninstall run the app's own installer in a terminal window (they may ask for the sudo
password and print what they do); the portal watches for the exit file the terminal writes and then refreshes.
An app that changes the board (unlocks, governor, ACPI) gets a warning before it is installed or opened.

Updates: a red dot marks every card whose installed app differs from the version this portal pins, the header counts
them, and at start the portal looks for a newer portal release on GitHub (which is how newer app versions arrive)."""

from __future__ import annotations

import shlex
import subprocess
import tempfile
import uuid
from collections.abc import Callable
from dataclasses import dataclass
from pathlib import Path, PurePath

from PyQt6.QtCore import QTimer, Qt, QUrl, pyqtSignal
from PyQt6.QtGui import QDesktopServices, QPixmap
from PyQt6.QtWidgets import (
    QFrame, QHBoxLayout, QLabel, QMainWindow, QMenu, QMessageBox, QPushButton, QScrollArea, QVBoxLayout, QWidget,
)

from bc250_core.platform import expand, launch_in_terminal
from bc250_core.settings import open_settings, restore_geometry, save_geometry
from bc250_core.theme import ORANGE, RED, header_font
from bc250_core.updates import ReleaseInfo, UpdateChecker, version_tuple
from bc250_core.widgets import ClickableLogo, StatusPill, accent_button, hint_label

from . import APP_ICONS, APP_NAME, INFO, LOGO_PATH, __version__
from .manifest import AppEntry
from .sources import Records, SourceError, Sources, is_installed

POLL_MS = 1000
ICON_PX = 24                    # the app icon in front of the name on its card

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


def red_dot(tooltip: str = "") -> QLabel:
    """The small red dot that marks an available update."""
    dot = QLabel()
    dot.setFixedSize(10, 10)
    dot.setStyleSheet(f"background:{RED}; border-radius:5px;")
    dot.setToolTip(tooltip)
    dot.hide()
    return dot


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
        title_row = QHBoxLayout()
        title_row.setSpacing(8)
        self.icon = QLabel()
        icon = APP_ICONS / f"{entry.key}.png"
        if icon.is_file():
            self.icon.setPixmap(QPixmap(str(icon)).scaled(
                ICON_PX, ICON_PX, Qt.AspectRatioMode.KeepAspectRatio, Qt.TransformationMode.SmoothTransformation))
        self.icon.setVisible(not self.icon.pixmap().isNull())
        title_row.addWidget(self.icon)
        title = QLabel(entry.name)
        title.setStyleSheet(header_font() + "font-size:16px; font-weight:700;")
        title_row.addWidget(title)
        title_row.addStretch(1)
        text.addLayout(title_row)
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

        self.dot = red_dot()
        row.addWidget(self.dot, 0, Qt.AlignmentFlag.AlignVCenter)
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

    def show_state(self, installed: bool, installed_tag: str, busy: str = "") -> bool:
        """Show the app's state; True when an update is available."""
        entry = self.entry
        # An update needs a known, different tag: an app installed some other way has none recorded.
        update = installed and bool(installed_tag) and installed_tag not in (entry.tag, "local")
        self.dot.setVisible(update)
        self.dot.setToolTip(f"Update available: {entry.tag} (installed {installed_tag})." if update else "")
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
        return update


class MainWindow(QMainWindow):
    def __init__(self, entries: list[AppEntry], sources: Sources, records: Records,
                 portal_check: Callable[[], ReleaseInfo] | None = None, parent: QWidget | None = None):
        """*portal_check* returns the newest portal release (run once, off the GUI thread); None: no check."""
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
        self.updates_label = QLabel()
        self.updates_label.setStyleSheet(f"color:{RED}; font-weight:700;")
        self.updates_label.hide()
        header.addWidget(self.updates_label)
        self.portal_button = QPushButton()
        self.portal_button.setStyleSheet(f"color:{RED}; font-weight:700;")
        self.portal_button.clicked.connect(self._open_portal_release)
        self.portal_button.hide()
        header.addWidget(self.portal_button)
        self.portal_release: ReleaseInfo | None = None
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
        self.portal_checker = UpdateChecker(self)
        self.portal_checker.finished.connect(self._portal_checked)
        if portal_check is not None:
            self.portal_checker.start(portal_check)

    # ------------------------------------------------------------------------------------------- state
    def busy(self) -> bool:
        return self.pending is not None or self._job is not None

    def refresh(self) -> None:
        updates = 0
        for entry in self.entries:
            busy = ""
            if self._job and self._job[0] is entry:
                busy = "Downloading…" if not self.sources.local else "Preparing…"
            elif self.pending and self.pending.entry is entry:
                busy = "Installing…" if self.pending.action == "install" else "Removing…"
            card = self.cards[entry.key]
            updates += card.show_state(is_installed(entry), self.records.get(entry.key), busy)
            if self.busy() and not busy:
                card.install_button.setEnabled(False)
                card.uninstall_button.setEnabled(False)
        self.updates_label.setText(f"\u25cf {updates} update{'s' if updates != 1 else ''}")
        self.updates_label.setToolTip("Apps whose installed version differs from the one this portal pins; "
                                      "each has a red dot and an Update button.")
        self.updates_label.setVisible(updates > 0)

    def _portal_checked(self, release: object) -> None:
        """A newer portal release brings newer pinned app versions; offer its release page."""
        if not isinstance(release, ReleaseInfo) or release.error or not release.version:
            return                                      # offline or no release yet: nothing to announce
        if version_tuple(release.version) <= version_tuple(__version__):
            return
        self.portal_release = release
        self.portal_button.setText(f"\u25cf Portal {release.version} available")
        self.portal_button.setToolTip(f"Released {release.published}. A new portal version pins newer app versions; "
                                      "click to open its release page.")
        self.portal_button.show()

    def _open_portal_release(self) -> None:
        if self.portal_release is not None:
            QDesktopServices.openUrl(QUrl(self.portal_release.url))

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
        self.portal_checker.stop(2000)
        super().closeEvent(event)
