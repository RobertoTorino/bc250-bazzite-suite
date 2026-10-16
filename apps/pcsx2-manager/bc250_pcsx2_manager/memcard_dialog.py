# SPDX-License-Identifier: GPL-3.0-or-later
"""The Memory cards window: PCSX2's cards, the saves on the chosen one with the selected save's 3D icon as a still
picture, and import, export, copy to another card, delete, a new card, format and check (memcards.py on mymc++'s
card code). What mymc++'s own window does, on the folder PCSX2 keeps its cards in. Changes, checks and the
pictures run off the GUI thread; a .max save is packed and unpacked in Python, which takes a moment."""

from __future__ import annotations

import unicodedata
from collections.abc import Callable
from html import escape
from pathlib import Path

from PyQt6.QtCore import Qt
from PyQt6.QtGui import QPixmap
from PyQt6.QtWidgets import (QAbstractItemView, QComboBox, QDialog, QFileDialog, QFormLayout, QHBoxLayout,
                             QHeaderView, QInputDialog, QLabel, QLineEdit, QMessageBox, QPushButton, QTableWidget,
                             QTableWidgetItem, QVBoxLayout)

from bc250_core import window_title
from bc250_core.updates import UpdateChecker
from bc250_core.widgets import hint_label

from . import memcard_icon, memcards, style
from .memcards import Card, CardError, Save

PICTURE = memcard_icon.SIZE
RUNNING = "PCSX2 is running: close it before changing a card, it would write its own copy over the change."
EXPORT_FILTERS = ";;".join(f"{name} (*{suffix})" for suffix, name in memcards.EXPORT_KINDS.items())
IMPORT_FILTER = "PS2 saves (" + " ".join(f"*{s}" for s in memcards.IMPORT_SUFFIXES) + ")"


def shown(title: str) -> str:
    """A title as the window shows it: icon.sys keeps Latin letters full width (Ｒｅｚ), shown as Rez."""
    return unicodedata.normalize("NFKC", title)


class NewCardDialog(QDialog):
    """A name and a size for a new card."""

    def __init__(self, name: str, parent=None):
        super().__init__(parent)
        self.setWindowTitle(window_title("New memory card"))
        self.name_edit = QLineEdit(name)
        self.size_combo = QComboBox()
        for mb in memcards.SIZES_MB:
            self.size_combo.addItem(f"{mb} MB" + (" (the PS2's own card)" if mb == 8 else ""), mb)
        form = QFormLayout()
        form.addRow("Name:", self.name_edit)
        form.addRow("Size:", self.size_combo)
        ok = style.primary_button("Make", "Make the card in PCSX2's memory card folder")
        ok.clicked.connect(self.accept)
        cancel = QPushButton("Cancel")
        cancel.clicked.connect(self.reject)
        buttons = QHBoxLayout()
        buttons.addStretch(1)
        buttons.addWidget(ok)
        buttons.addWidget(cancel)
        lay = QVBoxLayout(self)
        lay.addLayout(form)
        lay.addWidget(hint_label("A name ending in .ps2 is PCSX2's own kind; .mc2 is a card without ECC, as a "
                                 "MemCard PRO2 reads. Cards over 8 MB work in PCSX2 only, and not with every "
                                 "game."))
        lay.addLayout(buttons)
        style.apply(self)

    def values(self) -> tuple[str, int]:
        return self.name_edit.text().strip(), int(self.size_combo.currentData())


class MemcardDialog(QDialog):
    """*folder*: PCSX2's memory card folder; *slots*: {card file: slot} from PCSX2's settings; *running*: whether
    PCSX2 runs (tests pass their own)."""

    def __init__(self, folder: Path, slots: dict[str, int] | None = None,
                 running: Callable[[], bool] = memcards.pcsx2_running, parent=None):
        super().__init__(parent)
        self.setWindowTitle(window_title("Memory cards"))
        self.resize(920, 600)
        self.folder = folder
        self.slots = slots or {}
        self.running = running
        self.cards: list[Card] = []
        self.worker = UpdateChecker(self)               # one change or check at a time
        self.worker.finished.connect(self._job_done)
        self.pictures = UpdateChecker(self)             # the selected save's icon, apart from the changes
        self.pictures.finished.connect(self._picture_done)
        self._picture_cache: dict[tuple[str, str, float], QPixmap | None] = {}
        self._picture_wanted: tuple[str, str, float] | None = None

        self.card_combo = QComboBox()
        self.card_combo.setMinimumWidth(260)
        self.card_combo.currentIndexChanged.connect(self._card_changed)
        self.new_button = QPushButton("New card…")
        self.new_button.setToolTip("Make a new, empty card in PCSX2's memory card folder")
        self.new_button.clicked.connect(self.on_new)
        self.format_button = QPushButton("Format…")
        self.format_button.setToolTip("Empty the card: every save on it goes (its backup keeps them)")
        self.format_button.clicked.connect(self.on_format)
        self.check_button = QPushButton("Check")
        self.check_button.setToolTip("Check the card's file system, and every page against its ECC")
        self.check_button.clicked.connect(self.on_check)
        top = QHBoxLayout()
        label = QLabel("Card:")
        label.setStyleSheet("font-weight:700;")
        top.addWidget(label)
        top.addWidget(self.card_combo, 1)
        top.addWidget(self.new_button)
        top.addWidget(self.format_button)
        top.addWidget(self.check_button)

        self.warning = QLabel()
        self.warning.setWordWrap(True)
        self.warning.setStyleSheet("font-weight:600;color:#c62828;")

        self.table = QTableWidget(0, 4)
        self.table.setHorizontalHeaderLabels(["Save", "Folder", "Size", "Saved"])
        self.table.setSelectionBehavior(QAbstractItemView.SelectionBehavior.SelectRows)
        self.table.setSelectionMode(QAbstractItemView.SelectionMode.ExtendedSelection)
        self.table.setEditTriggers(QAbstractItemView.EditTrigger.NoEditTriggers)
        self.table.verticalHeader().setVisible(False)
        self.table.setAlternatingRowColors(True)
        self.table.setShowGrid(False)
        head = self.table.horizontalHeader()
        for column, mode in enumerate((QHeaderView.ResizeMode.Stretch, QHeaderView.ResizeMode.ResizeToContents,
                                       QHeaderView.ResizeMode.ResizeToContents,
                                       QHeaderView.ResizeMode.ResizeToContents)):
            head.setSectionResizeMode(column, mode)
        self.table.itemSelectionChanged.connect(self._selection_changed)

        self.picture = QLabel()
        self.picture.setFixedSize(PICTURE, PICTURE)
        self.picture.setAlignment(Qt.AlignmentFlag.AlignCenter)
        self.details = QLabel()
        self.details.setWordWrap(True)
        self.details.setFixedWidth(PICTURE + 40)
        self.details.setAlignment(Qt.AlignmentFlag.AlignTop | Qt.AlignmentFlag.AlignLeft)
        self.details.setTextInteractionFlags(Qt.TextInteractionFlag.TextSelectableByMouse)
        side = QVBoxLayout()
        side.addWidget(self.picture, 0, Qt.AlignmentFlag.AlignHCenter)
        side.addWidget(self.details, 1)
        middle = QHBoxLayout()
        middle.addWidget(self.table, 1)
        middle.addLayout(side)

        self.import_button = style.primary_button("Import…", "Put save files on the card (.max, .psu, .sps, "
                                                             ".xps, .cbs, .psv)")
        self.import_button.clicked.connect(self.on_import)
        self.export_button = QPushButton("Export…")
        self.export_button.setToolTip("Save the selected saves as files (.psu or .max), to keep or to share")
        self.export_button.clicked.connect(self.on_export)
        self.copy_button = QPushButton("Copy to…")
        self.copy_button.setToolTip("Copy the selected saves onto another card")
        self.copy_button.clicked.connect(self.on_copy)
        self.delete_button = QPushButton("Delete…")
        self.delete_button.setToolTip("Delete the selected saves from the card (its backup keeps them)")
        self.delete_button.clicked.connect(self.on_delete)
        self.space = QLabel()
        close_button = QPushButton("Close")
        close_button.clicked.connect(self.accept)
        buttons = QHBoxLayout()
        for button in (self.import_button, self.export_button, self.copy_button, self.delete_button):
            buttons.addWidget(button)
        buttons.addStretch(1)
        buttons.addWidget(self.space)
        buttons.addWidget(close_button)

        self.status = QLabel()
        self.status.setWordWrap(True)
        self.status.setTextInteractionFlags(Qt.TextInteractionFlag.TextSelectableByMouse)

        lay = QVBoxLayout(self)
        lay.addLayout(top)
        lay.addWidget(hint_label(
            f"The cards in {folder}, the folder PCSX2 keeps them in. Before every change a card is copied beside "
            f"it (name.date.bak, the newest {memcards.BACKUPS_KEPT} kept), and nothing is written while PCSX2 "
            "runs."))
        lay.addWidget(self.warning)
        lay.addLayout(middle, 1)
        lay.addLayout(buttons)
        lay.addWidget(self.status)
        style.apply(self)
        self.load()

    # --- State ------------------------------------------------------------------------------------------------

    def load(self, keep: str = "") -> None:
        """Reads the cards again; the card named *keep* (or the one chosen, or slot 1's) stays chosen."""
        keep = keep or (self.card().name if self.card() else "")
        if not keep:
            keep = next((name for name, slot in sorted(self.slots.items(), key=lambda s: s[1])), "")
        self.cards = memcards.find_cards(self.folder)
        self.card_combo.blockSignals(True)
        self.card_combo.clear()
        for card in self.cards:
            slot = self.slots.get(card.name)
            self.card_combo.addItem(card.name + (f"  (slot {slot})" if slot else ""))
        names = [c.name for c in self.cards]
        self.card_combo.setCurrentIndex(names.index(keep) if keep in names else (0 if names else -1))
        self.card_combo.blockSignals(False)
        self._card_changed()

    def card(self) -> Card | None:
        index = self.card_combo.currentIndex()
        return self.cards[index] if 0 <= index < len(self.cards) else None

    def chosen(self) -> list[Save]:
        card = self.card()
        if card is None:
            return []
        return [card.saves[index.row()] for index in sorted(self.table.selectionModel().selectedRows())]

    def _card_changed(self, _index: int = 0) -> None:
        card = self.card()
        saves = card.saves if card else []
        self.table.setRowCount(len(saves))
        for row, save in enumerate(saves):
            title = QTableWidgetItem(shown(save.label) + ("  (PS1)" if save.ps1 else ""))
            title.setToolTip(shown(save.title) or "This save has no title.")
            self.table.setItem(row, 0, title)
            for column, text in enumerate((save.name, memcards.kib(save.size), memcards.when(save.modified)),
                                          start=1):
                self.table.setItem(row, column, QTableWidgetItem(text))
        if card is None:
            self.space.setText("")
            self.status.setText(f"No memory cards in {self.folder} yet: New card makes one. PCSX2 also makes "
                                "its own two when it first starts a game.")
        elif not card.readable:
            self.space.setText("")
            self.status.setText(card.error)
        else:
            self.space.setText(f"{memcards.kib(card.free)} free of {memcards.kib(card.total)}")
            if not self.worker.running:
                self.status.setText(f"{len(saves)} save(s) on {card.name}." if saves else
                                    f"{card.name} is empty.")
        if saves:
            self.table.selectRow(0)
        self._selection_changed()

    def _selection_changed(self) -> None:
        chosen = self.chosen()
        self._show_details(chosen[0] if len(chosen) == 1 else None, len(chosen))
        self._update_buttons()

    def _update_buttons(self) -> None:
        idle = not self.worker.running
        card = self.card()
        readable = card is not None and card.readable
        chosen = bool(self.chosen())
        running = self.running()
        self.warning.setText(RUNNING if running else "")
        self.warning.setVisible(running)
        self.card_combo.setEnabled(idle)
        self.new_button.setEnabled(idle)
        self.check_button.setEnabled(idle and readable)
        ps2_file = card is not None and card.path.suffix in memcards.PS2_SUFFIXES and card.path.is_file()
        self.format_button.setEnabled(idle and ps2_file and not running)     # an unreadable PS2 card too
        self.import_button.setEnabled(idle and readable and not running)
        self.export_button.setEnabled(idle and readable and chosen)
        others = [c for c in self.cards if c.readable and c is not card]
        self.copy_button.setEnabled(idle and readable and chosen and bool(others) and not running)
        self.copy_button.setToolTip("Copy the selected saves onto another card" if others else
                                    "There is no other PS2 card to copy to: New card makes one")
        self.delete_button.setEnabled(idle and readable and chosen and not running)

    # --- The picture ------------------------------------------------------------------------------------------

    def _show_details(self, save: Save | None, count: int) -> None:
        card = self.card()
        if save is None or card is None:
            self.picture.setPixmap(QPixmap())
            self.picture.setText("" if count == 0 else f"{count} saves")
            self.details.setText("")
            return
        kind = "A PS1 save" if save.ps1 else "A PS2 save"
        self.details.setText(f"<b>{escape(shown(save.label))}</b><br>{kind}<br>{escape(save.name)}<br>"
                             f"{memcards.kib(save.size)}, saved {memcards.when(save.modified)}")
        if save.ps1:
            self.picture.setPixmap(QPixmap())
            self.picture.setText("PS1")
            return
        key = (str(card.path), save.name, save.modified)
        if key in self._picture_cache:
            self._set_picture(self._picture_cache[key])
            return
        self.picture.setPixmap(QPixmap())
        self.picture.setText("…")
        self._picture_wanted = key
        self._start_picture()

    def _start_picture(self) -> None:
        key = self._picture_wanted
        if key is None or self.pictures.running:
            return
        path, name, _ = key

        def job():
            try:
                data = memcards.save_icon(Path(path), name)
                return key, memcard_icon.render(*data) if data else None
            except Exception:                           # a picture never stops the window; "no picture" instead
                return key, None
        self.pictures.start(job)

    def _picture_done(self, result) -> None:
        key, image = result
        pixmap = QPixmap.fromImage(image) if image is not None else None
        self._picture_cache[key] = pixmap
        if key == self._picture_wanted:
            self._picture_wanted = None
            self._set_picture(pixmap)
        else:
            self._start_picture()                       # another save was chosen meanwhile

    def _set_picture(self, pixmap: QPixmap | None) -> None:
        if pixmap is None:
            self.picture.setPixmap(QPixmap())
            self.picture.setText("No icon")
        else:
            self.picture.setText("")
            self.picture.setPixmap(pixmap)

    # --- Jobs -------------------------------------------------------------------------------------------------

    def _start(self, text: str, job: Callable[[], str], keep: str = "") -> None:
        """*job* off the GUI thread; it returns what happened in words, or raises CardError."""
        def run() -> tuple[bool, str, str]:
            try:
                return True, job(), keep
            except CardError as error:
                return False, str(error), keep
            except Exception as error:                  # an unexpected one from the card code, in words
                return False, f"That did not work: {error}", keep
        if self.worker.start(run):
            self.status.setStyleSheet("")
            self.status.setText(text)
            self._update_buttons()

    def _job_done(self, result: tuple[bool, str, str]) -> None:
        ok, message, keep = result
        self._picture_cache.clear()
        self.load(keep)
        self.status.setStyleSheet("" if ok else "font-weight:600;color:#c62828;")
        self.status.setText(message)

    def _refuse_while_running(self) -> bool:
        if self.running():
            self._update_buttons()
            self.status.setStyleSheet("font-weight:600;color:#c62828;")
            self.status.setText(RUNNING)
            return True
        return False

    def _ask(self, title: str, text: str) -> bool:
        return QMessageBox.question(self, window_title(title), text) == QMessageBox.StandardButton.Yes

    # --- Actions ----------------------------------------------------------------------------------------------

    def on_import(self) -> None:
        files, _ = QFileDialog.getOpenFileNames(self, window_title("Import saves"), str(Path.home()),
                                                IMPORT_FILTER + ";;All files (*)")
        if files:
            self.import_files([Path(f) for f in files])

    def import_files(self, files: list[Path]) -> None:
        card = self.card()
        if card is None or not card.readable or self._refuse_while_running():
            return
        path = card.path
        self._start(f"Importing {len(files)} save file(s) to {card.name}…",
                    lambda: memcards.import_saves(path, files), card.name)

    def on_export(self) -> None:
        card, chosen = self.card(), self.chosen()
        if card is None or not chosen:
            return
        if len(chosen) == 1:
            try:
                name = memcards.export_name(card.path, chosen[0].name, ".psu")
            except CardError as error:
                self.status.setText(str(error))
                return
            target, picked = QFileDialog.getSaveFileName(self, window_title("Export a save"),
                                                         str(Path.home() / name), EXPORT_FILTERS)
            if not target:
                return
            target_path = Path(target)
            if target_path.suffix.lower() not in memcards.EXPORT_KINDS:
                suffix = ".max" if "max" in picked.lower() else ".psu"
                target_path = target_path.with_suffix(suffix)
            self.export_to([chosen[0]], target_path)
            return
        folder = QFileDialog.getExistingDirectory(self, window_title("Export saves to a folder"), str(Path.home()))
        if not folder:
            return
        kinds = list(memcards.EXPORT_KINDS.values())
        kind, ok = QInputDialog.getItem(self, window_title("Export saves"), "Save them as:", kinds, 0, False)
        if ok:
            suffix = list(memcards.EXPORT_KINDS)[kinds.index(kind)]
            self.export_to(chosen, Path(folder), suffix)

    def export_to(self, saves: list[Save], target: Path, suffix: str = "") -> None:
        """One save to the file *target*, or several into the folder *target* as *suffix* files with mymc++'s
        long names; an existing file is kept and the save left out then."""
        card = self.card()
        if card is None:
            return
        path, names = card.path, [s.name for s in saves]

        def job() -> str:
            if not suffix:
                return f"Exported to {memcards.export_save(path, names[0], target)}."
            written, kept = 0, []
            for name in names:
                file = target / memcards.export_name(path, name, suffix)
                if file.exists():
                    kept.append(file.name)
                    continue
                memcards.export_save(path, name, file)
                written += 1
            text = f"{written} save(s) exported to {target}."
            return text + (f" Already there, left as they are: {', '.join(kept)}." if kept else "")
        self._start(f"Exporting {len(names)} save(s)…", job, card.name)

    def on_copy(self) -> None:
        card, chosen = self.card(), self.chosen()
        others = [c for c in self.cards if c.readable and c is not card]
        if card is None or not chosen or not others:
            return
        names = [c.name for c in others]
        name, ok = QInputDialog.getItem(self, window_title("Copy saves"), f"Copy {len(chosen)} save(s) to:",
                                        names, 0, False)
        if ok:
            self.copy_to(chosen, others[names.index(name)])

    def copy_to(self, saves: list[Save], target: Card) -> None:
        card = self.card()
        if card is None or self._refuse_while_running():
            return
        source, names, path = card.path, [s.name for s in saves], target.path
        self._start(f"Copying {len(names)} save(s) to {target.name}…",
                    lambda: memcards.copy_saves(source, names, path), card.name)

    def on_delete(self) -> None:
        card, chosen = self.card(), self.chosen()
        if card is None or not chosen:
            return
        listed = "\n".join(f"  {shown(s.label)}" for s in chosen[:10]) + ("\n  …" if len(chosen) > 10 else "")
        if self._ask("Delete saves", f"Delete {len(chosen)} save(s) from {card.name}?\n\n{listed}\n\nThe card's "
                                     "backup keeps them."):
            self.delete(chosen)

    def delete(self, saves: list[Save]) -> None:
        card = self.card()
        if card is None or self._refuse_while_running():
            return
        path, names = card.path, [s.name for s in saves]
        self._start(f"Deleting {len(names)} save(s)…", lambda: memcards.delete_saves(path, names), card.name)

    def _free_name(self) -> str:
        taken = {c.name for c in self.cards}
        n = 1
        while f"Mcd{n:03d}.ps2" in taken:
            n += 1
        return f"Mcd{n:03d}.ps2"

    def on_new(self) -> None:
        dialog = NewCardDialog(self._free_name(), self)
        if dialog.exec() == QDialog.DialogCode.Accepted:
            self.new_card(*dialog.values())

    def new_card(self, name: str, size_mb: int) -> None:
        folder = self.folder

        def job() -> str:
            path = memcards.new_card(folder, name, size_mb)
            return (f"{path.name} was made ({size_mb} MB). PCSX2 puts a card in a slot in its own settings "
                    "(Settings > Memory Cards).")
        shown_name = name if Path(name).suffix in memcards.PS2_SUFFIXES else name + ".ps2"
        self._start(f"Making {shown_name}…", job, shown_name)

    def on_format(self) -> None:
        card = self.card()
        if card is None:
            return
        if self._ask("Format", f"Format {card.name}?\n\nEvery save on it is erased; the backup made first keeps "
                               "them."):
            self.format_card()

    def format_card(self) -> None:
        card = self.card()
        if card is None or self._refuse_while_running():
            return
        path = card.path
        self._start(f"Formatting {card.name}…", lambda: memcards.format_card(path), card.name)

    def on_check(self) -> None:
        card = self.card()
        if card is None or not card.readable:
            return
        path = card.path

        def job() -> str:
            ok, report = memcards.check_card(path)
            if not ok:
                raise CardError(report)
            return report
        self._start(f"Checking {card.name}…", job, card.name)

    def done(self, result: int) -> None:
        """Close, Escape and the window's own close button all end here."""
        if self.worker.running and not self._ask("Close", "A change to a card is still running. Close anyway? "
                                                          "A card it does not finish stays as it was."):
            return
        self.worker.stop()
        self.pictures.stop()
        super().done(result)
