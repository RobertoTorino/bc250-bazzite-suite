# SPDX-License-Identifier: GPL-3.0-or-later
"""The main window: shadPS4 itself, the system modules, the game folders and shadNet as four steps with their state
and buttons, then the games found, each with a box for Game Mode. Downloading shadPS4, asking GitHub for a newer one
and changing Steam's files run off the GUI thread; nothing here needs root. The look is the app's own blue
(style.py). Extract PKG… (or a package dropped on the window, or given to the app) opens the package extractor
(extract_dialog.py) on the game folders."""

from __future__ import annotations

import subprocess
from html import escape
from pathlib import Path

from PyQt6.QtCore import QProcess, Qt, QTimer
from PyQt6.QtGui import QCloseEvent, QDragEnterEvent, QDropEvent
from PyQt6.QtWidgets import (QAbstractItemView, QCheckBox, QFileDialog, QGridLayout, QHBoxLayout, QHeaderView,
                             QLabel, QMainWindow, QMessageBox, QPushButton, QTableWidget, QTableWidgetItem,
                             QVBoxLayout, QWidget)

from bc250_core import SUITE_MANUAL_URL, steam, window_title
from bc250_core import __version__ as CORE_VERSION
from bc250_core.platform import bin_home, xdg_open
from bc250_core.settings import SettingsStore
from bc250_core.updates import ReleaseInfo, UpdateChecker
from bc250_core.widgets import AppHeader, MetricBox, StatusText, Terminal, hint_label

from . import APP_NAME, INFO, LOGO_PATH, ROOT, __version__, emulator, shadnet, shortcuts, style, userdata
from .games import Game, scan
from .shadnet_dialog import ShadNetDialog

MANUAL_URL = f"{SUITE_MANUAL_URL}apps/shadps4/"
FOLDER_TIMEOUT = 60
SHADNET_WATCH_MS = 5000
STEAM_TIP = "Add the ticked games to Steam and take out the others; Steam closes for it and starts again"


class ShadSettings(SettingsStore):
    DEFAULTS: dict = {"nightly": False}     # the channel: the pinned stable, or shadPS4's nightly builds


class MainWindow(QMainWindow):
    def __init__(self, home: Path | None = None, shad_home: Path | None = None, steam_dir: Path | None = None,
                 run: Path | None = None, fetch: emulator.Download = emulator.download,
                 steam_closed=steam.with_steam_closed, steam_running=steam.steam_running,
                 newer_release=emulator.newer_release, latest_nightly=emulator.latest_nightly,
                 shadnet_connect: shadnet.Connect = shadnet._connect,
                 shad_running=userdata.shadps4_running):
        """*home*: where the app installs shadPS4; *shad_home*: shadPS4's own folder; *steam_dir*: Steam's folder
        (None: looked up); *run*: the run wrapper the shortcuts start; *fetch*: the download; *steam_closed* and
        *steam_running*: closing Steam for a change and asking whether it runs; *newer_release* and
        *latest_nightly*: ask GitHub for a newer stable and for the newest nightly build; *shadnet_connect*: opens a connection to a shadNet server; *shad_running*: whether shadPS4
        runs (tests never touch the real ones)."""
        super().__init__()
        self.resize(980, 760)
        self.home = home or emulator.emulator_home()
        self.shad_home = shad_home or userdata.shadps4_home()
        self.steam_dir = steam_dir if steam_dir is not None else steam.find_steam()
        self.run_path = run or bin_home() / shortcuts.RUN_NAME
        self.fetch = fetch
        self.steam_closed = steam_closed
        self.steam_running = steam_running
        self.shadnet_connect = shadnet_connect
        self.shad_running = shad_running
        self.shadnet_check = UpdateChecker(self)        # whether the shadNet server answers, off the GUI thread
        self.shadnet_check.finished.connect(self._server_checked)
        self.shadnet_watch = QTimer(self)               # while shadPS4 runs: its log says whether it signed in
        self.shadnet_watch.setInterval(SHADNET_WATCH_MS)
        self.shadnet_watch.timeout.connect(self._watch_shadnet)
        self._shad_was_running = False
        self._newer_release = newer_release
        self._latest_nightly = latest_nightly
        self.newer: ReleaseInfo | None = None           # shadPS4's newest stable, when newer than the pinned one
        self.latest: emulator.Nightly | None = None     # the newest nightly build, on the nightly channel
        self._checking = ""                             # which channel the running check asks for
        self.release_check = UpdateChecker(self)        # apart from the worker: it runs while the window opens
        self.release_check.finished.connect(self._release_found)
        self.settings = ShadSettings(INFO, self)
        self.worker = UpdateChecker(self)            # one job at a time off the GUI thread: a download or Steam
        self.worker.finished.connect(self._job_done)
        self.games: list[Game] = []
        self.in_steam: dict[str, str] = {}
        self.no_logo: set[str] = set()                # games in Steam whose shortcut has no logo yet
        self.old_tags: set[str] = set()               # games in Steam whose shortcut has the tags of an older name
        self.version = ""
        self.config: dict = {}
        self.users: list[userdata.User] = []

        header = AppHeader(LOGO_PATH, APP_NAME, __version__)
        self.pill = StatusText()
        header.add_state(self.pill)
        self.shadnet_pill = StatusText()
        header.add_state(self.shadnet_pill)
        self.refresh_button = QPushButton("Refresh")
        self.refresh_button.setToolTip("Read the state again and look for games")
        self.refresh_button.clicked.connect(self.refresh)
        header.add_action(self.refresh_button)
        self.emulator_box = MetricBox("shadPS4", style.BLUE)
        self.modules_box = MetricBox("System modules", style.BLUE)
        self.games_box = MetricBox("Games", style.BLUE)
        self.steam_box = MetricBox("In Game Mode", style.BLUE)
        for box in (self.emulator_box, self.modules_box, self.games_box, self.steam_box):
            header.add_second(box)
        intro = hint_label(
            "PS4 games on the BC-250 with the shadPS4 emulator. The app installs the shadPS4 release it was tried "
            "with, finds your games and puts them in Steam, so they start from Game Mode. Games, saves and system "
            "modules come from your own PS4; the app never downloads them. " + style.link(self, MANUAL_URL, "Manual"))

        grid = QGridLayout()
        grid.setColumnStretch(2, 1)
        grid.setHorizontalSpacing(14)
        grid.setVerticalSpacing(10)
        self.emulator_state, self.modules_state, self.folders_state = (self._state_label() for _ in range(3))
        centre = Qt.AlignmentFlag.AlignVCenter
        self.nightly_check = QCheckBox("Nightly builds")
        self.nightly_check.setToolTip("Install shadPS4's newest nightly build instead of the tested stable release. "
                                      "It is checked against the checksum GitHub publishes for that build, but it "
                                      "is not the release this app was tried with.")
        self.nightly_check.setChecked(bool(self.settings.get("nightly")))
        self.nightly_check.toggled.connect(self.on_channel_changed)
        self.emulator_state.setAlignment(Qt.AlignmentFlag.AlignLeft | centre)
        emulator_cell = QWidget()
        cell = QVBoxLayout(emulator_cell)
        cell.setContentsMargins(0, 0, 0, 0)
        cell.setSpacing(2)
        cell.addWidget(self.emulator_state)
        cell.addWidget(self.nightly_check)
        self.install_button = style.primary_button("Install", f"Download shadPS4 {emulator.VERSION} from GitHub "
                                                              f"(about {emulator.SIZE_MB} MB) and check it")
        self.install_button.clicked.connect(self.on_install)
        self.remove_button = QPushButton("Remove")
        self.remove_button.setToolTip("Remove the installed shadPS4; its own folder (saves, settings) stays")
        self.remove_button.clicked.connect(self.on_remove)
        self.modules_button = QPushButton("Open folder")
        self.modules_button.setToolTip("Open the folder the system modules go in")
        self.modules_button.clicked.connect(self.open_modules_folder)
        self.folder_button = QPushButton("Add folder…")
        self.folder_button.setToolTip("Add a folder with games to shadPS4's game folders")
        self.folder_button.clicked.connect(self.on_add_folder)
        self.extract_button = QPushButton("Extract PKG…")
        self.extract_button.setToolTip("Unpack a package file (.pkg: a game, a patch or add-on content) into a game "
                                       "folder, in the layout shadPS4 loads")
        self.extract_button.clicked.connect(lambda: self.open_extract())
        self.extract_dialog = None                      # the Extract PKG window while it is open
        self.shadnet_state = self._state_label()
        self.shadnet_button = QPushButton("Account…")
        self.shadnet_button.setToolTip("Your shadNet account: create one, try it, and have shadPS4 sign in with it")
        self.shadnet_button.clicked.connect(self.on_shadnet)
        rows = [("shadPS4", emulator_cell, [self.install_button, self.remove_button]),
                ("System modules", self.modules_state, [self.modules_button]),
                ("Game folders", self.folders_state, [self.extract_button, self.folder_button]),
                ("shadNet", self.shadnet_state, [self.shadnet_button])]
        for row, (name, state, buttons) in enumerate(rows):
            label = QLabel(name)
            label.setStyleSheet("font-weight:700;")
            for text in (label, state):
                if isinstance(text, QLabel):            # the shadPS4 cell holds its state and the channel box
                    text.setAlignment(Qt.AlignmentFlag.AlignLeft | centre)
            grid.addWidget(style.step_badge(row + 1), row, 0, centre)
            grid.addWidget(label, row, 1)
            grid.addWidget(state, row, 2)
            for column, button in zip((4, 3), reversed(buttons)):
                grid.addWidget(button, row, column, centre)

        self.table = QTableWidget(0, 5)
        self.table.setHorizontalHeaderLabels(["Game Mode", "Game", "ID", "Version", "Folder"])
        self.table.setSelectionBehavior(QAbstractItemView.SelectionBehavior.SelectRows)
        self.table.setSelectionMode(QAbstractItemView.SelectionMode.SingleSelection)
        self.table.setEditTriggers(QAbstractItemView.EditTrigger.NoEditTriggers)
        self.table.verticalHeader().setVisible(False)
        self.table.setAlternatingRowColors(True)
        self.table.setShowGrid(False)
        head = self.table.horizontalHeader()
        for column, mode in enumerate((QHeaderView.ResizeMode.ResizeToContents, QHeaderView.ResizeMode.Stretch,
                                       QHeaderView.ResizeMode.ResizeToContents,
                                       QHeaderView.ResizeMode.ResizeToContents, QHeaderView.ResizeMode.Stretch)):
            head.setSectionResizeMode(column, mode)
        self.table.itemChanged.connect(lambda _item: self._update_buttons())
        self.table.itemSelectionChanged.connect(self._update_buttons)
        self.table.doubleClicked.connect(lambda _index: self.on_play())

        self.play_button = QPushButton("Play")
        self.play_button.setToolTip("Start the chosen game in shadPS4, here on the desktop")
        self.play_button.clicked.connect(self.on_play)
        self.shad_button = QPushButton("shadPS4 settings")
        self.shad_button.setToolTip("Open shadPS4's own window (Big Picture): its settings and game list")
        self.shad_button.clicked.connect(self.on_open_shadps4)
        self.steam_button = style.primary_button("Update Game Mode", STEAM_TIP)
        self.steam_button.clicked.connect(self.on_update_steam)
        buttons = QHBoxLayout()
        buttons.addWidget(self.play_button)
        buttons.addWidget(self.shad_button)
        buttons.addStretch(1)
        buttons.addWidget(self.steam_button)

        self.running = QLabel()
        self.running.setStyleSheet("font-weight:600;")
        self.running.setWordWrap(True)
        self.output = Terminal()
        self.output.setPlaceholderText("Messages appear here.")
        self.output.setMaximumHeight(120)

        central = QWidget()
        lay = QVBoxLayout(central)
        lay.addLayout(header)
        lay.addWidget(intro)
        lay.addSpacing(6)
        lay.addLayout(grid)
        lay.addSpacing(6)
        lay.addWidget(self.table, 1)
        lay.addLayout(buttons)
        lay.addWidget(self.running)
        lay.addWidget(self.output)
        version = QLabel(f"{APP_NAME} {__version__} · core {CORE_VERSION} · shadPS4 {emulator.VERSION}")
        version.setStyleSheet("color:palette(placeholder-text);")
        lay.addWidget(version, 0, Qt.AlignmentFlag.AlignRight)
        self.setCentralWidget(central)
        style.apply(self)
        # As in BC-250 Mesh Shaders: the buttons of the steps the size of the widest, in two columns on the right.
        # Sized here, in the window, so their size includes the style sheet's padding.
        steps = [b for _, _, buttons in rows for b in buttons]
        for button in steps:
            button.ensurePolished()
        width = max(b.sizeHint().width() for b in steps)
        height = max(b.sizeHint().height() for b in steps)
        for row in range(len(rows)):
            grid.setRowMinimumHeight(row, height)
        for button in steps:
            button.setFixedSize(width, height)

        self.setAcceptDrops(True)                       # a .pkg dropped on the window opens Extract PKG
        geometry = self.settings.window_state("geometry")
        if geometry is not None:
            self.restoreGeometry(geometry)
        self.refresh()
        self._start_release_check()

    @staticmethod
    def _state_label() -> QLabel:
        label = QLabel()
        label.setWordWrap(True)
        label.setTextInteractionFlags(Qt.TextInteractionFlag.TextSelectableByMouse)
        return label

    # --- State ------------------------------------------------------------------------------------------------

    def refresh(self) -> None:
        self.version = emulator.installed_version(self.home)
        self.config = userdata.read_config(self.shad_home)
        self.modules = userdata.check_modules(userdata.modules_folder(self.shad_home, self.config))
        self.folders = userdata.game_folders(self.config)
        self.users = userdata.read_users(self.shad_home)
        self.games = scan(self.folders)
        try:
            self.in_steam = shortcuts.in_steam(self.steam_dir) if self.steam_dir else {}
            self.no_logo = {str(g.eboot) for g in self.games if str(g.eboot) in self.in_steam and
                            shortcuts.logo_missing(self.steam_dir, g, self.in_steam[str(g.eboot)], self.run_path)}
            self.old_tags = shortcuts.old_tags(self.steam_dir) if self.steam_dir else set()
        except OSError:
            self.in_steam, self.no_logo, self.old_tags = {}, set(), set()
        self._show_state()
        self._fill_table()

    def _show_state(self) -> None:
        pinned = emulator.VERSION
        if self.nightly_check.isChecked():
            self._show_nightly_state()
        elif not self.version:
            self.emulator_state.setText(f"Not installed. Install downloads shadPS4 {pinned}, the release this "
                                        "version of the app was tried with, and checks it before unpacking.")
            self.emulator_box.set_value("—")
        elif self.version != pinned:
            self.emulator_state.setText(f"shadPS4 {escape(self.version)} is installed; this version of the app "
                                        f"brings {pinned}: <b>install it</b> to use it.")
            self.emulator_box.set_value(self.version)
        else:
            self.emulator_state.setText(f"shadPS4 {pinned} is installed. "
                                        + style.link(self, emulator.RELEASE_PAGE, "Release notes"))
            self.emulator_box.set_value(pinned)
        if self.newer is not None and not self.nightly_check.isChecked():
            self.emulator_state.setText(
                self.emulator_state.text() + f"<br>shadPS4 {escape(self.newer.version)} is out "
                f"({escape(self.newer.published)}). A later version of this app brings it, once it has been tried "
                "on the board. " + style.link(self, self.newer.url, "What is new"))
        self.emulator_state.setOpenExternalLinks(True)

        m = self.modules
        folder = f"<code>{escape(str(m.folder))}</code>"
        if m.complete:
            text = f"All {len(userdata.NEEDED)} modules that shadPS4 cannot do without are in {folder}."
        elif not m.needed and not m.optional:
            text = (f"None in {folder}. Many games run without them; others need modules from your own PS4's "
                    "firmware. Copy them into that folder.")
        else:
            text = (f"{len(m.needed)} of the {len(userdata.NEEDED)} modules shadPS4 cannot do without are in "
                    f"{folder}; a game that needs a missing one does not start.")
        self.modules_state.setText(text)
        self.modules_state.setToolTip("Missing: " + ", ".join(m.missing) if m.missing else "")
        self.modules_box.set_value(f"{len(m.needed)} / {len(userdata.NEEDED)}")

        if self.folders:
            self.folders_state.setText("<br>".join(f"<code>{escape(str(f))}</code>" for f in self.folders))
        elif not self.version:
            self.folders_state.setText("None yet: install shadPS4 first, then add the folder with your games.")
        else:
            self.folders_state.setText("None yet: add the folder with your games (each game in a folder of its own, "
                                       "with eboot.bin).")
        self._show_shadnet()
        self.games_box.set_value(str(len(self.games)))
        found = {str(g.eboot) for g in self.games}
        self.steam_box.set_value(str(len(found & set(self.in_steam))))

        if not self.version:
            self.pill.set_status("Not installed", "warn", "Install shadPS4 first.")
        elif not self.games:
            self.pill.set_status("No games", "neutral", "Add the folder with your games.")
        elif not m.complete:
            self.pill.set_status("Modules missing", "warn", "Some games need system modules from your own PS4.")
        else:
            self.pill.set_status("Ready", "ok", "shadPS4 is installed and games were found.")

    def _show_shadnet(self) -> None:
        signing_in = [u for u in self.users if u.shadnet and u.npid] if userdata.shadnet_on(self.config) else []
        server = escape(userdata.shadnet_server(self.config))
        if not self.users:
            text = "shadPS4 has not run yet: start it once (shadPS4 settings), then set up your account."
        elif signing_in:
            names = ", ".join(f"<b>{escape(u.npid)}</b> ({escape(u.name)})" for u in signing_in)
            text = f"On: {names} signs in to {server} when a game starts."
        else:
            text = ("Off. shadPS4's online service, for online trophies, friends and online play in the games it "
                    "supports: set up an account to use it.")
        self.shadnet_state.setText(text)
        self._show_shadnet_pill()

    def _signing_in(self) -> list[userdata.User]:
        """The users shadPS4 signs in with when a game starts."""
        return [u for u in self.users if u.shadnet and u.npid] if userdata.shadnet_on(self.config) else []

    def _show_shadnet_pill(self) -> None:
        """shadNet Online, Offline or Off. While shadPS4 runs, from its log: whether it signed in. Otherwise
        whether the server answers (without signing in, as shadPS4's own probe), so that it can sign in."""
        names = ", ".join(u.npid for u in self._signing_in())
        if not names:
            self.shadnet_watch.stop()
            self.shadnet_pill.set_status("shadNet Off", "neutral", "shadNet is off: set it up with Account… in step 4.")
            return
        self.shadnet_watch.start()
        server = userdata.shadnet_server(self.config)
        self._shad_was_running = self.shad_running()
        if self._shad_was_running:
            state, detail = shadnet.session(self.shad_home / "log")
            if state == "online":
                self.shadnet_pill.set_status("shadNet Online", "ok", f"shadPS4 is signed in to {server} as {detail}.")
            elif state == "offline":
                self.shadnet_pill.set_status("shadNet Offline", "bad", f"{detail}.")
            else:
                self.shadnet_pill.set_status("shadNet …", "neutral",
                                             f"shadPS4 runs; it signs in as {names} when a game starts.")
            return
        try:
            target = shadnet.parse_server(server)
        except shadnet.ShadNetError as error:
            self.shadnet_pill.set_status("shadNet Offline", "bad", str(error))
            return
        connect = self.shadnet_connect

        def job() -> tuple[bool, str]:
            try:
                shadnet.server_answers(target, connect)
            except shadnet.ShadNetError as error:
                return False, f"{error} shadPS4 cannot sign in now."
            return True, f"{target} answers: shadPS4 signs in as {names} when a game starts."
        if self.shadnet_check.start(job) and self.shadnet_pill.kind not in ("ok", "bad"):
            self.shadnet_pill.set_status("shadNet …", "neutral", f"Asking {target}…")

    def _server_checked(self, result: tuple[bool, str]) -> None:
        if self._shad_was_running or not self._signing_in():
            return                                      # shadPS4's own session says more, or shadNet is off now
        ok, detail = result
        self.shadnet_pill.set_status("shadNet Online" if ok else "shadNet Offline", "ok" if ok else "bad", detail)

    def _watch_shadnet(self) -> None:
        """While shadPS4 runs, and once when it has ended (then the server again)."""
        if self.shad_running() or self._shad_was_running:
            self._show_shadnet_pill()

    def _show_nightly_state(self) -> None:
        """The first step on the nightly channel: what is installed, the newest build GitHub lists, and that a
        nightly is not the release the app was tried with."""
        tried = "A nightly build is not the release this app was tried with."
        if not self.version:
            self.emulator_state.setText("Not installed. Install downloads shadPS4's newest nightly build and checks "
                                        f"it against the checksum GitHub publishes for that build. {tried}")
            self.emulator_box.set_value("—")
            return
        if self.version == emulator.VERSION:
            text = f"shadPS4 {emulator.VERSION} (the stable release) is installed. {tried}"
        else:
            text = f"shadPS4 nightly {escape(self.version)} is installed. {tried}"
        if self.latest is not None and self.latest.version != self.version:
            text += (f"<br>The newest nightly build is {escape(self.latest.version)} "
                     f"({escape(self.latest.published)}): <b>Install</b> brings it. "
                     + style.link(self, self.latest.page, "What is in it"))
        elif self.latest is not None:
            text += " " + style.link(self, self.latest.page, "What is in it")
        self.emulator_state.setText(text)
        self.emulator_box.set_value(self.version)

    def _channel(self) -> str:
        return "nightly" if self.nightly_check.isChecked() else "stable"

    def _release_found(self, result) -> None:
        """A finished check: the newer stable (ReleaseInfo), the newest nightly (Nightly), or None. A result of the
        other channel (the user switched while it ran) is kept; _show_state shows only the channel's own."""
        if isinstance(result, emulator.Nightly):
            self.latest = result
        else:
            self.newer = result
        if result is not None:
            self._show_state()
            self._update_buttons()
        if self._checking != self._channel():           # switched while it ran: ask for the new channel's now
            self._start_release_check()

    def _start_release_check(self) -> None:
        """Asks GitHub off the GUI thread: on the stable channel for a newer stable, on the nightly channel for the
        newest nightly build (None when it cannot be asked: nothing to say then). While a check runs, a switch of
        the channel waits for it; _release_found then starts the right one."""
        if self.release_check.running:
            return
        self._checking = self._channel()
        if self._checking == "nightly":
            latest = self._latest_nightly

            def job() -> emulator.Nightly | None:
                try:
                    return latest()
                except emulator.EmulatorError:
                    return None
            self.release_check.start(job)
        else:
            self.release_check.start(self._newer_release)

    def on_channel_changed(self, checked: bool) -> None:
        self.settings.set("nightly", checked)
        self._show_state()
        self._update_buttons()
        self._start_release_check()

    def _fill_table(self) -> None:
        self.table.blockSignals(True)
        self.table.setRowCount(len(self.games))
        for row, game in enumerate(self.games):
            box = QTableWidgetItem()
            box.setFlags(Qt.ItemFlag.ItemIsUserCheckable | Qt.ItemFlag.ItemIsEnabled | Qt.ItemFlag.ItemIsSelectable)
            box.setCheckState(Qt.CheckState.Checked if str(game.eboot) in self.in_steam else Qt.CheckState.Unchecked)
            box.setToolTip("In Steam for Game Mode" if str(game.eboot) in self.in_steam else "Not in Steam")
            self.table.setItem(row, 0, box)
            for column, text in enumerate((game.title, game.title_id, game.version, str(game.folder)), start=1):
                self.table.setItem(row, column, QTableWidgetItem(text))
        self.table.blockSignals(False)
        self._update_buttons()

    def ticked(self) -> list[Game]:
        return [g for row, g in enumerate(self.games)
                if self.table.item(row, 0).checkState() == Qt.CheckState.Checked]

    def chosen(self) -> Game | None:
        rows = self.table.selectionModel().selectedRows()
        return self.games[rows[0].row()] if rows else None

    def steam_plan(self) -> tuple[list[Game], list[Game]]:
        """(games to add or bring up to date, games to take out): the ticked ones in, the others out, and the
        shortcuts of games no longer found out too."""
        add = self.ticked()
        found = {str(g.eboot) for g in self.games}
        remove = [g for g in self.games if str(g.eboot) in self.in_steam and g not in add]
        remove += [Game(Path(eboot), name) for eboot, name in self.in_steam.items() if eboot not in found]
        return add, remove

    def _update_buttons(self) -> None:
        idle = not self.worker.running
        installed = bool(self.version)
        self.refresh_button.setEnabled(idle)
        if self.nightly_check.isChecked():
            # The newest nightly when it is known; without it Install asks GitHub itself.
            can_install = self.latest is None or self.version != self.latest.version
            self.install_button.setToolTip("Download shadPS4's newest nightly build from GitHub and check it "
                                           "against the checksum GitHub publishes for it")
        else:
            can_install = self.version != emulator.VERSION
            self.install_button.setToolTip(f"Download shadPS4 {emulator.VERSION} from GitHub "
                                           f"(about {emulator.SIZE_MB} MB) and check it")
        self.install_button.setEnabled(idle and can_install)
        self.nightly_check.setEnabled(idle)
        self.remove_button.setEnabled(idle and installed)
        self.folder_button.setEnabled(idle and installed)
        self.extract_button.setEnabled(idle)
        self.shadnet_button.setEnabled(idle)
        self.play_button.setEnabled(idle and installed and self.chosen() is not None)
        self.shad_button.setEnabled(idle and installed)
        add, remove = self.steam_plan()
        stale = self.no_logo | self.old_tags
        named = shortcuts.names(add)        # a name in Steam that differs (one from before the prefix) is renamed
        changed = bool(remove) or any(self.in_steam.get(str(g.eboot)) != named[g.eboot] or str(g.eboot) in stale
                                      for g in add)
        self.steam_button.setEnabled(idle and changed and self.steam_dir is not None and not steam.game_mode())
        if self.steam_dir is None:
            self.steam_button.setToolTip("Steam was never started on this system: start it once first")
        elif steam.game_mode():
            self.steam_button.setToolTip("In Game Mode Steam is the session itself: change it in Desktop Mode")
        else:
            self.steam_button.setToolTip(STEAM_TIP)

    # --- Actions ----------------------------------------------------------------------------------------------

    def _ask(self, title: str, text: str) -> bool:
        answer = QMessageBox.question(self, window_title(title), text)
        return answer == QMessageBox.StandardButton.Yes

    def _start(self, text: str, job) -> None:
        if self.worker.start(job):
            self.running.setText(text)
            self._update_buttons()

    def _job_done(self, result: tuple[bool, str]) -> None:
        ok, message = result
        self.running.setText(message)
        self.output.appendPlainText(message)
        self.refresh()
        if not ok:
            self.running.setStyleSheet("font-weight:600;color:#c62828;")
        else:
            self.running.setStyleSheet("font-weight:600;")

    def on_install(self) -> None:
        home, fetch = self.home, self.fetch
        if self.nightly_check.isChecked():
            size = round(self.latest.size / (1 << 20)) if self.latest else emulator.SIZE_MB
            if not self._ask("Install", f"Download shadPS4's newest nightly build from GitHub (about {size} MB)?"
                                        "\n\nIt is checked against the checksum GitHub publishes for that build "
                                        f"before it is unpacked into {home}. A nightly build is not the release "
                                        "this app was tried with."):
                return
            latest = self._latest_nightly

            def nightly_job() -> tuple[bool, str]:
                try:
                    return True, emulator.install_build(home, latest(), fetch)
                except (emulator.EmulatorError, OSError) as error:
                    return False, f"shadPS4 was not installed: {error}"
            self._start("Downloading shadPS4's newest nightly build…", nightly_job)
            return
        if not self._ask("Install", f"Download shadPS4 {emulator.VERSION} from GitHub (about {emulator.SIZE_MB} MB)?"
                                    "\n\nIt is checked against the SHA-256 this app was tried with before it is "
                                    f"unpacked into {self.home}."):
            return

        def job() -> tuple[bool, str]:
            try:
                return True, emulator.install(home, fetch)
            except (emulator.EmulatorError, OSError) as error:
                return False, f"shadPS4 was not installed: {error}"
        self._start(f"Downloading shadPS4 {emulator.VERSION}…", job)

    def on_remove(self) -> None:
        text = "Remove the installed shadPS4?\n\nIts own folder, with your saves, settings and system modules, stays."
        if self.in_steam:
            text += "\nThe games in Game Mode no longer start until it is installed again."
        if self._ask("Remove", text):
            emulator.remove(self.home)
            self.output.appendPlainText("shadPS4 was removed.")
            self.refresh()

    def open_modules_folder(self) -> None:
        self.modules.folder.mkdir(parents=True, exist_ok=True)
        if not xdg_open(self.modules.folder):
            self.output.appendPlainText(f"The system modules go in {self.modules.folder}")

    def on_add_folder(self) -> None:
        folder = QFileDialog.getExistingDirectory(self, window_title("Add a game folder"), str(Path.home()))
        if folder:
            self.add_folder(Path(folder))

    def add_folder(self, folder: Path) -> None:
        """Through shadPS4 itself (--add-game-folder), so its own window lists the games too."""
        try:
            done = subprocess.run(self.shadps4_command("--add-game-folder", str(folder)), capture_output=True,
                                  text=True, timeout=FOLDER_TIMEOUT, cwd=self.home)
            ok = done.returncode == 0
            message = f"{folder} is a game folder now." if ok else \
                f"shadPS4 did not add {folder} (exit code {done.returncode}): {done.stderr.strip()[-300:]}"
        except (OSError, subprocess.SubprocessError) as error:
            ok, message = False, f"shadPS4 did not add {folder}: {error}"
        self._job_done((ok, message))

    def open_extract(self, pkg: str | None = None) -> None:
        """The Extract PKG window, with *pkg* loaded; when it is open already, *pkg* goes into it."""
        if self.extract_dialog is not None:
            if pkg:
                self.extract_dialog.open_pkg(pkg)
            self.extract_dialog.raise_()
            self.extract_dialog.activateWindow()
            return
        try:
            from .extract_dialog import ExtractDialog
        except ImportError as error:                    # cryptography missing: an install from before it
            self._job_done((False, f"Extract PKG needs the cryptography package ({error}): install {APP_NAME} "
                                   "again through the portal."))
            return
        self.extract_dialog = ExtractDialog(self.settings, self.folders, self, pkg)
        try:
            self.extract_dialog.exec()
            extracted = self.extract_dialog.extracted
        finally:
            self.extract_dialog = None
        if extracted:
            self.refresh()

    def dragEnterEvent(self, event: QDragEnterEvent) -> None:  # noqa: N802 (Qt override)
        if any(url.toLocalFile().lower().endswith(".pkg") for url in event.mimeData().urls()):
            event.acceptProposedAction()

    def dropEvent(self, event: QDropEvent) -> None:  # noqa: N802 (Qt override)
        pkgs = [url.toLocalFile() for url in event.mimeData().urls() if url.toLocalFile().lower().endswith(".pkg")]
        if pkgs:
            event.acceptProposedAction()
            QTimer.singleShot(0, lambda: self.open_extract(pkgs[0]))   # after the drop has ended

    def shadps4_command(self, *args: str) -> list[str]:
        """The installed shadPS4 through the run wrapper (from the app folder when it is not installed yet)."""
        run = self.run_path if self.run_path.is_file() else ROOT / shortcuts.RUN_NAME
        return [str(run), *args]

    def on_shadnet(self) -> None:
        self.refresh()
        dialog = ShadNetDialog(self.shad_home, self.config, self.users, self, self.shadnet_connect)
        if dialog.exec():
            self.output.appendPlainText("shadNet settings saved in shadPS4's own files.")
            self.refresh()

    def on_play(self) -> None:
        game = self.chosen()
        if game is None or not self.version:
            return
        command = self.shadps4_command("-g", str(game.eboot))
        if QProcess.startDetached(command[0], command[1:], str(game.folder))[0]:
            self.running.setText(f"Started {game.title}.")
        else:
            self.running.setText(f"{game.title} could not be started: {command[0]} did not run.")

    def on_open_shadps4(self) -> None:
        command = self.shadps4_command("-b")
        if not QProcess.startDetached(command[0], command[1:])[0]:
            self.running.setText(f"shadPS4 could not be started: {command[0]} did not run.")

    def on_update_steam(self) -> None:
        if self.steam_dir is None:
            return
        if not self.run_path.is_file():
            self.running.setText(f"The shortcuts run {self.run_path}, which is not there: install "
                                 f"{APP_NAME} through the portal first.")
            return
        add, remove = self.steam_plan()
        if add and not self.version:
            self.running.setText("Install shadPS4 first: the games in Game Mode start it.")
            return
        text = f"{len(add)} game(s) in Game Mode" + (f", {len(remove)} taken out." if remove else ".")
        if self.steam_running():
            text += "\n\nSteam closes for it and starts again in the background."
        if not self._ask("Game Mode", text):
            return
        changes = shortcuts.changes(add, remove, self.run_path, LOGO_PATH, self.in_steam)
        folder, closed = self.steam_dir, self.steam_closed

        def job() -> tuple[bool, str]:
            try:
                restarted = closed(lambda: steam.write_shortcuts(folder, changes))
            except (steam.SteamError, steam.ShortcutError, OSError) as error:
                return False, f"Steam was not changed: {error}"
            again = " Steam was closed for it and starts again in the background." if restarted else ""
            return True, (f"{len(add)} game(s) in Steam, under Non-Steam in the library"
                          f"{f'; {len(remove)} taken out' if remove else ''}.{again}")
        self._start("Changing Steam's shortcuts…", job)

    def closeEvent(self, event: QCloseEvent) -> None:  # noqa: N802 (Qt override)
        if self.worker.running and not self._ask("Close", "A download or a change to Steam is still running. "
                                                          "Close anyway?"):
            event.ignore()
            return
        self.worker.stop()
        self.release_check.stop()
        self.shadnet_watch.stop()
        self.shadnet_check.stop()
        self.settings.set_window_state("geometry", self.saveGeometry())
        self.settings.sync()
        super().closeEvent(event)
