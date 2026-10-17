# SPDX-License-Identifier: GPL-3.0-or-later
"""The PlayStation history page: every console with its lifetime totals and its pictures (a click shows one
large), then a brief overview of its legacy (a click on a name opens pictures of it on the web)."""

from __future__ import annotations

import html
from pathlib import Path

from PyQt6.QtCore import QUrl
from PyQt6.QtGui import QPixmap
from PyQt6.QtWidgets import QWidget

from bc250_core.platform import xdg_open

from . import CONSOLES_DIR
from .history import CONSOLES, UPDATED, Console, image_path, search_url
from .pages import HtmlPage, ImageDialog

THUMB_WIDTH, THUMB_HEIGHT = 180, 120


def _picture(name: str, folder: Path) -> str:
    path = image_path(name, folder)
    if not path.is_file():
        return f"<span class='muted'>[{html.escape(name)}]</span>"
    return (f"<a href='image:{name}'><img src='{path.as_uri()}' width='{THUMB_WIDTH}' height='{THUMB_HEIGHT}' "
            f"title='{html.escape(name)}'></a>")


def console_html(console: Console, folder: Path) -> str:
    pictures = " ".join(_picture(name, folder) for name in console.images)
    titles = html.escape(console.titles).replace("\n", "<br>")
    return (f"<h3>{html.escape(console.name)}</h3><p>{pictures}</p>"
            f"<p class='muted'>{html.escape(console.sold)} • {titles}</p>")


def page_html(folder: Path = CONSOLES_DIR) -> str:
    totals = "".join(console_html(console, folder) for console in CONSOLES)
    legacy = "".join(f"<h3><a href='search:{html.escape(console.name, quote=True)}'>{html.escape(console.name)}"
                     f"</a></h3><p>{html.escape(console.legacy)}</p>" for console in CONSOLES)
    return (f"<h2>Lifetime totals</h2>{totals}"
            f"<p class='muted'><b>Update Info</b><br>Source: Internet. Updated {UPDATED}.</p><hr>"
            f"<h2>A brief overview of PlayStation's legacy</h2>"
            f"<p class='muted'>Click a name for pictures of it on the web.</p>{legacy}")


class HistoryPage(HtmlPage):
    def __init__(self, folder: Path = CONSOLES_DIR, opener=xdg_open, parent: QWidget | None = None):
        super().__init__("PlayStation History", parent)
        self.folder = folder
        self.opener = opener
        self.loaded = False

    def activate(self) -> None:
        if not self.loaded:
            self.set_body(page_html(self.folder))
            self.loaded = True

    def on_link(self, url: QUrl) -> None:
        text = url.toString()
        if text.startswith("image:"):
            name = text[len("image:"):]
            pixmap = QPixmap(str(image_path(name, self.folder)))
            if pixmap.isNull():
                self.status.emit(f"No picture for {name}.")
                return
            ImageDialog(pixmap, name, self).exec()
        elif text.startswith("search:"):
            query = url.toString(QUrl.ComponentFormattingOption.FullyDecoded)[len("search:"):]
            if self.opener(search_url(query)):
                self.status.emit(f"Searching the web for pictures of {query}.")
            else:
                self.status.emit("No browser could be started (xdg-open is missing).")
