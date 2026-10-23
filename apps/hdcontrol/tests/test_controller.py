# SPDX-License-Identifier: GPL-3.0-or-later
from __future__ import annotations

import pytest

from conftest import DESCRIPTOR, FIRMWARE_REPORT, plug
from usb_hdcontrol import controller, hidraw


def test_feature_sizes_of_the_owners_edge():
    sizes = hidraw.feature_sizes(DESCRIPTOR)
    assert sizes[0x20] == 64
    assert sizes[0xF4] == 64 and sizes[0xF5] == 4
    assert all(sizes[report] == 64 for report in range(0x70, 0x7C))
    assert sizes[0x05] == 41 and sizes[0x09] == 20


def test_feature_sizes_ignore_input_and_output_reports():
    sizes = hidraw.feature_sizes(DESCRIPTOR)
    assert 0x01 not in sizes and 0x02 not in sizes


def test_parse_info_as_hid_playstation_reads_it():
    info = controller.parse_info(FIRMWARE_REPORT)
    assert (info.build_date, info.build_time) == ("Jun 21 2024", "19:09:17")
    assert info.target == 0x0044
    assert info.hardware == 0x01000216 and info.firmware == 0x01000078      # the kernel's log says the same
    assert info.update == 0x0200


@pytest.mark.parametrize("data", [b"", FIRMWARE_REPORT[:40], b"\x21" + FIRMWARE_REPORT[1:]])
def test_parse_info_refuses_another_report(data):
    with pytest.raises(ValueError):
        controller.parse_info(data)


def test_find_the_edge_on_usb_with_its_battery(tmp_path):
    plug(tmp_path)
    [found] = controller.find(tmp_path)
    assert (found.name, found.edge, found.connection, found.node) == ("DualSense Edge", True, "USB cable", "hidraw2")
    assert found.battery == controller.Battery(100, "Full")
    assert found.sizes()[0xF4] == 64


def test_find_a_dualsense_over_bluetooth_and_lists_usb_first(tmp_path):
    plug(tmp_path, "hidraw1", product=0x0CE6, bus=0x05, instance=4, battery=("40", "Discharging"))
    plug(tmp_path, "hidraw3")
    found = controller.find(tmp_path)
    assert [(c.node, c.bus) for c in found] == [("hidraw3", "usb"), ("hidraw1", "bluetooth")]
    assert found[1].name == "DualSense" and not found[1].edge
    assert found[1].battery == controller.Battery(40, "Discharging")


def test_find_skips_other_devices_and_a_missing_battery(tmp_path):
    plug(tmp_path, "hidraw0", product=0x250A, vendor=0x413C, bus=0x05)
    plug(tmp_path, "hidraw2", battery=None)
    [found] = controller.find(tmp_path)
    assert found.node == "hidraw2" and found.battery is None


def test_find_nothing(tmp_path):
    assert controller.find(tmp_path) == []


def test_holders_names_other_programs(tmp_path):
    node = tmp_path / "hidraw2"
    node.touch()
    for pid, name, target in (("100", "steam", node), ("200", "bash", tmp_path / "other")):
        (tmp_path / "proc" / pid / "fd").mkdir(parents=True)
        (tmp_path / "proc" / pid / "comm").write_text(name + "\n")
        (tmp_path / "proc" / pid / "fd" / "3").symlink_to(target)
    assert controller.holders(node, tmp_path / "proc") == ["steam"]


def test_device_pads_reports_to_the_declared_size(monkeypatch, tmp_path):
    calls = []
    monkeypatch.setattr(hidraw.os, "open", lambda *_a: 7)
    monkeypatch.setattr(hidraw.os, "close", lambda _fd: None)
    monkeypatch.setattr(hidraw.fcntl, "ioctl", lambda fd, request, buffer: calls.append((request, bytes(buffer))))
    with hidraw.Device(tmp_path / "hidraw2", {0xF4: 64}) as device:
        device.set_feature(b"\xf4\x01\x02ab")
        with pytest.raises(ValueError):
            device.set_feature(b"\xf4" + bytes(64))
    request, data = calls[0]
    assert len(data) == 64 and data[:5] == b"\xf4\x01\x02ab" and data[5:] == bytes(59)
    assert request == (3 << 30) | (64 << 16) | (ord("H") << 8) | 0x06
