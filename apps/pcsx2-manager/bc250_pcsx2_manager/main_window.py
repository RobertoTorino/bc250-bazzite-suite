# SPDX-License-Identifier: GPL-3.0-or-later
"""The main window: PCSX2 itself, the PS2 BIOS and the game folders as three steps with their state and buttons,
then the games found, each with a box for Game Mode. Downloading PCSX2, asking GitHub for a newer one and changing
Steam's files run off the GUI thread; nothing here needs root. The look is the app's own teal (style.py)."""

from __future__ import annotations

from html import escape
from pathlib import Path

from PyQt6.QtCore import QProcess, Qt
from PyQt6.QtGui import QCloseEvent
from PyQt6.QtWidgets import (QAbstractItemView, QCheckBox, QFileDialog, QGridLayout, QHBoxLayout, QHeaderView,
                             QInputDialog, QLabel, QMainWindow, QMessageBox, QPushButton, QTableWidget,
                             QTableWidgetItem, QVBoxLayout, QWidget)

from bc250_core import SUITE_MANUAL_URL, steam, window_title
from bc250_core import __version__ as CORE_VERSION
from bc250_core.platform import bin_home, xdg_open
from bc250_core.settings import SettingsStore
from bc250_core.updates import ReleaseInfo, UpdateChecker
from bc250_core.widgets import AppHeader, MetricBox, StatusText, Terminal, hint_label

from . import APP_NAME, INFO, LOGO_PATH, ROOT, __version__, emulator, shortcuts, style, userdata
from .games import Game, scan

MANUAL_URL = f"{SUITE_MANUAL_URL}apps/pcsx2-manager/"
STEAM_TIP = "Add the ticked games to Steam and take out the others; Steam closes for it and starts again"
KINDS = {"iso": "ISO", "chd": "CHD", "cso": "CSO", "zso": "ZSO", "gz": "GZ"}


class Pcsx2Settings(SettingsStore):
    DEFAULTS: dict = {"folders": [],    # the game folders chosen in the app
                      "nightly": False}     # the channel: the pinned stable, or PCSX2's nightly builds


class MainWindow(QMainWindow):
    def __init__(self, home: Path | None = None, pcsx2_home: Path | None = None, steam_dir: Path | None = None,
                 run: Path | None = None, fetch: emulator.Download = emulator.download,
                 steam_closed=steam.with_steam_closed, steam_running=steam.steam_running,
                 newer_release=emulator.newer_release, latest_nightly=emulator.latest_nightly,
                 open_folder=xdg_open):
        """*home*: where the app installs PCSX2; *pcsx2_home*: PCSX2's own folder; *steam_dir*: Steam's folder
        (None: looked up); *run*: the run wrapper the shortcuts start; *fetch*: the download; *steam_closed* and
        *steam_running*: closing Steam for a change and asking whether it runs; *newer_release* and *latest_nightly*:
        ask GitHub for a newer stable and for the newest nightly build; *open_folder*: opens the BIOS folder in the
        file manager (tests never touch the real ones)."""
        super().__init__()
        self.resize(980, 760)
        self.home = home or emulator.emulator_home()
        self.pcsx2_home = pcsx2_home or userdata.pcsx2_home()
        self.steam_dir = steam_dir if steam_dir is not None else steam.find_steam()
        self.run_path = run or bin_home() / shortcuts.RUN_NAME
        self.fetch = fetch
        self.steam_closed = steam_closed
        self.steam_running = steam_running
        self.open_folder = open_folder
        self._newer_release = newer_release
        self._latest_nightly = latest_nightly
        self.newer: ReleaseInfo | None = None           # PCSX2's newest stable, when newer than the pinned one
        self.latest: emulator.Nightly | None = None     # the newest nightly build, on the nightly channel
        self._checking = ""                             # which channel the running check asks for
        self.release_check = UpdateChecker(self)        # apart from the worker: it runs while the window opens
        self.release_check.finished.connect(self._release_found)
        self.settings = Pcsx2Settings(INFO, self)
        self.worker = UpdateChecker(self)            # one job at a time off the GUI thread: a download or Steam
        self.worker.finished.connect(self._job_done)
        self.games: list[Game] = []
        self.in_steam: dict[str, str] = {}
        self.version = ""
        self.replaced = False                       # PCSX2 updated itself to a build the app was not tried with
        self.bios: list[Path] = []
        self.folders: list[Path] = []

        header = AppHeader(LOGO_PATH, APP_NAME, __version__)
        self.pill = StatusText()
        header.add_state(self.pill)
        self.refresh_button = QPushButton("Refresh")
        self.refresh_button.setToolTip("Read the state again and look for games")
        self.refresh_button.clicked.connect(self.refresh)
        header.add_action(self.refresh_button)
        self.emulator_box = MetricBox("PCSX2", style.TEAL)
        self.bios_box = MetricBox("BIOS", style.TEAL)
        self.games_box = MetricBox("Games", style.TEAL)
        self.steam_box = MetricBox("In Game Mode", style.TEAL)
        for box in (self.emulator_box, self.bios_box, self.games_box, self.steam_box):
            header.add_second(box)
        intro = hint_label(
            "PS2 games on the BC-250 with the PCSX2 emulator. The app installs the PCSX2 release it was tried with, "
            "finds your games and puts them in Steam, so they start from Game Mode. Games and the PS2's BIOS come "
            "from you; the app never downloads them. " + style.link(self, MANUAL_URL, "Manual"))

        grid = QGridLayout()
        grid.setColumnStretch(2, 1)
        grid.setHorizontalSpacing(14)
        grid.setVerticalSpacing(10)
        self.emulator_state, self.bios_state, self.folders_state = (self._state_label() for _ in range(3))
        centre = Qt.AlignmentFlag.AlignVCenter
        self.nightly_check = QCheckBox("Nightly builds")
        self.nightly_check.setToolTip("Install PCSX2's newest nightly build instead of the tested stable release. "
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
        self.install_button = style.primary_button("Install", f"Download PCSX2 {emulator.VERSION} from GitHub "
                                                              f"(about {emulator.SIZE_MB} MB) and check it")
        self.install_button.clicked.connect(self.on_install)
        self.remove_button = QPushButton("Remove")
        self.remove_button.setToolTip("Remove the installed PCSX2; its own folder (BIOS, memory cards, settings) "
                                      "stays")
        self.remove_button.clicked.connect(self.on_remove)
        self.bios_button = QPushButton("Open folder")
        self.bios_button.setToolTip("Open PCSX2's BIOS folder, to copy your BIOS dump in")
        self.bios_button.clicked.connect(self.on_open_bios)
        self.folder_button = QPushButton("Add folder…")
        self.folder_button.setToolTip("Add a folder with your games (ISO, CHD, CSO, ZSO or GZ images)")
        self.folder_button.clicked.connect(self.on_add_folder)
        self.forget_button = QPushButton("Remove folder…")
        self.forget_button.setToolTip("Stop looking for games in one of the folders; the games stay where they are")
        self.forget_button.clicked.connect(self.on_forget_folder)
        rows = [("PCSX2", emulator_cell, [self.install_button, self.remove_button]),
                ("BIOS", self.bios_state, [self.bios_button]),
                ("Game folders", self.folders_state, [self.folder_button, self.forget_button])]
        for row, (name, state, buttons) in enumerate(rows):
            label = QLabel(name)
            label.setStyleSheet("font-weight:700;")
            for text in (label, state):
                if isinstance(text, QLabel):            # the PCSX2 cell holds its state and the channel box
                    text.setAlignment(Qt.AlignmentFlag.AlignLeft | centre)
            grid.addWidget(style.step_badge(row + 1), row, 0, centre)
            grid.addWidget(label, row, 1)
            grid.addWidget(state, row, 2)
            for column, button in zip((4, 3), reversed(buttons)):
                grid.addWidget(button, row, column, centre)

        self.table = QTableWidget(0, 5)
        self.table.setHorizontalHeaderLabels(["Game Mode", "Game", "Serial", "Kind", "File"])
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
        self.play_button.setToolTip("Start the chosen game in PCSX2, here on the desktop")
        self.play_button.clicked.connect(self.on_play)
        self.pcsx2_button = QPushButton("PCSX2 settings")
        self.pcsx2_button.setToolTip("Open PCSX2's own window: its settings, the BIOS choice, controllers and its "
                                     "game list (the first start asks for the BIOS)")
        self.pcsx2_button.clicked.connect(self.on_open_pcsx2)
        self.steam_button = style.primary_button("Update Game Mode", STEAM_TIP)
        self.steam_button.clicked.connect(self.on_update_steam)
        buttons = QHBoxLayout()
        buttons.addWidget(self.play_button)
        buttons.addWidget(self.pcsx2_button)
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
        version = QLabel(f"{APP_NAME} {__version__} · core {CORE_VERSION} · PCSX2 {emulator.VERSION}")
        version.setStyleSheet("color:palette(placeholder-text);")
        lay.addWidget(version, 0, Qt.AlignmentFlag.AlignRight)
        self.setCentralWidget(central)
        style.apply(self)
        # As in shadPS4 Manager: the buttons of the steps the size of the widest, in two columns on the
        # right. Sized here, in the window, so their size includes the style sheet's padding.
        steps = [b for _, _, buttons in rows for b in buttons]
        for button in steps:
            button.ensurePolished()
        width = max(b.sizeHint().width() for b in steps)
        height = max(b.sizeHint().height() for b in steps)
        for row in range(len(rows)):
            grid.setRowMinimumHeight(row, height)
        for button in steps:
            button.setFixedSize(width, height)

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
        self.replaced = bool(self.version) and emulator.replaced(self.home)
        self.bios_dir = userdata.bios_dir(self.pcsx2_home)
        self.bios = userdata.bios_files(self.bios_dir)
        self.folders = [Path(f) for f in self.settings.get("folders") if f]
        self.games = scan(self.folders)
        try:
            self.in_steam = shortcuts.in_steam(self.steam_dir) if self.steam_dir else {}
        except OSError:
            self.in_steam = {}
        self._show_state()
        self._fill_table()

    def _show_state(self) -> None:
        pinned = emulator.VERSION
        if self.nightly_check.isChecked():
            self._show_nightly_state()
        elif not self.version:
            self.emulator_state.setText(f"Not installed. Install downloads PCSX2 {pinned}, the release this version "
                                        "of the app was tried with, and checks it before installing it.")
            self.emulator_box.set_value("—")
        elif self.version != pinned:
            self.emulator_state.setText(f"PCSX2 {escape(self.version)} is installed; this version of the app "
                                        f"brings {pinned}: <b>install it</b> to use it.")
            self.emulator_box.set_value(self.version)
        elif self.replaced:
            self.emulator_state.setText("PCSX2 updated itself in its own window to a build this version of the app "
                                        f"was not tried with. <b>Install</b> puts back {pinned}.")
            self.emulator_box.set_value("other")
        else:
            self.emulator_state.setText(f"PCSX2 {pinned} is installed. "
                                        + style.link(self, emulator.RELEASE_PAGE, "What is in it"))
            self.emulator_box.set_value(pinned)
        if self.newer is not None and not self.nightly_check.isChecked():
            self.emulator_state.setText(
                self.emulator_state.text() + f"<br>PCSX2 {escape(self.newer.version)} is out "
                f"({escape(self.newer.published)}). A later version of this app brings it, once it has been tried "
                "on the board. " + style.link(self, self.newer.url, "What is new"))
        self.emulator_state.setOpenExternalLinks(True)

        page = style.link(self, userdata.BIOS_HELP_URL, "PCSX2's BIOS page")
        if self.bios:
            names = ", ".join(escape(p.name) for p in self.bios[:4]) + (", …" if len(self.bios) > 4 else "")
            self.bios_state.setText(f"{len(self.bios)} dump(s) in <code>{escape(str(self.bios_dir))}</code>: "
                                    f"{names}. PCSX2's own window chooses the one to use.")
        else:
            self.bios_state.setText("No BIOS dump yet. PCSX2 needs the PS2's BIOS to start any game: dump it from "
                                    f"your own console ({page} says how), then copy the .bin into the folder Open "
                                    "folder shows.")
        self.bios_state.setOpenExternalLinks(True)
        self.bios_box.set_value(str(len(self.bios)) if self.bios else "—")

        if self.folders:
            self.folders_state.setText("<br>".join(f"<code>{escape(str(f))}</code>" for f in self.folders))
        else:
            self.folders_state.setText("None yet: add the folder with your games (ISO, CHD, CSO, ZSO or GZ images).")
        self.games_box.set_value(str(len(self.games)))
        found = {str(g.file) for g in self.games}
        self.steam_box.set_value(str(len(found & set(self.in_steam))))

        if not self.version:
            self.pill.set_status("Not installed", "warn", "Install PCSX2 first.")
        elif not self.bios:
            self.pill.set_status("No BIOS", "warn", "PCSX2 needs the PS2's BIOS to start a game.")
        elif not self.games:
            self.pill.set_status("No games", "neutral", "Add the folder with your games.")
        else:
            self.pill.set_status("Ready", "ok", "PCSX2 and a BIOS are installed and games were found.")

    def _show_nightly_state(self) -> None:
        """The first step on the nightly channel: what is installed, the newest build GitHub lists, and that a
        nightly is not the release the app was tried with."""
        tried = "A nightly build is not the release this app was tried with."
        if not self.version:
            self.emulator_state.setText("Not installed. Install downloads PCSX2's newest nightly build and checks "
                                        f"it against the checksum GitHub publishes for that build. {tried}")
            self.emulator_box.set_value("—")
            return
        if self.replaced:
            text = ("PCSX2 updated itself in its own window to another build. <b>Install</b> puts the newest "
                    f"nightly build in its place. {tried}")
        elif self.version == emulator.VERSION:
            text = f"PCSX2 {emulator.VERSION} (the stable release) is installed. {tried}"
        else:
            text = f"PCSX2 nightly {escape(self.version)} is installed. {tried}"
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
            box.setCheckState(Qt.CheckState.Checked if str(game.file) in self.in_steam else Qt.CheckState.Unchecked)
            box.setToolTip("In Steam for Game Mode" if str(game.file) in self.in_steam else "Not in Steam")
            self.table.setItem(row, 0, box)
            kind = KINDS.get(game.kind, game.kind)
            for column, text in enumerate((game.title, game.serial, kind, str(game.file)), start=1):
                self.table.setItem(row, column, QTableWidgetItem(text))
            if game.kind != "iso":
                self.table.item(row, 3).setToolTip("A compressed image is not looked into: the name is the file's "
                                                   "and there is no serial. PCSX2 plays it the same.")
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
        found = {str(g.file) for g in self.games}
        remove = [g for g in self.games if str(g.file) in self.in_steam and g not in add]
        remove += [Game(Path(file), name) for file, name in self.in_steam.items() if file not in found]
        return add, remove

    def _update_buttons(self) -> None:
        idle = not self.worker.running
        installed_ = bool(self.version)
        self.refresh_button.setEnabled(idle)
        if self.nightly_check.isChecked():
            # The newest nightly when it is known; without it Install asks GitHub itself.
            can_install = self.replaced or self.latest is None or self.version != self.latest.version
            self.install_button.setToolTip("Download PCSX2's newest nightly build from GitHub and check it against "
                                           "the checksum GitHub publishes for it")
        else:
            can_install = self.version != emulator.VERSION or self.replaced
            self.install_button.setToolTip(f"Download PCSX2 {emulator.VERSION} from GitHub "
                                           f"(about {emulator.SIZE_MB} MB) and check it")
        self.install_button.setEnabled(idle and can_install)
        self.nightly_check.setEnabled(idle)
        self.remove_button.setEnabled(idle and installed_)
        self.bios_button.setEnabled(idle)
        self.folder_button.setEnabled(idle)
        self.forget_button.setEnabled(idle and bool(self.folders))
        self.play_button.setEnabled(idle and installed_ and self.chosen() is not None)
        self.pcsx2_button.setEnabled(idle and installed_)
        add, remove = self.steam_plan()
        named = shortcuts.names(add)        # a name in Steam that differs (one from before the prefix) is renamed
        changed = bool(remove) or any(self.in_steam.get(str(g.file)) != named[g.file] for g in add)
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
            if not self._ask("Install", f"Download PCSX2's newest nightly build from GitHub (about {size} MB)?"
                                        "\n\nIt is checked against the checksum GitHub publishes for that build "
                                        f"before it is installed in {home}. A nightly build is not the release "
                                        "this app was tried with."):
                return
            latest = self._latest_nightly

            def nightly_job() -> tuple[bool, str]:
                try:
                    return True, emulator.install_build(home, latest(), fetch)
                except (emulator.EmulatorError, OSError) as error:
                    return False, f"PCSX2 was not installed: {error}"
            self._start("Downloading PCSX2's newest nightly build…", nightly_job)
            return
        if not self._ask("Install", f"Download PCSX2 {emulator.VERSION} from GitHub (about {emulator.SIZE_MB} MB)?"
                                    "\n\nIt is checked against the SHA-256 this app was tried with before it is "
                                    f"installed in {self.home}."):
            return

        def job() -> tuple[bool, str]:
            try:
                return True, emulator.install(home, fetch)
            except (emulator.EmulatorError, OSError) as error:
                return False, f"PCSX2 was not installed: {error}"
        self._start(f"Downloading PCSX2 {emulator.VERSION}…", job)

    def on_remove(self) -> None:
        text = ("Remove the installed PCSX2?\n\nIts own folder, with the BIOS, your memory cards, saves and "
                "settings, stays.")
        if self.in_steam:
            text += "\nThe games in Game Mode no longer start until it is installed again."
        if self._ask("Remove", text):
            emulator.remove(self.home)
            self.output.appendPlainText("PCSX2 was removed.")
            self.refresh()

    def on_open_bios(self) -> None:
        """The folder PCSX2 reads the BIOS from; made first, so the file manager has something to open."""
        try:
            self.bios_dir.mkdir(parents=True, exist_ok=True)
        except OSError as error:
            self.running.setText(f"The BIOS folder could not be made: {error}")
            return
        if self.open_folder(self.bios_dir):
            self.running.setStyleSheet("font-weight:600;")
            self.running.setText(f"Copy your BIOS dump (.bin) into {self.bios_dir}, then press Refresh.")
        else:
            self.running.setText(f"The file manager could not be opened; the folder is {self.bios_dir}.")

    def on_add_folder(self) -> None:
        folder = QFileDialog.getExistingDirectory(self, window_title("Add a game folder"), str(Path.home()))
        if folder:
            self.add_folder(Path(folder))

    def add_folder(self, folder: Path) -> None:
        folders = [str(f) for f in self.folders]
        if str(folder) not in folders:
            self.settings.set("folders", folders + [str(folder)])
        self.refresh()
        found = scan([folder])
        self.running.setStyleSheet("font-weight:600;")
        self.running.setText(f"{folder} is a game folder now: {len(found)} game(s) in it.")

    def on_forget_folder(self) -> None:
        folders = [str(f) for f in self.folders]
        if not folders:
            return
        folder, ok = QInputDialog.getItem(self, window_title("Remove a game folder"),
                                          "Stop looking for games in:", folders, 0, False)
        if ok and folder:
            self.forget_folder(Path(folder))

    def forget_folder(self, folder: Path) -> None:
        self.settings.set("folders", [str(f) for f in self.folders if f != folder])
        self.refresh()
        self.running.setStyleSheet("font-weight:600;")
        self.running.setText(f"{folder} is no longer a game folder; its games stay where they are.")

    def pcsx2_command(self, *args: str) -> list[str]:
        """The installed PCSX2 through the run wrapper (from the app folder when it is not installed yet)."""
        run = self.run_path if self.run_path.is_file() else ROOT / shortcuts.RUN_NAME
        return [str(run), *args]

    def on_play(self) -> None:
        game = self.chosen()
        if game is None or not self.version:
            return
        command = self.pcsx2_command("-nogui", "--", str(game.file))
        if QProcess.startDetached(command[0], command[1:], str(game.folder))[0]:
            self.running.setText(f"Started {game.title}.")
        else:
            self.running.setText(f"{game.title} could not be started: {command[0]} did not run.")

    def on_open_pcsx2(self) -> None:
        command = self.pcsx2_command()
        if not QProcess.startDetached(command[0], command[1:])[0]:
            self.running.setText(f"PCSX2 could not be started: {command[0]} did not run.")

    def on_update_steam(self) -> None:
        if self.steam_dir is None:
            return
        if not self.run_path.is_file():
            self.running.setText(f"The shortcuts run {self.run_path}, which is not there: install "
                                 f"{APP_NAME} through the portal first.")
            return
        add, remove = self.steam_plan()
        if add and not self.version:
            self.running.setText("Install PCSX2 first: the games in Game Mode start it.")
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
        self.settings.set_window_state("geometry", self.saveGeometry())
        self.settings.sync()
        super().closeEvent(event)
