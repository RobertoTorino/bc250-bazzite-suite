# SPDX-License-Identifier: GPL-3.0-or-later
from __future__ import annotations

from bc250_core import appinfo
from bc250_core.app import create_app
from bc250_core.appinfo import AppInfo
from bc250_core.help import HelpView
from bc250_core.text import fill


def test_create_app_sets_names_and_current(qapp, info):
    app = create_app(info)
    assert app is qapp
    assert app.applicationName() == info.app_id
    assert app.applicationDisplayName() == "BC-250 Test App 1.2.3"
    assert app.applicationVersion() == "1.2.3"
    assert app.desktopFileName() == info.app_id
    assert app.style().name().lower() == "fusion"
    assert appinfo.current() is info


def test_org_only_when_declared(qapp):
    qapp.setOrganizationName("")
    create_app(AppInfo("bc250-governor-manager", "Gov", "0.1.0"))
    assert qapp.organizationName() == ""
    create_app(AppInfo("bc250-cu-unlock", "Unlock", "0.1.0", settings_org="bc250-cu-bisect"))
    assert (qapp.organizationName(), qapp.applicationName()) == ("bc250-cu-bisect", "bc250-cu-unlock")
    qapp.setOrganizationName("")


def test_help_view(qapp):
    html = fill("<p>See {repo}</p>", {"repo": "https://example.org"})
    assert "https://example.org" in HelpView(html).toPlainText()
