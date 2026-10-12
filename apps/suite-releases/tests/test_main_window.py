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
