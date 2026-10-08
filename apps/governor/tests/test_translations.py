# SPDX-License-Identifier: GPL-3.0-or-later
"""The shipped translations: every language has a compiled .qm that Qt can load, the catalogues cover the
strings, and the placeholders of fmt() survive translation. Rebuild them with tools/i18n/build.py."""

from __future__ import annotations

import json
import re

import pytest
from PyQt6.QtCore import QLocale, QTranslator

from bc250_governor import TRANSLATIONS_DIR, fmt
from bc250_governor.__main__ import LANGUAGES

CATALOG_DIR = TRANSLATIONS_DIR.parent.parent / "tools" / "i18n"


@pytest.mark.parametrize("lang", LANGUAGES)
def test_compiled_translation_loads_and_translates(qapp, lang: str) -> None:
    translator = QTranslator()
    assert translator.load(QLocale(lang), "bc250_governor", "_", str(TRANSLATIONS_DIR)), f"no .qm for {lang}"
    translated = translator.translate("MainWindow", "Ready")
    assert translated and translated != "Ready", f"{lang} does not translate a known string"


@pytest.mark.parametrize("lang", LANGUAGES)
def test_catalog_keeps_placeholders(lang: str) -> None:
    catalog = json.loads((CATALOG_DIR / f"{lang}.json").read_text(encoding="utf-8"))
    assert catalog, f"empty catalogue for {lang}"
    for source, translation in catalog.items():
        assert translation, f"{lang}: no translation for {source!r}"
        assert sorted(re.findall(r"%\d+", source)) == sorted(re.findall(r"%\d+", translation)), \
            f"{lang}: placeholders differ for {source!r}"


def test_fmt_fills_numbered_placeholders() -> None:
    assert fmt("%1 MHz @ %2 mV", 1800, 850) == "1800 MHz @ 850 mV"
    assert fmt("%2 mV bei %1 MHz", 1800, 850) == "850 mV bei 1800 MHz"      # a translation may reorder
    assert fmt("100 % load, %1 left", "2 s") == "100 % load, 2 s left"      # a bare % is not a placeholder
    assert fmt("%1 and %2", "%2") == "%2 and %2"                            # single pass: values are not rescanned
