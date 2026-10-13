# SPDX-License-Identifier: AGPL-3.0-or-later
"""The main window: the consoles on the network (search, also at one address), registering the board with one of
them, and the registered consoles with Wake, Test session, Test stream and Rest mode. Every network step runs off
the GUI thread (jobs.py through core's UpdateChecker) and reports back in the log at the bottom."""

from __future__ import annotations

from dataclasses import replace
from pathlib import Path
from types import ModuleType
from typing import Callable

from PyQt6.QtCore import Qt, QUrl
from PyQt6.QtGui import QCloseEvent, QDesktopServices, QGuiApplication
from PyQt6.QtWidgets import (QAbstractItemView, QDialog, QDialogButtonBox, QGroupBox, QHBoxLayout, QHeaderView,
                             QInputDialog, QLabel, QLineEdit, QMainWindow, QMessageBox, QPushButton, QTableWidget,
                             QTableWidgetItem, QVBoxLayout, QWidget)

from bc250_core import SUITE_MANUAL_URL
from bc250_core import __version__ as CORE_VERSION
from bc250_core.platform import config_home
from bc250_core.settings import SettingsStore
from bc250_core.theme import ORANGE, PURPLE
from bc250_core.updates import UpdateChecker
from bc250_core.widgets import AppHeader, MetricBox, StatusText, Terminal, accent_button, hint_label

from . import APP_ID, APP_NAME, INFO, LOGO_PATH, __version__, jobs, psn
from .consoles import ConsoleStore, RegisteredConsole, parse_account_id, parse_login_pin, parse_pin
from .discovery import Console
from .jobs import Outcome
from .target import rp_version

MANUAL_URL = f"{SUITE_MANUAL_URL}apps/console-link/"
DARK_BLUE = "#0d47a1"
BLACK = "#000000"
STATES = {"ready": "On", "standby": "Rest mode", "unknown": "Unknown"}
Runner = Callable[[Callable[[], Outcome], Callable[[Outcome], None]], bool]


class RemotePlaySettings(SettingsStore):
    DEFAULTS = {"account_id": "", "address": ""}


class AccountDialog(QDialog):
    """The PlayStation sign-in in the browser, then the address it ends on pasted back: the way to the PSN account
    ID."""

    def __init__(self, parent: QWidget | None = None):
        super().__init__(parent)
        self.setWindowTitle(f"{APP_NAME}: find your account ID")
        self.url = psn.login_url()
        open_button = accent_button("Open the PlayStation sign-in",
                                    "Opens the PlayStation sign-in page in your browser")
        open_button.clicked.connect(lambda: QDesktopServices.openUrl(QUrl(self.url, QUrl.ParsingMode.StrictMode)))
        copy_button = QPushButton("Copy the link")
        copy_button.setToolTip("For a browser on another device")
        copy_button.clicked.connect(lambda: QGuiApplication.clipboard().setText(self.url))
        self.redirect_edit = QLineEdit()
        self.redirect_edit.setPlaceholderText("https://remoteplay.dl.playstation.net/remoteplay/redirect?code=…")
        buttons = QDialogButtonBox(QDialogButtonBox.StandardButton.Ok | QDialogButtonBox.StandardButton.Cancel)
        buttons.button(QDialogButtonBox.StandardButton.Ok).setText("Get account ID")
        buttons.accepted.connect(self.accept)
        buttons.rejected.connect(self.reject)
        row = QHBoxLayout()
        row.addWidget(open_button)
        row.addWidget(copy_button)
        row.addStretch(1)
        lay = QVBoxLayout(self)
        lay.addWidget(QLabel("1. Sign in with the PSN account you use on the console, on the official PlayStation "
                             "page:"))
        lay.addLayout(row)
        lay.addWidget(QLabel("2. The sign-in then shows a page that only says \"redirect\". Copy that page's address "
                             "from the address bar\n    and paste it here:"))
        lay.addWidget(self.redirect_edit)
        lay.addWidget(hint_label(
            "The app sends the code in that address to PSN once, to read your account ID, and keeps only the ID. "
            "The code works for a few minutes."))
        lay.addWidget(buttons)
        self.resize(640, self.sizeHint().height())


def _item(text: str) -> QTableWidgetItem:
    item = QTableWidgetItem(text)
    item.setFlags(Qt.ItemFlag.ItemIsEnabled | Qt.ItemFlag.ItemIsSelectable)
    return item


def _table(headers: list[str]) -> QTableWidget:
    table = QTableWidget(0, len(headers))
    table.setHorizontalHeaderLabels(headers)
    table.verticalHeader().setVisible(False)
    table.setSelectionBehavior(QAbstractItemView.SelectionBehavior.SelectRows)
    table.setSelectionMode(QAbstractItemView.SelectionMode.SingleSelection)
    table.setEditTriggers(QAbstractItemView.EditTrigger.NoEditTriggers)
    table.horizontalHeader().setSectionResizeMode(QHeaderView.ResizeMode.ResizeToContents)
    table.horizontalHeader().setStretchLastSection(True)
    table.setMinimumHeight(110)
    return table


class MainWindow(QMainWindow):
    def __init__(self, config_dir: Path | None = None, ops: ModuleType = jobs, run: Runner | None = None):
        super().__init__()
        self.resize(900, 860)
        self.store = ConsoleStore((config_dir or config_home()) / APP_ID)
        self.ops = ops
        self.settings = RemotePlaySettings(INFO, self)
        self.checker = UpdateChecker(self)
        self.checker.finished.connect(self._finished)
        self._after: Callable[[Outcome], None] | None = None
        self.busy = False
        self.run = run or self._run_threaded
        self.found: list[Console] = []
        self.registered: list[RegisteredConsole] = self.store.load()

        header = AppHeader(LOGO_PATH, APP_NAME, __version__)
        self.badge = StatusText()
        header.add_state(self.badge)
        self.found_box = MetricBox("On the network", DARK_BLUE)
        self.registered_box = MetricBox("Registered", ORANGE)
        self.session_box = MetricBox("Last session", BLACK)
        self.console_box = MetricBox("Console type", PURPLE)
        for box in (self.found_box, self.registered_box, self.session_box, self.console_box):
            header.add_second(box)

        network = QGroupBox("Consoles on the network")
        self.found_table = _table(["Name", "Model", "Address", "State", "System", "Registered"])
        self.found_table.itemSelectionChanged.connect(self._update_buttons)
        self.search_button = accent_button("Search", "Ask every PS4 and PS5 on the network to answer")
        self.search_button.clicked.connect(self.search)
        self.address_edit = QLineEdit(self.settings.get("address"))
        self.address_edit.setPlaceholderText("Console address, e.g. 192.168.1.20")
        self.address_edit.setMinimumWidth(240)
        self.address_edit.setToolTip("For networks that do not pass broadcasts: ask one address")
        self.address_button = QPushButton("Search at address")
        self.address_button.clicked.connect(self.search_address)
        search_row = QHBoxLayout()
        search_row.addWidget(self.search_button)
        search_row.addStretch(1)
        search_row.addWidget(self.address_edit)
        search_row.addWidget(self.address_button)
        lay_network = QVBoxLayout(network)
        lay_network.addLayout(search_row)
        lay_network.addWidget(self.found_table)
        lay_network.addWidget(hint_label(
            "The console answers when Remote Play is on (Settings > System > Remote Play). In rest mode it only "
            "answers when its rest-mode settings keep it connected to the internet and allow turning it on from "
            "the network."))

        register = QGroupBox("Register the board with a console")
        self.account_edit = QLineEdit(self.settings.get("account_id"))
        self.account_edit.setPlaceholderText("PSN account ID: a number, or the 12-character code ending with =")
        self.pin_edit = QLineEdit()
        self.pin_edit.setPlaceholderText("8-digit PIN from the console")
        self.pin_edit.setMaxLength(9)
        self.account_button = QPushButton("Find my account ID…")
        self.account_button.setToolTip("Sign in to PSN in your browser to read your account ID")
        self.account_button.clicked.connect(self.find_account_id)
        self.register_button = QPushButton("Register with selected console")
        self.register_button.clicked.connect(self.register)
        form = QHBoxLayout()
        form.addWidget(QLabel("Account ID:"))
        form.addWidget(self.account_edit, 2)
        form.addWidget(self.account_button)
        form.addWidget(QLabel("PIN:"))
        form.addWidget(self.pin_edit, 1)
        form.addWidget(self.register_button)
        lay_register = QVBoxLayout(register)
        lay_register.addLayout(form)
        lay_register.addWidget(hint_label(
            "On a PS5, open Settings > System > Remote Play > Link Device; on a PS4, Settings > Remote Play "
            "Connection Settings > Add Device: it shows an 8-digit PIN for a few minutes. The account ID is your "
            "PSN account's number, not your online name: Find my account ID reads it through the PlayStation sign-in. "
            f"<a href='{MANUAL_URL}'>More in the manual</a>"))

        mine = QGroupBox("Registered consoles")
        self.registered_table = _table(["Name", "Model", "Address", "Remote Play", "Login passcode"])
        self.registered_table.itemSelectionChanged.connect(self._update_buttons)
        self.wake_button = QPushButton("Wake")
        self.wake_button.setToolTip("Turn the console on from rest mode")
        self.wake_button.clicked.connect(self.wake)
        self.test_button = accent_button("Test session", "Start a session, keep it a few seconds and close it")
        self.test_button.clicked.connect(self.test_session)
        self.stream_button = QPushButton("Test stream")
        self.stream_button.setToolTip("Start a session, test the network, run the stream for a few seconds and count "
                                      "the video and audio that arrive (nothing is shown yet)")
        self.stream_button.clicked.connect(self.test_stream)
        self.rest_button = QPushButton("Rest mode")
        self.rest_button.setToolTip("Put the console in rest mode")
        self.rest_button.clicked.connect(self.rest_mode)
        self.passcode_button = QPushButton("Login passcode…")
        self.passcode_button.setToolTip("The 4-digit passcode of the PSN account on the console, if it has one")
        self.passcode_button.clicked.connect(self.set_passcode)
        self.remove_button = QPushButton("Remove")
        self.remove_button.setToolTip("Forget this console's keys on the board")
        self.remove_button.clicked.connect(self.remove)
        buttons = QHBoxLayout()
        for button in (self.wake_button, self.test_button, self.stream_button, self.rest_button):
            buttons.addWidget(button)
        buttons.addStretch(1)
        buttons.addWidget(self.passcode_button)
        buttons.addWidget(self.remove_button)
        lay_mine = QVBoxLayout(mine)
        lay_mine.addWidget(self.registered_table)
        lay_mine.addLayout(buttons)
        lay_mine.addWidget(hint_label(
            "The keys from registration are stored in ~/.config/bc250-console-link/consoles.json, readable only by "
            "you. Remove forgets them here; a PS5 also lists the board under Link Device, where it can be removed. "
            "A PS4 only keeps a history, under Remote Play Connection Settings > Connection History."))

        self.log = Terminal()
        self.log.setMinimumHeight(120)

        central = QWidget()
        lay = QVBoxLayout(central)
        lay.addLayout(header)
        lay.addWidget(network)
        lay.addWidget(register)
        lay.addWidget(mine)
        lay.addWidget(self.log, 1)
        version = QLabel(f"{APP_NAME} {__version__} · core {CORE_VERSION}\n"
                         "Talks to consoles and PSN only when you press a button.")
        version.setAlignment(Qt.AlignmentFlag.AlignRight)
        version.setStyleSheet("color:palette(placeholder-text);")
        lay.addWidget(version, 0, Qt.AlignmentFlag.AlignRight)
        self.setCentralWidget(central)

        geometry = self.settings.window_state("geometry")
        if geometry is not None:
            self.restoreGeometry(geometry)
        self._show_found()
        self._show_registered()
        self.session_box.set_value("—")
        self.badge.set_status("Ready", "neutral")
        self._update_buttons()

    # --- Jobs -------------------------------------------------------------------------------------------------

    def _run_threaded(self, job: Callable[[], Outcome], after: Callable[[Outcome], None]) -> bool:
        if not self.checker.start(job):
            return False
        self._after = after
        return True

    def _finished(self, outcome: Outcome) -> None:
        after, self._after = self._after, None
        if after is not None:
            after(outcome)

    def start(self, busy: str, job: Callable[[], Outcome], after: Callable[[Outcome], None] | None = None) -> None:
        def done(outcome: Outcome) -> None:
            self.busy = False
            for line in outcome.log:
                self.say(f"  {line}")
            self.say(outcome.message)
            self.badge.set_status("Ready" if outcome.ok else "Failed", "ok" if outcome.ok else "bad", outcome.message)
            if after is not None:
                after(outcome)
            self._update_buttons()

        self.busy = True
        self.badge.set_status(busy, "info")
        self.say(busy)
        self._update_buttons()
        if not self.run(job, done):
            self.busy = False
            self._update_buttons()


    def say(self, text: str) -> None:
        self.log.appendPlainText(text)

    # --- Selection and tables ---------------------------------------------------------------------------------

    def selected_found(self) -> Console | None:
        rows = self.found_table.selectionModel().selectedRows()
        return self.found[rows[0].row()] if rows else None

    def selected_registered(self) -> RegisteredConsole | None:
        rows = self.registered_table.selectionModel().selectedRows()
        return self.registered[rows[0].row()] if rows else None

    def _registered_for(self, console: Console) -> RegisteredConsole | None:
        for registered in self.registered:
            if (console.host_id and registered.host_id == console.host_id) or registered.address == console.address:
                return registered
        return None

    def _show_found(self) -> None:
        self.found_table.setRowCount(len(self.found))
        for row, console in enumerate(self.found):
            values = (console.host_name or "—", console.model, console.address, STATES[console.state],
                      console.system_version or "—", "yes" if self._registered_for(console) else "no")
            for col, value in enumerate(values):
                self.found_table.setItem(row, col, _item(value))
        self.found_box.set_value(str(len(self.found)))

    def _show_registered(self) -> None:
        self.registered_table.setRowCount(len(self.registered))
        for row, console in enumerate(self.registered):
            values = (console.nickname or "—", console.target.console, console.address,
                      rp_version(console.target) or "unknown", "set" if console.login_pin else "none")
            for col, value in enumerate(values):
                self.registered_table.setItem(row, col, _item(value))
        self.registered_box.set_value(str(len(self.registered)))

    def _update_buttons(self) -> None:
        idle = not self.busy
        found = self.selected_found() is not None
        registered = self.selected_registered() is not None
        for button in (self.search_button, self.address_button, self.account_button):
            button.setEnabled(idle)
        self.register_button.setEnabled(idle and found)
        for button in (self.wake_button, self.test_button, self.stream_button, self.rest_button):
            button.setEnabled(idle and registered)
        for button in (self.passcode_button, self.remove_button):
            button.setEnabled(idle and registered)

    # --- Actions ----------------------------------------------------------------------------------------------

    def search(self) -> None:
        self.start("Searching…", lambda: self.ops.find(), self._found)

    def search_address(self) -> None:
        address = self.address_edit.text().strip()
        if not address:
            self.say("Enter the console's address first.")
            return
        self.settings.set("address", address)
        self.start(f"Asking {address}…", lambda: self.ops.find(address), self._found)

    def _found(self, outcome: Outcome) -> None:
        if not outcome.ok:
            return
        self.found = list(outcome.value)
        changed = False
        for console in self.found:                      # a registered console that got another address (DHCP)
            registered = self._registered_for(console)
            if registered is not None and registered.address != console.address:
                self.registered = self.store.put(replace(registered, address=console.address))
                changed = True
        if changed:
            self._show_registered()
        self._show_found()

    def ask_redirect(self) -> str | None:
        """The address the PlayStation sign-in ended on, or None when cancelled."""
        dialog = AccountDialog(self)
        if dialog.exec() != QDialog.DialogCode.Accepted:
            return None
        return dialog.redirect_edit.text()

    def find_account_id(self) -> None:
        redirect = self.ask_redirect()
        if redirect is None:
            return
        self.start("Asking PSN for the account ID…", lambda: self.ops.psn_account(redirect), self._account_done)

    def _account_done(self, outcome: Outcome) -> None:
        if outcome.ok:
            self.account_edit.setText(outcome.value.code)
            self.settings.set("account_id", outcome.value.code)

    def register(self) -> None:
        console = self.selected_found()
        if console is None:
            return
        try:
            account_id = parse_account_id(self.account_edit.text())
            pin = parse_pin(self.pin_edit.text())
        except ValueError as error:
            QMessageBox.warning(self, APP_NAME, str(error))
            return
        self.settings.set("account_id", self.account_edit.text().strip())
        self.start(f"Registering with {console.host_name or console.address}…",
                   lambda: self.ops.register(console, account_id, pin), self._registered_done)

    def _registered_done(self, outcome: Outcome) -> None:
        if outcome.ok:
            self.pin_edit.clear()
            self.registered = self.store.put(outcome.value)
            self._show_registered()
            self._show_found()

    def wake(self) -> None:
        console = self.selected_registered()
        if console is not None:
            self.start(f"Waking {console.nickname or console.address}…", lambda: self.ops.wake(console))

    def test_session(self) -> None:
        console = self.selected_registered()
        if console is not None:
            self.start(f"Starting a session with {console.nickname or console.address}…",
                       lambda: self.ops.test_session(console), self._session_done)

    def test_stream(self) -> None:
        console = self.selected_registered()
        if console is not None:
            self.start(f"Starting a stream with {console.nickname or console.address}…",
                       lambda: self.ops.test_stream(console), self._session_done)

    def rest_mode(self) -> None:
        console = self.selected_registered()
        if console is not None:
            self.start(f"Putting {console.nickname or console.address} in rest mode…",
                       lambda: self.ops.rest_mode(console), self._session_done)

    def _session_done(self, outcome: Outcome) -> None:
        self.session_box.set_value("OK" if outcome.ok else "Failed", outcome.message)
        server_type = getattr(outcome.value, "server_type", "")
        if server_type:
            self.console_box.set_value(server_type)

    def set_passcode(self) -> None:
        console = self.selected_registered()
        if console is None:
            return
        text, ok = QInputDialog.getText(self, APP_NAME, "Login passcode of the PSN account on the console "
                                        "(4 digits; empty when it has none):", QLineEdit.EchoMode.Password)
        if not ok:
            return
        try:
            passcode = parse_login_pin(text)
        except ValueError as error:
            QMessageBox.warning(self, APP_NAME, str(error))
            return
        self.registered = self.store.put(replace(console, login_pin=passcode))
        self._show_registered()
        self.say(f"Login passcode {'saved' if passcode else 'removed'} for {console.nickname or console.address}.")

    def remove(self) -> None:
        console = self.selected_registered()
        if console is None:
            return
        answer = QMessageBox.question(self, APP_NAME, f"Forget {console.nickname or console.address}? The board "
                                      "has to be registered again to use it.")
        if answer != QMessageBox.StandardButton.Yes:
            return
        self.registered = self.store.remove(console.key)
        self._show_registered()
        self._show_found()
        self._update_buttons()
        self.say(f"Removed {console.nickname or console.address}.")

    def closeEvent(self, event: QCloseEvent) -> None:
        self.checker.stop()
        self.settings.set_window_state("geometry", self.saveGeometry())
        self.settings.sync()
        super().closeEvent(event)

