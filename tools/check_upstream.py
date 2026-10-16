#!/usr/bin/env python3
# SPDX-License-Identifier: GPL-3.0-or-later
"""Upstream check: are the apps that pin an upstream release still in step with it?

    python3 tools/check_upstream.py [decky] [shadps4] [helixsr]     # all when none is named

Decky Loader Manager pins one Decky release (apps/decky-manager/bc250_decky_manager/loader.py: VERSION, TAG, SHA256)
and writes Decky's release unit itself (loader.unit_text()). This compares them with Decky's GitHub repository:
 * the latest stable release: newer than the pin means a new version of the app, tried on the board first;
 * the pinned release's PluginLoader: the SHA-256 GitHub publishes for it must still be the pinned one;
 * dist/plugin_loader-release.service at the pinned tag and on main: Decky's own updater installs main's, so a change
   there reaches boards that update Decky from its settings, without a new Decky release.

The shadPS4 Manager pins one shadPS4 release (apps/shadps4-manager/bc250_shadps4_manager/emulator.py: VERSION, TAG,
ASSET, SHA256), read here without importing the app:
 * the latest stable release: newer than the pin means a new version of the app; the report gives the new release's
   Linux zip and the SHA-256 GitHub publishes for it, for the pin;
 * the pinned release's zip: the SHA-256 GitHub publishes for it must still be the pinned one.

The HelixSR Manager gets the latest HelixSR release, or the fallback its developer names
(apps/helixsr/bc250_bazzite_helixsr/acquire.py: KNOWN_VERSION, FALLBACK_VERSION), read here without importing the app:
 * the latest stable release: newer than KNOWN_VERSION means the app gets it without having been checked against it;
   what changed (setup options, the files in the zip, helixsr.ini) needs a look, and a try on the board;
 * the fallback the latest release's notes name ("If 1.9.0 does not work for you, use HelixSR 1.8.1") must be
   FALLBACK_VERSION, and that release must still have its zip.

Exit code 0: all in step; 1: an upstream moved (the report says what); 2: one could not be checked (network, GitHub's
rate limit).
The weekly workflow .github/workflows/upstream.yml runs it; with GITHUB_TOKEN set it asks GitHub's API as that token.
Nothing is changed or published."""

from __future__ import annotations

import ast
import importlib.util
import json
import os
import re
import sys
import urllib.error
import urllib.request
from collections.abc import Callable
from dataclasses import dataclass, field
from pathlib import Path
from types import ModuleType

SUITE = Path(__file__).resolve().parent.parent
LOADER = SUITE / "apps" / "decky-manager" / "bc250_decky_manager" / "loader.py"
EMULATOR = SUITE / "apps" / "shadps4-manager" / "bc250_shadps4_manager" / "emulator.py"
ACQUIRE = SUITE / "apps" / "helixsr" / "bc250_bazzite_helixsr" / "acquire.py"
HELIXSR_REPO = "lonewolf0622/HelixSR"
# How the release notes name the fallback: "use [HelixSR 1.8.1](...)", earlier "use HelixSR 1.4.3".
FALLBACK_RE = re.compile(r"use \[?HelixSR v?(\d+\.\d+\.\d+)")
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


@dataclass
class Pin:
    """shadPS4's pin: the constants of emulator.py, as plain strings."""
    REPO: str
    VERSION: str
    TAG: str
    ASSET: str
    SHA256: str


def _string_constants(path: Path) -> dict[str, str]:
    """A module's top-level string constants, without importing it (the apps import PyQt6 and core)."""
    values = {}
    for node in ast.parse(path.read_text(encoding="utf-8")).body:
        if (isinstance(node, ast.Assign) and len(node.targets) == 1 and isinstance(node.targets[0], ast.Name)
                and isinstance(node.value, ast.Constant) and isinstance(node.value.value, str)):
            values[node.targets[0].id] = node.value.value
    return values


def load_shadps4_pin(path: Path = EMULATOR) -> Pin:
    """emulator.py's pin: its top-level string constants."""
    values = _string_constants(path)
    return Pin(**{name: values[name] for name in ("REPO", "VERSION", "TAG", "ASSET", "SHA256")})


@dataclass
class HelixPin:
    """What the HelixSR Manager knows of HelixSR: the constants of acquire.py."""
    KNOWN_VERSION: str
    FALLBACK_VERSION: str


def load_helixsr_pin(path: Path = ACQUIRE) -> HelixPin:
    values = _string_constants(path)
    return HelixPin(values["KNOWN_VERSION"], values["FALLBACK_VERSION"])


def _version(tag: str) -> tuple[int, ...]:
    parts = tag.lstrip("v.").split("-")[0].split(".")
    return tuple(int(p) for p in parts if p.isdigit())


@dataclass
class Report:
    pinned: str
    name: str = "Decky Loader"
    short: str = "Decky"
    held: str = "pinned"                        # HelixSR: "known", the newest release the app was checked against
    latest: str = ""
    drift: list[str] = field(default_factory=list)
    fine: list[str] = field(default_factory=list)

    def text(self) -> str:
        head = (f"{self.name}: {self.held} {self.pinned}, latest stable {self.latest or 'unknown'}. "
                + ("In step." if not self.drift else f"{self.short} moved:"))
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


def check_shadps4(pin: Pin, get: Fetch = fetch) -> Report:
    report = Report(pin.TAG, name="shadPS4", short="shadPS4")
    api = API.format(repo=pin.REPO)

    latest = json.loads(get(f"{api}/releases/latest"))
    report.latest = str(latest.get("tag_name", ""))
    if _version(report.latest) > _version(pin.TAG):
        version = report.latest.lstrip("v.")
        asset = pin.ASSET.replace(pin.VERSION, version)
        found = {a.get("name"): a for a in latest.get("assets", [])}.get(asset)
        if found is None:
            zip_line = f"it has no {asset}: look at its assets before pinning it."
        else:
            digest = str(found.get("digest") or "")
            zip_line = (f"for the pin: {asset}, {digest}" if digest.startswith("sha256:")
                        else f"{asset} is published without a SHA-256: check it before pinning it.")
        report.drift.append(f"{report.latest} is out ({str(latest.get('published_at', ''))[:10]}): a new version of "
                            f"the shadPS4 Manager pins it, after it is tried on the board; {zip_line} "
                            f"{latest.get('html_url', '')}")
    else:
        report.fine.append(f"no stable release newer than {pin.TAG}")

    pinned = json.loads(get(f"{api}/releases/tags/{pin.TAG}"))
    assets = {a.get("name"): a for a in pinned.get("assets", [])}
    digest = str(assets.get(pin.ASSET, {}).get("digest") or "")
    if pin.ASSET not in assets:
        report.drift.append(f"{pin.TAG} has no {pin.ASSET} any more.")
    elif digest != f"sha256:{pin.SHA256}":
        report.drift.append(f"{pin.TAG}'s {pin.ASSET} is published with {digest or 'no SHA-256'}, not the pinned "
                            f"sha256:{pin.SHA256}: the asset was replaced.")
    else:
        report.fine.append(f"{pin.TAG}'s {pin.ASSET} is still the pinned file")
    return report


def check_helixsr(pin: HelixPin, get: Fetch = fetch) -> Report:
    report = Report(f"v{pin.KNOWN_VERSION}", name="HelixSR", short="HelixSR", held="known")
    api = API.format(repo=HELIXSR_REPO)

    latest = json.loads(get(f"{api}/releases/latest"))
    report.latest = str(latest.get("tag_name", ""))
    version = report.latest.lstrip("v")
    if _version(report.latest) > _version(pin.KNOWN_VERSION):
        zips = [str(a.get("name")) for a in latest.get("assets", []) if str(a.get("name", "")).endswith(".zip")]
        zip_line = (f"its HelixSR-{version}.zip is there" if f"HelixSR-{version}.zip" in zips
                    else f"it has no HelixSR-{version}.zip (zips: {', '.join(zips) or 'none'}): the app needs one")
        report.drift.append(f"{report.latest} is out ({str(latest.get('published_at', ''))[:10]}): the HelixSR "
                            f"Manager already offers it; {zip_line}. Look at what changed (setup options, the files "
                            f"in the zip, helixsr.ini), try it on the board, then set KNOWN_VERSION to {version}. "
                            f"{latest.get('html_url', '')}")
    else:
        report.fine.append(f"no stable release newer than {pin.KNOWN_VERSION}")

    named = FALLBACK_RE.search(str(latest.get("body") or ""))
    if named is None:
        report.fine.append(f"{report.latest}'s notes name no fallback")
    elif named.group(1) != pin.FALLBACK_VERSION:
        report.drift.append(f"{report.latest}'s notes name HelixSR {named.group(1)} as the fallback, the app offers "
                            f"{pin.FALLBACK_VERSION} (FALLBACK_VERSION).")
    else:
        report.fine.append(f"{report.latest}'s notes name the app's fallback, {pin.FALLBACK_VERSION}")

    try:
        fallback = json.loads(get(f"{api}/releases/tags/v{pin.FALLBACK_VERSION}"))
    except CheckError as error:
        if ": GitHub answered 404" not in str(error):
            raise
        report.drift.append(f"the fallback v{pin.FALLBACK_VERSION} is gone from GitHub.")
    else:
        if not any(str(a.get("name", "")).endswith(".zip") for a in fallback.get("assets", [])):
            report.drift.append(f"the fallback v{pin.FALLBACK_VERSION} has no zip any more.")
        else:
            report.fine.append(f"the fallback v{pin.FALLBACK_VERSION} still has its zip")
    return report


CHECKS = {"decky": ("Decky Loader", lambda: check(load_loader())),
          "shadps4": ("shadPS4", lambda: check_shadps4(load_shadps4_pin())),
          "helixsr": ("HelixSR", lambda: check_helixsr(load_helixsr_pin()))}


def main(names: list[str] | None = None) -> int:
    names = names or list(CHECKS)
    unknown = [n for n in names if n not in CHECKS]
    if unknown:
        print(f"Unknown: {', '.join(unknown)}; known: {', '.join(CHECKS)}", file=sys.stderr)
        return 2
    code = 0
    for name in names:
        title, run = CHECKS[name]
        try:
            report = run()
        except (CheckError, ValueError) as error:
            print(f"{title} could not be checked: {error}", file=sys.stderr)
            code = 2
            continue
        text = report.text()
        print(text)
        summary = os.environ.get("GITHUB_STEP_SUMMARY")
        if summary:
            with open(summary, "a", encoding="utf-8") as out:
                out.write("```\n" + text + "\n```\n")
        if report.drift and code == 0:
            code = 1
    return code


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
