# SPDX-License-Identifier: GPL-3.0-or-later
"""The run wrapper (bc250-mgba-run) with a fake mGBA that prints its arguments and SDL's controller lists:
Steam's list of controllers to ignore replaced while a real controller is there, left alone otherwise; a game Steam
starts on a Wayland desktop opened through XWayland, so Steam's overlay works over it; unpacking when there is no
FUSE 2 library."""

from __future__ import annotations

import os
import subprocess
import sys
from pathlib import Path

import pytest

WRAPPER = Path(__file__).resolve().parents[1] / "bc250-mgba-run"

# /proc/bus/input/devices with Steam running (the shadPS4 Manager's, from the owner's board): a DualShock 4 on USB,
# its motion sensors and touchpad, and Steam's virtual controller.
DS4_AND_STEAM = """\
I: Bus=0003 Vendor=054c Product=09cc Version=8111
N: Name="Sony Interactive Entertainment Wireless Controller"
H: Handlers=event3 js0

I: Bus=0003 Vendor=054c Product=09cc Version=8111
N: Name="Sony Interactive Entertainment Wireless Controller Motion Sensors"
H: Handlers=event4

I: Bus=0003 Vendor=054c Product=09cc Version=8111
N: Name="Sony Interactive Entertainment Wireless Controller Touchpad"
H: Handlers=mouse0 event5

I: Bus=0003 Vendor=28de Product=11ff Version=0001
N: Name="Microsoft X-Box 360 pad 0"
H: Handlers=event14 js1
"""
STEAM_ONLY = DS4_AND_STEAM.split("\n\n")[-1]
STEAM_LIST = "0x054C/0x09CC"
GAME = "/games/a b.gba"

pytestmark = pytest.mark.skipif(sys.platform == "win32", reason="a bash script for Linux")


@pytest.fixture
def run(tmp_path):
    mgba = tmp_path / "data" / "bc250-mgba-manager" / "emulator" / "current" / "mgba.AppImage"
    mgba.parent.mkdir(parents=True)
    mgba.write_text('#!/bin/sh\necho "args=$*"\necho "ignore=${SDL_GAMECONTROLLER_IGNORE_DEVICES-unset}"\n'
                     'echo "except=${SDL_GAMECONTROLLER_IGNORE_DEVICES_EXCEPT-unset}"\n'
                     'echo "qpa=${QT_QPA_PLATFORM-unset}"\n'
                     'echo "extract=${APPIMAGE_EXTRACT_AND_RUN-unset}"\n')
    mgba.chmod(0o755)
    devices = tmp_path / "devices"
    fuse = tmp_path / "bin"                     # a fake ldconfig that lists libfuse.so.2
    fuse.mkdir()
    (fuse / "ldconfig").write_text("#!/bin/sh\necho '\tlibfuse.so.2 (libc6,x86-64) => /usr/lib64/libfuse.so.2'\n")
    (fuse / "ldconfig").chmod(0o755)

    def go(inputs: str, *args: str, path: str | None = None, **env: str) -> dict[str, str]:
        devices.write_text(inputs)
        environ = {k: v for k, v in os.environ.items()
                   if not k.startswith(("SDL_", "QT_", "APPIMAGE")) and
                   k not in ("SteamGameId", "WAYLAND_DISPLAY", "DISPLAY")}
        # Only the tools the wrapper needs, and the fake ldconfig unless *path* says otherwise.
        tools = tmp_path / "tools"
        if not tools.exists():
            tools.mkdir()
            for name in ("awk", "sed", "dirname", "grep"):
                found = subprocess.run(["bash", "-c", f"command -v {name}"], capture_output=True, text=True)
                if found.stdout.strip():
                    (tools / name).symlink_to(found.stdout.strip())
        environ.update(XDG_DATA_HOME=str(tmp_path / "data"), BC250_INPUT_DEVICES=str(devices),
                       PATH=path if path is not None else f"{fuse}:{tools}", **env)
        done = subprocess.run(["/bin/bash", str(WRAPPER), *args], capture_output=True, text=True, env=environ,
                              check=True)
        return dict(line.split("=", 1) for line in done.stdout.splitlines())
    return go


def test_started_by_steam_with_a_real_controller(run):
    out = run(DS4_AND_STEAM, "-f", GAME,
              SDL_GAMECONTROLLER_IGNORE_DEVICES=STEAM_LIST,
              SDL_GAMECONTROLLER_IGNORE_DEVICES_EXCEPT="0x28DE/0x1205")
    assert out == {"args": f"-f {GAME}", "ignore": "0x28DE/0x11FF", "except": "unset",
                   "qpa": "unset", "extract": "unset"}


def test_started_by_steam_with_only_steams_controller(run):
    out = run(STEAM_ONLY, "-f", GAME, SDL_GAMECONTROLLER_IGNORE_DEVICES=STEAM_LIST)
    assert out["ignore"] == STEAM_LIST                                  # Steam's choice stands


def test_started_outside_steam(run):
    out = run(DS4_AND_STEAM)
    assert out == {"args": "", "ignore": "unset", "except": "unset", "qpa": "unset", "extract": "unset"}


def test_started_by_steam_on_a_wayland_desktop(run):
    desktop = {"WAYLAND_DISPLAY": "wayland-0", "DISPLAY": ":0"}
    assert run(DS4_AND_STEAM, GAME, SteamGameId="3710761059", **desktop)["qpa"] == "xcb"
    assert run(DS4_AND_STEAM, GAME, **desktop)["qpa"] == "unset"                            # Play, outside Steam
    assert run(DS4_AND_STEAM, GAME, SteamGameId="1", DISPLAY=":0")["qpa"] == "unset"         # X11 only
    assert run(DS4_AND_STEAM, GAME, SteamGameId="1", QT_QPA_PLATFORM="wayland",
               **desktop)["qpa"] == "wayland"                                               # a choice of the user's


def test_without_fuse_2_it_unpacks_itself(run, tmp_path):
    run(DS4_AND_STEAM)                                                  # makes the tools folder
    (tmp_path / "tools" / "ldconfig").write_text("#!/bin/sh\necho '\tlibfuse3.so.3 (libc6,x86-64)'\n")
    (tmp_path / "tools" / "ldconfig").chmod(0o755)
    assert run(DS4_AND_STEAM, path=str(tmp_path / "tools"))["extract"] == "1"
    (tmp_path / "tools" / "ldconfig").unlink()                          # no ldconfig to ask: left to the AppImage
    assert run(DS4_AND_STEAM, path=str(tmp_path / "tools"))["extract"] == "unset"


def test_not_installed(tmp_path):
    done = subprocess.run(["/bin/bash", str(WRAPPER), GAME], capture_output=True, text=True,
                          env={**os.environ, "XDG_DATA_HOME": str(tmp_path)})
    assert done.returncode == 1 and "mGBA is not installed" in done.stderr
