# SPDX-License-Identifier: GPL-3.0-or-later
"""Entry point: python -m bc250_overlay [--native-wayland]"""

from __future__ import annotations

import argparse
import os
import sys

from bc250_core import instance
from bc250_core.app import create_app, exec_app

from . import APP_NAME, INFO, __version__
from .overlay import OverlayWindow


def main() -> int:
    parser = argparse.ArgumentParser(prog="bc250_overlay", description=f"{APP_NAME} {__version__}")
    parser.add_argument("--native-wayland", action="store_true",
                        help="run as a Wayland window: sharper on scaled screens, but it cannot keep itself on top")
    parser.add_argument("--version", action="version", version=f"%(prog)s {__version__}")
    args, qt_args = parser.parse_known_args()

    # A Wayland window cannot keep itself on top or choose its own position; through XWayland it can. An explicit
    # QT_QPA_PLATFORM (e.g. offscreen in the tests) always wins.
    if not args.native_wayland and os.environ.get("WAYLAND_DISPLAY") and os.environ.get("DISPLAY"):
        os.environ.setdefault("QT_QPA_PLATFORM", "xcb")

    # English only so far, Qt's own menu texts included.
    app = create_app(INFO, qt_args, lang="en")
    app.setQuitOnLastWindowClosed(True)
    # One instance: a second launch brings the running window to the front and exits.
    if instance.already_running(INFO.app_id):
        return 0
    window = OverlayWindow()
    window.show()
    server = instance.serve(INFO.app_id, window)  # noqa: F841 (kept alive while the app runs)
    return exec_app(app)


if __name__ == "__main__":
    sys.exit(main())
