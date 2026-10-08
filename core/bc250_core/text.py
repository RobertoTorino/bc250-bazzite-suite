# SPDX-License-Identifier: GPL-3.0-or-later
"""String helpers shared by all apps: placeholder filling, safe tooltips and secondary window titles."""

from __future__ import annotations

import html
import re
import sys
from collections.abc import Mapping

from . import appinfo

_NUMBERED = re.compile(r"%(\d+)")
_NAMED = re.compile(r"\{([A-Za-z_][A-Za-z0-9_]*)\}")


def fmt(text: str, *values: object) -> str:
    """Fill the %1, %2, … placeholders of a translated string.

    Qt's own QString.arg() is not available here: PyQt6 returns tr() as a plain str. Placeholders are
    numbered rather than positional ({} or %s), so a translation is free to reorder them, which some
    languages need. Substitution is a single pass, so a value that itself contains "%2" is left alone."""
    return _NUMBERED.sub(
        lambda m: str(values[int(m.group(1)) - 1]) if 0 < int(m.group(1)) <= len(values) else m.group(0), text)


def fill(text: str, values: Mapping[str, object]) -> str:
    """Fill the {name} placeholders of a translated string (paths, URLs, script names) after tr().

    Translators never see the values, and unlike str.format() only known names are replaced, so CSS braces in
    help HTML and a translation that drops a placeholder are both harmless. Single pass, like fmt()."""
    return _NAMED.sub(lambda m: str(values[m.group(1)]) if m.group(1) in values else m.group(0), text)


def plain_tooltip(text: str) -> str:
    """Tooltip for text that comes from outside the app (paths, config, log and CSV contents).

    Qt renders a tooltip as HTML when it looks like HTML, so such text is escaped and shown in a
    paragraph that keeps its line breaks: it can never inject markup, links or images."""
    return f"<p style='white-space:pre-wrap; margin:0;'>{html.escape(text)}</p>"


def window_title(part: str, app_name: str | None = None) -> str:
    """Title of a secondary window. On Linux/Windows Qt appends " — <display name>" itself.

    *app_name* defaults to the current app's name (see appinfo.current())."""
    if sys.platform != "darwin":
        return part
    if app_name is None:
        info = appinfo.current()
        app_name = info.name if info is not None else ""
    return f"{app_name} — {part}" if app_name else part
