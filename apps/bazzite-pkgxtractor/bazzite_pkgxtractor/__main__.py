# SPDX-License-Identifier: GPL-3.0-or-later
"""Entry point: python -m bazzite_pkgxtractor [file.pkg]"""

from __future__ import annotations

import argparse
import sys

from bc250_core import __version__ as CORE_VERSION, instance
from bc250_core.app import create_app, exec_app

from . import APP_ID, APP_NAME, INFO, __version__


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(prog=APP_ID, description=f"{APP_NAME} {__version__}")
    parser.add_argument("pkg_file", nargs="?", help="PKG file to load when the window opens")
    parser.add_argument("--version", action="version", version=f"%(prog)s {__version__} (core {CORE_VERSION})")
    return parser


def main() -> int:
    args, qt_args = build_parser().parse_known_args()

    # English only, Qt's own dialog buttons included.
    app = create_app(INFO, qt_args, lang="en")
    # A second launch (the menu entry with another package) hands its package to the open window.
    if instance.already_running(INFO.app_id, [args.pkg_file] if args.pkg_file else []):
        return 0
    from .main_window import MainWindow
    window = MainWindow(args.pkg_file)
    window.show()
    server = instance.serve(INFO.app_id, window, on_args=lambda forwarded: window.open_pkg(forwarded[0]))  # noqa: F841
    # Logout or SIGTERM/SIGINT quit the app cleanly (and remove the crash marker) instead of killing it mid-event.
    return exec_app(app)


if __name__ == "__main__":
    sys.exit(main())
