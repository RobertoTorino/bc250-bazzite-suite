<!-- SPDX-License-Identifier: GPL-3.0-or-later -->

# Simple Demo Tool

A standalone Qt app for recording a BC250 Bazzite Suite installation demo on Bazzite. It is not installed by the
suite portal and does not use the suite's shared Python environment.

## Install

From this folder, run:

```bash
./install
```

The installer creates an app-specific Python environment under
`~/.local/share/simple-demo-tool/venv`, installs PyQt6 and the OBS WebSocket client, and adds **Simple Demo Tool**
to the desktop app menu and Desktop, using the supplied app icon. It does not use `sudo` or layer packages into
Bazzite. Start the app from the menu or run `~/.local/bin/simple-demo-tool`. Python 3.11 or newer is required.

## Record a demo

1. Open OBS, configure a scene with a screen-capture source, and enable **Tools → WebSocket Server Settings**.
   For a Wayland session, use **Screen Capture (PipeWire)** and approve the desktop-sharing prompt.
2. Open Simple Demo Tool and test the OBS connection. It defaults to `127.0.0.1:4455`; enter the WebSocket
   password if OBS authentication is enabled.
3. Download the portal tarball and `SHA256SUMS` from the suite's
   [Releases page](https://github.com/RobertoTorino/bc250-bazzite-suite/releases), verify it with
   `sha256sum --check --ignore-missing SHA256SUMS`, and extract it into your Downloads folder. Simple Demo Tool
   automatically selects the newest extracted portal release there. Use **Find in Downloads** to rescan, or
   **Choose folder…** if you extracted it elsewhere. For local development, choose the suite repository folder
   or its `simple-demo-tool` folder; the tool uses the checkout's root installer and portal manifest. The portal
   and selected app must not already be installed for a fresh-install recording.
4. Start the demo and approve the system-wide stop shortcut if your desktop asks. OBS begins recording and the
   portal installer opens in a terminal. Simple Demo Tool hides, and the portal opens automatically when its
   installer finishes successfully. The installer may ask for your password when copying files to `/opt`.
5. Show the always-included BC-250 Bazzite Test, install the selected optional app using its Install button, then
   open it using the portal's Open button. Press the shortcut shown in the desktop's shortcut configuration to
   stop the recording and bring Simple Demo Tool back. Some keyboards report the F12 key as **End**; use the
   trigger shown by the desktop. Choose **Recent recordings…** to see the newest videos from OBS's recording
   folder. Select one and choose **Play selected video** to play it inside Simple Demo Tool. Use the playback
   controls to pause or seek, and **Refresh** to update the list.

The system-wide stop shortcut uses the desktop's GlobalShortcuts portal. If your desktop does not support that
portal, Simple Demo Tool reports the error and does not start recording. The app does not automate OBS settings
or click through the portal. That keeps the capture source and normal portal warnings under your control.

## Uninstall

Run `./install --uninstall` from this folder. This removes the launcher, menu entry, Desktop shortcut, bundled
icons, and the tool's own files; it does not remove OBS, the suite, or any suite apps.

## Tests

```bash
python3 -m venv .venv
.venv/bin/python -m pip install -r requirements-dev.txt
QT_QPA_PLATFORM=offscreen .venv/bin/python -m pytest -q tests
```

## License

GPL-3.0-or-later ([GNU GPL v3](https://www.gnu.org/licenses/gpl-3.0.html)).
