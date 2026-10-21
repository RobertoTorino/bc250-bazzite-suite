# SPDX-License-Identifier: GPL-3.0-or-later
"""What SameBoy runs on: RetroArch and the SameBoy core.

The SameBoy core is libretro's port of SameBoy, a library RetroArch loads, not a program of its own (SameBoy releases
no Linux build). RetroArch comes from Flathub (org.libretro.RetroArch, a Flatpak: Flatpak updates it, the app never
pins it); a RetroArch that is installed already, for the user or the system (SwanStation Manager installs the same
one), is used as it is. The core is the file the libretro project builds, sameboy_libretro.so, downloaded as a zip
from the libretro buildbot. Its build server keeps only the newest build of a core, so unlike the pinned emulator
managers this app cannot pin a release and its SHA-256. It checks what it can instead: a zip with that one file in
it, an x86-64 Linux library, and it records the build date and the SHA-256 of what it installed. The app looks at the
buildbot for a newer build and says when there is one.

The core goes to ~/.local/share/bc250-sameboy-manager/emulator/core/sameboy_libretro.so, next to core.json (what was
installed). The run wrapper (~/.local/bin/bc250-sameboy-run) starts RetroArch with it; the Flatpak can read the
folder (it has access to the home folder), so RetroArch's own folder stays as it is."""

from __future__ import annotations

import hashlib
import json
import os
import re
import shutil
import subprocess
import urllib.error
import urllib.request
import zipfile
from collections.abc import Callable
from email.utils import parsedate_to_datetime
from pathlib import Path

from bc250_core.platform import data_home

from . import APP_ID, __version__

FLATPAK_ID = "org.libretro.RetroArch"
REMOTE_URL = "https://dl.flathub.org/repo/flathub.flatpakrepo"
REMOTE_NAME = "flathub"
RETROARCH_PAGE = "https://flathub.org/apps/org.libretro.RetroArch"
MEMBER = "sameboy_libretro.so"
URL = f"https://buildbot.libretro.com/nightly/linux/x86_64/latest/{MEMBER}.zip"
CORE_PAGE = "https://github.com/libretro/SameBoy"
SIZE_MB = 1                             # for the question before downloading (the zip is about 0.1 MB)
RETROARCH_SIZE_MB = 420                 # the Flatpak, for the question before installing it
MAX_SIZE = 64 << 20                     # a core is a few MB; anything this big is not one
CHUNK = 1 << 20
TIMEOUT = 30
INFO = "core.json"

Progress = Callable[[int, int], None]                   # bytes so far, total (0 when unknown)
Download = Callable[[str, Path, Progress | None], None]
Run = Callable[[list[str]], tuple[int, str]]            # a command: its exit code and its output
Head = Callable[[str], dict[str, str]]                  # the headers an URL answers a HEAD request with


class EmulatorError(Exception):
    pass


def emulator_home() -> Path:
    return data_home() / APP_ID / "emulator"


def core_file(home: Path) -> Path:
    """The core the run wrapper hands to RetroArch."""
    return home / "core" / MEMBER


def _info(home: Path) -> dict:
    try:
        data = json.loads((home / "core" / INFO).read_text(encoding="utf-8"))
    except (OSError, ValueError):
        return {}
    return data if isinstance(data, dict) else {}


def installed_core(home: Path) -> str:
    """The build date of the installed core ("2026-10-21"), "" when none is."""
    if not core_file(home).is_file():
        return ""
    return str(_info(home).get("build") or "installed")


def run(command: list[str]) -> tuple[int, str]:
    try:
        done = subprocess.run(command, capture_output=True, text=True, timeout=3600, check=False)
    except (OSError, subprocess.SubprocessError) as error:
        return 127, str(error)
    return done.returncode, (done.stdout + done.stderr).strip()


def retroarch_version(runner: Run = run) -> str:
    """The version of the installed RetroArch Flatpak ("1.22.2"), "" when there is none (or no flatpak)."""
    code, output = runner(["flatpak", "info", FLATPAK_ID])
    if code != 0:
        return ""
    match = re.search(r"^\s*Version:\s*(\S+)", output, re.MULTILINE)
    return match.group(1) if match else "installed"


def install_retroarch(runner: Run = run) -> str:
    """Installs RetroArch from Flathub for the user (no root), adding Flathub for the user first when it is not
    there. Returns what was done; EmulatorError when a step fails."""
    for command in (["flatpak", "remote-add", "--user", "--if-not-exists", REMOTE_NAME, REMOTE_URL],
                    ["flatpak", "install", "--user", "--noninteractive", "-y", REMOTE_NAME, FLATPAK_ID]):
        code, output = runner(command)
        if code != 0:
            last = output.splitlines()[-1] if output else f"exit code {code}"
            raise EmulatorError(f"{' '.join(command[:3])} failed: {last}")
    version = retroarch_version(runner)
    if not version:
        raise EmulatorError("flatpak finished, but RetroArch is not there.")
    return f"RetroArch {version} is installed."


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


def head(url: str) -> dict[str, str]:
    request = urllib.request.Request(url, method="HEAD", headers={"User-Agent": f"{APP_ID}/{__version__}"})
    with urllib.request.urlopen(request, timeout=TIMEOUT) as response:
        return {key.lower(): value for key, value in response.headers.items()}


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as file:
        while chunk := file.read(CHUNK):
            digest.update(chunk)
    return digest.hexdigest()


def _is_core(data: bytes) -> bool:
    """An ELF shared library for x86-64 (the header: 64-bit, little-endian, type DYN, machine 0x3E)."""
    return (len(data) > 20 and data[:4] == b"\x7fELF" and data[4] == 2 and data[5] == 1
            and int.from_bytes(data[16:18], "little") == 3 and int.from_bytes(data[18:20], "little") == 0x3E)


def install_core(home: Path, fetch: Download = download, head_of: Head = head,
                 progress: Progress | None = None) -> str:
    """Downloads the newest core build, checks it and installs it. Returns what was done. Nothing changes when a
    step fails (EmulatorError)."""
    home.mkdir(parents=True, exist_ok=True)
    work = home / f".download-{os.getpid()}"
    shutil.rmtree(work, ignore_errors=True)
    work.mkdir()
    try:
        archive = work / "core.zip"
        try:
            fetch(URL, archive, progress)
        except urllib.error.HTTPError as error:
            raise EmulatorError(f"The libretro buildbot answered {error.code} for {MEMBER}.zip.") from error
        except (urllib.error.URLError, OSError) as error:
            raise EmulatorError(f"The download failed: {getattr(error, 'reason', error)}.") from error
        try:
            with zipfile.ZipFile(archive) as bundle:
                if bundle.namelist() != [MEMBER]:
                    raise EmulatorError(f"{MEMBER}.zip does not hold just {MEMBER}; nothing was installed.")
                member = bundle.getinfo(MEMBER)
                if member.file_size > MAX_SIZE:
                    raise EmulatorError(f"{MEMBER} is {member.file_size >> 20} MB, no core; nothing was installed.")
                data = bundle.read(member)
        except (zipfile.BadZipFile, ValueError) as error:
            raise EmulatorError(f"{MEMBER}.zip is not a zip file; nothing was installed.") from error
        if not _is_core(data):
            raise EmulatorError(f"{MEMBER} is not an x86-64 Linux library; nothing was installed.")
        try:
            headers = head_of(URL)
        except (urllib.error.URLError, OSError, ValueError):
            headers = {}
        year, month, day = member.date_time[:3]
        build = f"{year:04d}-{month:02d}-{day:02d}"
        staged = work / MEMBER
        staged.write_bytes(data)
        staged.chmod(0o755)
        (work / INFO).write_text(json.dumps({"build": build, "sha256": sha256(staged),
                                             "etag": headers.get("etag", ""),
                                             "modified": headers.get("last-modified", "")}), encoding="utf-8")
        target = home / "core"
        target.mkdir(exist_ok=True)
        staged.replace(target / MEMBER)
        (work / INFO).replace(target / INFO)
    finally:
        shutil.rmtree(work, ignore_errors=True)
    return f"The SameBoy core of {build} is installed."


def remove(home: Path) -> None:
    """The installed core goes; RetroArch (a Flatpak of its own) and its folder (settings, saves) stay."""
    shutil.rmtree(home, ignore_errors=True)


def newer_core(home: Path, head_of: Head = head) -> str | None:
    """The date of a newer core build ("2026-10-22") when the buildbot has one than what is installed, "a newer
    build" when it does not say when; "" when it has none or nothing is installed; None when the buildbot cannot be
    asked (nothing to say then)."""
    info = _info(home)
    if not core_file(home).is_file() or not (info.get("etag") or info.get("modified")):
        return ""
    try:
        headers = head_of(URL)
    except (urllib.error.URLError, OSError, ValueError):
        return None
    if headers.get("etag") and info.get("etag"):
        same = headers["etag"] == info["etag"]
    else:
        same = headers.get("last-modified", "") == info.get("modified", "")
    if same:
        return ""
    try:
        return parsedate_to_datetime(headers["last-modified"]).strftime("%Y-%m-%d")
    except (KeyError, TypeError, ValueError):
        return "a newer build"
