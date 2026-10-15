# SPDX-License-Identifier: GPL-3.0-or-later
"""The main window against the synthetic images: loading a folder and a single ISO, the new-name preview and the
naming template, the details panel with its icon cycling, translations, Rename All, and the PPSSPP launch."""

from __future__ import annotations

import subprocess
from pathlib import Path

import pytest
from PyQt6.QtCore import QSettings
from PyQt6.QtWidgets import QMessageBox

from bazzite_umd_file_renamer import APP_ID, main_window
from bazzite_umd_file_renamer.main_window import (COL_LAUNCH, COL_NEW_NAME, COL_OLD_NAME, COL_TITLE, MainWindow,
                                                  find_ppsspp)
from bazzite_umd_file_renamer.renamer import NamingTemplate


@pytest.fixture
def window(qapp, monkeypatch):
    monkeypatch.setattr(QMessageBox, "warning", lambda *a, **k: pytest.fail(f"unexpected warning: {a[1:3]}"))
    monkeypatch.setattr(QMessageBox, "information",
                        lambda *a, **k: pytest.fail(f"unexpected message: {a[1:3]}"))
    win = MainWindow()
    win.show()
    yield win
    win.close()


def rows(window) -> dict[str, str]:
    """current filename -> new filename, as the table shows them."""
    table = window.table
    return {table.item(r, COL_OLD_NAME).text(): table.item(r, COL_NEW_NAME).text()
            for r in range(table.rowCount())}


def test_load_folder_shows_games_and_new_names(window, games_dir) -> None:
    window.load_folder(str(games_dir))
    assert window.source_label.text() == str(games_dir)
    assert window.statusBar().currentMessage() == "3 game(s) found."
    assert window.rename_all_btn.isEnabled()
    assert rows(window) == {
        "download (1).iso": "ULUS10336 - Crisis Core Final Fantasy VII.iso",
        "ever17.iso": "ULJM05437 - Ever17.iso",
        "ridge.ISO": "UCUS98604 - RIDGE RACER.ISO",
    }
    assert window.table.cellWidget(0, COL_LAUNCH) is not None


def test_load_single_file_and_load_path(window, games_dir) -> None:
    window.load_single_file(str(games_dir / "ever17.iso"))
    assert list(rows(window)) == ["ever17.iso"]
    assert window.statusBar().currentMessage() == "1 game(s) found."
    window.load_path(str(games_dir / "not-psp.iso"))
    assert rows(window) == {} and not window.rename_all_btn.isEnabled()
    window.load_path(str(games_dir))
    assert len(rows(window)) == 3
    window.load_path(str(games_dir / "missing"))
    assert window.statusBar().currentMessage().startswith("Not found")


def test_naming_template_updates_names_and_is_saved(window, games_dir) -> None:
    window.load_folder(str(games_dir))
    window.template_combo.setCurrentIndex(NamingTemplate.TITLE_BRACKET_ID_VERSION.index)
    assert rows(window)["ever17.iso"] == "Ever17 [ULJM05437] [v1.01].iso"
    assert window.selected_naming_template() is NamingTemplate.TITLE_BRACKET_ID_VERSION
    window.close()
    settings = QSettings(QSettings.Format.IniFormat, QSettings.Scope.UserScope, APP_ID, APP_ID)
    assert int(settings.value("ui/namingTemplate")) == NamingTemplate.TITLE_BRACKET_ID_VERSION.index
    assert settings.value("paths/lastFolder") == str(games_dir)
    # A new window starts with the saved template and folder.
    again = MainWindow()
    assert again.selected_naming_template() is NamingTemplate.TITLE_BRACKET_ID_VERSION
    assert again._current_folder == str(games_dir)
    again.close()


def test_details_panel_and_icon_cycling(window, games_dir) -> None:
    window.load_folder(str(games_dir))
    assert window.id_edit.text() == "" and not window.apply_btn.isEnabled()
    window.table.selectRow(1)        # ever17.iso: ICON0, PIC0 and PIC1
    assert window.id_edit.text() == "ULJM05437"
    assert window.title_edit.text() == "Ever17"
    assert window.version_edit.text() == "1.01" and window.firmware_edit.text() == "3.95"
    assert window.translate_btn.isEnabled() and window.apply_btn.isEnabled()
    assert window.icon_caption_label.text() == "ICON0"
    assert window.icon_label.pixmap() is not None and not window.icon_label.pixmap().isNull()

    from PyQt6.QtCore import QEvent, QPointF, Qt
    from PyQt6.QtGui import QMouseEvent
    click = QMouseEvent(QEvent.Type.MouseButtonPress, QPointF(1, 1), Qt.MouseButton.LeftButton,
                        Qt.MouseButton.LeftButton, Qt.KeyboardModifier.NoModifier)
    for caption in ("PIC0", "PIC1", "ICON0"):
        assert window.eventFilter(window.icon_label, click)
        assert window.icon_caption_label.text() == caption

    window.table.selectRow(2)        # ridge.ISO has no images
    assert window.icon_caption_label.text() == "No icon"
    assert not window.eventFilter(window.icon_label, click)
    window.table.clearSelection()
    assert window.id_edit.text() == "" and window.icon_caption_label.text() == "No icon"


def test_translation_changes_the_new_name(window, games_dir) -> None:
    window.load_folder(str(games_dir))
    window.table.selectRow(1)
    window.translation_edit.setText("  Ever17: The Out of Infinity ")
    window.on_apply_translation()
    assert rows(window)["ever17.iso"] == "ULJM05437 - Ever17 The Out of Infinity.iso"
    assert window.table.item(1, COL_TITLE).text() == "Ever17: The Out of Infinity"
    assert window.title_edit.text() == "Ever17"          # the original title stays
    assert window.translation_edit.text() == "Ever17: The Out of Infinity"
    window.translation_edit.setText("")
    window.on_apply_translation()
    assert rows(window)["ever17.iso"] == "ULJM05437 - Ever17.iso"


def test_title_is_editable(window, games_dir) -> None:
    window.load_folder(str(games_dir))
    window.table.selectRow(1)
    assert not window.title_edit.isReadOnly()
    window.title_edit.setText("  Ever 17  ")
    window.on_apply_changes()
    assert rows(window)["ever17.iso"] == "ULJM05437 - Ever 17.iso"
    assert window.table.item(1, COL_TITLE).text() == "Ever 17"
    assert window.title_edit.text() == "Ever 17"      # still selected, with the new title


def test_rename_all(window, games_dir) -> None:
    window.load_folder(str(games_dir))
    window.on_rename_all()
    assert window.statusBar().currentMessage() == "3 file(s) renamed successfully."
    names = sorted(p.name for p in games_dir.iterdir())
    assert names == sorted(["ULUS10336 - Crisis Core Final Fantasy VII.iso", "ULJM05437 - Ever17.iso",
                            "UCUS98604 - RIDGE RACER.ISO", "not-psp.iso", "notes.txt"])
    # The table now shows the new names as the current ones; a second run changes nothing.
    assert all(old == new for old, new in rows(window).items())
    window.on_rename_all()
    assert window.statusBar().currentMessage() == "3 file(s) renamed successfully."


def test_rename_all_reports_a_collision(window, games_dir, monkeypatch) -> None:
    warnings: list[str] = []
    monkeypatch.setattr(QMessageBox, "warning", lambda parent, title, text, *a: warnings.append(text))
    (games_dir / "ULJM05437 - Ever17.iso").write_bytes(b"in the way")
    window.load_single_file(str(games_dir / "ever17.iso"))
    window.on_rename_all()
    assert window.statusBar().currentMessage() == "Done with errors."
    assert warnings == ["0 renamed, 1 failed:\n  ever17.iso -> ULJM05437 - Ever17.iso"]
    assert (games_dir / "ever17.iso").is_file()


def test_find_ppsspp(tmp_path, monkeypatch) -> None:
    monkeypatch.setattr(main_window, "flatpak_has", lambda app_id: False)
    monkeypatch.setattr(main_window.shutil, "which", lambda name: None)
    assert find_ppsspp("") is None
    assert find_ppsspp(str(tmp_path / "missing")) is None
    exe = tmp_path / "PPSSPPSDL"
    exe.write_bytes(b"")
    assert find_ppsspp(str(exe)) == [str(exe)]
    monkeypatch.setattr(main_window, "flatpak_has", lambda app_id: app_id == "org.ppsspp.PPSSPP")
    assert find_ppsspp("") == ["flatpak", "run", "org.ppsspp.PPSSPP"]
    monkeypatch.setattr(main_window, "flatpak_has", lambda app_id: False)
    monkeypatch.setattr(main_window.shutil, "which", lambda name: "/usr/bin/PPSSPPQt" if name == "PPSSPPQt" else None)
    assert find_ppsspp("") == ["/usr/bin/PPSSPPQt"]


def test_launch_game_runs_ppsspp_fullscreen(window, games_dir, tmp_path, monkeypatch) -> None:
    exe = tmp_path / "PPSSPPSDL"
    exe.write_bytes(b"")
    window._ppsspp_path = str(exe)
    launched: list[tuple[list[str], dict]] = []
    monkeypatch.setattr(subprocess, "Popen", lambda args, **kw: launched.append((args, kw)))
    window.load_folder(str(games_dir))
    window.table.cellWidget(1, COL_LAUNCH).click()
    assert launched and launched[0][0] == [str(exe), "--fullscreen", str((games_dir / "ever17.iso").resolve())]
    assert Path(launched[0][1]["cwd"]) == tmp_path
    assert window.statusBar().currentMessage() == "Launching game in PPSSPP..."


def test_launch_without_ppsspp_asks_for_the_path(window, games_dir, monkeypatch) -> None:
    shown: list[str] = []
    monkeypatch.setattr(QMessageBox, "information", lambda parent, title, text, *a: shown.append(title))
    asked: list[bool] = []
    monkeypatch.setattr(window, "on_set_ppsspp_path", lambda: asked.append(True))
    monkeypatch.setattr(main_window, "find_ppsspp", lambda configured: None)
    window.load_folder(str(games_dir))
    window.launch_game(str(games_dir / "ever17.iso"))
    assert shown == ["PPSSPP not found"] and asked == [True]
