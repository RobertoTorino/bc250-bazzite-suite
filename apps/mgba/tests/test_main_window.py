# SPDX-License-Identifier: GPL-3.0-or-later
"""The window on folders made in a temp folder: the states before and after installing, mGBA that updated itself,
the games in the table, the game folders, the plan for Game Mode, installing through the worker, Steam's shortcuts
changed with a fake "close Steam", a newer mGBA, and the blue look."""

from __future__ import annotations

import hashlib
import time
from pathlib import Path

import pytest
from PyQt6.QtCore import Qt
from PyQt6.QtWidgets import QMessageBox

from conftest import gba_bytes, make_gba, make_zip

from bc250_core import steam
from mgba_manager import emulator, shortcuts, style
from mgba_manager.games import Game
from mgba_manager.main_window import MainWindow


@pytest.fixture
def folders(tmp_path):
    make_gba(tmp_path / "games" / "One.gba", "AONE")
    make_zip(tmp_path / "games" / "Two.zip", {"Two.gba": gba_bytes("ATWO")})
    config = tmp_path / "Steam" / "userdata" / "1000" / "config"
    config.mkdir(parents=True)
    run = tmp_path / "bin" / "bc250-mgba-run"
    run.parent.mkdir()
    run.write_text("#!/bin/sh\n")
    return {"home": tmp_path / "emulator", "steam_dir": tmp_path / "Steam", "run": run}


def _install(home: Path, size: int = emulator.SIZE) -> None:
    (home / emulator.VERSION).mkdir(parents=True)
    (home / emulator.VERSION / emulator.MEMBER).write_bytes(b"\0" * size)
    (home / "current").symlink_to(emulator.VERSION)


def _wait(window, qapp) -> None:
    deadline = time.monotonic() + 10
    while window.worker.running and time.monotonic() < deadline:
        qapp.processEvents()
        time.sleep(0.01)
    qapp.processEvents()


def _window(folders, **kwargs) -> MainWindow:
    closed = kwargs.pop("closed", [])
    kwargs.setdefault("newer_release", lambda: None)                         # never GitHub in a test
    return MainWindow(**folders, steam_closed=lambda change: (closed.append(1), change())[0] and False,
                      steam_running=lambda: False, **kwargs)


def _titles(window) -> list[str]:
    return [window.table.item(r, 1).text() for r in range(window.table.rowCount())]


def test_before_installing(qapp, folders):
    window = _window(folders)
    assert window.pill.text() == "Not installed"
    assert "Not installed. Install downloads mGBA 0.10.5" in window.emulator_state.text()
    assert window.install_button.isEnabled() and not window.remove_button.isEnabled()
    assert not window.mgba_button.isEnabled() and not window.play_button.isEnabled()
    assert window.folder_button.isEnabled() and not window.forget_button.isEnabled()
    assert window.table.rowCount() == 0                                          # no game folder yet
    window.close()


def test_installed_with_games(qapp, folders, tmp_path):
    _install(folders["home"])
    window = _window(folders)
    assert window.pill.text() == "No games"
    window.add_folder(tmp_path / "games")
    assert window.pill.text() == "Ready" and window.emulator_box.value.text() == emulator.VERSION
    assert window.games_box.value.text() == "2" and window.steam_box.value.text() == "0"
    assert not window.install_button.isEnabled() and window.remove_button.isEnabled()
    assert not window.play_button.isEnabled()                                     # nothing chosen yet
    window.table.selectRow(0)
    assert window.play_button.isEnabled() and window.chosen().title == "One"
    assert not window.steam_button.isEnabled()                                    # nothing to change
    assert [window.table.item(r, 2).text() for r in range(2)] == ["AONE", "ATWO"]
    assert [window.table.item(r, 3).text() for r in range(2)] == ["GBA", "ZIP"]
    window.close()


def test_mgba_that_updated_itself_can_be_put_back(qapp, folders):
    _install(folders["home"], size=10)
    window = _window(folders)
    assert "mGBA updated itself in its own window" in window.emulator_state.text()
    assert window.emulator_box.value.text() == "updated" and window.install_button.isEnabled()
    window.close()


def test_an_older_mgba_is_offered_the_pinned_one(qapp, folders):
    (folders["home"] / "0.10.4").mkdir(parents=True)
    (folders["home"] / "0.10.4" / emulator.MEMBER).write_text("")
    (folders["home"] / "current").symlink_to("0.10.4")
    window = _window(folders)
    assert "mGBA 0.10.4 is installed; this version of the app brings 0.10.5" in window.emulator_state.text()
    assert window.install_button.isEnabled()
    window.close()


def test_game_folders_added_and_removed(qapp, folders, tmp_path):
    window = _window(folders)
    window.add_folder(tmp_path / "games")
    assert window.running.text() == f"{tmp_path / 'games'} is a game folder now: 2 game(s) in it."
    assert _titles(window) == ["One", "Two"] and window.forget_button.isEnabled()
    window.add_folder(tmp_path / "games")                                         # once only
    assert window.folders == [tmp_path / "games"]
    window.close()
    window = _window(folders)                                                     # remembered
    assert window.folders == [tmp_path / "games"] and window.games_box.value.text() == "2"
    window.forget_folder(tmp_path / "games")
    assert window.folders == [] and window.table.rowCount() == 0 and not window.forget_button.isEnabled()
    window.close()


def test_install_runs_off_the_window(qapp, folders, monkeypatch):
    payload = b"#!/bin/sh\n"
    monkeypatch.setattr(emulator, "SHA256", hashlib.sha256(payload).hexdigest())
    monkeypatch.setattr(emulator, "SIZE", len(payload))
    monkeypatch.setattr(QMessageBox, "question", lambda *a, **k: QMessageBox.StandardButton.Yes)
    window = _window(folders, fetch=lambda url, dest, progress=None: dest.write_bytes(payload))
    window.on_install()
    assert not window.install_button.isEnabled()                                  # busy
    _wait(window, qapp)
    assert window.running.text() == f"mGBA {emulator.VERSION} is installed."
    assert window.version == emulator.VERSION and window.pill.text() == "No games"
    window.close()


def test_a_failed_install_says_so(qapp, folders, monkeypatch):
    monkeypatch.setattr(QMessageBox, "question", lambda *a, **k: QMessageBox.StandardButton.Yes)
    window = _window(folders, fetch=lambda url, dest, progress=None: dest.write_bytes(b"other"))
    window.on_install()
    _wait(window, qapp)
    assert "mGBA was not installed:" in window.running.text() and "SHA-256 differs" in window.running.text()
    assert not window.version
    window.close()


def test_remove(qapp, folders, monkeypatch):
    _install(folders["home"])
    monkeypatch.setattr(QMessageBox, "question", lambda *a, **k: QMessageBox.StandardButton.Yes)
    window = _window(folders)
    window.on_remove()
    assert not window.version and not window.home.exists() and window.pill.text() == "Not installed"
    window.close()


def test_play_and_mgbas_window(qapp, folders, tmp_path):
    _install(folders["home"])
    log = tmp_path / "args"
    folders["run"].write_text(f'#!/bin/sh\necho "$@" >> "{log}"\n')
    folders["run"].chmod(0o755)
    window = _window(folders)
    window.add_folder(tmp_path / "games")
    window.table.selectRow(0)
    window.on_play()
    window.on_open_mgba()
    deadline = time.monotonic() + 10
    while (not log.exists() or len(log.read_text().splitlines()) < 2) and time.monotonic() < deadline:
        time.sleep(0.01)
    assert sorted(log.read_text().splitlines()) == sorted([str(tmp_path / "games" / "One.gba"), ""])
    assert window.running.text() == "Started One."
    window.close()


def test_game_mode_added_and_taken_out(qapp, folders, tmp_path, monkeypatch):
    _install(folders["home"])
    monkeypatch.setattr(QMessageBox, "question", lambda *a, **k: QMessageBox.StandardButton.Yes)
    closed = []
    window = _window(folders, closed=closed)
    window.add_folder(tmp_path / "games")
    window.table.item(1, 0).setCheckState(Qt.CheckState.Checked)
    assert window.steam_button.isEnabled()
    add, remove = window.steam_plan()
    assert [g.title for g in add] == ["Two"] and remove == []
    window.on_update_steam()
    _wait(window, qapp)
    assert closed == [1] and window.running.text().startswith("1 game(s) in Steam")
    assert list(shortcuts.in_steam(folders["steam_dir"]).values()) == ["[GBA] Two"]
    assert window.steam_box.value.text() == "1" and window.table.item(1, 0).checkState() == Qt.CheckState.Checked
    window.table.item(1, 0).setCheckState(Qt.CheckState.Unchecked)
    add, remove = window.steam_plan()
    assert add == [] and [g.title for g in remove] == ["Two"]
    window.on_update_steam()
    _wait(window, qapp)
    assert shortcuts.in_steam(folders["steam_dir"]) == {} and "1 taken out" in window.running.text()
    window.close()


def test_a_shortcut_of_a_game_no_longer_found_is_taken_out(qapp, folders):
    _install(folders["home"])
    gone = Game(Path("/old/games/gone.gba"), "Gone")
    steam.write_shortcuts(folders["steam_dir"], shortcuts.changes([gone], [], folders["run"], Path("/i.png"), {},
                                                                  art=False))
    window = _window(folders)
    add, remove = window.steam_plan()
    assert add == [] and [(str(g.file), g.title) for g in remove] == [(str(gone.file), "[GBA] Gone")]
    assert window.steam_button.isEnabled()
    window.close()


def test_games_need_mgba_for_game_mode(qapp, folders, tmp_path):
    window = _window(folders)
    window.add_folder(tmp_path / "games")
    window.table.item(0, 0).setCheckState(Qt.CheckState.Checked)
    window.on_update_steam()
    assert "Install mGBA first" in window.running.text() and not window.worker.running
    window.close()


def test_no_steam_game_mode_or_no_wrapper(qapp, folders, tmp_path, monkeypatch):
    _install(folders["home"])
    monkeypatch.setattr(steam, "find_steam", lambda: None)                       # None: looked up, and not found
    window = _window({**folders, "steam_dir": None})
    window.add_folder(tmp_path / "games")
    window.table.item(0, 0).setCheckState(Qt.CheckState.Checked)
    assert not window.steam_button.isEnabled() and "never started" in window.steam_button.toolTip()
    window.close()
    monkeypatch.setenv("XDG_CURRENT_DESKTOP", "gamescope")
    window = _window(folders)
    window.table.item(0, 0).setCheckState(Qt.CheckState.Checked)
    assert not window.steam_button.isEnabled() and "Desktop Mode" in window.steam_button.toolTip()
    window.close()
    monkeypatch.setenv("XDG_CURRENT_DESKTOP", "KDE")
    folders["run"].unlink()
    window = _window(folders)
    window.table.item(0, 0).setCheckState(Qt.CheckState.Checked)
    window.on_update_steam()
    assert "install mGBA Manager through the portal first" in window.running.text()
    assert not window.worker.running
    window.close()


def test_the_blue_look(qapp, folders):
    _install(folders["home"])
    window = _window(folders)
    assert style.BLUE in window.styleSheet()
    assert window.install_button.property("primary") and window.steam_button.property("primary")
    assert style.BLUE in window.emulator_box.styleSheet()
    assert f"color:{style.BLUE}" in window.emulator_state.text()                   # the release link
    steps = (window.install_button, window.remove_button, window.folder_button, window.forget_button)
    assert len({(b.width(), b.height()) for b in steps}) == 1                       # one size, padding included
    window.close()


def test_a_newer_mgba_is_mentioned(qapp, folders):
    from bc250_core.updates import ReleaseInfo
    _install(folders["home"])
    release = ReleaseInfo("0.11.0", "0.11.0", "https://github.com/mgba-emu/mgba/releases/tag/0.11.0", "2026-11-30")
    window = _window(folders, newer_release=lambda: release)
    deadline = time.monotonic() + 10
    while window.newer is None and time.monotonic() < deadline:
        qapp.processEvents()
        time.sleep(0.01)
    text = window.emulator_state.text()
    assert "mGBA 0.11.0 is out (2026-11-30)" in text and "releases/tag/0.11.0" in text
    assert window.install_button.isEnabled() is False                              # it never installs that one
    window.close()
