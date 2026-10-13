# SPDX-License-Identifier: AGPL-3.0-or-later
"""Steam's "Guide Button Focus Steam" (Settings > Controller > Show Advanced Settings), from the app: with it on,
Steam comes to the front when the PS button is pressed, while the press also goes to the console.

Steam keeps it per Steam user as "Controller_CheckGuideButton" ("1" on, "0" off; on when it is missing) in
userdata/<user>/config/localconfig.vdf. Steam holds its settings in memory and writes that file when it exits, so a
change while it runs would be lost: set_guide_focus() closes Steam first (steam -shutdown), changes every user's
file, and starts Steam again in the background as the desktop starts it at login (Bazzite's bazzite-steam -silent,
elsewhere steam -silent). In Game Mode Steam keeps the PS button
for its own menu whatever the setting says, and it is the session itself, so nothing is changed there."""

from __future__ import annotations

import os
import re
import shutil
import subprocess
import threading
import time
from pathlib import Path
from typing import Callable

KEY = "Controller_CheckGuideButton"
STEAM_DIRS = (                          # the native Steam (Bazzite's), its older link, the Flatpak's
    "~/.local/share/Steam",
    "~/.steam/steam",
    "~/.var/app/com.valvesoftware.Steam/.local/share/Steam",
)
SHUTDOWN_TIMEOUT = 30.0
_LINE = re.compile(rf'^(\t*)"{KEY}"(\s+)"(\d)"\s*$', re.MULTILINE)

Run = Callable[[list[str]], None]


class SteamError(Exception):
    pass


def find_steam(home: Path | None = None) -> Path | None:
    """The Steam folder with users in it, or None when Steam was never used here."""
    for folder in STEAM_DIRS:
        path = Path(folder.replace("~", str(home), 1) if home else os.path.expanduser(folder))
        if (path / "userdata").is_dir():
            return path.resolve()
    return None


def user_configs(steam: Path) -> list[Path]:
    """Every Steam user's localconfig.vdf."""
    return sorted(p for p in (steam / "userdata").glob("*/config/localconfig.vdf") if p.is_file())


def guide_focus(configs: list[Path]) -> bool | None:
    """Whether the PS button brings Steam to the front: True when it does for any Steam user (it is on when the key
    is missing), None without users."""
    if not configs:
        return None
    for config in configs:
        match = _LINE.search(config.read_text(encoding="utf-8", errors="replace"))
        if match is None or match.group(3) != "0":
            return True
    return False


def write_guide_focus(config: Path, on: bool) -> None:
    """Sets the key in one localconfig.vdf: the line replaced, or added at the end of the top block."""
    text = config.read_text(encoding="utf-8", errors="replace")
    value = "1" if on else "0"
    if _LINE.search(text):
        text = _LINE.sub(lambda m: f'{m.group(1)}"{KEY}"{m.group(2)}"{value}"', text, count=1)
    else:
        end = text.rstrip().rfind("}")
        if end < 0:
            raise SteamError(f"{config} is not a Steam configuration file.")
        text = text[:end] + f'\t"{KEY}"\t\t"{value}"\n' + text[end:]
    temporary = config.with_name(config.name + ".bc250-tmp")
    temporary.write_text(text, encoding="utf-8")
    os.chmod(temporary, config.stat().st_mode & 0o7777)
    temporary.replace(config)


def steam_running(proc: Path = Path("/proc")) -> bool:
    """Whether a Steam client process runs (its process name is steam). A finished one that its parent has not
    collected yet (a zombie, state Z) does not count: on the owner's board (13-10-2026) the app's own finished
    steam -shutdown was one, and Steam seemed not to close."""
    for folder in proc.glob("[0-9]*"):
        try:
            if (folder / "comm").read_text().strip() != "steam":
                continue
            state = (folder / "stat").read_text().rsplit(")", 1)[1].split()[0]
        except (OSError, IndexError):
            continue
        if state not in ("Z", "X"):
            return True
    return False


def game_mode() -> bool:
    """Bazzite's Game Mode: Steam's gamescope session."""
    return "gamescope" in os.environ.get("XDG_CURRENT_DESKTOP", "").lower()


def start_command() -> list[str]:
    return ["bazzite-steam" if shutil.which("bazzite-steam") else "steam", "-silent"]


def _run(command: list[str]) -> None:
    """Starts a Steam command in the background; a thread collects it when it ends, so it leaves no zombie."""
    process = subprocess.Popen(command, stdin=subprocess.DEVNULL, stdout=subprocess.DEVNULL,
                               stderr=subprocess.DEVNULL, start_new_session=True)
    threading.Thread(target=process.wait, name="steam-command", daemon=True).start()


def with_steam_closed(change: Callable[[], None], run: Run = _run, running: Callable[[], bool] = steam_running,
                      timeout: float = SHUTDOWN_TIMEOUT, sleep: Callable[[float], None] = time.sleep) -> bool:
    """Runs *change* (an edit of Steam's files) with Steam closed: closed first when it runs, and started again after.
    Returns whether Steam was restarted. Nothing is changed when Steam does not close."""
    was_running = running()
    if was_running:
        run(["steam", "-shutdown"])
        waited = 0.0
        while running():
            if waited >= timeout:
                raise SteamError(f"Steam did not close within {timeout:g} seconds; nothing was changed.")
            sleep(0.5)
            waited += 0.5
    try:
        change()
    finally:
        if was_running:
            run(start_command())
    return was_running


def set_guide_focus(on: bool, steam: Path, run: Run = _run, running: Callable[[], bool] = steam_running,
                    timeout: float = SHUTDOWN_TIMEOUT, sleep: Callable[[float], None] = time.sleep) -> bool:
    """Changes the setting for every Steam user; Steam is closed first and started again when it was running.
    Returns whether Steam was restarted."""
    if game_mode():
        raise SteamError("In Game Mode Steam keeps the PS button for its own menu; change it in Desktop Mode.")
    configs = user_configs(steam)
    if not configs:
        raise SteamError("Steam has no users on this system yet.")

    def change() -> None:
        for config in configs:
            write_guide_focus(config, on)
    return with_steam_closed(change, run, running, timeout, sleep)
