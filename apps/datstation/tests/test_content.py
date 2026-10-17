# SPDX-License-Identifier: GPL-3.0-or-later
"""The static content: every console picture the history names exists and loads, the region tables are square,
and the pages render their HTML."""

from __future__ import annotations

from PyQt6.QtGui import QImageReader

from datstation import CONSOLES_DIR, history, regions
from datstation.history_page import page_html as history_html
from datstation.regions_page import page_html as regions_html, table_html


def test_every_console_picture_exists_and_loads(qapp):
    assert history.missing_images() == []
    assert len({name for console in history.CONSOLES for name in console.images}) == 28
    assert "webp" in [bytes(f).decode() for f in QImageReader.supportedImageFormats()]
    for console in history.CONSOLES:
        for name in console.images:
            reader = QImageReader(str(history.image_path(name)))
            assert reader.canRead(), name
    assert len(list(CONSOLES_DIR.glob("*.webp"))) == 28


def test_the_history_html_and_links(tmp_path):
    html = history_html()
    assert html.count("<h3>") == 2 * len(history.CONSOLES)
    assert "href='image:ps1'" in html and "href='search:PlayStation 2 (2000)'" in html
    assert history.search_url("Sony PSX (2003)") == "https://www.google.com/search?q=Sony%20PSX%20%282003%29&tbm=isch"
    assert "[ps1]" in history_html(tmp_path)                       # a missing picture: its name, no broken image


def test_the_region_tables_are_square():
    for section in regions.SECTIONS:
        if section.table is not None:
            assert all(len(row) == len(section.table.headers) for row in section.table.rows), section.console
    html = regions_html()
    assert html.count("<h3>") == 6 and "Coming soon" in html and "PPSA" in html and "2B: United Kingdom" in html
    table = table_html(regions.Table(("A", "B"), (("1", "<2>"),)))
    assert "<th>A</th>" in table and "<td>&lt;2&gt;</td>" in table
