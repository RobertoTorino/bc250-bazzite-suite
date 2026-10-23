# SPDX-License-Identifier: GPL-3.0-or-later
"""Finding the controllers in /sys: each DualSense and DualSense Edge the kernel's hid-playstation drives has a
hidraw node, a connection (USB or Bluetooth) and a battery (its power_supply). The firmware report (0x20) says which
firmware runs. The controller's MAC address names its battery folder and is its HID_UNIQ; the app never shows it."""

from __future__ import annotations

import os
from dataclasses import dataclass
from pathlib import Path

from . import hidraw

SYS = Path("/sys")
DEV = Path("/dev")
PROC = Path("/proc")
VENDOR = 0x054C
MODELS = {0x0CE6: "DualSense", 0x0DF2: "DualSense Edge"}
EDGE = 0x0DF2
BUSES = {0x03: "usb", 0x05: "bluetooth"}
CONNECTIONS = {"usb": "USB cable", "bluetooth": "Bluetooth"}
REPORT_FIRMWARE = 0x20
NOT_FOUND = ("Plug the controller in with a USB cable, or pair it over Bluetooth: hold Create and the PS button "
             "until the light bar flashes, then pair it in the system's Bluetooth settings.")


@dataclass(frozen=True)
class Battery:
    capacity: int | None            # percent; the controller reports it in steps of 10
    status: str                     # "Charging", "Discharging", "Full", "Not charging", "Unknown"


@dataclass(frozen=True)
class Controller:
    node: str                       # "hidraw2"
    product: int
    bus: str                        # BUSES
    sys_path: Path                  # /sys/class/hidraw/<node>/device
    battery: Battery | None

    @property
    def name(self) -> str:
        return MODELS[self.product]

    @property
    def edge(self) -> bool:
        return self.product == EDGE

    @property
    def connection(self) -> str:
        return CONNECTIONS.get(self.bus, self.bus)

    def path(self, dev: Path = DEV) -> Path:
        return dev / self.node

    def sizes(self) -> dict[int, int]:
        try:
            return hidraw.feature_sizes((self.sys_path / "report_descriptor").read_bytes())
        except OSError:
            return {}


@dataclass(frozen=True)
class FirmwareInfo:
    """Report 0x20, as hid-playstation reads it: the update version is what Sony's server lists and the update
    image carries (0x0217), the target is the image's FWUPDATE<target> (the DualSense Edge's is 0x0044)."""
    build_date: str
    build_time: str
    target: int
    hardware: int
    firmware: int
    update: int


def _ascii(data: bytes) -> str:
    return data.split(b"\0", 1)[0].decode("ascii", "replace").strip()


def parse_info(data: bytes) -> FirmwareInfo:
    if len(data) < 46 or data[0] != REPORT_FIRMWARE:
        raise ValueError("the controller's firmware report is too short")
    word = lambda offset, size: int.from_bytes(data[offset:offset + size], "little")  # noqa: E731
    return FirmwareInfo(_ascii(data[1:12]), _ascii(data[12:20]), word(22, 2), word(24, 4), word(28, 4), word(44, 2))


def read_info(device: hidraw.Device) -> FirmwareInfo:
    return parse_info(device.get_feature(REPORT_FIRMWARE))


def _uevent(path: Path) -> dict[str, str]:
    try:
        lines = path.read_text().splitlines()
    except OSError:
        return {}
    return dict(line.split("=", 1) for line in lines if "=" in line)


def _battery(device: Path) -> Battery | None:
    for supply in sorted((device / "power_supply").glob("*")):
        def read(name: str) -> str:
            try:
                return (supply / name).read_text().strip()
            except OSError:
                return ""
        capacity = read("capacity")
        return Battery(int(capacity) if capacity.isdigit() else None, read("status") or "Unknown")
    return None


def find(sys_root: Path = SYS) -> list[Controller]:
    """Every DualSense and DualSense Edge, USB ones first (only they take a firmware update)."""
    found = []
    for node in sorted((sys_root / "class/hidraw").glob("hidraw*"), key=lambda p: (len(p.name), p.name)):
        device = node / "device"
        hid_id = _uevent(device / "uevent").get("HID_ID", "")
        try:
            bus, vendor, product = (int(part, 16) for part in hid_id.split(":"))
        except ValueError:
            continue
        if vendor != VENDOR or product not in MODELS or bus not in BUSES:
            continue
        found.append(Controller(node.name, product, BUSES[bus], device, _battery(device)))
    return sorted(found, key=lambda c: c.bus != "usb")


def holders(path: Path, proc: Path = PROC) -> list[str]:
    """The names of the other programs that have *path* open (Steam reads the controller too), as far as /proc lets
    the user see: their own programs."""
    names = set()
    own = os.getpid()
    for process in proc.glob("[0-9]*"):
        if process.name == str(own):
            continue
        try:
            for fd in (process / "fd").iterdir():
                if os.readlink(fd) == str(path):
                    names.add((process / "comm").read_text().strip())
                    break
        except OSError:
            continue
    return sorted(names)


def writable(path: Path) -> bool:
    return os.access(path, os.R_OK | os.W_OK)
