# SPDX-License-Identifier: GPL-3.0-or-later
"""The apps that are not on bc250_core yet carry a copy of core's instance.py: the copies must not drift. Only the
SPDX line may differ (persistent-acpi is MIT)."""

from __future__ import annotations

from pathlib import Path

import pytest

SUITE = Path(__file__).resolve().parents[2]
CORE = SUITE / "core" / "bc250_core" / "instance.py"
COPIES = sorted(SUITE.glob("apps/*/*/instance.py"))


def body(path: Path) -> str:
    first, _, rest = path.read_text(encoding="utf-8").partition("\n")
    assert first.startswith("# SPDX-License-Identifier: "), path
    return rest


def test_copies_exist():
    packages = {p.parent.name for p in COPIES}
    assert {"bc250_bazzite_helixsr", "bc250_bisect_gui", "bc250_unlock_gui", "bc250_cores_bisect_gui",
            "bc250_cores_gui", "bc250_gpu_oc_gui", "bc250_acpi_gui"} <= packages


@pytest.mark.parametrize("copy", [p for p in COPIES if p.parent.name != "bc250_governor"],
                         ids=lambda p: str(p.relative_to(SUITE)))
def test_copy_matches_core(copy):
    assert body(copy) == body(CORE), f"{copy.relative_to(SUITE)} differs from core/bc250_core/instance.py"
