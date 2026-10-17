# SPDX-License-Identifier: GPL-3.0-or-later
"""The window on folders made in a temp folder: the states before and after installing, the BIOS step, the games in
the table, the game folders, the plan for Game Mode, installing through the worker, Steam's shortcuts changed with a
fake "close Steam", and the blue look."""

from __future__ import annotations

import hashlib
import time
from pathlib import Path

import pytest
from PyQt6.QtCore import Qt
from PyQt6.QtWidgets import QMessageBox

from conftest import make_bios, make_disc

from bc250_core import steam
from bc250_pcsx2_manager import emulator, shortcuts, style
from bc250_pcsx2_manager.games import Game
from bc250_pcsx2_manager.main_window import MainWindow
from bc250_pcsx2_manager.userdata import bios_dir


@pytest.fixture
def folders(tmp_path):
    pcsx2 = tmp_path / "PCSX2"
    pcsx2.mkdir()
    make_disc(tmp_path / "games" / "Two.iso", "SLUS_000.02")
    config = tmp_path / "Steam" / "userdata" / "1000" / "config"
    config.mkdir(parents=True)
    run = tmp_path / "bin" / "bc250-pcsx2-run"
    run.parent.mkdir()
    run.write_text("#!/bin/sh\n")
    return {"home": tmp_path / "emulator", "pcsx2_home": pcsx2, "steam_dir": tmp_path / "Steam", "run": run}


@pytest.fixture(autouse=True)
def pinned_size(monkeypatch):
    """The AppImage _install() writes (empty) is the pinned release's size."""
    monkeypatch.setattr(emulator, "SIZE", 0)


def _install(home: Path) -> None:
    (home / emulator.VERSION).mkdir(parents=True)
    (home / emulator.VERSION / emulator.MEMBER).write_text("")
    (home / "current").symlink_to(emulator.VERSION)


def _wait(window, qapp) -> None:
    deadline = time.monotonic() + 10
    while window.worker.running and time.monotonic() < deadline:
        qapp.processEvents()
        time.sleep(0.01)
    qapp.processEvents()


def _no_nightly() -> emulator.Nightly:
    raise emulator.EmulatorError("no GitHub in a test")


def _window(folders, **kwargs) -> MainWindow:
    closed = kwargs.pop("closed", [])
    kwargs.setdefault("newer_release", lambda: None)                         # never GitHub in a test
    kwargs.setdefault("latest_nightly", _no_nightly)
    kwargs.setdefault("open_folder", lambda target: True)
    return MainWindow(**folders, steam_closed=lambda change: (closed.append(1), change())[0] and False,
                      steam_running=lambda: False, **kwargs)


def test_before_installing(qapp, folders):
    window = _window(folders)
    assert window.pill.text() == "Not installed"
    assert "Not installed" in window.emulator_state.text() and "No BIOS" in window.bios_state.text()
    assert window.install_button.isEnabled() and not window.remove_button.isEnabled()
    assert window.bios_button.isEnabled() and not window.pcsx2_button.isEnabled()
    assert window.folder_button.isEnabled() and not window.forget_button.isEnabled()
    assert window.table.rowCount() == 0                                          # no folders chosen yet
    window.close()


def test_installed_with_bios_and_games(qapp, folders, tmp_path):
    _install(folders["home"])
    window = _window(folders)
    assert window.pill.text() == "No BIOS" and window.bios_box.value.text() == "—"
    assert "pcsx2.net" in window.bios_state.text()
    make_bios(bios_dir(folders["pcsx2_home"]))
    window.add_folder(tmp_path / "games")
    assert window.pill.text() == "Ready" and window.bios_box.value.text() == "1"
    assert "SCPH-70012.bin" in window.bios_state.text()
    assert window.emulator_box.value.text() == emulator.VERSION
    assert window.games_box.value.text() == "1" and window.steam_box.value.text() == "0"
    assert not window.install_button.isEnabled() and window.remove_button.isEnabled()
    assert not window.play_button.isEnabled()                                   # nothing chosen yet
    window.table.selectRow(0)
    assert window.play_button.isEnabled() and window.chosen().title == "Two"
    assert window.table.item(0, 2).text() == "SLUS-00002"
    assert not window.steam_button.isEnabled()                                  # nothing to change
    window.close()


def test_pcsx2_updated_itself(qapp, folders):
    _install(folders["home"])
    emulator.appimage(folders["home"]).write_bytes(b"another build")
    window = _window(folders)
    assert "updated itself" in window.emulator_state.text() and window.emulator_box.value.text() == "other"
    assert window.install_button.isEnabled()                                    # puts the pinned release back
    window.close()


def test_the_bios_folder_is_opened(qapp, folders):
    opened = []
    window = _window(folders, open_folder=lambda target: (opened.append(target), True)[1])
    window.on_open_bios()
    folder = bios_dir(folders["pcsx2_home"])
    assert opened == [folder] and folder.is_dir()                               # made, so there is something to open
    assert str(folder) in window.running.text()
    window.close()


def test_game_folders_added_and_removed(qapp, folders, tmp_path):
    _install(folders["home"])
    make_disc(tmp_path / "more" / "One.iso", "SLUS_000.01")
    window = _window(folders)
    window.add_folder(tmp_path / "more")
    assert window.running.text() == f"{tmp_path / 'more'} is a game folder now: 1 game(s) in it."
    assert [window.table.item(r, 1).text() for r in range(1)] == ["One"]
    assert window.table.item(0, 2).text() == "SLUS-00001" and window.forget_button.isEnabled()
    window.add_folder(tmp_path / "more")                                        # once only
    assert window.folders == [tmp_path / "more"]
    window.close()
    window = _window(folders)                                                   # remembered
    assert window.folders == [tmp_path / "more"] and window.games_box.value.text() == "1"
    window.forget_folder(tmp_path / "more")
    assert window.folders == [] and window.table.rowCount() == 0 and not window.forget_button.isEnabled()
    window.close()


def test_a_compressed_image_is_marked(qapp, folders, tmp_path):
    _install(folders["home"])
    (tmp_path / "games" / "Lumines.chd").write_bytes(b"MComprHD")
    window = _window(folders)
    window.add_folder(tmp_path / "games")
    row = [window.table.item(r, 1).text() for r in range(window.table.rowCount())].index("Lumines")
    assert window.table.item(row, 3).text() == "CHD" and "not looked into" in window.table.item(row, 3).toolTip()
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
    assert window.running.text() == f"PCSX2 {emulator.VERSION} is installed."
    assert window.version == emulator.VERSION and window.pill.text() == "No BIOS"
    window.close()


def test_play_and_pcsx2s_window(qapp, folders, tmp_path):
    _install(folders["home"])
    log = tmp_path / "args"
    folders["run"].write_text(f'#!/bin/sh\necho "$@" >> "{log}"\n')
    folders["run"].chmod(0o755)
    window = _window(folders)
    window.add_folder(tmp_path / "games")
    window.table.selectRow(0)
    window.on_play()
    window.on_open_pcsx2()
    deadline = time.monotonic() + 10
    while (not log.exists() or len(log.read_text().splitlines()) < 2) and time.monotonic() < deadline:
        time.sleep(0.01)
    iso = tmp_path / "games" / "Two.iso"
    assert sorted(log.read_text().splitlines()) == sorted([f"-nogui -- {iso}", ""])
    assert window.running.text() == "Started Two."
    window.close()


def test_game_mode_added_and_taken_out(qapp, folders, monkeypatch, tmp_path):
    _install(folders["home"])
    monkeypatch.setattr(QMessageBox, "question", lambda *a, **k: QMessageBox.StandardButton.Yes)
    closed = []
    window = _window(folders, closed=closed)
    window.add_folder(tmp_path / "games")
    window.table.item(0, 0).setCheckState(Qt.CheckState.Checked)
    assert window.steam_button.isEnabled()
    add, remove = window.steam_plan()
    assert [g.title for g in add] == ["Two"] and remove == []
    window.on_update_steam()
    _wait(window, qapp)
    assert closed == [1] and window.running.text().startswith("1 game(s) in Steam")
    assert list(shortcuts.in_steam(folders["steam_dir"]).values()) == ["[PS2] Two"]
    assert window.steam_box.value.text() == "1" and window.table.item(0, 0).checkState() == Qt.CheckState.Checked
    window.table.item(0, 0).setCheckState(Qt.CheckState.Unchecked)
    add, remove = window.steam_plan()
    assert add == [] and [g.title for g in remove] == ["Two"]
    window.on_update_steam()
    _wait(window, qapp)
    assert shortcuts.in_steam(folders["steam_dir"]) == {} and "1 taken out" in window.running.text()
    window.close()


def test_a_shortcut_named_before_the_system_prefix_is_renamed(qapp, folders, monkeypatch, tmp_path):
    """A shortcut named by the title alone, as before "[PS2] ": Update Game Mode is on for it and renames it, with
    its play time; the artwork under its old number goes."""
    _install(folders["home"])
    monkeypatch.setattr(QMessageBox, "question", lambda *a, **k: QMessageBox.StandardButton.Yes)
    window = _window(folders)
    window.add_folder(tmp_path / "games")
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
    assert item["AppName"] == f"[PS2] {game.title}" and item["LastPlayTime"] == 1750000000
    assert not list((config / "grid").glob(f"{old.number}*")) and not window.steam_button.isEnabled()
    window.close()


def test_a_shortcut_of_a_game_no_longer_found_is_taken_out(qapp, folders):
    _install(folders["home"])
    gone = Game(Path("/old/games/gone.iso"), "Gone")
    steam.write_shortcuts(folders["steam_dir"], shortcuts.changes([gone], [], folders["run"], Path("/i.png"), {},
                                                                  art=False))
    window = _window(folders)
    add, remove = window.steam_plan()
    assert add == [] and [(str(g.file), g.title) for g in remove] == [(str(gone.file), "[PS2] Gone")]
    assert window.steam_button.isEnabled()
    window.close()


def test_no_steam_game_mode_or_no_wrapper(qapp, folders, monkeypatch, tmp_path):
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
    assert "install PCSX2 Manager through the portal first" in window.running.text()
    assert not window.worker.running
    window.close()


def test_the_blue_look(qapp, folders):
    _install(folders["home"])
    window = _window(folders)
    assert style.BLUE in window.styleSheet()
    assert window.install_button.property("primary") and window.steam_button.property("primary")
    assert style.BLUE in window.emulator_box.styleSheet()
    assert f"color:{style.BLUE}" in window.emulator_state.text()                   # the release link
    steps = (window.install_button, window.remove_button, window.bios_button, window.folder_button,
             window.forget_button)
    assert len({(b.width(), b.height()) for b in steps}) == 1                       # one size, padding included
    assert window.bios_button.width() >= window.bios_button.sizeHint().width()
    window.close()


def test_the_nightly_channel(qapp, folders, monkeypatch):
    payload = b"#!/bin/sh\necho nightly\n"
    nightly = emulator.Nightly("2.9.127", "v2.9.127", "https://github.com/x/pcsx2.AppImage",
                               hashlib.sha256(payload).hexdigest(), len(payload), "2026-10-13",
                               "https://github.com/PCSX2/pcsx2/releases/tag/v2.9.127")
    monkeypatch.setattr(QMessageBox, "question", lambda *a, **k: QMessageBox.StandardButton.Yes)
    window = _window(folders, latest_nightly=lambda: nightly,
                     fetch=lambda url, dest, progress=None: dest.write_bytes(payload))
    assert not window.nightly_check.isChecked()                                 # the tested stable is the default
    window.nightly_check.setChecked(True)
    assert window.settings.get("nightly") is True
    assert "newest nightly build" in window.emulator_state.text()
    assert "not the release this app was tried with" in window.emulator_state.text()
    assert window.install_button.isEnabled()
    window.on_install()
    _wait(window, qapp)
    assert window.running.text() == "PCSX2 nightly 2.9.127 is installed."
    assert window.version == "2.9.127" and window.emulator_box.value.text() == "2.9.127"
    deadline = time.monotonic() + 10
    while window.latest is None and time.monotonic() < deadline:                # the open check, off the thread
        qapp.processEvents()
        time.sleep(0.01)
    window._show_state()
    assert "PCSX2 nightly 2.9.127 is installed" in window.emulator_state.text()
    assert "releases/tag/v2.9.127" in window.emulator_state.text()
    assert not window.install_button.isEnabled()                                # already the newest nightly
    window.close()
    window = _window(folders, latest_nightly=lambda: nightly)                   # the channel is remembered
    assert window.nightly_check.isChecked()
    window.close()


def test_the_nightly_channel_says_when_a_newer_build_is_out(qapp, folders):
    _install(folders["home"])                                                   # the stable 2.8.2
    nightly = emulator.Nightly("2.9.128", "v2.9.128", "https://github.com/x/pcsx2.AppImage", "ab" * 32,
                               60406264, "2026-10-14", "https://github.com/PCSX2/pcsx2/releases/tag/v2.9.128")
    window = _window(folders, latest_nightly=lambda: nightly)
    window.nightly_check.setChecked(True)
    deadline = time.monotonic() + 10
    while window.latest is None and time.monotonic() < deadline:
        qapp.processEvents()
        time.sleep(0.01)
    window._show_state()
    text = window.emulator_state.text()
    assert "PCSX2 2.8.2 (the stable release) is installed" in text
    assert "The newest nightly build is 2.9.128 (2026-10-14)" in text
    assert window.install_button.isEnabled()
    # The newer-stable notice belongs to the stable channel only.
    from bc250_core.updates import ReleaseInfo
    window.newer = ReleaseInfo("2.9.0", "v2.9.0", "https://github.com/PCSX2/pcsx2/releases/tag/v2.9.0", "2026-11-30")
    window._show_state()
    assert "is out" not in window.emulator_state.text()
    window.nightly_check.setChecked(False)
    assert "PCSX2 2.9.0 is out" in window.emulator_state.text()
    window.close()


def test_a_newer_pcsx2_is_mentioned(qapp, folders):
    from bc250_core.updates import ReleaseInfo
    _install(folders["home"])
    release = ReleaseInfo("2.9.0", "v2.9.0", "https://github.com/PCSX2/pcsx2/releases/tag/v2.9.0", "2026-11-30")
    window = _window(folders, newer_release=lambda: release)
    deadline = time.monotonic() + 10
    while window.newer is None and time.monotonic() < deadline:
        qapp.processEvents()
        time.sleep(0.01)
    text = window.emulator_state.text()
    assert "PCSX2 2.9.0 is out (2026-11-30)" in text and "releases/tag/v2.9.0" in text
    assert window.install_button.isEnabled() is False                              # it never installs that one
    window.close()
