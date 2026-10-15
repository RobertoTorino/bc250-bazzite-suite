# SPDX-License-Identifier: GPL-3.0-or-later
"""Bazzite UMD File Renamer: reads PSP ISO images, shows what PSP_GAME/PARAM.SFO says about them and renames the
files to a normalized "ID - Title" form, on Bazzite. The Python + Qt port of the C++/Qt rebuild in
github.com/RobertoTorino/umd-file-renamer (qt/)."""

APP_NAME = "Bazzite UMD File Renamer"
APP_ID = "bazzite-umd-file-renamer"
__version__ = "0.1.2"

from pathlib import Path  # noqa: E402  (constants first, as the suite's apps do)

from bc250_core import AppInfo  # noqa: E402

ROOT = Path(__file__).resolve().parent.parent
LOGO_PATH = ROOT / "images" / f"{APP_ID}.png"

# Settings in ~/.config/bazzite-umd-file-renamer/bazzite-umd-file-renamer.ini, as before the move to core.
INFO = AppInfo(app_id=APP_ID, name=APP_NAME, version=__version__, logo=LOGO_PATH,
               tag_prefix="bazzite-umd-file-renamer-v", settings_ini=True)

__all__ = ["APP_ID", "APP_NAME", "INFO", "LOGO_PATH", "ROOT", "__version__"]
