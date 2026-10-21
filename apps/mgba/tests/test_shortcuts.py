# SPDX-License-Identifier: GPL-3.0-or-later
"""The Steam shortcuts for the games (shortcuts.py) on Steam folders made in a temp folder: the launch line, which
shortcuts are the app's, unique names, adding and removing beside other shortcuts, and the artwork."""

from __future__ import annotations

import shlex
from pathlib import Path

from conftest import make_gba

from bc250_core import steam
from mgba_manager import LOGO_PATH, shortcuts
from mgba_manager.games import Game, read_game

PNG_ICON = LOGO_PATH.with_name(f"{LOGO_PATH.stem}-128.png")      # Steam gets the PNG beside the WebP icon
RUN = Path("/home/u/.local/bin/bc250-mgba-run")
OTHER = {"appid": -1234, "AppName": "mGBA", "Exe": '"/usr/bin/mgba-qt"', "LaunchOptions": "-f x"}


def _steam(tmp_path: Path) -> Path:
    config = tmp_path / "Steam" / "userdata" / "1000" / "config"
    config.mkdir(parents=True)
    (config / "shortcuts.vdf").write_bytes(steam.write_vdf({"shortcuts": {"0": OTHER}}))
    return tmp_path / "Steam"


def test_the_launch_line_and_whose_shortcut_it_is():
    game = Game(Path("/games/My Game.gba"), "My Game")
    options = shortcuts.launch_options(game)
    assert options == '-f "/games/My Game.gba"'
    assert shlex.split(options) == ["-f", "/games/My Game.gba"]
    odd = Game(Path('/games/A "B" $C.gba'), "Odd")
    assert shlex.split(shortcuts.launch_options(odd))[-1] == str(odd.file)        # single quotes then
    item = shortcuts.entry(game, "My Game", RUN, LOGO_PATH)
    assert item["Exe"] == f'"{RUN}"' and item["StartDir"] == f'"{RUN.parent}/"' and item["icon"] == str(PNG_ICON)
    assert item["tags"] == {"0": "GBA", "1": "mGBA Manager"}
    assert shortcuts.ours(item) and shortcuts.for_game(game)(item)
    assert not shortcuts.for_game(Game(Path("/games/Other.gba"), "Other"))(item)
    assert not shortcuts.ours(OTHER) and not shortcuts.ours({**item, "LaunchOptions": ""})
    assert not shortcuts.ours({**item, "LaunchOptions": "/games/My Game.gba"})
    assert not shortcuts.ours({**item, "LaunchOptions": "-f"})
    assert not shortcuts.ours({**item, "LaunchOptions": '-f "unclosed'})


def test_names_are_unique():
    a = Game(Path("/1.gba"), "Game", "AAAE")
    b = Game(Path("/2.gba"), "Game", "AAAP")
    c = Game(Path("/3.gba"), "Other", "BBBE")
    assert shortcuts.names([a, b, c]) == {a.file: "[GBA] Game (AAAE)", b.file: "[GBA] Game (AAAP)",
                                          c.file: "[GBA] Other"}


def test_add_then_take_out(tmp_path, qapp):
    folder = _steam(tmp_path)
    first = read_game(make_gba(tmp_path / "games" / "One.gba", "AONE"))
    second = read_game(make_gba(tmp_path / "games" / "Two.gba", "ATWO"))
    numbers = steam.write_shortcuts(folder, shortcuts.changes([first, second], [], RUN, LOGO_PATH, {}))
    assert shortcuts.in_steam(folder) == {str(first.file): "[GBA] One", str(second.file): "[GBA] Two"}
    config = steam.user_folders(folder)[0]
    assert sorted(p.name for p in (config / "grid").iterdir()) == sorted(
        f"{n}{suffix}.png" for n in numbers for suffix in ("p", "", "_hero", "_logo"))
    existing = shortcuts.in_steam(folder)
    steam.write_shortcuts(folder, shortcuts.changes([], [first, second], RUN, LOGO_PATH, existing))
    assert shortcuts.in_steam(folder) == {} and steam.shortcuts(folder) == [OTHER]
    assert not list((config / "grid").iterdir())                                 # their artwork went too


def test_a_shortcut_taken_out_under_the_name_it_has(tmp_path):
    folder = _steam(tmp_path)
    a = Game(Path("/1.gba"), "Game", "AAAE")
    b = Game(Path("/2.gba"), "Game", "AAAP")
    steam.write_shortcuts(folder, shortcuts.changes([a, b], [], RUN, LOGO_PATH, {}, art=False))
    grid = steam.user_folders(folder)[0] / "grid"
    grid.mkdir()
    named = steam.appid(f'"{RUN}"', "[GBA] Game (AAAE)")
    (grid / f"{named}p.png").write_bytes(b"P")
    steam.write_shortcuts(folder, shortcuts.changes([], [a], RUN, LOGO_PATH, shortcuts.in_steam(folder)))
    assert shortcuts.in_steam(folder) == {"/2.gba": "[GBA] Game (AAAP)"} and not list(grid.iterdir())


def test_the_drawn_artwork(tmp_path, qapp):
    from PyQt6.QtGui import QImage
    art = shortcuts.draw_art(Game(Path("/games/Fusion.gba"), "Metroid Fusion", "AMTE"), LOGO_PATH)
    assert set(art) == {"p", "", "_hero", "_logo"}                               # a cartridge gives no pictures
    assert QImage.fromData(art["_logo"], "PNG").size() == QImage(str(LOGO_PATH)).size()   # the app's icon instead
    for suffix in ("p", "", "_hero"):
        image = QImage.fromData(art[suffix], "PNG")
        assert (image.width(), image.height()) == steam.ART[suffix], suffix
