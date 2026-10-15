# SPDX-License-Identifier: GPL-3.0-or-later
"""The Help view. The content stays in each app: it builds the HTML and fills paths and URLs in with text.fill()
(the pattern from helixsr)."""

from __future__ import annotations

from PyQt6.QtWidgets import QTextBrowser, QWidget


class HelpView(QTextBrowser):
    """Read-only help HTML; links open in the system browser."""

    def __init__(self, html: str = "", parent: QWidget | None = None):
        super().__init__(parent)
        self.setOpenExternalLinks(True)
        if html:
            self.setHtml(html)
