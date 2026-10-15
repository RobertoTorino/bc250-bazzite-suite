# SPDX-License-Identifier: GPL-3.0-or-later
"""The game scan (games.py): SYSTEM.CNF read out of an ISO, the serial as PCSX2 shows it, the compressed formats
under their own name, a game found twice, and depth."""

from __future__ import annotations

from conftest import iso_bytes, make_disc, system_cnf

from bc250_pcsx2_manager.games import Game, iso_file, read_disc, read_system_cnf, scan, serial_of


def test_system_cnf_is_read():
    assert read_system_cnf(system_cnf()) == ("SLUS-12345", "1.00")
    assert read_system_cnf(b"BOOT2 = cdrom0:\\SCES_524.12;1\r\n") == ("SCES-52412", "")
    assert read_system_cnf(b"boot2=cdrom0:SLPS_123.45;1\nver=2.01\n") == ("SLPS-12345", "2.01")   # no backslash
    assert read_system_cnf(b"BOOT = cdrom0:\\PSX.EXE;1\nVER = 1.0\n") == ("PSXEXE", "1.0")        # a PS1 disc boots BOOT
    assert read_system_cnf(b"nothing here") == ("", "")


def test_the_serial_as_pcsx2_shows_it():
    assert serial_of("SLUS_123.45") == "SLUS-12345"
    assert serial_of("DATA\\SLES_500.03") == "SLES-50003"                       # some discs boot from a folder
    assert serial_of("MODULES/THING") == "THING"


def test_an_iso_is_read(tmp_path):
    iso = make_disc(tmp_path / "Shadow of the Colossus (USA).iso", "SCUS_974.72", "1.00")
    game = read_disc(iso)
    assert game == Game(iso, "Shadow of the Colossus (USA)", "SCUS-97472", "1.00", "iso")
    assert game.folder == tmp_path
    assert iso_file(iso, ("MISSING.CNF",)) is None


def test_files_that_are_no_ps2_games(tmp_path):
    other = tmp_path / "other.iso"
    other.write_bytes(iso_bytes({"README.TXT": b"not a PS2 disc"}))
    assert read_disc(other) is None                                            # an ISO without SYSTEM.CNF
    empty = tmp_path / "empty.iso"
    empty.write_bytes(b"\0" * 40000)
    assert read_disc(empty) is None
    boots_nothing = tmp_path / "none.iso"
    boots_nothing.write_bytes(iso_bytes({"SYSTEM.CNF": b"VMODE = NTSC\r\n"}))
    assert read_disc(boots_nothing) is None
    assert read_disc(tmp_path / "gone.iso") is None


def test_compressed_images_are_listed_under_their_name(tmp_path):
    for suffix, kind in ((".chd", "chd"), (".cso", "cso"), (".zso", "zso"), (".gz", "gz")):
        path = tmp_path / f"Gran Turismo 4 (Europe){suffix}"
        path.write_bytes(b"compressed")
        assert read_disc(path) == Game(path, "Gran Turismo 4 (Europe)", kind=kind)


def test_scan_finds_games_sorted_once_and_not_too_deep(tmp_path):
    root = tmp_path / "PS2"
    make_disc(root / "Zeta.iso", "SLUS_000.03")
    make_disc(root / "set" / "alpha.iso", "SLUS_000.01")
    make_disc(root / "a" / "b" / "c" / "d" / "e" / "five.iso", "SLUS_000.04")
    make_disc(root / "a" / "b" / "c" / "d" / "e" / "f" / "six.iso", "SLUS_000.05")
    make_disc(root / ".hidden" / "x.iso", "SLUS_000.06")
    (root / "chd").mkdir()
    (root / "chd" / "Compressed.chd").write_bytes(b"MComprHD")
    (tmp_path / "link.iso").symlink_to(root / "Zeta.iso")
    games = scan([root, tmp_path, tmp_path / "missing"])
    assert [g.title for g in games] == ["alpha", "Compressed", "five", "Zeta"]
    assert [g.serial for g in games] == ["SLUS-00001", "", "SLUS-00004", "SLUS-00003"]
    assert [g.kind for g in games] == ["iso", "chd", "iso", "iso"]
