# SPDX-License-Identifier: GPL-3.0-or-later
"""Entry point: python -m bc250_portal [--manifest FILE] [--source auto|release|checkout]"""

from __future__ import annotations

import argparse
import sys
import traceback
from pathlib import Path

from PyQt6.QtWidgets import QMessageBox

from bc250_core import instance
from bc250_core.app import create_app, exec_app
from bc250_core.updates import latest_release, repo_slug

from . import APP_NAME, INFO, MANIFEST, __version__, state_dir, suite_checkout
from .main_window import MainWindow
from .manifest import ManifestError, load
from .sources import Records, Sources, http_download


def _show_error(kind, value, tb) -> None:
    text = "".join(traceback.format_exception(kind, value, tb))
    print(text, file=sys.stderr)
    QMessageBox.critical(None, APP_NAME, f"Something went wrong in the portal:\n\n{value}\n\n{text[-1500:]}")


def main() -> int:
    parser = argparse.ArgumentParser(prog="bc250_portal", description=f"{APP_NAME} {__version__}")
    parser.add_argument("--manifest", default=str(MANIFEST), help="apps.toml to use (default: the bundled one)")
    parser.add_argument("--source", choices=("auto", "release", "checkout"), default="auto",
                        help="where apps install from: the pinned GitHub releases, or the local suite checkout "
                             "(auto: the checkout when the portal runs from one)")
    parser.add_argument("--version", action="version", version=f"%(prog)s {__version__}")
    args, qt_args = parser.parse_known_args()

    app = create_app(INFO, qt_args, lang="en")
    # PyQt6 ends the whole app on an exception in a slot. The portal may be mid-install: show it and carry on.
    sys.excepthook = _show_error
    try:
        entries = load(Path(args.manifest))
    except (OSError, ManifestError) as exc:
        QMessageBox.critical(None, APP_NAME, f"The app list could not be read:\n\n{exc}")
        return 1
    checkout = suite_checkout() if args.source in ("auto", "checkout") else None
    if args.source == "checkout" and checkout is None:
        QMessageBox.critical(None, APP_NAME, "--source checkout: the portal is not running from a suite checkout.")
        return 1
    sources = Sources(state_dir() / "releases", checkout=checkout, download=http_download(INFO.user_agent))
    # One instance: a second launch brings the running window to the front and exits.
    if instance.already_running(INFO.app_id):
        return 0

    # The newest portal release on GitHub, checked once in the background; offline it simply finds nothing.
    def portal_check():
        return latest_release(repo_slug(INFO.repo_url), INFO.tag_prefix, user_agent=INFO.user_agent)

    window = MainWindow(entries, sources, Records(state_dir() / "installed.json"), portal_check=portal_check)
    window.show()
    server = instance.serve(INFO.app_id, window)  # noqa: F841 (kept alive while the app runs)
    return exec_app(app)


if __name__ == "__main__":
    sys.exit(main())
