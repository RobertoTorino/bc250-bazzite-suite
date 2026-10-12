#!/usr/bin/env python3
# SPDX-License-Identifier: GPL-3.0-or-later
"""Build the Windows executable of an app that ships one, from the suite checkout:

    python tools/build_windows_exe.py <app> <out-dir>

Run it on Windows (PyInstaller builds for the system it runs on) with the app's requirements, pyinstaller and pillow
installed. <out-dir> gets <app-id>-<version>-windows.zip (the one-file .exe, LICENSE and MANUAL.md) and
<app-id>-<version>-windows.zip.sha256. The release workflow uploads both to the app's release beside the portal's
<tag>.tar.gz; the portal never installs from them. The app is staged first, like a release, so the exe runs on the
bc250_core the app was tested with."""

from __future__ import annotations

import hashlib
import os
import re
import shutil
import sys
import tempfile
import zipfile
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import stage_app  # noqa: E402

SUITE = stage_app.SUITE

# app key -> (package, name of the .exe)
WINDOWS_APPS = {"sftp-tools": ("bc250_sftp_tools", "BC250-SFTP-Tools")}


def app_id(src: Path, package: str) -> str:
    text = (src / package / "__init__.py").read_text(encoding="utf-8")
    match = re.search(r'^APP_ID\s*=\s*"([^"]+)"', text, re.M)
    if match is None:
        raise SystemExit(f"{package}/__init__.py has no APP_ID")
    return match.group(1)


def asset_name(app_id_: str, version: str) -> str:
    return f"{app_id_}-{version}-windows.zip"


def launcher_source(package: str) -> str:
    """PyInstaller wants a script; the package's __main__ uses relative imports, so a script calls its main()."""
    return f"import sys\n\nfrom {package}.__main__ import main\n\nsys.exit(main())\n"


def pyinstaller_args(stage: Path, launcher: Path, package: str, exe_name: str, icon: Path, work: Path, dist: Path,
                     sep: str = os.pathsep) -> list[str]:
    return [
        str(launcher),
        "--onefile", "--windowed", "--noconfirm", "--clean", "--noupx",
        "--name", exe_name,
        "--distpath", str(dist), "--workpath", str(work), "--specpath", str(work),
        "--paths", str(stage),
        "--icon", str(icon),
        "--collect-submodules", package,
        "--collect-submodules", "bc250_core",
        "--collect-all", "paramiko",
        # Read from next to the package, as in an install: the logo, and the fonts core registers.
        "--add-data", f"{stage / 'images'}{sep}images",
        "--add-data", f"{stage / 'bc250_core' / 'fonts'}{sep}bc250_core/fonts",
    ]


def sha256_of(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def build(app: str, out: Path) -> tuple[Path, Path]:
    if app not in WINDOWS_APPS:
        raise SystemExit(f"{app} has no Windows build (known: {', '.join(sorted(WINDOWS_APPS))})")
    package, exe_name = WINDOWS_APPS[app]
    src = stage_app.source_dir(app)
    version = (src / "VERSION").read_text(encoding="utf-8").strip()
    name = app_id(src, package)
    out.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory() as tmp:
        work = Path(tmp)
        stage = stage_app.stage(app, work / "stage")
        launcher = work / f"{exe_name}.py"
        launcher.write_text(launcher_source(package), encoding="utf-8")
        import PyInstaller.__main__ as pyinstaller      # only the build needs it
        pyinstaller.run(pyinstaller_args(stage, launcher, package, exe_name, stage / "images" / f"{name}.png",
                                         work / "build", work / "dist"))
        exe = next((work / "dist").glob(f"{exe_name}*"), None)
        if exe is None:
            raise SystemExit("PyInstaller made no executable")
        archive = out / asset_name(name, version)
        with zipfile.ZipFile(archive, "w", zipfile.ZIP_DEFLATED) as zf:
            zf.write(exe, exe.name)
            for extra in ("LICENSE", "MANUAL.md"):
                if (stage / extra).is_file():
                    zf.write(stage / extra, extra)
    checksum = out / f"{archive.name}.sha256"
    checksum.write_text(f"{sha256_of(archive)}  {archive.name}\n", encoding="utf-8")
    return archive, checksum


def main(argv: list[str]) -> int:
    if len(argv) != 2:
        print(__doc__.strip().splitlines()[2].strip(), file=sys.stderr)
        return 2
    archive, checksum = build(argv[0], Path(argv[1]))
    print(f"{archive}\n{checksum}")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
