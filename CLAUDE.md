# CLAUDE.md

Instructions for Claude Code in this repository. The owner works on it from both Windows and Bazzite (Linux) and
talks to Claude on both, so this file, not a local memory, carries the standing rules. Status and plans:
[MIGRATION.md](MIGRATION.md).
BC250
## What this is

The **BC250 Bazzite Suite** (exactly that name): tools for the AMD BC-250 on Bazzite, in one repository,
`github.com/RobertoTorino/bc250-bazzite-suite` (branch `main`). A **portal** installs and starts the apps.
**bazzite-test** is always installed and always listed first; every other app is an optional card ("pill").

- `apps/<name>/`: bazzite-test, governor, helixsr, cu-bisect, cores-bisect, gpu-oc-bisect, persistent-acpi,
  system-overlay, bios-reader. Each has its own VERSION, CHANGELOG, LICENSE (persistent-acpi is MIT, the rest
  GPL-3.0-or-later), .gitignore.
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
  overclocking, ACPI override) are marked `changes_board` and the portal asks first. Frame it as standard caution:
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
  apps/system-overlay/install.sh apps/bios-reader/install.sh
bash tools/installer-tests/bazzite-test.sh; bash tools/installer-tests/portal.sh
bash tools/installer-tests/persistent-acpi.sh; bash tools/installer-tests/system-overlay.sh
bash tools/installer-tests/bios-reader.sh
bash tools/installer-tests/release.sh
mkdocs build --strict                               # from the venv
```

The installer tests need `fakeroot` (Linux). On Bazzite, `brew install shellcheck fakeroot`; brew's folder
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

Claude may change the release tools and their tests, and runs `tools/installer-tests/release.sh` as a test (it
works in a temp folder and publishes nothing). When finished work will need a release or a version bump, the
handover says which app and why; the owner decides the number.

## Style

Code reads like the code around it: the same comment density, naming and idiom. Docs are plain, short sentences,
written for the person using the tool.
