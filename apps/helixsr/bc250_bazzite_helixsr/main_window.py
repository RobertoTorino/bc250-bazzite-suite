# SPDX-License-Identifier: GPL-3.0-or-later
"""Main window: logo and metric boxes on top, navigation on the left, pages on the right. All file work
(backend.py) happens here, with confirmations and status-bar messages."""

from __future__ import annotations

import subprocess
from pathlib import Path

from PyQt6.QtCore import QSettings, Qt, QTimer
from PyQt6.QtGui import QCloseEvent
from PyQt6.QtWidgets import (
    QApplication, QFileDialog, QHBoxLayout, QLabel, QListWidget, QMainWindow, QMessageBox, QStackedWidget,
    QVBoxLayout, QWidget,
)

from . import APP_ID, APP_NAME, DEPLOYMENTS_FILE, DISPLAY_NAME, LOGO_PATH, PAYLOAD_DIR, __version__, plain_tooltip
from . import backend
from .acquire import (
    DLSS_DLL, HELIXSR_DATA_DIR, WORK_DIR, DlssFinder, SetupOutcome, SetupRequest, SetupWorker, UpdateChecker,
    UpdateStatus, latest_work_release, pinned_dlss_sha,
)
from .backend import MODE_FOLDER, MODE_REPLACE, Deployment, DeploymentStore, GameDll, HelixError
from .help import HelpPage
from .pages import POLL_MS, DeployPage, IniPage, OverviewPage
from .setup_page import SetupPage
from .widgets import ACCENT, BLUE, GREEN, GREY, ORANGE, PURPLE, RED, ClickableLogo, MetricBox, header_font


class MainWindow(QMainWindow):
    def __init__(self, payload_dir: Path = PAYLOAD_DIR, deployments_file: Path = DEPLOYMENTS_FILE,
                 work_dir: Path = WORK_DIR, helix_data: Path = HELIXSR_DATA_DIR, check_updates: bool | None = None):
        super().__init__()
        self.payload_dir = payload_dir
        self.work_dir = work_dir
        self.helix_data = helix_data
        self.store = DeploymentStore(deployments_file)
        self.settings = QSettings(APP_ID, APP_ID)
        self.libraries: list[Path] = []
        self.updates: dict[str, UpdateStatus] = {}
        self._setup_worker: SetupWorker | None = None
        self._dlss_finder: DlssFinder | None = None
        self.update_checker = UpdateChecker(self)
        self.update_checker.finished.connect(self._updates_checked)
        self.setWindowTitle(DISPLAY_NAME)
        self.resize(1080, 760)

        central = QWidget()
        root = QVBoxLayout(central)
        header = QHBoxLayout()
        header.setSpacing(14)
        logo = ClickableLogo(str(LOGO_PATH), 96)
        logo.setCursor(Qt.CursorShape.ArrowCursor)
        header.addWidget(logo)
        header_right = QVBoxLayout()
        header_right.setSpacing(6)
        title = QLabel(f"{APP_NAME}  <span style='color:#9aa0a6; font-size:14px;'>v{__version__}</span>")
        title.setStyleSheet(header_font() + "font-size:24px; font-weight:800; padding:0 2px;")
        header_right.addWidget(title)
        boxes = QHBoxLayout()
        boxes.setSpacing(8)
        self.box_payload = MetricBox(self.tr("HelixSR payload"), PURPLE, centred=True)
        self.box_network = MetricBox(self.tr("Network files"), GREY, centred=True)
        self.box_deployed = MetricBox(self.tr("Deployments"), BLUE, centred=True)
        self.box_games = MetricBox(self.tr("Steam games"), GREY, centred=True)
        for box in (self.box_payload, self.box_network, self.box_deployed, self.box_games):
            boxes.addWidget(box, 1)
        header_right.addLayout(boxes)
        header.addLayout(header_right, 1)
        root.addLayout(header)

        main = QHBoxLayout()
        self.nav = QListWidget()
        self.nav.setFixedWidth(200)
        self.nav.setStyleSheet(
            "QListWidget { outline:0; }"
            "QListWidget::item { padding:6px; margin:2px 4px; border:2px solid transparent; border-radius:6px; }"
            "QListWidget::item:hover { border-color:palette(mid); }"
            "QListWidget::item:selected { background:transparent; color:palette(text);"
            f" border-color:{ACCENT}; }}")
        self.stack = QStackedWidget()
        main.addWidget(self.nav)
        main.addWidget(self.stack, 1)
        root.addLayout(main, 1)
        self.setCentralWidget(central)

        self.overview = OverviewPage(payload_dir)
        self.overview.import_folder_requested.connect(self._import_folder)
        self.overview.import_zip_requested.connect(self._import_zip)
        self.overview.open_payload_requested.connect(lambda: self._open_folder(self.payload_dir))
        self.overview.open_folder_requested.connect(self._open_folder)
        self.overview.refresh_requested.connect(self.refresh)
        self.overview.remove_requested.connect(self._remove_deployment)
        self.overview.forget_requested.connect(self._forget)
        self.overview.setup_requested.connect(lambda: self.nav.setCurrentRow(1))
        self.setup_page = SetupPage()
        self.setup_page.check_requested.connect(self.check_for_updates)
        self.setup_page.start_requested.connect(self._start_setup)
        self.setup_page.cancel_requested.connect(self._cancel_setup)
        self.setup_page.browse_dlss_requested.connect(self._browse_dlss)
        self.setup_page.find_dlss_requested.connect(self._find_dlss)
        self.setup_page.open_work_requested.connect(lambda: self._open_folder(self.work_dir))
        self.setup_page.import_requested.connect(self._import)
        self.setup_page.auto_check_changed.connect(lambda on: self.settings.setValue("updates/check_on_start", on))
        self.deploy_page = DeployPage()
        self.deploy_page.browse_requested.connect(self._browse_game)
        self.deploy_page.browse_folder_requested.connect(self._browse_folder)
        self.deploy_page.scan_requested.connect(self._scan)
        self.deploy_page.deploy_requested.connect(self._deploy)
        self.deploy_page.remove_requested.connect(self._remove_from_deploy_page)
        self.deploy_page.copy_requested.connect(self._copy)
        self.ini_page = IniPage()
        self.ini_page.save_default_requested.connect(self._save_ini_default)
        self.ini_page.apply_requested.connect(self._write_ini_to)
        self.help_page = HelpPage(str(payload_dir), str(self.store.path), str(work_dir),
                                  self.settings.value("ui/language", "", str))
        self.help_page.language_changed.connect(lambda code: self.settings.setValue("ui/language", code))
        for name, page in ((self.tr("Overview"), self.overview), (self.tr("Setup"), self.setup_page),
                           (self.tr("Deploy"), self.deploy_page), (self.tr("helixsr.ini"), self.ini_page),
                           (self.tr("Help"), self.help_page)):
            self.nav.addItem(name)
            self.stack.addWidget(page)
        self.nav.currentRowChanged.connect(self.stack.setCurrentIndex)
        self.nav.currentRowChanged.connect(self._bold_nav_item)

        self.statusBar().showMessage(self.tr("Ready"))
        self._load_ini_page()
        self._scan_steam()
        self.refresh()
        self._restore_window_state()
        built = latest_work_release(self.work_dir)
        if built is not None and all((built / n).is_file() for n in (backend.WEIGHTS, backend.KERNELS)):
            self.setup_page.set_built(built)
        auto = self.settings.value("updates/check_on_start", True, type=bool) if check_updates is None else check_updates
        self.setup_page.set_auto_check(bool(auto))
        if auto:
            self.check_for_updates()
        self._timer = QTimer(self)
        self._timer.setInterval(POLL_MS)
        self._timer.timeout.connect(self.refresh)
        self._timer.start()

    # ------------------------------------------------------------ window state
    def _restore_window_state(self) -> None:
        geometry = self.settings.value("window/geometry")
        if geometry is not None:
            self.restoreGeometry(geometry)
        try:
            row = int(self.settings.value("window/page", 0))
        except (TypeError, ValueError):
            row = 0
        self.nav.setCurrentRow(row if 0 <= row < self.nav.count() else 0)
        last_game = self.settings.value("deploy/last_game", "")
        if last_game and Path(last_game).is_dir():
            self.deploy_page.set_game_path(Path(last_game))

    def _bold_nav_item(self, row: int) -> None:
        for index in range(self.nav.count()):
            item = self.nav.item(index)
            font = item.font()
            font.setBold(index == row)
            item.setFont(font)

    def closeEvent(self, event: QCloseEvent) -> None:
        if self._setup_worker is not None and self._setup_worker.isRunning():
            if QMessageBox.question(self, self.tr("Setup running"),
                                 self.tr("The HelixSR setup is still running. Cancel it and quit?")) \
                    != QMessageBox.StandardButton.Yes:
                event.ignore()
                return
            self._setup_worker.cancel()
            self._setup_worker.wait(15000)
        if self._dlss_finder is not None:
            self._dlss_finder.cancel()
            self._dlss_finder.wait(5000)
        self.update_checker.stop()
        self.settings.setValue("window/geometry", self.saveGeometry())
        self.settings.setValue("window/page", self.nav.currentRow())
        game = self.deploy_page.game_dir()
        self.settings.setValue("deploy/last_game", str(game) if game else "")
        super().closeEvent(event)

    # ------------------------------------------------------------ refresh
    def refresh(self) -> None:
        status = backend.payload_status(self.payload_dir)
        self.overview.show_payload(status)
        self.overview.show_deployments(self.store.items, self.payload_dir)
        self.deploy_page.set_payload_ready(status.ready)
        self.ini_page.set_deployments(self.store.items)

        self.box_payload.set_value(status.version or (self.tr("Imported") if status.dll else self.tr("Missing")),
                                   plain_tooltip(str(self.payload_dir)))
        self.box_payload.setStyleSheet(f"QFrame {{ background:{PURPLE if status.dll else RED}; border-radius:8px; }}"
                                       " QLabel { color:white; }")
        self.box_network.set_value(self.tr("Ready") if status.network_ready else self.tr("Missing"),
                                   self.tr("helixsr_weights.bin and helixsr_kernels.pak from helixsr-setup.sh"))
        self.box_network.setStyleSheet(f"QFrame {{ background:{GREEN if status.network_ready else ORANGE}; "
                                       "border-radius:8px; } QLabel { color:white; }")
        states = [backend.deployment_state(d, self.payload_dir)[0] for d in self.store.items]
        in_place = states.count("ok")
        self.box_deployed.set_value(f"{in_place} / {len(states)}" if states else "0",
                                    self.tr("HelixSR in place / known deployments"))
        self.box_games.set_value(str(len(self.deploy_page.games)),
                                 plain_tooltip("\n".join(str(p) for p in self.libraries) or self.tr("No Steam library found")))

    def _scan_steam(self) -> None:
        self.libraries = backend.steam_libraries()
        self.deploy_page.set_games(backend.steam_games(self.libraries))

    def _load_ini_page(self) -> None:
        template = backend.ini_template(self.payload_dir)
        self.ini_page.load(backend.parse_ini(template), template)

    # ------------------------------------------------------------ payload
    def _import_folder(self) -> None:
        start = self.settings.value("import/last_dir", str(Path.home() / "Downloads"))
        source = QFileDialog.getExistingDirectory(self, self.tr("Extracted HelixSR release folder"), start)
        if source:
            self._import(Path(source))

    def _import_zip(self) -> None:
        start = self.settings.value("import/last_dir", str(Path.home() / "Downloads"))
        source, _ = QFileDialog.getOpenFileName(self, self.tr("HelixSR release zip"), start, self.tr("Zip archives (*.zip)"))
        if source:
            self._import(Path(source))

    def _import(self, source: Path) -> None:
        self.settings.setValue("import/last_dir", str(source.parent if source.is_file() else source))
        try:
            result = backend.import_payload(source, self.payload_dir)
        except (HelixError, OSError) as exc:
            QMessageBox.critical(self, self.tr("Import failed"), str(exc))
            return
        self._load_ini_page()
        self.refresh()
        text = self.tr("Imported {0} file(s): {1}.").format(len(result.copied), ", ".join(result.copied))
        if result.missing:
            text += self.tr("\n\nStill missing: {0}. Run helixsr-setup.sh in the extracted "
                            "release folder, then import that folder.").format(", ".join(result.missing))
            QMessageBox.warning(self, self.tr("Payload incomplete"), text)
        else:
            self.statusBar().showMessage(text, 8000)

    def _save_ini_default(self, text: str) -> None:
        try:
            self.payload_dir.mkdir(parents=True, exist_ok=True)
            (self.payload_dir / backend.INI).write_text(text, encoding="utf-8")
        except OSError as exc:
            QMessageBox.critical(self, self.tr("Could not write"), str(exc))
            return
        self.ini_page.template = text
        self.refresh()
        self.statusBar().showMessage(self.tr("Saved {0}").format(self.payload_dir / backend.INI), 6000)

    # ------------------------------------------------------------ deploy page
    def _browse_game(self) -> None:
        start = self.deploy_page.game_path.text() or (str(self.libraries[0] / "common") if self.libraries
                                                      else str(Path.home()))
        path = QFileDialog.getExistingDirectory(self, self.tr("Game folder"), start)
        if path:
            self.deploy_page.set_game_path(Path(path))

    def _browse_folder(self) -> None:
        start = self.deploy_page.folder_path.text() or self.deploy_page.game_path.text() or str(Path.home())
        path = QFileDialog.getExistingDirectory(self, self.tr("Folder for HelixSR (OptiScaler)"), start)
        if path:
            self.deploy_page.set_folder_path(Path(path))

    def _scan(self, game_dir: Path) -> None:
        if not game_dir.is_dir():
            self.deploy_page.show_found([], game_dir, self.tr("{0} is not a folder.").format(game_dir))
            return
        QApplication.setOverrideCursor(Qt.CursorShape.WaitCursor)
        try:
            found = backend.find_game_dlls(game_dir, self.payload_dir)
        except OSError as exc:
            found = []
            self.deploy_page.show_found([], game_dir, self.tr("Could not scan {0}: {1}").format(game_dir, exc))
            return
        finally:
            QApplication.restoreOverrideCursor()
        self.deploy_page.show_found(found, game_dir)

    def _game_name(self, path: Path) -> str:
        return backend.game_name(path, self.libraries)

    def _deploy(self, info: GameDll | None, mode: str, folder: Path | None, write_ini: bool) -> None:
        if write_ini and not self.ini_page.valid():
            QMessageBox.warning(self, self.tr("helixsr.ini"), self.tr("The helixsr.ini page has invalid values; fix them or untick "
                                "writing the ini."))
            return
        ini_text = self.ini_page.text() if write_ini else None
        version = backend.payload_status(self.payload_dir).version
        try:
            if mode == MODE_REPLACE:
                if info is None:
                    return
                if not info.deployed and QMessageBox.question(
                        self, self.tr("Deploy HelixSR"),
                        self.tr("Rename\n{path}\nto {original} and put HelixSR in its place?").format(
                            path=info.path, original=info.original.name)) \
                        != QMessageBox.StandardButton.Yes:
                    return
                written = backend.deploy(info.path, self.payload_dir, ini_text)
                location = info.path
            else:
                if folder is None:
                    return
                written = backend.deploy_folder(folder, self.payload_dir, ini_text)
                location = folder
        except (HelixError, OSError) as exc:
            QMessageBox.critical(self, self.tr("Deploy failed"), str(exc))
            return
        game_dir = self.deploy_page.game_dir()
        self.store.record(location, mode, self._game_name(game_dir or location), version)
        self.refresh()
        if game_dir:
            self._scan(game_dir)
        self.statusBar().showMessage(self.tr("HelixSR deployed: {0} file(s) written to {1}").format(
            len(written), location.parent if mode == MODE_REPLACE else location), 8000)
        if mode == MODE_FOLDER:
            QMessageBox.information(self, self.tr("HelixSR folder ready"),
                                    self.tr("HelixSR is in\n{folder}\n\nNow point OptiScaler at it: the OptiScaler.ini lines "
                                            "on the Deploy page (Copy button) go into the game's OptiScaler.ini.").format(
                                                folder=folder))

    def _remove_from_deploy_page(self, info: GameDll | None, mode: str, folder: Path | None) -> None:
        if mode == MODE_REPLACE and info is not None:
            self._remove(info.path, MODE_REPLACE)
        elif mode == MODE_FOLDER and folder is not None:
            self._remove(folder, MODE_FOLDER)

    def _remove_deployment(self, dep: Deployment) -> None:
        self._remove(dep.location, dep.mode)

    def _remove(self, location: Path, mode: str) -> None:
        what = (self.tr("Delete HelixSR's files next to\n{0}\nand rename the game's .original.dll back?").format(location)
                if mode == MODE_REPLACE else self.tr("Delete HelixSR's files in\n{0}?").format(location))
        if QMessageBox.question(self, self.tr("Remove HelixSR"), what) != QMessageBox.StandardButton.Yes:
            return
        try:
            removed = (backend.remove(location, self.payload_dir) if mode == MODE_REPLACE
                       else backend.remove_folder(location, self.payload_dir))
        except (HelixError, OSError) as exc:
            QMessageBox.critical(self, self.tr("Remove failed"), str(exc))
            return
        self.store.forget(location)
        self.refresh()
        game_dir = self.deploy_page.game_dir()
        if game_dir:
            self._scan(game_dir)
        self.statusBar().showMessage(self.tr("Removed {0} file(s); HelixSR is gone from {1}").format(
            len(removed), location.parent if mode == MODE_REPLACE else location), 8000)

    def _forget(self, dep: Deployment) -> None:
        self.store.forget(dep.location)
        self.refresh()

    def _write_ini_to(self, dep: Deployment, text: str) -> None:
        target = dep.folder / backend.INI
        if not dep.folder.is_dir():
            QMessageBox.warning(self, self.tr("Folder gone"), self.tr("{0} does not exist any more.").format(dep.folder))
            return
        try:
            target.write_text(text, encoding="utf-8")
        except OSError as exc:
            QMessageBox.critical(self, self.tr("Could not write"), str(exc))
            return
        self.refresh()
        self.statusBar().showMessage(self.tr("Wrote {0}").format(target), 6000)

    # ------------------------------------------------------------ updates
    def check_for_updates(self) -> None:
        if self.update_checker.start(backend.payload_status(self.payload_dir).version):
            self.setup_page.set_checking(True)

    def _updates_checked(self, statuses: dict) -> None:
        self.updates = statuses
        self.setup_page.set_checking(False)
        self.setup_page.show_updates(statuses)
        helix = statuses.get("helixsr")
        if helix is None:
            return
        if helix.latest.error:
            self.overview.show_update("", "neutral")
            self.statusBar().showMessage(self.tr("Update check: {0}").format(helix.latest.error), 8000)
        elif helix.update_available:
            self.overview.show_update(self.tr("HelixSR {version} is out ({published}); the payload "
                                          "has {installed}. Get HelixSR… updates it.").format(
                                              version=helix.latest.version, published=helix.latest.published,
                                              installed=helix.installed), "warn")
        elif not helix.installed and helix.latest.version:
            self.overview.show_update(self.tr("Latest HelixSR release: {version} ({published}).").format(
                version=helix.latest.version, published=helix.latest.published), "info")
        else:
            self.overview.show_update("", "ok")
        app = statuses.get("app")
        if app is not None and app.update_available:
            self.statusBar().showMessage(self.tr("{app} {version} is available: {url}").format(
                app=APP_NAME, version=app.latest.version, url=app.latest.url), 15000)

    # ------------------------------------------------------------ setup (download + build)
    def _start_setup(self, dlss_file: Path | None) -> None:
        if self._setup_worker is not None:
            return
        if dlss_file is not None and not dlss_file.is_file():
            QMessageBox.warning(self, DLSS_DLL, self.tr("{0} does not exist.").format(dlss_file))
            return
        helix = self.updates.get("helixsr")
        release = helix.latest if helix is not None and helix.latest.asset_url else None
        status = backend.payload_status(self.payload_dir)
        if status.ready and release is not None and not helix.update_available and QMessageBox.question(
                self, self.tr("Payload is current"),
                self.tr("The payload already has HelixSR {version} with its network files. "
                        "Download and build again anyway?").format(
                            version=status.version or self.tr("(unknown version)"))) != QMessageBox.StandardButton.Yes:
            self.setup_page.set_stage(self.tr("Nothing to do: the payload already has HelixSR {version} "
                                      "with its network files. Use Deploy to install it into a game.").format(
                                          version=status.version or ""))
            self.statusBar().showMessage(self.tr("Payload is already current."), 6000)
            return
        request = SetupRequest(release, self.work_dir, self.helix_data, dlss_file)
        worker = SetupWorker(request, self)
        worker.log.connect(self.setup_page.append)
        worker.stage.connect(self.setup_page.set_stage)
        worker.progress.connect(self.setup_page.set_progress)
        worker.finished_with.connect(self._setup_finished)
        self._setup_worker = worker
        self.setup_page.set_running(True)
        self.statusBar().showMessage(self.tr("HelixSR setup running…"))
        worker.start()

    def _cancel_setup(self) -> None:
        if self._setup_worker is not None:
            self._setup_worker.cancel()
            self.setup_page.set_stage(self.tr("Cancelling…"))

    def _setup_finished(self, outcome: SetupOutcome) -> None:
        worker, self._setup_worker = self._setup_worker, None
        if worker is not None:
            worker.wait()
            worker.deleteLater()
        self.setup_page.set_stage(outcome.message)
        self.setup_page.set_built(outcome.release_dir if outcome.ok else None)
        self.setup_page.set_running(False)
        if not outcome.ok:
            self.statusBar().showMessage(self.tr("HelixSR setup failed: {0}").format(outcome.message.splitlines()[0]),
                                         10000)
            if outcome.message != "Cancelled.":
                QMessageBox.critical(self, self.tr("HelixSR setup failed"), outcome.message)
            return
        self.statusBar().showMessage(self.tr("{message} ({seconds:.0f} s)").format(
            message=outcome.message, seconds=outcome.seconds), 10000)
        self._import(outcome.release_dir)
        self.check_for_updates()

    def _browse_dlss(self) -> None:
        start = self.setup_page.dlss_path.text() or (str(self.libraries[0] / "common") if self.libraries
                                                    else str(Path.home()))
        path, _ = QFileDialog.getOpenFileName(self, self.tr("NVIDIA {0} (310.7.0)").format(DLSS_DLL), start,
                                        f"{DLSS_DLL} ({DLSS_DLL})")
        if path:
            self.setup_page.dlss_path.setText(path)

    def _find_dlss(self) -> None:
        if self._dlss_finder is not None or not self.libraries:
            if not self.libraries:
                self.setup_page.append(self.tr("No Steam library found on this PC."))
            return
        self.setup_page.find_dlss.setEnabled(False)
        self.setup_page.append(self.tr("Looking for {dll} in {libraries} …").format(
            dll=DLSS_DLL, libraries=", ".join(str(p) for p in self.libraries)))
        finder = DlssFinder(self.libraries, pinned_dlss_sha(latest_work_release(self.work_dir)), self)
        finder.found.connect(self._dlss_found)
        self._dlss_finder = finder
        finder.start()

    def _dlss_found(self, paths: list) -> None:
        finder, self._dlss_finder = self._dlss_finder, None
        if finder is not None:
            finder.wait()
            finder.deleteLater()
        self.setup_page.set_dlss_candidates([Path(p) for p in paths])

    # ------------------------------------------------------------ misc
    def _copy(self, text: str) -> None:
        QApplication.clipboard().setText(text)
        self.statusBar().showMessage(self.tr("Copied to the clipboard"), 4000)

    def _open_folder(self, folder: Path) -> None:
        folder.mkdir(parents=True, exist_ok=True)
        try:
            subprocess.Popen(["xdg-open", str(folder)], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        except OSError as exc:
            QMessageBox.warning(self, self.tr("Could not open"), f"{folder}\n{exc}")
