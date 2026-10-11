# SPDX-License-Identifier: GPL-3.0-or-later
"""Check suite Python packages and external tools."""

APP_NAME = "Portal dependency checker"
APP_ID = "bc250-portal-dependency-checker"
__version__ = "0.1.3"

from pathlib import Path

from bc250_core import AppInfo

ROOT = Path(__file__).resolve().parent.parent
CATALOG = ROOT / "dependencies.toml"
LOGO_PATH = ROOT / "images" / "portal-dependency-checker.png"
INFO = AppInfo(app_id=APP_ID, name=APP_NAME, version=__version__, logo=LOGO_PATH,
               tag_prefix="dependency-checker-v", settings_app=APP_ID, settings_ini=True)

APP_LABELS = {
    "bazzite-test": "BC-250 Bazzite Test",
    "governor": "BC-250 GPU Governor Manager",
    "helixsr": "BC-250 HelixSR Manager",
    "cu-bisect": "BC-250 CU Bisect",
    "cores-bisect": "BC-250 Cores Bisect",
    "gpu-oc-bisect": "BC-250 GPU OC Bisect",
    "persistent-acpi": "BC-250 Persistent ACPI",
    "system-overlay": "BC-250 System Overlay",
    "bios-reader": "BC-250 BIOS Reader",
    "ace-queues": "BC-250 ACE Queues",
    "memory-manager": "BC-250 Memory Manager",
    "hdmi-cec": "BC250 HDMI CEC",
    "demo-tool": "Simple Demo Tool",
}

__all__ = ["APP_ID", "APP_LABELS", "APP_NAME", "CATALOG", "INFO", "LOGO_PATH", "ROOT", "__version__"]
