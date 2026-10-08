# SPDX-License-Identifier: GPL-3.0-or-later
"""App bootstrap shared by every GUI: QApplication names, Fusion style, translators, tooltip, icon, signals.

    def main() -> int:
        app = create_app(INFO, qt_args, lang=args.lang)
        window = MainWindow()
        window.show()
        return exec_app(app)

or run_app(INFO, MainWindow) when the app has no arguments of its own."""

from __future__ import annotations

import signal
import sys
from collections.abc import Callable, Sequence
from pathlib import Path

from PyQt6.QtCore import QLibraryInfo, QLocale, QTimer, QTranslator
from PyQt6.QtGui import QIcon
from PyQt6.QtWidgets import QApplication, QWidget

from . import appinfo
from .appinfo import AppInfo
from .widgets import RoundedToolTip

CORE_TRANSLATIONS_DIR = Path(__file__).resolve().parent / "translations"
CORE_CATALOG = "bc250_core"


def _locale(lang: str | None) -> QLocale:
    if not lang:
        return QLocale.system()
    return QLocale("en") if lang == "en" else QLocale(lang)


def install_translators(app: QApplication, info: AppInfo, lang: str | None = None) -> str:
    """Qt's own dialog buttons (Yes/No/Cancel…) from the qtbase_*.qm Qt ships, core's strings from
    bc250_core_*.qm and the app's from <catalog>_*.qm. *lang* overrides the system locale; "en" or a missing file
    leaves the app in English. Missing files are skipped silently. Returns the app language that ended up in use."""
    locale = _locale(lang)
    qt_tr = QTranslator(app)
    if qt_tr.load(locale, "qtbase", "_", QLibraryInfo.path(QLibraryInfo.LibraryPath.TranslationsPath)):
        app.installTranslator(qt_tr)
    core_tr = QTranslator(app)
    if core_tr.load(locale, CORE_CATALOG, "_", str(CORE_TRANSLATIONS_DIR)):
        app.installTranslator(core_tr)
    if info.catalog and info.translations_dir is not None:
        app_tr = QTranslator(app)
        if app_tr.load(locale, info.catalog, "_", str(info.translations_dir)):
            app.installTranslator(app_tr)
            return app_tr.language().split("_")[0] or locale.name().split("_")[0]
    return "en"


def create_app(info: AppInfo, qt_args: Sequence[str] = (), lang: str | None = None,
               stylesheet: str = "") -> QApplication:
    """The QApplication with the app's names, style, translators, rounded tooltips and window icon. Also makes
    *info* the current AppInfo. The org/app names match open_settings(), so bare QSettings() find the same file.
    The organisation is only set when the app declares one (the bisect/unlock GUIs), as before the move to core."""
    appinfo.set_current(info)
    app = QApplication.instance() or QApplication([sys.argv[0], *qt_args])
    if info.settings_org:
        app.setOrganizationName(info.settings_org)
    app.setApplicationName(info.settings_name)
    app.setApplicationDisplayName(info.display_name)
    app.setApplicationVersion(info.version)
    app.setDesktopFileName(info.app_id)
    app.setStyle("Fusion")
    install_translators(app, info, lang)
    RoundedToolTip.install(app)     # every tooltip: rounded corners, thin purple border
    if stylesheet:
        app.setStyleSheet(stylesheet)
    if info.logo is not None and info.logo.is_file():
        app.setWindowIcon(QIcon(str(info.logo)))
    return app


def exec_app(app: QApplication) -> int:
    """app.exec(), but logout or SIGTERM/SIGINT quit the app cleanly instead of killing it mid-event."""
    for sig in (signal.SIGTERM, signal.SIGINT):
        signal.signal(sig, lambda *_: app.quit())
    tick = QTimer()
    tick.timeout.connect(lambda: None)      # lets Python handle signals while Qt's event loop runs
    tick.start(500)
    return app.exec()


def run_app(info: AppInfo, window_factory: Callable[[], QWidget], qt_args: Sequence[str] = (),
            lang: str | None = None, stylesheet: str = "") -> int:
    app = create_app(info, qt_args, lang, stylesheet)
    window = window_factory()
    window.show()
    return exec_app(app)
