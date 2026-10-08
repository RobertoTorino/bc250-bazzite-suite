# SPDX-License-Identifier: GPL-3.0-or-later
"""Entry point: python -m bc250_governor [--backend auto|smu|tt] [--config PATH] [--profile NAME | --list-profiles]

One instance per user: a second launch tells the running one to show its window (or to apply --profile) and
exits, which is what makes `--profile` usable as a desktop hotkey command."""

from __future__ import annotations

import argparse
import signal
import sys

from PyQt6.QtCore import QLibraryInfo, QLocale, QTimer, QTranslator
from PyQt6.QtGui import QIcon
from PyQt6.QtWidgets import QApplication

from . import APP_ID, APP_NAME, DISPLAY_NAME, TRANSLATIONS_DIR, WINDOW_ICON_PATH, __version__
from .backends import BACKENDS, detect_backend
from . import instance
from .main_window import MainWindow
from .profiles import ProfileStore
from .tray import TRAY_FLAG
from .widgets import RoundedToolTip

LANGUAGES = ("de", "es", "fr", "it", "ja", "pl", "ru", "zh")


def _install_translators(app: QApplication, lang: str | None) -> None:
    """Qt's own dialog buttons (Yes/No/OK/Cancel/...) via the qtbase_*.qm Qt ships, plus our own strings
    via translations/bc250_governor_*.qm. Both are compiled .qm files; missing ones are silently skipped,
    so the app still runs fine in English."""
    locale = QLocale(lang) if lang else QLocale.system()
    qt_tr = QTranslator(app)
    if qt_tr.load(locale, "qtbase", "_", QLibraryInfo.path(QLibraryInfo.LibraryPath.TranslationsPath)):
        app.installTranslator(qt_tr)
    app_tr = QTranslator(app)
    if app_tr.load(locale, "bc250_governor", "_", str(TRANSLATIONS_DIR)):
        app.installTranslator(app_tr)


def main() -> int:
    parser = argparse.ArgumentParser(prog="bc250_governor", description=f"{APP_NAME} {__version__}")
    parser.add_argument("--backend", choices=("auto", *BACKENDS), default="auto",
                        help="governor to manage: smu (cyan-skillfish-governor-smu, the default), tt "
                             "(cyan-skillfish-governor-tt) or auto: whichever systemd unit is loaded (default: auto)")
    parser.add_argument("--config", default=None,
                        help="path of the governor's config.toml (default: the backend's /etc/… path; "
                             "another path is useful for development)")
    parser.add_argument(TRAY_FLAG, action="store_true",
                        help="start hidden with only the tray icon (used by the login autostart entry)")
    parser.add_argument("--profile", metavar="NAME", default=None,
                        help="apply the saved profile NAME (in the running instance if there is one, otherwise "
                             "start and apply); meant for a desktop keyboard shortcut")
    parser.add_argument("--list-profiles", action="store_true", help="print the saved profile names and exit")
    parser.add_argument("--lang", default=None, metavar="CODE",
                        help=f"force a UI language ({', '.join(LANGUAGES)}); default: the system locale")
    parser.add_argument("--version", action="version", version=f"%(prog)s {__version__}")
    args, qt_args = parser.parse_known_args()

    if args.list_profiles:
        print("\n".join(ProfileStore().names()))
        return 0

    app = QApplication([sys.argv[0], *qt_args])
    request = instance.PROFILE + args.profile if args.profile else instance.SHOW
    if instance.forward(request):
        if args.profile:
            print(f"Profile '{args.profile}' handed to the running {APP_NAME}")
        return 0
    app.setApplicationName(APP_ID)
    app.setApplicationDisplayName(DISPLAY_NAME)
    app.setApplicationVersion(__version__)
    app.setDesktopFileName(APP_ID)
    app.setStyle("Fusion")
    _install_translators(app, args.lang)
    RoundedToolTip.install(app)     # every tooltip: rounded corners, thin purple border
    if WINDOW_ICON_PATH.is_file():
        app.setWindowIcon(QIcon(str(WINDOW_ICON_PATH)))

    window = MainWindow(detect_backend(args.backend, args.config))
    server = instance.InstanceServer(window)
    server.received.connect(window.handle_request)
    if server.listen():
        window.instance_server = server
    # Logout or SIGTERM/SIGINT end the app without a close event; let Python handle the signals.
    for sig in (signal.SIGTERM, signal.SIGINT):
        signal.signal(sig, lambda *_: app.quit())
    tick = QTimer()
    tick.timeout.connect(lambda: None)      # lets Python handle signals while Qt's event loop runs
    tick.start(500)
    if args.start_in_tray and window.tray is not None:
        window.tray.sync_toggle()       # window stays hidden; the tray icon is the only sign of life
    else:
        window.show()
    if args.profile:
        QTimer.singleShot(0, lambda: window.apply_profile_by_name(args.profile))
    return app.exec()


if __name__ == "__main__":
    sys.exit(main())
