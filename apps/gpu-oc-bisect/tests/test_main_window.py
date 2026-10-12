# SPDX-License-Identifier: GPL-3.0-or-later
"""The window opens offscreen with the suite's header and turns its form into the right command; Install result and
Reset run only after their confirmation."""

from __future__ import annotations

import shlex

import pytest
from PyQt6.QtWidgets import QLabel, QMessageBox

from bc250_gpu_oc_gui import __version__
from bc250_gpu_oc_gui import main_window

SCRIPT = "/opt/bc250-gpu-oc-bisect/bc250-gpu-oc-bisect.sh"


@pytest.fixture
def commands(monkeypatch):
    """What the window would run in a terminal, and Yes to the start summary."""
    ran = []
    monkeypatch.setattr(main_window, "launch_in_terminal", ran.append)
    monkeypatch.setattr(QMessageBox, "question", lambda *a, **k: QMessageBox.StandardButton.Yes)
    return ran


@pytest.fixture
def window(qapp):
    w = main_window.MainWindow(SCRIPT)
    yield w
    w.close()


def test_header(window):
    labels = window.findChildren(QLabel)
    logo = next(label for label in labels if label.pixmap() is not None and not label.pixmap().isNull())
    assert logo.pixmap().width() == 96
    assert any("BC-250 GPU OC Bisect" in label.text() and f"v{__version__}" in label.text() for label in labels)


def test_start_with_the_defaults(window, commands):
    window.start_btn.click()
    assert [shlex.split(c) for c in commands] == [["bash", SCRIPT, "-t", "180", "-r", "3"]]


def test_undervolt_only(window, commands):
    window.oc_check.setChecked(False)
    assert not window.max_freq_spin.isEnabled() and window.min_volt_spin.isEnabled()
    window.min_volt_spin.setValue(800)
    window.start_btn.click()
    assert shlex.split(commands[0])[2:] == ["-t", "180", "-r", "3", "--uv", "--min-volt", "800"]


def test_no_sweep_no_start(window):
    window.oc_check.setChecked(False)
    window.uv_check.setChecked(False)
    assert not window.start_btn.isEnabled()


@pytest.mark.parametrize(("button", "flag"), [("install_btn", "--install"), ("reset_btn", "--reset")])
def test_confirmed_actions(window, commands, monkeypatch, button, flag):
    answer = {"value": QMessageBox.StandardButton.Cancel}
    monkeypatch.setattr(QMessageBox, "exec", lambda self: answer["value"])
    getattr(window, button).click()
    assert commands == []
    answer["value"] = QMessageBox.StandardButton.Yes
    getattr(window, button).click()
    assert [shlex.split(c) for c in commands] == [["bash", SCRIPT, flag]]
