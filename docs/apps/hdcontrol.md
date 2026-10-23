<!-- SPDX-License-Identifier: GPL-3.0-or-later -->

![USB HD Control](../assets/hdcontrol/bc250-usb-hdcontrol.webp){ .app-logo }

# USB HD Control

Sony's **DualSense** and **DualSense Edge** controllers on **Bazzite**: their battery, their firmware and the Edge's
profiles. Sony updates the controllers' firmware only on a PS5 and in its PlayStation Accessories app for Windows.
This app sends the same firmware, from Sony's own server, over a USB cable. The app changes nothing on the board.

Linux's own `hid-playstation` driver drives the controller, so games and Steam see it as usual. The app talks to
the controller beside the driver, through its hidraw node (`/dev/hidraw<n>`).

## The window

The header shows the controller the window is looking at:

| Box | What it shows |
|---|---|
| **Controller** | DualSense or DualSense Edge |
| **Connection** | USB cable or Bluetooth |
| **Battery** | the level the controller reports, in steps of 10 %, and in its tooltip whether it charges |
| **Firmware** | the firmware's version as Sony numbers it (for example `0x0200`), with its build date in the tooltip |
| **Latest** | the latest version Sony offers for this controller, and when the app asked |

The state beside the title says whether an update is available. With more than one controller connected, a list
in the header chooses which one the window shows.

## The firmware update

**Check for an update** asks Sony's update server (`fwupdater.dl.playstation.net`) for the latest version of each
controller. With **Check when the window opens** on (the default), the window asks by itself, at most once a day.

When a newer version is out, **Update firmware…** in the header:

1. downloads the firmware from Sony's server (about 1 MB) and keeps it, so a second try needs no network;
2. checks that it fits: the firmware names the controller it is for (its USB product ID and its *target*), and its
   version must be newer than the one the controller runs;
3. saves a backup of the Edge's profiles (see [Profiles](#profiles));
4. sends it to the controller, with a progress bar.

It takes about half a minute. The controller then checks Sony's signature on the firmware, switches to it and
restarts. It leaves USB for a moment and comes back; the header then shows the new version. The profiles stay as
they were.

Before it starts:

- **Connect the controller with a USB cable.** The update does not go over Bluetooth.
- **Quit Steam** (Steam › Exit), and any other program that reads the controller. The app names the program that has
  the controller open and does not start while one does, so that nothing else talks to the controller during the
  update. In Game Mode, switch to the desktop first.
- Leave the cable in and the board on until the window says the update is done.

If the controller refuses the firmware or stops answering, the window says what it reported. Unplug the controller
and plug it in again: the header then shows which firmware it runs, and the update can be tried again.

### The firmware files

Sony serves one file per *target* and only the latest version of it. The DualSense's target depends on its
revision; the DualSense Edge's is `0044`. The app knows the files that were on Sony's server on 23-10-2026 by their
SHA-256:

| Target | Controller | Version | SHA-256 |
|---|---|---|---|
| `0044` | DualSense Edge | `0x0217` | `c157eec635f809232e06c255a0847e6b915b0032ca661b12ae35fb2e4eac49df` |
| `0004` | DualSense | `0x0630` | `861ad95a99b16805ff20f5690372988662c4f69c6ad0b266e793d7fc2292315a` |
| `000B` | DualSense | `0x0630` | `b66528795683d214ca06fe4672d298de75bf019bd5046442cbec63fc02974f86` |
| `000E` | DualSense | `0x0641` | `b9c217d8ded5f09f03034e7e5037af0c174c3c77a3cbd201ee5fd219ee448fc8` |

A newer file from Sony works too; the confirmation then says the app does not know it yet. The controller checks
Sony's signature either way. The files are kept in `~/.local/share/bc250-usb-hdcontrol/firmware/`, named after their
target and version (`FWUPDATE0044-0217.bin`).

**Use a file…** sends a firmware file you have, for example one kept from Sony's server before. The app checks it
the same way and refuses a file for another controller or one that is not newer.

## Profiles

The DualSense Edge keeps four profiles; Fn and Triangle, Square, Cross or Circle chooses one (Triangle is the
default profile). The **Profiles** table shows them as the controller reports them: the name, each stick's curve
(Default, Quick, Precise, Steady, Digital or Dynamic), each trigger's range, and the buttons that send something
other than themselves (the back buttons included). A profile whose checksum does not match is marked.

The app reads the profiles; change them on a PS5 or in Sony's app for Windows. **Back up…** saves them in a JSON
file, exactly as the controller holds them, and **Read again** reads them anew, for example after you changed them on
a PS5. The app also saves a backup before every firmware update, in `~/.local/share/bc250-usb-hdcontrol/profiles/`.

The plain DualSense has no profiles.

## From a terminal

```bash
bc250-usb-hdcontrol --info
```

prints each controller's connection, battery, firmware and profiles, without a window and without the network.

## Access to the controller

Bazzite gives the user at the board the controller's hidraw node, so the app needs no password and no udev rule. On
a system that does not, the window says so; a udev rule with `TAG+="uaccess"` for the controller's USB ID
(`054c:0ce6` for the DualSense, `054c:0df2` for the DualSense Edge) gives the user at the board access.

## Install

Install it from the BC250 Bazzite Suite portal, or from a clone or release folder, as your own user:

```bash
./install.sh                         # app menu entry and Desktop icon
./install.sh --no-desktop-shortcut   # app menu entry only
./install.sh --uninstall             # remove the app; keeps its settings, firmware and profile backups
./install.sh --uninstall --purge     # also remove its settings, firmware and profile backups
```

It installs:

- the app in `~/.local/share/bc250-usb-hdcontrol/app`, with the `bc250_core` it was tested with;
- PyQt6 in the suite's shared venv `~/.local/share/bc250-bazzite-suite/venv`;
- the launcher `~/.local/bin/bc250-usb-hdcontrol`, an app menu entry and a Desktop icon.

Settings are kept in `~/.config/bc250-usb-hdcontrol/bc250-usb-hdcontrol.ini`.

## Credits

The update protocol comes from [dualsense-updater-rs](https://github.com/nchie/dualsense-updater-rs) (nchie), the
layout of the Edge's profiles from
[dualsense-edge-profile-web-application](https://github.com/steffalon/dualsense-edge-profile-web-application)
(steffalon). The firmware report is read as Linux's `hid-playstation` driver reads it.

## License

GPL-3.0-or-later — see [LICENSE](https://github.com/RobertoTorino/bc250-bazzite-suite/blob/main/apps/hdcontrol/LICENSE).
The code ported from the two projects above is MIT; the app's README keeps their notice. The controllers' firmware
is Sony's and is not part of the app.
