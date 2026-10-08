# SPDX-License-Identifier: GPL-3.0-or-later
"""The suite's look: palette, state colours, the bundled Inter font and shared style sheets.

These values were hard-coded in every app; they live here now and nowhere else."""

from __future__ import annotations

import sys
from functools import lru_cache
from pathlib import Path

from PyQt6.QtGui import QFontDatabase

FONT_DIR = Path(__file__).resolve().parent / "fonts"

# Result colours, the logo's purple and the brighter purple of its circuit lines.
GREEN, ORANGE, RED, BLUE, GREY = "#2e7d32", "#ef6c00", "#c62828", "#1565c0", "#3a3f4b"
PURPLE = "#6a1b9a"
ACCENT = "#8b4fd8"
YELLOW = "#fdd835"                      # "running": never confused with a failed (red) state
ACTIVE_RED, ACTIVE_RED_HOVER = "#8b0000", "#a00000"
STATE_COLORS = {"ok": GREEN, "warn": ORANGE, "bad": RED, "info": BLUE, "neutral": GREY}

# Accent outline on hover for every input control (the bisect and unlock GUIs apply it app-wide).
HOVER_STYLESHEET = (
    "QPushButton:hover, QCheckBox:hover, QComboBox:hover, QSpinBox:hover, QLineEdit:hover {"
    f"  border: 1px solid {ACCENT};"
    "   border-radius: 6px;"
    "}"
)


def load_fonts(font_dir: Path = FONT_DIR) -> set[str]:
    """Register the bundled Inter TTFs with Qt; returns the font families that were added."""
    families: set[str] = set()
    for ttf in sorted(font_dir.glob("Inter-*.ttf")):
        font_id = QFontDatabase.addApplicationFont(str(ttf))
        if font_id >= 0:
            families.update(QFontDatabase.applicationFontFamilies(font_id))
    return families


@lru_cache(maxsize=1)
def header_font() -> str:
    """CSS font-family for titles and metric boxes. macOS uses SF Pro, which has a real heavy weight;
    elsewhere the bundled Inter (SIL OFL) gives the same look instead of a thinner fallback."""
    if sys.platform == "darwin":
        return ""
    return "font-family:'Inter';" if "Inter" in load_fonts() else ""
