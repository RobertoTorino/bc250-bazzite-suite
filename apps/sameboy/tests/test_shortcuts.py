# SPDX-License-Identifier: GPL-3.0-or-later
"""The Steam shortcuts for the games (shortcuts.py) on Steam folders made in a temp folder: the launch line, which
shortcuts are the app's, the system in each name and unique names, adding and removing beside other shortcuts, and
the artwork."""

from __future__ import annotations

import shlex
from pathlib import Path

from conftest import make_gb

from bc250_core import steam
from sameboy_manager import LOGO_PATH, shortcuts
from sameboy_manager.games import Game, read_game

PNG_ICON = LOGO_PATH.with_name(f"{LOGO_PATH.stem}-128.png")      # Steam gets the PNG beside the WebP icon
RUN = Path("/home/u/.local/bin/bc250-sameboy-run")
OTHER = {"appid": -1234, "AppName": "RetroArch", "Exe": '"/usr/bin/retroarch"', "LaunchOptions": "--fullscreen x"}


def _steam(tmp_path: Path) -> Path:
    config = tmp_path / "Steam" / "userdata" / "1000" / "config"
    config.mkdir(parents=True)
    (config / "shortcuts.vdf").write_bytes(steam.write_vdf({"shortcuts": {"0": OTHER}}))
    return tmp_path / "Steam"


def test_the_launch_line_and_whose_shortcut_it_is():
    game = Game(Path("/games/My Game.gbc"), "My Game", "GBC", "gbc")
    options = shortcuts.launch_options(game)
    assert options == '--fullscreen "/games/My Game.gbc"'
    assert shlex.split(options) == ["--fullscreen", "/games/My Game.gbc"]
    odd = Game(Path('/games/A "B" $C.gb'), "Odd")
    assert shlex.split(shortcuts.launch_options(odd))[-1] == str(odd.file)        # single quotes then
    item = shortcuts.entry(game, "My Game", RUN, LOGO_PATH)
    assert item["Exe"] == f'"{RUN}"' and item["StartDir"] == f'"{RUN.parent}/"' and item["icon"] == str(PNG_ICON)
    assert item["tags"] == {"0": "GBC", "1": "SameBoy Manager"}
    assert shortcuts.ours(item) and shortcuts.for_game(game)(item)
    assert not shortcuts.for_game(Game(Path("/games/Other.gb"), "Other"))(item)
    assert not shortcuts.ours(OTHER) and not shortcuts.ours({**item, "LaunchOptions": ""})
    assert not shortcuts.ours({**item, "LaunchOptions": "/games/My Game.gbc"})
    assert not shortcuts.ours({**item, "LaunchOptions": "--fullscreen"})
    assert not shortcuts.ours({**item, "LaunchOptions": '--fullscreen "unclosed'})


def test_names_carry_the_system_and_are_unique():
    a = Game(Path("/1.gb"), "Game", "GB", "gb")
    b = Game(Path("/2.zip"), "Game", "GB", "zip")
    c = Game(Path("/3.gbc"), "Game", "GBC", "gbc")
    d = Game(Path("/4.gbc"), "Other", "GBC", "gbc")
    assert shortcuts.names([a, b, c, d]) == {a.file: "[GB] Game (gb)", b.file: "[GB] Game (zip)",
                                             c.file: "[GBC] Game", d.file: "[GBC] Other"}


def test_add_then_take_out(tmp_path, qapp):
    folder = _steam(tmp_path)
    first = read_game(make_gb(tmp_path / "games" / "One.gb"))
    second = read_game(make_gb(tmp_path / "games" / "Two.gbc", 0xC0))
    numbers = steam.write_shortcuts(folder, shortcuts.changes([first, second], [], RUN, LOGO_PATH, {}))
    assert shortcuts.in_steam(folder) == {str(first.file): "[GB] One", str(second.file): "[GBC] Two"}
    config = steam.user_folders(folder)[0]
    assert sorted(p.name for p in (config / "grid").iterdir()) == sorted(
        f"{n}{suffix}.png" for n in numbers for suffix in ("p", "", "_hero", "_logo"))
    existing = shortcuts.in_steam(folder)
    steam.write_shortcuts(folder, shortcuts.changes([], [first, second], RUN, LOGO_PATH, existing))
    assert shortcuts.in_steam(folder) == {} and steam.shortcuts(folder) == [OTHER]
    assert not list((config / "grid").iterdir())                                 # their artwork went too


def test_a_shortcut_taken_out_under_the_name_it_has(tmp_path):
    folder = _steam(tmp_path)
    a = Game(Path("/1.gb"), "Game", "GB", "gb")
    b = Game(Path("/2.zip"), "Game", "GB", "zip")
    steam.write_shortcuts(folder, shortcuts.changes([a, b], [], RUN, LOGO_PATH, {}, art=False))
    grid = steam.user_folders(folder)[0] / "grid"
    grid.mkdir()
    named = steam.appid(f'"{RUN}"', "[GB] Game (gb)")
    (grid / f"{named}p.png").write_bytes(b"P")
    steam.write_shortcuts(folder, shortcuts.changes([], [a], RUN, LOGO_PATH, shortcuts.in_steam(folder)))
    assert shortcuts.in_steam(folder) == {"/2.zip": "[GB] Game (zip)"} and not list(grid.iterdir())


def test_the_drawn_artwork(tmp_path, qapp):
    from PyQt6.QtGui import QImage
    art = shortcuts.draw_art(Game(Path("/games/Crystal.gbc"), "Pokemon Crystal", "GBC", "gbc"), LOGO_PATH)
    assert set(art) == {"p", "", "_hero", "_logo"}                               # a cartridge gives no pictures
    assert QImage.fromData(art["_logo"], "PNG").size() == QImage(str(LOGO_PATH)).size()   # the app's icon instead
    for suffix in ("p", "", "_hero"):
        image = QImage.fromData(art[suffix], "PNG")
        assert (image.width(), image.height()) == steam.ART[suffix], suffix


def test_pictures_from_steamgriddb_in_place_of_the_drawn_ones(tmp_path, qapp):
    from bc250_core import covers
    title = "Pokemon - Yellow Version (USA, Europe) (SGB Enhanced)"     # named after its file
    game = Game(Path(f"/games/{title}.gbc"), title, "GBC", "gbc")
    assert shortcuts.COVERS == ("p", "", "_hero", "_logo") and shortcuts.cover_name(game) == covers.name(game.title)
    assert covers.search_title(game.title) == "Pokemon - Yellow Version"
    drawn = shortcuts.draw_art(game, LOGO_PATH)
    change = shortcuts.changes([game], [], RUN, LOGO_PATH, {}, found=lambda _g: {"p": b"cover", "_hero": b"hero"})[0]
    assert change.art == {**drawn, "p": b"cover", "_hero": b"hero"}
    assert shortcuts.changes([game], [], RUN, LOGO_PATH, {})[0].art == drawn
