# SPDX-License-Identifier: GPL-3.0-or-later
"""The window: the controller's state in the header (model, connection, battery, firmware, the latest firmware),
the firmware update and, on the DualSense Edge, its profiles. Every second it looks in /sys for the controllers; it
reads a controller's firmware report and profiles once each time one appears. The update runs in its own thread;
the window shows how far it is."""

from __future__ import annotations

import html
import time
from collections.abc import Callable
from pathlib import Path

from PyQt6.QtCore import Qt, QTimer
from PyQt6.QtWidgets import (QAbstractItemView, QCheckBox, QComboBox, QFileDialog, QGroupBox, QHBoxLayout,
                             QHeaderView, QLabel, QMessageBox, QProgressBar, QPushButton, QTableWidget,
                             QTableWidgetItem, QVBoxLayout, QWidget)

from bc250_core import window_title
from bc250_core.settings import restore_geometry, save_geometry
from bc250_core.theme import GREY, STATE_COLORS
from bc250_core.updates import UpdateChecker
from bc250_core.widgets import AppHeader, MetricBox, StatusText, accent_button, hint_label, same_width

from . import APP_NAME, INFO, LOGO_PATH, __version__, controller, firmware, hidraw, profiles, updater
from .controller import Controller, FirmwareInfo
from .settings import ControlSettings

INTERVAL_MS = 1000
CHECK_AGE_S = 24 * 3600             # the window asks Sony's server again after a day
PROFILE_COLUMNS = ("Profile", "Name", "Left stick", "Right stick", "L2", "R2", "Buttons")


def _job(function: Callable, *args) -> Callable[[], object]:
    """A job for UpdateChecker: its result, or the error it raised (a thread must not raise)."""
    def run():
        try:
            return function(*args)
        except (firmware.FirmwareError, updater.UpdateError, OSError, ValueError) as exc:
            return exc
    return run


def _error(exc: Exception) -> str:
    return (exc.strerror or str(exc)) if isinstance(exc, OSError) else str(exc)


class MainWindow(QWidget):
    def __init__(self, sys_root: Path = controller.SYS, dev: Path = controller.DEV, proc: Path = controller.PROC,
                 open_device: Callable[[Path, dict[int, int]], hidraw.Device] = hidraw.Device,
                 firmware_home: Path | None = None, get: firmware.Get | None = None,
                 update: Callable[..., None] = updater.update, clock: Callable[[], float] = time.time,
                 writable: Callable[[Path], bool] = controller.writable):
        super().__init__()
        self.setWindowTitle(APP_NAME)
        self.settings = ControlSettings(INFO, self)
        self.sys_root = sys_root
        self.dev = dev
        self.proc = proc
        self.open_device = open_device
        self.firmware_home = firmware_home
        self.get = get or firmware._get
        self.update = update
        self.clock = clock
        self.writable = writable
        self.controllers: list[Controller] = []
        self.chosen = ""                    # the node of the controller the window shows
        self.read_key = ""                  # the controller (its /sys device) whose reports were read
        self.info: FirmwareInfo | None = None
        self.read_problem = ""
        self.profiles: list[profiles.Profile] = []
        self.progress: updater.Progress | None = None
        self.updating = False
        self.update_target = 0              # the version the running or last update sends

        layout = QVBoxLayout(self)
        header = AppHeader(LOGO_PATH, APP_NAME, __version__)
        self.badge = StatusText("Looking for a controller")
        header.add_state(self.badge)
        self.update_button = accent_button("Update firmware…", "Sends the latest firmware to the controller.")
        self.update_button.clicked.connect(self.start_update)
        header.add_action(self.update_button)
        self.controller_box = MetricBox("Controller")
        self.connection_box = MetricBox("Connection")
        self.battery_box = MetricBox("Battery")
        self.firmware_box = MetricBox("Firmware")
        self.latest_box = MetricBox("Latest")
        boxes = [self.controller_box, self.connection_box, self.battery_box, self.firmware_box, self.latest_box]
        for box in boxes:
            header.add_second(box)
        same_width(boxes)
        self.controller_combo = QComboBox()
        self.controller_combo.setToolTip("More than one controller is connected: the one the window shows.")
        self.controller_combo.activated.connect(self.choose)
        header.add_second(self.controller_combo)
        header.add_second(QWidget(), 1)
        layout.addLayout(header)

        firmware_group = QGroupBox("Firmware")
        firmware_layout = QVBoxLayout(firmware_group)
        firmware_layout.addWidget(hint_label(
            "Sony offers controller updates in its PlayStation Accessories app for Windows and on the PS5. This app "
            "sends the same firmware, from Sony's own server, over a USB cable. The controller checks Sony's "
            "signature on the firmware before it takes it."))
        self.firmware_text = QLabel()
        self.firmware_text.setWordWrap(True)
        self.firmware_text.setTextFormat(Qt.TextFormat.RichText)
        self.firmware_text.setTextInteractionFlags(Qt.TextInteractionFlag.TextSelectableByMouse)
        firmware_layout.addWidget(self.firmware_text)
        buttons = QHBoxLayout()
        self.check_button = QPushButton("Check for an update")
        self.check_button.setToolTip(f"Asks {firmware.SOURCE} for the latest firmware of each controller.")
        self.check_button.clicked.connect(self.check_latest)
        self.file_button = QPushButton("Use a file…")
        self.file_button.setToolTip("Sends a firmware file you have (FWUPDATE<target>.bin), for example one saved "
                                    "from Sony's server before.")
        self.file_button.clicked.connect(self.use_file)
        self.check_at_start = QCheckBox("Check when the window opens")
        self.check_at_start.setChecked(self.settings.get("check_at_start"))
        self.check_at_start.toggled.connect(lambda on: self.settings.set("check_at_start", on))
        buttons.addWidget(self.check_button)
        buttons.addWidget(self.file_button)
        buttons.addSpacing(12)
        buttons.addWidget(self.check_at_start)
        buttons.addStretch(1)
        firmware_layout.addLayout(buttons)
        self.progress_bar = QProgressBar()
        self.progress_bar.setRange(0, 1000)
        self.progress_bar.setVisible(False)
        self.progress_text = QLabel()
        self.progress_text.setWordWrap(True)
        firmware_layout.addWidget(self.progress_bar)
        firmware_layout.addWidget(self.progress_text)
        layout.addWidget(firmware_group)

        profile_group = QGroupBox("Profiles")
        profile_layout = QVBoxLayout(profile_group)
        self.profile_text = hint_label("")
        profile_layout.addWidget(self.profile_text)
        self.profile_table = QTableWidget(0, len(PROFILE_COLUMNS))
        self.profile_table.setHorizontalHeaderLabels(PROFILE_COLUMNS)
        self.profile_table.verticalHeader().setVisible(False)
        self.profile_table.setEditTriggers(QAbstractItemView.EditTrigger.NoEditTriggers)
        self.profile_table.setSelectionMode(QAbstractItemView.SelectionMode.NoSelection)
        self.profile_table.horizontalHeader().setSectionResizeMode(QHeaderView.ResizeMode.ResizeToContents)
        self.profile_table.horizontalHeader().setStretchLastSection(True)
        profile_layout.addWidget(self.profile_table, 1)
        profile_buttons = QHBoxLayout()
        self.backup_button = QPushButton("Back up…")
        self.backup_button.setToolTip("Saves the profiles as the controller holds them, in a JSON file.")
        self.backup_button.clicked.connect(self.save_backup)
        self.reread_button = QPushButton("Read again")
        self.reread_button.setToolTip("Reads the firmware and the profiles from the controller again, for example "
                                      "after you changed them on a PS5.")
        self.reread_button.clicked.connect(self.read_again)
        profile_buttons.addWidget(self.backup_button)
        profile_buttons.addWidget(self.reread_button)
        profile_buttons.addStretch(1)
        profile_layout.addLayout(profile_buttons)
        layout.addWidget(profile_group, 1)

        self.check_job = UpdateChecker(self)
        self.check_job.finished.connect(self._check_done)
        self.update_job = UpdateChecker(self)
        self.update_job.finished.connect(self._update_done)

        self.timer = QTimer(self, interval=INTERVAL_MS)
        self.timer.timeout.connect(self.refresh)
        self.timer.start()
        if not restore_geometry(self, self.settings.qsettings):
            self.resize(940, 640)
        self.refresh()
        if self.settings.get("check_at_start") and self._check_is_old():
            self.check_latest()

    # ------------------------------------------------------------------ state
    def current(self) -> Controller | None:
        for found in self.controllers:
            if found.node == self.chosen:
                return found
        return self.controllers[0] if self.controllers else None

    def latest(self) -> int | None:
        return self.settings.latest().get(self.info.target) if self.info else None

    def refresh(self) -> None:
        self.controllers = controller.find(self.sys_root)
        found = self.current()
        self.chosen = found.node if found else ""
        key = str(found.sys_path.resolve()) if found else ""
        if key != self.read_key and not self.updating:
            self.read_key = key
            self._read(found)
        self.show_state()

    def choose(self, _index: int) -> None:
        self.chosen = self.controller_combo.currentData() or ""
        self.refresh()

    def read_again(self) -> None:
        self.read_key = ""
        self.refresh()

    def _read(self, found: Controller | None) -> None:
        """The firmware report and the profiles, once per controller: they do not change while it is connected."""
        self.info, self.profiles, self.read_problem = None, [], ""
        if found is None:
            return
        if not self.writable(found.path(self.dev)):
            self.read_problem = (f"Your user may not use {found.path(self.dev)}. Bazzite gives it to the user at the "
                                 "board; on another system, a udev rule with TAG+=\"uaccess\" for the controller "
                                 "does it.")
            return
        try:
            with self.open_device(found.path(self.dev), found.sizes()) as device:
                self.info = controller.read_info(device)
                if found.edge:
                    self.profiles = profiles.read(device)
        except (OSError, ValueError) as exc:
            self.read_problem = f"The controller could not be read: {_error(exc)}."

    def show_state(self) -> None:
        found = self.current()
        latest = self.latest()
        self.controller_combo.setVisible(len(self.controllers) > 1)
        self.controller_combo.blockSignals(True)
        self.controller_combo.clear()
        for each in self.controllers:
            self.controller_combo.addItem(f"{each.name}, {each.connection}", each.node)
        self.controller_combo.setCurrentIndex(max(0, self.controller_combo.findData(self.chosen)))
        self.controller_combo.blockSignals(False)

        if self.updating:
            state = ("Updating the firmware", "info", "Leave the controller plugged in until the update is done.")
        elif found is None:
            state = ("No controller", "neutral", controller.NOT_FOUND)
        elif self.read_problem:
            state = ("Cannot be read", "warn", self.read_problem)
        elif self.info is not None and latest is not None and latest > self.info.update:
            state = ("Update available", "warn", f"Firmware {firmware.version_text(latest)} is out; the controller "
                                                 f"runs {firmware.version_text(self.info.update)}.")
        elif self.info is not None and latest is not None:
            state = ("Up to date", "ok", "The controller runs the latest firmware Sony offers.")
        else:
            state = ("Ready", "ok", "Check for an update asks Sony's server for the latest firmware.")
        self.badge.set_status(*state)

        self.controller_box.set_value(found.name if found else "—")
        self.connection_box.set_value(found.connection if found else "—",
                                      "The firmware update needs the USB cable." if found and found.bus != "usb"
                                      else "")
        self._show_battery(found)
        self._show_firmware(found, latest)
        self._show_profiles(found)
        self.update_button.setEnabled(self._can_update(found, latest))
        self.check_button.setEnabled(not self.check_job.running)
        self.file_button.setEnabled(found is not None and self.info is not None and found.bus == "usb"
                                    and not self.updating)
        self._show_progress()

    def _show_battery(self, found: Controller | None) -> None:
        battery = found.battery if found else None
        if battery is None or battery.capacity is None:
            self.battery_box.set_value("—", "The controller reports no battery level." if found else "")
            self.battery_box.set_colour(GREY)
            return
        self.battery_box.set_value(f"{battery.capacity} %", f"{battery.status}. The controller reports its level in "
                                                            "steps of 10 %.")
        low = battery.capacity <= 20 and battery.status == "Discharging"
        self.battery_box.set_colour(STATE_COLORS["warn"] if low else GREY)

    def _show_firmware(self, found: Controller | None, latest: int | None) -> None:
        info = self.info
        if found is None or info is None:
            self.firmware_box.set_value("—")
            self.firmware_box.set_colour(GREY)
            self.latest_box.set_value("—", self._checked_text())
            self.latest_box.set_colour(GREY)
            self.firmware_text.setText(html.escape(self.read_problem) if found else
                                       html.escape(f"No controller found. {controller.NOT_FOUND}"))
            return
        self.firmware_box.set_value(firmware.version_text(info.update), f"Built {info.build_date} {info.build_time}")
        newer = latest is not None and latest > info.update
        self.firmware_box.set_colour(STATE_COLORS["warn"] if newer else STATE_COLORS["ok"] if latest else GREY)
        self.latest_box.set_value(firmware.version_text(latest) if latest is not None else "—", self._checked_text())
        self.latest_box.set_colour(STATE_COLORS["warn"] if newer else GREY)
        lines = [f"{html.escape(found.name)}: firmware {firmware.version_text(info.update)}, built "
                 f"{html.escape(info.build_date)} {html.escape(info.build_time)} (target {info.target:04X}, "
                 f"hardware 0x{info.hardware:08x}, firmware 0x{info.firmware:08x})."]
        if latest is None:
            lines.append("The latest version is not known yet: Check for an update asks Sony's server.")
        elif newer:
            stored = firmware.read(info.target, latest, self.firmware_home) is not None
            lines.append(f"Sony offers {firmware.version_text(latest)}. "
                         + ("It is downloaded already." if stored else
                            "Update firmware downloads it (about 1 MB) and sends it."))
        else:
            lines.append(f"It is the latest Sony offers ({self._checked_text().lower()}).")
        if found.bus != "usb":
            lines.append("The update needs the USB cable: connect the controller with it.")
        self.firmware_text.setText("<br>".join(lines))

    def _checked_text(self) -> str:
        checked = self.settings.get("checked")
        return f"Checked {checked}" if checked else "Not checked yet"

    def _check_is_old(self) -> bool:
        checked = self.settings.get("checked")
        try:
            return self.clock() - time.mktime(time.strptime(checked, "%Y-%m-%d %H:%M")) > CHECK_AGE_S
        except ValueError:
            return True

    def _show_profiles(self, found: Controller | None) -> None:
        edge = found is not None and found.edge
        if found is None:
            self.profile_text.setText("The DualSense Edge's profiles show here.")
        elif not edge:
            self.profile_text.setText(f"The {found.name} has no profiles: only the DualSense Edge has them.")
        else:
            self.profile_text.setText("The four profiles stored in the controller, as it reports them; Fn and the "
                                      "button chooses one. Change them on a PS5 or in Sony's app for Windows.")
        shown = self.profiles if edge else []
        if self.profile_table.rowCount() != len(shown) or any(
                self.profile_table.item(row, 0).data(Qt.ItemDataRole.UserRole) != profile.reports
                for row, profile in enumerate(shown)):
            self._fill_profiles(shown)
        self.backup_button.setEnabled(bool(shown) and not self.updating)
        self.reread_button.setEnabled(found is not None and not self.updating)

    def _fill_profiles(self, shown: list[profiles.Profile]) -> None:
        self.profile_table.setRowCount(len(shown))
        for row, profile in enumerate(shown):
            if profile.empty:
                cells = [profile.label, "Empty", "", "", "", "", ""]
            else:
                l_start, l_end, r_start, r_end = profile.triggers
                remapped = ", ".join(f"{source} → {target}" for source, target in profile.remapped)
                cells = [profile.label, profile.name + ("" if profile.crc_ok else " (checksum does not match)"),
                         profile.left_curve, profile.right_curve, profiles.trigger_text(l_start, l_end),
                         profiles.trigger_text(r_start, r_end), remapped or "Each its own"]
            for column, text in enumerate(cells):
                item = QTableWidgetItem(text)
                if column == 0:
                    item.setData(Qt.ItemDataRole.UserRole, profile.reports)
                self.profile_table.setItem(row, column, item)

    # ---------------------------------------------------------------- latest
    def check_latest(self) -> None:
        if self.check_job.start(_job(firmware.latest, self.get)):
            self.check_button.setEnabled(False)

    def _check_done(self, result) -> None:
        if isinstance(result, Exception):
            self.latest_box.set_value("—", _error(result))
            self.progress_text.setText(_error(result))
        else:
            self.settings.set_latest(result, time.strftime("%Y-%m-%d %H:%M", time.localtime(self.clock())))
        self.show_state()

    # ---------------------------------------------------------------- update
    def _can_update(self, found: Controller | None, latest: int | None) -> bool:
        return (found is not None and found.bus == "usb" and self.info is not None and latest is not None
                and latest > self.info.update and not self.updating)

    def start_update(self) -> None:
        found, latest = self.current(), self.latest()
        if not self._can_update(found, latest):
            return
        data = firmware.read(self.info.target, latest, self.firmware_home)
        self._confirm_and_run(found, data, latest)

    def use_file(self) -> None:
        path, _ = QFileDialog.getOpenFileName(self, window_title("Use a firmware file"), str(Path.home()),
                                              "Firmware (*.bin);;All files (*)")
        if path:
            self.use_path(Path(path))

    def use_path(self, path: Path) -> None:
        found = self.current()
        if found is None or self.info is None:
            return
        try:
            data = path.read_bytes()
        except OSError as exc:
            QMessageBox.warning(self, window_title("Use a firmware file"), f"{path} could not be read: {_error(exc)}.")
            return
        problem = firmware.problem(data, found, self.info)
        if problem:
            QMessageBox.warning(self, window_title("Use a firmware file"), f"{path.name} was not sent: {problem}")
            return
        self._confirm_and_run(found, data, firmware.header(data).update)

    def _confirm_and_run(self, found: Controller, data: bytes | None, version: int) -> None:
        busy = controller.holders(found.path(self.dev), self.proc)
        if busy:
            QMessageBox.warning(self, window_title("Update the firmware"),
                                f"{', '.join(busy)} has the controller open. Quit it first (Steam: Steam › Exit), "
                                "so that nothing else talks to the controller during the update.")
            return
        if data is not None:
            check = (f"SHA-256 {firmware.sha256(data)}: "
                     + ("a file the app knows from Sony's server." if firmware.known(data) else
                        "not a file the app knows. The controller still checks Sony's signature."))
        else:
            check = f"The app first downloads it from {firmware.SOURCE} (about 1 MB)."
        battery = found.battery
        level = f" The battery is at {battery.capacity} %." if battery and battery.capacity is not None else ""
        answer = QMessageBox.question(
            self, window_title("Update the firmware"),
            f"This sends firmware {firmware.version_text(version)} to the {found.name}, which runs "
            f"{firmware.version_text(self.info.update)}. {check}\n\n"
            "It takes about half a minute. Leave the USB cable in and the board on until the window says it is done; "
            f"the controller then restarts by itself.{level} The app saves a backup of the profiles first.\n\n"
            "Update the controller now?")
        if answer != QMessageBox.StandardButton.Yes:
            return
        self._run(found, data, version)

    def _run(self, found: Controller, data: bytes | None, version: int) -> None:
        info, home, get, update = self.info, self.firmware_home, self.get, self.update
        path, sizes = found.path(self.dev), found.sizes()
        open_device = self.open_device
        edge, model = found.edge, found.name
        progress = updater.Progress()

        def job() -> str:
            """The update; the backup of the profiles it made first, or "" (a DualSense has none)."""
            saved = ""
            image = data
            if image is None:
                progress.note("Downloading the firmware…")
                image = firmware.download(info.target, version, home, get)
            problem = firmware.problem(image, found, info)
            if problem:
                raise firmware.FirmwareError(problem)
            with open_device(path, sizes) as device:
                if edge:
                    saved = str(profiles.backup(profiles.read(device), profiles.backup_path(home), model,
                                                firmware.version_text(info.update)))
                    progress.note(f"The profiles are saved in {saved}.")
                update(device, image, progress)
            return saved

        self.progress, self.updating, self.update_target = progress, True, version
        self.update_job.start(_job(job))
        self.show_state()

    def _show_progress(self) -> None:
        progress = self.progress
        self.progress_bar.setVisible(self.updating)
        if not self.updating or progress is None:
            return
        if progress.total:
            self.progress_bar.setValue(int(progress.done * 1000 / progress.total))
        step = updater.STEP_NAMES.get(progress.step, "")
        detail = (f"{progress.done // 1024} of {progress.total // 1024} KB" if progress.step == updater.WRITE and
                  progress.total else "")
        last = progress.log[-1] if progress.log else ""
        self.progress_text.setText(" · ".join(part for part in (step, detail, last) if part))

    def _update_done(self, result) -> None:
        self.updating = False
        self.progress_bar.setVisible(False)
        if isinstance(result, Exception):
            text = _error(result)
            self.progress_text.setText(f"The update did not finish: {text}")
            QMessageBox.warning(self, window_title("Update the firmware"), f"The update did not finish. {text}")
        else:
            saved = f" The profiles from before are saved in {result}." if result else ""
            self.progress_text.setText(f"Firmware {firmware.version_text(self.update_target)} is sent: the controller "
                                       "restarts with it and comes back in a few seconds, and the header then shows "
                                       f"its new version.{saved}")
        self.read_key = ""                  # read the firmware again when the controller is back
        self.refresh()

    # ---------------------------------------------------------------- backup
    def save_backup(self) -> None:
        found = self.current()
        if found is None or not self.profiles:
            return
        start = profiles.backup_path(self.firmware_home)
        start.parent.mkdir(parents=True, exist_ok=True)
        path, _ = QFileDialog.getSaveFileName(self, window_title("Back up the profiles"), str(start),
                                              "Profiles (*.json)")
        if not path:
            return
        try:
            profiles.backup(self.profiles, Path(path), found.name,
                            firmware.version_text(self.info.update) if self.info else "")
        except OSError as exc:
            QMessageBox.warning(self, window_title("Back up the profiles"), f"{path} could not be written: "
                                f"{_error(exc)}.")

    # ------------------------------------------------------------------- quit
    def shut_down(self) -> None:
        self.timer.stop()
        self.check_job.stop(1000)
        self.update_job.stop(600000)        # an update must not be cut off: wait for it

    def closeEvent(self, event) -> None:  # noqa: N802 (Qt override)
        if self.updating:
            QMessageBox.information(self, window_title("Update the firmware"),
                                    "The update is still running. The window closes when it is done.")
            event.ignore()
            return
        save_geometry(self, self.settings.qsettings)
        super().closeEvent(event)
