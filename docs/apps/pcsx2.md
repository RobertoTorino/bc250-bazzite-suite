<!-- SPDX-License-Identifier: GPL-3.0-or-later -->

![PCSX2 Manager](../assets/pcsx2/bc250-pcsx2-manager.webp){ .app-logo }

# PCSX2 Manager

Plays **PS2 games** on the **AMD BC-250** with [PCSX2](https://pcsx2.net), an open-source PS2 emulator. The app
installs the PCSX2 release it was tried with, checks your PS2 BIOS, finds your games and adds them to Steam, so
they start from **Game Mode** like any other game. Its [Memory cards](#memory-cards) window manages the saves on
PCSX2's memory cards.

Whether a game runs, and how well, is up to PCSX2. Its
[compatibility list](https://pcsx2.net/compat) shows what others found.

## What you need

- **Your games**, dumped from your own discs: ISO images, or the compressed CHD, CSO, ZSO or GZ. The app never
  downloads games.
- **The PS2's BIOS**, dumped from your own console.
  [PCSX2's BIOS page](https://pcsx2.net/docs/setup/bios) says how (the biosdrain homebrew). The app cannot ship
  it: copy the dump (a `.bin` file) into the folder **Open folder** shows. PCSX2 needs it to start any game.
- **Steam**, started at least once, for Game Mode.
- About 60 MB for PCSX2 itself. Its BIOS, memory cards, saves and settings go in `~/.config/PCSX2`.
- **fusermount** (FUSE), which Bazzite has. PCSX2 comes as an AppImage, which mounts itself with it. Without it,
  it unpacks itself to a temporary folder on every start, which takes longer.

## Using it

The window has three steps, then the list of games.

1. **PCSX2**: **Install** downloads PCSX2 from its GitHub release (about 57 MB) and checks it against the checksum
   this version of the app was tried with before installing it. **Remove** takes it out again; PCSX2's own folder,
   with the BIOS, your memory cards and settings, stays. **Nightly builds** switches to PCSX2's nightly builds; see
   [Nightly builds](#nightly-builds).
2. **BIOS**: how many BIOS dumps are in PCSX2's `bios` folder. **Open folder** opens it, so you can copy your dump
   in. Which dump PCSX2 uses is chosen in PCSX2's own window; its first start asks.
3. **Game folders**: the folders the app looks for games in. **Add folder…** adds one, **Remove folder…** stops
   looking in one (the games stay where they are). A game may sit up to five folders deep.

The table lists every game found, with its file's name as the title:

- An **ISO** is read for its `SYSTEM.CNF`, which names the program the console boots: that name is the game's
  serial (SLUS-12345), shown beside the title.
- A **CHD, CSO, ZSO or GZ** holds the same disc compressed; the app does not look into those formats, so the row
  has no serial. PCSX2 plays them the same.

A PS2 disc carries no title or pictures of its own (PCSX2's own window knows the titles from its catalogue), so
the title here is the file's name: name your images well.

- **Play** (or a double-click) starts the chosen game on the desktop, in a window.
- **PCSX2 settings** opens PCSX2's own window, with its settings, the BIOS choice, its controller settings and its
  game list.
- **Memory cards…** opens the [Memory cards](#memory-cards) window.

### Game Mode

Tick the games you want in Game Mode and press **Update Game Mode**. The app adds them to Steam as non-Steam games
and takes out the games you unticked and games it no longer finds. Steam keeps these files in memory, so it closes
for the change and starts again in the background. The pictures on the tiles are drawn from the app's icon, with the game's
title, on a background in the icon's colour, and the icon is the logo on the banner: a PS2 disc gives no pictures of
its own.

In Steam each game's name starts with its system, for example **[PS2] Lumines**, so it stands apart from the same
title on Steam or on another system in Steam's menus. A game added under its title alone is renamed the next time you
press **Update Game Mode**, which is on for it until then. Steam sees the renamed game as a new one: its play time
stays, but a controller layout or collection you set for it in Steam has to be set again.

In Game Mode the games are in the library under **Non-Steam**. They start the game alone in PCSX2, full screen;
PCSX2 exits when the game does. Steam's menu and **Exit game** work as for any game.

Steam's overlay works over a game started from Steam, in Game Mode and on the desktop: press **Shift+Tab** or the
**PS button** for the game's page, its controller layout and its settings, without leaving the game.

A game started from Steam reads your controllers itself. [How it works](#how-it-works) explains both.

Change Game Mode from Desktop Mode: in Game Mode Steam is the session itself and cannot close for the change.

## Memory cards

**Memory cards…** shows the memory cards in PCSX2's memory card folder (`~/.config/PCSX2/memcards`, or the folder
set in PCSX2) and the saves on the card you choose: each save's title, its folder on the card, its size and when
it was saved. The card in each of PCSX2's slots is marked **(slot 1)** or **(slot 2)**. Select a save to see its
3D icon as the PS2's browser shows it, as a still picture.

- **Import…** puts save files on the card: MAX Drive (`.max`), EMS (`.psu`), SharkPort (`.sps`), X-Port (`.xps`),
  Code Breaker (`.cbs`) and PSV (`.psv`, from a PS3). A save that is already on the card is left as it is: delete
  it first to replace it. When the card has too little space for all of them, none is put on it.
- **Export…** saves the selected saves as `.psu` or `.max` files, to keep or to share. One save asks for a file
  name; several go into a folder you choose, each named after its folder, title and a checksum.
- **Copy to…** copies the selected saves onto another card.
- **Delete…** deletes the selected saves.
- **New card…** makes a new, empty card. A name ending in `.ps2` is PCSX2's own kind; `.mc2` is a card without the
  error-correcting code (ECC), as a MemCard PRO2 reads. The PS2's own card is 8 MB; PCSX2 also takes 16, 32 and
  64 MB, which not every game works with. Which card is in which slot is set in PCSX2's own window
  (**Settings > Memory Cards**).
- **Format…** empties the card: every save on it goes.
- **Check** checks the card's file system, and every page against its ECC, and says what it found.

Before every change, the window copies the card beside it as `<card>.<date and time>.bak`, for example
`Mcd001.ps2.20261016-093000.bak`; the newest 10 per card are kept. PCSX2 does not list these as cards. To go back
to one, close PCSX2, rename the card and give the backup the card's name. A change is made on a copy of the card,
which takes its place when it is finished, so a change that fails leaves the card as it was.

Nothing is written while PCSX2 runs: it keeps the card in memory and would write its own copy over the change. The
window says so, and import, copy, delete and format wait until PCSX2 is closed. Export and check only read the card.

The window reads PS2 cards. PCSX2 can also keep a card as a folder, and play PS1 games with PS1 cards (`.mcd`,
`.mcr`); the window lists those and says it cannot read them. A PS1 save on a PS2 card, as a PS2 makes when it
copies one, is listed with its title.

## From a terminal

`bc250-pcsx2-run` starts the installed PCSX2 with the options you give it. The Game Mode shortcuts use it, so they
keep working when a newer version of the app brings a newer PCSX2.

```bash
bc250-pcsx2-run -nogui -fullscreen -- "/path/to/game.iso"   # a game alone, full screen (Game Mode)
bc250-pcsx2-run -nogui -- "/path/to/game.iso"               # a game alone, in a window
bc250-pcsx2-run                                             # PCSX2's own window
```

## New PCSX2 releases

PCSX2 publishes a nightly build for almost every change and, now and then, a stable release (2.8.2). Each version
of the app installs one stable release, the one it was tried with. When the window opens, the app asks GitHub for
PCSX2's newest stable. When that one is newer, the first step says so, with a link to what is new; the app does not
install it. A newer PCSX2 comes with a newer version of the app, once it has been tried, from the
[portal](../portal.md): after updating the app, the first step says so, and **Install** brings it.

PCSX2's own window can also update itself. If it does, the first step says that PCSX2 updated itself, and
**Install** puts the tried release back. A game started from Game Mode or with **Play** never asks.

## Nightly builds

PCSX2's nightly builds carry its newest work and are mostly stable. Tick **Nightly builds** in the first step and
**Install** downloads the newest nightly instead of the tested stable release, checked against the checksum GitHub
publishes for that build. That checksum proves the download arrived whole; it does not make the build one this app
was tried with, and the first step says so. When a newer nightly is out, the step says so and **Install** brings
it.

Untick the box and **Install** puts the tested stable release back. Your games, the BIOS and the Game Mode
shortcuts stay as they are either way: the shortcuts start whatever PCSX2 is installed.

## How it works

The Game Mode shortcuts start `bc250-pcsx2-run`, which starts PCSX2. Two things change when Steam is the one that
starts it. Started with **Play**, from outside Steam, PCSX2 runs as it is.

### Controllers

When Steam starts a game, it tells the game's controller library (SDL) to ignore the controllers Steam handles
itself, and gives the game Steam's virtual controller in their place (Steam Input). PCSX2 then sees only that
virtual controller: it has no motion sensors, and on the desktop it follows the layout Steam has active, which may
be Steam's desktop layout (mouse and keys).

So the run wrapper undoes it: while a real controller is connected, PCSX2 reads that controller itself and leaves
Steam's virtual one (USB ID `28DE:11FF`) out. The PS button stays Steam's. Without a real controller, as on a Steam
Deck whose own controls exist only as Steam's virtual controller, the wrapper leaves Steam's choice as it is.
Controls are mapped in PCSX2's own window (**PCSX2 settings**, then **Settings > Controllers**).

### Steam's overlay on the desktop

The KDE desktop of Bazzite is a Wayland session. PCSX2 (a Qt program) opens its windows through Wayland when it
can, but Steam on the desktop only sees windows that go through X11 (XWayland, the X11 server within the Wayland
session). A game window Steam cannot see has no overlay: **Shift+Tab** and the **PS button** do nothing.

So when Steam starts a game on the Wayland desktop, the run wrapper has PCSX2 open its windows through XWayland
(`QT_QPA_PLATFORM=xcb`), and Steam's overlay works as in any other game. Game Mode runs every game through X11
already.

## What goes where

| What | Where |
|---|---|
| The app | `~/.local/share/bc250-pcsx2-manager/app` |
| PCSX2 | `~/.local/share/bc250-pcsx2-manager/emulator` |
| PCSX2's BIOS, memory cards, saves, settings | `~/.config/PCSX2` (PCSX2's own folder) |
| The memory cards' backups | Beside each card, in PCSX2's memory card folder |
| The app's settings, with the game folders | `~/.config/bc250-pcsx2-manager` |
| The Game Mode shortcuts | Steam's `shortcuts.vdf` and `grid` folder, per Steam user |
| Launchers | `~/.local/bin/bc250-pcsx2-manager`, `~/.local/bin/bc250-pcsx2-run` |

## Install and remove

Install the app from the [portal](../portal.md), where it is under Gaming. Removing it takes out the app and the
PCSX2 it installed; PCSX2's own folder (the BIOS, your memory cards and saves) and your games stay. The games in
Game Mode then no longer start: take them out first by unticking them and pressing **Update Game Mode**.

```bash
./install.sh                         # install or update
./install.sh --no-desktop-shortcut   # app menu entry only, no icon on the Desktop
./install.sh --uninstall             # remove the app and the PCSX2 it installed; keeps its settings
./install.sh --uninstall --purge     # also remove its settings
```

## Disclaimer

PCSX2 Manager is an independent project, not affiliated with or endorsed by the makers of PlayStation.
PlayStation and PS2 are trademarks of their owner.

## License

GPL-3.0-or-later. PCSX2 is a separate program under its own license (GPL-3.0), downloaded from its own release.
The memory card code is from [mymc++](https://github.com/Adubbz/mymcplusplus) (GPL-3.0-or-later) by Adubbz, based on
mymc+ by Florian Märkl and mymc by Ross Ridge.
