<!-- SPDX-License-Identifier: GPL-3.0-or-later -->

# The apps

The portal installs, opens, updates and removes these apps. BC-250 Bazzite Test is always installed, every
other app is optional.

| App | What it does |
|---|---|
| ![](../assets/apps/bazzite-test.png){ .app-icon } [BC-250 Bazzite Test](bazzite-test.md) | Read-only diagnostics, stress test and benchmarks. Always installed. |
| ![](../assets/apps/governor.png){ .app-icon } [BC-250 GPU Governor Manager](governor.md) | Manage the cyan-skillfish GPU governor: tuning, safe points, profiles, backups. **Changes the board.** |
| ![](../assets/apps/cu-bisect.png){ .app-icon } [BC-250 CU Bisect](cu-bisect.md) | Tell bad CUs apart from an unstable CU unlock, and apply a tested unlock. **Changes the board.** |
| ![](../assets/apps/cores-bisect.png){ .app-icon } [BC-250 Cores Bisect](cores-bisect.md) | Tell bad CPU cores apart from an unstable core unlock, before you persist the 8C/16T unlock. **Changes the board.** |
| ![](../assets/apps/gpu-oc-bisect.png){ .app-icon } [BC-250 GPU OC Bisect](gpu-oc-bisect.md) | Find your board's safe GPU overclock and undervolt, one step at a time. **Changes the board.** |
| ![](../assets/apps/persistent-acpi.png){ .app-icon } [BC-250 Persistent ACPI](persistent-acpi.md) | CPU C-states and frequency scaling through a persistent ACPI override (GRUB early initrd). **Changes the board.** |
| ![](../assets/apps/system-overlay.png){ .app-icon } [System Overlay](system-overlay.md) | CPU, GPU, refresh rate, fan and temperatures in a small window that stays on top. |
| ![](../assets/apps/bios-reader.png){ .app-icon } [BC-250 BIOS Reader](bios-reader.md) | The BIOS settings as the setup screen shows them, hidden menus included. Stock or modded BIOS. Read-only. |
| ![](../assets/apps/memory-manager.png){ .app-icon } [BC-250 Memory Manager](memory-manager.md) | The VRAM split in CMOS, with the GTT, TTM limit and swap layout that go with it. **Changes the board.** |
| ![](../assets/apps/fan-control.png){ .app-icon } [BC-250 Fan Control](fan-control.md) | A thermal guard that warns, cools and shuts down cleanly at a critical temperature, and the fans. **Changes the board.** |
| ![](../assets/apps/usb-wifi.png){ .app-icon } [BC-250 USB Wi-Fi](usb-wifi.md) | The driver for AIC8800D80 USB Wi-Fi sticks: built for the running kernel, loaded at boot, rebuilt after a kernel update. **Changes the board.** |
| ![](../assets/apps/hdmi-cec.png){ .app-icon } [HDMI CEC Manager](hdmi-cec.md) | Turn the TV on and off with the board, switch its input and use its remote, over HDMI-CEC. |
| ![](../assets/apps/sftp-tools.png){ .app-icon } [Bazzite SFTP Tools](sftp-tools.md) | Move files between computers over SFTP, and manage the SSH server of a Bazzite host. |

**Gaming**: apps for playing, in their own section of the [portal](../portal.md).

| App | What it does |
|---|---|
| ![](../assets/apps/helixsr.png){ .app-icon } [HelixSR Manager](helixsr.md) | Deploy HelixSR (FSR 3.1 drop-in upscaler with DLSS-style networks) into games. |
| ![](../assets/apps/ace-queues.png){ .app-icon } [BC-250 ACE Queues](ace-queues.md) | Async compute for games: a patched RADV beside the system Mesa, built on the board and tested before use. **Changes the board.** |
| ![](../assets/apps/mesh-shaders.png){ .app-icon } [BC-250 Mesh Shaders](mesh-shaders.md) | Mesh shaders for games: RADV with DirectMesh beside the system Mesa, built on the board and tested before use. **Changes the board.** |
| ![](../assets/apps/console-link.png){ .app-icon } [Console Link](console-link.md) | Find, wake and register PS4 and PS5 consoles on the network, and start a Remote Play session. |
| ![](../assets/apps/shadps4-manager.png){ .app-icon } [shadPS4 Manager](shadps4-manager.md) | PS4 games with the shadPS4 emulator: a tested shadPS4 release, your games found (or unpacked from .pkg files) and added to Game Mode. |
| ![](../assets/apps/decky-manager.png){ .app-icon } [Decky Loader Manager](decky-manager.md) | Plugins in Game Mode with Decky Loader: a tested Decky release as a system service, its state and its plugins. |
| ![](../assets/apps/rpcs3-manager.png){ .app-icon } [RPCS3 Manager](rpcs3-manager.md) | PS3 games with the RPCS3 emulator: a tested RPCS3 build, the firmware, your games found and added to Game Mode. |
| ![](../assets/apps/ppsspp-manager.png){ .app-icon } [PPSSPP Manager](ppsspp-manager.md) | PSP games with the PPSSPP emulator: a tested PPSSPP release, your games found and added to Game Mode. |
| ![](../assets/apps/pcsx2-manager.png){ .app-icon } [PCSX2 Manager](pcsx2-manager.md) | PS2 games with the PCSX2 emulator: a tested PCSX2 release, your PS2 BIOS, your games found and added to Game Mode. |
| ![](../assets/apps/vita3k-manager.png){ .app-icon } [Vita3K Manager](vita3k-manager.md) | PS Vita games with the Vita3K emulator: a tested Vita3K build, the firmware and your games installed through it, added to Game Mode. |
| ![](../assets/apps/bazzite-datstation.png){ .app-icon } [Bazzite DatStation](bazzite-datstation.md) | PlayStation quiz, console history, system versions, region codes, user guides and news, with your scores. |

**Development only**: tools for working on the suite, in their own section of the [portal](../portal.md). You do not
need them to use the board.

| App | What it does |
|---|---|
| ![](../assets/apps/demo-tool.png){ .app-icon } [Simple Demo Tool](../other-tools/simple-demo-tool.md) | Record a BC250 Bazzite Suite installation demo with OBS. For making videos of the suite. |
| ![](../assets/apps/portal-dependency-checker.png){ .app-icon } [Dependency Checker](dependency-checker.md) | The suite's Python packages and external tools, which apps use them, and whether newer ones exist; and whether a Bazzite update waits for a reboot. |
| ![](../assets/apps/bazzite-netcatgui.png){ .app-icon } [Bazzite NetcatGUI](bazzite-netcatgui.md) | A graphical netcat: connect to a host or listen on a port, TCP, UDP or TLS, one session per tab. |
| ![](../assets/apps/suite-releases.png){ .app-icon } [BC250 Suite Releases](../portal.md#the-release-front-end) | The release front end: versions, pins and the board checks of a release. Runs from a checkout of this repository. |
| ![](../assets/apps/installer-tests.png){ .app-icon } BC-250 Installer Tests | Run the suite's installer tests one at a time, with their output live in the window. Runs from a checkout of this repository. |

Apps that **change the board** (unlocks, the GPU governor, GPU overclocking, the ACPI override, the VRAM split,
a patched GPU driver) change how the BC-250 runs. They are software-only and can be undone; the portal asks before it installs or opens them. Read an
app's chapter before you use it.
