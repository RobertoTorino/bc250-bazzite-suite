# SPDX-License-Identifier: GPL-3.0-or-later

import time
from unittest.mock import Mock, call, patch

import paramiko
import pytest
from PyQt6 import sip
from PyQt6.QtWidgets import QMessageBox, QWidget

from sftp_tools import client_tab, common, connection, main_window, server_tab, settings
from sftp_tools.connection import UnknownHostKeyError, server_status_after_action
from sftp_tools.main_window import MainWindow
from sftp_tools.server_tab import ServerManagerTab


def test_window_has_the_suite_header_and_shows_the_states(qapp) -> None:
    window = MainWindow()

    assert window.windowTitle() == "Bazzite SFTP Tools"
    assert window.sftp_tab.status.text() == "Not connected"
    assert window.sftp_box.value.text() == "Disconnected"
    assert window.server_box.value.text() == "Not checked"
    window.server_tab._show_status("active")
    assert window.server_box.value.text() == "sshd is running"
    assert "#2e7d32" in window.server_box.styleSheet()
    window.server_tab._show_status("inactive")
    assert "#ef6c00" in window.server_box.styleSheet()
    window.close()


def test_changed_settings_reach_the_queue_and_the_lists(qapp, tmp_path, monkeypatch) -> None:
    window = MainWindow()
    tab = window.sftp_tab
    refreshed: list[str] = []
    monkeypatch.setattr(tab, "refresh_local", lambda: refreshed.append("local"))
    monkeypatch.setattr(tab, "refresh_remote", lambda: refreshed.append("remote"))
    settings.load_settings(tmp_path / "config")
    settings.apply_settings(settings.AppSettings(preserve_timestamps=False, queue_autoclear=False,
                                                 invalid_char_replacement="-"))

    tab.settings_changed(False)
    assert (tab.queue.preserve_timestamps, tab.queue.queue_autoclear, tab.queue.char_replacement) == (False, False, "-")
    assert refreshed == []
    tab.settings_changed(True)
    assert refreshed == ["local", "remote"]
    window.close()


@pytest.mark.parametrize(
    ("state", "active", "button_text", "status_text", "tone"),
    [
        ("active", True, "Stop sshd", "sshd is running.", "success"),
        ("inactive", False, "Start sshd", "sshd is stopped.", "warning"),
    ],
)
def test_server_status_updates_pill_and_toggle_button(
    state: str,
    active: bool,
    button_text: str,
    status_text: str,
    tone: str,
) -> None:
    tab = ServerManagerTab()
    emitted: list[tuple[str, str]] = []
    tab.status_changed.connect(lambda value, color: emitted.append((value, color)))
    tab._ssh = Mock()

    tab._show_status(state)

    assert tab._sshd_active is active
    assert tab.toggle_service_button.text() == button_text
    assert tab.toggle_service_button.isEnabled()
    assert tab.status.text() == status_text
    assert emitted[-1] == (status_text.rstrip("."), tone)
    tab.close()


def test_unknown_server_status_disables_start_stop_button() -> None:
    tab = ServerManagerTab()
    tab._ssh = Mock()

    tab._show_status("activating")

    assert tab._sshd_active is None
    assert not tab.toggle_service_button.isEnabled()
    assert tab.status.text() == "sshd state: activating"
    tab.close()


@pytest.mark.parametrize(
    ("answer", "trusted"),
    [
        (QMessageBox.StandardButton.Yes, True),
        (QMessageBox.StandardButton.No, False),
    ],
)
def test_unknown_host_prompt_only_saves_after_yes(
    answer: QMessageBox.StandardButton,
    trusted: bool,
    monkeypatch,
) -> None:
    error = UnknownHostKeyError(
        "server.example",
        22,
        paramiko.RSAKey.generate(1024),
    )
    monkeypatch.setattr(common.PlainMessageBox, "question", lambda *args: answer)
    saved: list[UnknownHostKeyError] = []
    monkeypatch.setattr(
        common,
        "save_trusted_host_key",
        lambda host: saved.append(host),
    )
    monkeypatch.setattr(common.PlainMessageBox, "information", lambda *args: None)
    monkeypatch.setattr(common.PlainMessageBox, "critical", lambda *args: None)

    assert common.trust_unknown_host(QWidget(), error) is trusted
    assert saved == ([error] if trusted else [])


@pytest.mark.parametrize(
    ("state", "expected_action"),
    [("active", "stop"), ("inactive", "start")],
)
def test_service_button_runs_action_matching_observed_state(
    state: str, expected_action: str
) -> None:
    tab = ServerManagerTab()
    tab._ssh = Mock()
    actions: list[str] = []
    tab.perform_action = actions.append

    tab._show_status(state)
    tab.toggle_service()

    assert actions == [expected_action]
    tab.close()


@pytest.mark.parametrize("action", ["status", "start", "stop"])
def test_server_status_after_action_runs_action_then_checks_state(action: str) -> None:
    client = Mock()
    responses = ["active"] if action == "status" else [None, "active"]
    with patch("sftp_tools.connection.run_server_action", side_effect=responses) as command:
        assert server_status_after_action(client, action) == "active"

    expected = [call(client, "status")]
    if action != "status":
        expected.insert(0, call(client, action))
    assert command.call_args_list == expected


def test_worker_is_kept_alive_until_its_thread_finishes(qapp, monkeypatch) -> None:
    results: list[str] = []

    class DelayedFinishTask(client_tab.TaskRunner):
        def run(self) -> None:
            try:
                self.succeeded.emit(self.operation())
                time.sleep(0.1)
            except Exception as error:
                self.failed.emit(str(error))

    monkeypatch.setattr(client_tab, "TaskRunner", DelayedFinishTask)
    tab = client_tab.SftpClientTab()

    def launch_follow_up(result: str) -> None:
        results.append(result)
        if result == "connected":
            tab._run(lambda: "listed", results.append)

    tab._run(lambda: "connected", launch_follow_up)
    deadline = time.monotonic() + 3
    while (tab._workers or results != ["connected", "listed"]) and time.monotonic() < deadline:
        qapp.processEvents()
        time.sleep(0.005)

    assert results == ["connected", "listed"]
    assert not tab._workers
    assert not tab.has_running_tasks


def test_error_dot_shows_after_an_error_and_goes_with_its_window(qapp) -> None:
    from sftp_tools.app_logging import get_logger

    handlers = len(get_logger().handlers)
    window = MainWindow()
    window.show()
    assert len(get_logger().handlers) == handlers + 1
    assert not window.error_indicator.isVisible()
    get_logger().error("boom")
    assert window.error_indicator.isVisible()
    window.close()
    sip.delete(window)
    assert len(get_logger().handlers) == handlers
    get_logger().error("after the window is gone")


def test_local_list_keeps_every_cell_of_a_row_together(qapp, tmp_path) -> None:
    (tmp_path / "b.txt").write_text("12345")
    (tmp_path / "a-folder").mkdir()
    (tmp_path / "c.txt").write_text("")
    tab = client_tab.SftpClientTab()
    tab.local_path.setText(str(tmp_path))
    tab.refresh_local()

    rows = {tab.local_table.item(row, 0).text(): tab.local_table.item(row, 1).text()
            for row in range(tab.local_table.rowCount())}
    assert rows == {"..": "Folder", "a-folder": "Folder", "b.txt": "File", "c.txt": "File"}
    assert tab.local_table.isSortingEnabled()
