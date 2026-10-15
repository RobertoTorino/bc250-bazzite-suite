# SPDX-License-Identifier: GPL-3.0-or-later
"""The app's look: one teal, #0E7490 (its own among the managers: RPCS3's is indigo, PPSSPP's blue), on core's
widgets. The style sheet goes on the main window, so everything in it takes the teal and the rest of the suite
keeps core's purple."""

from __future__ import annotations

from PyQt6.QtCore import Qt
from PyQt6.QtGui import QColor, QPalette
from PyQt6.QtWidgets import QLabel, QPushButton, QWidget

TEAL = "#0E7490"
TEAL_HOVER = "#2A94B4"
TEAL_PRESSED = "#0A5A70"
TEAL_TINT = "#1A0E7490"                 # #AARRGGBB: 10 % blue, for hover and every other table row
TEAL_LINE = "#590E7490"                 # 35 % blue, for outlines
LINK_ON_DARK = "#6CC5DC"                # #0E7490 is too dark to read as a link on a dark window
DISABLED = "#80808080"                  # 50 % grey: a disabled button, readable as such on light and dark

STYLESHEET = f"""
QPushButton {{ border:1px solid {TEAL_LINE}; border-radius:6px; padding:5px 14px; background:palette(button); }}
QPushButton:hover {{ border-color:{TEAL}; background:{TEAL_TINT}; }}
QPushButton:pressed {{ background:{TEAL_LINE}; }}
QPushButton:disabled {{ color:{DISABLED}; border-color:{DISABLED}; background:palette(window); }}
QPushButton[primary="true"] {{ background:{TEAL}; border-color:{TEAL}; color:white; font-weight:700;
                               padding:5px 18px; }}
QPushButton[primary="true"]:hover {{ background:{TEAL_HOVER}; border-color:{TEAL_HOVER}; }}
QPushButton[primary="true"]:pressed {{ background:{TEAL_PRESSED}; border-color:{TEAL_PRESSED}; }}
QPushButton[primary="true"]:disabled {{ background:palette(window); border-color:{DISABLED};
                                        color:{DISABLED}; }}
QLabel[step="true"] {{ background:{TEAL}; color:white; font-weight:800; border-radius:12px; }}
QTableWidget {{ border:1px solid {TEAL_LINE}; border-radius:6px; gridline-color:{TEAL_TINT};
                alternate-background-color:{TEAL_TINT}; selection-background-color:{TEAL};
                selection-color:white; }}
QHeaderView::section {{ background:{TEAL}; color:white; font-weight:700; border:none;
                        border-right:1px solid {TEAL_HOVER}; padding:5px 8px; }}
QPlainTextEdit {{ border:1px solid {TEAL_LINE}; border-radius:6px; }}
"""


def apply(window: QWidget) -> None:
    """The style sheet, and the teal as the window's selection colour."""
    window.setStyleSheet(STYLESHEET)
    palette = window.palette()
    palette.setColor(QPalette.ColorRole.Highlight, QColor(TEAL))
    palette.setColor(QPalette.ColorRole.HighlightedText, QColor("white"))
    window.setPalette(palette)


def link(widget: QWidget, url: str, text: str) -> str:
    """A link in rich text, in the teal (lighter on a dark window). Coloured in the HTML: a QLabel under a style
    sheet draws links in the default blue, whatever its palette says."""
    dark = widget.palette().color(QPalette.ColorRole.Window).lightness() < 128
    return f"<a href='{url}' style='color:{LINK_ON_DARK if dark else TEAL};'>{text}</a>"


def primary_button(text: str, tooltip: str = "") -> QPushButton:
    """A main action, filled blue (in place of core's accent_button, outlined in the suite's purple)."""
    button = QPushButton(text)
    button.setToolTip(tooltip)
    button.setProperty("primary", True)
    button.setCursor(Qt.CursorShape.PointingHandCursor)
    return button


def step_badge(number: int) -> QLabel:
    """The number of a step in a teal circle."""
    badge = QLabel(str(number))
    badge.setProperty("step", True)
    badge.setFixedSize(24, 24)
    badge.setAlignment(Qt.AlignmentFlag.AlignCenter)
    return badge
