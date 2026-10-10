#!/usr/bin/env python3
# SPDX-License-Identifier: GPL-3.0-or-later
"""The file edits of a release, for tools/release_ui.py (and on their own: python3 tools/release_plan.py lists the
apps). Nothing here commits, tags or pushes; it prints the git commands for that instead.

A release has two steps, because an app's checksum only exists once GitHub has built its release:

1. Apps: the new VERSION, every copy that tools/check_versions.py checks, and a "Release x.y.z." CHANGELOG entry.
   Commit, push, tag <app>-v<x.y.z>, push the tag: release.yml builds the tarball and SHA256SUMS.
2. Portal: pin each released app in portal/apps.toml (tag and sha256, as tools/pin_app.py), bump portal/VERSION at
   least as much as tools/check_manifest.py asks, and a CHANGELOG entry listing the pins. Commit, push, tag
   portal-v<x.y.z>."""

from __future__ import annotations

import datetime
import importlib.util
import re
import subprocess
import sys
from dataclasses import dataclass
from pathlib import Path

SUITE = Path(__file__).resolve().parent.parent
_VERSION = re.compile(r"^\d+\.\d+\.\d+$")


def _load(name: str):
    spec = importlib.util.spec_from_file_location(name, Path(__file__).resolve().parent / f"{name}.py")
    module = importlib.util.module_from_spec(spec)
    sys.modules[spec.name] = module
    spec.loader.exec_module(module)
    return module


check_versions = _load("check_versions")
check_manifest = _load("check_manifest")
pin_app = _load("pin_app")


def version_tuple(version: str) -> tuple[int, int, int]:
    a, b, c = (int(x) for x in version.split("."))
    return a, b, c


def next_versions(version: str) -> dict[str, str]:
    a, b, c = version_tuple(version)
    return {"patch": f"{a}.{b}.{c + 1}", "minor": f"{a}.{b + 1}.0", "major": f"{a + 1}.0.0"}


def check_new_version(current: str, new: str, released: bool) -> str:
    """"" when *new* can be released after *current*, otherwise why not. A version that was never tagged (the
    first release, 0.1.0) can be released as it is."""
    if not _VERSION.match(new):
        return f"{new!r} is not x.y.z"
    if version_tuple(new) < version_tuple(current) or (released and new == current):
        return f"{new} is not higher than {current}" + (", which is already tagged" if released else "")
    return ""


# --- git (read-only) -------------------------------------------------------------------------------------------

def git(root: Path, *args: str) -> str | None:
    result = subprocess.run(["git", *args], cwd=root, capture_output=True, text=True)
    return result.stdout if result.returncode == 0 else None


def tags_of(root: Path, key: str) -> list[str]:
    """The release tags of one app (or the portal), oldest first."""
    found = []
    for tag in (git(root, "tag", "--list", f"{key}-v*") or "").split():
        version = tag[len(key) + 2:]
        if _VERSION.match(version):
            found.append((version_tuple(version), tag))
    return [tag for _, tag in sorted(found)]


def commits_since(root: Path, tag: str | None, path: str) -> int | None:
    out = git(root, "rev-list", "--count", f"{tag}..HEAD" if tag else "HEAD", "--", path)
    return int(out) if out and out.strip().isdigit() else None


# --- The units -------------------------------------------------------------------------------------------------

@dataclass
class Unit:
    key: str                            # "governor", "portal", "core"
    path: str                           # "apps/governor"
    version: str
    last_tag: str | None                # newest <key>-v* tag; None for core (bundled, never tagged)
    commits: int | None                 # commits touching the folder since that tag
    pinned_tag: str = ""                # apps only: what portal/apps.toml pins
    pinned_sha: str = ""

    @property
    def kind(self) -> str:
        return self.key if self.key in ("core", "portal") else "app"

    @property
    def tag(self) -> str:
        """The tag of the current VERSION."""
        return f"{self.key}-v{self.version}"

    @property
    def released(self) -> bool:
        return self.last_tag == self.tag


def load_units(root: Path = SUITE) -> list[Unit]:
    pins = {}
    try:
        for entry in check_manifest.manifest.load(root / "portal" / "apps.toml"):
            pins[entry.key] = entry
    except (OSError, check_manifest.manifest.ManifestError):
        pass
    units = []
    folders = [("core", "core"), ("portal", "portal")]
    folders += [(p.name, f"apps/{p.name}") for p in sorted((root / "apps").iterdir()) if (p / "VERSION").is_file()]
    for key, path in folders:
        version = (root / path / "VERSION").read_text(encoding="utf-8").strip()
        tags = tags_of(root, key) if key != "core" else []
        last = tags[-1] if tags else None
        unit = Unit(key, path, version, last, commits_since(root, last, path))
        if key in pins:
            unit.pinned_tag, unit.pinned_sha = pins[key].tag, pins[key].sha256
        units.append(unit)
    return units


# --- Edits -----------------------------------------------------------------------------------------------------

def set_version(root: Path, unit: Unit, new: str) -> list[Path]:
    """Writes *new* to the unit's VERSION and to every copy check_versions.py checks; returns the changed files."""
    folder = root / unit.path
    changed = [folder / "VERSION"]
    (folder / "VERSION").write_bytes(f"{new}\n".encode())
    for path in sorted(folder.rglob("*")):
        pattern = check_versions.PATTERNS.get(path.suffix)
        if pattern is None or not path.is_file() or "tests" in path.relative_to(folder).parts:
            continue
        text = path.read_text(encoding="utf-8")
        new_text = pattern.sub(lambda m: m.group(0).replace(f'"{m.group(1)}"', f'"{new}"'), text)
        if new_text != text:
            path.write_bytes(new_text.encode("utf-8"))
            changed.append(path)
    unit.version = new
    return changed


def amsterdam_now(now: datetime.datetime | None = None) -> datetime.datetime:
    """Europe/Amsterdam time without a tz database (Windows has none): CET, CEST from the last Sunday of March to
    the last Sunday of October, switching at 01:00 UTC."""
    utc = (now or datetime.datetime.now(datetime.timezone.utc)).astimezone(datetime.timezone.utc)

    def last_sunday(month: int) -> datetime.datetime:
        day = datetime.datetime(utc.year, month, 31, 1, tzinfo=datetime.timezone.utc)
        return day - datetime.timedelta(days=(day.weekday() + 1) % 7)

    summer = last_sunday(3) <= utc < last_sunday(10)
    return (utc + datetime.timedelta(hours=2 if summer else 1)).replace(tzinfo=None)


def add_changelog_entry(root: Path, unit: Unit, text: str, now: datetime.datetime | None = None) -> Path:
    """Puts "Changelog: <time>", a blank line and *text* on top of the unit's CHANGELOG."""
    path = root / unit.path / "CHANGELOG"
    stamp = amsterdam_now(now).strftime("%d-%m-%Y %H:%M:%S")
    old = path.read_text(encoding="utf-8") if path.is_file() else ""
    path.write_bytes(f"Changelog: {stamp}\n\n{text.strip()}\n\n{old}".encode("utf-8"))
    return path


def release_text(version: str, notes: str) -> str:
    return f"Release {version}." + (f" {notes.strip()}" if notes.strip() else "")


def portal_text(version: str, pins: list[str], notes: str) -> str:
    text = f"Release {version}."
    if pins:
        text += " Pins " + ", ".join(pins) + "."
    return text + (f" {notes.strip()}" if notes.strip() else "")


# --- Step 2: pins and the portal -------------------------------------------------------------------------------

def pin_candidates(units: list[Unit]) -> list[Unit]:
    """Apps whose current VERSION is tagged but not pinned with a checksum yet."""
    return [u for u in units if u.kind == "app" and u.released
            and (u.pinned_tag != u.tag or not u.pinned_sha)]


def pin(root: Path, unit: Unit, sha256: str) -> None:
    path = root / "portal" / "apps.toml"
    text = path.read_text(encoding="utf-8")
    path.write_bytes(pin_app.pin(text, unit.key, unit.tag, sha256.lower()).encode("utf-8"))
    unit.pinned_tag, unit.pinned_sha = unit.tag, sha256.lower()


def follow_unreleased_pin(root: Path, unit: Unit) -> bool:
    """When apps.toml pins a tag of this app that was never released, CI only accepts it while it matches VERSION:
    move the pin to the new version (sha256 empty). True when apps.toml changed; that push then needs a portal bump."""
    if unit.kind != "app" or not unit.pinned_tag or unit.pinned_tag == unit.tag \
            or unit.pinned_tag in tags_of(root, unit.key):
        return False
    path = root / "portal" / "apps.toml"
    path.write_bytes(pin_app.pin(path.read_text(encoding="utf-8"), unit.key, unit.tag, "").encode("utf-8"))
    unit.pinned_tag, unit.pinned_sha = unit.tag, ""
    return True


def fetch_sha256(tag: str) -> str:
    return pin_app.fetch_sha256(tag)


def changed_pins(root: Path, base: str) -> list[str]:
    """The pinned tags that differ from *base*: the app releases this portal release brings."""
    old_text = git(root, "show", f"{base}:portal/apps.toml") or ""
    old = {e.key: e.tag for e in check_manifest.manifest.parse(old_text)} if old_text else {}
    new = check_manifest.manifest.load(root / "portal" / "apps.toml")
    return [e.tag for e in new if old.get(e.key) != e.tag]


def portal_minimum(root: Path, base: str, portal_version: str) -> tuple[str, str]:
    """The lowest portal version CI accepts against *base* (the last push), and why: ("", "") when apps.toml is
    unchanged. The portal VERSION at *base* is the starting point."""
    old_text = git(root, "show", f"{base}:portal/apps.toml")
    new_text = (root / "portal" / "apps.toml").read_text(encoding="utf-8")
    if old_text is None:
        return "", ""
    need, why = check_manifest.required_bump(old_text, new_text)
    if need <= 0:
        return "", why
    start = (git(root, "show", f"{base}:portal/VERSION") or portal_version).strip()
    bumped = next_versions(start)[check_manifest.LEVELS[need]]
    if version_tuple(portal_version) > version_tuple(start) and \
            check_manifest.bump_level(start, portal_version) >= need:
        bumped = portal_version
    return bumped, why


# --- The commands for the owner --------------------------------------------------------------------------------

def app_commands(tags: list[str]) -> str:
    lines = ["git add -A && tools/fix-modes.sh", f'git commit -m "Release {", ".join(tags)}"', "git push"]
    lines += [f"git tag {t} && git push origin {t}" for t in tags]
    lines += ["# when GitHub has built the releases: step 2 (pin and portal)"]
    return "\n".join(lines)


def portal_commands(tag: str) -> str:
    return "\n".join(["git add -A && tools/fix-modes.sh", f'git commit -m "Release {tag}"', "git push",
                      "# test the combination on a BC-250, then:", f"git tag {tag} && git push origin {tag}"])


def main() -> int:
    for u in load_units():
        since = "never released" if u.last_tag is None and u.kind != "core" else \
            f"{u.commits} commits since {u.last_tag}" if u.last_tag else ""
        pinned = f"  pinned {u.pinned_tag}{'' if u.pinned_sha else ' (no sha256)'}" if u.pinned_tag else ""
        print(f"{u.key:<16} {u.version:<8} {since}{pinned}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
