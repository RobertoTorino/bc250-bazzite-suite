# SPDX-License-Identifier: GPL-3.0-or-later
"""The game scan (games.py): the disc ID from SYSTEM.CNF in cooked and raw images, CUE sheets and playlists with
the files they name, CHD and PBP under their own names, BIOS dumps and other .bin files left out, a game found twice
and depth."""

from __future__ import annotations

from conftest import make_cue, make_disc, system_cnf

from swanstation_manager.games import Game, disc_id, read_cue, read_image, scan, system_cnf as read_system_cnf


def test_the_disc_id_is_written_as_the_databases_do():
    assert disc_id("BOOT = cdrom:\\SLUS_005.94;1\r\n") == "SLUS-00594"
    assert disc_id("BOOT=cdrom:SCES_012.34;1") == "SCES-01234"
    assert disc_id("BOOT = cdrom:\\SLPS-01234;1") == "SLPS-01234"
    assert disc_id("BOOT = cdrom:\\GAMES\\SLES_123.45;1") == "SLES-12345"
    assert disc_id("BOOT2 = cdrom0:\\SLUS_200.01;1") == ""                       # a PS2 disc
    assert disc_id("") == ""


def test_an_iso_is_read(tmp_path):
    iso = make_disc(tmp_path / "Crash.iso", disc_id="SCUS_941.26")
    assert read_image(iso) == Game(iso, "Crash", "SCUS-94126", "iso") and read_image(iso).folder == tmp_path
    assert "SCUS_941.26" in read_system_cnf(iso)


def test_raw_images_of_both_modes_are_read(tmp_path):
    for header in (16, 24):
        image = make_disc(tmp_path / f"mode{header}.bin", disc_id="SLES_012.34", raw=header)
        assert read_image(image) == Game(image, f"mode{header}", "SLES-01234", "bin")


def test_what_is_no_ps1_disc_is_not_a_game(tmp_path):
    bios = tmp_path / "scph5501.bin"
    bios.write_bytes(b"\0" * 4096)
    empty = tmp_path / "empty.iso"
    empty.write_bytes(b"")
    assert read_image(bios) is None and read_image(empty) is None and read_image(tmp_path / "missing.iso") is None
    other = make_disc(tmp_path / "data.iso")
    other.write_bytes(other.read_bytes().replace(b"BOOT", b"BOTT"))               # a disc without a BOOT line
    assert read_image(other) is None


def test_a_cue_is_the_game_and_its_bins_are_not(tmp_path):
    cue = make_cue(tmp_path / "games", "Final Fantasy", "SCUS_941.63", tracks=3)
    assert read_cue(cue) == Game(cue, "Final Fantasy", "SCUS-94163", "cue")
    assert scan([tmp_path]) == [Game(cue, "Final Fantasy", "SCUS-94163", "cue")]


def test_a_cue_without_its_file_is_no_game(tmp_path):
    cue = tmp_path / "Lost.cue"
    cue.write_text('FILE "Lost.bin" BINARY\n  TRACK 01 MODE2/2352\n    INDEX 01 00:00:00\n')
    assert read_cue(cue) is None and scan([tmp_path]) == []
    (tmp_path / "Lost.bin").write_bytes(b"\0" * 4096)                              # there, but no disc: still a game
    assert read_cue(cue) == Game(cue, "Lost", "", "cue")


def test_an_m3u_is_the_game_and_its_discs_are_not(tmp_path):
    one = make_cue(tmp_path, "Disc One", "SLUS_001.00")
    two = make_cue(tmp_path, "Disc Two", "SLUS_001.01")
    playlist = tmp_path / "Chrono.m3u"
    playlist.write_text(f"#EXTM3U\n{one.name}\n{two.name}\n")
    assert scan([tmp_path]) == [Game(playlist, "Chrono", "", "m3u")]


def test_chd_and_pbp_are_listed_under_their_own_names(tmp_path):
    (tmp_path / "Lumines.chd").write_bytes(b"MComprHD")
    (tmp_path / "EBOOT.PBP").write_bytes(b"\0PBP")
    assert [(g.title, g.kind) for g in scan([tmp_path])] == [("EBOOT", "pbp"), ("Lumines", "chd")]


def test_the_scan_sorts_finds_once_and_stops_at_a_depth(tmp_path):
    make_disc(tmp_path / "b" / "Zed.iso", disc_id="SLUS_000.01")
    make_disc(tmp_path / "a" / "apple.iso", disc_id="SLUS_000.02")
    deep = tmp_path
    for part in "123456":
        deep = deep / part
    make_disc(deep / "Deep.iso")
    (tmp_path / "scph5501.bin").write_bytes(b"\0" * 4096)
    (tmp_path / ".hidden").mkdir()
    make_disc(tmp_path / ".hidden" / "Hidden.iso")
    games = scan([tmp_path, tmp_path / "a"])                                         # "a" is below the first folder too
    assert [g.title for g in games] == ["apple", "Zed"]
    assert scan([tmp_path / "missing"]) == []


def test_a_linked_disc_is_counted_once(tmp_path):
    iso = make_disc(tmp_path / "one" / "Game.iso")
    (tmp_path / "two").mkdir()
    (tmp_path / "two" / "Game.iso").symlink_to(iso)
    assert len(scan([tmp_path])) == 1


def test_system_cnf_of_a_cooked_image_is_text(tmp_path):
    iso = make_disc(tmp_path / "x.iso")
    assert read_system_cnf(iso).startswith("BOOT = cdrom:") and system_cnf().decode().startswith("BOOT")
