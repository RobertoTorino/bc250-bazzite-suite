# SPDX-License-Identifier: GPL-3.0-or-later
"""The window on folders made in a temp folder: the states before and after installing, the firmware, the games in
the table, the game folders, the plan for Game Mode, installing through the worker, Steam's shortcuts changed with a
fake "close Steam", and the indigo look."""

from __future__ import annotations

import hashlib
import time
from pathlib import Path

import pytest
from PyQt6.QtCore import Qt
from PyQt6.QtWidgets import QMessageBox

from conftest import make_disc_game, make_hdd_game, write_rpcs3_files

from bc250_core import steam
from bc250_rpcs3_manager import emulator, shortcuts, style
from bc250_rpcs3_manager.games import Game
from bc250_rpcs3_manager.main_window import MainWindow


@pytest.fixture
def folders(tmp_path):
    rpcs3 = write_rpcs3_files(tmp_path / "rpcs3", firmware=None)
    make_hdd_game(rpcs3 / "dev_hdd0" / "game" / "NPUB00002", "Two", "NPUB00002")
    make_disc_game(tmp_path / "games" / "one", "One", "BLUS00001")
    config = tmp_path / "Steam" / "userdata" / "1000" / "config"
    config.mkdir(parents=True)
    run = tmp_path / "bin" / "bc250-rpcs3-run"
    run.parent.mkdir()
    run.write_text("#!/bin/sh\n")
    return {"home": tmp_path / "emulator", "rpcs3_home": rpcs3, "steam_dir": tmp_path / "Steam", "run": run}


@pytest.fixture(autouse=True)
def pinned_size(monkeypatch):
    """The AppImage _install() writes (empty) is the pinned build's size."""
    monkeypatch.setattr(emulator, "SIZE", 0)


def _install(home: Path) -> None:
    (home / emulator.VERSION).mkdir(parents=True)
    (home / emulator.VERSION / emulator.MEMBER).write_text("")
    (home / "current").symlink_to(emulator.VERSION)


def _firmware(rpcs3: Path, text: str = "release:04.9200:\n") -> None:
    version = rpcs3 / "dev_flash" / "vsh" / "etc" / "version.txt"
    version.parent.mkdir(parents=True, exist_ok=True)
    version.write_text(text)


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


def test_before_installing(qapp, folders):
    window = _window(folders)
    assert window.pill.text() == "Not installed"
    assert "Not installed" in window.emulator_state.text() and "Not installed" in window.firmware_state.text()
    assert window.install_button.isEnabled() and not window.remove_button.isEnabled()
    assert not window.firmware_button.isEnabled() and not window.rpcs3_button.isEnabled()
    assert window.folder_button.isEnabled() and not window.forget_button.isEnabled()
    assert [window.table.item(r, 1).text() for r in range(window.table.rowCount())] == ["Two"]   # RPCS3's own
    window.close()


def test_installed_with_firmware_and_games(qapp, folders):
    _install(folders["home"])
    window = _window(folders)
    assert window.pill.text() == "No firmware" and window.firmware_box.value.text() == "—"
    assert window.firmware_button.isEnabled()
    assert "playstation.com" in window.firmware_state.text()
    assert "the firmware <a href=" in window.firmware_state.text() and ">here</a> (official page)" in \
        window.firmware_state.text()
    _firmware(folders["rpcs3_home"])
    window.refresh()
    assert window.pill.text() == "Ready" and window.firmware_box.value.text() == "4.92"
    assert "PS3 firmware 4.92 is installed" in window.firmware_state.text()
    assert window.emulator_box.value.text() == emulator.LANDMARK
    assert window.games_box.value.text() == "1" and window.steam_box.value.text() == "0"
    assert not window.install_button.isEnabled() and window.remove_button.isEnabled()
    assert not window.play_button.isEnabled()                                   # nothing chosen yet
    window.table.selectRow(0)
    assert window.play_button.isEnabled() and window.chosen().title == "Two"
    assert not window.steam_button.isEnabled()                                  # nothing to change
    window.close()


def test_rpcs3_updated_itself(qapp, folders):
    _install(folders["home"])
    emulator.appimage(folders["home"]).write_bytes(b"another build")
    window = _window(folders)
    assert "updated itself" in window.emulator_state.text() and window.emulator_box.value.text() == "other"
    assert window.install_button.isEnabled()                                    # puts the pinned build back
    window.close()


def test_game_folders_added_and_removed(qapp, folders, tmp_path):
    _install(folders["home"])
    window = _window(folders)
    window.add_folder(tmp_path / "games")
    assert window.running.text() == f"{tmp_path / 'games'} is a game folder now: 1 game(s) in it."
    assert [window.table.item(r, 1).text() for r in range(2)] == ["One", "Two"]
    assert window.table.item(0, 2).text() == "BLUS00001" and window.forget_button.isEnabled()
    window.add_folder(tmp_path / "games")                                       # once only
    assert window.folders == [tmp_path / "games"]
    window.close()
    window = _window(folders)                                                   # remembered
    assert window.folders == [tmp_path / "games"] and window.games_box.value.text() == "2"
    window.forget_folder(tmp_path / "games")
    assert window.folders == [] and window.table.rowCount() == 1 and not window.forget_button.isEnabled()
    window.close()


def test_a_disc_game_rpcs3_cannot_start(qapp, folders, tmp_path):
    _install(folders["home"])
    (tmp_path / "games" / "one" / "PS3_DISC.SFB").unlink()
    window = _window(folders)
    window.add_folder(tmp_path / "games")
    folder = window.table.item(0, 4)
    assert "PS3_DISC.SFB" in folder.toolTip() and folder.foreground().color().name() == "#c62828"
    window.table.selectRow(0)
    window.on_play()
    assert window.running.text().startswith("One: PS3_DISC.SFB is missing")
    window.close()


def test_install_runs_off_the_window(qapp, folders, monkeypatch):
    payload = b"#!/bin/sh\n"
    monkeypatch.setattr(emulator, "SHA256", hashlib.sha256(payload).hexdigest())
    monkeypatch.setattr(emulator, "SIZE", len(payload))
    monkeypatch.setattr(QMessageBox, "question", lambda *a, **k: QMessageBox.StandardButton.Yes)
    window = _window(folders, fetch=lambda url, dest, progress=None: dest.write_bytes(payload))
    window.on_install()
    assert not window.install_button.isEnabled()                                # busy
    _wait(window, qapp)
    assert window.running.text() == f"RPCS3 {emulator.VERSION} is installed."
    assert window.version == emulator.VERSION and window.pill.text() == "No firmware"
    window.close()


def test_the_firmware_installed_through_rpcs3(qapp, folders, tmp_path):
    _install(folders["home"])
    log = tmp_path / "args"
    folders["run"].write_text(f'#!/bin/sh\necho "$@" > "{log}"\n')
    folders["run"].chmod(0o755)
    window = _window(folders)
    pup = tmp_path / "PS3UPDAT.PUP"
    window.install_firmware(pup)
    deadline = time.monotonic() + 10
    while not log.exists() and time.monotonic() < deadline:
        time.sleep(0.01)
    assert log.read_text().strip() == f"--installfw {pup}"
    assert window.firmware_watch.isActive() and "in its own window" in window.running.text()
    window._watch_firmware()
    assert window.firmware_watch.isActive() and window.firmware == ""         # not there yet
    _firmware(folders["rpcs3_home"])
    window._watch_firmware()
    assert not window.firmware_watch.isActive() and window.firmware == "4.92"
    assert window.running.text() == "PS3 firmware 4.92 is installed."
    window.close()


def test_play_and_rpcs3s_window(qapp, folders, tmp_path):
    _install(folders["home"])
    log = tmp_path / "args"
    folders["run"].write_text(f'#!/bin/sh\necho "$@" >> "{log}"\n')
    folders["run"].chmod(0o755)
    window = _window(folders)
    window.table.selectRow(0)
    window.on_play()
    window.on_open_rpcs3()
    deadline = time.monotonic() + 10
    while (not log.exists() or len(log.read_text().splitlines()) < 2) and time.monotonic() < deadline:
        time.sleep(0.01)
    eboot = folders["rpcs3_home"] / "dev_hdd0" / "game" / "NPUB00002" / "USRDIR" / "EBOOT.BIN"
    assert sorted(log.read_text().splitlines()) == sorted([f"--no-gui {eboot}", ""])
    assert window.running.text() == "Started Two."
    window.close()


def test_game_mode_added_and_taken_out(qapp, folders, monkeypatch):
    _install(folders["home"])
    monkeypatch.setattr(QMessageBox, "question", lambda *a, **k: QMessageBox.StandardButton.Yes)
    closed = []
    window = _window(folders, closed=closed)
    window.table.item(0, 0).setCheckState(Qt.CheckState.Checked)
    assert window.steam_button.isEnabled()
    add, remove = window.steam_plan()
    assert [g.title for g in add] == ["Two"] and remove == []
    window.on_update_steam()
    _wait(window, qapp)
    assert closed == [1] and window.running.text().startswith("1 game(s) in Steam")
    assert list(shortcuts.in_steam(folders["steam_dir"]).values()) == ["[PS3] Two"]
    assert window.steam_box.value.text() == "1" and window.table.item(0, 0).checkState() == Qt.CheckState.Checked
    window.table.item(0, 0).setCheckState(Qt.CheckState.Unchecked)
    add, remove = window.steam_plan()
    assert add == [] and [g.title for g in remove] == ["Two"]
    window.on_update_steam()
    _wait(window, qapp)
    assert shortcuts.in_steam(folders["steam_dir"]) == {} and "1 taken out" in window.running.text()
    window.close()


def test_a_shortcut_named_before_the_system_prefix_is_renamed(qapp, folders, monkeypatch):
    """A shortcut named by the title alone, as before "[PS3] ": Update Game Mode is on for it and renames it, with
    its play time; the artwork under its old number goes."""
    _install(folders["home"])
    monkeypatch.setattr(QMessageBox, "question", lambda *a, **k: QMessageBox.StandardButton.Yes)
    window = _window(folders)
    game = window.games[0]
    old = steam.Change(shortcuts.entry(game, game.title, folders["run"], Path("/i.png")), shortcuts.for_game(game),
                       {"p": b"P"})
    steam.write_shortcuts(folders["steam_dir"], [old])
    config = steam.user_folders(folders["steam_dir"])[0]
    values = steam.read_vdf((config / "shortcuts.vdf").read_bytes())
    values["shortcuts"]["0"]["LastPlayTime"] = 1750000000
    (config / "shortcuts.vdf").write_bytes(steam.write_vdf(values))
    window.refresh()
    assert window.table.item(0, 0).checkState() == Qt.CheckState.Checked and window.steam_button.isEnabled()
    window.on_update_steam()
    _wait(window, qapp)
    [item] = steam.shortcuts(folders["steam_dir"])
    assert item["AppName"] == f"[PS3] {game.title}" and item["LastPlayTime"] == 1750000000
    assert not list((config / "grid").glob(f"{old.number}*")) and not window.steam_button.isEnabled()
    window.close()


def test_a_shortcut_of_a_game_no_longer_found_is_taken_out(qapp, folders):
    _install(folders["home"])
    gone = Game(Path("/old/games/gone/PS3_GAME/USRDIR/EBOOT.BIN"), "Gone", disc=True)
    steam.write_shortcuts(folders["steam_dir"], shortcuts.changes([gone], [], folders["run"], Path("/i.png"), {},
                                                                  art=False))
    window = _window(folders)
    add, remove = window.steam_plan()
    assert add == [] and [(str(g.eboot), g.title) for g in remove] == [(str(gone.eboot), "[PS3] Gone")]
    assert window.steam_button.isEnabled()
    window.close()


def test_no_steam_game_mode_or_no_wrapper(qapp, folders, monkeypatch):
    _install(folders["home"])
    monkeypatch.setattr(steam, "find_steam", lambda: None)                       # None: looked up, and not found
    window = _window({**folders, "steam_dir": None})
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
    assert "install RPCS3 Manager through the portal first" in window.running.text()
    assert not window.worker.running
    window.close()


def test_the_indigo_look(qapp, folders):
    _install(folders["home"])
    window = _window(folders)
    assert style.INDIGO in window.styleSheet()
    assert window.install_button.property("primary") and window.steam_button.property("primary")
    assert style.INDIGO in window.emulator_box.styleSheet()
    assert f"color:{style.INDIGO}" in window.emulator_state.text()                 # the release link
    steps = (window.install_button, window.remove_button, window.firmware_button, window.folder_button,
             window.forget_button)
    assert len({(b.width(), b.height()) for b in steps}) == 1                       # one size, padding included
    assert window.firmware_button.width() >= window.firmware_button.sizeHint().width()
    window.close()


def test_a_newer_rpcs3_is_mentioned(qapp, folders):
    from bc250_core.updates import ReleaseInfo
    _install(folders["home"])
    release = ReleaseInfo("0.0.44", "v0.0.44", "https://github.com/RPCS3/rpcs3/releases/tag/v0.0.44", "2026-11-30")
    window = _window(folders, newer_release=lambda: release)
    deadline = time.monotonic() + 10
    while window.newer is None and time.monotonic() < deadline:
        qapp.processEvents()
        time.sleep(0.01)
    text = window.emulator_state.text()
    assert "RPCS3 0.0.44 is out (2026-11-30)" in text and "releases/tag/v0.0.44" in text
    assert window.install_button.isEnabled() is False                              # it never installs that one
    window.close()
