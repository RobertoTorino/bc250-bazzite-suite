# SPDX-License-Identifier: GPL-3.0-or-later
"""PyQt6 front-end that installs HelixSR (the FSR/DLSS hybrid upscaler) into games on an AMD BC-250 running Bazzite."""

APP_NAME = "BC-250 HelixSR Manager"
APP_ID = "bc250-bazzite-helixsr-gui"
__version__ = "0.1.0"

import os
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
LOGO_PATH = ROOT / "images" / f"{APP_ID}.png"
WINDOW_ICON_PATH = LOGO_PATH
FONT_DIR = Path(__file__).resolve().parent / "fonts"
TRANSLATIONS_DIR = Path(__file__).resolve().parent / "translations"
LANGUAGES = {"en": "English", "de": "Deutsch", "es": "Español", "fr": "Français", "it": "Italiano", "pl": "Polski",
             "ru": "Русский", "zh": "中文（简体）", "ja": "日本語"}
DISPLAY_NAME = f"{APP_NAME} {__version__}"
REPO_URL = "https://github.com/RobertoTorino/bc250-bazzite-helixsr-gui"
HELIXSR_URL = "https://github.com/lonewolf0622/HelixSR"
HELIXSR_RELEASES_URL = f"{HELIXSR_URL}/releases"
OPTISCALER_URL = "https://github.com/OptiScaler/OptiScaler"

# Per-user data: the imported HelixSR payload lives here, so updating or removing the app keeps it.
DATA_HOME = Path(os.environ.get("XDG_DATA_HOME") or Path.home() / ".local" / "share")
CONFIG_HOME = Path(os.environ.get("XDG_CONFIG_HOME") or Path.home() / ".config")
PAYLOAD_DIR = DATA_HOME / APP_ID / "payload"
DEPLOYMENTS_FILE = CONFIG_HOME / APP_ID / "deployments.json"


def plain_tooltip(text: str) -> str:
    """Tooltip for text that comes from outside the app (paths, file contents).

    Qt renders a tooltip as HTML when it looks like HTML, so such text is escaped and shown in a
    paragraph that keeps its line breaks: it can never inject markup, links or images."""
    import html
    return f"<p style='white-space:pre-wrap; margin:0;'>{html.escape(text)}</p>"


def window_title(part: str) -> str:
    """Title of a secondary window. On Linux/Windows Qt appends " — <display name>" itself."""
    import sys
    return f"{APP_NAME} — {part}" if sys.platform == "darwin" else part
