# SPDX-License-Identifier: GPL-3.0-or-later
"""The ISO 9660 reader against images from iso_builder.py."""

from __future__ import annotations

from iso_builder import SECTOR, build_iso, psp_tree, tiny_png

from bazzite_umd_file_renamer.iso import IsoReader


def test_reads_files_by_path_case_insensitively(tmp_path) -> None:
    icon = tiny_png()
    image = build_iso(tmp_path / "game.iso", psp_tree(icon0=icon))
    with IsoReader(image) as iso:
        assert iso.open()
        assert iso.read_file("PSP_GAME/ICON0.PNG") == icon
        assert iso.read_file("psp_game/icon0.png") == icon
        assert iso.read_file("/PSP_GAME//ICON0.PNG") == icon
        assert iso.read_file("UMD_DATA.BIN").startswith(b"ULJM-05437|")
        assert iso.read_file("PSP_GAME/PARAM.SFO")[:4] == b"\x00PSF"


def test_missing_paths_give_empty_bytes(tmp_path) -> None:
    image = build_iso(tmp_path / "game.iso", psp_tree())
    with IsoReader(image) as iso:
        assert iso.open()
        assert iso.read_file("PSP_GAME/PIC0.PNG") == b""
        assert iso.read_file("NOPE/PARAM.SFO") == b""
        assert iso.read_file("UMD_DATA.BIN/PARAM.SFO") == b""   # a file is not a directory
        assert iso.read_file("") == b""


def test_rejects_files_that_are_not_iso_images(tmp_path) -> None:
    short = tmp_path / "short.iso"
    short.write_bytes(b"\x00" * 100)
    assert not IsoReader(short).open()
    wrong = tmp_path / "wrong.iso"
    wrong.write_bytes(b"\x00" * (17 * SECTOR))
    assert not IsoReader(wrong).open()
    assert not IsoReader(tmp_path / "missing.iso").open()


def test_directory_spanning_several_sectors(tmp_path) -> None:
    """A directory record never crosses a sector boundary; the reader skips the padding at a sector's end."""
    files = {f"FILE{i:03d}.BIN": bytes([i % 256]) * (i + 1) for i in range(120)}
    files["LAST.BIN"] = b"the last one"
    image = build_iso(tmp_path / "big.iso", {"DATA": files})
    with IsoReader(image) as iso:
        assert iso.open()
        assert iso.read_file("DATA/FILE000.BIN") == b"\x00"
        assert iso.read_file("DATA/FILE119.BIN") == bytes([119]) * 120
        assert iso.read_file("DATA/LAST.BIN") == b"the last one"


def test_large_file_spans_sectors(tmp_path) -> None:
    payload = bytes(range(256)) * 40     # 10240 bytes, five sectors
    image = build_iso(tmp_path / "big.iso", {"BIG.BIN": payload, "PSP_GAME": {"PARAM.SFO": b"x"}})
    with IsoReader(image) as iso:
        assert iso.open()
        assert iso.read_file("BIG.BIN") == payload
