#!/usr/bin/env python3
# SPDX-License-Identifier: GPL-3.0-or-later
"""The file edits of a release, for the window in main_window.py (and on their own: tools/release.sh --list lists
the apps). Nothing here commits, tags or pushes; it prints the git commands for that instead. It needs no PyQt6 and
no bc250_core, so it also runs with the system python3.

A release has two steps, because an app's checksum only exists once GitHub has built its release:

1. Apps: the new VERSION, every copy that tools/check_versions.py checks, and a "Release x.y.z." CHANGELOG entry.
   The version offered first follows semantic versioning from the CHANGELOG entries since the last tag: one that
   starts with Breaking. asks for a major release, Added. for a minor one, Fixed. for a patch.
   Commit, push, tag <app>-v<x.y.z>, push the tag: release.yml builds the tarball and SHA256SUMS.
2. Portal: pin each released app in portal/apps.toml (tag and sha256, as tools/pin_app.py), bump portal/VERSION at
   least as much as tools/check_manifest.py asks, and a CHANGELOG entry listing the pins. Commit, test on a board
   (check-release.sh local), then push and tag portal-v<x.y.z>, and check the published release
   (check-release.sh release).

A withdrawal (owner's decisions, 13-10-2026): an app release that must not be used any more (privacy, security, any
reason) is marked withdrawn in portal/apps.toml with the reason, and on GitHub (a pre-release titled "Withdrawn: ...",
so no update check offers it; the release itself stays). The next portal release shows the app as not available and
removes it from the boards that have it. Test it on a board with Test withdrawal before that portal is pushed."""

from __future__ import annotations

import datetime
import importlib.util
import json
import re
import shlex
import urllib.error
import urllib.request
import os
import shutil
import subprocess
import sys
import threading
import time
from dataclasses import dataclass, field
from pathlib import Path
from urllib.parse import urlparse

SUITE = Path(__file__).resolve().parents[3]           # apps/suite-releases/bc250_suite_releases/plan.py
TOOLS = SUITE / "tools"
CHECK_SCRIPT = "apps/suite-releases/check-release.sh"  # relative to the checkout
TAG_SCRIPT = "tools/tag-release.sh"     # tags only a pushed HEAD that holds the version: never one before the bump
CI_LOCAL = "tools/ci-local.sh"          # CI's jobs here, in a container (Linux): the push only when they pass
CHECKOUT_ONLY = ".checkout-only"        # an app folder with this marker runs from the checkout and is never released
_VERSION = re.compile(r"^\d+\.\d+\.\d+$")


def _load(name: str):
    spec = importlib.util.spec_from_file_location(name, TOOLS / f"{name}.py")
    module = importlib.util.module_from_spec(spec)
    sys.modules[spec.name] = module
    spec.loader.exec_module(module)
    return module


check_versions = _load("check_versions")
stage_app = _load("stage_app")
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


def checkout_stamp(root: Path) -> str:
    """The checkout's last commit and its time in Amsterdam ("c109b51 · 15-10-2026 03:46"): Suite Releases is never
    released, so its VERSION stays put and this says which code runs. "" outside a git checkout."""
    out = (git(root, "log", "-1", "--format=%h %ct") or "").split()
    if len(out) != 2 or not out[1].isdigit():
        return ""
    when = amsterdam_now(datetime.datetime.fromtimestamp(int(out[1]), datetime.timezone.utc))
    return f"{out[0]} · {when:%d-%m-%Y %H:%M}"


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
    changed: list[str] | None = None    # shipped files that differ from the last tag; None: never released
    in_apps: list[str] = field(default_factory=list)  # core only: the apps whose release would carry its changes
    current: bool = False               # core only: nothing it ships changed since its VERSION was last bumped
    standalone: bool = False            # apps only: released separately, never pinned in the portal

    @property
    def needs_release(self) -> bool:
        """Something it ships changed since its last tag (or it was never released). Core is never released."""
        return self.kind != "core" and (self.last_tag is None or bool(self.changed))

    @property
    def release_reason(self) -> str:
        if self.kind == "core":
            n = len(self.in_apps)
            releases = f"{n} app release{'s' if n != 1 else ''}"
            if n and self.current:
                return f"{self.version} has it: goes into {releases}"
            return f"changed: goes into {releases}" if n else "no"
        if self.last_tag is None:
            return "first release"
        if not self.changed:
            return "no"
        core = [f for f in self.changed if f.startswith("core/")]
        own = len(self.changed) - len(core)
        parts = ([f"{own} file{'s' if own != 1 else ''}"] if own else []) + (["core"] if core else [])
        return "yes: " + " + ".join(parts)

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


def shipped_sources(root: Path, key: str, path: str) -> list[str]:
    """The source paths a release of *key* is made from, as tools/stage_app.py stages it."""
    paths = [path]
    if key != "core" and stage_app.uses_core(root / path):
        paths.append("core/bc250_core")
    if key not in ("core", "portal") and (root / "docs" / "apps" / f"{key}.md").is_file():
        paths.append(f"docs/apps/{key}.md")
    return paths


def is_shipped(rel: str) -> bool:
    parts = rel.split("/")
    return not (set(parts) & stage_app.SKIP_DIRS) and parts[-1] not in stage_app.SKIP_FILES \
        and not parts[-1].endswith(".pyc") and not any(p.startswith(".venv") for p in parts)


def changed_since(root: Path, tag: str, paths: list[str]) -> list[str]:
    """Shipped files under *paths* that differ between *tag* and the working tree: committed, not yet committed
    and new (untracked) files alike."""
    diff = git(root, "diff", "--name-only", tag, "--", *paths) or ""
    new = git(root, "ls-files", "--others", "--exclude-standard", "--", *paths) or ""
    return sorted({f for f in (diff + new).splitlines() if f and is_shipped(f)})


def bad_tags(root: Path, units: list[Unit]) -> list[str]:
    """Tags that point at a commit whose VERSION is not the tag's version: tagged before the version bump was
    committed. release.yml refuses to build those; delete the tag and tag the right commit again."""
    out = []
    for unit in units:
        if unit.kind == "core" or not unit.last_tag:
            continue
        at_tag = (git(root, "show", f"{unit.last_tag}:{unit.path}/VERSION") or "").strip()
        want = unit.last_tag[len(unit.key) + 2:]
        if at_tag and at_tag != want:
            out.append(f"{unit.last_tag} points at a commit where {unit.path}/VERSION is {at_tag}")
    return out


def load_units(root: Path = SUITE) -> list[Unit]:
    pins = {}
    try:
        for entry in check_manifest.manifest.load(root / "portal" / "apps.toml"):
            pins[entry.key] = entry
    except (OSError, check_manifest.manifest.ManifestError):
        pass
    units = []
    folders = [("core", "core"), ("portal", "portal")]
    folders += [(p.name, f"apps/{p.name}") for p in sorted((root / "apps").iterdir())
                if (p / "VERSION").is_file() and not (p / CHECKOUT_ONLY).is_file()]
    for key, path in folders:
        version = (root / path / "VERSION").read_text(encoding="utf-8").strip()
        tags = tags_of(root, key) if key != "core" else []
        last = tags[-1] if tags else None
        unit = Unit(key, path, version, last, commits_since(root, last, path),
                    standalone=(root / path / ".standalone").is_file())
        if last:
            unit.changed = changed_since(root, last, shipped_sources(root, key, path))
        if key in pins:
            unit.pinned_tag, unit.pinned_sha = pins[key].tag, pins[key].sha256
        units.append(unit)
    # Core is never tagged: it ships inside each app that imports it, so its changes are the core files those
    # apps' releases would carry.
    core = units[0]
    carriers = [u for u in units if u.kind != "core" and any(f.startswith("core/") for f in u.changed or [])]
    core.in_apps = [u.key for u in carriers]
    core.changed = sorted({f for u in carriers for f in u.changed or [] if f.startswith("core/")})
    core.current = core_is_current(root)
    return units


def core_is_current(root: Path) -> bool:
    """Whether core's VERSION already covers what it ships: nothing under core/bc250_core changed since the commit
    that last changed core/VERSION, or that VERSION is changed and not committed yet (a bump in progress). Then an
    app release carries core as it is, and core needs no new version."""
    if git(root, "diff", "--quiet", "HEAD", "--", "core/VERSION") is None:
        return True
    bump = (git(root, "log", "-1", "--format=%H", "--", "core/VERSION") or "").strip()
    return bool(bump) and not changed_since(root, bump, ["core/bc250_core"])


# --- Edits -----------------------------------------------------------------------------------------------------

def set_version(root: Path, unit: Unit, new: str) -> list[Path]:
    """Writes *new* to the unit's VERSION and to every copy check_versions.py checks; returns the changed files."""
    folder = root / unit.path
    changed = [folder / "VERSION"]
    (folder / "VERSION").write_bytes(f"{new}\n".encode())
    for path in sorted(folder.rglob("*")):
        parts = path.relative_to(folder).parts
        if not path.is_file() or "tests" in parts or "target" in parts:
            continue
        pattern = check_versions.version_pattern(path)       # Cargo.lock too: CI builds Rust with --locked
        if pattern is None:
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


# --- The kind of change: semantic versioning (owner, 15-10-2026) -----------------------------------------------

# A CHANGELOG entry starts with the kind of change it is; a release takes the highest kind since its last tag.
CHANGE_WORDS = {"Breaking.": "major", "Added.": "minor", "Fixed.": "patch"}
LEVELS = ("patch", "minor", "major")
# Entries the release tools write themselves: they are no change of their own.
TOOL_ENTRIES = ("Release ", "Version ", "Withdrawn: ", "Withdrawal of ")
_ENTRY = re.compile(r"^Changelog: .*$", re.M)


def changelog_entries(text: str) -> list[str]:
    """Each entry of a CHANGELOG, header line included, newest first."""
    starts = [m.start() for m in _ENTRY.finditer(text)]
    return [text[a:b].strip() for a, b in zip(starts, starts[1:] + [len(text)])]


def entry_body(entry: str) -> str:
    return entry.split("\n", 1)[1].strip() if "\n" in entry else ""


def change_word(body: str) -> str:
    """The entry's kind (Breaking., Added., Fixed.), "" when it has none."""
    return next((word for word in CHANGE_WORDS if body.startswith(word + " ") or body == word), "")


def new_entries(root: Path, unit: Unit) -> list[str]:
    """The change entries (bodies) since the unit's last tag: its own, and core's when the release carries a core
    change. Core itself, never tagged: its entries since its last "Version x.y.z." entry."""
    def since(path: str, ref: str | None) -> list[str]:
        file = root / path / "CHANGELOG"
        current = changelog_entries(file.read_text(encoding="utf-8")) if file.is_file() else []
        if ref is None:
            cut = next((i for i, e in enumerate(current) if entry_body(e).startswith("Version ")), len(current))
            current = current[:cut]
        else:
            old = set(changelog_entries(git(root, "show", f"{ref}:{path}/CHANGELOG") or ""))
            current = [e for e in current if e not in old]
        return [b for b in map(entry_body, current) if b and not b.startswith(TOOL_ENTRIES)]

    if unit.kind == "core":
        return since(unit.path, None)
    entries = since(unit.path, unit.last_tag) if unit.last_tag else []
    if unit.last_tag and any(f.startswith("core/") for f in unit.changed or []):
        entries += since("core", unit.last_tag)
    return entries


def suggested_level(entries: list[str]) -> tuple[str, str]:
    """The release level the entries ask for (patch, minor, major), and why. An entry without a kind counts as a
    fix, and says so."""
    counts = {word: 0 for word in CHANGE_WORDS}
    unmarked = 0
    for body in entries:
        word = change_word(body)
        if word:
            counts[word] += 1
        else:
            unmarked += 1
    level = max((CHANGE_WORDS[w] for w, n in counts.items() if n), key=LEVELS.index, default="patch")
    parts = [f"{n} {w.rstrip('.')}" for w, n in counts.items() if n] + \
            ([f"{unmarked} without Breaking./Added./Fixed. (counted as a fix)"] if unmarked else [])
    return level, ", ".join(parts) or "no CHANGELOG entries"


def _tagged_version(unit: Unit) -> str:
    """The version of the unit's last tag, where the next version counts from; its VERSION without a tag."""
    return unit.last_tag[len(unit.key) + 2:] if unit.last_tag else unit.version


def version_choices(root: Path, unit: Unit) -> tuple[list[str], str]:
    """The versions step 1 offers for the unit, the one semantic versioning gives first, and why. Breaking. ->
    major, Added. -> minor, otherwise patch, counted from the last tag. A VERSION bumped further already, never
    tagged, comes first; a first release is offered as it is."""
    nexts = list(next_versions(unit.version).values())
    if unit.kind == "core" and unit.current:
        return [unit.version] + nexts, f"{unit.version} already holds core's changes"
    if unit.kind != "core" and unit.last_tag is None:
        return [unit.version] + nexts, "the first release"
    level, why = suggested_level(new_entries(root, unit))
    suggested = next_versions(_tagged_version(unit))[level]
    reason = f"{level}: {why}" + (f" since {unit.last_tag}" if unit.last_tag else "")
    released = unit.released or unit.kind == "core"
    choices = [suggested, unit.version, *nexts]
    if version_tuple(unit.version) > version_tuple(suggested):
        choices.insert(0, unit.version)
    choices = [v for i, v in enumerate(choices) if v not in choices[:i] and not check_new_version(unit.version, v,
                                                                                                    released)]
    return choices, reason


def portal_suggestion(root: Path, portal: Unit) -> tuple[str, str]:
    """The portal's next version by semantic versioning since its last tag, and why: its own CHANGELOG entries, and
    what changed in apps.toml since that tag (an app added or removed: minor; the largest app bump it pins).
    check_manifest.py compares apps.toml only with the last push, so a change pushed before the portal release
    would otherwise be missed."""
    level, why = suggested_level(new_entries(root, portal))
    reason = f"{level}: {why}" + (f" since {portal.last_tag}" if portal.last_tag else "")
    old = git(root, "show", f"{portal.last_tag}:portal/apps.toml") if portal.last_tag else None
    if old is not None:
        need, what = check_manifest.required_bump(old, (root / "portal" / "apps.toml").read_text(encoding="utf-8"))
        if need > LEVELS.index(level) + 1:
            level = LEVELS[need - 1]
            reason = f"{level}: apps.toml changed since {portal.last_tag} ({what})"
    return next_versions(_tagged_version(portal))[level], reason


def portal_text(version: str, pins: list[str], notes: str, withdrawn: list[tuple[str, str]] = ()) -> str:
    text = f"Release {version}."
    if pins:
        text += " Pins " + ", ".join(pins) + "."
    for tag, reason in withdrawn:
        text += f" Withdraws {tag}: {reason.rstrip('.')}."
    return text + (f" {notes.strip()}" if notes.strip() else "")


# --- Withdrawing a release -------------------------------------------------------------------------------------

_BLOCK = re.compile(r"^\[apps\.(?P<key>[a-z0-9-]+)\]\s*$")


def set_withdrawn(text: str, key: str, reason: str) -> str:
    """apps.toml with [apps.<key>] marked withdrawn for *reason* (after its summary line), or unmarked when
    *reason* is empty; everything else stays as it is."""
    lines = text.splitlines(keepends=True)
    start = next((i for i, line in enumerate(lines) if (m := _BLOCK.match(line)) and m["key"] == key), None)
    if start is None:
        raise ValueError(f"apps.toml has no [apps.{key}]")
    end = next((i for i in range(start + 1, len(lines)) if lines[i].startswith("[")), len(lines))
    block = [line for line in lines[start:end] if not line.startswith("withdrawn ")]
    if reason.strip():
        at = next((i + 1 for i, line in enumerate(block) if line.startswith("summary ")), 1)
        block.insert(at, f"withdrawn = {json.dumps(reason.strip(), ensure_ascii=False)}\n")
    return "".join(lines[:start] + block + lines[end:])


def withdrawable(root: Path, units: list[Unit]) -> list[Unit]:
    """The apps a portal pins that can be withdrawn: never the required one (Bazzite Test, always installed)."""
    required = {e.key for e in check_manifest.manifest.load(root / "portal" / "apps.toml") if e.required}
    return [u for u in units if u.kind == "app" and not u.standalone and u.pinned_tag and u.key not in required]


def withdrawn_reason(root: Path, key: str) -> str:
    entries = check_manifest.manifest.load(root / "portal" / "apps.toml")
    return next((e.withdrawn for e in entries if e.key == key), "")


def withdraw(root: Path, unit: Unit, reason: str, now: datetime.datetime | None = None) -> list[Path]:
    """Marks the app's pinned release withdrawn (or, with no reason, takes that back) in apps.toml, with a CHANGELOG
    entry in the app. Returns the files changed."""
    path = root / "portal" / "apps.toml"
    path.write_bytes(set_withdrawn(path.read_text(encoding="utf-8"), unit.key, reason).encode("utf-8"))
    text = (f"Withdrawn: {unit.pinned_tag}. {reason.strip()}" if reason.strip() else
            f"Withdrawal of {unit.pinned_tag} taken back.")
    return [path, add_changelog_entry(root, unit, text, now)]


def changed_withdrawals(root: Path, base: str) -> list[tuple[str, str]]:
    """(tag, reason) of the apps withdrawn since *base*: what the portal release that follows withdraws."""
    old_text = git(root, "show", f"{base}:portal/apps.toml") or ""
    old = {e.key: e.withdrawn for e in check_manifest.manifest.parse(old_text)} if old_text else {}
    new = check_manifest.manifest.load(root / "portal" / "apps.toml")
    return [(e.tag, e.withdrawn) for e in new if e.withdrawn and not old.get(e.key)]


def withdraw_commands(tag: str, reason: str, now: datetime.datetime | None = None) -> str:
    """What stays the owner's: mark the GitHub release (it stays, as a pre-release, so no update check offers it),
    then the portal release that removes the app from the boards."""
    date = amsterdam_now(now).strftime("%d-%m-%Y")
    notes = f"Withdrawn on {date}: {reason.strip()} Do not install this release."
    return "\n".join([
        "# 1. Mark the release withdrawn on GitHub (it stays; a pre-release is offered by no update check):",
        f"gh release edit {tag} --prerelease --title {shlex.quote('Withdrawn: ' + tag)} "
        f"--notes {shlex.quote(notes)}",
        "",
        "# 2. Test it on a BC-250 with the app installed: Test withdrawal (check-release.sh local). The portal must",
        "#    show the app as \"App not available\" and remove it. Take back undoes the mark after a test.",
        "",
        "# 3. Then a portal release (2. Pin and portal: Bump portal, at least a minor version): it lists the",
        "#    withdrawal in its CHANGELOG entry; commit, push and tag it as usual.",
    ])


# --- Step 2: pins and the portal -------------------------------------------------------------------------------

def pin_candidates(units: list[Unit]) -> list[Unit]:
    """Apps whose current VERSION is tagged but not pinned with a checksum yet."""
    return [u for u in units if u.kind == "app" and not u.standalone and u.released
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


# --- Run from the checkout ------------------------------------------------------------------------------------

@dataclass
class Launch:
    """One window of an app, as `python -m <module>` in the checkout: how an app is tried before its release."""
    key: str                            # the app folder under apps/
    module: str                         # "bc250_bazzite_helixsr"
    name: str                           # its APP_NAME, else the module
    folder: Path                        # where the module runs from: its package's parent
    version: str
    changes_board: bool                 # as portal/apps.toml marks the app (standalone apps: False)
    icon: Path | None
    args: tuple[str, ...] = ()          # after `python -m <module>`
    url: str = ""                       # a server: the page to open once it answers

    @property
    def label(self) -> str:
        return f"{self.name} {self.version}".strip()


_CONSTANT = re.compile(r'^(APP_NAME|APP_ID)\s*=\s*"([^"]+)"', re.M)


def launch_targets(root: Path = SUITE) -> list[Launch]:
    """Every app window in the checkout: each package with a __main__.py (one or two levels below the app folder,
    tests left out). The checkout-only apps, like this one, are not listed."""
    try:
        board = {e.key: e.changes_board for e in check_manifest.manifest.load(root / "portal" / "apps.toml")}
    except (OSError, check_manifest.manifest.ManifestError):
        board = {}
    found = []
    for app in sorted((root / "apps").iterdir()):
        if not (app / "VERSION").is_file() or (app / CHECKOUT_ONLY).is_file():
            continue
        version = (app / "VERSION").read_text(encoding="utf-8").strip()
        mains = sorted(p for p in (*app.glob("*/__main__.py"), *app.glob("*/*/__main__.py"))
                       if "tests" not in p.relative_to(app).parts)
        for main in mains:
            package = main.parent
            try:
                init = (package / "__init__.py").read_text(encoding="utf-8")
            except OSError:
                init = ""
            consts = dict(_CONSTANT.findall(init))
            # The icon: the .png its __init__ names (its LOGO_PATH), else the one named after APP_ID, else the first
            # that is not a numbered screenshot.
            images = sorted((app / "images").glob("*.png")) + sorted((package.parent / "images").glob("*.png"))
            named = [p for p in images if f'"{p.name}"' in init] + [p for p in images if p.stem == consts.get("APP_ID")]
            icon = (named or [p for p in images if not p.stem[:1].isdigit()] or [None])[0]
            found.append(Launch(app.name, package.name, consts.get("APP_NAME", package.name), package.parent, version,
                                board.get(app.name, False), icon))
    return found


DOCS_ADDRESS = "127.0.0.1:8765"         # not mkdocs' default 8000, which other dev servers like to take


def docs_target(root: Path = SUITE) -> Launch | None:
    """The manual, served from the checkout with `mkdocs serve` (the dev venv has it): it rebuilds on every save.
    The page is under the path of site_url, as on GitHub Pages. None without a mkdocs.yml."""
    config = root / "mkdocs.yml"
    try:
        text = config.read_text(encoding="utf-8")
    except OSError:
        return None
    site = re.search(r"^site_url:\s*(\S+)", text, re.M)
    path = urlparse(site[1]).path.strip("/") if site else ""
    path = f"/{path}/" if path else "/"
    icon = root / "portal" / "images" / "bc250-bazzite-suite.png"
    return Launch("docs", "mkdocs", "Manual (local)", root, "", False, icon if icon.is_file() else None,
                  ("serve", "--dev-addr", DOCS_ADDRESS), f"http://{DOCS_ADDRESS}{path}")


def launch_command(root: Path, target: Launch, python: str = sys.executable) -> tuple[list[str], dict[str, str]]:
    """The command and environment that start *target* from the checkout: the dev venv's python, with the
    checkout's core on the path as run.sh does it (a release bundles core instead)."""
    import os
    env = dict(os.environ)
    env["PYTHONPATH"] = os.pathsep.join(filter(None, (str(root / "core"), env.get("PYTHONPATH"))))
    return [python, "-m", target.module, *target.args], env


# --- GitHub Actions: did the push build? -----------------------------------------------------------------------

RUNS_URL = "https://api.github.com/repos/{repo}/actions/runs?per_page=30"
ACTIONS_URL = "{repo_url}/actions"
OK_CONCLUSIONS = ("success", "skipped", "neutral")


@dataclass(frozen=True)
class BuildRun:
    """One workflow run on GitHub: CI, Release or Manual, on a branch or a tag."""
    workflow: str                       # "CI"
    ref: str                            # "main", "governor-v0.1.1"
    status: str                         # "queued", "in_progress", "completed", ...
    conclusion: str                     # "success", "failure", "cancelled", ...; "" until it is completed
    url: str                            # its page; also what tells two runs apart
    sha: str
    title: str                          # the commit message's first line

    @property
    def done(self) -> bool:
        return self.status == "completed"

    @property
    def passed(self) -> bool:
        return self.done and self.conclusion in OK_CONCLUSIONS

    @property
    def outcome(self) -> str:
        return ("passed" if self.passed else self.conclusion.replace("_", " ") or "failed") if self.done \
            else self.status.replace("_", " ")

    @property
    def label(self) -> str:
        return f"{self.workflow} on {self.ref}"


def repo_slug() -> str:
    return pin_app.REPO_URL.removeprefix("https://github.com/")


def parse_runs(data: object) -> list[BuildRun]:
    runs = data.get("workflow_runs", []) if isinstance(data, dict) else []
    return [BuildRun(str(r.get("name") or ""), str(r.get("head_branch") or ""), str(r.get("status") or ""),
                     str(r.get("conclusion") or ""), str(r.get("html_url") or ""), str(r.get("head_sha") or ""),
                     str(r.get("display_title") or "")) for r in runs if isinstance(r, dict)]


GH_FALLBACK = "/home/linuxbrew/.linuxbrew/bin/gh"   # Homebrew's gh on Bazzite: not on PATH when started from the menu


@dataclass(frozen=True)
class RateInfo:
    """GitHub's hourly limit as its last answer reported it (the X-RateLimit headers, also on unchanged answers)."""
    limit: int
    remaining: int
    reset: float                        # seconds since the epoch
    signed_in: bool

    @classmethod
    def from_headers(cls, headers, signed_in: bool) -> "RateInfo | None":
        try:
            return cls(int(headers.get("X-RateLimit-Limit")), int(headers.get("X-RateLimit-Remaining")),
                       float(headers.get("X-RateLimit-Reset")), signed_in)
        except (TypeError, ValueError, AttributeError):
            return None

    @property
    def until(self) -> str:
        return time.strftime("%H:%M", time.localtime(self.reset))

    @property
    def text(self) -> str:
        who = "signed in" if self.signed_in else "not signed in"
        return f"GitHub API: {self.remaining:,} of {self.limit:,} left until {self.until}, {who}"


class RateLimited(OSError):
    """GitHub refuses until *reset* (seconds since the epoch): the hour's requests are used up."""

    def __init__(self, reset: float, signed_in: bool, rate: RateInfo | None = None):
        super().__init__(f"GitHub's hourly limit is used up until {time.strftime('%H:%M', time.localtime(reset))}")
        self.reset = reset
        self.signed_in = signed_in
        self.rate = rate or RateInfo(60 if not signed_in else 5000, 0, reset, signed_in)


_token: str | None = None               # the token found once per run; "" when there is none
_token_lock = threading.Lock()          # the checks run in worker threads: one asks gh, the others wait for it


def github_token(run=subprocess.run) -> str:
    """GITHUB_TOKEN or GH_TOKEN, else the token of a gh login (gh auth token); "" without one. With a token GitHub
    allows 5,000 requests an hour instead of 60. It is only sent to GitHub's API and never stored here."""
    global _token
    with _token_lock:
        if _token is None:
            token = os.environ.get("GITHUB_TOKEN") or os.environ.get("GH_TOKEN") or ""
            gh = shutil.which("gh") or (GH_FALLBACK if os.access(GH_FALLBACK, os.X_OK) else "")
            if not token and gh:
                try:
                    out = run([gh, "auth", "token"], capture_output=True, text=True, timeout=10)
                    token = out.stdout.strip() if out.returncode == 0 else ""
                except (OSError, subprocess.SubprocessError):
                    token = ""
            _token = token              # only the finished answer: never "" while gh is still being asked
        return _token


def fetch_runs(etag: str = "") -> tuple[list[BuildRun] | None, str, RateInfo | None]:
    """The newest workflow runs (newest first), the ETag to send next time and GitHub's hourly limit as it stands;
    runs None when nothing changed since *etag*. GitHub answers that with 304, which does not count against the
    limit (60 requests without a token, 5,000 with the token of a gh login). Raises RateLimited when the limit is
    used up, OSError offline."""
    global _token
    token = github_token()
    headers = {"Accept": "application/vnd.github+json", "User-Agent": "bc250-release"}
    if etag:
        headers["If-None-Match"] = etag
    if token:
        headers["Authorization"] = f"Bearer {token}"
    request = urllib.request.Request(RUNS_URL.format(repo=repo_slug()), headers=headers)
    try:
        with urllib.request.urlopen(request, timeout=15) as response:
            return (parse_runs(json.load(response)), response.headers.get("ETag", ""),
                    RateInfo.from_headers(response.headers, bool(token)))
    except urllib.error.HTTPError as exc:
        if exc.code == 304:
            return None, etag, RateInfo.from_headers(exc.headers, bool(token))
        if exc.code == 401 and token:            # an expired or revoked login: go on without it
            _token = ""
            return fetch_runs(etag)
        if exc.code in (403, 429) and exc.headers.get("X-RateLimit-Remaining") == "0":
            raise RateLimited(float(exc.headers.get("X-RateLimit-Reset") or time.time() + 3600), bool(token),
                              RateInfo.from_headers(exc.headers, bool(token))) from exc
        raise


def latest_push(runs: list[BuildRun]) -> list[BuildRun]:
    """The runs of the newest commit: a push and its tags start CI, Release and Manual on the same commit."""
    return [r for r in runs if r.sha == runs[0].sha] if runs else []


def build_state(runs: list[BuildRun]) -> str:
    """"running" while one of *runs* has not finished, else "failed" when one did not pass, else "passed"; ""
    without runs."""
    if not runs:
        return ""
    if not all(r.done for r in runs):
        return "running"
    return "passed" if all(r.passed for r in runs) else "failed"


def just_finished(before: dict[str, BuildRun], runs: list[BuildRun]) -> list[BuildRun]:
    """The runs that were running at the last look (*before*, by url) and have finished now."""
    return [r for r in runs if r.done and r.url in before and not before[r.url].done]


# --- The commands for the owner --------------------------------------------------------------------------------

def push_command(linux: bool | None = None) -> str:
    """git push, after CI's jobs passed here (tools/ci-local.sh runs on Linux only)."""
    if linux is None:
        linux = sys.platform.startswith("linux")
    return f"{CI_LOCAL} && git push" if linux else "git push"


def app_commands(tags: list[str], linux: bool | None = None, portal: str = "") -> str:
    """The commands after step 1's Apply. *portal*: the portal version this push also needs (apps.toml changed since
    the last push), which comes first: committed without it, the push fails CI."""
    lines = [f"# First: step 2's Bump portal (portal {portal}), or CI fails on this push; then:"] if portal else []
    lines += ["git add -A && tools/fix-modes.sh", f'git commit -m "Release {", ".join(tags)}"', push_command(linux)]
    lines += [f"{TAG_SCRIPT} {' '.join(tags)}     # refuses until the bump is committed and pushed"]
    lines += ["# when GitHub has built the releases: step 2 (pin and portal)"]
    return "\n".join(lines)


def portal_commands(tag: str, linux: bool | None = None) -> str:
    """Commit, test on a board, and only then push and tag: the tag is what reaches the users' portals."""
    return "\n".join([
        "# 1. Commit (no push yet):",
        "git add -A && tools/fix-modes.sh",
        f'git commit -m "Release {tag}"',
        "",
        "# 2. Test on a BC-250 (docs/portal.md, Testing a portal release before its tag): Test updates, or",
        f"{CHECK_SCRIPT} local     # ./install.sh, then bc250-bazzite-suite --source release",
        "#    The apps whose pin changed show Update: update them, open each one, check that it works.",
        "#    Something wrong? Fix the app and release a new patch version (step 1), then pin again.",
        "",
        "# 3. All good: push, then tag the portal. The tag goes on the commit of step 1, so commit before you tag:",
        "#    the script refuses while HEAD does not hold the bump.",
        push_command(linux),
        f"{TAG_SCRIPT} {tag}",
        "",
        "# 4. Once GitHub's release workflow has built it: Test release, or",
        f"{CHECK_SCRIPT} release {tag}   # installs and starts the published portal release",
    ])


def main() -> int:
    units = load_units()
    for problem in bad_tags(SUITE, units):
        print(f"WARNING: {problem}: delete the tag and tag the commit with the bump ({TAG_SCRIPT})", file=sys.stderr)
    for u in units:
        since = "never released" if u.last_tag is None and u.kind != "core" else \
            f"{u.commits} commits since {u.last_tag}" if u.last_tag else ""
        pinned = f"  pinned {u.pinned_tag}{'' if u.pinned_sha else ' (no sha256)'}" if u.pinned_tag else ""
        needs = f"  needs a release: {u.release_reason}" if u.needs_release else \
            f"  {u.release_reason}: {', '.join(u.in_apps)}" if u.in_apps else ""
        print(f"{u.key:<16} {u.version:<8} {since}{pinned}{needs}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
