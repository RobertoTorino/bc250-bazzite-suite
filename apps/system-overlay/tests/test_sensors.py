# SPDX-License-Identifier: GPL-3.0-or-later
"""Sensors against a fake /proc and /sys: each value, the values measured over two readings, and missing sources.
The governor is a stub: nothing here talks to D-Bus."""

from __future__ import annotations

import shutil

import pytest

from bc250_overlay.sensors import Fan, Sensors
from conftest import Clock, diskstats, gpu_metrics, net_dev, proc_stat, write


def sensors(board, governor=(1000, 1850), clock=None) -> Sensors:
    return Sensors(board, governor=lambda: governor, clock=clock or Clock())


def test_values_from_a_bc250(board):
    s = sensors(board)
    assert s.cpu_mhz() == 3000
    assert s.cpu_temp() == 72.125
    assert s.gpu_load() == 45.5                                   # 4550 hundredths of a percent
    assert s.gpu_mhz() == 2000
    assert s.gpu_watts() == 95.25
    assert s.gpu_mv() == 1056
    assert s.gpu_temp() == 61.0
    assert s.governor() == (1000, 1850)
    assert s.vram() == (900_000_000, 6_000_000_000)
    assert s.ram() == ((9882072 - 4963912) * 1024, 9882072 * 1024)
    assert s.vrm_temp() == 58.0
    assert s.nvme_temp() == 39.85
    assert s.fans() == (Fan("Pump Fan", 1169),)                  # fans at 0 RPM are left out


def test_cpu_load_over_two_readings(board):
    s = sensors(board)
    assert s.cpu_load() is None                                   # nothing to compare with yet
    write(board / "proc/stat", proc_stat(1000 + 300, 9000 + 100))  # 300 busy of 400 jiffies
    assert s.cpu_load() == 75.0
    assert s.cpu_load() is None                                   # no time passed


@pytest.mark.parametrize("raw, load", [(0, 0.0), (156, 1.56), (10000, 100.0), (10001, None), (0xFFFF, None)])
def test_gpu_load_needs_the_governors_patch(board, raw, load):
    (board / "sys/class/hwmon/hwmon2/device/gpu_metrics").write_bytes(gpu_metrics(raw))
    assert sensors(board).gpu_load() == load                      # 0xFFFF: unpatched ("655 %" in MangoHud)


def test_gpu_load_wrong_table_format(board):
    raw = bytearray(gpu_metrics(4550))
    raw[2] = 1                                                    # format revision 1: a dGPU table
    (board / "sys/class/hwmon/hwmon2/device/gpu_metrics").write_bytes(bytes(raw))
    assert sensors(board).gpu_load() is None


def test_network_and_disk_rates(board):
    clock = Clock()
    s = sensors(board, clock=clock)
    assert s.net() is None and s.disk() is None                   # first reading: nothing to compare with
    clock.now += 2
    write(board / "proc/net/dev", net_dev(1_000_000 + 4_000_000, 50_000 + 200_000))
    write(board / "proc/diskstats", diskstats(2000 + 2048, 100 + 400))
    assert s.net() == (2_000_000.0, 100_000.0)                    # lo is left out
    assert s.disk() == (2048 * 512 / 2, 400 * 512 / 2)            # partitions, zram and loop are left out


def test_counters_that_go_back_give_none(board):
    clock = Clock()
    s = sensors(board, clock=clock)
    s.net()
    clock.now += 1
    write(board / "proc/net/dev", net_dev(10, 10))                # interface reset
    assert s.net() is None


def test_fastest_fan_first_and_unlabelled_fans(board):
    write(board / "sys/class/hwmon/hwmon4/name", "it87")
    write(board / "sys/class/hwmon/hwmon4/fan2_input", "1800")
    assert sensors(board).fans() == (Fan("Fan 2", 1800), Fan("Pump Fan", 1169))


def test_power_average_when_there_is_no_power_input(board):
    gpu = board / "sys/class/hwmon/hwmon2"
    (gpu / "power1_input").unlink()
    write(gpu / "power1_average", "40000000")
    assert sensors(board).gpu_watts() == 40.0


def test_governor_errors_give_none(board):
    def broken():
        raise RuntimeError("bus gone")
    assert Sensors(board, governor=broken).governor() is None


def test_missing_sources_give_none(board):
    shutil.rmtree(board / "sys")
    shutil.rmtree(board / "proc")
    reading = sensors(board, governor=None).read()
    assert reading.cpu_load is reading.cpu_mhz is reading.cpu_temp is None
    assert reading.gpu_load is reading.gpu_mhz is reading.gpu_watts is reading.gpu_mv is reading.gpu_temp is None
    assert reading.governor is reading.vram is reading.ram is None
    assert reading.vrm_temp is reading.nvme_temp is reading.net is reading.disk is None
    assert reading.fans == () and reading.fan is None


def test_garbage_is_ignored(board):
    write(board / "sys/class/hwmon/hwmon2/freq1_input", "not a number")
    write(board / "proc/stat", "intr 1 2 3")
    write(board / "proc/net/dev", "h\nh\nenp4s0: x 1 0 0 0 0 0 0 y 1 0 0 0 0 0 0")
    s = sensors(board)
    assert s.gpu_mhz() is None and s.cpu_load() is None and s.net() is None
