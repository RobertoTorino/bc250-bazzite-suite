# SPDX-License-Identifier: GPL-3.0-or-later
"""Shared fixtures: an offscreen QApplication and a fake HelixSR payload in a temporary folder. The DLL and the
network files are just marker bytes; nothing here needs a GPU, Steam or a real HelixSR release."""

from __future__ import annotations

import os
from pathlib import Path

import pytest

os.environ.setdefault("QT_QPA_PLATFORM", "offscreen")

FAKE_DLL = b"MZ-helixsr-fake-dll"
FAKE_GAME_DLL = b"MZ-amd-original-dll"
FAKE_README = "# HelixSR\n\n**Version 1.2.0** - test build\n"


@pytest.fixture(scope="session")
def qapp():
    from PyQt6.QtWidgets import QApplication
    app = QApplication.instance() or QApplication([])
    yield app


def make_release(folder: Path, *, network: bool = True, ini: bool = True, readme: bool = True) -> Path:
    """Lay out an extracted HelixSR release (what the user points the import at)."""
    from bc250_bazzite_helixsr import backend
    folder.mkdir(parents=True, exist_ok=True)
    (folder / backend.HELIXSR_DLL).write_bytes(FAKE_DLL)
    if network:
        (folder / backend.WEIGHTS).write_bytes(b"weights")
        (folder / backend.KERNELS).write_bytes(b"kernels")
    if ini:
        (folder / backend.INI).write_text(backend.DEFAULT_INI_TEXT, encoding="utf-8")
    if readme:
        (folder / "README.md").write_text(FAKE_README, encoding="utf-8")
    (folder / "helixsr-setup.sh").write_text("#!/bin/sh\n", encoding="utf-8")
    return folder


@pytest.fixture
def release(tmp_path: Path) -> Path:
    return make_release(tmp_path / "HelixSR-v1.2.0")


@pytest.fixture
def payload(tmp_path: Path) -> Path:
    """A complete, imported payload."""
    return make_release(tmp_path / "payload")


@pytest.fixture
def game(tmp_path: Path) -> Path:
    """A game folder with the FSR DLL in a nested Win64 folder, like Unreal games have."""
    from bc250_bazzite_helixsr import backend
    root = tmp_path / "steamapps" / "common" / "SomeGame"
    win64 = root / "Engine" / "Plugins" / "FSR3" / "ThirdParty" / "Win64"
    win64.mkdir(parents=True)
    (win64 / backend.UPSCALER_DLL).write_bytes(FAKE_GAME_DLL)
    (root / "SomeGame.exe").write_bytes(b"MZ")
    return root
