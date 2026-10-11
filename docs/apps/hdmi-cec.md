<!-- SPDX-License-Identifier: GPL-3.0-or-later -->

# BC250 HDMI CEC

![BC250 HDMI CEC](../assets/hdmi-cec/bc250-hdmi-cec.png){ .app-logo }

HDMI-CEC lets the board and the TV talk over the HDMI cable. With it you can turn the TV on and off from the
**AMD BC-250**, switch the TV to the board's input, set the volume, and use the TV remote on the board.

The app does not change how the board runs. It sends CEC messages to the TV only when you press a button.

## What the board needs

The BC-250 has only DisplayPort outputs, so the TV hangs on a DP-to-HDMI cable or adapter. There is a converter
chip in it, and CEC works only when that chip passes it on:

- **The adapter appears** when the converter reports CEC tunnelling. amdgpu then makes a CEC adapter for that
  output, `/dev/cec0`, named after the connector (`DP-1`). Many converters don't report it. Then there is no
  adapter, and nothing in software can add one. A USB CEC adapter (Pulse-Eight) is the alternative.
- **The TV answers** only when the converter also connects the CEC wire, and when CEC is switched on in the TV.
  TVs give CEC a brand name in their settings: Anynet+ (Samsung), SimpLink (LG), Bravia Sync (Sony), HDMI control or
  HDMI CEC (others).

Bazzite Test checks both (test 51).

## Using it

The top row shows the **CEC adapter** (the connector it belongs to), the board's **physical address** (the HDMI
input it is on, from the TV's EDID; "None" when the board sees no display), the **display**'s name and the
**TV power** after a check. Opening the app only reads these; nothing goes to the TV.

**TV:**

- **Turn TV on:** wakes the TV and switches it to the BC-250 (Image View On, then Active Source).
- **Switch to BC-250:** switches the TV to the board's input when it shows something else.
- **TV standby:** puts the TV in standby.
- **Check TV:** asks the TV whether it is there and on. The status next to the title then says **TV answers** or
  **TV does not answer**.
- **Volume −**, **Volume +** and **Mute:** go to an AV receiver when one answered the last check, else to the TV.
- **Devices on the bus…:** asks every device on the HDMI bus who it is, and lists them. Read-only.

When the TV does not answer, the app says what to check: CEC switched on in the TV, the TV on, and a cable or
adapter that passes CEC.

The first message configures the adapter when nothing has yet: the board then shows up on the TV as a playback
device named **BC-250**.

## Automatic: Valve's CEC daemon

Bazzite ships Valve's CEC daemon, `cecd`, the one SteamOS uses. It runs with your desktop session and can:

- **Turn the TV on when the board wakes from sleep.**
- **Put the TV in standby when the board goes to sleep.**
- **Use the TV remote as a keyboard:** arrows, OK, back and the media keys arrive as key presses.
- **Put the board to sleep when the TV goes to standby.**

The daemon is Bazzite's **native** CEC mode. Bazzite's other mode, **dGPU**, is for USB adapters. When the app
shows another mode, **Use Valve's CEC daemon…** runs Bazzite's own `ujust cec-mode native` in a terminal; it asks
for your password. Press **Check again** when it is done.

The four switches are the daemon's settings for your account. The app writes them to
`~/.config/cecd/config.d/99-bc250-hdmi-cec.toml` and tells the daemon to read them again. They win over Bazzite's
defaults (`98-bazzite-cec-mode.toml`). Where SteamOS Manager runs, its own settings (`99-steamos-manager.toml`) win
over the app's.

## Remote control keys

With the daemon running, every key the board receives from the TV remote shows in the list, with its CEC name.
The TV sends the keys only while it shows the BC-250's input.

## Files

- `~/.config/bc250-hdmi-cec/bc250-hdmi-cec.ini`: the window size.
- `~/.config/cecd/config.d/99-bc250-hdmi-cec.toml`: the daemon settings, once you change one. Uninstalling keeps
  it, so the TV keeps behaving the same; `install.sh --uninstall --purge` removes it.
