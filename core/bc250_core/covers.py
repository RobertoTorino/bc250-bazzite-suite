# SPDX-License-Identifier: GPL-3.0-or-later
"""Artwork from SteamGridDB for the games the managers put in Steam (owner, 22-10-2026), with one API key of the
user's own for the whole suite, kept in ~/.config/bc250-bazzite-suite/steamgriddb-key (only the user may read it).

A manager asks for the images steam.ART names that it lacks: the portrait alone when the game brings pictures of its
own (PORTRAIT), all four when the app draws them from its icon (ALL). SteamGridDB knows games by name only, so a game
is looked up by its title, without ™, ® and the tags of a file name ("(USA)", "[!]", "(Disc 1)"): the game whose
name is that title (in any case), else the first one found. Of each kind the still picture with the highest score is
taken, leaving out those marked nsfw, humor or epilepsy: a portrait of 600 × 900, a wide picture of 920 × 430 (or
460 × 215), a banner of 3840 × 1240 (or 1920 × 620) and a logo.

What is found is kept in the app's covers folder, named as Steam names its own (<name>p.png, <name>.png,
<name>_hero.png, <name>_logo.png, with the picture's own extension), and <name>.done says the game was looked up, so
it is not asked for again and the next change to Steam takes the same pictures, also offline. A picture the user puts
there in place of one is taken the same way. Without a key nothing is asked; the pictures kept are used all the same.
The key goes only to SteamGridDB's API, never to the server the picture comes from, and is never in a message."""

from __future__ import annotations

import hashlib
import json
import os
import re
import urllib.error
import urllib.parse
import urllib.request
from collections.abc import Callable, Iterable, Sequence
from pathlib import Path

from .platform import config_home, data_home
from .steam import ART

API = "https://www.steamgriddb.com/api/v2"
KEY_PAGE = "https://www.steamgriddb.com/profile/preferences/api"
PORTRAIT = ("p",)
ALL = ("p", "", "_hero", "_logo")
KINDS = {                               # steam.ART's suffix: SteamGridDB's endpoint and the sizes taken
    "p": ("grids", "600x900"),
    "": ("grids", "920x430,460x215"),
    "_hero": ("heroes", "3840x1240,1920x620"),
    "_logo": ("logos", ""),
}
SUFFIXES = {"image/png": ".png", "image/jpeg": ".jpg", "image/webp": ".webp"}
TIMEOUT = 20
_MARKS = re.compile(r"[™®©]")
_TAGS = re.compile(r"\s*[\(\[][^\)\]]*[\)\]]")

Get = Callable[[str, dict[str, str]], bytes]            # url, headers: the body


class CoverError(Exception):
    """SteamGridDB could not be asked: no lookup is worth trying after it (a refused key, no network)."""


# --- The key ----------------------------------------------------------------------------------------------------

def key_file() -> Path:
    return config_home() / "bc250-bazzite-suite" / "steamgriddb-key"


def read_key(path: Path | None = None) -> str:
    """The suite's SteamGridDB API key; "" without one."""
    try:
        return (path or key_file()).read_text(encoding="utf-8").strip()
    except (OSError, UnicodeDecodeError):
        return ""


def write_key(key: str, path: Path | None = None) -> None:
    """Keeps *key* for every app of the suite, readable by the user alone; "" takes it away."""
    path = path or key_file()
    key = key.strip()
    if not key:
        path.unlink(missing_ok=True)
        return
    path.parent.mkdir(parents=True, exist_ok=True)
    part = path.with_name(path.name + ".part")
    part.unlink(missing_ok=True)
    with os.fdopen(os.open(part, os.O_WRONLY | os.O_CREAT | os.O_EXCL, 0o600), "w", encoding="utf-8") as out:
        out.write(key + "\n")
    part.replace(path)


def edit_key(parent=None, path: Path | None = None, button: str = "Update Game Mode") -> bool:
    """Asks for the key in a dialog; True when it was changed. *button*: the app's name for the button that puts
    the games in Steam, as the text names it (PCSX2 Manager's is Update Steam; owner, 24-10-2026)."""
    from PyQt6.QtWidgets import QInputDialog, QLabel, QLineEdit
    dialog = QInputDialog(parent)
    dialog.setWindowTitle("Covers")
    dialog.setLabelText(
        "Steam's library shows each game with a cover, its page with a banner. Where a game brings no pictures in "
        f"Steam's shapes, the app draws them. With a SteamGridDB API key, {button} looks each game up on "
        "SteamGridDB by its title and takes the pictures with the most votes instead.\n\n"
        "The key is free with a SteamGridDB account: in your account click Preferences, then the API tab at the "
        f"top, then Generate API Key, and copy the key ({KEY_PAGE}).\n"
        "It is one key for every app of the suite. Leave it empty to look nothing up.")
    # The text wrapped at a readable width, which also sets the field's width; as one line it made the dialog as
    # wide as the screen (owner, 24-10-2026). QInputDialog makes its label when the text is set.
    label = dialog.findChild(QLabel)
    if label is not None:
        label.setWordWrap(True)
        label.setMinimumWidth(460)
    dialog.setTextEchoMode(QLineEdit.EchoMode.Password)
    old = read_key(path)
    dialog.setTextValue(old)
    if not dialog.exec() or dialog.textValue().strip() == old:
        return False
    write_key(dialog.textValue(), path)
    return True


# --- The pictures kept ------------------------------------------------------------------------------------------

def covers_home(app_id: str) -> Path:
    return data_home() / app_id / "covers"


def name(title: str, ident: str = "") -> str:
    """The name a game's pictures are kept under: its ID (a title ID, a serial), or its title's hash without one."""
    ident = re.sub(r"[^A-Za-z0-9_-]", "", ident)
    return ident or "title-" + hashlib.sha256(title.encode()).hexdigest()[:16]


def picture(home: Path, game: str, kind: str) -> Path | None:
    """The picture of *kind* (steam.ART's suffix) kept for the game named *game*, if there is one."""
    for suffix in SUFFIXES.values():
        path = home / f"{game}{kind}{suffix}"
        if path.is_file():
            return path
    return None


def known(home: Path, game: str) -> bool:
    """Whether SteamGridDB was asked for the game named *game* before."""
    return (home / f"{game}.done").is_file()


def art(home: Path, game: str, kinds: Sequence[str]) -> dict[str, bytes]:
    """The pictures of *kinds* kept for the game, as PNG bytes for Steam: the portrait, the wide picture and the
    banner filling steam.ART's size (cut to its shape from the middle), the logo as it is. One that does not load
    is left out, so the app's own drawing stays."""
    from PyQt6.QtCore import QRectF
    from PyQt6.QtGui import QImage, QPainter
    images = {}
    for kind in kinds:
        path = picture(home, game, kind)
        source = QImage(str(path)) if path is not None else QImage()
        if source.isNull():
            continue
        if kind == "_logo":
            images[kind] = _png(source)
            continue
        width, height = ART[kind]
        image = QImage(width, height, QImage.Format.Format_ARGB32)
        painter = QPainter(image)
        painter.setRenderHint(QPainter.RenderHint.SmoothPixmapTransform)
        scale = max(width / source.width(), height / source.height())
        w, h = width / scale, height / scale
        painter.drawImage(QRectF(0, 0, width, height), source,
                          QRectF((source.width() - w) / 2, (source.height() - h) / 2, w, h))
        painter.end()
        images[kind] = _png(image)
    return images


def _png(image) -> bytes:
    from PyQt6.QtCore import QBuffer, QByteArray, QIODevice
    data = QByteArray()
    buffer = QBuffer(data)
    buffer.open(QIODevice.OpenModeFlag.WriteOnly)
    image.save(buffer, "PNG")
    return bytes(data)


# --- SteamGridDB ------------------------------------------------------------------------------------------------

def _get(url: str, headers: dict[str, str]) -> bytes:
    request = urllib.request.Request(url, headers={"User-Agent": "bc250-bazzite-suite", **headers})
    with urllib.request.urlopen(request, timeout=TIMEOUT) as response:
        return response.read()


def search_title(title: str) -> str:
    """The title to look up: without ™, ® and © and the tags of a file name in brackets."""
    return " ".join(_TAGS.sub("", _MARKS.sub("", title)).split()) or title.strip()


def _plain(title: str) -> str:
    return search_title(title).casefold()


def _api(path: str, key: str, get: Get) -> list[dict]:
    """The data of an API answer; [] when SteamGridDB has nothing (404). CoverError when the key is refused or
    SteamGridDB cannot be reached."""
    try:
        answer = json.loads(get(f"{API}/{path}", {"Authorization": f"Bearer {key}"}))
    except urllib.error.HTTPError as error:
        if error.code == 404:
            return []
        if error.code in (401, 403):
            raise CoverError("SteamGridDB refused the API key: check it under Covers…") from error
        raise CoverError(f"SteamGridDB answered {error.code}.") from error
    except (urllib.error.URLError, OSError, ValueError) as error:
        reason = str(getattr(error, "reason", error))
        raise CoverError(f"SteamGridDB could not be reached: {reason}.") from error
    data = answer.get("data") if isinstance(answer, dict) and answer.get("success") else None
    return [item for item in data if isinstance(item, dict)] if isinstance(data, list) else []


def find_game(title: str, key: str, get: Get = _get) -> int | None:
    """SteamGridDB's number for the game called *title*: the exact name, else the first found; None without one."""
    found = _api(f"search/autocomplete/{urllib.parse.quote(search_title(title), safe='')}", key, get)
    exact = [item for item in found if _plain(str(item.get("name", ""))) == _plain(title)]
    best = (exact or found or [None])[0]
    return int(best["id"]) if best and isinstance(best.get("id"), int) else None


def best(number: int, kind: str, key: str, get: Get = _get) -> dict | None:
    """The still picture of *kind* (steam.ART's suffix) with the highest score, of a kind kept here; None
    without one."""
    endpoint, dimensions = KINDS[kind]
    fields = {"types": "static", "nsfw": "false", "humor": "false", "epilepsy": "false"}
    if dimensions:
        fields = {"dimensions": dimensions, **fields}
    found = [g for g in _api(f"{endpoint}/game/{number}?{urllib.parse.urlencode(fields)}", key, get)
             if g.get("mime") in SUFFIXES and str(g.get("url", "")).startswith("https://")
             and not any(g.get(mark) for mark in ("nsfw", "humor", "epilepsy"))]
    return max(found, key=lambda g: g.get("score") or 0, default=None)


def fetch(games: Iterable[tuple[str, str]], kinds: Sequence[str], key: str, home: Path,
          get: Get = _get) -> list[str]:
    """Looks up the games (*name*, *title*) not asked for before and keeps the pictures of *kinds* found. Returns
    what to tell the user; stops at the first CoverError (the key refused, no network), as the other games would
    fail the same way. A game whose picture did not download is asked for again the next time."""
    notes: list[str] = []
    asked = found = 0
    for game, title in games:
        if known(home, game):
            continue
        try:
            number = find_game(title, key, get)
            home.mkdir(parents=True, exist_ok=True)
            whole, got = True, False
            for kind in kinds:
                if number is None or picture(home, game, kind) is not None:
                    continue
                item = best(number, kind, key, get)
                if item is None:
                    continue
                try:
                    data = get(str(item["url"]), {})
                except (urllib.error.URLError, OSError) as error:
                    notes.append(f"Covers: a picture for {title} could not be downloaded: "
                                 f"{getattr(error, 'reason', error)}.")
                    whole = False
                    continue
                path = home / f"{game}{kind}{SUFFIXES[item['mime']]}"
                part = path.with_name(path.name + ".part")
                part.write_bytes(data)
                part.replace(path)
                got = True
        except CoverError as error:
            notes.append(f"Covers: {error} The drawn pictures are used for the games without them.")
            break
        asked += 1
        found += got
        if whole:
            (home / f"{game}.done").touch()
    if asked:
        notes.insert(0, f"Covers: SteamGridDB had pictures for {found} of {asked} game(s)"
                        + ("; the others keep the drawn ones." if found < asked else "."))
    return notes
