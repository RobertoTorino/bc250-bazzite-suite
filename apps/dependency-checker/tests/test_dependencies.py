# SPDX-License-Identifier: GPL-3.0-or-later

from __future__ import annotations

import io
import json
import re
import tomllib
from pathlib import Path

import pytest

from portal_dependency_checker import CATALOG, LOGO_PATH
from portal_dependency_checker.dependencies import (
    DependencyCheckError, DependencyStatus, ToolStatus, check_dependencies, check_tools, latest_pypi_version,
    load_catalog, load_tools,
)

SUITE = Path(__file__).resolve().parents[3]


def _requirements(path: Path, owner: str) -> set[tuple[str, str, str]]:
    requirements = set()
    for line in path.read_text(encoding="utf-8").splitlines():
        text = line.strip()
        if not text or text.startswith("#"):
            continue
        match = re.fullmatch(r"([A-Za-z0-9_.-]+)(.*)", text)
        assert match, f"unrecognized requirement in {path}: {text}"
        requirements.add((match.group(1), owner, match.group(2)))
    return requirements


def test_catalog_lists_python_and_external_dependencies():
    dependencies = load_catalog(CATALOG)
    tools = load_tools(CATALOG)

    assert {dependency.name for dependency in dependencies} == {"PyQt6", "PyQt6-Charts", "obsws-python", "dbus-next"}
    pyqt = next(dependency for dependency in dependencies if dependency.name == "PyQt6")
    assert {source.owner for source in pyqt.sources} >= {"portal", "core", "bazzite-test", "dependency-checker"}
    assert {tool.name for tool in tools} >= {"flashrom", "pkexec", "umr", "podman"}
    assert next(tool for tool in tools if tool.name == "flashrom").probe == "flashrom-internal"
    assert LOGO_PATH.name == "portal-dependency-checker.png"
    assert LOGO_PATH.is_file()


def test_catalog_matches_all_runtime_requirement_manifests():
    catalog = load_catalog(CATALOG)
    declared = {
        (dependency.name, source.owner, source.specifier)
        for dependency in catalog
        for source in dependency.sources
    }
    actual = _requirements(SUITE / "portal" / "requirements.txt", "portal")
    core = tomllib.loads((SUITE / "core" / "pyproject.toml").read_text(encoding="utf-8"))
    for requirement in core["project"]["dependencies"]:
        match = re.fullmatch(r"([A-Za-z0-9_.-]+)(.*)", requirement)
        assert match
        actual.add((match.group(1), "core", match.group(2)))
    for app in sorted((SUITE / "apps").iterdir()):
        requirement_file = app / "requirements.txt"
        if requirement_file.is_file():
            actual.update(_requirements(requirement_file, app.name))
    assert declared == actual


def test_external_tool_catalog_covers_app_specific_tools():
    tools = {tool.name: tool for tool in load_tools(CATALOG)}
    flashrom = tools["flashrom"]
    assert flashrom.probe == "flashrom-internal"
    assert [source.owner for source in flashrom.sources] == ["bios-reader"]
    assert "internal programmer" in flashrom.sources[0].usage
    assert tools["pkexec"].sources[0].owner == "bios-reader"
    assert tools["cyan-skillfish-governor-smu"].probe == "path"
    assert "bazzite-test" in {source.owner for source in tools["stress-ng"].sources}
    assert "cores-bisect" in {source.owner for source in tools["stress-ng"].sources}


def test_package_checks_preserve_independent_results():
    dependencies = load_catalog(CATALOG)

    def latest(name, _user_agent):
        if name == "PyQt6":
            return "9.9.9"
        raise DependencyCheckError("offline")

    results = check_dependencies(
        dependencies,
        "test-agent",
        get_installed=lambda _name: "1.0.0",
        get_latest=latest,
    )

    assert len(results) == 4
    assert results[0].update_available
    assert isinstance(results[0], DependencyStatus)
    assert all(result.error == "offline" for result in results[1:])


def test_tool_check_reports_path(monkeypatch):
    tool = next(tool for tool in load_tools(CATALOG) if tool.name == "pkexec")
    monkeypatch.setattr("portal_dependency_checker.dependencies.shutil.which", lambda _name: "/usr/bin/pkexec")

    results = check_tools([tool])

    assert results == [ToolStatus(tool, "/usr/bin/pkexec")]


@pytest.mark.parametrize(
    ("programmer", "expected_note"),
    [("internal", ""), ("linux_spi", "No internal programmer found.")],
)
def test_flashrom_check_requires_internal_programmer(tmp_path, monkeypatch, programmer, expected_note):
    flashrom = tmp_path / "home" / "flashrom" / "usr" / "bin" / "flashrom"
    flashrom.parent.mkdir(parents=True)
    flashrom.write_text("#!/bin/sh\n", encoding="utf-8")
    flashrom.chmod(0o755)
    monkeypatch.setenv("HOME", str(tmp_path / "home"))
    monkeypatch.setattr("portal_dependency_checker.dependencies.shutil.which", lambda _name: None)

    class Result:
        stdout = f"Programmers available: {programmer}"
        stderr = ""

    monkeypatch.setattr("portal_dependency_checker.dependencies.subprocess.run", lambda *args, **kwargs: Result())
    tool = next(tool for tool in load_tools(CATALOG) if tool.name == "flashrom")
    status = check_tools([tool])[0]

    assert status.path == str(flashrom)
    assert status.note == expected_note


def test_latest_pypi_version_uses_project_json(monkeypatch):
    requests = []

    class Response(io.BytesIO):
        def __enter__(self):
            return self

        def __exit__(self, *args):
            self.close()

    def open_url(request, timeout):
        requests.append((request, timeout))
        return Response(json.dumps({"info": {"version": "6.12.0"}}).encode())

    monkeypatch.setattr("portal_dependency_checker.dependencies.urllib.request.urlopen", open_url)
    assert latest_pypi_version("PyQt6-Charts", "bc250-test") == "6.12.0"
    request, timeout = requests[0]
    assert request.full_url == "https://pypi.org/pypi/PyQt6-Charts/json"
    assert request.get_header("User-agent") == "bc250-test"
    assert timeout == 15


def test_bad_pypi_response_is_an_explicit_check_error(monkeypatch):
    class Response(io.BytesIO):
        def __enter__(self):
            return self

        def __exit__(self, *args):
            self.close()

    monkeypatch.setattr(
        "portal_dependency_checker.dependencies.urllib.request.urlopen",
        lambda *_args, **_kwargs: Response(b'{"info": {}}'),
    )
    with pytest.raises(DependencyCheckError, match="latest version"):
        latest_pypi_version("PyQt6", "test-agent")
