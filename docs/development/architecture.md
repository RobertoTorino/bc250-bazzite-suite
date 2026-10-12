<!-- SPDX-License-Identifier: GPL-3.0-or-later -->

# Architecture and consistency

Every app of the suite is built the same way: the same folders, the same files, the same start-up, the same window
header, the same installer and the same tests. Once you know one app, you can find your way in all of them, and a
new app starts as a copy of that structure. This chapter describes the structure and lists the checks that keep it
in place.

## Principles

- **One layout.** Every app folder looks the same; nothing is wrapped in an extra folder.
- **One way to do a thing.** Shared code lives in `bc250_core`. An app adds only what is its own.
- **Our tools, not Bazzite.** The suite answers for the portal and its apps. A Bazzite system package is in scope
  only where one of our apps uses it; its updates are Bazzite's.
- **Not limited to one setup.** Apps read what the hardware reports and offer every option it supports. The
  owner's board and TV are test data, not the target.
- **Released code is the baseline.** Moving code must not change what an app does. Prove it with the tests, the
  installer tests and screenshots.
- **Checked by CI.** Each rule below names the check that enforces it, so a mistake fails a test instead of
  waiting for a review.

## The app folder

The folder name is the app's key: the same name is used in `portal/apps.toml`, the release tag
(`<name>-v<x.y.z>`), the installer test and the manual chapter.

```
apps/<name>/
├── <package>/                 the Python package, directly in the app folder
│   ├── __init__.py            APP_NAME, APP_ID, __version__, ROOT, LOGO_PATH, INFO
│   ├── __main__.py            start-up: python -m <package>
│   ├── main_window.py         the window
│   └── ...                    the app's own modules, and data it reads (a catalogue, tables)
├── images/                    <app-id>.png (512 px) and, for the portal, a 128 px version
├── tests/                     conftest.py and test_*.py
├── install.sh                 install, update and uninstall for your own user
├── requirements.txt           runtime Python packages (PyQt6, ...)
├── requirements-dev.txt       -r requirements.txt plus pytest
├── VERSION                    the version: the single source
├── CHANGELOG                  the history, newest first
├── LICENSE                    GPL-3.0-or-later (persistent-acpi: MIT)
├── .gitignore
└── README.md                  title, one paragraph, link to the manual, license
```

- The **package** sits directly in `apps/<name>/`, never in a wrapper folder such as `apps/<name>/<name>/<package>`.
  Its name is a Python identifier taken from the app, mostly `bc250_<something>`.
- **Data** the package reads ships inside the package (the Dependency Checker's `dependencies.toml`) or next to it
  in the app folder (persistent-acpi's `tables/`). Never one folder up from where the installer copies the app.
- An app with a shell script as its engine keeps that script in the app folder too
  (`apps/cores-bisect/bc250-cores-bisect.sh`).
- **No placeholder folders** for future work. Plans and status go in MIGRATION.md, not in the app or the manual.

Checked by `tools/tests/test_layout.py` (packages and `images/` at the app root, no wrapper folder) and by CI's
layout job (`VERSION`, `CHANGELOG`, `LICENSE` and `.gitignore` in every folder, LF line endings, executable `.sh`
files).

## The package

`__init__.py` holds the app's constants and nothing that needs Qt:

```python
APP_NAME = "BC-250 Example"
APP_ID = "bc250-example"
__version__ = "0.1.0"                     # equal to VERSION; tools/check_versions.py checks it

from pathlib import Path

from bc250_core import AppInfo

ROOT = Path(__file__).resolve().parent.parent
LOGO_PATH = ROOT / "images" / f"{APP_ID}.png"
INFO = AppInfo(app_id=APP_ID, name=APP_NAME, version=__version__, logo=LOGO_PATH, tag_prefix="example-v",
               settings_ini=True)
```

`__main__.py` starts the app the same way in every app: `create_app()` sets the names, style, fonts, translations
and icon; `instance.already_running()` brings an open window to the front instead of opening a second one;
`exec_app()` runs the event loop and handles SIGTERM.

```python
def main() -> int:
    app = create_app(INFO, sys.argv[1:], lang="en")
    if instance.already_running(INFO.app_id):
        return 0
    window = MainWindow()
    window.show()
    server = instance.serve(INFO.app_id, window)  # noqa: F841 (kept alive while the app runs)
    return exec_app(app)
```

`--version` prints the app's version and the core it runs on.

## The window

Every window starts with the same header: the app's icon at 96 px on the left, spanning two rows. The first row
has the name with the version, then the app's states, and its actions on the right. The second row has the status
boxes or the app's main controls.

```
┌────────┐  BC-250 Example  v0.1.0   ● Ready                              [Refresh]
│  icon  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐
│ 96 px  │  │  6.0 GiB │ │   on     │ │  1.0.0.0 │ │    —     │
└────────┘  └──────────┘ └──────────┘ └──────────┘ └──────────┘
```

Apps on core build it with `AppHeader`:

```python
from bc250_core.widgets import AppHeader, MetricBox, StatusText

header = AppHeader(LOGO_PATH, APP_NAME, __version__)
self.badge = StatusText()
header.add_state(self.badge)               # beside the title
header.add_action(self.refresh_button)     # right end of the title row
for box in (self.vram_box, self.gtt_box):
    header.add_second(box)                 # the second row, left to right
layout.addLayout(header)
```

Apps that are not on core yet build the same layout in their own code, with the same sizes: a 96 px icon, a 24 px
bold title with the version in grey at 14 px, and 6 px between the rows.

Below the header, the rest of the window uses core's widgets: `MetricBox` for figures, `StatusPill` and
`StatusText` for states (`ok`, `warn`, `bad`, `info`, `neutral`, in the theme's colours), `hint_label()` for
explanations, `accent_button()` for the page's main action. Secondary windows are titled with `window_title()`.

## Shared code: bc250_core

`core/bc250_core` holds what more than one app needs: theme, widgets, start-up, settings, help, update checks and
platform helpers. Nothing in it imports an app; each app passes its constants in as `AppInfo`. The module table is
in [Development](index.md#bc250_core).

Core is **bundled per app**. `tools/stage_app.py` copies `bc250_core/` next to the package of every app that
imports it, so each release runs on the core it was tested with. From a checkout, the installer bundles the
checkout's core the same way. The shared venv holds only PyQt6.

Before you write a helper in an app, look in core. If two apps need the same code, move it into core and give it a
test. Apps that are not on core yet keep a copy of core's `instance.py`; `tools/tests/test_instance_copies.py`
keeps those copies equal to core's.

## Inside an app, and code style

### The technical layout of an app

Each module of a package has one job, so the logic can be tested without a window and the window stays small:

| Module | What it holds |
|---|---|
| `__init__.py` | The app's constants (`APP_NAME`, `APP_ID`, `__version__`, paths, `INFO`). No Qt. |
| `__main__.py` | Start-up only: arguments, `create_app()`, single instance, the window, `exec_app()`. |
| `main_window.py` | The window: layout, signals, and turning results into text and states. Little logic of its own. |
| Logic modules | Reading the board, parsing, deciding, building command lines: `system.py`, `cmos.py`, `cec.py`, `options.py`, `gate.py`, `dependencies.py`. No Qt, so they are tested on their own. |
| `runner.py`, `privileged.py` | The one place that runs commands. Steps that need root go through pkexec or sudo here. The result comes back as a small object (exit code, output) or, for a running `QProcess`, as signals; never as an exception the window has to guess about. |

- **The outside world comes in as parameters.** A window or function takes its folders and command runner as
  arguments with the real ones as defaults: `MainWindow(sys_root=Path("/sys"), runner=privileged.run)`. Tests pass
  a fake `/sys` and a fake runner; nothing in a test touches the board.
- **Nothing blocks the window.** Network checks and long jobs run off the GUI thread (core's `UpdateChecker`) or
  as a `QProcess`, and report back with a signal.
- **State lives in the XDG folders:** settings in `~/.config/` (through `AppInfo` and core's settings helpers),
  results and data in `~/.local/share/`, each in a folder named after the app. `install.sh --uninstall --purge` removes exactly
  those.
- **Scripts that do the board work** (the bisect and unlock scripts, `test-bazzite.sh`) stand on their own: the
  window builds their command line and shows their output, and the script can be run by hand with the same
  result.

### Code style

- **Read like the code around it:** the same comment density, naming and idiom as the file you change.
- **Python:** 3.10 or newer (Bazzite ships 3.13 or newer), `from __future__ import annotations`, type hints on functions, `dataclass` for
  results, `pathlib` for paths, f-strings. Lines up to about 120 characters.
- **Every file** starts with its SPDX line (`# SPDX-License-Identifier: GPL-3.0-or-later`); a module or script
  starts with a docstring or comment that says what it is for.
- **Comments say why,** not what the next line does: the reason for a choice, a board quirk, a finding on the
  owner's board with its date.
- **Core imports no app;** logic modules import no Qt; an app imports core, never another app.
- **Text in the window** is plain, short sentences for the person using the app, in English; apps with
  translations wrap their strings in `self.tr()`. Errors say what happened and what to do next.
- **Shell:** `#!/usr/bin/env bash`, `set -euo pipefail`, `info`/`die` helpers, the usage text in the header
  comment (shown by `--help`), quoted variables, and no shellcheck warnings.
- **Files** use LF line endings; scripts are executable (`tools/fix-modes.sh` sets the bit in the index).

## The installer

`install.sh` sits in the app folder. It runs as your own user and refuses to run with sudo; it uses sudo or pkexec
only for the steps that need root. Every installer takes these options, and `--help` shows them (an app may add
its own, such as `--bisect-only` and `--unlock-only` for the bisect apps with two windows):

```
./install.sh                         install or update
./install.sh --no-desktop-shortcut   app menu entry only, no icon on the Desktop
./install.sh --uninstall             remove the app; keeps its settings and results
./install.sh --uninstall --purge     also remove its settings and results
```

It installs:

- **The app** under `~/.local/share/<app-id>/`, or root-owned under `/opt/<app-id>-v<version>` (with a link
  `/opt/<app-id>`) when the app runs scripts as root, so a normal user cannot change code that sudo runs.
- **Python:** PyQt6 in the suite's shared venv `~/.local/share/bc250-bazzite-suite/venv`. An app with its own
  packages has its own venv. The shared venv goes when the last app that uses it is removed.
- **A launcher** `~/.local/bin/<app-id>` that changes into the app folder and runs
  `exec "<venv>/bin/python" -m <package>`. Keep that `exec` line: the Dependency Checker reads it to find the
  app's Python environment.
- **A menu entry and a Desktop icon,** both pointing at the launcher by its full path.

The installer checks that its files are there before it changes anything, works the same from a checkout and from
an extracted release, and needs no network except for pip.

## Tests

- **`apps/<name>/tests/`:** pytest, offscreen. `conftest.py` puts core from the checkout on the path, provides a
  `qapp` fixture, and points QSettings and the XDG folders at a temp folder, so tests never touch your settings or
  the Windows registry. Fake `/sys`, `/proc` and command runners stand in for the board; data recorded on a real
  board makes good fixtures. Tests also cover other setups.
- **Every app has `tests/`** and a `requirements-dev.txt` (its `requirements.txt` plus pytest), and is listed in
  the pytest matrix of `.github/workflows/ci.yml`.
- **The installer test:** `tools/installer-tests/<name>.sh` installs from the checkout and from a staged release,
  with and without the Desktop icon, and uninstalls. It runs without root or network: `shims.sh` turns sudo into
  fakeroot and pip into a stub. CI runs each installer test in its own step. BC-250 Installer Tests lists the
  scripts in that folder by itself.
- **`./test.sh`** runs every test suite in the repository.

`tools/tests/test_installer_tests.py` fails when an app or a portal entry has no installer test, or when CI does
not run one.

## Versions, changelogs and releases

- `VERSION` is the single source of an app's version. Copies (`__version__`, shell `VERSION=`, pyproject) must
  match it: `tools/check_versions.py`.
- Every change gets a `CHANGELOG` entry in the folder it changes (the app, core, the portal, or the root for
  suite-wide changes): a `Changelog: DD-MM-YYYY HH:MM:SS` line in Europe/Amsterdam time, a blank line, then plain
  sentences, newest first.
- Each app is released on its own tag, `<name>-v<x.y.z>`. The portal pins one release of each app in
  `portal/apps.toml`. The steps are in [Portal](../portal.md#appstoml-and-releases).

## Adding a new app

1. Copy the folder of the app closest to yours, rename the package, and set `APP_NAME`, `APP_ID`, `VERSION`
   (0.1.0) and `__version__`. Clear its `CHANGELOG` and start it with one entry.
2. Put the icon in `images/` as `<app-id>.png`, and a 128 px version in `portal/images/apps/<name>.png`.
3. Build the window on `AppHeader` and core's widgets.
4. Write `install.sh` from the copied one, with the same options and launcher.
5. Write `tests/` and `requirements-dev.txt`, and add the app folder to the pytest matrix in
   `.github/workflows/ci.yml`. Write `tools/installer-tests/<name>.sh` and add its step to the same file.
6. Add the app to `portal/apps.toml` (name, summary, `changes_board`, install, uninstall, detect, launch).
7. Add the app to the Dependency Checker's catalogue (`[app.<name>]` with its launchers), its Python packages and
   the external tools it runs (`apps/dependency-checker/bc250_dependency_checker/dependencies.toml`).
8. Write its manual chapter, `docs/apps/<name>.md`, and add it to `mkdocs.yml`.
9. Run the checks from [Development](index.md) and every installer test.

The tests in step 9 tell you what you missed: an app without an installer test, a catalogue that does not match
the requirements files, a version copy that does not match `VERSION`, a package in a wrapper folder.

## The checks at a glance

| Rule | Checked by |
|---|---|
| Packages and `images/` at the app root, no wrapper folder | `tools/tests/test_layout.py` |
| `install.sh` at the app root, with the standard options, refusing root | `tools/tests/test_layout.py` |
| Every app has `tests/` and `requirements-dev.txt`, and CI runs them | `tools/tests/test_layout.py` |
| `VERSION`, `CHANGELOG`, `LICENSE`, `.gitignore` in every folder; LF; executable scripts | CI layout job |
| Version copies equal `VERSION` | `tools/check_versions.py` |
| Every app and portal entry has an installer test, and CI runs it | `tools/tests/test_installer_tests.py` |
| Copies of `instance.py` equal core's | `tools/tests/test_instance_copies.py` |
| The Dependency Checker's catalogue matches the requirements files, the portal's apps, and the tools the apps use | `apps/dependency-checker/tests/test_dependencies.py` |
| `portal/apps.toml` rules and version bumps | `tools/check_manifest.py` |
| The manual builds with no broken link | `mkdocs build --strict` |
