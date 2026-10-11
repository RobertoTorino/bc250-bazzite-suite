# SPDX-License-Identifier: GPL-3.0-or-later
"""The portal window: bazzite-test fixed in first place, then one tile per optional app, and the development apps in
their own section that opens on request.

Install, update and uninstall run the app's own installer in a terminal window (they may ask for the sudo
password and print what they do); the portal watches for the exit file the terminal writes and then refreshes.
An app that changes the board (unlocks, governor, ACPI) gets a warning before it is installed or opened.

Updates: a red dot marks every tile whose installed app differs from the version this portal pins, the header counts
them, and at start the portal looks for a newer portal release on GitHub (which is how newer app versions arrive)."""

from __future__ import annotations

import shlex
import subprocess
from html import escape
import tempfile
import uuid
from collections.abc import Callable
from dataclasses import dataclass
from pathlib import Path, PurePath

from PyQt6.QtCore import QEvent, QSize, QTimer, Qt, QUrl, pyqtSignal
from PyQt6.QtGui import QColor, QDesktopServices, QIcon, QImage, QPainter, QPalette, QPixmap
from PyQt6.QtWidgets import (
    QFrame, QGridLayout, QHBoxLayout, QLabel, QMainWindow, QMenu, QMessageBox, QPushButton, QScrollArea, QToolButton,
    QVBoxLayout, QWidget,
)

from bc250_core import __version__ as CORE_VERSION
from bc250_core.platform import expand, launch_in_terminal
from bc250_core.settings import open_settings, restore_geometry, save_geometry
from bc250_core.theme import ACCENT, BLUE, GREY, ORANGE, RED, header_font
from bc250_core.updates import ReleaseInfo, UpdateChecker, version_tuple
from bc250_core.widgets import ClickableLogo, hint_label

from . import glyphs
from . import APP_ICONS, APP_NAME, INFO, LOGO_PATH, __version__
from .manifest import AppEntry
from .portal_update import PortalUpdate
from .sources import Records, SourceError, Sources, is_installed

POLL_MS = 1000
ICON_PX = 128                   # the app icon on its tile (the icon files are 128 x 128)
SYMBOL_PX = 28                  # the Install / Uninstall / Reinstall symbols beside it
DOT_PX = 16                     # the red update dot inside the icon
TILE_WIDTH = 216                # the tiles flow left to right, as many to a row as fit
TILE_SPACING = 12
DEV_FRAME_MARGIN = 24           # the development section's frame and margins take this much of the width
DEV_OPEN_KEY = "portal/development_open"
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
    an update), "changes the board" under it when so, and beside it the symbol buttons: Install and Uninstall, or
    only Reinstall for bazzite-test."""

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
        self.title = QLabel(short_name(entry.name))
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
        self.icon.setStyleSheet("QToolButton { border:none; border-radius:18px; }"
                                "QToolButton:hover:enabled { background:palette(midlight); }"
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
        self.board = QLabel("changes the board")
        self.board.setStyleSheet(f"color:{ORANGE}; font-size:11px; font-weight:700;")
        self.board.setToolTip("It changes how the board runs; the portal asks first before installing or opening it.")
        self.board.setVisible(entry.changes_board)
        under.addWidget(self.board, 0, Qt.AlignmentFlag.AlignHCenter)
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

    def show_state(self, installed: bool, installed_tag: str, busy: str = "") -> bool:
        """Show the app's state; True when an update is available."""
        entry = self.entry
        # An update needs a known, different tag: an app installed some other way has none recorded.
        update = installed and bool(installed_tag) and bool(entry.tag) and installed_tag not in (entry.tag, "local")
        self.dot.setVisible(update)
        self.dot.setToolTip(f"Update available: {entry.tag} (installed {installed_tag})." if update else "")
        if busy:
            self.status, detail = busy, busy
        elif not installed:
            self.status, detail = "Not installed", "Not installed: install it with the button beside the icon."
        elif update:
            self.status, detail = "Update", f"Update available: installed {installed_tag}, this portal pins {entry.tag}."
        else:
            self.status = "Installed"
            detail = (f"Installed from {installed_tag}." if installed_tag not in ("", "local") else
                      "Installed from the suite checkout." if installed_tag == "local" else
                      "Installed (not by this portal, so its version is unknown).")
        self.busy_label.setText(busy)
        self.busy_label.setVisible(bool(busy))
        self.icon.setIcon(self._icons[0 if installed else 1])
        opens = installed and not busy and bool(entry.launch)
        self.icon.setEnabled(opens)
        self.icon.setCursor(Qt.CursorShape.PointingHandCursor if opens else Qt.CursorShape.ArrowCursor)
        how = ("Click to open it." if len(entry.launch) == 1 else
               "Click to open: " + ", ".join(label for label, _ in entry.launch) + "." if entry.launch else
               "Not a program: nothing to open.")
        source = entry.tag or "runs from the suite checkout"
        self.icon.setToolTip(f"<p><b>{escape(entry.name)}</b></p><p>{escape(entry.summary)}</p>"
                             f"<p style='color:gray;'>{escape(detail)}<br>{escape(source)}"
                             + (f"<br>{escape(how)}" if installed else "") + "</p>")

        action, ink = ("Update", RED) if update else ("Reinstall", self._ink()) if installed else \
            ("Install", self._ink())
        draw = glyphs.reinstall if entry.required and installed and not update else glyphs.install
        self.install_button.setIcon(draw(ink))
        self.install_button.setToolTip(f"{action} {entry.name}" + (f" ({entry.tag})" if entry.tag else ""))
        self.install_button.setEnabled(not busy)
        self.uninstall_button.setEnabled(installed and not busy)
        return update


class MainWindow(QMainWindow):
    def __init__(self, entries: list[AppEntry], sources: Sources, records: Records,
                 portal_check: Callable[[], ReleaseInfo] | None = None, local_build: Path | None = None,
                 parent: QWidget | None = None):
        """*portal_check* returns the newest portal release (run once, off the GUI thread); None: no check.
        *local_build* is the suite checkout this portal runs from or was installed from: a banner says so."""
        super().__init__(parent)
        self.entries = entries
        self.sources = sources
        self.records = records
        self.pending: Pending | None = None
        self.worker = UpdateChecker(self)               # generic: runs one job off the GUI thread
        self.worker.finished.connect(self._prepared)
        self._job: tuple[AppEntry, str] | None = None
        self.settings = open_settings(INFO, self)
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
            header.addWidget(ClickableLogo(LOGO_PATH, 56))
        title = QLabel(f"{APP_NAME}  <span style='color:#9aa0a6; font-size:14px;'>v{__version__}</span>")
        title.setStyleSheet(header_font() + "font-size:24px; font-weight:800;")
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
        self.grid = self._tile_grid()
        column.addLayout(self.grid)
        self.columns = 0
        self.cards: dict[str, AppTile] = {}
        for entry in entries:
            card = AppTile(entry)
            card.install_clicked.connect(self.install)
            card.uninstall_clicked.connect(self.uninstall)
            card.open_clicked.connect(self.open_app)
            self.cards[entry.key] = card

        # Development only: tools for working on the suite, not for using the board. Closed until asked for, and
        # set apart by a dashed frame.
        self.dev_toggle = QToolButton()
        self.dev_toggle.setText("Development only")
        self.dev_toggle.setCheckable(True)
        self.dev_toggle.setToolButtonStyle(Qt.ToolButtonStyle.ToolButtonTextBesideIcon)
        self.dev_toggle.setAutoRaise(True)
        self.dev_toggle.setStyleSheet("color:palette(placeholder-text); font-weight:700;")
        self.dev_toggle.setToolTip("Tools for working on the suite itself. Not needed to use the board.")
        self.dev_toggle.toggled.connect(self._show_development)
        column.addSpacing(10)
        column.addWidget(self.dev_toggle, 0, Qt.AlignmentFlag.AlignLeft)
        self.dev_box = QFrame()
        self.dev_box.setObjectName("dev")
        self.dev_box.setStyleSheet("QFrame#dev { border:1px dashed palette(mid); border-radius:8px; }")
        dev_column = QVBoxLayout(self.dev_box)
        dev_column.addWidget(hint_label("For working on the BC250 Bazzite Suite: recording demos, checking its "
                                        "dependencies, making releases, running the installer tests. You do not need these to use the "
                                        "board."))
        self.dev_grid = self._tile_grid()
        dev_column.addLayout(self.dev_grid)
        column.addWidget(self.dev_box)
        column.addStretch(1)
        self.has_development = any(e.development for e in entries)
        self.dev_toggle.setVisible(self.has_development)
        self.dev_toggle.setChecked(self.settings.value(DEV_OPEN_KEY, False, type=bool))
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

    # ------------------------------------------------------------------------------------------- layout
    @staticmethod
    def _tile_grid() -> QGridLayout:
        grid = QGridLayout()
        grid.setContentsMargins(0, 0, 0, 0)
        grid.setHorizontalSpacing(TILE_SPACING)
        grid.setVerticalSpacing(TILE_SPACING)
        grid.setAlignment(Qt.AlignmentFlag.AlignLeft | Qt.AlignmentFlag.AlignTop)
        return grid

    def column_count(self, width: int) -> int:
        return max(1, (width + TILE_SPACING) // (TILE_WIDTH + TILE_SPACING))

    def reflow(self) -> None:
        """The tiles in file order (bazzite-test first), left to right and then down, in as many columns as fit;
        the development apps likewise in their own section."""
        # The scroll area's width less a scroll bar, whether one shows or not: a bar that comes and goes cannot
        # switch the layout back and forth. The development section is the narrower (its frame), so it decides.
        width = self.scroll.width() - self.scroll.verticalScrollBar().sizeHint().width() - DEV_FRAME_MARGIN
        columns = self.column_count(width)
        if columns == self.columns:
            return
        self.columns = columns
        for grid, tiles in ((self.grid, [c for c in self.cards.values() if not c.entry.development]),
                            (self.dev_grid, [c for c in self.cards.values() if c.entry.development])):
            while grid.count():
                grid.takeAt(0)
            for i, tile in enumerate(tiles):
                grid.addWidget(tile, i // columns, i % columns)

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
        updates = 0
        for entry in self.entries:
            busy = ""
            if self._job and self._job[0] is entry:
                busy = "Downloading…" if not self.sources.local else "Preparing…"
            elif self.pending and self.pending.entry is entry:
                busy = "Installing…" if self.pending.action == "install" else "Removing…"
            card = self.cards[entry.key]
            updates += card.show_state(is_installed(entry), self.records.get(entry.key), busy)
            if self.busy() and not busy:
                card.install_button.setEnabled(False)
                card.uninstall_button.setEnabled(False)
        self.updates_label.setText(f"\u25cf {updates} update{'s' if updates != 1 else ''}")
        self.updates_label.setToolTip("Apps whose installed version differs from the one this portal pins; "
                                      "each has a red dot in its icon, and its Install button updates it.")
        self.updates_label.setVisible(updates > 0)

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
        self.portal_button.show()

    def _open_portal_release(self) -> None:
        if self.portal_release is not None:
            QDesktopServices.openUrl(QUrl(self.portal_release.url))

    # ----------------------------------------------------------------------------------------- actions
    def _confirm_board_change(self, entry: AppEntry, action: str) -> bool:
        if not entry.changes_board:
            return True
        answer = QMessageBox.warning(
            self, APP_NAME, BOARD_WARNING.format(name=entry.name, action=action),
            QMessageBox.StandardButton.Yes | QMessageBox.StandardButton.Cancel, QMessageBox.StandardButton.Cancel)
        return answer == QMessageBox.StandardButton.Yes

    def install(self, entry: AppEntry) -> None:
        if self.busy() or not self._confirm_board_change(entry, f"Install {entry.name}"):
            return
        self._start(entry, "install")

    def uninstall(self, entry: AppEntry) -> None:
        if self.busy():
            return
        answer = QMessageBox.question(self, APP_NAME, f"Uninstall {entry.name}? Its own uninstaller runs in a "
                                      "terminal; settings and results are kept unless it asks otherwise.")
        if answer == QMessageBox.StandardButton.Yes:
            self._start(entry, "uninstall")

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
        self.pending = Pending(entry, action, exit_file, "local" if self.sources.local else entry.tag)
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
        elif ok:
            self.records.remove(entry.key)
            self.sources.forget(entry)
        self.refresh()
        if not ok:
            QMessageBox.warning(self, APP_NAME, f"The {pending.action} of {entry.name} ended with exit status "
                                f"{status or '?'}. Its terminal window shows what happened.")

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
