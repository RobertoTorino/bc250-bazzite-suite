# SPDX-License-Identifier: GPL-3.0-or-later
"""The portal's tile icons (portal/images/apps) are copies of the apps' own 128 px icons: the portal's cards and
the wiki's apps overview show these copies, so a lagging copy shows an app's old icon there while its own chapter
shows the new one (seen 15-10-2026: ten copies lagged). This test names each copy's source and fails on the copy
that no longer matches it; refreshing an app's icon means refreshing the copy too."""

from __future__ import annotations

from pathlib import Path

SUITE = Path(__file__).resolve().parents[2]

# portal/images/apps/<key>.png -> the file it is a copy of.
SOURCES = {
    "ace-queues": "apps/ace-queues/images/bc250-ace-queues-128.png",
    "bazzite-datstation": "apps/bazzite-datstation/images/bazzite-datstation-128.png",
    "bazzite-netcatgui": "apps/bazzite-netcatgui/images/bazzite-netcatgui-128.png",
    "bazzite-test": "apps/bazzite-test/images/bc250-bazzite-test-128.png",
    "bios-reader": "apps/bios-reader/images/bc250-bios-reader-128.png",
    "console-link": "apps/console-link/images/bc250-console-link-128.png",
    "cores-bisect": "apps/cores-bisect/images/bc250-cores-bisect-128.png",
    "cores-unlock": "apps/cores-bisect/images/bc250-cores-unlock-128.png",
    "cu-bisect": "apps/cu-bisect/images/bc250-cu-bisect-128.png",
    "cu-unlock": "apps/cu-bisect/images/bc250-cu-bisect-unlock-128.png",
    "decky-manager": "apps/decky-manager/images/bc250-decky-manager-128.png",
    "demo-tool": "apps/demo-tool/images/simple-demo-tool-128.png",
    "fan-control": "apps/fan-control/images/bc250-fan-control-128.png",
    "governor": "apps/governor/images/bc250-governor-manager-128.png",
    "gpu-oc-bisect": "apps/gpu-oc-bisect/images/bc250-gpu-oc-bisect-128.png",
    "hdmi-cec": "apps/hdmi-cec/images/bc250-hdmi-cec-128.png",
    "helixsr": "apps/helixsr/images/bc250-bazzite-helixsr-gui-128.png",
    "installer-tests": "tools/installer-tests/gui/images/bc250-installer-test-gui-128.png",
    "memory-manager": "apps/memory-manager/images/bc250-memory-manager-128.png",
    "mesh-shaders": "apps/mesh-shaders/images/bc250-mesh-shaders-128.png",
    "pcsx2-manager": "apps/pcsx2-manager/images/bc250-pcsx2-manager-128.png",
    "persistent-acpi": "apps/persistent-acpi/images/bc250-persistent-acpi-128.png",
    "portal": "portal/images/bc250-bazzite-suite-128.png",
    "portal-dependency-checker": "apps/dependency-checker/images/bc250-dependency-checker-128.png",
    "ppsspp-manager": "apps/ppsspp-manager/images/bc250-ppsspp-manager-128.png",
    "rpcs3-manager": "apps/rpcs3-manager/images/bc250-rpcs3-manager-128.png",
    "sftp-tools": "apps/sftp-tools/images/bc250-bazzite-sftp-tools-128.png",
    "shadps4-manager": "apps/shadps4-manager/images/bc250-shadps4-manager-128.png",
    "suite-releases": "apps/suite-releases/images/bc250-release-128.png",
    "system-overlay": "apps/system-overlay/images/bc250-system-overlay-128.png",
    "usb-wifi": "apps/usb-wifi/images/bc250-usb-wifi-128.png",
    "vita3k-manager": "apps/vita3k-manager/images/bc250-vita3k-manager-128.png",
}


def test_every_tile_icon_has_a_source_here():
    """A new tile icon gets a row in SOURCES; one that leaves the portal goes from both."""
    icons = sorted(path.stem for path in (SUITE / "portal" / "images" / "apps").glob("*.png"))
    assert icons == sorted(SOURCES)


def test_every_tile_icon_is_the_apps_own():
    stale = [key for key, source in sorted(SOURCES.items())
             if (SUITE / "portal" / "images" / "apps" / f"{key}.png").read_bytes()
             != (SUITE / source).read_bytes()]
    assert not stale, f"these copies no longer match the app's icon: {', '.join(stale)}"


def test_the_wiki_icon_is_the_portals():
    """The wiki's logo and favicon (docs/images/wiki-icon.*) are scaled copies of the portal's icon, so they are
    compared by their pixels at 32 px: they lagged once after the icon changed (seen 16-10-2026)."""
    from PIL import Image, ImageChops, ImageStat

    def small(path: Path) -> Image.Image:
        return Image.open(path).convert("RGBA").resize((32, 32), Image.Resampling.LANCZOS)

    portal = small(SUITE / "portal" / "images" / "bc250-bazzite-suite.png")
    off = {name: sum(ImageStat.Stat(ImageChops.difference(portal, small(SUITE / "docs" / "images" / name))).mean) / 4
           for name in ("wiki-icon.png", "wiki-icon.webp")}
    stale = [name for name, mean in off.items() if mean > 4]
    assert not stale, f"these no longer show the portal's icon: {', '.join(stale)}"
