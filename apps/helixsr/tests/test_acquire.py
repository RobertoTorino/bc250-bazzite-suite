# SPDX-License-Identifier: GPL-3.0-or-later
"""acquire.py with file:// URLs and a fake helixsr-setup.sh: no network, no Proton."""

from __future__ import annotations

import hashlib
import io
import json
import tarfile
import zipfile
from dataclasses import replace
from pathlib import Path
from unittest import mock

import pytest

from helixsr_manager import acquire, backend
from helixsr_manager.acquire import (
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


def test_latest_release_takes_helixsrs_own_zip():
    """From 1.9.0 on a release also has HelixSR Scaler's zip, whichever comes first."""
    assets = [{"name": "HelixSR-Scaler-1.0.3.zip", "browser_download_url": "https://x/scaler.zip", "size": 132504212},
              {"name": "HelixSR-Scaler-1.0.3-linux.tar.gz", "browser_download_url": "https://x/s.tgz", "size": 1},
              {"name": "HelixSR-1.9.0.zip", "browser_download_url": "https://x/z.zip", "size": 3803249}]
    with mock.patch.object(acquire, "_get_json", return_value={"tag_name": "v1.9.0", "assets": assets}):
        info = latest_release("api", "page")
    assert (info.asset_name, info.asset_url, info.asset_size) == ("HelixSR-1.9.0.zip", "https://x/z.zip", 3803249)


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


def gh_release(version: str, prerelease: bool = False, zip_name: str | None = None) -> dict:
    name = f"HelixSR-{version}.zip" if zip_name is None else zip_name
    return {"tag_name": f"v{version}", "prerelease": prerelease, "draft": False, "published_at": "2026-10-16T08:00:00Z",
            "assets": [{"name": "HelixSR-Scaler-1.1.0.zip", "browser_download_url": "https://x/s.zip", "size": 1},
                       {"name": name, "browser_download_url": f"https://x/{name}", "size": 3,
                        "digest": "sha256:" + "AB" * 32}]}


# GitHub's list as it was on 19-10-2026, newest first: 2.0.0 changed its setup, 1.9.2 was a pre-release.
RELEASES = [gh_release("2.0.0"), gh_release("1.9.3"), gh_release("1.9.2", prerelease=True), gh_release("1.9.0"),
            gh_release("1.8.1")]


def test_update_check_covers_only_helixsr():
    with mock.patch.object(acquire, "_get_json", return_value=RELEASES) as lookup:
        statuses = acquire.check_updates("1.7.0")
    assert list(statuses) == ["helixsr"] and statuses["helixsr"].update_available       # the portal updates this app
    assert lookup.call_args.args[0] == acquire.HELIXSR_API


def test_the_newest_release_of_the_supported_major():
    """HelixSR 2's setup installs into every game when run with --yes: the app keeps to 1.x and says 2.0 is out."""
    with mock.patch.object(acquire, "_get_json", return_value=RELEASES):
        latest, unsupported = acquire.supported_release()
    assert (latest.version, latest.asset_name, unsupported) == ("1.9.3", "HelixSR-1.9.3.zip", "2.0.0")
    assert latest.asset_sha256 == "ab" * 32
    status = UpdateStatus("HelixSR", "1.9.3", latest, unsupported)
    assert not status.update_available and status.kind == "ok"
    assert status.summary.endswith("; HelixSR 2.0.0 is out, this app does not support it yet")
    assert UpdateStatus("HelixSR", "1.8.1", latest, unsupported).summary == \
        "1.8.1 → 1.9.3 available (2026-10-16); HelixSR 2.0.0 is out, this app does not support it yet"
    with mock.patch.object(acquire, "_get_json", return_value=RELEASES[1:]):
        assert acquire.supported_release()[1] == ""
    no_zip = [gh_release("2.0.0"), gh_release("1.9.3", zip_name="x.zip")]
    with mock.patch.object(acquire, "_get_json", return_value=no_zip):
        latest, unsupported = acquire.supported_release()
    assert "no HelixSR 1.x release" in latest.error and unsupported == "2.0.0"
    with mock.patch.object(acquire, "_get_json", side_effect=OSError("no route")):
        assert "no connection" in acquire.supported_release()[0].error
    with mock.patch.object(acquire, "_get_json", return_value={"message": "rate limit"}):
        assert "unexpected answer" in acquire.supported_release()[0].error


def test_setup_worker_refuses_another_major(qapp, tmp_path):
    release = ReleaseInfo("2.0.0", "v2.0.0", "u", "2026-10-19", "HelixSR-2.0.0.zip", "file:///nowhere.zip", 1)
    with mock.patch.object(acquire, "download") as dl:
        outcome, _ = run_worker(qapp, SetupRequest(release, tmp_path / "work", tmp_path / "data"))
    assert not outcome.ok and "HelixSR 2.0.0 is not supported yet" in outcome.message and not dl.called


def test_setup_worker_needs_free_space(qapp, tmp_path):
    release, _ = prepared(tmp_path)
    with mock.patch.object(acquire, "free_mb", return_value=100), mock.patch.object(acquire, "download") as dl:
        outcome, _ = run_worker(qapp, SetupRequest(release, tmp_path / "work", tmp_path / "data"))
    assert not outcome.ok and "Only 100 MB free" in outcome.message and not dl.called
    assert acquire.free_mb(tmp_path / "not" / "there" / "yet") > 0


def test_setup_worker_checks_the_release_zip(qapp, tmp_path):
    release, _ = prepared(tmp_path)
    release.asset_sha256 = "0" * 64
    with mock.patch.object(acquire, "is_immutable_system", return_value=True):
        outcome, _ = run_worker(qapp, SetupRequest(release, tmp_path / "work", tmp_path / "data" / "HelixSR"))
    assert not outcome.ok and "checksum" in outcome.message and not (tmp_path / "work" / release.asset_name).exists()
    release.asset_sha256 = backend.file_digest(Path(release.asset_url[len("file://"):]))
    with mock.patch.object(acquire, "is_immutable_system", return_value=True):
        outcome, _ = run_worker(qapp, SetupRequest(release, tmp_path / "work", tmp_path / "data" / "HelixSR"))
    assert outcome.ok, outcome.message


# HelixSR 1.7's script ends with its game installer, which asks per Steam game and writes manual-install/.
INSTALLER_SCRIPT = GOOD_SCRIPT + """
echo "[helixsr-setup] {installer_line}"
echo "  f = FSR   o = OptiScaler   n = skip"
printf 'GodOfWar: install? [o/n] '
if read -r answer; then echo "answered: $answer" > "$HERE/stdin.txt"; else echo "no input" > "$HERE/stdin.txt"; fi
mkdir -p "$HERE/manual-install/HelixSR" "$HERE/fsr3-drop-in"
echo weights > "$HERE/manual-install/HelixSR/helixsr_weights.bin"
cp "$HERE/amd_fidelityfx_dx12.dll" "$HERE/fsr3-drop-in/"
"""


@pytest.mark.parametrize("installer_line", ["looking for games with DLSS, XeSS or FSR ...",      # 1.7.0 to 1.8.1
                                            "looking for games with FSR 3.1 ..."])             # 1.9.0
def test_setup_worker_gives_the_script_no_input(qapp, tmp_path, installer_line):
    release, _ = prepared(tmp_path, INSTALLER_SCRIPT.replace("{installer_line}", installer_line))
    with mock.patch.object(acquire, "is_immutable_system", return_value=True):
        outcome, log = run_worker(qapp, SetupRequest(release, tmp_path / "work", tmp_path / "data" / "HelixSR"))
    assert outcome.ok, outcome.message
    assert (outcome.release_dir / "stdin.txt").read_text() == "no input\n"
    assert not any("GodOfWar" in line for line in log)                                     # the questions are hidden
    assert any("game installer is skipped" in line for line in log)
    assert "[fake-setup] args: --yes --dlss " + str(tmp_path / "work" / "nvngx_dlss.dll") in log    # the build is shown
    assert not any((outcome.release_dir / name).exists() for name in acquire.UNUSED_OUTPUT)
    assert (outcome.release_dir / backend.WEIGHTS).is_file()


@pytest.mark.parametrize("version, no_fg", [("1.2.0", False), ("1.8.1", False), ("1.9.0", True), ("1.9.3", True)])
def test_setup_worker_skips_frame_generation_from_1_9(qapp, tmp_path, version, no_fg):
    release, _ = prepared(tmp_path)
    with mock.patch.object(acquire, "is_immutable_system", return_value=True):
        outcome, _ = run_worker(qapp, SetupRequest(replace(release, version=version), tmp_path / "work",
                                                   tmp_path / "data" / "HelixSR"))
    assert outcome.ok, outcome.message
    assert ("--no-fg" in (outcome.release_dir / "args.txt").read_text()) == no_fg


def test_setup_worker_fallback_looks_up_the_pinned_tag(qapp, tmp_path):
    assert acquire.FALLBACK_TAG == "v1.8.1"
    with mock.patch.object(acquire, "latest_release", return_value=ReleaseInfo(error="GitHub answered 404")) as lookup:
        outcome, _ = run_worker(qapp, SetupRequest(None, tmp_path / "work", tmp_path / "data", fallback=True))
    assert lookup.call_args.args[0] == "https://api.github.com/repos/lonewolf0622/HelixSR/releases/tags/v1.8.1"
    assert not outcome.ok and "1.8.1" in outcome.message and "404" in outcome.message


# HelixSR 1.8's setup appends the network to its DLL and leaves no separate network files.
ONE_FILE_SCRIPT = """
HERE=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
printf 'weightskernels' >> "$HERE/amd_fidelityfx_dx12.dll"
printf 'HXSRNET1' >> "$HERE/amd_fidelityfx_dx12.dll"
printf '\\x07\\0\\0\\0\\0\\0\\0\\0\\x07\\0\\0\\0\\0\\0\\0\\0\\x01\\0\\0\\0\\0\\0\\0\\0' >> "$HERE/amd_fidelityfx_dx12.dll"
"""


def test_setup_worker_accepts_a_one_file_dll(qapp, tmp_path):
    release, _ = prepared(tmp_path, ONE_FILE_SCRIPT)
    with mock.patch.object(acquire, "is_immutable_system", return_value=True):
        outcome, log = run_worker(qapp, SetupRequest(release, tmp_path / "work", tmp_path / "data" / "HelixSR"))
    assert outcome.ok, outcome.message
    rd = outcome.release_dir
    assert backend.network_embedded(rd / backend.HELIXSR_DLL) and not (rd / backend.WEIGHTS).exists()
    assert backend.import_payload(rd, tmp_path / "payload").missing == []
    assert backend.payload_status(tmp_path / "payload").ready
