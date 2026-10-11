# SPDX-License-Identifier: GPL-3.0-or-later

from __future__ import annotations

from PyQt6.QtCore import QEventLoop, QTimer

from portal_dependency_checker import CATALOG
from portal_dependency_checker.dependencies import DependencyStatus, ToolStatus, load_catalog, load_tools
from portal_dependency_checker.main_window import DependencyWindow


def _wait_for(predicate, ms=3000):
    loop = QEventLoop()
    timer = QTimer()
    timer.timeout.connect(lambda: predicate() and loop.quit())
    timer.start(10)
    QTimer.singleShot(ms, loop.quit)
    loop.exec()
    timer.stop()
    return predicate()


def test_window_displays_package_and_tool_results(qapp):
    dependencies = load_catalog(CATALOG)
    tools = load_tools(CATALOG)
    results = [DependencyStatus(dependencies[0], "6.11.0", "6.12.0")]
    tool_results = [ToolStatus(tools[0], "/home/test/flashrom/usr/bin/flashrom")]
    window = DependencyWindow(dependencies, tools, check=lambda: (results, tool_results))
    try:
        assert _wait_for(lambda: window.check_button.isEnabled())
        assert window.cards["PyQt6"].status.text() == "Update available"
        assert window.cards["PyQt6"].latest.text() == "Latest on PyPI: 6.12.0"
        assert window.tool_cards["flashrom"].status.text() == "Available"
        assert window.tool_cards["flashrom"].location.text().endswith("/flashrom")
        assert "1 Python packages and" in window.result_label.text()
    finally:
        window.close()
