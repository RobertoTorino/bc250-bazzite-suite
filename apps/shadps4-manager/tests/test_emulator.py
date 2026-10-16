# SPDX-License-Identifier: GPL-3.0-or-later
"""Installing the pinned shadPS4 (emulator.py) from a zip made here instead of the download: checked against its
SHA-256 first, "current" switched, older versions removed, and nothing changed when a step fails."""

from __future__ import annotations

import hashlib
import io
import urllib.error
import zipfile
from pathlib import Path

import pytest

from bc250_shadps4_manager import emulator


def _zip(member: str = emulator.MEMBER, data: bytes = b"#!/bin/sh\necho shadPS4\n") -> bytes:
    out = io.BytesIO()
    with zipfile.ZipFile(out, "w") as packed:
        packed.writestr(member, data)
    return out.getvalue()


def _fetch(payload: bytes, calls: list | None = None):
    def fetch(url: str, dest: Path, progress=None) -> None:
        if calls is not None:
            calls.append(url)
        dest.write_bytes(payload)
    return fetch


@pytest.fixture
def pinned(monkeypatch):
    """The zip the tests use, pinned as the release."""
    payload = _zip()
    monkeypatch.setattr(emulator, "SHA256", hashlib.sha256(payload).hexdigest())
    return payload


def test_the_pin_points_at_the_release():
    assert emulator.URL == ("https://github.com/shadps4-emu/shadPS4/releases/download/v.0.20.0/"
                            "shadps4-linux-sdl-0.20.0.zip")
    assert len(emulator.SHA256) == 64 and emulator.TAG.endswith(emulator.VERSION)


def test_install_and_remove(tmp_path, pinned):
    home = tmp_path / "emulator"
    assert emulator.installed_version(home) == ""
    calls = []
    assert emulator.install(home, _fetch(pinned, calls)) == f"shadPS4 {emulator.VERSION} is installed."
    assert calls == [emulator.URL]
    image = emulator.appimage(home)
    assert image.read_bytes().startswith(b"#!/bin/sh") and image.stat().st_mode & 0o777 == 0o755
    assert (home / "current").is_symlink() and emulator.installed_version(home) == emulator.VERSION
    assert sorted(p.name for p in home.iterdir()) == ["0.20.0", "current"]       # no download left behind
    emulator.remove(home)
    assert not home.exists() and emulator.installed_version(home) == ""


def test_an_older_version_is_replaced(tmp_path, pinned):
    home = tmp_path / "emulator"
    (home / "0.18.0").mkdir(parents=True)
    (home / "0.18.0" / emulator.MEMBER).write_text("old")
    (home / "current").symlink_to("0.18.0")
    assert emulator.installed_version(home) == "0.18.0"
    emulator.install(home, _fetch(pinned))
    assert emulator.installed_version(home) == emulator.VERSION and not (home / "0.18.0").exists()


@pytest.mark.parametrize("payload, message", [
    (b"something else", "SHA-256 differs"),
])
def test_a_different_file_is_refused(tmp_path, pinned, payload, message):
    home = tmp_path / "emulator"
    with pytest.raises(emulator.EmulatorError, match=message):
        emulator.install(home, _fetch(payload))
    assert emulator.installed_version(home) == "" and not list(home.iterdir())


def test_a_zip_without_the_appimage_or_damaged(tmp_path, monkeypatch):
    home = tmp_path / "emulator"
    for payload, message in ((_zip("other.AppImage"), "has no Shadps4-sdl.AppImage"), (b"PK\x03\x04broken", "damaged")):
        monkeypatch.setattr(emulator, "SHA256", hashlib.sha256(payload).hexdigest())
        with pytest.raises(emulator.EmulatorError, match=message):
            emulator.install(home, _fetch(payload))
        assert not list(home.iterdir())


def test_download_errors_say_what_happened(tmp_path):
    def http(url, dest, progress=None):
        raise urllib.error.HTTPError(url, 404, "Not Found", {}, None)

    def offline(url, dest, progress=None):
        raise urllib.error.URLError("Name or service not known")
    with pytest.raises(emulator.EmulatorError, match="GitHub answered 404"):
        emulator.install(tmp_path, http)
    with pytest.raises(emulator.EmulatorError, match="download failed: Name or service not known"):
        emulator.install(tmp_path, offline)


def _releases(tag: str):
    """GitHub's answer for /releases/latest (only stable releases)."""
    def fetch(url: str):
        assert url == "https://api.github.com/repos/shadps4-emu/shadPS4/releases/latest"
        return {"tag_name": tag, "html_url": f"https://github.com/shadps4-emu/shadPS4/releases/tag/{tag}",
                "published_at": "2026-11-20T10:00:00Z", "assets": []}
    return fetch


def test_a_newer_shadps4_release():
    newer = emulator.newer_release(_releases("v.0.21.0"))
    assert (newer.version, newer.published) == ("0.21.0", "2026-11-20") and newer.url.endswith("/v.0.21.0")
    assert emulator.newer_release(_releases(emulator.TAG)) is None                 # the one the app brings
    assert emulator.newer_release(_releases("v.0.19.0")) is None

    def offline(url: str):
        raise urllib.error.URLError("no network")
    assert emulator.newer_release(offline) is None                                 # nothing to say then


# --- The nightly channel ----------------------------------------------------------------------------------------

def _build(when: str, commit: str = "b2d7ec7", sha: str | None = "ab" * 32, prerelease: bool = True) -> dict:
    """One release as GitHub lists it: the rolling pre-release with its linux-sdl zip (and its digest)."""
    name = f"shadps4-linux-sdl-{when}-{commit}.zip"
    asset = {"name": name, "size": 33253746,
             "browser_download_url": f"https://github.com/shadps4-emu/shadPS4/releases/download/x/{name}"}
    if sha is not None:
        asset["digest"] = f"sha256:{sha}"
    return {"tag_name": f"Pre-release-shadPS4-{when}-{commit}", "prerelease": prerelease,
            "published_at": f"{when}T08:00:00Z",
            "html_url": f"https://github.com/shadps4-emu/shadPS4/releases/tag/Pre-release-shadPS4-{when}-{commit}",
            "assets": [asset, {"name": f"shadps4-win64-sdl-{when}-{commit}.zip", "size": 1,
                               "digest": "sha256:" + "cd" * 32, "browser_download_url": "x"}]}


def _listing(*builds: dict):
    def fetch(url: str):
        assert url == "https://api.github.com/repos/shadps4-emu/shadPS4/releases?per_page=30"
        return list(builds)
    return fetch


def test_the_newest_nightly_with_its_checksum():
    stable = {"tag_name": "v.0.19.0", "prerelease": False, "published_at": "2026-10-02T08:00:00Z", "html_url": "x",
              "assets": [{"name": "shadps4-linux-sdl-0.19.0.zip", "size": 1, "digest": "sha256:" + "ef" * 32,
                          "browser_download_url": "x"}]}
    nightly = emulator.latest_nightly(_listing(_build("2026-10-14", "aaaaaaa"), _build("2026-10-15"), stable))
    assert (nightly.version, nightly.tag) == ("2026-10-15-b2d7ec7",             # the last published pre-release
                                              "Pre-release-shadPS4-2026-10-15-b2d7ec7")
    assert nightly.asset == "shadps4-linux-sdl-2026-10-15-b2d7ec7.zip"          # the Linux zip, not the Windows one
    assert nightly.sha256 == "ab" * 32 and nightly.size == 33253746
    assert nightly.published == "2026-10-15" and nightly.page.endswith("Pre-release-shadPS4-2026-10-15-b2d7ec7")


def test_a_nightly_needs_githubs_checksum():
    with pytest.raises(emulator.EmulatorError, match="no nightly build with a checksum"):
        emulator.latest_nightly(_listing(_build("2026-10-15", sha=None)))
    with pytest.raises(emulator.EmulatorError, match="no nightly build"):
        emulator.latest_nightly(_listing())

    def offline(url: str):
        raise urllib.error.URLError("no network")
    with pytest.raises(emulator.EmulatorError, match="could not be asked"):
        emulator.latest_nightly(offline)


def test_install_a_nightly_build(tmp_path):
    payload = _zip(data=b"#!/bin/sh\necho nightly\n")
    nightly = emulator.latest_nightly(_listing(_build("2026-10-15", sha=hashlib.sha256(payload).hexdigest())))
    home = tmp_path / "emulator"
    assert emulator.install_build(home, nightly, _fetch(payload)) == \
        "shadPS4 nightly 2026-10-15-b2d7ec7 is installed."
    assert emulator.installed_version(home) == "2026-10-15-b2d7ec7"
    assert emulator.appimage(home).name == emulator.MEMBER                      # the zip's member, as the release's
    with pytest.raises(emulator.EmulatorError, match="SHA-256 differs"):
        emulator.install_build(home, nightly, _fetch(b"something else"))
    assert emulator.installed_version(home) == "2026-10-15-b2d7ec7"             # the failed install changed nothing
