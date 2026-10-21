<!-- SPDX-License-Identifier: GPL-3.0-or-later -->

![SwanStation Manager](../assets/swanstation/bc250-swanstation-manager.webp){ .app-logo }

# SwanStation Manager

Plays **PS1 games** on the **AMD BC-250** with [SwanStation](https://github.com/libretro/swanstation), a PS1
emulator that runs as a core of [RetroArch](https://www.retroarch.com). The app installs RetroArch and the core,
checks your PS1 BIOS, finds your games and adds them to Steam, so they start from **Game Mode** like any other game.

Whether a game runs, and how well, is up to SwanStation. libretro's
[SwanStation page](https://docs.libretro.com/library/swanstation/) says what it supports.

## What you need

- **Your games**, dumped from your own discs: CUE sheets with their BIN files, CHD, PBP or M3U files, or ISO images.
  The app never downloads games.
- **The PS1's BIOS**, dumped from your own console. libretro's
  [BIOS list](https://docs.libretro.com/library/swanstation/#bios) names the files SwanStation looks for
  (`scph5501.bin` for a US console, `scph5500.bin` for a Japanese one, `scph5502.bin` for a European one, and the
  PSP's and PS3's `psxonpsp660.bin` and `ps1_rom.bin`); No-Intro's names (`scph1001.bin` and the like) work too. The
  app cannot ship it: copy the dump into the folder **Open folder** shows. SwanStation needs it to start any game.
- **Steam**, started at least once, for Game Mode.
- **Flatpak**, which Bazzite has. RetroArch is about 420 MB from Flathub; the core is about 2 MB.

## Using it

The window has three steps, then the list of games.

1. **SwanStation**: **Install** installs what is missing. RetroArch comes from Flathub, for your user (no root); a
   RetroArch that is installed already is used as it is. The core comes from the libretro build server, and the app
   checks that it is a zip with one x86-64 Linux library in it before installing it. **Remove** takes the core out
   again; RetroArch, with its saves, settings and BIOS, stays. When the build server has a newer core, the step says
   so, and **Update** installs it.
2. **BIOS**: how many BIOS files are in RetroArch's `system` folder. **Open folder** opens it, so you can copy your
   dump in.
3. **Game folders**: the folders the app looks for games in. **Add folder…** adds one, **Remove folder…** stops
   looking in one (the games stay where they are). A game may sit up to five folders deep.

The table lists every game found:

- A **CUE sheet** is the game; the BIN files it names (one per track) are not listed on their own.
- An **M3U playlist** is a game on several discs; the discs it names are not listed on their own.
- A **CHD** or **PBP** is listed under its file's name; the app does not look into those formats.
- An **ISO**, **IMG** or **BIN** without a CUE sheet is a game when it is a PS1 disc. A BIOS dump or any other
  `.bin` in a game folder is not.

A PS1 disc carries no title or pictures, so the title is the file's name: name your files well. For a disc the app
can read, the **ID** column shows the disc's ID (SLUS-00594), which it takes from the disc's `SYSTEM.CNF`.

- **Play** (or a double-click) starts the chosen game on the desktop, in a window.
- **RetroArch settings** opens RetroArch's own window, with its settings, controllers and the core's options.

### Game Mode

Tick the games you want in Game Mode and press **Update Game Mode**. The app adds them to Steam as non-Steam games
and takes out the games you unticked and games it no longer finds. Steam keeps these files in memory, so it closes
for the change and starts again in the background. The pictures on the tiles are drawn from the app's icon, with the
game's title, on a background in the icon's colour, and the icon is the logo on the banner: a PS1 disc gives no
pictures of its own.

In Steam each game's name starts with its system, for example **[PS1] Crash Bandicoot**, so it stands apart from the
same title on Steam or on another system in Steam's menus.

In Game Mode the games are in the library under **Non-Steam**. They start the game alone in RetroArch, full screen.
Steam's overlay works over a game started from Steam, in Game Mode and on the desktop: press **Shift+Tab** or the
**PS button** for the game's page, its controller layout and its settings, without leaving the game.

Change Game Mode from Desktop Mode: in Game Mode Steam is the session itself and cannot close for the change.

## How it works

### The core is not pinned

The other emulator managers install one tested release and check its checksum. SwanStation is built by libretro's
build server, which keeps only the newest build of each core, so there is no release to pin. The app checks what it
can: a zip with one file, an x86-64 Linux library, and it records the build's date and checksum in `core.json` beside
the core. It asks the build server for a newer build when the window opens, and installs one only when you press
**Update**. The [portal](../portal.md) lists a newer build too, under **Outside the suite**.

### The run wrapper

The Game Mode shortcuts run `bc250-swanstation-run`, not RetroArch. It starts the RetroArch Flatpak with the core
(`flatpak run org.libretro.RetroArch -L <core> <game>`), so the shortcuts keep working when the core is updated.
Without arguments it starts RetroArch's own window.

### Steam's overlay on the desktop

The KDE desktop of Bazzite is a Wayland session, and Steam on the desktop only sees windows that go through X11
(XWayland). A window Steam cannot see has no overlay. So when Steam starts a game on the Wayland desktop, the run
wrapper takes RetroArch's Wayland socket away, and it opens its window through XWayland. Game Mode runs every game
through X11 already.

## What goes where

| What | Where |
|---|---|
| The app | `~/.local/share/bc250-swanstation-manager/app` |
| The SwanStation core | `~/.local/share/bc250-swanstation-manager/emulator/core` |
| RetroArch | The Flatpak `org.libretro.RetroArch` |
| RetroArch's settings, saves, BIOS | `~/.var/app/org.libretro.RetroArch/config/retroarch` (RetroArch's own folder) |
| The app's settings, with the game folders | `~/.config/bc250-swanstation-manager` |
| The Game Mode shortcuts | Steam's `shortcuts.vdf` and `grid` folder, per Steam user |
| Launchers | `~/.local/bin/bc250-swanstation-manager`, `~/.local/bin/bc250-swanstation-run` |

## Install and remove

Install the app from the [portal](../portal.md), where it is under Gaming. Removing it takes out the app and the core
it installed; RetroArch (`flatpak uninstall org.libretro.RetroArch` removes it), its folder and your games stay. The
games in Game Mode then no longer start: take them out first by unticking them and pressing **Update Game Mode**.

```bash
./install.sh                         # install or update
./install.sh --no-desktop-shortcut   # app menu entry only, no icon on the Desktop
./install.sh --uninstall             # remove the app and the SwanStation core it installed; keeps its settings
./install.sh --uninstall --purge     # also remove its settings
```

## Disclaimer

SwanStation Manager is an independent project, not affiliated with or endorsed by the makers of PlayStation.
PlayStation is a trademark of its owner.

## License

GPL-3.0-or-later. SwanStation (GPL-3.0, [libretro's fork](https://github.com/libretro/swanstation)) and RetroArch
(GPL-3.0-or-later) are separate programs under their own licenses, downloaded from their own sources.
