# SPDX-License-Identifier: GPL-3.0-or-later
"""The main window: the folder or ISO to work on, the naming template, the table of games with their current and
new file names, the details of the selected game (icon, ID, title, translation, version, firmware), launching a
game in PPSSPP, and Rename All. Port of ``qt/src/mainwindow.cpp``."""

from __future__ import annotations

import shutil
import subprocess
import sys
from pathlib import Path
from typing import Optional

from PyQt6.QtCore import QEvent, QObject, QPoint, QTimer, QUrl, Qt
from PyQt6.QtGui import QDesktopServices, QIcon, QPixmap
from PyQt6.QtWidgets import (QApplication, QComboBox, QFileDialog, QFormLayout, QFrame, QGroupBox, QHBoxLayout,
                             QHeaderView, QLabel, QLineEdit, QMainWindow, QMenu, QMessageBox, QPushButton,
                             QSizePolicy, QSplitter, QStyle, QTableWidget, QTableWidgetItem, QToolButton,
                             QVBoxLayout, QWidget)

from bc250_core.settings import open_settings
from bc250_core.widgets import AppHeader

from . import APP_NAME, INFO, LOGO_PATH, __version__
from .renamer import NamingTemplate, effective_title, formatted_name, read_umd, rename_file, scan_directory
from .umd import Umd


# Table columns.
COL_ID, COL_TITLE, COL_VERSION, COL_FIRMWARE, COL_OLD_NAME, COL_NEW_NAME, COL_LAUNCH, COL_COUNT = range(8)

# The images the details panel cycles through when the title is clicked.
PREVIEW_IMAGES = (("icon0", "ICON0.PNG"), ("pic0", "PIC0.PNG"), ("pic1", "PIC1.PNG"))

PPSSPP_FLATPAK = "org.ppsspp.PPSSPP"
PPSSPP_BINARIES = ("PPSSPPSDL", "PPSSPPQt", "ppsspp")


def flatpak_has(app_id: str) -> bool:
    flatpak = shutil.which("flatpak")
    if not flatpak:
        return False
    try:
        return subprocess.run([flatpak, "info", app_id], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL,
                              timeout=10).returncode == 0
    except (OSError, subprocess.SubprocessError):
        return False


def find_ppsspp(configured: str = "") -> Optional[list[str]]:
    """The command that starts PPSSPP, without the game: the path from the settings when it exists, else the
    Flatpak (org.ppsspp.PPSSPP), else a PPSSPP binary on the PATH. None when there is none."""
    if configured and Path(configured).is_file():
        return [configured]
    if flatpak_has(PPSSPP_FLATPAK):
        return ["flatpak", "run", PPSSPP_FLATPAK]
    for name in PPSSPP_BINARIES:
        found = shutil.which(name)
        if found:
            return [found]
    return None


def load_pixmap(data: bytes) -> QPixmap:
    pixmap = QPixmap()
    if data:
        pixmap.loadFromData(data)
    return pixmap


class MainWindow(QMainWindow):
    def __init__(self, initial_path: Optional[str] = None) -> None:
        super().__init__()
        self.setWindowTitle(f"{APP_NAME} {__version__}")
        self.resize(1100, 760)
        self.setMinimumSize(900, 600)
        if LOGO_PATH.is_file():
            self.setWindowIcon(QIcon(str(LOGO_PATH)))

        self._current_folder = ""
        self._ppsspp_path = ""
        self._umds: list[Umd] = []
        self._selected_row = -1
        self._preview_icon_index = 0

        # ~/.config/bazzite-umd-file-renamer/bazzite-umd-file-renamer.ini: the naming template, the PPSSPP path
        # and the last folder.
        self._settings = open_settings(INFO)

        self._build_ui()
        self._load_settings()
        QApplication.instance().aboutToQuit.connect(self._save_settings)

        if initial_path:
            QTimer.singleShot(0, lambda: self.load_path(initial_path))

    # -- UI construction ------------------------------------------------------

    def _build_ui(self) -> None:
        central = QWidget()
        central.setObjectName("centralRoot")
        self.setCentralWidget(central)
        root = QVBoxLayout(central)
        root.setContentsMargins(8, 8, 8, 8)
        root.setSpacing(6)

        # The first line, as in every suite app: the logo, the title with the version, and below it the app's main
        # control, the source row.
        header = AppHeader(LOGO_PATH, APP_NAME, __version__)

        # Source row: the folder or ISO, the naming template, Open Folder, Open ISO, settings.
        top_panel = QWidget()
        top_panel.setObjectName("topPanel")
        top_bar = QHBoxLayout(top_panel)
        top_bar.setContentsMargins(8, 6, 8, 6)
        top_bar.addWidget(QLabel("Source:"))
        self.source_label = QLabel("(none)")
        self.source_label.setFrameStyle(QFrame.Shape.StyledPanel | QFrame.Shadow.Sunken)
        self.source_label.setSizePolicy(QSizePolicy.Policy.Expanding, QSizePolicy.Policy.Preferred)
        top_bar.addWidget(self.source_label, 1)

        top_bar.addWidget(QLabel("Naming:"))
        self.template_combo = QComboBox()
        for template in NamingTemplate:
            self.template_combo.addItem(template.value)
        self.template_combo.currentIndexChanged.connect(self.on_naming_template_changed)
        top_bar.addWidget(self.template_combo)

        self.open_btn = QPushButton("Open Folder...")
        self.open_btn.clicked.connect(self.on_open_folder)
        top_bar.addWidget(self.open_btn)
        self.open_file_btn = QPushButton("Open ISO...")
        self.open_file_btn.clicked.connect(self.on_open_file)
        top_bar.addWidget(self.open_file_btn)

        self.settings_btn = QToolButton()
        self.settings_btn.setText("⚙")
        self.settings_btn.setToolTip("Settings")
        self.settings_btn.setAutoRaise(True)
        self.settings_menu = QMenu(self)
        self.settings_menu.addAction("Set PPSSPP Path...", self.on_set_ppsspp_path)
        self.settings_btn.clicked.connect(lambda: self.settings_menu.exec(
            self.settings_btn.mapToGlobal(QPoint(0, self.settings_btn.height()))))
        top_bar.addWidget(self.settings_btn)
        header.add_second(top_panel, 1)
        root.addLayout(header)

        splitter = QSplitter(Qt.Orientation.Vertical)
        root.addWidget(splitter, 1)

        # The game list.
        self.table = QTableWidget(0, COL_COUNT)
        self.table.setHorizontalHeaderLabels(["ID", "Title", "Version", "Firmware", "Current filename",
                                              "New filename", "Launch Game"])
        hdr = self.table.horizontalHeader()
        hdr.setStretchLastSection(False)
        hdr.setSectionResizeMode(COL_TITLE, QHeaderView.ResizeMode.Stretch)
        hdr.setSectionResizeMode(COL_NEW_NAME, QHeaderView.ResizeMode.Stretch)
        hdr.setSectionResizeMode(COL_LAUNCH, QHeaderView.ResizeMode.ResizeToContents)
        hdr.setDefaultAlignment(Qt.AlignmentFlag.AlignCenter)
        hdr.setSortIndicatorShown(False)
        self.table.setObjectName("gamesTable")
        self.table.setSelectionBehavior(QTableWidget.SelectionBehavior.SelectRows)
        self.table.setSelectionMode(QTableWidget.SelectionMode.SingleSelection)
        self.table.setEditTriggers(QTableWidget.EditTrigger.NoEditTriggers)
        self.table.setAlternatingRowColors(True)
        self.table.setSortingEnabled(True)
        self.table.verticalHeader().setVisible(False)
        self.table.setStyleSheet("QTableView::item { padding-left: 8px; padding-right: 8px; }")
        self.table.itemSelectionChanged.connect(self.on_selection_changed)
        splitter.addWidget(self.table)

        # The details of the selected game.
        detail_box = QGroupBox("Game details")
        detail_layout = QHBoxLayout(detail_box)

        icon_panel = QWidget()
        icon_layout = QVBoxLayout(icon_panel)
        icon_layout.setContentsMargins(0, 0, 0, 0)
        icon_layout.setSpacing(4)
        self.icon_label = QLabel()
        self.icon_label.setFixedSize(288, 160)
        self.icon_label.setFrameStyle(QFrame.Shape.Box | QFrame.Shadow.Sunken)
        self.icon_label.setAlignment(Qt.AlignmentFlag.AlignCenter)
        self.icon_label.setCursor(Qt.CursorShape.PointingHandCursor)
        self.icon_label.setToolTip("Click to cycle through ICON0, PIC0 and PIC1")
        self.icon_label.installEventFilter(self)
        icon_layout.addWidget(self.icon_label)
        self.icon_caption_label = QLabel("ICON0")
        self.icon_caption_label.setAlignment(Qt.AlignmentFlag.AlignCenter)
        icon_layout.addWidget(self.icon_caption_label)
        detail_layout.addWidget(icon_panel)

        form = QFormLayout()
        self.id_edit = QLineEdit()
        self.id_edit.setReadOnly(True)
        self.title_edit = QLineEdit()
        self.title_edit.setPlaceholderText("Edit the title and press Apply title change")
        self.translate_btn = QPushButton("Translate")
        self.translate_btn.setToolTip("Open Google Translate for the selected title")
        self.translate_btn.setEnabled(False)
        self.translate_btn.clicked.connect(self.on_translate)
        self.translation_edit = QLineEdit()
        self.translation_edit.setPlaceholderText("Type a translation to use it as the title in the new name")
        self.version_edit = QLineEdit()
        self.version_edit.setReadOnly(True)
        self.firmware_edit = QLineEdit()
        self.firmware_edit.setReadOnly(True)
        form.addRow("ID:", self.id_edit)
        title_row = QWidget()
        title_row_layout = QHBoxLayout(title_row)
        title_row_layout.setContentsMargins(0, 0, 0, 0)
        title_row_layout.setSpacing(6)
        title_row_layout.addWidget(self.title_edit, 1)
        title_row_layout.addWidget(self.translate_btn)
        form.addRow("Title:", title_row)
        form.addRow("Translation:", self.translation_edit)
        form.addRow("Version:", self.version_edit)
        form.addRow("Firmware:", self.firmware_edit)
        detail_layout.addLayout(form, 1)

        actions = QVBoxLayout()
        actions.setSpacing(8)
        self.apply_translation_btn = QPushButton("Apply translation")
        self.apply_translation_btn.setEnabled(False)
        self.apply_translation_btn.clicked.connect(self.on_apply_translation)
        actions.addWidget(self.apply_translation_btn)
        self.apply_btn = QPushButton("Apply title change")
        self.apply_btn.setEnabled(False)
        self.apply_btn.clicked.connect(self.on_apply_changes)
        actions.addWidget(self.apply_btn)
        actions.addStretch(1)
        detail_layout.addLayout(actions)

        splitter.addWidget(detail_box)
        splitter.setStretchFactor(0, 3)
        splitter.setStretchFactor(1, 1)

        bottom_bar = QHBoxLayout()
        self.rename_all_btn = QPushButton("Rename All")
        self.rename_all_btn.setEnabled(False)
        self.rename_all_btn.clicked.connect(self.on_rename_all)
        bottom_bar.addStretch(1)
        bottom_bar.addWidget(self.rename_all_btn)
        root.addLayout(bottom_bar)

        self.statusBar().showMessage("Ready")

    # -- settings ---------------------------------------------------------------

    def _load_settings(self) -> None:
        index = int(self._settings.value("ui/namingTemplate", 0) or 0)
        self.template_combo.setCurrentIndex(index if 0 <= index < self.template_combo.count() else 0)
        self._ppsspp_path = str(self._settings.value("emulator/ppssppPath", "") or "")
        self._current_folder = str(self._settings.value("paths/lastFolder", "") or "")

    def _save_settings(self) -> None:
        self._settings.setValue("ui/namingTemplate", self.template_combo.currentIndex())
        self._settings.setValue("emulator/ppssppPath", self._ppsspp_path)
        self._settings.setValue("paths/lastFolder", self._current_folder)
        self._settings.sync()

    def closeEvent(self, event) -> None:  # noqa: N802
        self._save_settings()
        super().closeEvent(event)

    # -- opening ------------------------------------------------------------------

    def on_open_folder(self) -> None:
        folder = QFileDialog.getExistingDirectory(self, "Select folder containing PSP ISO images",
                                                  self._current_folder)
        if folder:
            self.load_folder(folder)

    def on_open_file(self) -> None:
        file_path, _ = QFileDialog.getOpenFileName(self, "Select PSP ISO image", self._current_folder,
                                                   "PSP ISO Images (*.iso *.ISO);;All Files (*)")
        if file_path:
            self.load_single_file(file_path)

    def load_path(self, path: str) -> None:
        """A folder or a .iso, from the command line or a later launch."""
        if Path(path).is_dir():
            self.load_folder(path)
        elif Path(path).is_file():
            self.load_single_file(path)
        else:
            self.statusBar().showMessage(f"Not found: {path}")

    def load_folder(self, path: str) -> None:
        self._current_folder = path
        self.source_label.setText(path)
        self.statusBar().showMessage("Scanning...")
        QApplication.processEvents()
        self._show_umds(scan_directory(path))

    def load_single_file(self, path: str) -> None:
        self._current_folder = str(Path(path).parent)
        self.source_label.setText(path)
        self.statusBar().showMessage("Loading ISO...")
        QApplication.processEvents()
        umd = read_umd(path)
        self._show_umds([umd] if umd is not None else [])

    def _show_umds(self, umds: list[Umd]) -> None:
        self._umds = umds
        self._selected_row = -1
        self._refresh_table()
        self._refresh_detail(-1)
        self.rename_all_btn.setEnabled(bool(self._umds))
        self.apply_btn.setEnabled(False)
        self.statusBar().showMessage(f"{len(self._umds)} game(s) found.")

    # -- the table ------------------------------------------------------------------

    def _refresh_table(self) -> None:
        self.table.setSortingEnabled(False)
        self.table.setRowCount(0)
        self.table.setRowCount(len(self._umds))

        for row, umd in enumerate(self._umds):
            texts = {COL_ID: umd.id, COL_TITLE: effective_title(umd), COL_VERSION: umd.version,
                     COL_FIRMWARE: umd.firmware, COL_OLD_NAME: umd.file_name, COL_NEW_NAME: "", COL_LAUNCH: ""}
            for col, text in texts.items():
                item = QTableWidgetItem(text)
                item.setTextAlignment(Qt.AlignmentFlag.AlignCenter)
                item.setData(Qt.ItemDataRole.UserRole, umd.file_path)
                self.table.setItem(row, col, item)

            play_btn = QPushButton(self.table)
            play_btn.setIcon(self.style().standardIcon(QStyle.StandardPixmap.SP_MediaPlay))
            play_btn.setToolTip("Launch in PPSSPP")
            play_btn.setProperty("isoPath", umd.file_path)
            play_btn.clicked.connect(self.on_launch_game_clicked)
            self.table.setCellWidget(row, COL_LAUNCH, play_btn)

        self._update_preview_names()
        self.table.resizeColumnsToContents()
        self.table.setSortingEnabled(True)

    def _update_preview_names(self) -> None:
        template = self.selected_naming_template()
        sorting = self.table.isSortingEnabled()
        if sorting:
            self.table.setSortingEnabled(False)
        for row in range(self.table.rowCount()):
            item = self.table.item(row, COL_NEW_NAME)
            key_item = self.table.item(row, COL_OLD_NAME)
            if item is None or key_item is None:
                continue
            umd = self._umd_for_path(key_item.data(Qt.ItemDataRole.UserRole))
            if umd is not None:
                item.setText(formatted_name(umd, template) + umd.suffix)
        if sorting:
            self.table.setSortingEnabled(True)

    def _umd_for_path(self, file_path: str) -> Optional[Umd]:
        for umd in self._umds:
            if umd.file_path == file_path:
                return umd
        return None

    def selected_naming_template(self) -> NamingTemplate:
        return NamingTemplate.from_index(self.template_combo.currentIndex())

    def on_naming_template_changed(self, index: int) -> None:
        self._settings.setValue("ui/namingTemplate", index)
        self._update_preview_names()

    def on_selection_changed(self) -> None:
        selected = self.table.selectedItems()
        if not selected:
            self._selected_row = -1
            self._refresh_detail(-1)
            return
        key_item = self.table.item(self.table.row(selected[0]), COL_OLD_NAME)
        if key_item is None:
            return
        file_path = key_item.data(Qt.ItemDataRole.UserRole)
        self._selected_row = next((i for i, umd in enumerate(self._umds) if umd.file_path == file_path), -1)
        self._refresh_detail(self._selected_row)

    # -- the details panel ------------------------------------------------------------

    def _refresh_detail(self, row: int) -> None:
        if row < 0 or row >= len(self._umds):
            self._show_no_icon()
            self._preview_icon_index = 0
            for edit in (self.id_edit, self.title_edit, self.translation_edit, self.version_edit,
                         self.firmware_edit):
                edit.clear()
            self.translate_btn.setEnabled(False)
            self.apply_btn.setEnabled(False)
            self.apply_translation_btn.setEnabled(False)
            return

        umd = self._umds[row]
        self._preview_icon_index = 0
        self._show_selected_preview_icon()
        self.id_edit.setText(umd.id)
        self.title_edit.setText(umd.title)
        self.translate_btn.setEnabled(bool(umd.title.strip()))
        self.translation_edit.setText(umd.translated_title.strip())
        self.version_edit.setText(umd.version)
        self.firmware_edit.setText(umd.firmware)
        self.apply_btn.setEnabled(True)
        self.apply_translation_btn.setEnabled(True)

    def _show_no_icon(self) -> None:
        self.icon_label.clear()
        self.icon_label.setText("No icon")
        self.icon_label.setToolTip("")
        self.icon_caption_label.setText("No icon")

    def _show_selected_preview_icon(self) -> None:
        if self._selected_row < 0 or self._selected_row >= len(self._umds):
            return
        umd = self._umds[self._selected_row]
        attr, icon_name = PREVIEW_IMAGES[self._preview_icon_index % len(PREVIEW_IMAGES)]
        pixmap = load_pixmap(getattr(umd, attr))
        if not pixmap.isNull():
            self.icon_label.setPixmap(pixmap.scaled(self.icon_label.size(), Qt.AspectRatioMode.KeepAspectRatio,
                                                    Qt.TransformationMode.SmoothTransformation))
            self.icon_label.setToolTip(icon_name)
            self.icon_caption_label.setText(icon_name.split(".")[0])
            return
        self._show_no_icon()

    def eventFilter(self, watched: QObject, event: QEvent) -> bool:  # noqa: N802
        # A click on the picture cycles it through ICON0, PIC0 and PIC1.
        if watched is self.icon_label and event.type() == QEvent.Type.MouseButtonPress:
            if 0 <= self._selected_row < len(self._umds):
                umd = self._umds[self._selected_row]
                if umd.icon0 or umd.pic0 or umd.pic1:
                    self._preview_icon_index = (self._preview_icon_index + 1) % len(PREVIEW_IMAGES)
                    self._show_selected_preview_icon()
                    return True
        return super().eventFilter(watched, event)

    def on_translate(self) -> None:
        url = QUrl("https://translate.google.com/?hl=en&sl=ja&tl=en&op=translate")
        title = self.title_edit.text().strip()
        if title:
            url.setQuery(url.query() + "&text=" + bytes(QUrl.toPercentEncoding(title)).decode("ascii"))
        QDesktopServices.openUrl(url)

    def on_apply_changes(self) -> None:
        if not 0 <= self._selected_row < len(self._umds):
            return
        umd = self._umds[self._selected_row]
        umd.title = self.title_edit.text().strip()
        self._refresh_table()
        self._select_path(umd.file_path)

    def on_apply_translation(self) -> None:
        if not 0 <= self._selected_row < len(self._umds):
            return
        umd = self._umds[self._selected_row]
        umd.translated_title = self.translation_edit.text().strip()
        self._refresh_table()
        self._select_path(umd.file_path)

    def _select_path(self, file_path: str) -> None:
        """Rebuilding the table drops the selection; this puts it back on the same game."""
        for row in range(self.table.rowCount()):
            item = self.table.item(row, COL_OLD_NAME)
            if item is not None and item.data(Qt.ItemDataRole.UserRole) == file_path:
                self.table.selectRow(row)
                return

    # -- PPSSPP ------------------------------------------------------------------------

    def on_set_ppsspp_path(self) -> None:
        start = str(Path(self._ppsspp_path).parent) if self._ppsspp_path else self._current_folder
        if sys.platform.startswith("win"):
            filters = "Executable (*.exe);;All Files (*)"
        else:
            filters = "All Files (*);;AppImage (*.AppImage)"
        selected, _ = QFileDialog.getOpenFileName(self, "Select PPSSPP executable", start, filters)
        if not selected:
            return
        self._ppsspp_path = selected
        self._settings.setValue("emulator/ppssppPath", selected)
        self.statusBar().showMessage("PPSSPP path saved.", 2500)

    def on_launch_game_clicked(self) -> None:
        button = self.sender()
        if button is not None:
            self.launch_game(str(button.property("isoPath") or ""))

    def launch_game(self, iso_path: str) -> None:
        if not iso_path:
            return
        command = find_ppsspp(self._ppsspp_path)
        if command is None:
            QMessageBox.information(
                self, "PPSSPP not found",
                "PPSSPP was not found: not in the settings, not as the Flatpak org.ppsspp.PPSSPP and not on the "
                "PATH.\nSet the PPSSPP executable path (Settings -> Set PPSSPP Path...).")
            self.on_set_ppsspp_path()
            command = find_ppsspp(self._ppsspp_path)
            if command is None:
                return
        try:
            subprocess.Popen([*command, "--fullscreen", iso_path], cwd=str(Path(command[0]).parent)
                             if Path(command[0]).is_absolute() else None,
                             stdin=subprocess.DEVNULL, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL,
                             start_new_session=True)
        except OSError as exc:
            QMessageBox.warning(self, "Launch failed", f"Could not launch PPSSPP with the selected game: {exc}")
            return
        self.statusBar().showMessage("Launching game in PPSSPP...", 2500)

    # -- rename ------------------------------------------------------------------------

    def on_rename_all(self) -> None:
        template = self.selected_naming_template()
        selected = self._umds[self._selected_row] if 0 <= self._selected_row < len(self._umds) else None
        renamed = 0
        errors: list[str] = []
        for umd in self._umds:
            new_base = formatted_name(umd, template)
            if rename_file(umd, new_base):
                renamed += 1
            else:
                errors.append(f"  {umd.file_name} -> {new_base}{umd.suffix}")

        if not errors:
            self.statusBar().showMessage(f"{renamed} file(s) renamed successfully.")
        else:
            QMessageBox.warning(self, "Rename errors",
                                f"{renamed} renamed, {len(errors)} failed:\n" + "\n".join(errors))
            self.statusBar().showMessage("Done with errors.")
        self._refresh_table()
        if selected is not None:
            self._select_path(selected.file_path)
