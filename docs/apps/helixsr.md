# BC-250 HelixSR Manager

![BC-250 HelixSR Manager](../assets/helixsr/bc250-bazzite-helixsr-gui.png){ .app-logo }

PyQt6 front-end that deploys **[HelixSR](https://github.com/lonewolf0622/HelixSR)** – the FSR 3.1 drop-in
upscaler with DLSS-style neural networks – into games on an **AMD BC-250** board running **Bazzite**
(Fedora Atomic / rpm-ostree), and keeps track of where it was put.

HelixSR is not an injector: it is a replacement for the `amd_fidelityfx_upscaler_dx12.dll` /
`amd_fidelityfx_dx12.dll` a game ships with. Deploying it means renaming the game's DLL to `*.original.dll`
and dropping HelixSR's DLL, its two network files and an optional `helixsr.ini` in the same folder. This
app does exactly that, reversibly, and nothing else on the system is touched. No launch options, no
`WINEDLLOVERRIDES`, no Proton tweaks are needed.

---

## What it manages

- **Setup in one click** – *Download and build* fetches the latest HelixSR release from GitHub, reads the exact
  URLs and SHA-256 sums its setup scripts pin, downloads what the PC still needs **in parallel** and verified
  (NVIDIA's DLSS 310.7.0 DLL, 59 MB; Microsoft's DirectX Shader Compiler, 25 MB; on Bazzite a portable Python,
  67 MB), runs `helixsr-setup.sh --yes` with live output and imports the result as the payload. The DLSS DLL is
  deleted afterwards. A DLSS 310.7.0 DLL from a game you own can be used instead (*Find in Steam* compares
  checksums), which skips NVIDIA's download. The build itself is HelixSR's own script, unchanged: about 5–6 minutes on a
  BC-250, because it compiles the network's shaders for both wave sizes through Proton. The Setup page shows the
  elapsed time.
- **Update checks** – at start (can be turned off) or on demand: the payload against the latest HelixSR release
  and this app against its latest release on GitHub. A newer HelixSR is flagged on the Overview; building again
  updates the payload and deployed games show *Older build* until redeployed.
- **Payload** – one imported HelixSR release, kept under `~/.local/share/bc250-bazzite-helixsr-gui/payload`.
  Filled by the Setup page, or by hand: run the release's `helixsr-setup.sh` yourself and import the folder or
  the zip. It builds `helixsr_weights.bin` and `helixsr_kernels.pak` from NVIDIA's DLSS DLL – those files are
  NVIDIA's property, so this app never ships them. Only the known HelixSR files are copied; the payload survives
  updates and `./install.sh --uninstall`.
- **Deployments** – every place HelixSR was put, with a live status (in place, older build, network files
  missing, original restored, folder gone), in `~/.config/bc250-bazzite-helixsr-gui/deployments.json`.
- **Two deploy modes**
  - *Replace the game's DLL* – for games with native FSR 3.1: pick the game folder (Steam libraries are
    scanned, including `libraryfolders.vdf` and the Flatpak Steam), the app finds every upscaler DLL (Unreal
    games bury it under `Engine/Plugins/.../ThirdParty/Win64`), backs it up and deploys. *Remove* restores
    the original. Re-deploying a newer build never overwrites the real original.
  - *Stand-alone folder for OptiScaler* – for games without FSR 3.1: writes a folder with the DLL under both
    FidelityFX names, the network files and the ini, and gives you the `OptiScaler.ini` lines
    (`Dx12Upscaler=fsr31`, `FfxDx12Path`, `FfxDx12SRPath` as `Z:\` paths) to paste.
    Optionally it adds a second upscaler, for example AMD's `amd_fidelityfx_upscaler_dx12.dll` with FSR 4: it
    goes into the folder as `amd_fidelityfx_upscaler_dx12.amd.dll` with `UpscalerDll` pointing at it, and
    OptiScaler's FFX Upscaler menu lists its upscalers after HelixSR.
- **helixsr.ini** – a form over every key HelixSR reads (`[Sharpening]`, `[ModelE]`, `[Log]`, `[Forwarding]`)
  with validation and a live preview that keeps the upstream comments. Save it as the default for new
  deployments or push it to an existing one.

## Privilege model

Everything runs as your normal desktop user: game folders under Steam are yours, the payload and the
deployment list live in your XDG directories. No `pkexec`, no root, no `rpm-ostree` layering.

## Requirements

```text
Python 3.11+
PyQt6>=6.11,<7
```

The PyQt6 wheels bundle Qt. HelixSR itself needs a game with an FSR 3.1 DX12 upscaler (or OptiScaler) and
the network files built by its `helixsr-setup.sh`; see the
[HelixSR README](https://github.com/lonewolf0622/HelixSR#readme) for the game side.

## Install on Bazzite

Install it from the BC250 Bazzite Suite portal. Or download `helixsr-v<version>.tar.gz` from the suite's
[releases](https://github.com/RobertoTorino/bc250-bazzite-suite/releases), unpack it and run the installer:

```shell
tar -xzf helixsr-v*.tar.gz
cd helixsr-v*/
./install.sh
```

It installs the app for your user only: a private venv with PyQt6 and the app under
`~/.local/share/bc250-bazzite-helixsr-gui`, the launcher `~/.local/bin/bc250-bazzite-helixsr-gui`, a
desktop entry, the icon and a Desktop icon (`./install.sh --no-desktop-shortcut` leaves the Desktop icon out).
**BC-250 HelixSR Manager** then appears in the application menu (and in Steam's
Game Mode via *Add a Non-Steam Game* if you want it there). Run `./install.sh` again from a newer release to
update, `./install.sh --uninstall` to remove it; the imported payload and the deployed games are left alone.

## Run from the repository

```shell
git clone https://github.com/RobertoTorino/bc250-bazzite-suite.git
cd bc250-bazzite-suite/apps/helixsr
python3 -m venv python && python/bin/pip install -r requirements.txt && python/bin/python -m bc250_bazzite_helixsr
```

`--payload DIR`, `--deployments FILE` and `--work DIR` point the app at another payload folder, deployment
list and download folder, for development on a machine without Steam. `--no-update-check` skips the release
lookup at start. `--lang CODE` forces an interface language for this run (see below). `--version` prints the
version.

## Languages

The interface follows the system locale. Available: English (source), Deutsch (`de`), Español (`es`), Français
(`fr`), Italiano (`it`), Polski (`pl`), Русский (`ru`), 中文（简体） (`zh`) and 日本語 (`ja`). The *Help* page has a
language picker (saved per user, applied at the next start; *System default* goes back to the locale), and
`--lang de` overrides both for one run. English is the fallback for everything that has no translation.

Translation sources are `bc250_bazzite_helixsr/translations/bc250_bazzite_helixsr_<code>.ts` (Qt Linguist XML)
next to the compiled `.qm` the app loads. After changing strings in the code, `tools/update_translations.sh`
refreshes every `.ts` (new strings appear as *unfinished*) and recompiles; `tools/update_translations.sh nl`
also starts a new language. `tools/compile_translations.py` is a small stand-in for Qt's `lrelease`, which the
PyQt6 wheels do not ship. The tests check that every shipped translation is complete and keeps its placeholders.

## Pages

- **Overview** – payload status (version from the release's README, DLL, weights, kernels, ini) with
  *Import folder* / *Import zip* / *Open payload folder*, and the deployment table with *Open folder*,
  *Remove* (restores the original or deletes the stand-alone folder) and *Forget*.
- **Setup** – release status for HelixSR and this app with *Check now*; *Download and build* with progress,
  the script's output, *Cancel*, *Import built release* and *Open work folder*; optional local `nvngx_dlss.dll`.
- **Deploy** – choose a Steam game or browse to any folder, scan for upscaler DLLs, pick the mode, decide
  whether to write the current `helixsr.ini`, deploy or remove. In folder mode the OptiScaler snippet is
  shown with a *Copy* button.
- **helixsr.ini** – the settings form, validation, preview, *Save as default* and *Apply to deployment*.
- **Help** – the workflow, where the files live, links to HelixSR and OptiScaler, and the language picker.

The header shows the payload version, network-file status, deployments (ok / total) and the number of Steam
games found; it refreshes every 5 seconds.

## Development

```
bc250_bazzite_helixsr/
  __init__.py       app name, version, XDG paths
  __main__.py       entry point (python -m bc250_bazzite_helixsr)
  backend.py        pure file logic: payload import, DLL discovery, deploy/remove (both modes),
                    helixsr.ini parse/render/validate, deployment store, Steam library discovery
  acquire.py        GitHub release lookup, pinned-source parsing, verified parallel downloads,
                    helixsr-setup.sh runner (QThread) and the update checker
  setup_page.py     Setup page
  main_window.py    header, navigation, polling, confirmations, wiring of page signals to the backend
  pages.py          Overview, Deploy and helixsr.ini pages
  help.py           Help page (text and language picker)
  widgets.py        status pills, metric boxes, rounded tooltip (shared with bc250-governor-manager)
  fonts/            Inter (SIL OFL), used for the header on Linux
  translations/     bc250_bazzite_helixsr_<code>.ts sources and compiled .qm files
tools/              update_translations.sh (pylupdate6 + compile), compile_translations.py (.ts -> .qm)
install.sh          per-user installer (venv, launcher, desktop entry, icon); --uninstall removes it, keeps the payload
bc250-bazzite-helixsr-gui.desktop  desktop entry template, Exec is filled in by install.sh
tests/              pytest suite (offscreen Qt, temporary payload and game folders, no real HelixSR needed)
test.sh             runs it with the project venv
```

Tests: `./test.sh` in the suite's root runs every test suite, this one included (extra arguments go to pytest,
e.g. `./test.sh -k ini`). For this app alone: `pip install -r requirements-dev.txt` then
`QT_QPA_PLATFORM=offscreen python -m pytest -q tests`. They cover the `helixsr.ini` round-trip against the
upstream file, payload import from folders and zips, DLL discovery, deploy/remove in both modes (including
re-deploy over an older build and refusing foreign DLLs), the deployment store, Steam library parsing, the
release lookup and the whole Setup run (downloads over `file://` URLs against a fake `helixsr-setup.sh`, checksum
and script failures, a local DLSS DLL), the main window driven through its page signals and the translations
(compiler round-trip through `QTranslator`, completeness of every shipped language). The suite's CI
(`.github/workflows/ci.yml`) runs them on every push and pull request. Releases are tagged `helixsr-v<x.y.z>` in
the suite repository; `.github/workflows/release.yml` then builds the tarball and publishes it on GitHub.

The backend has no Qt dependency so it can be exercised from the command line or reused.

## License

GPL-3.0-or-later, see [LICENSE](https://github.com/RobertoTorino/bc250-bazzite-suite/blob/main/apps/helixsr/LICENSE). The bundled Inter font is under the SIL Open Font License
(`bc250_bazzite_helixsr/fonts/Inter-LICENSE.txt`). HelixSR is a separate project under its own license; its
network files are derived from NVIDIA's DLSS and are never distributed by this app.
