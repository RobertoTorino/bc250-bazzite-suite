# SPDX-License-Identifier: GPL-3.0-or-later
"""Shared fixtures: an offscreen QApplication, settings and data in a temp folder, and a fake /sys and /proc of a
BC-250 with a 6 GB split (as on the owner's boards)."""

from __future__ import annotations

import os
import sys
from pathlib import Path

import pytest

os.environ.setdefault("QT_QPA_PLATFORM", "offscreen")
CORE = Path(__file__).resolve().parents[3] / "core"
if str(CORE) not in sys.path:
    sys.path.insert(0, str(CORE))           # bc250_core from the checkout, as the installer bundles it
sys.path.insert(0, str(Path(__file__).resolve().parent))

MIB = 1024 * 1024


@pytest.fixture(scope="session")
def qapp():
    from PyQt6.QtWidgets import QApplication
    app = QApplication.instance() or QApplication([])
    yield app


@pytest.fixture(autouse=True)
def settings_dir(tmp_path, monkeypatch):
    """The app keeps an .ini (AppInfo.settings_ini), so this also keeps the tests out of the Windows registry."""
    from PyQt6.QtCore import QSettings
    QSettings.setPath(QSettings.Format.IniFormat, QSettings.Scope.UserScope, str(tmp_path / "settings"))
    monkeypatch.setenv("XDG_DATA_HOME", str(tmp_path / "data"))
    return tmp_path / "settings"


def write(path: Path, text: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(text + "\n")


@pytest.fixture
def sys_root(tmp_path) -> Path:
    root = tmp_path / "sys"
    write(root / "class/dmi/id/board_name", "AMD BC-250")
    write(root / "class/dmi/id/bios_vendor", "American Megatrends Inc.")
    write(root / "class/dmi/id/bios_version", "P5.00")
    write(root / "class/dmi/id/bios_date", "05/03/2022")
    write(root / "kernel/security/lockdown", "[none] integrity confidentiality")
    dev = root / "class/drm/card1/device"
    write(dev / "mem_info_vram_total", str(6144 * MIB))
    write(dev / "mem_info_gtt_total", str(9650 * MIB))
    write(root / "module/ttm/parameters/pages_limit", "3014656")
    write(root / "module/zswap/parameters/enabled", "N")
    return root


@pytest.fixture
def proc_root(tmp_path) -> Path:
    root = tmp_path / "proc"
    write(root / "meminfo", "MemTotal:        9882080 kB\nMemFree:  1000 kB")
    write(root / "swaps", "Filename\tType\tSize\tUsed\tPriority\n/dev/zram0  partition\t4940796\t64\t100")
    write(root / "cmdline", "BOOT_IMAGE=x rw mitigations=off ttm.pages_limit=3014656 zswap.enabled=0")
    write(root / "sys/vm/swappiness", "10")
    write(root / "sys/kernel/random/boot_id", "boot-1")
    return root
