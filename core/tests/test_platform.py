# SPDX-License-Identifier: GPL-3.0-or-later
from __future__ import annotations

import shutil
import subprocess
from pathlib import Path, PurePosixPath

import pytest

from bc250_core import platform


def test_terminal_command_plain_keeps_window_open():
    assert platform.terminal_command("bash x.sh") == "bash x.sh; echo; read -rp 'Press Enter to close... ' _"
    assert platform.terminal_command("bash x.sh", keep_open=False) == "bash x.sh"


def test_terminal_command_exit_file_covers_whole_command():
    line = platform.terminal_command("cd /a && bash x.sh", keep_open=False, exit_file=PurePosixPath("/tmp/st 1"))
    assert line == "( cd /a && bash x.sh ); echo $? > '/tmp/st 1'"


@pytest.mark.skipif(shutil.which("bash") is None, reason="needs bash")
@pytest.mark.parametrize("command, status", [("true", "0"), ("true && false", "1"), ("exit 3", "3")])
def test_exit_file_gets_the_status(tmp_path, command, status):
    exit_file = tmp_path / "status"
    line = platform.terminal_command(command, keep_open=False, exit_file=Path(exit_file.as_posix()))
    subprocess.run(["bash", "-c", line.replace(str(exit_file.as_posix()), "status")], cwd=tmp_path, check=False)
    assert (tmp_path / "status").read_text().strip() == status


def test_no_terminal_raises(monkeypatch):
    monkeypatch.delenv("TERMINAL", raising=False)
    monkeypatch.setattr(platform.shutil, "which", lambda name: None)
    assert platform.find_terminal() is None
    with pytest.raises(RuntimeError, match="No terminal emulator found"):
        platform.launch_in_terminal("true")


def test_terminal_preference_and_argv(monkeypatch):
    started = []
    monkeypatch.delenv("TERMINAL", raising=False)
    monkeypatch.setattr(platform.shutil, "which", lambda name: f"/usr/bin/{name}" if name in ("ptyxis", "xterm") else None)
    monkeypatch.setattr(platform.subprocess, "Popen", lambda argv, **kw: started.append((argv, kw)))
    platform.launch_in_terminal("bash x.sh", keep_open=False)
    argv, kw = started[0]
    assert argv == ["ptyxis", "--", "bash", "-lc", "bash x.sh"]           # ptyxis comes before xterm
    assert kw["start_new_session"] is True


def test_expand_and_xdg(monkeypatch, tmp_path):
    monkeypatch.setenv("XDG_DATA_HOME", str(tmp_path / "data"))
    assert platform.data_home() == tmp_path / "data"
    monkeypatch.setenv("BC250_X", "abc")
    assert platform.expand("$BC250_X/y").as_posix().endswith("abc/y")
