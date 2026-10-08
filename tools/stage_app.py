#!/usr/bin/env python3
# SPDX-License-Identifier: GPL-3.0-or-later
"""Build the install tree of one app (or the portal) from the suite checkout:

    python3 tools/stage_app.py <app|portal> <dest-dir>

<dest-dir> gets the app's own files without development leftovers (tests, venvs, caches) and, when the app imports
bc250_core, a copy of core/bc250_core beside its package: each app ships the core it was tested with, and its
launcher starts from that folder so this copy is the one Python imports.

The release workflow tars this tree; the portal uses the same function to install from a local checkout."""

from __future__ import annotations

import re
import shutil
import sys
from pathlib import Path

SUITE = Path(__file__).resolve().parent.parent
SKIP_DIRS = {"tests", "python", "_python", "__pycache__", ".pytest_cache", ".idea", ".venv"}
SKIP_FILES = {"requirements-dev.txt", ".gitignore", ".gitattributes"}
_USES_CORE = re.compile(r"^\s*(from|import)\s+bc250_core\b", re.M)


def _ignore(folder: str, names: list[str]) -> set[str]:
    return {n for n in names
            if n in SKIP_DIRS or n in SKIP_FILES or n.endswith(".pyc") or n.startswith(".venv")}


def uses_core(src: Path) -> bool:
    return any(_USES_CORE.search(p.read_text(encoding="utf-8", errors="replace")) for p in src.rglob("*.py")
               if not (set(p.relative_to(src).parts) & SKIP_DIRS))


def source_dir(name: str, suite: Path = SUITE) -> Path:
    src = suite / "portal" if name == "portal" else suite / "apps" / name
    if not src.is_dir():
        raise SystemExit(f"no such app: {name} (looked in {src})")
    return src


def stage(name: str, dest: Path, suite: Path = SUITE) -> Path:
    """Copy app *name* into *dest* (created; must not exist yet) and bundle bc250_core when the app uses it."""
    src = source_dir(name, suite)
    shutil.copytree(src, dest, ignore=_ignore)
    if uses_core(src):
        shutil.copytree(suite / "core" / "bc250_core", dest / "bc250_core", ignore=_ignore)
    return dest


def main(argv: list[str]) -> int:
    if len(argv) != 2:
        print(__doc__.strip().splitlines()[2].strip(), file=sys.stderr)
        return 2
    dest = Path(argv[1])
    if dest.exists():
        print(f"{dest} exists already", file=sys.stderr)
        return 1
    stage(argv[0], dest)
    print(f"staged {argv[0]} in {dest}" + (" (with bc250_core)" if (dest / "bc250_core").is_dir() else ""))
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
