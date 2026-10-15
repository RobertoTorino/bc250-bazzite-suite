# SPDX-License-Identifier: AGPL-3.0-or-later
"""A Steam shortcut per registered console, for Game Mode: a non-Steam game that runs the app's direct start
(bc250-console-link --stream <the console's host id>), with artwork of its own.

The file, the shortcut's number and where its artwork goes are core's (bc250_core.steam). A picture of the app's own
in images/steam/ (portrait.png, wide.png, hero.png, logo.png) is used, with the console's name and model written over
the portrait and the wide one (owner, 13-10-2026; the banner gets the name from the logo image Steam lays over it);
one that is not there is drawn here: the app's logo, the console's name and its model, not the console maker's
images.

Steam reads and rewrites these files itself, so add_shortcut() changes them with Steam closed
(steam_settings.with_steam_closed). The other non-Steam games in the file stay as they are."""

from __future__ import annotations

from pathlib import Path

from bc250_core import steam as core_steam
from bc250_core.steam import ART, ShortcutError, appid, as_int32, read_vdf, user_folders, write_vdf  # noqa: F401

from .consoles import RegisteredConsole

LAUNCHER = "~/.local/bin/bc250-console-link"
TAG = "Console Link"
ART_FILES = {"p": "portrait.png", "": "wide.png", "_hero": "hero.png", "_logo": "logo.png"}


# --- The shortcut ----------------------------------------------------------------------------------------------

def shortcut_name(console: RegisteredConsole) -> str:
    return f"{console.nickname or console.target.console} (Console Link)"


def entry(console: RegisteredConsole, launcher: Path, icon: Path) -> dict:
    """The shortcut's fields, in the order Steam writes them."""
    return core_steam.shortcut_entry(f'"{launcher}"', shortcut_name(console), f'"{launcher.parent}/"', str(icon),
                                     f"--stream {console.key}", [TAG])


def ours(item: dict, console: RegisteredConsole) -> bool:
    """A shortcut this app made for this console (the program and the console's key), whatever its name now."""
    return (str(item.get("Exe", "")).strip('"').endswith("bc250-console-link")
            and str(item.get("LaunchOptions", "")).split() == ["--stream", console.key])


def put_shortcut(values: dict, new: dict, console: RegisteredConsole) -> dict:
    """The file's contents with the console's shortcut added, or replacing the one made before (the play time
    kept); the other shortcuts stay, numbered 0, 1, ... in their order."""
    return core_steam.put_shortcut(values, new, lambda item: ours(item, console))


def remove_shortcut(values: dict, console: RegisteredConsole) -> dict:
    return core_steam.remove_shortcut(values, lambda item: ours(item, console))


def has_shortcut(steam: Path, console: RegisteredConsole) -> bool:
    return core_steam.has_shortcut(steam, lambda item: ours(item, console))


def write_shortcut(steam: Path, console: RegisteredConsole, launcher: Path, icon: Path,
                   art: dict[str, bytes], remove: bool = False) -> int:
    """For every Steam user: the console's shortcut in shortcuts.vdf and its artwork in grid/ (or, with *remove*,
    both taken out). Steam must be closed. Returns the shortcut's appid."""
    change = core_steam.Change(entry(console, launcher, icon), lambda item: ours(item, console), art, remove)
    return core_steam.write_shortcuts(steam, [change])[0]


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
