# SPDX-License-Identifier: GPL-3.0-or-later
"""shadPS4's own folder, ~/.local/share/shadPS4 (its saves, settings and system modules): the game folders and the
system module folder from its config.json, and which system modules are there. The app only reads it; shadPS4 writes
it (a game folder is added through shadPS4's own --add-game-folder).

System modules are libraries of the PS4's firmware (.sprx), which the app cannot ship: they come from the user's own
console. shadPS4 0.19.0 loads these from the folder when a game asks for them (sysmodule_internal.cpp); for some it
has its own version and does without, for the others a game that needs one does not run without it."""

from __future__ import annotations

import json
from dataclasses import dataclass
from pathlib import Path

from bc250_core.platform import data_home

# shadPS4 0.19.0 has no replacement of its own for these.
NEEDED = (
    "libSceUlt.sprx", "libSceAvPlayerStreaming.sprx", "libSceJpegDec.sprx", "libSceJson.sprx", "libSceJson2.sprx",
    "libSceCesCs.sprx", "libSceAt9Enc.sprx", "libSceAudiodec.sprx", "libSceAudiodecCpu.sprx",
    "libSceAudiodecCpuDdp.sprx", "libSceAudiodecCpuM4aac.sprx", "libSceAudiodecCpuDtsHdLbr.sprx",
    "libSceAudiodecCpuHevag.sprx", "libSceFreeTypeOt.sprx", "libSceFreeTypeOl.sprx", "libSceFreeTypeOptOl.sprx",
    "libSceBeisobmf.sprx", "libSceBemp2sys.sprx", "libSceWkFontConfig.sprx", "libScePsmKitSystem.sprx",
    "libSceDepth.sprx", "libScePadTracker.sprx", "libSceMoveTracker.sprx", "libSceXml.sprx",
)
# Used when they are there; shadPS4 has its own version of these.
OPTIONAL = (
    "libSceNgs2.sprx", "libSceAvPlayer.sprx", "libSceRtc.sprx", "libSceJpegEnc.sprx", "libScePngDec.sprx",
    "libScePngEnc.sprx", "libSceFont.sprx", "libSceFontFt.sprx", "libSceRudp.sprx", "libSceSystemGesture.sprx",
)


def shadps4_home() -> Path:
    return data_home() / "shadPS4"


def read_config(home: Path) -> dict:
    """shadPS4's config.json; {} when it is not there (shadPS4 never ran) or cannot be read."""
    try:
        config = json.loads((home / "config.json").read_text(encoding="utf-8"))
    except (OSError, ValueError):
        return {}
    return config if isinstance(config, dict) else {}


def _general(config: dict) -> dict:
    general = config.get("General")
    return general if isinstance(general, dict) else {}


def game_folders(config: dict) -> list[Path]:
    """The game folders shadPS4 knows and has switched on, in its order."""
    folders = _general(config).get("install_dirs")
    if not isinstance(folders, list):
        return []
    return [Path(item["path"]) for item in folders
            if isinstance(item, dict) and isinstance(item.get("path"), str) and item["path"]
            and item.get("enabled", True)]


def modules_folder(home: Path, config: dict) -> Path:
    """Where shadPS4 looks for system modules: its setting, else sys_modules in its folder."""
    chosen = _general(config).get("sys_modules_dir")
    return Path(chosen) if isinstance(chosen, str) and chosen else home / "sys_modules"


@dataclass(frozen=True)
class Modules:
    folder: Path
    needed: tuple[str, ...]             # of NEEDED, the ones there
    optional: tuple[str, ...]           # of OPTIONAL, the ones there

    @property
    def missing(self) -> tuple[str, ...]:
        return tuple(name for name in NEEDED if name not in self.needed)

    @property
    def complete(self) -> bool:
        return not self.missing


def check_modules(folder: Path) -> Modules:
    try:
        present = {entry.name for entry in folder.iterdir() if entry.is_file()}
    except OSError:
        present = set()
    return Modules(folder, tuple(n for n in NEEDED if n in present), tuple(n for n in OPTIONAL if n in present))
