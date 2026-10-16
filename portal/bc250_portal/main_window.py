# SPDX-License-Identifier: GPL-3.0-or-later
"""The portal window: three sections of tiles, each folding away: BC250 Bazzite tools (bazzite-test fixed in first
place, then one tile per optional app; open until closed), Gaming (open until closed) and Development only (opens
on request).

Install, update and uninstall run the app's own installer in a terminal window (they may ask for the sudo
password and print what they do); the portal watches for the exit file the terminal writes and then refreshes.
An app that changes the board (unlocks, governor, ACPI) gets a warning before it is installed or opened.

Updates: a red dot marks every tile whose installed app differs from the version this portal pins, a red circular
arrow every installed app the portal has no record of (installed by hand, or under an earlier name of the app: its
version is unknown, so it needs a reinstall), the header counts both, and at start the portal looks for a newer portal release on GitHub (which is how newer app versions arrive).

Desktop icons: the portal's own icon is enough to reach every app, so the apps' icons on the Desktop are the user's
choice ("App icons on the Desktop", desktop_icons.py). The first start asks when app icons are there; off, the portal
removes them at start and after each install (the installers write one), on, it adds one for every installed app."""

from __future__ import annotations

import shlex
import subprocess
from html import escape
import tempfile
import uuid
from collections.abc import Callable
from dataclasses import dataclass
from pathlib import Path, PurePath

from PyQt6.QtCore import QCoreApplication, QEvent, QProcess, QSize, QTimer, Qt, QUrl, pyqtSignal
from PyQt6.QtGui import QColor, QDesktopServices, QIcon, QImage, QPainter, QPalette, QPixmap
from PyQt6.QtWidgets import (
    QCheckBox, QFileDialog, QFrame, QGridLayout, QHBoxLayout, QLabel, QMainWindow, QMenu, QMessageBox, QPushButton, QScrollArea,
    QToolButton, QVBoxLayout, QWidget,
)

from bc250_core import SUITE_MANUAL_URL, __version__ as CORE_VERSION
from bc250_core.platform import bin_home, expand, launch_in_terminal
from bc250_core.settings import open_settings, restore_geometry, save_geometry
from bc250_core.theme import ACCENT, BLUE, GREY, ORANGE, RED, header_font
from bc250_core.updates import ReleaseInfo, UpdateChecker, version_tuple
from bc250_core.widgets import ClickableLogo, hint_label

from . import desktop_icons, glyphs
from . import APP_ICONS, APP_ID, APP_NAME, INFO, LOGO_PATH, __version__, find_checkout, is_suite, remember_checkout
from .manifest import AppEntry
from .portal_update import PortalUpdate
from .sources import Records, SourceError, Sources, is_installed

POLL_MS = 1000
ICON_PX = 128                   # the app icon on its tile (the icon files are 128 x 128)
SYMBOL_PX = 28                  # the Install / Uninstall / Reinstall symbols beside it
DOT_PX = 16                     # the red update dot inside the icon
BADGE_PX = 24                   # the red circular arrow inside the icon: a reinstall is needed
TILE_WIDTH = 216                # the tiles flow left to right, as many to a row as fit
TILE_SPACING = 12
DEV_FRAME_MARGIN = 24           # a section's frame and margins take this much of the width
DEV_OPEN_KEY = "portal/development_open"
GAMING_OPEN_KEY = "portal/gaming_open"
TOOLS_OPEN_KEY = "portal/tools_open"
DESKTOP_ICONS_KEY = "portal/desktop_icons"
APP_ICON_FILES = {"dependency-checker": "portal-dependency-checker"}
LAUNCH_ICON_FILES = {("cu-bisect", "Unlock"): "cu-unlock", ("cores-bisect", "Unlock"): "cores-unlock"}  # else the app's

BOARD_WARNING = (
    "<p><b>{name} changes how your BC-250 runs</b> (clocks, voltages, unlocked units or firmware tables).</p>"
    "<p>A wrong setting can make the board unstable or stop it from booting until the change is undone. Read the "
    "app's manual first, know how to undo the change, and keep a way to reach the board without its desktop.</p>"
    "<p>{action}?</p>")


@dataclass
class Pending:
    entry: AppEntry
    action: str                 # "install" | "uninstall"
    exit_file: Path
    tag: str


def red_dot(size: int = 10, tooltip: str = "") -> QLabel:
    """The small red dot that marks an available update."""
    dot = QLabel()
    dot.setFixedSize(size, size)
    dot.setStyleSheet(f"background:{RED}; border-radius:{size // 2}px; border:2px solid palette(window);")
    dot.setToolTip(tooltip)
    dot.hide()
    return dot


def reinstall_badge(size: int = BADGE_PX) -> QLabel:
    """The red circular arrow that marks an app the portal has no record of: it needs a reinstall."""
    badge = QLabel()
    badge.setFixedSize(size, size)
    badge.setAlignment(Qt.AlignmentFlag.AlignCenter)
    badge.setStyleSheet(f"background:{RED}; border-radius:{size // 2}px; border:2px solid palette(window);")
    badge.setPixmap(glyphs.reinstall("white").pixmap(size - 8, size - 8))
    badge.hide()
    return badge


def shell_line(folder: PurePath, commands: tuple[str, ...]) -> str:
    """cd into the extracted app and run its commands in order, stopping at the first failure."""
    return " && ".join([f"cd {shlex.quote(str(folder))}", *commands])


def short_name(name: str) -> str:
    """The name on a tile: the suite's prefix is understood in the portal ("BC-250 Bazzite Test": "Bazzite Test")."""
    for prefix in ("BC-250 ", "BC250 "):
        if name.startswith(prefix):
            return name[len(prefix):]
    return name


def greyed(pixmap: QPixmap) -> QPixmap:
    """The icon of an app that is not installed: grey and faded, with its own transparency kept."""
    image = pixmap.toImage().convertToFormat(QImage.Format.Format_ARGB32)
    grey = image.convertToFormat(QImage.Format.Format_Grayscale8).convertToFormat(QImage.Format.Format_ARGB32)
    grey.setAlphaChannel(image.convertToFormat(QImage.Format.Format_Alpha8))
    out = QPixmap(pixmap.size())
    out.fill(Qt.GlobalColor.transparent)
    painter = QPainter(out)
    painter.setOpacity(0.45)
    painter.drawImage(0, 0, grey)
    painter.end()
    return out


def placeholder_icon(name: str) -> QPixmap:
    """For an app without an icon file: its initial on a grey tile."""
    pixmap = QPixmap(ICON_PX, ICON_PX)
    pixmap.fill(Qt.GlobalColor.transparent)
    painter = QPainter(pixmap)
    painter.setRenderHint(QPainter.RenderHint.Antialiasing)
    painter.setPen(Qt.PenStyle.NoPen)
    painter.setBrush(QColor(GREY))
    painter.drawRoundedRect(4, 4, ICON_PX - 8, ICON_PX - 8, 20, 20)
    font = painter.font()
    font.setPixelSize(ICON_PX // 2)
    font.setBold(True)
    painter.setFont(font)
    painter.setPen(QColor("white"))
    painter.drawText(pixmap.rect(), Qt.AlignmentFlag.AlignCenter, short_name(name)[:1].upper())
    painter.end()
    return pixmap


def still_icon(pixmap: QPixmap) -> QIcon:
    """An icon that looks the same on a disabled button: the tile chooses itself when it is greyed."""
    icon = QIcon()
    for mode in (QIcon.Mode.Normal, QIcon.Mode.Disabled, QIcon.Mode.Active):
        icon.addPixmap(pixmap, mode)
    return icon


class AppTile(QFrame):
    """One app, compact: its short name, its icon (click: open; hover: what it does; grey: not installed; red dot:
    an update; red circular arrow: a reinstall is needed), "changes the board" under it when so, and beside it the
    symbol buttons: Install and Uninstall, or only Install (which reinstalls it) for bazzite-test."""

    install_clicked = pyqtSignal(object)
    uninstall_clicked = pyqtSignal(object)
    open_clicked = pyqtSignal(object, str)

    def __init__(self, entry: AppEntry, parent: QWidget | None = None):
        super().__init__(parent)
        self.entry = entry
        self.status = ""
        self.setFixedWidth(TILE_WIDTH)
        outer = QVBoxLayout(self)
        outer.setContentsMargins(4, 4, 4, 4)
        outer.setSpacing(4)
        self.title = QLabel(entry.short or short_name(entry.name))
        self.title.setWordWrap(True)
        self.title.setStyleSheet(header_font() + "font-size:15px; font-weight:700;")
        outer.addWidget(self.title)
        row = QHBoxLayout()
        row.setSpacing(6)
        outer.addLayout(row)
        under = QVBoxLayout()
        under.setSpacing(2)
        row.addLayout(under)

        file = APP_ICONS / f"{APP_ICON_FILES.get(entry.key, entry.key)}.png"
        loaded = QPixmap(str(file)) if file.is_file() else QPixmap()
        self.has_icon = not loaded.isNull()
        pixmap = loaded.scaled(ICON_PX, ICON_PX, Qt.AspectRatioMode.KeepAspectRatio,
                               Qt.TransformationMode.SmoothTransformation) if self.has_icon \
            else placeholder_icon(entry.name)
        self._icons = (still_icon(pixmap), still_icon(greyed(pixmap)))      # installed, not installed
        self.icon = QToolButton()
        self.icon.setIconSize(QSize(ICON_PX, ICON_PX))
        self.icon.setFixedSize(ICON_PX + 8, ICON_PX + 8)
        self.icon.setAutoRaise(True)
        # Off-white behind the icon on hover (palette(midlight) was near-black on the dark theme), and a press
        # that shows: a solid off-white and the icon nudged down-right, as a real button sinks.
        self.icon.setStyleSheet("QToolButton { border:none; border-radius:18px; }"
                                "QToolButton:hover:enabled { background:#D9FAF7F0; }"
                                "QToolButton:pressed:enabled { background:#FFF2EFE6; padding-top:2px;"
                                " padding-left:2px; }"
                                "QToolButton::menu-indicator { image:none; width:0; }")
        self.open_button = self.icon                    # clicking the icon opens the app
        if len(entry.launch) > 1:
            menu = QMenu(self.icon)
            for label, command in entry.launch:
                action = menu.addAction(label, lambda c=command: self.open_clicked.emit(self.entry, c))
                own = APP_ICONS / f"{LAUNCH_ICON_FILES.get((entry.key, label), '')}.png"
                action.setIcon(QIcon(str(own)) if (entry.key, label) in LAUNCH_ICON_FILES and own.is_file()
                               else QIcon(pixmap))
            self.icon.setMenu(menu)
            self.icon.setPopupMode(QToolButton.ToolButtonPopupMode.InstantPopup)
        elif entry.launch:
            self.icon.clicked.connect(lambda: self.open_clicked.emit(self.entry, entry.launch[0][1]))
        under.addWidget(self.icon, 0, Qt.AlignmentFlag.AlignHCenter)
        self.dot = red_dot(DOT_PX)
        self.dot.setParent(self.icon)
        self.dot.move(ICON_PX - DOT_PX - 4, ICON_PX - DOT_PX - 4)          # inside the icon, bottom right
        self.badge = reinstall_badge()
        self.badge.setParent(self.icon)
        self.badge.move(ICON_PX - BADGE_PX - 4, ICON_PX - BADGE_PX - 4)    # in the same corner
        self.board = QLabel("changes the board")
        self.board.setStyleSheet(f"color:{ORANGE}; font-size:11px; font-weight:700;")
        self.board.setToolTip("It changes how the board runs; the portal asks first before installing or opening it.")
        self.board.setVisible(entry.changes_board and not entry.withdrawn)
        under.addWidget(self.board, 0, Qt.AlignmentFlag.AlignHCenter)
        self.withdrawn = QLabel("App not available")
        self.withdrawn.setStyleSheet(f"color:{RED}; font-size:11px; font-weight:700;")
        self.withdrawn.setToolTip(f"Its release was withdrawn: {entry.withdrawn}" if entry.withdrawn else "")
        self.withdrawn.setVisible(bool(entry.withdrawn))
        under.addWidget(self.withdrawn, 0, Qt.AlignmentFlag.AlignHCenter)
        self.busy_label = QLabel()
        self.busy_label.setStyleSheet(f"color:{BLUE}; font-size:11px; font-weight:700;")
        self.busy_label.hide()
        under.addWidget(self.busy_label, 0, Qt.AlignmentFlag.AlignHCenter)
        under.addStretch(1)

        buttons = QVBoxLayout()
        buttons.setSpacing(6)
        buttons.addStretch(1)
        self.install_button = self._symbol_button()
        self.install_button.clicked.connect(lambda: self.install_clicked.emit(self.entry))
        self.uninstall_button = self._symbol_button()
        self.uninstall_button.setIcon(glyphs.uninstall(self._ink()))
        self.uninstall_button.setToolTip(f"Uninstall {entry.name}")
        self.uninstall_button.clicked.connect(lambda: self.uninstall_clicked.emit(self.entry))
        # bazzite-test is part of the suite: it goes when the portal is uninstalled (packaging/install.sh --uninstall).
        self.uninstall_button.setVisible(not entry.required)
        buttons.addWidget(self.install_button)
        buttons.addWidget(self.uninstall_button)
        buttons.addStretch(1)
        row.addLayout(buttons)
        row.addStretch(1)
        outer.addStretch(1)

    def _symbol_button(self) -> QToolButton:
        button = QToolButton()
        button.setFixedSize(SYMBOL_PX + 12, SYMBOL_PX + 12)
        button.setIconSize(QSize(SYMBOL_PX, SYMBOL_PX))
        button.setAutoRaise(True)
        button.setStyleSheet(f"QToolButton {{ border:1px solid transparent; border-radius:8px; }}"
                             f"QToolButton:hover:enabled {{ border:1px solid {ACCENT}; }}")
        return button

    def _ink(self) -> str:
        return self.palette().color(QPalette.ColorRole.ButtonText).name()

    def show_state(self, installed: bool, installed_tag: str, busy: str = "", available: bool = True) -> str:
        """Show the app's state; "update" when an update is available, "reinstall" when a reinstall is needed, else
        "". *available* False: a checkout-only app in a portal that does not know a checkout yet; it asks for one
        when the app is installed or removed."""
        entry = self.entry
        # An update needs a known, different tag. An app installed some other way (by hand, or under an earlier
        # name of the app) has none recorded: its version is unknown, so it needs a reinstall.
        update = (installed and bool(installed_tag) and bool(entry.tag) and installed_tag not in (entry.tag, "local")
                  and not entry.withdrawn)
        reinstall = installed and not installed_tag and not entry.withdrawn
        self.dot.setVisible(update)
        self.dot.setToolTip(f"Update available: {entry.tag} (installed {installed_tag})." if update else "")
        self.badge.setVisible(reinstall)
        self.badge.setToolTip("Reinstall needed: the portal did not install it, so its version is unknown."
                              if reinstall else "")
        if busy:
            self.status, detail = busy, busy
        elif entry.withdrawn:
            self.status = "App not available"
            detail = (f"App not available: its release was withdrawn ({entry.withdrawn}). "
                      + ("The portal removes it from the board." if installed else "It cannot be installed."))
        elif not installed:
            self.status, detail = "Not installed", "Not installed: install it with the button beside the icon."
        elif update:
            self.status, detail = "Update", f"Update available: installed {installed_tag}, this portal pins {entry.tag}."
        elif reinstall:
            self.status = "Reinstall needed"
            detail = ("Reinstall needed: it is installed, but not by this portal (by hand, or under an earlier name "
                      "of the app), so its version is unknown. Reinstall it with the red button beside the icon.")
        else:
            self.status = "Installed"
            detail = (f"Installed from {installed_tag}." if installed_tag != "local" else
                      "Installed from the suite checkout.")
        if not available and not busy:
            detail += (" It runs from a suite checkout and has no release, and the portal found no checkout in "
                       "your home folder: it asks for one when you install it.")
        self.busy_label.setText(busy)
        self.busy_label.setVisible(bool(busy))
        self.icon.setIcon(self._icons[0 if installed else 1])
        opens = installed and not busy and bool(entry.launch) and not entry.withdrawn
        self.icon.setEnabled(opens)
        self.icon.setCursor(Qt.CursorShape.PointingHandCursor if opens else Qt.CursorShape.ArrowCursor)
        how = ("Click to open it." if len(entry.launch) == 1 else
               "Click to open: " + ", ".join(label for label, _ in entry.launch) + "." if entry.launch else
               "Not a program: nothing to open.")
        source = entry.tag or "runs from the suite checkout"
        self.icon.setToolTip(f"<p><b>{escape(entry.name)}</b></p><p>{escape(entry.summary)}</p>"
                             f"<p style='color:gray;'>{escape(detail)}<br>{escape(source)}"
                             + (f"<br>{escape(how)}" if installed else "") + "</p>")

        action, ink = ("Update", RED) if update else ("Reinstall", RED) if reinstall else \
            ("Reinstall", self._ink()) if installed else ("Install", self._ink())
        # The arrow into a tray for every app, Bazzite Test too (owner, 14-10-2026); the circular arrow only when the
        # version is unknown.
        draw = glyphs.reinstall if reinstall else glyphs.install
        self.install_button.setIcon(draw(ink))
        self.install_button.setToolTip(f"{action} {entry.name}" + (f" v{entry.version}" if entry.tag else "")
                                       if not entry.withdrawn else f"App not available: {entry.withdrawn}")
        self.install_button.setEnabled(not busy and not entry.withdrawn)
        self.uninstall_button.setEnabled(installed and not busy)
        return "update" if update else "reinstall" if reinstall else ""


class MainWindow(QMainWindow):
    def __init__(self, entries: list[AppEntry], sources: Sources, records: Records,
                 portal_check: Callable[[], ReleaseInfo] | None = None, local_build: Path | None = None,
                 desktop: Path | None = None, menu: Path | None = None, parent: QWidget | None = None,
                 installed: Path | None = None, launch: Callable[[list[str]], bool] | None = None):
        """*portal_check* returns the newest portal release (run once, off the GUI thread); None: no check.
        *local_build* is the suite checkout this portal runs from or was installed from: a banner says so.
        *desktop* and *menu* are the Desktop folder and the app menu entries' folder (default: the user's).
        *installed* is where the installed portal is (installed_copy()): a newer one there offers a restart; None: no
        check. *launch* starts a program detached (default QProcess.startDetached; tests pass a fake)."""
        super().__init__(parent)
        self.entries = entries
        self.desktop = desktop or desktop_icons.desktop_dir()
        self.menu = menu or desktop_icons.menu_dir()
        self.sources = sources
        self.records = records
        self.pending: Pending | None = None
        self.worker = UpdateChecker(self)               # generic: runs one job off the GUI thread
        self.worker.finished.connect(self._prepared)
        self._job: tuple[AppEntry, str] | None = None
        self._withdrawal_tried: set[str] = set()        # withdrawn apps the portal tried to remove this time
        self.settings = open_settings(INFO, self)
        self.installed = installed
        self.launch = launch or (lambda argv: QProcess.startDetached(argv[0], argv[1:])[0])
        self.setWindowTitle(INFO.display_name)
        self.resize(900, 720)

        central = QWidget()
        root = QVBoxLayout(central)
        self.local_banner = QLabel()
        self.local_banner.setWordWrap(True)
        self.local_banner.setStyleSheet(f"background:{ORANGE}; color:white; font-weight:700; padding:6px 10px;")
        if local_build is not None:
            self.local_banner.setText(f"Local build: this portal comes from the checkout {local_build}, "
                                      "not from a published release.")
        self.local_banner.setVisible(local_build is not None)
        root.addWidget(self.local_banner)
        header = QHBoxLayout()
        if LOGO_PATH.is_file():
            self.logo = ClickableLogo(LOGO_PATH, 56)
            self.logo.setToolTip("Open the wiki in the browser")
            self.logo.clicked.connect(self.open_wiki)
            header.addWidget(self.logo)
            header.addSpacing(14)
        title = QLabel(f"{APP_NAME}  <span style='color:#9aa0a6; font-size:16px;'>v{__version__}</span>")
        title.setStyleSheet(header_font() + "font-size:32px; font-weight:800;")
        title.setToolTip(f"{APP_NAME} {__version__} · core {CORE_VERSION}")
        header.addWidget(title, 1)
        self.updates_label = QLabel()
        self.updates_label.setStyleSheet(f"color:{RED}; font-weight:700;")
        self.updates_label.hide()
        header.addWidget(self.updates_label)
        self.portal_button = QPushButton()
        self.portal_button.setStyleSheet(f"color:{RED}; font-weight:700;")
        self.portal_button.clicked.connect(self._open_portal_release)
        self.portal_button.hide()
        header.addWidget(self.portal_button)
        self.portal_release: ReleaseInfo | None = None
        self.restart_button = QPushButton()
        self.restart_button.setStyleSheet(f"color:{RED}; font-weight:700;")
        self.restart_button.clicked.connect(self.restart_portal)
        self.restart_button.hide()
        header.addWidget(self.restart_button)
        self.icons_box = QCheckBox("App icons on the Desktop")
        self.icons_box.setToolTip("On: every installed app gets an icon on the Desktop. Off: only the portal's icon "
                                  "is there, and you start the apps from here. The apps stay in the app menu either "
                                  "way.")
        self.icons_box.setChecked(self.settings.value(DESKTOP_ICONS_KEY, False, type=bool))
        self.icons_box.toggled.connect(self._show_icons)
        header.addWidget(self.icons_box)
        refresh = QPushButton("Refresh")
        refresh.setToolTip("Look again at which apps are installed.")
        refresh.clicked.connect(self._on_refresh)
        header.addWidget(refresh)
        root.addLayout(header)
        source = ("Development: apps install from the local checkout " + str(sources.checkout) if sources.local
                  else "Apps install from the releases this portal version pins, verified by checksum.")
        self.source_label = hint_label(source)
        root.addWidget(self.source_label)

        content = QWidget()
        column = QVBoxLayout(content)
        column.setContentsMargins(0, 0, 0, 0)
        # BC250 Bazzite tools: the apps for the board, Bazzite Test first, open until closed (owner, 13-10-2026).
        self.tools_toggle, self.tools_box, self.grid = self._section(
            column, "BC250 Bazzite tools", "The apps for the BC-250 board, Bazzite Test first.", None,
            "QFrame#tools { border:1px solid palette(mid); border-radius:8px; }", "tools")
        self.columns = 0
        self.cards: dict[str, AppTile] = {}
        for entry in entries:
            card = AppTile(entry)
            card.install_clicked.connect(self.install)
            card.uninstall_clicked.connect(self.uninstall)
            card.open_clicked.connect(self.open_app)
            self.cards[entry.key] = card

        # Gaming: the apps for playing, open until closed. Development only: tools for working on the suite, not
        # for using the board, closed until asked for and set apart by a dashed frame.
        self.gaming_toggle, self.gaming_box, self.gaming_grid = self._section(
            column, "Gaming", "Apps for playing on the board.", None,
            "QFrame#gaming { border:1px solid palette(mid); border-radius:8px; }", "gaming")
        self.dev_toggle, self.dev_box, self.dev_grid = self._section(
            column, "Development only", "Tools for working on the suite itself. Not needed to use the board.",
            "For working on the BC250 Bazzite Suite: recording demos, checking its dependencies, making releases, "
            "running the installer tests. You do not need these to use the board.",
            "QFrame#dev { border:1px dashed palette(mid); border-radius:8px; }", "dev")
        column.addStretch(1)
        self.has_gaming = any(e.section == "gaming" for e in entries)
        self.has_development = any(e.development for e in entries)
        self.tools_toggle.toggled.connect(self._show_tools)
        self.tools_toggle.setChecked(self.settings.value(TOOLS_OPEN_KEY, True, type=bool))
        self._show_tools(self.tools_toggle.isChecked())
        self.gaming_toggle.toggled.connect(self._show_gaming)
        self.dev_toggle.toggled.connect(self._show_development)
        self.gaming_toggle.setVisible(self.has_gaming)
        self.dev_toggle.setVisible(self.has_development)
        self.gaming_toggle.setChecked(self.settings.value(GAMING_OPEN_KEY, True, type=bool))
        self.dev_toggle.setChecked(self.settings.value(DEV_OPEN_KEY, False, type=bool))
        self._show_gaming(self.gaming_toggle.isChecked())
        self._show_development(self.dev_toggle.isChecked())

        scroll = QScrollArea()
        scroll.setWidgetResizable(True)
        scroll.setFrameShape(QFrame.Shape.NoFrame)
        scroll.setWidget(content)
        self.scroll = scroll
        scroll.installEventFilter(self)                 # reflow when the scroll area itself gets its new width
        root.addWidget(scroll, 1)
        self.reflow()
        self.setCentralWidget(central)

        self.poll = QTimer(self)
        self.poll.setInterval(POLL_MS)
        self.poll.timeout.connect(self._check_pending)
        restore_geometry(self, self.settings)
        self.refresh()
        self.portal_checker = UpdateChecker(self)
        self.portal_checker.finished.connect(self._portal_checked)
        if portal_check is not None:
            self.portal_checker.start(portal_check)
        QTimer.singleShot(0, self.settle_icons)          # once the window shows: it may ask
        QTimer.singleShot(0, self.remove_withdrawn)

    # ------------------------------------------------------------------------------------------- layout
    @staticmethod
    def _tile_grid() -> QGridLayout:
        grid = QGridLayout()
        grid.setContentsMargins(0, 0, 0, 0)
        grid.setHorizontalSpacing(TILE_SPACING)
        grid.setVerticalSpacing(TILE_SPACING)
        grid.setAlignment(Qt.AlignmentFlag.AlignLeft | Qt.AlignmentFlag.AlignTop)
        return grid

    @staticmethod
    def _section(column: QVBoxLayout, title: str, tooltip: str, hint: str | None, style: str,
                 name: str) -> tuple[QToolButton, QFrame, QGridLayout]:
        """A section of tiles under the apps: its toggle (title and arrow) and its framed box with the grid."""
        toggle = QToolButton()
        toggle.setText(title)
        toggle.setCheckable(True)
        toggle.setToolButtonStyle(Qt.ToolButtonStyle.ToolButtonTextBesideIcon)
        toggle.setAutoRaise(True)
        toggle.setStyleSheet("color:palette(placeholder-text); font-weight:700;")
        toggle.setToolTip(tooltip)
        column.addSpacing(10)
        column.addWidget(toggle, 0, Qt.AlignmentFlag.AlignLeft)
        box = QFrame()
        box.setObjectName(name)
        box.setStyleSheet(style)
        box_column = QVBoxLayout(box)
        if hint:
            box_column.addWidget(hint_label(hint))
        grid = MainWindow._tile_grid()
        box_column.addLayout(grid)
        column.addWidget(box)
        return toggle, box, grid

    def column_count(self, width: int) -> int:
        return max(1, (width + TILE_SPACING) // (TILE_WIDTH + TILE_SPACING))

    def reflow(self) -> None:
        """The tiles in file order (bazzite-test first), left to right and then down, in as many columns as fit;
        the gaming and the development apps likewise in their own sections."""
        # The scroll area's width less a scroll bar, whether one shows or not: a bar that comes and goes cannot
        # switch the layout back and forth. The sections are the narrower (their frames), so they decide.
        width = self.scroll.width() - self.scroll.verticalScrollBar().sizeHint().width() - DEV_FRAME_MARGIN
        columns = self.column_count(width)
        if columns == self.columns:
            return
        self.columns = columns
        cards = self.cards.values()
        for grid, tiles in ((self.grid, [c for c in cards if not c.entry.development and not c.entry.section]),
                            (self.gaming_grid, [c for c in cards if c.entry.section == "gaming"]),
                            (self.dev_grid, [c for c in cards if c.entry.development])):
            while grid.count():
                grid.takeAt(0)
            for i, tile in enumerate(tiles):
                grid.addWidget(tile, i // columns, i % columns)

    def _show_tools(self, show: bool) -> None:
        self.tools_toggle.setArrowType(Qt.ArrowType.DownArrow if show else Qt.ArrowType.RightArrow)
        self.tools_box.setVisible(show)
        self.settings.setValue(TOOLS_OPEN_KEY, show)

    def _show_gaming(self, show: bool) -> None:
        self.gaming_toggle.setArrowType(Qt.ArrowType.DownArrow if show else Qt.ArrowType.RightArrow)
        self.gaming_box.setVisible(show and self.has_gaming)
        self.settings.setValue(GAMING_OPEN_KEY, show)

    def _show_development(self, show: bool) -> None:
        self.dev_toggle.setArrowType(Qt.ArrowType.DownArrow if show else Qt.ArrowType.RightArrow)
        self.dev_box.setVisible(show and self.has_development)
        self.settings.setValue(DEV_OPEN_KEY, show)

    def eventFilter(self, watched, event) -> bool:
        if watched is self.scroll and event.type() == QEvent.Type.Resize:
            self.reflow()
        return super().eventFilter(watched, event)

    # ------------------------------------------------------------------------------------------- state
    def busy(self) -> bool:
        return self.pending is not None or self._job is not None

    def refresh(self) -> None:
        counts = {"update": 0, "reinstall": 0}
        for entry in self.entries:
            busy = ""
            if self._job and self._job[0] is entry:
                busy = "Downloading…" if not self.sources.local else "Preparing…"
            elif self.pending and self.pending.entry is entry:
                busy = "Installing…" if self.pending.action == "install" else "Removing…"
            card = self.cards[entry.key]
            available = not entry.checkout_only or self.sources.checkout_for_apps is not None
            state = card.show_state(is_installed(entry), self.records.get(entry.key), busy, available)
            if state:
                counts[state] += 1
            if self.busy() and not busy:
                card.install_button.setEnabled(False)
                card.uninstall_button.setEnabled(False)
        updates, reinstalls = counts["update"], counts["reinstall"]
        self.updates_label.setText("\u25cf " + ", ".join(
            [f"{updates} update{'s' if updates != 1 else ''}"] * bool(updates)
            + [f"{reinstalls} reinstall{'s' if reinstalls != 1 else ''}"] * bool(reinstalls)))
        self.updates_label.setToolTip(
            "Updates: apps whose installed version differs from the one this portal pins; each has a red dot in its "
            "icon, and its Install button updates it. Reinstalls: apps the portal did not install (by hand, or under "
            "an earlier name of the app), so their version is unknown; each has a red circular arrow in its icon, and "
            "its red button reinstalls it.")
        self.updates_label.setVisible(updates + reinstalls > 0)
        self.check_installed()

    def _portal_checked(self, result: object) -> None:
        """A newer portal release brings newer pinned app versions; name them and offer its release page."""
        update = result if isinstance(result, PortalUpdate) else PortalUpdate(result) \
            if isinstance(result, ReleaseInfo) else None
        release = update.release if update else None
        if release is None or release.error or not release.version:
            return                                      # offline or no release yet: nothing to announce
        if version_tuple(release.version) <= version_tuple(__version__):
            return
        self.portal_release = release
        summary = update.summary()
        self.portal_button.setText(f"\u25cf Portal {release.version}" + (f": {summary}" if summary else " available"))
        if update.changes:
            tip = (f"Released {release.published}. App updates come with the portal: once it is updated, the "
                   f"installed apps among these show Update.\n\n{update.details()}\n\nClick to open its release page.")
        elif update.changes == []:
            tip = f"Released {release.published}. It pins the same app versions as this portal. Click to open its page."
        else:
            tip = (f"Released {release.published}. A new portal version pins newer app versions; "
                   "click to open its release page.")
        self.portal_button.setToolTip(tip)
        self.portal_button.setVisible(self.restart_button.isHidden())

    def check_installed(self) -> None:
        """A newer portal installed while this one runs (its install.sh, in a terminal): this window still runs the
        old one, with the old pins, and starting the portal again only brings this window to the front. So offer to
        restart into the new one; not while an install or uninstall runs."""
        try:
            version = (self.installed / "VERSION").read_text(encoding="utf-8").strip() if self.installed else ""
        except OSError:
            version = ""
        if not version or version == __version__:
            self.restart_button.hide()
            return
        self.restart_button.setText(f"\u25cf Restart: portal {version} is installed")
        busy = self.busy()
        self.restart_button.setEnabled(not busy)
        self.restart_button.setToolTip(
            f"Portal {version} was installed while this window runs portal {__version__}. Restart to use it: its "
            "app versions, and the red dot on the apps it updates."
            + ("\n\nAfter the install or uninstall that is running now." if busy else ""))
        self.restart_button.show()
        self.portal_button.hide()                       # the newer portal is here already

    def restart_portal(self) -> None:
        """Start the portal again, after this one is gone (it allows one window), and close this one."""
        if self.busy():
            return
        launcher = bin_home() / APP_ID
        if not self.launch(["sh", "-c", 'sleep 1; exec "$0"', str(launcher)]):
            QMessageBox.warning(self, APP_NAME, f"The portal could not be started again ({launcher}). Close this "
                                "window and start it from the app menu.")
            return
        self.close()
        QCoreApplication.quit()

    def changeEvent(self, event) -> None:  # noqa: N802 (Qt override)
        if event.type() == QEvent.Type.ActivationChange and self.isActiveWindow():
            self.check_installed()                      # back from the terminal that installed a new portal
        super().changeEvent(event)

    def _open_portal_release(self) -> None:
        if self.portal_release is not None:
            QDesktopServices.openUrl(QUrl(self.portal_release.url))

    @staticmethod
    def open_wiki() -> None:
        """The wiki's home page, from a click on the suite's logo."""
        QDesktopServices.openUrl(QUrl(SUITE_MANUAL_URL))

    # ----------------------------------------------------------------------------------------- actions
    def _confirm_board_change(self, entry: AppEntry, action: str) -> bool:
        if not entry.changes_board:
            return True
        answer = QMessageBox.warning(
            self, APP_NAME, BOARD_WARNING.format(name=entry.name, action=action),
            QMessageBox.StandardButton.Yes | QMessageBox.StandardButton.Cancel, QMessageBox.StandardButton.Cancel)
        return answer == QMessageBox.StandardButton.Yes

    def settle_icons(self) -> None:
        """At start: ask the first time, when app icons are on the Desktop, whether to keep them; then, when they are
        switched off, remove the ones installers added since (an update of the portal puts Bazzite Test's back)."""
        if not self.settings.contains(DESKTOP_ICONS_KEY):
            show = bool(desktop_icons.on_desktop(self.desktop, self.menu)) and QMessageBox.question(
                self, APP_NAME, "Keep the app icons on the Desktop?\n\nThe portal starts every app, so its own icon "
                "is enough. The apps stay in the app menu either way, and you can change this any time with \"App "
                "icons on the Desktop\" at the top of the portal.",
                QMessageBox.StandardButton.Yes | QMessageBox.StandardButton.No,
                QMessageBox.StandardButton.Yes) == QMessageBox.StandardButton.Yes
            self.settings.setValue(DESKTOP_ICONS_KEY, show)
            self.icons_box.blockSignals(True)
            self.icons_box.setChecked(show)
            self.icons_box.blockSignals(False)
        if not self.icons_box.isChecked():
            desktop_icons.remove(self.desktop, self.menu)

    def _show_icons(self, show: bool) -> None:
        self.settings.setValue(DESKTOP_ICONS_KEY, show)
        try:
            desktop_icons.apply(show, self.desktop, self.menu)
        except OSError as exc:
            QMessageBox.warning(self, APP_NAME, f"The Desktop icons could not be changed:\n\n{exc}")

    def remove_withdrawn(self) -> None:
        """A withdrawn app still on the board goes, one at a time, with its own uninstaller (the portal's uninstall,
        without the question): the next one when this one has ended. One that cannot be removed stays listed with
        its Uninstall button."""
        if self.busy():
            return
        for entry in self.entries:
            if entry.withdrawn and is_installed(entry) and entry.key not in self._withdrawal_tried:
                self._withdrawal_tried.add(entry.key)
                QMessageBox.information(
                    self, APP_NAME, f"{entry.name} is not available any more: its release was withdrawn.\n\n"
                    f"{entry.withdrawn}\n\nThe portal removes it now; its uninstaller runs in a terminal.")
                self._start(entry, "uninstall")
                return

    def install(self, entry: AppEntry) -> None:
        if self.busy() or not self._confirm_board_change(entry, f"Install {entry.name}"):
            return
        if entry.checkout_only and not self._know_checkout(entry):
            return
        self._start(entry, "install")

    def uninstall(self, entry: AppEntry) -> None:
        if self.busy() or (entry.checkout_only and not self._know_checkout(entry)):
            return
        answer = QMessageBox.question(self, APP_NAME, f"Uninstall {entry.name}? Its own uninstaller runs in a "
                                      "terminal; settings and results are kept unless it asks otherwise.")
        if answer == QMessageBox.StandardButton.Yes:
            self._start(entry, "uninstall")

    def _know_checkout(self, entry: AppEntry) -> bool:
        """A checkout-only app needs the suite checkout it runs from. A portal installed from a release looks for one
        on this machine, and asks only when it finds none; it remembers the folder."""
        if self.sources.checkout_for_apps is not None:
            return True
        folder = find_checkout()
        if folder is None:
            answer = QMessageBox.question(
                self, APP_NAME, f"{entry.name} runs from a checkout of the suite's repository, and the portal found "
                "none in your home folder.\n\nChoose the folder of your checkout?")
            if answer != QMessageBox.StandardButton.Yes:
                return False
            chosen = QFileDialog.getExistingDirectory(self, f"{APP_NAME}: the suite checkout", str(Path.home()))
            if not chosen:
                return False
            folder = Path(chosen)
        if not is_suite(folder):
            QMessageBox.warning(self, APP_NAME, f"{folder} is not a BC250 Bazzite Suite checkout: it needs apps/, "
                                "core/ and tools/stage_app.py. Choose the folder of the repository itself.")
            return False
        self.sources.apps_checkout = folder
        try:
            remember_checkout(folder)
        except OSError:
            pass                                        # used for now; asked again next time
        self.refresh()
        return True

    def _start(self, entry: AppEntry, action: str) -> None:
        self._job = (entry, action)
        self.refresh()
        self.worker.start(lambda: self._prepare(entry))

    def _prepare(self, entry: AppEntry) -> Path | Exception:
        """Worker thread: fetch or stage the app. Returns the folder, or the error to show."""
        try:
            return self.sources.prepare(entry)
        except (SourceError, OSError) as exc:
            return exc

    def _prepared(self, result: object) -> None:
        entry, action = self._job or (None, "")
        self._job = None
        if entry is None:
            return
        if isinstance(result, Exception):
            QMessageBox.critical(self, APP_NAME, f"{entry.name} could not be prepared:\n\n{result}")
            self.refresh()
            return
        folder = Path(result)
        commands = entry.install if action == "install" else entry.uninstall
        # A fresh name; the terminal creates the file when the commands end.
        exit_file = Path(tempfile.gettempdir()) / f"bc250-portal-{entry.key}-{uuid.uuid4().hex}.exit"
        try:
            launch_in_terminal(shell_line(folder, commands), exit_file=exit_file)
        except (RuntimeError, OSError) as exc:
            QMessageBox.critical(self, APP_NAME, f"Could not open a terminal for the installer:\n\n{exc}\n\n"
                                 f"Run it by hand instead:\n{shell_line(folder, commands)}")
            self.refresh()
            return
        self.pending = Pending(entry, action, exit_file,
                               "local" if self.sources.local or entry.checkout_only else entry.tag)
        self.poll.start()
        self.refresh()

    def _check_pending(self) -> None:
        pending = self.pending
        if pending is None:
            self.poll.stop()
            return
        try:
            status = pending.exit_file.read_text(encoding="utf-8").strip()
        except OSError:
            return                                      # still running (or the terminal was closed: see Refresh)
        self.poll.stop()
        self.pending = None
        pending.exit_file.unlink(missing_ok=True)
        entry = pending.entry
        ok = status == "0"
        if ok and pending.action == "install":
            self.records.set(entry.key, pending.tag)
            self.sources.prune(entry)                   # an update: the previous release's folder goes
            if not self.icons_box.isChecked():          # the installer put its icon on the Desktop
                desktop_icons.remove(self.desktop, self.menu)
        elif ok:
            self.records.remove(entry.key)
            self.sources.forget(entry)
        self.refresh()
        if not ok:
            QMessageBox.warning(self, APP_NAME, f"The {pending.action} of {entry.name} ended with exit status "
                                f"{status or '?'}. Its terminal window shows what happened.")
        self.remove_withdrawn()                         # the next withdrawn app, if any

    def _on_refresh(self) -> None:
        if self.pending is not None:
            answer = QMessageBox.question(
                self, APP_NAME, f"Still waiting for the {self.pending.action} of {self.pending.entry.name} to end in "
                "its terminal window. Stop waiting (for example because that window was closed)?")
            if answer == QMessageBox.StandardButton.Yes:
                self.cancel_pending()
                return
        self.refresh()

    def cancel_pending(self) -> None:
        """Stop waiting for a terminal that was closed before its installer finished."""
        if self.pending is not None:
            self.pending.exit_file.unlink(missing_ok=True)
            self.pending = None
            self.poll.stop()
        self.refresh()

    def open_app(self, entry: AppEntry, command: str) -> None:
        if not self._confirm_board_change(entry, f"Open {entry.name}"):
            return
        argv = shlex.split(command)
        argv[0] = str(expand(argv[0]))
        try:
            subprocess.Popen(argv, start_new_session=True, stdin=subprocess.DEVNULL,
                             stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        except OSError as exc:
            QMessageBox.critical(self, APP_NAME, f"{entry.name} could not be started:\n\n{exc}")

    def closeEvent(self, event) -> None:
        save_geometry(self, self.settings)
        self.worker.stop(2000)
        self.portal_checker.stop(2000)
        super().closeEvent(event)
