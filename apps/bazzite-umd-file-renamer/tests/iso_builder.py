# SPDX-License-Identifier: GPL-3.0-or-later
"""Builds small but real ISO 9660 images and PARAM.SFO files for the tests, since no PSP image can live in the
repo. The image has the Primary Volume Descriptor at sector 16, a terminator at 17, then the directories and the
files, each starting at a sector boundary; directory records never cross a sector boundary, as the standard
says, so a directory with many entries tests the reader's end-of-sector padding."""

from __future__ import annotations

import struct
import zlib
from pathlib import Path
from typing import Optional, Union

SECTOR = 2048

# A nested tree: {"PSP_GAME": {"PARAM.SFO": b"...", "ICON0.PNG": b"..."}, "README.TXT": b"..."}
Tree = dict[str, Union[bytes, "Tree"]]


# -- PARAM.SFO ---------------------------------------------------------------------------------------------

PSF_STRING = 2
PSF_INT32 = 4


def build_psf(entries: list[tuple[str, int, bytes]]) -> bytes:
    """``entries``: (key, data_type, value bytes). Strings get a trailing NUL and padding to 4 bytes, like the
    real files. The index entry layout is the one the parser reads: key_offset u16, align u8, data_type u8,
    val_size u32, total_size u32, data_offset u32."""
    keys = b""
    values = b""
    index = b""
    for key, data_type, value in entries:
        key_offset = len(keys)
        keys += key.encode("ascii") + b"\x00"
        data = value + (b"\x00" if data_type == PSF_STRING else b"")
        total = (len(data) + 3) & ~3
        data_offset = len(values)
        values += data.ljust(total, b"\x00")
        index += struct.pack("<HBBIII", key_offset, 4, data_type, len(data), total, data_offset)
    key_table_offset = 20 + len(index)
    keys = keys.ljust((len(keys) + 3) & ~3, b"\x00")
    value_table_offset = key_table_offset + len(keys)
    header = struct.pack("<IIIII", 0x46535000, 0x00000101, key_table_offset, value_table_offset, len(entries))
    return header + index + keys + values


def psp_param_sfo(title: str = "Ever17", disc_id: str = "ULJM05437", disc_version: str = "1.01",
                  system_ver: str = "3.95") -> bytes:
    return build_psf([
        ("BOOTABLE", PSF_INT32, struct.pack("<i", 1)),
        ("CATEGORY", PSF_STRING, b"UG"),
        ("DISC_ID", PSF_STRING, disc_id.encode("utf-8")),
        ("DISC_VERSION", PSF_STRING, disc_version.encode("utf-8")),
        ("PARENTAL_LEVEL", PSF_INT32, struct.pack("<i", 1)),
        ("PSP_SYSTEM_VER", PSF_STRING, system_ver.encode("utf-8")),
        ("REGION", PSF_INT32, struct.pack("<i", 32768)),
        ("TITLE", PSF_STRING, title.encode("utf-8")),
    ])


# -- PNG ---------------------------------------------------------------------------------------------------

def tiny_png(width: int = 4, height: int = 4, rgb: tuple[int, int, int] = (200, 40, 40)) -> bytes:
    def chunk(kind: bytes, body: bytes) -> bytes:
        return struct.pack(">I", len(body)) + kind + body + struct.pack(">I", zlib.crc32(kind + body))
    raw = b"".join(b"\x00" + bytes(rgb) * width for _ in range(height))
    return (b"\x89PNG\r\n\x1a\n" + chunk(b"IHDR", struct.pack(">IIBBBBB", width, height, 8, 2, 0, 0, 0))
            + chunk(b"IDAT", zlib.compress(raw)) + chunk(b"IEND", b""))


# -- ISO 9660 -----------------------------------------------------------------------------------------------

def _both(value: int, fmt: str) -> bytes:
    """ISO 9660 "both-byte-order" number: little-endian then big-endian."""
    return struct.pack("<" + fmt, value) + struct.pack(">" + fmt, value)


def _record(name: bytes, lba: int, size: int, is_dir: bool) -> bytes:
    length = 33 + len(name)
    if length % 2:
        length += 1                      # records have an even length
    body = (bytes([length, 0]) + _both(lba, "I") + _both(size, "I") + bytes(7)
            + bytes([0x02 if is_dir else 0x00, 0, 0]) + _both(1, "H") + bytes([len(name)]) + name)
    return body.ljust(length, b"\x00")


def _pack_directory(records: list[bytes]) -> bytes:
    """Records never cross a sector boundary: the rest of a sector is zero padding."""
    out = b""
    for record in records:
        used = len(out) % SECTOR
        if used and used + len(record) > SECTOR:
            out = out.ljust(len(out) + SECTOR - used, b"\x00")
        out += record
    return out.ljust(((len(out) + SECTOR - 1) // SECTOR) * SECTOR, b"\x00")


class _Dir:
    def __init__(self, tree: Tree, parent: Optional["_Dir"]) -> None:
        self.parent = parent or self
        self.files: list[tuple[bytes, bytes]] = []
        self.subdirs: list[tuple[bytes, _Dir]] = []
        self.lba = 0
        self.size = 0
        for name, content in tree.items():
            if isinstance(content, dict):
                self.subdirs.append((name.encode("ascii"), _Dir(content, self)))
            else:
                self.files.append((name.encode("ascii") + b";1", content))
        # A directory's size depends only on its names, so it is known before any address is.
        self.size = len(self._pack({}))

    def _pack(self, file_lba: dict[bytes, int]) -> bytes:
        records = [_record(b"\x00", self.lba, self.size, True),
                   _record(b"\x01", self.parent.lba, self.parent.size, True)]
        records += [_record(name, sub.lba, sub.size, True) for name, sub in self.subdirs]
        records += [_record(name, file_lba.get(name, 0), len(data), False) for name, data in self.files]
        return _pack_directory(records)

    def layout(self, next_lba: int, sectors: dict[int, bytes]) -> int:
        """Gives this directory, its files and its subdirectories their addresses and writes their sectors."""
        self.lba = next_lba
        next_lba += self.size // SECTOR
        file_lba: dict[bytes, int] = {}
        for name, data in self.files:
            file_lba[name] = next_lba
            sectors[next_lba] = data
            next_lba += max(1, (len(data) + SECTOR - 1) // SECTOR)
        for _name, sub in self.subdirs:
            next_lba = sub.layout(next_lba, sectors)
        sectors[self.lba] = self._pack(file_lba)
        return next_lba


def build_iso(path: Union[str, Path], tree: Tree, volume_id: str = "PSP GAME") -> Path:
    """Writes an ISO 9660 image holding ``tree`` and returns its path."""
    root = _Dir(tree, None)
    sectors: dict[int, bytes] = {}
    total_sectors = root.layout(18, sectors)

    pvd = bytearray(SECTOR)
    pvd[0] = 1
    pvd[1:6] = b"CD001"
    pvd[6] = 1
    pvd[8:40] = b"PSP GAME".ljust(32)
    pvd[40:72] = volume_id.encode("ascii").ljust(32)
    pvd[80:88] = _both(total_sectors, "I")
    pvd[120:124] = _both(1, "H")
    pvd[124:128] = _both(1, "H")
    pvd[128:132] = _both(SECTOR, "H")
    pvd[156:190] = _record(b"\x00", root.lba, root.size, True)
    terminator = bytearray(SECTOR)
    terminator[0] = 255
    terminator[1:6] = b"CD001"
    terminator[6] = 1

    image = bytearray(total_sectors * SECTOR)
    image[16 * SECTOR:17 * SECTOR] = pvd
    image[17 * SECTOR:18 * SECTOR] = terminator
    for lba, data in sectors.items():
        image[lba * SECTOR:lba * SECTOR + len(data)] = data

    out = Path(path)
    out.write_bytes(bytes(image))
    return out


def psp_tree(title: str = "Ever17", disc_id: str = "ULJM05437", disc_version: str = "1.01",
             system_ver: str = "3.95", icon0: Optional[bytes] = None, pic0: Optional[bytes] = None,
             pic1: Optional[bytes] = None) -> Tree:
    game: Tree = {"PARAM.SFO": psp_param_sfo(title, disc_id, disc_version, system_ver)}
    if icon0 is not None:
        game["ICON0.PNG"] = icon0
    if pic0 is not None:
        game["PIC0.PNG"] = pic0
    if pic1 is not None:
        game["PIC1.PNG"] = pic1
    return {"PSP_GAME": game, "UMD_DATA.BIN": b"ULJM-05437|0123456789ABCDEF|0001|G"}
