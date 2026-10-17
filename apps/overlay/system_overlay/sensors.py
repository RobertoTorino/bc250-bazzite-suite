# SPDX-License-Identifier: GPL-3.0-or-later
"""Reads the overlay's values from /proc and /sys, without root. Every reader returns None when its source is
missing, so the overlay shows "—" instead of failing on a board or kernel that lacks it.

On the BC-250: CPU temperature from k10temp (Tctl), GPU clock, power, voltage and temperature from amdgpu, fans
and the VRM temperature from the nct6686 Super I/O. amdgpu's gpu_busy_percent is not supported on this GPU; the GPU
load comes from the gpu_metrics table that the GPU governor patches (fix-metrics), and is None without it."""

from __future__ import annotations

import struct
import time
from collections.abc import Callable
from dataclasses import dataclass, field
from pathlib import Path

GPU_LOAD_OFFSET = 0x1C          # gpu_metrics v2.x: average_gfx_activity, the field the governor's fix-metrics patches
SECTOR = 512                    # /proc/diskstats counts 512-byte sectors, whatever the disk's own sector size
_NOT_A_DISK = ("loop", "ram", "zram", "dm-", "md", "sr", "fd")


@dataclass(frozen=True)
class Fan:
    label: str
    rpm: int


@dataclass(frozen=True)
class Reading:
    cpu_load: float | None = None           # percent, over the time since the previous reading
    cpu_mhz: int | None = None              # average of the cores' current clocks
    cpu_temp: float | None = None           # °C
    gpu_load: float | None = None           # percent, from the governor's patched gpu_metrics
    gpu_mhz: int | None = None
    gpu_watts: float | None = None
    gpu_mv: int | None = None               # core voltage (vddgfx)
    gpu_temp: float | None = None           # °C
    governor: tuple[int, int] | None = None     # the governor's current range, MHz
    vram: tuple[int, int] | None = None     # used, total bytes
    ram: tuple[int, int] | None = None      # used, total bytes
    vrm_temp: float | None = None
    nvme_temp: float | None = None
    net: tuple[float, float] | None = None  # download, upload bytes/s since the previous reading
    disk: tuple[float, float] | None = None     # read, write bytes/s since the previous reading
    fans: tuple[Fan, ...] = field(default_factory=tuple)    # spinning fans only, fastest first

    @property
    def fan(self) -> Fan | None:
        return self.fans[0] if self.fans else None


def _read(path: Path) -> str | None:
    try:
        return path.read_text().strip()
    except (OSError, ValueError):
        return None


def _read_int(path: Path) -> int | None:
    text = _read(path)
    try:
        return int(text) if text is not None else None
    except ValueError:
        return None


def governor_range() -> tuple[int, int] | None:
    """The GPU governor's current frequency range over D-Bus, or None when it does not run."""
    from PyQt6.QtDBus import QDBus, QDBusConnection, QDBusMessage
    bus = QDBusConnection.systemBus()
    if not bus.isConnected():
        return None
    values = []
    for prop in ("Min", "Max"):
        message = QDBusMessage.createMethodCall("com.cyanskillfish.Governor", "/com/cyanskillfish/Governor/Range/Current",
                                                "org.freedesktop.DBus.Properties", "Get")
        message.setArguments(["com.cyanskillfish.Governor.Range", prop])
        reply = bus.call(message, QDBus.CallMode.Block, 300)     # short: the overlay must never hang on the bus
        if reply.type() != QDBusMessage.MessageType.ReplyMessage or not reply.arguments():
            return None
        try:
            values.append(int(reply.arguments()[0]))
        except (TypeError, ValueError):
            return None
    return values[0], values[1]


class _Rate:
    """Bytes per second of growing counters, between two readings."""

    def __init__(self, clock: Callable[[], float]):
        self._clock = clock
        self._last: tuple[float, tuple[int, ...]] | None = None

    def __call__(self, counters: tuple[int, ...] | None) -> tuple[float, ...] | None:
        if counters is None:
            return None
        now = self._clock()
        previous, self._last = self._last, (now, counters)
        if previous is None or now <= previous[0] or any(c < p for c, p in zip(counters, previous[1])):
            return None
        return tuple((c - p) / (now - previous[0]) for c, p in zip(counters, previous[1]))


class Sensors:
    def __init__(self, root: Path | str = "/", governor: Callable[[], tuple[int, int] | None] = governor_range,
                 clock: Callable[[], float] = time.monotonic):
        self.root = Path(root)
        self._governor = governor
        self._last_cpu: tuple[int, int] | None = None      # (busy, total) jiffies of the previous reading
        self._net_rate = _Rate(clock)
        self._disk_rate = _Rate(clock)

    # ------------------------------------------------------------------ hwmon
    def _hwmons(self) -> list[Path]:
        return sorted((self.root / "sys/class/hwmon").glob("hwmon*"))

    def _hwmon(self, name: str) -> Path | None:
        return next((folder for folder in self._hwmons() if _read(folder / "name") == name), None)

    def _temp(self, name: str) -> float | None:
        folder = self._hwmon(name)
        value = _read_int(folder / "temp1_input") if folder else None
        return value / 1000 if value is not None else None

    def _labelled_temp(self, word: str) -> float | None:
        """The first temperature whose label contains *word* (e.g. the Super I/O's "VRM MOS")."""
        for folder in self._hwmons():
            for label_file in sorted(folder.glob("temp[0-9]*_label")):
                if word.lower() in (_read(label_file) or "").lower():
                    value = _read_int(folder / label_file.name.replace("_label", "_input"))
                    if value:                       # 0 = sensor not connected
                        return value / 1000
        return None

    def _gpu_device(self) -> Path | None:
        folder = self._hwmon("amdgpu")
        return folder / "device" if folder else None

    # -------------------------------------------------------------------- CPU
    def cpu_load(self) -> float | None:
        """Busy share of all cores since the previous call; None on the first call."""
        line = (_read(self.root / "proc/stat") or "").splitlines()[:1]
        if not line or not line[0].startswith("cpu "):
            return None
        try:
            values = [int(v) for v in line[0].split()[1:]]
        except ValueError:
            return None
        idle = values[3] + (values[4] if len(values) > 4 else 0)       # idle + iowait
        total = sum(values[:8])                                          # without guest, already in user/nice
        busy = total - idle
        previous, self._last_cpu = self._last_cpu, (busy, total)
        if previous is None or total <= previous[1]:
            return None
        return max(0.0, min(100.0, 100 * (busy - previous[0]) / (total - previous[1])))

    def cpu_mhz(self) -> int | None:
        khz = [_read_int(p) for p in (self.root / "sys/devices/system/cpu").glob("cpu[0-9]*/cpufreq/scaling_cur_freq")]
        khz = [k for k in khz if k]
        return round(sum(khz) / len(khz) / 1000) if khz else None

    def cpu_temp(self) -> float | None:
        return self._temp("k10temp")

    # -------------------------------------------------------------------- GPU
    def gpu_load(self) -> float | None:
        """average_gfx_activity of gpu_metrics, in hundredths of a percent as on other AMD APUs (MangoHud divides it by
        100 too). Unpatched, the BC-250 reports 0xFFFF there (MangoHud's "655 %"), so only 0..10000 counts; real
        values need the governor's fix-metrics."""
        device = self._gpu_device()
        try:
            raw = (device / "gpu_metrics").read_bytes() if device else b""
        except OSError:
            return None
        if len(raw) < GPU_LOAD_OFFSET + 2 or raw[2] != 2:          # format revision 2.x only
            return None
        (load,) = struct.unpack_from("<H", raw, GPU_LOAD_OFFSET)
        return load / 100 if load <= 10000 else None

    def gpu_mhz(self) -> int | None:
        folder = self._hwmon("amdgpu")
        hz = _read_int(folder / "freq1_input") if folder else None
        return round(hz / 1_000_000) if hz else None

    def gpu_watts(self) -> float | None:
        folder = self._hwmon("amdgpu")
        if folder is None:
            return None
        for name in ("power1_input", "power1_average"):     # the kernel offers one or the other
            microwatts = _read_int(folder / name)
            if microwatts is not None:
                return microwatts / 1_000_000
        return None

    def gpu_mv(self) -> int | None:
        folder = self._hwmon("amdgpu")
        return _read_int(folder / "in0_input") or None if folder else None

    def gpu_temp(self) -> float | None:
        return self._temp("amdgpu")

    def governor(self) -> tuple[int, int] | None:
        try:
            return self._governor()
        except Exception:               # noqa: BLE001 - a broken bus must not stop the overlay
            return None

    # ----------------------------------------------------------------- memory
    def vram(self) -> tuple[int, int] | None:
        device = self._gpu_device()
        if device is None:
            return None
        used, total = _read_int(device / "mem_info_vram_used"), _read_int(device / "mem_info_vram_total")
        return (used, total) if used is not None and total else None

    def ram(self) -> tuple[int, int] | None:
        info = {}
        for line in (_read(self.root / "proc/meminfo") or "").splitlines():
            key, _, rest = line.partition(":")
            if rest.strip().endswith("kB"):
                try:
                    info[key] = int(rest.split()[0]) * 1024
                except ValueError:
                    pass
        total, available = info.get("MemTotal"), info.get("MemAvailable")
        return (total - available, total) if total and available is not None else None

    # ------------------------------------------------------------ temperatures
    def vrm_temp(self) -> float | None:
        return self._labelled_temp("VRM")

    def nvme_temp(self) -> float | None:
        return self._temp("nvme")

    # --------------------------------------------------------------- activity
    def _net_counters(self) -> tuple[int, int] | None:
        rx = tx = 0
        lines = (_read(self.root / "proc/net/dev") or "").splitlines()[2:]
        if not lines:
            return None
        for line in lines:
            name, _, rest = line.partition(":")
            fields = rest.split()
            if name.strip() == "lo" or len(fields) < 9:
                continue
            try:
                rx, tx = rx + int(fields[0]), tx + int(fields[8])
            except ValueError:
                return None
        return rx, tx

    def net(self) -> tuple[float, float] | None:
        return self._net_rate(self._net_counters())

    def _disk_counters(self) -> tuple[int, int] | None:
        disks = {p.name for p in (self.root / "sys/block").glob("*") if not p.name.startswith(_NOT_A_DISK)}
        lines = (_read(self.root / "proc/diskstats") or "").splitlines()
        if not lines or not disks:
            return None
        read = written = 0
        for line in lines:
            fields = line.split()
            if len(fields) >= 10 and fields[2] in disks:          # whole disks only, not their partitions
                try:
                    read, written = read + int(fields[5]) * SECTOR, written + int(fields[9]) * SECTOR
                except ValueError:
                    return None
        return read, written

    def disk(self) -> tuple[float, float] | None:
        return self._disk_rate(self._disk_counters())

    # ------------------------------------------------------------------- fans
    def fans(self) -> tuple[Fan, ...]:
        found = []
        for folder in self._hwmons():
            for rpm_file in sorted(folder.glob("fan[0-9]*_input")):
                rpm = _read_int(rpm_file)
                if rpm:
                    number = rpm_file.name[len("fan"):-len("_input")]
                    label = _read(folder / f"fan{number}_label") or f"Fan {number}"
                    found.append(Fan(label, rpm))
        return tuple(sorted(found, key=lambda f: -f.rpm))

    def read(self) -> Reading:
        return Reading(cpu_load=self.cpu_load(), cpu_mhz=self.cpu_mhz(), cpu_temp=self.cpu_temp(),
                       gpu_load=self.gpu_load(), gpu_mhz=self.gpu_mhz(), gpu_watts=self.gpu_watts(),
                       gpu_mv=self.gpu_mv(), gpu_temp=self.gpu_temp(), governor=self.governor(), vram=self.vram(),
                       ram=self.ram(), vrm_temp=self.vrm_temp(), nvme_temp=self.nvme_temp(), net=self.net(),
                       disk=self.disk(), fans=self.fans())
