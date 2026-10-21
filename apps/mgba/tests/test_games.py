# SPDX-License-Identifier: GPL-3.0-or-later
"""The game scan (games.py): a GBA cartridge told by its header (the fixed byte and the checksum), its game code,
a .zip with a .gba in it, files that are no GBA game left out, a game found twice and depth."""

from __future__ import annotations

from conftest import gba_bytes, make_gba, make_zip

from mgba_manager.games import Game, game_code, read_game, scan


def test_the_game_code_comes_from_the_header():
    assert game_code(gba_bytes("BPEE")) == "BPEE"
    assert game_code(gba_bytes("AXVE")) == "AXVE"
    homebrew = bytearray(gba_bytes())
    homebrew[0xAC:0xB0] = b"\0\0\0\0"
    homebrew[0xBD] = (-(sum(homebrew[0xA0:0xBD]) + 0x19)) & 0xFF
    assert game_code(bytes(homebrew)) == ""                                      # a GBA game without a code


def test_what_is_no_gba_cartridge_is_refused():
    wrong_sum = bytearray(gba_bytes())
    wrong_sum[0xBD] ^= 0xFF
    no_fixed = bytearray(gba_bytes())
    no_fixed[0xB2] = 0
    assert game_code(bytes(wrong_sum)) is None and game_code(bytes(no_fixed)) is None
    assert game_code(gba_bytes()[:0x80]) is None and game_code(b"") is None


def test_a_gba_file_is_read(tmp_path):
    rom = make_gba(tmp_path / "Pokemon Emerald.gba")
    assert read_game(rom) == Game(rom, "Pokemon Emerald", "BPEE", "gba") and read_game(rom).folder == tmp_path
    other = tmp_path / "notes.gba"
    other.write_bytes(b"\0" * 0x200)
    assert read_game(other) is None and read_game(tmp_path / "missing.gba") is None


def test_a_zip_with_a_gba_in_it(tmp_path):
    zipped = make_zip(tmp_path / "Metroid Fusion.zip", {"readme.txt": b"x", "Metroid Fusion.gba": gba_bytes("AMTE")})
    assert read_game(zipped) == Game(zipped, "Metroid Fusion", "AMTE", "zip")
    gameboy = make_zip(tmp_path / "Tetris.zip", {"Tetris.gb": b"\0" * 0x200})
    broken = tmp_path / "broken.zip"
    broken.write_bytes(b"PK not really")
    assert read_game(gameboy) is None and read_game(broken) is None


def test_the_scan_sorts_finds_once_and_stops_at_a_depth(tmp_path):
    make_gba(tmp_path / "b" / "Zed.gba", "AZDE")
    make_gba(tmp_path / "a" / "apple.gba", "AAPE")
    deep = tmp_path
    for part in "123456":
        deep = deep / part
    make_gba(deep / "Deep.gba")
    make_gba(tmp_path / ".hidden" / "Hidden.gba")
    (tmp_path / "Tetris.gb").write_bytes(b"\0" * 0x200)                          # SameBoy Manager's
    games = scan([tmp_path, tmp_path / "a"])                                       # "a" is below the first folder too
    assert [g.title for g in games] == ["apple", "Zed"]
    assert scan([tmp_path / "missing"]) == []


def test_a_linked_game_is_counted_once(tmp_path):
    rom = make_gba(tmp_path / "one" / "Game.gba")
    (tmp_path / "two").mkdir()
    (tmp_path / "two" / "Game.gba").symlink_to(rom)
    assert len(scan([tmp_path])) == 1
