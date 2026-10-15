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
    blank = rect.right() - 8                                        # right of "ace-queues": background only
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
