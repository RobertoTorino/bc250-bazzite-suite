<!-- SPDX-License-Identifier: GPL-3.0-or-later -->

# Migration status

Working notes for moving the seven BC-250 tools into this suite. Not part of the manual or the READMEs, which
describe only what exists.

## Done

| Step | What | State |
|---|---|---|
| 1 | Repository: apps under `apps/`, root CI, LF everywhere, VERSION/LICENSE/.gitignore/CHANGELOG per app | done |
| 2 | `bc250_core` foundation: appinfo, theme, text, widgets, app, settings, help, updates (+ platform in step 3) | done |
| 3 | Portal (`portal/`), bazzite-test on core, release tooling (`tools/`), installer tests | done in code; board check open |

## Open

| Step | What | Gate |
|---|---|---|
| 3 | Board check | Install, open and uninstall the portal on a clean Bazzite account; a full passive bazzite-test run matches the original |
| 4 | Headless smoke tests for the five GUIs without tests (cu bisect/unlock, cores bisect/unlock, gpu-oc) | CI green |
| 5 | governor and helixsr onto core; per-app releases plus a portal release | Their test suites; install from the portal |
| 6 | Bisect family: `terminal`, `runner`, `dialogs`, `systemd` into core; shared `BisectLauncher` (cu, cores, gpu-oc stay three apps); unlock GUIs onto core; names in strings become placeholders; one translation pipeline (governor's JSON catalogue + helixsr's .qm writer) | `build.py --check` loses no translation; on the board: one process after starting cu with auto-resume |
| 7 | Shell: shared helpers in one `bisect-common.sh`, inlined into each script at build time with a drift check, plus a `flock` single-instance guard | Generated scripts differ only by the markers and the guard; one full bisect round per target on the board |
| 8 | Manual: MkDocs Material, one section per app, on GitHub Pages; in-app help links to it. Done (09-10-2026): READMEs moved into the manual (READMEs keep title, description, license), Bazzite purple theme with Inter, `.github/workflows/docs.yml`, apps' README links point to the manual, Bazzite Test shows its chapter (MANUAL.md). Open: owner switches Pages on (Source: GitHub Actions); portal cards link to their chapter | `mkdocs build --strict`; every pill links to its page |
| — | bios-reader: app built (parser, GUI, chip read, tests, installer, CI). Open: portal card in `portal/apps.toml` (`changes_board = false`) with a release (owner); a real logo (placeholder now); try "Read BIOS chip" from the GUI on the board (pkexec path untested); dump the second board to confirm the stock fingerprints and the table hold for it; the owner decides whether the P5.00 table (screens and defaults taken from the AMI/AMD firmware) may ship. Next iteration: a description for every setting (many CBS help strings are "No help string") | Tests; on the board: values match the BIOS setup screen |

## Known issues to fix

- **bazzite-test score drop, fixed in the engine (09-10-2026), board check open:** with a runtime CU unlock active,
  run only the benchmark (test 42). Its log should show "CU count from the live WGP masks (umr)" and the
  Configuration line the unlocked count, and the Extended score should keep its CU factor.
- **No release tagged yet (09-10-2026):** the portal and all eight apps are at 0.1.0 with no tags, so the first tags
  release everything as it is on main (c7646ce, CI green); no version bumps are needed before that.
- **Copies of bc250_core.instance** in helixsr, the cu/cores bisect and unlock GUIs, gpu-oc-bisect and
  persistent-acpi (MIT: the owner's own code, copied under MIT there); fold them into core in step 6.
- **Governor performance mode runs hot (09-10-2026), owner tests on the board first:** no app controls the fan
  (it follows the BIOS/SuperIO curve or runs at full speed off the PSU), and the Governor's alerts (GPU 80 °C,
  throttling) only work while the app runs, watch only the GPU and only notify. To collect: GPU and CPU
  temperatures and fan RPM with performance mode on, how the fan is connected, and the warn/throttle/shutdown limits
  wanted. Proposal: a background guard that warns, turns performance mode off, and shuts down cleanly at a critical
  limit (new app or part of the Governor: owner decides).
- **Later: system overlay in Game Mode.** gamescope only composites the focused game, Steam and windows with the
  X11 property `GAMESCOPE_EXTERNAL_OVERLAY` (how mangoapp shows MangoHud). Possible route: set that property on
  the overlay's XWayland window. Open: how to start it inside the gamescope session (check how Bazzite starts
  mangoapp), no mouse input there (position and rows from the Desktop-mode settings), and it relies on a gamescope
  internal.

## Details for later steps

From the original proposal (not in the repository).

**Step 5:** governor's update checker tracks the *upstream* `cyan-skillfish-governor` releases; helixsr checks
itself and the HelixSR payload. Core supplies the mechanism (`bc250_core.updates`); what is checked stays in each
app. Settings files must not move: governor and helixsr use `QSettings(APP_ID, APP_ID)` (`settings_org`/
`settings_app` default to the app id). Translations: moving strings into core changes their Qt context; governor's
`tools/i18n/build.py` already copies base-class contexts into subclasses, which is the mechanism to keep them.

**Step 6, cu-bisect:** these come from reading the code; the current release behaves well on two boards, so check
each on hardware rather than assume a failure.
- `bc250_bisect_gui/service.py` → `install()` runs `systemctl --user enable --now bc250-cu-bisect-auto.service`,
  and the GUI then also starts the run in a terminal. With `--auto` plus auto-resume that may start **two
  concurrent runs** on the same state dir (umr register writes, possible double reboot). The cores copy
  deliberately uses `enable` without `--now`; take that, and add a `flock -n` guard in step 7. Hardware check: tick
  `--auto` and auto-resume, start, then `systemctl --user status bc250-cu-bisect-auto` and `pgrep -fa cu-bisect`
  within 30 s.
- The unit passes only `-t` and `-r`, so `--no-watch` is lost on resume: build it from `opts.to_args()` like cores.
- `hint_label` (`main_window.py`) is created but never filled.
- The baseline combo matches the English label `"Custom..."`: use `itemData`, like cores.
- `_on_auto_toggled` ticks the auto-resume box but never unticks it.
- `HelpDialog` (all three bisect apps) runs `bash script --help` synchronously with a 10 s timeout and can freeze
  the window: make it an async QProcess.

**Step 6, shared code:** `terminal.py` is identical in the three bisect apps (now `bc250_core.platform`); the
unlock runner should come from cores (it factors out `_start()` and guards against finishing twice); `gate.py`
stays per target (different acceptance rules). `BisectLauncher` supplies `_build_header`, `_build_options_frame`,
`_build_buttons`, `_restore_geometry`, `closeEvent`, `_collect_options`, `_on_reset`, `_on_start`; each app keeps its
options dataclass (`validate()`, `to_args()`, `to_command()`), summary, hints and help. A change to
`BisectLauncher` bumps all three app tags (and the portal).

**Step 7:** helpers identical in all three bisect scripts: `say hdr die usage cfg_get cfg_set`; cu ↔ cores also
`ask attempt_done do_reboot set_colors next_attempt`; cu ↔ gpu-oc also `gpu_busy gpu_temp gpu_sclk faults_since
memtest_bytes`. Keep `build_plan`, `run_attempt`, `summary` and the register/SMU access per script. Scripts stay
single-file: inline the shared block between `# >>> bisect-common` / `# <<< bisect-common` markers at build time.

**bios-reader, findings on the owner's board (stock P5.00, dump SHA-256 `f403fdd4…acf3`):** the setup forms are in
two modules, `Setup` (main Aptio menus, varstore `Setup`, 0x1D3 bytes) and `CbsSetupDxe` (AMD CBS, varstore
`AmdSetup`, 0x8B5 bytes, 1111 questions). Hidden on stock P5.00: the Chipset tab and, under Advanced, PSP
Firmware Version, Demo Board, CPU Configuration, SIO Configuration, Advanced CPU Settings and one USB Configuration
(links under `SuppressIf True`); the South Bridge forms and IMC Fan Control (not linked); in AMD CBS everything
except UMC Common Options → GDDR6 Common Options → DRAM Timing Configuration (not linked). Hidden CBS forms include
GFX Configuration (UMA mode, frame buffer size), GFX Configuration-int (GFX CUs/RB Control, InactiveCUs) and
Core/Thread Enablement (downcore, SMT). On this board all `AmdSetup` values with a form default equal it; `Setup`
differs from `StdDefaults` only in two unnamed Save & Exit bytes. Defaults: `Setup` from the `StdDefaults` NVAR
entry, `AmdSetup` from the forms' `Default` flags (there is no `AmdSetup` in `StdDefaults`). The current `Setup` is
the last entry of its NVAR link chain. A Python parser of IFRExtractor's text output was enough for this analysis;
the app needs its own IFR parser for the binary forms.

## Decisions

Fresh history; the portal first, with its own tag; per-app tags; root-owned `/opt` for code that runs as root and
one shared venv for PyQt6; `bc250_core` bundled per app release; one shared `BisectLauncher` but three bisect
apps; MkDocs for the manual; the repository is `RobertoTorino/bc250-bazzite-suite`.
