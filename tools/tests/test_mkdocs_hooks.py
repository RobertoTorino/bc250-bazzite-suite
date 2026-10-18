# SPDX-License-Identifier: GPL-3.0-or-later
"""The wiki's hook: a WebP copy of each app picture a page shows, the pages pointed at it, and the PNG kept for
pictures without a copy (no Pillow, or not shown)."""

from __future__ import annotations

import importlib.util
from pathlib import Path

import pytest

pytest.importorskip("mkdocs.structure.files")   # the real MkDocs: tools/mkdocs/ (this hook's folder) is importable as "mkdocs" too
SUITE = Path(__file__).resolve().parents[2]
spec = importlib.util.spec_from_file_location("wiki_hooks", SUITE / "tools" / "mkdocs" / "hooks.py")
hooks = importlib.util.module_from_spec(spec)
spec.loader.exec_module(hooks)


def test_webp_copy_keeps_the_picture(tmp_path):
    image = pytest.importorskip("PIL.Image")
    png = tmp_path / "icon.png"
    image.new("RGBA", (64, 64), (88, 53, 206, 0)).save(png)
    data = hooks.to_webp(png, png.stat().st_mtime)
    assert data[:4] == b"RIFF" and data[8:12] == b"WEBP"
    out = tmp_path / "icon.webp"
    out.write_bytes(data)
    with image.open(out) as copy:
        assert copy.size == (64, 64) and copy.getpixel((1, 1))[3] == 0      # transparency kept


def test_pages_point_at_the_copies_only(monkeypatch):
    monkeypatch.setattr(hooks, "_webp", {"assets/apps/gpu.png", "assets/ace/bc250-ace-queues.png"})
    text = ("![](../assets/apps/gpu.png) ![](../assets/ace/bc250-ace-queues.png){ .app-logo } "
            "![](../assets/apps/portal.png) ![](../images/home/portal.webp)")
    assert hooks.on_page_markdown(text, None, None, None) == (
        "![](../assets/apps/gpu.webp) ![](../assets/ace/bc250-ace-queues.webp){ .app-logo } "
        "![](../assets/apps/portal.png) ![](../images/home/portal.webp)")


def test_only_pictures_a_page_names_are_converted():
    wanted = hooks.shown(str(SUITE / "docs"))
    assert "assets/suite/bc250-release-128.png" in wanted
    assert not any("/steam/" in uri for uri in wanted)      # Console Link's Steam artwork is not on any page


def test_every_app_chapter_shows_its_icon():
    """An app's chapter starts with the app's icon beside its heading (two chapters once lacked it)."""
    docs = SUITE / "docs"
    chapters = [p for folder in ("apps", "other-tools") for p in (docs / folder).glob("*.md") if p.name != "index.md"]
    missing = [p.relative_to(docs).as_posix() for p in sorted(chapters) if "{ .app-logo }" not in p.read_text("utf-8")]
    assert not missing, f"no icon beside the heading: {', '.join(missing)}"
