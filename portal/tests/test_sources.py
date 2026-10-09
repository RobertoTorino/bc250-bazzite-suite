# SPDX-License-Identifier: GPL-3.0-or-later
from __future__ import annotations

import hashlib
import io
import shutil
import tarfile
from dataclasses import replace
from pathlib import Path

import pytest

from bc250_portal.manifest import AppEntry
from bc250_portal.sources import (
    Records, SourceError, Sources, expected_sha256, is_installed, safe_extract,
)
from conftest import SUITE

ENTRY = AppEntry(key="cu-bisect", name="CU", summary="s", tag="cu-bisect-v1.0.0", install=("bash install.sh",),
                 uninstall=("bash install.sh --uninstall",), detect=("~/.local/bin/bc250-bisect-gui",))


def make_tarball(path: Path, files: dict[str, bytes], top: str = "cu-bisect-v1.0.0") -> str:
    with tarfile.open(path, "w:gz") as tar:
        for name, data in files.items():
            info = tarfile.TarInfo(f"{top}/{name}" if top else name)
            info.size = len(data)
            tar.addfile(info, io.BytesIO(data))
    return hashlib.sha256(path.read_bytes()).hexdigest()


class FakeRelease:
    """Serves release assets from a folder, recording the URLs asked for."""

    def __init__(self, folder: Path):
        self.folder, self.urls = folder, []

    def __call__(self, url: str, dest: Path) -> None:
        self.urls.append(url)
        src = self.folder / url.rsplit("/", 1)[1]
        if not src.is_file():
            raise OSError(f"404 {url}")
        shutil.copy(src, dest)


def test_expected_sha256():
    sums = "aa" * 32 + "  cu-bisect-v1.0.0.tar.gz\n" + "bb" * 32 + " *other.tar.gz\n"
    assert expected_sha256(sums, "cu-bisect-v1.0.0.tar.gz") == "aa" * 32
    assert expected_sha256(sums, "other.tar.gz") == "bb" * 32
    assert expected_sha256(sums, "missing.tar.gz") == ""


def test_release_download_verified_with_sha256sums(tmp_path):
    assets = tmp_path / "assets"
    assets.mkdir()
    digest = make_tarball(assets / ENTRY.asset, {"install.sh": b"echo hi\n"})
    (assets / "SHA256SUMS").write_text(f"{digest}  {ENTRY.asset}\n")
    fake = FakeRelease(assets)
    sources = Sources(tmp_path / "work", repo_url="https://github.com/o/r", download=fake)
    folder = sources.prepare(ENTRY)
    assert (folder / "install.sh").read_bytes() == b"echo hi\n"
    assert fake.urls == ["https://github.com/o/r/releases/download/cu-bisect-v1.0.0/cu-bisect-v1.0.0.tar.gz",
                         "https://github.com/o/r/releases/download/cu-bisect-v1.0.0/SHA256SUMS"]
    fake.urls.clear()
    assert sources.prepare(ENTRY) == folder and fake.urls == []        # a tag never changes: reused
    sources.forget(ENTRY)
    assert not folder.exists()


def test_pinned_sha256_wins_and_mismatch_refuses(tmp_path):
    assets = tmp_path / "assets"
    assets.mkdir()
    digest = make_tarball(assets / ENTRY.asset, {"install.sh": b"x"})
    pinned = replace(ENTRY, sha256=digest)
    fake = FakeRelease(assets)
    Sources(tmp_path / "w1", download=fake).prepare(pinned)
    assert not any(u.endswith("SHA256SUMS") for u in fake.urls)
    wrong = replace(ENTRY, sha256="0" * 64)
    with pytest.raises(SourceError, match="does not match its checksum"):
        Sources(tmp_path / "w2", download=fake).prepare(wrong)
    assert not (tmp_path / "w2" / ENTRY.tag).exists()


def test_download_errors(tmp_path):
    with pytest.raises(SourceError, match="could not download"):
        Sources(tmp_path / "w", download=FakeRelease(tmp_path)).prepare(ENTRY)


def test_wrong_top_folder(tmp_path):
    assets = tmp_path / "assets"
    assets.mkdir()
    digest = make_tarball(assets / ENTRY.asset, {"install.sh": b"x"}, top="something-else")
    pinned = replace(ENTRY, sha256=digest)
    with pytest.raises(SourceError, match="has no cu-bisect-v1.0.0/ folder"):
        Sources(tmp_path / "w", download=FakeRelease(assets)).prepare(pinned)


@pytest.mark.parametrize("name", ["../evil.sh", "/tmp/evil.sh"])
def test_safe_extract_refuses_escapes(tmp_path, name):
    archive = tmp_path / "a.tar.gz"
    make_tarball(archive, {name: b"x"}, top="")
    with pytest.raises(SourceError, match="outside"):
        safe_extract(archive, tmp_path / "out")
    assert not (tmp_path / "evil.sh").exists()


def test_safe_extract_refuses_links_out(tmp_path):
    archive = tmp_path / "a.tar.gz"
    with tarfile.open(archive, "w:gz") as tar:
        link = tarfile.TarInfo("top/passwd")
        link.type, link.linkname = tarfile.SYMTYPE, "../../../etc/passwd"
        tar.addfile(link)
    with pytest.raises(SourceError, match="link"):
        safe_extract(archive, tmp_path / "out")


def test_checkout_stages_app_with_core(tmp_path):
    sources = Sources(tmp_path / "work", checkout=SUITE)
    bt = AppEntry(key="bazzite-test", name="BT", summary="s", tag="bazzite-test-v0.1.0", install=("x",),
                  uninstall=("y",), detect=("z",))
    folder = sources.prepare(bt)
    assert folder.name == "local-bazzite-test"
    assert (folder / "install.sh").is_file() and (folder / "bc250_gui" / "__init__.py").is_file()
    assert (folder / "bc250_core" / "widgets.py").is_file()                 # bundled: bazzite-test uses core
    assert not (folder / "bc250_core" / "__pycache__").exists()
    acpi = AppEntry(key="persistent-acpi", name="A", summary="s", tag="persistent-acpi-v0.1.0", install=("x",),
                    uninstall=("y",), detect=("z",))
    acpi_folder = sources.prepare(acpi)
    assert (acpi_folder / "tables" / "acpi_override.cpio").is_file()
    assert not (acpi_folder / "bc250_core").exists()                         # shell only: no core


def test_suite_checkout(tmp_path, monkeypatch):
    import bc250_portal
    assert bc250_portal.suite_checkout() == SUITE                           # running from the checkout
    installed = tmp_path / "opt" / "bc250-bazzite-suite"
    installed.mkdir(parents=True)
    monkeypatch.setattr(bc250_portal, "ROOT", installed)
    assert bc250_portal.suite_checkout() is None                            # a release install
    (installed / bc250_portal.CHECKOUT_FILE).write_text(f"{SUITE}\n")
    assert bc250_portal.suite_checkout() == SUITE                           # installed from the checkout
    (installed / bc250_portal.CHECKOUT_FILE).write_text(f"{tmp_path}\n")
    assert bc250_portal.suite_checkout() is None                            # a moved or deleted checkout


def test_is_installed(home):
    assert not is_installed(ENTRY)
    (home / ".local" / "bin" / "bc250-bisect-gui").write_text("#!/bin/sh\n")
    assert is_installed(ENTRY)


def test_records_round_trip(tmp_path):
    path = tmp_path / "state" / "installed.json"
    records = Records(path)
    assert records.get("cu-bisect") == ""
    records.set("cu-bisect", "cu-bisect-v1.0.0")
    records.set("governor", "local")
    again = Records(path)
    assert (again.get("cu-bisect"), again.get("governor")) == ("cu-bisect-v1.0.0", "local")
    again.remove("cu-bisect")
    assert Records(path).get("cu-bisect") == ""
    path.write_text("not json")
    assert Records(path).get("governor") == ""
