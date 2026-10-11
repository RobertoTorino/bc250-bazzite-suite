# SPDX-License-Identifier: GPL-3.0-or-later
import tomllib

import pytest
from PyQt6.QtWidgets import QMessageBox

from bc250_hdmi_cec import main_window
from bc250_hdmi_cec.main_window import MainWindow
from bc250_hdmi_cec.runner import Result
from conftest import ACK, INFO, NACK, POWER_ON, TOPOLOGY_TV, UNCONFIGURED


class FakeBoard:
    """cec-ctl and systemctl as the board answers them; tv=False is the owner's board today: nothing acknowledges."""

    def __init__(self, tv=True, info=INFO, native=False, receiver=False):
        self.tv, self.info, self.native, self.receiver = tv, info, native, receiver
        self.calls = []

    def __call__(self, argv):
        self.calls.append(argv)
        if argv[0] == "systemctl":
            unit = argv[-1]
            if "is-enabled" in argv:
                return Result(0, "enabled\n") if self.native and unit == "cecd.service" else Result(1, "disabled\n")
            if "is-active" in argv:
                return Result(0, "active\n") if self.native else Result(3, "inactive\n")
            return Result(0 if self.native else 1, "")
        args = argv[1:]
        if len(args) == 2 or "--playback" in args:          # the adapter's state; configuring prints it too
            if "--playback" in args:
                self.info = INFO
            return Result(0, self.info)
        if "--show-topology" in args:
            return Result(0, TOPOLOGY_TV if self.tv else self.info + "\n\tTopology:\n\n\t    1.0.0.0: Playback\n")
        if not self.tv:
            return Result(0, NACK)
        if "--give-device-power-status" in args:
            return Result(0, POWER_ON)
        if "--poll" in args and args[-1] == "5" and not self.receiver:
            return Result(0, NACK)
        return Result(0, ACK)

    def sent(self, option):
        return [c for c in self.calls if option in c]

    def target(self, option):
        """The logical address the first message with *option* went to."""
        call = self.sent(option)[0]
        return call[call.index("--to") + 1]


@pytest.fixture
def make(qapp, dev_root, sys_root, etc_root, usr_root, tmp_path):
    made = []

    def build(board, terminal=None):
        w = MainWindow(dev_root, sys_root, tmp_path / "config", etc_root, usr_root, run=board,
                       terminal=terminal or (lambda cmd: None), listen=False)
        made.append(w)
        return w
    yield build
    for w in made:
        w.close()


def test_shows_the_adapter_and_tv(make):
    w = make(FakeBoard())
    assert w.adapter_box.value.text() == "DP-1"
    assert w.address_box.value.text() == "1.0.0.0"
    assert w.display_box.value.text() == "Mi TV"
    assert w.badge.text() == "Not checked"
    assert w.on_button.isEnabled()


def test_opening_sends_nothing_on_the_bus(make):
    board = FakeBoard()
    w = make(board)
    assert [c[1:] for c in board.calls if c[0] == "cec-ctl"] == [["-d", w.adapter.device]]


def test_no_adapter(make, dev_root):
    (dev_root / "cec0").unlink()
    w = make(FakeBoard())
    assert w.badge.text() == "No CEC adapter" and w.adapter_box.value.text() == "None"
    assert "DP-to-HDMI" in w.adapter_note.text()
    assert not w.on_button.isEnabled() and not w.check_button.isEnabled()


def test_no_display(make):
    w = make(FakeBoard(info=INFO.replace("1.0.0.0", "f.f.f.f")))
    assert w.badge.text() == "No display seen" and w.address_box.value.text() == "None"


def test_turn_tv_on_wakes_and_switches(make):
    board = FakeBoard()
    w = make(board)
    w.tv_on()
    assert board.sent("--image-view-on") and board.sent("--active-source")
    assert board.sent("--active-source")[0][-1] == "phys-addr=1.0.0.0"
    assert w.badge.text() == "TV answers" and "BC-250" in w.result.text()


def test_tv_that_does_not_answer(make):
    board = FakeBoard(tv=False)
    w = make(board)
    w.tv_on()
    assert board.sent("--image-view-on") and not board.sent("--active-source")
    assert w.badge.text() == "TV does not answer" and "settings" in w.result.text()
    w.check_tv()
    assert w.power_box.value.text() == "No answer"


def test_check_tv_and_the_receiver(make):
    board = FakeBoard(receiver=True)
    w = make(board)
    w.check_tv()
    assert w.power_box.value.text() == "on" and "AV receiver" in w.result.text()
    w.press("volume-up")
    assert board.target("ui-cmd=volume-up") == "5" and board.sent("--user-control-released")


def test_volume_goes_to_the_tv_without_a_receiver(make):
    board = FakeBoard()
    w = make(board)
    w.check_tv()
    w.press("mute")
    assert board.target("ui-cmd=mute") == "0"


def test_unconfigured_adapter_is_configured_once(make):
    board = FakeBoard(info=UNCONFIGURED)
    w = make(board)
    w.tv_standby()
    w.tv_standby()
    assert len(board.sent("--playback")) == 1 and len(board.sent("--standby")) == 2


def test_topology_dialog(make, monkeypatch):
    shown = []
    monkeypatch.setattr(main_window.TextDialog, "exec", lambda self: shown.append(self.terminal.toPlainText()))
    make(FakeBoard()).show_topology()
    assert "0.0.0.0  TV" in shown[0] and "No device answered" not in shown[0]
    make(FakeBoard(tv=False)).show_topology()
    assert "No device answered" in shown[1]


def test_automatic_needs_native_mode(make):
    w = make(FakeBoard())
    assert not w.native_button.isHidden() and "Off" in w.mode_label.text()
    assert not any(box.isEnabled() for box in w.boxes.values())
    assert w.boxes["uinput"].isChecked() and not w.boxes["wake_tv"].isChecked()      # cecd's defaults


def test_native_mode_saves_and_reloads(make, tmp_path):
    board = FakeBoard(native=True)
    w = make(board)
    assert w.native_button.isHidden() and "cecd is running" in w.mode_label.text()
    w.boxes["wake_tv"].setChecked(True)
    fragment = tmp_path / "config/cecd/config.d/99-bc250-hdmi-cec.toml"
    assert tomllib.loads(fragment.read_text())["wake_tv"] is True
    assert ["systemctl", "--user", "kill", "-s", "HUP", "cecd.service"] in board.calls
    w.refresh()
    assert w.boxes["wake_tv"].isChecked()


def test_use_native_runs_ujust(make, monkeypatch):
    ran = []
    monkeypatch.setattr(QMessageBox, "question", lambda *a, **k: QMessageBox.StandardButton.Yes)
    w = make(FakeBoard(), terminal=ran.append)
    w.use_native()
    assert ran == ["ujust cec-mode native"]
    monkeypatch.setattr(QMessageBox, "question", lambda *a, **k: QMessageBox.StandardButton.No)
    w.use_native()
    assert len(ran) == 1


def test_key_tester(make):
    w = make(FakeBoard(native=True))
    for _ in range(main_window.KEYS_SHOWN + 3):
        w.key_pressed(0x41, 0)
    assert w.keys.count() == main_window.KEYS_SHOWN
    assert "volume-up" in w.keys.item(0).text() and "from the TV" in w.keys.item(0).text()
