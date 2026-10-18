# SPDX-License-Identifier: GPL-3.0-or-later
"""Every installer that points its menu entry at images/$APP_ID-128.png has that file and the WebP icon beside it: a
renamed icon otherwise leaves the menu entry and the Desktop icon without one, and nothing else fails. And every app
icon is a copy of its category's icon in icons/ (icons/categories.toml)."""

from __future__ import annotations

import re
import sys
from pathlib import Path

import pytest
from PIL import Image

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
import sync_icons  # noqa: E402

SUITE = Path(__file__).resolve().parent.parent.parent
INSTALLERS = sorted([SUITE / "portal" / "install.sh", *SUITE.glob("apps/*/install.sh")])


@pytest.mark.parametrize("installer", INSTALLERS, ids=lambda p: p.parent.name)
def test_installer_icon_exists(installer):
    text = installer.read_text(encoding="utf-8")
    app_id = re.search(r'^APP_ID="([^"]+)"', text, re.M)
    if app_id is None or "images/$APP_ID-128.png" not in text:
        pytest.skip("no images/$APP_ID-128.png icon")
    assert (installer.parent / "images" / f"{app_id.group(1)}-128.png").is_file()
    assert (installer.parent / "images" / f"{app_id.group(1)}.webp").is_file()


def test_icon_copies_match_their_category():
    """Every copy in icons/categories.toml is its category's icon: run tools/sync_icons.py after changing icons/."""
    assert [p.relative_to(SUITE).as_posix() for p in sync_icons.stale()] == []


@pytest.mark.parametrize("category", sorted(p.name for p in (SUITE / "icons").iterdir() if p.is_dir()))
def test_category_has_every_size(category):
    """WebP for Qt and the wiki; the 128 px one PNG, for menu entries, Steam and notifications."""
    for size, kind in ((1024, "webp"), (512, "webp"), (256, "webp"), (128, "png")):
        with Image.open(SUITE / "icons" / category / f"{category}-{size}.{kind}") as image:
            assert image.size == (size, size) and image.format == kind.upper()


def test_every_app_icon_comes_from_a_category():
    """No app icon or portal tile outside icons/categories.toml: one left there keeps an old icon. An app's icons
    are found by their PNG (the screenshots beside them are WebP too)."""
    icons = {*SUITE.glob("apps/*/images/*.png"), *SUITE.glob("tools/installer-tests/gui/images/*.png"),
             *(p for p in SUITE.glob("portal/images/apps/*.*") if p.name != "portal.webp")}   # the suite's own
    assert sorted(p.relative_to(SUITE).as_posix() for p in icons - set(sync_icons.copies())) == []


def test_portal_tabs_follow_the_icon_categories():
    """An app's tab in the portal (category in portal/apps.toml) is the category of its icon, and the portal knows
    every category of icons/."""
    import tomllib
    import check_manifest
    table = tomllib.loads((SUITE / "icons" / "categories.toml").read_text(encoding="utf-8"))
    path = SUITE / check_manifest.MANIFEST
    entries = check_manifest.manifest.load(path) + check_manifest.manifest.load_checkout(path)
    assert {e.key: e.category for e in entries} == {e.key: table[e.key]["category"] for e in entries}
    assert set(check_manifest.manifest.CATEGORIES) == {p.name for p in (SUITE / "icons").iterdir() if p.is_dir()}
