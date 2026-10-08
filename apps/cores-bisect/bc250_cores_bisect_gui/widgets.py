"""About and Help dialogs for the setup GUI."""

from __future__ import annotations

import subprocess

from PyQt6.QtCore import Qt
from PyQt6.QtGui import QFontDatabase, QPixmap
from PyQt6.QtWidgets import (
    QDialog, QDialogButtonBox, QHBoxLayout, QLabel, QTextEdit, QVBoxLayout, QWidget,
)

from . import APP_NAME, LOGO_PATH, REPO_URL, __version__, window_title


class AboutDialog(QDialog):
    def __init__(self, parent: QWidget | None = None):
        super().__init__(parent)
        self.setWindowTitle(window_title(self.tr("about")))
        self.setModal(True)
        layout = QVBoxLayout(self)

        top = QHBoxLayout()
        if LOGO_PATH.is_file():
            icon = QLabel()
            icon.setPixmap(QPixmap(str(LOGO_PATH)).scaled(
                64, 64, Qt.AspectRatioMode.KeepAspectRatio, Qt.TransformationMode.SmoothTransformation))
            top.addWidget(icon)
        names = QVBoxLayout()
        name_label = QLabel(f"<b>{APP_NAME}</b>")
        name_label.setStyleSheet("font-size:16px;")
        names.addWidget(name_label)
        names.addWidget(QLabel(self.tr("Version {0}").format(__version__)))
        top.addLayout(names)
        top.addStretch(1)
        layout.addLayout(top)

        desc = QLabel(self.tr(
            "A PyQt6 setup screen for bc250-cores-bisect.sh: pick your options and start a run, "
            "which then continues in a terminal exactly as if typed by hand."
        ))
        desc.setWordWrap(True)
        layout.addWidget(desc)

        link = QLabel(f'<a href="{REPO_URL}">{REPO_URL}</a>')
        link.setOpenExternalLinks(True)
        link.setTextInteractionFlags(Qt.TextInteractionFlag.TextBrowserInteraction)
        layout.addWidget(link)

        layout.addWidget(QLabel(self.tr("License: GNU GPLv3.")))

        buttons = QDialogButtonBox(QDialogButtonBox.StandardButton.Ok)
        buttons.accepted.connect(self.accept)
        layout.addWidget(buttons)


class HelpDialog(QDialog):
    """Shows bc250-cores-bisect.sh's own ``--help`` text (the single source of truth for what the
    options do), so the GUI's help never drifts out of sync with the script."""

    def __init__(self, script: str, parent: QWidget | None = None):
        super().__init__(parent)
        self.setWindowTitle(window_title(self.tr("help")))
        self.setModal(True)
        self.resize(720, 560)
        layout = QVBoxLayout(self)

        text = QTextEdit()
        text.setReadOnly(True)
        text.setFont(QFontDatabase.systemFont(QFontDatabase.SystemFont.FixedFont))
        text.setPlainText(self._help_text(script))
        layout.addWidget(text)

        buttons = QDialogButtonBox(QDialogButtonBox.StandardButton.Ok)
        buttons.accepted.connect(self.accept)
        layout.addWidget(buttons)

    def _help_text(self, script: str) -> str:
        try:
            result = subprocess.run(
                ["bash", script, "--help"], capture_output=True, text=True, timeout=10, check=False)
            if result.stdout.strip():
                return result.stdout
        except (OSError, subprocess.SubprocessError):
            pass
        return self.tr(
            "Could not read bc250-cores-bisect.sh --help.\n\n"
            "Run it from a terminal instead:\n"
            "  bash {0} --help").format(script)
