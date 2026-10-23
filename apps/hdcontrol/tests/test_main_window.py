# SPDX-License-Identifier: GPL-3.0-or-later
"""The window against a fake /sys, a fake controller and a fake update: its states, the check for the latest
firmware, the update with its checks and its backup of the profiles, and the profiles' table."""

from __future__ import annotations

import json
import time

import pytest
from conftest import FakeDevice, plug, unplug
from PyQt6.QtWidgets import QMessageBox

from usb_hdcontrol import firmware, main_window, updater
from test_firmware import image

NOW = 1_800_000_000.0
LATEST = json.dumps({"FwUpdate000BLatestVersion": "0x0630", "FwUpdate0044LatestVersion": "0x0217"}).encode()


@pytest.fixture
def make(qapp, tmp_path, monkeypatch):
    windows = []
    warnings = []
    questions = []
    monkeypatch.setattr(QMessageBox, "warning", lambda *args: warnings.append(args[2]))
    monkeypatch.setattr(QMessageBox, "question",
                        lambda *args: questions.append(args[2]) or QMessageBox.StandardButton.Yes)

    def build(device=None, get=None, update=None, writable=True, check=True):
        main_window.ControlSettings(main_window.INFO).set("check_at_start", check)
        device = device or FakeDevice()
        updates = []

        def fake_update(dev, data, progress):
            updates.append(data)
            progress.done = progress.total = len(data)
            if update:
                update(dev, data, progress)
        urls = []

        def fake_get(url):
            urls.append(url)
            return (get or (lambda u: LATEST if u == firmware.INFO_URL else image()))(url)
        window = main_window.MainWindow(sys_root=tmp_path / "sys", dev=tmp_path / "dev", proc=tmp_path / "proc",
                                        open_device=lambda path, sizes: device, firmware_home=tmp_path / "home",
                                        get=fake_get, update=fake_update, clock=lambda: NOW,
                                        writable=lambda path: writable)
        window.device, window.updates, window.urls = device, updates, urls
        window.warnings, window.questions = warnings, questions
        windows.append(window)
        wait(qapp, lambda: window.check_job.running)
        return window

    yield build
    for window in windows:
        window.shut_down()
        window.deleteLater()


def wait(qapp, busy) -> None:
    end = time.monotonic() + 5
    while busy() and time.monotonic() < end:
        qapp.processEvents()
        time.sleep(0.01)
    qapp.processEvents()
    assert not busy()


def test_no_controller(make):
    window = make()
    assert window.badge.text() == "No controller" and not window.update_pill.isEnabled()
    assert window.controller_box.value.text() == "—" and "No controller found" in window.firmware_text.text()
    assert window.profile_table.rowCount() == 0


def test_an_edge_with_an_update_waiting(make, tmp_path):
    plug(tmp_path / "sys")
    window = make()
    assert window.urls == [firmware.INFO_URL]                   # asked once at start
    assert window.badge.text() == "Update available" and window.update_pill.isEnabled()
    assert window.controller_box.value.text() == "Edge" and window.controller_box.toolTip() == "DualSense Edge"
    assert window.connection_box.value.text() == "USB" and window.battery_box.value.text() == "100 %"
    assert window.update_pill.value.text() == "Update" and window.update_pill.caption.text() == "Firmware"
    assert "0x0217" in window.update_pill.toolTip()
    assert window.firmware_box.value.text() == "0x0200" and window.latest_box.value.text() == "0x0217"
    assert "Jun 21 2024" in window.firmware_text.text() and "downloads it" in window.firmware_text.text()
    assert window.profile_table.rowCount() == 4
    assert window.profile_table.item(0, 0).text() == "Fn + Triangle"
    assert window.profile_table.item(0, 1).text() == "Default Profile"
    assert window.profile_table.item(0, 6).text() == "Each its own"
    assert window.profile_table.item(1, 1).text() == "Empty"


def test_no_check_at_start_when_switched_off_or_recent(make, tmp_path):
    plug(tmp_path / "sys")
    window = make(check=False)
    assert window.urls == [] and window.badge.text() == "Ready" and not window.update_pill.isEnabled()
    main_window.ControlSettings(main_window.INFO).set_latest({0x44: 0x0217}, time.strftime(
        "%Y-%m-%d %H:%M", time.localtime(NOW - 3600)))
    window = make()
    assert window.urls == [] and window.badge.text() == "Update available"


def test_up_to_date(make, tmp_path):
    plug(tmp_path / "sys")
    window = make(get=lambda url: json.dumps({"FwUpdate0044LatestVersion": "0x0200"}).encode())
    assert window.badge.text() == "Up to date" and not window.update_pill.isEnabled()


def test_a_failed_check_is_shown(make, tmp_path):
    plug(tmp_path / "sys")

    def offline(url):
        raise OSError("Name or service not known")
    window = make(get=offline)
    assert window.badge.text() == "Ready" and "could not be read" in window.progress_text.text()


def test_a_dualsense_over_bluetooth(make, tmp_path):
    plug(tmp_path / "sys", product=0x0CE6, bus=0x05, battery=("10", "Discharging"))
    device = FakeDevice({0x20: FakeDevice().reports[0x20][:22] + b"\x0b\x00" + FakeDevice().reports[0x20][24:]})
    window = make(device=device)
    assert window.controller_box.value.text() == "DualSense" and window.connection_box.value.text() == "Bluetooth"
    assert not window.update_pill.isEnabled() and "needs the USB cable" in window.firmware_text.text()
    assert window.update_pill.toolTip() == "The firmware update needs the USB cable."
    assert "has no profiles" in window.profile_text.text() and window.profile_table.rowCount() == 0
    assert window.battery_box.value.text() == "10 %"


def test_no_access(make, tmp_path):
    plug(tmp_path / "sys")
    window = make(writable=False)
    assert window.badge.text() == "Cannot be read" and "uaccess" in window.badge.toolTip()
    assert not window.update_pill.isEnabled()


def test_update_downloads_backs_up_and_sends(make, tmp_path, qapp):
    plug(tmp_path / "sys")
    seen = []
    window = make(update=lambda dev, data, progress: seen.append(window.badge.text()))
    window.update_pill.click()
    assert "0x0217" in window.questions[0] and "downloads it from Sony's update server" in window.questions[0]
    wait(qapp, lambda: window.updating)
    assert window.updates == [image()] and window.warnings == []
    assert window.urls[-1].endswith("/fwupdate0044/0x0217/FWUPDATE0044.bin")
    assert firmware.read(0x44, 0x0217, tmp_path / "home") == image()
    [backup] = (tmp_path / "home" / "profiles").glob("profiles-*.json")
    assert json.loads(backup.read_text())["profiles"][0]["name"] == "Default Profile"
    assert "restarts" in window.progress_text.text() and not window.progress_bar.isVisible()


def test_update_with_the_image_kept_names_its_check(make, tmp_path, qapp):
    plug(tmp_path / "sys")
    firmware.store(image(), tmp_path / "home")
    window = make()
    window.update_pill.click()
    assert "not a file the app knows" in window.questions[0]
    wait(qapp, lambda: window.updating)
    assert window.urls == [firmware.INFO_URL] and window.updates == [image()]


def test_a_failed_update_is_shown(make, tmp_path, qapp):
    plug(tmp_path / "sys")

    def fail(dev, data, progress):
        raise updater.UpdateError("The controller could not write the image to its flash.")
    window = make(update=fail)
    window.update_pill.click()
    wait(qapp, lambda: window.updating)
    assert "could not write" in window.warnings[0] and "did not finish" in window.progress_text.text()


def test_update_refused_while_steam_holds_the_controller(make, tmp_path):
    plug(tmp_path / "sys")
    (tmp_path / "dev").mkdir()
    (tmp_path / "dev" / "hidraw2").touch()
    (tmp_path / "proc/4242/fd").mkdir(parents=True)
    (tmp_path / "proc/4242/comm").write_text("steam\n")
    (tmp_path / "proc/4242/fd/9").symlink_to(tmp_path / "dev" / "hidraw2")
    window = make()
    window.update_pill.click()
    assert "steam has the controller open" in window.warnings[0] and window.questions == []
    assert window.updates == []


def test_use_a_file_refuses_one_for_another_controller(make, tmp_path):
    plug(tmp_path / "sys")
    window = make()
    path = tmp_path / "FWUPDATE000B.bin"
    path.write_bytes(image(product=0x0CE6, target=0x000B, update=0x0630))
    window.use_path(path)
    assert "was not sent" in window.warnings[0] and "target 000B" in window.warnings[0]
    assert window.questions == []


def test_use_a_file(make, tmp_path, qapp):
    plug(tmp_path / "sys")
    window = make()
    path = tmp_path / "FWUPDATE0044.bin"
    path.write_bytes(image(update=0x0216))
    window.use_path(path)
    assert "firmware 0x0216" in window.questions[0]
    wait(qapp, lambda: window.updating)
    assert window.updates == [image(update=0x0216)]


def test_reads_again_when_the_controller_comes_back(make, tmp_path):
    plug(tmp_path / "sys")
    window = make()
    assert window.firmware_box.value.text() == "0x0200"
    unplug(tmp_path / "sys")
    window.refresh()
    assert window.badge.text() == "No controller"
    newer = bytearray(window.device.reports[0x20])
    newer[44:46] = (0x0217).to_bytes(2, "little")
    window.device.reports[0x20] = bytes(newer)
    plug(tmp_path / "sys", instance=5)
    window.refresh()
    assert window.firmware_box.value.text() == "0x0217" and window.badge.text() == "Up to date"


def test_two_controllers_offer_a_choice(make, tmp_path):
    plug(tmp_path / "sys")
    plug(tmp_path / "sys", "hidraw5", product=0x0CE6, bus=0x05, instance=6)
    window = make()
    assert window.controller_combo.isVisibleTo(window) and window.controller_combo.count() == 2
    window.controller_combo.setCurrentIndex(1)
    window.choose(1)
    assert window.controller_box.value.text() == "DualSense"


def test_backup_by_hand(make, tmp_path, monkeypatch):
    plug(tmp_path / "sys")
    window = make()
    target = tmp_path / "mine.json"
    monkeypatch.setattr(main_window.QFileDialog, "getSaveFileName", lambda *args: (str(target), ""))
    window.backup_button.click()
    assert json.loads(target.read_text())["firmware"] == "0x0200"
