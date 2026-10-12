<!-- SPDX-License-Identifier: AGPL-3.0-or-later -->

# BC250 Remote Play

![BC250 Remote Play](../assets/remote-play/bc250-remote-play.png){ .app-logo }

Remote Play connects the **AMD BC-250** to a PS4 or PS5 on your network. The app finds the consoles, wakes them
from rest mode, registers the board with them, and starts a Remote Play session.

The app does not change how the board runs. It talks to a console only when you press a button. This version
starts a session and closes it again; it does not show the console's picture or take controller input.

## What you need

- **Remote Play on the console:** Settings > System > Remote Play > Enable Remote Play.
- **To wake it from rest mode:** on a PS5, Settings > System > Power Saving > Features Available in Rest Mode:
  switch on **Stay Connected to the Internet** and **Enable Turning On PS5 from Network**. A PS4 has the same two
  switches under Settings > Power Saving Settings > Set Features Available in Rest Mode.
- **The same network:** the board and the console in one local network. Remote Play over the internet is not
  part of this app.
- **Your PSN account ID:** the number of your PlayStation Network account, not your online name. The app takes the
  number itself (for example `4782394583276428394`) or the 12-character code that ends with `=`, the way chiaki-ng
  shows it. chiaki-ng's PSN login gives you the code; it is the same for every console you register with this
  account.

## Using it

The top row shows how many consoles answered the last search, how many the board is registered with, how the
**last session** went and the **console type** the console reported.

**Consoles on the network:**

- **Search:** asks every PS4 and PS5 on the network to answer. Each one is listed with its name, model, address,
  state (**On** or **Rest mode**) and system version, and whether the board is registered with it.
- **Search at address:** asks one address. Use it when the search finds nothing, for example on a network that
  does not pass broadcasts (some mesh systems, a guest network, a VPN). The app remembers the address.

**Register the board with a console:**

1. On the console, open Settings > System > Remote Play > **Link Device**. It shows an 8-digit PIN for a few
   minutes.
2. In the app, select the console in the list, enter your account ID and the PIN, and press **Register with
   selected console**.

The console hands the board its keys, and the console appears under **Registered consoles**. A wrong PIN or a
wrong account ID is reported in the log at the bottom.

**Registered consoles:**

- **Wake:** turns the console on from rest mode. It takes about 20 seconds; **Search** then shows it as On.
- **Test session:** starts a Remote Play session, keeps it for 3 seconds and closes it. When it works, the board's
  registration and the connection to the console are in order. The log shows each step.
- **Rest mode:** puts the console in rest mode, through a short session.
- **Login passcode…:** when the PSN account on the console has a 4-digit login passcode, the console asks for it
  at the start of a session. Enter it here once.
- **Remove:** forgets the console's keys on the board. To undo a registration completely, also remove the board on
  the console, under Link Device.

When a console gets another address from the router, the next search finds it, and the app updates the address of
the registered console.

## Where it keeps what

- `~/.config/bc250-remote-play/consoles.json`: the registered consoles and their keys. Anyone with these keys can
  start a session with your account on the console, so the file is readable only by you.
- `~/.config/bc250-remote-play/bc250-remote-play.ini`: your account ID, the last address you searched and the
  window size.

## When it does not work

- **Search finds nothing:** check that Remote Play is on, and that the console is on or in rest mode with the two
  rest-mode switches on. Try **Search at address** with the console's address (the console shows it under
  Settings > Network > Connection Status). The console answers on UDP port 9303 to 9319 of the board: Bazzite's
  firewall lets these through by default, a stricter firewall zone may not.
- **Registration: no answer:** Link Device must be open on the console while you register, and the PIN is only
  valid for a few minutes.
- **Remote Play is already in use:** another device has a session with the console. Close it there.
- **The console asks for the login passcode:** enter it with **Login passcode…**.

## Install and remove

The portal installs it, under Development only. By hand, from the extracted release folder:

```bash
./install.sh                         # install or update
./install.sh --no-desktop-shortcut   # app menu entry only, no icon on the Desktop
./install.sh --uninstall             # remove the app; keeps its settings and the registered consoles
./install.sh --uninstall --purge     # also remove its settings and the registered consoles' keys
```

The app has its own Python environment in `~/.local/share/bc250-remote-play/venv`, with PyQt6 and cryptography.

## License

AGPL-3.0. The protocol code is ported from [chiaki-ng](https://github.com/streetpea/chiaki-ng), which is
AGPL-3.0-only with an OpenSSL exception; those files keep that license, the app's own files are AGPL-3.0-or-later.
