# SPDX-License-Identifier: GPL-3.0-or-later
"""The window against the real script on the fake board (conftest.Board): the steps it shows, the buttons it
enables, the commands its buttons run and the switches in the launch options."""

from __future__ import annotations

import pytest
from PyQt6.QtWidgets import QApplication, QDialog, QMessageBox

from bc250_mesh_shaders import main_window
from bc250_mesh_shaders.main_window import MainWindow
from bc250_mesh_shaders.switches import SWITCHES, SwitchesDialog
from conftest import SCRIPT, needs_bash

pytestmark = needs_bash

RUN = "/usr/local/bin/bc250-mesh-shaders-run %command%"


@pytest.fixture
def window(qapp, board, monkeypatch):
    for key, value in board.env.items():
        monkeypatch.setenv(key, value)
    w = MainWindow(SCRIPT)
    yield w
    w.close()


def test_fresh_board(window):
    assert window.pill.text() == "Not built"
    assert window.build_state.text().startswith("Not built. Builds DirectMesh v1.3.1, Mesa 26.2.1:")
    assert window.build_button.isEnabled()
    assert not window.install_button.isEnabled() and not window.remove_button.isEnabled()
    assert not window.test_button.isEnabled()
    assert not window.copy_button.isEnabled() and not window.switches_button.isEnabled()
    assert "kernel 7.2.8-ogc5.1.fc44.x86_64" in window.system.text()


def test_no_build_without_a_bc250(window, board):
    (board.root / "sys/bus/pci/devices/0000:01:00.0/device").write_text("0x73bf\n")
    window.refresh()
    assert window.pill.text() == "No BC-250" and not window.build_button.isEnabled()


def test_installed_and_tested(window, board):
    board.make_build()
    board.install()
    window.refresh()
    assert window.pill.text() == "Test needed"
    assert window.install_state.text().startswith("Installed: DirectMesh v1.3.1, Mesa 26.2.1, 2026-10-13 19:42 UTC")
    assert window.test_button.isEnabled() and not window.install_button.isEnabled()
    board.pass_test()
    window.refresh()
    assert window.pill.text() == "Ready"
    assert window.test_state.text().startswith("<span style='color:#2e7d32'><b>Passed</b></span> on this kernel")
    window.copy_launch_options()
    assert QApplication.clipboard().text() == RUN


def test_newer_build_waits_to_be_installed(window, board):
    board.make_build()
    board.install()
    board.make_build(built="2026-10-14 08:00 UTC")
    window.refresh()
    assert "A newer build is waiting" in window.install_state.text()
    assert window.install_button.isEnabled()


def test_build_of_an_older_directmesh(window, board):
    board.make_build(directmesh="v1.3")
    window.refresh()
    assert "This version of the app builds DirectMesh v1.3.1, Mesa 26.2.1" in window.build_state.text()


def test_switches_go_into_the_launch_options(window, board, monkeypatch):
    board.make_build()
    board.install()
    window.refresh()
    picked = [SWITCHES[0], SWITCHES[4]]
    monkeypatch.setattr(SwitchesDialog, "exec", lambda self: QDialog.DialogCode.Accepted)
    monkeypatch.setattr(SwitchesDialog, "chosen", lambda self: picked)
    window.on_switches()
    expected = f"RADV_BC250_MESH_IDXPASS=0 RADV_DEBUG=nomeshshader {RUN}"
    assert window.launch_options() == expected
    assert "RADV_BC250_MESH_IDXPASS=0 RADV_DEBUG=nomeshshader" in window.use_state.text()
    assert "<b>Switches:</b> No indexed mesh draws, Hide mesh shaders." in window.use_state.text()
    window.copy_launch_options()
    assert QApplication.clipboard().text() == expected
    assert MainWindow(SCRIPT).launch_options() == expected                  # kept in the settings

    monkeypatch.setattr(SwitchesDialog, "chosen", lambda self: [])
    window.on_switches()
    assert window.launch_options() == RUN and "Switches:" not in window.use_state.text()


def test_switches_dialog(qapp):
    dialog = SwitchesDialog([SWITCHES[1]])
    assert dialog.chosen() == [SWITCHES[1]]
    dialog.boxes[SWITCHES[2]].setChecked(True)
    assert dialog.chosen() == [SWITCHES[1], SWITCHES[2]]
    assert dialog.boxes[SWITCHES[3]].text() == "DirectMesh off (RADV_DIRECTMESH=0)"


def test_commands(window):
    assert window.command("build") == ["bash", str(SCRIPT), "--build"]
    assert window.command("test") == ["bash", str(SCRIPT), "--test"]
    assert window.command("install") == ["pkexec", "/usr/bin/bash", str(SCRIPT), "--install-driver"]
    assert window.command("remove") == ["pkexec", "/usr/bin/bash", str(SCRIPT), "--remove-driver"]


def test_buttons_ask_first(window, monkeypatch):
    ran = []
    monkeypatch.setattr(window, "run", ran.append)
    monkeypatch.setattr(QMessageBox, "question", lambda *a, **k: QMessageBox.StandardButton.No)
    window.on_build()
    window.on_install()
    window.on_remove()
    assert ran == []
    monkeypatch.setattr(QMessageBox, "question", lambda *a, **k: QMessageBox.StandardButton.Yes)
    window.on_build()
    window.on_install()
    window.on_remove()
    assert ran == ["build", "install", "remove"]


def test_run_shows_the_output_and_refreshes(window, board, qapp, monkeypatch):
    monkeypatch.setitem(main_window.ACTIONS, "test", (["--launch-options"], False, "Testing…"))
    window.run("test")
    assert window.process is not None and not window.build_button.isEnabled()
    assert window.process.waitForFinished(10000)
    qapp.processEvents()
    assert window.running.text() == "Done."
    assert "bc250-mesh-shaders-run %command%" in window.output.toPlainText()
    assert window.process is None and window.build_button.isEnabled()


def test_not_authorised(window):
    window.action = "install"
    window.process = object()
    window._finished(126)
    assert window.running.text().startswith("Not authorised")
