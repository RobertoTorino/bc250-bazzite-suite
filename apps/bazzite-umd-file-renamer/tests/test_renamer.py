# SPDX-License-Identifier: GPL-3.0-or-later
"""The rename logic: reading images, the eight naming templates, the filename cleaning and the rename itself."""

from __future__ import annotations

from pathlib import Path

import pytest
from iso_builder import build_iso, psp_tree, tiny_png

from bazzite_umd_file_renamer.renamer import (NamingTemplate, formatted_name, read_umd, rename_file,
                                               scan_directory)
from bazzite_umd_file_renamer.umd import Umd


def test_read_umd_fills_the_struct(tmp_path) -> None:
    icon, pic1 = tiny_png(), tiny_png(16, 8)
    image = build_iso(tmp_path / "ever17.iso", psp_tree("Ever17", "ULJM05437", "1.01", "3.95",
                                                       icon0=icon, pic1=pic1))
    umd = read_umd(image)
    assert umd is not None
    assert (umd.id, umd.title, umd.version, umd.firmware) == ("ULJM05437", "Ever17", "1.01", "3.95")
    assert umd.icon0 == icon and umd.pic0 == b"" and umd.pic1 == pic1
    assert Path(umd.file_path) == image.resolve()
    assert umd.file_name == "ever17.iso" and umd.suffix == ".iso"


def test_read_umd_rejects_non_psp_images(tmp_path) -> None:
    assert read_umd(build_iso(tmp_path / "data.iso", {"README.TXT": b"hi"})) is None
    bad = tmp_path / "bad.iso"
    bad.write_bytes(b"\x00" * 100)
    assert read_umd(bad) is None
    assert read_umd(tmp_path / "missing.iso") is None


def test_scan_directory_lists_only_psp_isos_in_name_order(games_dir) -> None:
    umds = scan_directory(games_dir)
    assert [u.file_name for u in umds] == ["download (1).iso", "ever17.iso", "ridge.ISO"]
    assert [u.id for u in umds] == ["ULUS10336", "ULJM05437", "UCUS98604"]
    assert scan_directory(games_dir / "does-not-exist") == []


@pytest.mark.parametrize("template, expected", [
    (NamingTemplate.ID_TITLE, "ULJM05437 - Ever17"),
    (NamingTemplate.ID_TITLE_SPACE, "ULJM05437 Ever17"),
    (NamingTemplate.ID_TITLE_VERSION, "ULJM05437 - Ever17 - v1.01"),
    (NamingTemplate.TITLE_ID, "Ever17 - ULJM05437"),
    (NamingTemplate.TITLE_ID_SPACE, "Ever17 ULJM05437"),
    (NamingTemplate.TITLE_ONLY, "Ever17"),
    (NamingTemplate.TITLE_BRACKET_ID, "Ever17 [ULJM05437]"),
    (NamingTemplate.TITLE_BRACKET_ID_VERSION, "Ever17 [ULJM05437] [v1.01]"),
])
def test_formatted_name_templates(template, expected) -> None:
    umd = Umd(id="ULJM05437", title="Ever17", version="1.01", file_path="/x/a.iso")
    assert formatted_name(umd, template) == expected
    assert NamingTemplate.from_index(template.index) is template


def test_formatted_name_cleans_and_prefers_the_translation() -> None:
    umd = Umd(id="ULUS10336", title='Crisis Core: Final Fantasy VII™ <dir|ty>?*"\\/', version="v1.00",
              file_path="/x/a.iso")
    assert formatted_name(umd) == "ULUS10336 - Crisis Core Final Fantasy VII dirty"
    assert formatted_name(umd, NamingTemplate.ID_TITLE_VERSION).endswith(" - v1.00")   # no second "v"
    umd.translated_title = "  Ever17: The Out of Infinity  "
    assert formatted_name(umd, NamingTemplate.TITLE_ONLY) == "Ever17 The Out of Infinity"
    assert NamingTemplate.from_index(99) is NamingTemplate.ID_TITLE


def test_rename_file(games_dir) -> None:
    umd = read_umd(games_dir / "download (1).iso")
    assert umd is not None
    assert rename_file(umd, formatted_name(umd))
    target = games_dir / "ULUS10336 - Crisis Core Final Fantasy VII.iso"
    assert target.is_file() and not (games_dir / "download (1).iso").exists()
    assert Path(umd.file_path) == target

    # The same name again is fine; another file's name is never taken over.
    assert rename_file(umd, formatted_name(umd))
    assert not rename_file(umd, "ever17")
    assert (games_dir / "ever17.iso").is_file() and Path(umd.file_path) == target

    # The extension is kept as it was, upper case included.
    ridge = read_umd(games_dir / "ridge.ISO")
    assert ridge is not None and rename_file(ridge, "UCUS98604 - RIDGE RACER")
    assert (games_dir / "UCUS98604 - RIDGE RACER.ISO").is_file()
