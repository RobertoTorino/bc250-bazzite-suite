# SPDX-License-Identifier: GPL-3.0-or-later
"""The PCSX2 this version of the app installs. Two channels, chosen in the window:

* the stable release, pinned: the Linux AppImage of a stable release on GitHub, checked against the SHA-256 this
  version of the app was tried with. A newer stable comes with a new version of the app, so the launch line and the
  advice in the app are tried with the release they are for; the app says when there is a newer one.
* the nightly builds (owner's decision 15-10-2026): PCSX2 publishes a pre-release for almost every change, and
  those builds are mostly stable. Install then downloads the newest one and checks it against the SHA-256 GitHub
  computed for that build (the asset's digest in the API): the download is whole, but the build is not one this app
  was tried with, and the window says so.

It goes to ~/.local/share/bc250-pcsx2-manager/emulator/<version>/pcsx2.AppImage, with "current" pointing to it and
the build's size beside it (.size), so replaced() knows the expected size whatever the channel. The run wrapper
(~/.local/bin/bc250-pcsx2-run) starts "current", so the Steam shortcuts keep working when the version changes.
PCSX2's own window offers its updates when it opens, and replaces the AppImage with another build when asked to;
the app then says so (replaced()), and Install puts the channel's build back."""

from __future__ import annotations

import hashlib
import os
import shutil
import urllib.error
import urllib.request
from collections.abc import Callable
from dataclasses import dataclass
from pathlib import Path

from bc250_core.platform import data_home
from bc250_core.updates import Fetch, ReleaseInfo, github_fetch, latest_release, version_tuple

from . import APP_ID, __version__

VERSION = "2.8.2"
TAG = f"v{VERSION}"
ASSET = f"pcsx2-{TAG}-linux-appimage-x64-Qt.AppImage"
SHA256 = "0c46bb6a88aa2782b10853a7b07cf3387ba99cbef2b966372cd2315b8571abea"
SIZE = 60119544                         # bytes: how the app tells that PCSX2 replaced itself with another build
SIZE_MB = round(SIZE / (1 << 20))       # for the question before downloading
MEMBER = "pcsx2.AppImage"               # the name it is installed under, the same for every version
REPO = "PCSX2/pcsx2"
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
    """The installed PCSX2 version ("2.8.2"), "" when none is."""
    current = home / "current"
    if not (current / MEMBER).is_file():
        return ""
    return current.resolve().name


def replaced(home: Path) -> bool:
    """Whether the installed AppImage is no longer the installed build: PCSX2 updated itself in its own window (it
    writes the new build over the AppImage it runs from). The expected size is the .size written at install (a
    nightly's differs per build); the pinned stable's without it."""
    image = appimage(home)
    try:
        size = image.stat().st_size
    except OSError:
        return False
    try:
        expected = int((image.parent / ".size").read_text())
    except (OSError, ValueError):
        expected = SIZE
    return size != expected


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
    """Downloads one build, checks it against *checksum* and installs it as "current"; other versions go. Nothing
    changes when a step fails (EmulatorError)."""
    home.mkdir(parents=True, exist_ok=True)
    work = home / f".download-{os.getpid()}"
    shutil.rmtree(work, ignore_errors=True)
    work.mkdir()
    try:
        image = work / MEMBER
        try:
            fetch(url, image, progress)
        except urllib.error.HTTPError as error:
            raise EmulatorError(f"GitHub answered {error.code} for {asset}.") from error
        except (urllib.error.URLError, OSError) as error:
            reason = str(getattr(error, "reason", error))
            raise EmulatorError(f"The download failed: {reason}.") from error
        if sha256(image) != checksum:
            raise EmulatorError(f"{asset} is not the file {refused} (its SHA-256 differs); nothing was installed.")
        image.chmod(0o755)
        target = home / version
        shutil.rmtree(target, ignore_errors=True)
        target.mkdir()
        (target / ".size").write_text(str(image.stat().st_size))    # replaced() compares against the installed build
        image.replace(target / MEMBER)
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
    return f"PCSX2 {VERSION} is installed."


def remove(home: Path) -> None:
    """The installed PCSX2 goes; PCSX2's own folder (BIOS, memory cards, saves, settings) stays."""
    shutil.rmtree(home, ignore_errors=True)


def newer_release(fetch: Fetch | None = None) -> ReleaseInfo | None:
    """PCSX2's newest stable release when it is newer than the one this app brings; None when it is not, or when
    GitHub cannot be asked (nothing to say then). GitHub's "latest" is the newest release not marked as a
    pre-release, which leaves PCSX2's nightlies out."""
    latest = latest_release(REPO, fetch=fetch, user_agent=f"{APP_ID}/{__version__}")
    if latest.error or version_tuple(latest.version) <= version_tuple(VERSION):
        return None
    return latest


# --- The nightly channel ----------------------------------------------------------------------------------------

NIGHTLY_ASSET_END = "-linux-appimage-x64-Qt.AppImage"


@dataclass(frozen=True)
class Nightly:
    """One nightly build as GitHub publishes it: a pre-release whose AppImage carries GitHub's own SHA-256 (the
    asset's digest). That checksum says the download is whole, not that the build was tried on the board."""
    version: str                        # "2.9.127"
    tag: str                            # "v2.9.127"
    url: str                            # the AppImage
    sha256: str
    size: int
    published: str                      # YYYY-MM-DD
    page: str                           # the release page


def latest_nightly(fetch: Fetch | None = None) -> Nightly:
    """PCSX2's newest nightly build with its checksum. EmulatorError when GitHub cannot be asked, or when no
    nightly with a checksum is found (nothing to install then)."""
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
    found: list[tuple[tuple[int, ...], Nightly]] = []
    for item in data:
        if item.get("draft") or not item.get("prerelease"):
            continue
        tag = str(item.get("tag_name", ""))
        version = version_tuple(tag)
        if not version:
            continue
        for asset in item.get("assets", []):
            name = str(asset.get("name", ""))
            digest = str(asset.get("digest") or "")
            if name.endswith(NIGHTLY_ASSET_END) and digest.startswith("sha256:"):
                found.append((version, Nightly(".".join(map(str, version)), tag,
                                               str(asset.get("browser_download_url", "")), digest[len("sha256:"):],
                                               int(asset.get("size") or 0), str(item.get("published_at", ""))[:10],
                                               str(item.get("html_url", "")))))
    if not found:
        raise EmulatorError("GitHub lists no nightly build with a checksum.")
    return max(found, key=lambda pair: pair[0])[1]


def install_build(home: Path, build: Nightly, fetch: Download = download, progress: Progress | None = None) -> str:
    """Downloads one nightly build and checks it against GitHub's checksum for it. Returns what was done;
    EmulatorError when a step fails (nothing changes then)."""
    _install(home, build.version, build.url, build.url.rsplit("/", 1)[-1], build.sha256,
             "GitHub published for this build", fetch, progress)
    return f"PCSX2 nightly {build.version} is installed."
