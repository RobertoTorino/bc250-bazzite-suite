# SPDX-License-Identifier: GPL-3.0-or-later
"""What the running system says about its memory, read without root from /sys and /proc: the VRAM split the
kernel got, the GTT it may lend the GPU, the TTM limit behind it, the RAM and the swap layout.

The swap checks are the ones of bazzite-test's test 14 and system score (zram and disk swap from /proc/swaps,
zswap from its module parameter)."""

from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path

MIB = 1024 * 1024
PAGE = 4096


def _read(path: Path) -> str | None:
    try:
        return path.read_text().strip()
    except OSError:
        return None


def _int(text: str | None) -> int | None:
    try:
        return int(text) if text is not None else None
    except ValueError:
        return None


@dataclass(frozen=True)
class Memory:
    vram_mib: int | None                # the split the kernel got at boot
    gtt_mib: int | None                 # system RAM the GPU may borrow (GTT)
    ram_mib: int | None                 # MemTotal: what is left for the system
    ttm_limit_mib: int | None           # ttm.pages_limit, in MiB
    ttm_on_cmdline: bool
    zram: bool
    zswap: bool
    disk_swap: bool
    swappiness: int | None
    boot_id: str

    @property
    def gtt_capped(self) -> bool:
        """amdgpu caps GTT at the RAM on this APU, so a TTM limit above it has no effect."""
        return (self.ttm_limit_mib is not None and self.gtt_mib is not None
                and self.ttm_limit_mib > self.gtt_mib)

    @property
    def swap_text(self) -> str:
        parts = [name for name, on in (("zram", self.zram), ("zswap", self.zswap), ("disk", self.disk_swap)) if on]
        return " + ".join(parts) if parts else "none"


def gpu_device(sys_root: Path = Path("/sys")) -> Path | None:
    """The amdgpu device with VRAM figures (the last one, as bazzite-test's test 37 does)."""
    found = [p for p in sorted((sys_root / "class/drm").glob("card*/device")) if (p / "mem_info_vram_total").is_file()]
    return found[-1] if found else None


def read_memory(sys_root: Path = Path("/sys"), proc_root: Path = Path("/proc")) -> Memory:
    dev = gpu_device(sys_root)
    vram = _int(_read(dev / "mem_info_vram_total")) if dev else None
    gtt = _int(_read(dev / "mem_info_gtt_total")) if dev else None
    ram_kib = None
    for line in (_read(proc_root / "meminfo") or "").splitlines():
        if line.startswith("MemTotal:"):
            ram_kib = _int(line.split()[1])
    ttm = _int(_read(sys_root / "module/ttm/parameters/pages_limit"))
    names = [line.split()[0] for line in (_read(proc_root / "swaps") or "").splitlines()[1:] if line.split()]
    return Memory(
        vram_mib=vram // MIB if vram else None,
        gtt_mib=gtt // MIB if gtt else None,
        ram_mib=ram_kib // 1024 if ram_kib else None,
        ttm_limit_mib=ttm * PAGE // MIB if ttm else None,
        ttm_on_cmdline="ttm.pages_limit=" in (_read(proc_root / "cmdline") or ""),
        zram=any(Path(n).name.startswith("zram") for n in names),
        zswap=_read(sys_root / "module/zswap/parameters/enabled") in ("Y", "1"),
        disk_swap=any(not Path(n).name.startswith("zram") for n in names),
        swappiness=_int(_read(proc_root / "sys/vm/swappiness")),
        boot_id=_read(proc_root / "sys/kernel/random/boot_id") or "",
    )


def mib_text(mib: int | None) -> str:
    if mib is None:
        return "—"
    return f"{mib / 1024:.1f} GiB" if mib >= 1024 else f"{mib} MiB"
