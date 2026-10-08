# SPDX-License-Identifier: GPL-3.0-or-later
from __future__ import annotations

from bc250_core import appinfo
from bc250_core.text import fill, fmt, plain_tooltip, window_title


def test_fmt_numbered_and_reordered():
    assert fmt("%2 before %1", "a", "b") == "b before a"


def test_fmt_single_pass_and_out_of_range():
    assert fmt("%1 %3", "%2", "x") == "%2 %3"


def test_fill_only_known_names():
    html = "<style>p { color:red; }</style><p>{script} in {state_dir}, {unknown}</p>"
    assert fill(html, {"script": "bc250-cu-bisect.sh", "state_dir": "~/.local/share/x"}) == \
        "<style>p { color:red; }</style><p>bc250-cu-bisect.sh in ~/.local/share/x, {unknown}</p>"


def test_fill_single_pass():
    assert fill("{a} {b}", {"a": "{b}", "b": "B"}) == "{b} B"


def test_plain_tooltip_escapes():
    assert "&lt;img" in plain_tooltip("<img src=x>")
    assert "<img" not in plain_tooltip("<img src=x>")


def test_window_title(monkeypatch, info):
    monkeypatch.setattr("sys.platform", "linux")
    assert window_title("Logs") == "Logs"
    monkeypatch.setattr("sys.platform", "darwin")
    monkeypatch.setattr(appinfo, "_current", info)
    assert window_title("Logs") == "BC-250 Test App — Logs"
    assert window_title("Logs", "Other") == "Other — Logs"
