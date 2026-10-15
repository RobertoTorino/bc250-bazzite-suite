# SPDX-License-Identifier: GPL-3.0-or-later
"""The main window against the synthetic PKG: the preview, a package given at start-up or by a later launch, an
extraction, the empty-folder guardrail, preview-only and the rename to CONTENT_ID. The worker runs in its QThread as in the app; the tests pump the event loop."""

from __future__ import annotations

import shutil
from pathlib import Path

import pytest
from PyQt6.QtCore import QElapsedTimer, QEventLoop, QThread
from PyQt6.QtGui import QDesktopServices
from PyQt6.QtWidgets import QMessageBox

from bazzite_pkgxtractor import main_window
from bazzite_pkgxtractor.main_window import MainWindow


def pump(app, done, deadline_ms: int = 30000) -> None:
    timer = QElapsedTimer()
    timer.start()
    while not done() and timer.elapsed() < deadline_ms:
        app.processEvents(QEventLoop.ProcessEventsFlag.AllEvents, 50)
        QThread.msleep(5)


@pytest.fixture
def window(qapp, tmp_path, monkeypatch):
    monkeypatch.setattr(main_window, "app_data_dir", lambda: tmp_path / "state")
    (tmp_path / "state").mkdir()
    monkeypatch.setattr(QMessageBox, "warning", lambda *a, **k: pytest.fail(f"unexpected warning: {a[1:3]}"))
    win = MainWindow()
    win.show()
    yield win
    win.close()


def test_preview_shows_sfo_and_icon(window, built_pkg):
    window.pkg_input.setText(str(built_pkg.path))
    window.update_sfo_preview(str(built_pkg.path))
    preview = window.sfo_preview.toPlainText()
    assert "CATEGORY: gd" in preview
    assert "TITLE: Synthetic Test Title" in preview
    assert f"CONTENT_ID: {built_pkg.content_id}" in preview
    assert f"TITLE_ID: {built_pkg.title_id}" in preview
    assert window.icon_preview.pixmap() is not None and not window.icon_preview.pixmap().isNull()
    assert window.icon_preview.pkg_loaded
    assert "Preview: icon0.png loaded" in window.log_output.toPlainText()


def test_package_from_the_command_line_or_a_later_launch(qapp, window, built_pkg, tmp_path, monkeypatch):
    window.open_pkg(str(built_pkg.path))                       # what a second launch with a package does
    assert window.pkg_input.text() == str(built_pkg.path)
    assert f"TITLE_ID: {built_pkg.title_id}" in window.sfo_preview.toPlainText()

    monkeypatch.setattr(main_window, "app_data_dir", lambda: tmp_path / "state2")   # the first window's crash
    (tmp_path / "state2").mkdir()                                                 # marker is not this one's
    started = MainWindow(str(built_pkg.path))                  # the package given at start-up
    pump(qapp, lambda: "TITLE_ID" in started.sfo_preview.toPlainText(), 5000)
    assert started.pkg_input.text() == str(built_pkg.path)
    assert f"TITLE_ID: {built_pkg.title_id}" in started.sfo_preview.toPlainText()
    started.close()


def test_extract_guardrail_and_preview_only(qapp, window, built_pkg, tmp_path, monkeypatch):
    opened: list[str] = []
    monkeypatch.setattr(QDesktopServices, "openUrl", lambda url: opened.append(url.toLocalFile()))
    out_dir = tmp_path / "out"
    out_dir.mkdir()
    window.pkg_input.setText(str(built_pkg.path))
    window.output_input.setText(str(out_dir))

    window.on_extract()
    assert not window.extract_btn.isEnabled()
    pump(qapp, lambda: window._thread is None)
    log = window.log_output.toPlainText()
    assert "=== Extraction complete! ===" in log, log
    assert window.extract_btn.isEnabled()
    assert window.progress_bar.value() == window.progress_bar.maximum()

    target = out_dir / built_pkg.title_id
    assert (target / "eboot.bin").read_bytes() == built_pkg.expected_files["eboot.bin"]
    assert (target / "data" / "big.bin").read_bytes() == built_pkg.expected_files["data/big.bin"]
    assert (target / "sce_sys" / "param.sfo").read_bytes() == built_pkg.sce_sys_plain["param.sfo"]
    assert (target / "filelist.txt").is_file()
    assert [Path(p) for p in opened] == [target]
    assert not (tmp_path / "state" / "bazzite-pkgxtractor.progress").exists()

    # The same folder again trips the guardrail: nothing is overwritten.
    window.on_extract()
    pump(qapp, lambda: window._thread is None)
    assert "Guardrail: target output folder is not empty." in window.log_output.toPlainText()

    # Preview-only into a fresh folder writes sce_sys and the file list, not the payload.
    preview_dir = tmp_path / "preview"
    preview_dir.mkdir()
    window.output_input.setText(str(preview_dir))
    window.on_preview_only()
    pump(qapp, lambda: window._thread is None)
    assert "=== Preview complete (metadata extracted) ===" in window.log_output.toPlainText()
    assert (preview_dir / built_pkg.title_id / "filelist.txt").is_file()
    assert (preview_dir / built_pkg.title_id / "sce_sys" / "icon0.png").is_file()
    assert not (preview_dir / built_pkg.title_id / "eboot.bin").exists()


def test_salvage_mode_is_passed_to_the_worker(qapp, window, built_pkg, tmp_path, monkeypatch):
    monkeypatch.setattr(QDesktopServices, "openUrl", lambda url: None)
    out_dir = tmp_path / "out"
    out_dir.mkdir()
    window.pkg_input.setText(str(built_pkg.path))
    window.output_input.setText(str(out_dir))
    window.salvage_check.setChecked(True)
    window.on_extract()
    pump(qapp, lambda: window._thread is None)
    log = window.log_output.toPlainText()
    assert "Recovery Summary: skipped entries = 0" in log
    assert window.salvage_check.isEnabled()


def test_rename_to_content_id(window, built_pkg, tmp_path):
    copy = tmp_path / "some download.pkg"
    shutil.copyfile(built_pkg.path, copy)
    window.pkg_input.setText(str(copy))
    window.on_rename_pkg_to_content_id()
    renamed = tmp_path / f"{built_pkg.content_id}-0100.pkg"   # a game: CONTENT_ID-APP_VER
    assert renamed.is_file()
    assert not copy.exists()
    assert window.pkg_input.text() == str(renamed)
    assert "Renamed PKG to CONTENT_ID-APP_VER" in window.log_output.toPlainText()


def test_empty_inputs_warn_instead_of_starting(qapp, window, monkeypatch):
    warnings: list[str] = []
    monkeypatch.setattr(QMessageBox, "warning", lambda parent, title, text, *a: warnings.append(text))
    window.on_extract()
    assert warnings == ["Please select a PKG file first."]
    window.pkg_input.setText("whatever.pkg")
    window.on_extract()
    assert warnings[-1] == "Please select a destination folder."
    assert window._thread is None
