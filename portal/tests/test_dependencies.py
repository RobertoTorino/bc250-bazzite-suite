# SPDX-License-Identifier: GPL-3.0-or-later
"""The shipped runtime dependency catalog and its PyPI checks."""

from __future__ import annotations

import io
import json
import re
import tomllib
import urllib.error
from pathlib import Path

import pytest

from bc250_portal import DEPENDENCY_CATALOG
from bc250_portal.dependencies import (
    DependencyCheckError, check_dependencies, check_tools, latest_pypi_version, load_catalog, load_tools,
)
from conftest import SUITE


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


def test_catalog_matches_all_runtime_requirement_manifests():
    catalog = load_catalog(DEPENDENCY_CATALOG)
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
    assert {dependency.name for dependency in catalog} == {"PyQt6", "PyQt6-Charts"}


def test_external_tool_catalog_covers_bios_reader_flashrom_capability():
    tools = {tool.name: tool for tool in load_tools(DEPENDENCY_CATALOG)}
    flashrom = tools["flashrom"]
    assert flashrom.probe == "flashrom-internal"
    assert [source.owner for source in flashrom.sources] == ["bios-reader"]
    assert "internal programmer" in flashrom.sources[0].usage
    assert tools["pkexec"].sources[0].owner == "bios-reader"
    assert tools["cyan-skillfish-governor-smu"].probe == "path"
    assert "bazzite-test" in {source.owner for source in tools["stress-ng"].sources}
    assert "cores-bisect" in {source.owner for source in tools["stress-ng"].sources}


def test_check_tools_finds_path_executables_and_checks_flashrom_support(tmp_path, monkeypatch):
    flashrom = tmp_path / "home" / "flashrom" / "usr" / "bin" / "flashrom"
    flashrom.parent.mkdir(parents=True)
    flashrom.write_text("#!/bin/sh\n", encoding="utf-8")
    flashrom.chmod(0o755)
    monkeypatch.setenv("HOME", str(tmp_path / "home"))
    monkeypatch.setattr("shutil.which", lambda _name: None)

    class Result:
        stdout = "Programmers available: internal"
        stderr = ""

    monkeypatch.setattr("subprocess.run", lambda *args, **kwargs: Result())
    tools = {tool.name: tool for tool in load_tools(DEPENDENCY_CATALOG)}
    statuses = check_tools([tools["flashrom"], tools["taskset"]])
    assert statuses[0].path == str(flashrom)
    assert statuses[0].note == ""
    assert statuses[1].path == ""


def test_check_tools_marks_flashrom_without_internal_programmer(tmp_path, monkeypatch):
    flashrom = tmp_path / "home" / "flashrom" / "usr" / "bin" / "flashrom"
    flashrom.parent.mkdir(parents=True)
    flashrom.write_text("#!/bin/sh\n", encoding="utf-8")
    flashrom.chmod(0o755)
    monkeypatch.setenv("HOME", str(tmp_path / "home"))
    monkeypatch.setattr("shutil.which", lambda _name: None)

    class Result:
        stdout = "Programmers available: linux_spi"
        stderr = ""

    monkeypatch.setattr("subprocess.run", lambda *args, **kwargs: Result())
    tool = next(tool for tool in load_tools(DEPENDENCY_CATALOG) if tool.name == "flashrom")
    status = check_tools([tool])[0]
    assert status.path == str(flashrom)
    assert status.note == "No internal programmer found."


def test_load_catalog_rejects_duplicate_packages(tmp_path):
    path = tmp_path / "dependencies.toml"
    path.write_text(
        '[[dependency]]\nname = "PyQt6"\n[[dependency.source]]\nowner = "portal"\nspecifier = ">=6"\n'
        '[[dependency]]\nname = "pyqt6"\n[[dependency.source]]\nowner = "core"\nspecifier = ">=6"\n',
        encoding="utf-8",
    )
    with pytest.raises(ValueError, match="duplicate dependency"):
        load_catalog(path)


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

    monkeypatch.setattr("urllib.request.urlopen", open_url)
    assert latest_pypi_version("PyQt6-Charts", "bc250-test") == "6.12.0"
    request, timeout = requests[0]
    assert request.full_url == "https://pypi.org/pypi/PyQt6-Charts/json"
    assert request.get_header("User-agent") == "bc250-test"
    assert timeout == 15


def test_checks_report_update_and_keep_results_when_other_package_fails():
    dependencies = load_catalog(DEPENDENCY_CATALOG)

    def latest(name, _user_agent):
        if name == "PyQt6":
            raise urllib.error.URLError("offline")
        return "6.12.0"

    results = check_dependencies(
        dependencies,
        "test-agent",
        get_installed=lambda _name: "6.11.0",
        get_latest=latest,
    )
    assert results[0].error and "offline" in results[0].error
    assert results[1].latest == "6.12.0" and results[1].update_available


def test_bad_pypi_response_is_an_explicit_check_error(monkeypatch):
    class Response(io.BytesIO):
        def __enter__(self):
            return self

        def __exit__(self, *args):
            self.close()

    monkeypatch.setattr("urllib.request.urlopen", lambda *_a, **_k: Response(b'{"info": {}}'))
    with pytest.raises(DependencyCheckError, match="latest version"):
        latest_pypi_version("PyQt6", "test-agent")
