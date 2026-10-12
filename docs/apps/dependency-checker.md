<!-- SPDX-License-Identifier: GPL-3.0-or-later -->

# Dependency Checker

Dependency Checker lists the Python packages and external tools of the BC250 Bazzite Suite's apps, and which
apps and features use them.

**Python packages** are checked where each app runs: the checker finds every installed app by its launcher and
reads the package versions in that app's Python environment (the suite's shared one, or the app's own). A card
shows the version in each environment, whether it meets the app's requirement, and the latest version on PyPI.
A package that no installed app uses is shown as **Not needed**.

Each installed version is also looked up in [OSV.dev](https://osv.dev), the open vulnerability database that
collects the GitHub, PyPA and NVD advisories. A green **✓ CVE** means no known vulnerability; a red **✗ CVE** lists
each one by its CVE ID, linked to [Snyk's vulnerability database](https://security.snyk.io/), with the release that
fixes it. **CVE ?** means the check could not run (no network) or no installed app has the package. The external
tools are not looked up: they come with Bazzite and its updates, or from their makers, and OSV.dev has no
reliable record of those builds. Keeping Bazzite's own packages up to date is Bazzite's job; the checker lists a
system tool only because one of the suite's apps uses it.

**External tools** are checked for availability only, on your PATH and in `~/.local/bin` and Homebrew, where the
apps also look. Each app says whether it needs the tool (required) or uses it when it is there (optional); the
links open the app's manual, which says how to install it. Tools that do their work only as root are marked
**Needs root.**; the apps run them through sudo or pkexec, which ask for your password. Where a tool has two
forms, one is enough: Bazzite Test's internet speed test runs Ookla's `speedtest` or `speedtest-cli`.

Under a missing package or tool, an **Advice** line says what to install and which features of the installed apps
need it.

Click the information button beside a name for what the package or tool is and what each app uses it for. The
line at the bottom names the tools that are not there, those an installed app needs apart from the optional ones.

The checker is read-only. It does not install or update packages or tools. It sends the names and versions of the
Python packages to PyPI and OSV.dev, nothing else.

## Install

In the [portal](../portal.md), open **Development only** and click the Install button beside its icon. Or by hand:
from the suite's [Releases](https://github.com/RobertoTorino/bc250-bazzite-suite/releases) page, download the
`dependency-checker-v<version>.tar.gz` release and extract it. Run `install.sh` as your own user:

```shell
./install.sh
```

It adds an app-menu entry and a Desktop icon. To omit the Desktop icon, use `./install.sh --no-desktop-shortcut`.
To remove the app, run `./install.sh --uninstall`; add `--purge` to remove its settings too. The app shares the
suite's PyQt6 environment and removes that environment only when no other suite app uses it.

## Run from a checkout

```shell
cd apps/dependency-checker
PYTHONPATH=../../core ../../.venv-linux/bin/python -m bc250_dependency_checker
```
