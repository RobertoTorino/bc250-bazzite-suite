# SPDX-License-Identifier: GPL-3.0-or-later
"""Where an app's installer comes from, and what the portal remembers about it.

* Release (an installed portal): <tag>.tar.gz from the suite's GitHub release, checked against the sha256 pinned in
  apps.toml (or, when none is pinned yet, the release's SHA256SUMS) and unpacked without ever writing outside the
  target folder.
* Checkout (development): the app staged from the local suite repo with tools/stage_app.py, exactly as the release
  workflow builds it, so the portal can be tried before anything is released.

The extracted folder is kept under the portal's state dir, so the matching uninstaller is at hand later.
Nothing here is Qt: the GUI runs prepare() in a worker thread."""

from __future__ import annotations

import hashlib
import importlib.util
import json
import shutil
import tarfile
import urllib.request
from collections.abc import Callable
from dataclasses import dataclass
from pathlib import Path

from bc250_core.appinfo import SUITE_REPO_URL
from bc250_core.platform import expand

from .manifest import AppEntry

Download = Callable[[str, Path], None]          # url, destination file
TIMEOUT = 30


class SourceError(RuntimeError):
    pass


def http_download(user_agent: str) -> Download:
    def download(url: str, dest: Path) -> None:
        request = urllib.request.Request(url, headers={"User-Agent": user_agent})
        with urllib.request.urlopen(request, timeout=TIMEOUT) as response, dest.open("wb") as out:
            shutil.copyfileobj(response, out)
    return download


def sha256_of(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as fh:
        for chunk in iter(lambda: fh.read(1 << 18), b""):
            digest.update(chunk)
    return digest.hexdigest()


def expected_sha256(sums_text: str, asset: str) -> str:
    """The checksum of *asset* in a `sha256sum` style SHA256SUMS file; "" when it is not listed."""
    for line in sums_text.splitlines():
        parts = line.split()
        if len(parts) == 2 and parts[1].lstrip("*") == asset:
            return parts[0].lower()
    return ""


def safe_extract(archive: Path, dest: Path) -> None:
    """Unpack a release tarball into *dest*. Absolute paths, '..', links pointing outside and device files are
    refused: the archive comes from the network and is unpacked as the user."""
    dest = dest.resolve()
    with tarfile.open(archive, "r:gz") as tar:
        for member in tar.getmembers():
            target = (dest / member.name).resolve()
            if dest != target and dest not in target.parents:
                raise SourceError(f"{archive.name}: {member.name} points outside the folder")
            if member.issym() or member.islnk():
                link = (target.parent / member.linkname).resolve()
                if dest != link and dest not in link.parents:
                    raise SourceError(f"{archive.name}: link {member.name} points outside the folder")
            elif not (member.isfile() or member.isdir()):
                raise SourceError(f"{archive.name}: {member.name} is not a file or folder")
        # The "data" filter (Python 3.12+, backported to 3.11.4) also drops setuid bits and odd permissions.
        tar.extractall(dest, **({"filter": "data"} if hasattr(tarfile, "data_filter") else {}))


@dataclass
class Sources:
    """Prepares the folder an app's install/uninstall commands run in."""

    work: Path                                  # <state dir>/releases
    checkout: Path | None = None                # the suite repo, in development
    repo_url: str = SUITE_REPO_URL
    download: Download | None = None

    @property
    def local(self) -> bool:
        return self.checkout is not None

    def folder(self, entry: AppEntry) -> Path:
        return self.work / ("local-" + entry.key if self.local else entry.tag)

    def prepare(self, entry: AppEntry) -> Path:
        """The folder with the app's installer, fetched or staged when needed. A checkout is staged afresh every
        time (it may have changed); a release folder is reused, since a tag never changes."""
        folder = self.folder(entry)
        if self.local:
            if folder.exists():
                shutil.rmtree(folder)
            self.work.mkdir(parents=True, exist_ok=True)
            _stage_module(self.checkout).stage(entry.key, folder, self.checkout)
            return folder
        if (folder / ".complete").is_file():
            return folder
        return self._fetch(entry, folder)

    def _fetch(self, entry: AppEntry, folder: Path) -> Path:
        if self.download is None:
            raise SourceError("no download function configured")
        base = f"{self.repo_url}/releases/download/{entry.tag}"
        tmp = self.work / f".{entry.tag}.part"
        if tmp.exists():
            shutil.rmtree(tmp)
        tmp.mkdir(parents=True)
        try:
            archive = tmp / entry.asset
            try:
                self.download(f"{base}/{entry.asset}", archive)
            except OSError as exc:
                raise SourceError(f"could not download {entry.asset}: {exc}") from exc
            want = entry.sha256
            if not want:
                sums = tmp / "SHA256SUMS"
                try:
                    self.download(f"{base}/SHA256SUMS", sums)
                except OSError as exc:
                    raise SourceError(f"could not download SHA256SUMS of {entry.tag}: {exc}") from exc
                want = expected_sha256(sums.read_text(encoding="utf-8", errors="replace"), entry.asset)
                if not want:
                    raise SourceError(f"SHA256SUMS of {entry.tag} does not list {entry.asset}")
            got = sha256_of(archive)
            if got != want:
                raise SourceError(f"{entry.asset} does not match its checksum (got {got[:16]}…, expected "
                                  f"{want[:16]}…): not installed")
            unpacked = tmp / "x"
            safe_extract(archive, unpacked)
            inner = unpacked / entry.tag
            if not inner.is_dir():
                raise SourceError(f"{entry.asset} has no {entry.tag}/ folder")
            if folder.exists():
                shutil.rmtree(folder)
            inner.rename(folder)
            (folder / ".complete").write_text(got + "\n", encoding="utf-8")
            return folder
        finally:
            shutil.rmtree(tmp, ignore_errors=True)

    def forget(self, entry: AppEntry) -> None:
        shutil.rmtree(self.folder(entry), ignore_errors=True)


def _stage_module(checkout: Path):
    path = checkout / "tools" / "stage_app.py"
    spec = importlib.util.spec_from_file_location("bc250_stage_app", path)
    if spec is None or spec.loader is None:
        raise SourceError(f"cannot load {path}")
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def is_installed(entry: AppEntry) -> bool:
    return any(expand(path).exists() for path in entry.detect)


class Records:
    """installed.json: which tag (or "local") of each app the portal installed. Apps installed some other way are
    still detected through apps.toml's detect paths; they just have no known tag."""

    def __init__(self, path: Path):
        self.path = path
        try:
            data = json.loads(path.read_text(encoding="utf-8"))
            self._data = {str(k): str(v) for k, v in data.items()} if isinstance(data, dict) else {}
        except (OSError, ValueError):
            self._data = {}

    def get(self, key: str) -> str:
        return self._data.get(key, "")

    def set(self, key: str, tag: str) -> None:
        self._data[key] = tag
        self._save()

    def remove(self, key: str) -> None:
        if self._data.pop(key, None) is not None:
            self._save()

    def _save(self) -> None:
        self.path.parent.mkdir(parents=True, exist_ok=True)
        tmp = self.path.with_suffix(".tmp")
        tmp.write_text(json.dumps(self._data, indent=2, sort_keys=True) + "\n", encoding="utf-8")
        tmp.replace(self.path)
