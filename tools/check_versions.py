#!/usr/bin/env python3
# SPDX-License-Identifier: GPL-3.0-or-later
"""CI check: every version hard-coded in an app or in core (Python ``__version__ = "x.y.z"``, shell
``VERSION="x.y.z"``, pyproject and Cargo.toml ``version = "x.y.z"``, and a Rust crate's own entry in its
Cargo.lock) must equal that folder's VERSION file. VERSION is the single source; the literals exist so each script
and package still works on its own. Cargo.lock matters because CI builds with --locked, which fails when the lock
file's version of the crate differs from Cargo.toml."""

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PATTERNS = {
    ".py": re.compile(r'^__version__ = "([^"]+)"$', re.M),
    ".sh": re.compile(r'^VERSION="([^"]+)"$', re.M),
    ".toml": re.compile(r'^version = "([^"]+)"', re.M),         # pyproject.toml [project] version, Cargo.toml
}


def cargo_lock_pattern(lock: Path) -> re.Pattern | None:
    """The version of the crate itself in a Cargo.lock (the crate named in the Cargo.toml next to it), as group 1;
    None when there is no such Cargo.toml."""
    manifest = lock.with_name("Cargo.toml")
    if lock.name != "Cargo.lock" or not manifest.is_file():
        return None
    name = re.search(r'^name = "([^"]+)"', manifest.read_text(encoding="utf-8"), re.M)
    if name is None:
        return None
    return re.compile(r'^\[\[package\]\]\nname = "' + re.escape(name.group(1)) + r'"\nversion = "([^"]+)"', re.M)


def version_pattern(path: Path) -> re.Pattern | None:
    """How a version copy looks in this file, or None when the file holds none."""
    if path.name == "Cargo.lock":
        return cargo_lock_pattern(path)
    return PATTERNS.get(path.suffix)


def main() -> int:
    errors = []
    checked = 0
    units = [
        ROOT / "core",
        ROOT / "portal",
        *sorted(p for p in (ROOT / "apps").iterdir() if p.is_dir()),
        ROOT / "tools" / "installer-tests" / "gui",
    ]
    for unit in units:
        version_file = unit / "VERSION"
        if not version_file.is_file():
            errors.append(f"{unit.relative_to(ROOT)}: no VERSION file")
            continue
        want = version_file.read_text(encoding="utf-8").strip()
        if not re.fullmatch(r"\d+\.\d+\.\d+", want):
            errors.append(f"{version_file.relative_to(ROOT)}: {want!r} is not x.y.z")
        for path in unit.rglob("*"):
            if not path.is_file() or "tests" in path.parts or "target" in path.parts:
                continue
            pattern = version_pattern(path)
            if pattern is None:
                continue
            for got in pattern.findall(path.read_text(encoding="utf-8")):
                checked += 1
                if got != want:
                    errors.append(f"{path.relative_to(ROOT)}: {got} != VERSION {want}")
    for e in errors:
        print(e, file=sys.stderr)
    if errors:
        return 1
    print(f"OK: {checked} versions in {len(units)} folders match their VERSION file")
    return 0


if __name__ == "__main__":
    sys.exit(main())
