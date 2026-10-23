# SPDX-License-Identifier: GPL-3.0-or-later
"""The camera's picture through Qt Multimedia (its FFmpeg backend reads the V4L2 node). While the preview runs, the
app holds the camera, and other apps cannot use it: it runs only when asked, and stops when the window closes."""

from __future__ import annotations

from PyQt6.QtCore import QObject, QTimer, pyqtSignal
from PyQt6.QtGui import QImage
from PyQt6.QtMultimedia import QCamera, QCameraDevice, QCameraFormat, QMediaCaptureSession, QMediaDevices, QVideoSink

from .modes import Mode

FIRST_FRAME_MS = 5000
# Qt reports no error when the stream cannot start: the first frame not coming is the sign (found on the owner's
# board, 23-10-2026: its USB controller refused the camera's video endpoint, ENOSPC on VIDIOC_STREAMON).
NO_PICTURE = ("The camera sent no picture. The mode may need more USB bandwidth than it has: try a smaller mode "
              "or a slower rate. With Full bandwidth, a USB controller that cannot give it refuses every mode (the "
              "kernel's log, journalctl -k, says \"Not enough bandwidth\"): choose Reduced and plug the camera in "
              "again.")


def _device(node: str) -> QCameraDevice | None:
    """The Qt camera of a /dev/video<n> node: Qt's id is the node's path on Linux."""
    for device in QMediaDevices.videoInputs():
        if bytes(device.id()).decode(errors="replace") == node:
            return device
    return None


def _mode(form: QCameraFormat) -> Mode:
    size = form.resolution()
    return Mode(size.width(), size.height(), round(form.maxFrameRate()), form.pixelFormat().name)


class Preview(QObject):
    frame = pyqtSignal(QImage)
    failed = pyqtSignal(str)

    def __init__(self, parent: QObject | None = None):
        super().__init__(parent)
        self.camera: QCamera | None = None
        self.session = QMediaCaptureSession(self)
        self.sink = QVideoSink(self)
        self.session.setVideoSink(self.sink)
        self.sink.videoFrameChanged.connect(self._frame)
        self.watchdog = QTimer(self, singleShot=True, interval=FIRST_FRAME_MS)
        self.watchdog.timeout.connect(self._no_picture)

    @property
    def running(self) -> bool:
        return self.camera is not None

    def modes(self, node: str) -> list[Mode]:
        device = _device(node)
        return [_mode(form) for form in device.videoFormats()] if device else []

    def start(self, node: str, mode: Mode | None) -> bool:
        self.stop()
        device = _device(node)
        if device is None:
            self.failed.emit(f"Qt does not list {node} as a camera yet. Try again in a moment.")
            return False
        self.camera = QCamera(device, self)
        for form in device.videoFormats():
            if mode is not None and _mode(form) == mode:
                self.camera.setCameraFormat(form)
                break
        self.camera.errorOccurred.connect(self._error)
        self.session.setCamera(self.camera)
        self.camera.start()
        self.watchdog.start()
        return True

    def stop(self) -> None:
        self.watchdog.stop()
        if self.camera is not None:
            camera, self.camera = self.camera, None
            camera.stop()
            self.session.setCamera(None)
            camera.deleteLater()

    def _frame(self, video_frame) -> None:
        image = video_frame.toImage()
        if not image.isNull():
            self.watchdog.stop()
            self.frame.emit(image)

    def _no_picture(self) -> None:
        self.stop()
        self.failed.emit(NO_PICTURE)

    def _error(self, _error, text: str) -> None:
        self.stop()
        self.failed.emit(text or "The camera stopped.")
