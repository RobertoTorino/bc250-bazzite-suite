# SPDX-License-Identifier: GPL-3.0-or-later
"""Parser for Sony's PSF (PARAM.SFO) binary format used in PSP games. Port of ``qt/src/psfparser.cpp``.

Binary layout::

    Header (20 bytes)
      magic            uint32  0x46535000  ("\\0PSF")
      version          uint32  0x00000101
      key_table_offset uint32
      val_table_offset uint32
      num_entries      uint32

    Index table (num_entries x 16 bytes)
      key_offset  uint16
      align_type  uint8
      data_type   uint8   0=binary  2=utf-8 string  4=int32
      val_size    uint32  (used bytes)
      total_size  uint32  (padded bytes)
      data_offset uint32

    Key table   - null-terminated strings
    Value table - raw data at data_offset, val_size bytes
"""

from __future__ import annotations

import struct
from dataclasses import dataclass
from typing import Optional

PSF_MAGIC = 0x46535000
TYPE_BINARY = 0
TYPE_UTF8_STRING = 2
TYPE_INT32 = 4

HEADER_SIZE = 20
ENTRY_SIZE = 16


@dataclass
class PsfData:
    title: str = ""
    disc_id: str = ""
    disc_version: str = ""
    psp_system_ver: str = ""


def parse(data: bytes) -> Optional[PsfData]:
    """Returns the parsed metadata, or None if ``data`` is not a valid PSF."""
    data = bytes(data)
    size = len(data)
    # Minimum: 20-byte header.
    if size < HEADER_SIZE:
        return None

    magic, _version, key_offset, value_offset, num_entries = struct.unpack_from("<IIIII", data, 0)
    if magic != PSF_MAGIC:
        return None

    result = PsfData()
    for i in range(num_entries):
        base = HEADER_SIZE + i * ENTRY_SIZE
        if base + ENTRY_SIZE > size:
            break

        k_off = struct.unpack_from("<H", data, base)[0]
        data_type = data[base + 3]
        val_size = struct.unpack_from("<I", data, base + 4)[0]
        data_off = struct.unpack_from("<I", data, base + 12)[0]

        # --- key ---
        key_abs = key_offset + k_off
        if key_abs >= size:
            continue
        key_end = data.find(b"\x00", key_abs)
        if key_end < 0:
            continue
        key = data[key_abs:key_end].decode("latin-1")

        # --- value (only the string type is needed for the metadata) ---
        if data_type != TYPE_UTF8_STRING:
            continue
        val_abs = value_offset + data_off
        if val_abs + val_size > size:
            continue
        # Strip the trailing null characters that PSF strings may include.
        raw = data[val_abs:val_abs + val_size].rstrip(b"\x00")
        val = raw.decode("utf-8", "replace")

        if key == "TITLE":
            result.title = val
        elif key == "DISC_ID":
            result.disc_id = val
        elif key == "DISC_VERSION":
            result.disc_version = val
        elif key == "PSP_SYSTEM_VER":
            result.psp_system_ver = val

    return result
