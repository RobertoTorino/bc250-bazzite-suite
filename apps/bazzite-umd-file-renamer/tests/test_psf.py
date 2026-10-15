# SPDX-License-Identifier: GPL-3.0-or-later
"""The PARAM.SFO reader."""

from __future__ import annotations

import struct

from iso_builder import PSF_INT32, PSF_STRING, build_psf, psp_param_sfo

from bazzite_umd_file_renamer import psf


def test_parse_reads_the_four_string_keys() -> None:
    data = psf.parse(psp_param_sfo("Ever17", "ULJM05437", "1.01", "3.95"))
    assert data is not None
    assert data.title == "Ever17"
    assert data.disc_id == "ULJM05437"
    assert data.disc_version == "1.01"
    assert data.psp_system_ver == "3.95"


def test_parse_strips_trailing_nuls_and_keeps_utf8() -> None:
    data = psf.parse(build_psf([("TITLE", PSF_STRING, "エバー17\x00\x00".encode("utf-8"))]))
    assert data is not None and data.title == "エバー17"


def test_parse_ignores_integer_entries_with_the_same_key() -> None:
    data = psf.parse(build_psf([("TITLE", PSF_INT32, struct.pack("<i", 7)), ("DISC_ID", PSF_STRING, b"X")]))
    assert data is not None
    assert data.title == ""
    assert data.disc_id == "X"


def test_parse_rejects_garbage() -> None:
    assert psf.parse(b"") is None
    assert psf.parse(b"\x00PSF" + b"\x00" * 8) is None          # too short
    assert psf.parse(b"XXXX" + b"\x00" * 32) is None             # wrong magic


def test_parse_survives_out_of_range_offsets() -> None:
    header = struct.pack("<IIIII", 0x46535000, 0x101, 20 + 16, 20 + 16 + 8, 1)
    entry = struct.pack("<HBBIII", 0, 4, PSF_STRING, 1000, 1000, 5000)   # value far past the end
    data = psf.parse(header + entry + b"TITLE\x00\x00\x00" + b"Ever17\x00\x00")
    assert data is not None and data.title == ""
