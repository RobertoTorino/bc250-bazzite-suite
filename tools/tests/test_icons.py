# SPDX-License-Identifier: GPL-3.0-or-later
"""Every installer that points its menu entry at images/$APP_ID.png has that file: a renamed icon otherwise leaves
the menu entry and the Desktop icon without one, and nothing else fails."""

from __future__ import annotations

import re
from pathlib import Path

import pytest

SUITE = Path(__file__).resolve().parent.parent.parent
INSTALLERS = sorted([SUITE / "portal" / "install.sh", *SUITE.glob("apps/*/install.sh")])


@pytest.mark.parametrize("installer", INSTALLERS, ids=lambda p: p.parent.name)
def test_installer_icon_exists(installer):
    text = installer.read_text(encoding="utf-8")
    app_id = re.search(r'^APP_ID="([^"]+)"', text, re.M)
    if app_id is None or "images/$APP_ID.png" not in text:
        pytest.skip("no images/$APP_ID.png icon")
    assert (installer.parent / "images" / f"{app_id.group(1)}.png").is_file()
