# SPDX-License-Identifier: GPL-3.0-or-later
"""tools/check_manifest.py: the portal version bump rule and the tag rules."""

from __future__ import annotations

import importlib.util
from pathlib import Path

import pytest

TOOLS = Path(__file__).resolve().parent.parent
spec = importlib.util.spec_from_file_location("check_manifest", TOOLS / "check_manifest.py")
cm = importlib.util.module_from_spec(spec)
spec.loader.exec_module(cm)

BASE = """
[apps.bazzite-test]
name = "BT"
summary = "s"
tag = "bazzite-test-v1.2.3"
required = true
install = ["bash install.sh"]
uninstall = ["bash install.sh --uninstall"]
detect = ["~/.local/bin/bt"]

[apps.governor]
name = "Gov"
summary = "s"
tag = "governor-v0.4.0"
install = ["bash install.sh"]
uninstall = ["bash install.sh --uninstall"]
detect = ["~/.local/bin/g"]
"""


@pytest.mark.parametrize("old, new, level", [
    ("1.2.3", "1.2.3", 0), ("1.2.3", "1.2.4", 1), ("1.2.3", "1.3.0", 2), ("1.2.3", "2.0.0", 3),
    ("1.9.9", "1.10.0", 2), ("1.2.3", "1.2.2", -1),
])
def test_bump_level(old, new, level):
    assert cm.bump_level(old, new) == level


def errors(new_text: str, old_portal: str, new_portal: str) -> list[str]:
    return cm.bump_errors(BASE, new_text, old_portal, new_portal)


def test_unchanged_needs_nothing():
    assert errors(BASE, "0.1.0", "0.1.0") == []


@pytest.mark.parametrize("app_tag, portal_new, ok", [
    ("governor-v0.4.1", "0.1.1", True),         # app patch -> portal patch is enough
    ("governor-v0.4.1", "0.1.0", False),        # ... but some bump is needed
    ("governor-v0.5.0", "0.1.1", False),        # app minor -> portal patch is too small
    ("governor-v0.5.0", "0.2.0", True),
    ("governor-v1.0.0", "0.2.0", False),        # app major -> portal major
    ("governor-v1.0.0", "1.0.0", True),
])
def test_portal_bump_at_least_app_bump(app_tag, portal_new, ok):
    result = errors(BASE.replace("governor-v0.4.0", app_tag), "0.1.0", portal_new)
    assert (result == []) is ok, result
    if not ok:
        assert "portal/VERSION needs at least" in result[0]


def test_largest_app_bump_counts():
    new = BASE.replace("governor-v0.4.0", "governor-v0.4.1").replace("bazzite-test-v1.2.3", "bazzite-test-v1.3.0")
    assert errors(new, "0.1.0", "0.1.1")                    # minor needed because of bazzite-test
    assert errors(new, "0.1.0", "0.2.0") == []


def test_other_changes_need_a_patch_bump():
    new = BASE.replace('summary = "s"\ntag = "governor', 'summary = "changed"\ntag = "governor')
    assert errors(new, "0.1.0", "0.1.0")
    assert errors(new, "0.1.0", "0.1.1") == []


def test_added_app_needs_minor():
    new = BASE + BASE.split("[apps.governor]")[1].replace("governor", "helixsr").join(["\n[apps.helixsr]", ""])
    assert errors(new, "0.1.0", "0.1.1")
    assert errors(new, "0.1.0", "0.2.0") == []


def test_app_moving_back_is_refused():
    result = errors(BASE.replace("governor-v0.4.0", "governor-v0.3.9"), "0.1.0", "1.0.0")
    assert result and "moves back" in result[0]


def test_shipped_manifest_passes_without_required_tags():
    entries = cm.manifest.load(cm.SUITE / cm.MANIFEST)
    assert cm.check_entries(entries, require_tags=False) == []
