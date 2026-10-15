#!/usr/bin/env python3
# SPDX-License-Identifier: GPL-3.0-or-later
"""Upstream check: is Decky Loader Manager still in step with Decky Loader?

    python3 tools/check_upstream.py

The app pins one Decky release (apps/decky-manager/bc250_decky_manager/loader.py: VERSION, TAG, SHA256) and writes
Decky's release unit itself (loader.unit_text()). This compares them with Decky's GitHub repository:
 * the latest stable release: newer than the pin means a new version of the app, tried on the board first;
 * the pinned release's PluginLoader: the SHA-256 GitHub publishes for it must still be the pinned one;
 * dist/plugin_loader-release.service at the pinned tag and on main: Decky's own updater installs main's, so a change
   there reaches boards that update Decky from its settings, without a new Decky release.

Exit code 0: in step; 1: Decky moved (the report says what); 2: could not check (network, GitHub's rate limit).
The weekly workflow .github/workflows/upstream.yml runs it; with GITHUB_TOKEN set it asks GitHub's API as that token.
Nothing is changed or published."""

from __future__ import annotations

import importlib.util
import json
import os
import sys
import urllib.error
import urllib.request
from collections.abc import Callable
from dataclasses import dataclass, field
from pathlib import Path
from types import ModuleType

SUITE = Path(__file__).resolve().parent.parent
LOADER = SUITE / "apps" / "decky-manager" / "bc250_decky_manager" / "loader.py"
API = "https://api.github.com/repos/{repo}"
RAW = "https://raw.githubusercontent.com/{repo}/{ref}/dist/plugin_loader-release.service"
TEMPLATE = Path("${HOMEBREW_FOLDER}")       # unit_text() with this folder gives Decky's file as it is in its repository
TIMEOUT = 30

Fetch = Callable[[str], bytes]


class CheckError(Exception):
    pass


def fetch(url: str) -> bytes:
    headers = {"User-Agent": "bc250-check-upstream", "Accept": "application/vnd.github+json"}
    token = os.environ.get("GITHUB_TOKEN")
    if token and url.startswith("https://api.github.com/"):
        headers["Authorization"] = f"Bearer {token}"
    try:
        with urllib.request.urlopen(urllib.request.Request(url, headers=headers), timeout=TIMEOUT) as response:
            return response.read()
    except urllib.error.HTTPError as error:
        raise CheckError(f"{url}: GitHub answered {error.code}") from error
    except (urllib.error.URLError, OSError) as error:
        raise CheckError(f"{url}: {getattr(error, 'reason', error)}") from error


def load_loader(path: Path = LOADER) -> ModuleType:
    """loader.py on its own: it needs only the standard library (it runs as root that way)."""
    spec = importlib.util.spec_from_file_location("decky_loader_pin", path)
    module = importlib.util.module_from_spec(spec)
    sys.modules[spec.name] = module             # its dataclasses look their module up there
    spec.loader.exec_module(module)
    return module


def _version(tag: str) -> tuple[int, ...]:
    parts = tag.lstrip("v").split("-")[0].split(".")
    return tuple(int(p) for p in parts if p.isdigit())


@dataclass
class Report:
    pinned: str
    latest: str = ""
    drift: list[str] = field(default_factory=list)
    fine: list[str] = field(default_factory=list)

    def text(self) -> str:
        head = (f"Decky Loader: pinned {self.pinned}, latest stable {self.latest or 'unknown'}. "
                + ("In step." if not self.drift else "Decky moved:"))
        return "\n".join([head] + [f"  - {line}" for line in self.drift] + [f"  ok {line}" for line in self.fine])


def check(loader: ModuleType, get: Fetch = fetch) -> Report:
    repo, tag = loader.REPO, loader.TAG
    report = Report(tag)
    api = API.format(repo=repo)

    latest = json.loads(get(f"{api}/releases/latest"))
    report.latest = str(latest.get("tag_name", ""))
    if _version(report.latest) > _version(tag):
        report.drift.append(f"{report.latest} is out ({str(latest.get('published_at', ''))[:10]}): a new version of "
                            f"Decky Loader Manager pins it, after it is tried on the board. "
                            f"{latest.get('html_url', '')}")
    else:
        report.fine.append(f"no stable release newer than {tag}")

    pinned = json.loads(get(f"{api}/releases/tags/{tag}"))
    assets = {a.get("name"): a for a in pinned.get("assets", [])}
    digest = str(assets.get(loader.ASSET, {}).get("digest") or "")
    if loader.ASSET not in assets:
        report.drift.append(f"{tag} has no {loader.ASSET} any more.")
    elif digest != f"sha256:{loader.SHA256}":
        report.drift.append(f"{tag}'s {loader.ASSET} is published with {digest or 'no SHA-256'}, not the pinned "
                            f"sha256:{loader.SHA256}: the asset was replaced.")
    else:
        report.fine.append(f"{tag}'s {loader.ASSET} is still the pinned file")

    ours = loader.unit_text(TEMPLATE)
    for ref, why in ((tag, "the pinned release's"), ("main", "main's (Decky's updater installs it)")):
        theirs = get(RAW.format(repo=repo, ref=ref)).decode("utf-8", "replace")
        if theirs.strip() != ours.strip():
            report.drift.append(f"{why} plugin_loader-release.service differs from loader.unit_text(): "
                                f"{RAW.format(repo=repo, ref=ref)}")
        else:
            report.fine.append(f"{why} service unit matches loader.unit_text()")
    return report


def main() -> int:
    loader = load_loader()
    try:
        report = check(loader)
    except (CheckError, ValueError) as error:
        print(f"Decky Loader could not be checked: {error}", file=sys.stderr)
        return 2
    text = report.text()
    print(text)
    summary = os.environ.get("GITHUB_STEP_SUMMARY")
    if summary:
        with open(summary, "a", encoding="utf-8") as out:
            out.write("```\n" + text + "\n```\n")
    return 1 if report.drift else 0


if __name__ == "__main__":
    sys.exit(main())
