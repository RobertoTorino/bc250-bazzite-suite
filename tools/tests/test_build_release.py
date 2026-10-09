# SPDX-License-Identifier: GPL-3.0-or-later
"""tools/build_release.py: layout, modes, checksums and reproducibility of the release tarballs."""

from __future__ import annotations

import hashlib
import importlib.util
import shutil
import sys
import tarfile
from pathlib import Path

import pytest

TOOLS = Path(__file__).resolve().parent.parent
spec = importlib.util.spec_from_file_location("build_release", TOOLS / "build_release.py")
br = importlib.util.module_from_spec(spec)
sys.modules[spec.name] = br
spec.loader.exec_module(br)

BT_TAG = f"bazzite-test-v{(TOOLS.parent / 'apps' / 'bazzite-test' / 'VERSION').read_text().strip()}"
PORTAL_TAG = f"portal-v{(TOOLS.parent / 'portal' / 'VERSION').read_text().strip()}"


@pytest.fixture(autouse=True)
def fixed_epoch(monkeypatch):
    monkeypatch.setenv("SOURCE_DATE_EPOCH", "1790000000")


@pytest.fixture(scope="module")
def bt_release(tmp_path_factory):
    import os
    os.environ["SOURCE_DATE_EPOCH"] = "1790000000"
    out = tmp_path_factory.mktemp("bt")
    br.build(BT_TAG, out)
    return out


def members(archive: Path) -> dict[str, tarfile.TarInfo]:
    with tarfile.open(archive, "r:gz") as tar:
        return {m.name: m for m in tar.getmembers()}


def read(archive: Path, name: str) -> bytes:
    with tarfile.open(archive, "r:gz") as tar:
        return tar.extractfile(name).read()


def test_bazzite_test_layout(bt_release):
    archive = bt_release / f"{BT_TAG}.tar.gz"
    names = members(archive)
    top = BT_TAG
    assert {f"{top}/install.sh", f"{top}/test-bazzite.sh", f"{top}/bc250_gui/__main__.py",
            f"{top}/bc250_core/widgets.py", f"{top}/bc250_gui/_build_info.py"} <= set(names)
    assert all(n == top or n.startswith(top + "/") for n in names)
    assert not any("/tests/" in n or "__pycache__" in n or n.endswith(".pyc") for n in names)
    engine = read(archive, f"{top}/test-bazzite.sh")
    info = read(archive, f"{top}/bc250_gui/_build_info.py").decode()
    assert hashlib.sha256(engine).hexdigest() in info              # release build: engine hash recorded
    manual = (TOOLS.parent / "docs" / "apps" / "bazzite-test.md").read_bytes()
    assert read(archive, f"{top}/MANUAL.md") == manual                # its chapter of the manual


def test_modes_and_owner(bt_release):
    names = members(bt_release / f"{BT_TAG}.tar.gz")
    top = BT_TAG
    assert names[f"{top}/install.sh"].mode == 0o755
    assert names[f"{top}/test-bazzite.sh"].mode == 0o755
    assert names[f"{top}/bc250_gui/__init__.py"].mode == 0o644
    assert names[f"{top}/bc250_gui"].mode == 0o755 and names[f"{top}/bc250_gui"].isdir()
    assert {(m.uid, m.gid, m.uname) for m in names.values()} == {(0, 0, "root")}
    assert {m.mtime for m in names.values()} == {1790000000}


def test_sums_and_notes(bt_release):
    archive = bt_release / f"{BT_TAG}.tar.gz"
    digest = hashlib.sha256(archive.read_bytes()).hexdigest()
    assert (bt_release / "SHA256SUMS").read_text() == f"{digest}  {archive.name}\n"
    notes = (bt_release / "notes.md").read_text()
    assert f"cd {BT_TAG} && ./install.sh" in notes and digest in notes


def test_reproducible(bt_release, tmp_path):
    br.build(BT_TAG, tmp_path)
    assert (tmp_path / f"{BT_TAG}.tar.gz").read_bytes() == (bt_release / f"{BT_TAG}.tar.gz").read_bytes()


def test_version_must_match(tmp_path):
    with pytest.raises(SystemExit, match="bump it before tagging"):
        br.build("bazzite-test-v9.9.9", tmp_path)
    with pytest.raises(SystemExit, match="is not <app>-v"):
        br.build("bazzite-test-9.9.9", tmp_path)


def test_portal_needs_and_verifies_bundle(bt_release, tmp_path):
    with pytest.raises(SystemExit, match="needs --bundle"):
        br.build(PORTAL_TAG, tmp_path / "a")
    br.build(PORTAL_TAG, tmp_path / "b", bundle=bt_release)
    archive = tmp_path / "b" / f"{PORTAL_TAG}.tar.gz"
    names = members(archive)
    assert f"{PORTAL_TAG}/bundled/{BT_TAG}/install.sh" in names
    assert f"{PORTAL_TAG}/bundled/{BT_TAG}/bc250_gui/_build_info.py" in names
    assert f"{PORTAL_TAG}/bc250_core/platform.py" in names and f"{PORTAL_TAG}/apps.toml" in names
    assert BT_TAG in (tmp_path / "b" / "notes.md").read_text()


def test_tampered_bundle_refused(bt_release, tmp_path):
    bundle = tmp_path / "bundle"
    shutil.copytree(bt_release, bundle)
    data = bytearray((bundle / f"{BT_TAG}.tar.gz").read_bytes())
    data[-10] ^= 0xFF
    (bundle / f"{BT_TAG}.tar.gz").write_bytes(bytes(data))
    with pytest.raises(SystemExit, match="does not match"):
        br.build(PORTAL_TAG, tmp_path / "out", bundle=bundle)


def test_latest_changes(tmp_path):
    log = tmp_path / "CHANGELOG"
    log.write_text("Changelog: 08-10-2026\n\nNew thing.\n\nChangelog: 07-10-2026\n\nOld thing.\n")
    assert br.latest_changes(log) == "Changelog: 08-10-2026\n\nNew thing."
    log.write_text("# Changelog\n\n## 0.2.0\n\nA\n\n## 0.1.0\n\nB\n")
    assert br.latest_changes(log) == "## 0.2.0\n\nA"
