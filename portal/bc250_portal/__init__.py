# SPDX-License-Identifier: GPL-3.0-or-later
"""The BC250 Bazzite Suite portal: installs, opens and removes the suite's apps, one pill per app."""

APP_NAME = "BC250 Bazzite Suite"
APP_ID = "bc250-bazzite-suite"
__version__ = "0.6.0"

from pathlib import Path

from bc250_core import AppInfo
from bc250_core.platform import data_home

ROOT = Path(__file__).resolve().parent.parent           # portal/ in the checkout, /opt/bc250-bazzite-suite installed
CHECKOUT_FILE = "suite-checkout"                        # in ROOT, written by install.sh when installed from a checkout
MANIFEST = ROOT / "apps.toml"
LOGO_PATH = ROOT / "images" / f"{APP_ID}.png"
APP_ICONS = ROOT / "images" / "apps"                    # <key>.png: the small icon on each app's card
INFO = AppInfo(app_id=APP_ID, name=APP_NAME, version=__version__, logo=LOGO_PATH, tag_prefix="portal-v",
               settings_app="bc250-bazzite-suite-portal", languages={"en": "English"})


def state_dir() -> Path:
    """Per-user portal state: which tag of each app it installed, and the extracted releases it installed from
    (kept, so the matching uninstaller is at hand)."""
    return data_home() / APP_ID / "portal"


def suite_checkout() -> Path | None:
    """The suite repository when the portal runs from a checkout, or was installed from one (development): apps
    then install from the local source instead of a GitHub release."""
    candidates = [ROOT.parent]
    try:
        recorded = (ROOT / CHECKOUT_FILE).read_text(encoding="utf-8").strip()
    except OSError:
        recorded = ""
    if recorded:
        candidates.append(Path(recorded))
    for suite in candidates:
        if (suite / "apps").is_dir() and (suite / "tools" / "stage_app.py").is_file() and (suite / "core").is_dir():
            return suite
    return None
