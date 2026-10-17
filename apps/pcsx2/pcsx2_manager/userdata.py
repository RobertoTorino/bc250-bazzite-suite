# SPDX-License-Identifier: GPL-3.0-or-later
"""PCSX2's own folder, ~/.config/PCSX2 (its BIOS, memory cards, saves and settings), as PCSX2 2.8 lays it out on
Linux: the BIOS in bios/, the settings in inis/PCSX2.ini. The app reads these and never writes them; PCSX2 does
that.

The PS2's BIOS is not ours to give: PCSX2 cannot start a game without it, and it comes from your own console,
dumped with a homebrew tool (biosdrain). A dump is a .bin or .rom file of 4 MB, often with files beside it
(.erom, .nvm, ...); PCSX2 lists the dumps in its bios folder and the one to use is chosen in PCSX2's own window
(its first start asks)."""

from __future__ import annotations

import configparser
from pathlib import Path

from bc250_core.platform import config_home

BIOS_SUFFIXES = (".bin", ".rom")
BIOS_HELP_URL = "https://pcsx2.net/docs/setup/bios"


def pcsx2_home() -> Path:
    return config_home() / "PCSX2"


def bios_dir(home: Path) -> Path:
    return home / "bios"


def bios_files(folder: Path) -> list[Path]:
    """The BIOS dumps in PCSX2's bios folder (.bin and .rom files), sorted by name."""
    try:
        return sorted(p for p in folder.iterdir()
                      if p.is_file() and p.suffix.lower() in BIOS_SUFFIXES)
    except OSError:
        return []


def ini_value(home: Path, section: str, key: str) -> str:
    """A value from PCSX2's settings (inis/PCSX2.ini), "" when it or the file is not there."""
    ini = configparser.ConfigParser(interpolation=None, strict=False)
    ini.optionxform = str                               # PCSX2's keys are case-sensitive: Slot1_Filename
    try:
        ini.read(home / "inis" / "PCSX2.ini", encoding="utf-8")
    except (configparser.Error, UnicodeDecodeError):
        return ""
    return ini.get(section, key, fallback="").strip()
