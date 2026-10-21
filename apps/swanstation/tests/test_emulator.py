# SPDX-License-Identifier: GPL-3.0-or-later
"""Installing RetroArch and the SwanStation core (emulator.py) with a fake flatpak, and a zip made here instead of the
download: the checks on the zip and the library, the files written, nothing changed when a step fails, and the
buildbot's headers compared to find a newer build."""

from __future__ import annotations

import json
import urllib.error
import zipfile
from pathlib import Path

import pytest

from swanstation_manager import emulator, userdata

# The start of an ELF header of an x86-64 shared library: 64-bit, little-endian, type DYN (3), machine 0x3E.
LIBRARY = b"\x7fELF\x02\x01\x01" + b"\0" * 9 + (3).to_bytes(2, "little") + (0x3E).to_bytes(2, "little") + b"\0" * 64
HEADERS = {"etag": '"123"', "last-modified": "Tue, 20 Oct 2026 04:27:08 GMT"}


def _zip(dest: Path, members: dict[str, bytes], date=(2026, 10, 21, 6, 24, 0)) -> None:
    with zipfile.ZipFile(dest, "w") as bundle:
        for name, data in members.items():
            info = zipfile.ZipInfo(name, date)
            bundle.writestr(info, data)


def _fetch(members: dict[str, bytes], calls: list | None = None):
    def fetch(url: str, dest: Path, progress=None) -> None:
        if calls is not None:
            calls.append(url)
        _zip(dest, members)
    return fetch


def _head(headers=HEADERS):
    return lambda url: dict(headers)


def test_the_core_comes_from_the_libretro_buildbot():
    assert emulator.URL == "https://buildbot.libretro.com/nightly/linux/x86_64/latest/swanstation_libretro.so.zip"
    assert emulator.MEMBER == "swanstation_libretro.so" and emulator.FLATPAK_ID == "org.libretro.RetroArch"


def test_install_and_remove_the_core(tmp_path):
    home = tmp_path / "emulator"
    assert emulator.installed_core(home) == "" and not emulator.core_file(home).exists()
    calls = []
    message = emulator.install_core(home, _fetch({emulator.MEMBER: LIBRARY}, calls), _head())
    assert message == "The SwanStation core of 2026-10-21 is installed." and calls == [emulator.URL]
    core = emulator.core_file(home)
    assert core.read_bytes() == LIBRARY and core.stat().st_mode & 0o777 == 0o755
    assert emulator.installed_core(home) == "2026-10-21"
    info = json.loads((home / "core" / "core.json").read_text())
    assert info["build"] == "2026-10-21" and len(info["sha256"]) == 64 and info["etag"] == '"123"'
    assert sorted(p.name for p in home.iterdir()) == ["core"]                      # no download left behind
    emulator.remove(home)
    assert not home.exists() and emulator.installed_core(home) == ""


def test_a_later_build_replaces_the_installed_one(tmp_path):
    home = tmp_path / "emulator"
    emulator.install_core(home, _fetch({emulator.MEMBER: LIBRARY}), _head())
    newer = LIBRARY + b"newer"
    emulator.install_core(home, _fetch({emulator.MEMBER: newer}), _head({"etag": '"456"'}))
    assert emulator.core_file(home).read_bytes() == newer
    assert json.loads((home / "core" / "core.json").read_text())["etag"] == '"456"'


@pytest.mark.parametrize("members, problem", [
    ({"other.so": LIBRARY}, "does not hold just"),
    ({emulator.MEMBER: LIBRARY, "readme": b"x"}, "does not hold just"),
    ({emulator.MEMBER: b"MZ" + b"\0" * 100}, "not an x86-64 Linux library"),
    ({emulator.MEMBER: LIBRARY[:18] + (0xB7).to_bytes(2, "little") + LIBRARY[20:]}, "not an x86-64 Linux library"),
])
def test_what_is_no_core_is_refused(tmp_path, members, problem):
    home = tmp_path / "emulator"
    with pytest.raises(emulator.EmulatorError, match=problem):
        emulator.install_core(home, _fetch(members), _head())
    assert emulator.installed_core(home) == "" and [p.name for p in home.iterdir()] == []


def test_an_installed_core_is_kept_when_a_download_fails(tmp_path):
    home = tmp_path / "emulator"
    emulator.install_core(home, _fetch({emulator.MEMBER: LIBRARY}), _head())

    def broken(url, dest, progress=None):
        dest.write_bytes(b"not a zip")
    with pytest.raises(emulator.EmulatorError, match="not a zip file"):
        emulator.install_core(home, broken, _head())
    assert emulator.core_file(home).read_bytes() == LIBRARY


def test_a_failed_download_says_why(tmp_path):
    def refused(url, dest, progress=None):
        raise urllib.error.HTTPError(url, 404, "Not Found", {}, None)

    def offline(url, dest, progress=None):
        raise urllib.error.URLError("no route")
    with pytest.raises(emulator.EmulatorError, match="answered 404"):
        emulator.install_core(tmp_path / "a", refused, _head())
    with pytest.raises(emulator.EmulatorError, match="The download failed: no route"):
        emulator.install_core(tmp_path / "b", offline, _head())


def test_a_buildbot_that_does_not_answer_the_head_request_still_installs(tmp_path):
    def silent(url):
        raise urllib.error.URLError("no route")
    home = tmp_path / "emulator"
    emulator.install_core(home, _fetch({emulator.MEMBER: LIBRARY}), silent)
    assert emulator.installed_core(home) == "2026-10-21" and emulator.newer_core(home, _head()) == ""


def test_a_newer_build_is_found_by_its_headers(tmp_path):
    home = tmp_path / "emulator"
    assert emulator.newer_core(home, _head()) == ""                                 # nothing installed
    emulator.install_core(home, _fetch({emulator.MEMBER: LIBRARY}), _head())
    assert emulator.newer_core(home, _head()) == ""                                 # the same build
    newer = {"etag": '"999"', "last-modified": "Thu, 22 Oct 2026 03:00:00 GMT"}
    assert emulator.newer_core(home, _head(newer)) == "2026-10-22"
    assert emulator.newer_core(home, _head({"etag": '"999"'})) == "a newer build"
    assert emulator.newer_core(home, _head({"last-modified": "Thu, 22 Oct 2026 03:00:00 GMT"})) == "2026-10-22"

    def offline(url):
        raise urllib.error.URLError("no route")
    assert emulator.newer_core(home, offline) is None                               # nothing to say


def test_retroarch_is_looked_up_and_installed_with_flatpak(tmp_path):
    seen = []
    state = {"installed": False}

    def flatpak(command):
        seen.append(command)
        if command[:2] == ["flatpak", "info"]:
            return (0, "RetroArch - Frontend\n\n          ID: org.libretro.RetroArch\n     Version: 1.22.2\n") \
                if state["installed"] else (1, "error: not installed")
        if command[:2] == ["flatpak", "install"]:
            state["installed"] = True
        return 0, ""
    assert emulator.retroarch_version(flatpak) == ""
    assert emulator.install_retroarch(flatpak) == "RetroArch 1.22.2 is installed."
    assert seen[1] == ["flatpak", "remote-add", "--user", "--if-not-exists", "flathub", emulator.REMOTE_URL]
    assert seen[2] == ["flatpak", "install", "--user", "--noninteractive", "-y", "flathub", "org.libretro.RetroArch"]
    assert emulator.retroarch_version(flatpak) == "1.22.2"


def test_a_failing_flatpak_says_so():
    def flatpak(command):
        return (1, "line one\nerror: no network") if command[1] == "install" else (0, "")
    with pytest.raises(emulator.EmulatorError, match="flatpak install --user failed: error: no network"):
        emulator.install_retroarch(flatpak)
    assert emulator.retroarch_version(lambda command: (127, "no flatpak")) == ""


def test_the_real_runner_reports_a_missing_program(tmp_path):
    assert emulator.run([str(tmp_path / "nothing")])[0] == 127
    assert emulator.run(["true"]) == (0, "")


def test_the_bios_files_are_the_ones_the_core_looks_for(tmp_path):
    home = tmp_path / ".var" / "app" / "org.libretro.RetroArch" / "config" / "retroarch"
    system = userdata.system_dir(home)
    assert userdata.bios_files(system) == []
    system.mkdir(parents=True)
    for name in ("scph5501.bin", "SCPH1001.BIN", "psxonpsp660.bin", "dc_boot.bin", "readme.txt", "scph.txt"):
        (system / name).write_bytes(b"\0")
    assert [p.name for p in userdata.bios_files(system)] == ["SCPH1001.BIN", "psxonpsp660.bin", "scph5501.bin"]


def test_retroarchs_folder_is_the_flatpaks(monkeypatch, tmp_path):
    monkeypatch.setattr(Path, "home", lambda: tmp_path)
    assert userdata.retroarch_home() == tmp_path / ".var" / "app" / "org.libretro.RetroArch" / "config" / "retroarch"
