# SPDX-License-Identifier: GPL-3.0-or-later
"""The app's look: the gold of its icon (owner, 16-10-2026) in place of core's purple and the former blue. The
header's boxes and the Settings box are a dark gold that keeps white text readable; outlines, the selected card and
the controller test's dots take the icon's bright gold."""

from __future__ import annotations

from PyQt6.QtCore import Qt
from PyQt6.QtWidgets import QPushButton

GOLD = "#86650F"                        # the boxes: white text on it reads at 5.4:1
GOLD_HOVER = "#A07D13"
GOLD_PRESSED = "#6B510C"
GOLD_BRIGHT = "#D09F0C"                 # the icon's highlights: outlines and marks


def accent_button(text: str, tooltip: str = "") -> QPushButton:
    """The page's main action, outlined in the bright gold (core's accent_button in the app's colour)."""
    button = QPushButton(text)
    button.setToolTip(tooltip)
    button.setMinimumHeight(36)
    button.setCursor(Qt.CursorShape.PointingHandCursor)
    button.setStyleSheet(f"QPushButton {{ border:2px solid {GOLD_BRIGHT}; border-radius:6px; padding:4px 16px; "
                         "font-weight:700; }"
                         "QPushButton:disabled { border-color:palette(mid); color:palette(mid); }")
    return button
