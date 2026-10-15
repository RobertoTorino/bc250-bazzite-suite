# SPDX-License-Identifier: GPL-3.0-or-later
"""The app's look: one indigo, #4F34C9 (from RPCS3's own logo), on core's widgets. The style sheet goes on the main
window, so everything in it takes the indigo and the rest of the suite keeps core's purple."""

from __future__ import annotations

from PyQt6.QtCore import Qt
from PyQt6.QtGui import QColor, QPalette
from PyQt6.QtWidgets import QLabel, QPushButton, QWidget

INDIGO = "#4F34C9"
INDIGO_HOVER = "#6650D6"
INDIGO_PRESSED = "#3E28A3"
INDIGO_TINT = "#1A4F34C9"               # #AARRGGBB: 10 % indigo, for hover and every other table row
INDIGO_LINE = "#594F34C9"               # 35 % indigo, for outlines
LINK_ON_DARK = "#9C8CF0"                # #4F34C9 is too dark to read as a link on a dark window
DISABLED = "#80808080"                  # 50 % grey: a disabled button, readable as such on light and dark

STYLESHEET = f"""
QPushButton {{ border:1px solid {INDIGO_LINE}; border-radius:6px; padding:5px 14px; background:palette(button); }}
QPushButton:hover {{ border-color:{INDIGO}; background:{INDIGO_TINT}; }}
QPushButton:pressed {{ background:{INDIGO_LINE}; }}
QPushButton:disabled {{ color:{DISABLED}; border-color:{DISABLED}; background:palette(window); }}
QPushButton[primary="true"] {{ background:{INDIGO}; border-color:{INDIGO}; color:white; font-weight:700;
                               padding:5px 18px; }}
QPushButton[primary="true"]:hover {{ background:{INDIGO_HOVER}; border-color:{INDIGO_HOVER}; }}
QPushButton[primary="true"]:pressed {{ background:{INDIGO_PRESSED}; border-color:{INDIGO_PRESSED}; }}
QPushButton[primary="true"]:disabled {{ background:palette(window); border-color:{DISABLED};
                                        color:{DISABLED}; }}
QLabel[step="true"] {{ background:{INDIGO}; color:white; font-weight:800; border-radius:12px; }}
QTableWidget {{ border:1px solid {INDIGO_LINE}; border-radius:6px; gridline-color:{INDIGO_TINT};
                alternate-background-color:{INDIGO_TINT}; selection-background-color:{INDIGO};
                selection-color:white; }}
QHeaderView::section {{ background:{INDIGO}; color:white; font-weight:700; border:none;
                        border-right:1px solid {INDIGO_HOVER}; padding:5px 8px; }}
QPlainTextEdit {{ border:1px solid {INDIGO_LINE}; border-radius:6px; }}
"""


def apply(window: QWidget) -> None:
    """The style sheet, and the indigo as the window's selection colour."""
    window.setStyleSheet(STYLESHEET)
    palette = window.palette()
    palette.setColor(QPalette.ColorRole.Highlight, QColor(INDIGO))
    palette.setColor(QPalette.ColorRole.HighlightedText, QColor("white"))
    window.setPalette(palette)


def link(widget: QWidget, url: str, text: str) -> str:
    """A link in rich text, in the indigo (lighter on a dark window). Coloured in the HTML: a QLabel under a style
    sheet draws links in the default blue, whatever its palette says."""
    dark = widget.palette().color(QPalette.ColorRole.Window).lightness() < 128
    return f"<a href='{url}' style='color:{LINK_ON_DARK if dark else INDIGO};'>{text}</a>"


def primary_button(text: str, tooltip: str = "") -> QPushButton:
    """A main action, filled indigo (in place of core's accent_button, outlined in the suite's purple)."""
    button = QPushButton(text)
    button.setToolTip(tooltip)
    button.setProperty("primary", True)
    button.setCursor(Qt.CursorShape.PointingHandCursor)
    return button


def step_badge(number: int) -> QLabel:
    """The number of a step in an indigo circle."""
    badge = QLabel(str(number))
    badge.setProperty("step", True)
    badge.setFixedSize(24, 24)
    badge.setAlignment(Qt.AlignmentFlag.AlignCenter)
    return badge
