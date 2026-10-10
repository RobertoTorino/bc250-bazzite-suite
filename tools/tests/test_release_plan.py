# SPDX-License-Identifier: GPL-3.0-or-later
"""tools/release_plan.py (and the release front end on top of it) in a small git repo of its own."""

from __future__ import annotations

import datetime
import importlib.util
import os
import subprocess
import sys
from pathlib import Path

import pytest

TOOLS = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(TOOLS))
spec = importlib.util.spec_from_file_location("release_plan", TOOLS / "release_plan.py")
rp = importlib.util.module_from_spec(spec)
sys.modules[spec.name] = rp
spec.loader.exec_module(rp)

SHA = "cd" * 32


def card(key: str, required: bool = False) -> str:
    return (f'[apps.{key}]\nname = "{key}"\nsummary = "s"\ntag = "{key}-v0.1.0"\nsha256 = ""\n'
            f'required = {"true" if required else "false"}\nchanges_board = false\ninstall = ["bash install.sh"]\n'
            f'uninstall = ["bash install.sh --uninstall"]\ndetect = ["~/.local/bin/{key}"]\n\n')


def write(path: Path, text: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_bytes(text.encode())


def sh(root: Path, *args: str) -> None:
    env = dict(os.environ, GIT_AUTHOR_NAME="t", GIT_AUTHOR_EMAIL="t@t", GIT_COMMITTER_NAME="t",
               GIT_COMMITTER_EMAIL="t@t")
    subprocess.run(["git", *args], cwd=root, check=True, capture_output=True, env=env)


@pytest.fixture
def repo(tmp_path) -> Path:
    root = tmp_path / "suite"
    write(root / "core/VERSION", "0.1.0\n")
    write(root / "core/bc250_core/__init__.py", '__version__ = "0.1.0"\n')
    write(root / "core/pyproject.toml", '[project]\nname = "c"\nversion = "0.1.0"\n')
    write(root / "core/CHANGELOG", "Changelog: 01-01-2026 00:00:00\n\nCore.\n")
    write(root / "portal/VERSION", "0.1.0\n")
    write(root / "portal/bc250_portal/__init__.py", '__version__ = "0.1.0"\n')
    write(root / "portal/CHANGELOG", "Changelog: 01-01-2026 00:00:00\n\nPortal.\n")
    write(root / "portal/apps.toml", "# the pins\n\n" + card("alpha", required=True) + card("beta"))
    for key in ("alpha", "beta"):
        write(root / f"apps/{key}/VERSION", "0.1.0\n")
        write(root / f"apps/{key}/{key}/__init__.py", f'APP = "{key}"\n__version__ = "0.1.0"\n')
        write(root / f"apps/{key}/run.sh", 'VERSION="0.1.0"\necho "$VERSION"\n')
        write(root / f"apps/{key}/tests/test_x.py", '__version__ = "0.1.0"\n')
        write(root / f"apps/{key}/CHANGELOG", "Changelog: 01-01-2026 00:00:00\n\nFirst.\n")
    sh(root, "init", "-q", "-b", "main")
    sh(root, "add", "-A")
    sh(root, "commit", "-q", "-m", "start")
    sh(root, "tag", "alpha-v0.1.0")
    sh(root, "branch", "pushed")                # stands in for origin/main
    write(root / "apps/alpha/alpha/extra.py", "x = 1\n")
    sh(root, "add", "-A")
    sh(root, "commit", "-q", "-m", "work")
    return root


def unit(root: Path, key: str) -> rp.Unit:
    return next(u for u in rp.load_units(root) if u.key == key)


def test_units(repo):
    units = {u.key: u for u in rp.load_units(repo)}
    assert list(units) == ["core", "portal", "alpha", "beta"]
    alpha = units["alpha"]
    assert (alpha.version, alpha.last_tag, alpha.commits, alpha.released) == ("0.1.0", "alpha-v0.1.0", 1, True)
    assert alpha.pinned_tag == "alpha-v0.1.0" and alpha.pinned_sha == ""
    assert units["beta"].last_tag is None and not units["beta"].released
    assert units["core"].kind == "core" and units["core"].last_tag is None


def test_versions():
    assert rp.next_versions("1.2.3") == {"patch": "1.2.4", "minor": "1.3.0", "major": "2.0.0"}
    assert rp.check_new_version("0.1.0", "0.1.0", released=False) == ""        # a first release as it is
    assert "already tagged" in rp.check_new_version("0.1.0", "0.1.0", released=True)
    assert "not higher" in rp.check_new_version("0.2.0", "0.1.9", released=False)
    assert "not x.y.z" in rp.check_new_version("0.1.0", "0.2", released=False)


def test_set_version_changes_every_copy_but_tests(repo):
    alpha = unit(repo, "alpha")
    changed = rp.set_version(repo, alpha, "0.2.0")
    assert {p.relative_to(repo).as_posix() for p in changed} == {
        "apps/alpha/VERSION", "apps/alpha/alpha/__init__.py", "apps/alpha/run.sh"}
    assert (repo / "apps/alpha/VERSION").read_text() == "0.2.0\n"
    assert (repo / "apps/alpha/alpha/__init__.py").read_text() == 'APP = "alpha"\n__version__ = "0.2.0"\n'
    assert (repo / "apps/alpha/run.sh").read_text().startswith('VERSION="0.2.0"\n')
    assert '"0.1.0"' in (repo / "apps/alpha/tests/test_x.py").read_text()
    core = unit(repo, "core")
    rp.set_version(repo, core, "0.2.0")
    assert 'version = "0.2.0"' in (repo / "core/pyproject.toml").read_text()


@pytest.mark.parametrize("utc, local", [
    ((2026, 10, 10, 18, 0), "10-10-2026 20:00:00"),          # CEST
    ((2026, 10, 25, 0, 59), "25-10-2026 02:59:00"),          # the last minute of CEST
    ((2026, 10, 25, 1, 0), "25-10-2026 02:00:00"),           # CET
    ((2026, 3, 29, 1, 0), "29-03-2026 03:00:00"),            # CEST again
    ((2026, 1, 5, 12, 0), "05-01-2026 13:00:00"),
])
def test_amsterdam_time(utc, local):
    now = datetime.datetime(*utc, tzinfo=datetime.timezone.utc)
    assert rp.amsterdam_now(now).strftime("%d-%m-%Y %H:%M:%S") == local


def test_changelog_entry(repo):
    now = datetime.datetime(2026, 10, 10, 18, 0, tzinfo=datetime.timezone.utc)
    rp.add_changelog_entry(repo, unit(repo, "beta"), rp.release_text("0.1.0", "  The first one. "), now)
    assert (repo / "apps/beta/CHANGELOG").read_text() == (
        "Changelog: 10-10-2026 20:00:00\n\nRelease 0.1.0. The first one.\n\n"
        "Changelog: 01-01-2026 00:00:00\n\nFirst.\n")
    assert rp.portal_text("0.2.0", ["alpha-v0.2.0"], "") == "Release 0.2.0. Pins alpha-v0.2.0."


def test_unreleased_pin_follows_the_version(repo):
    beta = unit(repo, "beta")                                 # pinned beta-v0.1.0, never tagged
    rp.set_version(repo, beta, "0.2.0")
    assert rp.follow_unreleased_pin(repo, beta)
    assert 'tag = "beta-v0.2.0"' in (repo / "portal/apps.toml").read_text()
    alpha = unit(repo, "alpha")                               # its pinned tag exists: the pin stays
    rp.set_version(repo, alpha, "0.2.0")
    assert not rp.follow_unreleased_pin(repo, alpha)
    assert 'tag = "alpha-v0.1.0"' in (repo / "portal/apps.toml").read_text()
    assert rp.portal_minimum(repo, "pushed", "0.1.0") == ("0.2.0", "beta 0.1.0 -> 0.2.0")


def test_pin_and_portal(repo):
    assert [u.key for u in rp.pin_candidates(rp.load_units(repo))] == ["alpha"]     # tagged, no sha256 yet
    assert rp.portal_minimum(repo, "pushed", "0.1.0") == ("", "")
    alpha = unit(repo, "alpha")
    rp.set_version(repo, alpha, "0.1.1")
    sh(repo, "tag", "alpha-v0.1.1")
    alpha = unit(repo, "alpha")
    assert rp.pin_candidates(rp.load_units(repo)) and alpha.released
    rp.pin(repo, alpha, SHA.upper())
    text = (repo / "portal/apps.toml").read_text()
    assert f'tag = "alpha-v0.1.1"\nsha256 = "{SHA}"' in text and text.startswith("# the pins\n")
    assert rp.pin_candidates(rp.load_units(repo)) == []
    assert rp.changed_pins(repo, "pushed") == ["alpha-v0.1.1"]
    assert rp.portal_minimum(repo, "pushed", "0.1.0") == ("0.1.1", "apps.toml changed")
    assert rp.portal_minimum(repo, "pushed", "0.2.0")[0] == "0.2.0"     # already bumped far enough


def test_commands():
    text = rp.app_commands(["alpha-v0.2.0", "beta-v0.1.0"])
    assert "git tag alpha-v0.2.0 && git push origin alpha-v0.2.0" in text and "git push\n" in text
    assert rp.portal_commands("portal-v0.2.0").endswith("git tag portal-v0.2.0 && git push origin portal-v0.2.0")


# --- The window -------------------------------------------------------------------------------------------------

@pytest.fixture
def window(repo, tmp_path):
    pytest.importorskip("PyQt6.QtWidgets")
    os.environ.setdefault("QT_QPA_PLATFORM", "offscreen")
    from PyQt6.QtCore import QSettings
    from PyQt6.QtWidgets import QApplication
    QSettings.setPath(QSettings.Format.IniFormat, QSettings.Scope.UserScope, str(tmp_path / "settings"))
    app = QApplication.instance() or QApplication([])          # noqa: F841 (kept alive for the window)
    import release_ui
    w = release_ui.ReleaseWindow(repo, sha256_source=lambda tag: SHA)
    w.portal_page.base_edit.setText("pushed")
    w.reload()
    yield w
    w.close()


def row(w, key):
    return next(r for r in w.apps_page.rows if r[0].key == key)


def test_window_release_then_portal(window, repo):
    keys = [r[0].key for r in window.apps_page.rows]
    assert keys == ["core", "alpha", "beta"]                  # the portal has its own step
    _, tick, combo, notes = row(window, "alpha")
    assert combo.currentText() == "0.1.1"                     # alpha 0.1.0 is tagged: a bump first
    _, btick, bcombo, _ = row(window, "beta")
    assert bcombo.currentText() == "0.1.0"                    # never tagged: as it is
    tick.setChecked(True)
    notes.setText("Fixes.")
    window.apps_page.apply()
    out = window.apps_page.output.toPlainText()
    assert (repo / "apps/alpha/VERSION").read_text() == "0.1.1\n"
    assert "Release 0.1.1. Fixes." in (repo / "apps/alpha/CHANGELOG").read_text()
    assert "git tag alpha-v0.1.1 && git push origin alpha-v0.1.1" in out
    assert "check_versions.py" in out

    sh(repo, "tag", "alpha-v0.1.1")                           # the owner tagged it; GitHub built it
    window.reload()
    page = window.portal_page
    assert [u.tag for u, _ in page.candidates] == ["alpha-v0.1.1"]
    page.pin()
    assert f'sha256 = "{SHA}"' in (repo / "portal/apps.toml").read_text()
    assert "at least 0.1.1" in page.minimum.text() and page.portal_version.currentText() == "0.1.1"
    page.bump()
    assert (repo / "portal/VERSION").read_text() == "0.1.1\n"
    assert '__version__ = "0.1.1"' in (repo / "portal/bc250_portal/__init__.py").read_text()
    assert "Release 0.1.1. Pins alpha-v0.1.1." in (repo / "portal/CHANGELOG").read_text()
    assert "git tag portal-v0.1.1" in page.output.toPlainText()


def test_window_refuses_a_tagged_version(window, repo, monkeypatch):
    from PyQt6.QtWidgets import QMessageBox
    warnings = []
    monkeypatch.setattr(QMessageBox, "warning", lambda _p, _t, text: warnings.append(text))
    _, tick, combo, _ = row(window, "alpha")
    tick.setChecked(True)
    combo.setEditText("0.1.0")
    window.apps_page.apply()
    assert "already tagged" in warnings[0]
    assert (repo / "apps/alpha/CHANGELOG").read_text().startswith("Changelog: 01-01-2026")


def test_window_reads_new_tags_when_step_2_opens(window, repo):
    _, tick, combo, _ = row(window, "alpha")
    tick.setChecked(True)                                     # typed in step 1: kept
    assert [u.tag for u, _ in window.portal_page.candidates] == ["alpha-v0.1.0"]
    rp.set_version(repo, unit(repo, "alpha"), "0.1.1")
    sh(repo, "tag", "alpha-v0.1.1")                           # tagged in a terminal while the window is open
    window.tabs.setCurrentIndex(1)
    assert [u.tag for u, _ in window.portal_page.candidates] == ["alpha-v0.1.1"]
    assert window.portal_page.empty_note.isHidden()
    assert row(window, "alpha")[1].isChecked()


def test_window_explains_an_empty_pin_list(window, repo):
    rp.pin(repo, unit(repo, "alpha"), SHA)
    window.reload()
    assert window.portal_page.candidates == []
    assert not window.portal_page.empty_note.isHidden()
    assert "Fetch tags" in window.portal_page.empty_note.text()
