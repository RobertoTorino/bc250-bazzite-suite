# SPDX-License-Identifier: AGPL-3.0-or-later
"""A Steam shortcut per registered console, for Game Mode: a non-Steam game that runs the app's direct start
(bc250-console-link --stream <the console's host id>), with artwork of its own.

Steam keeps non-Steam games per user in userdata/<user>/config/shortcuts.vdf, a binary key-value file: a map is
0x00, its name and its entries up to 0x08; a string is 0x01, its name and its text; a number is 0x02, its name and
4 bytes, little-endian; names and texts end with a zero byte. The shortcut's appid is the one Steam gives a
non-Steam game, the CRC-32 of its program and name with the top bit set; its artwork goes into
userdata/<user>/config/grid/ under that number: <id>p.png (the library's portrait, 2:3, 600 × 900), <id>.png (the
wide one, 920 × 430), <id>_hero.png (the banner, up to 3840 × 1240) and <id>_logo.png (on the banner, transparent, up
to 1280 × 720). A picture of the app's own in images/steam/ (portrait.png, wide.png, hero.png, logo.png) is used,
with the console's name and model written over the portrait and the wide one (owner, 13-10-2026; the banner gets the
name from the logo image Steam lays over it); one that is not there is drawn here: the app's logo, the console's name
and its model, not the console maker's images.

Steam reads and rewrites these files itself, so add_shortcut() changes them with Steam closed
(steam_settings.with_steam_closed). The other non-Steam games in the file stay as they are."""

from __future__ import annotations

import os
import struct
import zlib
from pathlib import Path

from .consoles import RegisteredConsole

MAP, STRING, INT32, END = 0, 1, 2, 8
LAUNCHER = "~/.local/bin/bc250-console-link"
TAG = "BC250 Console Link"
ART = {"p": (600, 900), "": (920, 430), "_hero": (3840, 1240), "_logo": (1280, 720)}
ART_FILES = {"p": "portrait.png", "": "wide.png", "_hero": "hero.png", "_logo": "logo.png"}


class ShortcutError(Exception):
    pass


# --- The binary key-value format -------------------------------------------------------------------------------

def _cstring(data: bytes, at: int) -> tuple[str, int]:
    end = data.index(b"\0", at)
    return data[at:end].decode("utf-8", errors="replace"), end + 1


def _read_map(data: bytes, at: int) -> tuple[dict, int]:
    result: dict = {}
    while True:
        kind = data[at]
        at += 1
        if kind == END:
            return result, at
        name, at = _cstring(data, at)
        if kind == MAP:
            result[name], at = _read_map(data, at)
        elif kind == STRING:
            result[name], at = _cstring(data, at)
        elif kind == INT32:
            result[name] = struct.unpack_from("<i", data, at)[0]
            at += 4
        else:
            raise ShortcutError(f"shortcuts.vdf: an entry of an unknown kind ({kind}).")


def read_vdf(data: bytes) -> dict:
    """The file as nested dicts: maps, texts (str) and numbers (int)."""
    if not data:
        return {}
    try:
        result, _at = _read_map(data, 0)
    except (IndexError, ValueError, struct.error) as error:
        raise ShortcutError("shortcuts.vdf is damaged.") from error
    return result


def _write_map(values: dict) -> bytes:
    out = bytearray()
    for name, value in values.items():
        key = name.encode("utf-8") + b"\0"
        if isinstance(value, dict):
            out += bytes([MAP]) + key + _write_map(value)
        elif isinstance(value, bool) or isinstance(value, int):
            out += bytes([INT32]) + key + struct.pack("<i", int(value))
        else:
            out += bytes([STRING]) + key + str(value).encode("utf-8") + b"\0"
    return bytes(out + bytes([END]))


def write_vdf(values: dict) -> bytes:
    return _write_map(values)


# --- The shortcut ----------------------------------------------------------------------------------------------

def appid(exe: str, name: str) -> int:
    """Steam's number for a non-Steam game (unsigned): the CRC-32 of its program and name, top bit set."""
    return zlib.crc32((exe + name).encode("utf-8")) | 0x80000000


def as_int32(value: int) -> int:
    return value - (1 << 32) if value >= 1 << 31 else value


def shortcut_name(console: RegisteredConsole) -> str:
    return f"{console.nickname or console.target.console} (Console Link)"


def entry(console: RegisteredConsole, launcher: Path, icon: Path) -> dict:
    """The shortcut's fields, in the order Steam writes them."""
    exe, name = f'"{launcher}"', shortcut_name(console)
    return {
        "appid": as_int32(appid(exe, name)),
        "AppName": name,
        "Exe": exe,
        "StartDir": f'"{launcher.parent}/"',
        "icon": str(icon),
        "ShortcutPath": "",
        "LaunchOptions": f"--stream {console.key}",
        "IsHidden": 0,
        "AllowDesktopConfig": 1,
        "AllowOverlay": 1,
        "OpenVR": 0,
        "Devkit": 0,
        "DevkitGameID": "",
        "DevkitOverrideAppID": 0,
        "LastPlayTime": 0,
        "FlatpakAppID": "",
        "tags": {"0": TAG},
    }


def ours(item: dict, console: RegisteredConsole) -> bool:
    """A shortcut this app made for this console (the program and the console's key), whatever its name now."""
    return (str(item.get("Exe", "")).strip('"').endswith("bc250-console-link")
            and str(item.get("LaunchOptions", "")).split() == ["--stream", console.key])


def put_shortcut(values: dict, new: dict, console: RegisteredConsole) -> dict:
    """The file's contents with the console's shortcut added, or replacing the one made before (the play time
    kept); the other shortcuts stay, numbered 0, 1, ... in their order."""
    shortcuts = list(values.get("shortcuts", {}).values())
    for n, item in enumerate(shortcuts):
        if ours(item, console):
            shortcuts[n] = {**new, "LastPlayTime": item.get("LastPlayTime", 0)}
            break
    else:
        shortcuts.append(new)
    return {**values, "shortcuts": {str(n): item for n, item in enumerate(shortcuts)}}


def remove_shortcut(values: dict, console: RegisteredConsole) -> dict:
    shortcuts = [item for item in values.get("shortcuts", {}).values() if not ours(item, console)]
    return {**values, "shortcuts": {str(n): item for n, item in enumerate(shortcuts)}}


def has_shortcut(steam: Path, console: RegisteredConsole) -> bool:
    for config in user_folders(steam):
        path = config / "shortcuts.vdf"
        try:
            values = read_vdf(path.read_bytes()) if path.is_file() else {}
        except (OSError, ShortcutError):
            continue
        if any(ours(item, console) for item in values.get("shortcuts", {}).values()):
            return True
    return False


def user_folders(steam: Path) -> list[Path]:
    """userdata/<user>/config of every Steam user."""
    return sorted(p for p in (steam / "userdata").glob("*/config") if p.is_dir())


def _write(path: Path, data: bytes) -> None:
    temporary = path.with_name(path.name + ".bc250-tmp")
    temporary.write_bytes(data)
    if path.exists():
        os.chmod(temporary, path.stat().st_mode & 0o7777)
    temporary.replace(path)


def write_shortcut(steam: Path, console: RegisteredConsole, launcher: Path, icon: Path,
                   art: dict[str, bytes], remove: bool = False) -> int:
    """For every Steam user: the console's shortcut in shortcuts.vdf and its artwork in grid/ (or, with *remove*,
    both taken out). Steam must be closed. Returns the shortcut's appid."""
    new = entry(console, launcher, icon)
    number = new["appid"] & 0xFFFFFFFF
    folders = user_folders(steam)
    if not folders:
        raise ShortcutError("Steam has no users on this system yet.")
    for config in folders:
        path = config / "shortcuts.vdf"
        values = read_vdf(path.read_bytes()) if path.is_file() else {}
        values = remove_shortcut(values, console) if remove else put_shortcut(values, new, console)
        _write(path, write_vdf(values))
        grid = config / "grid"
        for suffix in ART:
            image = grid / f"{number}{suffix}.png"
            if remove:
                image.unlink(missing_ok=True)
            elif suffix in art:
                grid.mkdir(exist_ok=True)
                _write(image, art[suffix])
    return number


# --- The artwork -----------------------------------------------------------------------------------------------

def draw_art(console: RegisteredConsole, logo: Path, pictures: Path | None = None) -> dict[str, bytes]:
    """The four images as PNG bytes: the app's own picture from *pictures* (images/steam) where it has one, else
    drawn: a dark blue background with the app's logo, the console's name and model (the logo image only the name,
    on a transparent background, for the banner)."""
    from PyQt6.QtCore import QRectF, Qt
    from PyQt6.QtGui import QColor, QFont, QImage, QLinearGradient, QPainter

    name, model = console.nickname or console.target.console, console.target.console
    source = QImage(str(logo))
    images = {}
    for suffix, (width, height) in ART.items():
        own = pictures / ART_FILES[suffix] if pictures else None
        if own is not None and own.is_file():
            picture = QImage(str(own))
            if suffix in ("p", "") and not picture.isNull():
                picture = picture.convertToFormat(QImage.Format.Format_ARGB32)
                painter = QPainter(picture)
                _name_band(painter, picture.width(), picture.height(), name, model)
                painter.end()
                images[suffix] = _png(picture)
            else:
                images[suffix] = own.read_bytes()
            continue
        image = QImage(width, height, QImage.Format.Format_ARGB32)
        image.fill(QColor(0, 0, 0, 0))
        painter = QPainter(image)
        painter.setRenderHint(QPainter.RenderHint.Antialiasing)
        painter.setRenderHint(QPainter.RenderHint.SmoothPixmapTransform)
        if suffix != "_logo":
            gradient = QLinearGradient(0, 0, 0, height)
            gradient.setColorAt(0, QColor("#0b1d3a"))
            gradient.setColorAt(1, QColor("#030810"))
            painter.fillRect(0, 0, width, height, gradient)
        font = QFont()
        font.setBold(True)
        if suffix == "_logo":
            font.setPixelSize(height // 3)
            painter.setFont(font)
            painter.setPen(QColor("#ffffff"))
            painter.drawText(QRectF(0, 0, width, height), Qt.AlignmentFlag.AlignCenter, name)
        else:
            if suffix == "_hero":                       # Steam lays the logo image over it: no text here
                side = height * 0.6
                if not source.isNull():
                    painter.setOpacity(0.35)
                    painter.drawImage(QRectF(width - side - height * 0.2, (height - side) / 2, side, side), source)
                painter.end()
                images[suffix] = _png(image)
                continue
            side = min(width, height) * (0.45 if suffix == "p" else 0.5)
            top = height * (0.18 if suffix == "p" else 0.12)
            if not source.isNull():
                painter.drawImage(QRectF((width - side) / 2, top, side, side), source)
            text_top = top + side + height * 0.04
            font.setPixelSize(int(min(width, height) * 0.09))
            painter.setFont(font)
            painter.setPen(QColor("#ffffff"))
            painter.drawText(QRectF(0, text_top, width, height * 0.14), Qt.AlignmentFlag.AlignCenter, name)
            font.setBold(False)
            font.setPixelSize(int(min(width, height) * 0.05))
            painter.setFont(font)
            painter.setPen(QColor("#9fb4d6"))
            painter.drawText(QRectF(0, text_top + height * 0.13, width, height * 0.08), Qt.AlignmentFlag.AlignCenter,
                             f"{model} · Remote Play")
        painter.end()
        images[suffix] = _png(image)
    return images


def _name_band(painter, width: int, height: int, name: str, model: str) -> None:
    """The console's name and model at the bottom of a picture, on a dark band so any picture keeps them readable."""
    from PyQt6.QtCore import QRectF, Qt
    from PyQt6.QtGui import QColor, QFont
    painter.setRenderHint(painter.RenderHint.Antialiasing)
    band = height * (0.2 if height > width else 0.3)
    painter.fillRect(QRectF(0, height - band, width, band), QColor(0, 0, 0, 150))
    font = QFont()
    font.setBold(True)
    font.setPixelSize(int(min(width, height) * 0.09))
    painter.setFont(font)
    painter.setPen(QColor("#ffffff"))
    painter.drawText(QRectF(0, height - band, width, band * 0.6), Qt.AlignmentFlag.AlignCenter, name)
    font.setBold(False)
    font.setPixelSize(int(min(width, height) * 0.05))
    painter.setFont(font)
    painter.setPen(QColor("#c7d4ea"))
    painter.drawText(QRectF(0, height - band * 0.45, width, band * 0.35), Qt.AlignmentFlag.AlignCenter,
                     f"{model} · Remote Play")


def _png(image) -> bytes:
    from PyQt6.QtCore import QBuffer, QByteArray, QIODevice
    data = QByteArray()
    buffer = QBuffer(data)
    buffer.open(QIODevice.OpenModeFlag.WriteOnly)
    image.save(buffer, "PNG")
    return bytes(data)
