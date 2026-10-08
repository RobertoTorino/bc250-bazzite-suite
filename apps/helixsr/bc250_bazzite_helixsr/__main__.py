# SPDX-License-Identifier: GPL-3.0-or-later
"""Entry point: python -m bc250_bazzite_helixsr [--payload DIR] [--deployments FILE] [--work DIR] [--lang CODE]"""

from __future__ import annotations

import argparse
import signal
import sys
from pathlib import Path

from PyQt6.QtCore import QLibraryInfo, QLocale, QSettings, QTimer, QTranslator
from PyQt6.QtGui import QIcon
from PyQt6.QtWidgets import QApplication

from . import (APP_ID, APP_NAME, DEPLOYMENTS_FILE, DISPLAY_NAME, LANGUAGES, PAYLOAD_DIR, TRANSLATIONS_DIR,
               WINDOW_ICON_PATH, __version__)
from .acquire import WORK_DIR
from .main_window import MainWindow
from .widgets import RoundedToolTip


def install_translators(app: QApplication, lang: str | None) -> str:
    """Qt's own dialog buttons (Yes/No/Cancel…) from the qtbase_*.qm Qt ships, plus this app's strings from
    translations/bc250_bazzite_helixsr_*.qm. *lang* overrides the system locale; "en" or a missing file leaves
    the app in English. Returns the language code that ended up in use."""
    locale = QLocale(lang) if lang and lang != "en" else (QLocale.system() if not lang else QLocale("en"))
    qt_tr = QTranslator(app)
    if qt_tr.load(locale, "qtbase", "_", QLibraryInfo.path(QLibraryInfo.LibraryPath.TranslationsPath)):
        app.installTranslator(qt_tr)
    app_tr = QTranslator(app)
    if app_tr.load(locale, TRANSLATIONS_DIR.parent.name, "_", str(TRANSLATIONS_DIR)):
        app.installTranslator(app_tr)
        return app_tr.language() or locale.name().split("_")[0]
    return "en"


def main() -> int:
    parser = argparse.ArgumentParser(prog="bc250_bazzite_helixsr", description=f"{APP_NAME} {__version__}")
    parser.add_argument("--payload", metavar="DIR", default=None,
                        help=f"folder that holds the imported HelixSR release (default: {PAYLOAD_DIR})")
    parser.add_argument("--deployments", metavar="FILE", default=None,
                        help=f"JSON file that lists where HelixSR was deployed (default: {DEPLOYMENTS_FILE})")
    parser.add_argument("--work", metavar="DIR", default=None,
                        help=f"folder for downloaded HelixSR releases (default: {WORK_DIR})")
    parser.add_argument("--no-update-check", action="store_true",
                        help="do not ask GitHub for the latest releases at start (overrides the saved setting)")
    parser.add_argument("--lang", metavar="CODE", default=None, choices=sorted(LANGUAGES),
                        help="interface language (%(choices)s); default: the saved choice, else the system locale")
    parser.add_argument("--version", action="version", version=f"%(prog)s {__version__}")
    args, qt_args = parser.parse_known_args()

    app = QApplication([sys.argv[0], *qt_args])
    app.setApplicationName(APP_ID)
    app.setApplicationDisplayName(DISPLAY_NAME)
    app.setApplicationVersion(__version__)
    app.setDesktopFileName(APP_ID)
    app.setStyle("Fusion")
    saved = QSettings(APP_ID, APP_ID).value("ui/language", "", str)
    install_translators(app, args.lang or saved or None)
    RoundedToolTip.install(app)
    if WINDOW_ICON_PATH.is_file():
        app.setWindowIcon(QIcon(str(WINDOW_ICON_PATH)))

    window = MainWindow(Path(args.payload).expanduser() if args.payload else PAYLOAD_DIR,
                        Path(args.deployments).expanduser() if args.deployments else DEPLOYMENTS_FILE,
                        Path(args.work).expanduser() if args.work else WORK_DIR,
                        check_updates=False if args.no_update_check else None)
    for sig in (signal.SIGTERM, signal.SIGINT):
        signal.signal(sig, lambda *_: app.quit())
    tick = QTimer()
    tick.timeout.connect(lambda: None)      # lets Python handle signals while Qt's event loop runs
    tick.start(500)
    window.show()
    return app.exec()


if __name__ == "__main__":
    sys.exit(main())
