# SPDX-License-Identifier: GPL-3.0-or-later
"""The run wrapper (bc250-swanstation-run) with a fake flatpak that prints its arguments: the core handed to
RetroArch, RetroArch's own window without arguments, a game Steam starts on a Wayland desktop opened through X11 so
Steam's overlay works over it, and what it says when RetroArch or the core is not there."""

from __future__ import annotations

import os
import subprocess
import sys
from pathlib import Path

import pytest

WRAPPER = Path(__file__).resolve().parents[1] / "bc250-swanstation-run"
GAME = "/games/a b.cue"

pytestmark = pytest.mark.skipif(sys.platform == "win32", reason="a bash script for Linux")


@pytest.fixture
def run(tmp_path):
    core = tmp_path / "data" / "bc250-swanstation-manager" / "emulator" / "core" / "swanstation_libretro.so"
    core.parent.mkdir(parents=True)
    core.write_text("")
    bin_dir = tmp_path / "bin"
    bin_dir.mkdir()
    flatpak = bin_dir / "flatpak"
    flatpak.write_text('#!/bin/sh\n[ "$1" = info ] && exit "${FAKE_INFO:-0}"\necho "args=$*"\n')
    flatpak.chmod(0o755)
    for name in ("sed",):
        found = subprocess.run(["bash", "-c", f"command -v {name}"], capture_output=True, text=True)
        (bin_dir / name).symlink_to(found.stdout.strip())

    def go(*args: str, check: bool = True, path: str | None = None, **env: str) -> subprocess.CompletedProcess:
        environ = {k: v for k, v in os.environ.items() if k not in ("SteamGameId", "WAYLAND_DISPLAY", "DISPLAY")}
        environ.update(XDG_DATA_HOME=str(tmp_path / "data"), PATH=path if path is not None else str(bin_dir), **env)
        return subprocess.run(["/bin/bash", str(WRAPPER), *args], capture_output=True, text=True, env=environ,
                              check=check)
    go.core = core
    return go


def _args(done: subprocess.CompletedProcess) -> str:
    return done.stdout.strip().removeprefix("args=")


def test_a_game_gets_the_core(run):
    assert _args(run("--fullscreen", GAME)) == f"run org.libretro.RetroArch -L {run.core} --fullscreen {GAME}"


def test_without_arguments_it_is_retroarchs_own_window(run):
    assert _args(run()) == "run org.libretro.RetroArch"


def test_started_by_steam_on_a_wayland_desktop(run):
    desktop = {"WAYLAND_DISPLAY": "wayland-0", "DISPLAY": ":0"}
    assert "--nosocket=wayland" in _args(run(GAME, SteamGameId="3710761059", **desktop))
    assert "--nosocket=wayland" not in _args(run(GAME, **desktop))                           # Play, outside Steam
    assert "--nosocket=wayland" not in _args(run(GAME, SteamGameId="1", DISPLAY=":0"))       # X11 only


def test_retroarch_is_not_installed(run):
    done = run(GAME, check=False, FAKE_INFO="1")
    assert done.returncode == 1 and "RetroArch is not installed" in done.stderr


def test_the_core_is_not_installed(run):
    run.core.unlink()
    done = run(GAME, check=False)
    assert done.returncode == 1 and "SwanStation core is not installed" in done.stderr
    assert _args(run()) == "run org.libretro.RetroArch"                                     # its own window needs none


def test_no_flatpak(run, tmp_path):
    done = run(GAME, check=False, path=str(tmp_path / "nowhere"))
    assert done.returncode == 1 and "flatpak is not installed" in done.stderr


def test_help(run):
    assert "bc250-swanstation-run --fullscreen" in run("--help").stdout
