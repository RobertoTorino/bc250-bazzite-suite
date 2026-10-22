<!-- SPDX-License-Identifier: GPL-3.0-or-later -->

![RPCS3 Manager](../assets/rpcs3/bc250-rpcs3-manager.webp){ .app-logo }

# RPCS3 Manager

Plays **PS3 games** on the **AMD BC-250** with [RPCS3](https://rpcs3.net), an open-source PS3 emulator. The app
installs the RPCS3 build it was tried with, finds your games and adds them to Steam, so they start from **Game
Mode** like any other game.

Whether a game runs, and how well, is up to RPCS3. Its [compatibility list](https://rpcs3.net/compatibility) shows
what others found.

## What you need

- **Your games**, from your own discs or installed from your own packages. The app never downloads games.
- **The PS3's firmware** (`PS3UPDAT.PUP`), the PS3's system software. RPCS3 needs it to start any game.
  The app cannot ship it: download the firmware
  [here](https://www.playstation.com/en-us/support/hardware/ps3/system-software/) (official page), then press
  **Install firmware** in the app.
- **Steam**, started at least once, for Game Mode.
- About 90 MB for RPCS3 itself. Its firmware, saves, settings and installed games go in `~/.config/rpcs3`, its
  shader cache in `~/.cache/rpcs3`.
- **fusermount** (FUSE), which Bazzite has. RPCS3 comes as an AppImage, which mounts itself with it. Without it, it
  unpacks itself to a temporary folder on every start, which takes longer.

## Using it

The window has three steps, then the list of games.

1. **RPCS3**: **Install** downloads RPCS3 from GitHub (about 90 MB) and checks it against the checksum this version
   of the app was tried with before installing it. **Remove** takes it out again; RPCS3's own folder, with the
   firmware, your saves and settings, stays.
2. **Firmware**: which version of the PS3's firmware RPCS3 has. **Install firmware…** asks for the `PS3UPDAT.PUP`
   you downloaded and gives it to RPCS3, which installs it in its own window. Close that window when it is done; the
   step shows the new version.
3. **Game folders**: the folders the app looks for disc games in. **Add folder…** adds one, **Remove folder…**
   stops looking in one (the games stay where they are). A game may sit up to five folders deep.

The table lists every game found: its title and ID (BLUS…, NPUB…) from the game's own files, its version and its
folder. It has three kinds of games:

- **Disc games** in the game folders, each in a folder of its own, as copied from the disc: `PS3_DISC.SFB` and the
  `PS3_GAME` folder. RPCS3 does not start a disc game without its `PS3_DISC.SFB`; the table shows its folder in red.
- **Disc games RPCS3 knows**: those it started before, wherever they are.
- **Installed games**: games installed from a package, in RPCS3's `dev_hdd0/game`.

```
PS3/
└── Demon's Souls/
    ├── PS3_DISC.SFB
    └── PS3_GAME/          PARAM.SFO, ICON0.PNG, USRDIR/EBOOT.BIN, ...
```

- **Play** (or a double-click) starts the chosen game on the desktop, in a window.
- **RPCS3 settings** opens RPCS3's own window, with its settings, its controller settings and its game list.

### Game updates

Install a game's update in RPCS3 (its **File > Install Packages**). RPCS3 puts it in `dev_hdd0/game`, in a folder
named by the game's ID, and uses it when it starts the game. The table lists the game once, without the update.

### Game Mode

Tick the games you want in Game Mode and press **Update Game Mode**. The app adds them to Steam as non-Steam games,
with the game's own icon and background as their pictures and its icon (`ICON0.PNG`) as the logo on the banner,
and takes out the games you unticked and games it no longer finds. Steam keeps these files in memory, so it closes
for the change and starts again in the background.

In Steam each game's name starts with its system, for example **[PS3] Lumines**, so it stands apart from the same
title on Steam or on another system in Steam's menus. A game added under its title alone is renamed the next time you
press **Update Game Mode**, which is on for it until then. Steam sees the renamed game as a new one: its play time
stays, but a controller layout or collection you set for it in Steam has to be set again.

In Game Mode the games are in the library under **Non-Steam**. They start the game alone in RPCS3, full screen.
Steam's menu and **Exit game** work as for any game.

Steam's overlay works over a game started from Steam, in Game Mode and on the desktop: press **Shift+Tab** or the
**PS button** for the game's page, its controller layout and its settings, without leaving the game.

A game started from Steam reads your controllers itself. [How it works](#how-it-works) explains both.

Change Game Mode from Desktop Mode: in Game Mode Steam is the session itself and cannot close for the change.

#### Covers

A PS3 game has no cover in the shape Steam's library uses, so the app draws one: the game's icon with its title on
a dark background. With a SteamGridDB API key, the app takes a cover from SteamGridDB for each game instead; the
background and the logo on the game's page stay the game's own. See [Covers from SteamGridDB](covers.md) for the
key, how a game is looked up and how to use a cover of your own.

## From a terminal

`bc250-rpcs3-run` starts the installed RPCS3 with the options you give it. The Game Mode shortcuts use it, so they
keep working when a newer version of the app brings a newer RPCS3.

```bash
bc250-rpcs3-run --no-gui --fullscreen "/path/to/PS3_GAME/USRDIR/EBOOT.BIN"   # a game alone, full screen
bc250-rpcs3-run --no-gui "/path/to/PS3_GAME/USRDIR/EBOOT.BIN"                # a game alone, in a window
bc250-rpcs3-run --installfw "/path/to/PS3UPDAT.PUP"                          # install the firmware
bc250-rpcs3-run                                                              # RPCS3's own window
```

## New RPCS3 builds

RPCS3 has no stable releases: it publishes a new build for almost every change, and now and then marks one with a
version number (0.0.43). Each version of the app installs one build, the one it was tried with. When the window
opens, the app asks GitHub for RPCS3's newest version number. When that one is newer, the first step says so, with
a link to what is new; the app does not install it. A newer RPCS3 comes with a newer version of the app, once it has
been tried, from the [portal](../portal.md): after updating the app, the first step says so, and **Install** brings
it.

RPCS3's own window (**RPCS3 settings**) also looks for a newer build when it opens, and offers to update itself.
Answer **No** to keep the build the app was tried with. If you update it there, the first step says that RPCS3
updated itself, and **Install** puts the tried build back. A game started from Game Mode or with **Play** never
asks.

## How it works

The Game Mode shortcuts start `bc250-rpcs3-run`, which starts RPCS3. Two things change when Steam is the one that
starts it. Started with **Play**, from outside Steam, RPCS3 runs as it is.

### Controllers

When Steam starts a game, it tells the game's controller library (SDL) to ignore the controllers Steam handles
itself, and gives the game Steam's virtual controller in their place (Steam Input). With RPCS3's SDL controller
setting, RPCS3 then sees only that virtual controller: it has no motion sensors, and on the desktop it follows the
layout Steam has active, which may be Steam's desktop layout (mouse and keys).

So the run wrapper undoes it: while a real controller is connected, RPCS3 reads that controller itself and leaves
Steam's virtual one (USB ID `28DE:11FF`) out. The PS button stays Steam's. Without a real controller, as on a Steam
Deck whose own controls exist only as Steam's virtual controller, the wrapper leaves Steam's choice as it is. Which
controller is player 1 is set in RPCS3's own window (**RPCS3 settings**, then **Pads**).

### Steam's overlay on the desktop

The KDE desktop of Bazzite is a Wayland session. RPCS3 opens its windows through Wayland when it can, but Steam on
the desktop only sees windows that go through X11 (XWayland, the X11 server within the Wayland session). A game
window Steam cannot see has no overlay: **Shift+Tab** and the **PS button** do nothing.

So when Steam starts a game on the Wayland desktop, the run wrapper has RPCS3 open its windows through XWayland
(`QT_QPA_PLATFORM=xcb`), and Steam's overlay works as in any other game. Game Mode runs every game through X11
already.

## What goes where

| What | Where |
|---|---|
| The app | `~/.local/share/bc250-rpcs3-manager/app` |
| RPCS3 | `~/.local/share/bc250-rpcs3-manager/emulator` |
| RPCS3's firmware, saves, settings, installed games | `~/.config/rpcs3` (RPCS3's own folder) |
| RPCS3's shader cache | `~/.cache/rpcs3` |
| The app's settings, with the game folders | `~/.config/bc250-rpcs3-manager` |
| The Game Mode shortcuts | Steam's `shortcuts.vdf` and `grid` folder, per Steam user |
| The covers found on SteamGridDB | `~/.local/share/bc250-rpcs3-manager/covers` |
| Launchers | `~/.local/bin/bc250-rpcs3-manager`, `~/.local/bin/bc250-rpcs3-run` |

RPCS3 can keep its drives elsewhere (its **Configuration > Virtual File System**); the app reads where they are.

## Install and remove

Install the app from the [portal](../portal.md), where it is under Gaming. Removing it takes out the app
and the RPCS3 it installed; RPCS3's own folder (the firmware, your saves) and your games stay. The games in Game
Mode then no longer start: take them out first by unticking them and pressing **Update Game Mode**.

```bash
./install.sh                         # install or update
./install.sh --no-desktop-shortcut   # app menu entry only, no icon on the Desktop
./install.sh --uninstall             # remove the app and the RPCS3 it installed; keeps its settings
./install.sh --uninstall --purge     # also remove its settings and covers
```

## Disclaimer

RPCS3 Manager is an independent project, not affiliated with or endorsed by the makers of PlayStation.
PlayStation and PS3 are trademarks of their owner.

## License

GPL-3.0-or-later. RPCS3 is a separate program under its own license (GPL-2.0), downloaded from its own release.
