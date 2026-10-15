# SPDX-License-Identifier: GPL-3.0-or-later
"""The window on folders made in a temp folder: the states before and after installing, the games in the table, the
plan for Game Mode, installing through the worker, Steam's shortcuts changed with a fake "close Steam", and the
blue look."""

from __future__ import annotations

import hashlib
import io
import json
import time
import zipfile
from pathlib import Path

import pytest
from PyQt6.QtCore import Qt
from PyQt6.QtWidgets import QMessageBox

from conftest import make_game

from bc250_core import steam
from bc250_shadps4_manager import LOGO_PATH, emulator, shortcuts, style, userdata
from bc250_shadps4_manager.games import Game
from bc250_shadps4_manager.main_window import MainWindow


@pytest.fixture
def folders(tmp_path):
    games = tmp_path / "games"
    make_game(games / "one", "One", "CUSA00001")
    make_game(games / "two", "Two", "CUSA00002")
    shad = tmp_path / "shadPS4"
    shad.mkdir()
    (shad / "config.json").write_text(json.dumps({"General": {"install_dirs": [{"enabled": True,
                                                                                 "path": str(games)}]}}))
    config = tmp_path / "Steam" / "userdata" / "1000" / "config"
    config.mkdir(parents=True)
    run = tmp_path / "bin" / "bc250-shadps4-run"
    run.parent.mkdir()
    run.write_text("#!/bin/sh\n")
    return {"home": tmp_path / "emulator", "shad_home": shad, "steam_dir": tmp_path / "Steam", "run": run}


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
    kwargs.setdefault("shad_running", lambda: False)
    return MainWindow(**folders, steam_closed=lambda change: (closed.append(1), change())[0] and False,
                      steam_running=lambda: False, **kwargs)


def test_before_installing(qapp, folders):
    window = _window(folders)
    assert window.pill.text() == "Not installed"
    assert "Not installed" in window.emulator_state.text()
    assert window.install_button.isEnabled() and not window.remove_button.isEnabled()
    assert not window.folder_button.isEnabled() and not window.shad_button.isEnabled()
    assert window.table.rowCount() == 2                                         # the folders are read all the same
    window.close()


def test_installed_with_games(qapp, folders):
    _install(folders["home"])
    window = _window(folders)
    assert window.pill.text() == "Modules missing"
    assert window.emulator_box.value.text() == emulator.VERSION
    assert window.modules_box.value.text() == f"0 / {len(userdata.NEEDED)}"
    assert window.games_box.value.text() == "2" and window.steam_box.value.text() == "0"
    assert [window.table.item(r, 1).text() for r in range(2)] == ["One", "Two"]
    assert window.table.item(0, 2).text() == "CUSA00001"
    assert not window.install_button.isEnabled() and window.remove_button.isEnabled()
    assert not window.play_button.isEnabled()                                   # nothing chosen yet
    window.table.selectRow(1)
    assert window.play_button.isEnabled() and window.chosen().title == "Two"
    assert not window.steam_button.isEnabled()                                  # nothing to change
    modules = folders["shad_home"] / "sys_modules"
    modules.mkdir()
    for name in userdata.NEEDED:
        (modules / name).touch()
    window.refresh()
    assert window.pill.text() == "Ready" and "All 24 modules" in window.modules_state.text()
    window.close()


def test_install_runs_off_the_window(qapp, folders, monkeypatch):
    payload = io.BytesIO()
    with zipfile.ZipFile(payload, "w") as packed:
        packed.writestr(emulator.MEMBER, "#!/bin/sh\n")
    monkeypatch.setattr(emulator, "SHA256", hashlib.sha256(payload.getvalue()).hexdigest())
    monkeypatch.setattr(QMessageBox, "question", lambda *a, **k: QMessageBox.StandardButton.Yes)
    window = _window(folders, fetch=lambda url, dest, progress=None: dest.write_bytes(payload.getvalue()))
    window.on_install()
    assert not window.install_button.isEnabled()                                # busy
    _wait(window, qapp)
    assert window.running.text() == f"shadPS4 {emulator.VERSION} is installed."
    assert window.version == emulator.VERSION and window.pill.text() == "Modules missing"
    window.close()


def test_game_mode_added_and_taken_out(qapp, folders, monkeypatch):
    _install(folders["home"])
    monkeypatch.setattr(QMessageBox, "question", lambda *a, **k: QMessageBox.StandardButton.Yes)
    closed = []
    window = _window(folders, closed=closed)
    window.table.item(0, 0).setCheckState(Qt.CheckState.Checked)
    assert window.steam_button.isEnabled()
    add, remove = window.steam_plan()
    assert [g.title for g in add] == ["One"] and remove == []
    window.on_update_steam()
    _wait(window, qapp)
    assert closed == [1] and window.running.text().startswith("1 game(s) in Steam")
    assert list(shortcuts.in_steam(folders["steam_dir"]).values()) == ["[PS4] One"]
    assert window.steam_box.value.text() == "1" and window.table.item(0, 0).checkState() == Qt.CheckState.Checked
    # The game's folder is gone: its shortcut is taken out with the next change.
    window.table.item(0, 0).setCheckState(Qt.CheckState.Unchecked)
    add, remove = window.steam_plan()
    assert add == [] and [g.title for g in remove] == ["One"]
    window.on_update_steam()
    _wait(window, qapp)
    assert shortcuts.in_steam(folders["steam_dir"]) == {} and "1 taken out" in window.running.text()
    window.close()


def test_a_shortcut_without_its_logo_is_brought_up_to_date(qapp, folders, monkeypatch):
    """A shortcut made before the app set a logo: Update Game Mode is on for it until the logo is there."""
    _install(folders["home"])
    game = Game(make_game(folders["shad_home"].parent / "games" / "three", "Three", "CUSA00003", pictures=True),
                "Three", "CUSA00003", "01.00")
    steam.write_shortcuts(folders["steam_dir"], shortcuts.changes([game], [], folders["run"], LOGO_PATH, {}, art=False))
    monkeypatch.setattr(QMessageBox, "question", lambda *a, **k: QMessageBox.StandardButton.Yes)
    window = _window(folders)
    assert window.no_logo == {str(game.eboot)} and window.steam_button.isEnabled()
    window.on_update_steam()
    _wait(window, qapp)
    assert window.no_logo == set() and not window.steam_button.isEnabled()
    window.close()


def test_a_shortcut_with_the_tags_of_the_old_name_is_brought_up_to_date(qapp, folders, monkeypatch):
    """A shortcut made while the app was called BC-250 shadPS4 Manager: Update Game Mode is on for it until it has
    the tags of now."""
    _install(folders["home"])
    game = Game(make_game(folders["shad_home"].parent / "games" / "four", "Four", "CUSA00004"), "Four", "CUSA00004",
                "01.00")
    old = shortcuts.entry(game, "Four", folders["run"], LOGO_PATH)
    old["tags"] = {"0": "PS4", "1": "BC-250 shadPS4 Manager"}
    steam.write_shortcuts(folders["steam_dir"], [steam.Change(old, shortcuts.for_game(game))])
    monkeypatch.setattr(QMessageBox, "question", lambda *a, **k: QMessageBox.StandardButton.Yes)
    window = _window(folders)
    assert window.old_tags == {str(game.eboot)} and window.steam_button.isEnabled()
    window.on_update_steam()
    _wait(window, qapp)
    assert window.old_tags == set() and not window.steam_button.isEnabled()
    assert list(steam.shortcuts(folders["steam_dir"])[0]["tags"].values()) == list(shortcuts.TAGS)
    window.close()


def test_a_shortcut_named_before_the_system_prefix_is_renamed(qapp, folders, monkeypatch):
    """A shortcut named by the title alone, as before "[PS4] ": Update Game Mode is on for it and renames it, with
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
    assert item["AppName"] == f"[PS4] {game.title}" and item["LastPlayTime"] == 1750000000
    assert not list((config / "grid").glob(f"{old.number}*")) and not window.steam_button.isEnabled()
    window.close()


def test_a_shortcut_of_a_game_no_longer_found_is_taken_out(qapp, folders):
    _install(folders["home"])
    gone = shortcuts.Game(Path("/old/games/gone/eboot.bin"), "Gone")
    steam.write_shortcuts(folders["steam_dir"], shortcuts.changes([gone], [], folders["run"], Path("/i.png"), {},
                                                                  art=False))
    window = _window(folders)
    add, remove = window.steam_plan()
    assert add == [] and [(str(g.eboot), g.title) for g in remove] == [("/old/games/gone/eboot.bin", "[PS4] Gone")]
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
    assert "install shadPS4 Manager through the portal first" in window.running.text()
    assert not window.worker.running
    window.close()


def test_add_folder_through_shadps4(qapp, folders, tmp_path):
    _install(folders["home"])
    log = tmp_path / "args"
    folders["run"].write_text(f'#!/bin/sh\necho "$@" > "{log}"\n')
    folders["run"].chmod(0o755)
    window = _window(folders)
    window.add_folder(tmp_path / "more games")
    assert log.read_text().strip() == f"--add-game-folder {tmp_path / 'more games'}"
    assert window.running.text().endswith("is a game folder now.")
    folders["run"].write_text("#!/bin/sh\necho no >&2\nexit 3\n")
    window.add_folder(tmp_path / "x")
    assert "exit code 3" in window.running.text() and "no" in window.running.text()
    window.close()


def test_the_blue_look(qapp, folders):
    _install(folders["home"])
    window = _window(folders)
    assert style.BLUE in window.styleSheet()
    assert window.install_button.property("primary") and window.steam_button.property("primary")
    assert style.BLUE in window.emulator_box.styleSheet()
    assert f"color:{style.BLUE}" in window.emulator_state.text()                   # the release notes link
    steps = (window.install_button, window.remove_button, window.modules_button, window.folder_button)
    assert len({(b.width(), b.height()) for b in steps}) == 1                       # one size, padding included
    assert window.install_button.width() >= window.install_button.sizeHint().width()
    window.close()


def test_the_nightly_channel(qapp, folders, monkeypatch):
    payload = io.BytesIO()
    with zipfile.ZipFile(payload, "w") as packed:
        packed.writestr(emulator.MEMBER, b"#!/bin/sh\necho nightly\n")
    payload = payload.getvalue()
    nightly = emulator.Nightly("2026-10-15-b2d7ec7", "Pre-release-shadPS4-2026-10-15-b2d7ec7d31f9",
                               "https://github.com/x/nightly.zip", "shadps4-linux-sdl-2026-10-15-b2d7ec7.zip",
                               hashlib.sha256(payload).hexdigest(), len(payload), "2026-10-15",
                               "https://github.com/shadps4-emu/shadPS4/releases/tag/Pre-release-shadPS4")
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
    assert window.running.text() == "shadPS4 nightly 2026-10-15-b2d7ec7 is installed."
    assert window.version == "2026-10-15-b2d7ec7"
    deadline = time.monotonic() + 10
    while window.latest is None and time.monotonic() < deadline:                # the open check, off the thread
        qapp.processEvents()
        time.sleep(0.01)
    window._show_state()
    assert "shadPS4 nightly 2026-10-15-b2d7ec7 is installed" in window.emulator_state.text()
    assert not window.install_button.isEnabled()                                # already the newest nightly
    window.close()
    window = _window(folders, latest_nightly=lambda: nightly)                   # the channel is remembered
    assert window.nightly_check.isChecked()
    window.close()


def test_the_nightly_channel_says_when_a_newer_build_is_out(qapp, folders):
    _install(folders["home"])                                                   # the stable release
    nightly = emulator.Nightly("2026-10-16-fffffff", "Pre-release-shadPS4-2026-10-16-fffffff",
                               "https://github.com/x/nightly.zip", "shadps4-linux-sdl-2026-10-16-fffffff.zip",
                               "ab" * 32, 33253746, "2026-10-16",
                               "https://github.com/shadps4-emu/shadPS4/releases/tag/Pre-release-shadPS4")
    window = _window(folders, latest_nightly=lambda: nightly)
    window.nightly_check.setChecked(True)
    deadline = time.monotonic() + 10
    while window.latest is None and time.monotonic() < deadline:
        qapp.processEvents()
        time.sleep(0.01)
    window._show_state()
    text = window.emulator_state.text()
    assert f"shadPS4 {emulator.VERSION} (the stable release) is installed" in text
    assert "The newest nightly build is 2026-10-16-fffffff (2026-10-16)" in text
    assert window.install_button.isEnabled()
    # The newer-stable notice belongs to the stable channel only.
    from bc250_core.updates import ReleaseInfo
    window.newer = ReleaseInfo("0.20.0", "v.0.20.0", "https://github.com/x/v.0.20.0", "2026-11-20")
    window._show_state()
    assert "is out" not in window.emulator_state.text()
    window.nightly_check.setChecked(False)
    assert "shadPS4 0.20.0 is out" in window.emulator_state.text()
    window.close()


def test_a_newer_shadps4_is_mentioned(qapp, folders):
    from bc250_core.updates import ReleaseInfo
    _install(folders["home"])
    release = ReleaseInfo("0.20.0", "v.0.20.0", "https://github.com/shadps4-emu/shadPS4/releases/tag/v.0.20.0",
                          "2026-11-20")
    window = _window(folders, newer_release=lambda: release)
    deadline = time.monotonic() + 10
    while window.newer is None and time.monotonic() < deadline:
        qapp.processEvents()
        time.sleep(0.01)
    text = window.emulator_state.text()
    assert "shadPS4 0.20.0 is out (2026-11-20)" in text and "releases/tag/v.0.20.0" in text
    assert window.install_button.isEnabled() is False                              # it never installs that one
    window.close()


def test_shadnet_set_up_from_the_window(qapp, folders, monkeypatch):
    from conftest import FakeShadNet, write_shad_files
    from bc250_shadps4_manager import shadnet_dialog
    shad_files = write_shad_files(folders["shad_home"])
    fake = FakeShadNet()
    window = _window(folders, shadnet_connect=fake.connect)
    assert window.shadnet_state.text().startswith("Off.") and window.shadnet_button.isEnabled()
    dialogs = []

    def fill_in(dialog):
        dialogs.append(dialog)
        dialog.running = lambda: False
        dialog.use.setChecked(True)
        dialog.npid.setText("Player_1")
        dialog.password.setText("secret")
        dialog.email.setText("me@example.com")
        dialog.on_create()
        deadline = time.monotonic() + 10
        while dialog.worker.running and time.monotonic() < deadline:
            qapp.processEvents()
            time.sleep(0.01)
        qapp.processEvents()
        assert dialog.result_label.text().startswith("The account Player_1 was created on srv.shadps4.net:31313")
        dialog.on_save()
        return dialog.result()
    monkeypatch.setattr(shadnet_dialog.ShadNetDialog, "exec", fill_in)
    window.on_shadnet()
    assert fake.requests[0][1] == {1: "Player_1", 2: "secret", 4: "me@example.com"}
    assert window.shadnet_state.text() == ("On: <b>Player_1</b> (shadPS4) signs in to srv.shadps4.net:31313 when "
                                           "a game starts.")
    assert userdata.shadnet_on(userdata.read_config(shad_files))
    window.close()


def test_shadnet_not_saved_while_shadps4_runs(qapp, shad_files):
    from bc250_shadps4_manager.shadnet_dialog import ShadNetDialog
    dialog = ShadNetDialog(shad_files, userdata.read_config(shad_files), userdata.read_users(shad_files),
                           running=lambda: True)
    assert not dialog.create_button.isEnabled() and dialog.save_button.isEnabled()   # off, no account: can save
    dialog.use.setChecked(True)
    assert not dialog.save_button.isEnabled()                                       # on needs an account
    dialog.npid.setText("Player_1")
    dialog.password.setText("secret")
    dialog.on_save()
    assert "close it first" in dialog.result_label.text() and not userdata.read_users(shad_files)[0].npid
    dialog.npid.setText("x")
    dialog.on_try()
    assert dialog.result_label.text().startswith("A shadNet name has 3 to 16")
    dialog.close()


def _shadnet_on(folders) -> Path:
    from conftest import write_shad_files
    home = write_shad_files(folders["shad_home"])
    userdata.save_shadnet(home, 1000, "Player_1", "secret", "", True, "srv.example:31313")
    return home


def _pill(window, qapp, text: str) -> bool:
    deadline = time.monotonic() + 10
    while window.shadnet_pill.text() != text and time.monotonic() < deadline:
        qapp.processEvents()
        time.sleep(0.01)
    return window.shadnet_pill.text() == text


def test_shadnet_pill_off_online_offline(qapp, folders):
    from conftest import FakeShadNet
    window = _window(folders)
    assert window.shadnet_pill.text() == "shadNet Off" and window.shadnet_pill.kind == "neutral"
    window.close()
    _shadnet_on(folders)
    fake = FakeShadNet()
    window = _window(folders, shadnet_connect=fake.connect)
    assert _pill(window, qapp, "shadNet Online") and window.shadnet_pill.kind == "ok"
    assert "signs in as Player_1" in window.shadnet_pill.toolTip() and fake.requests == []   # no sign-in
    window.close()

    def refused(address, timeout):
        raise ConnectionRefusedError(111, "Connection refused")
    window = _window(folders, shadnet_connect=refused)
    assert _pill(window, qapp, "shadNet Offline") and window.shadnet_pill.kind == "bad"
    assert "could not be reached: Connection refused" in window.shadnet_pill.toolTip()
    window.close()


def test_shadnet_pill_from_shadps4_while_it_runs(qapp, folders):
    home = _shadnet_on(folders)
    (home / "log").mkdir()
    log = home / "log" / "CUSA11624.log"
    log.write_text("[ShadNet] <Info> (shadPS4:ShadNet) client.cpp:703 HandleLoginReply: Logged in npid='Player_1'\n")
    running = [True]

    def nowhere(address, timeout):
        raise AssertionError("no server check while shadPS4 runs")
    window = _window(folders, shad_running=lambda: running[0], shadnet_connect=nowhere)
    assert window.shadnet_pill.text() == "shadNet Online" and "signed in to srv.example:31313 as Player_1" in \
        window.shadnet_pill.toolTip()
    assert window.shadnet_watch.isActive()
    log.write_text("[ShadNet] <Error> (shadPS4:ShadNet) client.cpp:740 HandleLoginReply: Login rejected error code 8\n")
    window._watch_shadnet()
    assert window.shadnet_pill.text() == "shadNet Offline"
    assert window.shadnet_pill.toolTip() == "shadPS4's sign-in was refused: the password is wrong."
    window.close()
