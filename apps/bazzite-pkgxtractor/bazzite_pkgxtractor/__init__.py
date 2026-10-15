# SPDX-License-Identifier: GPL-3.0-or-later
"""Bazzite pkgxtractor: extracts package (.pkg) files into the folder layout shadPS4 uses, on
Bazzite. The Python + Qt port of the C++ tool pkgxtractor (github.com/RobertoTorino/pkgxtractor); the PKG/PFS/PSF
code is a port of shadPS4's (GPL-2.0-or-later)."""

APP_NAME = "Bazzite pkgxtractor"
APP_ID = "bazzite-pkgxtractor"
__version__ = "0.1.2"

from pathlib import Path  # noqa: E402  (constants first, as the suite's apps do)

from bc250_core import AppInfo  # noqa: E402

ROOT = Path(__file__).resolve().parent.parent
LOGO_PATH = ROOT / "images" / f"{APP_ID}.png"

# Settings in ~/.config/bazzite-pkgxtractor/bazzite-pkgxtractor.ini, as before the move to core.
INFO = AppInfo(app_id=APP_ID, name=APP_NAME, version=__version__, logo=LOGO_PATH,
               tag_prefix="bazzite-pkgxtractor-v", settings_ini=True)

__all__ = ["APP_ID", "APP_NAME", "INFO", "LOGO_PATH", "ROOT", "__version__"]
