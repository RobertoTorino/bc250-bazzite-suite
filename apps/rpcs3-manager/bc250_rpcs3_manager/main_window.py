# SPDX-License-Identifier: GPL-3.0-or-later
"""The main window: RPCS3 itself, the PS3 firmware and the game folders as three steps with their state and
buttons, then the games found, each with a box for Game Mode. Downloading RPCS3, asking GitHub for a newer one and
changing Steam's files run off the GUI thread; nothing here needs root. The look is the app's own indigo
(style.py)."""

from __future__ import annotations

from html import escape
from pathlib import Path

from PyQt6.QtCore import QProcess, Qt, QTimer
from PyQt6.QtGui import QBrush, QCloseEvent, QColor
from PyQt6.QtWidgets import (QAbstractItemView, QFileDialog, QGridLayout, QHBoxLayout, QHeaderView, QInputDialog,
                             QLabel, QMainWindow, QMessageBox, QPushButton, QTableWidget, QTableWidgetItem,
                             QVBoxLayout, QWidget)

from bc250_core import SUITE_MANUAL_URL, steam, window_title
from bc250_core import __version__ as CORE_VERSION
from bc250_core.platform import bin_home
from bc250_core.settings import SettingsStore
from bc250_core.updates import ReleaseInfo, UpdateChecker
from bc250_core.widgets import AppHeader, MetricBox, StatusText, Terminal, hint_label

from . import APP_NAME, INFO, LOGO_PATH, ROOT, __version__, emulator, shortcuts, style, userdata
from .games import Game, installed, known, scan

MANUAL_URL = f"{SUITE_MANUAL_URL}apps/rpcs3-manager/"
FIRMWARE_WATCH_MS = 2000
FIRMWARE_WATCH_LIMIT = 300              # checks, so 10 minutes: RPCS3's own window does the installing
STEAM_TIP = "Add the ticked games to Steam and take out the others; Steam closes for it and starts again"
NO_SFB = "PS3_DISC.SFB is missing or damaged in this disc game's folder: RPCS3 does not start it without"


class RpcsSettings(SettingsStore):
    DEFAULTS: dict = {"folders": []}    # the game folders chosen in the app


class MainWindow(QMainWindow):
    def __init__(self, home: Path | None = None, rpcs3_home: Path | None = None, steam_dir: Path | None = None,
                 run: Path | None = None, fetch: emulator.Download = emulator.download,
                 steam_closed=steam.with_steam_closed, steam_running=steam.steam_running,
                 newer_release=emulator.newer_release):
        """*home*: where the app installs RPCS3; *rpcs3_home*: RPCS3's own folder; *steam_dir*: Steam's folder
        (None: looked up); *run*: the run wrapper the shortcuts start; *fetch*: the download; *steam_closed* and
        *steam_running*: closing Steam for a change and asking whether it runs; *newer_release*: asks GitHub for a
        newer RPCS3 (tests never touch the real ones)."""
        super().__init__()
        self.resize(980, 760)
        self.home = home or emulator.emulator_home()
        self.rpcs3_home = rpcs3_home or userdata.rpcs3_home()
        self.steam_dir = steam_dir if steam_dir is not None else steam.find_steam()
        self.run_path = run or bin_home() / shortcuts.RUN_NAME
        self.fetch = fetch
        self.steam_closed = steam_closed
        self.steam_running = steam_running
        self.newer: ReleaseInfo | None = None           # RPCS3's newest landmark, when newer than the pinned one
        self.release_check = UpdateChecker(self)        # apart from the worker: it runs while the window opens
        self.release_check.finished.connect(self._release_found)
        self.firmware_watch = QTimer(self)              # while RPCS3 installs the firmware in its own window
        self.firmware_watch.setInterval(FIRMWARE_WATCH_MS)
        self.firmware_watch.timeout.connect(self._watch_firmware)
        self._firmware_checks = 0
        self._firmware_before = ""
        self.settings = RpcsSettings(INFO, self)
        self.worker = UpdateChecker(self)            # one job at a time off the GUI thread: a download or Steam
        self.worker.finished.connect(self._job_done)
        self.games: list[Game] = []
        self.in_steam: dict[str, str] = {}
        self.version = ""
        self.replaced = False                       # RPCS3 updated itself to a build the app was not tried with
        self.firmware = ""
        self.folders: list[Path] = []

        header = AppHeader(LOGO_PATH, APP_NAME, __version__)
        self.pill = StatusText()
        header.add_state(self.pill)
        self.refresh_button = QPushButton("Refresh")
        self.refresh_button.setToolTip("Read the state again and look for games")
        self.refresh_button.clicked.connect(self.refresh)
        header.add_action(self.refresh_button)
        self.emulator_box = MetricBox("RPCS3", style.INDIGO)
        self.firmware_box = MetricBox("Firmware", style.INDIGO)
        self.games_box = MetricBox("Games", style.INDIGO)
        self.steam_box = MetricBox("In Game Mode", style.INDIGO)
        for box in (self.emulator_box, self.firmware_box, self.games_box, self.steam_box):
            header.add_second(box)
        intro = hint_label(
            "PS3 games on the BC-250 with the RPCS3 emulator. The app installs the RPCS3 build it was tried with, "
            "finds your games and puts them in Steam, so they start from Game Mode. Games and the PS3's firmware "
            "come from you; the app never downloads them. " + style.link(self, MANUAL_URL, "Manual"))

        grid = QGridLayout()
        grid.setColumnStretch(2, 1)
        grid.setHorizontalSpacing(14)
        grid.setVerticalSpacing(10)
        self.emulator_state, self.firmware_state, self.folders_state = (self._state_label() for _ in range(3))
        self.install_button = style.primary_button("Install", f"Download RPCS3 {emulator.VERSION} from GitHub "
                                                              f"(about {emulator.SIZE_MB} MB) and check it")
        self.install_button.clicked.connect(self.on_install)
        self.remove_button = QPushButton("Remove")
        self.remove_button.setToolTip("Remove the installed RPCS3; its own folder (firmware, saves, settings) stays")
        self.remove_button.clicked.connect(self.on_remove)
        self.firmware_button = QPushButton("Install firmware…")
        self.firmware_button.setToolTip("Choose the PS3UPDAT.PUP you downloaded; RPCS3 installs it in its own window")
        self.firmware_button.clicked.connect(self.on_install_firmware)
        self.folder_button = QPushButton("Add folder…")
        self.folder_button.setToolTip("Add a folder with disc games (each with PS3_GAME and PS3_DISC.SFB)")
        self.folder_button.clicked.connect(self.on_add_folder)
        self.forget_button = QPushButton("Remove folder…")
        self.forget_button.setToolTip("Stop looking for games in one of the folders; the games stay where they are")
        self.forget_button.clicked.connect(self.on_forget_folder)
        rows = [("RPCS3", self.emulator_state, [self.install_button, self.remove_button]),
                ("Firmware", self.firmware_state, [self.firmware_button]),
                ("Game folders", self.folders_state, [self.folder_button, self.forget_button])]
        centre = Qt.AlignmentFlag.AlignVCenter
        for row, (name, state, buttons) in enumerate(rows):
            label = QLabel(name)
            label.setStyleSheet("font-weight:700;")
            for text in (label, state):
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
        self.play_button.setToolTip("Start the chosen game in RPCS3, here on the desktop")
        self.play_button.clicked.connect(self.on_play)
        self.rpcs3_button = QPushButton("RPCS3 settings")
        self.rpcs3_button.setToolTip("Open RPCS3's own window: its settings, controllers and game list")
        self.rpcs3_button.clicked.connect(self.on_open_rpcs3)
        self.steam_button = style.primary_button("Update Game Mode", STEAM_TIP)
        self.steam_button.clicked.connect(self.on_update_steam)
        buttons = QHBoxLayout()
        buttons.addWidget(self.play_button)
        buttons.addWidget(self.rpcs3_button)
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
        version = QLabel(f"{APP_NAME} {__version__} · core {CORE_VERSION} · RPCS3 {emulator.VERSION}")
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
        self.release_check.start(newer_release)

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
        vfs = userdata.read_map(self.rpcs3_home / "vfs.yml")
        self.dev_flash = userdata.drive(self.rpcs3_home, vfs, "/dev_flash/")
        self.hdd0_game = userdata.drive(self.rpcs3_home, vfs, "/dev_hdd0/") / "game"
        self.firmware = userdata.firmware_version(self.dev_flash)
        self.known = list(userdata.known_games(self.rpcs3_home).values())
        self.folders = [Path(f) for f in self.settings.get("folders") if f]
        self.games = scan(self.folders, self.hdd0_game, self.known)
        try:
            self.in_steam = shortcuts.in_steam(self.steam_dir) if self.steam_dir else {}
        except OSError:
            self.in_steam = {}
        self._show_state()
        self._fill_table()

    def _show_state(self) -> None:
        pinned = emulator.VERSION
        if not self.version:
            self.emulator_state.setText(f"Not installed. Install downloads RPCS3 {pinned}, the build this version "
                                        "of the app was tried with, and checks it before installing it.")
            self.emulator_box.set_value("—")
        elif self.version != pinned:
            self.emulator_state.setText(f"RPCS3 {escape(self.version)} is installed; this version of the app "
                                        f"brings {pinned}: <b>install it</b> to use it.")
            self.emulator_box.set_value(self.version)
        elif self.replaced:
            self.emulator_state.setText("RPCS3 updated itself in its own window to a build this version of the app "
                                        f"was not tried with. <b>Install</b> puts back {pinned}.")
            self.emulator_box.set_value("other")
        else:
            self.emulator_state.setText(f"RPCS3 {pinned} is installed. "
                                        + style.link(self, emulator.RELEASE_PAGE, "What is in it"))
            self.emulator_box.set_value(emulator.LANDMARK)
        if self.newer is not None:
            self.emulator_state.setText(
                self.emulator_state.text() + f"<br>RPCS3 {escape(self.newer.version)} is out "
                f"({escape(self.newer.published)}). A later version of this app brings it, once it has been tried "
                "on the board. " + style.link(self, self.newer.url, "What is new"))
        self.emulator_state.setOpenExternalLinks(True)

        page = style.link(self, userdata.FIRMWARE_PAGE, "here")
        if self.firmware:
            self.firmware_state.setText(f"PS3 firmware {escape(self.firmware)} is installed in "
                                        f"<code>{escape(str(self.dev_flash))}</code>.")
        else:
            self.firmware_state.setText("Not installed. RPCS3 needs the PS3's firmware to start any game: download "
                                        f"the firmware {page} (official page), then press Install firmware.")
        self.firmware_state.setOpenExternalLinks(True)
        self.firmware_box.set_value(self.firmware or "—")

        own = (f"{len(installed(self.hdd0_game))} installed in RPCS3, {len(known(self.known))} disc game(s) "
               "it knows.")
        if self.folders:
            self.folders_state.setText("<br>".join(f"<code>{escape(str(f))}</code>" for f in self.folders)
                                       + f"<br>And RPCS3's own: {own}")
        else:
            self.folders_state.setText("None yet: add the folder with your disc games (each in a folder of its own, "
                                       f"with PS3_GAME). RPCS3's own: {own}")
        self.games_box.set_value(str(len(self.games)))
        found = {str(g.eboot) for g in self.games}
        self.steam_box.set_value(str(len(found & set(self.in_steam))))

        if not self.version:
            self.pill.set_status("Not installed", "warn", "Install RPCS3 first.")
        elif not self.firmware:
            self.pill.set_status("No firmware", "warn", "RPCS3 needs the PS3's firmware to start a game.")
        elif not self.games:
            self.pill.set_status("No games", "neutral", "Add the folder with your games.")
        else:
            self.pill.set_status("Ready", "ok", "RPCS3 and its firmware are installed and games were found.")

    def _release_found(self, release: ReleaseInfo | None) -> None:
        self.newer = release
        if release is not None:
            self._show_state()

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
            if not game.startable:
                folder = self.table.item(row, 4)
                folder.setForeground(QBrush(QColor("#c62828")))
                folder.setToolTip(f"{NO_SFB} it.")
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
        installed_ = bool(self.version)
        self.refresh_button.setEnabled(idle)
        self.install_button.setEnabled(idle and (self.version != emulator.VERSION or self.replaced))
        self.remove_button.setEnabled(idle and installed_)
        self.firmware_button.setEnabled(idle and installed_)
        self.folder_button.setEnabled(idle)
        self.forget_button.setEnabled(idle and bool(self.folders))
        self.play_button.setEnabled(idle and installed_ and self.chosen() is not None)
        self.rpcs3_button.setEnabled(idle and installed_)
        add, remove = self.steam_plan()
        named = shortcuts.names(add)        # a name in Steam that differs (one from before the prefix) is renamed
        changed = bool(remove) or any(self.in_steam.get(str(g.eboot)) != named[g.eboot] for g in add)
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
        if not self._ask("Install", f"Download RPCS3 {emulator.VERSION} from GitHub (about {emulator.SIZE_MB} MB)?"
                                    "\n\nIt is checked against the SHA-256 this app was tried with before it is "
                                    f"installed in {self.home}."):
            return
        home, fetch = self.home, self.fetch

        def job() -> tuple[bool, str]:
            try:
                return True, emulator.install(home, fetch)
            except (emulator.EmulatorError, OSError) as error:
                return False, f"RPCS3 was not installed: {error}"
        self._start(f"Downloading RPCS3 {emulator.VERSION}…", job)

    def on_remove(self) -> None:
        text = ("Remove the installed RPCS3?\n\nIts own folder, with the firmware, your saves, settings and installed "
                "games, stays.")
        if self.in_steam:
            text += "\nThe games in Game Mode no longer start until it is installed again."
        if self._ask("Remove", text):
            emulator.remove(self.home)
            self.output.appendPlainText("RPCS3 was removed.")
            self.refresh()

    def on_install_firmware(self) -> None:
        name, _ = QFileDialog.getOpenFileName(self, window_title("Install the PS3 firmware"), str(Path.home()),
                                              "PS3 firmware (*.PUP *.pup);;All files (*)")
        if name:
            self.install_firmware(Path(name))

    def install_firmware(self, pup: Path) -> None:
        """Through RPCS3 itself (--installfw): it shows its progress in its own window. The state follows when the
        firmware's version changes."""
        command = self.rpcs3_command("--installfw", str(pup))
        if not QProcess.startDetached(command[0], command[1:])[0]:
            self.running.setText(f"RPCS3 could not be started: {command[0]} did not run.")
            return
        self.running.setText(f"RPCS3 installs {pup.name} in its own window. Close RPCS3 when it is done.")
        self._firmware_before = self.firmware
        self._firmware_checks = 0
        self.firmware_watch.start()

    def _watch_firmware(self) -> None:
        self._firmware_checks += 1
        now = userdata.firmware_version(self.dev_flash)
        if now and now != self._firmware_before:
            self.firmware_watch.stop()
            self._job_done((True, f"PS3 firmware {now} is installed."))
        elif self._firmware_checks >= FIRMWARE_WATCH_LIMIT:
            self.firmware_watch.stop()

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

    def rpcs3_command(self, *args: str) -> list[str]:
        """The installed RPCS3 through the run wrapper (from the app folder when it is not installed yet)."""
        run = self.run_path if self.run_path.is_file() else ROOT / shortcuts.RUN_NAME
        return [str(run), *args]

    def on_play(self) -> None:
        game = self.chosen()
        if game is None or not self.version:
            return
        if not game.startable:
            self.running.setText(f"{game.title}: {NO_SFB} it.")
            return
        command = self.rpcs3_command("--no-gui", str(game.eboot))
        if QProcess.startDetached(command[0], command[1:], str(game.folder))[0]:
            self.running.setText(f"Started {game.title}.")
        else:
            self.running.setText(f"{game.title} could not be started: {command[0]} did not run.")

    def on_open_rpcs3(self) -> None:
        command = self.rpcs3_command()
        if not QProcess.startDetached(command[0], command[1:])[0]:
            self.running.setText(f"RPCS3 could not be started: {command[0]} did not run.")

    def on_update_steam(self) -> None:
        if self.steam_dir is None:
            return
        if not self.run_path.is_file():
            self.running.setText(f"The shortcuts run {self.run_path}, which is not there: install "
                                 f"{APP_NAME} through the portal first.")
            return
        add, remove = self.steam_plan()
        if add and not self.version:
            self.running.setText("Install RPCS3 first: the games in Game Mode start it.")
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
        self.firmware_watch.stop()
        self.settings.set_window_state("geometry", self.saveGeometry())
        self.settings.sync()
        super().closeEvent(event)
