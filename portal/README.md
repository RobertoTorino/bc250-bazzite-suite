# Portal

The BC250 Bazzite Suite's front door: one window that installs, opens, updates and removes the suite's apps.
**BC-250 Bazzite Test** is always installed with the portal and listed first; every other app is an optional
card ("pill") with **Install**, **Open** and **Uninstall**.

- Install, update and uninstall run **the app's own installer** in a terminal window, because installers may ask
  for the sudo password and print what they do. The portal watches for the result and refreshes.
- Apps that change how the board runs (CU/core unlocks, the GPU governor, GPU overclocking, the ACPI override)
  are marked **changes the board**. The portal warns before installing or opening them.
- Each portal release pins one tested release of every app in [`apps.toml`](apps.toml). The portal downloads
  exactly those tarballs from the suite's GitHub releases and checks each against the SHA-256 pinned there, or
  against the release's `SHA256SUMS` until one is pinned. Then it unpacks the tarball without ever writing
  outside its folder.
- **Updates:** a red dot marks every app whose installed version differs from the one this portal pins, and the
  header counts them; **Update** installs the pinned version. Newer app versions come with a newer portal
  release: at start the portal looks for one on GitHub and, when there is one, shows a red **Portal x.y.z
  available** button that opens its release page.

## Install

From the suite's [Releases](https://github.com/RobertoTorino/bc250-bazzite-suite/releases) page, download
`portal-v<version>.tar.gz` and `SHA256SUMS`, then:

```shell
sha256sum --check --ignore-missing SHA256SUMS
tar -xzf portal-v*.tar.gz
cd portal-v*/
./install.sh                 # as your own user; asks for the sudo password only for the copies to /opt
```

What it installs:

| What | Where | Why there |
|---|---|---|
| The portal, its `apps.toml` and the `bc250_core` it was tested with | `/opt/bc250-bazzite-suite-v<version>`, root-owned, with `/opt/bc250-bazzite-suite` pointing at it | Same as bazzite-test's engine: code that starts root-run installers is not writable by a normal user |
| BC-250 Bazzite Test (bundled in the portal release) | `/opt/bc250-bazzite-test`, through its own installer | Its test engine runs as root and must be root-owned |
| The suite's shared venv with PyQt6 | `~/.local/share/bc250-bazzite-suite/venv` | One copy of the ~100 MB of Qt for all suite apps; removed with the last app that uses it (`venv-users/`) |
| What the portal installed, and the releases it installed from | `~/.local/share/bc250-bazzite-suite/portal/` | So each app's matching uninstaller is at hand |
| Launcher, menu entry, Desktop icon | `~/.local/bin/bc250-bazzite-suite`, `~/.local/share/applications/`, the Desktop | |

Uninstall: `/opt/bc250-bazzite-suite/install.sh --uninstall`. This removes the portal and Bazzite Test and
keeps settings; add `--purge` to remove those too. Apps installed from the portal stay until you uninstall them
there first.

## Development

Run the portal straight from the checkout. Apps then install from the local source, staged exactly as the
release workflow stages them, so everything can be tried before anything is released. It needs PyQt6, so use the
development venv from the main README (Bazzite's own `python3` has no PyQt6):

```shell
cd portal
PYTHONPATH=../core ../.venv-linux/bin/python -m bc250_portal    # --source release: the pinned GitHub releases
```

To install from the checkout, run `./install.sh` in the repository root (or here in `portal/`). It bundles
`../core` and installs `../apps/bazzite-test`. The installed portal then installs the other apps from the
checkout too, so keep the checkout where it is.

## apps.toml and releases

The comment at the top of [`apps.toml`](apps.toml) describes its fields. The rules, checked in CI by
[`tools/check_manifest.py`](../tools/check_manifest.py):

- **Pinned tags.** Every pinned tag must exist when the portal is released. On `main`, a tag may also be the
  next release, which means its version equals that app's `VERSION`.
- **Version bumps.** A change to `apps.toml` needs a `portal/VERSION` bump at least as large as the largest app
  bump it pins: an app patch release needs at least a portal patch release, an app minor release at least a
  portal minor release, and so on.

Releasing an app and pinning it in the portal:

1. Bump `apps/<app>/VERSION` (and the copies that `tools/check_versions.py` lists), and update its CHANGELOG.
2. Tag `<app>-v<x.y.z>` and push the tag; [`release.yml`](../.github/workflows/release.yml) builds
   `<tag>.tar.gz` and `SHA256SUMS` with [`tools/build_release.py`](../tools/build_release.py).
3. `python3 tools/pin_app.py <tag>`: this sets the tag and checksum in `apps.toml`.
4. Bump `portal/VERSION` as `tools/check_manifest.py` asks, and list the app release in the portal CHANGELOG.
5. Once the combination is tested on a BC-250, tag `portal-v<x.y.z>`. That release bundles the pinned
   bazzite-test release.

---

### a new app gets into the portal
#### Code

Create apps/<name>/ with VERSION 0.1.0, a CHANGELOG, a LICENSE and a .gitignore.        
Add an install.sh that supports --uninstall and puts a launcher in ~/.local/bin/, plus tests under tests/.        
Add the app to ./test.sh, the CI shellcheck list and an installer test in tools/installer-tests/.       
Add its [apps.<name>] card to portal/apps.toml: name, summary, changes_board, install/uninstall/detect/launch,          
and tag = "<name>-v<VERSION>" with sha256 left empty. CI accepts a tag that doesn't exist yet as long as it matches the app's VERSION.        
Run all the checks and hand over.

#### Release:
5. Commit and push. CI asks for a portal version bump: minor for a new app; for an app update, at least as big as the app's bump.             
6. Tag <name>-v0.1.0. release.yml builds the tarball and SHA256SUMS and publishes the release.              
7. Run python3 tools/pin_app.py <name>-v0.1.0, which fills in the sha256.             
8. Tag portal-v<x.y.z>. The portal release checks with --require-tags that every pinned tag exists, then publishes.             

Users then see the new card, and installed apps whose version differs from the pinned one get the red update dot.                 
