<!-- SPDX-License-Identifier: AGPL-3.0-or-later -->

# BC250 Console Link

![BC250 Console Link](../assets/console-link/bc250-console-link.png){ .app-logo }

Console Link connects the **AMD BC-250** to a PS4 or PS5 on your network. The app finds the consoles, wakes them
from rest mode, registers the board with them, and starts a session and its stream. The consoles' own name for
this is Remote Play, and it has to be switched on there.

The app does not change how the board runs. It talks to a console, or to PSN for your account ID, only when you
press a button. This version
starts a session and its stream and closes them again: it counts the picture and sound that arrive, but does not
show the picture, play the sound or take controller input.

## What you need

- **Remote Play on the console:** Settings > System > Remote Play > Enable Remote Play.
- **To wake it from rest mode:** on a PS5, Settings > System > Power Saving > Features Available in Rest Mode:
  switch on **Stay Connected to the Internet** and **Enable Turning On PS5 from Network**. A PS4 has the same two
  switches under Settings > Power Saving Settings > Set Features Available in Rest Mode.
- **The same network:** the board and the console in one local network. Remote Play over the internet is not
  part of this app.
- **Your PSN account ID:** the number of your PlayStation Network account, not your online name. PlayStation
  does not show it anywhere; **Find my account ID…** reads it through the PlayStation sign-in (see below). The app
  also takes the number itself (for example `4782394583276428394`) or the 12-character code that ends with `=`, the
  way chiaki-ng shows it. It is the same for every console you register with this account.

## Using it

The top row shows how many consoles answered the last search, how many the board is registered with, how the
**last session** went and the **console type** the console reported.

**Consoles on the network:**

- **Search:** asks every PS4 and PS5 on the network to answer. Each one is listed with its name, model, address,
  state (**On** or **Rest mode**) and system version, and whether the board is registered with it.
- **Search at address:** asks one address. Use it when the search finds nothing, for example on a network that
  does not pass broadcasts (some mesh systems, a guest network, a VPN). The app remembers the address.

**Find my account ID…** (next to the account ID):

1. Press **Open the PlayStation sign-in**: your browser opens the PlayStation sign-in page. Sign in with the PSN
   account you use on the console. (**Copy the link** is for a browser on another device.)
2. The sign-in then shows a page that only says "redirect". Copy that page's address from the browser's address
   bar, paste it in the dialog and press **Get account ID**.

The app sends the code in that address to PSN once, reads your account ID and fills it in. It keeps only the
account ID, nothing of the sign-in. The code works for a few minutes and only once: if PSN refuses it, sign in
again. This is the same sign-in chiaki-ng uses.

**Register the board with a console:**

1. On a PS5, open Settings > System > Remote Play > **Link Device**; on a PS4, Settings > Remote Play Connection
   Settings > **Add Device**. It shows an 8-digit PIN for a few minutes.
2. In the app, select the console in the list, enter your account ID and the PIN, and press **Register with
   selected console**.

The console hands the board its keys, and the console appears under **Registered consoles**. A wrong PIN or a
wrong account ID is reported in the log at the bottom.

**Registered consoles:**

- **Wake:** turns the console on from rest mode. It takes about 20 seconds; **Search** then shows it as On.
- **Test session:** starts a Remote Play session, keeps it for 3 seconds and closes it. When it works, the board's
  registration and the connection to the console are in order. The log shows each step.
- **Test stream:** starts a session, runs a short network test, then the stream for 5 seconds, and closes it
  all. The network test measures the round trip and the largest packets that pass each way, and the stream asks
  for those. The board asks for 1080p at 60 frames per second from a PS5 and 720p from a PS4. When it works, the
  log shows the network test's results and the resolutions the console offers, and the message how many frames
  and sound packets arrived. When the network test fails, the stream still runs, with safe values. It needs the
  app's native core (see [Install and remove](#install-and-remove)).
- **Rest mode:** puts the console in rest mode, through a short session.
- **Login passcode…:** when the PSN account on the console has a 4-digit login passcode, the console asks for it
  at the start of a session. Enter it here once.
- **Remove:** forgets the console's keys on the board. A PS5 lists the board under Link Device: remove it there
  too to undo the registration completely. A PS4 has no such list. It keeps a history of the connections under
  Settings > Remote Play Connection Settings > **Connection History** (date, account, nearby or over the internet,
  and the device, which shows as PC); the OPTIONS button there clears all entries at once.

When a console gets another address from the router, the next search finds it, and the app updates the address of
the registered console.

## Where it keeps what

- `~/.config/bc250-console-link/consoles.json`: the registered consoles and their keys. Anyone with these keys can
  start a session with your account on the console, so the file is readable only by you.
- `~/.config/bc250-console-link/bc250-console-link.ini`: your account ID, the last address you searched and the
  window size. The account ID only identifies the account; it gives no access to it.

## When it does not work

- **Search finds nothing:** check that Remote Play is on, and that the console is on or in rest mode with the two
  rest-mode switches on. Try **Search at address** with the console's address (the console shows it under
  Settings > Network > Connection Status). The console answers on UDP port 9303 to 9319 of the board: Bazzite's
  firewall lets these through by default, a stricter firewall zone may not.
- **Registration: no answer:** the PIN screen (Link Device on a PS5, Add Device on a PS4) must be open on the
  console while you register, and the PIN is only valid for a few minutes.
- **The console was switched off completely:** Wake and the tests only reach a console that is on or in rest mode.
  For the board to reach it in rest mode, switch on **Stay Connected to the Internet** and turning it on from the
  network in its rest-mode settings (see [What you need](#what-you-need)).
- **Remote Play is already in use:** another device has a session with the console. Close it there.
- **The console asks for the login passcode:** enter it with **Login passcode…**.
- **Test stream: no answer on the stream port:** the stream uses UDP port 9296 of the console, the network test
  port 9297. Test session working but Test stream not points to a firewall or router between the two that blocks
  them.
- **Test stream: the native core is not installed:** install Rust and run `install.sh` again (see below).

## Install and remove

The portal installs it, under Development only. By hand, from the extracted release folder:

```bash
./install.sh                         # install or update
./install.sh --no-desktop-shortcut   # app menu entry only, no icon on the Desktop
./install.sh --uninstall             # remove the app; keeps its settings and the registered consoles
./install.sh --uninstall --purge     # also remove its settings and the registered consoles' keys
```

The app has its own Python environment in `~/.local/share/bc250-console-link/venv`, with PyQt6 and cryptography.

The stream runs on the app's native core, written in Rust. `install.sh` builds it into the app's environment when
Rust is installed, which takes a minute or two the first time. Install Rust with [rustup](https://rustup.rs) (it
installs in your home folder), then run `install.sh` again. Without it, everything but **Test stream** works.

## Disclaimer

BC250 Console Link is an independent project, not affiliated with or endorsed by the makers of PlayStation.
PlayStation, PS4, PS5 and PSN are trademarks of their owner.

## License

AGPL-3.0. The protocol code is ported from [chiaki-ng](https://github.com/streetpea/chiaki-ng), which is
AGPL-3.0-only with an OpenSSL exception; those files keep that license, the app's own files are AGPL-3.0-or-later.
