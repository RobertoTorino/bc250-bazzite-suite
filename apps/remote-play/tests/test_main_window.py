# SPDX-License-Identifier: AGPL-3.0-or-later
from __future__ import annotations

from types import SimpleNamespace

import pytest
from PyQt6.QtWidgets import QInputDialog, QMessageBox

from bc250_remote_play import jobs, psn
from bc250_remote_play.consoles import ConsoleStore, RegisteredConsole
from bc250_remote_play.discovery import Console
from bc250_remote_play.jobs import Outcome
from bc250_remote_play.main_window import AccountDialog, MainWindow
from bc250_remote_play.psn import Account
from bc250_remote_play.session import SessionInfo
from bc250_remote_play.target import Target
from fake_console import AMBASSADOR, MAC, REGIST_KEY, RP_KEY, RegistConsole, SessionConsole

PS5 = Console("192.168.1.20", True, "ready", host_name="Living room PS5", host_id="AABBCCDDEEFF", host_type="PS5",
              system_version="08050001")
PS4 = Console("192.168.1.21", False, "standby", host_name="PS4-Pro", host_id="001122334455", host_type="PS4",
              system_version="11008001")


def _registered(console: Console = PS5, **changes) -> RegisteredConsole:
    data = dict(host_id=console.host_id, nickname=console.host_name, address=console.address, target=console.target,
                regist_key=REGIST_KEY, rp_key=RP_KEY, mac=MAC)
    return RegisteredConsole(**{**data, **changes})


class FakeOps:
    """jobs.py as the window calls it; records the calls."""

    def __init__(self, found=(PS5, PS4)):
        self.found, self.calls = list(found), []

    def find(self, address=None):
        self.calls.append(("find", address))
        consoles = [c for c in self.found if address in (None, c.address)]
        return Outcome(True, f"{len(consoles)} found.", consoles)

    def register(self, console, account_id, pin):
        self.calls.append(("register", console.address, account_id, pin))
        return Outcome(True, "Registered.", _registered(console))

    def psn_account(self, redirect):
        self.calls.append(("psn_account", redirect))
        if "code=" not in redirect:
            return Outcome(False, "That address has no code in it.")
        return Outcome(True, "Account ID found.", Account(bytes(range(1, 9)), "player"))

    def wake(self, console):
        self.calls.append(("wake", console.address))
        return Outcome(True, "Wake-up sent.")

    def test_session(self, console):
        self.calls.append(("test_session", console.address))
        return Outcome(True, "Session started and closed.", SessionInfo(console.target, "PS5", "abc"), ["Session ID."])

    def test_stream(self, console):
        self.calls.append(("test_stream", console.address))
        return Outcome(True, "Stream ran.", SessionInfo(console.target, "PS5", "abc"), ["STREAMINFO received."])

    def rest_mode(self, console):
        self.calls.append(("rest_mode", console.address))
        return Outcome(False, "No session.", SessionInfo(console.target), [])


def _now(job, after):
    after(job())
    return True


@pytest.fixture
def window(qapp, config_dir):
    ops = FakeOps()
    w = MainWindow(config_dir=config_dir, ops=ops, run=_now)
    w.ops_fake = ops
    yield w
    w.close()


def test_opens_empty(window):
    assert window.found_table.rowCount() == 0 and window.registered_table.rowCount() == 0
    assert window.found_box.value.text() == "0" and window.registered_box.value.text() == "0"
    assert not window.register_button.isEnabled() and not window.test_button.isEnabled()
    assert window.search_button.isEnabled()


def test_search_lists_both_consoles(window):
    window.search_button.click()
    assert window.found_table.rowCount() == 2
    assert window.found_table.item(0, 0).text() == "Living room PS5"
    assert window.found_table.item(1, 3).text() == "Rest mode"
    assert window.found_table.item(0, 5).text() == "no"
    assert window.found_box.value.text() == "2"
    assert "2 found." in window.log.toPlainText()


def test_search_at_an_address_is_remembered(window, config_dir):
    window.address_edit.setText("192.168.1.21")
    window.address_button.click()
    assert window.ops_fake.calls[-1] == ("find", "192.168.1.21")
    assert window.found_table.rowCount() == 1
    assert window.settings.get("address") == "192.168.1.21"


def test_register_needs_a_selection_and_valid_input(window, monkeypatch):
    warnings = []
    monkeypatch.setattr(QMessageBox, "warning", lambda *args: warnings.append(args[2]))
    window.search_button.click()
    window.found_table.selectRow(0)
    assert window.register_button.isEnabled()
    window.account_edit.setText("my_online_name")
    window.pin_edit.setText("12345678")
    window.register_button.click()
    assert warnings and "account ID" in warnings[0]
    assert not any(call[0] == "register" for call in window.ops_fake.calls)


def test_register_stores_the_console(window, config_dir):
    window.search_button.click()
    window.found_table.selectRow(0)
    window.account_edit.setText("AAECAwQFBgc=")
    window.pin_edit.setText("1234 5678")
    window.register_button.click()
    assert window.ops_fake.calls[-1] == ("register", PS5.address, bytes(range(8)), 12345678)
    assert window.registered_table.rowCount() == 1
    assert window.registered_table.item(0, 3).text() == "1.0"
    assert window.found_table.item(0, 5).text() == "yes"
    assert window.pin_edit.text() == ""
    assert window.settings.get("account_id") == "AAECAwQFBgc="
    assert ConsoleStore(config_dir / "bc250-remote-play").load() == [_registered(PS5)]


def test_registered_consoles_are_loaded(qapp, config_dir):
    ConsoleStore(config_dir / "bc250-remote-play").put(_registered(PS4, login_pin="1234"))
    w = MainWindow(config_dir=config_dir, ops=FakeOps(), run=_now)
    try:
        assert w.registered_table.rowCount() == 1
        assert w.registered_table.item(0, 1).text() == "PS4"
        assert w.registered_table.item(0, 4).text() == "set"
    finally:
        w.close()


def test_a_console_with_a_new_address_is_updated(qapp, config_dir):
    store = ConsoleStore(config_dir / "bc250-remote-play")
    store.put(_registered(PS5, address="192.168.1.99"))
    w = MainWindow(config_dir=config_dir, ops=FakeOps(), run=_now)
    try:
        w.search_button.click()
        assert store.load()[0].address == PS5.address
        assert w.registered_table.item(0, 2).text() == PS5.address
    finally:
        w.close()


def test_wake_test_and_rest(qapp, config_dir):
    ConsoleStore(config_dir / "bc250-remote-play").put(_registered(PS5))
    ops = FakeOps()
    w = MainWindow(config_dir=config_dir, ops=ops, run=_now)
    try:
        w.registered_table.selectRow(0)
        w.wake_button.click()
        w.test_button.click()
        assert w.session_box.value.text() == "OK" and w.console_box.value.text() == "PS5"
        assert "  Session ID." in w.log.toPlainText()
        w.stream_button.click()
        assert "  STREAMINFO received." in w.log.toPlainText()
        w.rest_button.click()
        assert w.session_box.value.text() == "Failed"
        assert w.badge.text() == "Failed"
        assert [call[0] for call in ops.calls] == ["wake", "test_session", "test_stream", "rest_mode"]
    finally:
        w.close()


def test_passcode_and_remove(qapp, config_dir, monkeypatch):
    store = ConsoleStore(config_dir / "bc250-remote-play")
    store.put(_registered(PS5))
    w = MainWindow(config_dir=config_dir, ops=FakeOps(), run=_now)
    try:
        w.registered_table.selectRow(0)
        monkeypatch.setattr(QInputDialog, "getText", lambda *args: ("4321", True))
        w.passcode_button.click()
        assert store.load()[0].login_pin == "4321"
        assert w.registered_table.item(0, 4).text() == "set"
        w.registered_table.selectRow(0)
        monkeypatch.setattr(QMessageBox, "question", lambda *args: QMessageBox.StandardButton.Yes)
        w.remove_button.click()
        assert store.load() == [] and w.registered_table.rowCount() == 0
    finally:
        w.close()


def test_buttons_are_off_while_a_job_runs(window):
    seen = []

    def later(job, after):
        seen.append((window.search_button.isEnabled(), window.badge.text()))
        return True                                     # never finishes in this test

    window.run = later
    window.search_button.click()
    assert seen == [(False, "Searching…")]
    assert not window.search_button.isEnabled()


def test_jobs_against_the_fake_console():
    """jobs.py end to end: registration and a test session against the fake console on localhost."""
    reg = RegistConsole(target=Target.PS5_1)
    try:
        outcome = jobs.register(PS5.__class__("127.0.0.1", True, "ready", host_id="X", system_version="08050001"),
                                bytes(range(8)), 12345678, port=reg.port, timeout=2.0, pause=0,
                                random=lambda n: AMBASSADOR[:n])
    finally:
        reg.close()
    assert outcome.ok and outcome.value.regist_key == REGIST_KEY and outcome.value.address == "127.0.0.1"
    console = SessionConsole()
    try:
        tested = jobs.test_session(outcome.value, seconds=0.1, port=console.port, timeout=2.0)
    finally:
        console.close()
    assert tested.ok and tested.value.server_type == "PS5", tested.message
    closed = SessionConsole()
    closed.close()
    failed = jobs.test_session(outcome.value, seconds=0.1, port=closed.port, timeout=1.0)
    assert not failed.ok and "rest mode" in failed.message


def test_find_account_id_fills_the_field(window, monkeypatch):
    monkeypatch.setattr(window, "ask_redirect", lambda: "https://x/redirect?code=abc")
    window.account_button.click()
    assert window.account_edit.text() == "AQIDBAUGBwg=" and window.settings.get("account_id") == "AQIDBAUGBwg="
    assert window.ops_fake.calls[-1] == ("psn_account", "https://x/redirect?code=abc")
    monkeypatch.setattr(window, "ask_redirect", lambda: "nonsense")
    window.account_button.click()
    assert window.account_edit.text() == "AQIDBAUGBwg=" and "no code" in window.log.toPlainText()
    monkeypatch.setattr(window, "ask_redirect", lambda: None)                 # cancelled: nothing happens
    calls = len(window.ops_fake.calls)
    window.account_button.click()
    assert len(window.ops_fake.calls) == calls


def test_account_dialog(qapp):
    dialog = AccountDialog()
    assert dialog.url == psn.login_url() and "redirect" in dialog.redirect_edit.placeholderText()
    dialog.close()
