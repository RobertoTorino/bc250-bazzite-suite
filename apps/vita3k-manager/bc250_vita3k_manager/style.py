# SPDX-License-Identifier: GPL-3.0-or-later
"""The app's look: one crimson, #BD1550 (from Vita3K's own logo), on core's widgets. The style sheet goes on the main
window, so everything in it takes the crimson and the rest of the suite keeps core's purple."""

from __future__ import annotations

from PyQt6.QtCore import Qt
from PyQt6.QtGui import QColor, QPalette
from PyQt6.QtWidgets import QLabel, QPushButton, QWidget

CRIMSON = "#BD1550"
CRIMSON_HOVER = "#CF3A6C"
CRIMSON_PRESSED = "#981042"
CRIMSON_TINT = "#1ABD1550"              # #AARRGGBB: 10 % crimson, for hover and every other table row
CRIMSON_LINE = "#59BD1550"              # 35 % crimson, for outlines
LINK_ON_DARK = "#F07AA4"                # #BD1550 is too dark to read as a link on a dark window
DISABLED = "#80808080"                  # 50 % grey: a disabled button, readable as such on light and dark

STYLESHEET = f"""
QPushButton {{ border:1px solid {CRIMSON_LINE}; border-radius:6px; padding:5px 14px; background:palette(button); }}
QPushButton:hover {{ border-color:{CRIMSON}; background:{CRIMSON_TINT}; }}
QPushButton:pressed {{ background:{CRIMSON_LINE}; }}
QPushButton:disabled {{ color:{DISABLED}; border-color:{DISABLED}; background:palette(window); }}
QPushButton[primary="true"] {{ background:{CRIMSON}; border-color:{CRIMSON}; color:white; font-weight:700;
                               padding:5px 18px; }}
QPushButton[primary="true"]:hover {{ background:{CRIMSON_HOVER}; border-color:{CRIMSON_HOVER}; }}
QPushButton[primary="true"]:pressed {{ background:{CRIMSON_PRESSED}; border-color:{CRIMSON_PRESSED}; }}
QPushButton[primary="true"]:disabled {{ background:palette(window); border-color:{DISABLED};
                                        color:{DISABLED}; }}
QLabel[step="true"] {{ background:{CRIMSON}; color:white; font-weight:800; border-radius:12px; }}
QTableWidget {{ border:1px solid {CRIMSON_LINE}; border-radius:6px; gridline-color:{CRIMSON_TINT};
                alternate-background-color:{CRIMSON_TINT}; selection-background-color:{CRIMSON};
                selection-color:white; }}
QHeaderView::section {{ background:{CRIMSON}; color:white; font-weight:700; border:none;
                        border-right:1px solid {CRIMSON_HOVER}; padding:5px 8px; }}
QPlainTextEdit {{ border:1px solid {CRIMSON_LINE}; border-radius:6px; }}
"""


def apply(window: QWidget) -> None:
    """The style sheet, and the crimson as the window's selection colour."""
    window.setStyleSheet(STYLESHEET)
    palette = window.palette()
    palette.setColor(QPalette.ColorRole.Highlight, QColor(CRIMSON))
    palette.setColor(QPalette.ColorRole.HighlightedText, QColor("white"))
    window.setPalette(palette)


def link(widget: QWidget, url: str, text: str) -> str:
    """A link in rich text, in the crimson (lighter on a dark window). Coloured in the HTML: a QLabel under a style
    sheet draws links in the default blue, whatever its palette says."""
    dark = widget.palette().color(QPalette.ColorRole.Window).lightness() < 128
    return f"<a href='{url}' style='color:{LINK_ON_DARK if dark else CRIMSON};'>{text}</a>"


def primary_button(text: str, tooltip: str = "") -> QPushButton:
    """A main action, filled crimson (in place of core's accent_button, outlined in the suite's purple)."""
    button = QPushButton(text)
    button.setToolTip(tooltip)
    button.setProperty("primary", True)
    button.setCursor(Qt.CursorShape.PointingHandCursor)
    return button


def step_badge(number: int) -> QLabel:
    """The number of a step in an crimson circle."""
    badge = QLabel(str(number))
    badge.setProperty("step", True)
    badge.setFixedSize(24, 24)
    badge.setAlignment(Qt.AlignmentFlag.AlignCenter)
    return badge
