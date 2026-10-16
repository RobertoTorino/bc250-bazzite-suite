<!-- SPDX-License-Identifier: GPL-3.0-or-later -->

![BC250 Bazzite Suite](assets/portal/bc250-bazzite-suite.png){ .app-logo }

# Portal

The BC250 Bazzite Suite's front door: one window that installs, opens, updates and removes the suite's apps.
**Bazzite Test** is always installed with the portal and listed first; every other app is optional. Each app is a
tile, left to right in the order of `apps.toml` and as many to a row as the window fits:

- **The name**, without the suite's "BC-250" prefix.
- **The icon.** Click it to open the app; an app with two windows (CU Bisect, Cores Bisect) asks which one. The
  icon is grey while the app is not installed. Hover over it to see what the app does, its state and the release
  this portal pins.
- **A red dot** in the icon: an update is available.
- **A red circular arrow** in the icon: reinstall the app. It is installed, but not by this portal (by hand, or
  under an earlier name of the app), so the portal does not know its version. Its red button reinstalls the version
  this portal pins.
- **changes the board**, in orange under the icon, for apps that change how the board runs.
- **App not available**, in red under the icon: the release of this app was withdrawn because of a problem
  (privacy, security or another reason; hover over it to read which). It cannot be installed or opened. When it is
  installed, the portal says so at start and removes it with the app's own uninstaller in a terminal. If that
  fails, the Uninstall button stays, to try again.
- **The buttons beside the icon:** Install (an arrow into a tray) and Uninstall (a bin). For an installed app,
  Install reinstalls it, or updates it when the arrow is red; hover over it to see the version it installs. Bazzite
  Test has only Install, which reinstalls it: it is removed together with the portal.

**BC250 Bazzite tools** holds the apps for the board, Bazzite Test first. Like the sections below it, it folds
away when you click its name; it is open until you close it, and the portal remembers whether it was open.

**Gaming**, below the apps, holds the apps for playing: [HelixSR Manager](apps/helixsr.md),
[BC-250 ACE Queues](apps/ace-queues.md), [BC-250 Mesh Shaders](apps/mesh-shaders.md),
[Console Link](apps/console-link.md), [shadPS4 Manager](apps/shadps4-manager.md),
[Decky Loader Manager](apps/decky-manager.md), [RPCS3 Manager](apps/rpcs3-manager.md),
[Bazzite DatStation](apps/bazzite-datstation.md), [PPSSPP Manager](apps/ppsspp-manager.md),
[PCSX2 Manager](apps/pcsx2-manager.md) and [Vita3K Manager](apps/vita3k-manager.md). It is open until you close it,
and the portal remembers whether it was open.

**Development only**, below that, opens a separate section with tools for working on the suite:
[Simple Demo Tool](other-tools/simple-demo-tool.md), [Dependency Checker](apps/dependency-checker.md),
[Bazzite NetcatGUI](apps/bazzite-netcatgui.md), the
release front end
[BC250 Suite Releases](#the-release-front-end) and BC-250 Installer Tests (`tools/installer-tests/gui`), a window
that runs the installer tests one at a time. You do not need them to use
the board. The last two run from a checkout of the repository and have no release. A portal installed from a
release installs them too, from the checkout it finds on this machine: the one an installed tool of the checkout
runs from, or the first in your home folder, up to three folders deep (`~/IdeaProjects/bc250-bazzite-suite`, for
example). Only when it finds none does it ask for the folder. It remembers the checkout. The other apps still install from their releases. A portal installed from the
checkout uses its own checkout. The section is closed until you open it, and the portal remembers whether it was
open.

- `apps/` may also contain standalone tools (with a `.standalone` marker) that do not appear in `apps.toml`
  and that the portal does not install or open.
- Install, update and uninstall run **the app's own installer** in a terminal window, because installers may ask
  for the sudo password and print what they do. The portal watches for the result and refreshes.
- Apps that change how the board runs (CU/core unlocks, the GPU governor, GPU overclocking, the ACPI override, the VRAM
  split, a patched GPU driver) are marked **changes the board**. The portal warns before installing or opening them.
- Each portal release pins one tested release of every app in [`apps.toml`](https://github.com/RobertoTorino/bc250-bazzite-suite/blob/main/portal/apps.toml). The portal downloads
  exactly those tarballs from the suite's GitHub releases and checks each against the SHA-256 pinned there, or
  against the release's `SHA256SUMS` until one is pinned. Then it unpacks the tarball without ever writing
  outside its folder.
- **Updates:** a red dot marks every app whose installed version differs from the one this portal pins, and the
  header counts them (and the apps that need a reinstall); its red Install button installs the pinned version. Newer app versions come with a newer portal
  release: at start the portal looks for one on GitHub and, when there is one, shows a red button that opens its
  release page. The button names what that release brings, for example **Portal 0.9.1: updates ACE Queues and
  Memory Manager**, and its tooltip lists each app with its old and new version. After the portal update, the
  installed apps among them show the red dot. When the new pins cannot be read (offline, for example), the button
  says **Portal x.y.z available**.
- **Restart: portal x.y.z is installed:** a portal window that is open while you install a newer portal keeps
  running the old one, with its old app versions, and starting the portal again only brings that window to the
  front. When you come back to the window, it sees the newer portal and shows this red button: click it to restart
  into the new portal, which then shows the red dot on the apps it updates. While an app installs or uninstalls,
  the button waits for it to end.
- **App icons on the Desktop**, at the top: on, every installed app has an icon on the Desktop; off, only the
  portal's icon is there and you start the apps from the portal. The apps stay in the app menu either way, so KDE's
  search and Steam's **Add a Non-Steam Game** still find them. The first time the portal starts with app icons on
  the Desktop, it asks whether to keep them. While the switch is off, the portal removes the icons the apps'
  installers put there, at start and after each install. It only touches the icons of the suite's apps, never its
  own or anything else on the Desktop.
- The **Dependency Checker** is a separate app in `apps/`. It lists declared runtime Python packages and
  app-specific external tools, plus the apps and features that use them. It compares Python package versions with
  PyPI and checks whether external tools are available; tool links open the relevant app guide. Some apps use
  separate virtual environments. The checker does not install or update anything.

## Install

From the [latest portal release](https://github.com/RobertoTorino/bc250-bazzite-suite/releases/latest), download
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
| What the portal installed, and the release each app was installed from | `~/.local/share/bc250-bazzite-suite/portal/` | So each app's matching uninstaller is at hand; an update removes the previous release |
| Launcher, menu entry, Desktop icon | `~/.local/bin/bc250-bazzite-suite`, `~/.local/share/applications/`, the Desktop | The portal's icon is the one way in; the apps' own icons are optional (**App icons on the Desktop**) |

Uninstall: `/opt/bc250-bazzite-suite/install.sh --uninstall`. This removes the portal and Bazzite Test and
keeps settings; add `--purge` to remove those too. First it asks about each other suite app that is installed:
`y` uninstalls it, `s` skips it (it stays installed), `c` cancels the whole uninstall before anything is removed.
Those apps keep their own settings, also with `--purge`. Of the portal's own records, only those of the apps you
kept stay, with the release each one's uninstaller needs; with no app left, that folder goes too.

### What stays after an uninstall

Uninstalling an app removes the app. Two things stay on purpose: **changes it made to the board**, which you undo
in the app (or with its script) before you uninstall it, and **your settings and results**, which `--purge`
removes.

| App | Still active on the board after its uninstall | Undo it with |
|---|---|---|
| CU Bisect / Unlock | A persisted CU unlock: `bc250-cu-unlock.service` at every boot | **Uninstall** in the Unlock app, or `sudo /usr/local/sbin/bc250-cu-unlock.sh --uninstall`; stock CUs after the next reboot |
| Cores Bisect / Unlock | A persisted core unlock: its boot service | **Uninstall** in the Unlock app, or `sudo /usr/local/sbin/bc250-cores-unlock.sh --uninstall`; stock cores after the next full power off |
| GPU OC Bisect | The installed overclock in the governor's `config.toml` | **Uninstall** in the app, or `bc250-gpu-oc-bisect.sh --uninstall`: restores the backup |
| Persistent ACPI | The ACPI override (`/boot/acpi_override.cpio` and its GRUB line) | **Uninstall** in the app, or `sudo ./bc250-acpi-override.sh --uninstall`; then reboot |
| ACE Queues | An installed patched driver | **Remove** in the app |
| Memory Manager | The VRAM split in CMOS | Set the split back in the app (or **Undo**) and reboot |

The GPU Governor Manager changes nothing of its own: the governor and its `config.toml` belong to the governor
package, which stays installed. HelixSR keeps the imported payload (`~/.local/share/bc250-bazzite-helixsr-gui`) and
leaves the games it deployed to as they are; **Remove** each deployment in the app first.

Settings live in `~/.config/bc250-*`, results and logs in `~/.local/share/bc250-*` (Bazzite Test also writes its
reports to `~/Desktop/bc250-bazzite-test`). Each app's `install.sh --uninstall --purge` removes them; the
portal's `--purge` does so for the portal and Bazzite Test.

## Development

Run the portal straight from the checkout. Apps then install from the local source, staged exactly as the
release workflow stages them, so everything can be tried before anything is released. It needs PyQt6, so use the
development venv from [Development](development/index.md#development) (Bazzite's own `python3` has no PyQt6):

```shell
cd portal
PYTHONPATH=../core ../.venv-linux/bin/python -m bc250_portal    # --source release: the pinned GitHub releases
```

To install from the checkout, run `./install.sh` in the repository root (or here in `portal/`). It bundles
`../core` and installs `../apps/bazzite-test`. The installed portal then installs the other apps from the
checkout too, so keep the checkout where it is.

## apps.toml and releases

The comment at the top of [`apps.toml`](https://github.com/RobertoTorino/bc250-bazzite-suite/blob/main/portal/apps.toml) describes its fields. The rules, checked in CI by
[`tools/check_manifest.py`](https://github.com/RobertoTorino/bc250-bazzite-suite/blob/main/tools/check_manifest.py):

- **Pinned tags.** Every pinned tag must exist when the portal is released. On `main`, a tag may also be the
  next release, which means its version equals that app's `VERSION`.
- **Version bumps.** A change to `apps.toml` needs a `portal/VERSION` bump at least as large as the largest app
  bump it pins: an app patch release needs at least a portal patch release, an app minor release at least a
  portal minor release, and so on. An added, removed or withdrawn app needs at least a minor portal release.
- **Withdrawn releases.** `withdrawn = "<reason>"` in an app's entry withdraws its pinned release (see
  [Withdrawing a release](#withdrawing-a-release)). Not for Bazzite Test, which is always installed.

Releasing an app and pinning it in the portal:

1. Bump `apps/<app>/VERSION` (and the copies that `tools/check_versions.py` lists), and update its CHANGELOG.
2. Commit and push, then tag with `tools/tag-release.sh <app>-v<x.y.z>` (it waits until CI passed on that
   commit); [`release.yml`](https://github.com/RobertoTorino/bc250-bazzite-suite/blob/main/.github/workflows/release.yml) builds
   `<tag>.tar.gz` and `SHA256SUMS` with [`tools/build_release.py`](https://github.com/RobertoTorino/bc250-bazzite-suite/blob/main/tools/build_release.py).
   An app with a Windows executable (SFTP Tools) also gets a Windows job on its tag, which adds
   `<app-id>-<version>-windows.zip` and its `.sha256` to the release; the portal ignores them.
3. `python3 tools/pin_app.py <tag>`: this sets the tag and checksum in `apps.toml`.
4. Bump `portal/VERSION` as `tools/check_manifest.py` asks, and list the app release in the portal CHANGELOG.
5. Once the pinned app releases are tested together on a BC-250 (see
   [Testing a portal release before its tag](#testing-a-portal-release-before-its-tag)), commit steps 3 and 4,
   push, and tag with `tools/tag-release.sh portal-v<x.y.z>`. That release bundles the pinned bazzite-test release.

![BC250 Suite Releases](assets/suite-releases/bc250-release-128.png){ .app-logo }

### The release front end

**BC250 Suite Releases** (`apps/suite-releases/`) is a window that makes these file edits for you. It never commits,
tags or pushes: after each step it shows the git commands to run. It edits the checkout it lives in, so it is not
in the portal and has no releases of its own. Start it from the repository root:

```bash
tools/release.sh            # or apps/suite-releases/run.sh
tools/release.sh --list     # the same overview in the terminal, with the system python3
```

To start it from the app menu instead, install it once on Linux. Nothing is copied: the entry always starts the app
of the checkout you installed it from.

```bash
apps/suite-releases/install.sh                         # app menu entry and Desktop icon
apps/suite-releases/install.sh --no-desktop-shortcut   # app menu entry only
apps/suite-releases/install.sh --uninstall             # remove them; the checkout stays
```

`tools/release.sh --install` and `--uninstall` do the same. It runs with the checkout's `.venv-linux` (see
[Development](development/index.md)). After moving the checkout, run `install.sh` again. On Windows, run
`tools/release.sh` from Git Bash.

- **1. Apps:** the **Needs release** column marks in orange every app that ships something new since its last
  tag: a changed file in its folder (tests and `requirements-dev.txt` do not count), in the core it bundles, or in
  its manual chapter, committed or not. Hover it for the files. Step 2 says the same for the portal. Those apps are
  ticked when the window opens; untick what waits (**Tick what needs a release** ticks them all again) and enter the
  versions. The version offered first follows [semantic versioning](development/architecture.md#versions-changelogs-and-releases) from the CHANGELOG
  entries since the last tag (`Breaking.` major, `Added.` minor, `Fixed.` patch); its tooltip says why. A version
  that was never tagged (the first release) can be released as it is. **Apply** writes `VERSION`, every copy `tools/check_versions.py` checks and a
  `Release x.y.z.` CHANGELOG entry with your notes, which become the release notes on GitHub. The release notes
  of an app that bundles the core also name the core version. When `apps.toml`
  pins a tag of that app that was never released, the pin moves to the new version. When `apps.toml` changed since
  the last push, for that or another reason (an app added or removed), the window says that this push also needs a
  portal bump, and runs `tools/check_manifest.py`. Then commit, push, and push the app tags (steps 1 and 2 above):
  on Linux the push command runs `tools/ci-local.sh` first and pushes only when CI's jobs pass.
- **2. Pin and portal:** once GitHub has built the app releases, **Pin** reads each release's `SHA256SUMS` and
  pins its tag and checksum in `apps.toml` (step 3). The window shows the lowest portal version CI accepts against
  the last push (`origin/main`), and offers the higher of that and what semantic versioning gives since the last
  portal tag (its CHANGELOG entries, and the apps added, removed or moved in `apps.toml`); **Bump portal** writes it with a CHANGELOG entry that lists the pinned app
  releases, and runs `tools/check_manifest.py` (step 4). Then commit, test on a BC-250 (below), and only then push
  and tag the portal (step 5). The window lists these commands in that order.
- **Test updates** and **Test release** run the two board tests below in a terminal, with
  `apps/suite-releases/check-release.sh`: the portal from the checkout before the push, and the published portal release after
  GitHub has built it. Linux only.
- **Run from checkout:** every app window in the checkout, as an icon. A click starts that app from the checkout,
  to try a change before its release: `python -m <package>` with the checkout's venv and its `core`, as `run.sh`
  starts Suite Releases. An app that changes how the board runs asks first, as in the portal; started from the
  checkout it uses the scripts in the checkout. Each app writes its output to
  `~/.cache/bc250-release/run/<package>.log`. When an app stops with an error, the end of its log shows on the page.
  The apps keep running when you close the window. The last icon, **Manual (local)**, serves this manual from the
  checkout with `mkdocs serve` (the development venv has MkDocs) and opens it in the browser at
  `http://127.0.0.1:8765/bc250-bazzite-suite/`. It rebuilds on every save; its log is `mkdocs.log` there. When it
  is already running, a click only opens the page again.
- **The command line** under the steps runs a command in the checkout, so you need no separate terminal for the
  commands the steps show. Type it and press Enter; its output appears above the line as it runs. **Commands**
  lists the commands the last step showed (Apply, Bump portal or Withdraw), one per line: pick one to put it on
  the line, then check it and press Enter. Up and Down bring back earlier commands, also from earlier sessions.
  **Stop** or Ctrl+C interrupts a command, along with anything it started in the background; `clear` or **Clear**
  empties the output. Drag the line above it to give it more room.
  Each command runs with `bash -lc` in the folder the last `cd` left; variables you set do not carry over to the
  next command. A command cannot read input, so nothing can ask you something: git does not prompt for a password,
  opens no editor (commit with `-m`) and pages nothing. For a command that must ask, use a terminal. After each
  command the window reads the checkout again, as **Refresh** does. On Windows it needs Git Bash's `bash` on the
  PATH.

**GitHub** in the header shows whether GitHub built your last push: every workflow run (CI, Release, Manual) on
its commit, tags included. It reads **building** while one runs, then **passed** or **failed**; hover for each
run, click to open the run that failed (or still runs) on GitHub. It looks every 30 seconds while a build runs and
every 5 minutes otherwise, and **Refresh** looks at once. When a run it saw running finishes, a desktop
notification says whether it passed. It needs no GitHub token: answers that did not change do not count against
GitHub's limit of 60 requests an hour.

Only portal releases are marked **Latest** on GitHub (`release.yml` passes `--latest=false` for app releases), so
`/releases/latest`, which the README and the manual link to, always opens the newest portal. App release notes
start by pointing to it.

A red line at the top of the window means a release tag points at a commit whose `VERSION` is not the tag's
version: the tag was made before the version bump was committed, and `release.yml` cannot build it. Delete the tag
(the line shows how), commit and push the bump, and tag again with `tools/tag-release.sh`.

`tools/tag-release.sh <tag> [...]` tags HEAD and pushes the tags, but refuses while HEAD does not hold each tag's
version (the bump is not committed yet), while that folder has uncommitted changes, while HEAD is not pushed to
`origin/main`, or when CI did not pass on HEAD: it asks GitHub (`tools/ci_state.py`) and waits while CI still runs,
up to an hour. A portal tag also waits for the app releases it pins: each one tagged on GitHub and pinned with its
sha256 (step 2), as the portal's release needs them. A plain `git tag` tags whatever HEAD is at that moment, also the commit from before the bump or one
CI failed. `release.yml` asks the same before it builds anything: a tag on a commit CI did not pass gives no
release.

`python3 tools/release_plan.py` lists every app with its version, its last tag and its pin, without Qt.

### Testing a portal release before its tag

A portal release promises one set of app releases, each with its checksum. Once its tag is out, every installed
portal offers those releases as updates. So before the tag, check on a BC-250 that exactly those pinned releases
install and run:

1. Bump the portal (step 4) and commit. Pushing is not needed for this test.
2. Click **Test updates** in the release front end, or run `apps/suite-releases/check-release.sh local`. It installs the portal
   from the checkout (`./install.sh` in the repository root: this portal version, with its new pins in
   `apps.toml`) and starts it with the pinned releases instead of the checkout:

    ```bash
    bc250-bazzite-suite --source release
    ```

    Apps then install as on a user's board: the portal downloads each pinned tarball from GitHub and refuses it
    unless its checksum matches the pin. Without `--source release`, a portal installed from a checkout installs
    the apps from the checkout.
4. The apps whose pin changed show a red dot and a red Install button. Update them, open each one and check that
   it starts and works; afterwards the red dots and the update count in the header are gone.
5. All good: tag the portal (step 5). Something wrong: fix the app and release a new patch version of it (steps 1
   to 4). Nothing has reached users yet.

This does not test the portal tarball itself, which GitHub builds from the tag; the release workflow checks it
(`tools/check_manifest.py --require-tags`, and the bundled Bazzite Test against its pin). The next section tests
it on the board.

### Testing a portal release after its tag

Once GitHub's release workflow has built the portal release, click **Test release**, or run:

```bash
apps/suite-releases/check-release.sh release              # the release of portal/VERSION
apps/suite-releases/check-release.sh release portal-v0.9.2
```

It downloads the release tarball and its `SHA256SUMS` from GitHub into `~/.cache/bc250-release-check/`, checks
the checksum, installs it and starts it. The board then runs the official release, as a user's board does: check
that the portal starts, that its version is the new one, and that the apps install. To go back to the checkout,
run `./install.sh` in the repository root (or Test updates). A portal from the checkout shows an orange
banner at the top, "Local build"; the published release has none.

### Withdrawing a release

A release that must not be used any more, because of a privacy, security or any other problem, is withdrawn.
The release stays on GitHub, so its history is kept, but nothing installs it any more:

1. In BC250 Suite Releases, tab **3. Withdraw**: choose the app's pinned release, write why, and press
   **Withdraw**. This adds `withdrawn = "<reason>"` to its entry in `apps.toml` and a CHANGELOG entry to the app.
   **Take back** removes it again.
2. **Test withdrawal** on a BC-250 with the app installed: it installs the portal from the checkout and starts it
   (`check-release.sh local`). The portal must say the app is not available any more, remove it, and then show
   **App not available** on its tile.
3. Mark the release on GitHub with the command the tab shows: `gh release edit <tag> --prerelease --title
   "Withdrawn: <tag>" --notes "..."`. A pre-release is skipped by every update check, so no app offers it.
4. Release the portal (tab **2**, at least a minor version): its CHANGELOG entry names the withdrawal. A board
   that updates to it removes the app; the portal update button says so beforehand ("withdraws ...").

### Checking a release

A release tarball has the same content when you build its tag yourself, but usually not the same checksum: the
gzip compression differs between zlib builds (Fedora uses zlib-ng, GitHub's Ubuntu runners zlib), so compare the
unpacked files, not the `.tar.gz`. Bazzite Test's build time in `bc250_gui/_build_info.py` is the commit time too;
older Bazzite Test releases recorded the clock, and there only that line differs:

```bash
git archive <tag> | tar -x -C /tmp/src
SOURCE_DATE_EPOCH=$(git log -1 --format=%ct <tag>) python3 /tmp/src/tools/build_release.py <tag> /tmp/local
curl -LO https://github.com/RobertoTorino/bc250-bazzite-suite/releases/download/<tag>/<tag>.tar.gz
mkdir -p /tmp/a /tmp/b && tar -xzf <tag>.tar.gz -C /tmp/a && tar -xzf /tmp/local/<tag>.tar.gz -C /tmp/b
diff -r /tmp/a /tmp/b
```

The checksum pinned in `apps.toml` is always the one of the published tarball. That is also why the release
tests pin their own local builds instead of the published ones.

---

### a new app gets into the portal
#### Code

Create apps/<name>/ with VERSION 0.1.0, a CHANGELOG, a LICENSE and a .gitignore. For an app that stays outside the
portal, add `.standalone` instead of adding it to `portal/apps.toml`. An app that runs from the checkout and is
never released also gets `.checkout-only`, and a `[checkout.<name>]` table in `apps.toml` (no tag) when the portal
should list it under "Development only". Such a tool outside `apps/` (like
`tools/installer-tests/gui`) names its folder with `folder = "..."` and has the marker there.
Add an install.sh that supports --uninstall and puts a launcher in ~/.local/bin/, plus tests under tests/.        
Add the app to ./test.sh, the CI shellcheck list and an installer test in tools/installer-tests/.       
Add its [apps.<name>] card to portal/apps.toml: name, summary, changes_board (and development = true for a tool
that belongs under "Development only", or section = "gaming" for an app for playing), install/uninstall/detect/launch,          
and tag = "<name>-v<VERSION>" with sha256 left empty. CI accepts a tag that doesn't exist yet as long as it matches the app's VERSION.        
Run all the checks and hand over.

#### Release:
5. Commit and push. CI asks for a portal version bump: minor for a new app; for an app update, at least as big as the app's bump.             
6. Tag <name>-v0.1.0. release.yml builds the tarball and SHA256SUMS and publishes the release.              
7. Run python3 tools/pin_app.py <name>-v0.1.0, which fills in the sha256.             
8. Tag portal-v<x.y.z>. The portal release checks with --require-tags that every pinned tag exists, then publishes.             

Users then see the new card, and installed apps whose version differs from the pinned one get the red update dot.                 

#### New Version
- Change portal/VERSION from 0.1.0 to 0.2.0.
- Change __version__ in portal/bc250_portal/init.py:6 to the same number.
