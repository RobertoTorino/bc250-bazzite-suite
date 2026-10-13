# SPDX-License-Identifier: GPL-3.0-or-later
"""The main window: shadPS4 itself, the system modules and the game folders as three steps with their state and
buttons, then the games found, each with a box for Game Mode. Downloading shadPS4 and changing Steam's files run off
the GUI thread; nothing here needs root."""

from __future__ import annotations

import subprocess
from html import escape
from pathlib import Path

from PyQt6.QtCore import QProcess, Qt
from PyQt6.QtGui import QCloseEvent
from PyQt6.QtWidgets import (QAbstractItemView, QFileDialog, QGridLayout, QHBoxLayout, QHeaderView, QLabel,
                             QMainWindow, QMessageBox, QPushButton, QTableWidget, QTableWidgetItem, QVBoxLayout,
                             QWidget)

from bc250_core import SUITE_MANUAL_URL, steam, window_title
from bc250_core import __version__ as CORE_VERSION
from bc250_core.platform import bin_home, xdg_open
from bc250_core.settings import SettingsStore
from bc250_core.updates import UpdateChecker
from bc250_core.widgets import AppHeader, MetricBox, StatusText, Terminal, accent_button, hint_label

from . import APP_NAME, INFO, LOGO_PATH, ROOT, __version__, emulator, shortcuts, userdata
from .games import Game, scan

MANUAL_URL = f"{SUITE_MANUAL_URL}apps/shadps4/"
GREEN, AMBER, GREY = "#2e7d32", "#b26a00", "#757575"
FOLDER_TIMEOUT = 60


class ShadSettings(SettingsStore):
    DEFAULTS: dict = {}


class MainWindow(QMainWindow):
    def __init__(self, home: Path | None = None, shad_home: Path | None = None, steam_dir: Path | None = None,
                 run: Path | None = None, fetch: emulator.Download = emulator.download):
        """*home*: where the app installs shadPS4; *shad_home*: shadPS4's own folder; *steam_dir*: Steam's folder
        (None: looked up); *run*: the run wrapper the shortcuts start; *fetch*: the download, for tests."""
        super().__init__()
        self.resize(980, 760)
        self.home = home or emulator.emulator_home()
        self.shad_home = shad_home or userdata.shadps4_home()
        self.steam_dir = steam_dir if steam_dir is not None else steam.find_steam()
        self.run_path = run or bin_home() / shortcuts.RUN_NAME
        self.fetch = fetch
        self.settings = ShadSettings(INFO, self)
        self.worker = UpdateChecker(self)            # one job at a time off the GUI thread: a download or Steam
        self.worker.finished.connect(self._job_done)
        self.games: list[Game] = []
        self.in_steam: dict[str, str] = {}
        self.version = ""
        self.config: dict = {}

        header = AppHeader(LOGO_PATH, APP_NAME, __version__)
        self.pill = StatusText()
        header.add_state(self.pill)
        self.refresh_button = QPushButton("Refresh")
        self.refresh_button.setToolTip("Read the state again and look for games")
        self.refresh_button.clicked.connect(self.refresh)
        header.add_action(self.refresh_button)
        self.emulator_box = MetricBox("shadPS4")
        self.modules_box = MetricBox("System modules")
        self.games_box = MetricBox("Games")
        self.steam_box = MetricBox("In Game Mode")
        for box in (self.emulator_box, self.modules_box, self.games_box, self.steam_box):
            header.add_second(box)
        intro = hint_label(
            "PS4 games on the BC-250 with the shadPS4 emulator. The app installs the shadPS4 release it was tried "
            "with, finds your games and puts them in Steam, so they start from Game Mode. Games, saves and system "
            "modules come from your own PS4; the app never downloads them. "
            f"<a href='{MANUAL_URL}'>Manual</a>")

        grid = QGridLayout()
        grid.setColumnStretch(1, 1)
        grid.setHorizontalSpacing(14)
        grid.setVerticalSpacing(10)
        self.emulator_state, self.modules_state, self.folders_state = (self._state_label() for _ in range(3))
        self.install_button = accent_button("Install", f"Download shadPS4 {emulator.VERSION} from GitHub "
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
        rows = [("1. shadPS4", self.emulator_state, [self.install_button, self.remove_button]),
                ("2. System modules", self.modules_state, [self.modules_button]),
                ("3. Game folders", self.folders_state, [self.folder_button])]
        # As in BC-250 Mesh Shaders: one line per step, its buttons the size of the widest plain one, in two
        # columns on the right.
        everything = [b for _, _, buttons in rows for b in buttons]
        width = max(b.sizeHint().width() for b in everything)
        height = max(b.sizeHint().height() for b in everything if b is not self.install_button)
        centre = Qt.AlignmentFlag.AlignVCenter
        for row, (name, state, buttons) in enumerate(rows):
            label = QLabel(name)
            label.setStyleSheet("font-weight:700;")
            for text in (label, state):
                text.setAlignment(Qt.AlignmentFlag.AlignLeft | centre)
            grid.addWidget(label, row, 0)
            grid.addWidget(state, row, 1)
            for column, button in zip((3, 2), reversed(buttons)):
                button.setFixedSize(width, height)
                grid.addWidget(button, row, column, centre)
            grid.setRowMinimumHeight(row, height)

        self.table = QTableWidget(0, 5)
        self.table.setHorizontalHeaderLabels(["Game Mode", "Game", "ID", "Version", "Folder"])
        self.table.setSelectionBehavior(QAbstractItemView.SelectionBehavior.SelectRows)
        self.table.setSelectionMode(QAbstractItemView.SelectionMode.SingleSelection)
        self.table.setEditTriggers(QAbstractItemView.EditTrigger.NoEditTriggers)
        self.table.verticalHeader().setVisible(False)
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
        self.steam_button = accent_button("Update Game Mode", "Add the ticked games to Steam and take out the "
                                                              "others; Steam closes for it and starts again")
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

        geometry = self.settings.window_state("geometry")
        if geometry is not None:
            self.restoreGeometry(geometry)
        self.refresh()

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
        self.games = scan(self.folders)
        try:
            self.in_steam = shortcuts.in_steam(self.steam_dir) if self.steam_dir else {}
        except OSError:
            self.in_steam = {}
        self._show_state()
        self._fill_table()

    def _show_state(self) -> None:
        pinned = emulator.VERSION
        if not self.version:
            self.emulator_state.setText(f"Not installed. Install downloads shadPS4 {pinned}, the release this "
                                        "version of the app was tried with, and checks it before unpacking.")
            self.emulator_box.set_value("—")
        elif self.version != pinned:
            self.emulator_state.setText(f"shadPS4 {escape(self.version)} is installed; this version of the app "
                                        f"brings {pinned}: <b>install it</b> to use it.")
            self.emulator_box.set_value(self.version)
        else:
            self.emulator_state.setText(f"shadPS4 {pinned} is installed. "
                                        f"<a href='{emulator.RELEASE_PAGE}'>Release notes</a>")
            self.emulator_box.set_value(pinned)
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
        self.install_button.setEnabled(idle and self.version != emulator.VERSION)
        self.remove_button.setEnabled(idle and installed)
        self.folder_button.setEnabled(idle and installed)
        self.play_button.setEnabled(idle and installed and self.chosen() is not None)
        self.shad_button.setEnabled(idle and installed)
        add, remove = self.steam_plan()
        changed = bool(remove) or any(str(g.eboot) not in self.in_steam for g in add)
        self.steam_button.setEnabled(idle and changed and self.steam_dir is not None and not steam.game_mode())
        if self.steam_dir is None:
            self.steam_button.setToolTip("Steam was never started on this system: start it once first")
        elif steam.game_mode():
            self.steam_button.setToolTip("In Game Mode Steam is the session itself: change it in Desktop Mode")

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
        if not self._ask("Install", f"Download shadPS4 {emulator.VERSION} from GitHub (about {emulator.SIZE_MB} MB)?"
                                    "\n\nIt is checked against the SHA-256 this app was tried with before it is "
                                    f"unpacked into {self.home}."):
            return
        home, fetch = self.home, self.fetch

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

    def shadps4_command(self, *args: str) -> list[str]:
        """The installed shadPS4 through the run wrapper (from the app folder when it is not installed yet)."""
        run = self.run_path if self.run_path.is_file() else ROOT / shortcuts.RUN_NAME
        return [str(run), *args]

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
        if steam.steam_running():
            text += "\n\nSteam closes for it and starts again in the background."
        if not self._ask("Game Mode", text):
            return
        changes = shortcuts.changes(add, remove, self.run_path, LOGO_PATH, self.in_steam)
        folder = self.steam_dir

        def job() -> tuple[bool, str]:
            try:
                restarted = steam.with_steam_closed(lambda: steam.write_shortcuts(folder, changes))
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
        self.settings.set_window_state("geometry", self.saveGeometry())
        self.settings.sync()
        super().closeEvent(event)
