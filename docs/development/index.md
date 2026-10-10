<!-- SPDX-License-Identifier: GPL-3.0-or-later -->

# Development

How the repository is laid out, how to work on it from Linux and Windows, and how versions and releases fit
together. The portal's release steps are in [Portal](../portal.md#appstoml-and-releases).

## Layout

```
core/bc250_core/   shared Python package, see bc250_core below
portal/            the portal: app, apps.toml (the pinned app releases) and install.sh
apps/<name>/       one folder per app, each with its own VERSION and CHANGELOG
tools/             release and CI tools (build_release, stage_app, pin_app, check_*), installer tests
docs/ mkdocs.yml   the manual (MkDocs Material)
test.sh            runs every test suite (core, portal, tools and each app with tests/)
```

## Development

```bash
# Linux
python3 -m venv .venv-linux && .venv-linux/bin/python -m pip install -r requirements-dev.txt
# Windows (Git Bash)
py -m venv .venv-windows && .venv-windows/Scripts/python.exe -m pip install -r requirements-dev.txt

./test.sh                          # every test suite, offscreen; picks the venv of the OS it runs on
python3 tools/check_versions.py    # hard-coded versions = VERSION
mkdocs build --strict              # from the venv
```

### Working from both Linux and Windows

The repo is used from both systems, so it is set up to behave the same on each:

- **Line endings:** `.gitattributes` makes every text file LF in the repository and in the working tree on both
  systems, regardless of `core.autocrlf` (Git for Windows sets it to `true`). Scripts, units and `.desktop` files
  reach the board with LF, and moving between systems never shows files as changed. CI rejects CRLF.
- **Executable bit:** Git for Windows runs with `core.fileMode=false` and records new files as not executable. After
  `git add` and before committing, run `tools/fix-modes.sh`: it marks every `.sh` as executable in the index (this
  works the same on both systems). CI fails when a script is missing the bit.
- **Venvs:** a venv only runs on the OS that created it, so keep one per system (`.venv-linux/`, `.venv-windows/`).
  Both are ignored by git.
- **Tests:** some app tests use Linux-only calls (`os.getuid`, file modes) and fail on Windows; Linux and CI are
  the reference. Core's tests run on both and never write to the Windows registry.
- **File names:** Linux is case-sensitive and Windows is not, so a link or path whose case only matches on Windows
  breaks on Linux and on GitHub. Keep links and asset names in exactly the case of the file.

## Where things are installed

- **Root-owned `/opt`:** the portal (`/opt/bc250-bazzite-suite`), bazzite-test, cores-bisect, gpu-oc-bisect and
  persistent-acpi, whose scripts run as root: a normal user cannot change code that sudo runs.
- **Your home folder:** the shared venv `~/.local/share/bc250-bazzite-suite/venv` (PyQt6, used by all suite
  GUIs and removed with the last of them), plus each app's settings, results and launchers.
- **`bc250_core` per app:** each app's release carries the `bc250_core` it was tested with, next to its own code.
  Apps with different release tags never share a core version they were not tested with.

[Portal](../portal.md#install) has the full table.

## Versions and tags

`core/`, `portal/` and every app have a `VERSION` file; it is the single source of the version. Versions that are
also written in a script or package (`VERSION="…"`, `__version__ = "…"`, pyproject `version`) must match it, which
CI checks with `tools/check_versions.py`. Everything started at 0.1.0 with the suite.

Each app is released on its own tag (`bazzite-test-v0.1.0`, `governor-v0.4.0`, …); the release workflow builds
`<tag>.tar.gz` and `SHA256SUMS`. The portal has `portal-vX.Y.Z` and pins one release of every app in
`portal/apps.toml`; a change there needs a portal version bump at least as large as the largest app bump.
The release steps are in [Portal](../portal.md#appstoml-and-releases).

## bc250_core

Code shared by the suite's apps. Nothing in it imports an app: each app passes its constants in as an `AppInfo`.

| Module | What it holds | Merged from |
|---|---|---|
| `appinfo` | `AppInfo` (id, name, version, logo, tag prefix, translation catalog, settings names) | new |
| `theme` | Palette, `STATE_COLORS`, bundled Inter font, `header_font()`, `HOVER_STYLESHEET` | all six GUIs |
| `text` | `fmt()` (`%1` placeholders), `fill()` (`{name}` placeholders), `plain_tooltip()`, `window_title()` | governor, helixsr |
| `widgets` | `StatusPill`, `MetricBox`, `ClickableLogo`, `Terminal`, `TextDialog`, `RoundedToolTip`, `show_tooltip()`, `page_header()`, `hint_label()`, `accent_button()`, `set_button_active()` | governor + helixsr's Wayland tooltip + bazzite-test's manual tooltips |
| `app` | `create_app()` / `run_app()` / `exec_app()`: names, Fusion, translators (Qt, core, app), tooltip, icon, SIGTERM | the apps' `__main__` |
| `settings` | `open_settings(info)` at each app's existing file, geometry helpers, `SettingsStore` (typed defaults) | bazzite-test's `AppSettings` |
| `help` | `HelpView`, `HelpPage` (language picker; content stays in the app) | helixsr |
| `updates` | `latest_release()` (with a tag prefix for the suite's per-app tags), `UpdateStatus`, `UpdateChecker` (any job, off the GUI thread) | helixsr + governor |
| `platform` | XDG folders, `xdg_open()`, `launch_in_terminal()` (with an exit file the caller can watch) | the bisect GUIs' `terminal.py` |

Core is **bundled per app**: `tools/stage_app.py` copies `bc250_core/` next to the package of every app that
imports it, so each release runs on the core it was tested with.

### Tests

```bash
cd core && QT_QPA_PLATFORM=offscreen python -m pytest -q tests
```

`tests/test_parity.py` renders core's widgets next to the copies in `apps/governor` and `apps/helixsr` and requires
identical pixels; a case is skipped once its app no longer has its own copy.
