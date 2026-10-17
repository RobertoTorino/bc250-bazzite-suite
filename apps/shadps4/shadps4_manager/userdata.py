# SPDX-License-Identifier: GPL-3.0-or-later
"""shadPS4's own folder, ~/.local/share/shadPS4 (its saves, settings and system modules): the game folders and the
system module folder from its config.json, which system modules are there, and the users and shadNet settings (its
users.json). shadPS4 writes these files; the app writes only the shadNet settings, which shadPS4 has no place for
(a game folder is added through shadPS4's own --add-game-folder). Both files are JSON as shadPS4 writes them (indented
by two, no newline at the end), and every other setting in them stays as it is.

System modules are libraries of the PS4's firmware (.sprx), which the app cannot ship: they come from the user's own
console. shadPS4 0.20.0 loads these from the folder when a game asks for them (sysmodule_internal.cpp); for some it
has its own version and does without, for the others a game that needs one does not run without it."""

from __future__ import annotations

import json
import os
from dataclasses import dataclass
from pathlib import Path

from bc250_core.platform import data_home

from .shadnet import DEFAULT_SERVER

# shadPS4 0.20.0 has no replacement of its own for these.
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


def _network(config: dict, key: str):
    """A shadNet setting where shadPS4 reads it: 0.19.0 keeps them in General, 0.20.0 in Network, and takes one from
    General only while Network does not have it (a config from before 0.20.0)."""
    network = config.get("Network")
    if isinstance(network, dict) and key in network:
        return network[key]
    return _general(config).get(key)


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


# --- Users and shadNet -----------------------------------------------------------------------------------------

class UserDataError(Exception):
    pass


@dataclass(frozen=True)
class User:
    """One of shadPS4's users (users.json; 0.20.0 makes four, the first is player 1) with its shadNet account."""
    user_id: int
    name: str
    npid: str = ""
    password: str = ""
    email: str = ""
    shadnet: bool = False                   # shadNet switched on for this user


def _users_list(data: dict) -> list:
    users = data.get("Users")
    listed = users.get("user") if isinstance(users, dict) else None
    return listed if isinstance(listed, list) else []


def read_users(home: Path) -> list[User]:
    """shadPS4's users in its order; [] when it never ran (no users.json) or the file cannot be read."""
    try:
        data = json.loads((home / "users.json").read_text(encoding="utf-8"))
    except (OSError, ValueError):
        return []
    if not isinstance(data, dict):
        return []
    return [User(int(u.get("user_id", 0)), str(u.get("user_name", "")), str(u.get("shadnet_npid", "")),
                 str(u.get("shadnet_password", "")), str(u.get("shadnet_email", "")),
                 bool(u.get("shadnet_enabled", False)))
            for u in _users_list(data) if isinstance(u, dict) and isinstance(u.get("user_id"), int)]


def shadnet_on(config: dict) -> bool:
    """shadPS4's own switch for shadNet (its settings window's "Enable ShadNet"), for all users."""
    return bool(_network(config, "shad_net_enabled"))


def shadnet_server(config: dict) -> str:
    server = _network(config, "shadnet_server")
    return server if isinstance(server, str) and server.strip() else DEFAULT_SERVER


def _write_json(path: Path, data: dict) -> None:
    """As shadPS4 writes it, through a temporary file, so a cut-off write never leaves half a file."""
    temporary = path.with_name(f".{path.name}.{os.getpid()}.tmp")
    temporary.write_text(json.dumps(data, indent=2, ensure_ascii=False), encoding="utf-8")
    temporary.replace(path)


def save_shadnet(home: Path, user_id: int, npid: str, password: str, email: str, on: bool, server: str) -> None:
    """The user's shadNet account in users.json, and in config.json the server and shadPS4's switch: on when the
    user's shadNet is on, off when no user's is. shadPS4 must have run once (it makes both files) and must not run
    now (it would write its own copy back). UserDataError when a file is missing or cannot be read or written."""
    try:
        config = json.loads((home / "config.json").read_text(encoding="utf-8"))
        users = json.loads((home / "users.json").read_text(encoding="utf-8"))
    except FileNotFoundError as error:
        raise UserDataError("shadPS4 has not run yet: start it once (shadPS4 settings), then try again.") from error
    except (OSError, ValueError) as error:
        raise UserDataError(f"shadPS4's settings could not be read: {error}") from error
    if not isinstance(config, dict) or not isinstance(users, dict):
        raise UserDataError("shadPS4's settings are not what shadPS4 writes.")
    listed = [u for u in _users_list(users) if isinstance(u, dict)]
    user = next((u for u in listed if u.get("user_id") == user_id), None)
    if user is None:
        raise UserDataError(f"shadPS4 has no user {user_id}.")
    user.update(shadnet_npid=npid, shadnet_password=password, shadnet_email=email, shadnet_enabled=on)
    # 0.20.0 has a Network section and no longer reads these from General once it is there.
    section = config["Network"] if isinstance(config.get("Network"), dict) else config.setdefault("General", {})
    if not isinstance(section, dict):
        raise UserDataError("shadPS4's settings are not what shadPS4 writes.")
    section["shad_net_enabled"] = any(bool(u.get("shadnet_enabled")) for u in listed)
    section["shadnet_server"] = server
    try:
        _write_json(home / "users.json", users)
        _write_json(home / "config.json", config)
    except OSError as error:
        raise UserDataError(f"shadPS4's settings could not be written: {error}") from error


def shadps4_running(proc: Path = Path("/proc")) -> bool:
    """Whether shadPS4 runs (its AppImage, or the program inside it), which writes its own settings back."""
    for entry in proc.glob("[0-9]*"):
        try:
            name = (entry / "comm").read_text(encoding="utf-8").strip()
        except OSError:
            continue
        if name == "shadps4" or name.startswith("Shadps4-sdl"):
            return True
    return False
