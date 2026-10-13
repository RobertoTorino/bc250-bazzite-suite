# SPDX-License-Identifier: AGPL-3.0-or-later
"""The main window: the consoles on the network (search, also at one address), registering the board with one of
them, and the registered consoles with Wake, Test session, Test stream, Stream and Rest mode. Every network step
runs off the GUI thread (jobs.py through core's UpdateChecker) and reports back in the log at the bottom; Stream
shows the picture in its own window (stream_view.py) until that window closes. The personal details (account ID,
online ID, addresses) are masked until Show personal details is on, and the log is always copied masked
(privacy.py)."""

from __future__ import annotations

import threading
from dataclasses import replace
from pathlib import Path
from types import ModuleType
from typing import Callable

from PyQt6.QtCore import QEvent, QMimeData, Qt, QUrl
from PyQt6.QtGui import QCloseEvent, QDesktopServices, QGuiApplication
from PyQt6.QtWidgets import (QAbstractItemView, QCheckBox, QDialog, QDialogButtonBox, QGroupBox, QHBoxLayout,
                             QHeaderView,
                             QInputDialog, QLabel, QLineEdit, QMainWindow, QMessageBox, QPushButton, QTableWidget,
                             QTableWidgetItem, QVBoxLayout, QWidget)

from bc250_core import SUITE_MANUAL_URL
from bc250_core import __version__ as CORE_VERSION
from bc250_core.platform import config_home
from bc250_core.settings import SettingsStore
from bc250_core.theme import ORANGE, PURPLE
from bc250_core.updates import UpdateChecker
from bc250_core.widgets import AppHeader, MetricBox, StatusText, Terminal, accent_button, hint_label

from . import (APP_ID, APP_NAME, INFO, LOGO_PATH, __version__, jobs, privacy, psn, steam_settings, steam_shortcuts,
               stream_stats)
from .consoles import ConsoleStore, RegisteredConsole, parse_account_id, parse_login_pin, parse_pin
from .discovery import Console
from .jobs import Outcome
from .controller_test import ControllerTest
from .stream_view import StreamWindow
from .target import rp_version

MANUAL_URL = f"{SUITE_MANUAL_URL}apps/console-link/"
DARK_BLUE = "#0d47a1"
BLACK = "#000000"
STATES = {"ready": "On", "standby": "Rest mode", "unknown": "Unknown"}
Runner = Callable[[Callable[[], Outcome], Callable[[Outcome], None]], bool]


class RemotePlaySettings(SettingsStore):
    DEFAULTS = {"account_id": "", "address": ""}


class PrivateLineEdit(QLineEdit):
    """A field for a personal detail: while hidden it shows the value masked and cannot be edited (an empty one can,
    and is masked once left)."""

    def __init__(self, value: str, mask: Callable[[str], str]):
        super().__init__()
        self._value, self._mask, self.revealed = value, mask, False
        self._showing = False
        self.textChanged.connect(self._edited)
        self.editingFinished.connect(self._show)
        self._show()

    def value(self) -> str:
        return self._value.strip()

    def set_value(self, value: str) -> None:
        self._value = value
        self._show()

    def set_revealed(self, revealed: bool) -> None:
        self.revealed = revealed
        self._show()

    def _edited(self, text: str) -> None:
        if not self._showing and not self.isReadOnly():
            self._value = text

    def _show(self) -> None:
        hidden = not self.revealed and bool(self.value())
        self._showing = True
        try:
            self.setText(self._mask(self.value()) if hidden else self._value)
        finally:
            self._showing = False
        self.setReadOnly(hidden)


class MaskedLog(Terminal):
    """The log: copied text is always masked, whatever the window shows."""

    def __init__(self, masker: privacy.Masker):
        super().__init__()
        self.masker = masker

    def createMimeDataFromSelection(self) -> QMimeData:
        data = QMimeData()
        data.setText(self.masker.mask(self.textCursor().selectedText().replace("\u2029", "\n")))
        return data


class AccountDialog(QDialog):
    """The PlayStation sign-in in the browser, then the address it ends on, copied: the way to the PSN account ID.

    While the dialog is open it watches the clipboard (when it changes, and when the dialog has the focus again, since
    Wayland only shows a window the clipboard while it has the focus) and takes an address of the sign-in's redirect
    page with a code as soon as it is copied; anything else on the clipboard, and what was there when the dialog
    opened, is left alone. The sign-in itself stays in the user's browser: an embedded one would have the password
    typed into this app."""

    def __init__(self, parent: QWidget | None = None):
        super().__init__(parent)
        clipboard = QGuiApplication.clipboard()
        self._before = clipboard.text()
        self._watching = True
        clipboard.dataChanged.connect(self._clipboard)
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
                             "from the address bar:\n    the app takes it from there by itself (or paste it here)."))
        lay.addWidget(self.redirect_edit)
        lay.addWidget(hint_label(
            "The app sends the code in that address to PSN once, to read your account ID, and keeps only the ID. "
            "The code works for a few minutes."))
        lay.addWidget(buttons)
        self.resize(640, self.sizeHint().height())

    def _clipboard(self) -> None:
        if not self._watching:
            return
        text = QGuiApplication.clipboard().text().strip()
        if text == self._before or not text.startswith(psn.REDIRECT_URI) or "code=" not in text:
            return
        self.redirect_edit.setText(text)
        self.accept()

    def changeEvent(self, event) -> None:
        super().changeEvent(event)
        if event.type() == QEvent.Type.ActivationChange and self.isActiveWindow():
            self._clipboard()

    def done(self, result: int) -> None:
        if self._watching:
            self._watching = False
            QGuiApplication.clipboard().dataChanged.disconnect(self._clipboard)
        super().done(result)


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
        self.masker = privacy.Masker()
        self.masker.remember(account=self.settings.get("account_id"), address=self.settings.get("address"))
        for console in self.registered:
            self.masker.remember(address=console.address)
        self.revealed = False
        self.log_lines: list[str] = []
        self._badge: tuple[str, str, str] = ("Ready", "neutral", "")

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
        self.address_edit = PrivateLineEdit(self.settings.get("address"), privacy.mask_address)
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
        self.account_edit = PrivateLineEdit(self.settings.get("account_id"), privacy.mask_id)
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
                                      "the video and audio that arrive, without showing them")
        self.stream_button.clicked.connect(self.test_stream)
        self.watch_button = accent_button("Stream", "Show the console's picture and play its sound until you close "
                                          "the window; the controllers on the board play")
        self.watch_button.clicked.connect(self.watch)
        self.stream_window: StreamWindow | None = None
        self._stream_stop: threading.Event | None = None
        self.game_mode_button = QPushButton("Add to Game Mode")
        self.game_mode_button.setToolTip("A Steam shortcut for this console: in Game Mode it starts the stream full "
                                         "screen, waking the console when needed. Steam restarts for it.")
        self.game_mode_button.clicked.connect(self.add_to_game_mode)
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
        for button in (self.wake_button, self.test_button, self.stream_button, self.watch_button, self.rest_button,
                       self.game_mode_button):
            buttons.addWidget(button)
        buttons.addStretch(1)
        buttons.addWidget(self.passcode_button)
        buttons.addWidget(self.remove_button)
        self.steam = steam_settings.find_steam()
        self.steam_box = QCheckBox("Steam comes to the front on the PS button")
        self.steam_box.setToolTip("Steam's Guide Button Focus Steam (Settings > Controller > Show Advanced Settings). "
                                  "Switch it off so the PS button only goes to the console. Steam restarts for it.")
        self.steam_box.toggled.connect(self.set_steam_guide)
        self._show_steam()
        self.controller_button = QPushButton("Controller test…")
        self.controller_button.setToolTip("Every button, stick, trigger and the touchpad live, the motors and the "
                                          "light bar, and whether a Sony controller is genuine or fake")
        self.controller_button.clicked.connect(self.test_controller)
        controller_row = QHBoxLayout()
        controller_row.addWidget(self.controller_button)
        controller_row.addWidget(self.steam_box)
        controller_row.addStretch(1)
        lay_mine = QVBoxLayout(mine)
        lay_mine.addWidget(self.registered_table)
        lay_mine.addLayout(buttons)
        lay_mine.addLayout(controller_row)
        lay_mine.addWidget(hint_label(
            "The keys from registration are stored in ~/.config/bc250-console-link/consoles.json, readable only by "
            "you. Remove forgets them here; a PS5 also lists the board under Link Device, where it can be removed. "
            "A PS4 only keeps a history, under Remote Play Connection Settings > Connection History."))

        self.log = MaskedLog(self.masker)
        self.log.setMinimumHeight(120)
        self.reveal_button = QPushButton("Show personal details")
        self.reveal_button.setCheckable(True)
        self.reveal_button.setToolTip("Show the account ID, the PSN online ID and the consoles' addresses in full. "
                                      "The log is always copied with them masked.")
        self.reveal_button.toggled.connect(self.set_revealed)

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
        bottom = QHBoxLayout()
        bottom.addWidget(self.reveal_button, 0, Qt.AlignmentFlag.AlignTop)
        bottom.addStretch(1)
        bottom.addWidget(version)
        lay.addLayout(bottom)
        self.setCentralWidget(central)

        geometry = self.settings.window_state("geometry")
        if geometry is not None:
            self.restoreGeometry(geometry)
        self._show_found()
        self._show_registered()
        self.session_box.set_value("—")
        self._set_badge("Ready", "neutral")
        self._update_buttons()

    # --- Controllers ------------------------------------------------------------------------------------------

    def test_controller(self) -> None:
        """The controller test, modal: no stream or other job starts while it reads the controllers."""
        dialog = ControllerTest(self, **self.controller_test_options)
        dialog.resize(760, 640)
        dialog.exec()

    controller_test_options: dict = {}           # the tests give the dialog a stand-in for SDL

    def add_to_game_mode(self) -> None:
        console = self.selected_registered()
        if console is None or self.steam is None:
            return
        if steam_settings.steam_running() and QMessageBox.question(
                self, APP_NAME, "Steam has to close to add the shortcut, and starts again in the background right "
                "after. Close and restart Steam now?") != QMessageBox.StandardButton.Yes:
            return
        steam = self.steam
        self.start("Adding the Steam shortcut…", lambda: self.ops.steam_shortcut(console, steam))

    # --- Steam's PS button ------------------------------------------------------------------------------------

    def _show_steam(self) -> None:
        """The checkbox as Steam has the setting; hidden without Steam, disabled in Game Mode."""
        configs = steam_settings.user_configs(self.steam) if self.steam else []
        on = steam_settings.guide_focus(configs)
        self.steam_box.setVisible(on is not None)
        self.steam_box.blockSignals(True)
        self.steam_box.setChecked(bool(on))
        self.steam_box.blockSignals(False)
        if steam_settings.game_mode():
            self.steam_box.setEnabled(False)
            self.steam_box.setToolTip("In Game Mode Steam keeps the PS button for its own menu.")

    def set_steam_guide(self, on: bool) -> None:
        if steam_settings.steam_running() and QMessageBox.question(
                self, APP_NAME, "Steam has to close for this and starts again in the background right after. "
                "Close and restart Steam now?") != QMessageBox.StandardButton.Yes:
            self._show_steam()
            return
        steam = self.steam
        self.start("Changing Steam's PS button setting…", lambda: self.ops.steam_guide_focus(on, steam),
                   lambda outcome: self._show_steam())

    # --- Personal details -------------------------------------------------------------------------------------

    def shown(self, text: str) -> str:
        return text if self.revealed else self.masker.mask(text)

    def set_revealed(self, revealed: bool) -> None:
        self.revealed = revealed
        self.account_edit.set_revealed(revealed)
        self.address_edit.set_revealed(revealed)
        self._show_found()
        self._show_registered()
        self._show_log()
        self._set_badge(*self._badge)

    def remember(self, **details: str) -> None:
        """A personal detail to mask from now on; what is shown already is masked again."""
        if self.masker.remember(**details):
            self._show_log()

    def _show_log(self) -> None:
        self.log.set_text("\n".join(self.shown(line) for line in self.log_lines))

    def _set_badge(self, text: str, kind: str, tooltip: str = "") -> None:
        self._badge = (text, kind, tooltip)
        self.badge.set_status(text, kind, self.shown(tooltip))

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
            self._set_badge("Ready" if outcome.ok else "Failed", "ok" if outcome.ok else "bad", outcome.message)
            if after is not None:
                after(outcome)
            self._update_buttons()

        self.busy = True
        self._set_badge(busy, "info")
        self.say(busy)
        self._update_buttons()
        if not self.run(job, done):
            self.busy = False
            self._update_buttons()


    def say(self, text: str) -> None:
        self.log_lines.append(text)
        self.log.appendPlainText(self.shown(text))

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
            values = (console.host_name or "—", console.model, self._address(console.address), STATES[console.state],
                      console.system_version or "—", "yes" if self._registered_for(console) else "no")
            for col, value in enumerate(values):
                self.found_table.setItem(row, col, _item(value))
        self.found_box.set_value(str(len(self.found)))

    def _show_registered(self) -> None:
        self.registered_table.setRowCount(len(self.registered))
        for row, console in enumerate(self.registered):
            values = (console.nickname or "—", console.target.console, self._address(console.address),
                      rp_version(console.target) or "unknown", "set" if console.login_pin else "none")
            for col, value in enumerate(values):
                self.registered_table.setItem(row, col, _item(value))
        self.registered_box.set_value(str(len(self.registered)))

    def _address(self, address: str) -> str:
        return address if self.revealed else privacy.mask_address(address)

    def _update_buttons(self) -> None:
        idle = not self.busy
        found = self.selected_found() is not None
        registered = self.selected_registered() is not None
        for button in (self.search_button, self.address_button, self.account_button):
            button.setEnabled(idle)
        self.register_button.setEnabled(idle and found)
        for button in (self.wake_button, self.test_button, self.stream_button, self.watch_button, self.rest_button):
            button.setEnabled(idle and registered)
        for button in (self.passcode_button, self.remove_button):
            button.setEnabled(idle and registered)
        self.game_mode_button.setEnabled(idle and registered and self.steam is not None
                                         and not steam_settings.game_mode())
        console = self.selected_registered()
        if self.steam is not None and console is not None:
            self.game_mode_button.setText("Update in Game Mode" if steam_shortcuts.has_shortcut(self.steam, console)
                                          else "Add to Game Mode")
        self.steam_box.setEnabled(idle and not steam_settings.game_mode())
        self.controller_button.setEnabled(idle)

    # --- Actions ----------------------------------------------------------------------------------------------

    def search(self) -> None:
        self.start("Searching…", lambda: self.ops.find(), self._found)

    def search_address(self) -> None:
        address = self.address_edit.value()
        if not address:
            self.say("Enter the console's address first.")
            return
        self.settings.set("address", address)
        self.remember(address=address)
        self.start(f"Asking {address}…", lambda: self.ops.find(address), self._found)

    def _found(self, outcome: Outcome) -> None:
        if not outcome.ok:
            return
        self.found = list(outcome.value)
        for console in self.found:
            self.remember(address=console.address)
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
            self.remember(account=outcome.value.code, online_id=outcome.value.online_id)
            self.remember(account=str(outcome.value.number))
            self.account_edit.set_value(outcome.value.code)
            self.settings.set("account_id", outcome.value.code)

    def register(self) -> None:
        console = self.selected_found()
        if console is None:
            return
        try:
            account_id = parse_account_id(self.account_edit.value())
            pin = parse_pin(self.pin_edit.text())
        except ValueError as error:
            QMessageBox.warning(self, APP_NAME, str(error))
            return
        self.settings.set("account_id", self.account_edit.value())
        self.remember(account=self.account_edit.value())
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

    def watch(self) -> None:
        console = self.selected_registered()
        if console is None:
            return
        name = self.shown(console.nickname or console.address)
        stop = threading.Event()
        window = StreamWindow(f"{name} · {APP_NAME}", stop.set, self)
        if not self.steam_box.isHidden() and self.steam_box.isEnabled() and self.steam_box.isChecked():
            self.say("Steam comes to the front when you press PS: switch off \"Steam comes to the front on the PS "
                     "button\" below so the PS button only goes to the console.")
        self.stream_window, self._stream_stop = window, stop
        window.destroyed.connect(self._stream_window_gone)
        window.setAttribute(Qt.WidgetAttribute.WA_DeleteOnClose)
        window.show()
        window.bring_forward()

        def done(outcome: Outcome) -> None:
            self._session_done(outcome)
            if self.stream_window is not None:                 # still open: the stream ended on its own
                self.stream_window.status.setText(outcome.message)
            self._stream_stop = None

        self.start(f"Streaming from {name}…",
                   lambda: self.ops.watch_stream(console, window.deliver, window.wanted, stop, window.play,
                                                 figures=window.figures, stats_dir=stream_stats.folder()), done)

    def _stream_window_gone(self) -> None:
        self.stream_window = None

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
        if self._stream_stop is not None:
            self._stream_stop.set()
        if self.stream_window is not None:
            self.stream_window.close()
        self.checker.stop()
        self.settings.set_window_state("geometry", self.saveGeometry())
        self.settings.sync()
        super().closeEvent(event)

