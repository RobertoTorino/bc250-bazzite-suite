#!/usr/bin/env python3
# SPDX-License-Identifier: GPL-3.0-or-later
"""Compile Qt Linguist .ts files to the binary .qm files QTranslator loads: a small stand-in for lrelease,
which the PyQt6 wheels do not ship.

    python tools/compile_translations.py            # every bc250_bazzite_helixsr/translations/*.ts
    python tools/compile_translations.py a.ts b.ts  # just these

Writes <name>.qm next to each .ts. Only finished translations are written (empty / "unfinished" ones fall back
to the source text at run time, exactly as with lrelease)."""

from __future__ import annotations

import struct
import sys
import xml.etree.ElementTree as ET
from pathlib import Path

TRANSLATIONS = Path(__file__).resolve().parent.parent / "bc250_bazzite_helixsr" / "translations"
MAGIC = bytes.fromhex("3cb86418caef9c95cd211cbf60a1bddd")
# block tags
TAG_HASHES, TAG_MESSAGES, TAG_LANGUAGE = 0x42, 0x69, 0xA7
# message record tags
END, TRANSLATION, SOURCE_TEXT, CONTEXT, COMMENT = 1, 3, 6, 7, 8


def elf_hash(data: bytes) -> int:
    h = 0
    for byte in data:
        h = ((h << 4) + byte) & 0xFFFFFFFF
        g = h & 0xF0000000
        if g:
            h ^= g >> 24
        h &= ~g & 0xFFFFFFFF
    return h or 1


def _field(tag: int, data: bytes) -> bytes:
    return struct.pack(">BI", tag, len(data)) + data


def read_ts(path: Path) -> tuple[str, list[tuple[str, str, str, str]]]:
    """(language, [(context, source, comment, translation)]) for the finished, non-empty translations."""
    root = ET.parse(path).getroot()
    language = root.get("language", "")
    messages = []
    for context in root.findall("context"):
        name = context.findtext("name", default="")
        for message in context.findall("message"):
            if message.get("numerus") == "yes":
                raise SystemExit(f"{path}: plural (numerus) messages are not supported")
            translation = message.find("translation")
            if translation is None or translation.get("type") in ("unfinished", "obsolete", "vanished"):
                continue
            text = translation.text or ""
            if text:
                messages.append((name, message.findtext("source", default=""),
                                 message.findtext("comment", default=""), text))
    return language, messages


def build_qm(language: str, messages: list[tuple[str, str, str, str]]) -> bytes:
    records: list[tuple[int, bytes]] = []
    for context, source, comment, translation in messages:
        record = _field(TRANSLATION, translation.encode("utf-16-be"))
        record += _field(SOURCE_TEXT, source.encode("utf-8"))
        record += _field(CONTEXT, context.encode("utf-8"))
        if comment:
            record += _field(COMMENT, comment.encode("utf-8"))
        record += struct.pack(">B", END)
        records.append((elf_hash(source.encode("utf-8") + comment.encode("utf-8")), record))
    records.sort(key=lambda item: item[0])
    message_block = b""
    hashes = b""
    for h, record in records:
        hashes += struct.pack(">II", h, len(message_block))
        message_block += record
    out = MAGIC
    if language:
        out += _field(TAG_LANGUAGE, language.encode("utf-8"))
    out += _field(TAG_HASHES, hashes)
    out += _field(TAG_MESSAGES, message_block)
    return out


def compile_file(ts: Path) -> tuple[Path, int]:
    """Writes the .qm; a source-language file without any finished translation (the _en.ts) gets none."""
    language, messages = read_ts(ts)
    qm = ts.with_suffix(".qm")
    if messages:
        qm.write_bytes(build_qm(language, messages))
    else:
        qm.unlink(missing_ok=True)
    return qm, len(messages)


def main(argv: list[str]) -> int:
    files = [Path(a) for a in argv] or sorted(TRANSLATIONS.glob("*.ts"))
    if not files:
        print("no .ts files found", file=sys.stderr)
        return 1
    for ts in files:
        qm, count = compile_file(ts)
        print(f"{qm.name}: {count} messages" if count else f"{ts.name}: nothing to compile (source language)")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
