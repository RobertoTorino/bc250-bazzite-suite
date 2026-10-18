#!/usr/bin/env python3
# SPDX-License-Identifier: GPL-3.0-or-later
"""Copy the category icons (icons/<category>/) to every app, as icons/categories.toml assigns them:

    python3 tools/sync_icons.py           # write the copies that differ
    python3 tools/sync_icons.py --check   # only list them; exit 1 when there are any

The copies stay in git where they are, so the installers, the portal, the wiki and a release find them as before;
icons/ is the one place to change them. They are WebP, which Qt and the wiki read, except the 128 px one: menu
entries, Desktop icons, Steam shortcuts and notifications get that PNG, which every desktop shows."""

from __future__ import annotations

import sys
import tomllib
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent


def copies(root: Path = ROOT) -> dict[Path, Path]:
    """Each copy (a path in the checkout) with the category icon it is a copy of."""
    table = tomllib.loads((root / "icons" / "categories.toml").read_text(encoding="utf-8"))
    found = {}
    for key, entry in table.items():
        category = entry["category"]
        if not (root / "icons" / category).is_dir():
            raise SystemExit(f"[{key}]: no icons/{category}/")
        for icon in entry["icons"]:
            found[root / f"{icon}.webp"] = root / "icons" / category / f"{category}-512.webp"
            found[root / f"{icon}-128.png"] = root / "icons" / category / f"{category}-128.png"
        if "tile" in entry:
            found[root / entry["tile"]] = root / "icons" / category / f"{category}-256.webp"
    return found


def stale(root: Path = ROOT) -> list[Path]:
    """The copies that are missing or differ from their category icon."""
    return [copy for copy, source in copies(root).items()
            if not copy.is_file() or copy.read_bytes() != source.read_bytes()]


def main(argv: list[str]) -> int:
    check = "--check" in argv
    sources, out = copies(), stale()
    for copy in out:
        print(("out of date: " if check else "updated: ") + copy.relative_to(ROOT).as_posix())
        if not check:
            copy.parent.mkdir(parents=True, exist_ok=True)
            copy.write_bytes(sources[copy].read_bytes())
    if check and out:
        print("run python3 tools/sync_icons.py", file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
