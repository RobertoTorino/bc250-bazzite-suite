# SPDX-License-Identifier: GPL-3.0-or-later
"""The window on folders made in a temp folder: the states before and after installing, the BIOS, the games in the
table, the game folders, the plan for Game Mode, installing through the worker with a fake flatpak, Steam's shortcuts
changed with a fake "close Steam", a newer core, and the blue look."""

from __future__ import annotations

import time
import zipfile
from pathlib import Path

import pytest
from PyQt6.QtCore import Qt
from PyQt6.QtWidgets import QMessageBox

from conftest import make_cue, make_disc, make_retroarch

from bc250_core import steam
from swanstation_manager import emulator, shortcuts, style
from swanstation_manager.games import Game
from swanstation_manager.main_window import MainWindow

LIBRARY = b"\x7fELF\x02\x01\x01" + b"\0" * 9 + (3).to_bytes(2, "little") + (0x3E).to_bytes(2, "little") + b"\0" * 64
HEADERS = {"etag": '"1"', "last-modified": "Tue, 20 Oct 2026 04:27:08 GMT"}


class Flatpak:
    """A fake flatpak: knows whether RetroArch is installed, and installs it."""

    def __init__(self, installed: bool = True):
        self.installed, self.calls = installed, []

    def __call__(self, command: list[str]) -> tuple[int, str]:
        self.calls.append(command)
        if command[:2] == ["flatpak", "info"]:
            return (0, "          ID: org.libretro.RetroArch\n     Version: 1.22.2\n") if self.installed \
                else (1, "error: not installed")
        if command[:2] == ["flatpak", "install"]:
            self.installed = True
        return 0, ""


@pytest.fixture
def folders(tmp_path):
    make_disc(tmp_path / "games" / "One.iso", disc_id="SLUS_000.01")
    make_cue(tmp_path / "games", "Two", "SLUS_000.02")
    config = tmp_path / "Steam" / "userdata" / "1000" / "config"
    config.mkdir(parents=True)
    run = tmp_path / "bin" / "bc250-swanstation-run"
    run.parent.mkdir()
    run.write_text("#!/bin/sh\n")
    return {"home": tmp_path / "emulator", "retroarch": tmp_path / "retroarch", "steam_dir": tmp_path / "Steam",
            "run": run}


def _install(home: Path) -> None:
    (home / "core").mkdir(parents=True)
    emulator.core_file(home).write_text("")
    (home / "core" / "core.json").write_text('{"build": "2026-10-21", "etag": "\\"1\\"", "modified": ""}')


def _zip(url: str, dest: Path, progress=None) -> None:
    with zipfile.ZipFile(dest, "w") as bundle:
        bundle.writestr(zipfile.ZipInfo(emulator.MEMBER, (2026, 10, 21, 6, 24, 0)), LIBRARY)


def _wait(window, qapp) -> None:
    deadline = time.monotonic() + 10
    while window.worker.running and time.monotonic() < deadline:
        qapp.processEvents()
        time.sleep(0.01)
    qapp.processEvents()


def _window(folders, **kwargs) -> MainWindow:
    closed = kwargs.pop("closed", [])
    kwargs.setdefault("flatpak", Flatpak())
    kwargs.setdefault("head_of", lambda url: dict(HEADERS))                           # never the buildbot in a test
    return MainWindow(**folders, steam_closed=lambda change: (closed.append(1), change())[0] and False,
                      steam_running=lambda: False, open_folder=lambda folder: True, **kwargs)


def _titles(window) -> list[str]:
    return [window.table.item(r, 1).text() for r in range(window.table.rowCount())]


def test_before_installing(qapp, folders):
    window = _window(folders, flatpak=Flatpak(installed=False))
    assert window.pill.text() == "Not installed"
    assert "Not installed: RetroArch and the SwanStation core" in window.emulator_state.text()
    assert window.install_button.isEnabled() and not window.remove_button.isEnabled()
    assert not window.retroarch_button.isEnabled() and not window.play_button.isEnabled()
    assert window.folder_button.isEnabled() and not window.forget_button.isEnabled()
    assert window.table.rowCount() == 0                                              # no game folder yet
    window.close()


def test_only_the_core_is_missing(qapp, folders):
    window = _window(folders)
    assert "Not installed: the SwanStation core." in window.emulator_state.text()
    assert window.retroarch_button.isEnabled() and window.install_button.isEnabled()
    window.close()


def test_without_a_bios_and_then_with_one(qapp, folders):
    _install(folders["home"])
    window = _window(folders)
    assert window.pill.text() == "No BIOS" and window.bios_box.value.text() == "—"
    assert "No BIOS yet" in window.bios_state.text()
    make_retroarch(folders["retroarch"], ("scph5501.bin",))
    window.refresh()
    assert window.bios_box.value.text() == "1" and "scph5501.bin" in window.bios_state.text()
    assert window.pill.text() == "No games"
    window.close()


def test_open_bios_folder(qapp, folders):
    opened = []
    window = _window(folders)
    window.open_folder = lambda folder: opened.append(folder) or True
    window.on_open_bios()
    assert opened == [folders["retroarch"] / "system"] and (folders["retroarch"] / "system").is_dir()
    assert "scph5501.bin" in window.running.text()
    window.open_folder = lambda folder: False
    window.on_open_bios()
    assert "could not be opened" in window.running.text()
    window.close()


def test_installed_with_games(qapp, folders, tmp_path):
    _install(folders["home"])
    make_retroarch(folders["retroarch"], ("scph5501.bin",))
    window = _window(folders)
    window.add_folder(tmp_path / "games")
    assert window.pill.text() == "Ready" and window.emulator_box.value.text() == "2026-10-21"
    assert window.games_box.value.text() == "2" and window.steam_box.value.text() == "0"
    assert not window.install_button.isEnabled() and window.remove_button.isEnabled()
    assert not window.play_button.isEnabled()                                         # nothing chosen yet
    window.table.selectRow(0)
    assert window.play_button.isEnabled() and window.chosen().title == "One"
    assert not window.steam_button.isEnabled()                                        # nothing to change
    assert [window.table.item(r, 2).text() for r in range(2)] == ["SLUS-00001", "SLUS-00002"]
    assert [window.table.item(r, 3).text() for r in range(2)] == ["ISO", "CUE + BIN"]
    window.close()


def test_game_folders_added_and_removed(qapp, folders, tmp_path):
    window = _window(folders)
    window.add_folder(tmp_path / "games")
    assert window.running.text() == f"{tmp_path / 'games'} is a game folder now: 2 game(s) in it."
    assert _titles(window) == ["One", "Two"] and window.forget_button.isEnabled()
    window.add_folder(tmp_path / "games")                                             # once only
    assert window.folders == [tmp_path / "games"]
    window.close()
    window = _window(folders)                                                         # remembered
    assert window.folders == [tmp_path / "games"] and window.games_box.value.text() == "2"
    window.forget_folder(tmp_path / "games")
    assert window.folders == [] and window.table.rowCount() == 0 and not window.forget_button.isEnabled()
    window.close()


def test_install_runs_off_the_window(qapp, folders, monkeypatch):
    flatpak = Flatpak(installed=False)
    monkeypatch.setattr(QMessageBox, "question", lambda *a, **k: QMessageBox.StandardButton.Yes)
    window = _window(folders, flatpak=flatpak, fetch=_zip)
    window.on_install()
    assert not window.install_button.isEnabled()                                      # busy
    _wait(window, qapp)
    assert window.running.text() == "RetroArch 1.22.2 is installed. The SwanStation core of 2026-10-21 is installed."
    assert window.retroarch == "1.22.2" and window.core == "2026-10-21" and window.ready
    assert ["flatpak", "install", "--user", "--noninteractive", "-y", "flathub", "org.libretro.RetroArch"] \
        in flatpak.calls
    window.close()


def test_install_with_retroarch_there_gets_only_the_core(qapp, folders, monkeypatch):
    flatpak = Flatpak()
    asked = []
    monkeypatch.setattr(QMessageBox, "question", lambda parent, title, text: asked.append(text) or
                        QMessageBox.StandardButton.Yes)
    window = _window(folders, flatpak=flatpak, fetch=_zip)
    window.on_install()
    _wait(window, qapp)
    assert window.running.text() == "The SwanStation core of 2026-10-21 is installed."
    assert "RetroArch from Flathub" not in asked[0] and not any(c[:2] == ["flatpak", "install"] for c in flatpak.calls)
    window.close()


def test_a_refused_install_changes_nothing(qapp, folders, monkeypatch):
    monkeypatch.setattr(QMessageBox, "question", lambda *a, **k: QMessageBox.StandardButton.No)
    window = _window(folders, flatpak=Flatpak(installed=False), fetch=_zip)
    window.on_install()
    assert not window.worker.running and not window.home.exists()
    window.close()


def test_a_failed_install_says_so(qapp, folders, monkeypatch):
    monkeypatch.setattr(QMessageBox, "question", lambda *a, **k: QMessageBox.StandardButton.Yes)

    def broken(url, dest, progress=None):
        dest.write_bytes(b"nothing")
    window = _window(folders, fetch=broken)
    window.on_install()
    _wait(window, qapp)
    assert "SwanStation was not installed: swanstation_libretro.so.zip is not a zip file" in window.running.text()
    assert not window.core
    window.close()


def test_remove_keeps_retroarch(qapp, folders, monkeypatch):
    _install(folders["home"])
    monkeypatch.setattr(QMessageBox, "question", lambda *a, **k: QMessageBox.StandardButton.Yes)
    window = _window(folders)
    window.on_remove()
    assert not window.core and window.retroarch == "1.22.2" and not window.home.exists()
    window.close()


def test_play_and_retroarchs_window(qapp, folders, tmp_path):
    _install(folders["home"])
    log = tmp_path / "args"
    folders["run"].write_text(f'#!/bin/sh\necho "$@" >> "{log}"\n')
    folders["run"].chmod(0o755)
    window = _window(folders)
    window.add_folder(tmp_path / "games")
    window.table.selectRow(0)
    window.on_play()
    window.on_open_retroarch()
    deadline = time.monotonic() + 10
    while (not log.exists() or len(log.read_text().splitlines()) < 2) and time.monotonic() < deadline:
        time.sleep(0.01)
    assert sorted(log.read_text().splitlines()) == sorted([str(tmp_path / "games" / "One.iso"), ""])
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
    assert list(shortcuts.in_steam(folders["steam_dir"]).values()) == ["[PS1] Two"]
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
    gone = Game(Path("/old/games/gone.cue"), "Gone")
    steam.write_shortcuts(folders["steam_dir"], shortcuts.changes([gone], [], folders["run"], Path("/i.png"), {},
                                                                  art=False))
    window = _window(folders)
    add, remove = window.steam_plan()
    assert add == [] and [(str(g.file), g.title) for g in remove] == [(str(gone.file), "[PS1] Gone")]
    assert window.steam_button.isEnabled()
    window.close()


def test_games_need_the_core_for_game_mode(qapp, folders, tmp_path):
    window = _window(folders)
    window.add_folder(tmp_path / "games")
    window.table.item(0, 0).setCheckState(Qt.CheckState.Checked)
    window.on_update_steam()
    assert "Install RetroArch and the core first" in window.running.text() and not window.worker.running
    window.close()


def test_no_steam_game_mode_or_no_wrapper(qapp, folders, tmp_path, monkeypatch):
    _install(folders["home"])
    monkeypatch.setattr(steam, "find_steam", lambda: None)                           # None: looked up, and not found
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
    assert "install SwanStation Manager through the portal first" in window.running.text()
    assert not window.worker.running
    window.close()


def test_the_blue_look(qapp, folders):
    _install(folders["home"])
    window = _window(folders)
    assert style.BLUE in window.styleSheet()
    assert window.install_button.property("primary") and window.steam_button.property("primary")
    assert style.BLUE in window.emulator_box.styleSheet()
    assert f"color:{style.BLUE}" in window.emulator_state.text()                     # the core's link
    steps = (window.install_button, window.remove_button, window.bios_button, window.folder_button,
             window.forget_button)
    assert len({(b.width(), b.height()) for b in steps}) == 1                         # one size, padding included
    window.close()


def test_a_newer_core_is_mentioned(qapp, folders):
    _install(folders["home"])
    newer = {"etag": '"2"', "last-modified": "Thu, 22 Oct 2026 03:00:00 GMT"}
    window = _window(folders, head_of=lambda url: dict(newer))
    deadline = time.monotonic() + 10
    while not window.newer and time.monotonic() < deadline:
        qapp.processEvents()
        time.sleep(0.01)
    assert "The libretro buildbot has 2026-10-22" in window.emulator_state.text()
    assert window.install_button.text() == "Update" and window.install_button.isEnabled()
    window.close()


def _until(qapp, done) -> None:
    deadline = time.monotonic() + 10
    while not done() and time.monotonic() < deadline:
        qapp.processEvents()
        time.sleep(0.01)
    qapp.processEvents()


def test_a_newer_core_in_the_portals_notice_until_update_installs_it(qapp, folders, monkeypatch):
    from bc250_core import upstream
    _install(folders["home"])
    monkeypatch.setattr(QMessageBox, "question", lambda *a, **k: QMessageBox.StandardButton.Yes)
    newer = {"etag": '"2"', "last-modified": "Thu, 22 Oct 2026 03:00:00 GMT"}
    window = _window(folders, fetch=_zip, head_of=lambda url: dict(newer))
    _until(qapp, lambda: bool(window.newer))
    (outside,) = upstream.read_all()["swanstation"]                                       # the portal's notice
    assert (outside.name, outside.installed, outside.latest) == ("SwanStation core", "2026-10-21", "2026-10-22")
    window.on_install()                                                           # Update
    _wait(window, qapp)
    _until(qapp, lambda: not window.release_check.running)
    assert window.newer == "" and window.install_button.text() == "Install" and not window.install_button.isEnabled()
    assert "buildbot has" not in window.emulator_state.text() and "swanstation" not in upstream.read_all()
    window.close()


def test_an_unreachable_buildbot_leaves_the_notice_as_it_was(qapp, folders):
    from bc250_core import upstream
    _install(folders["home"])
    upstream.publish("swanstation", [upstream.Outside("SwanStation core", "2026-10-21", "2026-10-22")])

    def offline(url):
        raise OSError("no network")
    window = _window(folders, head_of=offline)
    _until(qapp, lambda: not window.release_check.running)
    assert window.newer == "" and len(upstream.read_all()["swanstation"]) == 1
    window.close()
