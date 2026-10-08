# SPDX-License-Identifier: GPL-3.0-or-later
"""The Help page shell. The content stays in each app: it builds the HTML from translated paragraphs and fills
paths/URLs afterwards with text.fill(), so translators never see them (the pattern from helixsr)."""

from __future__ import annotations

from collections.abc import Mapping

from PyQt6.QtCore import pyqtSignal
from PyQt6.QtWidgets import QComboBox, QHBoxLayout, QLabel, QTextBrowser, QVBoxLayout, QWidget


class HelpView(QTextBrowser):
    """Read-only help HTML; links open in the system browser."""

    def __init__(self, html: str = "", parent: QWidget | None = None):
        super().__init__(parent)
        self.setOpenExternalLinks(True)
        if html:
            self.setHtml(html)


class HelpPage(QWidget):
    """The help text with a language picker above it. The choice is saved by the app (language_changed) and
    applied at the next start: Qt widgets built with tr() do not re-translate themselves while they are shown."""

    language_changed = pyqtSignal(str)                                  # "" = follow the system locale

    def __init__(self, html: str, languages: Mapping[str, str], current: str = "", parent: QWidget | None = None):
        super().__init__(parent)
        layout = QVBoxLayout(self)
        layout.setContentsMargins(0, 0, 0, 0)
        row = QHBoxLayout()
        row.addWidget(QLabel(self.tr("Language:")))
        self.language = QComboBox()
        self.language.addItem(self.tr("System default"), "")
        for code, name in languages.items():
            self.language.addItem(name, code)
        index = self.language.findData(current) if current else 0
        self.language.setCurrentIndex(max(index, 0))
        self.language.setToolTip(self.tr("Saved for the next start; the interface is built once in the language "
                                         "that is active then."))
        row.addWidget(self.language)
        self.restart_hint = QLabel(self.tr("Takes effect after a restart."))
        self.restart_hint.setVisible(False)
        row.addWidget(self.restart_hint)
        row.addStretch(1)
        layout.addLayout(row)
        self.view = HelpView(html)
        layout.addWidget(self.view, 1)
        self.language.currentIndexChanged.connect(self._picked)

    def _picked(self, index: int) -> None:
        self.restart_hint.setVisible(True)
        self.language_changed.emit(self.language.itemData(index) or "")
