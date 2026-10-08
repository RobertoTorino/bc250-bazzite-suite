# SPDX-License-Identifier: GPL-3.0-or-later
"""bazzite-test on bc250_core: the app starts, its settings stay in the same .ini file, and its widgets are core's.

No test runs: the window is built with the fake engine (development/tools/fake-test-bazzite.sh) and closed."""

from __future__ import annotations

from pathlib import Path

from bc250_core import theme
from bc250_core import widgets as core_widgets

ENGINE = Path(__file__).resolve().parents[1] / "development" / "tools" / "fake-test-bazzite.sh"


def test_constants_come_from_core():
    from bc250_gui import INFO, __version__, dashboard, widgets
    assert (INFO.app_id, INFO.version, INFO.tag_prefix) == ("bc250-bazzite-test", __version__, "bazzite-test-v")
    assert dashboard.ACCENT == theme.ACCENT and dashboard.header_font is theme.header_font
    assert widgets.RoundedToolTip is core_widgets.RoundedToolTip and widgets.ClickableLogo is core_widgets.ClickableLogo


def test_settings_file_unchanged(sandbox):
    from bc250_gui.settings import AppSettings
    settings = AppSettings()
    assert Path(settings.qsettings.fileName()).name == "bc250-bazzite-test.ini"
    assert settings.get("run/stress_duration") == 120
    settings.set("run/stress_duration", 300)
    assert AppSettings().get("run/stress_duration") == 300


def test_main_window_builds(sandbox, qapp):
    import gc

    from PyQt6.QtCore import QCoreApplication, QEvent

    from bc250_core.app import create_app
    from bc250_gui import INFO
    from bc250_gui.main_window import MainWindow
    from bc250_gui.runner import TestRunner
    create_app(INFO, lang="en")
    window = MainWindow(TestRunner(str(ENGINE), use_sudo=False))
    window.show()
    qapp.processEvents()                        # runs the deferred history load
    assert window.windowTitle() == INFO.display_name
    window.shutdown()
    window.close()
    # Dispose of the window here, while the event loop is alive, instead of leaving it to whenever Python's garbage
    # collector gets to it (the app itself keeps its window until it quits). A crash then shows up in this test.
    window.deleteLater()
    QCoreApplication.sendPostedEvents(None, QEvent.Type.DeferredDelete.value)
    qapp.processEvents()
    del window
    gc.collect()
