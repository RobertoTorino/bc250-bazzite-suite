# SPDX-License-Identifier: GPL-3.0-or-later
"""RetroArch's own folder, as the Flatpak lays it out: ~/.var/app/org.libretro.RetroArch/config/retroarch, with
the PS1's BIOS in system/. The BIOS is not ours to give: SwanStation cannot start a game without one, and it comes
from your own console. It looks for these files by name (the core's info file lists them: the PSP's and the PS3's
PS1 BIOS and the US, Japanese and European console's) and also takes No-Intro's names (scph1001.bin and the like).
The app reads this folder and never writes it."""

from __future__ import annotations

from pathlib import Path

from .emulator import FLATPAK_ID

BIOS_NAMES = ("psxonpsp660.bin", "ps1_rom.bin", "scph5500.bin", "scph5501.bin", "scph5502.bin")
BIOS_HELP_URL = "https://docs.libretro.com/library/swanstation/#bios"


def retroarch_home() -> Path:
    return Path.home() / ".var" / "app" / FLATPAK_ID / "config" / "retroarch"


def system_dir(home: Path) -> Path:
    return home / "system"


def bios_files(folder: Path) -> list[Path]:
    """The PS1 BIOS dumps in RetroArch's system folder (the names above, and scph*.bin), sorted by name."""
    try:
        return sorted(p for p in folder.iterdir()
                      if p.is_file() and (p.name.lower() in BIOS_NAMES
                                          or (p.name.lower().startswith("scph") and p.suffix.lower() == ".bin")))
    except OSError:
        return []
