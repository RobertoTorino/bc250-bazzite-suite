# SPDX-License-Identifier: GPL-3.0-or-later
"""The files the build uses agree with each other: the DirectMesh patch is the published one, it is made for the
Mesa the script downloads, and the shaders the container compiles are the ones the mesh test includes."""

from __future__ import annotations

import hashlib
import re

from conftest import APP, SCRIPT

BUILD = APP / "mesa" / "build-in-container.sh"


def _pin(name: str) -> str:
    found = re.search(rf"^{name}=(\S+)$", SCRIPT.read_text(encoding="utf-8"), re.MULTILINE)
    assert found, name
    return found.group(1)


def test_the_patch_is_the_published_one_for_the_pinned_mesa():
    patch = APP / "mesa" / f"bc250-directmesh-mesa-{_pin('MESA_VER')}.patch"
    assert patch.is_file()
    assert hashlib.sha256(patch.read_bytes()).hexdigest() == _pin("PATCH_SHA256")
    assert sorted(p.name for p in (APP / "mesa").glob("*.patch")) == [patch.name]


def test_the_patch_targets_radv_and_the_bc250():
    text = (APP / "mesa" / f"bc250-directmesh-mesa-{_pin('MESA_VER')}.patch").read_text(encoding="utf-8")
    assert "+++ b/src/amd/vulkan/radv_physical_device.c" in text
    assert "RADV_DIRECTMESH" in text


def test_the_container_compiles_what_the_mesh_test_includes():
    included = set(re.findall(r'#include "([\w.-]+\.spv\.inc)"', (APP / "meshtest" / "mesh-test.c").read_text()))
    compiled = {name.removeprefix("/work/") for name in re.findall(r"-o (/work/[\w.-]+\.spv\.inc)", BUILD.read_text())}
    assert included == compiled
    assert len(included) == 5
