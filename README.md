[![CI](https://github.com/RobertoTorino/bc250-bazzite-suite/actions/workflows/ci.yml/badge.svg)](https://github.com/RobertoTorino/bc250-bazzite-suite/actions/workflows/ci.yml)

# BC250 Bazzite Suite

Tools for the AMD BC-250 running Bazzite, in one repository. The **portal** installs and starts them:
`bazzite-test` is always installed, every other app is an optional pill.

## Install

Download `portal-v<version>.tar.gz` and `SHA256SUMS` from [Releases](https://github.com/RobertoTorino/bc250-bazzite-suite/releases), then:

```bash
sha256sum --check --ignore-missing SHA256SUMS
tar -xzf portal-v*.tar.gz && cd portal-v*/ && ./install.sh
```

This installs the portal and BC-250 Bazzite Test. Install the other apps from the portal. Details, uninstalling
and what goes where: [portal/README.md](portal/README.md).

To test from a clone of this repository instead, run `./install.sh` in its root. The portal then installs every
app from the clone, so keep it where it is. `./install.sh --uninstall` removes it again.

| App | Folder | What it does |
|---|---|---|
| bazzite-test | [`apps/bazzite-test`](apps/bazzite-test) | Read-only diagnostics, stress test and benchmarks (always installed) |
| governor | [`apps/governor`](apps/governor) | GPU governor manager — **changes the board** |
| helixsr | [`apps/helixsr`](apps/helixsr) | Deploys HelixSR (FSR 3.1 drop-in upscaler) into games |
| cu-bisect | [`apps/cu-bisect`](apps/cu-bisect) | Tells bad CUs apart from an unstable CU unlock — **changes the board** |
| cores-bisect | [`apps/cores-bisect`](apps/cores-bisect) | Tells bad CPU cores apart from an unstable core unlock — **changes the board** |
| gpu-oc-bisect | [`apps/gpu-oc-bisect`](apps/gpu-oc-bisect) | Finds a safe GPU overclock and undervolt, step by step — **changes the board** |
| persistent-acpi | [`apps/persistent-acpi`](apps/persistent-acpi) | Persistent ACPI fix for CPU C-states and frequency scaling — **changes the board** |
| system-overlay | [`apps/system-overlay`](apps/system-overlay) | CPU, GPU, refresh rate, fan and temperatures in a small window that stays on top |

## Layout

```
core/bc250_core/   shared Python package, see core/README.md
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

[portal/README.md](portal/README.md) has the full table.

## Versions and tags

`core/`, `portal/` and every app have a `VERSION` file; it is the single source of the version. Versions that are
also written in a script or package (`VERSION="…"`, `__version__ = "…"`, pyproject `version`) must match it, which
CI checks with `tools/check_versions.py`. Everything started at 0.1.0 with the suite.

Each app is released on its own tag (`bazzite-test-v0.1.0`, `governor-v0.4.0`, …); the release workflow builds
`<tag>.tar.gz` and `SHA256SUMS`. The portal has `portal-vX.Y.Z` and pins one release of every app in
`portal/apps.toml`; a change there needs a portal version bump at least as large as the largest app bump.
The release steps are in [portal/README.md](portal/README.md#appstoml-and-releases).

## License

GPL-3.0-or-later ([LICENSE](LICENSE)), except persistent-acpi, which is MIT. Each app keeps its own `LICENSE`.
