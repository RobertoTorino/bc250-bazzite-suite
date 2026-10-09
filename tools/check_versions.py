#!/usr/bin/env python3
# SPDX-License-Identifier: GPL-3.0-or-later
"""CI check: every version hard-coded in an app or in core (Python ``__version__ = "x.y.z"``, shell
``VERSION="x.y.z"``, pyproject ``version = "x.y.z"``) must equal that folder's VERSION file. VERSION is the single
source; the literals exist so each script and package still works on its own."""

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PATTERNS = {
    ".py": re.compile(r'^__version__ = "([^"]+)"$', re.M),
    ".sh": re.compile(r'^VERSION="([^"]+)"$', re.M),
    ".toml": re.compile(r'^version = "([^"]+)"', re.M),         # pyproject.toml [project] version
}


def main() -> int:
    errors = []
    checked = 0
    units = [ROOT / "core", ROOT / "portal", *sorted(p for p in (ROOT / "apps").iterdir() if p.is_dir())]
    for unit in units:
        version_file = unit / "VERSION"
        if not version_file.is_file():
            errors.append(f"{unit.relative_to(ROOT)}: no VERSION file")
            continue
        want = version_file.read_text(encoding="utf-8").strip()
        if not re.fullmatch(r"\d+\.\d+\.\d+", want):
            errors.append(f"{version_file.relative_to(ROOT)}: {want!r} is not x.y.z")
        for path in unit.rglob("*"):
            pattern = PATTERNS.get(path.suffix)
            if pattern is None or not path.is_file() or "tests" in path.parts:
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
