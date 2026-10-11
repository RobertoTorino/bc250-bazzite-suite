# SPDX-License-Identifier: GPL-3.0-or-later
"""The portal dependency checker cards and asynchronous refresh."""

from __future__ import annotations

from PyQt6.QtCore import QEventLoop, QTimer

from bc250_portal import DEPENDENCY_CATALOG, MANIFEST
from bc250_portal.dependencies import DependencyStatus, ToolStatus, load_catalog, load_tools
from bc250_portal.dependency_window import DependencyWindow
from bc250_portal.manifest import load


def wait_for(predicate, ms=3000):
    loop = QEventLoop()
    timer = QTimer()
    timer.timeout.connect(lambda: predicate() and loop.quit())
    timer.start(10)
    QTimer.singleShot(ms, loop.quit)
    loop.exec()
    timer.stop()
    return predicate()


def test_dependency_cards_check_and_display_results(qapp):
    dependencies = load_catalog(DEPENDENCY_CATALOG)
    tools = load_tools(DEPENDENCY_CATALOG)
    results = [
        DependencyStatus(dependencies[0], "6.11.0", "6.12.0"),
        DependencyStatus(dependencies[1], "6.11.0", error="offline"),
    ]
    tool_results = [
        ToolStatus(tools[0], "/home/test/flashrom/usr/bin/flashrom"),
        ToolStatus(tools[1]),
    ]
    window = DependencyWindow(dependencies, load(MANIFEST), check=lambda: (results, tool_results), tools=tools)
    try:
        assert wait_for(lambda: window.check_button.isEnabled())
        assert window.cards["PyQt6"].status.text() == "Update available"
        assert window.cards["PyQt6"].latest.text() == "Latest on PyPI: 6.12.0"
        assert "BC-250 Cores Bisect" in window.cards["PyQt6"].layout().itemAt(2).widget().text()
        assert window.cards["PyQt6-Charts"].status.text() == "Check failed"
        assert "offline" in window.cards["PyQt6-Charts"].status.toolTip()
        assert window.tool_cards["flashrom"].status.text() == "Available"
        assert window.tool_cards["flashrom"].location.text().endswith("/flashrom")
        assert window.tool_cards["pkexec"].status.text() == "Not found"
        assert "1 check failed" in window.result_label.text()
        assert "1 tool unavailable" in window.result_label.text()
    finally:
        window.close()
