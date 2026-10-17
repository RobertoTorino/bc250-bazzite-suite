# SPDX-License-Identifier: GPL-3.0-or-later
"""PCSX2's own folder (userdata.py): where it is, and which files in its bios folder count as BIOS dumps."""

from __future__ import annotations

from conftest import make_bios

from pcsx2_manager.userdata import bios_dir, bios_files, pcsx2_home


def test_pcsx2s_own_folder(monkeypatch, tmp_path):
    monkeypatch.setenv("XDG_CONFIG_HOME", str(tmp_path / "config"))
    assert pcsx2_home() == tmp_path / "config" / "PCSX2"
    assert bios_dir(pcsx2_home()) == tmp_path / "config" / "PCSX2" / "bios"


def test_the_bios_dumps(tmp_path):
    folder = tmp_path / "bios"
    assert bios_files(folder) == []                                            # not there yet
    dump = make_bios(folder)                                                   # brings SCPH-70012.bin and its .nvm
    rom = folder / "ps2-0230e-20080220.ROM"
    rom.write_bytes(b"\0" * 64)
    (folder / "readme.txt").write_text("not a BIOS")
    (folder / "folder.bin").mkdir()
    assert bios_files(folder) == [dump, rom]                                   # .nvm and the rest left out
