# SPDX-License-Identifier: GPL-3.0-or-later
"""The Steam shortcuts for the games (shortcuts.py) on Steam folders made in a temp folder: the launch line, which
shortcuts are the app's, unique names, adding and removing beside other shortcuts, and the drawn artwork."""

from __future__ import annotations

import shlex
from pathlib import Path

from conftest import make_disc

from bc250_core import steam
from pcsx2_manager import LOGO_PATH, shortcuts
from pcsx2_manager.games import Game, read_disc

RUN = Path("/home/u/.local/bin/bc250-pcsx2-run")
OTHER = {"appid": -1234, "AppName": "RetroArch", "Exe": '"/usr/bin/retroarch"', "LaunchOptions": "-nogui x"}


def _steam(tmp_path: Path) -> Path:
    config = tmp_path / "Steam" / "userdata" / "1000" / "config"
    config.mkdir(parents=True)
    (config / "shortcuts.vdf").write_bytes(steam.write_vdf({"shortcuts": {"0": OTHER}}))
    return tmp_path / "Steam"


def test_the_launch_line_and_whose_shortcut_it_is():
    game = Game(Path("/games/My Game.iso"), "My Game")
    options = shortcuts.launch_options(game)
    assert options == '-nogui -fullscreen -- "/games/My Game.iso"'
    assert shlex.split(options) == ["-nogui", "-fullscreen", "--", "/games/My Game.iso"]
    odd = Game(Path('/games/A "B" $C.iso'), "Odd")
    assert shlex.split(shortcuts.launch_options(odd))[-1] == str(odd.file)        # single quotes then
    item = shortcuts.entry(game, "My Game", RUN, LOGO_PATH)
    assert item["Exe"] == f'"{RUN}"' and item["StartDir"] == f'"{RUN.parent}/"' and item["icon"] == str(LOGO_PATH)
    assert item["tags"] == {"0": "PS2", "1": "PCSX2 Manager"}
    assert shortcuts.ours(item) and shortcuts.for_game(game)(item)
    assert not shortcuts.for_game(Game(Path("/games/Other.iso"), "Other"))(item)
    assert not shortcuts.ours(OTHER) and not shortcuts.ours({**item, "LaunchOptions": ""})
    assert not shortcuts.ours({**item, "LaunchOptions": "/games/My Game.iso"})
    assert not shortcuts.ours({**item, "LaunchOptions": "-nogui -fullscreen --"})
    assert not shortcuts.ours({**item, "LaunchOptions": '-nogui "unclosed'})


def test_names_are_unique():
    a = Game(Path("/1.iso"), "Game", "SLUS-00001")
    b = Game(Path("/2.iso"), "Game", "SLES-00002")
    c = Game(Path("/3.iso"), "Other", "SLUS-00003")
    assert shortcuts.names([a, b, c]) == {a.file: "[PS2] Game (SLUS-00001)", b.file: "[PS2] Game (SLES-00002)",
                                          c.file: "[PS2] Other"}


def test_add_then_take_out(tmp_path, qapp):
    folder = _steam(tmp_path)
    first = read_disc(make_disc(tmp_path / "games" / "One.iso", "SLUS_000.01"))
    second = read_disc(make_disc(tmp_path / "games" / "Two.iso", "SLUS_000.02"))
    numbers = steam.write_shortcuts(folder, shortcuts.changes([first, second], [], RUN, LOGO_PATH, {}))
    assert shortcuts.in_steam(folder) == {str(first.file): "[PS2] One", str(second.file): "[PS2] Two"}
    config = steam.user_folders(folder)[0]
    assert sorted(p.name for p in (config / "grid").iterdir()) == sorted(
        f"{n}{suffix}.png" for n in numbers for suffix in ("p", "", "_hero", "_logo"))     # the logo: the icon
    existing = shortcuts.in_steam(folder)
    steam.write_shortcuts(folder, shortcuts.changes([], [first, second], RUN, LOGO_PATH, existing))
    assert shortcuts.in_steam(folder) == {} and steam.shortcuts(folder) == [OTHER]
    assert not list((config / "grid").iterdir())                                 # their artwork went too


def test_a_shortcut_taken_out_under_the_name_it_has(tmp_path):
    folder = _steam(tmp_path)
    a = Game(Path("/1.iso"), "Game", "SLUS-00001")
    b = Game(Path("/2.iso"), "Game", "SLES-00002")
    steam.write_shortcuts(folder, shortcuts.changes([a, b], [], RUN, LOGO_PATH, {}, art=False))
    grid = steam.user_folders(folder)[0] / "grid"
    grid.mkdir()
    named = steam.appid(f'"{RUN}"', "[PS2] Game (SLUS-00001)")
    (grid / f"{named}p.png").write_bytes(b"P")
    steam.write_shortcuts(folder, shortcuts.changes([], [a], RUN, LOGO_PATH, shortcuts.in_steam(folder)))
    assert shortcuts.in_steam(folder) == {"/2.iso": "[PS2] Game (SLES-00002)"} and not list(grid.iterdir())


def test_the_drawn_artwork(tmp_path, qapp):
    from PyQt6.QtGui import QImage
    game = Game(Path("/games/Okami.iso"), "Okami", "SLUS-21115")
    art = shortcuts.draw_art(game, LOGO_PATH)
    assert set(art) == {"p", "", "_hero", "_logo"}                               # a PS2 disc gives no pictures
    assert art["_logo"] == LOGO_PATH.read_bytes()                                # the app's icon instead
    for suffix in ("p", "", "_hero"):
        image = QImage.fromData(art[suffix], "PNG")
        assert (image.width(), image.height()) == steam.ART[suffix], suffix
