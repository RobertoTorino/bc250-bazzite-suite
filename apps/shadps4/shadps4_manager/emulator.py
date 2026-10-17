# SPDX-License-Identifier: GPL-3.0-or-later
"""The shadPS4 this version of the app installs (an AppImage in a zip, either way). Two channels, chosen in the
window:

* the stable release, pinned: the Linux build of a tagged release on GitHub, checked against the SHA-256 this
  version of the app was tried with. A newer stable comes with a new version of the app, so the launch line and the
  advice in the app are tried with the release they are for; the app says when there is a newer one.
* the nightly builds (owner's decision 15-10-2026: shadPS4's development builds are mostly stable). shadPS4 keeps
  one rolling pre-release (Pre-release-shadPS4-<date>-<commit>) with the newest build. Install then downloads it
  and checks it against the SHA-256 GitHub computed for that build (the asset's digest in the API): the download is
  whole, but the build is not one this app was tried with, and the window says so.

It goes to ~/.local/share/bc250-shadps4-manager/emulator/<version>/, with "current" pointing to it. The run wrapper
(~/.local/bin/bc250-shadps4-run) starts "current", so the Steam shortcuts keep working when the version changes."""

from __future__ import annotations

import hashlib
import os
import shutil
import urllib.error
import urllib.request
import zipfile
from collections.abc import Callable
from dataclasses import dataclass
from pathlib import Path

from bc250_core.platform import data_home
from bc250_core.updates import Fetch, ReleaseInfo, github_fetch, latest_release, version_tuple

from . import APP_ID, __version__

VERSION = "0.20.0"
TAG = "v.0.20.0"                        # shadPS4 tags its releases "v.0.20.0"
ASSET = "shadps4-linux-sdl-0.20.0.zip"
SHA256 = "be25d0324cd7b74068d32cdb66fa1b7b1e7bb499b062be51c7006d27d41d4255"
SIZE_MB = 31                            # the zip, for the question before downloading
MEMBER = "Shadps4-sdl.AppImage"         # the only file in the zip
REPO = "shadps4-emu/shadPS4"
URL = f"https://github.com/{REPO}/releases/download/{TAG}/{ASSET}"
RELEASE_PAGE = f"https://github.com/{REPO}/releases/tag/{TAG}"
CHUNK = 1 << 20
TIMEOUT = 30

Progress = Callable[[int, int], None]                   # bytes so far, total (0 when unknown)
Download = Callable[[str, Path, Progress | None], None]


class EmulatorError(Exception):
    pass


def emulator_home() -> Path:
    return data_home() / APP_ID / "emulator"


def appimage(home: Path) -> Path:
    """The AppImage the run wrapper starts."""
    return home / "current" / MEMBER


def installed_version(home: Path) -> str:
    """The installed shadPS4 version ("0.20.0"), "" when none is."""
    current = home / "current"
    if not (current / MEMBER).is_file():
        return ""
    return current.resolve().name


def download(url: str, dest: Path, progress: Progress | None = None) -> None:
    request = urllib.request.Request(url, headers={"User-Agent": f"{APP_ID}/{__version__}"})
    with urllib.request.urlopen(request, timeout=TIMEOUT) as response, dest.open("wb") as out:
        total = int(response.headers.get("Content-Length") or 0)
        done = 0
        while chunk := response.read(CHUNK):
            out.write(chunk)
            done += len(chunk)
            if progress:
                progress(done, total)


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as file:
        while chunk := file.read(CHUNK):
            digest.update(chunk)
    return digest.hexdigest()


def _install(home: Path, version: str, url: str, asset: str, checksum: str, refused: str,
             fetch: Download, progress: Progress | None) -> None:
    """Downloads one build (a zip), checks it against *checksum* and installs its AppImage as "current"; other
    versions go. Nothing changes when a step fails (EmulatorError)."""
    home.mkdir(parents=True, exist_ok=True)
    work = home / f".download-{os.getpid()}"
    shutil.rmtree(work, ignore_errors=True)
    work.mkdir()
    try:
        archive = work / asset
        try:
            fetch(url, archive, progress)
        except urllib.error.HTTPError as error:
            raise EmulatorError(f"GitHub answered {error.code} for {asset}.") from error
        except (urllib.error.URLError, OSError) as error:
            reason = str(getattr(error, "reason", error))
            raise EmulatorError(f"The download failed: {reason}.") from error
        if sha256(archive) != checksum:
            raise EmulatorError(f"{asset} is not the file {refused} (its SHA-256 differs); nothing was installed.")
        try:
            with zipfile.ZipFile(archive) as packed:
                if MEMBER not in packed.namelist():
                    raise EmulatorError(f"{asset} has no {MEMBER}.")
                with packed.open(MEMBER) as source, (work / MEMBER).open("wb") as out:
                    shutil.copyfileobj(source, out, CHUNK)
        except zipfile.BadZipFile as error:
            raise EmulatorError(f"{asset} is damaged.") from error
        (work / MEMBER).chmod(0o755)
        target = home / version
        shutil.rmtree(target, ignore_errors=True)
        target.mkdir()
        (work / MEMBER).replace(target / MEMBER)
        link = home / ".current-new"
        link.unlink(missing_ok=True)
        link.symlink_to(version)
        link.replace(home / "current")
    finally:
        shutil.rmtree(work, ignore_errors=True)
    for other in home.iterdir():
        if other.is_dir() and not other.is_symlink() and other.name != version and not other.name.startswith("."):
            shutil.rmtree(other, ignore_errors=True)


def install(home: Path, fetch: Download = download, progress: Progress | None = None) -> str:
    """The pinned stable release, checked against the SHA-256 this app was tried with. Returns what was done."""
    _install(home, VERSION, URL, ASSET, SHA256, "this app was tested with", fetch, progress)
    return f"shadPS4 {VERSION} is installed."


def remove(home: Path) -> None:
    """The installed shadPS4 goes; shadPS4's own folder (saves, system modules, settings) stays."""
    shutil.rmtree(home, ignore_errors=True)


def newer_release(fetch: Fetch | None = None) -> ReleaseInfo | None:
    """shadPS4's newest stable release when it is newer than the one this app brings; None when it is not, or when
    GitHub cannot be asked (nothing to say then)."""
    latest = latest_release(REPO, fetch=fetch, user_agent=f"{APP_ID}/{__version__}")
    if latest.error or version_tuple(latest.version) <= version_tuple(VERSION):
        return None
    return latest


# --- The nightly channel ----------------------------------------------------------------------------------------

NIGHTLY_ASSET_START = "shadps4-linux-sdl-"


@dataclass(frozen=True)
class Nightly:
    """One nightly build as GitHub publishes it: the rolling pre-release, whose zip carries GitHub's own SHA-256
    (the asset's digest). That checksum says the download is whole, not that the build was tried on the board."""
    version: str                        # "2026-10-15-b2d7ec7": the date and commit, from the asset's name
    tag: str                            # "Pre-release-shadPS4-<date>-<commit>"
    url: str                            # the zip
    asset: str
    sha256: str
    size: int
    published: str                      # YYYY-MM-DD
    page: str                           # the release page


def latest_nightly(fetch: Fetch | None = None) -> Nightly:
    """shadPS4's newest nightly build with its checksum (its pre-releases carry no version number, so the newest is
    the last published). EmulatorError when GitHub cannot be asked, or when no nightly with a checksum is found
    (nothing to install then)."""
    fetch = fetch or github_fetch(f"{APP_ID}/{__version__}")
    try:
        data = fetch(f"https://api.github.com/repos/{REPO}/releases?per_page=30")
        if not isinstance(data, list):
            raise ValueError("not a release list")
    except urllib.error.HTTPError as error:
        raise EmulatorError(f"GitHub answered {error.code}.") from error
    except (urllib.error.URLError, OSError, ValueError) as error:
        reason = str(getattr(error, "reason", error))
        raise EmulatorError(f"GitHub could not be asked for the nightly builds: {reason}.") from error
    found: list[tuple[str, Nightly]] = []
    for item in data:
        if item.get("draft") or not item.get("prerelease"):
            continue
        published = str(item.get("published_at", ""))
        for asset in item.get("assets", []):
            name = str(asset.get("name", ""))
            digest = str(asset.get("digest") or "")
            if name.startswith(NIGHTLY_ASSET_START) and name.endswith(".zip") and digest.startswith("sha256:"):
                found.append((published, Nightly(name[len(NIGHTLY_ASSET_START):-len(".zip")],
                                                 str(item.get("tag_name", "")),
                                                 str(asset.get("browser_download_url", "")), name,
                                                 digest[len("sha256:"):], int(asset.get("size") or 0),
                                                 published[:10], str(item.get("html_url", "")))))
    if not found:
        raise EmulatorError("GitHub lists no nightly build with a checksum.")
    return max(found, key=lambda pair: pair[0])[1]


def install_build(home: Path, build: Nightly, fetch: Download = download, progress: Progress | None = None) -> str:
    """Downloads one nightly build and checks it against GitHub's checksum for it. Returns what was done;
    EmulatorError when a step fails (nothing changes then)."""
    _install(home, build.version, build.url, build.asset, build.sha256, "GitHub published for this build",
             fetch, progress)
    return f"shadPS4 nightly {build.version} is installed."
