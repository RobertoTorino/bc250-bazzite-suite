# SPDX-License-Identifier: GPL-3.0-or-later
# The layout follows dualsense-edge-profile-web-application (src/helper/bytesToProfile.ts and src/enum/), MIT,
# Copyright (c) 2023 steffalon; the MIT notice is in the README's License section.
"""The DualSense Edge's four profiles, read from the controller: feature reports 0x70 to 0x7B, three per profile,
in the order Fn + Triangle (the default profile), Square, Cross, Circle. The app reads them and keeps a backup;
it does not write them.

A report's byte 1 is its part (0, 1, 2), or 0x10 for an empty slot. The name is UTF-16LE in part 0 from byte 6 and
part 1 from byte 2 to 27. Part 2 holds the triggers' ranges (bytes 4 to 7), the button map (bytes 10 to 25, one per
input: what it sends), the sticks' curves (bytes 30 and 32) and a CRC-32 of the three parts (bytes 56 to 59: parts
0 and 1 from byte 2 to 59, part 2 from 2 to 55). Measured on the owner's Edge (23-10-2026): the default profile
"Default Profile", full trigger ranges, every button its own, both sticks Default, CRC correct; the other slots
empty."""

from __future__ import annotations

import json
import time
import zlib
from dataclasses import dataclass
from pathlib import Path

from .hidraw import Device

FIRST_REPORT = 0x70
SLOTS = ("Triangle", "Square", "Cross", "Circle")      # Fn + this button selects the profile
EMPTY = 0x10
CURVES = {0: "Default", 1: "Quick", 2: "Precise", 3: "Steady", 4: "Digital", 5: "Dynamic"}
INPUTS = ("Up", "Left", "Down", "Right", "Circle", "Cross", "Square", "Triangle", "R1", "R2", "R3", "L1", "L2", "L3",
          "Left back button", "Right back button")
OUTPUTS = {**dict(enumerate(INPUTS)), 0x10: "Options", 0x11: "Touchpad"}


@dataclass(frozen=True)
class Profile:
    slot: str                       # SLOTS
    reports: tuple[bytes, bytes, bytes]
    empty: bool
    name: str = ""
    left_curve: str = ""
    right_curve: str = ""
    triggers: tuple[int, int, int, int] = (0, 255, 0, 255)  # L2 start, end, R2 start, end (0 to 255)
    remapped: tuple[tuple[str, str], ...] = ()               # (input, what it sends), only those not its own
    crc_ok: bool = True

    @property
    def label(self) -> str:
        return f"Fn + {self.slot}"


def checksum(reports: tuple[bytes, bytes, bytes]) -> int:
    return zlib.crc32(reports[0][2:60] + reports[1][2:60] + reports[2][2:56])


def _name(reports: tuple[bytes, bytes, bytes]) -> str:
    raw = reports[0][6:60] + reports[1][2:28]
    text = raw.decode("utf-16-le", "replace")
    return "".join(text.split("\0")).strip()


def parse(slot: str, reports: tuple[bytes, bytes, bytes]) -> Profile:
    if any(len(report) < 64 for report in reports):
        raise ValueError(f"the reports of profile Fn + {slot} are too short")
    if reports[0][1] == EMPTY:
        return Profile(slot, reports, True)
    third = reports[2]
    remapped = tuple((INPUTS[i], OUTPUTS.get(value, f"0x{value:02x}")) for i, value in enumerate(third[10:26])
                     if value != i)
    curve = lambda value: CURVES.get(value, f"0x{value:02x}")  # noqa: E731
    return Profile(slot, reports, False, _name(reports), curve(third[30]), curve(third[32]),
                   (third[4], third[5], third[6], third[7]), remapped,
                   checksum(reports) == int.from_bytes(third[56:60], "little"))


def read(device: Device) -> list[Profile]:
    profiles = []
    for index, slot in enumerate(SLOTS):
        first = FIRST_REPORT + 3 * index
        reports = tuple(device.get_feature(first + part)[:64].ljust(64, b"\0") for part in range(3))
        profiles.append(parse(slot, reports))
    return profiles


# The drawing's part (drawing.PARTS) for each input of the button map.
INPUT_PARTS = {"Up": "dpad", "Left": "dpad", "Down": "dpad", "Right": "dpad", "Circle": "face", "Cross": "face",
               "Square": "face", "Triangle": "face", "R1": "bumpers", "L1": "bumpers", "R2": "triggers",
               "L2": "triggers", "R3": "sticks", "L3": "sticks", "Left back button": "back",
               "Right back button": "back"}
FULL_RANGE = (0, 255, 0, 255)


def changed_parts(profile: Profile) -> set[str]:
    """The parts of the controller a profile sets apart from their defaults, for the drawing to light: the sticks
    for another curve, the triggers for a shorter range, and each remapped input."""
    if profile.empty:
        return set()
    parts = {INPUT_PARTS[source] for source, _target in profile.remapped}
    if (profile.left_curve, profile.right_curve) != ("Default", "Default"):
        parts.add("sticks")
    if profile.triggers != FULL_RANGE:
        parts.add("triggers")
    return parts


def trigger_text(start: int, end: int) -> str:
    return f"{round(start * 100 / 255)} to {round(end * 100 / 255)} %"


def folder(home: Path | None = None) -> Path:
    from .firmware import folder as firmware_folder
    return firmware_folder(home).parent / "profiles"


def backup(profiles: list[Profile], target: Path, model: str, firmware: str) -> Path:
    """The profiles' reports as they came from the controller, in JSON: enough to compare, or to write them back
    once the app can."""
    data = {"app": "bc250-usb-hdcontrol", "controller": model, "firmware": firmware,
            "saved": time.strftime("%Y-%m-%d %H:%M:%S"),
            "profiles": [{"slot": p.label, "name": p.name, "empty": p.empty,
                          "reports": {f"0x{p.reports[i][0]:02x}": p.reports[i].hex() for i in range(3)}}
                         for p in profiles]}
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text(json.dumps(data, indent=2) + "\n")
    return target


def backup_path(home: Path | None = None, now: float | None = None) -> Path:
    stamp = time.strftime("%Y%m%d-%H%M%S", time.localtime(now))
    return folder(home) / f"profiles-{stamp}.json"
