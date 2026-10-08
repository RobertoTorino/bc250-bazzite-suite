# SPDX-License-Identifier: GPL-3.0-or-later
"""Everything that touches files, without Qt: the imported HelixSR payload, finding a game's FSR 3.1 DLL,
the DLL swap (deploy / remove), the stand-alone folder for OptiScaler, a comment-keeping helixsr.ini editor,
the list of known deployments and the Steam libraries of the user.

HelixSR (github.com/lonewolf0622/HelixSR) is a drop-in replacement for a game's AMD FidelityFX upscaler DLL:
the game's amd_fidelityfx_upscaler_dx12.dll (or amd_fidelityfx_dx12.dll) is renamed to *.original.dll and
HelixSR's amd_fidelityfx_dx12.dll is copied in under the original name, together with the two network files the
one-time helixsr-setup builds on the PC (helixsr_weights.bin, helixsr_kernels.pak) and an optional helixsr.ini.
No launch options are needed."""

from __future__ import annotations

import hashlib
import json
import os
import re
import shutil
import zipfile
from dataclasses import asdict, dataclass, field, fields
from datetime import datetime
from pathlib import Path

from PyQt6.QtCore import QCoreApplication

HELIXSR_DLL = "amd_fidelityfx_dx12.dll"
UPSCALER_DLL = "amd_fidelityfx_upscaler_dx12.dll"
GAME_DLLS = (UPSCALER_DLL, HELIXSR_DLL)             # what a game ships, and what HelixSR replaces
WEIGHTS = "helixsr_weights.bin"
KERNELS = "helixsr_kernels.pak"
NETWORK_FILES = (WEIGHTS, KERNELS)                  # built by helixsr-setup.sh, NVIDIA's property: never shipped
INI = "helixsr.ini"
LOG = "helixsr.log"
ORIGINAL_SUFFIX = ".original.dll"
PAYLOAD_DOCS = ("README.md", "LICENSE", "LICENSE-APACHE-2.0", "THIRD_PARTY_NOTICES.md", "SOURCE.md")
PAYLOAD_FILES = (HELIXSR_DLL, WEIGHTS, KERNELS, INI, *PAYLOAD_DOCS)
ESSENTIAL_FILES = (HELIXSR_DLL, WEIGHTS, KERNELS)
MAX_SCAN_DEPTH = 12
MODE_REPLACE, MODE_FOLDER = "replace", "folder"

SHARPENING_MODES = ("off", "game", "override")
NETWORKS = ("auto", "nvidia", "main", "ultraperformance")

# The helixsr.ini HelixSR 1.2.0 ships; used as the template when the payload has none.
DEFAULT_INI_TEXT = """\
; helixsr.ini - optional, next to the upscaler DLL. Every key has a default.

[Sharpening]
; game     = use the game's FSR sharpening setting; if the game sends none, use Sharpness below
; override = always use Sharpness below
; off      = never sharpen (default: DLSS's network does not sharpen)
Mode = off
; 0.0 - 1.0 (FidelityFX scale: 0 = none, 1 = strongest RCAS)
Sharpness = 0.3
; Less sharpening on fast-moving pixels (uses the game's motion vectors)
MotionAdaptive = true
; Motion in output pixels per frame where the reduction starts / is complete
MotionThreshold = 2
MotionLimit = 16
; Fraction of sharpening removed at and above MotionLimit (0 - 1)
MotionReduction = 0.6

[ModelE]
; Run the Model E network. While kernels are missing the placeholder upscale is used (see the log).
Enabled = true
; auto = the main network at every scale ratio (faster than the Ultra Performance network on GPUs without matrix
;        cores, same look in our tests); nvidia = as NVIDIA's DLSS (Ultra Performance network above a 2.5 ratio);
; or main / ultraperformance
Network = auto
; Sign conventions, if a game's jitter or motion vectors come out mirrored
InvertJitter = false
InvertMotionVectors = false
; Render-resolution motion vectors: false = NVIDIA's own render-resolution input path (default, fastest);
; true = convert them to display resolution first (used anyway when the game's vectors include the jitter)
MotionVectorFrontEnd = false

[Log]
; helixsr.log next to the DLL
Enabled = true

[Forwarding]
; DLL that serves FidelityFX effects other than upscaling (frame generation, ...).
; Default: amd_fidelityfx_dx12.original.dll if present, else amd_fidelityfx_framegeneration_dx12.dll.
Dll =
; Optional: another FidelityFX upscaler DLL (e.g. AMD's amd_fidelityfx_upscaler_dx12.dll with FSR 4). Its upscalers
; are listed after HelixSR (OptiScaler: "FFX Upscaler" menu), and the one you pick runs in that DLL.
; A name without a folder is looked up next to HelixSR. Empty (default): HelixSR only.
UpscalerDll =
"""


class HelixError(Exception):
    """A payload or deployment problem the user can act on; the message is shown as is."""


# ---------------------------------------------------------------------------------------------- files
def file_digest(path: Path) -> str:
    digest = hashlib.sha256()
    with open(path, "rb") as handle:
        for chunk in iter(lambda: handle.read(1 << 20), b""):
            digest.update(chunk)
    return digest.hexdigest()


def same_file(a: Path, b: Path) -> bool:
    try:
        if a.stat().st_size != b.stat().st_size:
            return False
        return file_digest(a) == file_digest(b)
    except OSError:
        return False


def original_path(dll: Path) -> Path:
    """amd_fidelityfx_upscaler_dx12.dll -> amd_fidelityfx_upscaler_dx12.original.dll (the game's own file)."""
    return dll.with_name(dll.name[:-len(".dll")] + ORIGINAL_SUFFIX)


def to_windows_path(path: Path) -> str:
    """How Proton sees a Linux path: Z: is the Linux root."""
    return "Z:" + str(path.resolve()).replace("/", "\\")


# -------------------------------------------------------------------------------------------- payload
@dataclass
class PayloadStatus:
    path: Path
    dll: bool
    weights: bool
    kernels: bool
    ini: bool
    version: str = ""           # from the README.md that comes with the release, "" when unknown

    @property
    def ready(self) -> bool:
        return self.dll and self.weights and self.kernels

    @property
    def network_ready(self) -> bool:
        return self.weights and self.kernels

    def missing(self) -> list[str]:
        return [name for name, have in ((HELIXSR_DLL, self.dll), (WEIGHTS, self.weights), (KERNELS, self.kernels))
                if not have]


def payload_version(payload_dir: Path) -> str:
    readme = payload_dir / "README.md"
    try:
        match = re.search(r"\*\*Version (\d+(?:\.\d+)+)", readme.read_text(encoding="utf-8", errors="replace"))
    except OSError:
        return ""
    return match.group(1) if match else ""


def payload_status(payload_dir: Path) -> PayloadStatus:
    have = lambda name: (payload_dir / name).is_file()
    return PayloadStatus(payload_dir, have(HELIXSR_DLL), have(WEIGHTS), have(KERNELS), have(INI),
                         payload_version(payload_dir))


@dataclass
class ImportResult:
    copied: list[str]
    missing: list[str]          # essential files the source did not have


def _find_payload_files(source: Path, max_depth: int = 3) -> dict[str, Path]:
    """The known HelixSR files under source, shallowest match wins (the release zip extracts into one folder,
    the network files appear next to the DLL after the setup)."""
    wanted = {name.lower(): name for name in PAYLOAD_FILES}
    found: dict[str, Path] = {}
    base_depth = len(source.parts)
    for root, dirs, files in os.walk(source):
        depth = len(Path(root).parts) - base_depth
        if depth >= max_depth:
            dirs[:] = []
        dirs.sort()
        for file in files:
            name = wanted.get(file.lower())
            if name and name not in found:
                found[name] = Path(root) / file
    return found


def import_payload(source: Path, payload_dir: Path) -> ImportResult:
    """Copy the HelixSR files from an extracted release folder (or the release zip) into the payload folder.
    Only the known files are taken, nothing else; existing payload files are replaced."""
    if not source.exists():
        raise HelixError(QCoreApplication.translate("backend", "{0} does not exist.").format(source))
    payload_dir.mkdir(parents=True, exist_ok=True)
    copied: list[str] = []
    if source.is_file():
        if not zipfile.is_zipfile(source):
            raise HelixError(QCoreApplication.translate("backend", "{0} is not a zip archive or a folder.")
                             .format(source.name))
        wanted = {name.lower(): name for name in PAYLOAD_FILES}
        with zipfile.ZipFile(source) as archive:
            for member in sorted(archive.infolist(), key=lambda m: m.filename.count("/")):
                name = wanted.get(Path(member.filename).name.lower())
                if member.is_dir() or not name or name in copied:
                    continue
                with archive.open(member) as src, open(payload_dir / name, "wb") as dst:
                    shutil.copyfileobj(src, dst)
                copied.append(name)
    else:
        for name, path in _find_payload_files(source).items():
            shutil.copy2(path, payload_dir / name)
            copied.append(name)
    if HELIXSR_DLL not in copied:
        raise HelixError(QCoreApplication.translate(
            "backend", "No {0} found in {1}. Pick the folder the HelixSR release was extracted to (or the release "
                       "zip itself).").format(HELIXSR_DLL, source))
    missing = [name for name in ESSENTIAL_FILES if name not in copied and not (payload_dir / name).is_file()]
    return ImportResult(copied, missing)


# ------------------------------------------------------------------------------------- game discovery
@dataclass
class GameDll:
    """One FSR 3.1 upscaler DLL found in a game folder, with what is next to it."""

    path: Path
    has_backup: bool            # *.original.dll exists: HelixSR (some build) replaced the game's file
    matches_payload: bool       # the file is byte-identical to the payload's DLL
    network_files: bool         # weights and kernels next to it
    ini: bool

    @property
    def original(self) -> Path:
        return original_path(self.path)

    @property
    def deployed(self) -> bool:
        return self.has_backup or self.matches_payload

    @property
    def state(self) -> str:
        if self.has_backup and self.matches_payload:
            return QCoreApplication.translate("backend", "HelixSR deployed")
        if self.has_backup:
            return QCoreApplication.translate("backend", "HelixSR deployed (other build)")
        if self.matches_payload:
            return QCoreApplication.translate("backend", "HelixSR (no original kept)")
        return QCoreApplication.translate("backend", "Game's own DLL")


def inspect_dll(path: Path, payload_dir: Path) -> GameDll:
    folder = path.parent
    payload_dll = payload_dir / HELIXSR_DLL
    return GameDll(path, original_path(path).is_file(),
                   payload_dll.is_file() and same_file(path, payload_dll),
                   all((folder / name).is_file() for name in NETWORK_FILES), (folder / INI).is_file())


def find_game_dlls(game_dir: Path, payload_dir: Path, max_depth: int = MAX_SCAN_DEPTH) -> list[GameDll]:
    """Every amd_fidelityfx_upscaler_dx12.dll / amd_fidelityfx_dx12.dll under the game folder (Unreal games keep
    it under Engine/Plugins/.../ThirdParty/Win64), shallowest first. *.original.dll backups are not listed."""
    names = {name.lower() for name in GAME_DLLS}
    found: list[Path] = []
    base_depth = len(game_dir.parts)
    for root, dirs, files in os.walk(game_dir):
        depth = len(Path(root).parts) - base_depth
        if depth >= max_depth:
            dirs[:] = []
        dirs.sort()
        for file in files:
            if file.lower() in names:
                found.append(Path(root) / file)
    found.sort(key=lambda p: (len(p.parts), str(p).lower()))
    return [inspect_dll(path, payload_dir) for path in found]


# ------------------------------------------------------------------------------------- deploy / remove
def _require_ready(payload_dir: Path) -> PayloadStatus:
    status = payload_status(payload_dir)
    if not status.ready:
        raise HelixError(QCoreApplication.translate(
            "backend", "The payload is incomplete, missing: {0}. Import the extracted HelixSR release after running "
                       "its helixsr-setup.sh.").format(", ".join(status.missing())))
    return status


def _copy_support_files(folder: Path, payload_dir: Path, ini_text: str | None) -> list[Path]:
    written = []
    for name in NETWORK_FILES:
        shutil.copy2(payload_dir / name, folder / name)
        written.append(folder / name)
    if ini_text is not None:
        (folder / INI).write_text(ini_text, encoding="utf-8")
        written.append(folder / INI)
    elif (payload_dir / INI).is_file():
        shutil.copy2(payload_dir / INI, folder / INI)
        written.append(folder / INI)
    return written


def deploy(target: Path, payload_dir: Path, ini_text: str | None = None) -> list[Path]:
    """Replace the game's upscaler DLL at `target` with HelixSR. The game's file is kept as *.original.dll (an
    existing backup is never overwritten, so re-deploying a newer HelixSR build keeps the real original).
    Returns the files written."""
    _require_ready(payload_dir)
    if target.name.lower() not in {n.lower() for n in GAME_DLLS}:
        raise HelixError(QCoreApplication.translate("backend", "{0} is not an FSR 3.1 upscaler DLL ({1}).")
                         .format(target.name, " / ".join(GAME_DLLS)))
    if not target.is_file():
        raise HelixError(QCoreApplication.translate("backend", "{0} does not exist.").format(target))
    backup = original_path(target)
    if not backup.exists():
        target.rename(backup)
    shutil.copy2(payload_dir / HELIXSR_DLL, target)
    return [target, *_copy_support_files(target.parent, payload_dir, ini_text)]


def remove(target: Path, payload_dir: Path) -> list[Path]:
    """Undo deploy(): delete HelixSR's files next to `target` and rename *.original.dll back. Refuses when
    `target` is neither a known HelixSR build (no backup) nor identical to the payload DLL."""
    backup = original_path(target)
    payload_dll = payload_dir / HELIXSR_DLL
    if not backup.exists() and not (payload_dll.is_file() and target.is_file() and same_file(target, payload_dll)):
        raise HelixError(QCoreApplication.translate(
            "backend", "{0} is not HelixSR (no {1} next to it and it differs from the payload). Nothing was changed.")
            .format(target.name, backup.name))
    removed = []
    for name in (*NETWORK_FILES, INI, LOG):
        path = target.parent / name
        if path.exists():
            path.unlink()
            removed.append(path)
    if target.exists():
        target.unlink()
        removed.append(target)
    if backup.exists():
        backup.rename(target)
    return removed


def deploy_folder(folder: Path, payload_dir: Path, ini_text: str | None = None) -> list[Path]:
    """Stand-alone HelixSR folder for OptiScaler: the DLL under both FidelityFX names (OptiScaler reads
    FfxDx12Path and FfxDx12SRPath), the network files and the ini."""
    _require_ready(payload_dir)
    folder.mkdir(parents=True, exist_ok=True)
    written = []
    for name in GAME_DLLS:
        shutil.copy2(payload_dir / HELIXSR_DLL, folder / name)
        written.append(folder / name)
    return [*written, *_copy_support_files(folder, payload_dir, ini_text)]


def remove_folder(folder: Path, payload_dir: Path) -> list[Path]:
    """Delete the files deploy_folder() wrote (only those) and the folder when it is empty afterwards."""
    payload_dll = payload_dir / HELIXSR_DLL
    for name in GAME_DLLS:
        dll = folder / name
        if dll.is_file() and original_path(dll).exists():
            raise HelixError(QCoreApplication.translate(
                "backend", "{0} holds a game's own {1} (there is a {2}): this is a replaced DLL, not a stand-alone "
                           "folder. Use Remove on the DLL instead.").format(folder, name, original_path(dll).name))
        if dll.is_file() and payload_dll.is_file() and not same_file(dll, payload_dll) and not (folder / WEIGHTS).exists():
            raise HelixError(QCoreApplication.translate("backend", "{0} is not HelixSR; nothing was changed.")
                             .format(dll))
    removed = []
    for name in (*GAME_DLLS, *NETWORK_FILES, INI, LOG):
        path = folder / name
        if path.exists():
            path.unlink()
            removed.append(path)
    try:
        folder.rmdir()
    except OSError:
        pass
    return removed


def optiscaler_snippet(folder: Path) -> str:
    """The OptiScaler.ini lines that route a game's upscaler calls to this HelixSR folder."""
    win = to_windows_path(folder)
    return (f"[Upscalers]\nDx12Upscaler=fsr31\n\n[Libraries]\n"
            f"FfxDx12Path={win}\\{HELIXSR_DLL}\nFfxDx12SRPath={win}\\{UPSCALER_DLL}\n")


# ------------------------------------------------------------------------------------------ helixsr.ini
@dataclass
class HelixIni:
    """The keys of helixsr.ini with HelixSR's defaults (every key is optional in the file)."""

    sharpening_mode: str = "off"
    sharpness: float = 0.3
    motion_adaptive: bool = True
    motion_threshold: float = 2.0
    motion_limit: float = 16.0
    motion_reduction: float = 0.6
    model_e_enabled: bool = True
    network: str = "auto"
    invert_jitter: bool = False
    invert_motion_vectors: bool = False
    motion_vector_front_end: bool = False
    log_enabled: bool = True
    forwarding_dll: str = ""
    upscaler_dll: str = ""


# (section, key, field) in file order; the type comes from the dataclass default.
INI_SCHEMA = (
    ("Sharpening", "Mode", "sharpening_mode"),
    ("Sharpening", "Sharpness", "sharpness"),
    ("Sharpening", "MotionAdaptive", "motion_adaptive"),
    ("Sharpening", "MotionThreshold", "motion_threshold"),
    ("Sharpening", "MotionLimit", "motion_limit"),
    ("Sharpening", "MotionReduction", "motion_reduction"),
    ("ModelE", "Enabled", "model_e_enabled"),
    ("ModelE", "Network", "network"),
    ("ModelE", "InvertJitter", "invert_jitter"),
    ("ModelE", "InvertMotionVectors", "invert_motion_vectors"),
    ("ModelE", "MotionVectorFrontEnd", "motion_vector_front_end"),
    ("Log", "Enabled", "log_enabled"),
    ("Forwarding", "Dll", "forwarding_dll"),
    ("Forwarding", "UpscalerDll", "upscaler_dll"),
)
_FIELD_TYPES = {f.name: type(f.default) for f in fields(HelixIni)}
_SECTION_RE = re.compile(r"^\s*\[([^\]]+)\]\s*$")
_KEY_RE = re.compile(r"^(\s*)([A-Za-z_][A-Za-z0-9_]*)(\s*=\s*)(.*?)(\s*;.*)?$")


def _parse_value(kind: type, raw: str):
    raw = raw.strip()
    if kind is bool:
        return raw.lower() in ("true", "1", "yes", "on")
    if kind is float:
        try:
            return float(raw)
        except ValueError:
            return None
    return raw


def _format_value(value) -> str:
    if isinstance(value, bool):
        return "true" if value else "false"
    if isinstance(value, float):
        text = f"{value:.4f}".rstrip("0").rstrip(".")
        return text if text not in ("", "-0") else "0"
    return str(value)


def parse_ini(text: str) -> HelixIni:
    """Read the known keys; anything missing or unparsable keeps HelixSR's default."""
    lookup = {(s.lower(), k.lower()): f for s, k, f in INI_SCHEMA}
    settings = HelixIni()
    section = ""
    for line in text.splitlines():
        header = _SECTION_RE.match(line)
        if header:
            section = header.group(1).strip().lower()
            continue
        stripped = line.strip()
        if not stripped or stripped[0] in ";#":
            continue
        match = _KEY_RE.match(line)
        if not match:
            continue
        name = lookup.get((section, match.group(2).lower()))
        if name is None:
            continue
        value = _parse_value(_FIELD_TYPES[name], match.group(4))
        if value is not None:
            setattr(settings, name, value)
    return settings


def render_ini(settings: HelixIni, template: str = DEFAULT_INI_TEXT) -> str:
    """Write the settings into the template, changing only the value of known keys: comments, spacing, order and
    unknown keys stay. Missing keys are appended to their section, missing sections at the end."""
    lines = template.splitlines()
    pending: dict[str, dict[str, str]] = {}
    for section, key, name in INI_SCHEMA:
        pending.setdefault(section, {})[key] = _format_value(getattr(settings, name))
    pending_lower = {s.lower(): s for s in pending}

    out: list[str] = []
    section = ""
    section_start = -1          # index in out where the current section's content starts

    def close_section() -> None:
        """Append the keys of the just-finished section that the template did not have."""
        canonical = pending_lower.get(section.lower()) if section else None
        if not canonical or not pending.get(canonical):
            return
        insert_at = len(out)
        while insert_at > section_start and not out[insert_at - 1].strip():
            insert_at -= 1
        for key, value in pending.pop(canonical).items():
            out.insert(insert_at, f"{key} = {value}".rstrip())
            insert_at += 1

    for line in lines:
        header = _SECTION_RE.match(line)
        if header:
            close_section()
            section = header.group(1).strip()
            out.append(line)
            section_start = len(out)
            continue
        match = _KEY_RE.match(line) if line.strip() and line.strip()[0] not in ";#" else None
        canonical = pending_lower.get(section.lower()) if section else None
        if match and canonical:
            keys = pending.get(canonical, {})
            key = next((k for k in keys if k.lower() == match.group(2).lower()), None)
            if key is not None:
                value = keys.pop(key)
                comment = match.group(5) or ""
                line = f"{match.group(1)}{match.group(2)}{match.group(3)}{value}{comment}".rstrip()
        out.append(line)
    close_section()
    for canonical in dict.fromkeys(s for s, _, _ in INI_SCHEMA):
        if not pending.get(canonical):
            continue
        if out and out[-1].strip():
            out.append("")
        out.append(f"[{canonical}]")
        for key, value in pending.pop(canonical).items():
            out.append(f"{key} = {value}".rstrip())
    return "\n".join(out) + "\n"


def validate_ini(settings: HelixIni) -> list[str]:
    """Problems that would make HelixSR fall back to a default or behave oddly."""
    problems = []
    if settings.sharpening_mode not in SHARPENING_MODES:
        problems.append(f"Sharpening mode must be one of {', '.join(SHARPENING_MODES)}.")
    if not 0.0 <= settings.sharpness <= 1.0:
        problems.append("Sharpness must be between 0 and 1.")
    if settings.motion_threshold < 0 or settings.motion_limit < 0:
        problems.append("Motion threshold and limit cannot be negative.")
    if settings.motion_limit <= settings.motion_threshold:
        problems.append("Motion limit must be above the motion threshold.")
    if not 0.0 <= settings.motion_reduction <= 1.0:
        problems.append("Motion reduction must be between 0 and 1.")
    if settings.network not in NETWORKS:
        problems.append(f"Network must be one of {', '.join(NETWORKS)}.")
    for name, value in (("Forwarding DLL", settings.forwarding_dll), ("Upscaler DLL", settings.upscaler_dll)):
        if value and not value.lower().endswith(".dll"):
            problems.append(f"{name} should name a .dll file.")
    return problems


def ini_template(payload_dir: Path) -> str:
    """The payload's helixsr.ini (comments of the release the user has) or the embedded one."""
    try:
        return (payload_dir / INI).read_text(encoding="utf-8")
    except OSError:
        return DEFAULT_INI_TEXT


# ------------------------------------------------------------------------------------------ deployments
@dataclass
class Deployment:
    path: str                   # the replaced DLL (MODE_REPLACE) or the stand-alone folder (MODE_FOLDER)
    mode: str
    game: str                   # display name: the game folder
    deployed_at: str = ""       # ISO timestamp of the last deploy
    helixsr_version: str = ""

    @property
    def location(self) -> Path:
        return Path(self.path)

    @property
    def folder(self) -> Path:
        return self.location if self.mode == MODE_FOLDER else self.location.parent


def deployment_state(dep: Deployment, payload_dir: Path) -> tuple[str, str]:
    """(kind, text) for a status pill: ok = HelixSR in place, warn = partly, bad = gone / original restored."""
    folder = dep.folder
    if not folder.is_dir():
        return "bad", QCoreApplication.translate("backend", "Folder gone")
    if dep.mode == MODE_FOLDER:
        dll = folder / HELIXSR_DLL
        if not dll.is_file():
            return "bad", QCoreApplication.translate("backend", "Removed")
        network = all((folder / n).is_file() for n in NETWORK_FILES)
        return (("ok", QCoreApplication.translate("backend", "In place")) if network
                else ("warn", QCoreApplication.translate("backend", "Network files missing")))
    info = inspect_dll(dep.location, payload_dir) if dep.location.is_file() else None
    if info is None:
        return (("bad", QCoreApplication.translate("backend", "DLL missing")) if not original_path(dep.location).exists()
                else ("warn", QCoreApplication.translate("backend", "Only the backup is left")))
    if not info.deployed:
        return "bad", QCoreApplication.translate("backend", "Original restored")
    if not info.network_files:
        return "warn", QCoreApplication.translate("backend", "Network files missing")
    return (("ok", QCoreApplication.translate("backend", "In place")) if info.matches_payload
            else ("warn", QCoreApplication.translate("backend", "Older build")))


class DeploymentStore:
    """deployments.json: where HelixSR was put, so the Overview can show their state and Remove finds them."""

    def __init__(self, path: Path):
        self.path = path
        self.items: list[Deployment] = []
        self.load()

    def load(self) -> None:
        self.items = []
        try:
            data = json.loads(self.path.read_text(encoding="utf-8"))
        except (OSError, ValueError):
            return
        known = {f.name for f in fields(Deployment)}
        for raw in data.get("deployments", []) if isinstance(data, dict) else []:
            if isinstance(raw, dict) and {"path", "mode", "game"} <= raw.keys():
                self.items.append(Deployment(**{k: str(v) for k, v in raw.items() if k in known}))

    def save(self) -> None:
        self.path.parent.mkdir(parents=True, exist_ok=True)
        text = json.dumps({"deployments": [asdict(d) for d in self.items]}, indent=2)
        tmp = self.path.with_suffix(".tmp")
        tmp.write_text(text + "\n", encoding="utf-8")
        tmp.replace(self.path)

    def find(self, location: Path) -> Deployment | None:
        key = str(location)
        return next((d for d in self.items if d.path == key), None)

    def record(self, location: Path, mode: str, game: str, version: str) -> Deployment:
        dep = self.find(location)
        if dep is None:
            dep = Deployment(str(location), mode, game)
            self.items.append(dep)
        dep.mode, dep.game, dep.helixsr_version = mode, game, version
        dep.deployed_at = datetime.now().isoformat(timespec="seconds")
        self.items.sort(key=lambda d: (d.game.lower(), d.path))
        self.save()
        return dep

    def forget(self, location: Path) -> None:
        before = len(self.items)
        self.items = [d for d in self.items if d.path != str(location)]
        if len(self.items) != before:
            self.save()


def game_name(path: Path, libraries: list[Path] | None = None) -> str:
    """The game folder's name: the steamapps/common child when the path is inside a Steam library, else the
    first folder above the DLL that is not a plain engine subfolder."""
    for library in libraries or []:
        common = library / "common"
        try:
            relative = path.resolve().relative_to(common.resolve())
        except (ValueError, OSError):
            continue
        if relative.parts:
            return relative.parts[0]
    folder = path if path.is_dir() else path.parent
    skip = {"win64", "binaries", "thirdparty", "plugins", "engine", "bin", "x64", "helixsr"}
    for parent in (folder, *folder.parents):
        if parent.name.lower() not in skip and parent.name:
            return parent.name
    return folder.name or str(folder)


# ------------------------------------------------------------------------------------------------ steam
def steam_roots(home: Path | None = None) -> list[Path]:
    home = home or Path.home()
    candidates = (home / ".local/share/Steam", home / ".steam/steam", home / ".steam/root",
                  home / ".var/app/com.valvesoftware.Steam/.local/share/Steam")
    roots: list[Path] = []
    for root in candidates:
        try:
            resolved = root.resolve()
        except OSError:
            continue
        if (resolved / "steamapps").is_dir() and resolved not in roots:
            roots.append(resolved)
    return roots


_VDF_PATH_RE = re.compile(r'"path"\s+"((?:[^"\\]|\\.)*)"')


def steam_libraries(home: Path | None = None) -> list[Path]:
    """Every steamapps folder: the Steam roots plus the libraries listed in libraryfolders.vdf."""
    libraries: list[Path] = []

    def add(path: Path) -> None:
        try:
            resolved = path.resolve()
        except OSError:
            return
        if (resolved / "common").is_dir() and resolved not in libraries:
            libraries.append(resolved)

    for root in steam_roots(home):
        add(root / "steamapps")
        vdf = root / "steamapps" / "libraryfolders.vdf"
        try:
            text = vdf.read_text(encoding="utf-8", errors="replace")
        except OSError:
            continue
        for raw in _VDF_PATH_RE.findall(text):
            add(Path(raw.replace("\\\\", "\\").replace("\\", "/")) / "steamapps")
    return libraries


def steam_games(libraries: list[Path]) -> list[Path]:
    games: list[Path] = []
    for library in libraries:
        try:
            games.extend(p for p in (library / "common").iterdir() if p.is_dir())
        except OSError:
            continue
    return sorted(games, key=lambda p: p.name.lower())
