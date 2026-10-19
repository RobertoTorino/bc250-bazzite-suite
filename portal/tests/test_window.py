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
from bc250_portal.manifest import load, load_checkout
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
    assert keys[0] == "check"
    assert window.cards["check"].uninstall_button.isHidden()
    assert not window.cards["gpu"].uninstall_button.isHidden()
    assert not window.cards["acpi"].open_button.isHidden()
    assert window.cards["compute"].open_button.menu() is not None        # Bisect / Unlock


def test_every_card_has_its_icon(qapp, home, settings_dir, tmp_path, launched):
    entries = load(MANIFEST) + load_checkout(MANIFEST)
    w = mw.MainWindow(entries, FakeSources(tmp_path / "work"), Records(tmp_path / "installed.json"))
    for key, card in w.cards.items():
        assert (mw.APP_ICONS / f"{key}.webp").is_file(), key
        assert card.has_icon and card.icon.iconSize().width() == mw.ICON_PX, key
    w.close()


def test_open_menu_shows_each_window_icon(window):
    for key in ("compute", "cores"):
        actions = window.cards[key].icon.menu().actions()
        assert [a.text() for a in actions] == ["Bisect", "Unlock"]
        assert all(not a.icon().isNull() for a in actions), key
        assert (mw.APP_ICONS / f"{mw.LAUNCH_ICON_FILES[(key, 'Unlock')]}.webp").is_file()


def test_card_without_icon_file_shows_its_initial(qapp, home, settings_dir, tmp_path, launched, monkeypatch):
    monkeypatch.setattr(mw, "APP_ICONS", tmp_path / "no-icons")
    w = mw.MainWindow(load(MANIFEST), FakeSources(tmp_path / "work"), Records(tmp_path / "installed.json"))
    assert all(not card.has_icon and not card.icon.isHidden() for card in w.cards.values())
    w.close()


def test_the_logo_opens_the_wiki(window, monkeypatch):
    from bc250_core import SUITE_MANUAL_URL
    opened = []
    monkeypatch.setattr(mw.QDesktopServices, "openUrl", lambda url: opened.append(url.toString()))
    window.logo.clicked.emit()
    assert opened == [SUITE_MANUAL_URL]
    assert "wiki" in window.logo.toolTip()


def test_the_header_shows_the_suite_stage(window):
    """Beside the version, with what it means on hover; hidden once STAGE is ""."""
    import bc250_portal
    assert window.stage.text() == bc250_portal.STAGE
    assert window.stage.toolTip() == bc250_portal.STAGE_NOTE
    assert window.stage.isVisibleTo(window) == bool(bc250_portal.STAGE)


def test_the_tiles_icon_hover_and_press(window):
    style = window.cards["gpu"].icon.styleSheet()
    assert "hover:enabled { border-color:#D9D1C4E9; }" in style             # a thin light purple border, visible on dark
    assert "pressed:enabled" in style and "padding-top:2px" in style        # the icon sinks while pressed


def test_short_names_drop_the_suite_prefix(window):
    assert mw.short_name("BC-250 Bazzite Test") == "Bazzite Test"
    assert mw.short_name("BC250 Suite Releases") == "Suite Releases"
    assert mw.short_name("Media Tool") == "Media Tool"
    assert window.cards["gpu"].title.text() == "GPU Governor Manager"
    assert "BC-250 GPU Governor Manager" in window.cards["gpu"].icon.toolTip()     # the full name on hover
    assert window.cards["cec"].title.text() == "HDMI-CEC"                          # apps.toml's short


def test_icon_opens_only_an_installed_program(qapp, home, settings_dir, tmp_path, launched, monkeypatch):
    entries = [replace(e, launch=()) if e.key == "gpu" else e for e in load(MANIFEST)]
    w = mw.MainWindow(entries, FakeSources(tmp_path / "work"), Records(tmp_path / "installed.json"))
    acpi = w.cards["acpi"]
    assert not acpi.icon.isEnabled() and "Not installed" in acpi.icon.toolTip()
    for name in ("bc250-governor-manager", "bc250-persistent-acpi-gui"):
        (home / ".local" / "bin" / name).write_text("#!/bin/sh\n")
    w.refresh()
    assert acpi.icon.isEnabled() and "Click to open it." in acpi.icon.toolTip()
    assert not w.cards["gpu"].icon.isEnabled()                         # not a program
    opened = []
    monkeypatch.setattr(w, "open_app", lambda entry, command: opened.append(command))
    acpi.open_clicked.disconnect()
    acpi.open_clicked.connect(w.open_app)
    acpi.icon.click()
    assert opened == ["~/.local/bin/bc250-persistent-acpi-gui"]
    w.close()


def test_icon_is_greyed_until_installed(window, home):
    card = window.cards["overlay"]
    assert card.icon.icon().cacheKey() == card._icons[1].cacheKey()
    (home / ".local" / "bin" / "bc250-system-overlay").write_text("#!/bin/sh\n")
    window.refresh()
    assert card.icon.icon().cacheKey() == card._icons[0].cacheKey()


def test_board_warning_under_the_icon(window):
    assert not window.cards["gpu"].board.isHidden()
    assert window.cards["overlay"].board.isHidden()


def test_states_follow_detection_and_records(window, home):
    card = window.cards["gpu"]
    assert card.status == "Not installed" and card.install_button.toolTip().startswith("Install ")
    assert not card.uninstall_button.isEnabled()
    (home / ".local" / "bin" / "bc250-governor-manager").write_text("#!/bin/sh\n")
    window.refresh()
    assert card.status == "Reinstall needed" and card.install_button.toolTip().startswith("Reinstall ")
    assert card.uninstall_button.isEnabled()
    window.records.set("gpu", next(e.tag for e in window.entries if e.key == "gpu"))
    window.refresh()
    assert card.status == "Installed" and card.install_button.toolTip().startswith("Reinstall ")
    window.records.set("gpu", "gpu-v0.0.9")
    window.refresh()
    assert card.status == "Update" and card.install_button.toolTip().startswith("Update ")


def _same_icon(button, icon) -> bool:
    size = mw.QSize(mw.SYMBOL_PX, mw.SYMBOL_PX)
    return button.icon().pixmap(size).toImage() == icon.pixmap(size).toImage()


def test_bazzite_test_has_only_reinstall(window, home):
    """With the arrow into a tray, as every app (owner, 14-10-2026), and the version it reinstalls."""
    card = window.cards["check"]
    (home / ".local" / "bin" / "bc250-bazzite-test").write_text("#!/bin/sh\n")
    window.records.set("check", card.entry.tag)
    window.refresh()
    assert card.install_button.toolTip() == f"Reinstall BC-250 Bazzite Test v{card.entry.version}"
    assert card.uninstall_button.isHidden()
    assert _same_icon(card.install_button, mw.glyphs.install(card._ink()))
    window.records.set("check", "")                                      # not installed by the portal
    window.refresh()
    assert _same_icon(card.install_button, mw.glyphs.reinstall(mw.RED))


def test_board_change_needs_confirmation(window, launched, monkeypatch):
    asked = []
    monkeypatch.setattr(QMessageBox, "warning", lambda *a, **k: (asked.append(a[2]), CANCEL)[1])
    window.install(next(e for e in window.entries if e.key == "acpi"))
    assert asked and "changes how your BC-250 runs" in asked[0]
    assert window.sources.prepared == [] and launched == []                 # cancelled: nothing happens


def test_no_warning_for_bazzite_test(window, launched, monkeypatch):
    monkeypatch.setattr(QMessageBox, "warning", lambda *a, **k: pytest.fail("no board warning expected"))
    window.install(window.entries[0])
    assert wait_for(lambda: launched)
    line, exit_file = launched[0]
    assert line.endswith("&& bash install.sh") and "local-check" not in line
    assert window.pending is not None and window.cards["check"].status == "Installing…"
    assert not window.cards["check"].busy_label.isHidden()
    assert not window.cards["gpu"].install_button.isEnabled()          # one action at a time


def test_install_success_records_tag(window, launched, monkeypatch, home):
    monkeypatch.setattr(QMessageBox, "warning", lambda *a, **k: YES)
    entry = next(e for e in window.entries if e.key == "gpu")
    window.install(entry)
    assert wait_for(lambda: launched)
    _, exit_file = launched[0]
    (home / ".local" / "bin" / "bc250-governor-manager").write_text("#!/bin/sh\n")
    exit_file.write_text("0\n")
    old = window.sources.work / "gpu-v0.0.9"                          # the release it updates from
    old.mkdir(parents=True)
    window._check_pending()
    assert window.pending is None
    assert window.records.get("gpu") == entry.tag
    assert not old.exists() and window.sources.folder(entry).is_dir()      # only the installed release stays
    assert window.cards["gpu"].status == "Installed"


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
    assert window.pending is None and window.cards["gpu"].install_button.isEnabled()


def test_shell_line_quotes_folder():
    line = mw.shell_line(PurePosixPath("/tmp/a b"), ("bash x.sh", "bash y.sh"))
    assert line == "cd '/tmp/a b' && bash x.sh && bash y.sh"


def test_red_dot_and_count_for_updates(window, home):
    for name in ("bc250-governor-manager", "bc250-bazzite-helixsr-gui"):
        (home / ".local" / "bin" / name).write_text("#!/bin/sh\n")
    window.records.set("gpu", "gpu-v0.0.9")              # older than the pin: an update
    window.records.set("helixsr", next(e.tag for e in window.entries if e.key == "helixsr"))   # the pinned one
    window.refresh()
    assert not window.cards["gpu"].dot.isHidden()
    assert window.cards["helixsr"].dot.isHidden()
    assert "gpu-v0.0.9" in window.cards["gpu"].dot.toolTip()
    notice = window.notice.text()
    assert "\u25cf 1 update</b>" in notice and "<a href='gpu'>GPU Governor Manager</a> (Sustainable): update to v" in notice
    assert "installed gpu-v0.0.9" in notice and "HelixSR" not in notice
    sustainable = window.tabs.indexOf(window.pages["sustainable"])
    assert window.tabs.tabText(sustainable) == "Sustainable  \u25cf 1"                # the count on its tab
    assert window.tabs.tabText(window.tabs.indexOf(window.pages["graphics"])) == "Graphics"
    window.records.set("gpu", next(e.tag for e in window.entries if e.key == "gpu"))
    window.refresh()
    assert window.cards["gpu"].dot.isHidden() and window.notice.text().startswith("<span style='color:gray;'>No updates")
    assert window.tabs.tabText(sustainable) == "Sustainable"


def test_updates_outside_the_suite(window, home):
    from bc250_core import upstream
    helix = upstream.Outside("HelixSR", "1.8.1", "1.9.3", "2026-10-16", "https://x/v1.9.3",
                             "Get HelixSR… on the Setup page updates it.")
    upstream.publish("helixsr", [helix])
    upstream.publish("pcsx2", [upstream.Outside("PCSX2 nightly", "2.9.127", "2.9.128")])
    window.refresh()
    assert "Outside" not in window.notice.text()                        # neither app is installed
    (home / ".local" / "bin" / "bc250-bazzite-helixsr-gui").write_text("#!/bin/sh\n")
    window.records.set("helixsr", next(e.tag for e in window.entries if e.key == "helixsr"))
    window.refresh()
    notice = window.notice.text()
    assert "No updates" not in notice and "\u25cf Outside the suite</b>" in notice
    assert ("<a href='helixsr'>HelixSR Manager</a> (Graphics): HelixSR 1.9.3 is out (2026-10-16), installed 1.8.1. "
            "Get HelixSR… on the Setup page updates it.") in notice
    assert "PCSX2" not in notice and "Outside the suite" in window.notice.toolTip()
    sustainable_tabs = [window.tabs.tabText(i) for i in range(window.tabs.count())]
    assert not any("\u25cf" in t for t in sustainable_tabs)              # the tab dots are the suite's updates
    # Beside an update of the suite's own:
    (home / ".local" / "bin" / "bc250-governor-manager").write_text("#!/bin/sh\n")
    window.records.set("gpu", "gpu-v0.0.9")
    window.refresh()
    notice = window.notice.text()
    assert notice.index("\u25cf 1 update</b>") < notice.index("Outside the suite")
    # The app found nothing more to install; the portal sees it when its window is active again.
    upstream.publish("helixsr", [])
    window.show_notice(window.marked)
    assert "Outside the suite" not in window.notice.text() and "Outside" not in window.notice.toolTip()


def test_circular_arrow_and_count_for_reinstalls(window, home):
    # Installed but not recorded: by hand, or under an earlier key that RENAMED does not know (shadps4 became
    # shadps4-manager before RENAMED existed).
    for name in ("bc250-governor-manager", "bc250-bazzite-helixsr-gui"):
        (home / ".local" / "bin" / name).write_text("#!/bin/sh\n")
    window.records.set("helixsr", "helixsr-v0.0.1")                          # an update, for the count
    window.refresh()
    card = window.cards["gpu"]
    assert card.status == "Reinstall needed" and not card.badge.isHidden() and card.dot.isHidden()
    assert "Reinstall needed" in card.icon.toolTip() and "version is unknown" in card.badge.toolTip()
    assert card.install_button.toolTip().startswith("Reinstall ")
    assert window.cards["helixsr"].badge.isHidden() and not window.cards["helixsr"].dot.isHidden()
    assert "\u25cf 1 update, 1 reinstall</b>" in window.notice.text()
    assert "<a href='gpu'>GPU Governor Manager</a> (Sustainable): reinstall needed" in window.notice.text()
    window.records.remove("helixsr")
    (home / ".local" / "bin" / "bc250-bazzite-helixsr-gui").unlink()
    window.refresh()
    assert "\u25cf 1 reinstall</b>" in window.notice.text()
    window.records.set("gpu", next(e.tag for e in window.entries if e.key == "gpu"))
    window.refresh()
    assert card.badge.isHidden() and card.status == "Installed" and "No updates" in window.notice.text()


def test_not_installed_and_withdrawn_need_no_reinstall(qapp, home, settings_dir, tmp_path, launched):
    entries = [replace(e, withdrawn="test") if e.key == "gpu" else e for e in load(MANIFEST)]
    w = mw.MainWindow(entries, FakeSources(tmp_path / "work"), Records(tmp_path / "installed.json"))
    (home / ".local" / "bin" / "bc250-governor-manager").write_text("#!/bin/sh\n")
    w.refresh()
    assert w.cards["gpu"].badge.isHidden()                              # the portal removes it instead
    assert w.cards["overlay"].badge.isHidden()                               # not installed
    w.close()


def test_local_build_banner(qapp, home, settings_dir, tmp_path, launched, window):
    assert window.local_banner.isHidden()                       # a published release: no banner
    w = mw.MainWindow(load(MANIFEST), FakeSources(tmp_path / "work"), Records(tmp_path / "installed.json"),
                      local_build=Path("/home/me/bc250-bazzite-suite"))
    assert not w.local_banner.isHidden()
    assert "checkout /home/me/bc250-bazzite-suite" in w.local_banner.text()
    w.close()


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


def test_tiles_flow_in_file_order(window, qapp):
    window.show()
    for category in ("sustainable", "gaming"):
        window.tabs.setCurrentWidget(window.pages[category])
        tiles = [card for card in window.cards.values() if card.entry.category == category and not card.entry.required]
        for width in (1400, 700, 300, 1400):
            window.resize(width, 720)
            qapp.processEvents()
            page = window.pages[category]
            columns = window.columns
            assert columns == window.column_count(page.width() - page.verticalScrollBar().sizeHint().width()
                                                  - mw.PAGE_MARGIN), width
            grid = window.grids[category]
            places = [grid.getItemPosition(grid.indexOf(card))[:2] for card in tiles]
            assert places == [(i // columns, i % columns) for i in range(len(tiles))]   # file order, by rows
    step = mw.TILE_WIDTH + mw.TILE_SPACING
    assert window.column_count(0) == 1
    assert window.column_count(3 * step - mw.TILE_SPACING) == 3 and window.column_count(3 * step - 13) == 2


def test_a_tab_per_category_in_order(window):
    assert [window.tabs.tabText(i) for i in range(window.tabs.count())] == [
        "Sustainable", "Graphics", "Gaming", "Utilities", "Development"]
    for key, card in window.cards.items():
        inside = [c for c, grid in window.grids.items() if grid.indexOf(card) >= 0]
        assert inside == ([] if key == "check" else [card.entry.category]), key
    assert {k for k, c in window.cards.items() if c.entry.category == "graphics"} == {"helixsr", "ace", "mesh"}
    assert window.tabs.currentWidget() is window.pages["sustainable"]           # the first tab, the first time


def test_bazzite_test_above_the_tabs(window):
    check = window.cards["check"]
    assert not window.tabs.isAncestorOf(check) and check.parentWidget() is window.notice.parentWidget()
    assert "Sustainable" not in window.notice.text()


def test_the_tab_used_last_is_remembered(qapp, home, settings_dir, tmp_path, launched):
    w = mw.MainWindow(load(MANIFEST), FakeSources(tmp_path / "work"), Records(tmp_path / "installed.json"))
    w.tabs.setCurrentWidget(w.pages["gaming"])
    assert w.settings.value(mw.TAB_KEY) == "gaming"
    w.close()
    again = mw.MainWindow(load(MANIFEST), FakeSources(tmp_path / "work"), Records(tmp_path / "installed.json"))
    assert again.tabs.currentWidget() is again.pages["gaming"]
    again.close()


def test_a_link_in_the_notice_opens_the_tab_of_its_app(window, home):
    (home / ".local" / "bin" / "bc250-rpcs3-manager").write_text("#!/bin/sh\n")
    window.records.set("rpcs3", "rpcs3-v0.0.1")
    window.refresh()
    assert "<a href='rpcs3'>RPCS3 Manager</a> (Gaming)" in window.notice.text()
    window.notice.linkActivated.emit("rpcs3")
    assert window.tabs.currentWidget() is window.pages["gaming"]
    window.notice.linkActivated.emit("check")                                   # above the tabs: stays put
    assert window.tabs.currentWidget() is window.pages["gaming"]


def test_development_tab_says_it_is_not_needed(window):
    page = window.pages["development"].widget()
    assert "You do not need these to use the board." in page.findChild(mw.QLabel).text()
    assert {k for k, c in window.cards.items() if c.entry.development} == {"mtool", "package", "ncgui"}


def test_no_tab_without_its_apps(qapp, home, settings_dir, tmp_path, launched):
    entries = [e for e in load(MANIFEST) if e.category not in ("gaming", "development")]
    w = mw.MainWindow(entries, FakeSources(tmp_path / "work"), Records(tmp_path / "installed.json"))
    assert list(w.pages) == ["sustainable", "graphics", "utilities"]
    w.close()


def test_checkout_only_app_has_no_update(qapp, home, settings_dir, tmp_path, launched):
    entries = load(MANIFEST) + load_checkout(MANIFEST)
    sources = FakeSources(tmp_path / "work")
    sources.checkout = Path("/checkout")                                    # a portal from a checkout
    w = mw.MainWindow(entries, sources, Records(tmp_path / "installed.json"))
    card = w.cards["suite"]
    assert w.grids["development"].indexOf(card) >= 0
    (home / ".local" / "bin" / "bc250-release").write_text("#!/bin/sh\n")
    w.records.set("suite", "local")
    w.refresh()
    assert card.status == "Installed" and card.dot.isHidden() and "suite checkout" in card.icon.toolTip()
    w.close()


def test_portal_offer_names_the_app_updates(qapp, home, settings_dir, tmp_path, launched):
    from bc250_portal.portal_update import AppChange, PortalUpdate
    release = ReleaseInfo(version="99.0.0", tag="portal-v99.0.0", url="https://example.invalid/r", published="2030-01-01")
    update = PortalUpdate(release, [AppChange("BC-250 ACE Queues", "0.1.0", "0.1.1"),
                                    AppChange("BC-250 Memory Manager", "0.1.0", "0.1.1")])
    w = portal_window(tmp_path, update)
    assert wait_for(lambda: not w.portal_button.isHidden())
    assert w.portal_button.text().endswith("Portal 99.0.0: updates ACE Queues and Memory Manager")
    tip = w.portal_button.toolTip()
    assert "App updates come with the portal" in tip and "BC-250 Memory Manager: 0.1.0 → 0.1.1" in tip
    w.close()
    same = portal_window(tmp_path, PortalUpdate(release, []))
    assert wait_for(lambda: not same.portal_button.isHidden())
    assert same.portal_button.text().endswith("Portal 99.0.0 available") and "same app versions" in same.portal_button.toolTip()
    same.close()


SUITE = Path(__file__).resolve().parents[2]                                  # this checkout


def test_a_release_portal_finds_the_checkout_without_asking(qapp, home, settings_dir, tmp_path, launched,
                                                            monkeypatch):
    """A portal installed from a release installs the checkout-only apps too, from the checkout on this machine."""
    from bc250_portal import remembered_checkout
    monkeypatch.setattr(mw.QFileDialog, "getExistingDirectory", lambda *a: pytest.fail("asked for a folder"))
    monkeypatch.setattr(QMessageBox, "question", lambda *a: pytest.fail("asked a question"))
    (home / ".local/bin/bc250-release").write_text(f'#!/bin/sh\nexec "{SUITE}/apps/suite/run.sh"\n')
    entries = load(MANIFEST) + load_checkout(MANIFEST)
    sources = FakeSources(tmp_path / "work")                                # a release: no checkout of its own
    w = mw.MainWindow(entries, sources, Records(tmp_path / "installed.json"))
    w.install(w.cards["installer-tests"].entry)
    assert wait_for(lambda: launched)
    assert sources.apps_checkout == SUITE and remembered_checkout() == SUITE
    assert launched[0][0].startswith(f"cd {SUITE / 'tools/installer-tests/gui'} && ")
    assert sources.prepared == ["installer-tests"] and w.pending.tag == "local"
    assert sources.folder(w.cards["gpu"].entry).name == w.cards["gpu"].entry.tag   # releases as before
    w.cancel_pending()
    w.close()


def test_without_a_checkout_it_asks_first(qapp, home, settings_dir, tmp_path, launched, monkeypatch):
    from bc250_portal import remembered_checkout
    entries = load(MANIFEST) + load_checkout(MANIFEST)
    sources = FakeSources(tmp_path / "work")
    w = mw.MainWindow(entries, sources, Records(tmp_path / "installed.json"))
    card = w.cards["installer-tests"]
    assert card.status == "Not installed" and card.install_button.isEnabled() and "found no checkout" in card.icon.toolTip()
    asked = []
    monkeypatch.setattr(QMessageBox, "question", lambda *a: asked.append(a[2]) or QMessageBox.StandardButton.No)
    monkeypatch.setattr(mw.QFileDialog, "getExistingDirectory", lambda *a: pytest.fail("no folder without a yes"))
    w.install(card.entry)
    assert "found none" in asked[0] and sources.prepared == [] and remembered_checkout() is None
    monkeypatch.setattr(QMessageBox, "question", lambda *a: QMessageBox.StandardButton.Yes)
    monkeypatch.setattr(mw.QFileDialog, "getExistingDirectory", lambda *a: str(SUITE))
    w.install(card.entry)
    assert wait_for(lambda: launched) and remembered_checkout() == SUITE
    w.cancel_pending()
    w.close()


def test_a_folder_that_is_not_the_suite_is_refused(qapp, home, settings_dir, tmp_path, launched, monkeypatch):
    from bc250_portal import remembered_checkout
    warned = []
    monkeypatch.setattr(QMessageBox, "warning", lambda _p, _t, text, *a: warned.append(text))
    monkeypatch.setattr(QMessageBox, "question", lambda *a: QMessageBox.StandardButton.Yes)
    monkeypatch.setattr(mw.QFileDialog, "getExistingDirectory", lambda *a: str(tmp_path))
    entries = load(MANIFEST) + load_checkout(MANIFEST)
    sources = FakeSources(tmp_path / "work")
    w = mw.MainWindow(entries, sources, Records(tmp_path / "installed.json"))
    w.install(w.cards["suite"].entry)
    assert "is not a BC250 Bazzite Suite checkout" in warned[0]
    assert sources.apps_checkout is None and sources.prepared == [] and remembered_checkout() is None
    w.close()


def test_an_installed_checkout_app_still_opens(qapp, home, settings_dir, tmp_path, launched):
    entries = load(MANIFEST) + load_checkout(MANIFEST)
    w = mw.MainWindow(entries, FakeSources(tmp_path / "work"), Records(tmp_path / "installed.json"))
    (home / ".local" / "bin" / "bc250-release").write_text("#!/bin/sh\n")   # installed from a checkout before
    w.refresh()
    card = w.cards["suite"]
    assert card.status == "Reinstall needed" and card.icon.isEnabled() and card.uninstall_button.isEnabled()
    assert w.cards["mtool"].install_button.isEnabled()                  # released development apps as usual
    w.close()


def icons_window(tmp_path, desktop, names=("bc250-hdmi-cec.desktop", "bc250-governor-manager.desktop")):
    menu = tmp_path / "applications"
    menu.mkdir(exist_ok=True)
    for name in ("bc250-bazzite-suite.desktop", *names):
        (menu / name).write_text("[Desktop Entry]\n")
        (desktop / name).write_text("[Desktop Entry]\n")
    return mw.MainWindow(load(MANIFEST), FakeSources(tmp_path / "work"), Records(tmp_path / "installed.json"),
                         desktop=desktop, menu=menu)


def test_first_start_asks_about_app_icons(qapp, home, settings_dir, tmp_path, launched, desktop, monkeypatch):
    asked = []
    monkeypatch.setattr(QMessageBox, "question", lambda *a, **k: (asked.append(a[2]),
                                                                  QMessageBox.StandardButton.No)[1])
    w = icons_window(tmp_path, desktop)
    w.settle_icons()
    assert len(asked) == 1 and "Keep the app icons on the Desktop?" in asked[0]
    assert sorted(p.name for p in desktop.iterdir()) == ["bc250-bazzite-suite.desktop"]     # the portal's stays
    assert not w.icons_box.isChecked()
    w.settle_icons()
    assert len(asked) == 1                                                                   # asked once
    w.icons_box.setChecked(True)
    assert (desktop / "bc250-hdmi-cec.desktop").is_file() and (desktop / "bc250-governor-manager.desktop").is_file()
    w.close()


def test_keeping_the_icons(qapp, home, settings_dir, tmp_path, launched, desktop, monkeypatch):
    monkeypatch.setattr(QMessageBox, "question", lambda *a, **k: YES)
    w = icons_window(tmp_path, desktop)
    w.settle_icons()
    assert w.icons_box.isChecked() and (desktop / "bc250-hdmi-cec.desktop").is_file()
    w.close()


def test_no_question_without_app_icons(qapp, home, settings_dir, tmp_path, launched, desktop, monkeypatch):
    monkeypatch.setattr(QMessageBox, "question", lambda *a, **k: pytest.fail("nothing to ask"))
    w = icons_window(tmp_path, desktop, names=())
    w.settle_icons()
    assert not w.icons_box.isChecked()
    w.close()


def test_an_install_with_icons_off_removes_the_new_icon(qapp, home, settings_dir, tmp_path, launched, desktop,
                                                        monkeypatch):
    monkeypatch.setattr(QMessageBox, "question", lambda *a, **k: QMessageBox.StandardButton.No)
    w = icons_window(tmp_path, desktop)
    w.settle_icons()
    entry = next(e for e in w.entries if e.key == "cec")
    w.install(entry)
    assert wait_for(lambda: launched)
    (desktop / "bc250-hdmi-cec.desktop").write_text("[Desktop Entry]\n")                   # the installer's icon
    launched[0][1].write_text("0\n")
    w._check_pending()
    assert not (desktop / "bc250-hdmi-cec.desktop").exists() and (desktop / "bc250-bazzite-suite.desktop").exists()
    w.close()


def _withdrawn_window(home, tmp_path, installed: bool):
    entries = [replace(e, withdrawn="Privacy: shows the account ID.") if e.key == "helixsr" else e
               for e in load(MANIFEST)]
    if installed:
        (home / ".local" / "bin" / "bc250-bazzite-helixsr-gui").write_text("#!/bin/sh\n")
    return mw.MainWindow(entries, FakeSources(tmp_path / "work"), Records(tmp_path / "installed.json"))


def test_a_withdrawn_app_is_not_available(qapp, home, settings_dir, tmp_path, launched, monkeypatch):
    w = _withdrawn_window(home, tmp_path, installed=False)
    try:
        card = w.cards["helixsr"]
        assert not card.withdrawn.isHidden() and card.withdrawn.text() == "App not available"
        assert card.status == "App not available" and not card.install_button.isEnabled()
        assert "Privacy: shows the account ID." in card.install_button.toolTip()
        assert "It cannot be installed." in card.icon.toolTip()
        assert w.cards["gpu"].withdrawn.isHidden()
        w.remove_withdrawn()                                # not installed: nothing to remove
        assert launched == []
    finally:
        w.close()


def test_the_portal_removes_a_withdrawn_app(qapp, home, settings_dir, tmp_path, launched, monkeypatch):
    told = []
    monkeypatch.setattr(QMessageBox, "information", lambda *a, **k: told.append(a[2]))
    w = _withdrawn_window(home, tmp_path, installed=True)
    try:
        assert wait_for(lambda: launched)                   # at start, after telling why
        assert told and "is not available any more" in told[0] and "Privacy: shows the account ID." in told[0]
        line, exit_file = launched[0]
        assert line.endswith("&& bash install.sh --uninstall")
        card = w.cards["helixsr"]
        assert not card.icon.isEnabled() and card.dot.isHidden()          # no opening, no update
        (home / ".local" / "bin" / "bc250-bazzite-helixsr-gui").unlink()
        exit_file.write_text("0\n")
        w._check_pending()
        assert card.status == "App not available" and "It cannot be installed." in card.icon.toolTip()
        w.remove_withdrawn()
        assert len(launched) == 1 and len(told) == 1        # removed: not again
    finally:
        w.close()


def test_a_withdrawn_app_that_could_not_be_removed_stays_removable(qapp, home, settings_dir, tmp_path, launched,
                                                                     monkeypatch):
    monkeypatch.setattr(QMessageBox, "information", lambda *a, **k: None)
    warned = []
    monkeypatch.setattr(QMessageBox, "warning", lambda *a, **k: warned.append(a[2]))
    w = _withdrawn_window(home, tmp_path, installed=True)
    try:
        assert wait_for(lambda: launched)
        launched[0][1].write_text("1\n")
        w._check_pending()
        assert warned and "exit status 1" in warned[0]
        card = w.cards["helixsr"]
        assert card.uninstall_button.isEnabled()            # the user can try again by hand
        assert "The portal removes it from the board." in card.icon.toolTip()
        assert len(launched) == 1                           # tried once per start, not in a loop
    finally:
        w.close()


def _installed(tmp_path, version: str) -> Path:
    link = tmp_path / "opt" / "bc250-bazzite-suite"
    link.mkdir(parents=True, exist_ok=True)
    (link / "VERSION").write_text(version + "\n")
    return link


def test_restart_into_a_portal_installed_meanwhile(qapp, home, settings_dir, tmp_path, launched, monkeypatch):
    started = []
    link = _installed(tmp_path, mw.__version__)
    w = mw.MainWindow(load(MANIFEST), FakeSources(tmp_path / "work"), Records(tmp_path / "installed.json"),
                      installed=link, launch=lambda argv: (started.append(argv), True)[1])
    assert w.restart_button.isHidden()                                      # the one installed is this one
    w._portal_checked(ReleaseInfo("99.0.0", "portal-v99.0.0", "https://example.invalid", "2026-10-14"))
    assert not w.portal_button.isHidden()
    _installed(tmp_path, "99.0.0")                                           # its install.sh ran in a terminal
    w.check_installed()
    assert w.restart_button.text() == "\u25cf Restart: portal 99.0.0 is installed"
    assert w.restart_button.isEnabled() and w.portal_button.isHidden()
    w.pending = object()                                                     # an install runs: wait for it
    w.check_installed()
    assert not w.restart_button.isEnabled() and "running now" in w.restart_button.toolTip()
    w.restart_portal()
    assert started == []
    w.pending = None
    w.restart_portal()
    assert started == [["sh", "-c", 'sleep 1; exec "$0"', str(home / ".local" / "bin" / "bc250-bazzite-suite")]]
    assert not w.isVisible()


def test_restart_that_cannot_start(qapp, home, settings_dir, tmp_path, launched, monkeypatch):
    warned = []
    monkeypatch.setattr(QMessageBox, "warning", lambda *a, **k: warned.append(a[2]))
    w = mw.MainWindow(load(MANIFEST), FakeSources(tmp_path / "work"), Records(tmp_path / "installed.json"),
                      installed=_installed(tmp_path, "99.0.0"), launch=lambda argv: False)
    w.show()
    w.restart_portal()
    assert "could not be started again" in warned[0] and w.isVisible()
    w.close()


def test_no_restart_from_a_checkout(window):
    from bc250_portal import installed_copy
    assert installed_copy() is None and window.installed is None and window.restart_button.isHidden()


def test_one_theme_for_every_app(window, home):
    """The theme box shows the chosen theme and keeps a new choice for every app; the portal says when it shows."""
    from bc250_core import theme
    assert window.theme_box.currentData() == theme.theme_name() == "gunmetal"
    assert [window.theme_box.itemText(i) for i in range(window.theme_box.count())] == ["Gunmetal", "Silver", "Warm"]
    assert window.theme_note.isHidden()
    window.theme_box.setCurrentIndex(window.theme_box.findData("silver"))
    assert theme.theme_name() == "silver" and theme.theme_file().is_relative_to(home)
    assert not window.theme_note.isHidden()
