<!-- SPDX-License-Identifier: GPL-3.0-or-later -->

![SameBoy Manager](../assets/sameboy/bc250-sameboy-manager.webp){ .app-logo }

# SameBoy Manager

Plays **Game Boy and Game Boy Color games** on the **AMD BC-250** with [SameBoy](https://sameboy.github.io), a very
accurate Game Boy emulator, as a core of [RetroArch](https://www.retroarch.com). The app installs RetroArch and the
core, finds your games and adds them to Steam, so they start from **Game Mode** like any other game.

Whether a game runs, and how well, is up to SameBoy. libretro's
[SameBoy page](https://docs.libretro.com/library/sameboy/) says what the core supports.

## What you need

- **Your games**, dumped from your own cartridges: `.gb` and `.gbc` files, or `.zip` files with one in them. The app
  never downloads games.
- **Steam**, started at least once, for Game Mode.
- **Flatpak**, which Bazzite has. RetroArch is about 420 MB from Flathub; the core is about 1 MB.
- No BIOS: SameBoy has its own boot ROMs. Dumps of the Game Boy's (`dmg_boot.bin`) and the Game Boy Color's
  (`cgb_boot.bin`) from your own consoles are optional; RetroArch reads them from its `system` folder.

## Using it

The window has two steps, then the list of games.

1. **SameBoy**: **Install** installs what is missing. RetroArch comes from Flathub, for your user (no root); a
   RetroArch that is installed already, also the one [SwanStation Manager](swanstation.md) installs, is used as it
   is. The core comes from the libretro build server, and the app checks that it is a zip with one x86-64 Linux
   library in it before installing it. **Remove** takes the core out again; RetroArch, with its settings and your
   saves, stays. When the build server has a newer core, the step says so, and **Update** installs it.
2. **Game folders**: the folders the app looks for games in. **Add folder…** adds one, **Remove folder…** stops
   looking in one (the games stay where they are). A game may sit up to five folders deep.

The table lists every game found. A file is a game when its header is a Game Boy cartridge's (the app checks the
header's checksum and the size it names), so other `.gb`, `.gbc` or `.zip` files in a game folder are left out. The
**System** column comes from the header too, not from the file's suffix: many `.gb` files are Game Boy Color games.
The cartridge's own title is short and in capitals, so the title is the file's name: name your files well.

Game Boy Advance games (`.gba`) are [mGBA Manager](mgba.md)'s.

- **Play** (or a double-click) starts the chosen game on the desktop, in a window.
- **RetroArch settings** opens RetroArch's own window, with its settings, controllers and the core's options, such
  as the model of Game Boy SameBoy plays as and its colours.

### Game Mode

Tick the games you want in Game Mode and press **Update Game Mode**. The app adds them to Steam as non-Steam games
and takes out the games you unticked and games it no longer finds. Steam keeps these files in memory, so it closes
for the change and starts again in the background. The pictures on the tiles are drawn from the app's icon, with the
game's title, on a background in the icon's colour, and the icon is the logo on the banner: a cartridge gives no
pictures of its own.

In Steam each game's name starts with its system, for example **[GB] Tetris** or **[GBC] Pokemon Crystal**, so it
stands apart from the same title on Steam or on another system in Steam's menus.

In Game Mode the games are in the library under **Non-Steam**. They start the game alone in RetroArch, full screen.
Steam's overlay works over a game started from Steam, in Game Mode and on the desktop: press **Shift+Tab** or the
**Steam button** for the game's page, its controller layout and its settings, without leaving the game.

Change Game Mode from Desktop Mode: in Game Mode Steam is the session itself and cannot close for the change.

## How it works

### The core is not pinned

SameBoy releases no build for Linux, so the app uses libretro's port of it, which libretro's build server builds.
That server keeps only the newest build of each core, so there is no release to pin. The app checks what it can: a
zip with one file, an x86-64 Linux library, and it records the build's date and checksum in `core.json` beside the
core. It asks the build server for a newer build when the window opens, and installs one only when you press
**Update**. The [portal](../portal.md) lists a newer build too, under **Outside the suite**. libretro's port follows
SameBoy's own releases with a delay, so it can be a version behind them.

### The run wrapper

The Game Mode shortcuts run `bc250-sameboy-run`, not RetroArch. It starts the RetroArch Flatpak with the core
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
| The app | `~/.local/share/bc250-sameboy-manager/app` |
| The SameBoy core | `~/.local/share/bc250-sameboy-manager/emulator/core` |
| RetroArch | The Flatpak `org.libretro.RetroArch` |
| RetroArch's settings, saves, boot ROMs | `~/.var/app/org.libretro.RetroArch/config/retroarch` (RetroArch's own folder) |
| The app's settings, with the game folders | `~/.config/bc250-sameboy-manager` |
| The Game Mode shortcuts | Steam's `shortcuts.vdf` and `grid` folder, per Steam user |
| Launchers | `~/.local/bin/bc250-sameboy-manager`, `~/.local/bin/bc250-sameboy-run` |

## Install and remove

Install the app from the [portal](../portal.md), where it is under Gaming. Removing it takes out the app and the core
it installed; RetroArch (`flatpak uninstall org.libretro.RetroArch` removes it), its folder and your games stay. The
games in Game Mode then no longer start: take them out first by unticking them and pressing **Update Game Mode**.

```bash
./install.sh                         # install or update
./install.sh --no-desktop-shortcut   # app menu entry only, no icon on the Desktop
./install.sh --uninstall             # remove the app and the SameBoy core it installed; keeps its settings
./install.sh --uninstall --purge     # also remove its settings
```

## Disclaimer

SameBoy Manager is an independent project, not affiliated with or endorsed by Nintendo. Game Boy and Game Boy Color
are trademarks of their owner.

## License

GPL-3.0-or-later. SameBoy (MIT, [libretro's port](https://github.com/libretro/SameBoy)) and RetroArch
(GPL-3.0-or-later) are separate programs under their own licenses, downloaded from their own sources.
