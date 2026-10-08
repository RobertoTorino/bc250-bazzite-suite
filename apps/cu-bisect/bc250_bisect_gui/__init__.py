"""PyQt6 front-end for bc250-cu-bisect.sh: a menu-driven launcher for the initial setup/start of a
bisect run. It only assembles the command line and starts it in a terminal; the actual bisecting
still happens in bc250-cu-bisect.sh itself, exactly as if typed by hand."""

APP_NAME = "BC-250 CU Bisect"
APP_ID = "bc250-cu-bisect-gui"
__version__ = "0.1.0"

from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
LOGO_PATH = ROOT / "images" / "bc250-cu-bisect.png"
WINDOW_ICON_PATH = LOGO_PATH
TRANSLATIONS_DIR = Path(__file__).resolve().parent / "translations"
REPO_URL = "https://github.com/RobertoTorino/bc250-cu-bisect"

# Bazzite purple, the accent used across the project's GUIs. Applied app-wide (see __main__.py)
# so every window gets it, including popups/dialogs (About, Help, confirmation message boxes),
# not just the main window.
BAZZITE_PURPLE = "#8b4fd8"
HOVER_STYLESHEET = (
    "QPushButton:hover, QCheckBox:hover, QComboBox:hover, QSpinBox:hover, QLineEdit:hover {"
    f"  border: 1px solid {BAZZITE_PURPLE};"
    "   border-radius: 6px;"
    "}"
)


def window_title(part: str) -> str:
    """Title of a secondary window. On Linux/Windows Qt appends " — <display name>" itself."""
    import sys
    return f"{APP_NAME} — {part}" if sys.platform == "darwin" else part
