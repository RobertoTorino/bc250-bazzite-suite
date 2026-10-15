<!-- SPDX-License-Identifier: GPL-3.0-or-later -->

# Bazzite pkgxtractor

![Bazzite pkgxtractor](../assets/bazzite-pkgxtractor/bazzite-pkgxtractor.png){ .app-logo }

pkgxtractor unpacks package files (`.pkg`: games, patches and add-on content) into the folder layout
the **shadPS4** emulator loads, on a **BC-250** running **Bazzite** or any other Linux desktop. Pick a package, see
its icon and what `param.sfo` says about it, choose an empty output folder, and extract. The result is the same as
that of the C++ tool [pkgxtractor](https://github.com/RobertoTorino/pkgxtractor) on Windows: a `TITLE_ID` folder
(for example `CUSA41215`) with `sce_sys/` and the game's files.

The app does not change how the board runs. It reads the package and writes files into the folder you choose;
nothing is installed system-wide and nothing is layered with `rpm-ostree`.

## What it needs

- Python 3.10 or newer: Bazzite ships `python3`. The installer makes the app's own virtual environment with PyQt6
  and [cryptography](https://cryptography.io/) in it (the wheels bundle Qt and OpenSSL), so nothing else is needed.
- A package that shadPS4 can use: a fake-signed (re-encrypted) PKG. Retail packages that still carry their original
  encryption cannot be opened, by this app or by the C++ tool; it says **Failed to find PFSC header** then.
- Room for the output: a game unpacks to roughly its package size.

## Install

In the [portal](../portal.md), open **Development only** and click the Install button beside its icon. Or by hand:
from the suite's [Releases](https://github.com/RobertoTorino/bc250-bazzite-suite/releases) page, download the
`bazzite-pkgxtractor-v<version>.tar.gz` release and extract it. Run `install.sh` as your own user, without `sudo`:

```shell
./install.sh
```

It installs:

- `~/.local/share/bazzite-pkgxtractor/app`: the app, and `venv` next to it with PyQt6 and cryptography.
- `~/.local/bin/bazzite-pkgxtractor`: starts the window; `~/.local/bin/bazzite-pkgxtractor-cli` is the
  terminal extractor.
- An app menu entry ("Bazzite pkgxtractor", under Utilities) and an icon on the Desktop.
  `./install.sh --no-desktop-shortcut` leaves the Desktop icon out.

Install it again to update. Uninstall it in the portal, or with `./install.sh --uninstall`: that removes the app,
the venv, the launchers and the menu entry, and keeps your settings and logs; `./install.sh --uninstall --purge`
removes those too.

**Steam Game Mode:** add `~/.local/bin/bazzite-pkgxtractor` as a non-Steam game (Steam → Games → Add a
Non-Steam Game → Browse) to start it from the Deck UI. The window is resizable and works with touch.

## Using it

The first line shows the app's logo, its name and version, and the **PKG File** field with **Browse** and **Rename
to CONTENT_ID**. Drop a `.pkg` on the window or Browse to it: the icon and the SFO preview fill in at once, before
anything is extracted.

- **SFO Preview:** five keys from `param.sfo`: CATEGORY (`gd` game, `gp` patch, `ac` add-on content), CONTENT_ID,
  TITLE, TITLE_ID and VERSION. When the package has no readable `param.sfo`, CONTENT_ID and TITLE_ID come from the
  package header. Right-click the preview to copy a line, only its value, or everything.
- **icon preview (click):** the package's `icon0.png`, or the app's logo when there is none. Click it to see the
  package's `pic0.png` (or `pic1.png`) full screen; a click, Esc or the B button closes it. Right-click the full
  screen picture for **save as wallpaper**: it saves the picture as a PNG, named after the content id, to your
  Pictures folder or wherever you choose.
- **Rename to CONTENT_ID:** renames the package file to its content id, `UP9000-CUSA00038_00-ASTRONAUT0000002.pkg`.
  A game or patch gets its APP_VER appended without the dot (`...-0100.pkg`), add-on content (CATEGORY `ac`) keeps
  the content id alone. The app says so when the file already has that name or another file has it.
- **Output:** the folder the `TITLE_ID` folder goes into. Browse to an empty folder or make a new one. The app
  refuses to extract into a `TITLE_ID` folder that already has something in it, and lists what it found: each
  extraction or preview needs a fresh folder, so nothing is mixed with an earlier run.
- **Extract PKG:** writes `sce_sys/` (the package's metadata files: `param.sfo`, icons, pictures, trophies, the
  decrypted `license.dat`, `nptitle.dat` and `npbind.dat`), then every file of the package, with the progress bar
  counting files. When it is done, the output folder opens in your file manager. The log at the bottom shows each
  step and each file; the same lines go to the log file (see [Files](#files)).
- **Preview Only:** writes only `sce_sys/` and `filelist.txt`, the list of every file the package holds with its
  inode and the path it would get. Use it to see what is inside, or to check a package, without the full extraction.
- **Salvage Mode (skip bad metadata):** a package with damaged metadata normally stops the extraction at the first
  bad entry, so you see that something is wrong. With Salvage Mode on, bad entries are skipped and the rest is
  extracted; the log ends with a recovery summary, and the folder gets `salvage_report.txt` (the skipped entries)
  and `extraction_errors.txt` (every error). Files that failed are missing or incomplete; shadPS4 may still run the
  game when they are not needed.
- **Compare Extractions** opens a menu with two tools. **Compare two extraction folders…** compares, for example,
  this app's output with another tool's: which files only one of them has, which differ in size and, when you
  answer **Yes** to the hash question, which differ in content (SHA-256, slower). The summary goes to the log and
  a JSON report (`compare_report_<date>.json`) into the first folder. Both folders' `filelist.txt`, when present,
  are compared too. **Delta between two compare reports…** takes a before and an after report, for example from
  before and after a change in the extractor, and tells per count what went up or down and which files were fixed
  or are new; the text goes to the log and to `<after report>_delta.txt` next to the after report. With the C++
  tool these two were separate Python scripts; here they are part of the app.

While an extraction runs, the buttons are greyed out; the window stays usable. Closing the window stops the app;
an extraction stopped that way leaves a partial folder, which the guardrail then refuses next time: delete it first.

## The output folder

```
<Output>/CUSA00038/
├── sce_sys/            param.sfo, icon0.png, pic0.png, pic1.png, trophy/, license.dat, ...
├── eboot.bin           the game's files, in the package's own folder tree
├── ...
└── filelist.txt        every entry of the package: index, inode, type, name and path
```

In shadPS4, point the games folder at `<Output>` (the folder that holds the `TITLE_ID` folders), or install the
`TITLE_ID` folder into shadPS4's games folder. Patches and add-on content extract the same way into their own
folders; where they go depends on the shadPS4 version, see its documentation.

A small add-on package that only carries metadata (an unlock key) has no files besides `sce_sys/`; the app says
"no extractable outer PFS entries detected" and extracts what there is. Some such packages name no files at all;
their one data block is then written as `inode_1.bin`, as the C++ tool does.

## From the terminal

```bash
bazzite-pkgxtractor [file.pkg]                 # the window, optionally with a package loaded
bazzite-pkgxtractor-cli <file.pkg> [output folder] [--salvage] [--preview-only] [--no-subfolder]
```

The window opens once: when it is already open, `bazzite-pkgxtractor file.pkg` (or opening a package with it from
the file manager) loads that package in the open window.

The terminal extractor prints the package's content id, title and SFO keys, extracts into `<output>/<TITLE_ID>/`
(the output folder defaults to the package's folder; `--no-subfolder` extracts straight into it), and writes
`filelist.txt`. `--preview-only` stops after `sce_sys/` and the list; `--salvage` skips bad entries. It exits with
0 when every file was written, 2 when some failed, 1 when the package could not be opened. The two comparison
tools run from the app folder (`~/.local/share/bazzite-pkgxtractor/app`, with its venv's python):

```bash
python -m bazzite_pkgxtractor.compare <folder A> <folder B> [--hash] [--json-out report.json]
python -m bazzite_pkgxtractor.compare_delta <before.json> <after.json> [--out delta.txt]
```

## Files

- `~/.config/bazzite-pkgxtractor/bazzite-pkgxtractor.ini`: the last used package and output folders.
- `~/.local/share/bazzite-pkgxtractor/bazzite-pkgxtractor.log`: every line the log panel showed, per
  session, appended. Look here when an extraction went wrong.
- `~/.local/share/bazzite-pkgxtractor/bazzite-pkgxtractor.state` and `.progress`: written while the app
  runs and removed when it quits cleanly. When the app starts and finds them, it tells you the previous run did
  not end cleanly, with the last file it was extracting.
- In the output folder: `filelist.txt` always; `extraction_errors.txt` and `salvage_report.txt` when there were
  errors; `compare_report_<date>.json` after a comparison, `compare_report_<date>_delta.txt` after a delta.

## When something does not work

- **"is not a valid PKG file":** the file does not start with the PKG magic; it is not a package, or it is
  truncated at the start.
- **"Failed to find PFSC header":** the package's file system could not be decrypted: the package keeps its retail
  encryption, or it is damaged. Only fake-signed packages can be extracted.
- **"Guardrail: target output folder is not empty":** choose or make an empty folder; the `TITLE_ID` folder under
  it must not exist yet or must be empty.
- **"PKG file size is different":** the file is shorter than its header says: an incomplete download or copy.
- **Preflight failed for file N:** the package's metadata for that file is inconsistent. Switch on Salvage Mode to
  get the other files.
- **No window on an X11 session:** PyQt6's X11 plugin needs `libxcb-cursor`; Bazzite's Wayland sessions do not.
  `QT_QPA_PLATFORM=xcb bazzite-pkgxtractor` or `=wayland` picks the backend by hand.

## How it works

A package is a table of metadata entries followed by an encrypted PFS file system image. The app reads the
table, derives the keys the way the console does for fake-signed packages (the "derived key 3" RSA block in
`entry_keys`, the image key in `image_key`, from them the EKPFS key, and with the seed in the image header the
AES-XTS data and tweak keys), decrypts the PFS, finds the compressed PFSC container in it, reads its inodes and
directory entries, and inflates each file block by block. It is a line-for-line port of the C++ tool's code
(`src/core/file_format/pkg.cpp`, `crypto.cpp`, `psf.cpp`), so the two tools give the same files, and the same
messages when a package is bad.

## License

GPL-3.0-or-later. The PKG/PFS/PSF code is a port of shadPS4's (GPL-2.0-or-later).
