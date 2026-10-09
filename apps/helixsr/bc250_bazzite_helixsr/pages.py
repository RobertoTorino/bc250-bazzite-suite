# SPDX-License-Identifier: GPL-3.0-or-later
"""Pages of the main window: Overview (payload and deployments), Deploy (a game's FSR DLL or an OptiScaler
folder) and the helixsr.ini editor. Pages only show and ask; the main window does the file work."""

from __future__ import annotations

from pathlib import Path

from PyQt6.QtCore import Qt, pyqtSignal
from PyQt6.QtGui import QColor
from PyQt6.QtWidgets import (
    QAbstractItemView, QButtonGroup, QCheckBox, QComboBox, QDoubleSpinBox, QFormLayout, QGroupBox, QHBoxLayout,
    QHeaderView, QLabel, QLineEdit, QPushButton, QRadioButton, QTableWidget, QTableWidgetItem, QVBoxLayout,
    QWidget,
)

from . import plain_tooltip
from .backend import (
    HELIXSR_DLL, INI, KERNELS, MODE_FOLDER, MODE_REPLACE, NETWORKS, SECOND_UPSCALER_DLL, SHARPENING_MODES, WEIGHTS,
    Deployment,
    GameDll, HelixIni, PayloadStatus, deployment_state, optiscaler_snippet, render_ini, validate_ini,
)
from .widgets import STATE_COLORS, StatusPill, Terminal, accent_button, hint_label, page_header

POLL_MS = 5000


def _item(text: str, tooltip: str = "") -> QTableWidgetItem:
    item = QTableWidgetItem(text)
    item.setToolTip(plain_tooltip(tooltip or text))
    return item


def _table(headers: list[str]) -> QTableWidget:
    table = QTableWidget(0, len(headers))
    table.setHorizontalHeaderLabels(headers)
    table.verticalHeader().setVisible(False)
    table.setEditTriggers(QAbstractItemView.EditTrigger.NoEditTriggers)
    table.setSelectionBehavior(QAbstractItemView.SelectionBehavior.SelectRows)
    table.setSelectionMode(QAbstractItemView.SelectionMode.SingleSelection)
    table.horizontalHeader().setSectionResizeMode(QHeaderView.ResizeMode.ResizeToContents)
    table.horizontalHeader().setStretchLastSection(True)
    return table


# ============================================================================================ Overview
class OverviewPage(QWidget):
    import_folder_requested = pyqtSignal()
    import_zip_requested = pyqtSignal()
    open_payload_requested = pyqtSignal()
    refresh_requested = pyqtSignal()
    open_folder_requested = pyqtSignal(object)      # Path
    remove_requested = pyqtSignal(object)           # Deployment
    forget_requested = pyqtSignal(object)           # Deployment
    setup_requested = pyqtSignal()                  # go to the Setup page

    def __init__(self, payload_dir: Path, parent: QWidget | None = None):
        super().__init__(parent)
        self.deployments: list[Deployment] = []
        layout = QVBoxLayout(self)
        header, _ = page_header(self.tr("Overview"))
        refresh = QPushButton(self.tr("Refresh"))
        refresh.clicked.connect(self.refresh_requested)
        header.addWidget(refresh)
        layout.addLayout(header)

        payload_box = QGroupBox(self.tr("HelixSR payload"))
        payload_layout = QVBoxLayout(payload_box)
        pills = QHBoxLayout()
        self.pills: dict[str, StatusPill] = {}
        for key, caption in ((HELIXSR_DLL, self.tr("Upscaler DLL")), (WEIGHTS, self.tr("Weights")),
                             (KERNELS, self.tr("Kernels")), (INI, self.tr("helixsr.ini"))):
            column = QVBoxLayout()
            column.setSpacing(2)
            label = QLabel(caption)
            label.setAlignment(Qt.AlignmentFlag.AlignCenter)
            label.setStyleSheet("font-weight:600;")
            column.addWidget(label)
            pill = StatusPill("—")
            self.pills[key] = pill
            column.addWidget(pill)
            pills.addLayout(column)
        pills.addStretch(1)
        payload_layout.addLayout(pills)
        self.payload_info = QLabel()
        self.payload_info.setWordWrap(True)
        self.payload_info.setTextInteractionFlags(Qt.TextInteractionFlag.TextSelectableByMouse)
        payload_layout.addWidget(self.payload_info)
        self.update_hint = QLabel()
        self.update_hint.setWordWrap(True)
        self.update_hint.setOpenExternalLinks(True)
        self.update_hint.setVisible(False)
        payload_layout.addWidget(self.update_hint)
        payload_layout.addWidget(hint_label(self.tr(
            "The Setup page downloads a HelixSR release and builds its network files "
            "(<code>{weights}</code>, <code>{kernels}</code>) from NVIDIA's DLSS DLL for you. Or do it by hand: "
            "extract the release, run its <code>helixsr-setup.sh</code> there once and import that folder here. The "
            "network files are NVIDIA's property: they stay on this PC and are never part of this app.").format(
                weights=WEIGHTS, kernels=KERNELS)))
        buttons = QHBoxLayout()
        self.setup = accent_button(self.tr("Get HelixSR…"), self.tr("Open the Setup page: download the latest release and build the "
                                   "network files in one go."))
        self.setup.clicked.connect(self.setup_requested)
        buttons.addWidget(self.setup)
        self.import_folder = QPushButton(self.tr("Import release folder…"))
        self.import_folder.setToolTip(self.tr("The folder the HelixSR zip was extracted to, after running helixsr-setup.sh "
                                      "there."))
        self.import_folder.clicked.connect(self.import_folder_requested)
        buttons.addWidget(self.import_folder)
        import_zip = QPushButton(self.tr("Import release zip…"))
        import_zip.setToolTip(self.tr("The release zip as downloaded; the network files still have to be built and imported "
                              "from the extracted folder afterwards."))
        import_zip.clicked.connect(self.import_zip_requested)
        buttons.addWidget(import_zip)
        open_payload = QPushButton(self.tr("Open payload folder"))
        open_payload.clicked.connect(self.open_payload_requested)
        buttons.addWidget(open_payload)
        buttons.addStretch(1)
        payload_layout.addLayout(buttons)
        layout.addWidget(payload_box)

        dep_box = QGroupBox(self.tr("Deployments"))
        dep_layout = QVBoxLayout(dep_box)
        self.table = _table([self.tr("Game"), self.tr("Mode"), self.tr("State"), self.tr("HelixSR"),
                             self.tr("Deployed"), self.tr("Location")])
        self.table.itemSelectionChanged.connect(self._selection_changed)
        dep_layout.addWidget(self.table, 1)
        self.empty = QLabel(self.tr("Nothing deployed yet. Use the Deploy page."))
        dep_layout.addWidget(self.empty)
        row = QHBoxLayout()
        self.open_folder = QPushButton(self.tr("Open folder"))
        self.open_folder.clicked.connect(lambda: self._emit(self.open_folder_requested, folder=True))
        row.addWidget(self.open_folder)
        self.forget = QPushButton(self.tr("Forget entry"))
        self.forget.setToolTip(self.tr("Drop the entry from this list without touching the game. For deployments whose "
                               "files are already gone."))
        self.forget.clicked.connect(lambda: self._emit(self.forget_requested))
        row.addWidget(self.forget)
        row.addStretch(1)
        self.remove = QPushButton(self.tr("Remove HelixSR from game"))
        self.remove.setToolTip(self.tr("Delete HelixSR's files there and put the game's original DLL back."))
        self.remove.clicked.connect(lambda: self._emit(self.remove_requested))
        row.addWidget(self.remove)
        dep_layout.addLayout(row)
        layout.addWidget(dep_box, 1)
        self._selection_changed()

    def show_update(self, text: str, kind: str) -> None:
        """A line under the payload status when a newer HelixSR release exists (or the check failed)."""
        colour = STATE_COLORS.get(kind, STATE_COLORS["neutral"])
        self.update_hint.setText(f"<span style='color:{colour}; font-weight:600;'>{text}</span>" if text else "")
        self.update_hint.setVisible(bool(text))

    def show_payload(self, status: PayloadStatus) -> None:
        for key, have in ((HELIXSR_DLL, status.dll), (WEIGHTS, status.weights), (KERNELS, status.kernels)):
            self.pills[key].set_status(self.tr("Present") if have else self.tr("Missing"), "ok" if have else "bad",
                                       plain_tooltip(str(status.path / key)))
        self.pills[INI].set_status(self.tr("Present") if status.ini else self.tr("Default"), "ok" if status.ini else "neutral",
                                   plain_tooltip(str(status.path / INI)) if status.ini else
                                   self.tr("No helixsr.ini in the payload: HelixSR's defaults are used as the template."))
        version = (f"HelixSR {status.version}" if status.version
                   else self.tr("HelixSR (version unknown)"))
        if status.ready:
            text = self.tr("{version} ready to deploy.").format(version=version)
        elif status.dll:
            text = self.tr("{version} imported, but the network files are missing: run helixsr-setup.sh in the extracted "
                           "release and import the folder again.").format(version=version)
        else:
            text = self.tr("No payload yet: import an extracted HelixSR release.")
        self.payload_info.setText(text + "\n" + self.tr("Folder: {0}").format(status.path))

    def show_deployments(self, deployments: list[Deployment], payload_dir: Path) -> None:
        selected = self.selected()
        self.deployments = deployments
        self.table.setRowCount(len(deployments))
        for row, dep in enumerate(deployments):
            kind, state = deployment_state(dep, payload_dir)
            mode = self.tr("Replaced DLL") if dep.mode == MODE_REPLACE else self.tr("OptiScaler folder")
            when = dep.deployed_at.replace("T", " ") if dep.deployed_at else "—"
            self.table.setItem(row, 0, _item(dep.game))
            self.table.setItem(row, 1, _item(mode))
            self.table.setItem(row, 2, _item(state))
            self.table.setItem(row, 3, _item(dep.helixsr_version or "—"))
            self.table.setItem(row, 4, _item(when))
            self.table.setItem(row, 5, _item(dep.path))
            self.table.item(row, 2).setForeground(QColor("white"))
            self.table.item(row, 2).setBackground(QColor(STATE_COLORS[kind]))
            if selected is not None and dep.path == selected.path:
                self.table.selectRow(row)
        self.table.setVisible(bool(deployments))
        self.empty.setVisible(not deployments)
        self._selection_changed()

    def selected(self) -> Deployment | None:
        rows = {index.row() for index in self.table.selectedIndexes()}
        if len(rows) != 1:
            return None
        row = rows.pop()
        return self.deployments[row] if 0 <= row < len(self.deployments) else None

    def _selection_changed(self) -> None:
        dep = self.selected()
        for button in (self.open_folder, self.forget, self.remove):
            button.setEnabled(dep is not None)

    def _emit(self, signal, folder: bool = False) -> None:
        dep = self.selected()
        if dep is not None:
            signal.emit(dep.folder if folder else dep)


# ============================================================================================== Deploy
class DeployPage(QWidget):
    browse_requested = pyqtSignal()
    browse_folder_requested = pyqtSignal()
    browse_second_requested = pyqtSignal()
    scan_requested = pyqtSignal(object)                             # Path of the game folder
    # GameDll | None, mode, folder Path | None, write the ini, second upscaler DLL Path | None
    deploy_requested = pyqtSignal(object, str, object, bool, object)
    remove_requested = pyqtSignal(object, str, object)              # GameDll | None, mode, folder Path | None
    copy_requested = pyqtSignal(str)

    def __init__(self, parent: QWidget | None = None):
        super().__init__(parent)
        self.found: list[GameDll] = []
        self.games: list[Path] = []
        self.payload_ready = False
        layout = QVBoxLayout(self)
        header, _ = page_header(self.tr("Deploy"))
        layout.addLayout(header)

        game_box = QGroupBox(self.tr("Game"))
        game_layout = QVBoxLayout(game_box)
        row = QHBoxLayout()
        row.addWidget(QLabel(self.tr("Steam library:")))
        self.games_combo = QComboBox()
        self.games_combo.setMinimumWidth(260)
        self.games_combo.setToolTip(self.tr("The folders under steamapps/common of every Steam library on this PC."))
        self.games_combo.currentIndexChanged.connect(self._game_picked)
        row.addWidget(self.games_combo, 1)
        browse = QPushButton(self.tr("Browse…"))
        browse.setToolTip(self.tr("Any folder: a game outside Steam, or a Heroic / Lutris / Bottles prefix."))
        browse.clicked.connect(self.browse_requested)
        row.addWidget(browse)
        game_layout.addLayout(row)
        row = QHBoxLayout()
        row.addWidget(QLabel(self.tr("Folder:")))
        self.game_path = QLineEdit()
        self.game_path.setPlaceholderText(self.tr("Pick a game above or browse to its folder"))
        self.game_path.returnPressed.connect(self._scan_clicked)
        row.addWidget(self.game_path, 1)
        self.scan = QPushButton(self.tr("Scan"))
        self.scan.clicked.connect(self._scan_clicked)
        row.addWidget(self.scan)
        game_layout.addLayout(row)
        layout.addWidget(game_box)

        found_box = QGroupBox(self.tr("FSR 3.1 upscaler DLLs in that folder"))
        found_layout = QVBoxLayout(found_box)
        self.table = _table([self.tr("DLL"), self.tr("State"), self.tr("Network files"), self.tr("helixsr.ini"),
                             self.tr("Location")])
        self.table.itemSelectionChanged.connect(self._update_buttons)
        found_layout.addWidget(self.table, 1)
        self.found_info = hint_label(self.tr("Scan a game folder first."))
        found_layout.addWidget(self.found_info)
        layout.addWidget(found_box, 1)

        mode_box = QGroupBox(self.tr("How"))
        mode_layout = QVBoxLayout(mode_box)
        self.mode_group = QButtonGroup(self)
        self.mode_replace = QRadioButton(self.tr("Replace the selected DLL (the game's file is kept as *.original.dll)"))
        self.mode_replace.setChecked(True)
        self.mode_folder = QRadioButton(self.tr("Stand-alone folder for OptiScaler (DLSS / XeSS / FSR 2 games)"))
        self.mode_group.addButton(self.mode_replace)
        self.mode_group.addButton(self.mode_folder)
        self.mode_group.buttonToggled.connect(lambda *_: self._mode_changed())
        mode_layout.addWidget(self.mode_replace)
        mode_layout.addWidget(hint_label(self.tr(
            "The way HelixSR is meant to be installed: the game calls FSR 3.1 and gets HelixSR. Pick the game's "
            "<code>amd_fidelityfx_upscaler_dx12.dll</code> (Unreal: under Engine/Plugins/…/Win64) or "
            "<code>amd_fidelityfx_dx12.dll</code> above, then choose <b>AMD FSR</b> in the game. No launch options.")))
        mode_layout.addWidget(self.mode_folder)
        folder_row = QHBoxLayout()
        folder_row.addSpacing(22)
        folder_row.addWidget(QLabel(self.tr("Folder:")))
        self.folder_path = QLineEdit()
        self.folder_path.setPlaceholderText(self.tr("Defaults to <game>/HelixSR"))
        self.folder_path.textChanged.connect(lambda *_: self._update_snippet())
        folder_row.addWidget(self.folder_path, 1)
        self.browse_folder = QPushButton(self.tr("Browse…"))
        self.browse_folder.clicked.connect(self.browse_folder_requested)
        folder_row.addWidget(self.browse_folder)
        mode_layout.addLayout(folder_row)
        second_row = QHBoxLayout()
        second_row.addSpacing(22)
        self.second_label = QLabel(self.tr("Second upscaler:"))
        second_row.addWidget(self.second_label)
        self.second_path = QLineEdit()
        self.second_path.setPlaceholderText(self.tr("Optional: AMD's amd_fidelityfx_upscaler_dx12.dll, e.g. with FSR 4"))
        self.second_path.setToolTip(self.tr(
            "Copied into the folder as {0}, with UpscalerDll in helixsr.ini pointing at it: OptiScaler's FFX Upscaler "
            "menu then lists its upscalers after HelixSR, and the one you pick runs in that DLL. Empty: HelixSR only."
            ).format(SECOND_UPSCALER_DLL))
        self.second_path.textChanged.connect(lambda *_: self._update_buttons())
        second_row.addWidget(self.second_path, 1)
        self.browse_second = QPushButton(self.tr("Browse…"))
        self.browse_second.clicked.connect(self.browse_second_requested)
        second_row.addWidget(self.browse_second)
        mode_layout.addLayout(second_row)
        self.folder_hint = hint_label(self.tr(
            "Install OptiScaler for the game as its documentation describes, then point its OptiScaler.ini at this "
            "folder with the lines below (Copy puts them on the clipboard)."))
        mode_layout.addWidget(self.folder_hint)
        self.snippet = Terminal()
        self.snippet.setMaximumHeight(110)
        mode_layout.addWidget(self.snippet)
        snippet_row = QHBoxLayout()
        snippet_row.addStretch(1)
        self.copy_snippet = QPushButton(self.tr("Copy OptiScaler.ini lines"))
        self.copy_snippet.clicked.connect(lambda: self.copy_requested.emit(self.snippet.toPlainText()))
        snippet_row.addWidget(self.copy_snippet)
        mode_layout.addLayout(snippet_row)
        layout.addWidget(mode_box)

        actions = QHBoxLayout()
        self.write_ini = QCheckBox(self.tr("Write helixsr.ini with the values of the helixsr.ini page"))
        self.write_ini.setChecked(True)
        self.write_ini.setToolTip(self.tr("Unticked: the payload's helixsr.ini is copied if it has one, else none is written "
                                  "and HelixSR uses its defaults."))
        actions.addWidget(self.write_ini)
        actions.addStretch(1)
        self.remove = QPushButton(self.tr("Remove HelixSR"))
        self.remove.setToolTip(self.tr("Delete HelixSR's files and put the game's original DLL back."))
        self.remove.clicked.connect(self._remove_clicked)
        actions.addWidget(self.remove)
        self.deploy = accent_button(self.tr("Deploy HelixSR"), self.tr("Copy HelixSR into the game as chosen above."))
        self.deploy.clicked.connect(self._deploy_clicked)
        actions.addWidget(self.deploy)
        layout.addLayout(actions)
        self._mode_changed()

    # ---------------------------------------------------------------- data in
    def set_games(self, games: list[Path]) -> None:
        current = self.games_combo.currentData()
        self.games = games
        self.games_combo.blockSignals(True)
        self.games_combo.clear()
        self.games_combo.addItem(self.tr("— pick a game —") if games else self.tr("— no Steam library found —"), None)
        for game in games:
            self.games_combo.addItem(game.name, game)
            self.games_combo.setItemData(self.games_combo.count() - 1, plain_tooltip(str(game)),
                                         Qt.ItemDataRole.ToolTipRole)
        if current is not None:
            self.games_combo.setCurrentIndex(self._game_index(current))
        self.games_combo.blockSignals(False)

    def _game_index(self, path: Path) -> int:
        """Combo index of *path* (0 = the placeholder). findData() compares Python objects by identity."""
        for index in range(1, self.games_combo.count()):
            if self.games_combo.itemData(index) == path:
                return index
        return 0

    def set_game_path(self, path: Path) -> None:
        self.game_path.setText(str(path))
        self.games_combo.blockSignals(True)
        self.games_combo.setCurrentIndex(self._game_index(path))
        self.games_combo.blockSignals(False)
        if not self.folder_path.text() or self.folder_path.property("auto"):
            self.folder_path.setText(str(path / "HelixSR"))
            self.folder_path.setProperty("auto", True)
        self.scan_requested.emit(path)

    def set_folder_path(self, path: Path) -> None:
        self.folder_path.setProperty("auto", False)
        self.folder_path.setText(str(path))

    def set_payload_ready(self, ready: bool) -> None:
        self.payload_ready = ready
        self._update_buttons()

    def show_found(self, found: list[GameDll], game_dir: Path, error: str = "") -> None:
        self.found = found
        self.table.setRowCount(len(found))
        for row, info in enumerate(found):
            try:
                where = str(info.path.parent.relative_to(game_dir)) or "."
            except ValueError:
                where = str(info.path.parent)
            self.table.setItem(row, 0, _item(info.path.name))
            self.table.setItem(row, 1, _item(info.state))
            self.table.setItem(row, 2, _item("Yes" if info.network_files else "No"))
            self.table.setItem(row, 3, _item("Yes" if info.ini else "No"))
            self.table.setItem(row, 4, _item(where, str(info.path)))
        if error:
            self.found_info.setText(error)
        elif not found:
            self.found_info.setText(self.tr("No FSR 3.1 upscaler DLL in this folder. The game may not ship FSR 3.1 as a "
                                    "separate DLL: use the OptiScaler folder below, or check the game's folder."))
        else:
            self.found_info.setText(self.tr("{0} DLL(s) found; select the one the game loads (usually the only one, "
                                         "or the shallowest).").format(len(found)))
            self.table.selectRow(0)
        self._update_buttons()

    # ---------------------------------------------------------------- state
    def selected(self) -> GameDll | None:
        rows = {index.row() for index in self.table.selectedIndexes()}
        if len(rows) != 1:
            return None
        row = rows.pop()
        return self.found[row] if 0 <= row < len(self.found) else None

    def mode(self) -> str:
        return MODE_FOLDER if self.mode_folder.isChecked() else MODE_REPLACE

    def folder(self) -> Path | None:
        text = self.folder_path.text().strip()
        return Path(text).expanduser() if text else None

    def second_upscaler(self) -> Path | None:
        text = self.second_path.text().strip()
        return Path(text).expanduser() if text else None

    def set_second_upscaler(self, path: Path) -> None:
        self.second_path.setText(str(path))

    def game_dir(self) -> Path | None:
        text = self.game_path.text().strip()
        return Path(text).expanduser() if text else None

    def _game_picked(self, index: int) -> None:
        game = self.games_combo.itemData(index)
        if isinstance(game, Path):
            self.set_game_path(game)

    def _scan_clicked(self) -> None:
        game = self.game_dir()
        if game is not None:
            self.set_game_path(game)

    def _mode_changed(self) -> None:
        folder = self.mode() == MODE_FOLDER
        for widget in (self.folder_path, self.browse_folder, self.folder_hint, self.snippet, self.copy_snippet,
                       self.second_label, self.second_path, self.browse_second):
            widget.setVisible(folder)
        self._update_snippet()
        self._update_buttons()

    def _update_snippet(self) -> None:
        folder = self.folder()
        self.snippet.set_text(optiscaler_snippet(folder) if folder else "")

    def _update_buttons(self) -> None:
        info = self.selected()
        if self.mode() == MODE_FOLDER:
            folder = self.folder()
            self.deploy.setEnabled(self.payload_ready and folder is not None)
            self.remove.setEnabled(folder is not None and (folder / HELIXSR_DLL).is_file())
            self.deploy.setToolTip(self.tr("Import a complete payload first.") if not self.payload_ready else
                                   self.tr("Write HelixSR under both FidelityFX names into the folder."))
        else:
            self.deploy.setEnabled(self.payload_ready and info is not None)
            self.remove.setEnabled(info is not None and info.deployed)
            self.deploy.setToolTip(self.tr("Import a complete payload first.") if not self.payload_ready else
                                   self.tr("Select a DLL in the list.") if info is None else
                                   self.tr("Replace {0} with HelixSR.").format(info.path.name))

    def _deploy_clicked(self) -> None:
        second = self.second_upscaler() if self.mode() == MODE_FOLDER else None
        self.deploy_requested.emit(self.selected(), self.mode(), self.folder(), self.write_ini.isChecked(), second)

    def _remove_clicked(self) -> None:
        self.remove_requested.emit(self.selected(), self.mode(), self.folder())


# ========================================================================================= helixsr.ini
class IniPage(QWidget):
    save_default_requested = pyqtSignal(str)            # rendered text -> payload/helixsr.ini
    apply_requested = pyqtSignal(object, str)           # Deployment, rendered text

    def __init__(self, parent: QWidget | None = None):
        super().__init__(parent)
        self.template = ""
        self.deployments: list[Deployment] = []
        layout = QVBoxLayout(self)
        header, _ = page_header(self.tr("helixsr.ini"))
        defaults = QPushButton(self.tr("HelixSR defaults"))
        defaults.setToolTip(self.tr("Reset every field to the value HelixSR uses when the key is missing."))
        defaults.clicked.connect(lambda: self.show_values(HelixIni()))
        header.addWidget(defaults)
        layout.addLayout(header)
        layout.addWidget(hint_label(self.tr(
            "Optional settings HelixSR reads from a helixsr.ini next to its DLL; every key has a default. These "
            "values are written on Deploy (when ticked there), can be saved as the payload's default, or pushed to a "
            "game that already has HelixSR.")))

        columns = QHBoxLayout()
        left = QVBoxLayout()
        sharp = QGroupBox("[Sharpening]")
        form = QFormLayout(sharp)
        self.sharpening_mode = QComboBox()
        self.sharpening_mode.addItems(SHARPENING_MODES)
        self.sharpening_mode.setToolTip(self.tr("off: never sharpen (DLSS's network does not). game: the game's FSR sharpness, "
                                        "or Sharpness below if it sends none. override: always Sharpness below."))
        form.addRow("Mode", self.sharpening_mode)
        self.sharpness = self._spin(0, 1, 0.05, 2, self.tr("0 = none, 1 = strongest RCAS (FidelityFX scale)."))
        form.addRow("Sharpness", self.sharpness)
        self.motion_adaptive = QCheckBox(self.tr("Less sharpening on fast-moving pixels"))
        form.addRow("MotionAdaptive", self.motion_adaptive)
        self.motion_threshold = self._spin(0, 100, 1, 1, self.tr("Motion in output pixels per frame where the reduction starts."))
        form.addRow("MotionThreshold", self.motion_threshold)
        self.motion_limit = self._spin(0, 200, 1, 1, self.tr("Motion where the reduction is complete."))
        form.addRow("MotionLimit", self.motion_limit)
        self.motion_reduction = self._spin(0, 1, 0.05, 2, self.tr("Fraction of sharpening removed at and above MotionLimit."))
        form.addRow("MotionReduction", self.motion_reduction)
        left.addWidget(sharp)
        log = QGroupBox("[Log]")
        form = QFormLayout(log)
        self.log_enabled = QCheckBox(self.tr("Write helixsr.log next to the DLL"))
        form.addRow("Enabled", self.log_enabled)
        left.addWidget(log)
        left.addStretch(1)
        columns.addLayout(left, 1)

        right = QVBoxLayout()
        model = QGroupBox("[ModelE]")
        form = QFormLayout(model)
        self.model_e_enabled = QCheckBox(self.tr("Run the Model E network"))
        self.model_e_enabled.setToolTip(self.tr("Off, or while the network files are missing, a placeholder upscale is used."))
        form.addRow("Enabled", self.model_e_enabled)
        self.network = QComboBox()
        self.network.addItems(NETWORKS)
        self.network.setToolTip(self.tr("auto: the main network at every scale ratio (faster than the Ultra Performance "
                                "network on GPUs without matrix cores). nvidia: as DLSS selects it. Or force one."))
        form.addRow("Network", self.network)
        self.invert_jitter = QCheckBox(self.tr("Jitter comes out mirrored"))
        form.addRow("InvertJitter", self.invert_jitter)
        self.invert_motion_vectors = QCheckBox(self.tr("Motion vectors come out mirrored"))
        form.addRow("InvertMotionVectors", self.invert_motion_vectors)
        self.motion_vector_front_end = QCheckBox(self.tr("Convert render-resolution motion vectors first"))
        self.motion_vector_front_end.setToolTip(self.tr("Used anyway when the game's vectors include the jitter; otherwise "
                                                "NVIDIA's render-resolution path is faster."))
        form.addRow("MotionVectorFrontEnd", self.motion_vector_front_end)
        right.addWidget(model)
        forward = QGroupBox("[Forwarding]")
        form = QFormLayout(forward)
        self.forwarding_dll = QLineEdit()
        self.forwarding_dll.setPlaceholderText(self.tr("auto: amd_fidelityfx_dx12.original.dll, else …framegeneration_dx12.dll"))
        self.forwarding_dll.setToolTip(self.tr("DLL that serves FidelityFX effects other than upscaling (frame generation)."))
        form.addRow("Dll", self.forwarding_dll)
        self.upscaler_dll = QLineEdit()
        self.upscaler_dll.setPlaceholderText(self.tr("empty: HelixSR only"))
        self.upscaler_dll.setToolTip(self.tr("A second FidelityFX upscaler DLL (e.g. AMD's with FSR 4) listed after HelixSR in "
                                     "OptiScaler's menu. A bare name is looked up next to HelixSR."))
        form.addRow("UpscalerDll", self.upscaler_dll)
        right.addWidget(forward)
        right.addStretch(1)
        columns.addLayout(right, 1)
        layout.addLayout(columns)

        self.problems = QLabel()
        self.problems.setWordWrap(True)
        self.problems.setStyleSheet("color:#c62828; font-weight:600;")
        layout.addWidget(self.problems)

        preview_box = QGroupBox(self.tr("Resulting file"))
        preview_layout = QVBoxLayout(preview_box)
        self.preview = Terminal()
        preview_layout.addWidget(self.preview)
        layout.addWidget(preview_box, 1)

        actions = QHBoxLayout()
        self.save_default = QPushButton(self.tr("Save as payload default"))
        self.save_default.setToolTip(self.tr("Write this file into the payload folder: it is what Deploy copies when the "
                                     "helixsr.ini tick box there is off, and what this page starts from."))
        self.save_default.clicked.connect(lambda: self.save_default_requested.emit(self.text()))
        actions.addWidget(self.save_default)
        actions.addStretch(1)
        actions.addWidget(QLabel(self.tr("Push to:")))
        self.targets = QComboBox()
        self.targets.setMinimumWidth(220)
        actions.addWidget(self.targets)
        self.apply = accent_button(self.tr("Write to game"), self.tr("Overwrite the helixsr.ini of that deployment with this file."))
        self.apply.clicked.connect(self._apply_clicked)
        actions.addWidget(self.apply)
        layout.addLayout(actions)

        for widget in (self.sharpening_mode, self.network):
            widget.currentIndexChanged.connect(self._changed)
        for widget in (self.sharpness, self.motion_threshold, self.motion_limit, self.motion_reduction):
            widget.valueChanged.connect(self._changed)
        for widget in (self.motion_adaptive, self.log_enabled, self.model_e_enabled, self.invert_jitter,
                       self.invert_motion_vectors, self.motion_vector_front_end):
            widget.toggled.connect(self._changed)
        for widget in (self.forwarding_dll, self.upscaler_dll):
            widget.textChanged.connect(self._changed)
        self.set_deployments([])
        self._changed()

    @staticmethod
    def _spin(low: float, high: float, step: float, decimals: int, tooltip: str) -> QDoubleSpinBox:
        spin = QDoubleSpinBox()
        spin.setRange(low, high)
        spin.setSingleStep(step)
        spin.setDecimals(decimals)
        spin.setToolTip(tooltip)
        return spin

    # ---------------------------------------------------------------- values
    def load(self, settings: HelixIni, template: str) -> None:
        self.template = template
        self.show_values(settings)

    def show_values(self, s: HelixIni) -> None:
        widgets = (self.sharpening_mode, self.network, self.sharpness, self.motion_threshold, self.motion_limit,
                   self.motion_reduction, self.motion_adaptive, self.log_enabled, self.model_e_enabled,
                   self.invert_jitter, self.invert_motion_vectors, self.motion_vector_front_end,
                   self.forwarding_dll, self.upscaler_dll)
        for widget in widgets:
            widget.blockSignals(True)
        self.sharpening_mode.setCurrentText(s.sharpening_mode if s.sharpening_mode in SHARPENING_MODES else "off")
        self.network.setCurrentText(s.network if s.network in NETWORKS else "auto")
        self.sharpness.setValue(s.sharpness)
        self.motion_threshold.setValue(s.motion_threshold)
        self.motion_limit.setValue(s.motion_limit)
        self.motion_reduction.setValue(s.motion_reduction)
        self.motion_adaptive.setChecked(s.motion_adaptive)
        self.log_enabled.setChecked(s.log_enabled)
        self.model_e_enabled.setChecked(s.model_e_enabled)
        self.invert_jitter.setChecked(s.invert_jitter)
        self.invert_motion_vectors.setChecked(s.invert_motion_vectors)
        self.motion_vector_front_end.setChecked(s.motion_vector_front_end)
        self.forwarding_dll.setText(s.forwarding_dll)
        self.upscaler_dll.setText(s.upscaler_dll)
        for widget in widgets:
            widget.blockSignals(False)
        self._changed()

    def settings(self) -> HelixIni:
        return HelixIni(
            sharpening_mode=self.sharpening_mode.currentText(), sharpness=self.sharpness.value(),
            motion_adaptive=self.motion_adaptive.isChecked(), motion_threshold=self.motion_threshold.value(),
            motion_limit=self.motion_limit.value(), motion_reduction=self.motion_reduction.value(),
            model_e_enabled=self.model_e_enabled.isChecked(), network=self.network.currentText(),
            invert_jitter=self.invert_jitter.isChecked(), invert_motion_vectors=self.invert_motion_vectors.isChecked(),
            motion_vector_front_end=self.motion_vector_front_end.isChecked(), log_enabled=self.log_enabled.isChecked(),
            forwarding_dll=self.forwarding_dll.text().strip(), upscaler_dll=self.upscaler_dll.text().strip())

    def text(self) -> str:
        return render_ini(self.settings(), self.template)

    def valid(self) -> bool:
        return not validate_ini(self.settings())

    def set_deployments(self, deployments: list[Deployment]) -> None:
        current = self.targets.currentData()
        self.deployments = deployments
        self.targets.blockSignals(True)
        self.targets.clear()
        for dep in deployments:
            self.targets.addItem(dep.game, dep.path)
            self.targets.setItemData(self.targets.count() - 1, plain_tooltip(dep.path), Qt.ItemDataRole.ToolTipRole)
        if current is not None:
            self.targets.setCurrentIndex(max(self.targets.findData(current), 0))
        self.targets.blockSignals(False)
        self.targets.setEnabled(bool(deployments))
        self._changed()

    def _changed(self, *_) -> None:
        problems = validate_ini(self.settings())
        self.problems.setText(chr(10).join(problems))
        self.problems.setVisible(bool(problems))
        self.preview.set_text(self.text())
        self.save_default.setEnabled(not problems)
        self.apply.setEnabled(not problems and bool(self.deployments))

    def _apply_clicked(self) -> None:
        path = self.targets.currentData()
        dep = next((d for d in self.deployments if d.path == path), None)
        if dep is not None:
            self.apply_requested.emit(dep, self.text())
