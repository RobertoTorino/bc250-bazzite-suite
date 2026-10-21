# SPDX-License-Identifier: GPL-3.0-or-later
"""The game scan (games.py): a Game Boy cartridge told by its header (the checksum, the ROM size it names), the
system from the colour flag whatever the suffix, a .zip with a game in it, files that are no Game Boy game left out,
a game found twice and depth."""

from __future__ import annotations

from conftest import gb_bytes, make_gb, make_zip

from sameboy_manager.games import Game, read_game, scan, system


def test_the_system_comes_from_the_colour_flag():
    assert system(gb_bytes(0x00), 0x8000) == "GB"
    assert system(gb_bytes(0x80), 0x8000) == "GBC"                               # colour, also on a Game Boy
    assert system(gb_bytes(0xC0), 0x8000) == "GBC"                               # Game Boy Color only
    assert system(gb_bytes(0x00, 2), 0x20000) == "GB"                            # 128 KB


def test_what_is_no_game_boy_cartridge_is_refused():
    wrong_sum = bytearray(gb_bytes())
    wrong_sum[0x14D] ^= 0xFF
    assert system(bytes(wrong_sum), 0x8000) is None
    assert system(gb_bytes(), 0x10000) is None                                   # not the size the header names
    bad_code = bytearray(gb_bytes())
    bad_code[0x148] = 9
    assert system(bytes(bad_code), 0x8000) is None
    assert system(b"", 0) is None and system(gb_bytes()[:0x100], 0x8000) is None


def test_files_are_read_whatever_their_suffix(tmp_path):
    tetris = make_gb(tmp_path / "Tetris.gb")
    crystal = make_gb(tmp_path / "Pokemon Crystal.gbc", 0x80)
    dx = make_gb(tmp_path / "Zelda DX.gb", 0x80)                                 # a colour game named .gb
    assert read_game(tetris) == Game(tetris, "Tetris", "GB", "gb") and read_game(tetris).folder == tmp_path
    assert read_game(crystal) == Game(crystal, "Pokemon Crystal", "GBC", "gbc")
    assert read_game(dx).system == "GBC"
    other = tmp_path / "notes.gb"
    other.write_bytes(b"\0" * 0x8000)
    assert read_game(other) is None and read_game(tmp_path / "missing.gb") is None


def test_a_zip_with_a_game_in_it(tmp_path):
    zipped = make_zip(tmp_path / "Wario Land 3.zip", {"readme.txt": b"x", "Wario Land 3.gbc": gb_bytes(0xC0)})
    assert read_game(zipped) == Game(zipped, "Wario Land 3", "GBC", "zip")
    gba = make_zip(tmp_path / "Fusion.zip", {"Fusion.gba": b"\0" * 0x200})
    broken = tmp_path / "broken.zip"
    broken.write_bytes(b"PK not really")
    assert read_game(gba) is None and read_game(broken) is None


def test_the_scan_sorts_finds_once_and_stops_at_a_depth(tmp_path):
    make_gb(tmp_path / "b" / "Zed.gb")
    make_gb(tmp_path / "a" / "apple.gbc", 0xC0)
    deep = tmp_path
    for part in "123456":
        deep = deep / part
    make_gb(deep / "Deep.gb")
    make_gb(tmp_path / ".hidden" / "Hidden.gb")
    (tmp_path / "Fusion.gba").write_bytes(b"\0" * 0x200)                         # mGBA Manager's
    games = scan([tmp_path, tmp_path / "a"])                                       # "a" is below the first folder too
    assert [(g.title, g.system) for g in games] == [("apple", "GBC"), ("Zed", "GB")]
    assert scan([tmp_path / "missing"]) == []


def test_a_linked_game_is_counted_once(tmp_path):
    rom = make_gb(tmp_path / "one" / "Game.gb")
    (tmp_path / "two").mkdir()
    (tmp_path / "two" / "Game.gb").symlink_to(rom)
    assert len(scan([tmp_path])) == 1
