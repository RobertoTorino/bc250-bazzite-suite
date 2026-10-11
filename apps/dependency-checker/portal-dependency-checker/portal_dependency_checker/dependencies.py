# SPDX-License-Identifier: GPL-3.0-or-later
"""The suite's runtime Python dependency catalog and PyPI version checks."""

from __future__ import annotations

import importlib.metadata
import json
import os
import re
import shutil
import subprocess
import tomllib
import urllib.error
import urllib.parse
import urllib.request
from collections.abc import Callable
from dataclasses import dataclass
from pathlib import Path

from bc250_core.updates import version_tuple

PYPI = "https://pypi.org/pypi/{name}/json"
TIMEOUT = 15


class DependencyCatalogError(ValueError):
    pass


class DependencyCheckError(RuntimeError):
    pass


@dataclass(frozen=True)
class DependencySource:
    owner: str
    specifier: str


@dataclass(frozen=True)
class Dependency:
    name: str
    sources: tuple[DependencySource, ...]


@dataclass(frozen=True)
class ToolSource:
    owner: str
    usage: str
    anchor: str = ""


@dataclass(frozen=True)
class ExternalTool:
    name: str
    executables: tuple[str, ...]
    sources: tuple[ToolSource, ...]
    locations: tuple[str, ...] = ()
    probe: str = ""


@dataclass(frozen=True)
class DependencyStatus:
    dependency: Dependency
    installed: str
    latest: str = ""
    error: str = ""

    @property
    def update_available(self) -> bool:
        installed, latest = version_tuple(self.installed), version_tuple(self.latest)
        return bool(installed and latest and latest > installed)


@dataclass(frozen=True)
class ToolStatus:
    tool: ExternalTool
    path: str = ""
    note: str = ""


def load_catalog(path: Path) -> list[Dependency]:
    data = _read_catalog(path)
    raw_dependencies = data.get("dependency")
    if not isinstance(raw_dependencies, list) or not raw_dependencies:
        raise DependencyCatalogError("dependencies.toml has no [[dependency]] entries")

    dependencies = []
    seen: set[str] = set()
    for raw in raw_dependencies:
        if not isinstance(raw, dict) or not isinstance(raw.get("name"), str) or not raw["name"].strip():
            raise DependencyCatalogError("each dependency needs a non-empty name")
        name = raw["name"].strip()
        normalized = re.sub(r"[-_.]+", "-", name).lower()
        if normalized in seen:
            raise DependencyCatalogError(f"duplicate dependency: {name}")
        seen.add(normalized)
        raw_sources = raw.get("source")
        if not isinstance(raw_sources, list) or not raw_sources:
            raise DependencyCatalogError(f"{name} needs at least one source")
        sources = []
        owners: set[str] = set()
        for source in raw_sources:
            if not isinstance(source, dict):
                raise DependencyCatalogError(f"{name} has an invalid source")
            owner, specifier = source.get("owner"), source.get("specifier")
            if not isinstance(owner, str) or not owner.strip() or not isinstance(specifier, str) or not specifier.strip():
                raise DependencyCatalogError(f"{name} sources need an owner and version specifier")
            if owner in owners:
                raise DependencyCatalogError(f"{name} has duplicate source owner {owner}")
            owners.add(owner)
            sources.append(DependencySource(owner, specifier))
        dependencies.append(Dependency(name, tuple(sources)))
    return dependencies


def load_tools(path: Path) -> list[ExternalTool]:
    data = _read_catalog(path)
    raw_tools = data.get("tool")
    if not isinstance(raw_tools, list) or not raw_tools:
        raise DependencyCatalogError("dependencies.toml has no [[tool]] entries")
    tools = []
    seen: set[str] = set()
    for raw in raw_tools:
        if not isinstance(raw, dict) or not isinstance(raw.get("name"), str) or not raw["name"].strip():
            raise DependencyCatalogError("each tool needs a non-empty name")
        name = raw["name"].strip()
        normalized = re.sub(r"[-_.]+", "-", name).lower()
        if normalized in seen:
            raise DependencyCatalogError(f"duplicate external tool: {name}")
        seen.add(normalized)
        executables = _string_list(name, "executables", raw.get("executables", []), allow_empty=True)
        locations = _string_list(name, "locations", raw.get("locations", []), allow_empty=True)
        if not executables and not locations:
            raise DependencyCatalogError(f"{name} needs executables or locations")
        probe = raw.get("probe", "")
        if probe not in ("", "flashrom-internal", "path"):
            raise DependencyCatalogError(f"{name} has an unknown probe {probe!r}")
        sources = raw.get("source")
        if not isinstance(sources, list) or not sources:
            raise DependencyCatalogError(f"{name} needs at least one source")
        parsed_sources = []
        owners: set[str] = set()
        for source in sources:
            if not isinstance(source, dict):
                raise DependencyCatalogError(f"{name} has an invalid source")
            owner, usage, anchor = source.get("owner"), source.get("usage"), source.get("anchor", "")
            if (not isinstance(owner, str) or not owner.strip() or not isinstance(usage, str) or not usage.strip()
                    or not isinstance(anchor, str)):
                raise DependencyCatalogError(f"{name} sources need an owner, usage, and optional anchor")
            if owner in owners:
                raise DependencyCatalogError(f"{name} has duplicate source owner {owner}")
            owners.add(owner)
            parsed_sources.append(ToolSource(owner, usage.strip(), anchor))
        tools.append(ExternalTool(name, executables, tuple(parsed_sources), locations, probe))
    return tools


def _read_catalog(path: Path) -> dict:
    try:
        data = tomllib.loads(path.read_text(encoding="utf-8"))
    except (OSError, tomllib.TOMLDecodeError) as exc:
        raise DependencyCatalogError(f"could not read {path}: {exc}") from exc
    return data


def _string_list(name: str, field: str, value: object, *, allow_empty: bool = False) -> tuple[str, ...]:
    if not isinstance(value, list) or (not allow_empty and not value) or \
            not all(isinstance(item, str) and item.strip() for item in value):
        raise DependencyCatalogError(f"{name} {field} must be a list of non-empty strings")
    return tuple(item.strip() for item in value)


def installed_version(name: str) -> str:
    """The distribution installed in the Python environment running the portal."""
    try:
        return importlib.metadata.version(name)
    except importlib.metadata.PackageNotFoundError:
        return ""


def latest_pypi_version(name: str, user_agent: str) -> str:
    url = PYPI.format(name=urllib.parse.quote(name, safe=""))
    request = urllib.request.Request(url, headers={"Accept": "application/json", "User-Agent": user_agent})
    with urllib.request.urlopen(request, timeout=TIMEOUT) as response:
        data = json.load(response)
    if not isinstance(data, dict) or not isinstance(data.get("info"), dict):
        raise DependencyCheckError("PyPI returned an unexpected response")
    version = data["info"].get("version")
    if not isinstance(version, str) or not version.strip():
        raise DependencyCheckError("PyPI did not return a latest version")
    return version


def check_dependencies(
    dependencies: list[Dependency],
    user_agent: str,
    get_installed: Callable[[str], str] = installed_version,
    get_latest: Callable[[str, str], str] = latest_pypi_version,
) -> list[DependencyStatus]:
    """Check each dependency independently so one network error does not hide the other results."""
    statuses = []
    for dependency in dependencies:
        installed = get_installed(dependency.name)
        try:
            latest = get_latest(dependency.name, user_agent)
        except (DependencyCheckError, urllib.error.URLError, OSError, ValueError) as exc:
            reason = str(getattr(exc, "reason", exc)).strip() or exc.__class__.__name__
            statuses.append(DependencyStatus(dependency, installed, error=reason[:160]))
        else:
            statuses.append(DependencyStatus(dependency, installed, latest=latest))
    return statuses


def check_tools(tools: list[ExternalTool]) -> list[ToolStatus]:
    """Check availability without installing or changing tools; probe only flashrom's read-only help output."""
    statuses = []
    for tool in tools:
        candidates = []
        for location in tool.locations:
            candidate = Path(location).expanduser()
            if candidate.is_file() and (tool.probe == "path" or os.access(candidate, os.X_OK)):
                candidates.append(candidate)
        for executable in tool.executables:
            found = shutil.which(executable)
            if found and Path(found) not in candidates:
                candidates.append(Path(found))

        if tool.probe == "flashrom-internal":
            supported = None
            for candidate in candidates:
                env = dict(os.environ)
                unpacked_libdir = Path.home() / "flashrom" / "usr" / "lib64"
                if candidate == Path.home() / "flashrom" / "usr" / "bin" / "flashrom":
                    env["LD_LIBRARY_PATH"] = str(unpacked_libdir)
                try:
                    result = subprocess.run([str(candidate), "--help"], capture_output=True, text=True,
                                            timeout=10, check=False, env=env)
                except (OSError, subprocess.SubprocessError):
                    continue
                if "internal" in result.stdout + result.stderr:
                    supported = candidate
                    break
            if supported is not None:
                statuses.append(ToolStatus(tool, str(supported)))
            elif candidates:
                statuses.append(ToolStatus(tool, str(candidates[0]), "No internal programmer found."))
            else:
                statuses.append(ToolStatus(tool))
        else:
            statuses.append(ToolStatus(tool, str(candidates[0]) if candidates else ""))
    return statuses
