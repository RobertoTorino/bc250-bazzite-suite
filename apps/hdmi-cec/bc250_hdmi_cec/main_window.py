# SPDX-License-Identifier: GPL-3.0-or-later
"""The main window: the board's CEC adapter and the TV behind it, buttons for the TV, the automatic behaviour of
Valve's CEC daemon (cecd) and a tester for the remote's keys.

The buttons send their messages with cec-ctl, so they work whichever CEC mode Bazzite is in. The automatic part
(wake and standby with the board, the remote as key presses) is cecd's: the app only writes its settings."""

from __future__ import annotations

import time
from html import escape
from pathlib import Path
from typing import Callable

from PyQt6.QtCore import Qt
from PyQt6.QtGui import QCloseEvent
from PyQt6.QtWidgets import (QCheckBox, QGridLayout, QGroupBox, QHBoxLayout, QLabel, QListWidget, QMainWindow,
                             QMessageBox, QPushButton, QVBoxLayout, QWidget)

from bc250_core import SUITE_MANUAL_URL, window_title
from bc250_core import __version__ as CORE_VERSION
from bc250_core.platform import config_home, launch_in_terminal
from bc250_core.settings import SettingsStore
from bc250_core.theme import BLUE, GREY, PURPLE
from bc250_core.widgets import (ClickableLogo, MetricBox, StatusText, TextDialog, accent_button, hint_label,
                                 page_header)

from . import APP_NAME, INFO, LOGO_PATH, __version__
from . import bazzite, cec, runner
from .remote import RemoteListener

MANUAL_URL = f"{SUITE_MANUAL_URL}apps/hdmi-cec/"
KEYS_SHOWN = 12                         # the key tester's list
NO_ANSWER = ("No device answered. Check that CEC is switched on in the TV's settings (it has a brand name there: "
             "Anynet+, SimpLink, Bravia Sync, HDMI control, …), that the TV is on, and that the cable or adapter "
             "passes CEC: many DP-to-HDMI converters report CEC but do not connect its wire.")
AUTOMATIC = (
    ("wake_tv", "Turn the TV on when the board wakes from sleep"),
    ("suspend_tv", "Put the TV in standby when the board goes to sleep"),
    ("uinput", "Use the TV remote as a keyboard (arrows, OK, back, play/pause)"),
    ("allow_standby", "Put the board to sleep when the TV goes to standby"),
)


class CecSettings(SettingsStore):
    DEFAULTS = {}


class MainWindow(QMainWindow):
    def __init__(self, dev_root: Path = Path("/dev"), sys_root: Path = Path("/sys"),
                 config_dir: Path | None = None, etc_root: Path = Path("/etc"), usr_root: Path = Path("/usr"),
                 run: Callable[[list[str]], runner.Result] = runner.run,
                 terminal: Callable[[str], None] = launch_in_terminal, listen: bool = True):
        super().__init__()
        self.resize(860, 760)
        self.dev_root, self.sys_root, self.etc_root, self.usr_root = dev_root, sys_root, etc_root, usr_root
        self.config_dir = config_dir or config_home()
        self.run, self.terminal = run, terminal
        self.settings = CecSettings(INFO, self)
        self.adapter: cec.Adapter | None = None
        self.audio_target = cec.TV                  # the audio system (5) once it answered a poll, else the TV

        header, _title = page_header(APP_NAME)
        header.insertWidget(0, ClickableLogo(LOGO_PATH, 40))
        self.badge = StatusText()
        header.insertWidget(2, self.badge)

        self.adapter_box = MetricBox("CEC adapter", PURPLE)
        self.address_box = MetricBox("Physical address", BLUE)
        self.display_box = MetricBox("Display", GREY)
        self.power_box = MetricBox("TV power", GREY)
        boxes = QHBoxLayout()
        for box in (self.adapter_box, self.address_box, self.display_box, self.power_box):
            boxes.addWidget(box)
        self.adapter_note = hint_label("")

        tv = QGroupBox("TV")
        self.on_button = accent_button("Turn TV on", "Wake the TV and switch it to the BC-250")
        self.on_button.clicked.connect(self.tv_on)
        self.source_button = QPushButton("Switch to BC-250")
        self.source_button.setToolTip("Make the TV show the BC-250's input")
        self.source_button.clicked.connect(self.switch_source)
        self.standby_button = QPushButton("TV standby")
        self.standby_button.clicked.connect(self.tv_standby)
        self.check_button = QPushButton("Check TV")
        self.check_button.setToolTip("Ask the TV whether it is there and on (a poll and its power status)")
        self.check_button.clicked.connect(self.check_tv)
        self.volume_buttons = []
        for text, ui_cmd in (("Volume −", "volume-down"), ("Volume +", "volume-up"), ("Mute", "mute")):
            button = QPushButton(text)
            button.setToolTip("To the AV receiver when one answers, else to the TV")
            button.clicked.connect(lambda _c=False, cmd=ui_cmd: self.press(cmd))
            self.volume_buttons.append(button)
        self.topology_button = QPushButton("Devices on the bus…")
        self.topology_button.setToolTip("Ask every device on the HDMI bus who it is (read-only)")
        self.topology_button.clicked.connect(self.show_topology)
        grid = QGridLayout()
        for col, w in enumerate((self.on_button, self.source_button, self.standby_button, self.check_button)):
            grid.addWidget(w, 0, col)
        for col, w in enumerate((*self.volume_buttons, self.topology_button)):
            grid.addWidget(w, 1, col)
        self.result = hint_label("")
        lay_tv = QVBoxLayout(tv)
        lay_tv.addLayout(grid)
        lay_tv.addWidget(self.result)

        automatic = QGroupBox("Automatic (Valve's CEC daemon)")
        self.mode_label = QLabel()
        self.mode_label.setWordWrap(True)
        self.native_button = QPushButton("Use Valve's CEC daemon…")
        self.native_button.setToolTip(f"Runs `{bazzite.NATIVE_COMMAND}` in a terminal; it asks for your password")
        self.native_button.clicked.connect(self.use_native)
        self.recheck_button = QPushButton("Check again")
        self.recheck_button.clicked.connect(self.refresh)
        mode_row = QHBoxLayout()
        mode_row.addWidget(self.mode_label, 1)
        mode_row.addWidget(self.native_button)
        mode_row.addWidget(self.recheck_button)
        self.boxes: dict[str, QCheckBox] = {}
        lay_auto = QVBoxLayout(automatic)
        lay_auto.addLayout(mode_row)
        for key, text in AUTOMATIC:
            box = QCheckBox(text)
            box.toggled.connect(self.save_automatic)
            self.boxes[key] = box
            lay_auto.addWidget(box)
        self.automatic_note = hint_label("")
        lay_auto.addWidget(self.automatic_note)
        lay_auto.addWidget(hint_label(
            "Bazzite starts the daemon with your desktop session. These switches are its settings for your account, "
            f"in ~/.config/cecd/config.d/{bazzite.FRAGMENT}. <a href='{MANUAL_URL}'>Manual</a>"))

        keys = QGroupBox("Remote control keys")
        self.keys = QListWidget()
        self.keys.setMaximumHeight(110)
        self.keys_note = hint_label("")
        lay_keys = QVBoxLayout(keys)
        lay_keys.addWidget(self.keys_note)
        lay_keys.addWidget(self.keys)
        self.listener = RemoteListener(self)
        self.listener.pressed.connect(self.key_pressed)
        self.listening = listen and self.listener.start()

        central = QWidget()
        lay = QVBoxLayout(central)
        lay.addLayout(header)
        lay.addLayout(boxes)
        lay.addWidget(self.adapter_note)
        lay.addWidget(tv)
        lay.addWidget(automatic)
        lay.addWidget(keys)
        lay.addStretch(1)
        version = QLabel(f"{APP_NAME} {__version__} · core {CORE_VERSION} · sends CEC messages only when you press "
                         "a button")
        version.setStyleSheet("color:palette(placeholder-text);")
        lay.addWidget(version, 0, Qt.AlignmentFlag.AlignRight)
        self.setCentralWidget(central)

        geometry = self.settings.window_state("geometry")
        if geometry is not None:
            self.restoreGeometry(geometry)
        self.refresh()

    # --- State ------------------------------------------------------------------------------------------------

    def cec_ctl(self, args: list[str]) -> runner.Result:
        return self.run([cec.CEC_CTL, *args])

    def refresh(self) -> None:
        """Reads the adapter and Bazzite's CEC mode again; sends nothing on the bus."""
        found = cec.devices(self.dev_root)
        self.adapter = None
        if found:
            result = self.cec_ctl(cec.info(found[0]))
            if result.ok:
                self.adapter = cec.parse_info(found[0], result.out)
        a = self.adapter
        if a is None:
            self.badge.set_status("No CEC adapter", "warn")
            self.adapter_box.set_value("None")
            self.address_box.set_value("—")
            self.display_box.set_value("—")
            self.adapter_note.setText(
                "No /dev/cec* device. On the BC-250 the CEC adapter is part of amdgpu and appears only when the "
                "DP-to-HDMI cable or adapter reports CEC tunnelling; many do not. A USB CEC adapter (Pulse-Eight) "
                "is the alternative." if not found else
                f"cec-ctl could not read {found[0]}. Is v4l-utils installed?")
        else:
            self.adapter_box.set_value(a.name or Path(a.device).name, f"{a.device} · driver {a.driver}")
            self.address_box.set_value(a.physical_address if a.has_display else "None",
                                       "The display's HDMI address for this input, from its EDID")
            self.display_box.set_value(cec.display_name(a.name, self.sys_root) or "—")
            if not a.has_display:
                self.badge.set_status("No display seen", "warn")
                self.adapter_note.setText("The adapter sees no display: the TV is off or not connected, or its "
                                          "EDID was not read. CEC needs both.")
            else:
                self.badge.set_status("Not checked", "neutral", "Check TV asks the TV whether it is there")
                self.adapter_note.setText(f"{escape(a.device)} on {escape(a.name)} ({escape(a.driver)}), "
                                          f"{escape(', '.join(a.logical_addresses) or 'no logical address yet')}.")
        for w in (self.on_button, self.source_button, self.standby_button, self.check_button, self.topology_button,
                  *self.volume_buttons):
            w.setEnabled(a is not None)
        self.power_box.set_value("—")
        self.refresh_mode()

    def refresh_mode(self) -> None:
        mode = bazzite.read_mode(self.run, self.usr_root)
        self.mode = mode
        running = "running" if mode.cecd_running else "not running"
        if not mode.cecd_installed:
            text = "This Bazzite has no cecd (Valve's linux-cec package), so there is no automatic part."
        elif mode.name == "native":
            text = f"Bazzite CEC mode: <b>{mode.label}</b>, cecd is {running}."
        else:
            text = (f"Bazzite CEC mode: <b>{mode.label}</b>. The automatic part needs Valve's CEC daemon: "
                    "Bazzite's native mode, made for a GPU with its own CEC adapter like this board's.")
        self.mode_label.setText(text)
        native = mode.name == "native"
        self.native_button.setVisible(mode.cecd_installed and not native)
        current = bazzite.read_settings(self.config_dir, self.etc_root, self.usr_root)
        for key, box in self.boxes.items():
            box.blockSignals(True)
            box.setChecked(current[key])
            box.blockSignals(False)
            box.setEnabled(native)
        self.automatic_note.setText("" if native else "The switches show cecd's settings; they take effect in native "
                                                      "mode.")
        self.automatic_note.setVisible(bool(self.automatic_note.text()))
        if not self.listening:
            self.keys_note.setText("No session bus: the key tester cannot listen.")
        elif mode.cecd_running:
            self.keys_note.setText("Press keys on the TV remote: each one the board receives shows here. The TV "
                                   "sends them only while the BC-250 is the input it shows.")
        else:
            self.keys_note.setText("The key tester listens to Valve's CEC daemon, which is not running.")

    # --- TV ---------------------------------------------------------------------------------------------------

    def ensure_configured(self) -> bool:
        """The adapter needs a logical address to send from. cecd claims one; without it the app does, once."""
        a = self.adapter
        if a is None:
            return False
        if not a.configured:
            result = self.cec_ctl(cec.configure(a.device))
            if not result.ok:
                self.show_result(f"Could not configure {a.device}:\n{result.out.strip()}")
                return False
            self.adapter = cec.parse_info(a.device, result.out) if "Driver Info" in result.out else a
        return True

    def send(self, args: list[str], done: str) -> bool:
        result = self.cec_ctl(args)
        if cec.acked(result.out):
            self.show_result(done, ok=True)
            return True
        if "Not Acknowledged" in result.out:
            self.show_result(NO_ANSWER, ok=False)
        else:
            self.show_result(f"The message did not go out:\n{result.out.strip()}")
        return False

    def show_result(self, text: str, ok: bool | None = None) -> None:
        """The outcome under the buttons; *ok* also sets the badge: whether the TV answered (None: not asked)."""
        self.result.setText(f"{time.strftime('%H:%M:%S')}  {escape(text)}")
        if ok is not None:
            self.badge.set_status("TV answers" if ok else "TV does not answer", "ok" if ok else "warn")

    def tv_on(self) -> None:
        if self.ensure_configured() and self.send(cec.image_view_on(self.adapter.device), "The TV took Image View On."):
            self.switch_source()

    def switch_source(self) -> None:
        a = self.adapter
        if not self.ensure_configured() or a is None:
            return
        if not a.has_display:
            self.show_result("The board has no physical address yet, so the TV cannot be switched to it.")
            return
        self.send(cec.active_source(a.device, a.physical_address),
                  f"Sent Active Source {a.physical_address}: the TV should show the BC-250.")

    def tv_standby(self) -> None:
        if self.ensure_configured():
            self.send(cec.standby(self.adapter.device), "The TV took Standby.")

    def check_tv(self) -> None:
        if not self.ensure_configured():
            return
        device = self.adapter.device
        if not self.send(cec.poll(device), "The TV answered the poll."):
            self.power_box.set_value("No answer")
            return
        state = cec.power_status(self.cec_ctl(cec.give_power_status(device)).out)
        self.power_box.set_value(state or "Unknown", "" if state else "The TV took the question but did not reply")
        audio = self.cec_ctl(cec.poll(device, cec.AUDIO_SYSTEM))
        self.audio_target = cec.AUDIO_SYSTEM if cec.acked(audio.out) else cec.TV
        receiver = (" An AV receiver answered too; the volume buttons go to it."
                    if self.audio_target == cec.AUDIO_SYSTEM else "")
        self.show_result(f"The TV answered: power {state or 'unknown'}.{receiver}", ok=True)

    def press(self, ui_cmd: str) -> None:
        if not self.ensure_configured():
            return
        device = self.adapter.device
        if self.send(cec.key_press(device, self.audio_target, ui_cmd), f"Sent {ui_cmd}."):
            self.cec_ctl(cec.key_release(device, self.audio_target))

    def show_topology(self) -> None:
        if not self.ensure_configured():
            return
        result = self.cec_ctl(cec.topology(self.adapter.device))
        found = cec.parse_topology(result.out)
        lines = [f"{address}  {name}" for address, name in found] or ["No devices found."]
        if len(found) <= 1:
            lines += ["", NO_ANSWER]
        TextDialog("Devices on the HDMI bus", "\n".join(lines) + f"\n\ncec-ctl said:\n{result.out}", self).exec()

    # --- Automatic --------------------------------------------------------------------------------------------

    def save_automatic(self) -> None:
        settings = {key: box.isChecked() for key, box in self.boxes.items()}
        path = bazzite.write_settings(self.config_dir, settings)
        reloaded = bazzite.reload_cecd(self.run)
        self.automatic_note.setText(f"Saved in {path}." + ("" if reloaded.ok else
                                                           " cecd is not running; it reads them when it starts."))
        self.automatic_note.setVisible(True)

    def use_native(self) -> None:
        answer = QMessageBox.question(
            self, window_title("Valve's CEC daemon"),
            "Switch Bazzite's HDMI-CEC to native mode?\n\n"
            f"This runs `{bazzite.NATIVE_COMMAND}` in a terminal, Bazzite's own command. It turns off the older "
            "cec-control services and starts Valve's CEC daemon with your desktop session. It asks for your "
            "password.\n\nPress Check again when it is done.")
        if answer != QMessageBox.StandardButton.Yes:
            return
        try:
            self.terminal(bazzite.NATIVE_COMMAND)
        except RuntimeError as exc:
            QMessageBox.warning(self, window_title("Valve's CEC daemon"), str(exc))

    # --- Remote -----------------------------------------------------------------------------------------------

    def key_pressed(self, command: int, initiator: int) -> None:
        source = "TV" if initiator == cec.TV else f"device {initiator}"
        self.keys.insertItem(0, f"{time.strftime('%H:%M:%S')}  {cec.ui_command_name(command)}  "
                                f"(0x{command:02x}, from the {source})")
        while self.keys.count() > KEYS_SHOWN:
            self.keys.takeItem(self.keys.count() - 1)

    def closeEvent(self, event: QCloseEvent) -> None:
        self.settings.set_window_state("geometry", self.saveGeometry())
        self.settings.sync()
        super().closeEvent(event)
