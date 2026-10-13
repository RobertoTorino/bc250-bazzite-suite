# SPDX-License-Identifier: GPL-3.0-or-later
"""The shadPS4 release this version of the app installs, pinned: the Linux build of a tagged release on GitHub (an
AppImage in a zip), checked against its SHA-256 before anything is unpacked. A newer shadPS4 comes with a new version
of the app, so the launch line and the advice in the app are tried with the release they are for.

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
from pathlib import Path

from bc250_core.platform import data_home

from . import APP_ID, __version__

VERSION = "0.19.0"
TAG = "v.0.19.0"                        # shadPS4 tags its releases "v.0.19.0"
ASSET = "shadps4-linux-sdl-0.19.0.zip"
SHA256 = "a6e3b83fd6c9ea7b29c37e77e1aa687802d4ecd98c2ea794ca9e1d97b24a0cf9"
SIZE_MB = 31                            # the zip, for the question before downloading
MEMBER = "Shadps4-sdl.AppImage"         # the only file in the zip
URL = f"https://github.com/shadps4-emu/shadPS4/releases/download/{TAG}/{ASSET}"
RELEASE_PAGE = f"https://github.com/shadps4-emu/shadPS4/releases/tag/{TAG}"
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
    """The installed shadPS4 version ("0.19.0"), "" when none is."""
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


def install(home: Path, fetch: Download = download, progress: Progress | None = None) -> str:
    """Downloads the pinned release, checks it and installs its AppImage as "current"; other versions go. Returns
    what was done. Nothing changes when a step fails (EmulatorError)."""
    home.mkdir(parents=True, exist_ok=True)
    work = home / f".download-{os.getpid()}"
    shutil.rmtree(work, ignore_errors=True)
    work.mkdir()
    try:
        archive = work / ASSET
        try:
            fetch(URL, archive, progress)
        except urllib.error.HTTPError as error:
            raise EmulatorError(f"GitHub answered {error.code} for {ASSET}.") from error
        except (urllib.error.URLError, OSError) as error:
            reason = str(getattr(error, "reason", error))
            raise EmulatorError(f"The download failed: {reason}.") from error
        if sha256(archive) != SHA256:
            raise EmulatorError(f"{ASSET} is not the file this app was tested with (its SHA-256 differs); "
                                "nothing was installed.")
        try:
            with zipfile.ZipFile(archive) as packed:
                if MEMBER not in packed.namelist():
                    raise EmulatorError(f"{ASSET} has no {MEMBER}.")
                with packed.open(MEMBER) as source, (work / MEMBER).open("wb") as out:
                    shutil.copyfileobj(source, out, CHUNK)
        except zipfile.BadZipFile as error:
            raise EmulatorError(f"{ASSET} is damaged.") from error
        (work / MEMBER).chmod(0o755)
        target = home / VERSION
        shutil.rmtree(target, ignore_errors=True)
        target.mkdir()
        (work / MEMBER).replace(target / MEMBER)
        link = home / ".current-new"
        link.unlink(missing_ok=True)
        link.symlink_to(VERSION)
        link.replace(home / "current")
    finally:
        shutil.rmtree(work, ignore_errors=True)
    for other in home.iterdir():
        if other.is_dir() and not other.is_symlink() and other.name != VERSION and not other.name.startswith("."):
            shutil.rmtree(other, ignore_errors=True)
    return f"shadPS4 {VERSION} is installed."


def remove(home: Path) -> None:
    """The installed shadPS4 goes; shadPS4's own folder (saves, system modules, settings) stays."""
    shutil.rmtree(home, ignore_errors=True)
