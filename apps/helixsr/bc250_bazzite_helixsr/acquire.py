# SPDX-License-Identifier: GPL-3.0-or-later
"""Getting HelixSR onto this PC and keeping it current.

* latest_release(): the newest GitHub release of HelixSR (and of this app), for the update check.
* parse_pins(): the exact URLs and SHA-256 sums that a HelixSR release's setup scripts pin for NVIDIA's DLSS DLL,
  Microsoft's DXC and the portable Python, so the app downloads what the script would download, in parallel.
* SetupWorker: downloads the release zip, the prerequisites it still needs, then runs helixsr-setup.sh --yes with
  its output streamed to the GUI. The network files it builds are NVIDIA's property and stay on this PC.

Nothing here is Qt except the thread wrappers at the bottom; the functions can be tested with file:// URLs."""

from __future__ import annotations

import hashlib
import json
import os
import re
import shutil
import subprocess
import sys
import tarfile
import time
import urllib.error
import urllib.request
import zipfile
from concurrent.futures import ThreadPoolExecutor
from dataclasses import dataclass, field
from pathlib import Path
from typing import Callable

from PyQt6.QtCore import QCoreApplication, QObject, QThread, pyqtSignal

from . import APP_ID, DATA_HOME, HELIXSR_RELEASES_URL, SUITE_URL, __version__
from .backend import HELIXSR_DLL, KERNELS, WEIGHTS, HelixError, file_digest

HELIXSR_API = "https://api.github.com/repos/lonewolf0622/HelixSR/releases/latest"
# Every suite app has its own tags in one repository, so /releases/latest would answer with whichever app released
# last: the release list is searched for this app's tag prefix instead.
APP_API = "https://api.github.com/repos/RobertoTorino/bc250-bazzite-suite/releases?per_page=100"
APP_TAG_PREFIX = "helixsr-v"
APP_RELEASES_URL = f"{SUITE_URL}/releases"
HELIXSR_DATA_DIR = DATA_HOME / "HelixSR"            # where helixsr-setup.sh keeps its Python and DXC
WORK_DIR = DATA_HOME / APP_ID / "work"              # downloaded releases live here until imported
SETUP_SCRIPT = "helixsr-setup.sh"
DLSS_DLL = "nvngx_dlss.dll"
TIMEOUT = 15
CHUNK = 1 << 18
_VERSION_RE = re.compile(r"(\d+)\.(\d+)\.(\d+)")
_USER_AGENT = f"{APP_ID}/{__version__}"


def version_tuple(version: str) -> tuple[int, ...]:
    match = _VERSION_RE.search(version or "")
    return tuple(int(p) for p in match.groups()) if match else ()


# ------------------------------------------------------------------------------------------ releases
@dataclass
class ReleaseInfo:
    version: str = ""               # "1.2.0", "" when unknown
    tag: str = ""
    url: str = ""                   # release page
    published: str = ""             # YYYY-MM-DD
    asset_name: str = ""            # the zip, when the release has exactly one
    asset_url: str = ""
    asset_size: int = 0
    error: str = ""


def _get_json(url: str, timeout: int = TIMEOUT) -> dict:
    request = urllib.request.Request(url, headers={"Accept": "application/vnd.github+json", "User-Agent": _USER_AGENT})
    with urllib.request.urlopen(request, timeout=timeout) as response:
        return json.load(response)


def latest_release(api_url: str, page_url: str, tag_prefix: str = "") -> ReleaseInfo:
    """The latest release of a GitHub repository; never raises, errors land in .error. With *tag_prefix*, *api_url*
    is the release list and the newest release whose tag starts with the prefix counts (drafts and pre-releases
    are skipped)."""
    try:
        data = _get_json(api_url)
        if tag_prefix:
            if not isinstance(data, list):
                raise ValueError("not a release list")
            candidates = [(version_tuple(str(item.get("tag_name", ""))[len(tag_prefix):]), item) for item in data
                          if str(item.get("tag_name", "")).startswith(tag_prefix)
                          and not item.get("draft") and not item.get("prerelease")]
            candidates = [(v, item) for v, item in candidates if v]
            if not candidates:
                return ReleaseInfo(url=page_url, error=QCoreApplication.translate(
                    "acquire", "no release tagged {0} yet").format(tag_prefix + "*"))
            data = max(candidates, key=lambda c: c[0])[1]
    except urllib.error.HTTPError as exc:
        return ReleaseInfo(url=page_url, error=QCoreApplication.translate("acquire", "GitHub answered {0}").format(exc.code))
    except (urllib.error.URLError, OSError, ValueError) as exc:
        reason = str(getattr(exc, "reason", exc)).split(":")[0].strip() or exc.__class__.__name__
        return ReleaseInfo(url=page_url, error=QCoreApplication.translate("acquire", "no connection ({0})").format(reason[:60]))
    tag = str(data.get("tag_name", ""))
    match = _VERSION_RE.search(tag)
    if not match:
        return ReleaseInfo(tag=tag, url=page_url, error=QCoreApplication.translate("acquire", "unexpected tag {0}").format(repr(tag)))
    info = ReleaseInfo(match.group(0), tag, str(data.get("html_url") or page_url),
                       str(data.get("published_at", ""))[:10])
    zips = [a for a in data.get("assets", []) if str(a.get("name", "")).lower().endswith(".zip")]
    if zips:
        info.asset_name, info.asset_url = str(zips[0]["name"]), str(zips[0]["browser_download_url"])
        info.asset_size = int(zips[0].get("size") or 0)
    return info


@dataclass
class UpdateStatus:
    """What the update check tells about one thing (HelixSR payload, this app)."""

    name: str
    installed: str                  # "" when nothing is installed
    latest: ReleaseInfo

    @property
    def update_available(self) -> bool:
        return bool(self.installed and self.latest.version) and \
            version_tuple(self.latest.version) > version_tuple(self.installed)

    @property
    def kind(self) -> str:
        if self.latest.error or not self.latest.version:
            return "neutral"
        if not self.installed:
            return "info"
        return "warn" if self.update_available else "ok"

    @property
    def summary(self) -> str:
        installed = self.installed or QCoreApplication.translate("acquire", "not installed")
        latest = self.latest
        if latest.error:
            return QCoreApplication.translate("acquire", "{0} (latest: unknown, {1})").format(installed, latest.error)
        if not latest.version:
            return QCoreApplication.translate("acquire", "{0} (latest: unknown)").format(installed)
        if self.update_available:
            return QCoreApplication.translate("acquire", "{0} → {1} available ({2})").format(installed, latest.version, latest.published)
        if self.installed:
            return QCoreApplication.translate("acquire", "{0} (up to date, released {1})").format(installed, latest.published)
        return QCoreApplication.translate("acquire", "{0}; latest release {1} ({2})").format(installed, latest.version, latest.published)


def check_updates(payload_version: str) -> dict[str, UpdateStatus]:
    return {
        "helixsr": UpdateStatus("HelixSR", payload_version, latest_release(HELIXSR_API, HELIXSR_RELEASES_URL)),
        "app": UpdateStatus("This app", __version__, latest_release(APP_API, APP_RELEASES_URL, APP_TAG_PREFIX)),
    }


# ---------------------------------------------------------------------------------------- downloads
Progress = Callable[[str, int, int], None]      # name, bytes done, bytes total (0 when unknown)
Cancelled = Callable[[], bool]


class Aborted(HelixError):
    pass


def download(url: str, dest: Path, sha256: str = "", progress: Progress | None = None,
             cancelled: Cancelled | None = None, name: str = "") -> Path:
    """Fetch url to dest (through a .part file), verify the SHA-256 when given. Raises HelixError."""
    name = name or dest.name
    dest.parent.mkdir(parents=True, exist_ok=True)
    part = dest.with_name(dest.name + ".part")
    request = urllib.request.Request(url, headers={"User-Agent": _USER_AGENT})
    digest = hashlib.sha256()
    done = 0
    try:
        with urllib.request.urlopen(request, timeout=TIMEOUT) as response, open(part, "wb") as out:
            total = int(response.headers.get("Content-Length") or 0)
            if progress:
                progress(name, 0, total)
            while True:
                if cancelled and cancelled():
                    raise Aborted("cancelled")
                chunk = response.read(CHUNK)
                if not chunk:
                    break
                out.write(chunk)
                digest.update(chunk)
                done += len(chunk)
                if progress:
                    progress(name, done, total)
    except Aborted:
        part.unlink(missing_ok=True)
        raise
    except urllib.error.HTTPError as exc:
        part.unlink(missing_ok=True)
        raise HelixError(QCoreApplication.translate("acquire", "{0}: server answered {1} for {2}").format(name, exc.code, url)) from exc
    except (urllib.error.URLError, OSError) as exc:
        part.unlink(missing_ok=True)
        raise HelixError(QCoreApplication.translate("acquire", "{0}: download failed ({1})").format(name, getattr(exc, "reason", exc))) from exc
    if sha256 and digest.hexdigest() != sha256.lower():
        part.unlink(missing_ok=True)
        raise HelixError(QCoreApplication.translate("acquire", "{0}: checksum mismatch, the download is not the file HelixSR expects. "
                                                   "Nothing was kept.").format(name))
    part.replace(dest)
    return dest


# ------------------------------------------------------------------------------------ pinned sources
@dataclass
class Pin:
    key: str                        # dlss | dxc | python
    url: str
    sha256: str
    label: str

    @property
    def filename(self) -> str:
        return urllib.request.unquote(self.url.rsplit("/", 1)[-1]) or self.key


_PIN_PATTERNS = {
    # key: (file in the release, url regex, sha regex, label)
    "dlss": ("setup/helixsr_setup.py", r"DLSS_URL\s*=\s*['\"]([^'\"]+)['\"]", r"DLSS_SHA256\s*=\s*['\"]([0-9a-fA-F]{64})['\"]",
             "NVIDIA DLSS DLL"),
    "dxc": (SETUP_SCRIPT, r"DXCWIN_URL=['\"]([^'\"]+)['\"]", r"DXCWIN_SHA=['\"]([0-9a-fA-F]{64})['\"]",
            "DirectX Shader Compiler"),
    "python": (SETUP_SCRIPT, r"PY_URL=['\"]([^'\"]+)['\"]", r"PY_SHA=['\"]([0-9a-fA-F]{64})['\"]", "portable Python"),
}


def parse_pins(release_dir: Path) -> dict[str, Pin]:
    """The downloads a release's setup scripts pin (URL + SHA-256). Missing ones are simply absent: the script
    then fetches them itself."""
    pins: dict[str, Pin] = {}
    for key, (rel, url_re, sha_re, label) in _PIN_PATTERNS.items():
        try:
            text = (release_dir / rel).read_text(encoding="utf-8", errors="replace")
        except OSError:
            continue
        url, sha = re.search(url_re, text), re.search(sha_re, text)
        if url and sha:
            pins[key] = Pin(key, url.group(1), sha.group(1).lower(), label)
    return pins


def find_release_dir(extracted: Path) -> Path:
    """The folder that holds helixsr-setup.sh (the zip extracts into HelixSR-x.y.z/)."""
    if (extracted / SETUP_SCRIPT).is_file():
        return extracted
    for child in sorted(p for p in extracted.iterdir() if p.is_dir()):
        if (child / SETUP_SCRIPT).is_file():
            return child
    raise HelixError(QCoreApplication.translate("acquire", "No {0} in {1}: not a HelixSR release.").format(SETUP_SCRIPT, extracted))


def extract_zip(archive: Path, dest: Path) -> Path:
    dest.mkdir(parents=True, exist_ok=True)
    with zipfile.ZipFile(archive) as zf:
        for member in zf.infolist():
            target = (dest / member.filename).resolve()
            if not str(target).startswith(str(dest.resolve())):
                raise HelixError(QCoreApplication.translate("acquire", "{0} contains an unsafe path: {1}").format(archive.name, member.filename))
        zf.extractall(dest)
    release_dir = find_release_dir(dest)
    script = release_dir / SETUP_SCRIPT
    script.chmod(script.stat().st_mode | 0o755)
    for sub in ("setup/lib/model/launch_synth",):
        binary = release_dir / sub
        if binary.is_file():
            binary.chmod(binary.stat().st_mode | 0o755)
    return release_dir


# --------------------------------------------------------------------------------- prerequisites
def dxc_present(helix_data: Path) -> bool:
    return (helix_data / "dxc-win" / "bin" / "x64" / "dxc.exe").is_file()


def portable_python_present(helix_data: Path) -> bool:
    return os.access(helix_data / "python" / "bin" / "python3", os.X_OK)


def system_python_has_numpy() -> bool:
    python = shutil.which("python3")
    if not python:
        return False
    try:
        return subprocess.run([python, "-c", "import numpy"], capture_output=True, timeout=20).returncode == 0
    except (OSError, subprocess.SubprocessError):
        return False


def unpack_dxc(archive: Path, helix_data: Path) -> None:
    """bin/x64/* of Microsoft's zip (which stores Windows paths) to <data>/dxc-win, as the script does."""
    with zipfile.ZipFile(archive) as zf:
        count = 0
        for name in zf.namelist():
            posix = name.replace("\\", "/")
            if posix.startswith("bin/x64/") and not posix.endswith("/"):
                target = helix_data / "dxc-win" / posix
                target.parent.mkdir(parents=True, exist_ok=True)
                target.write_bytes(zf.read(name))
                count += 1
    if not count:
        raise HelixError(QCoreApplication.translate("acquire", "the shader compiler archive has no bin/x64 folder"))


def unpack_python(archive: Path, helix_data: Path) -> None:
    """python-build-standalone's install_only tarball extracts to python/; the script expects <data>/python."""
    helix_data.mkdir(parents=True, exist_ok=True)
    with tarfile.open(archive) as tar:
        for member in tar.getmembers():
            if member.name.startswith("/") or ".." in Path(member.name).parts:
                raise HelixError(QCoreApplication.translate("acquire", "unsafe path in {0}: {1}").format(archive.name, member.name))
        kwargs = {"filter": "data"} if sys.version_info >= (3, 12) else {}
        tar.extractall(helix_data, **kwargs)
    if not portable_python_present(helix_data):
        raise HelixError(QCoreApplication.translate("acquire", "the portable Python archive did not produce python/bin/python3"))


def needed_pins(pins: dict[str, Pin], helix_data: Path, dlss_file: Path | None, immutable: bool) -> list[Pin]:
    """Which of the pinned downloads the setup would still fetch on this PC."""
    needed = []
    if "dlss" in pins and dlss_file is None:
        needed.append(pins["dlss"])
    if "dxc" in pins and not dxc_present(helix_data):
        needed.append(pins["dxc"])
    if "python" in pins and not portable_python_present(helix_data):
        # On a mutable distro the script offers the package manager first; the portable Python is the fallback
        # it uses on Bazzite/SteamOS (and when the system Python has no numpy).
        if immutable or not system_python_has_numpy():
            needed.append(pins["python"])
    return needed


def is_immutable_system() -> bool:
    if Path("/run/ostree-booted").exists():
        return True
    try:
        return "ID=steamos" in Path("/etc/os-release").read_text(encoding="utf-8", errors="replace")
    except OSError:
        return False


def find_dlss_dlls(libraries: list[Path], sha256: str, max_depth: int = 8,
                   cancelled: Cancelled | None = None) -> list[Path]:
    """nvngx_dlss.dll files in the Steam libraries whose checksum is the one HelixSR pins (only those are
    accepted by the setup without a download)."""
    hits: list[Path] = []
    for library in libraries:
        common = library / "common"
        base_depth = len(common.parts)
        for root, dirs, files in os.walk(common):
            if cancelled and cancelled():
                return hits
            if len(Path(root).parts) - base_depth >= max_depth:
                dirs[:] = []
            for file in files:
                if file.lower() == DLSS_DLL:
                    path = Path(root) / file
                    try:
                        if file_digest(path) == sha256:
                            hits.append(path)
                    except OSError:
                        pass
    return hits


# ------------------------------------------------------------------------------------ the whole run
@dataclass
class SetupRequest:
    release: ReleaseInfo | None = None          # None: look up the latest
    work_dir: Path = WORK_DIR
    helix_data: Path = HELIXSR_DATA_DIR
    dlss_file: Path | None = None               # a local nvngx_dlss.dll instead of the download
    extra_args: list[str] = field(default_factory=list)
    script_env: dict[str, str] = field(default_factory=dict)


@dataclass
class SetupOutcome:
    ok: bool
    release_dir: Path | None
    version: str
    message: str
    seconds: float


class SetupWorker(QThread):
    """Runs the whole acquisition off the GUI thread. Signals arrive on the GUI thread."""

    log = pyqtSignal(str)
    progress = pyqtSignal(str, int, int)        # name, done, total
    stage = pyqtSignal(str)
    finished_with = pyqtSignal(object)          # SetupOutcome

    def __init__(self, request: SetupRequest, parent: QObject | None = None):
        super().__init__(parent)
        self.request = request
        self._cancel = False
        self._process: subprocess.Popen | None = None

    def cancel(self) -> None:
        self._cancel = True
        process = self._process
        if process is not None and process.poll() is None:
            process.terminate()

    def _cancelled(self) -> bool:
        return self._cancel

    def _say(self, text: str) -> None:
        self.log.emit(text)

    def run(self) -> None:
        started = time.monotonic()
        try:
            release_dir, version = self._run()
        except Aborted:
            self.finished_with.emit(SetupOutcome(False, None, "", QCoreApplication.translate("acquire", "Cancelled."), time.monotonic() - started))
        except (HelixError, OSError) as exc:
            self.finished_with.emit(SetupOutcome(False, None, "", str(exc), time.monotonic() - started))
        else:
            self.finished_with.emit(SetupOutcome(True, release_dir, version,
                                                 QCoreApplication.translate("acquire", "HelixSR {0} is built in {1}").format(version, release_dir),
                                                 time.monotonic() - started))

    def _run(self) -> tuple[Path, str]:
        req = self.request
        release = req.release or latest_release(HELIXSR_API, HELIXSR_RELEASES_URL)
        if release.error:
            raise HelixError(QCoreApplication.translate("acquire", "Could not look up the latest HelixSR release: {0}").format(release.error))
        if not release.asset_url:
            raise HelixError(QCoreApplication.translate("acquire", "HelixSR {0} has no zip to download; see {1}").format(release.version, release.url))
        req.work_dir.mkdir(parents=True, exist_ok=True)

        self.stage.emit(QCoreApplication.translate("acquire", "Downloading HelixSR {0}").format(release.version))
        archive = req.work_dir / release.asset_name
        if archive.is_file() and (not release.asset_size or archive.stat().st_size == release.asset_size):
            self._say(QCoreApplication.translate("acquire", "Using the already downloaded {0}").format(archive.name))
        else:
            self._say(QCoreApplication.translate("acquire", "Downloading {0}").format(release.asset_url))
            download(release.asset_url, archive, progress=self.progress.emit, cancelled=self._cancelled,
                     name=release.asset_name)
        extracted = req.work_dir / f"HelixSR-{release.version}"
        if extracted.exists():
            shutil.rmtree(extracted)
        release_dir = extract_zip(archive, extracted)
        self._say(QCoreApplication.translate("acquire", "Extracted to {0}").format(release_dir))
        if not (release_dir / HELIXSR_DLL).is_file():
            raise HelixError(QCoreApplication.translate("acquire", "The release has no {0}.").format(HELIXSR_DLL))

        pins = parse_pins(release_dir)
        needed = needed_pins(pins, req.helix_data, req.dlss_file, is_immutable_system())
        unparsed = [k for k in ("dlss", "dxc", "python") if k not in pins]
        if unparsed:
            self._say(QCoreApplication.translate("acquire", "Could not read the pinned source(s) for {0} from the setup scripts; "
                                                 "the script will download them itself.").format(", ".join(unparsed)))
        downloads: dict[str, Path] = {}
        if needed:
            self.stage.emit(QCoreApplication.translate("acquire", "Downloading {0} in parallel").format(", ".join(p.label for p in needed)))
            for pin in needed:
                self._say(f"{pin.label}: {pin.url}")
            with ThreadPoolExecutor(max_workers=len(needed)) as pool:
                futures = {pin.key: pool.submit(download, pin.url, req.work_dir / pin.filename, pin.sha256,
                                                self.progress.emit, self._cancelled, pin.label) for pin in needed}
                errors = []
                for key, future in futures.items():
                    try:
                        downloads[key] = future.result()
                    except Aborted:
                        raise
                    except HelixError as exc:
                        errors.append(str(exc))
            if errors:
                raise HelixError("\n".join(errors))
            if "dxc" in downloads:
                unpack_dxc(downloads["dxc"], req.helix_data)
                downloads["dxc"].unlink(missing_ok=True)
                self._say(QCoreApplication.translate("acquire", "Shader compiler unpacked to {0}").format(req.helix_data / "dxc-win"))
            if "python" in downloads:
                unpack_python(downloads["python"], req.helix_data)
                downloads["python"].unlink(missing_ok=True)
                self._say(QCoreApplication.translate("acquire", "Portable Python unpacked to {0}").format(req.helix_data / "python"))
        if self._cancelled():
            raise Aborted("cancelled")

        dlss = req.dlss_file or downloads.get("dlss")
        command = ["bash", str(release_dir / SETUP_SCRIPT), "--yes", *req.extra_args]
        if dlss is not None:
            command += ["--dlss", str(dlss)]
        self.stage.emit(QCoreApplication.translate("acquire", "Building the network files (about 5-6 minutes on a BC-250)"))
        self._say("$ " + " ".join(command))
        env = {**os.environ, **req.script_env}
        env.setdefault("XDG_DATA_HOME", str(req.helix_data.parent))
        try:
            self._process = subprocess.Popen(command, cwd=release_dir, stdout=subprocess.PIPE, stderr=subprocess.STDOUT,
                                             text=True, errors="replace", bufsize=1, env=env)
        except OSError as exc:
            raise HelixError(QCoreApplication.translate("acquire", "Could not start {0}: {1}").format(SETUP_SCRIPT, exc)) from exc
        assert self._process.stdout is not None
        for line in self._process.stdout:
            self._say(line.rstrip("\n"))
        code = self._process.wait()
        self._process = None
        if "dlss" in downloads:
            downloads["dlss"].unlink(missing_ok=True)         # NVIDIA's DLL is used once and deleted
            self._say(QCoreApplication.translate("acquire", "Deleted the downloaded {0}").format(DLSS_DLL))
        if self._cancelled():
            raise Aborted("cancelled")
        if code != 0:
            raise HelixError(QCoreApplication.translate("acquire", "{0} exited with code {1}; see the output above.").format(SETUP_SCRIPT, code))
        missing = [n for n in (WEIGHTS, KERNELS) if not (release_dir / n).is_file()]
        if missing:
            raise HelixError(QCoreApplication.translate("acquire", "The setup finished but did not produce {0}").format(", ".join(missing)))
        return release_dir, release.version


class UpdateChecker(QObject):
    """check_updates() off the GUI thread; finished(dict[str, UpdateStatus]) on the GUI thread."""

    finished = pyqtSignal(object)

    def __init__(self, parent: QObject | None = None):
        super().__init__(parent)
        self._thread: _UpdateThread | None = None

    @property
    def running(self) -> bool:
        return self._thread is not None

    def start(self, payload_version: str) -> bool:
        if self._thread is not None:
            return False
        self._thread = _UpdateThread(payload_version)
        self._thread.result.connect(self._done)
        self._thread.start()
        return True

    def _done(self, result: dict) -> None:
        thread, self._thread = self._thread, None
        if thread is not None:
            thread.wait()
            thread.deleteLater()
        self.finished.emit(result)

    def stop(self) -> None:
        if self._thread is not None:
            self._thread.wait(TIMEOUT * 2000 + 1000)
            self._thread = None


class _UpdateThread(QThread):
    result = pyqtSignal(object)

    def __init__(self, payload_version: str):
        super().__init__()
        self.payload_version = payload_version

    def run(self) -> None:
        self.result.emit(check_updates(self.payload_version))


class DlssFinder(QThread):
    """Scans the Steam libraries for a DLSS DLL with the pinned checksum."""

    found = pyqtSignal(object)      # list[Path]

    def __init__(self, libraries: list[Path], sha256: str, parent: QObject | None = None):
        super().__init__(parent)
        self.libraries, self.sha256 = libraries, sha256
        self._cancel = False

    def cancel(self) -> None:
        self._cancel = True

    def run(self) -> None:
        self.found.emit(find_dlss_dlls(self.libraries, self.sha256, cancelled=lambda: self._cancel))


def pinned_dlss_sha(release_dir: Path | None) -> str:
    """The DLSS checksum from an extracted release, or the one HelixSR 1.2.0 pins when none is at hand."""
    if release_dir is not None:
        pin = parse_pins(release_dir).get("dlss")
        if pin:
            return pin.sha256
    return "be6e434a94ca32499515eb62ca0e6c274526055d568d0426e4c652dcdfb6ee6e"


def latest_work_release(work_dir: Path = WORK_DIR) -> Path | None:
    """The newest extracted release in the work folder, if any."""
    found: list[tuple[tuple[int, ...], Path]] = []
    try:
        for child in work_dir.iterdir():
            if child.is_dir():
                try:
                    found.append((version_tuple(child.name), find_release_dir(child)))
                except (HelixError, OSError):
                    pass
    except OSError:
        return None
    return max(found, default=(None, None))[1]
