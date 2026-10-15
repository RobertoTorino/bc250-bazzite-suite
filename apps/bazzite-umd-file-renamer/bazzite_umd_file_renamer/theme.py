# SPDX-License-Identifier: GPL-3.0-or-later
"""The metallic blue look of the C++ app: Fusion style, a dark blue palette and the stylesheet. Port of
``applyMetallicBlueTheme`` in ``qt/src/main.cpp``."""

from __future__ import annotations

from PyQt6.QtGui import QColor, QPalette
from PyQt6.QtWidgets import QApplication

STYLE_SHEET = """
    QMainWindow {
        background: qlineargradient(x1:0, y1:0, x2:1, y2:1,
                                    stop:0 #061321,
                                    stop:0.55 #0A2237,
                                    stop:1 #05111E);
        color: #D9F4FF;
    }

    QWidget#centralRoot {
        background: qlineargradient(x1:0, y1:0, x2:1, y2:1,
                                    stop:0 #0A1D30,
                                    stop:0.5 #0D2840,
                                    stop:1 #0A1C2F);
        border: 1px solid #4E80B4;
        border-radius: 14px;
    }

    QWidget#topPanel {
        background: qlineargradient(x1:0, y1:0, x2:1, y2:0,
                                    stop:0 #12314C,
                                    stop:0.5 #1D4C73,
                                    stop:1 #143552);
        border: 1px solid #5C93C6;
        border-radius: 10px;
    }

    QGroupBox {
        border: 1px solid #4E80B4;
        border-radius: 10px;
        margin-top: 10px;
        padding-top: 10px;
        background: qlineargradient(x1:0, y1:0, x2:0, y2:1,
                                    stop:0 #102840,
                                    stop:1 #0B1E31);
    }

    QGroupBox::title {
        subcontrol-origin: margin;
        left: 10px;
        padding: 0 5px;
        color: #BDEEFF;
    }

    QLabel {
        color: #D9F4FF;
        background: transparent;
    }

    QLineEdit, QComboBox, QMenu {
        background-color: #0A1B2D;
        color: #D9F4FF;
        border: 1px solid #4E80B4;
        border-radius: 8px;
        padding: 4px 6px;
        selection-background-color: #2E6FA7;
        selection-color: #FFFFFF;
    }

    QComboBox::drop-down {
        border: none;
        width: 18px;
        background: transparent;
    }

    QComboBox QAbstractItemView, QMenu {
        background-color: #0A1B2D;
        color: #D9F4FF;
        selection-background-color: #2E6FA7;
        selection-color: #FFFFFF;
        border: 1px solid #4E80B4;
        border-radius: 8px;
    }

    QTableWidget {
        background: qlineargradient(x1:0, y1:0, x2:0, y2:1,
                                    stop:0 #0B2136,
                                    stop:1 #091A2B);
        border: 1px solid #4E80B4;
        border-radius: 10px;
        gridline-color: #355C82;
        alternate-background-color: #0B2134;
        color: #D9F4FF;
    }

    QHeaderView::section {
        background: qlineargradient(x1:0, y1:0, x2:0, y2:1,
                                    stop:0 #2D6FA2,
                                    stop:1 #18456D);
        color: #D9F4FF;
        padding: 6px;
        border: 1px solid #5A95CA;
    }

    QHeaderView::section:first {
        border-top-left-radius: 10px;
    }

    QHeaderView::section:last {
        border-top-right-radius: 10px;
    }

    QHeaderView::up-arrow, QHeaderView::down-arrow {
        width: 0px;
        height: 0px;
        image: none;
    }

    QTableWidget::item:selected {
        background-color: #265F93;
        color: #FFFFFF;
    }

    QPushButton, QToolButton {
        background: qlineargradient(x1:0, y1:0, x2:0, y2:1,
                                    stop:0 #2E6FA4,
                                    stop:1 #18476F);
        color: #D9F4FF;
        border: 1px solid #7CC2FF;
        border-radius: 8px;
        padding: 6px 10px;
    }

    QPushButton:hover, QToolButton:hover {
        background: qlineargradient(x1:0, y1:0, x2:0, y2:1,
                                    stop:0 #3D84BC,
                                    stop:1 #1F5C8D);
    }

    QPushButton:pressed, QToolButton:pressed {
        background: #113450;
    }

    QPushButton:disabled, QToolButton:disabled {
        color: #7A93A8;
        background-color: #0A1A2A;
        border-color: #3A5875;
    }

    QMenu::item {
        padding: 6px 12px;
        border-radius: 6px;
    }

    QMenu::item:selected {
        background-color: #265F93;
    }
"""


def apply_metallic_blue_theme(app: QApplication) -> None:
    app.setStyle("Fusion")

    window_bg = QColor("#071726")
    panel_bg = QColor("#0C2035")
    control_bg = QColor("#0A1B2D")
    border = QColor("#4E80B4")
    text = QColor("#D9F4FF")
    muted_text = QColor("#7FA6BF")
    accent = QColor("#2E6FA7")
    accent_light = QColor("#64B7FF")

    palette = QPalette()
    role = QPalette.ColorRole
    palette.setColor(role.Window, window_bg)
    palette.setColor(role.WindowText, text)
    palette.setColor(role.Base, control_bg)
    palette.setColor(role.AlternateBase, panel_bg)
    palette.setColor(role.ToolTipBase, text)
    palette.setColor(role.ToolTipText, window_bg)
    palette.setColor(role.Text, text)
    palette.setColor(role.Button, panel_bg)
    palette.setColor(role.ButtonText, text)
    palette.setColor(role.BrightText, accent_light)
    palette.setColor(role.Highlight, accent)
    palette.setColor(role.HighlightedText, QColor("#FFFFFF"))
    palette.setColor(role.Light, QColor("#7BB4E8"))
    palette.setColor(role.Mid, border)
    palette.setColor(role.Dark, window_bg.darker(150))
    palette.setColor(role.Midlight, QColor("#3C6B99"))
    palette.setColor(role.PlaceholderText, muted_text)
    app.setPalette(palette)
    app.setStyleSheet(STYLE_SHEET)
