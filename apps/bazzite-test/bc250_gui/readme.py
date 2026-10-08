# SPDX-License-Identifier: GPL-3.0-or-later
"""README viewer: renders README.md, the user guide (and the other .md files it links to) inside the app."""

from __future__ import annotations

import re
from pathlib import Path

from PyQt6.QtCore import QUrl
from PyQt6.QtGui import QDesktopServices, QTextCursor, QTextDocument
from PyQt6.QtWidgets import QHBoxLayout, QPushButton, QTextBrowser, QVBoxLayout, QWidget

DOCS_DIR = Path(__file__).resolve().parent.parent
README_PATH = DOCS_DIR / "README.md"

# Qt's Markdown import gives tables no borders and code no background; this restyles the HTML it produces.
_CSS = """
body { font-size: 14px; }
h1 { font-size: 26px; } h2 { font-size: 21px; margin-top: 22px; } h3 { font-size: 17px; margin-top: 16px; }
table { border-collapse: collapse; margin: 6px 0 12px 0; }
th { background: #3a3f4b; color: white; padding: 5px 8px; text-align: left; }
td { border: 1px solid #888; padding: 4px 8px; }
pre { background: #1e1f24; color: #e8e8e8; padding: 8px; font-family: monospace; }
code { background: rgba(127,127,127,0.18); font-family: monospace; }
"""


class ReadmeView(QWidget):
    def __init__(self, path: Path = README_PATH, parent: QWidget | None = None):
        super().__init__(parent)
        layout = QVBoxLayout(self)
        layout.setContentsMargins(0, 0, 0, 0)

        bar = QHBoxLayout()
        self.back = QPushButton("◀  Back")
        self.back.setToolTip("Back to the previous document (after following a link to another .md file).")
        self.back.clicked.connect(self._go_back)
        bar.addWidget(self.back)
        bar.addStretch(1)
        external = QPushButton("Open in editor")
        external.setToolTip("Open the Markdown file in the default application.")
        external.clicked.connect(lambda: QDesktopServices.openUrl(QUrl.fromLocalFile(str(self._current))))
        bar.addWidget(external)
        layout.addLayout(bar)

        self.browser = QTextBrowser()
        self.browser.setOpenLinks(False)
        self.browser.anchorClicked.connect(self._follow)
        self.back.setEnabled(False)
        layout.addWidget(self.browser, 1)
        self._history: list[Path] = []
        self._current = path
        self.load(path)

    def load(self, path: Path, push: bool = False) -> None:
        if push:
            self._history.append(self._current)
        self._current = path
        try:
            text = path.read_text(encoding="utf-8")
        except OSError as exc:
            self.browser.setPlainText(f"Could not read {path}: {exc}")
            return
        doc = QTextDocument(self.browser)
        doc.setMetaInformation(QTextDocument.MetaInformation.DocumentUrl, QUrl.fromLocalFile(str(path)).toString())
        doc.setBaseUrl(QUrl.fromLocalFile(str(path.parent) + "/"))
        doc.setMarkdown(text, QTextDocument.MarkdownFeature.MarkdownDialectGitHub)
        html = doc.toHtml()
        doc.setDefaultStyleSheet(_CSS)
        doc.setHtml(html)
        self.browser.setDocument(doc)
        self.back.setEnabled(bool(self._history))

    def _follow(self, url: QUrl) -> None:
        if url.scheme() in ("http", "https", "mailto"):
            QDesktopServices.openUrl(url)
            return
        if not url.path() and url.fragment():
            self._scroll_to_heading(url.fragment())
            return
        target = (self._current.parent / url.path()).resolve() if not url.isLocalFile() else Path(url.toLocalFile())
        if target.suffix.lower() == ".md" and target.is_file():
            self.load(target, push=True)
        elif target.exists():
            QDesktopServices.openUrl(QUrl.fromLocalFile(str(target)))

    def _scroll_to_heading(self, fragment: str) -> None:
        """GitHub-style #anchor -> the heading with that slug (Qt's Markdown import adds no anchors)."""
        slug = lambda t: re.sub(r"[^\w\- ]", "", t.lower()).strip().replace(" ", "-")  # noqa: E731
        block = self.browser.document().begin()
        while block.isValid():
            if block.blockFormat().headingLevel() and slug(block.text()) == fragment.lower():
                cursor = QTextCursor(block)
                self.browser.setTextCursor(cursor)
                bar = self.browser.verticalScrollBar()
                bar.setValue(bar.maximum())
                self.browser.ensureCursorVisible()     # from the bottom, so the heading lands at the top
                return
            block = block.next()

    def _go_back(self) -> None:
        if self._history:
            self.load(self._history.pop())
