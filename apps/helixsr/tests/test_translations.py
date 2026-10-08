# SPDX-License-Identifier: GPL-3.0-or-later
"""Translations: the .ts -> .qm compiler, the shipped language files and the way the app loads them."""

from __future__ import annotations

import importlib.util
import re
import xml.etree.ElementTree as ET
from pathlib import Path

import pytest
from PyQt6.QtCore import QCoreApplication, QTranslator

from bc250_bazzite_helixsr import LANGUAGES, TRANSLATIONS_DIR
from bc250_bazzite_helixsr.__main__ import install_translators
from bc250_bazzite_helixsr.help import help_html

ROOT = Path(__file__).resolve().parent.parent
PLACEHOLDER = re.compile(r"\{[^{}]*\}")


def _compiler():
    spec = importlib.util.spec_from_file_location("compile_translations", ROOT / "tools" / "compile_translations.py")
    module = importlib.util.module_from_spec(spec)
    assert spec.loader is not None
    spec.loader.exec_module(module)
    return module


def _ts(language: str, messages: dict[str, dict[str, str]]) -> str:
    out = [f'<?xml version="1.0" encoding="utf-8"?><!DOCTYPE TS><TS version="2.1" language="{language}">']
    for context, items in messages.items():
        out.append(f"<context><name>{context}</name>")
        for source, translation in items.items():
            tag = '<translation type="unfinished"></translation>' if translation is None else f"<translation>{translation}</translation>"
            out.append(f"<message><source>{source}</source>{tag}</message>")
        out.append("</context>")
    out.append("</TS>")
    return "".join(out)


def test_compiler_output_loads_in_qtranslator(qapp, tmp_path):
    comp = _compiler()
    ts = tmp_path / "x_de.ts"
    ts.write_text(_ts("de", {"A": {"Hello": "Hallo", "Bye {0}": "Tschüss {0}", "Skip": None},
                             "help": {"&lt;b&gt;x&lt;/b&gt;": "&lt;b&gt;y 日本&lt;/b&gt;"}}), encoding="utf-8")
    qm, count = comp.compile_file(ts)
    assert count == 3 and qm.is_file()
    translator = QTranslator()
    assert translator.load(str(qm)) and translator.language() == "de"
    assert translator.translate("A", "Hello") == "Hallo"
    assert translator.translate("A", "Bye {0}") == "Tschüss {0}"
    assert translator.translate("A", "Skip") == ""                   # unfinished: Qt falls back to the source
    assert translator.translate("help", "<b>x</b>") == "<b>y 日本</b>"
    assert translator.translate("B", "Hello") == ""                  # other context


def test_compiler_skips_source_language(tmp_path):
    comp = _compiler()
    ts = tmp_path / "x_en.ts"
    ts.write_text(_ts("", {"A": {"Hello": None}}), encoding="utf-8")
    qm, count = comp.compile_file(ts)
    assert count == 0 and not qm.exists()


def _shipped() -> list[Path]:
    return sorted(p for p in TRANSLATIONS_DIR.glob("*.ts") if not p.name.endswith("_en.ts"))


@pytest.mark.parametrize("ts", _shipped(), ids=lambda p: p.stem.rsplit("_", 1)[-1])
def test_shipped_translation_is_complete_and_keeps_placeholders(ts):
    source = {(c.findtext("name"), m.findtext("source"))
              for c in ET.parse(TRANSLATIONS_DIR / "bc250_bazzite_helixsr_en.ts").getroot().findall("context")
              for m in c.findall("message")}
    root = ET.parse(ts).getroot()
    assert root.get("language") == ts.stem.rsplit("_", 1)[-1] in LANGUAGES
    seen = set()
    for context in root.findall("context"):
        name = context.findtext("name")
        for message in context.findall("message"):
            src, text = message.findtext("source") or "", message.findtext("translation") or ""
            seen.add((name, src))
            assert text.strip(), f"{ts.name}: {name!r} {src!r} is not translated"
            assert set(PLACEHOLDER.findall(text)) == set(PLACEHOLDER.findall(src)), f"{ts.name}: placeholders differ in {src!r}"
            for literal in ("%p%", "%command%"):
                assert (literal in text) == (literal in src), f"{ts.name}: {literal} lost in {src!r}"
    assert seen == source, f"{ts.name}: differs from the English source: {sorted(seen ^ source)[:5]}"
    assert ts.with_suffix(".qm").is_file(), f"{ts.name}: run tools/compile_translations.py"


def test_install_translators_switches_language(qapp):
    if not _shipped():
        pytest.skip("no translations shipped")
    code = "de" if (TRANSLATIONS_DIR / "bc250_bazzite_helixsr_de.qm").is_file() else _shipped()[0].stem.rsplit("_", 1)[-1]
    before = help_html("/p", "/d")
    assert install_translators(qapp, code) == code
    try:
        after = help_html("/p", "/d")
        assert after != before and "<h2>" in after and "/p" in after
        assert QCoreApplication.translate("backend", "In place") != "In place"
    finally:
        for translator in list(qapp.findChildren(QTranslator)):
            qapp.removeTranslator(translator)
            translator.deleteLater()
    assert install_translators(qapp, "en") == "en"
    assert help_html("/p", "/d") == before


def test_help_page_language_picker(qapp, tmp_path):
    from bc250_bazzite_helixsr.help import HelpPage
    page = HelpPage("/p", "/d", "/w", current="fr")
    picked = []
    page.language_changed.connect(picked.append)
    assert page.language.currentData() == "fr" and not page.restart_hint.isVisible()
    page.language.setCurrentIndex(0)
    assert picked == [""]
    page.language.setCurrentIndex(page.language.findData("ja"))
    assert picked == ["", "ja"]
