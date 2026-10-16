# SPDX-License-Identifier: GPL-3.0-or-later
"""The Memory cards window (memcard_dialog.py) on mymc++'s test cards: the cards with their slots, the saves and
the icon's picture, every action through the window's worker, and nothing offered that would write while PCSX2
runs."""

from __future__ import annotations

import time
from pathlib import Path

import pytest
from PyQt6.QtWidgets import QDialog, QMessageBox

from bc250_pcsx2_manager import memcards
from bc250_pcsx2_manager.memcard_dialog import MemcardDialog, NewCardDialog, shown

REZ = "BESCES-50501REZ"


def _wait(dialog, qapp) -> None:
    deadline = time.monotonic() + 30
    while (dialog.worker.running or dialog.pictures.running) and time.monotonic() < deadline:
        qapp.processEvents()
        time.sleep(0.01)
    qapp.processEvents()


@pytest.fixture
def dialog(qapp, cards):
    (cards / "Mcd002.mcr").write_bytes(b"\0" * 131072)
    window = MemcardDialog(cards, {"mc01.ps2": 1, "Mcd002.mcr": 2}, running=lambda: False)
    yield window
    _wait(window, qapp)
    window.done(0)


def test_the_cards_and_the_saves(dialog, qapp):
    assert [dialog.card_combo.itemText(i) for i in range(dialog.card_combo.count())] == \
        ["Mcd002.mcr  (slot 2)", "mc01.ps2  (slot 1)", "mc02.ps2"]
    assert dialog.card().name == "mc01.ps2"                             # slot 1's card first
    assert [dialog.table.item(r, 0).text() for r in range(dialog.table.rowCount())] == \
        ["Rez", "Your System Configuration"]                           # full-width letters shown as such
    assert dialog.table.item(0, 1).text() == REZ and dialog.table.item(0, 2).text() == "53 KB"
    assert dialog.space.text() == "8,075 KB free of 8,135 KB"
    assert "Rez" in dialog.details.text() and "A PS2 save" in dialog.details.text()
    _wait(dialog, qapp)
    assert not dialog.picture.pixmap().isNull()                         # Rez's icon
    dialog.table.selectRow(1)
    _wait(dialog, qapp)
    assert dialog.picture.text() == "No icon"                           # the system configuration has none
    dialog.card_combo.setCurrentIndex(0)
    assert dialog.status.text().startswith("A PS1 memory card")
    assert not dialog.import_button.isEnabled() and not dialog.format_button.isEnabled()
    dialog.card_combo.setCurrentIndex(2)
    assert dialog.status.text() == "mc02.ps2 is empty." and dialog.table.rowCount() == 0


def test_import_export_copy_delete(dialog, qapp, mymc_data, tmp_path):
    dialog.card_combo.setCurrentIndex(2)                                # mc02, empty
    dialog.import_files([mymc_data / "BESCES-50501REZ.max"])
    _wait(dialog, qapp)
    assert dialog.status.text() == "1 save(s) written to mc02.ps2."
    assert dialog.card().name == "mc02.ps2" and dialog.table.rowCount() == 1
    dialog.table.selectAll()
    dialog.export_to(dialog.chosen(), tmp_path / "one.max")
    _wait(dialog, qapp)
    assert (tmp_path / "one.max").is_file() and dialog.status.text().startswith("Exported to")
    dialog.export_to(dialog.chosen(), tmp_path, ".psu")
    _wait(dialog, qapp)
    assert (tmp_path / "SCES-50501 Rez (DD5DAEA3).psu").is_file()
    dialog.export_to(dialog.chosen(), tmp_path, ".psu")                 # again: kept, not written over
    _wait(dialog, qapp)
    assert "Already there, left as they are: SCES-50501 Rez (DD5DAEA3).psu." in dialog.status.text()

    dialog.card_combo.setCurrentIndex(1)                                # mc01
    dialog.table.selectRow(1)
    dialog.copy_to(dialog.chosen(), dialog.cards[2])
    _wait(dialog, qapp)
    assert dialog.status.text() == "1 save(s) written to mc02.ps2."
    assert dialog.card().name == "mc01.ps2"                             # the source stays chosen
    dialog.table.selectRow(0)
    dialog.delete(dialog.chosen())
    _wait(dialog, qapp)
    assert dialog.status.text() == "1 save(s) deleted from mc01.ps2."
    assert [s.name for s in dialog.card().saves] == ["BEDATA-SYSTEM"]
    assert len(memcards.backups(dialog.card().path)) == 1


def test_new_card_format_and_check(dialog, qapp):
    dialog.new_card("Spare", 16)
    _wait(dialog, qapp)
    assert dialog.status.text().startswith("Spare.ps2 was made (16 MB).")
    assert dialog.card().name == "Spare.ps2" and dialog.space.text().startswith("16,")
    assert dialog._free_name() == "Mcd001.ps2"
    dialog.card_combo.setCurrentIndex([c.name for c in dialog.cards].index("mc01.ps2"))
    dialog.on_check()
    _wait(dialog, qapp)
    assert dialog.status.text() == "mc01.ps2: no problems found."
    dialog.format_card()
    _wait(dialog, qapp)
    assert dialog.status.text().startswith("mc01.ps2 was formatted (8 MB)")
    assert dialog.table.rowCount() == 0
    dialog.new_card("Spare", 8)
    _wait(dialog, qapp)
    assert dialog.status.text() == "Spare.ps2 already exists."
    assert "color:#c62828" in dialog.status.styleSheet()


def test_new_card_dialog(qapp):
    window = NewCardDialog("Mcd003.ps2")
    assert window.values() == ("Mcd003.ps2", 8)
    window.size_combo.setCurrentIndex(3)
    window.name_edit.setText("  Big.ps2 ")
    assert window.values() == ("Big.ps2", 64)
    window.close()


def test_nothing_written_while_pcsx2_runs(qapp, cards, mymc_data):
    running = [True]
    window = MemcardDialog(cards, {}, running=lambda: running[0])
    assert window.warning.text().startswith("PCSX2 is running")
    assert not window.import_button.isEnabled() and not window.delete_button.isEnabled()
    assert not window.copy_button.isEnabled() and not window.format_button.isEnabled()
    assert window.export_button.isEnabled() and window.check_button.isEnabled()      # reading is fine
    before = memcards.read_card(cards / "mc01.ps2").saves
    window.delete(window.chosen())
    assert window.status.text().startswith("PCSX2 is running") and not window.worker.running
    assert memcards.read_card(cards / "mc01.ps2").saves == before
    running[0] = False
    window._update_buttons()
    assert window.import_button.isEnabled() and window.warning.isHidden()
    window.done(0)


def test_no_cards_yet(qapp, tmp_path):
    window = MemcardDialog(tmp_path / "memcards", {}, running=lambda: False)
    assert window.card() is None
    assert window.status.text().startswith("No memory cards in")
    assert window.new_button.isEnabled() and not window.import_button.isEnabled()
    window.new_card("Mcd001", 8)
    _wait(window, qapp)
    assert window.card().name == "Mcd001.ps2" and (tmp_path / "memcards" / "Mcd001.ps2").is_file()
    window.done(0)


def test_titles_as_shown():
    assert shown("Ｙｏｕｒ Ｓｙｓｔｅｍ") == "Your System"
    assert shown("ファイナルファンタジー") == "ファイナルファンタジー"


def test_the_main_window_opens_it(qapp, tmp_path, monkeypatch):
    from bc250_pcsx2_manager import emulator
    from bc250_pcsx2_manager import memcard_dialog
    from bc250_pcsx2_manager.main_window import MainWindow
    opened = []
    monkeypatch.setattr(memcard_dialog.MemcardDialog, "exec",
                        lambda self: opened.append((self.folder, self.slots)) or QDialog.DialogCode.Rejected)
    monkeypatch.setattr(QMessageBox, "question", lambda *a, **k: QMessageBox.StandardButton.No)
    pcsx2 = tmp_path / "PCSX2"
    (pcsx2 / "inis").mkdir(parents=True)
    (pcsx2 / "inis" / "PCSX2.ini").write_text("[MemoryCards]\nSlot1_Filename = Rez.ps2\n", encoding="utf-8")
    window = MainWindow(home=tmp_path / "emulator", pcsx2_home=pcsx2, steam_dir=None, run=tmp_path / "run",
                        newer_release=lambda: None,
                        latest_nightly=lambda: (_ for _ in ()).throw(emulator.EmulatorError("none")))
    assert window.memcards_button.isEnabled()
    window.on_memcards()
    assert opened == [(pcsx2 / "memcards", {"Rez.ps2": 1, "Mcd002.ps2": 2})]
    window.release_check.stop()
    window.close()
    assert Path(window.pcsx2_home) == pcsx2
