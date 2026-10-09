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
| 8 | Manual: MkDocs Material, one section per app, on GitHub Pages; in-app help links to it | `mkdocs build --strict`; every pill links to its page |

## Known issues to fix

- **bazzite-test: Extended System score drops back to stock after a benchmark-only run.** Test 42 takes its CU
  count from test 21 of the same run. Run on its own, it falls back to the kernel's probe-time
  `active_cu_number`, which stays 24 after a runtime CU unlock. That run's "Configuration" line then records 24
  CUs, the score uses the newest recorded count, and the CU factor (and with it the Extended score) falls back to
  stock. Present in the original app as well; not caused by the move to core. Open question for the owner:
  (a) fix it in the engine, so test 42 reads the live WGP masks itself when test 21 did not run (recommended;
  changes the root-run, checksummed `test-bazzite.sh`, so it needs a board check), or (b) in the GUI only, by not
  letting a probe-time count override a live one.
- **sudo warning on the board:** during the portal and bazzite-test installs every `sudo` printed
  `/etc/sudoers.d/bc250-bisect:2:29: unknown defaults entry "verifytype"`. Cause found: the file had a second,
  hand-edited copy of the NOPASSWD line with an extra parenthesis (`ALL=(ALL))   NOPASSWD: ALL`); sudo's parser
  names a setting that isn't in the file. No code in the suite writes or removes sudoers files (the READMEs'
  `sudo tee` overwrites, so it can't make a duplicate). The owner removed the file. Both bisect READMEs now add a
  `sudo visudo -cf` check to the setup steps and say to edit the file only with `visudo -f`.
- **Portal icon:** a copy of bazzite-test's for now.
- **Persistent ACPI icon:** drawn for the new app window ("ACPI" over eight rising bars, suite purple); replace
  it if you want a designed one.
- **Persistent ACPI app, board check open:** install the app from the portal, then Install, reboot, Status with sudo
  ("override tables loaded this boot"), Uninstall, reboot. Tested only against a fake board (tests and installer
  test) so far. Its window is standalone (not on core, like the unlock GUIs; core is GPL, the app is MIT).
- **Untranslated strings:** cores-unlock's "Status with sudo" button and tooltip are English in all languages.
- **Releases waiting (09-10-2026):** persistent-acpi (app window, new install.sh), cores-bisect (status line, Status
  with sudo), cu-bisect, governor and helixsr (Desktop icons), and a portal release for the apps.toml change.
  `check_manifest.py --base origin/main` fails until portal/VERSION is bumped.
- **QR codes** in the app READMEs and About boxes still point to the old repositories.

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

## Decisions

Fresh history; the portal first, with its own tag; per-app tags; root-owned `/opt` for code that runs as root and
one shared venv for PyQt6; `bc250_core` bundled per app release; one shared `BisectLauncher` but three bisect
apps; MkDocs for the manual; the repository is `RobertoTorino/bc250-bazzite-suite`.
