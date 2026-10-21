# SPDX-License-Identifier: GPL-3.0-or-later
"""The mGBA release this version of the app installs, pinned: the Linux AppImage of a tagged release on GitHub,
checked against the SHA-256 this version of the app was tried with before it is installed. A newer mGBA comes with a
new version of the app, so the launch line and the advice in the app are tried with the release they are for. The
app looks up mGBA's newest release and says when there is a newer one than it brings; it never installs one it was
not tried with.

It goes to ~/.local/share/bc250-mgba-manager/emulator/<version>/mgba.AppImage, with "current" pointing to it. The
run wrapper (~/.local/bin/bc250-mgba-run) starts "current", so the Steam shortcuts keep working when the version
changes. mGBA's own window offers its updates (its updater knows the AppImage) and writes the new build over the
AppImage when asked to; the app then says so (replaced()), and Install puts the pinned release back."""

from __future__ import annotations

import hashlib
import os
import shutil
import urllib.error
import urllib.request
from collections.abc import Callable
from pathlib import Path

from bc250_core.platform import data_home
from bc250_core.updates import Fetch, ReleaseInfo, latest_release, version_tuple

from . import APP_ID, __version__

VERSION = "0.10.5"
TAG = VERSION                           # mGBA tags its releases without a v
ASSET = f"mGBA-{VERSION}-appimage-x64.appimage"
SHA256 = "fdf0a5c1588e1606c38315735cf48a9f9dca3573f32a3947ebc956f8297e85cd"
SIZE = 25208000                         # bytes: how the app tells that mGBA replaced itself with another build
SIZE_MB = round(SIZE / (1 << 20))       # for the question before downloading
MEMBER = "mgba.AppImage"                # the name it is installed under, the same for every version
REPO = "mgba-emu/mgba"
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
    """The installed mGBA version ("0.10.5"), "" when none is."""
    current = home / "current"
    if not (current / MEMBER).is_file():
        return ""
    return current.resolve().name


def replaced(home: Path) -> bool:
    """Whether the installed AppImage is no longer the pinned release: mGBA updated itself in its own window."""
    try:
        return appimage(home).stat().st_size != SIZE
    except OSError:
        return False


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


def install(home: Path, fetch: Download = download, progress: Progress | None = None) -> str:
    """Downloads the pinned release, checks it and installs it as "current"; other versions go. Returns what was
    done. Nothing changes when a step fails (EmulatorError)."""
    home.mkdir(parents=True, exist_ok=True)
    work = home / f".download-{os.getpid()}"
    shutil.rmtree(work, ignore_errors=True)
    work.mkdir()
    try:
        image = work / MEMBER
        try:
            fetch(URL, image, progress)
        except urllib.error.HTTPError as error:
            raise EmulatorError(f"GitHub answered {error.code} for {ASSET}.") from error
        except (urllib.error.URLError, OSError) as error:
            reason = str(getattr(error, "reason", error))
            raise EmulatorError(f"The download failed: {reason}.") from error
        if sha256(image) != SHA256:
            raise EmulatorError(f"{ASSET} is not the file this app was tested with (its SHA-256 differs); "
                                "nothing was installed.")
        image.chmod(0o755)
        target = home / VERSION
        shutil.rmtree(target, ignore_errors=True)
        target.mkdir()
        image.replace(target / MEMBER)
        link = home / ".current-new"
        link.unlink(missing_ok=True)
        link.symlink_to(VERSION)
        link.replace(home / "current")
    finally:
        shutil.rmtree(work, ignore_errors=True)
    for other in home.iterdir():
        if other.is_dir() and not other.is_symlink() and other.name != VERSION and not other.name.startswith("."):
            shutil.rmtree(other, ignore_errors=True)
    return f"mGBA {VERSION} is installed."


def remove(home: Path) -> None:
    """The installed mGBA goes; mGBA's own folder (settings, saves beside the games) stays."""
    shutil.rmtree(home, ignore_errors=True)


def newer_release(fetch: Fetch | None = None) -> ReleaseInfo | None:
    """mGBA's newest release when it is newer than the one this app brings; None when it is not, or when GitHub
    cannot be asked (nothing to say then)."""
    latest = latest_release(REPO, fetch=fetch, user_agent=f"{APP_ID}/{__version__}")
    if latest.error or version_tuple(latest.version) <= version_tuple(VERSION):
        return None
    return latest
