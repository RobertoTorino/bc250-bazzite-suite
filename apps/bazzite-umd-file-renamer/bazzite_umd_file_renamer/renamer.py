# SPDX-License-Identifier: GPL-3.0-or-later
"""Core application logic: read, format and rename PSP ISO files. Port of ``qt/src/renamerlogic.cpp``."""

from __future__ import annotations

import os
from enum import Enum
from pathlib import Path
from typing import Optional, Union

from . import psf
from .iso import IsoReader
from .umd import Umd


class NamingTemplate(Enum):
    """The order is the order of the Naming box in the window (and the number saved in the settings)."""
    ID_TITLE = "ID - Title"
    ID_TITLE_SPACE = "ID Title"
    ID_TITLE_VERSION = "ID - Title - Version"
    TITLE_ID = "Title - ID"
    TITLE_ID_SPACE = "Title Id"
    TITLE_ONLY = "Title only"
    TITLE_BRACKET_ID = "Title [ID]"
    TITLE_BRACKET_ID_VERSION = "Title [ID] [Version]"

    @classmethod
    def from_index(cls, index: int) -> "NamingTemplate":
        templates = list(cls)
        return templates[index] if 0 <= index < len(templates) else cls.ID_TITLE

    @property
    def index(self) -> int:
        return list(type(self)).index(self)


# Characters illegal in common filesystems, and the trademark symbol (U+2122).
INVALID_CHARS = "\\/:*?\"<>|™"


def read_umd(file_path: Union[str, Path]) -> Optional[Umd]:
    """Open a single .iso, parse PSP_GAME/PARAM.SFO and the common image resources (ICON0.PNG, PIC0.PNG,
    PIC1.PNG). Returns None if the file cannot be read or is not a PSP ISO."""
    with IsoReader(file_path) as iso:
        if not iso.open():
            return None
        sfo_data = iso.read_file("PSP_GAME/PARAM.SFO")
        if not sfo_data:
            return None
        # The game images; a missing one is not an error.
        icon0 = iso.read_file("PSP_GAME/ICON0.PNG")
        pic0 = iso.read_file("PSP_GAME/PIC0.PNG")
        pic1 = iso.read_file("PSP_GAME/PIC1.PNG")

    data = psf.parse(sfo_data)
    if data is None:
        return None

    return Umd(id=data.disc_id, title=data.title, version=data.disc_version,
               firmware=data.psp_system_ver[:4], icon0=icon0, pic0=pic0, pic1=pic1,
               file_path=str(Path(file_path).resolve()))


def scan_directory(dir_path: Union[str, Path]) -> list[Umd]:
    """Every *.iso in ``dir_path`` (not its subfolders) that parses as a PSP image, in name order."""
    result: list[Umd] = []
    try:
        entries = sorted(os.scandir(dir_path), key=lambda e: e.name.lower())
    except OSError:
        return result
    for entry in entries:
        if entry.is_file() and entry.name.lower().endswith(".iso"):
            umd = read_umd(entry.path)
            if umd is not None:
                result.append(umd)
    return result


def effective_title(umd: Umd) -> str:
    """The translation when one was typed, else the title from PARAM.SFO."""
    translated = umd.translated_title.strip()
    return translated or umd.title


def formatted_name(umd: Umd, template: NamingTemplate = NamingTemplate.ID_TITLE) -> str:
    """The target base filename (no extension) for ``umd``: "ULJM05437 - Ever17", "ULJM05437 Ever17",
    "ULJM05437 - Ever17 - v1.01", "Ever17 - ULJM05437", "Ever17 ULJM05437", "Ever17", "Ever17 [ULJM05437]" or
    "Ever17 [ULJM05437] [v1.01]". Characters illegal in Windows/Linux filenames are removed."""
    title = effective_title(umd)
    version = umd.version if umd.version[:1].lower() == "v" else "v" + umd.version

    if template is NamingTemplate.ID_TITLE:
        name = f"{umd.id} - {title}"
    elif template is NamingTemplate.ID_TITLE_SPACE:
        name = f"{umd.id} {title}"
    elif template is NamingTemplate.ID_TITLE_VERSION:
        name = f"{umd.id} - {title} - {version}"
    elif template is NamingTemplate.TITLE_ID:
        name = f"{title} - {umd.id}"
    elif template is NamingTemplate.TITLE_ID_SPACE:
        name = f"{title} {umd.id}"
    elif template is NamingTemplate.TITLE_ONLY:
        name = title
    elif template is NamingTemplate.TITLE_BRACKET_ID:
        name = f"{title} [{umd.id}]"
    else:
        name = f"{title} [{umd.id}] [{version}]"

    return "".join(c for c in name if c not in INVALID_CHARS)


def rename_file(umd: Umd, new_base_name: str) -> bool:
    """Rename the file behind ``umd`` to ``new_base_name`` plus the file's own extension, in its folder. Updates
    ``umd.file_path`` on success. A file that already has that name is left alone and counts as success (the
    C++ tool reported it as a failure); another file with the target name is never overwritten."""
    source = Path(umd.file_path)
    target = source.with_name(new_base_name + source.suffix)
    if target == source:
        return True
    if target.exists():
        return False
    try:
        source.rename(target)
    except OSError:
        return False
    umd.file_path = str(target)
    return True
