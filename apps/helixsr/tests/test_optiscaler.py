# SPDX-License-Identifier: GPL-3.0-or-later
"""OptiScaler next to a game's .exe, pointed at a stand-alone HelixSR folder, and taken out again."""

from __future__ import annotations

import io
import zipfile
from pathlib import Path

import pytest

from bc250_bazzite_helixsr import backend

INI = ("[Upscalers]\r\n; which upscaler\r\nDx12Upscaler=auto\r\n\r\n[Libraries]\r\n; paths\r\n"
       "FfxDx12Path=auto\r\nFfxDx12SRPath=auto\r\n")


def add_optiscaler(folder: Path) -> Path:
    """The optiscaler folder of a HelixSR 1.7+ release, with marker bytes."""
    opti = folder / backend.OPTISCALER_DIR
    opti.mkdir(parents=True, exist_ok=True)
    (opti / "OptiScaler.dll").write_bytes(b"MZ-OptiScaler-0.9.4")
    (opti / "OptiScaler.ini").write_bytes(INI.encode())
    (opti / "fakenvapi.dll").write_bytes(b"MZ-fakenvapi")
    (opti / "fakenvapi.ini").write_text("[fakenvapi]\n")
    (opti / "LICENSE-GPL-3.0.txt").write_text("GPL")
    return opti


def make_game(tmp_path: Path) -> tuple[Path, Path]:
    """An Unreal-like game: the real .exe deep in Binaries/Win64 (with the game's own dxgi.dll next to it), a bigger
    launcher and a crash handler at the top."""
    game = tmp_path / "steamapps" / "common" / "GodOfWar"
    exe_dir = game / "Game" / "Binaries" / "Win64"
    exe_dir.mkdir(parents=True)
    (exe_dir / "Game-Win64-Shipping.exe").write_bytes(b"MZ" * 10)
    (exe_dir / "dxgi.dll").write_bytes(b"MZ-the-games-dxgi")
    (game / "Launcher.exe").write_bytes(b"MZ" * 1000)
    (game / "UnityCrashHandler64.exe").write_bytes(b"MZ" * 5000)
    return game, exe_dir


def test_import_takes_the_optiscaler_folder(release, tmp_path):
    add_optiscaler(release)
    payload = tmp_path / "p1"
    result = backend.import_payload(release, payload)
    assert "optiscaler/OptiScaler.dll" in result.copied and backend.payload_status(payload).optiscaler
    buf = io.BytesIO()
    with zipfile.ZipFile(buf, "w") as zf:
        for path in release.rglob("*"):
            if path.is_file():
                zf.write(path, f"HelixSR-1.8.1/{path.relative_to(release)}")
    (tmp_path / "r.zip").write_bytes(buf.getvalue())
    backend.import_payload(tmp_path / "r.zip", tmp_path / "p2")
    assert (tmp_path / "p2" / "optiscaler" / "OptiScaler.ini").read_bytes() == INI.encode()
    assert not backend.payload_status(tmp_path / "p3").optiscaler


def test_find_exe_folder(tmp_path):
    game, exe_dir = make_game(tmp_path)
    assert backend.find_exe_folder(game) == exe_dir                 # the Unreal shipping .exe, not the launcher
    other = game / "Other"
    other.mkdir()
    (other / "OptiScaler.ini").write_text("")
    assert backend.find_exe_folder(game) == other                   # a folder that already has OptiScaler wins
    assert backend.find_exe_folder(tmp_path / "empty") is None


def test_install_and_remove_put_everything_back(payload, tmp_path):
    add_optiscaler(payload)
    game, exe_dir = make_game(tmp_path)
    folder = game / "HelixSR"
    backend.deploy_folder(folder, payload)
    backend.install_optiscaler(exe_dir, folder, payload)
    assert (exe_dir / "dxgi.dll").read_bytes() == b"MZ-OptiScaler-0.9.4"
    assert (folder / "backup" / "dxgi.dll").read_bytes() == b"MZ-the-games-dxgi"
    assert (exe_dir / "fakenvapi.dll").is_file() and (exe_dir / "fakenvapi.ini").is_file()
    ini = (exe_dir / "OptiScaler.ini").read_bytes().decode()
    win = backend.to_windows_path(folder)
    assert "Dx12Upscaler=fsr31\r\n" in ini and f"FfxDx12Path={win}\\amd_fidelityfx_dx12.dll\r\n" in ini
    assert f"FfxDx12SRPath={win}\\amd_fidelityfx_upscaler_dx12.dll\r\n" in ini and "; paths" in ini
    backend.install_optiscaler(exe_dir, folder, payload)            # again: an update, the backup stays the game's
    assert (folder / "backup" / "dxgi.dll").read_bytes() == b"MZ-the-games-dxgi"
    with pytest.raises(backend.HelixError):                         # one folder serves one game
        backend.install_optiscaler(tmp_path, folder, payload)
    backend.remove_folder(folder, payload)
    assert (exe_dir / "dxgi.dll").read_bytes() == b"MZ-the-games-dxgi" and not folder.exists()
    assert sorted(p.name for p in exe_dir.iterdir()) == ["Game-Win64-Shipping.exe", "dxgi.dll"]


def test_an_existing_optiscaler_keeps_its_name_and_its_ini(payload, tmp_path):
    add_optiscaler(payload)
    exe_dir = tmp_path / "game"
    exe_dir.mkdir()
    (exe_dir / "winmm.dll").write_bytes(b"MZ-OptiScaler-0.7")
    own = "[Upscalers]\r\nDx12Upscaler=xess\r\n[Libraries]\r\nFfxDx12Path=auto\r\n"
    (exe_dir / "OptiScaler.ini").write_bytes(own.encode())
    (exe_dir / "fakenvapi.dll").write_bytes(b"theirs")
    folder = exe_dir / "HelixSR"
    backend.deploy_folder(folder, payload)
    backend.install_optiscaler(exe_dir, folder, payload)
    assert (exe_dir / "winmm.dll").read_bytes() == b"MZ-OptiScaler-0.9.4" and not (exe_dir / "dxgi.dll").exists()
    ini = (exe_dir / "OptiScaler.ini").read_bytes().decode()
    assert "Dx12Upscaler=fsr31\r\n" in ini and "FfxDx12SRPath=" in ini        # a missing key goes into its section
    assert (exe_dir / "fakenvapi.dll").read_bytes() == b"theirs"               # theirs, not replaced
    backend.remove_folder(folder, payload)
    assert (exe_dir / "winmm.dll").read_bytes() == b"MZ-OptiScaler-0.7"
    assert (exe_dir / "OptiScaler.ini").read_bytes() == own.encode() and (exe_dir / "fakenvapi.dll").exists()


def test_install_refusals(payload, tmp_path):
    exe_dir = tmp_path / "game"
    exe_dir.mkdir()
    with pytest.raises(backend.HelixError, match="no OptiScaler"):
        backend.install_optiscaler(exe_dir, exe_dir / "HelixSR", payload)
    add_optiscaler(payload)
    with pytest.raises(backend.HelixError, match="must not be"):
        backend.install_optiscaler(exe_dir, exe_dir, payload)
