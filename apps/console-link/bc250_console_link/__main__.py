# SPDX-License-Identifier: AGPL-3.0-or-later
"""Entry point: python -m bc250_console_link"""

from __future__ import annotations

import argparse
import sys

from bc250_core import __version__ as CORE_VERSION, instance
from bc250_core.app import create_app, exec_app
from bc250_core.platform import config_home

from . import APP_NAME, INFO, __version__


def main() -> int:
    parser = argparse.ArgumentParser(prog="bc250_console_link", description=f"{APP_NAME} {__version__}")
    parser.add_argument("--version", action="version", version=f"%(prog)s {__version__} (core {CORE_VERSION})")
    _args, qt_args = parser.parse_known_args()

    from .consoles import migrate_old_config
    migrate_old_config(config_home(), INFO.app_id)      # before Qt opens the settings file
    # English only so far, Qt's own menu texts included.
    app = create_app(INFO, qt_args, lang="en")
    if instance.already_running(INFO.app_id):
        return 0
    from .main_window import MainWindow
    window = MainWindow()
    window.show()
    server = instance.serve(INFO.app_id, window)  # noqa: F841 (kept alive while the app runs)
    return exec_app(app)


if __name__ == "__main__":
    sys.exit(main())
