# SPDX-License-Identifier: GPL-3.0-or-later
"""The window on this checkout, offscreen, with no GitHub and no terminal."""

from __future__ import annotations

import pytest
from PyQt6.QtCore import QPoint
from PyQt6.QtWidgets import QApplication, QWidget


@pytest.fixture
def window():
    app = QApplication.instance() or QApplication([])
    from suite_releases.main_window import ReleaseWindow
    w = ReleaseWindow(runs_source=lambda etag: ([], ""), launch=lambda line: None, notify=lambda s, b: True,
                      status_source=None)
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


def test_the_header_is_a_row_of_pills(window):
    """Refresh, the working tree, GitHub's build, its API requests left and GitHub status: pills as in the apps'
    headers, all as wide as the widest (owner, 20-10-2026)."""
    from bc250_core.widgets import MetricBox, Pill
    w, _app = window
    pills = [w.refresh_pill, w.status, w.build, w.build.rate, w.github_status]
    assert all(isinstance(p, MetricBox) for p in pills)
    assert all(isinstance(p, Pill) for p in (w.refresh_pill, w.build, w.github_status))
    assert [p.caption.text() for p in pills] == \
        ["Click to refresh", "Working tree", "GitHub build", "GitHub API left", "GitHub status"]
    w.show()
    assert len({p.width() for p in pills if p.isVisible()}) == 1
    refreshed = []
    w.reload = lambda: refreshed.append(1)
    w.refresh_pill.click()
    assert refreshed == [1]
    w.status.set_value("A much longer value")                       # every pill grows with the widest
    assert len({p.minimumWidth() for p in pills}) == 1
    assert w.refresh_pill.minimumWidth() >= w.status.sizeHint().width()


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
    import suite_releases.__main__ as entry
    import suite_releases.main_window as main_window
    app = QApplication.instance() or QApplication([])
    asked = []
    monkeypatch.setattr(entry, "create_app", lambda *a, **k: app)
    monkeypatch.setattr(instance, "already_running", lambda app_id: asked.append(app_id) or True)
    monkeypatch.setattr(main_window, "ReleaseWindow", lambda *a, **k: pytest.fail("a second window was opened"))
    monkeypatch.setattr("sys.argv", ["suite_releases"])
    assert entry.main() == 0 and asked == [entry.INFO.app_id]


def test_the_logs_are_tabs_of_their_own(window, monkeypatch):
    """Logs (the log of the step last open) and Commands (the command line) are tabs after the steps, each the whole
    tab area (owner, 17-10-2026: boxes under the steps were too flat to read). A step that writes its log opens
    Logs; opening a step makes Logs its log again. A finished command reads the checkout again (a commit, a push)."""
    w, _app = window
    pages = (w.apps_page, w.portal_page, w.withdraw_page, w.run_page)
    assert [w.tabs.tabText(i) for i in range(w.tabs.count())] == \
        ["1. Release apps", "2. Pin and release Portal", "3. Retract app", "Test on this board", "Logs", "Commands"]
    assert w.tabs.widget(w.log_tab) is w.outputs and w.tabs.widget(w.commands_tab) is w.commands
    assert [w.outputs.widget(i) for i in range(w.outputs.count())] == [p.output for p in pages]
    assert not any(p.isAncestorOf(p.output) for p in pages)             # no longer inside the step's tab
    assert w.tabs.widget(w.log_tab).parent() is not None and w.centralWidget().isAncestorOf(w.tabs)
    for index, page in enumerate(pages):
        w.tabs.setCurrentIndex(index)
        assert w.outputs.currentWidget() is page.output
    w.tabs.setCurrentIndex(w.log_tab)
    assert w.outputs.currentWidget() is w.run_page.output               # a log tab leaves it as it is
    w.tabs.setCurrentIndex(1)
    w.portal_page.output.set_text("Tags fetched.")                      # the open step wrote: Logs opens
    assert w.tabs.currentIndex() == w.log_tab and w.outputs.currentWidget() is w.portal_page.output
    w.tabs.setCurrentIndex(0)
    w.portal_page.output.set_text("later")                              # another step's log: no switch
    assert w.tabs.currentIndex() == 0
    w.run_page.output.appendPlainText("alpha started")                  # Test on this board never switches
    w.tabs.setCurrentIndex(3)
    w.run_page.output.appendPlainText("alpha closed.")
    assert w.tabs.currentIndex() == 3
    w.tabs.setCurrentIndex(0)
    assert w.commands.root == w.root
    refreshed = []
    monkeypatch.setattr(w, "refresh", lambda: refreshed.append(1))
    w.commands.finished_callback = w.refresh
    w.commands._done(0, w.commands.process.exitStatus())
    assert refreshed == [1]


def test_a_step_offers_its_commands(window):
    from suite_releases import plan as rp
    w, _app = window
    w.commands.offer(rp.app_commands(["alpha-v0.1.1"]))
    assert w.commands.offered[-1] == f"{rp.TAG_SCRIPT} alpha-v0.1.1" and w.commands.commands_button.isEnabled()


SUMMARY_DOWN = {   # githubstatus.com's summary.json during the incident of 19-10-2026, shortened
    "status": {"indicator": "minor", "description": "Partially Degraded Service"},
    "components": [{"name": "Git Operations", "status": "operational"},
                   {"name": "Actions", "status": "degraded_performance"},
                   {"name": "Pages", "status": "major_outage"}],
    "incidents": [{"name": "Degraded availability for GitHub Actions, GitHub Pages and Webhooks"}],
}
SUMMARY_UP = {"status": {"indicator": "none", "description": "All Systems Operational"},
              "components": [{"name": "Actions", "status": "operational"}], "incidents": []}


def test_github_status_is_read_from_the_status_page(monkeypatch):
    import io
    import json
    from suite_releases import plan as rp
    down = rp.parse_github_status(SUMMARY_DOWN)
    assert not down.up and down.description == "Partially Degraded Service"
    assert down.affected == ("Actions: degraded performance", "Pages: major outage")
    assert down.incidents == ("Degraded availability for GitHub Actions, GitHub Pages and Webhooks",)
    assert rp.parse_github_status(SUMMARY_UP).up
    assert not rp.parse_github_status("not json").up                 # an odd answer is never "up"
    asked = []

    class Response(io.BytesIO):
        def __enter__(self):
            return self

        def __exit__(self, *exc):
            return False

    def urlopen(request, timeout):
        asked.append(request.full_url)
        return Response(json.dumps(SUMMARY_UP).encode())

    monkeypatch.setattr(rp.urllib.request, "urlopen", urlopen)
    assert rp.fetch_github_status().up and asked == ["https://www.githubstatus.com/api/v2/summary.json"]


def test_github_status_is_a_pill_that_opens_the_status_page(window, monkeypatch):
    """Green while GitHub is up, red while githubstatus.com reports a problem, grey while not known; a click opens
    https://www.githubstatus.com/ (owner, 19-10-2026). A pill, as the apps' status boxes (owner, 20-10-2026)."""
    from PyQt6.QtGui import QColor, QDesktopServices
    from bc250_core.theme import GREEN, GREY, RED
    from suite_releases import main_window
    from suite_releases import plan as rp
    w, _app = window
    status = main_window.GitHubStatusIndicator(lambda: rp.parse_github_status(SUMMARY_DOWN))
    assert not status.isHidden() and status.caption.text() == "GitHub status" and status.state == ""

    def color() -> str:
        return next((c for c in (RED, GREEN) if c in status.styleSheet()), GREY)

    assert color() == GREY and status.value.text() == "Unknown"
    status.checked(status._fetch())
    assert status.state == "down" and color() == RED and status.value.text() == "Problem"
    assert "Actions: degraded performance" in status.toolTip() and "Partially Degraded Service" in status.toolTip()
    assert status.timer.interval() == main_window.BUILD_IDLE_MS
    status.checked(rp.parse_github_status(SUMMARY_UP))
    assert status.state == "up" and color() == GREEN and status.value.text() == "Up"
    status.checked(OSError("offline"))
    assert status.state == "" and color() == GREY and "offline" in status.toolTip()
    opened = []
    monkeypatch.setattr(QDesktopServices, "openUrl", lambda url: opened.append(url.toString()))
    status.click()
    assert opened == ["https://www.githubstatus.com/"]
    status.stop()
    assert w.github_status.isHidden() and main_window.GitHubStatusIndicator(None).isHidden()
