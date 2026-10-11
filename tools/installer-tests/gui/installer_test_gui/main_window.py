# SPDX-License-Identifier: GPL-3.0-or-later
from __future__ import annotations

from pathlib import Path

from PyQt6.QtCore import Qt
from PyQt6.QtGui import QCloseEvent, QTextCursor
from PyQt6.QtWidgets import (
    QHBoxLayout,
    QLabel,
    QListWidget,
    QListWidgetItem,
    QMainWindow,
    QMessageBox,
    QPlainTextEdit,
    QPushButton,
    QSplitter,
    QVBoxLayout,
    QWidget,
)

from . import APP_NAME, SUITE_ROOT, TESTS_DIR
from .runner import InstallerTestRunner, discover_tests


class MainWindow(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle(APP_NAME)
        self.resize(1050, 700)

        self.runner = InstallerTestRunner(TESTS_DIR, SUITE_ROOT, self)
        self.runner.output.connect(self._append_output)
        self.runner.test_started.connect(self._test_started)
        self.runner.test_finished.connect(self._test_finished)
        self.runner.run_finished.connect(self._run_finished)
        self._items: dict[str, tuple[QListWidgetItem, str]] = {}

        central = QWidget()
        layout = QVBoxLayout(central)
        heading = QLabel(f"<h2>{APP_NAME}</h2>"
                         "<p>Choose installer checks to run. Output and exit status appear here.</p>")
        heading.setTextFormat(Qt.TextFormat.RichText)
        layout.addWidget(heading)

        warning = QLabel(
            "Tests use fakeroot and fixed temporary directories under /tmp. "
            "Do not run the same installer test concurrently."
        )
        warning.setWordWrap(True)
        warning.setStyleSheet("padding: 8px; border: 1px solid palette(mid); border-radius: 4px;")
        layout.addWidget(warning)

        splitter = QSplitter(Qt.Orientation.Horizontal)
        left = QWidget()
        left_layout = QVBoxLayout(left)
        self.test_list = QListWidget()
        self._populate_tests()
        left_layout.addWidget(self.test_list, 1)

        selection_buttons = QHBoxLayout()
        select_all = QPushButton("Select all")
        select_all.clicked.connect(self._select_all)
        clear = QPushButton("Clear")
        clear.clicked.connect(self._clear_selection)
        selection_buttons.addWidget(select_all)
        selection_buttons.addWidget(clear)
        left_layout.addLayout(selection_buttons)

        run_buttons = QHBoxLayout()
        self.run_selected_button = QPushButton("Run selected")
        self.run_selected_button.clicked.connect(self._run_selected)
        self.run_all_button = QPushButton("Run all")
        self.run_all_button.clicked.connect(self._run_all)
        self.stop_button = QPushButton("Stop")
        self.stop_button.setEnabled(False)
        self.stop_button.clicked.connect(self.runner.cancel)
        run_buttons.addWidget(self.run_selected_button)
        run_buttons.addWidget(self.run_all_button)
        run_buttons.addWidget(self.stop_button)
        left_layout.addLayout(run_buttons)

        right = QWidget()
        right_layout = QVBoxLayout(right)
        right_layout.addWidget(QLabel("Live output"))
        self.output_view = QPlainTextEdit()
        self.output_view.setReadOnly(True)
        self.output_view.document().setMaximumBlockCount(20000)
        right_layout.addWidget(self.output_view, 1)

        splitter.addWidget(left)
        splitter.addWidget(right)
        splitter.setStretchFactor(0, 1)
        splitter.setStretchFactor(1, 2)
        layout.addWidget(splitter, 1)
        self.setCentralWidget(central)
        self.statusBar().showMessage("Select tests or choose Run all.")

    def _populate_tests(self) -> None:
        for script in discover_tests(TESTS_DIR):
            title = script.stem.replace("-", " ").title()
            item = QListWidgetItem(title)
            item.setData(Qt.ItemDataRole.UserRole, script)
            item.setFlags(item.flags() | Qt.ItemFlag.ItemIsUserCheckable)
            item.setCheckState(Qt.CheckState.Unchecked)
            item.setToolTip(script.name)
            self.test_list.addItem(item)
            self._items[script.name] = item, title

    def _select_all(self) -> None:
        for index in range(self.test_list.count()):
            self.test_list.item(index).setCheckState(Qt.CheckState.Checked)

    def _clear_selection(self) -> None:
        for index in range(self.test_list.count()):
            self.test_list.item(index).setCheckState(Qt.CheckState.Unchecked)

    def _run_selected(self) -> None:
        scripts = [
            self.test_list.item(index).data(Qt.ItemDataRole.UserRole)
            for index in range(self.test_list.count())
            if self.test_list.item(index).checkState() == Qt.CheckState.Checked
        ]
        if not scripts:
            QMessageBox.information(self, APP_NAME, "Select one or more installer tests first.")
            return
        self._run(scripts)

    def _run_all(self) -> None:
        self._run(discover_tests(TESTS_DIR))

    def _run(self, scripts: list[Path]) -> None:
        self.output_view.clear()
        for item, title in self._items.values():
            item.setText(title)
        try:
            self.runner.start(scripts)
        except (OSError, RuntimeError, ValueError) as error:
            QMessageBox.critical(self, APP_NAME, str(error))
            return
        self.run_selected_button.setEnabled(False)
        self.run_all_button.setEnabled(False)
        self.statusBar().showMessage(f"Running {len(scripts)} installer test(s)…")

    def _append_output(self, text: str) -> None:
        self.output_view.moveCursor(QTextCursor.MoveOperation.End)
        self.output_view.insertPlainText(text)
        self.output_view.ensureCursorVisible()

    def _test_started(self, name: str) -> None:
        item, title = self._items[name]
        item.setText(f"[RUNNING] {title}")
        self.stop_button.setEnabled(True)
        self.statusBar().showMessage(f"Running {title}…")

    def _test_finished(self, name: str, exit_code: int, cancelled: bool) -> None:
        item, title = self._items[name]
        result = "CANCELLED" if cancelled else "PASS" if exit_code == 0 else f"FAIL ({exit_code})"
        item.setText(f"[{result}] {title}")
        self._append_output(f"\n== {title}: {result} ==\n")

    def _run_finished(self, cancelled: bool) -> None:
        self.run_selected_button.setEnabled(True)
        self.run_all_button.setEnabled(True)
        self.stop_button.setEnabled(False)
        self.statusBar().showMessage("Run cancelled." if cancelled else "Run complete.")

    def closeEvent(self, event: QCloseEvent) -> None:
        if self.runner.busy:
            answer = QMessageBox.question(
                self,
                APP_NAME,
                "An installer test is running. Stop it and close?",
                QMessageBox.StandardButton.Yes | QMessageBox.StandardButton.No,
                QMessageBox.StandardButton.No,
            )
            if answer != QMessageBox.StandardButton.Yes:
                event.ignore()
                return
            self.runner.shutdown()
        event.accept()
