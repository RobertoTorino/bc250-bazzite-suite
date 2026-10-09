# SPDX-License-Identifier: GPL-3.0-or-later
"""The portal window with the terminal, downloads and dialogs replaced by fakes."""

from __future__ import annotations

from dataclasses import replace
from pathlib import Path, PurePosixPath

import pytest
from PyQt6.QtCore import QEventLoop, QTimer
from PyQt6.QtWidgets import QMessageBox

from bc250_portal import MANIFEST
from bc250_portal import main_window as mw
from bc250_portal.manifest import load
from bc250_portal.sources import Records, Sources
from bc250_core.updates import ReleaseInfo

YES, CANCEL = QMessageBox.StandardButton.Yes, QMessageBox.StandardButton.Cancel


class FakeSources(Sources):
    def __init__(self, work: Path):
        super().__init__(work)
        self.prepared: list[str] = []

    def prepare(self, entry):
        self.prepared.append(entry.key)
        folder = self.folder(entry)
        folder.mkdir(parents=True, exist_ok=True)
        return folder


@pytest.fixture
def launched(monkeypatch):
    calls = []
    monkeypatch.setattr(mw, "launch_in_terminal", lambda line, **kw: calls.append((line, kw["exit_file"])))
    return calls


@pytest.fixture
def window(qapp, home, settings_dir, tmp_path, launched):
    w = mw.MainWindow(load(MANIFEST), FakeSources(tmp_path / "work"), Records(tmp_path / "installed.json"))
    yield w
    w.close()


def wait_for(predicate, ms=5000):
    loop = QEventLoop()
    timer = QTimer()
    timer.timeout.connect(lambda: predicate() and loop.quit())
    timer.start(20)
    QTimer.singleShot(ms, loop.quit)
    loop.exec()
    timer.stop()
    return predicate()


def test_bazzite_test_first_without_uninstall(window):
    keys = list(window.cards)
    assert keys[0] == "bazzite-test"
    assert window.cards["bazzite-test"].uninstall_button.isHidden()
    assert not window.cards["governor"].uninstall_button.isHidden()
    assert not window.cards["persistent-acpi"].open_button.isHidden()
    assert window.cards["cu-bisect"].open_button.menu() is not None        # Bisect / Unlock


def test_no_open_button_without_launch(qapp, home, settings_dir, tmp_path, launched):
    entries = [replace(e, launch=()) if e.key == "governor" else e for e in load(MANIFEST)]
    w = mw.MainWindow(entries, FakeSources(tmp_path / "work"), Records(tmp_path / "installed.json"))
    assert w.cards["governor"].open_button.isHidden()                      # not a program
    w.close()


def test_states_follow_detection_and_records(window, home):
    card = window.cards["governor"]
    assert card.pill.text() == "Not installed" and card.install_button.text() == "Install"
    (home / ".local" / "bin" / "bc250-governor-manager").write_text("#!/bin/sh\n")
    window.refresh()
    assert card.pill.text() == "Installed" and card.install_button.text() == "Reinstall"
    window.records.set("governor", "governor-v0.0.9")
    window.refresh()
    assert card.pill.text() == "Update" and card.install_button.text() == "Update"


def test_board_change_needs_confirmation(window, launched, monkeypatch):
    asked = []
    monkeypatch.setattr(QMessageBox, "warning", lambda *a, **k: (asked.append(a[2]), CANCEL)[1])
    window.install(next(e for e in window.entries if e.key == "persistent-acpi"))
    assert asked and "changes how your BC-250 runs" in asked[0]
    assert window.sources.prepared == [] and launched == []                 # cancelled: nothing happens


def test_no_warning_for_bazzite_test(window, launched, monkeypatch):
    monkeypatch.setattr(QMessageBox, "warning", lambda *a, **k: pytest.fail("no board warning expected"))
    window.install(window.entries[0])
    assert wait_for(lambda: launched)
    line, exit_file = launched[0]
    assert line.endswith("&& bash install.sh") and "local-bazzite-test" not in line
    assert window.pending is not None and window.cards["bazzite-test"].pill.text() == "Installing…"
    assert not window.cards["governor"].install_button.isEnabled()          # one action at a time


def test_install_success_records_tag(window, launched, monkeypatch, home):
    monkeypatch.setattr(QMessageBox, "warning", lambda *a, **k: YES)
    entry = next(e for e in window.entries if e.key == "governor")
    window.install(entry)
    assert wait_for(lambda: launched)
    _, exit_file = launched[0]
    (home / ".local" / "bin" / "bc250-governor-manager").write_text("#!/bin/sh\n")
    exit_file.write_text("0\n")
    window._check_pending()
    assert window.pending is None
    assert window.records.get("governor") == entry.tag
    assert window.cards["governor"].pill.text() == "Installed"


def test_failed_install_warns_and_records_nothing(window, launched, monkeypatch):
    monkeypatch.setattr(QMessageBox, "warning", lambda *a, **k: YES)
    entry = next(e for e in window.entries if e.key == "helixsr")
    window.install(entry)
    assert wait_for(lambda: launched)
    shown = []
    monkeypatch.setattr(QMessageBox, "warning", lambda *a, **k: shown.append(a[2]))
    launched[0][1].write_text("1\n")
    window._check_pending()
    assert window.records.get("helixsr") == "" and shown and "exit status 1" in shown[0]


def test_uninstall_forgets_release(window, launched, monkeypatch, home):
    entry = next(e for e in window.entries if e.key == "helixsr")
    (home / ".local" / "bin" / "bc250-bazzite-helixsr-gui").write_text("#!/bin/sh\n")
    window.records.set("helixsr", entry.tag)
    window.refresh()
    monkeypatch.setattr(QMessageBox, "question", lambda *a, **k: YES)
    window.uninstall(entry)
    assert wait_for(lambda: launched)
    line, exit_file = launched[0]
    assert line.endswith("&& bash install.sh --uninstall")
    exit_file.write_text("0\n")
    window._check_pending()
    assert window.records.get("helixsr") == ""
    assert not window.sources.folder(entry).exists()


def test_closed_terminal_can_be_abandoned(window, launched, monkeypatch):
    window.install(window.entries[0])
    assert wait_for(lambda: launched)
    monkeypatch.setattr(QMessageBox, "question", lambda *a, **k: YES)
    window._on_refresh()
    assert window.pending is None and window.cards["governor"].install_button.isEnabled()


def test_shell_line_quotes_folder():
    line = mw.shell_line(PurePosixPath("/tmp/a b"), ("bash x.sh", "bash y.sh"))
    assert line == "cd '/tmp/a b' && bash x.sh && bash y.sh"


def test_red_dot_and_count_for_updates(window, home):
    for name in ("bc250-governor-manager", "bc250-bazzite-helixsr-gui"):
        (home / ".local" / "bin" / name).write_text("#!/bin/sh\n")
    window.records.set("governor", "governor-v0.0.9")              # older than the pin: an update
    window.records.set("helixsr", next(e.tag for e in window.entries if e.key == "helixsr"))   # the pinned one
    window.refresh()
    assert not window.cards["governor"].dot.isHidden()
    assert window.cards["helixsr"].dot.isHidden()
    assert "governor-v0.0.9" in window.cards["governor"].dot.toolTip()
    assert not window.updates_label.isHidden() and window.updates_label.text().endswith("1 update")
    window.records.set("governor", next(e.tag for e in window.entries if e.key == "governor"))
    window.refresh()
    assert window.cards["governor"].dot.isHidden() and window.updates_label.isHidden()


def portal_window(tmp_path, release):
    return mw.MainWindow(load(MANIFEST), FakeSources(tmp_path / "work"), Records(tmp_path / "installed.json"),
                         portal_check=lambda: release)


def test_newer_portal_release_is_offered(qapp, home, settings_dir, tmp_path, launched, monkeypatch):
    opened = []
    monkeypatch.setattr(mw.QDesktopServices, "openUrl", lambda url: opened.append(url.toString()))
    release = ReleaseInfo(version="99.0.0", tag="portal-v99.0.0", url="https://example.invalid/r", published="2030-01-01")
    w = portal_window(tmp_path, release)
    assert wait_for(lambda: not w.portal_button.isHidden())
    assert w.portal_button.text().endswith("Portal 99.0.0 available")
    w.portal_button.click()
    assert opened == ["https://example.invalid/r"]
    w.close()


@pytest.mark.parametrize("release", [ReleaseInfo(version="0.0.1", tag="portal-v0.0.1"),
                                     ReleaseInfo(error="no connection (offline)"), ReleaseInfo()])
def test_no_portal_offer_when_not_newer_or_offline(qapp, home, settings_dir, tmp_path, launched, release):
    w = portal_window(tmp_path, release)
    assert wait_for(lambda: not w.portal_checker.running, 3000)
    assert w.portal_button.isHidden()
    w.close()
