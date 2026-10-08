# SPDX-License-Identifier: GPL-3.0-or-later
"""apps.toml: the apps of this portal release, each pinned to one release tag (see the comment in apps.toml)."""

from __future__ import annotations

import re
import tomllib
from dataclasses import dataclass
from pathlib import Path

_TAG = re.compile(r"^(?P<app>[a-z0-9-]+)-v(?P<version>\d+\.\d+\.\d+)$")
_SHA256 = re.compile(r"^([0-9a-f]{64})?$")


class ManifestError(ValueError):
    pass


@dataclass(frozen=True)
class AppEntry:
    key: str                                    # "cu-bisect": folder under apps/, tag prefix
    name: str
    summary: str
    tag: str
    sha256: str = ""
    required: bool = False
    changes_board: bool = False
    install: tuple[str, ...] = ()
    uninstall: tuple[str, ...] = ()
    detect: tuple[str, ...] = ()
    launch: tuple[tuple[str, str], ...] = ()

    @property
    def version(self) -> str:
        return self.tag.rsplit("-v", 1)[1]

    @property
    def asset(self) -> str:
        """The release asset: <tag>.tar.gz, which unpacks into a folder named <tag>."""
        return f"{self.tag}.tar.gz"


def version_tuple(version: str) -> tuple[int, int, int]:
    major, minor, patch = (int(p) for p in version.split("."))
    return major, minor, patch


def _strings(key: str, field: str, value: object) -> tuple[str, ...]:
    if not isinstance(value, list) or not all(isinstance(v, str) and v.strip() for v in value):
        raise ManifestError(f"[apps.{key}] {field} must be a list of non-empty strings")
    return tuple(value)


def _entry(key: str, raw: dict) -> AppEntry:
    for field in ("name", "summary", "tag"):
        if not isinstance(raw.get(field), str) or not raw[field].strip():
            raise ManifestError(f"[apps.{key}] needs a non-empty {field}")
    match = _TAG.match(raw["tag"])
    if not match or match["app"] != key:
        raise ManifestError(f"[apps.{key}] tag {raw['tag']!r} is not {key}-v<x.y.z>")
    sha = str(raw.get("sha256", "")).lower()
    if not _SHA256.match(sha):
        raise ManifestError(f"[apps.{key}] sha256 must be empty or 64 hex digits")
    launch = raw.get("launch", [])
    if not isinstance(launch, list) or not all(isinstance(item, list) and len(item) == 2 and
                                               all(isinstance(s, str) and s for s in item) for item in launch):
        raise ManifestError(f"[apps.{key}] launch must be a list of [label, command] pairs")
    entry = AppEntry(key=key, name=raw["name"], summary=raw["summary"], tag=raw["tag"], sha256=sha,
                     required=bool(raw.get("required", False)), changes_board=bool(raw.get("changes_board", False)),
                     install=_strings(key, "install", raw.get("install")),
                     uninstall=_strings(key, "uninstall", raw.get("uninstall")),
                     detect=_strings(key, "detect", raw.get("detect")),
                     launch=tuple((label, command) for label, command in launch))
    if not entry.install or not entry.uninstall or not entry.detect:
        raise ManifestError(f"[apps.{key}] install, uninstall and detect must not be empty")
    return entry


def parse(text: str) -> list[AppEntry]:
    """The apps in display order: the required one(s) first, the rest in file order."""
    try:
        data = tomllib.loads(text)
    except tomllib.TOMLDecodeError as exc:
        raise ManifestError(f"apps.toml is not valid TOML: {exc}") from exc
    apps = data.get("apps")
    if not isinstance(apps, dict) or not apps:
        raise ManifestError("apps.toml has no [apps.<name>] tables")
    entries = [_entry(key, raw) for key, raw in apps.items()]
    if not any(e.required for e in entries):
        raise ManifestError("apps.toml must have a required app (bazzite-test)")
    return sorted(entries, key=lambda e: not e.required)        # stable: file order within each group


def load(path: Path) -> list[AppEntry]:
    return parse(path.read_text(encoding="utf-8"))
