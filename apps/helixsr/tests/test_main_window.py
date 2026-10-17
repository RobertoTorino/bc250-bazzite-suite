# SPDX-License-Identifier: GPL-3.0-or-later
"""Smoke tests for the window: construct it against temporary paths and drive the pages through their signals,
with QMessageBox answered automatically."""

from __future__ import annotations

from pathlib import Path
from unittest import mock

import pytest
from PyQt6.QtWidgets import QMessageBox

from helixsr_manager import backend
from helixsr_manager.main_window import MainWindow
from tests.conftest import FAKE_DLL


@pytest.fixture
def window(qapp, payload, tmp_path):
    w = MainWindow(payload, tmp_path / "deployments.json", tmp_path / "work", tmp_path / "HelixSR", check_updates=False)
    yield w
    w.close()


def test_pages_render_and_refresh(window):
    for row in range(window.nav.count()):
        window.nav.setCurrentRow(row)
    window.refresh()
    assert window.windowTitle()


def test_deploy_and_remove_through_deploy_page(window, game, payload, tmp_path):
    target = game / "Engine" / "Plugins" / "FSR3" / "ThirdParty" / "Win64" / backend.UPSCALER_DLL
    with mock.patch.object(QMessageBox, "question", return_value=QMessageBox.StandardButton.Yes), \
         mock.patch.object(QMessageBox, "information"), mock.patch.object(QMessageBox, "warning"), \
         mock.patch.object(QMessageBox, "critical"):
        window.deploy_page.scan_requested.emit(game)
        found = backend.find_game_dlls(game, payload)
        window.deploy_page.deploy_requested.emit(found[0], backend.MODE_REPLACE, None, True, None, None)
        assert target.read_bytes() == FAKE_DLL
        assert window.store.find(target) is not None
        window.refresh()
        window.deploy_page.remove_requested.emit(backend.find_game_dlls(game, payload)[0], backend.MODE_REPLACE, None)
        assert target.read_bytes() != FAKE_DLL
        assert window.store.find(target) is None


def test_folder_mode_through_deploy_page(window, payload, tmp_path):
    folder = tmp_path / "opti" / "HelixSR"
    with mock.patch.object(QMessageBox, "question", return_value=QMessageBox.StandardButton.Yes), \
         mock.patch.object(QMessageBox, "information"), mock.patch.object(QMessageBox, "warning"), \
         mock.patch.object(QMessageBox, "critical"):
        window.deploy_page.deploy_requested.emit(None, backend.MODE_FOLDER, folder, False, None, None)
        assert (folder / backend.HELIXSR_DLL).is_file() and (folder / backend.UPSCALER_DLL).is_file()
        dep = window.store.find(folder)
        assert dep is not None and dep.mode == backend.MODE_FOLDER
        window.overview.remove_requested.emit(dep)
        assert not folder.exists() and window.store.find(folder) is None


def test_ini_page_saves_default(window, payload):
    with mock.patch.object(QMessageBox, "information"), mock.patch.object(QMessageBox, "warning"):
        window.ini_page.save_default_requested.emit("[Log]\nEnabled = false\n")
    assert (payload / backend.INI).read_text() == "[Log]\nEnabled = false\n"


def test_setup_page_builds_and_imports(qapp, tmp_path):
    """Setup page -> SetupWorker (fake release over file://) -> payload imported, Overview updated."""
    from PyQt6.QtCore import QEventLoop, QTimer
    from helixsr_manager import acquire
    from helixsr_manager.acquire import UpdateStatus
    from tests.test_acquire import prepared

    release, _ = prepared(tmp_path)
    w = MainWindow(tmp_path / "payload", tmp_path / "dep.json", tmp_path / "work", tmp_path / "data" / "HelixSR",
                   check_updates=False)
    try:
        w._updates_checked({"helixsr": UpdateStatus("HelixSR", "", release)})
        assert w.setup_page.release is release
        with mock.patch.object(acquire, "is_immutable_system", return_value=True), \
                mock.patch.object(w, "check_for_updates"), mock.patch.object(QMessageBox, "critical"):
            w.setup_page.start_requested.emit(None)
            assert w._setup_worker is not None and not w.setup_page.start.isEnabled()
            loop = QEventLoop()
            w._setup_worker.finished_with.connect(lambda *_: QTimer.singleShot(0, loop.quit))
            QTimer.singleShot(20000, loop.quit)
            loop.exec()
        assert w._setup_worker is None
        status = backend.payload_status(tmp_path / "payload")
        assert status.ready and status.version == "1.2.0"
        assert w.setup_page.built is not None and w.setup_page.import_built.isEnabled()
        assert "HelixSR 1.2.0 is built" in w.setup_page.stage.text()
    finally:
        w.close()


def test_update_hint_on_overview(window):
    from helixsr_manager.acquire import ReleaseInfo, UpdateStatus
    newer = ReleaseInfo("9.0.0", "v9.0.0", "u", "2030-01-01", "HelixSR-9.0.0.zip", "https://x/z.zip", 10)
    window._updates_checked({"helixsr": UpdateStatus("HelixSR", "1.2.0", newer)})
    assert "9.0.0" in window.overview.update_hint.text() and window.setup_page.helix_pill.text() == "Update"
    assert not hasattr(window.setup_page, "app_pill")                  # the portal updates this app
    window._updates_checked({"helixsr": UpdateStatus("HelixSR", "1.2.0", ReleaseInfo("1.2.0", "v1.2.0", "u", "d"))})
    assert window.overview.update_hint.text() == "" and window.setup_page.helix_pill.text() == "Up to date"


def test_scan_keeps_steam_selection(window, tmp_path):
    games = [tmp_path / "lib" / "steamapps" / "common" / n for n in ("Alpha", "Beta")]
    window.deploy_page.set_games(games)
    window.deploy_page.games_combo.setCurrentIndex(2)
    assert window.deploy_page.game_dir() == games[1]
    window.deploy_page.scan.click()
    assert window.deploy_page.games_combo.currentIndex() == 2
    window.deploy_page.set_games(list(reversed(games)))
    assert window.deploy_page.games_combo.currentText() == "Beta"


def test_folder_mode_with_a_second_upscaler(window, payload, tmp_path):
    folder = tmp_path / "opti2" / "HelixSR"
    fsr4 = tmp_path / "amd_fidelityfx_upscaler_dx12.dll"
    fsr4.write_bytes(b"MZ-amd-fsr4")
    with mock.patch.object(QMessageBox, "information") as info, mock.patch.object(QMessageBox, "critical") as crit:
        window.deploy_page.mode_folder.setChecked(True)
        window.deploy_page.set_folder_path(folder)
        window.deploy_page.set_second_upscaler(fsr4)
        window.deploy_page.write_ini.setChecked(True)
        window.deploy_page.deploy.click()
        assert not crit.called
        assert backend.SECOND_UPSCALER_DLL in info.call_args.args[2]
    assert (folder / backend.SECOND_UPSCALER_DLL).read_bytes() == b"MZ-amd-fsr4"
    assert backend.parse_ini((folder / backend.INI).read_text()).upscaler_dll == backend.SECOND_UPSCALER_DLL


def test_ini_page_greys_out_what_the_version_ignores(window):
    page = window.ini_page
    page.set_helixsr_version("1.8.0")
    assert not page.sharpening_mode.isEnabled() and not page.network.isEnabled()
    assert page.sharpener.isEnabled() and page.sharpness.isEnabled() and page.use_game_slider.isEnabled()
    assert not page.ignored_hint.isHidden() and "1.8.0" in page.ignored_hint.text()
    page.set_helixsr_version("1.7.0")
    assert not page.sharpener.isEnabled() and not page.sharpness.isEnabled()
    assert "Mode = off" in page.text()                     # the values stay in the file for other versions
    page.set_helixsr_version("1.4.3")
    assert page.sharpening_mode.isEnabled() and page.network.isEnabled() and not page.sharpener.isEnabled()
    page.set_helixsr_version("")
    assert page.sharpener.isEnabled() and page.ignored_hint.isHidden()


def test_setup_page_fallback_choice(window):
    from helixsr_manager.acquire import ReleaseInfo, UpdateStatus
    latest = ReleaseInfo("1.9.0", "v1.9.0", "u", "2026-10-15", "HelixSR-1.9.0.zip", "https://x/z.zip", 10)
    window._updates_checked({"helixsr": UpdateStatus("HelixSR", "1.8.1", latest)})
    assert "1.9.0" in window.overview.update_hint.text() and "Get HelixSR" in window.overview.update_hint.text()
    window.setup_page.version.setCurrentIndex(1)
    assert window.setup_page.fallback() and window.settings.value("setup/fallback", type=bool)
    window._updates_checked({"helixsr": UpdateStatus("HelixSR", "1.8.1", latest)})
    assert "fallback" in window.overview.update_hint.text()
    with mock.patch("helixsr_manager.main_window.SetupWorker") as worker:
        window.setup_page.start_requested.emit(None)
    request = worker.call_args.args[0]
    assert request.fallback and request.release is None
    window._setup_worker = None
    window.setup_page.set_running(False)


def test_optiscaler_through_deploy_page(window, payload, tmp_path):
    from tests.test_optiscaler import add_optiscaler, make_game
    add_optiscaler(payload)
    window.refresh()
    game, exe_dir = make_game(tmp_path)
    page = window.deploy_page
    page.mode_folder.setChecked(True)
    with mock.patch.object(QMessageBox, "question", return_value=QMessageBox.StandardButton.Yes) as asked, \
            mock.patch.object(QMessageBox, "information") as info, mock.patch.object(QMessageBox, "critical") as crit:
        page.set_game_path(game)                               # Scan finds the .exe folder
        assert page.exe_folder() == exe_dir and page.snippet.isHidden() and not page.opti_hint.isHidden()
        page.deploy.click()
        assert asked.called and not crit.called and "DLSS" in info.call_args.args[2]
    assert (exe_dir / "dxgi.dll").read_bytes() == b"MZ-OptiScaler-0.9.4"
    page.install_opti.setChecked(False)                        # by hand: the lines to paste are back
    assert page.exe_folder() is None and not page.snippet.isHidden()
    dep = window.store.find(page.folder())
    with mock.patch.object(QMessageBox, "question", return_value=QMessageBox.StandardButton.Yes):
        window.overview.remove_requested.emit(dep)
    assert (exe_dir / "dxgi.dll").read_bytes() == b"MZ-the-games-dxgi" and not (exe_dir / "OptiScaler.ini").exists()
