<!-- SPDX-License-Identifier: GPL-3.0-or-later -->

![mGBA Manager](../assets/mgba/bc250-mgba-manager.webp){ .app-logo }

# mGBA Manager

Plays **Game Boy Advance games** on the **AMD BC-250** with [mGBA](https://mgba.io), a Game Boy Advance emulator.
The app installs a tested mGBA release, finds your games and adds them to Steam, so they start from **Game Mode**
like any other game.

Whether a game runs, and how well, is up to mGBA. Its [compatibility list](https://mgba.io/compatibility.html)
says what it supports.

## What you need

- **Your games**, dumped from your own cartridges: `.gba` files, or `.zip` files with one in them. The app never
  downloads games.
- **Steam**, started at least once, for Game Mode.
- **FUSE 2**, which Bazzite has: mGBA comes as an AppImage, which mounts itself with it (without it, it unpacks
  itself on every start, which is slower).
- No BIOS: mGBA has its own. A dump of the GBA's BIOS from your own console is optional; choose it in mGBA's own
  window (**mGBA settings**, then **Settings > BIOS**).

## Using it

The window has two steps, then the list of games.

1. **mGBA**: **Install** downloads mGBA (about 24 MB) and checks it against the checksum of the release the app was
   tried with before installing it. **Remove** takes it out again; mGBA's settings and your saves stay.
2. **Game folders**: the folders the app looks for games in. **Add folder…** adds one, **Remove folder…** stops
   looking in one (the games stay where they are). A game may sit up to five folders deep.

The table lists every game found. A file is a game when its header is a GBA cartridge's (the app checks the
header's checksum), so other `.gba` or `.zip` files in a game folder are left out. The cartridge's own title is
short and in capitals, so the title is the file's name: name your files well. The **Code** column shows the
cartridge's game code (BPEE), from its header.

Game Boy and Game Boy Color games (`.gb`, `.gbc`) are not listed here, though mGBA runs them:
[SameBoy Manager](sameboy.md) has them, so a game is in Game Mode once.

- **Play** (or a double-click) starts the chosen game on the desktop, in a window.
- **mGBA settings** opens mGBA's own window, with its settings, controllers and the optional BIOS.

### Game Mode

Tick the games you want in Game Mode and press **Update Game Mode**. The app adds them to Steam as non-Steam games
and takes out the games you unticked and games it no longer finds. Steam keeps these files in memory, so it closes
for the change and starts again in the background. The pictures on the tiles are drawn from the app's icon, with the
game's title, on a background in the icon's colour, and the icon is the logo on the banner: a cartridge gives no
pictures of its own.

In Steam each game's name starts with its system, for example **[GBA] Metroid Fusion**, so it stands apart from the
same title on Steam or on another system in Steam's menus.

In Game Mode the games are in the library under **Non-Steam**. They start the game alone in mGBA, full screen.
Steam's overlay works over a game started from Steam, in Game Mode and on the desktop: press **Shift+Tab** or the
**Steam button** for the game's page, its controller layout and its settings, without leaving the game.

Change Game Mode from Desktop Mode: in Game Mode Steam is the session itself and cannot close for the change.

## From a terminal

`bc250-mgba-run` starts the installed mGBA with the options you give it. The Game Mode shortcuts use it, so they
keep working when a newer version of the app brings a newer mGBA.

```bash
bc250-mgba-run -f "/path/to/game.gba"   # a game full screen (Game Mode)
bc250-mgba-run "/path/to/game.gba"      # a game in a window
bc250-mgba-run                          # mGBA's own window
```

## New mGBA releases

Each version of the app installs one mGBA release, the one it was tried with. When the window opens, the app asks
GitHub for mGBA's newest release. When that one is newer, the first step says so, with a link to what is new; the
app does not install it. A newer mGBA comes with a newer version of the app, once it has been tried, from the
[portal](../portal.md): after updating the app, the first step says so, and **Install** brings it.

mGBA's own window can update mGBA itself. When it did, the first step says so: the build installed is not the one
the app was tried with, and **Install** puts that one back.

## How it works

The Game Mode shortcuts start `bc250-mgba-run`, which starts mGBA. Two things change when Steam is the one that
starts it. Started with **Play**, from outside Steam, mGBA runs as it is.

### Controllers

When Steam starts a game, it tells the game's controller library (SDL) to ignore the controllers Steam handles
itself, and gives the game Steam's virtual controller in their place (Steam Input). mGBA then sees only that virtual
controller, and on the desktop it follows the layout Steam has active, which may be Steam's desktop layout (mouse
and keys).

So the run wrapper undoes it: while a real controller is connected, mGBA reads that controller itself and leaves
Steam's virtual one (USB ID `28DE:11FF`) out. Without a real controller, as on a Steam Deck whose own controls exist
only as Steam's virtual controller, the wrapper leaves Steam's choice as it is. Controls are mapped in mGBA's own
window (**mGBA settings**, then **Settings > Controllers**).

### Steam's overlay on the desktop

The KDE desktop of Bazzite is a Wayland session. mGBA (a Qt program) opens its windows through Wayland when it can,
but Steam on the desktop only sees windows that go through X11 (XWayland). A game window Steam cannot see has no
overlay. So when Steam starts a game on the Wayland desktop, the run wrapper has mGBA open its windows through
XWayland (`QT_QPA_PLATFORM=xcb`), and Steam's overlay works as in any other game. Game Mode runs every game through
X11 already.

## What goes where

| What | Where |
|---|---|
| The app | `~/.local/share/bc250-mgba-manager/app` |
| mGBA | `~/.local/share/bc250-mgba-manager/emulator` |
| mGBA's settings | `~/.config/mgba` |
| Your saves | Beside each game, as mGBA keeps them (`.sav`) |
| The app's settings, with the game folders | `~/.config/bc250-mgba-manager` |
| The Game Mode shortcuts | Steam's `shortcuts.vdf` and `grid` folder, per Steam user |
| Launchers | `~/.local/bin/bc250-mgba-manager`, `~/.local/bin/bc250-mgba-run` |

## Install and remove

Install the app from the [portal](../portal.md), where it is under Gaming. Removing it takes out the app and the mGBA
it installed; mGBA's settings, your games and their saves stay. The games in Game Mode then no longer start: take
them out first by unticking them and pressing **Update Game Mode**.

```bash
./install.sh                         # install or update
./install.sh --no-desktop-shortcut   # app menu entry only, no icon on the Desktop
./install.sh --uninstall             # remove the app and the mGBA it installed; keeps its settings
./install.sh --uninstall --purge     # also remove its settings
```

## Disclaimer

mGBA Manager is an independent project, not affiliated with or endorsed by Nintendo. Game Boy Advance is a trademark
of its owner.

## License

GPL-3.0-or-later. mGBA (MPL-2.0) is a separate program under its own license, downloaded from its own releases.
