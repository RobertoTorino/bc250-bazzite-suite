# SPDX-License-Identifier: GPL-3.0-or-later
"""MkDocs hook: serve the pictures the manual shows from where they live, without copies in docs/.

* assets/apps/<key>.png    the small app icons the portal shows on its cards (portal/images/apps/)
* assets/<app>/<file>      an app's own images (apps/<app>/images/): its icon and its screenshots
* assets/logo.png          the suite's icon (portal/images/bc250-bazzite-suite.png), also the favicon"""

from __future__ import annotations

from pathlib import Path

from mkdocs.structure.files import File

SUITE = Path(__file__).resolve().parents[2]
PICTURES = {".png", ".jpg", ".jpeg", ".gif", ".svg", ".webp"}


def pictures() -> dict[str, Path]:
    """Site path -> source file."""
    found = {f"assets/apps/{p.name}": p for p in (SUITE / "portal" / "images" / "apps").iterdir()}
    for app in sorted((SUITE / "apps").iterdir()):
        for p in sorted((app / "images").glob("*")) if (app / "images").is_dir() else []:
            found[f"assets/{app.name}/{p.name}"] = p
    found["assets/logo.png"] = SUITE / "portal" / "images" / "bc250-bazzite-suite.png"
    return {uri: p for uri, p in found.items() if p.suffix.lower() in PICTURES}


def on_files(files, config):
    for uri, path in pictures().items():
        files.append(File.generated(config, uri, abs_src_path=str(path)))
    return files
