# SPDX-License-Identifier: GPL-3.0-or-later
"""tools/check_upstream.py on a fake GitHub: in step, a newer Decky release, a replaced asset, a changed service unit
(at the pinned tag or only on main), no network; and the same for shadPS4's pin, read from emulator.py."""

from __future__ import annotations

import json
import sys
from pathlib import Path

import pytest

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

import check_upstream  # noqa: E402

LOADER = check_upstream.load_loader()
UNIT = LOADER.unit_text(check_upstream.TEMPLATE).encode()
API = check_upstream.API.format(repo=LOADER.REPO)
PIN = check_upstream.load_shadps4_pin()
SHAD_API = check_upstream.API.format(repo=PIN.REPO)


def github(latest: str = LOADER.TAG, digest: str = f"sha256:{LOADER.SHA256}", unit_at_tag: bytes = UNIT,
           unit_on_main: bytes = UNIT):
    answers = {
        f"{API}/releases/latest": json.dumps({"tag_name": latest, "published_at": "2026-11-02T10:00:00Z",
                                              "html_url": f"https://github.com/{LOADER.REPO}/releases/tag/{latest}"}),
        f"{API}/releases/tags/{LOADER.TAG}": json.dumps({"assets": [{"name": "PluginLoader", "digest": digest}]}),
        check_upstream.RAW.format(repo=LOADER.REPO, ref=LOADER.TAG): unit_at_tag,
        check_upstream.RAW.format(repo=LOADER.REPO, ref="main"): unit_on_main,
    }

    def get(url: str) -> bytes:
        answer = answers[url]
        return answer if isinstance(answer, bytes) else answer.encode()
    return get


def test_the_template_is_deckys_file():
    """unit_text() with ${HOMEBREW_FOLDER} as the folder is Decky's file before its installer fills it in."""
    assert b"ExecStart=${HOMEBREW_FOLDER}/services/PluginLoader\n" in UNIT


def test_in_step():
    report = check_upstream.check(LOADER, github())
    assert report.drift == [] and len(report.fine) == 4
    assert report.text().startswith(f"Decky Loader: pinned {LOADER.TAG}, latest stable {LOADER.TAG}. In step.")


@pytest.mark.parametrize("latest, moved", [("v3.2.11", True), ("v3.3.0", True), ("v4.0.0", True),
                                           ("v3.2.9", False), (LOADER.TAG, False)])
def test_a_newer_release(latest, moved):
    report = check_upstream.check(LOADER, github(latest=latest))
    assert bool(report.drift) == moved
    if moved:
        assert report.drift[0].startswith(f"{latest} is out (2026-11-02)") and "Decky moved:" in report.text()


def test_a_replaced_asset():
    report = check_upstream.check(LOADER, github(digest="sha256:" + "0" * 64))
    assert len(report.drift) == 1 and "the asset was replaced" in report.drift[0]


def test_a_changed_unit_on_main_only():
    changed = UNIT.replace(b"LOG_LEVEL=INFO", b"LOG_LEVEL=INFO\nEnvironment=NEW=1")
    report = check_upstream.check(LOADER, github(unit_on_main=changed))
    assert len(report.drift) == 1 and report.drift[0].startswith("main's (Decky's updater installs it)")
    report = check_upstream.check(LOADER, github(unit_at_tag=changed, unit_on_main=changed))
    assert len(report.drift) == 2


def test_exit_codes(monkeypatch, capsys, tmp_path):
    summary = tmp_path / "summary.md"
    monkeypatch.setenv("GITHUB_STEP_SUMMARY", str(summary))
    real = check_upstream.check
    monkeypatch.setattr(check_upstream, "check", lambda loader: real(loader, github()))
    assert check_upstream.main(["decky"]) == 0 and "In step." in summary.read_text()
    monkeypatch.setattr(check_upstream, "check", lambda loader: real(loader, github("v3.3.0")))
    assert check_upstream.main(["decky"]) == 1

    def offline(loader):
        raise check_upstream.CheckError("https://api.github.com/...: GitHub answered 403")
    monkeypatch.setattr(check_upstream, "check", offline)
    assert check_upstream.main(["decky"]) == 2 and "could not be checked" in capsys.readouterr().err
    assert check_upstream.main(["nothing"]) == 2 and "Unknown: nothing" in capsys.readouterr().err


# --- shadPS4 ----------------------------------------------------------------------------------------------------

def shad_github(latest: str = PIN.TAG, digest: str = f"sha256:{PIN.SHA256}",
                new_digest: str | None = "sha256:" + "ab" * 32):
    version = latest.lstrip("v.")
    new_assets = [{"name": PIN.ASSET.replace(PIN.VERSION, version), "digest": new_digest},
                  {"name": f"shadps4-win64-sdl-{version}.zip", "digest": "sha256:" + "cd" * 32}]
    answers = {
        f"{SHAD_API}/releases/latest": {"tag_name": latest, "published_at": "2026-11-20T10:00:00Z",
                                         "html_url": f"https://github.com/{PIN.REPO}/releases/tag/{latest}",
                                         "assets": new_assets},
        f"{SHAD_API}/releases/tags/{PIN.TAG}": {"assets": [{"name": PIN.ASSET, "digest": digest}]},
    }
    return lambda url: json.dumps(answers[url]).encode()


def test_the_shadps4_pin_is_read_from_emulator_py():
    assert PIN.REPO == "shadps4-emu/shadPS4" and PIN.TAG == f"v.{PIN.VERSION}" and PIN.VERSION in PIN.ASSET
    assert len(PIN.SHA256) == 64


def test_shadps4_in_step():
    report = check_upstream.check_shadps4(PIN, shad_github())
    assert report.drift == [] and len(report.fine) == 2
    assert report.text().startswith(f"shadPS4: pinned {PIN.TAG}, latest stable {PIN.TAG}. In step.")


@pytest.mark.parametrize("bump", [(0, 0, 1), (0, 1, 0), (1, 0, 0)])
def test_a_newer_shadps4_gives_what_the_pin_needs(bump):
    major, minor, patch = (int(p) for p in PIN.VERSION.split("."))
    latest = f"v.{major + bump[0]}.{minor + bump[1]}.{patch + bump[2]}"
    report = check_upstream.check_shadps4(PIN, shad_github(latest))
    assert len(report.drift) == 1 and "shadPS4 moved:" in report.text()
    assert report.drift[0].startswith(f"{latest} is out (2026-11-20)")
    assert f"for the pin: {PIN.ASSET.replace(PIN.VERSION, latest[2:])}, sha256:{'ab' * 32}" in report.drift[0]
    report = check_upstream.check_shadps4(PIN, shad_github(latest, new_digest=None))
    assert "published without a SHA-256" in report.drift[0]


def test_an_older_shadps4_is_not_newer():
    assert check_upstream.check_shadps4(PIN, shad_github("v.0.18.0")).drift == []


def test_a_replaced_shadps4_zip():
    report = check_upstream.check_shadps4(PIN, shad_github(digest="sha256:" + "0" * 64))
    assert len(report.drift) == 1 and "the asset was replaced" in report.drift[0]
