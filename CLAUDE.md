<!-- SPDX-License-Identifier: GPL-3.0-or-later -->

# CLAUDE.md

Instructions for Claude Code in this repository. The owner works on it from both Windows and Bazzite (Linux) and
talks to Claude on both, so this file, not a local memory, carries the standing rules. Status and plans:
[MIGRATION.md](MIGRATION.md).
BC250
## What this is

The **BC250 Bazzite Suite** (exactly that name): tools for the AMD BC-250 on Bazzite, in one repository,
`github.com/RobertoTorino/bc250-bazzite-suite` (branch `main`). A **portal** installs and starts the apps listed in
its manifest. **bazzite-test** is always installed and always listed first; every other listed app is an optional
tile. Standalone apps may live under `apps/` without appearing in the portal.

- `apps/<name>/`: bazzite-test, governor, helixsr, cu-bisect, cores-bisect, gpu-oc-bisect, persistent-acpi,
  system-overlay, bios-reader, ace-queues, memory-manager, hdmi-cec, sftp-tools, remote-play, demo-tool, dependency-checker, suite-releases. Each has its
  own VERSION, CHANGELOG, LICENSE (persistent-acpi is MIT; remote-play is AGPL-3.0, its protocol code ported from
  chiaki-ng: those files AGPL-3.0-only, its own AGPL-3.0-or-later; the rest GPL-3.0-or-later), .gitignore. Simple
  Demo Tool, the Dependency Checker and Remote Play are `development = true` in `portal/apps.toml`: the portal lists them
  under "Development only". Suite Releases (the release front end) has `.standalone` and `.checkout-only`: it runs
  from the checkout, is never released, and is listed as `[checkout.suite-releases]`, also under "Development only":
  a portal from a release finds the checkout on the machine (it asks only when there is none) and remembers it, the
  released apps still come from their releases. Install every app through the portal, so what is installed stays in step. BC-250 Installer Tests (`tools/installer-tests/gui`) is
  checkout-only the same way: `.checkout-only` and `[checkout.installer-tests]` with `folder`.
- `core/bc250_core/`: shared Python code. It is **bundled per app** at release time (`tools/stage_app.py`), so each
  app runs on the core it was tested with; the shared venv `~/.local/share/bc250-bazzite-suite/venv` holds only
  PyQt6.
- `portal/`: the portal, `apps.toml` (one pinned release per app) and its `install.sh`.
- `tools/`: release and CI tools, `tools/installer-tests/` (installers on Linux with fakeroot shims).

## Rules from the owner

- **Never commit, tag or push.** The owner does every git commit, tag and push. Finish work in the working tree
  and say what is ready; don't offer to commit.
- **Releases are the owner's, all of it.** See [Releases](#releases): Claude prepares code, never a release.
- **Warn before board changes.** Apps that change how the board runs (CU/core unlocks, GPU governor, GPU
  overclocking, ACPI override, the patched RADV of ace-queues, the VRAM split of memory-manager) are marked `changes_board` and the portal asks first. Frame it as standard caution:
  the apps are software-only and reversible, not "risky".
- **The current releases are the baseline.** They were tested extensively on two boards. Moving code must not
  change behaviour; a finding in existing code is "a code path to check", not a known failure. Prove "unchanged"
  (diffs, pixel comparisons, the installer tests) rather than assume it.
- **READMEs and docs/ hold no status, plans, step numbers or decision notes.** Those go in MIGRATION.md, which
  neither links to. No placeholder folders that only describe future work. CHANGELOG entries are history and may
  mention steps.
- **CHANGELOG for every change:** the root CHANGELOG for suite-wide changes, the app's (or core's, or portal's)
  for its own. Format: a `Changelog: DD-MM-YYYY HH:MM:SS` line, a blank line, then plain sentences; newest first.
  The time is Europe/Amsterdam (CET/CEST) on both systems, whatever the machine's own zone:
  `TZ=Europe/Amsterdam date '+%d-%m-%Y %H:%M:%S'`.
- **VERSION is the single source** of each app's version (all started at 0.1.0). Copies in code (`__version__`,
  shell `VERSION=`, pyproject) must match: `tools/check_versions.py`.
- **Every former repo folder** (each app, `core/`, `portal/`) keeps LICENSE, .gitignore, VERSION and CHANGELOG.
  GitHub workflows live only in the root `.github/`.
- **Not limited to the owner's setup.** The owner's board, TV, cable and settings are one case, not the target:
  apps read what the hardware reports and offer every option it supports (a CEC 2.0 TV, another display mode,
  a second adapter), and say so where an option does not apply, rather than leaving out what the owner's setup
  lacks. Recorded data from the owner's board makes good test fixtures; tests also cover other setups.
- **Consistent architecture.** Every app is built the same way, so one that works is the pattern for the next:
  - Layout: `apps/<name>/` holds its Python package(s) directly (`<package>/__main__.py`, no wrapper folder),
    `images/`, `tests/`, `install.sh` and the four files; data the package reads (a catalogue, tables) sits in
    the package or beside it in the app folder. `tools/tests/test_layout.py` checks the layout.
  - Code: shared code comes from `bc250_core` (bundled per app); the installer writes a launcher in
    `~/.local/bin` whose exec line names the app's python, a menu entry and an optional Desktop icon; every app has
    its installer test (see Checks).
  - Window: the first line is the app's icon at 96 px on the left, spanning the title (with the version) and a
    second line below it (status boxes or the app's main controls).
  A new app copies the structure of an existing one; any deviation is the owner's decision. The manual's
  [Architecture and consistency](docs/development/architecture.md) describes it all, with the steps for a new app.
- **Scope is the suite, not Bazzite.** We answer for the portal and its apps, not for Bazzite itself. A system-wide
  Bazzite package is in scope only where one of our apps uses it (the Dependency Checker lists it then); its
  updates and security fixes are Bazzite's. Our own code, and the Python packages in our apps' environments, are
  ours.
- **Ask** before decisions that are the owner's (what an app does, version numbers, repo layout, anything on the
  board). Do the obvious housekeeping without asking.

## Windows and Linux

The same repository is used from both systems.

- **Line endings:** every text file is LF in git and in the working tree (`.gitattributes`: `* text=auto eol=lf`).
  On Windows, check line endings by counting bytes in Python: Git Bash's grep and sed hide or strip CR.
- **Exec bits:** Windows git records new files as 100644. Before committing, `tools/fix-modes.sh` marks every
  `.sh` executable in the index; CI fails otherwise.
- **Venvs:** one per OS, `.venv-linux/` and `.venv-windows/`; `./test.sh` picks the right one. Bazzite's system
  `python3` has no PyQt6. Create one from the repo root:
  - Linux: `python3 -m venv .venv-linux && .venv-linux/bin/python -m pip install -r requirements-dev.txt`
  - Windows (Git Bash): `py -m venv .venv-windows && .venv-windows/Scripts/python.exe -m pip install -r requirements-dev.txt`
- **Windows-only test failures:** governor's tests need `os.getuid` and one helixsr test needs the exec bit; both
  pass on Linux and in CI.
- **Tests must not write to the Windows registry** (QSettings' native format there): the conftest fixtures turn
  settings into .ini files in a temp folder.
- Keep path and link case exact: Linux and GitHub are case-sensitive.

## Checks before handing work over

The same checks as CI (`.github/workflows/ci.yml`), from the repo root:

```bash
./test.sh                                           # every test suite, offscreen
python3 tools/check_versions.py                     # versions = VERSION
python3 tools/check_manifest.py --base origin/main  # portal/apps.toml rules, against the last push
find apps portal tools test.sh install.sh -name '*.sh' -print0 | xargs -0 -n1 bash -n
find apps portal tools -name '*.sh' -print0 | xargs -0 shellcheck -x -S error test.sh install.sh
shellcheck -x -S warning portal/install.sh apps/bazzite-test/install.sh tools/*.sh tools/installer-tests/*.sh test.sh install.sh
shellcheck -S warning apps/cores-bisect/bc250-cores-bisect.sh apps/cores-bisect/bc250-cores-unlock.sh \
  apps/cores-bisect/install.sh apps/cores-bisect/packaging/bazzite/*.sh
shellcheck -S warning apps/gpu-oc-bisect/bc250-gpu-oc-bisect.sh apps/gpu-oc-bisect/install.sh
shellcheck -S warning apps/persistent-acpi/bc250-acpi-override.sh apps/persistent-acpi/install.sh \
  apps/system-overlay/install.sh apps/bios-reader/install.sh apps/memory-manager/install.sh apps/hdmi-cec/install.sh apps/sftp-tools/install.sh \
  apps/remote-play/install.sh apps/demo-tool/install.sh apps/suite-releases/*.sh
shellcheck -S warning apps/ace-queues/bc250-ace-queues.sh apps/ace-queues/bc250-ace-queues-run \
  apps/ace-queues/install.sh apps/ace-queues/mesa/build-in-container.sh
for t in tools/installer-tests/*.sh; do [ "${t##*/}" = shims.sh ] || bash "$t"; done   # every installer test
mkdocs build --strict                               # from the venv
```

Every app (and every `portal/apps.toml` entry) has an installer test, `tools/installer-tests/<name>.sh`, and CI runs
each one in its own step; a new app adds both (`tools/tests/test_installer_tests.py` checks it). BC-250 Installer
Tests lists the scripts in that folder by itself. The installer tests need `fakeroot` (Linux). On Bazzite, `brew install shellcheck fakeroot`; brew's folder
`/home/linuxbrew/.linuxbrew/bin` may need adding to PATH in a non-interactive shell. CI also checks the layout rules above: no CRLF in the index, every
`.sh` is 100755, every former repo folder has its four files, workflows only in the root `.github/`. CI results
can be read without `gh` through the public API:
`curl -s https://api.github.com/repos/RobertoTorino/bc250-bazzite-suite/actions/runs?per_page=3`.

## Releases

The owner does every step of a release; Claude does none of them, and doesn't offer to:

- bumping a `VERSION` (and the copies `tools/check_versions.py` checks), or `portal/VERSION`;
- tagging (`<app>-v<x.y.z>` or `portal-v<x.y.z>`), which starts `.github/workflows/release.yml`;
- building or publishing release assets (`tools/build_release.py`) and the GitHub releases themselves;
- pinning a release in `portal/apps.toml` (`tools/pin_app.py`, the `tag` and `sha256` lines);
- the release entries in the CHANGELOGs.

`tools/release.sh` starts the owner's front end for the file edits of a release, BC250 Suite Releases
(`apps/suite-releases/`: `main_window.py` on `plan.py`, and `check-release.sh` for the board checks). Claude may
change it and its tests, but never uses it on the repository.

Claude may change the release tools and their tests, and runs `tools/installer-tests/release.sh` as a test (it
works in a temp folder and publishes nothing). When finished work will need a release or a version bump, the
handover says which app and why; the owner decides the number.

## Style

Code reads like the code around it: the same comment density, naming and idiom. Docs are plain, short sentences,
written for the person using the tool.
