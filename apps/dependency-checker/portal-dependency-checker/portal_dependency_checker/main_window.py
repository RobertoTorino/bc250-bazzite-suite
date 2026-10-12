# SPDX-License-Identifier: GPL-3.0-or-later
"""The dependency checker window."""

from __future__ import annotations

from collections.abc import Callable
from html import escape
from urllib.parse import quote

from PyQt6.QtCore import Qt
from PyQt6.QtWidgets import (
    QDialog, QFrame, QHBoxLayout, QLabel, QPushButton, QScrollArea, QVBoxLayout, QWidget,
)

from bc250_core.theme import header_font
from bc250_core.updates import UpdateChecker
from bc250_core.widgets import StatusPill, hint_label

from . import APP_LABELS, INFO
from .dependencies import (
    Dependency, DependencyStatus, ExternalTool, ToolSource, ToolStatus, check_dependencies, check_tools,
    installed_version,
)
DOCS_URL = "https://robertotorino.github.io/bc250-bazzite-suite/apps/{app}/"


def _source_label(owner: str, apps: dict[str, str]) -> str:
    if owner == "portal":
        return "Portal"
    if owner == "core":
        return "Shared core"
    return apps.get(owner, owner)


def _manual_link(source: ToolSource, apps: dict[str, str]) -> str:
    label = escape(_source_label(source.owner, apps))
    url = DOCS_URL.format(app=quote(source.owner, safe="-"))
    if source.anchor:
        anchor = quote(source.anchor, safe="-")
        url += f"#{anchor}"
    return f"<a href='{escape(url, quote=True)}'>{label}</a>"


class DependencyCard(QFrame):
    def __init__(self, dependency: Dependency, apps: dict[str, str], parent: QWidget | None = None):
        super().__init__(parent)
        self.setObjectName("dependencyCard")
        self.setStyleSheet("QFrame#dependencyCard { border:1px solid palette(mid); border-radius:8px; }")
        layout = QVBoxLayout(self)
        layout.setContentsMargins(14, 10, 14, 10)
        title_row = QHBoxLayout()
        title = QLabel(dependency.name)
        title.setStyleSheet(header_font() + "font-size:16px; font-weight:700;")
        title_row.addWidget(title)
        title_row.addStretch(1)
        self.status = StatusPill("Not checked")
        title_row.addWidget(self.status)
        layout.addLayout(title_row)

        version_row = QHBoxLayout()
        self.installed = QLabel(f"Installed in this environment: {installed_version(dependency.name) or 'not installed'}")
        self.latest = QLabel("Latest on PyPI: not checked")
        version_row.addWidget(self.installed)
        version_row.addStretch(1)
        version_row.addWidget(self.latest)
        layout.addLayout(version_row)

        requirements = "; ".join(f"{_source_label(source.owner, apps)} {source.specifier}"
                                 for source in dependency.sources)
        used_by = ", ".join(dict.fromkeys(_source_label(source.owner, apps) for source in dependency.sources))
        layout.addWidget(hint_label(f"Requirements: {requirements}"))
        layout.addWidget(hint_label(f"Used by: {used_by}"))

    def show_result(self, result: DependencyStatus) -> None:
        if result.error:
            self.latest.setText("Latest on PyPI: unavailable")
            self.status.set_status("Check failed", "bad", result.error)
        elif not result.latest:
            self.latest.setText("Latest on PyPI: unavailable")
            self.status.set_status("Unknown", "neutral")
        else:
            self.latest.setText(f"Latest on PyPI: {result.latest}")
            if not result.installed:
                self.status.set_status("Not installed here", "info",
                                       "This package may be installed in an app-specific environment.")
            elif result.update_available:
                self.status.set_status("Update available", "warn",
                                       f"This environment: {result.installed}; PyPI: {result.latest}.")
            else:
                self.status.set_status("Up to date", "ok",
                                       f"This environment: {result.installed}; PyPI: {result.latest}.")


class ExternalToolCard(QFrame):
    def __init__(self, tool: ExternalTool, apps: dict[str, str], parent: QWidget | None = None):
        super().__init__(parent)
        self.tool = tool
        self.setObjectName("dependencyCard")
        self.setStyleSheet("QFrame#dependencyCard { border:1px solid palette(mid); border-radius:8px; }")
        layout = QVBoxLayout(self)
        layout.setContentsMargins(14, 10, 14, 10)
        title_row = QHBoxLayout()
        title = QLabel(tool.name)
        title.setStyleSheet(header_font() + "font-size:16px; font-weight:700;")
        title_row.addWidget(title)
        title_row.addStretch(1)
        self.status = StatusPill("Not checked")
        title_row.addWidget(self.status)
        layout.addLayout(title_row)

        self.location = QLabel("Detected: not checked")
        layout.addWidget(self.location)
        for source in tool.sources:
            owner = _manual_link(source, apps)
            description = escape(source.usage)
            usage = QLabel(f"{owner}: {description}")
            usage.setTextFormat(Qt.TextFormat.RichText)
            usage.setOpenExternalLinks(True)
            usage.setWordWrap(True)
            layout.addWidget(usage)

    def show_result(self, result: ToolStatus) -> None:
        if result.note:
            self.status.set_status("Unsupported build", "warn", result.note)
        elif result.path:
            self.status.set_status("Available", "ok", f"Found at {result.path}")
        else:
            self.status.set_status("Not found", "info", "Install instructions are linked above.")
        self.location.setText(f"Detected: {result.path or 'not found'}")


class DependencyWindow(QDialog):
    def __init__(
        self,
        dependencies: list[Dependency],
        tools: list[ExternalTool],
        parent: QWidget | None = None,
        check: Callable[[], tuple[list[DependencyStatus], list[ToolStatus]]] | None = None,
    ):
        super().__init__(parent)
        self.setWindowTitle("Dependency Checker")
        self.resize(820, 560)
        self.worker = UpdateChecker(self)
        self.worker.finished.connect(self._checked)
        self.tools = tools
        self._check = check or (
            lambda: (check_dependencies(dependencies, INFO.user_agent), check_tools(self.tools))
        )
        self.cards: dict[str, DependencyCard] = {}
        self.tool_cards: dict[str, ExternalToolCard] = {}

        root = QVBoxLayout(self)
        header = QHBoxLayout()
        title = QLabel("Dependency Checker")
        title.setStyleSheet(header_font() + "font-size:22px; font-weight:800;")
        header.addWidget(title, 1)
        self.check_button = QPushButton("Check for updates")
        self.check_button.clicked.connect(self.check_updates)
        header.addWidget(self.check_button)
        root.addLayout(header)
        root.addWidget(hint_label(
            "Python package versions are checked against PyPI. External tools are checked for availability only; "
            "use each app guide for installation instructions. Some apps use separate Python environments. "
            "This checker does not install or update anything."
        ))

        app_names = APP_LABELS
        content = QWidget()
        cards_layout = QVBoxLayout(content)
        cards_layout.setContentsMargins(0, 0, 0, 0)
        cards_layout.setSpacing(10)
        packages_heading = QLabel("Python packages")
        packages_heading.setStyleSheet(header_font() + "font-size:18px; font-weight:700;")
        cards_layout.addWidget(packages_heading)
        for dependency in dependencies:
            card = DependencyCard(dependency, app_names)
            self.cards[dependency.name] = card
            cards_layout.addWidget(card)
        tools_heading = QLabel("External tools")
        tools_heading.setStyleSheet(header_font() + "font-size:18px; font-weight:700;")
        cards_layout.addWidget(tools_heading)
        for tool in self.tools:
            card = ExternalToolCard(tool, app_names)
            self.tool_cards[tool.name] = card
            cards_layout.addWidget(card)
        cards_layout.addStretch(1)
        scroll = QScrollArea()
        scroll.setWidgetResizable(True)
        scroll.setFrameShape(QFrame.Shape.NoFrame)
        scroll.setWidget(content)
        root.addWidget(scroll, 1)
        self.result_label = QLabel("Ready to check.")
        self.result_label.setAlignment(Qt.AlignmentFlag.AlignRight)
        root.addWidget(self.result_label)
        self.check_updates()

    def check_updates(self) -> None:
        if self.worker.running:
            return
        self.check_button.setEnabled(False)
        self.result_label.setText("Checking PyPI and external tools…")
        self.worker.start(self._check)

    def _checked(self, result: object) -> None:
        self.check_button.setEnabled(True)
        if (not isinstance(result, tuple) or len(result) != 2
                or not isinstance(result[0], list) or not all(isinstance(item, DependencyStatus) for item in result[0])
                or not isinstance(result[1], list) or not all(isinstance(item, ToolStatus) for item in result[1])):
            self.result_label.setText("The dependency check returned an invalid result.")
            return
        dependencies, tools = result
        for item in dependencies:
            card = self.cards.get(item.dependency.name)
            if card is not None:
                card.show_result(item)
        for item in tools:
            card = self.tool_cards.get(item.tool.name)
            if card is not None:
                card.show_result(item)
        failed = sum(bool(item.error) for item in dependencies)
        unavailable = sum(not item.path or bool(item.note) for item in tools)
        self.result_label.setText(
            f"Checked {len(dependencies)} Python packages and {len(tools)} external tools; "
            f"{failed} check{'s' if failed != 1 else ''} failed, {unavailable} tool"
            f"{'s' if unavailable != 1 else ''} unavailable."
            if failed or unavailable else
            f"Checked {len(dependencies)} Python packages and {len(tools)} external tools."
        )
