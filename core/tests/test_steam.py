# SPDX-License-Identifier: GPL-3.0-or-later
"""Steam's files (bc250_core.steam) on Steam folders made in a temp folder: the binary format, the appid, shortcuts
added, updated and removed beside others, several in one write, closing Steam for a change, and finding Steam."""

from __future__ import annotations

import struct
import zlib
from pathlib import Path

import pytest

from bc250_core import steam

OTHER = {"appid": -1234, "AppName": "RetroArch", "Exe": '"/usr/bin/retroarch"', "StartDir": '"/usr/bin/"',
         "LaunchOptions": "", "LastPlayTime": 1700000000, "tags": {"0": "Emulators"}}


def _steam(tmp_path: Path, users: int = 1, with_other: bool = True) -> Path:
    for n in range(users):
        config = tmp_path / "Steam" / "userdata" / str(1000 + n) / "config"
        config.mkdir(parents=True)
        if with_other:
            (config / "shortcuts.vdf").write_bytes(steam.write_vdf({"shortcuts": {"0": OTHER}}))
    return tmp_path / "Steam"


def _game(name: str, options: str) -> steam.Change:
    entry = steam.shortcut_entry('"/bin/run"', name, '"/bin/"', "/icon.png", options, ["PS4", "BC250"])
    return steam.Change(entry, lambda item, options=options: item.get("LaunchOptions") == options)


def test_the_binary_format_by_hand():
    data = (b"\x00shortcuts\x00" + b"\x000\x00" + b"\x02appid\x00" + struct.pack("<i", -5) +
            b"\x01AppName\x00Game\x00" + b"\x00tags\x00\x01" + b"0\x00x\x00\x08" + b"\x08" + b"\x08" + b"\x08")
    values = steam.read_vdf(data)
    assert values == {"shortcuts": {"0": {"appid": -5, "AppName": "Game", "tags": {"0": "x"}}}}
    assert steam.write_vdf(values) == data
    assert steam.read_vdf(b"") == {}
    with pytest.raises(steam.ShortcutError):
        steam.read_vdf(b"\x00shortcuts\x00\x05x\x00")
    with pytest.raises(steam.ShortcutError, match="damaged"):
        steam.read_vdf(b"\x00shortcuts\x00\x01AppName")


def test_the_entry_and_its_appid():
    entry = steam.shortcut_entry('"/bin/run"', "Game", '"/bin/"', "/i.png", "-g x", ["A", "B"])
    number = steam.appid('"/bin/run"', "Game")
    assert number == zlib.crc32(b'"/bin/run"Game') | 0x80000000 and number >= 1 << 31
    assert entry["appid"] == steam.as_int32(number) == number - (1 << 32) and steam.as_int32(5) == 5
    assert list(entry)[:7] == ["appid", "AppName", "Exe", "StartDir", "icon", "ShortcutPath", "LaunchOptions"]
    assert entry["tags"] == {"0": "A", "1": "B"} and entry["LastPlayTime"] == 0


def test_several_shortcuts_in_one_write(tmp_path):
    folder = _steam(tmp_path, users=2)
    first, second = _game("Game one", "-g /a"), _game("Game two", "-g /b")
    art = {"p": b"P", "": b"W", "_hero": b"H", "_logo": b"L"}
    first = steam.Change(first.entry, first.ours, art)
    numbers = steam.write_shortcuts(folder, [first, second])
    assert numbers == [first.number, second.number]
    for config in steam.user_folders(folder):                             # every Steam user gets them
        values = steam.read_vdf((config / "shortcuts.vdf").read_bytes())
        assert [item["AppName"] for item in values["shortcuts"].values()] == ["RetroArch", "Game one", "Game two"]
        assert values["shortcuts"]["0"] == OTHER                          # the other one stays as it was
        assert sorted(p.name for p in (config / "grid").iterdir()) == sorted(
            f"{first.number}{suffix}.png" for suffix in steam.ART)        # artwork only where given
        assert not list(config.glob("*.bc250-tmp"))
    assert len(steam.shortcuts(folder)) == 6 and steam.has_shortcut(folder, second.ours)


def test_update_keeps_the_play_time_and_remove_takes_the_artwork(tmp_path):
    folder = _steam(tmp_path)
    game = _game("Game", "-g /a")
    steam.write_shortcuts(folder, [steam.Change(game.entry, game.ours, {"p": b"P"})])
    config = steam.user_folders(folder)[0]
    values = steam.read_vdf((config / "shortcuts.vdf").read_bytes())
    values["shortcuts"]["1"]["LastPlayTime"] = 1750000000
    (config / "shortcuts.vdf").write_bytes(steam.write_vdf(values))
    renamed = _game("Game, renamed", "-g /a")
    steam.write_shortcuts(folder, [renamed])
    values = steam.read_vdf((config / "shortcuts.vdf").read_bytes())
    assert len(values["shortcuts"]) == 2 and values["shortcuts"]["1"]["AppName"] == "Game, renamed"
    assert values["shortcuts"]["1"]["LastPlayTime"] == 1750000000
    steam.write_shortcuts(folder, [steam.Change(game.entry, game.ours, remove=True)])
    assert steam.read_vdf((config / "shortcuts.vdf").read_bytes()) == {"shortcuts": {"0": OTHER}}
    assert not list((config / "grid").glob(f"{game.number}*"))


def test_no_users_and_a_damaged_file(tmp_path):
    with pytest.raises(steam.ShortcutError, match="no users"):
        steam.write_shortcuts(tmp_path / "nowhere", [_game("Game", "-g /a")])
    folder = _steam(tmp_path, with_other=False)
    (steam.user_folders(folder)[0] / "shortcuts.vdf").write_bytes(b"\x00shortcuts\x00\x05")
    assert steam.shortcuts(folder) == []                                   # left out, not an error


def test_find_steam(tmp_path):
    assert steam.find_steam(tmp_path) is None
    flatpak = tmp_path / ".var/app/com.valvesoftware.Steam/.local/share/Steam/userdata"
    flatpak.mkdir(parents=True)
    assert steam.find_steam(tmp_path) == flatpak.parent
    native = tmp_path / ".local/share/Steam/userdata"
    native.mkdir(parents=True)
    assert steam.find_steam(tmp_path) == native.parent                    # the native one first


def test_closed_for_a_change_and_started_again():
    commands, state, changed = [], {"running": True, "polls": 0}, []

    def run(command):
        commands.append(command)

    def running():
        if commands:
            state["polls"] += 1
            state["running"] = state["polls"] <= 2                        # closes after a moment
        return state["running"]
    assert steam.with_steam_closed(lambda: changed.append(state["running"]), run, running, sleep=lambda s: None)
    assert changed == [False] and commands == [["steam", "-shutdown"], steam.start_command()]
    assert steam.with_steam_closed(lambda: None, run, lambda: False) is False and len(commands) == 2


def test_steam_that_does_not_close_changes_nothing():
    commands, changed = [], []
    with pytest.raises(steam.SteamError, match="did not close"):
        steam.with_steam_closed(lambda: changed.append(1), commands.append, lambda: True, timeout=1.0,
                                sleep=lambda s: None)
    assert commands == [["steam", "-shutdown"]] and changed == []


def test_steam_running_reads_process_names(tmp_path):
    def process(pid, name, state="S"):
        (tmp_path / str(pid)).mkdir()
        (tmp_path / str(pid) / "comm").write_text(name + "\n")
        (tmp_path / str(pid) / "stat").write_text(f"{pid} ({name}) {state} 1 {pid} {pid} 0 -1\n")
    process(10, "bash")
    process(11, "steamwebhelper")
    process(12, "steam", "Z")               # a finished steam -shutdown not collected yet (the owner's board, 13-10-2026)
    assert not steam.steam_running(tmp_path)
    process(13, "steam")
    assert steam.steam_running(tmp_path)


def test_game_mode(monkeypatch):
    monkeypatch.setenv("XDG_CURRENT_DESKTOP", "gamescope")
    assert steam.game_mode()
    monkeypatch.setenv("XDG_CURRENT_DESKTOP", "KDE")
    assert not steam.game_mode()
