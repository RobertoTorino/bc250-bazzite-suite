# BC250 Bazzite Suite

Tools for the AMD BC-250 running Bazzite, in one repository. The **portal** installs and starts them:
`bazzite-test` is always installed, every other app is an optional pill.

> **Status: migration step 2 of 8.** The seven apps live under `apps/` and still install and run exactly as they
> did from their own repositories. `core/` holds the shared `bc250_core` foundation (no app uses it yet; bazzite-test
> moves onto it in step 3). `portal/` is still a placeholder.

| App | Folder | What it does |
|---|---|---|
| bazzite-test | [`apps/bazzite-test`](apps/bazzite-test) | Read-only diagnostics, stress test and benchmarks (always installed) |
| governor | [`apps/governor`](apps/governor) | GPU governor manager |
| helixsr | [`apps/helixsr`](apps/helixsr) | Deploys HelixSR (FSR 3.1 drop-in upscaler) into games |
| cu-bisect | [`apps/cu-bisect`](apps/cu-bisect) | Tells bad CUs apart from an unstable CU unlock — **changes the board** |
| cores-bisect | [`apps/cores-bisect`](apps/cores-bisect) | Tells bad CPU cores apart from an unstable core unlock — **changes the board** |
| gpu-oc-bisect | [`apps/gpu-oc-bisect`](apps/gpu-oc-bisect) | Finds a safe GPU overclock and undervolt, step by step — **changes the board** |
| persistent-acpi | [`apps/persistent-acpi`](apps/persistent-acpi) | Persistent ACPI fix for CPU C-states and frequency scaling — **changes the board** |

## Layout

```
core/bc250_core/   shared Python package, see core/README.md
portal/            the portal app and apps.toml (step 3)
apps/<name>/       one folder per app, each with its own VERSION and CHANGELOG
lib/sh/            shared shell helpers, inlined into the scripts at build time (step 7)
tools/             check_versions.py, fix-modes.sh; i18n/ becomes the single translation pipeline (step 6)
docs/ mkdocs.yml   the manual (MkDocs Material)
packaging/         portal installer, shared venv, .desktop templates (step 3)
test.sh            runs every test suite (core and each app with tests/)
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

Filled in at step 3. Planned: the portal and the bazzite-test engine in root-owned `/opt` (as
bazzite-test does today), the GUIs and `bc250_core` in one shared venv under
`~/.local/share/bc250-bazzite-suite/`.

## Versions and tags

`core/`, `portal/` and every app have a `VERSION` file; it is the single source of the version. Versions that are
also written in a script or package (`VERSION="…"`, `__version__ = "…"`, pyproject `version`) must match it, which
CI checks with `tools/check_versions.py`. Everything started at 0.1.0 with the suite.

Each app has its own tag (`bazzite-test-v1.2.0`, `governor-v0.4.0`, …). The portal has `portal-vX.Y.Z`,
which also moves whenever `portal/apps.toml` pins a new app tag.

## License

GPL-3.0-or-later ([LICENSE](LICENSE)), except persistent-acpi, which is MIT. Each app keeps its own `LICENSE`.
