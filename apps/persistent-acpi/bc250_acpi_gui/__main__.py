# SPDX-License-Identifier: MIT
"""Entry point: python -m bc250_acpi_gui [--script PATH]"""

from __future__ import annotations

import argparse
import sys
from pathlib import Path

from PyQt6.QtCore import QLibraryInfo, QLocale, QTranslator
from PyQt6.QtGui import QIcon
from PyQt6.QtWidgets import QApplication, QMessageBox

from . import APP_ID, APP_NAME, LOGO_PATH, ROOT, __version__
from .main_window import MainWindow

DEFAULT_SCRIPT = ROOT / "bc250-acpi-override.sh"


def main() -> int:
    parser = argparse.ArgumentParser(prog="bc250_acpi_gui", description=f"{APP_NAME} {__version__}")
    parser.add_argument("--script", default=str(DEFAULT_SCRIPT), help="path to bc250-acpi-override.sh")
    parser.add_argument("--version", action="version", version=f"%(prog)s {__version__}")
    args, qt_args = parser.parse_known_args()

    app = QApplication([sys.argv[0], *qt_args])
    app.setOrganizationName(APP_ID)
    app.setApplicationName(APP_ID)
    app.setApplicationDisplayName(f"{APP_NAME} {__version__}")
    app.setApplicationVersion(__version__)
    app.setDesktopFileName(APP_ID)
    app.setStyle("Fusion")
    if LOGO_PATH.is_file():
        app.setWindowIcon(QIcon(str(LOGO_PATH)))
    # Qt's own dialog buttons (Yes/No/OK/Cancel) in the system language; the app's text is English.
    qt_tr = QTranslator(app)
    if qt_tr.load(QLocale.system(), "qtbase", "_", QLibraryInfo.path(QLibraryInfo.LibraryPath.TranslationsPath)):
        app.installTranslator(qt_tr)

    script = Path(args.script).resolve()
    if not script.is_file():
        QMessageBox.critical(None, APP_NAME, f"bc250-acpi-override.sh not found:\n{script}")
        return 1

    window = MainWindow(str(script))
    window.show()
    return app.exec()


if __name__ == "__main__":
    sys.exit(main())
