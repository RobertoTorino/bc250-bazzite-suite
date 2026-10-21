# SPDX-License-Identifier: GPL-3.0-or-later
"""The main window: SameBoy itself (RetroArch and the core) and the game folders as two steps with their state and
buttons, then the games found, each with a box for Game Mode. Installing, asking the
libretro buildbot for a newer core and changing Steam's files run off the GUI thread; nothing here needs root. The
look is the app's own blue (style.py)."""

from __future__ import annotations

from html import escape
from pathlib import Path

from PyQt6.QtCore import QProcess, Qt
from PyQt6.QtGui import QCloseEvent
from PyQt6.QtWidgets import (QAbstractItemView, QFileDialog, QGridLayout, QHBoxLayout, QHeaderView, QInputDialog,
                             QLabel, QMainWindow, QMessageBox, QPushButton, QTableWidget, QTableWidgetItem,
                             QVBoxLayout, QWidget)

from bc250_core import SUITE_MANUAL_URL, steam, upstream, window_title
from bc250_core import __version__ as CORE_VERSION
from bc250_core.platform import bin_home
from bc250_core.settings import SettingsStore
from bc250_core.updates import UpdateChecker
from bc250_core.widgets import AppHeader, MetricBox, StatusText, Terminal, hint_label

from . import APP_NAME, INFO, LOGO_PATH, ROOT, __version__, emulator, shortcuts, style
from .games import Game, scan

MANUAL_URL = f"{SUITE_MANUAL_URL}apps/sameboy/"
STEAM_TIP = "Add the ticked games to Steam and take out the others; Steam closes for it and starts again"
KINDS = {"gb": "GB", "gbc": "GBC", "zip": "ZIP"}
SYSTEMS = {"GB": "Game Boy", "GBC": "Game Boy Color"}


class SameBoySettings(SettingsStore):
    DEFAULTS: dict = {"folders": []}            # the game folders chosen in the app


class MainWindow(QMainWindow):
    def __init__(self, home: Path | None = None, steam_dir: Path | None = None, run: Path | None = None,
                 fetch: emulator.Download = emulator.download, flatpak: emulator.Run = emulator.run,
                 head_of: emulator.Head = emulator.head, steam_closed=steam.with_steam_closed,
                 steam_running=steam.steam_running):
        """*home*: where the app installs the core; *steam_dir*: Steam's folder (None: looked up); *run*: the run
        wrapper the shortcuts start; *fetch*: the download of the core; *flatpak*: runs a flatpak command; *head_of*:
        asks the buildbot for a core's headers; *steam_closed* and *steam_running*: closing Steam for a change and
        asking whether it runs (tests never touch the real ones)."""
        super().__init__()
        self.resize(980, 680)
        self.home = home or emulator.emulator_home()
        self.steam_dir = steam_dir if steam_dir is not None else steam.find_steam()
        self.run_path = run or bin_home() / shortcuts.RUN_NAME
        self.fetch = fetch
        self.flatpak = flatpak
        self.head_of = head_of
        self.steam_closed = steam_closed
        self.steam_running = steam_running
        self.newer = ""                                 # the date of a newer core build, when there is one
        self.release_check = UpdateChecker(self)        # apart from the worker: it runs while the window opens
        self.release_check.finished.connect(self._release_found)
        self.settings = SameBoySettings(INFO, self)
        self.worker = UpdateChecker(self)            # one job at a time off the GUI thread: a download or Steam
        self.worker.finished.connect(self._job_done)
        self.games: list[Game] = []
        self.in_steam: dict[str, str] = {}
        self.retroarch = ""                             # the RetroArch version, "" when it is not installed
        self.core = ""                                  # the build date of the core, "" when it is not installed
        self.folders: list[Path] = []

        header = AppHeader(LOGO_PATH, APP_NAME, __version__)
        self.pill = StatusText()
        header.add_state(self.pill)
        self.refresh_button = QPushButton("Refresh")
        self.refresh_button.setToolTip("Read the state again and look for games")
        self.refresh_button.clicked.connect(self.refresh)
        header.add_action(self.refresh_button)
        self.emulator_box = MetricBox("SameBoy", style.BLUE)
        self.games_box = MetricBox("Games", style.BLUE)
        self.steam_box = MetricBox("In Game Mode", style.BLUE)
        for box in (self.emulator_box, self.games_box, self.steam_box):
            header.add_second(box)
        intro = hint_label(
            "Game Boy and Game Boy Color games on the BC-250 with the SameBoy emulator, a core of RetroArch. The "
            "app installs RetroArch (a Flatpak) and the core, finds your games and puts them in Steam, so they "
            "start from Game Mode. Games come from your own cartridges; the app never downloads them. "
            + style.link(self, MANUAL_URL, "Manual"))

        grid = QGridLayout()
        grid.setColumnStretch(2, 1)
        grid.setHorizontalSpacing(14)
        grid.setVerticalSpacing(10)
        self.emulator_state, self.folders_state = (self._state_label() for _ in range(2))
        self.install_button = style.primary_button("Install", "Install RetroArch from Flathub, when it is not "
                                                              "there, and the SameBoy core from libretro")
        self.install_button.clicked.connect(self.on_install)
        self.remove_button = QPushButton("Remove")
        self.remove_button.setToolTip("Remove the SameBoy core; RetroArch, its settings and your saves stay")
        self.remove_button.clicked.connect(self.on_remove)
        self.folder_button = QPushButton("Add folder…")
        self.folder_button.setToolTip("Add a folder with your games (.gb and .gbc files, or .zip files with one in "
                                      "them)")
        self.folder_button.clicked.connect(self.on_add_folder)
        self.forget_button = QPushButton("Remove folder…")
        self.forget_button.setToolTip("Stop looking for games in one of the folders; the games stay where they are")
        self.forget_button.clicked.connect(self.on_forget_folder)
        rows = [("SameBoy", self.emulator_state, [self.install_button, self.remove_button]),
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
        self.table.setHorizontalHeaderLabels(["Game Mode", "Game", "System", "Kind", "File"])
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
        self.play_button.setToolTip("Start the chosen game in RetroArch, here on the desktop")
        self.play_button.clicked.connect(self.on_play)
        self.retroarch_button = QPushButton("RetroArch settings")
        self.retroarch_button.setToolTip("Open RetroArch's own window: its settings, controllers and the core's "
                                         "options (the model of Game Boy it plays, its colours)")
        self.retroarch_button.clicked.connect(self.on_open_retroarch)
        self.steam_button = style.primary_button("Update Game Mode", STEAM_TIP)
        self.steam_button.clicked.connect(self.on_update_steam)
        buttons = QHBoxLayout()
        buttons.addWidget(self.play_button)
        buttons.addWidget(self.retroarch_button)
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
        version = QLabel(f"{APP_NAME} {__version__} · core {CORE_VERSION}")
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
        self._check_core()

    @staticmethod
    def _state_label() -> QLabel:
        label = QLabel()
        label.setWordWrap(True)
        label.setTextInteractionFlags(Qt.TextInteractionFlag.TextSelectableByMouse)
        return label

    # --- State ------------------------------------------------------------------------------------------------

    def refresh(self) -> None:
        self.retroarch = emulator.retroarch_version(self.flatpak)
        self.core = emulator.installed_core(self.home)
        self.folders = [Path(f) for f in self.settings.get("folders") if f]
        self.games = scan(self.folders)
        try:
            self.in_steam = shortcuts.in_steam(self.steam_dir) if self.steam_dir else {}
        except OSError:
            self.in_steam = {}
        self._show_state()
        self._fill_table()

    @property
    def ready(self) -> bool:
        return bool(self.retroarch and self.core)

    def _show_state(self) -> None:
        retroarch = f"RetroArch {escape(self.retroarch)}" if self.retroarch else "RetroArch"
        if not self.ready:
            missing = [name for name, found in (("RetroArch", self.retroarch), ("the SameBoy core", self.core))
                       if not found]
            self.emulator_state.setText(f"Not installed: {' and '.join(missing)}. Install gets what is missing "
                                        "(RetroArch from Flathub, the core from libretro) and checks the core.")
            self.emulator_box.set_value(self.core or "—")
        else:
            self.emulator_state.setText(f"{retroarch} (Flatpak) with the SameBoy core of {escape(self.core)}. "
                                        + style.link(self, emulator.CORE_PAGE, "About the core"))
            self.emulator_box.set_value(self.core)
        if self.newer:
            self.emulator_state.setText(self.emulator_state.text() + f"<br>The libretro buildbot has {escape(self.newer)}"
                                        ": <b>Update</b> installs it.")
        self.emulator_state.setOpenExternalLinks(True)

        if self.folders:
            self.folders_state.setText("<br>".join(f"<code>{escape(str(f))}</code>" for f in self.folders))
        else:
            self.folders_state.setText("None yet: add the folder with your games (.gb and .gbc files, or .zip files "
                                       "with one in them).")
        self.games_box.set_value(str(len(self.games)))
        found = {str(g.file) for g in self.games}
        self.steam_box.set_value(str(len(found & set(self.in_steam))))

        if not self.ready:
            self.pill.set_status("Not installed", "warn", "Install RetroArch and the SameBoy core first.")
        elif not self.games:
            self.pill.set_status("No games", "neutral", "Add the folder with your games.")
        else:
            self.pill.set_status("Ready", "ok", "RetroArch and the SameBoy core are installed and games were found.")

    def _check_core(self) -> None:
        """Asks the buildbot for a newer core, off the GUI thread."""
        home, head_of = self.home, self.head_of
        self.release_check.start(lambda: emulator.newer_core(home, head_of))

    def _release_found(self, newer: str | None) -> None:
        """The buildbot's answer: a newer build, "" for none, None when it could not be asked (the notice in the
        portal then stays as it was)."""
        self.newer = newer or ""
        self._show_state()
        self._update_buttons()
        if newer is not None:
            upstream.publish("sameboy", [upstream.Outside(
                "SameBoy core", self.core, self.newer, url=emulator.CORE_PAGE,
                action="Update on the first step installs it.")] if self.newer else [])

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
            for column, text in enumerate((game.title, SYSTEMS.get(game.system, game.system), kind, str(game.file)),
                                          start=1):
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
        found = {str(g.file) for g in self.games}
        remove = [g for g in self.games if str(g.file) in self.in_steam and g not in add]
        remove += [Game(Path(file), name) for file, name in self.in_steam.items() if file not in found]
        return add, remove

    def _update_buttons(self) -> None:
        idle = not self.worker.running
        self.refresh_button.setEnabled(idle)
        self.install_button.setText("Update" if self.ready and self.newer else "Install")
        self.install_button.setEnabled(idle and (not self.ready or bool(self.newer)))
        self.remove_button.setEnabled(idle and bool(self.core))
        self.folder_button.setEnabled(idle)
        self.forget_button.setEnabled(idle and bool(self.folders))
        self.play_button.setEnabled(idle and self.ready and self.chosen() is not None)
        self.retroarch_button.setEnabled(idle and bool(self.retroarch))
        add, remove = self.steam_plan()
        named = shortcuts.names(add)        # a name in Steam that differs is renamed
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
        if self.newer:                                  # an Update installed it, or not: ask again
            self._check_core()
        if not ok:
            self.running.setStyleSheet("font-weight:600;color:#c62828;")
        else:
            self.running.setStyleSheet("font-weight:600;")

    def on_install(self) -> None:
        need_retroarch = not self.retroarch
        text = "Download " + (f"RetroArch from Flathub (about {emulator.RETROARCH_SIZE_MB} MB) and " if need_retroarch
                              else "") + f"the SameBoy core from libretro (about {emulator.SIZE_MB} MB)?"
        text += ("\n\nRetroArch is installed for your user, with Flatpak. " if need_retroarch else "\n\n")
        text += f"The core is checked before it is installed in {self.home}."
        if not self._ask("Install", text):
            return
        home, fetch, flatpak, head_of = self.home, self.fetch, self.flatpak, self.head_of

        def job() -> tuple[bool, str]:
            done = []
            try:
                if need_retroarch:
                    done.append(emulator.install_retroarch(flatpak))
                done.append(emulator.install_core(home, fetch, head_of))
            except (emulator.EmulatorError, OSError) as error:
                return False, " ".join(done + [f"SameBoy was not installed: {error}"])
            return True, " ".join(done)
        self._start("Installing…", job)

    def on_remove(self) -> None:
        text = ("Remove the SameBoy core?\n\nRetroArch, with its settings and your saves, stays: it is a Flatpak of "
                "its own (flatpak uninstall org.libretro.RetroArch removes it).")
        if self.in_steam:
            text += "\nThe games in Game Mode no longer start until the core is installed again."
        if self._ask("Remove", text):
            emulator.remove(self.home)
            self.output.appendPlainText("The SameBoy core was removed.")
            self.newer = ""
            upstream.publish("sameboy", [])
            self.refresh()

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

    def retroarch_command(self, *args: str) -> list[str]:
        """RetroArch with the core, through the run wrapper (from the app folder when it is not installed yet)."""
        run = self.run_path if self.run_path.is_file() else ROOT / shortcuts.RUN_NAME
        return [str(run), *args]

    def on_play(self) -> None:
        game = self.chosen()
        if game is None or not self.ready:
            return
        command = self.retroarch_command(str(game.file))
        if QProcess.startDetached(command[0], command[1:], str(game.folder))[0]:
            self.running.setText(f"Started {game.title}.")
        else:
            self.running.setText(f"{game.title} could not be started: {command[0]} did not run.")

    def on_open_retroarch(self) -> None:
        command = self.retroarch_command()
        if not QProcess.startDetached(command[0], command[1:])[0]:
            self.running.setText(f"RetroArch could not be started: {command[0]} did not run.")

    def on_update_steam(self) -> None:
        if self.steam_dir is None:
            return
        if not self.run_path.is_file():
            self.running.setText(f"The shortcuts run {self.run_path}, which is not there: install "
                                 f"{APP_NAME} through the portal first.")
            return
        add, remove = self.steam_plan()
        if add and not self.ready:
            self.running.setText("Install RetroArch and the core first: the games in Game Mode start them.")
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
