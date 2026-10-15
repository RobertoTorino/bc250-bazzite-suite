# SPDX-License-Identifier: GPL-3.0-or-later
"""plan.py (and the window on top of it) in a small git repo of its own."""

from __future__ import annotations

import datetime
import json
import os
import subprocess
import sys
from dataclasses import replace
from pathlib import Path

import pytest

from bc250_suite_releases import plan as rp

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
    write(root / "apps/standalone/VERSION", "0.1.0\n")
    write(root / "apps/standalone/.standalone", "Standalone app; do not add to portal/apps.toml.\n")
    write(root / "apps/releases/VERSION", "0.1.0\n")                  # like this app: never released
    write(root / "apps/releases/.standalone", "Not in the portal.\n")
    write(root / "apps/releases/.checkout-only", "No releases.\n")
    write(root / "apps/alpha/alpha/ui.py", "from bc250_core import widgets\n")      # alpha bundles core, beta not
    # A Rust crate, as Console Link has: Cargo.lock repeats the crate's version, next to another crate's.
    write(root / "apps/alpha/native/Cargo.toml", '[package]\nname = "alpha-core"\nversion = "0.1.0"\n')
    write(root / "apps/alpha/native/Cargo.lock", 'version = 4\n\n[[package]]\nname = "aes"\nversion = "0.1.0"\n\n'
                                                '[[package]]\nname = "alpha-core"\nversion = "0.1.0"\n')
    write(root / "docs/apps/alpha.md", "# Alpha\n")
    sh(root, "init", "-q", "-b", "main")
    sh(root, "add", "-A")
    sh(root, "commit", "-q", "-m", "start")
    sh(root, "tag", "alpha-v0.1.0")
    sh(root, "tag", "standalone-v0.1.0")
    sh(root, "branch", "pushed")                # stands in for origin/main
    write(root / "apps/alpha/alpha/extra.py", "x = 1\n")
    sh(root, "add", "-A")
    sh(root, "commit", "-q", "-m", "work")
    return root


def unit(root: Path, key: str) -> rp.Unit:
    return next(u for u in rp.load_units(root) if u.key == key)


def test_units(repo):
    units = {u.key: u for u in rp.load_units(repo)}
    assert list(units) == ["core", "portal", "alpha", "beta", "standalone"]   # not the checkout-only app
    alpha = units["alpha"]
    assert (alpha.version, alpha.last_tag, alpha.commits, alpha.released) == ("0.1.0", "alpha-v0.1.0", 1, True)
    assert alpha.pinned_tag == "alpha-v0.1.0" and alpha.pinned_sha == ""
    assert units["beta"].last_tag is None and not units["beta"].released
    assert units["standalone"].standalone and units["standalone"].released
    assert units["core"].kind == "core" and units["core"].last_tag is None


def test_versions():
    assert rp.next_versions("1.2.3") == {"patch": "1.2.4", "minor": "1.3.0", "major": "2.0.0"}
    assert rp.check_new_version("0.1.0", "0.1.0", released=False) == ""        # a first release as it is
    assert "already tagged" in rp.check_new_version("0.1.0", "0.1.0", released=True)
    assert "not higher" in rp.check_new_version("0.2.0", "0.1.9", released=False)
    assert "not x.y.z" in rp.check_new_version("0.1.0", "0.2", released=False)


def test_set_version_changes_a_copy_with_a_comment(repo):
    init = repo / "apps/alpha/alpha/__init__.py"
    init.write_text('APP = "alpha"\n__version__ = "0.1.0"   # equal to VERSION\n')
    rp.set_version(repo, unit(repo, "alpha"), "0.2.0")
    assert init.read_text() == 'APP = "alpha"\n__version__ = "0.2.0"   # equal to VERSION\n'      # comment kept


def test_set_version_changes_every_copy_but_tests(repo):
    alpha = unit(repo, "alpha")
    changed = rp.set_version(repo, alpha, "0.2.0")
    assert {p.relative_to(repo).as_posix() for p in changed} == {
        "apps/alpha/VERSION", "apps/alpha/alpha/__init__.py", "apps/alpha/run.sh", "apps/alpha/native/Cargo.toml",
        "apps/alpha/native/Cargo.lock"}
    lock = (repo / "apps/alpha/native/Cargo.lock").read_text()
    assert 'name = "alpha-core"\nversion = "0.2.0"' in lock and 'name = "aes"\nversion = "0.1.0"' in lock
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
    assert "tools/tag-release.sh alpha-v0.2.0 beta-v0.1.0" in text and "git push\n" in text
    assert text.index("git commit") < text.index("git push\n") < text.index("tag-release.sh")
    text = rp.portal_commands("portal-v0.2.0")
    assert "\ntools/tag-release.sh portal-v0.2.0\n" in text
    assert text.endswith(f"{rp.CHECK_SCRIPT} release portal-v0.2.0   # installs and starts the published portal release")
    order = [text.index(s) for s in ("git commit", "check-release.sh local", "git push\n", "tag-release.sh",
                                     "check-release.sh release")]
    assert order == sorted(order)                             # commit, test, push and tag, then check the release


def test_withdrawal(repo):
    now = datetime.datetime(2026, 10, 13, 12, 0, tzinfo=datetime.timezone.utc)
    units = rp.load_units(repo)
    assert [u.key for u in rp.withdrawable(repo, units)] == ["beta"]             # alpha is the required app
    beta = unit(repo, "beta")
    before = (repo / "portal/apps.toml").read_text()
    changed = rp.withdraw(repo, beta, 'Privacy: shows the "account ID".', now)
    text = (repo / "portal/apps.toml").read_text()
    assert text == before.replace('[apps.beta]\nname = "beta"\nsummary = "s"\n',
                                  '[apps.beta]\nname = "beta"\nsummary = "s"\n'
                                  'withdrawn = "Privacy: shows the \\"account ID\\"."\n')
    assert rp.withdrawn_reason(repo, "beta") == 'Privacy: shows the "account ID".'
    assert [p.relative_to(repo).as_posix() for p in changed] == ["portal/apps.toml", "apps/beta/CHANGELOG"]
    assert (repo / "apps/beta/CHANGELOG").read_text().startswith(
        'Changelog: 13-10-2026 14:00:00\n\nWithdrawn: beta-v0.1.0. Privacy: shows the "account ID".\n')
    # The portal release that follows: a minor bump, and its CHANGELOG entry names the withdrawal.
    assert rp.changed_withdrawals(repo, "pushed") == [("beta-v0.1.0", 'Privacy: shows the "account ID".')]
    assert rp.portal_minimum(repo, "pushed", "0.1.0") == ("0.2.0", "beta was withdrawn")
    assert rp.portal_text("0.2.0", [], "", rp.changed_withdrawals(repo, "pushed")) == (
        'Release 0.2.0. Withdraws beta-v0.1.0: Privacy: shows the "account ID".')
    commands = rp.withdraw_commands("beta-v0.1.0", "Privacy.", now)
    assert ("gh release edit beta-v0.1.0 --prerelease --title 'Withdrawn: beta-v0.1.0' --notes 'Withdrawn on "
            "13-10-2026: Privacy. Do not install this release.'") in commands
    # Taken back: apps.toml as it was, and a CHANGELOG entry that says so.
    rp.withdraw(repo, beta, "", now)
    assert (repo / "portal/apps.toml").read_text() == before
    assert "Withdrawal of beta-v0.1.0 taken back." in (repo / "apps/beta/CHANGELOG").read_text()
    with pytest.raises(ValueError, match="no \\[apps.gamma\\]"):
        rp.set_withdrawn(before, "gamma", "x")


# --- The window -------------------------------------------------------------------------------------------------

launched: list[str] = []


@pytest.fixture
def window(repo, tmp_path):
    pytest.importorskip("PyQt6.QtWidgets")
    os.environ.setdefault("QT_QPA_PLATFORM", "offscreen")
    from PyQt6.QtCore import QSettings
    from PyQt6.QtWidgets import QApplication
    QSettings.setPath(QSettings.Format.IniFormat, QSettings.Scope.UserScope, str(tmp_path / "settings"))
    app = QApplication.instance() or QApplication([])          # noqa: F841 (kept alive for the window)
    from bc250_suite_releases import main_window
    w = main_window.ReleaseWindow(repo, sha256_source=lambda tag: SHA, launch=launched.append, runs_source=None)
    w.portal_page.base_edit.setText("pushed")
    w.reload()
    yield w
    w.close()


def row(w, key):
    return next(r for r in w.apps_page.rows if r[0].key == key)


def test_window_release_then_portal(window, repo):
    keys = [r[0].key for r in window.apps_page.rows]
    assert keys == ["core", "alpha", "beta", "standalone"]   # standalone apps release independently
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
    assert "tools/tag-release.sh alpha-v0.1.1" in out
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
    assert "tools/tag-release.sh portal-v0.1.1" in page.output.toPlainText()


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


def test_window_refresh_reads_changes_and_keeps_what_was_typed(window, repo):
    _, tick, combo, notes = row(window, "alpha")
    tick.setChecked(True)
    combo.setEditText("0.2.0")
    notes.setText("Fixes.")
    window.portal_page.portal_notes.setText("Pins.")
    assert window.status.text() == "working tree clean"
    rp.set_version(repo, unit(repo, "beta"), "0.1.1")         # changed in a terminal while the window is open
    window.refresh()
    assert window.status.text() == "working tree has changes"
    _, tick, combo, notes = row(window, "alpha")
    assert (tick.isChecked(), combo.currentText(), notes.text()) == (True, "0.2.0", "Fixes.")
    _, btick, bcombo, _ = row(window, "beta")
    assert not btick.isChecked() and bcombo.currentText() == "0.1.1"   # not typed: what is offered now
    assert window.portal_page.portal_notes.text() == "Pins."


def test_window_explains_an_empty_pin_list(window, repo):
    rp.pin(repo, unit(repo, "alpha"), SHA)
    window.reload()
    assert window.portal_page.candidates == []
    assert not window.portal_page.empty_note.isHidden()
    assert "Fetch tags" in window.portal_page.empty_note.text()


def needs(root):
    return {u.key: (u.needs_release, u.release_reason, u.changed) for u in rp.load_units(root)}


def test_needs_release_follows_what_ships(repo):
    alpha = needs(repo)["alpha"]
    assert alpha == (True, "yes: 1 file", ["apps/alpha/alpha/extra.py"])          # committed after the tag
    assert needs(repo)["beta"][:2] == (True, "first release")
    assert needs(repo)["core"][0] is False
    sh(repo, "tag", "alpha-v0.1.1")                                               # released: nothing left
    assert needs(repo)["alpha"][:2] == (False, "no")
    write(repo / "apps/alpha/tests/test_y.py", "x = 2\n")                         # tests do not ship
    write(repo / "apps/alpha/requirements-dev.txt", "pytest\n")
    assert needs(repo)["alpha"][0] is False
    write(repo / "apps/alpha/alpha/__init__.py", 'APP = "alpha"\n__version__ = "0.1.0"\n# changed\n')
    assert needs(repo)["alpha"][2] == ["apps/alpha/alpha/__init__.py"]           # not committed yet
    write(repo / "apps/alpha/alpha/new.py", "y = 1\n")
    assert "apps/alpha/alpha/new.py" in needs(repo)["alpha"][2]                  # new, untracked


def test_core_and_manual_changes_count_for_the_apps_that_ship_them(repo):
    sh(repo, "tag", "alpha-v0.1.1")
    sh(repo, "tag", "beta-v0.1.0")
    write(repo / "core/bc250_core/widgets.py", "class StatusText: pass\n")
    state = needs(repo)
    assert state["alpha"][:2] == (True, "yes: core") and state["beta"][0] is False   # beta does not import core
    core = next(u for u in rp.load_units(repo) if u.kind == "core")
    assert (core.in_apps, core.changed, core.release_reason) == (
        ["alpha"], ["core/bc250_core/widgets.py"], "changed: goes into 1 app release")
    assert not core.needs_release                                                 # core itself is never tagged
    write(repo / "docs/apps/alpha.md", "# Alpha\n\nMore.\n")                      # shipped as MANUAL.md
    assert needs(repo)["alpha"][1] == "yes: 1 file + core"


def test_window_ticks_what_needs_a_release(window, repo):
    window.apps_page.tick_needed()
    ticked = [u.key for u, tick, _, _ in window.apps_page.rows if tick.isChecked()]
    assert ticked == ["alpha", "beta"]
    item = window.apps_page.table.item(1, 4)
    assert item.text() == "yes: 1 file" and "apps/alpha/alpha/extra.py" in item.toolTip()
    assert "needs a release" in window.portal_page.portal_needs.text()


def test_a_tag_before_the_bump_is_reported(repo):
    rp.set_version(repo, unit(repo, "beta"), "0.2.0")
    sh(repo, "tag", "beta-v0.2.0")                            # tagged, but the bump is not committed
    assert rp.bad_tags(repo, rp.load_units(repo)) == ["beta-v0.2.0 points at a commit where apps/beta/VERSION is 0.1.0"]
    sh(repo, "tag", "-d", "beta-v0.2.0")
    sh(repo, "commit", "-qam", "bump")
    sh(repo, "tag", "beta-v0.2.0")
    assert rp.bad_tags(repo, rp.load_units(repo)) == []


def test_window_warns_about_a_bad_tag(window, repo):
    assert window.bad_tags.isHidden()
    rp.set_version(repo, unit(repo, "beta"), "0.2.0")
    sh(repo, "tag", "beta-v0.2.0")
    window.reload()
    text = window.bad_tags.text()
    assert not window.bad_tags.isHidden() and "git tag -d beta-v0.2.0" in text and "tag-release.sh beta-v0.2.0" in text


@pytest.mark.skipif(not sys.platform.startswith("linux"), reason="the checks run on the board: Linux only")
def test_window_check_buttons(window, repo):
    page = window.portal_page
    launched.clear()
    page.local_button.click()
    page.release_button.click()
    script = str(repo / rp.CHECK_SCRIPT)
    assert launched == [f"{script} local", f"{script} release"]
    assert "published portal-v0.1.0 release" in page.output.toPlainText()
    assert "portal-v0.1.0" in page.release_button.toolTip()


# --- Run from the checkout ------------------------------------------------------------------------------------------

def add_windows(root: Path) -> None:
    """alpha and beta get a window each, beta changes the board, the standalone app keeps its package a level deeper
    (like demo-tool), and the checkout-only app has one too (like this app)."""
    for key in ("alpha", "beta"):
        write(root / f"apps/{key}/{key}/__main__.py", "print('hi')\n")
    write(root / "apps/alpha/alpha/__init__.py",
          'APP_NAME = "Alpha App"\nAPP_ID = "alpha-app"\nLOGO = ROOT / "images" / "alpha-logo.png"\n')
    for name in ("01-screenshot.png", "alpha-app.png", "alpha-logo.png"):
        write(root / f"apps/alpha/images/{name}", "png")
    write(root / "apps/alpha/tests/fake/__main__.py", "")                         # tests are never listed
    write(root / "apps/standalone/tool-dir/tool/__main__.py", "")
    write(root / "apps/releases/rel/__main__.py", "")
    toml = root / "portal/apps.toml"
    text = toml.read_text().replace('[apps.beta]\nname = "beta"\nsummary = "s"\ntag = "beta-v0.1.0"\nsha256 = ""\n'
                                    'required = false\nchanges_board = false',
                                    '[apps.beta]\nname = "beta"\nsummary = "s"\ntag = "beta-v0.1.0"\nsha256 = ""\n'
                                    'required = false\nchanges_board = true')
    assert "changes_board = true" in text
    toml.write_text(text)


def test_launch_targets(repo):
    add_windows(repo)
    targets = {t.module: t for t in rp.launch_targets(repo)}
    assert sorted(targets) == ["alpha", "beta", "tool"]                        # not the checkout-only app, not tests
    alpha, beta, tool = targets["alpha"], targets["beta"], targets["tool"]
    assert (alpha.name, alpha.label, alpha.folder) == ("Alpha App", "Alpha App 0.1.0", repo / "apps/alpha")
    assert alpha.icon == repo / "apps/alpha/images/alpha-logo.png"            # the one its __init__ names
    assert beta.changes_board and not alpha.changes_board and beta.name == "beta" and beta.icon is None
    assert tool.key == "standalone" and tool.folder == repo / "apps/standalone/tool-dir"
    command, env = rp.launch_command(repo, alpha, python="/venv/python")
    assert command == ["/venv/python", "-m", "alpha"]
    assert env["PYTHONPATH"].split(os.pathsep)[0] == str(repo / "core")


def test_docs_target(repo):
    assert rp.docs_target(repo) is None                                       # no mkdocs.yml
    write(repo / "mkdocs.yml", "site_name: S\nsite_url: https://example.invalid/suite/\n")
    docs = rp.docs_target(repo)
    assert (docs.module, docs.folder, docs.label) == ("mkdocs", repo, "Manual (local)")
    assert docs.url == f"http://{rp.DOCS_ADDRESS}/suite/"                      # the path of site_url
    command, _ = rp.launch_command(repo, docs, python="/venv/python")
    assert command == ["/venv/python", "-m", "mkdocs", "serve", "--dev-addr", rp.DOCS_ADDRESS]
    write(repo / "mkdocs.yml", "site_name: S\n")
    assert rp.docs_target(repo).url == f"http://{rp.DOCS_ADDRESS}/"


def test_window_serves_the_manual(window, repo, tmp_path, monkeypatch):
    from bc250_suite_releases import main_window
    write(repo / "mkdocs.yml", "site_name: S\nsite_url: https://example.invalid/suite/\n")
    monkeypatch.setattr(main_window, "LOG_DIR", tmp_path / "logs")
    started, opened, up = [], [], [False]
    monkeypatch.setattr(main_window, "answers", lambda url: up[0])
    monkeypatch.setattr(main_window, "open_url", opened.append)
    window.start = lambda command, env, cwd, log: started.append((command, cwd)) or FakeProcess()
    window.reload()
    page = window.run_page
    items = [page.apps.item(i) for i in range(page.apps.count())]
    docs = items[-1]                                                          # after the apps
    assert docs.text() == "Manual (local)"
    page.apps.itemClicked.emit(docs)
    assert started == [([sys.executable, "-m", "mkdocs", "serve", "--dev-addr", rp.DOCS_ADDRESS], repo)]
    page.poll()
    assert opened == []                                                       # not up yet
    up[0] = True
    page.poll()
    page.poll()
    assert opened == [f"http://{rp.DOCS_ADDRESS}/suite/"]                       # once
    page.apps.itemClicked.emit(docs)                                          # already up: only the page again
    assert len(started) == 1 and len(opened) == 2


class FakeProcess:
    def __init__(self, code=None):
        self.code = code

    def poll(self):
        return self.code


def test_window_runs_an_app_from_the_checkout(window, repo, tmp_path, monkeypatch):
    from PyQt6.QtWidgets import QMessageBox
    from bc250_suite_releases import main_window
    add_windows(repo)
    monkeypatch.setattr(main_window, "LOG_DIR", tmp_path / "logs")
    started = []
    window.start = lambda command, env, cwd, log: started.append((command, cwd, log)) or FakeProcess()
    window.reload()
    page = window.run_page
    items = {page.apps.item(i).data(0x0100).module: page.apps.item(i) for i in range(page.apps.count())}
    assert sorted(items) == ["alpha", "beta", "tool"] and "changes the board" in items["beta"].text()
    page.apps.itemClicked.emit(items["alpha"])
    assert started == [([sys.executable, "-m", "alpha"], repo / "apps/alpha", tmp_path / "logs/alpha.log")]
    with mock_question(QMessageBox.StandardButton.No) as asked:
        page.apps.itemClicked.emit(items["beta"])                              # a board app asks first
    assert asked.called and len(started) == 1
    with mock_question(QMessageBox.StandardButton.Yes):
        page.apps.itemClicked.emit(items["beta"])
    assert len(started) == 2 and page.timer.isActive()
    # alpha stops with an error: the end of its log shows; beta closes normally
    (tmp_path / "logs").mkdir()
    (tmp_path / "logs/alpha.log").write_text("Traceback (most recent call last):\nImportError: no module x\n")
    page.running[0][1].code, page.running[1][1].code = 1, 0
    page.poll()
    out = page.output.toPlainText()
    assert "Alpha App 0.1.0 stopped with exit code 1" in out and "ImportError: no module x" in out
    assert "beta 0.1.0 closed." in out and not page.running and not page.timer.isActive()


def mock_question(answer):
    from unittest import mock
    from PyQt6.QtWidgets import QMessageBox
    return mock.patch.object(QMessageBox, "question", return_value=answer)


def test_start_app_keeps_the_output_in_a_log(tmp_path):
    from bc250_suite_releases import main_window
    log = tmp_path / "logs" / "x.log"
    process = main_window.start_app([sys.executable, "-c", "print('hello'); raise SystemExit(3)"], dict(os.environ),
                                    tmp_path, log)
    assert process.wait(30) == 3
    assert main_window.log_tail(log) == "hello"


# --- GitHub builds ----------------------------------------------------------------------------------------------

def run(workflow="CI", ref="main", status="completed", conclusion="success", n=1, sha="abc1234def"):
    return {"name": workflow, "head_branch": ref, "status": status, "conclusion": conclusion if status == "completed"
            else None, "html_url": f"https://github.invalid/runs/{n}", "head_sha": sha, "display_title": "Fix it"}


def test_build_state_of_the_latest_push():
    runs = rp.parse_runs({"workflow_runs": [run(n=3), run("Release", "governor-v0.1.1", "in_progress", n=2),
                                            run(n=1, sha="older", conclusion="failure")]})
    latest = rp.latest_push(runs)
    assert [r.url[-1] for r in latest] == ["3", "2"]                          # not the older commit
    assert rp.build_state(latest) == "running" and latest[1].outcome == "in progress"
    done = [replace(latest[1], status="completed", conclusion="failure")]
    assert rp.build_state([latest[0], *done]) == "failed" and done[0].outcome == "failure"
    assert rp.build_state([latest[0], replace(latest[1], status="completed", conclusion="skipped")]) == "passed"
    assert rp.build_state([]) == "" and rp.parse_runs({"message": "rate limit"}) == []
    before = {r.url: r for r in runs}
    assert rp.just_finished(before, [latest[0], *done]) == done              # only what was seen running
    assert rp.just_finished({}, done) == []                                   # finished before the first look


def test_fetch_runs_sends_the_etag(monkeypatch):
    import io
    import urllib.error
    sent = []

    rate = {"X-RateLimit-Limit": "60", "X-RateLimit-Remaining": "57", "X-RateLimit-Reset": "1900000000"}

    class Response(io.BytesIO):
        headers = {"ETag": 'W/"new"', **rate}

        def __enter__(self):
            return self

        def __exit__(self, *exc):
            return False

    def urlopen(request, timeout):
        sent.append(request.get_header("If-none-match"))
        if sent[-1] == 'W/"new"':
            headers = dict(rate, **{"X-RateLimit-Remaining": "56"})
            raise urllib.error.HTTPError(request.full_url, 304, "Not Modified", headers, None)
        return Response(json.dumps({"workflow_runs": [run()]}).encode())

    monkeypatch.setattr(rp.urllib.request, "urlopen", urlopen)
    monkeypatch.setattr(rp, "_token", "")                                      # no login: never the real gh
    runs, etag, limit = rp.fetch_runs()
    assert [r.label for r in runs] == ["CI on main"] and etag == 'W/"new"' and sent == [None]
    assert limit == rp.RateInfo(60, 57, 1_900_000_000, signed_in=False)
    unchanged = rp.fetch_runs(etag)                                           # unchanged: 304, the limit still read
    assert unchanged[:2] == (None, 'W/"new"') and unchanged[2].remaining == 56
    assert "57 of 60 left until" in limit.text and limit.text.endswith("not signed in")
    assert rp.RateInfo.from_headers({}, False) is None


def test_github_token_from_the_environment_or_a_gh_login(monkeypatch):
    monkeypatch.setattr(rp, "_token", None)
    monkeypatch.setenv("GH_TOKEN", "from-env")
    monkeypatch.delenv("GITHUB_TOKEN", raising=False)
    assert rp.github_token(run=lambda *a, **k: pytest.fail("gh asked although a token was set")) == "from-env"
    monkeypatch.setattr(rp, "_token", None)
    monkeypatch.delenv("GH_TOKEN")
    monkeypatch.setattr(rp.shutil, "which", lambda name: "/usr/bin/gh")
    asked = []

    def gh(argv, **kw):
        asked.append(argv)
        return subprocess.CompletedProcess(argv, 0, "gho_login\n", "")
    assert rp.github_token(run=gh) == "gho_login" and asked == [["/usr/bin/gh", "auth", "token"]]
    assert rp.github_token(run=gh) == "gho_login" and len(asked) == 1         # asked once per run
    monkeypatch.setattr(rp, "_token", None)
    assert rp.github_token(run=lambda argv, **kw: subprocess.CompletedProcess(argv, 1, "", "not logged in")) == ""


def test_github_token_asked_once_while_checks_overlap(monkeypatch):
    import threading
    import time
    monkeypatch.setattr(rp, "_token", None)
    monkeypatch.delenv("GITHUB_TOKEN", raising=False)
    monkeypatch.delenv("GH_TOKEN", raising=False)
    monkeypatch.setattr(rp.shutil, "which", lambda name: "/usr/bin/gh")
    asked = []

    def slow_gh(argv, **kw):
        asked.append(argv)
        time.sleep(0.3)                                                       # gh still answering ...
        return subprocess.CompletedProcess(argv, 0, "gho_login\n", "")
    got = []
    first = threading.Thread(target=lambda: got.append(rp.github_token(run=slow_gh)))
    first.start()
    time.sleep(0.05)
    got.append(rp.github_token(run=slow_gh))                                  # ... when a second check asks
    first.join()
    assert got == ["gho_login", "gho_login"] and len(asked) == 1


def test_fetch_runs_signs_in_and_reports_the_limit(monkeypatch):
    import urllib.error
    from email.message import Message
    sent = []

    def limited(reset):
        headers = Message()
        headers["X-RateLimit-Remaining"] = "0"
        headers["X-RateLimit-Reset"] = str(reset)
        return headers

    def urlopen(request, timeout):
        sent.append(request.get_header("Authorization"))
        if sent[-1] == "Bearer expired":
            raise urllib.error.HTTPError(request.full_url, 401, "Bad credentials", Message(), None)
        raise urllib.error.HTTPError(request.full_url, 403, "rate limit exceeded", limited(1_900_000_000), None)

    monkeypatch.setattr(rp.urllib.request, "urlopen", urlopen)
    monkeypatch.setattr(rp, "_token", "expired")
    with pytest.raises(rp.RateLimited) as caught:
        rp.fetch_runs()
    assert sent == ["Bearer expired", None]                                   # a refused login: on without it
    assert caught.value.reset == 1_900_000_000 and not caught.value.signed_in and rp._token == ""
    monkeypatch.setattr(rp, "_token", "gho_login")
    with pytest.raises(rp.RateLimited) as caught:
        rp.fetch_runs()
    assert sent[-1] == "Bearer gho_login" and caught.value.signed_in


def test_window_build_indicator_notifies_when_a_run_ends(repo, tmp_path):
    pytest.importorskip("PyQt6.QtWidgets")
    os.environ.setdefault("QT_QPA_PLATFORM", "offscreen")
    from PyQt6.QtCore import QSettings
    from PyQt6.QtWidgets import QApplication
    QSettings.setPath(QSettings.Format.IniFormat, QSettings.Scope.UserScope, str(tmp_path / "settings"))
    app = QApplication.instance() or QApplication([])          # noqa: F841 (kept alive for the window)
    from bc250_suite_releases import main_window
    notes = []
    w = main_window.ReleaseWindow(repo, sha256_source=lambda tag: SHA, launch=launched.append,
                                  runs_source=lambda etag: (None, etag), notify=lambda *a: notes.append(a))
    build = w.build
    assert not build.isHidden()
    build.checked((rp.parse_runs({"workflow_runs": [run(n=2), run("Release", "governor-v0.1.1", "in_progress")]}),
                   "e1"))
    assert build.state == "running" and "building" in build.text() and notes == []
    assert build.timer.interval() == main_window.BUILD_BUSY_MS
    assert build.target() == "https://github.invalid/runs/1"                  # the run still going
    assert "Release on governor-v0.1.1: in progress" in build.toolTip()
    build.checked((None, "e1"))                                               # unchanged
    assert build.state == "running" and notes == []
    build.checked((rp.parse_runs({"workflow_runs": [run(n=2), run("Release", "governor-v0.1.1",
                                                                  conclusion="failure")]}), "e2"))
    assert build.state == "failed" and "failed" in build.text()
    assert notes == [("GitHub build failed", "Release on governor-v0.1.1: failure")]
    assert build.target() == "https://github.invalid/runs/1" and build.timer.interval() == main_window.BUILD_IDLE_MS
    assert "not known yet" in build.rate.text()
    build.checked((None, "e2", rp.RateInfo(5000, 4905, 1_900_000_000, signed_in=True)))
    assert "4,905 of 5,000 left" in build.rate.text() and "signed in" in build.rate.text()
    assert main_window.TEXT in build.rate.styleSheet() and "gh auth login" not in build.rate.toolTip()
    build.checked((None, "e2", rp.RateInfo(60, 3, 1_900_000_000, signed_in=False)))
    assert main_window.ORANGE in build.rate.styleSheet() and "gh auth login" in build.rate.toolTip()
    build.checked(OSError("offline"))
    assert build.state == "unreachable" and "offline" in build.toolTip()
    import time
    build.checked(rp.RateLimited(time.time() + 1800, signed_in=False))
    assert build.state == "limited" and "back at" in build.text() and "gh auth login" in build.toolTip()
    assert "0 of 60 left" in build.rate.text() and main_window.RED in build.rate.styleSheet()
    assert build.timer.interval() >= 1800_000                                 # waits for the reset
    build.checked(rp.RateLimited(time.time() + 60, signed_in=True))
    assert "gh auth login" not in build.toolTip() and build.timer.interval() == main_window.BUILD_IDLE_MS
    w.close()
    assert main_window.ReleaseWindow(repo, runs_source=None).build.isHidden()


def test_title_names_the_checkouts_commit_and_date(window, repo, tmp_path):
    from PyQt6.QtWidgets import QLabel
    from bc250_suite_releases import __version__
    head = subprocess.run(["git", "log", "-1", "--format=%h %cd", "--date=format:%d-%m-%Y"], cwd=repo,
                          capture_output=True, text=True).stdout.split()
    stamp = f"{head[0]} · {head[1]}"
    assert rp.checkout_stamp(repo) == stamp
    assert any(f"v{__version__} · {stamp}" in label.text() for label in window.findChildren(QLabel))
    elsewhere = tmp_path / "not-a-checkout"
    elsewhere.mkdir()
    assert rp.checkout_stamp(elsewhere) == ""


def test_window_withdraws_and_tests(window, repo, monkeypatch):
    page = window.withdraw_page
    assert [page.app_box.itemText(i) for i in range(page.app_box.count())] == ["beta-v0.1.0"]
    assert page.state.text() == "Not withdrawn." and not page.back_button.isEnabled()
    warned = []
    from PyQt6.QtWidgets import QMessageBox
    monkeypatch.setattr(QMessageBox, "warning", lambda *a, **k: warned.append(a[2]))
    page.withdraw_button.click()                                    # no reason: refused
    assert warned and rp.withdrawn_reason(repo, "beta") == ""
    page.reason_edit.setText("Security: a key in the log.")
    page.withdraw_button.click()
    assert rp.withdrawn_reason(repo, "beta") == "Security: a key in the log."
    assert page.state.text() == "Withdrawn: Security: a key in the log." and page.back_button.isEnabled()
    assert "gh release edit beta-v0.1.0 --prerelease" in page.output.toPlainText()
    launched.clear()
    page.test_button.click()
    assert launched == [f"{repo / rp.CHECK_SCRIPT} local"] and "App not available" in page.output.toPlainText()
    page.back_button.click()
    assert rp.withdrawn_reason(repo, "beta") == "" and page.state.text() == "Not withdrawn."
