# SPDX-License-Identifier: GPL-3.0-or-later
"""PS1 games on the BC-250 with SwanStation: installs RetroArch (Flatpak) and the SwanStation core, checks the PS1
BIOS, finds the games in the chosen folders and adds them to Steam for Game Mode."""

APP_NAME = "SwanStation Manager"
APP_ID = "bc250-swanstation-manager"
__version__ = "0.1.0"

from pathlib import Path

from bc250_core import AppInfo

ROOT = Path(__file__).resolve().parent.parent
LOGO_PATH = ROOT / "images" / f"{APP_ID}.webp"

# Settings in ~/.config/bc250-swanstation-manager/bc250-swanstation-manager.ini
INFO = AppInfo(app_id=APP_ID, name=APP_NAME, version=__version__, logo=LOGO_PATH, tag_prefix="swanstation-v",
               settings_ini=True)

__all__ = ["APP_ID", "APP_NAME", "INFO", "LOGO_PATH", "ROOT", "__version__"]
