# SPDX-License-Identifier: GPL-3.0-or-later

"""Entry point: python -m bc250_gpu_oc_gui [--script PATH] [--lang CODE]"""

from __future__ import annotations

import argparse
import sys
from pathlib import Path

from PyQt6.QtCore import QLibraryInfo, QLocale, QTranslator
from PyQt6.QtGui import QIcon
from PyQt6.QtWidgets import QApplication, QMessageBox

from . import APP_ID, APP_NAME, HOVER_STYLESHEET, ROOT, TRANSLATIONS_DIR, WINDOW_ICON_PATH, __version__
from .main_window import MainWindow
from . import instance

DEFAULT_SCRIPT = ROOT / "bc250-gpu-oc-bisect.sh"


def _install_translators(app: QApplication, lang: str | None) -> None:
    """Qt's own dialog buttons (Yes/No/OK/Cancel/...) via the qtbase_*.qm Qt ships. The launcher's
    own strings aren't translated yet; missing translator files are silently skipped so the app
    still runs fine in English."""
    locale = QLocale(lang) if lang else QLocale.system()
    qt_tr = QTranslator(app)
    if qt_tr.load(locale, "qtbase", "_", QLibraryInfo.path(QLibraryInfo.LibraryPath.TranslationsPath)):
        app.installTranslator(qt_tr)
    app_tr = QTranslator(app)
    if app_tr.load(locale, "bc250_gpu_oc_gui", "_", str(TRANSLATIONS_DIR)):
        app.installTranslator(app_tr)


def main() -> int:
    parser = argparse.ArgumentParser(prog="bc250_gpu_oc_gui", description=f"{APP_NAME} {__version__}")
    parser.add_argument("--script", default=str(DEFAULT_SCRIPT), help="path to bc250-gpu-oc-bisect.sh")
    parser.add_argument("--lang", default=None,
                        help="force a UI language (e.g. es, fr, de, zh, ja, it, pl, ru); default: system locale")
    parser.add_argument("--version", action="version", version=f"%(prog)s {__version__}")
    args, qt_args = parser.parse_known_args()

    app = QApplication([sys.argv[0], *qt_args])
    app.setOrganizationName("bc250-gpu-oc-bisect")
    app.setApplicationName(APP_ID)
    app.setApplicationDisplayName(f"{APP_NAME} {__version__}")
    app.setApplicationVersion(__version__)
    app.setDesktopFileName(APP_ID)
    app.setStyle("Fusion")
    app.setStyleSheet(HOVER_STYLESHEET)
    if WINDOW_ICON_PATH.is_file():
        app.setWindowIcon(QIcon(str(WINDOW_ICON_PATH)))
    _install_translators(app, args.lang)

    script = Path(args.script).resolve()
    if not script.is_file():
        QMessageBox.critical(None, APP_NAME, f"bc250-gpu-oc-bisect.sh not found:\n{script}")
        return 1

    # One instance: a second launch brings the running window to the front and exits.
    if instance.already_running(APP_ID):
        return 0
    window = MainWindow(str(script))
    window.show()
    server = instance.serve(APP_ID, window)  # noqa: F841 (kept alive while the app runs)
    return app.exec()


if __name__ == "__main__":
    sys.exit(main())
