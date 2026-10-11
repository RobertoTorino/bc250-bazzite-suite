# SPDX-License-Identifier: GPL-3.0-or-later
from __future__ import annotations

import sys

from PyQt6.QtWidgets import QApplication

from . import APP_NAME
from .main_window import MainWindow


def main() -> int:
    app = QApplication(sys.argv)
    app.setApplicationName(APP_NAME)
    window = MainWindow()
    window.show()
    return app.exec()


if __name__ == "__main__":
    sys.exit(main())
