<!-- SPDX-License-Identifier: GPL-3.0-or-later -->

# Portal dependency checker

Portal dependency checker lists the BC250 Bazzite Suite's declared Python packages and app-specific external
tools, including the apps and features that use them.

**Check for updates** compares package versions with PyPI and checks whether each external tool is available.
External tools are checked for availability only; their links open the relevant app guide for installation
instructions. Python packages installed in other app-specific environments may not appear in the checker's own
environment.

The checker is read-only. It does not install or update packages or tools.

## Install

From the suite's [Releases](https://github.com/RobertoTorino/bc250-bazzite-suite/releases) page, download the
`dependency-checker-v<version>.tar.gz` release and extract it. Run `install.sh` as your own user:

```shell
./install.sh
```

It adds an app-menu entry and a Desktop icon. To omit the Desktop icon, use `./install.sh --no-desktop-shortcut`.
To remove the app, run `./install.sh --uninstall`; add `--purge` to remove its settings too. The app shares the
suite's PyQt6 environment and removes that environment only when no other suite app uses it.

## Run from a checkout

```shell
cd apps/dependency-checker/portal-dependency-checker
PYTHONPATH=../../../core ../../../.venv-linux/bin/python -m portal_dependency_checker
```
