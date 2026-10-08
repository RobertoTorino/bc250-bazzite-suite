# SPDX-License-Identifier: GPL-3.0-or-later
from __future__ import annotations

from bc250_core.appinfo import SUITE_REPO_URL, AppInfo


def test_defaults(info):
    assert info.display_name == "BC-250 Test App 1.2.3"
    assert info.org == info.settings_name == info.app_id
    assert info.repo_url == SUITE_REPO_URL
    assert info.releases_url == SUITE_REPO_URL + "/releases"
    assert info.user_agent == f"{info.app_id}/1.2.3"
    assert next(iter(info.languages)) == "en"


def test_existing_settings_names_are_kept():
    cu = AppInfo("bc250-cu-bisect-gui", "BC-250 CU Bisect", "0.1.0",
                 settings_org="bc250-cu-bisect", settings_app="bc250-cu-bisect-gui")
    assert (cu.org, cu.settings_name) == ("bc250-cu-bisect", "bc250-cu-bisect-gui")


def test_languages_not_shared_between_instances():
    a, b = AppInfo("a", "A", "1.0.0"), AppInfo("b", "B", "1.0.0")
    a.languages["xx"] = "X"
    assert "xx" not in b.languages
