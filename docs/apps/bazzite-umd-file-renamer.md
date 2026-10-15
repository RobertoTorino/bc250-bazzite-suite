<!-- SPDX-License-Identifier: GPL-3.0-or-later -->

# Bazzite UMD File Renamer

![Bazzite UMD File Renamer](../assets/bazzite-umd-file-renamer/bazzite-umd-file-renamer.png){ .app-logo }

UMD File Renamer gives PSP ISO images a proper name, on **Bazzite** or any other Linux desktop. It reads
`PSP_GAME/PARAM.SFO` inside each `.iso` (the disc ID, the title, the disc version and the firmware it needs) and
`ICON0.PNG`, `PIC0.PNG` and `PIC1.PNG`, shows them, and renames the files to a form you choose, such as
`ULJM05437 - Ever17.iso`. Nothing inside the images changes: only the file names do.

The app does not change how the board runs. Nothing is installed system-wide and nothing is layered with
`rpm-ostree`.

## What it needs

- Python 3.10 or newer: Bazzite ships `python3`. The installer makes the app's own virtual environment with PyQt6
  in it (the wheel bundles Qt), so nothing else is needed.
- PSP images as `.iso`. The old Java version also read `.cso`; this one, like the C++ tool, does not.
- To start a game from the app: PPSSPP, as the Flatpak `org.ppsspp.PPSSPP` (Discover installs it), as a binary on
  the PATH, or anywhere you point the app to.

## Install

In the [portal](../portal.md), open **Development only** and click the Install button beside its icon. Or by hand:
from the suite's [Releases](https://github.com/RobertoTorino/bc250-bazzite-suite/releases) page, download the
`bazzite-umd-file-renamer-v<version>.tar.gz` release and extract it. Run `install.sh` as your own user, without `sudo`:

```shell
./install.sh
```

It installs:

- `~/.local/share/bazzite-umd-file-renamer/app`: the app, and `venv` next to it with PyQt6.
- `~/.local/bin/bazzite-umd-file-renamer`: starts the window, with a folder or an `.iso` as argument if you like.
- An app menu entry ("Bazzite UMD File Renamer", under Utilities) and an icon on the Desktop.
  `./install.sh --no-desktop-shortcut` leaves the Desktop icon out.

Install it again to update. Uninstall it in the portal, or with `./install.sh --uninstall`: that removes the app,
the venv, the launcher and the menu entry, and keeps your settings; `./install.sh --uninstall --purge` removes
those too.

**Steam Game Mode:** add `~/.local/bin/bazzite-umd-file-renamer` as a non-Steam game (Steam → Games → Add a
Non-Steam Game → Browse) to start it from the Deck UI. The window is resizable and works with touch.

## Using it

The first line shows the app's logo, its name and version, and below it the **Source** row:

- **Open Folder...** reads every `.iso` in the folder (not in its subfolders) and lists the ones that are PSP
  images. **Open ISO...** lists one file. The folder is remembered for next time.
- **Naming** is the form of the new file name, applied to every game in the list. With disc ID `ULJM05437`, title
  `Ever17` and disc version `1.01`:

  | Naming                 | New name                          |
  | ---------------------- | --------------------------------- |
  | ID - Title             | `ULJM05437 - Ever17.iso`          |
  | ID Title               | `ULJM05437 Ever17.iso`            |
  | ID - Title - Version   | `ULJM05437 - Ever17 - v1.01.iso`  |
  | Title - ID             | `Ever17 - ULJM05437.iso`          |
  | Title Id               | `Ever17 ULJM05437.iso`            |
  | Title only             | `Ever17.iso`                      |
  | Title [ID]             | `Ever17 [ULJM05437].iso`          |
  | Title [ID] [Version]   | `Ever17 [ULJM05437] [v1.01].iso`  |

  Characters that a file name cannot hold (`\ / : * ? " < > |`) and the ™ sign are dropped from the title. The
  file's own extension is kept as it is (`.iso` or `.ISO`).
- **⚙** opens the settings: **Set PPSSPP Path...** points the app at a PPSSPP executable or AppImage. Without
  it, the app uses the Flatpak `org.ppsspp.PPSSPP` when it is installed, else `PPSSPPSDL`, `PPSSPPQt` or
  `ppsspp` on the PATH.

The table lists each game with its ID, title, version, firmware, current file name and the name it will get.
Click a column header to sort. The **▶** button in the last column starts that game in PPSSPP, full screen.

**Game details** shows the selected game. The picture on the left is `ICON0`; click it to switch to `PIC0`,
then `PIC1`, then back. Edit the **Title** and press **Apply title change** to use your own title in the list and
the new name. **Translate** opens Google Translate in your browser with the title (Japanese to English); type the
translation into **Translation** and press **Apply translation**: the list and the new name then use it instead of
the title. Leave the field empty and apply again to go back to the title.

**Rename All** renames every listed file to its new name, in place. A file that already has its new name is left
alone. When another file in the folder already has that name, that game is skipped and the app says so when it is
done; nothing is ever overwritten.

## From the terminal

```bash
bazzite-umd-file-renamer                      # the window
bazzite-umd-file-renamer ~/Games/PSP          # the window with that folder loaded
bazzite-umd-file-renamer ~/Games/PSP/game.iso # the window with that one image loaded
```

The window opens once: when it is already open, the command (or opening a folder or an image with the app from
the file manager) loads that folder or image in the open window.

## Files

- `~/.config/bazzite-umd-file-renamer/bazzite-umd-file-renamer.ini`: the naming template, the PPSSPP path and the
  last folder.

## When something does not work

- **"0 game(s) found":** the folder has no `.iso` that holds `PSP_GAME/PARAM.SFO`. A `.cso`, a PS1 `.bin` or a
  PSP image in a subfolder is not listed.
- **"PPSSPP not found":** install PPSSPP from Discover (the Flatpak), or set its path in the settings. A game
  started from the app runs with `--fullscreen`; Esc leaves full screen in PPSSPP.
- **A game does not start in the Flatpak PPSSPP:** the Flatpak may not be allowed to read the folder your images
  are in. Flatseal, or `flatpak override --user --filesystem=<folder> org.ppsspp.PPSSPP`, grants it.
- **"n renamed, m failed":** the names listed already exist in the folder, or the folder is read-only. Rename or
  remove the file in the way, or pick another naming template.
- **No window on an X11 session:** PyQt6's X11 plugin needs `libxcb-cursor`; Bazzite's Wayland sessions do not.
  `QT_QPA_PLATFORM=xcb bazzite-umd-file-renamer` or `=wayland` picks the backend by hand.

## How it works

A PSP image is an ISO 9660 file system. The app reads the Primary Volume Descriptor at sector 16, walks the
directory records to `PSP_GAME`, and reads `PARAM.SFO`: a small table of keys and values, of which `DISC_ID`,
`TITLE`, `DISC_VERSION` and `PSP_SYSTEM_VER` make the name. The ISO reader and the SFO parser are line-for-line
ports of the C++ tool's (`qt/src/isoreader.cpp`, `qt/src/psfparser.cpp`), so both tools read the same names.

## License

GPL-3.0-or-later.
