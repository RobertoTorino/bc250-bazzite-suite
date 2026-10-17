# SPDX-License-Identifier: GPL-3.0-or-later
"""The window on this checkout, offscreen, with no GitHub and no terminal."""

from __future__ import annotations

import pytest
from PyQt6.QtCore import QPoint
from PyQt6.QtWidgets import QApplication, QWidget


@pytest.fixture
def window():
    app = QApplication.instance() or QApplication([])
    from bc250_suite_releases.main_window import ReleaseWindow
    w = ReleaseWindow(runs_source=lambda etag: ([], ""), launch=lambda line: None, notify=lambda s, b: True)
    w.build.checker.stop(2000)
    yield w, app
    w.build.stop()
    w.close()


def test_every_widget_keeps_qts_window_method(window):
    """An attribute named window on a widget hides QWidget.window(), which the suite's tooltip calls on the widget
    it is shown for: hovering the build indicator stopped the app that way."""
    w, _app = window
    for widget in [w, *w.findChildren(QWidget)]:
        assert callable(widget.window), type(widget).__name__


def test_tooltip_over_the_build_indicator(window):
    from bc250_core.widgets import RoundedToolTip
    w, app = window
    w.show()
    tip = RoundedToolTip(app)
    tip.show_text(QPoint(5, 5), w.build.toolTip(), w.build)
    assert tip.popup.isVisible() and tip.popup.parentWidget() is w
    tip.hide()


def test_selection_is_a_purple_outline(window):
    """A selected cell and the focused input field: a purple rounded outline on a transparent background, not the
    desktop's solid highlight (rendered: the cell's middle keeps the table's own background)."""
    from PyQt6.QtGui import QColor
    from bc250_core.theme import ACCENT
    w, app = window
    w.show()
    table = w.apps_page.table
    table.setFocus()
    table.setCurrentCell(1, 1)
    app.processEvents()
    rect = table.visualRect(table.model().index(1, 1))
    image = table.viewport().grab().toImage()
    blank = rect.right() - 8                                        # right of "ace": background only
    inside = QColor(image.pixel(blank, rect.center().y()))
    other = QColor(image.pixel(blank, table.visualRect(table.model().index(0, 1)).center().y()))   # "core"
    edge = QColor(image.pixel(rect.center().x(), rect.top() + 1))
    assert inside.name() == other.name()                            # no solid highlight behind the text
    assert edge.name() == QColor(ACCENT).name()
    assert f"QLineEdit:focus {{ background:transparent; border:2px solid {ACCENT}; border-radius:6px; }}" \
        in w.styleSheet()


def test_a_second_launch_opens_no_window(monkeypatch):
    """A double-click on the Desktop icon starts the app twice: the second launch hands over to the first."""
    from bc250_core import instance
    import bc250_suite_releases.__main__ as entry
    import bc250_suite_releases.main_window as main_window
    app = QApplication.instance() or QApplication([])
    asked = []
    monkeypatch.setattr(entry, "create_app", lambda *a, **k: app)
    monkeypatch.setattr(instance, "already_running", lambda app_id: asked.append(app_id) or True)
    monkeypatch.setattr(main_window, "ReleaseWindow", lambda *a, **k: pytest.fail("a second window was opened"))
    monkeypatch.setattr("sys.argv", ["bc250_suite_releases"])
    assert entry.main() == 0 and asked == [entry.INFO.app_id]


def test_the_logs_sit_under_the_steps_side_by_side(window, monkeypatch):
    """Under the tabs, in a splitter: the current step's log on the left, the command line on the right, each the
    full height (owner, 17-10-2026: the two boxes stacked were too flat to read). A finished command reads the
    checkout again (a commit, a push)."""
    from PyQt6.QtCore import Qt
    w, _app = window
    assert w.splitter.widget(0) is w.tabs and w.splitter.widget(1) is w.logs
    assert w.logs.orientation() == Qt.Orientation.Horizontal
    assert w.logs.widget(0) is w.outputs and w.logs.widget(1) is w.commands
    pages = (w.apps_page, w.portal_page, w.withdraw_page, w.run_page)
    assert [w.outputs.widget(i) for i in range(w.outputs.count())] == [p.output for p in pages]
    assert not any(p.isAncestorOf(p.output) for p in pages)             # no longer inside the tab
    for index, page in enumerate(pages):
        w.tabs.setCurrentIndex(index)
        assert w.outputs.currentWidget() is page.output
    w.tabs.setCurrentIndex(0)
    assert w.commands.root == w.root
    refreshed = []
    monkeypatch.setattr(w, "refresh", lambda: refreshed.append(1))
    w.commands.finished_callback = w.refresh
    w.commands._done(0, w.commands.process.exitStatus())
    assert refreshed == [1]


def test_a_step_offers_its_commands(window):
    from bc250_suite_releases import plan as rp
    w, _app = window
    w.commands.offer(rp.app_commands(["alpha-v0.1.1"]))
    assert w.commands.offered[-1] == f"{rp.TAG_SCRIPT} alpha-v0.1.1" and w.commands.commands_button.isEnabled()
