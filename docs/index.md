<!-- SPDX-License-Identifier: GPL-3.0-or-later -->

# BC250 Bazzite Suite

Tools for the AMD BC-250 running Bazzite. The **portal** installs, opens, updates and removes them: BC-250 Bazzite
Test is always installed, every other app is optional.

## Install

Download `portal-v<version>.tar.gz` and `SHA256SUMS` from the suite's
[Releases](https://github.com/RobertoTorino/bc250-bazzite-suite/releases) page, then:

```bash
sha256sum --check --ignore-missing SHA256SUMS
tar -xzf portal-v*.tar.gz && cd portal-v*/ && ./install.sh
```

This installs the portal and BC-250 Bazzite Test. Install the other apps from the portal. What goes where and how
to uninstall: [Portal](portal.md).

To test from a clone of the repository instead, run `./install.sh` in its root. The portal then installs every app
from the clone, so keep it where it is. `./install.sh --uninstall` removes it again, and asks about each other
installed app.

## The apps

| App | What it does |
|---|---|
| ![](assets/apps/bazzite-test.png){ .app-icon } [BC-250 Bazzite Test](apps/bazzite-test.md) | Read-only diagnostics, stress test and benchmarks. Always installed. |
| ![](assets/apps/governor.png){ .app-icon } [BC-250 GPU Governor Manager](apps/governor.md) | Manage the cyan-skillfish GPU governor: tuning, safe points, profiles, backups. **Changes the board.** |
| ![](assets/apps/helixsr.png){ .app-icon } [BC-250 HelixSR Manager](apps/helixsr.md) | Deploy HelixSR (FSR 3.1 drop-in upscaler with DLSS-style networks) into games. |
| ![](assets/apps/cu-bisect.png){ .app-icon } [BC-250 CU Bisect](apps/cu-bisect.md) | Tell bad CUs apart from an unstable CU unlock, and apply a tested unlock. **Changes the board.** |
| ![](assets/apps/cores-bisect.png){ .app-icon } [BC-250 Cores Bisect](apps/cores-bisect.md) | Tell bad CPU cores apart from an unstable core unlock, before you persist the 8C/16T unlock. **Changes the board.** |
| ![](assets/apps/gpu-oc-bisect.png){ .app-icon } [BC-250 GPU OC Bisect](apps/gpu-oc-bisect.md) | Find your board's safe GPU overclock and undervolt, one step at a time. **Changes the board.** |
| ![](assets/apps/persistent-acpi.png){ .app-icon } [BC-250 Persistent ACPI](apps/persistent-acpi.md) | CPU C-states and frequency scaling through a persistent ACPI override (GRUB early initrd). **Changes the board.** |
| ![](assets/apps/system-overlay.png){ .app-icon } [BC-250 System Overlay](apps/system-overlay.md) | CPU, GPU, refresh rate, fan and temperatures in a small window that stays on top. |
| ![](assets/apps/bios-reader.png){ .app-icon } [BC-250 BIOS Reader](apps/bios-reader.md) | The BIOS settings as the setup screen shows them, hidden menus included. Stock or modded BIOS. Read-only. |

Apps that **change the board** (unlocks, the GPU governor, GPU overclocking, the ACPI override) change how the
BC-250 runs. They are software-only and can be undone; the portal asks before it installs or opens them. Read an
app's chapter before you use it.

## License

GPL-3.0-or-later, except BC-250 Persistent ACPI, which is MIT. Each app has its own `LICENSE`.
