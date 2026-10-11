# SPDX-License-Identifier: GPL-3.0-or-later
"""The window: enter the new versions, and it edits the files of a release (plan.py).

Step 1, Apps: tick the apps to release, enter their versions and notes, Apply. It writes VERSION, the copies
check_versions.py checks and a "Release x.y.z." CHANGELOG entry, runs check_versions.py and shows the git commands.
Step 2, Pin and portal: once GitHub has built the app releases, Pin fills in their tag and sha256 in apps.toml;
Bump portal writes the portal version (at least what check_manifest.py asks) and its CHANGELOG entry, runs
check_manifest.py and shows the git commands. Test updates and Test release run check-release.sh in a
terminal: the portal from the checkout before the push, the published portal release after it. Committing, tagging
and pushing stay with you.
Run from checkout: click an app's icon to start it from this checkout, to try it before its release; the Manual icon
serves the manual from the checkout (mkdocs serve) and opens it in the browser."""

from __future__ import annotations

import os
import shlex
import socket
import subprocess
import sys
from pathlib import Path

from PyQt6.QtCore import QSize, Qt, QTimer, QUrl
from PyQt6.QtGui import QColor, QDesktopServices, QIcon
from PyQt6.QtWidgets import (QCheckBox, QComboBox, QHBoxLayout, QHeaderView, QLabel, QLineEdit, QListView,
                             QListWidget, QListWidgetItem, QMainWindow, QMessageBox, QPushButton, QTableWidget,
                             QTableWidgetItem, QTabWidget, QVBoxLayout, QWidget)

from bc250_core.platform import launch_in_terminal
from bc250_core.theme import ORANGE
from bc250_core.widgets import ClickableLogo, Terminal, accent_button, hint_label, page_header

from . import APP_NAME, LOGO_PATH, SUITE, __version__
from . import plan as rp

COLUMNS = ("Release", "App", "VERSION", "Last tag", "Needs release", "New version", "Notes")
LOG_DIR = Path(os.environ.get("XDG_CACHE_HOME") or Path.home() / ".cache") / "bc250-release" / "run"


def run_check(root: Path, *args: str) -> str:
    result = subprocess.run([sys.executable, *args], cwd=root, capture_output=True, text=True)
    out = (result.stdout + result.stderr).strip()
    return f"$ python3 {' '.join(args)}\n{out or '(no output)'}\n" + ("" if result.returncode == 0 else
                                                                        f"exit code {result.returncode}\n")


def needs_tooltip(unit: rp.Unit) -> str:
    if unit.kind == "core":
        text = "Core is never tagged: each app that imports it ships its own copy, so a core change needs a release " \
               "of those apps (ticked with them, not here)."
        if unit.in_apps:
            text += "\n\nChanged: " + ", ".join(unit.changed) + "\nGoes into: " + ", ".join(unit.in_apps)
        return text
    if unit.last_tag is None:
        return "Never released."
    if not unit.changed:
        return f"Nothing it ships changed since {unit.last_tag}."
    files = unit.changed[:25] + ([f"… and {len(unit.changed) - 25} more"] if len(unit.changed) > 25 else [])
    return f"Changed since {unit.last_tag} ({unit.commits} commits, plus what is not committed):\n" + "\n".join(files)


class AppsPage(QWidget):
    """Step 1: the apps (and core) with their new versions."""

    def __init__(self, window: "ReleaseWindow"):
        super().__init__()
        self.window = window
        self.table = QTableWidget(0, len(COLUMNS))
        self.table.setHorizontalHeaderLabels(COLUMNS)
        self.table.verticalHeader().setVisible(False)
        header = self.table.horizontalHeader()
        header.setSectionResizeMode(QHeaderView.ResizeMode.ResizeToContents)
        header.setSectionResizeMode(len(COLUMNS) - 1, QHeaderView.ResizeMode.Stretch)
        self.apply_button = accent_button("Apply", "Write the new versions and CHANGELOG entries of the ticked apps")
        self.apply_button.clicked.connect(self.apply)
        self.tick_button = QPushButton("Tick what needs a release")
        self.tick_button.setToolTip("Tick every app whose shipped files changed since its last tag")
        self.tick_button.clicked.connect(self.tick_needed)
        self.output = Terminal()
        lay = QVBoxLayout(self)
        lay.addWidget(hint_label(
            "Tick the apps to release and enter their version: a never-tagged version can be released as it is. "
            "Apply writes VERSION, its copies (__version__, VERSION=, pyproject) and a \"Release x.y.z.\" "
            "CHANGELOG entry with the notes, which become the release notes on GitHub. Core is bundled with the "
            "apps and gets a version only, no tag. <b>Needs release</b> (orange): something the app ships (its "
            "folder without tests, the core it bundles, its manual chapter) differs from its last tag, committed or "
            "not; hover it for the files."))
        lay.addWidget(self.table, 2)
        row = QHBoxLayout()
        row.addWidget(self.tick_button)
        row.addStretch(1)
        row.addWidget(self.apply_button)
        lay.addLayout(row)
        lay.addWidget(self.output, 1)
        self.rows: list[tuple[rp.Unit, QCheckBox, QComboBox, QLineEdit]] = []

    def fill(self, units: list[rp.Unit]) -> None:
        shown = [u for u in units if u.kind != "portal"]
        self.table.setRowCount(len(shown))
        self.rows = []
        for i, unit in enumerate(shown):
            tick = QCheckBox()
            self.table.setCellWidget(i, 0, tick)
            reason = unit.release_reason
            if unit.needs_release and unit.last_tag and not unit.released:
                reason += f" · {unit.version} not tagged yet"
            tip = needs_tooltip(unit)
            for col, text in ((1, unit.key), (2, unit.version), (3, unit.last_tag or "—"), (4, reason)):
                item = QTableWidgetItem(text)
                item.setFlags(item.flags() & ~Qt.ItemFlag.ItemIsEditable)
                item.setToolTip(tip)
                if unit.needs_release:
                    item.setForeground(QColor(ORANGE))
                self.table.setItem(i, col, item)
            combo = QComboBox()
            combo.setEditable(True)
            choices = [] if unit.released or unit.kind == "core" else [unit.version]
            choices += list(rp.next_versions(unit.version).values())
            combo.addItems(choices)
            notes = QLineEdit()
            notes.setPlaceholderText("What this release brings (optional)")
            self.table.setCellWidget(i, 5, combo)
            self.table.setCellWidget(i, 6, notes)
            self.rows.append((unit, tick, combo, notes))

    def typed(self) -> dict[str, tuple[bool, str | None, str]]:
        """What was entered per app: the tick, a version only if it differs from the one offered, the notes."""
        return {unit.key: (tick.isChecked(), None if combo.currentText() == combo.itemText(0) else combo.currentText(),
                           notes.text()) for unit, tick, combo, notes in self.rows}

    def restore(self, typed: dict[str, tuple[bool, str | None, str]]) -> None:
        for unit, tick, combo, notes in self.rows:
            if unit.key in typed:
                checked, version, text = typed[unit.key]
                tick.setChecked(checked)
                if version is not None:
                    combo.setEditText(version)
                notes.setText(text)

    def tick_needed(self) -> None:
        for unit, tick, _, _ in self.rows:
            tick.setChecked(unit.needs_release)

    def apply(self) -> None:
        picked = [(u, combo.currentText().strip(), notes.text()) for u, tick, combo, notes in self.rows
                  if tick.isChecked()]
        if not picked:
            self.output.set_text("Tick at least one app.")
            return
        problems = [f"{u.key}: {msg}" for u, new, _ in picked
                    if (msg := rp.check_new_version(u.version, new, u.released or u.kind == "core"))]
        if problems:
            QMessageBox.warning(self, "Release", "\n".join(problems))
            return
        root = self.window.root
        log, tags, pins_moved = [], [], []
        for unit, new, notes in picked:
            if new != unit.version:
                changed = rp.set_version(root, unit, new)
                log.append(f"{unit.key}: {new} in " + ", ".join(str(p.relative_to(root)) for p in changed))
            text = f"Version {new}." if unit.kind == "core" else rp.release_text(new, notes)
            if unit.kind == "core" and notes.strip():
                text += f" {notes.strip()}"
            rp.add_changelog_entry(root, unit, text)
            log.append(f"{unit.key}: CHANGELOG entry \"{text}\"")
            if unit.kind == "app":
                tags.append(unit.tag)
                if rp.follow_unreleased_pin(root, unit):
                    pins_moved.append(unit.tag)
        if pins_moved:
            minimum, why = rp.portal_minimum(root, self.window.base(), self.window.portal_version())
            log.append(f"apps.toml: the never-released pins move along ({', '.join(pins_moved)}), so this push also "
                       f"needs portal {minimum or '?'} ({why}): do step 2's Bump portal before you commit.")
        log += ["", run_check(root, "tools/check_versions.py")]
        if tags:
            log += ["Then:", rp.app_commands(tags)]
        self.output.set_text("\n".join(log))
        self.window.reload()


class PortalPage(QWidget):
    """Step 2: pin the released apps and bump the portal."""

    def __init__(self, window: "ReleaseWindow"):
        super().__init__()
        self.window = window
        self.base_edit = QLineEdit("origin/main")
        self.base_edit.setToolTip("The last push: CI compares apps.toml and portal/VERSION with it")
        self.fetch_button = QPushButton("Fetch tags")
        self.fetch_button.setToolTip("git fetch --tags: see the tags pushed from another machine")
        self.fetch_button.clicked.connect(self.fetch_tags)
        self.pins = QTableWidget(0, 3)
        self.pins.setHorizontalHeaderLabels(("Pin", "Release", "Pinned now"))
        self.pins.verticalHeader().setVisible(False)
        self.pins.horizontalHeader().setSectionResizeMode(QHeaderView.ResizeMode.Stretch)
        self.pin_button = QPushButton("Pin")
        self.pin_button.setToolTip("Read each ticked release's SHA256SUMS from GitHub and pin tag and sha256")
        self.pin_button.clicked.connect(self.pin)
        self.empty_note = hint_label("")
        self.minimum = QLabel()
        self.portal_needs = QLabel()
        self.portal_version = QComboBox()
        self.portal_version.setEditable(True)
        self.portal_notes = QLineEdit()
        self.portal_notes.setPlaceholderText("What this portal release brings (optional)")
        self.bump_button = accent_button("Bump portal", "Write portal/VERSION, its copies and the CHANGELOG entry")
        self.bump_button.clicked.connect(self.bump)
        self.local_button = QPushButton("Test updates")
        self.local_button.setToolTip("Before the push: install the portal from this checkout and start it with the "
                                     "apps from the pinned GitHub releases (check-release.sh local)")
        self.local_button.clicked.connect(lambda: self.check("local"))
        self.release_button = QPushButton("Test release")
        self.release_button.clicked.connect(lambda: self.check("release"))
        if not sys.platform.startswith("linux"):
            for button in (self.local_button, self.release_button):
                button.setEnabled(False)
                button.setToolTip("Runs on the board: Linux only")
        self.output = Terminal()

        top = QHBoxLayout()
        top.addWidget(QLabel("Compare with:"))
        top.addWidget(self.base_edit)
        top.addWidget(self.fetch_button)
        top.addStretch(1)
        pin_row = QHBoxLayout()
        pin_row.addStretch(1)
        pin_row.addWidget(self.pin_button)
        portal_row = QHBoxLayout()
        portal_row.addWidget(QLabel("Portal version:"))
        portal_row.addWidget(self.portal_version)
        portal_row.addWidget(self.portal_notes, 1)
        portal_row.addWidget(self.bump_button)
        check_row = QHBoxLayout()
        check_row.addWidget(QLabel("Test on this board:"))
        check_row.addWidget(self.local_button)
        check_row.addWidget(self.release_button)
        check_row.addStretch(1)
        lay = QVBoxLayout(self)
        lay.addWidget(hint_label(
            "After step 1 is pushed and tagged, and GitHub has built those releases:<br>"
            "<b>1.</b> Pin: the new tags and their checksums go into apps.toml.<br>"
            "<b>2.</b> Bump portal: the portal version and a CHANGELOG entry that lists the pinned releases.<br>"
            "<b>3.</b> Commit, then <b>Test updates</b> on a BC-250: it installs the portal from the checkout and "
            "starts it with <code>--source release</code>, so the changed apps install from GitHub and must work.<br>"
            "<b>4.</b> Only then push and tag the portal: the tag is what reaches the users. The commands appear "
            "below after Bump portal.<br>"
            "<b>5.</b> Once GitHub's release workflow has built the portal: <b>Test release</b> downloads and installs "
            "that published release and starts it, so the board runs the official release again."))
        lay.addLayout(top)
        lay.addWidget(self.pins, 1)
        lay.addWidget(self.empty_note)
        lay.addLayout(pin_row)
        lay.addWidget(self.minimum)
        lay.addWidget(self.portal_needs)
        lay.addLayout(portal_row)
        lay.addLayout(check_row)
        lay.addWidget(self.output, 1)
        self.candidates: list[tuple[rp.Unit, QCheckBox]] = []

    def fill(self, units: list[rp.Unit]) -> None:
        cands = rp.pin_candidates(units)
        self.pins.setRowCount(len(cands))
        self.candidates = []
        for i, unit in enumerate(cands):
            tick = QCheckBox()
            tick.setChecked(True)
            self.pins.setCellWidget(i, 0, tick)
            for col, text in ((1, unit.tag), (2, unit.pinned_tag + ("" if unit.pinned_sha else " (no sha256)"))):
                self.pins.setItem(i, col, QTableWidgetItem(text))
            self.candidates.append((unit, tick))
        self.pin_button.setEnabled(bool(cands))
        self.empty_note.setText("" if cands else
                                "Nothing to pin: every app whose VERSION is tagged is already pinned with its checksum. "
                                "Tagged on another machine? Fetch tags. Not tagged yet? Do step 1, push, and push the "
                                "app tags first.")
        self.empty_note.setVisible(not cands)
        portal = next(u for u in units if u.kind == "portal")
        if portal.needs_release:
            self.portal_needs.setText(f"The portal needs a release: {portal.release_reason}"
                                      + (f" since {portal.last_tag}." if portal.last_tag else "."))
            self.portal_needs.setStyleSheet(f"color:{ORANGE}; font-weight:600;")
        else:
            self.portal_needs.setText(f"Nothing the portal ships changed since {portal.last_tag}.")
            self.portal_needs.setStyleSheet("")
        self.portal_needs.setToolTip(needs_tooltip(portal))
        minimum, why = rp.portal_minimum(self.window.root, self.window.base(), portal.version)
        if minimum:
            self.minimum.setText(f"apps.toml changed since {self.window.base()} ({why}): the portal needs at least "
                                 f"{minimum}.")
        else:
            self.minimum.setText(f"apps.toml is unchanged since {self.window.base()}.")
        choices = [minimum] if minimum and minimum != portal.version else []
        if not portal.released:
            choices.append(portal.version)
        choices += [v for v in rp.next_versions(portal.version).values() if v not in choices]
        self.portal_version.clear()
        self.portal_version.addItems(choices)
        if sys.platform.startswith("linux"):
            self.release_button.setToolTip(
                f"After GitHub built portal-v{portal.version}: download it, check it against its SHA256SUMS, install "
                "it and start it (check-release.sh release)")

    def check(self, mode: str) -> None:
        """Run check-release.sh in a terminal: it installs a portal and keeps it running there."""
        script = shlex.quote(str(self.window.root / rp.CHECK_SCRIPT))
        try:
            self.window.launch(f"{script} {mode}")
        except RuntimeError as exc:
            self.output.set_text(str(exc))
            return
        what = ("the portal from this checkout, then starts it with --source release" if mode == "local" else
                f"the published portal-v{self.window.portal_version()} release, then starts it")
        self.output.set_text(f"A terminal installs {what}. Close the portal there to finish.")

    def fetch_tags(self) -> None:
        out = rp.git(self.window.root, "fetch", "--tags", "--quiet")
        self.output.set_text("Tags fetched." if out is not None else "git fetch --tags failed.")
        self.window.reload()

    def pin(self) -> None:
        log = []
        for unit, tick in self.candidates:
            if not tick.isChecked():
                continue
            try:
                sha = self.window.sha256_source(unit.tag)
            except (OSError, SystemExit) as exc:
                log.append(f"{unit.tag}: no checksum yet ({exc}). Has GitHub finished that release?")
                continue
            rp.pin(self.window.root, unit, sha)
            log.append(f"{unit.tag}: pinned ({sha[:16]}…)")
        self.window.reload()
        self.output.set_text("\n".join(log) or "Tick a release to pin.")

    def bump(self) -> None:
        root = self.window.root
        units = rp.load_units(root)
        portal = next(u for u in units if u.kind == "portal")
        new = self.portal_version.currentText().strip()
        problem = rp.check_new_version(portal.version, new, portal.released)
        if problem:
            QMessageBox.warning(self, "Bump portal", problem)
            return
        log = []
        if new != portal.version:
            changed = rp.set_version(root, portal, new)
            log.append(f"portal: {new} in " + ", ".join(str(p.relative_to(root)) for p in changed))
        pins = rp.changed_pins(root, self.window.base())
        text = rp.portal_text(new, pins, self.portal_notes.text())
        rp.add_changelog_entry(root, portal, text)
        log += [f"portal: CHANGELOG entry \"{text}\"", "",
                run_check(root, "tools/check_versions.py"),
                run_check(root, "tools/check_manifest.py", "--base", self.window.base()),
                "Then:", rp.portal_commands(f"portal-v{new}")]
        self.output.set_text("\n".join(log))
        self.window.reload()


def start_app(command: list[str], env: dict[str, str], cwd: Path, log: Path) -> subprocess.Popen:
    """Starts an app in its own session, so it keeps running when this window closes; its output goes to *log*."""
    log.parent.mkdir(parents=True, exist_ok=True)
    with open(log, "wb") as out:
        return subprocess.Popen(command, cwd=cwd, env=env, stdin=subprocess.DEVNULL, stdout=out,
                                stderr=subprocess.STDOUT, start_new_session=True)


def answers(url: str) -> bool:
    """True when something listens at the host and port of *url* (a local server that is up)."""
    address = QUrl(url)
    try:
        with socket.create_connection((address.host(), address.port(80)), timeout=0.2):
            return True
    except OSError:
        return False


def open_url(url: str) -> None:
    QDesktopServices.openUrl(QUrl(url))


def log_tail(log: Path, lines: int = 20) -> str:
    try:
        return "\n".join(log.read_text(encoding="utf-8", errors="replace").splitlines()[-lines:])
    except OSError:
        return ""


class RunPage(QWidget):
    """Every app window in the checkout as an icon: a click starts it from the checkout, as it is before a release."""

    def __init__(self, window: "ReleaseWindow"):
        super().__init__()
        self.window = window
        self.apps = QListWidget()
        self.apps.setViewMode(QListView.ViewMode.IconMode)
        self.apps.setIconSize(QSize(64, 64))
        self.apps.setGridSize(QSize(150, 120))
        self.apps.setResizeMode(QListView.ResizeMode.Adjust)
        self.apps.setMovement(QListView.Movement.Static)
        self.apps.setWordWrap(True)
        self.apps.itemClicked.connect(lambda item: self.run(item.data(Qt.ItemDataRole.UserRole)))
        self.output = Terminal()
        lay = QVBoxLayout(self)
        lay.addWidget(hint_label(
            "Click an app to start it from this checkout, to try it before its release: <code>python -m</code> with "
            "this venv and the checkout's core, as <code>run.sh</code> starts this app. An app that changes how the "
            "board runs asks first; it uses the scripts in the checkout. Each app writes its output to "
            f"<code>{LOG_DIR}</code>; when it stops with an error, the end of that log shows below. "
            "<b>Manual (local)</b> serves the manual from the checkout with <code>mkdocs serve</code> and opens it in "
            "the browser; it rebuilds on every save."))
        lay.addWidget(self.apps, 2)
        lay.addWidget(self.output, 1)
        self.running: list[tuple[rp.Launch, subprocess.Popen, Path]] = []
        self.waiting: list[str] = []            # servers started, whose page opens once they answer
        self.timer = QTimer(self, interval=1000)
        self.timer.timeout.connect(self.poll)

    def fill(self, targets: list[rp.Launch]) -> None:
        self.apps.clear()
        for target in targets:
            item = QListWidgetItem(QIcon(str(target.icon)) if target.icon else QIcon(),
                                   target.label + ("\n\u26a0 changes the board" if target.changes_board else ""))
            item.setData(Qt.ItemDataRole.UserRole, target)
            item.setToolTip(" ".join(("python -m", target.module, *target.args)) + f" in {target.folder}" +
                            (f"\nopens {target.url}" if target.url else ""))
            self.apps.addItem(item)

    def run(self, target: rp.Launch) -> None:
        if target.changes_board and QMessageBox.question(
                self, "Run from checkout",
                f"{target.name} changes how the board runs. Like every app of the suite it is software-only and "
                f"reversible; started from the checkout it uses the scripts in {target.folder}.\n\nStart it?") \
                != QMessageBox.StandardButton.Yes:
            return
        if target.url and answers(target.url):
            # Already up (started here or before): mkdocs would only fail on the taken port.
            open_url(target.url)
            self.output.appendPlainText(f"{target.label} is already running: opened {target.url}")
            return
        command, env = rp.launch_command(self.window.root, target)
        log = LOG_DIR / f"{target.module}.log"
        try:
            process = self.window.start(command, env, target.folder, log)
        except OSError as exc:
            self.output.appendPlainText(f"{target.label}: could not start ({exc})")
            return
        self.running.append((target, process, log))
        if target.url:
            self.waiting.append(target.url)
        self.timer.start()
        self.output.appendPlainText(f"{target.label} started from {target.folder} (log: {log})" +
                                    (f"; {target.url} opens once it is up" if target.url else ""))

    def poll(self) -> None:
        for entry in list(self.running):
            target, process, log = entry
            code = process.poll()
            if code is None:
                if target.url in self.waiting and answers(target.url):
                    self.waiting.remove(target.url)
                    open_url(target.url)
                continue
            self.running.remove(entry)
            if target.url in self.waiting:
                self.waiting.remove(target.url)
            if code == 0:
                self.output.appendPlainText(f"{target.label} closed.")
            else:
                tail = log_tail(log)
                self.output.appendPlainText(f"{target.label} stopped with exit code {code}" +
                                        (f"; the end of {log}:\n{tail}" if tail else "."))
        if not self.running:
            self.timer.stop()


class ReleaseWindow(QMainWindow):
    def __init__(self, root: Path = SUITE, sha256_source=rp.fetch_sha256, launch=launch_in_terminal,
                 start=start_app):
        super().__init__()
        self.root = root
        self.sha256_source = sha256_source
        self.launch = launch
        self.start = start
        self.setWindowTitle(APP_NAME)
        self.resize(1100, 760)
        header, _ = page_header(APP_NAME)
        header.insertWidget(0, ClickableLogo(LOGO_PATH, 40))
        self.status = QLabel()
        header.addWidget(self.status)
        self.refresh_button = QPushButton("Refresh")
        self.refresh_button.setToolTip("Read the checkout and its tags again, for changes made in a terminal; "
                                       "what you entered stays")
        self.refresh_button.clicked.connect(self.refresh)
        header.addWidget(self.refresh_button)
        self.tabs = QTabWidget()
        self.apps_page = AppsPage(self)
        self.portal_page = PortalPage(self)
        self.tabs.addTab(self.apps_page, "1. Apps")
        self.tabs.addTab(self.portal_page, "2. Pin and portal")
        self.run_page = RunPage(self)
        self.tabs.addTab(self.run_page, "Run from checkout")
        # Opening step 2 reads the tags again, so tags pushed from a terminal meanwhile show up; step 1 keeps what
        # was typed in it.
        self.tabs.currentChanged.connect(lambda i: i == 1 and self.portal_page.fill(rp.load_units(self.root)))
        central = QWidget()
        lay = QVBoxLayout(central)
        lay.addLayout(header)
        self.bad_tags = QLabel()
        self.bad_tags.setWordWrap(True)
        self.bad_tags.setTextInteractionFlags(Qt.TextInteractionFlag.TextSelectableByMouse)
        self.bad_tags.setStyleSheet("color:#c62828; font-weight:600;")
        lay.addWidget(self.bad_tags)
        lay.addWidget(self.tabs, 1)
        lay.addWidget(hint_label("Only files change here. Commit, push and tag yourself, with the commands shown."))
        version = QLabel(f"{APP_NAME} {__version__} · edits {self.root}")
        version.setStyleSheet("color:palette(placeholder-text);")
        lay.addWidget(version, 0, Qt.AlignmentFlag.AlignRight)
        self.setCentralWidget(central)
        self.reload()

    def base(self) -> str:
        return self.portal_page.base_edit.text().strip() or "origin/main"

    def portal_version(self) -> str:
        return (self.root / "portal" / "VERSION").read_text(encoding="utf-8").strip()

    def refresh(self) -> None:
        """reload(), keeping what was entered: step 1's ticks, versions and notes, step 2's portal version (if it
        is not the one offered) and notes."""
        typed = self.apps_page.typed()
        combo = self.portal_page.portal_version
        version = None if combo.currentText() == combo.itemText(0) else combo.currentText()
        notes = self.portal_page.portal_notes.text()
        self.reload()
        self.apps_page.restore(typed)
        if version is not None:
            combo.setEditText(version)
        self.portal_page.portal_notes.setText(notes)

    def reload(self) -> None:
        units = rp.load_units(self.root)
        self.apps_page.fill(units)
        self.portal_page.fill(units)
        docs = rp.docs_target(self.root)
        self.run_page.fill(rp.launch_targets(self.root) + ([docs] if docs else []))
        problems = rp.bad_tags(self.root, units)
        self.bad_tags.setText("\n".join(
            f"\u26a0 {p}: release.yml cannot build it. Delete it (git tag -d {p.split()[0]} && git push origin "
            f":refs/tags/{p.split()[0]}), commit the bump, then tag again." for p in problems))
        self.bad_tags.setVisible(bool(problems))
        dirty = rp.git(self.root, "status", "--porcelain")
        self.status.setText("working tree has changes" if dirty else "working tree clean" if dirty is not None
                            else "not a git checkout")
