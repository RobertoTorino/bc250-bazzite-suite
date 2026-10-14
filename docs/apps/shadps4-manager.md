<!-- SPDX-License-Identifier: GPL-3.0-or-later -->

# BC-250 shadPS4 Manager

![BC-250 shadPS4 Manager](../assets/shadps4-manager/bc250-shadps4-manager.png){ .app-logo }

Plays **PS4 games** on the **AMD BC-250** with [shadPS4](https://github.com/shadps4-emu/shadPS4), an open-source
PS4 emulator. The app installs the shadPS4 release it was tried with, finds the games in your game folders and adds
them to Steam, so they start from **Game Mode** like any other game.

Whether a game runs, and how well, is up to shadPS4. Its
[compatibility list](https://github.com/shadps4-emu/shadps4-game-compatibility/issues) shows what others found.

## What you need

- **Your games**, installed from your own PS4: each game in a folder of its own, with its `eboot.bin` and its
  `sce_sys` folder. The app never downloads games.
- **System modules** for some games: libraries of the PS4's firmware (`.sprx` files), from your own console. Many
  games run without them. The app cannot ship them; it shows which ones are there.
- **Steam**, started at least once, for Game Mode.
- About 35 MB for shadPS4 itself. Its saves, settings and shader cache go in `~/.local/share/shadPS4`.
- **FUSE 2** (`libfuse.so.2`), which Bazzite has. shadPS4 comes as an AppImage, which mounts itself with it.
  Without it, it unpacks itself to a temporary folder on every start, which takes longer.

## Using it

The window has three steps, then the list of games.

1. **shadPS4**: **Install** downloads shadPS4 from its GitHub release (about 31 MB) and checks it against the
   checksum this version of the app was tried with before unpacking it. **Remove** takes it out again; shadPS4's own
   folder, with your saves and settings, stays.
2. **System modules**: how many of the modules that shadPS4 cannot do without are in its module folder. **Open
   folder** opens it, so you can copy your modules in. Hold the pointer over the text to see which are missing.
3. **Game folders**: the folders shadPS4 looks for games in. **Add folder…** adds one through shadPS4 itself, so its
   own window lists the games too. A game may sit up to five folders deep.

The table lists every game found: its title and ID (CUSA…) from the game's own files, its version and its folder.
Updates and mods are not listed as games: see [Game updates and mods](#game-updates-and-mods).

- **Play** (or a double-click) starts the chosen game on the desktop.
- **shadPS4 settings** opens shadPS4's own window (Big Picture), with its settings and its game list.

### Game updates and mods

Put a game's update in a folder of its own beside the game, named like the game's folder with `-UPDATE` added
(`-patch` works too). shadPS4 finds it there and uses it when it starts the game: the update's files take the place
of the game's, and the game's own folder stays as it is. Mods go the same way, in a folder ending in `-mods`.

```
shadps4_games/
├── CUSA11624/            the game: eboot.bin, sce_sys, ...
├── CUSA11624-UPDATE/     its update: its own eboot.bin, sce_sys and the files it changes
└── CUSA11624-mods/       mods for it
```

Nothing more is needed: you do not add these folders as game folders, and the table lists the game once. An update
found beside its game (the same ID, CUSA…) is left out of the table whatever its folder is called. A game copied
from a PS4 that had its update installed already has the update in it: it needs no `-UPDATE` folder and is listed
with the update's version.

### Game Mode

Tick the games you want in Game Mode and press **Update Game Mode**. The app adds them to Steam as non-Steam games,
with the game's own icon and background as their pictures, and takes out the games you unticked and games it no
longer finds. Steam keeps these files in memory, so it closes for the change and starts again in the background.

In Game Mode the games are in the library under **Non-Steam**. They start shadPS4 full screen. Steam's menu and
**Exit game** work as for any game.

Change Game Mode from Desktop Mode: in Game Mode Steam is the session itself and cannot close for the change.

## From a terminal

`bc250-shadps4-run` starts the installed shadPS4 with the options you give it. The Game Mode shortcuts use it, so
they keep working when a newer version of the app brings a newer shadPS4.

```bash
bc250-shadps4-run -f true -g "/path/to/game/eboot.bin"   # a game, full screen
bc250-shadps4-run -g "/path/to/game/eboot.bin"           # a game, as shadPS4's settings say
bc250-shadps4-run -b                                     # shadPS4's own window
```

## New shadPS4 releases

Each version of the app installs one shadPS4 release, the one it was tried with. A newer shadPS4 comes with a newer
version of the app, from the [portal](../portal.md): after updating the app, the first step says so, and **Install**
brings it.

## What goes where

| What | Where |
|---|---|
| The app | `~/.local/share/bc250-shadps4-manager/app` |
| shadPS4 | `~/.local/share/bc250-shadps4-manager/emulator` |
| shadPS4's saves, settings, system modules | `~/.local/share/shadPS4` (shadPS4's own folder) |
| The app's settings | `~/.config/bc250-shadps4-manager` |
| The Game Mode shortcuts | Steam's `shortcuts.vdf` and `grid` folder, per Steam user |
| Launchers | `~/.local/bin/bc250-shadps4-manager`, `~/.local/bin/bc250-shadps4-run` |

## Install and remove

Install the app from the [portal](../portal.md), where it is under Gaming. Removing it takes out the app and the shadPS4 it installed;
shadPS4's own folder (your saves) and your games stay. The games in Game Mode then no longer start: take them out
first by unticking them and pressing **Update Game Mode**.

```bash
./install.sh                         # install or update
./install.sh --no-desktop-shortcut   # app menu entry only, no icon on the Desktop
./install.sh --uninstall             # remove the app and the shadPS4 it installed; keeps its settings
./install.sh --uninstall --purge     # also remove its settings
```

## License

GPL-3.0-or-later. shadPS4 is a separate program under its own license (GPL-2.0), downloaded from its own release.
