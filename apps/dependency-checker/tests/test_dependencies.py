# SPDX-License-Identifier: GPL-3.0-or-later

from __future__ import annotations

import io
import json
import re
import tomllib
from pathlib import Path

import pytest

from bc250_dependency_checker import CATALOG, LOGO_PATH
from bc250_dependency_checker.dependencies import (
    App, DependencyCatalogError, DependencyCheckError, DependencyStatus, EnvironmentVersion, ToolStatus,
    Vulnerability, check_dependencies, check_tools, environment_versions, find_executable, installed_environments,
    known_vulnerabilities, latest_pypi_version, launcher_python, load_apps, load_catalog, load_tools, satisfies, tool_need,
)

SUITE = Path(__file__).resolve().parents[3]
PREFIX = "bc250_dependency_checker.dependencies"


def NO_CVES(_name, _version, _agent):
    return ()


class Response(io.BytesIO):
    def __enter__(self):
        return self

    def __exit__(self, *args):
        self.close()


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


def _venv(root: Path, packages: dict[str, str]) -> Path:
    site = root / "lib" / "python3.13" / "site-packages"
    for name, version in packages.items():
        info = site / f"{name.replace('-', '_')}-{version}.dist-info"
        info.mkdir(parents=True)
        (info / "METADATA").write_text(f"Metadata-Version: 2.1\nName: {name}\nVersion: {version}\n",
                                       encoding="utf-8")
    (root / "bin").mkdir(parents=True, exist_ok=True)
    return root


def _launcher(path: Path, venv: Path) -> Path:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(f'#!/usr/bin/env bash\ncd "/app" || exit 1\nexec "{venv}/bin/python" -m app "$@"\n',
                    encoding="utf-8")
    return path


def test_catalog_lists_python_and_external_dependencies():
    dependencies = load_catalog(CATALOG)
    tools = load_tools(CATALOG)

    assert {dependency.name for dependency in dependencies} == {
        "PyQt6", "PyQt6-Charts", "obsws-python", "dbus-next", "paramiko", "cryptography"}
    pyqt = next(dependency for dependency in dependencies if dependency.name == "PyQt6")
    assert {source.owner for source in pyqt.sources} >= {"portal", "core", "bazzite-test", "dependency-checker"}
    assert {tool.name for tool in tools} >= {"flashrom", "pkexec", "umr", "podman"}
    assert next(tool for tool in tools if tool.name == "flashrom").probe == "flashrom-internal"
    assert all(item.description for item in [*dependencies, *tools])
    assert LOGO_PATH.name == "bc250-dependency-checker.png"
    assert LOGO_PATH.is_file()


def test_app_has_the_standard_layout():
    app = SUITE / "apps" / "dependency-checker"
    assert (app / "bc250_dependency_checker" / "__main__.py").is_file()
    assert CATALOG == app / "bc250_dependency_checker" / "dependencies.toml"
    assert not (app / "portal-dependency-checker").exists()


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


def test_catalog_apps_match_the_portal_manifest():
    """Names and launchers come from portal/apps.toml (name, detect), so an installed app is found."""
    manifest = tomllib.loads((SUITE / "portal" / "apps.toml").read_text(encoding="utf-8"))["apps"]
    apps = load_apps(CATALOG)
    for key, entry in manifest.items():
        assert apps[key].name == entry["name"], key
        assert apps[key].launchers == tuple(entry["detect"]), key
    assert set(apps) == set(manifest) | {"portal", "core"}
    assert apps["core"].launchers == ()
    assert "bc250-bazzite-suite" in apps["portal"].launchers[0]


def test_every_tool_names_its_need_and_root():
    tools = {tool.name: tool for tool in load_tools(CATALOG)}
    assert {name for name, tool in tools.items() if tool.root} == {
        "flashrom", "umr", "smartctl", "fio", "setpci", "ras-mc-ctl", "grub2-mkconfig"}
    assert tool_need(tools["stress-ng"], {"cores-bisect"}) == "required"
    assert tool_need(tools["stress-ng"], {"bazzite-test"}) == "optional"
    assert tool_need(tools["stress-ng"], {"governor"}) == ""
    # Bazzite Test runs Ookla's speedtest, else speedtest-cli: one entry, either one will do.
    assert tools["speedtest"].executables == ("speedtest", "speedtest-cli")
    assert "speedtest-cli" not in tools


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
    assert {"mangohud", "vainfo", "clinfo", "rocminfo", "ujust", "grub2-mkconfig"} <= set(tools)


def test_catalog_tools_are_used_by_the_apps_that_list_them():
    for tool in load_tools(CATALOG):
        for source in tool.sources:
            words = tool.executables or (tool.name,)
            folder = SUITE / "apps" / source.owner
            texts = (p.read_text(encoding="utf-8", errors="replace") for p in folder.rglob("*")
                     if p.is_file() and p.suffix in ("", ".py", ".sh") and "tests" not in p.parts)
            assert any(re.search(rf"\b{re.escape(word)}\b", text) for text in texts for word in words), \
                f"{tool.name} is not used by {source.owner}"


def test_unknown_owner_and_need_are_catalog_errors(tmp_path):
    catalog = tmp_path / "dependencies.toml"
    catalog.write_text('[app.a]\nname = "A"\n\n[[tool]]\nname = "t"\ndescription = "d"\nexecutables = ["t"]\n\n'
                       '[[tool.source]]\nowner = "b"\nusage = "u"\n', encoding="utf-8")
    with pytest.raises(DependencyCatalogError, match="no \\[app.b\\]"):
        load_tools(catalog)
    catalog.write_text(catalog.read_text().replace('owner = "b"', 'owner = "a"\nneed = "maybe"'))
    with pytest.raises(DependencyCatalogError, match="need must be"):
        load_tools(catalog)


def test_launcher_python_reads_the_exec_line(tmp_path):
    venv = tmp_path / "venv"
    assert launcher_python(_launcher(tmp_path / "bin" / "app", venv)) == venv / "bin" / "python"
    helixsr = tmp_path / "helixsr"
    helixsr.write_text('cd "/x" && exec "/home/u/.local/share/h/venv/bin/python" -m h "$@"\n')
    assert launcher_python(helixsr) == Path("/home/u/.local/share/h/venv/bin/python")
    script = tmp_path / "script"
    script.write_text('exec "/checkout/apps/suite-releases/run.sh" "$@"\n')
    assert launcher_python(script) is None
    assert launcher_python(tmp_path / "missing") is None


def test_installed_environments_follow_each_launcher(tmp_path):
    shared = tmp_path / "suite" / "venv"
    own = tmp_path / "demo" / "venv"
    _launcher(tmp_path / "bin" / "test", shared)
    _launcher(tmp_path / "bin" / "demo", own)
    _launcher(tmp_path / "bin" / "bisect", tmp_path / "bisect" / "venv")
    _launcher(tmp_path / "bin" / "unlock", tmp_path / "unlock" / "venv")
    apps = {
        "bazzite-test": App("bazzite-test", "Test", (str(tmp_path / "bin" / "test"),)),
        "demo-tool": App("demo-tool", "Demo", (str(tmp_path / "bin" / "demo"),)),
        "cu-bisect": App("cu-bisect", "CU", (str(tmp_path / "bin" / "bisect"), str(tmp_path / "bin" / "unlock"))),
        "governor": App("governor", "Governor", (str(tmp_path / "bin" / "governor"),)),
        "core": App("core", "Shared core"),
    }
    environments = installed_environments(apps)
    assert environments == {
        "bazzite-test": (shared,),
        "demo-tool": (own,),
        "cu-bisect": (tmp_path / "bisect" / "venv", tmp_path / "unlock" / "venv"),
    }


def test_environment_versions_read_site_packages(tmp_path):
    venv = _venv(tmp_path / "venv", {"PyQt6": "6.11.0", "obsws-python": "1.8.0"})
    assert environment_versions(venv) == {"pyqt6": "6.11.0", "obsws-python": "1.8.0"}
    assert environment_versions(tmp_path / "nothing") == {}


def test_packages_are_checked_in_each_app_environment(tmp_path):
    """A package of an app with its own venv is found there, not reported missing from the shared one."""
    dependencies = {dependency.name: dependency for dependency in load_catalog(CATALOG)}
    shared = _venv(tmp_path / "shared", {"PyQt6": "6.11.0", "PyQt6-Charts": "6.11.0"})
    demo = _venv(tmp_path / "demo", {"PyQt6": "6.11.0", "obsws-python": "1.8.0"})
    environments = {"portal": (shared,), "bazzite-test": (shared,), "demo-tool": (demo,)}

    results = {result.dependency.name: result for result in check_dependencies(
        list(dependencies.values()), "test-agent", environments, get_latest=lambda name, _agent: {
            "PyQt6": "6.12.0", "PyQt6-Charts": "6.11.0", "obsws-python": "1.8.0", "dbus-next": "0.2.3",
            "paramiko": "4.0.0", "cryptography": "46.0.0"}[name],
        get_vulnerabilities=NO_CVES)}

    pyqt = results["PyQt6"]
    assert [(Path(env.environment), env.owners, env.version) for env in pyqt.environments] == [
        (shared, ("portal", "bazzite-test"), "6.11.0"), (demo, ("demo-tool",), "6.11.0")]
    assert pyqt.update_available and not pyqt.missing
    assert results["PyQt6-Charts"].needed and not results["PyQt6-Charts"].update_available
    assert results["obsws-python"].environments[0].version == "1.8.0" and not results["obsws-python"].missing
    assert [env.owners for env in results["dbus-next"].missing] == [("demo-tool",)]


def test_packages_of_apps_that_are_not_installed_are_not_needed():
    dependency = next(dependency for dependency in load_catalog(CATALOG) if dependency.name == "obsws-python")
    result = check_dependencies([dependency], "agent", {"bazzite-test": (Path("/x"),)},
                                get_versions=lambda _venv: {}, get_latest=lambda *_args: "1.8.0",
                                get_vulnerabilities=NO_CVES)[0]
    assert not result.needed and not result.missing and not result.update_available


def test_package_version_that_misses_the_requirement_is_reported(tmp_path):
    dependency = next(dependency for dependency in load_catalog(CATALOG) if dependency.name == "PyQt6")
    old = _venv(tmp_path / "old", {"PyQt6": "6.9.1"})
    result = check_dependencies([dependency], "agent", {"cores-bisect": (old,), "governor": (old,)},
                                get_latest=lambda *_args: "6.11.0", get_vulnerabilities=NO_CVES)[0]
    # cores-bisect accepts >=6.5, the governor wants >=6.11.
    assert result.unmet == (EnvironmentVersion(str(old), ("governor", "cores-bisect"), "6.9.1", ("governor",)),)


def test_package_checks_preserve_independent_results(tmp_path):
    dependencies = load_catalog(CATALOG)
    venv = _venv(tmp_path / "venv", {"PyQt6": "1.0.0"})

    def latest(name, _user_agent):
        if name == "PyQt6":
            return "9.9.9"
        raise DependencyCheckError("offline")

    results = check_dependencies(dependencies, "test-agent", {"portal": (venv,)}, get_latest=latest,
                                 get_vulnerabilities=NO_CVES)

    assert len(results) == 6
    assert results[0].update_available
    assert isinstance(results[0], DependencyStatus)
    assert all(result.error == "offline" for result in results[1:])


@pytest.mark.parametrize(("version", "specifier", "expected"), [
    ("6.11.0", ">=6.11,<7", True), ("6.10.2", ">=6.11,<7", False), ("7.0", ">=6.11,<7", False),
    ("6.5", ">=6.5,<7", True), ("1.8.0", "~=1.8", True), ("2.0", "~=1.8", False), ("0.2.3", "==0.2.3", True),
    ("0.2.4", "!=0.2.4", False), ("6.11.0", ">=6.*", True), ("", ">=1", True),
])
def test_satisfies(version, specifier, expected):
    assert satisfies(version, specifier) is expected


def test_tool_check_reports_path(monkeypatch):
    tool = next(tool for tool in load_tools(CATALOG) if tool.name == "pkexec")
    monkeypatch.setattr(f"{PREFIX}.shutil.which", lambda _name, path=None: "/usr/bin/pkexec")

    results = check_tools([tool])

    assert results == [ToolStatus(tool, "/usr/bin/pkexec")]


def test_tools_are_found_in_the_apps_extra_folders(tmp_path, monkeypatch):
    """A launch from the menu may lack ~/.local/bin on PATH; the apps look there anyway."""
    home = tmp_path / "home"
    speedtest = home / ".local" / "bin" / "speedtest"
    speedtest.parent.mkdir(parents=True)
    speedtest.write_text("#!/bin/sh\n", encoding="utf-8")
    speedtest.chmod(0o755)
    monkeypatch.setenv("HOME", str(home))
    monkeypatch.setenv("PATH", str(tmp_path / "empty"))
    assert find_executable("speedtest") == str(speedtest)
    tool = next(tool for tool in load_tools(CATALOG) if tool.name == "speedtest")
    assert check_tools([tool])[0].path == str(speedtest)


def test_either_speed_test_will_do(tmp_path, monkeypatch):
    bin_dir = tmp_path / "bin"
    bin_dir.mkdir()
    (bin_dir / "speedtest-cli").write_text("#!/bin/sh\n", encoding="utf-8")
    (bin_dir / "speedtest-cli").chmod(0o755)
    monkeypatch.setenv("PATH", str(bin_dir))
    monkeypatch.setenv("HOME", str(tmp_path / "home"))
    tool = next(tool for tool in load_tools(CATALOG) if tool.name == "speedtest")
    assert check_tools([tool])[0].path == str(bin_dir / "speedtest-cli")


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
    monkeypatch.setattr(f"{PREFIX}.shutil.which", lambda _name, path=None: None)

    class Result:
        stdout = f"Programmers available: {programmer}"
        stderr = ""

    monkeypatch.setattr(f"{PREFIX}.subprocess.run", lambda *args, **kwargs: Result())
    tool = next(tool for tool in load_tools(CATALOG) if tool.name == "flashrom")
    status = check_tools([tool])[0]

    assert status.path == str(flashrom)
    assert status.note == expected_note


def test_latest_pypi_version_uses_project_json(monkeypatch):
    requests = []

    def open_url(request, timeout):
        requests.append((request, timeout))
        return Response(json.dumps({"info": {"version": "6.12.0"}}).encode())

    monkeypatch.setattr(f"{PREFIX}.urllib.request.urlopen", open_url)
    assert latest_pypi_version("PyQt6-Charts", "bc250-test") == "6.12.0"
    request, timeout = requests[0]
    assert request.full_url == "https://pypi.org/pypi/PyQt6-Charts/json"
    assert request.get_header("User-agent") == "bc250-test"
    assert timeout == 15


def test_bad_pypi_response_is_an_explicit_check_error(monkeypatch):
    monkeypatch.setattr(
        f"{PREFIX}.urllib.request.urlopen",
        lambda *_args, **_kwargs: Response(b'{"info": {}}'),
    )
    with pytest.raises(DependencyCheckError, match="latest version"):
        latest_pypi_version("PyQt6", "test-agent")


def _osv(vulns, token=""):
    data = {"vulns": vulns}
    if token:
        data["next_page_token"] = token
    return Response(json.dumps(data).encode())


def test_known_vulnerabilities_merge_aliases_and_link_the_cve(monkeypatch):
    """OSV.dev has a GHSA and a PYSEC entry for one CVE: shown once, under the CVE ID, linked to Snyk."""
    pages = [
        _osv([{"id": "GHSA-j8r2-6x86-q33q", "aliases": ["CVE-2023-32681", "PYSEC-2023-74"],
               "summary": "Unintended leak of Proxy-Authorization header",
               "affected": [{"ranges": [{"type": "ECOSYSTEM", "events": [{"introduced": "2.3.0"},
                                                                          {"fixed": "2.31.0"}]}]}]}], token="next"),
        _osv([{"id": "PYSEC-2023-74", "aliases": ["CVE-2023-32681", "GHSA-j8r2-6x86-q33q"],
               "affected": [{"ranges": [{"type": "GIT", "events": [{"fixed": "74ea7cf"}]}]}]},
              {"id": "GHSA-aaaa-bbbb-cccc", "aliases": ["PYSEC-2024-1"], "summary": "No CVE yet"}]),
    ]
    bodies = []

    def open_url(request, timeout):
        bodies.append(json.loads(request.data))
        assert request.full_url == "https://api.osv.dev/v1/query" and timeout == 15
        return pages.pop(0)

    monkeypatch.setattr(f"{PREFIX}.urllib.request.urlopen", open_url)
    found = known_vulnerabilities("requests", "2.25.0", "agent")
    assert found == (
        Vulnerability("CVE-2023-32681", "Unintended leak of Proxy-Authorization header", "2.31.0",
                      "https://security.snyk.io/vuln/?search=CVE-2023-32681"),
        Vulnerability("GHSA-aaaa-bbbb-cccc", "No CVE yet", "", "https://osv.dev/vulnerability/GHSA-aaaa-bbbb-cccc"),
    )
    assert bodies[0] == {"package": {"name": "requests", "ecosystem": "PyPI"}, "version": "2.25.0"}
    assert bodies[1]["page_token"] == "next"


def test_no_known_vulnerabilities(monkeypatch):
    monkeypatch.setattr(f"{PREFIX}.urllib.request.urlopen", lambda *_args, **_kwargs: Response(b"{}"))
    assert known_vulnerabilities("PyQt6", "6.11.0", "agent") == ()


def test_vulnerabilities_are_checked_once_per_installed_version(tmp_path):
    dependency = next(dependency for dependency in load_catalog(CATALOG) if dependency.name == "PyQt6")
    shared = _venv(tmp_path / "shared", {"PyQt6": "6.10.0"})
    own = _venv(tmp_path / "own", {"PyQt6": "6.10.0"})
    asked = []
    cve = Vulnerability("CVE-2099-1", "x", "6.11.0", "u")

    def vulns(name, version, _agent):
        asked.append((name, version))
        return (cve,)

    result = check_dependencies([dependency], "agent", {"portal": (shared,), "governor": (own,)},
                                get_latest=lambda *_args: "6.11.0", get_vulnerabilities=vulns)[0]
    assert result.vulnerabilities == (("6.10.0", cve),)
    assert result.cve_checked
    assert asked == [("PyQt6", "6.10.0")]


def test_a_failed_vulnerability_check_is_not_reported_as_clean(tmp_path):
    dependency = next(dependency for dependency in load_catalog(CATALOG) if dependency.name == "PyQt6")
    venv = _venv(tmp_path / "venv", {"PyQt6": "6.11.0"})

    def offline(*_args):
        raise DependencyCheckError("offline")

    result = check_dependencies([dependency], "agent", {"portal": (venv,)}, get_latest=lambda *_args: "6.11.0",
                                get_vulnerabilities=offline)[0]
    assert result.cve_error == "offline" and not result.cve_checked and not result.vulnerabilities
