<!-- SPDX-License-Identifier: GPL-3.0-or-later -->

![shadPS4 Manager](../assets/shadps4/bc250-shadps4-manager.webp){ .app-logo }

# shadPS4 Manager

Plays **PS4 games** on the **AMD BC-250** with [shadPS4](https://github.com/shadps4-emu/shadPS4), an open-source
PS4 emulator. The app installs the shadPS4 release it was tried with, finds the games in your game folders and adds
them to Steam, so they start from **Game Mode** like any other game. It also unpacks package files (`.pkg`) into a
game folder, with **Extract PKG**.

Whether a game runs, and how well, is up to shadPS4. Its
[compatibility list](https://github.com/shadps4-emu/shadps4-game-compatibility/issues) shows what others found.

## What you need

- **Your games**, installed from your own PS4: each game in a folder of its own, with its `eboot.bin` and its
  `sce_sys` folder, or as a package file (`.pkg`) that **Extract PKG** unpacks into that layout. The app never
  downloads games.
- **System modules** for some games: libraries of the PS4's firmware (`.sprx` files), from your own console. Many
  games run without them. The app cannot ship them; it shows which ones are there.
- **Steam**, started at least once, for Game Mode.
- About 35 MB for shadPS4 itself. Its saves, settings and shader cache go in `~/.local/share/shadPS4`.
- **FUSE 2** (`libfuse.so.2`), which Bazzite has. shadPS4 comes as an AppImage, which mounts itself with it.
  Without it, it unpacks itself to a temporary folder on every start, which takes longer.

## Using it

The window has four steps, then the list of games.

1. **shadPS4**: **Install** downloads shadPS4 from its GitHub release (about 31 MB) and checks it against the
   checksum this version of the app was tried with before unpacking it. **Remove** takes it out again; shadPS4's own
   folder, with your saves and settings, stays. **Nightly builds** switches to shadPS4's nightly builds; see
   [Nightly builds](#nightly-builds).
2. **System modules**: how many of the modules that shadPS4 cannot do without are in its module folder. **Open
   folder** opens it, so you can copy your modules in. Hold the pointer over the text to see which are missing.
3. **Game folders**: the folders shadPS4 looks for games in. **Add folder…** adds one through shadPS4 itself, so its
   own window lists the games too. A game may sit up to five folders deep. **Extract PKG…** unpacks a package file
   into one of them: see [Extract PKG](#extract-pkg).
4. **shadNet**: whether shadPS4 signs in to shadNet, its online service, and with which account. **Account…** sets
   it up: see [shadNet](#shadnet).

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

### shadNet

shadNet is shadPS4's online service: online trophies, friends and online play, in the games shadPS4 supports online.
shadPS4 signs in by itself when a game starts, once it knows your account. **Account…** opens a window for it:

- **Server**: the shadNet server, `srv.shadps4.net:31313` (shadPS4's own) unless you use another one.
- **shadPS4 user**: which of shadPS4's users signs in. Games play as player 1, the first user.
- **shadNet name** and **Password**: your account. The name has 3 to 16 letters, digits, `-` or `_`, and is
  case-sensitive when you sign in.
- **Email**: needed to create an account.
- **Registration key**: only for a server that asks for one to create an account; its owner gives it to you.

**Create account** makes a new account on the server with that name, password and email. **Try sign-in** signs in
once and out again, to check the name and password. **Save** keeps it all in shadPS4's own files, with **Sign in to
shadNet when a game starts** ticked to use it, or unticked to stop. Close shadPS4 before you save: it writes its own
settings back when it ends.

The header shows the state of shadNet beside the app's own:

- **shadNet Online**: while a game runs, shadPS4 is signed in. Without a game, the server answers, so shadPS4 can
  sign in when one starts. The app asks the server without signing in.
- **shadNet Offline**: the server does not answer, or shadPS4's sign-in was refused or dropped. Hold the pointer
  over it to see why.
- **shadNet Off**: no account is set up, or **Sign in to shadNet when a game starts** is off.

While shadPS4 runs, the app reads shadPS4's log every few seconds to see whether it signed in.

shadPS4 keeps the password as it is in its `users.json`, and shadNet sends it over the network unencrypted. Use a
password you use nowhere else.

### Game Mode

Tick the games you want in Game Mode and press **Update Game Mode**. The app adds them to Steam as non-Steam games,
with the game's own icon and background as their pictures and its icon (`sce_sys/icon0.png`) as the logo on the
banner, and takes out the games you unticked and games it no longer finds. Steam keeps these files in memory, so it
closes for the change and starts again in the background. A game added before the app set the logo gets it the next
time you press **Update Game Mode**, which is on for it until then.

In Steam each game's name starts with its system, for example **[PS4] Lumines**, so it stands apart from the same
title on Steam or on another system in Steam's menus. A game added under its title alone is renamed the next time you
press **Update Game Mode**, which is on for it until then. Steam sees the renamed game as a new one: its play time
stays, but a controller layout or collection you set for it in Steam has to be set again.

In Game Mode the games are in the library under **Non-Steam**. They start shadPS4 full screen. Steam's menu and
**Exit game** work as for any game.

Steam's overlay works over a game started from Steam, in Game Mode and on the desktop: press **Shift+Tab** or the
**PS button** for the game's page, its controller layout and its settings, without leaving the game.

A game started from Steam reads your controllers itself, a DualShock 4 or DualSense with its touchpad and motion
sensors. [How it works](#how-it-works) explains both.

Change Game Mode from Desktop Mode: in Game Mode Steam is the session itself and cannot close for the change.

## Extract PKG

**Extract PKG…** in the third step (or a `.pkg` dropped on the window) opens a window that unpacks package files
(`.pkg`: games, patches and add-on content) into the folder layout shadPS4 loads: a `TITLE_ID` folder (for example
`CUSA41215`) with `sce_sys/` and the game's files. Extracted into one of the game folders, a game shows up in the
list when the window closes, ready for **Play** and Game Mode. It needs no shadPS4 installed.

It can only open a package that shadPS4 can use: a fake-signed (re-encrypted) PKG. Retail packages that still carry
their original encryption cannot be opened; the window says **Failed to find PFSC header** then. A game unpacks to
roughly its package size, so the output folder needs that much room.

Drop a `.pkg` on the window or **Browse** to it: the icon and the SFO preview fill in at once, before anything is
extracted.

- **SFO Preview:** five keys from `param.sfo`: CATEGORY (`gd` game, `gp` patch, `ac` add-on content), CONTENT_ID,
  TITLE, TITLE_ID and VERSION. When the package has no readable `param.sfo`, CONTENT_ID and TITLE_ID come from the
  package header. Right-click the preview to copy a line, only its value, or everything.
- **icon preview (click):** the package's `icon0.png`, or the app's logo when there is none. Click it to see the
  package's `pic0.png` (or `pic1.png`) full screen; a click, Esc or the B button closes it. Right-click the full
  screen picture for **save as wallpaper**: it saves the picture as a PNG, named after the content id, to your
  Pictures folder or wherever you choose.
- **Rename to CONTENT_ID:** renames the package file to its content id, `UP9000-CUSA00038_00-ASTRONAUT0000002.pkg`.
  A game or patch gets its APP_VER appended without the dot (`...-0100.pkg`), add-on content (CATEGORY `ac`) keeps
  the content id alone. The window says so when the file already has that name or another file has it.
- **Output:** the folder the `TITLE_ID` folder goes into: the one you used last, or else the first of shadPS4's game
  folders. The line below it says whether it is a game folder; a game extracted elsewhere shows up only once you add
  that folder (**Add folder…**). The window refuses to extract into a `TITLE_ID` folder that already has something
  in it, and lists what it found: each extraction or preview needs a fresh folder, so nothing is mixed with an
  earlier run.
- **Extract PKG:** writes `sce_sys/` (the package's metadata files: `param.sfo`, icons, pictures, trophies, the
  decrypted `license.dat`, `nptitle.dat` and `npbind.dat`), then every file of the package, with the progress bar
  counting files. When it is done, the output folder opens in your file manager. The log at the bottom shows each
  step and each file; the same lines go to the log file (see [What goes where](#what-goes-where)).
- **Preview Only:** writes only `sce_sys/` and `filelist.txt`, the list of every file the package holds with its
  inode and the path it would get. Use it to see what is inside, or to check a package, without the full extraction.
- **Salvage Mode (skip bad metadata):** a package with damaged metadata normally stops the extraction at the first
  bad entry, so you see that something is wrong. With Salvage Mode on, bad entries are skipped and the rest is
  extracted; the log ends with a recovery summary, and the folder gets `salvage_report.txt` (the skipped entries)
  and `extraction_errors.txt` (every error). Files that failed are missing or incomplete; shadPS4 may still run the
  game when they are not needed.
- **Compare Extractions** opens a menu with two tools. **Compare two extraction folders…** compares, for example,
  this window's output with another tool's: which files only one of them has, which differ in size and, when you
  answer **Yes** to the hash question, which differ in content (SHA-256, slower). The summary goes to the log and
  a JSON report (`compare_report_<date>.json`) into the first folder. Both folders' `filelist.txt`, when present,
  are compared too. **Delta between two compare reports…** takes a before and an after report, for example from
  before and after a change in the extractor, and tells per count what went up or down and which files were fixed
  or are new; the text goes to the log and to `<after report>_delta.txt` next to the after report.

While an extraction runs, the buttons are greyed out and the window stays open until it has finished. When the window
opens and finds that an earlier one did not end cleanly (the app stopped while it was open), it says so, with the
last file it was extracting; a partial `TITLE_ID` folder from then is refused by the empty-folder check: delete it.

```
<game folder>/CUSA00038/
├── sce_sys/            param.sfo, icon0.png, pic0.png, pic1.png, trophy/, license.dat, ...
├── eboot.bin           the game's files, in the package's own folder tree
├── ...
└── filelist.txt        every entry of the package: index, inode, type, name and path
```

Patches and add-on content extract the same way into their own folders. For an update, rename its folder after the
game's with `-UPDATE` added: see [Game updates and mods](#game-updates-and-mods).

A small add-on package that only carries metadata (an unlock key) has no files besides `sce_sys/`; the window says
"no extractable outer PFS entries detected" and extracts what there is. Some such packages name no files at all;
their one data block is then written as `inode_1.bin`.

When a package does not extract:

- **"is not a valid PKG file":** the file does not start with the PKG magic; it is not a package, or it is
  truncated at the start.
- **"Failed to find PFSC header":** the package's file system could not be decrypted: the package keeps its retail
  encryption, or it is damaged. Only fake-signed packages can be extracted.
- **"Guardrail: target output folder is not empty":** choose or make an empty folder; the `TITLE_ID` folder under
  it must not exist yet or must be empty.
- **"PKG file size is different":** the file is shorter than its header says: an incomplete download or copy.
- **Preflight failed for file N:** the package's metadata for that file is inconsistent. Switch on Salvage Mode to
  get the other files.

A package is a table of metadata entries followed by an encrypted PFS file system image. The window reads the table,
derives the keys the way the console does for fake-signed packages (the "derived key 3" RSA block in `entry_keys`,
the image key in `image_key`, from them the EKPFS key, and with the seed in the image header the AES-XTS data and
tweak keys), decrypts the PFS, finds the compressed PFSC container in it, reads its inodes and directory entries,
and inflates each file block by block. It is a port of the C++ tool
[pkgxtractor](https://github.com/RobertoTorino/pkgxtractor) (`src/core/file_format/pkg.cpp`, `crypto.cpp`,
`psf.cpp`, themselves from shadPS4), so the two give the same files, and the same messages when a package is bad.

## From a terminal

`bc250-shadps4-run` starts the installed shadPS4 with the options you give it. The Game Mode shortcuts use it, so
they keep working when a newer version of the app brings a newer shadPS4.

```bash
bc250-shadps4-run -f true -g "/path/to/game/eboot.bin"   # a game, full screen
bc250-shadps4-run -g "/path/to/game/eboot.bin"           # a game, as shadPS4's settings say
bc250-shadps4-run -b                                     # shadPS4's own window
```

The app itself takes a package: `bc250-shadps4-manager file.pkg` opens it in Extract PKG, as opening a package with
the app from the file manager does. When the app is open already, the package goes to the open window.
`bc250-shadps4-pkg-cli` extracts without a window:

```bash
bc250-shadps4-pkg-cli <file.pkg> [output folder] [--salvage] [--preview-only] [--no-subfolder]
```

It prints the package's content id, title and SFO keys, extracts into `<output>/<TITLE_ID>/` (the output folder
defaults to the package's folder; `--no-subfolder` extracts straight into it), and writes `filelist.txt`.
`--preview-only` stops after `sce_sys/` and the list; `--salvage` skips bad entries. It exits with 0 when every file
was written, 2 when some failed, 1 when the package could not be opened. The two comparison tools run from the app
folder (`~/.local/share/bc250-shadps4-manager/app`, with the app's venv's python):

```bash
python -m shadps4_manager.pkgxtractor.compare <folder A> <folder B> [--hash] [--json-out report.json]
python -m shadps4_manager.pkgxtractor.compare_delta <before.json> <after.json> [--out delta.txt]
```

## New shadPS4 releases

Each version of the app installs one shadPS4 release, the one it was tried with. When the window opens, the app asks
GitHub for shadPS4's newest release (its stable releases, not the daily development builds). When that one is newer,
the first step says so, with a link to what is new; the app does not install it. A newer shadPS4 comes with a newer
version of the app, once it has been tried, from the [portal](../portal.md): after updating the app, the first step
says so, and **Install** brings it.

## Nightly builds

shadPS4 publishes a nightly build with its newest work, and those builds are mostly stable. Tick **Nightly builds**
in the first step and **Install** downloads the newest nightly instead of the tested stable release, checked
against the checksum GitHub publishes for that build. That checksum proves the download arrived whole; it does not
make the build one this app was tried with, and the first step says so. When a newer nightly is out, the step says
so and **Install** brings it.

Untick the box and **Install** puts the tested stable release back. Your games, saves and the Game Mode shortcuts
stay as they are either way: the shortcuts start whatever shadPS4 is installed.

## How it works

The Game Mode shortcuts start `bc250-shadps4-run`, which starts shadPS4. Two things change when Steam is the one
that starts it. Started with **Play**, from outside Steam, shadPS4 runs as it is.

### Controllers

When Steam starts a game, it tells the game's controller library (SDL) to ignore the controllers Steam handles
itself, and gives the game Steam's virtual controller in their place (Steam Input). shadPS4 then sees only that
virtual controller:

- it has no motion sensors and no touchpad, so a game that uses them cannot;
- on the desktop it follows the layout Steam has active. While Steam does not know that the game has the focus, that
  is Steam's desktop layout (mouse and keys), and the game gets no controller input at all.

So the run wrapper undoes it: while a real controller is connected, shadPS4 reads that controller itself and leaves
Steam's virtual one (USB ID `28DE:11FF`) out. The PS button stays Steam's. Without a real controller, as on a Steam
Deck whose own controls exist only as Steam's virtual controller, the wrapper leaves Steam's choice as it is.

### Steam's overlay on the desktop

The KDE desktop of Bazzite is a Wayland session. shadPS4 opens its window through Wayland when it can, but Steam on
the desktop only sees windows that go through X11 (XWayland, the X11 server within the Wayland session). A game
window Steam cannot see has no overlay: **Shift+Tab** and the **PS button** do nothing, and there is no way to the
game's page, controller layout or settings while it runs. Steam also cannot tell that the game has the focus, which
is why its desktop layout stays active (see above).

So when Steam starts a game on the Wayland desktop, the run wrapper has shadPS4 open its window through XWayland
(`SDL_VIDEO_DRIVER=x11`), and Steam's overlay works as in any other game. Game Mode runs every game through X11
already.

## What goes where

| What | Where |
|---|---|
| The app | `~/.local/share/bc250-shadps4-manager/app` |
| Its Python, with PyQt6 and cryptography | `~/.local/share/bc250-shadps4-manager/venv` |
| shadPS4 | `~/.local/share/bc250-shadps4-manager/emulator` |
| Extract PKG's log, and its crash marker and progress while it is open | `~/.local/share/bc250-shadps4-manager/pkgxtractor.log`, `.state`, `.progress` |
| shadPS4's saves, settings, system modules | `~/.local/share/shadPS4` (shadPS4's own folder) |
| Your shadNet account | `~/.local/share/shadPS4/users.json`, the server in its `config.json` |
| The app's settings, with Extract PKG's last used folders | `~/.config/bc250-shadps4-manager` |
| The Game Mode shortcuts | Steam's `shortcuts.vdf` and `grid` folder, per Steam user |
| Launchers | `~/.local/bin/bc250-shadps4-manager`, `~/.local/bin/bc250-shadps4-run`, `~/.local/bin/bc250-shadps4-pkg-cli` |

## Install and remove

Install the app from the [portal](../portal.md), where it is under Gaming. Removing it takes out the app and the shadPS4 it installed;
shadPS4's own folder (your saves) and your games stay. The games in Game Mode then no longer start: take them out
first by unticking them and pressing **Update Game Mode**.

Installing the app also removes the standalone Bazzite pkgxtractor, whose package extraction is in this app now
(Extract PKG). Its settings stay: Extract PKG starts in the folders you last used there.

```bash
./install.sh                         # install or update
./install.sh --no-desktop-shortcut   # app menu entry only, no icon on the Desktop
./install.sh --uninstall             # remove the app and the shadPS4 it installed; keeps its settings and log
./install.sh --uninstall --purge     # also remove its settings and log
```

## Disclaimer

shadPS4 Manager is an independent project, not affiliated with or endorsed by the makers of PlayStation.
PlayStation and PS4 are trademarks of their owner.

## License

GPL-3.0-or-later. shadPS4 is a separate program under its own license (GPL-2.0), downloaded from its own release.
Extract PKG's PKG/PFS/PSF code is a port of shadPS4's (GPL-2.0-or-later).
