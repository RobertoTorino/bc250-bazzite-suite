#!/usr/bin/env python3
# SPDX-License-Identifier: GPL-3.0-or-later
"""Build the release assets of one tag:

    python3 tools/build_release.py <app>-v<x.y.z> <out-dir> [--bundle DIR]

<out-dir> gets <tag>.tar.gz (unpacks into <tag>/), SHA256SUMS and notes.md. The tag's version must equal the app's
VERSION. bazzite-test gets its engine checksum recorded (development/tools/build_info.py), which makes it a release
build that refuses a changed engine. A portal tag needs --bundle: a folder with the pinned bazzite-test release
(<tag>.tar.gz and SHA256SUMS, as published); it is verified against apps.toml and unpacked into bundled/.

The tarball is reproducible and the same on Linux and Windows: sorted entries, root:root, the commit time (or
SOURCE_DATE_EPOCH) as mtime, and modes set here (755 for folders and scripts, 644 for the rest), not taken from the
file system, which on Windows has no exec bit."""

from __future__ import annotations

import argparse
import gzip
import hashlib
import importlib.util
import io
import os
import re
import subprocess
import sys
import tarfile
import tempfile
from pathlib import Path

SUITE = Path(__file__).resolve().parent.parent
_TAG = re.compile(r"^(?P<app>[a-z0-9-]+)-v(?P<version>\d+\.\d+\.\d+)$")


def _load(name: str, path: Path):
    spec = importlib.util.spec_from_file_location(name, path)
    module = importlib.util.module_from_spec(spec)
    sys.modules[name] = module
    spec.loader.exec_module(module)
    return module


stage_app = _load("bc250_stage_app", SUITE / "tools" / "stage_app.py")
manifest = _load("bc250_manifest", SUITE / "portal" / "bc250_portal" / "manifest.py")


def source_epoch() -> int:
    if os.environ.get("SOURCE_DATE_EPOCH"):
        return int(os.environ["SOURCE_DATE_EPOCH"])
    try:
        out = subprocess.run(["git", "log", "-1", "--format=%ct"], cwd=SUITE, capture_output=True, text=True,
                             check=True).stdout.strip()
        return int(out)
    except (OSError, subprocess.CalledProcessError, ValueError):
        return 0


def _executable(path: Path) -> bool:
    if path.suffix == ".sh":
        return True
    with path.open("rb") as fh:
        return fh.read(2) == b"#!"


def write_tarball(root: Path, top: str, dest: Path, mtime: int) -> None:
    """root/ packed as top/, deterministically."""
    raw = io.BytesIO()
    with tarfile.open(fileobj=raw, mode="w", format=tarfile.PAX_FORMAT) as tar:
        paths = [root, *sorted(root.rglob("*"), key=lambda p: p.relative_to(root).as_posix())]
        for path in paths:
            rel = path.relative_to(root).as_posix()
            info = tarfile.TarInfo(top if rel == "." else f"{top}/{rel}")
            info.mtime, info.uid, info.gid, info.uname, info.gname = mtime, 0, 0, "root", "root"
            if path.is_symlink():
                raise SystemExit(f"{path}: symlinks are not shipped")
            if path.is_dir():
                info.type, info.mode = tarfile.DIRTYPE, 0o755
                tar.addfile(info)
            else:
                data = path.read_bytes()
                info.size, info.mode = len(data), 0o755 if _executable(path) else 0o644
                tar.addfile(info, io.BytesIO(data))
    with dest.open("wb") as out, gzip.GzipFile(filename="", mode="wb", fileobj=out, mtime=mtime) as gz:
        gz.write(raw.getvalue())


def sha256_of(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def latest_changes(changelog: Path) -> str:
    """The newest entry of a CHANGELOG: up to the second "Changelog:" line or "## " heading."""
    if not changelog.is_file():
        return ""
    lines = changelog.read_text(encoding="utf-8").splitlines()
    starts = [i for i, line in enumerate(lines) if line.startswith(("Changelog:", "## "))]
    if not starts:
        return "\n".join(lines).strip()
    end = starts[1] if len(starts) > 1 else len(lines)
    return "\n".join(lines[starts[0]:end]).strip()


def bundle_bazzite_test(stage_dir: Path, bundle: Path) -> str:
    """Verify the pinned bazzite-test release in *bundle* and unpack it into stage_dir/bundled/. Returns its tag."""
    entry = next(e for e in manifest.load(SUITE / "portal" / "apps.toml") if e.key == "bazzite-test")
    archive = bundle / entry.asset
    if not archive.is_file():
        raise SystemExit(f"--bundle {bundle} has no {entry.asset} (the tag apps.toml pins)")
    want = entry.sha256
    if not want:
        sums = (bundle / "SHA256SUMS").read_text(encoding="utf-8") if (bundle / "SHA256SUMS").is_file() else ""
        want = next((p[0].lower() for p in (line.split() for line in sums.splitlines())
                     if len(p) == 2 and p[1].lstrip("*") == entry.asset), "")
    if not want or sha256_of(archive) != want:
        raise SystemExit(f"{entry.asset} does not match the checksum pinned in apps.toml or its SHA256SUMS")
    target = stage_dir / "bundled"
    target.mkdir()
    with tarfile.open(archive, "r:gz") as tar:
        for member in tar.getmembers():
            name = Path(member.name)
            if name.is_absolute() or ".." in name.parts or not (member.isfile() or member.isdir()):
                raise SystemExit(f"{entry.asset}: unexpected entry {member.name}")
        tar.extractall(target, **({"filter": "data"} if hasattr(tarfile, "data_filter") else {}))
    if not (target / entry.tag / "install.sh").is_file():
        raise SystemExit(f"{entry.asset} has no {entry.tag}/install.sh")
    return entry.tag


def build(tag: str, out: Path, bundle: Path | None = None) -> Path:
    match = _TAG.match(tag)
    if not match:
        raise SystemExit(f"{tag} is not <app>-v<x.y.z>")
    app, version = match["app"], match["version"]
    src = stage_app.source_dir(app)
    current = (src / "VERSION").read_text(encoding="utf-8").strip()
    if current != version:
        raise SystemExit(f"{tag}: {src.relative_to(SUITE)}/VERSION is {current}; bump it before tagging")
    out.mkdir(parents=True, exist_ok=True)
    notes = [f"## {tag}", ""]
    with tempfile.TemporaryDirectory() as tmp:
        stage_dir = stage_app.stage(app, Path(tmp) / tag)
        if app == "bazzite-test":
            subprocess.run([sys.executable, str(stage_dir / "development" / "tools" / "build_info.py")], check=True,
                           stdout=subprocess.DEVNULL)
        if app == "portal":
            if bundle is None:
                raise SystemExit("a portal release needs --bundle with the pinned bazzite-test release")
            bundled = bundle_bazzite_test(stage_dir, bundle)
            pins = "\n".join(f"- `{e.tag}`" for e in manifest.load(SUITE / "portal" / "apps.toml"))
            notes += ["This portal release installs and pins these app releases:", "", pins, "",
                      f"`{bundled}` is included and installed with the portal.", ""]
        archive = out / f"{tag}.tar.gz"
        write_tarball(stage_dir, tag, archive, source_epoch())
    digest = sha256_of(archive)
    (out / "SHA256SUMS").write_text(f"{digest}  {archive.name}\n", encoding="utf-8")
    changes = latest_changes(src / "CHANGELOG")
    notes += ["### Install", "", "```bash", "sha256sum --check SHA256SUMS", f"tar xzf {archive.name}",
              f"cd {tag} && ./install.sh", "```", "", f"SHA-256 of `{archive.name}`: `{digest}`", ""]
    if changes:
        notes += ["### Changes", "", changes, ""]
    (out / "notes.md").write_text("\n".join(notes), encoding="utf-8")
    return archive


def main(argv: list[str]) -> int:
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    parser.add_argument("tag")
    parser.add_argument("out", type=Path)
    parser.add_argument("--bundle", type=Path, help="folder with the pinned bazzite-test release (portal tags)")
    args = parser.parse_args(argv)
    archive = build(args.tag, args.out, args.bundle)
    print(f"{archive} {sha256_of(archive)}")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
