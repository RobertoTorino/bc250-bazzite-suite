# SPDX-License-Identifier: GPL-3.0-or-later
"""A Steam shortcut per game, for Game Mode: a non-Steam game that runs the run wrapper, which starts RetroArch with
the SameBoy core, the game full screen (bc250-sameboy-run --fullscreen "<game>").

The file and its format are core's (bc250_core.steam). The shortcut runs the wrapper, not RetroArch, so its Steam
number (from the program and the name) stays the same whatever RetroArch's version. A cartridge dump carries no
pictures, so the artwork is drawn from the app's icon by core's steam_art: a background in the icon's colour, the
icon and the game's title."""

from __future__ import annotations

import shlex
from collections.abc import Iterable
from pathlib import Path

from bc250_core import steam, steam_art

from .games import Game

RUN = "~/.local/bin/bc250-sameboy-run"
RUN_NAME = "bc250-sameboy-run"
APP_TAG = "SameBoy Manager"


def prefix(game: Game) -> str:
    """Before each name, the game's system ("[GBC] "), so the same title on another system or on Steam itself is
    told apart."""
    return f"[{game.system}] "


def launch_options(game: Game) -> str:
    """Steam's usual form, the path in double quotes; a path with a character that is special inside them gets
    single quotes instead."""
    path = str(game.file)
    quoted = f'"{path}"' if not any(c in path for c in '"$`\\') else shlex.quote(path)
    return f"--fullscreen {quoted}"


def _file(item: dict) -> str:
    """The game a shortcut of this app starts ("" for any other shortcut): the last word of its launch options,
    after --fullscreen."""
    if not str(item.get("Exe", "")).strip('"').endswith(RUN_NAME):
        return ""
    try:
        words = shlex.split(str(item.get("LaunchOptions", "")))
    except ValueError:
        return ""
    if "--fullscreen" not in words[:-1] or not words[-1] or words[-1].startswith("-"):
        return ""
    return words[-1]


def ours(item: dict) -> bool:
    """Any shortcut this app made."""
    return bool(_file(item))


def for_game(game: Game):
    """Recognises the game's shortcut, whatever its name now."""
    return lambda item: _file(item) == str(game.file)


def names(games: Iterable[Game]) -> dict[Path, str]:
    """The name in Steam per game: the system and its title ("[GBC] Title"), with its file's kind when two games
    of one system have the same title (Steam numbers a shortcut by its program and name, so two names must
    differ)."""
    games = list(games)
    titles = [(g.system, g.title) for g in games]
    return {g.file: prefix(g) + (g.title if titles.count((g.system, g.title)) == 1 else f"{g.title} ({g.kind})")
            for g in games}


def entry(game: Game, name: str, run: Path, logo: Path) -> dict:
    return steam.shortcut_entry(f'"{run}"', name, f'"{run.parent}/"', str(steam.shortcut_icon(logo)),
                                launch_options(game), (game.system, APP_TAG))


def in_steam(folder: Path) -> dict[str, str]:
    """The game files that have a shortcut of this app, for any Steam user, with the shortcut's name."""
    return {_file(item): str(item.get("AppName", "")) for item in steam.shortcuts(folder) if ours(item)}


def changes(add: Iterable[Game], remove: Iterable[Game], run: Path, logo: Path, existing: dict[str, str],
            art: bool = True) -> list[steam.Change]:
    """The changes for core's write_shortcuts: the games to add (or bring up to date) and to take out. The names
    are made unique over the games added; a shortcut taken out is named as in Steam (*existing*, from in_steam()),
    so its artwork, numbered by the name, goes too."""
    add, remove = list(add), list(remove)
    named = names(add)
    result = [steam.Change(entry(g, named[g.file], run, logo), for_game(g), draw_art(g, logo) if art else {})
              for g in add]
    result += [steam.Change(entry(g, existing.get(str(g.file), g.title), run, logo), for_game(g), remove=True)
               for g in remove]
    return result


# --- The artwork -----------------------------------------------------------------------------------------------

def draw_art(game: Game, logo: Path) -> dict[str, bytes]:
    """The four images as PNG bytes, drawn from the app's icon (*logo*) by core's steam_art: a cartridge dump gives
    no pictures, so the icon with the game's title, and the icon as the logo on the banner."""
    return steam_art.draw_icon_art(logo, game.title, f"{game.system} · {APP_TAG}",
                                   f"{APP_TAG.upper()} · {game.system}")
