# SPDX-License-Identifier: GPL-3.0-or-later
from __future__ import annotations

import json

from conftest import DEFAULT_PROFILE, FakeDevice, empty_slot, profile_reports
from usb_hdcontrol import profiles


def test_the_owners_default_profile():
    profile = profiles.parse("Triangle", DEFAULT_PROFILE)
    assert not profile.empty and profile.crc_ok
    assert profile.label == "Fn + Triangle" and profile.name == "Default Profile"
    assert (profile.left_curve, profile.right_curve) == ("Default", "Default")
    assert profile.triggers == (0, 255, 0, 255) and profile.remapped == ()


def test_an_empty_slot():
    assert profiles.parse("Square", empty_slot(0x73)).empty


def test_a_profile_with_curves_triggers_and_remapped_buttons():
    third = bytearray(DEFAULT_PROFILE[2][2:56])
    third[2:6] = bytes([26, 230, 0, 128])           # L2 10 to 90 %, R2 0 to 50 %
    third[8 + 5] = 0x04                             # Cross sends Circle
    third[8 + 14] = 0x10                            # the left back button sends Options
    third[28], third[30] = 2, 5                     # Precise, Dynamic
    profile = profiles.parse("Cross", profile_reports(0x76, "FPS with a long name, forty characters!", bytes(third)))
    assert profile.name == "FPS with a long name, forty characters!"
    assert (profile.left_curve, profile.right_curve) == ("Precise", "Dynamic")
    assert profiles.trigger_text(*profile.triggers[:2]) == "10 to 90 %"
    assert profiles.trigger_text(*profile.triggers[2:]) == "0 to 50 %"
    assert profile.remapped == (("Cross", "Circle"), ("Left back button", "Options"))
    assert profile.crc_ok


def test_a_changed_byte_fails_the_checksum():
    reports = list(DEFAULT_PROFILE)
    reports[1] = reports[1][:10] + b"\x01" + reports[1][11:]
    assert not profiles.parse("Triangle", tuple(reports)).crc_ok


def test_read_asks_for_the_twelve_reports_in_order():
    asked = []

    class Recording(FakeDevice):
        def get_feature(self, report_id):
            asked.append(report_id)
            return super().get_feature(report_id)
    read = profiles.read(Recording())
    assert asked == list(range(0x70, 0x7C))
    assert [p.slot for p in read] == ["Triangle", "Square", "Cross", "Circle"]
    assert [p.empty for p in read] == [False, True, True, True]


def test_backup_keeps_the_reports(tmp_path):
    read = profiles.read(FakeDevice())
    target = profiles.backup(read, tmp_path / "b" / "profiles.json", "DualSense Edge", "0x0200")
    data = json.loads(target.read_text())
    assert data["controller"] == "DualSense Edge" and data["firmware"] == "0x0200"
    first = data["profiles"][0]
    assert first["slot"] == "Fn + Triangle" and first["name"] == "Default Profile"
    assert first["reports"]["0x72"] == DEFAULT_PROFILE[2].hex()
    assert data["profiles"][3]["empty"] is True


def test_backup_path(tmp_path):
    path = profiles.backup_path(tmp_path, 0)
    assert path.parent == tmp_path / "profiles" and path.name.startswith("profiles-19")
