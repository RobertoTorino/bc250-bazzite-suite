# SPDX-License-Identifier: GPL-3.0-or-later
from __future__ import annotations

import importlib.util
import sys
from pathlib import Path

import pytest

TOOLS = Path(__file__).resolve().parent.parent
spec = importlib.util.spec_from_file_location("pin_app", TOOLS / "pin_app.py")
pin_app = importlib.util.module_from_spec(spec)
sys.modules[spec.name] = pin_app
spec.loader.exec_module(pin_app)

SHA = "ab" * 32


def test_pin_changes_only_that_app():
    text = (TOOLS.parent / "portal" / "apps.toml").read_text(encoding="utf-8")
    new = pin_app.pin(text, "cu-bisect", "cu-bisect-v0.2.0", SHA)
    changed = [(a, b) for a, b in zip(text.splitlines(), new.splitlines()) if a != b]
    assert changed == [('tag = "cu-bisect-v0.1.0"', 'tag = "cu-bisect-v0.2.0"'), ('sha256 = ""', f'sha256 = "{SHA}"')]
    assert len(new.splitlines()) == len(text.splitlines())


def test_pin_last_table_and_missing_app():
    text = '[apps.a]\ntag = "a-v1.0.0"\nsha256 = ""\n'
    assert 'tag = "a-v1.0.1"' in pin_app.pin(text, "a", "a-v1.0.1", SHA)
    with pytest.raises(SystemExit, match="no \\[apps.b\\]"):
        pin_app.pin(text, "b", "b-v1.0.0", SHA)
