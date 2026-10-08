#!/usr/bin/env python3
# SPDX-License-Identifier: GPL-3.0-or-later
"""Builds the app's translations: sources -> .ts -> .qm.

The translated text lives in one flat catalogue per language (tools/i18n/<lang>.json, source string ->
translation), not in the .ts files: the same sentence is often shown by several classes, and Qt keys a
message by context *and* source, so a flat catalogue is translated once and reused everywhere.

What this script does:
  1. runs pylupdate6 over bc250_governor/ to collect every tr()/translate()/QT_TRANSLATE_NOOP string,
  2. copies the messages of a class into the contexts of its subclasses (PyQt resolves self.tr() with the
     context of the *instance's* class, so an inherited call looks up the subclass name),
  3. writes bc250_governor/translations/bc250_governor_<lang>.ts with the catalogue's translations,
  4. compiles each .ts to the .qm the app loads at startup.

Usage:
    python3 tools/i18n/build.py              # all languages
    python3 tools/i18n/build.py de fr        # only these
    python3 tools/i18n/build.py --missing    # list strings without a translation, then stop
    python3 tools/i18n/build.py --check      # catalogue sanity (missing, unused, lost %1 placeholders)

pylupdate6 comes with PyQt6 (the project's python/ venv has it). Compiling .qm needs lrelease, from Qt
itself or from `pip install PySide6-Essentials` (pyside6-lrelease); point LRELEASE at it if it is not on
PATH. Without it the .ts files are still written and existing .qm files are kept.
"""

from __future__ import annotations

import ast
import json
import os
import shutil
import subprocess
import sys
import xml.etree.ElementTree as ET
from pathlib import Path
from xml.sax.saxutils import escape

ROOT = Path(__file__).resolve().parents[2]
PACKAGE = ROOT / "bc250_governor"
CATALOG_DIR = Path(__file__).resolve().parent
OUT_DIR = PACKAGE / "translations"
BASENAME = "bc250_governor"
LANGUAGES = ("de", "es", "fr", "it", "ja", "pl", "ru", "zh")


def _sources() -> list[Path]:
    return sorted(p for p in PACKAGE.rglob("*.py") if "__pycache__" not in p.parts)


def _pylupdate(files: list[Path], out: Path) -> None:
    exe = os.environ.get("PYLUPDATE") or shutil.which("pylupdate6") or str(ROOT / "python" / "bin" / "pylupdate6")
    if not Path(exe).exists() and shutil.which(exe) is None:
        sys.exit("pylupdate6 not found: install PyQt6 in python/ or set PYLUPDATE")
    subprocess.run([exe, *(str(f) for f in files), "-ts", str(out)], check=True, cwd=ROOT,
                   stdout=subprocess.DEVNULL)


def _extract(ts: Path) -> dict[str, list[str]]:
    """{context: [source, ...]} in the order pylupdate6 found them."""
    contexts: dict[str, list[str]] = {}
    for node in ET.parse(ts).getroot().findall("context"):
        name = (node.findtext("name") or "").strip()
        seen = contexts.setdefault(name, [])
        for message in node.findall("message"):
            source = message.findtext("source")
            if source is not None and source not in seen:
                seen.append(source)
    return contexts


def _subclasses() -> dict[str, set[str]]:
    """{class name: every class that inherits from it, directly or not} over the whole package."""
    parents: dict[str, list[str]] = {}
    for path in _sources():
        tree = ast.parse(path.read_text(encoding="utf-8"))
        for node in ast.walk(tree):
            if isinstance(node, ast.ClassDef):
                bases = [b.id for b in node.bases if isinstance(b, ast.Name)]
                bases += [b.attr for b in node.bases if isinstance(b, ast.Attribute)]
                parents[node.name] = bases
    children: dict[str, set[str]] = {}
    for name in parents:
        todo, seen = [name], set()
        while todo:                                     # walk up to every ancestor of `name`
            current = todo.pop()
            for base in parents.get(current, ()):
                if base in parents and base not in seen:
                    seen.add(base)
                    todo.append(base)
        for base in seen:
            children.setdefault(base, set()).add(name)
    return children


def _with_inherited(contexts: dict[str, list[str]]) -> dict[str, list[str]]:
    """A subclass that inherits a method calling self.tr() looks the message up under its own name."""
    children = _subclasses()
    out = {name: list(sources) for name, sources in contexts.items()}
    for base, sources in contexts.items():
        for child in children.get(base, ()):
            target = out.setdefault(child, [])
            for source in sources:
                if source not in target:
                    target.append(source)
    return {name: sources for name, sources in out.items() if sources}


def _catalog(lang: str) -> dict[str, str]:
    path = CATALOG_DIR / f"{lang}.json"
    if not path.is_file():
        return {}
    return json.loads(path.read_text(encoding="utf-8"))


def _write_ts(lang: str, contexts: dict[str, list[str]], catalog: dict[str, str]) -> tuple[Path, int, int]:
    lines = ['<?xml version="1.0" encoding="utf-8"?>', "<!DOCTYPE TS>", f'<TS version="2.1" language="{lang}">']
    done = missing = 0
    for context in sorted(contexts):
        lines.append("<context>")
        lines.append(f"    <name>{escape(context)}</name>")
        for source in contexts[context]:
            translation = catalog.get(source, "")
            if translation:
                done += 1
                body = f"<translation>{escape(translation)}</translation>"
            else:
                missing += 1
                body = '<translation type="unfinished"></translation>'
            lines.append("    <message>")
            lines.append(f"        <source>{escape(source)}</source>")
            lines.append(f"        {body}")
            lines.append("    </message>")
        lines.append("</context>")
    lines.append("</TS>")
    path = OUT_DIR / f"{BASENAME}_{lang}.ts"
    path.write_text("\n".join(lines) + "\n", encoding="utf-8")
    return path, done, missing


def _lrelease(ts: Path) -> bool:
    exe = os.environ.get("LRELEASE") or shutil.which("lrelease") or shutil.which("pyside6-lrelease")
    if not exe:
        return False
    qm = ts.with_suffix(".qm")
    subprocess.run([exe, str(ts), "-qm", str(qm)], check=True, stdout=subprocess.DEVNULL)
    return True


def _check(languages: list[str], strings: set[str]) -> int:
    """Catalogue sanity: unknown or missing entries, and placeholders that a translation lost or invented."""
    import re
    problems = 0
    for lang in languages:
        catalog = _catalog(lang)
        missing = sorted(s for s in strings if not catalog.get(s))
        stale = sorted(set(catalog) - strings)
        for source, translation in sorted(catalog.items()):
            if source in strings and translation:
                want, got = sorted(re.findall(r"%\d+", source)), sorted(re.findall(r"%\d+", translation))
                if want != got:
                    problems += 1
                    print(f"{lang}: placeholders {want} -> {got} in {source!r}")
        for source in missing:
            print(f"{lang}: missing {source!r}")
        for source in stale:
            print(f"{lang}: no longer used {source!r}")
        problems += len(missing) + len(stale)
    return problems


def main(argv: list[str]) -> int:
    only_missing = "--missing" in argv
    check = "--check" in argv
    languages = [a for a in argv if not a.startswith("-")] or list(LANGUAGES)
    unknown = [lang for lang in languages if lang not in LANGUAGES]
    if unknown:
        sys.exit(f"unknown language(s): {', '.join(unknown)} (known: {', '.join(LANGUAGES)})")

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    if check or only_missing:                   # read-only modes: extract to a scratch file, touch nothing
        import tempfile
        with tempfile.TemporaryDirectory() as tmp:
            raw = Path(tmp) / f"{BASENAME}_en.ts"
            _pylupdate(_sources(), raw)
            contexts = _with_inherited(_extract(raw))
    else:
        raw = OUT_DIR / f"{BASENAME}_en.ts"      # the English source list, kept as the translator's base
        _pylupdate(_sources(), raw)
        contexts = _with_inherited(_extract(raw))
    strings = {source for sources in contexts.values() for source in sources}
    print(f"{len(strings)} source strings in {len(contexts)} contexts")

    if only_missing:
        for lang in languages:
            catalog = _catalog(lang)
            gaps = sorted(s for s in strings if not catalog.get(s))
            print(f"\n--- {lang}: {len(gaps)} missing")
            print(json.dumps({s: "" for s in gaps}, ensure_ascii=False, indent=2))
        return 0

    if check:
        problems = _check(languages, strings)
        print("catalogues are complete" if not problems else f"{problems} problem(s)")
        return 1 if problems else 0

    compiled = True
    for lang in languages:
        ts, done, missing = _write_ts(lang, contexts, _catalog(lang))
        state = f"{done} translated, {missing} missing"
        if _lrelease(ts):
            print(f"{ts.relative_to(ROOT)} -> {ts.with_suffix('.qm').name} ({state})")
        else:
            compiled = False
            print(f"{ts.relative_to(ROOT)} ({state}) — no lrelease, .qm not rebuilt")
    if not compiled:
        print("\nInstall lrelease (Qt) or `pip install PySide6-Essentials`, or set LRELEASE=<path>, "
              "to compile the .qm files the app loads.")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
