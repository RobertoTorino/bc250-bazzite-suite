# SPDX-License-Identifier: GPL-3.0-or-later
"""RPCS3's own folder, ~/.config/rpcs3 (its settings, firmware, saves and installed games), as RPCS3 0.0.43 lays it
out on Linux (fs::get_config_dir, cfg_vfs): vfs.yml says where its virtual PS3 drives are, games.yml which disc games
it knows (title ID: folder), and the firmware's version is in dev_flash/vsh/etc/version.txt. The app reads these
files and never writes them; RPCS3 does that.

Both .yml files are YAML maps as RPCS3 writes them (yaml-cpp): one "key: value" a line, a value in quotes when it
needs them. The app reads only the top level of those maps (vfs.yml has a nested map for USB drives, which it does
not need), so it needs no YAML library.

The PS3's firmware (PS3UPDAT.PUP) is not ours to give: the app cannot ship it, and RPCS3 needs it to start any
game. RPCS3 installs it (--installfw) into dev_flash."""

from __future__ import annotations

from pathlib import Path

from bc250_core.platform import config_home

EMULATOR_DIR = "$(EmulatorDir)"
# vfs.yml's keys and RPCS3's defaults for them (vfs_config.h).
DRIVES = {"/dev_hdd0/": "$(EmulatorDir)dev_hdd0/", "/dev_flash/": "$(EmulatorDir)dev_flash/",
          "/games/": "$(EmulatorDir)games/"}
FIRMWARE_PAGE = "https://www.playstation.com/en-us/support/hardware/ps3/system-software/"


def rpcs3_home() -> Path:
    return config_home() / "rpcs3"


def _scalar(text: str) -> str:
    text = text.strip()
    if len(text) >= 2 and text[0] == text[-1] == "'":
        return text[1:-1].replace("''", "'")
    if len(text) >= 2 and text[0] == text[-1] == '"':
        return text[1:-1].replace('\\"', '"').replace("\\\\", "\\")
    return text


def read_map(path: Path) -> dict[str, str]:
    """The top level of a YAML map as RPCS3 writes it; {} when the file is not there or cannot be read. A key whose
    value is a nested map is left out."""
    try:
        lines = path.read_text(encoding="utf-8").splitlines()
    except (OSError, UnicodeDecodeError):
        return {}
    found = {}
    for line in lines:
        if not line or line[0] in " \t#-" or line.startswith("---"):
            continue
        if line[0] in "'\"":
            end = line.find(line[0] + ":", 1)
            if end < 0:
                continue
            key, value = _scalar(line[:end + 1]), line[end + 2:]
        else:
            key, sep, value = line.partition(": ")
            if not sep:
                continue                        # "key:" alone: a nested map follows
        if value.strip():
            found[key] = _scalar(value)
    return found


def drive(home: Path, vfs: dict[str, str], key: str) -> Path:
    """Where one of RPCS3's virtual drives is (vfs.yml, else RPCS3's default), $(EmulatorDir) resolved."""
    emulator_dir = vfs.get(EMULATOR_DIR, "") or str(home)
    path = vfs.get(key, "") or DRIVES[key]
    return Path(path.replace(EMULATOR_DIR, emulator_dir.rstrip("/") + "/"))


def known_games(home: Path) -> dict[str, str]:
    """games.yml: the disc games RPCS3 knows, title ID: folder (RPCS3 adds a disc game when it first starts it)."""
    return read_map(home / "games.yml")


def firmware_version(dev_flash: Path) -> str:
    """The installed firmware's version as RPCS3 shows it ("4.92"); "" when none is installed. version.txt starts
    "release:04.9200:", the version between the first two colons (sysinfo.cpp: get_firmware_version)."""
    try:
        text = (dev_flash / "vsh" / "etc" / "version.txt").read_text(encoding="utf-8", errors="replace")
    except OSError:
        return ""
    parts = text.split(":")
    if len(parts) < 3:
        return ""
    major, _, minor = parts[1].strip().partition(".")
    if not major.isdigit() or not minor.isdigit():
        return ""
    minor = minor.rstrip("0")
    return f"{int(major)}.{minor.ljust(2, '0')}"
