# SPDX-License-Identifier: GPL-3.0-or-later
"""Entry point: python -m portal_dependency_checker."""

from __future__ import annotations

import sys
from bc250_core import __version__ as CORE_VERSION, instance
from bc250_core.app import create_app, exec_app
from PyQt6.QtWidgets import QMessageBox

from . import APP_NAME, CATALOG, INFO, __version__
from .dependencies import DependencyCatalogError, load_catalog, load_tools
from .main_window import DependencyWindow


def main() -> int:
    app = create_app(INFO, sys.argv[1:], lang="en")
    try:
        dependencies = load_catalog(CATALOG)
        tools = load_tools(CATALOG)
    except DependencyCatalogError as exc:
        QMessageBox.critical(None, APP_NAME, f"The dependency catalog could not be read:\n\n{exc}")
        return 1
    if instance.already_running(INFO.app_id):
        return 0
    window = DependencyWindow(dependencies, tools)
    window.show()
    server = instance.serve(INFO.app_id, window)  # noqa: F841 (kept alive while the app runs)
    return exec_app(app)


if __name__ == "__main__":
    if "--version" in sys.argv:
        print(f"portal-dependency-checker {__version__} (core {CORE_VERSION})")
        sys.exit(0)
    sys.exit(main())
