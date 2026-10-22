# SPDX-License-Identifier: GPL-3.0-or-later
"""The Steam shortcuts for the games (shortcuts.py) on Steam folders made in a temp folder: the launch line, which
shortcuts are the app's, unique names, adding and removing beside other shortcuts, and the artwork."""

from __future__ import annotations

import shlex
from pathlib import Path

from conftest import make_cue, make_disc

from bc250_core import steam
from swanstation_manager import LOGO_PATH, shortcuts
from swanstation_manager.games import Game, read_cue, read_image

PNG_ICON = LOGO_PATH.with_name(f"{LOGO_PATH.stem}-128.png")      # Steam gets the PNG beside the WebP icon
RUN = Path("/home/u/.local/bin/bc250-swanstation-run")
OTHER = {"appid": -1234, "AppName": "RetroArch", "Exe": '"/usr/bin/retroarch"', "LaunchOptions": "--fullscreen x"}


def _steam(tmp_path: Path) -> Path:
    config = tmp_path / "Steam" / "userdata" / "1000" / "config"
    config.mkdir(parents=True)
    (config / "shortcuts.vdf").write_bytes(steam.write_vdf({"shortcuts": {"0": OTHER}}))
    return tmp_path / "Steam"


def test_the_launch_line_and_whose_shortcut_it_is():
    game = Game(Path("/games/My Game.cue"), "My Game")
    options = shortcuts.launch_options(game)
    assert options == '--fullscreen "/games/My Game.cue"'
    assert shlex.split(options) == ["--fullscreen", "/games/My Game.cue"]
    odd = Game(Path('/games/A "B" $C.cue'), "Odd")
    assert shlex.split(shortcuts.launch_options(odd))[-1] == str(odd.file)        # single quotes then
    item = shortcuts.entry(game, "My Game", RUN, LOGO_PATH)
    assert item["Exe"] == f'"{RUN}"' and item["StartDir"] == f'"{RUN.parent}/"' and item["icon"] == str(PNG_ICON)
    assert item["tags"] == {"0": "PS1", "1": "SwanStation Manager"}
    assert shortcuts.ours(item) and shortcuts.for_game(game)(item)
    assert not shortcuts.for_game(Game(Path("/games/Other.cue"), "Other"))(item)
    assert not shortcuts.ours(OTHER) and not shortcuts.ours({**item, "LaunchOptions": ""})
    assert not shortcuts.ours({**item, "LaunchOptions": "/games/My Game.cue"})
    assert not shortcuts.ours({**item, "LaunchOptions": "--fullscreen"})
    assert not shortcuts.ours({**item, "LaunchOptions": '--fullscreen "unclosed'})


def test_names_are_unique():
    a = Game(Path("/1.cue"), "Game", "SLUS-00001")
    b = Game(Path("/2.cue"), "Game", "SLES-00002")
    c = Game(Path("/3.cue"), "Other", "SLUS-00003")
    assert shortcuts.names([a, b, c]) == {a.file: "[PS1] Game (SLUS-00001)", b.file: "[PS1] Game (SLES-00002)",
                                          c.file: "[PS1] Other"}


def test_add_then_take_out(tmp_path, qapp):
    folder = _steam(tmp_path)
    first = read_cue(make_cue(tmp_path / "games", "One", "SLUS_000.01"))
    second = read_image(make_disc(tmp_path / "games" / "Two.iso"))
    numbers = steam.write_shortcuts(folder, shortcuts.changes([first, second], [], RUN, LOGO_PATH, {}))
    assert shortcuts.in_steam(folder) == {str(first.file): "[PS1] One", str(second.file): "[PS1] Two"}
    config = steam.user_folders(folder)[0]
    assert sorted(p.name for p in (config / "grid").iterdir()) == sorted(
        f"{n}{suffix}.png" for n in numbers for suffix in ("p", "", "_hero", "_logo"))
    existing = shortcuts.in_steam(folder)
    steam.write_shortcuts(folder, shortcuts.changes([], [first, second], RUN, LOGO_PATH, existing))
    assert shortcuts.in_steam(folder) == {} and steam.shortcuts(folder) == [OTHER]
    assert not list((config / "grid").iterdir())                                 # their artwork went too


def test_a_shortcut_taken_out_under_the_name_it_has(tmp_path):
    folder = _steam(tmp_path)
    a = Game(Path("/1.cue"), "Game", "SLUS-00001")
    b = Game(Path("/2.cue"), "Game", "SLES-00002")
    steam.write_shortcuts(folder, shortcuts.changes([a, b], [], RUN, LOGO_PATH, {}, art=False))
    grid = steam.user_folders(folder)[0] / "grid"
    grid.mkdir()
    named = steam.appid(f'"{RUN}"', "[PS1] Game (SLUS-00001)")
    (grid / f"{named}p.png").write_bytes(b"P")
    steam.write_shortcuts(folder, shortcuts.changes([], [a], RUN, LOGO_PATH, shortcuts.in_steam(folder)))
    assert shortcuts.in_steam(folder) == {"/2.cue": "[PS1] Game (SLES-00002)"} and not list(grid.iterdir())


def test_the_drawn_artwork(tmp_path, qapp):
    from PyQt6.QtGui import QImage
    art = shortcuts.draw_art(Game(Path("/games/Crash.cue"), "Crash Bandicoot", "SCUS-94900"), LOGO_PATH)
    assert set(art) == {"p", "", "_hero", "_logo"}                               # a PS1 disc gives no pictures
    assert QImage.fromData(art["_logo"], "PNG").size() == QImage(str(LOGO_PATH)).size()   # the app's icon instead
    for suffix in ("p", "", "_hero"):
        image = QImage.fromData(art[suffix], "PNG")
        assert (image.width(), image.height()) == steam.ART[suffix], suffix


def test_pictures_from_steamgriddb_in_place_of_the_drawn_ones(tmp_path, qapp):
    from bc250_core import covers
    game = read_image(make_disc(tmp_path / "Final Fantasy VII (USA) (Disc 1).iso", disc_id="SCUS_941.63"))
    assert shortcuts.COVERS == covers.ALL and shortcuts.cover_name(game) == "SCUS-94163"
    assert covers.search_title(game.title) == "Final Fantasy VII"                # looked up without the tags
    assert shortcuts.cover_name(Game(Path("/g/Other.chd"), "Other")).startswith("title-")    # a CHD has no ID here
    drawn = shortcuts.draw_art(game, LOGO_PATH)
    found = {"p": b"cover", "_hero": b"banner"}
    change = shortcuts.changes([game], [], RUN, LOGO_PATH, {}, found=lambda _g: found)[0]
    assert change.art == {**drawn, **found} and change.art[""] == drawn[""]
    assert shortcuts.changes([game], [], RUN, LOGO_PATH, {})[0].art == drawn
