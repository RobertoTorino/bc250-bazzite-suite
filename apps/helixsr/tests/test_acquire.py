# SPDX-License-Identifier: GPL-3.0-or-later
"""acquire.py with file:// URLs and a fake helixsr-setup.sh: no network, no Proton."""

from __future__ import annotations

import hashlib
import io
import json
import tarfile
import zipfile
from pathlib import Path
from unittest import mock

import pytest

from bc250_bazzite_helixsr import acquire, backend
from bc250_bazzite_helixsr.acquire import (
    Pin, ReleaseInfo, SetupRequest, SetupWorker, UpdateStatus, download, extract_zip, find_dlss_dlls, latest_release,
    needed_pins, parse_pins, unpack_dxc, unpack_python,
)
from tests.conftest import FAKE_DLL

DLSS_BYTES = b"MZ-fake-nvngx-dlss-310.7.0"
DLSS_SHA = hashlib.sha256(DLSS_BYTES).hexdigest()


def sha(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def make_dxc_zip(path: Path) -> bytes:
    buf = io.BytesIO()
    with zipfile.ZipFile(buf, "w") as zf:
        zf.writestr("bin\\x64\\dxc.exe", b"MZ-dxc")
        zf.writestr("bin\\x64\\dxcompiler.dll", b"MZ-dxcompiler")
        zf.writestr("inc\\dxcapi.h", b"// header")
    path.write_bytes(buf.getvalue())
    return buf.getvalue()


def make_python_tgz(path: Path) -> bytes:
    buf = io.BytesIO()
    with tarfile.open(fileobj=buf, mode="w:gz") as tar:
        info = tarfile.TarInfo("python/bin/python3")
        info.size, info.mode = 5, 0o755
        tar.addfile(info, io.BytesIO(b"#!py\n"))
    path.write_bytes(buf.getvalue())
    return buf.getvalue()


def make_release_zip(tmp_path: Path, pins: dict[str, tuple[str, str]], script_body: str) -> tuple[Path, bytes]:
    """A HelixSR-like release zip whose scripts pin the given (url, sha) per key and whose setup script is ours."""
    setup_sh = (
        "#!/usr/bin/env bash\n"
        f"PY_URL='{pins['python'][0]}'\nPY_SHA='{pins['python'][1]}'\n"
        f"DXCWIN_URL='{pins['dxc'][0]}'\nDXCWIN_SHA='{pins['dxc'][1]}'\n"
        + script_body)
    setup_py = f"DLSS_URL = '{pins['dlss'][0]}'\nDLSS_SHA256 = '{pins['dlss'][1]}'\n"
    buf = io.BytesIO()
    with zipfile.ZipFile(buf, "w") as zf:
        zf.writestr("HelixSR-1.2.0/helixsr-setup.sh", setup_sh)
        zf.writestr("HelixSR-1.2.0/setup/helixsr_setup.py", setup_py)
        zf.writestr("HelixSR-1.2.0/amd_fidelityfx_dx12.dll", FAKE_DLL)
        zf.writestr("HelixSR-1.2.0/helixsr.ini", backend.DEFAULT_INI_TEXT)
        zf.writestr("HelixSR-1.2.0/README.md", "**Version 1.2.0**\n")
    path = tmp_path / "HelixSR-1.2.0.zip"
    path.write_bytes(buf.getvalue())
    return path, buf.getvalue()


# The fake script records its arguments and writes the network files, like the real one does on success.
GOOD_SCRIPT = """
HERE=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
echo "[fake-setup] args: $*"
echo "[fake-setup] XDG_DATA_HOME=$XDG_DATA_HOME"
printf '%s\\n' "$*" > "$HERE/args.txt"
for a in "$@"; do if [ "$prev" = "--dlss" ]; then cp "$a" "$HERE/dlss-used.bin"; fi; prev=$a; done
echo weights > "$HERE/helixsr_weights.bin"
echo kernels > "$HERE/helixsr_kernels.pak"
"""
BAD_SCRIPT = "echo '[fake-setup] boom' >&2\nexit 3\n"


# ------------------------------------------------------------------------------------------ releases
def test_latest_release_parses_github_json():
    payload = {"tag_name": "v1.2.0", "html_url": "https://x/rel", "published_at": "2026-10-06T23:04:52Z",
               "assets": [{"name": "HelixSR-1.2.0.zip", "browser_download_url": "https://x/z.zip", "size": 2315352}]}
    with mock.patch.object(acquire, "_get_json", return_value=payload):
        info = latest_release("api", "page")
    assert info == ReleaseInfo("1.2.0", "v1.2.0", "https://x/rel", "2026-10-06", "HelixSR-1.2.0.zip", "https://x/z.zip",
                               2315352)
    with mock.patch.object(acquire, "_get_json", side_effect=OSError("no route")):
        assert "no connection" in latest_release("api", "page").error
    with mock.patch.object(acquire, "_get_json", return_value={"tag_name": "latest"}):
        assert "unexpected tag" in latest_release("api", "page").error


def test_update_status():
    latest = ReleaseInfo("1.2.0", "v1.2.0", "u", "2026-10-06")
    assert UpdateStatus("x", "1.1.0", latest).update_available and UpdateStatus("x", "1.1.0", latest).kind == "warn"
    assert not UpdateStatus("x", "1.2.0", latest).update_available and UpdateStatus("x", "1.2.0", latest).kind == "ok"
    assert UpdateStatus("x", "", latest).kind == "info"
    assert "unknown" in UpdateStatus("x", "1.0.0", ReleaseInfo(error="GitHub answered 403")).summary
    assert "→ 1.2.0" in UpdateStatus("x", "1.1.0", latest).summary


# ------------------------------------------------------------------------------------------ download
def test_download_verifies_checksum(tmp_path):
    src = tmp_path / "src.bin"
    src.write_bytes(b"x" * 1000)
    seen = []
    out = download(src.as_uri(), tmp_path / "out" / "dst.bin", sha(b"x" * 1000), progress=lambda *a: seen.append(a))
    assert out.read_bytes() == b"x" * 1000 and seen[-1][1] == 1000
    with pytest.raises(backend.HelixError, match="checksum"):
        download(src.as_uri(), tmp_path / "bad.bin", "0" * 64)
    assert not (tmp_path / "bad.bin").exists() and not (tmp_path / "bad.bin.part").exists()
    with pytest.raises(backend.HelixError):
        download((tmp_path / "missing").as_uri(), tmp_path / "x.bin")
    with pytest.raises(acquire.Aborted):
        download(src.as_uri(), tmp_path / "c.bin", cancelled=lambda: True)


def test_parse_pins_and_extract(tmp_path):
    pins = {"dlss": ("https://n/nvngx_dlss.dll", "a" * 64), "dxc": ("https://m/dxc_1.zip", "b" * 64),
            "python": ("https://p/cpython-3.12%2Bx.tar.gz", "c" * 64)}
    archive, _ = make_release_zip(tmp_path, pins, GOOD_SCRIPT)
    release_dir = extract_zip(archive, tmp_path / "extracted")
    assert release_dir.name == "HelixSR-1.2.0" and (release_dir / "helixsr-setup.sh").stat().st_mode & 0o100
    parsed = parse_pins(release_dir)
    assert {k: (p.url, p.sha256) for k, p in parsed.items()} == pins
    assert parsed["python"].filename == "cpython-3.12+x.tar.gz"
    assert parse_pins(tmp_path / "nowhere") == {}


def test_extract_zip_rejects_traversal(tmp_path):
    buf = io.BytesIO()
    with zipfile.ZipFile(buf, "w") as zf:
        zf.writestr("../evil.sh", "x")
    (tmp_path / "evil.zip").write_bytes(buf.getvalue())
    with pytest.raises(backend.HelixError):
        extract_zip(tmp_path / "evil.zip", tmp_path / "out")


def test_unpack_prerequisites(tmp_path):
    data = tmp_path / "HelixSR"
    make_dxc_zip(tmp_path / "dxc.zip")
    unpack_dxc(tmp_path / "dxc.zip", data)
    assert (data / "dxc-win" / "bin" / "x64" / "dxc.exe").read_bytes() == b"MZ-dxc"
    assert not (data / "dxc-win" / "inc").exists()
    assert acquire.dxc_present(data)
    make_python_tgz(tmp_path / "py.tgz")
    unpack_python(tmp_path / "py.tgz", data)
    assert acquire.portable_python_present(data)


def test_needed_pins(tmp_path):
    pins = {k: Pin(k, f"https://x/{k}", "0" * 64, k) for k in ("dlss", "dxc", "python")}
    data = tmp_path / "HelixSR"
    with mock.patch.object(acquire, "system_python_has_numpy", return_value=True):
        assert [p.key for p in needed_pins(pins, data, None, immutable=False)] == ["dlss", "dxc"]
        assert [p.key for p in needed_pins(pins, data, None, immutable=True)] == ["dlss", "dxc", "python"]
        assert [p.key for p in needed_pins(pins, data, tmp_path / "nvngx_dlss.dll", True)] == ["dxc", "python"]
    with mock.patch.object(acquire, "system_python_has_numpy", return_value=False):
        assert "python" in [p.key for p in needed_pins(pins, data, None, immutable=False)]
    make_dxc_zip(tmp_path / "dxc.zip")
    unpack_dxc(tmp_path / "dxc.zip", data)
    make_python_tgz(tmp_path / "py.tgz")
    unpack_python(tmp_path / "py.tgz", data)
    assert needed_pins(pins, data, tmp_path / "d.dll", True) == []
    assert needed_pins({}, data, None, True) == []


def test_find_dlss_dlls(tmp_path):
    lib = tmp_path / "steamapps"
    good = lib / "common" / "GameA" / "nvngx_dlss.dll"
    other = lib / "common" / "GameB" / "bin" / "nvngx_dlss.dll"
    for p, data in ((good, DLSS_BYTES), (other, b"older dlss")):
        p.parent.mkdir(parents=True)
        p.write_bytes(data)
    assert find_dlss_dlls([lib], DLSS_SHA) == [good]
    assert find_dlss_dlls([lib], "f" * 64) == []
    assert find_dlss_dlls([tmp_path / "missing"], DLSS_SHA) == []


# ------------------------------------------------------------------------------------- the whole run
def run_worker(qapp, request: SetupRequest):
    from PyQt6.QtCore import QEventLoop, QTimer
    worker = SetupWorker(request)
    log, outcome = [], []
    worker.log.connect(log.append)
    worker.stage.connect(log.append)
    worker.finished_with.connect(outcome.append)
    loop = QEventLoop()
    worker.finished_with.connect(loop.quit)
    QTimer.singleShot(20000, loop.quit)
    worker.start()
    loop.exec()
    worker.wait(5000)
    assert outcome, "worker did not finish"
    return outcome[0], log


def prepared(tmp_path, script_body=GOOD_SCRIPT):
    dlss = tmp_path / "srv" / "nvngx_dlss.dll"
    dlss.parent.mkdir()
    dlss.write_bytes(DLSS_BYTES)
    dxc = make_dxc_zip(tmp_path / "srv" / "dxc.zip")
    py = make_python_tgz(tmp_path / "srv" / "py.tgz")
    pins = {"dlss": (dlss.as_uri(), DLSS_SHA), "dxc": ((tmp_path / "srv" / "dxc.zip").as_uri(), sha(dxc)),
            "python": ((tmp_path / "srv" / "py.tgz").as_uri(), sha(py))}
    archive, data = make_release_zip(tmp_path / "srv", pins, script_body)
    release = ReleaseInfo("1.2.0", "v1.2.0", "u", "2026-10-06", archive.name, archive.as_uri(), len(data))
    return release, dlss


def test_setup_worker_end_to_end(qapp, tmp_path):
    release, _ = prepared(tmp_path)
    request = SetupRequest(release, tmp_path / "work", tmp_path / "data" / "HelixSR")
    with mock.patch.object(acquire, "is_immutable_system", return_value=True):
        outcome, log = run_worker(qapp, request)
    assert outcome.ok, outcome.message
    rd = outcome.release_dir
    assert rd is not None and (rd / backend.WEIGHTS).is_file() and (rd / backend.KERNELS).is_file()
    args = (rd / "args.txt").read_text()
    assert "--yes" in args and "--dlss" in args
    assert (rd / "dlss-used.bin").read_bytes() == DLSS_BYTES          # the downloaded DLL was handed to the script
    assert not (tmp_path / "work" / "nvngx_dlss.dll").exists()        # and deleted afterwards
    assert acquire.dxc_present(request.helix_data) and acquire.portable_python_present(request.helix_data)
    assert any("XDG_DATA_HOME=" + str(tmp_path / "data") in line for line in log)
    assert any("in parallel" in line for line in log)
    assert backend.import_payload(rd, tmp_path / "payload").missing == []
    assert acquire.latest_work_release(tmp_path / "work") == rd


def test_setup_worker_uses_local_dlss_and_cached_tools(qapp, tmp_path):
    release, dlss = prepared(tmp_path)
    local = tmp_path / "GameA" / "nvngx_dlss.dll"
    local.parent.mkdir()
    local.write_bytes(DLSS_BYTES)
    data = tmp_path / "data" / "HelixSR"
    make_dxc_zip(tmp_path / "d.zip")
    unpack_dxc(tmp_path / "d.zip", data)
    make_python_tgz(tmp_path / "p.tgz")
    unpack_python(tmp_path / "p.tgz", data)
    with mock.patch.object(acquire, "download", wraps=acquire.download) as dl, \
            mock.patch.object(acquire, "is_immutable_system", return_value=True):
        outcome, log = run_worker(qapp, SetupRequest(release, tmp_path / "work", data, local))
    assert outcome.ok, outcome.message
    assert dl.call_count == 1                                          # only the release zip
    assert f"--dlss {local}" in (outcome.release_dir / "args.txt").read_text()
    assert local.exists()                                              # the user's file is never deleted


def test_setup_worker_reports_script_failure(qapp, tmp_path):
    release, _ = prepared(tmp_path, BAD_SCRIPT)
    with mock.patch.object(acquire, "is_immutable_system", return_value=True):
        outcome, log = run_worker(qapp, SetupRequest(release, tmp_path / "work", tmp_path / "data" / "HelixSR"))
    assert not outcome.ok and "code 3" in outcome.message
    assert any("boom" in line for line in log)
    assert not (tmp_path / "work" / "nvngx_dlss.dll").exists()


def test_setup_worker_checksum_failure_keeps_nothing(qapp, tmp_path):
    release, dlss = prepared(tmp_path)
    dlss.write_bytes(b"tampered")
    with mock.patch.object(acquire, "is_immutable_system", return_value=True):
        outcome, _ = run_worker(qapp, SetupRequest(release, tmp_path / "work", tmp_path / "data" / "HelixSR"))
    assert not outcome.ok and "checksum" in outcome.message
    assert not list((tmp_path / "work").glob("*.part")) and not (tmp_path / "work" / "nvngx_dlss.dll").exists()


def test_setup_worker_release_error(qapp, tmp_path):
    outcome, _ = run_worker(qapp, SetupRequest(ReleaseInfo(error="no connection (x)"), tmp_path / "work",
                                               tmp_path / "data"))
    assert not outcome.ok and "no connection" in outcome.message
