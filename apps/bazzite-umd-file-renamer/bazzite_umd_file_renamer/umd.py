# SPDX-License-Identifier: GPL-3.0-or-later
"""One PSP ISO image and what PARAM.SFO says about it. Port of ``qt/src/umd.h``."""

from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path


@dataclass
class Umd:
    id: str = ""                  # DISC_ID, e.g. ULJM05437
    title: str = ""               # TITLE
    translated_title: str = ""    # typed by the user; used in the new name when not empty
    version: str = ""             # DISC_VERSION, e.g. 1.01
    firmware: str = ""            # PSP_SYSTEM_VER, first four characters
    icon0: bytes = b""            # raw PNG bytes; empty if not found
    pic0: bytes = b""             # raw PNG bytes; empty if not found
    pic1: bytes = b""             # raw PNG bytes; empty if not found
    file_path: str = ""           # absolute path to the .iso file

    @property
    def file_name(self) -> str:
        return Path(self.file_path).name

    @property
    def dir(self) -> str:
        return str(Path(self.file_path).parent)

    @property
    def suffix(self) -> str:
        """The extension with its dot (".iso"), or "" when the file has none."""
        return Path(self.file_path).suffix
