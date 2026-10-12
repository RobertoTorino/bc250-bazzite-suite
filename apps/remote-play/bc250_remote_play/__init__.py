# SPDX-License-Identifier: AGPL-3.0-or-later
"""Remote Play for the BC-250: find the consoles on the network, wake them, register the board with one, and start
and close a Remote Play session with it. The protocol is the one chiaki-ng implements (AGPL-3.0), ported to
Python."""

APP_NAME = "BC250 Remote Play"
APP_ID = "bc250-remote-play"
__version__ = "0.1.2"

from pathlib import Path

from bc250_core import AppInfo

ROOT = Path(__file__).resolve().parent.parent
LOGO_PATH = ROOT / "images" / f"{APP_ID}.png"

# Settings in ~/.config/bc250-remote-play/bc250-remote-play.ini
INFO = AppInfo(app_id=APP_ID, name=APP_NAME, version=__version__, logo=LOGO_PATH, tag_prefix="remote-play-v",
               settings_ini=True, languages={"en": "English"})

__all__ = ["APP_ID", "APP_NAME", "INFO", "LOGO_PATH", "ROOT", "__version__"]
