# SPDX-License-Identifier: GPL-3.0-or-later
"""The app's settings: whether the window asks Sony's server for the latest firmware when it opens, and the last
answer, so the window shows it without the network."""

from __future__ import annotations

import json

from bc250_core.settings import SettingsStore


class ControlSettings(SettingsStore):
    DEFAULTS = {"check_at_start": True,     # ask Sony's server for the latest versions when the window opens
                "latest": "",               # JSON {target (hex): update version}: the last answer
                "checked": ""}              # when that answer came, "YYYY-MM-DD HH:MM"

    def latest(self) -> dict[int, int]:
        try:
            data = json.loads(self.get("latest") or "{}")
        except ValueError:
            return {}
        if not isinstance(data, dict):
            return {}
        versions = {}
        for key, value in data.items():
            try:
                versions[int(key, 16)] = int(value)
            except (TypeError, ValueError):
                continue
        return versions

    def set_latest(self, versions: dict[int, int], checked: str) -> None:
        self.set("latest", json.dumps({f"{target:04X}": version for target, version in sorted(versions.items())}))
        self.set("checked", checked)
