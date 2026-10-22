<!-- SPDX-License-Identifier: GPL-3.0-or-later -->

# Contributing

Bug reports, ideas and pull requests are welcome. Report security problems privately, as the
[security policy](docs/SECURITY.md) says, not in an issue or a pull request.

## Licenses

Each app keeps its own `LICENSE`, and what you contribute to a folder is under that folder's license:

- GPL-3.0-or-later: the suite, the portal, `core/`, `tools/` and most apps.
- MIT: BC-250 Persistent ACPI (`apps/acpi`).
- AGPL-3.0-or-later: Console Link (`apps/consoles`), whose ported protocol code is AGPL-3.0-only.
- GPL-2.0-only: Bazzite NetcatGUI (`apps/ncgui`).

Icons and sounds are under the license of the folder they are in, the same as the code. Contribute only what you may
license that way: your own work, or work under a compatible license, with its source and license named in the pull
request. Say so when something was made with generative AI tools.

## Icons

Every app in a category has the same icon. A new or changed icon goes in `icons/<category>/`;
`python3 tools/sync_icons.py` writes the copies the apps, the portal and the wiki use. The wiki's
[Architecture and consistency](docs/development/architecture.md) page describes it, and how a new app is built.

## Before a pull request

- Add a CHANGELOG entry: the app's own for a change to one app, the root `CHANGELOG` for a change to the whole
  suite. The format is a `Changelog: DD-MM-YYYY HH:MM:SS` line (Europe/Amsterdam time), a blank line, then plain
  sentences starting with `Breaking.`, `Added.` or `Fixed.`.
- Leave `VERSION` files and `portal/apps.toml` as they are: versions and releases are the maintainer's.
- Run the checks CI runs: `tools/ci-local.sh` (podman), or at least `./test.sh`.
