# SPDX-License-Identifier: GPL-3.0-or-later
"""The Wi-Fi adapters on the board, and whether the running kernel has a driver for them: read from /sys, the
kernel's module tables and this boot's kernel log, without root and without Qt. BC-250 Bazzite Test runs it as its
Wi-Fi Adapter test (python3 -m bc250_core.wifi, with the system python), BC-250 USB Wi-Fi shows it in its window.

It only reads: it loads no module, ejects no disk and changes no setting; what would help, it says.

An adapter is a Wi-Fi adapter when the kernel made a wireless interface for it, when it is a PCI network controller
of the wireless kind (class 0x0280), when a Wi-Fi module of the running kernel (one under drivers/net/wireless in
modules.dep) claims its IDs, or when it is a USB device of a Wi-Fi chip maker that nothing claims. The BC-250 has
no Wi-Fi of its own, so on most boards the answer is a USB stick or nothing."""

from __future__ import annotations

import fnmatch
import os
import re
import subprocess
import sys
from dataclasses import dataclass
from pathlib import Path
from typing import Callable

Runner = Callable[[list[str]], str]

WIRELESS_CLASS = "0x0280"                       # PCI: network controller, other (Wi-Fi cards report it)
VENDOR_SPECIFIC = "ff"                          # USB interface class of most Wi-Fi sticks
# Makers whose USB devices are almost all Wi-Fi chips or sticks: an unclaimed one of theirs is likely a stick
# without a driver. Realtek's network and card reader chips have drivers, so they are claimed and left out.
USB_WIFI_VENDORS = {
    0x0BDA: "Realtek", 0x0E8D: "MediaTek", 0x148F: "Ralink", 0x0CF3: "Qualcomm Atheros",
    0xA69C: "AIC", 0x368B: "AIC", 0x2357: "TP-Link", 0x7392: "Edimax", 0x0846: "Netgear", 0x2001: "D-Link",
    0x13B1: "Linksys", 0x050D: "Belkin", 0x2C4E: "Mercusys", 0x35BC: "Comfast",
}
PCI_VENDORS = {0x8086: "Intel", 0x10EC: "Realtek", 0x14C3: "MediaTek", 0x168C: "Qualcomm Atheros",
               0x17CB: "Qualcomm", 0x14E4: "Broadcom", 0x1814: "Ralink"}
# The AIC8800D80 (the UGREEN AX900 and others), whose driver BC-250 USB Wi-Fi builds: its storage mode, waiting
# for its firmware, Wi-Fi mode (the IDs of usb_wifidriver/stick.py).
AIC_VENDORS = (0xA69C, 0x368B)
AIC_STORAGE = {0x5721, 0x5722, 0x5723, 0x5724, 0x572C}
AIC_D80 = AIC_STORAGE | {0x8D80, 0x8D81}
AIC_MODULES = ("aic_load_fw", "aic8800_fdrv")   # out of tree: not in modules.dep
# Other sticks that come up as a small disk with the Windows driver, until something switches them.
STORAGE_MODE = {(0x0BDA, 0x1A2B): "Realtek", (0x0E8D, 0x2870): "MediaTek"}
WIFI_APP = "BC-250 USB Wi-Fi"
FIRMWARE_LINE = re.compile(r"^(?:\S+ )?(\S+): Direct firmware load for (\S+) failed with error", re.MULTILINE)


def run_text(argv: list[str]) -> str:
    """The command's output, "" when it is missing or fails."""
    try:
        done = subprocess.run(argv, stdout=subprocess.PIPE, stderr=subprocess.DEVNULL, text=True, timeout=20)
    except (OSError, subprocess.TimeoutExpired):
        return ""
    return done.stdout


def _read(path: Path) -> str:
    try:
        return path.read_text(encoding="utf-8", errors="replace").strip()
    except OSError:
        return ""


def _hex(text: str) -> int | None:
    try:
        return int(text, 16)
    except ValueError:
        return None


def _link_name(path: Path) -> str:
    try:
        return os.path.basename(os.readlink(path))
    except OSError:
        return ""


def _module_name(name: str) -> str:
    return name.replace("-", "_")


# --- The kernel's modules ----------------------------------------------------------------------------------------

@dataclass(frozen=True)
class Modules:
    """The running kernel's Wi-Fi modules and the device IDs they claim (from modules.dep and modules.alias)."""
    kernel: str
    wireless: frozenset[str]
    aliases: tuple[tuple[str, str], ...]        # (pattern, module), only those of Wi-Fi modules
    found: bool = True                          # the kernel's module tables were there

    def claiming(self, modalias: str) -> tuple[str, ...]:
        if not modalias:
            return ()
        return tuple(dict.fromkeys(m for p, m in self.aliases if fnmatch.fnmatchcase(modalias, p)))


def read_modules(kernel: str, lib_root: Path = Path("/lib/modules")) -> Modules:
    folder = lib_root / kernel
    wireless = set()
    for line in _read(folder / "modules.dep").splitlines():
        path = line.split(":", 1)[0]
        if "/drivers/net/wireless/" in path:
            wireless.add(_module_name(os.path.basename(path).split(".ko", 1)[0]))
    aliases = []
    for line in _read(folder / "modules.alias").splitlines():
        parts = line.split()
        if len(parts) == 3 and parts[0] == "alias" and parts[1][:4] in ("usb:", "pci:"):
            module = _module_name(parts[2])
            if module in wireless:
                aliases.append((parts[1], module))
    return Modules(kernel, frozenset(wireless), tuple(aliases), (folder / "modules.dep").is_file())


def loaded_modules(proc_root: Path = Path("/proc")) -> frozenset[str]:
    return frozenset(line.split(" ", 1)[0] for line in _read(proc_root / "modules").splitlines() if line)


# --- The adapters ------------------------------------------------------------------------------------------------

@dataclass(frozen=True)
class Link:
    freq_mhz: int = 0
    signal_dbm: int | None = None
    bitrate: str = ""                           # "540.4 MBit/s"

    @property
    def band(self) -> str:
        if self.freq_mhz >= 5925:
            return "6 GHz"
        if self.freq_mhz >= 4900:
            return "5 GHz"
        return "2.4 GHz" if self.freq_mhz else ""


@dataclass(frozen=True)
class Interface:
    name: str                                   # wlan0
    operstate: str                              # up, down, dormant
    carrier: bool
    soft_blocked: bool = False                  # rfkill: switched off in software (the network settings)
    hard_blocked: bool = False                  # rfkill: a hardware switch
    link: Link | None = None                    # the connection, when there is one


@dataclass(frozen=True)
class Adapter:
    bus: str                                    # "usb" or "pci"
    path: str                                   # the sysfs name: "2-5", "0000:05:00.0"
    vendor: int
    product: int
    name: str                                   # "AIC 8800D80", "Intel Wi-Fi card"
    drivers: tuple[str, ...] = ()               # the modules bound to it (btusb for a stick's Bluetooth too)
    claiming: tuple[str, ...] = ()              # the running kernel's Wi-Fi modules for its IDs
    interfaces: tuple[Interface, ...] = ()
    firmware_missing: tuple[str, ...] = ()      # files the driver asked for this boot and did not get
    loaded: tuple[str, ...] = ()                # of the claiming modules, those the kernel has loaded

    @property
    def usb_id(self) -> str:
        return f"{self.vendor:04x}:{self.product:04x}"

    @property
    def aic_d80(self) -> bool:
        return self.bus == "usb" and self.vendor in AIC_VENDORS and self.product in AIC_D80

    @property
    def storage_mode(self) -> bool:
        return self.bus == "usb" and ((self.vendor in AIC_VENDORS and self.product in AIC_STORAGE)
                                      or (self.vendor, self.product) in STORAGE_MODE)

    @property
    def wifi_drivers(self) -> tuple[str, ...]:
        return tuple(d for d in self.drivers if d in self.claiming or d in AIC_MODULES)

    @property
    def verdict(self) -> str:
        """connected, ready, blocked, firmware, storage, aic (BC-250 USB Wi-Fi's driver), no-interface (a driver
        is bound, no interface came), not-loaded (the kernel has a driver, it is not loaded) or no-driver."""
        if self.interfaces:
            if any(i.soft_blocked or i.hard_blocked for i in self.interfaces):
                return "blocked"
            return "connected" if any(i.carrier for i in self.interfaces) else "ready"
        if self.storage_mode:
            return "storage"
        if self.aic_d80:
            return "aic"
        if self.wifi_drivers:
            return "firmware" if self.firmware_missing else "no-interface"
        return "not-loaded" if self.claiming else "no-driver"


def _bound_module(interface: Path, sys_root: Path, bus: str) -> str:
    """The module of the driver bound to a device or a USB interface: the driver's module link, else its name."""
    driver = _link_name(interface / "driver")
    if not driver:
        return ""
    module = _link_name(sys_root / "bus" / bus / "drivers" / driver / "module")
    return _module_name(module or driver)


def _interfaces(sys_root: Path, runner: Runner | None) -> dict[str, list[Interface]]:
    """Every wireless network interface, by the sysfs name of its device (a USB interface or a PCI device)."""
    found: dict[str, list[Interface]] = {}
    net = sys_root / "class/net"
    if not net.is_dir():
        return found
    for iface in sorted(net.iterdir()):
        if not ((iface / "wireless").is_dir() or (iface / "phy80211").exists()):
            continue
        device = os.path.basename(os.path.realpath(iface / "device"))
        rfkills = sorted((iface / "phy80211").glob("rfkill*")) if (iface / "phy80211").exists() else []
        soft = any(_read(r / "soft") == "1" for r in rfkills)
        hard = any(_read(r / "hard") == "1" for r in rfkills)
        carrier = _read(iface / "carrier") == "1"
        link = read_link(iface.name, runner) if carrier and runner else None
        found.setdefault(device, []).append(
            Interface(iface.name, _read(iface / "operstate") or "unknown", carrier, soft, hard, link))
    return found


def read_link(name: str, runner: Runner = run_text) -> Link | None:
    """Band, signal and speed of an interface's connection, from iw (no root needed). The network's name is left
    out: it is personal."""
    text = runner(["iw", "dev", name, "link"])
    if not text or text.startswith("Not connected"):
        return None
    freq = re.search(r"freq:\s*(\d+)", text)
    signal = re.search(r"signal:\s*(-?\d+)", text)
    rate = re.search(r"tx bitrate:\s*([\d.]+ \S+)", text)
    return Link(int(freq.group(1)) if freq else 0, int(signal.group(1)) if signal else None,
                rate.group(1) if rate else "")


def find_adapters(sys_root: Path = Path("/sys"), modules: Modules | None = None, boot_log: str = "",
                  loaded: frozenset[str] = frozenset(), runner: Runner | None = None) -> tuple[Adapter, ...]:
    """Every Wi-Fi adapter: USB sticks first, then PCI cards, each in sysfs order. boot_log is this boot's kernel
    log (for missing firmware), loaded the loaded modules, runner reads a connection's band and signal (None:
    not read)."""
    modules = modules or Modules("", frozenset(), ())
    interfaces = _interfaces(sys_root, runner)
    missing: dict[str, list[str]] = {}
    for m in FIRMWARE_LINE.finditer(boot_log):
        missing.setdefault(m.group(1), []).append(m.group(2))
    found = []

    usb = sys_root / "bus/usb/devices"
    for device in sorted(usb.iterdir()) if usb.is_dir() else []:
        if ":" in device.name:
            continue
        vendor, product = _hex(_read(device / "idVendor")), _hex(_read(device / "idProduct"))
        if vendor is None or product is None:
            continue
        parts = sorted(usb.glob(f"{device.name}:*"))
        drivers, claiming, ifaces, firmware, classes = [], [], [], [], []
        for part in parts:
            bound = _bound_module(part, sys_root, "usb")
            if bound:
                drivers.append(bound)
            claiming.extend(modules.claiming(_read(part / "modalias")))
            ifaces.extend(interfaces.get(part.name, ()))
            firmware.extend(missing.get(part.name, ()))
            classes.append(_read(part / "bInterfaceClass").lower())
        claiming = list(dict.fromkeys(claiming))
        unclaimed_maker = vendor in USB_WIFI_VENDORS and not drivers and VENDOR_SPECIFIC in classes
        known = vendor in AIC_VENDORS or (vendor, product) in STORAGE_MODE
        if not (ifaces or claiming or unclaimed_maker or known):
            continue
        name = _read(device / "product") or f"{USB_WIFI_VENDORS.get(vendor, 'USB')} device"
        found.append(Adapter("usb", device.name, vendor, product, name, tuple(dict.fromkeys(drivers)),
                             tuple(claiming), tuple(ifaces), tuple(dict.fromkeys(firmware)),
                             tuple(m for m in claiming if m in loaded)))

    pci = sys_root / "bus/pci/devices"
    for device in sorted(pci.iterdir()) if pci.is_dir() else []:
        ifaces = interfaces.get(device.name, [])
        claiming = modules.claiming(_read(device / "modalias"))
        if not (_read(device / "class").startswith(WIRELESS_CLASS) or ifaces or claiming):
            continue
        vendor, product = _hex(_read(device / "vendor")) or 0, _hex(_read(device / "device")) or 0
        bound = _bound_module(device, sys_root, "pci")
        found.append(Adapter("pci", device.name, vendor, product, f"{PCI_VENDORS.get(vendor, 'PCI')} Wi-Fi card",
                             (bound,) if bound else (), claiming, tuple(ifaces),
                             tuple(dict.fromkeys(missing.get(device.name, ()))),
                             tuple(m for m in claiming if m in loaded)))
    return tuple(found)


# --- What it means -----------------------------------------------------------------------------------------------

def _where(a: Adapter) -> str:
    return f"{a.name} ({a.usb_id}, {'USB ' + a.path if a.bus == 'usb' else 'PCIe ' + a.path})"


def _link_text(i: Interface) -> str:
    link = i.link
    if link is None:
        return f"{i.name} is connected."
    parts = [p for p in (f"{link.band} ({link.freq_mhz} MHz)" if link.freq_mhz else "",
                         f"signal {link.signal_dbm} dBm" if link.signal_dbm is not None else "",
                         link.bitrate.replace("MBit/s", "Mbit/s")) if p]
    return f"{i.name} is connected" + (": " + ", ".join(parts) if parts else "") + "."


def report(adapters: tuple[Adapter, ...], modules: Modules, in_wifi_app: bool = False) -> list[tuple[str, str]]:
    """The findings as (level, text): SUCCESS, INFO, NOTE, WARNING or HINT, the levels of BC-250 Bazzite Test.
    in_wifi_app: for BC-250 USB Wi-Fi's own window, which builds the AIC driver itself."""
    get_aic = "build and install the driver here" if in_wifi_app else f"{WIFI_APP} (in the portal) builds it"
    lines: list[tuple[str, str]] = []
    if not modules.found:
        lines.append(("NOTE", f"The module tables of kernel {modules.kernel} are missing (modules.dep): whether "
                              "the kernel has a driver for an adapter cannot be told."))
    if not adapters:
        lines.append(("INFO", "No Wi-Fi adapter. The BC-250 has none of its own; the network cable needs nothing."))
        lines.append(("HINT", "A USB Wi-Fi stick adds it; plugged in, whether the kernel has a driver for it shows "
                              "here. AIC8800D80 sticks (the UGREEN AX900 and others) get theirs from "
                              + ("this app." if in_wifi_app else f"{WIFI_APP}.")))
        return lines
    for a in adapters:
        drivers = ", ".join(a.drivers) or "none"
        lines.append(("INFO", f"{_where(a)}: driver {drivers}"
                              + (f", interface {', '.join(i.name for i in a.interfaces)}" if a.interfaces else "")))
        verdict = a.verdict
        if verdict == "connected":
            for i in a.interfaces:
                if i.carrier:
                    lines.append(("SUCCESS", _link_text(i)))
        elif verdict == "ready":
            names = ", ".join(i.name for i in a.interfaces)
            lines.append(("SUCCESS", f"{names} works but is not connected to a network."))
            lines.append(("HINT", "Connect it in the network settings. AIC sticks do WPA2, not WPA3."
                                  if a.aic_d80 else "Connect it in the network settings."))
        elif verdict == "blocked":
            hard = any(i.hard_blocked for i in a.interfaces)
            lines.append(("WARNING", f"{a.interfaces[0].name} is switched off (rfkill, "
                                     + ("a hardware switch" if hard else "in software") + ")."))
            lines.append(("HINT", "Switch Wi-Fi on in the network settings, or: rfkill unblock wifi"
                                  if not hard else "Turn on the adapter's own switch; software cannot."))
        elif verdict == "storage":
            if a.aic_d80:
                lines.append(("NOTE", "The stick sits in its storage mode (a small disk with the Windows driver). "
                                      f"Bazzite's kernel has no driver for its AIC8800D80 chip: {get_aic}, and the "
                                      "installed driver switches the stick at every plug-in."))
            else:
                lines.append(("NOTE", "The stick sits in its storage mode (a small disk with the Windows driver); "
                                      "its Wi-Fi comes up once that disk is ejected."))
                lines.append(("HINT", "sudo eject /dev/sdX (the stick's disk, see lsblk), then look again."))
        elif verdict == "aic":
            if any(d in AIC_MODULES for d in a.drivers):
                lines.append(("NOTE", f"{WIFI_APP}'s driver has the stick but made no interface yet: "
                                      + ("the Chip box" if in_wifi_app else "its window") + " shows what the chip "
                                      "answered."))
            else:
                lines.append(("WARNING", f"Bazzite's kernel has no driver for the AIC8800D80 chip: {get_aic}."))
        elif verdict == "firmware":
            lines.append(("WARNING", f"{', '.join(a.wifi_drivers)} has the adapter but not its firmware: "
                                     + ", ".join(a.firmware_missing) + "."))
            lines.append(("HINT", "Bazzite ships firmware in its image (read-only): a newer image may have the file. "
                                  "Until then this adapter does not work."))
        elif verdict == "no-interface":
            lines.append(("WARNING", f"{', '.join(a.wifi_drivers)} has the adapter but made no network interface."))
            lines.append(("HINT", f"Read why with: journalctl -k -b | grep -i {a.wifi_drivers[0]}"))
        elif verdict == "not-loaded":
            lines.append(("WARNING", f"Kernel {modules.kernel} has a driver for it ({', '.join(a.claiming)}), "
                                     + ("loaded but not bound to it." if a.loaded else "but it is not loaded.")))
            lines.append(("HINT", f"Load it with: sudo modprobe {a.claiming[0]}   (when that says nothing and no "
                                  "interface comes, the module may be blacklisted in /etc/modprobe.d)"))
        else:
            lines.append(("WARNING", f"Kernel {modules.kernel} has no driver for {a.usb_id}: this adapter does not "
                                     "work on Bazzite as it is."))
            lines.append(("HINT", "Most sticks with a Realtek (rtw88, rtw89) or MediaTek (mt76) chip have one in "
                                  "Bazzite's kernel."))
    return lines


def read_boot_log(runner: Runner = run_text) -> str:
    """This boot's kernel log: the firmware a driver missed is only about this boot."""
    return runner(["journalctl", "-k", "-b", "-o", "cat", "--no-pager"])


def main(argv: list[str] | None = None) -> int:
    """The report as LEVEL: text lines, for BC-250 Bazzite Test's Wi-Fi Adapter test. Exit status 0 either way."""
    del argv
    kernel = os.uname().release
    modules = read_modules(kernel)
    adapters = find_adapters(modules=modules, boot_log=read_boot_log(), loaded=loaded_modules(), runner=run_text)
    for level, text in report(adapters, modules):
        print(f"{level}: {text}")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
