# SPDX-License-Identifier: GPL-3.0-or-later
"""Minimal read-only ISO 9660 reader: opens a .iso image and reads files by their in-image path, e.g.
``PSP_GAME/PARAM.SFO``. Port of ``qt/src/isoreader.cpp``."""

from __future__ import annotations

import struct
from dataclasses import dataclass
from pathlib import Path
from typing import BinaryIO, Optional, Union

SECTOR_SIZE = 2048
PVD_SECTOR = 16


@dataclass
class DirRecord:
    lba: int
    size: int
    is_dir: bool
    name: str       # upper-case, version suffix stripped


class IsoReader:
    def __init__(self, file_path: Union[str, Path]) -> None:
        self._path = Path(file_path)
        self._file: Optional[BinaryIO] = None
        self._root_lba = 0
        self._root_size = 0

    def __enter__(self) -> "IsoReader":
        return self

    def __exit__(self, *exc: object) -> None:
        self.close()

    def open(self) -> bool:
        """Open the image and parse the Primary Volume Descriptor."""
        try:
            self._file = open(self._path, "rb")
        except OSError:
            return False

        # The Primary Volume Descriptor lives at sector 16.
        pvd = self._read_sectors(PVD_SECTOR, SECTOR_SIZE)
        if len(pvd) < SECTOR_SIZE:
            return False

        # Byte 0 = descriptor type (1 = PVD); bytes 1-5 = "CD001".
        if pvd[0] != 1 or pvd[1:6] != b"CD001":
            return False

        # The Root Directory Record is embedded at byte 156 inside the PVD.
        self._root_lba = struct.unpack_from("<I", pvd, 156 + 2)[0]
        self._root_size = struct.unpack_from("<I", pvd, 156 + 10)[0]
        return True

    def close(self) -> None:
        if self._file is not None:
            self._file.close()
            self._file = None

    def read_file(self, path: str) -> bytes:
        """The raw bytes of a file inside the image, or b"" if not found. ``path`` is forward-slash separated,
        e.g. "PSP_GAME/ICON0.PNG", and case-insensitive (ISO 9660 stores names in upper-case)."""
        parts = [part for part in path.split("/") if part]
        if not parts:
            return b""

        cur_lba, cur_size = self._root_lba, self._root_size
        for i, part in enumerate(parts):
            entry = self._find_entry(cur_lba, cur_size, part)
            if entry is None:
                return b""
            if i == len(parts) - 1:
                # Final component: read the file data.
                return self._read_sectors(entry.lba, entry.size)
            # An intermediate component must be a directory.
            if not entry.is_dir:
                return b""
            cur_lba, cur_size = entry.lba, entry.size
        return b""

    # ------------------------------------------------------------------

    def _read_sectors(self, lba: int, byte_count: int) -> bytes:
        if self._file is None:
            return b""
        try:
            self._file.seek(lba * SECTOR_SIZE)
            return self._file.read(byte_count)
        except (OSError, ValueError):
            return b""

    def _read_directory(self, lba: int, byte_size: int) -> list[DirRecord]:
        entries: list[DirRecord] = []
        data = self._read_sectors(lba, byte_size)
        if not data:
            return entries

        pos = 0
        end = min(byte_size, len(data))
        while pos < end:
            length = data[pos]
            if length == 0:
                # Padding at the end of a sector: advance to the next sector boundary.
                pos = (pos // SECTOR_SIZE + 1) * SECTOR_SIZE
                continue
            if pos + length > end or length < 33:
                break

            rec = data[pos:pos + length]
            name_len = rec[32]
            if name_len == 1 and rec[33] == 0x00:
                name = "."
            elif name_len == 1 and rec[33] == 0x01:
                name = ".."
            else:
                name = rec[33:33 + name_len].decode("latin-1")
                # ISO 9660 appends a version suffix ";1" to file identifiers.
                semi = name.find(";")
                if semi >= 0:
                    name = name[:semi]

            entries.append(DirRecord(
                lba=struct.unpack_from("<I", rec, 2)[0],
                size=struct.unpack_from("<I", rec, 10)[0],
                is_dir=(rec[25] & 0x02) != 0,
                name=name))
            pos += length
        return entries

    def _find_entry(self, dir_lba: int, dir_size: int, name: str) -> Optional[DirRecord]:
        upper = name.upper()
        for record in self._read_directory(dir_lba, dir_size):
            if record.name.upper() == upper:
                return record
        return None
