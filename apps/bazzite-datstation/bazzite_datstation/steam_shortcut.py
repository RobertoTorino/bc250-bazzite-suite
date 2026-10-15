# SPDX-License-Identifier: GPL-3.0-or-later
"""The app as a non-Steam game, for Game Mode: a shortcut that runs the launcher install.sh wrote
(~/.local/bin/bazzite-datstation), with artwork drawn from the app's logo. The file and its format are core's
(bc250_core.steam); the pattern is the shadPS4 Manager's."""

from __future__ import annotations

from collections.abc import Callable
from pathlib import Path

from bc250_core import steam
from bc250_core.platform import bin_home

from . import APP_ID, APP_NAME

TAGS = ("PlayStation", APP_NAME)
BACKGROUND_TOP, BACKGROUND_BOTTOM = "#0b2a6b", "#02102a"


class NotInstalled(Exception):
    """The launcher is missing: the app runs from a checkout and install.sh was not run."""


def launcher_path() -> Path:
    return bin_home() / APP_ID


def ours(item: dict) -> bool:
    """Any shortcut this app made: it runs the launcher (named after the app, wherever it is)."""
    exe = str(item.get("Exe", "")).strip('"').replace("\\", "/")
    return exe.rsplit("/", 1)[-1] == APP_ID


def entry(launcher: Path, logo: Path) -> dict:
    return steam.shortcut_entry(f'"{launcher}"', APP_NAME, f'"{launcher.parent}/"', str(logo), "", TAGS)


def in_steam(folder: Path) -> bool:
    return steam.has_shortcut(folder, ours)


def changes(launcher: Path, logo: Path, remove: bool = False, art: bool = True) -> list[steam.Change]:
    """The change for core's write_shortcuts: the shortcut added (or brought up to date), or taken out."""
    if remove:
        return [steam.Change(entry(launcher, logo), ours, remove=True)]
    return [steam.Change(entry(launcher, logo), ours, draw_art(logo) if art else {})]


def _apply(remove: bool, launcher: Path | None, logo: Path, steam_dir: Path | None,
           closed: Callable[[Callable[[], None]], bool], art: bool) -> bool:
    launcher = launcher or launcher_path()
    if not launcher.is_file():
        raise NotInstalled(f"The launcher {launcher} does not exist: run install.sh first, so Steam has a program "
                           "to start.")
    folder = steam_dir or steam.find_steam()
    if folder is None:
        raise steam.SteamError("Steam was not found on this system (no userdata folder).")
    return closed(lambda: steam.write_shortcuts(folder, changes(launcher, logo, remove=remove, art=art)))


def add(logo: Path, launcher: Path | None = None, steam_dir: Path | None = None,
        closed: Callable[[Callable[[], None]], bool] = steam.with_steam_closed, art: bool = True) -> bool:
    """Add the shortcut for every Steam user, Steam closed meanwhile; returns whether Steam was restarted.
    Raises NotInstalled, steam.SteamError or steam.ShortcutError with the reason."""
    return _apply(False, launcher, logo, steam_dir, closed, art)


def remove(logo: Path, launcher: Path | None = None, steam_dir: Path | None = None,
           closed: Callable[[Callable[[], None]], bool] = steam.with_steam_closed) -> bool:
    return _apply(True, launcher, logo, steam_dir, closed, False)


# --- The artwork -----------------------------------------------------------------------------------------------

def draw_art(logo: Path) -> dict[str, bytes]:
    """The portrait, the wide picture and the banner as PNG bytes: the logo on a PlayStation blue gradient, the
    name under it on the portrait; the logo file itself as the logo on the banner."""
    from PyQt6.QtCore import QRectF, Qt
    from PyQt6.QtGui import QColor, QFont, QImage, QLinearGradient, QPainter

    icon = QImage(str(logo))
    images = {}
    for suffix in ("p", "", "_hero"):
        width, height = steam.ART[suffix]
        image = QImage(width, height, QImage.Format.Format_ARGB32)
        painter = QPainter(image)
        painter.setRenderHint(QPainter.RenderHint.Antialiasing)
        painter.setRenderHint(QPainter.RenderHint.SmoothPixmapTransform)
        gradient = QLinearGradient(0, 0, 0, height)
        gradient.setColorAt(0, QColor(BACKGROUND_TOP))
        gradient.setColorAt(1, QColor(BACKGROUND_BOTTOM))
        painter.fillRect(0, 0, width, height, gradient)
        if suffix != "_hero" and not icon.isNull():
            side = min(width, height) * (0.7 if suffix == "p" else 0.62)
            top = height * 0.12 if suffix == "p" else (height - side) / 2
            painter.drawImage(QRectF((width - side) / 2, top, side, side), icon)
        if suffix == "p":
            font = QFont()
            font.setBold(True)
            font.setPixelSize(int(width * 0.08))
            painter.setFont(font)
            painter.setPen(QColor("#ffffff"))
            painter.drawText(QRectF(width * 0.05, height * 0.74, width * 0.9, height * 0.2),
                             Qt.AlignmentFlag.AlignCenter | Qt.TextFlag.TextWordWrap, APP_NAME)
        painter.end()
        images[suffix] = _png(image)
    if logo.is_file() and not icon.isNull():
        images["_logo"] = logo.read_bytes()
    return images


def _png(image) -> bytes:
    from PyQt6.QtCore import QBuffer, QByteArray, QIODevice
    data = QByteArray()
    buffer = QBuffer(data)
    buffer.open(QIODevice.OpenModeFlag.WriteOnly)
    image.save(buffer, "PNG")
    return bytes(data)
