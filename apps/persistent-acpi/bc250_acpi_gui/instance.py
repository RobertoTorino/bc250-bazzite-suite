# SPDX-License-Identifier: MIT
"""One running instance per app and user, reachable over a local socket (after the governor's instance.py).

A second launch does not open a second window: it asks the running instance to show its window and exits.

    if instance.already_running(APP_ID):
        return 0
    window = MainWindow()
    window.show()
    server = instance.serve(APP_ID, window)     # keep the reference while the app runs

On Wayland a window may only take the focus with an activation token; a launch from the menu or the Desktop gets
one (XDG_ACTIVATION_TOKEN), and the second launch hands it to the running instance, which Qt then uses.
The apps that are not on bc250_core yet carry a copy of this file; tools/tests checks that the copies match."""

from __future__ import annotations

import os

from PyQt6.QtCore import QObject, pyqtSignal
from PyQt6.QtNetwork import QLocalServer, QLocalSocket
from PyQt6.QtWidgets import QWidget

CONNECT_MS = 500
SHOW = "show"


def server_name(app_id: str) -> str:
    user = os.getuid() if hasattr(os, "getuid") else os.environ.get("USERNAME", "user")
    return f"{app_id}-{user}"


def forward(message: str, name: str) -> bool:
    """Deliver *message* to a running instance; False when none is listening."""
    socket = QLocalSocket()
    socket.connectToServer(name)
    if not socket.waitForConnected(CONNECT_MS):
        return False
    if socket.write((message + "\n").encode("utf-8")) == -1 or not socket.waitForBytesWritten(CONNECT_MS):
        socket.abort()
        return False
    # Give the peer a chance to receive the complete request before closing the connection.
    socket.disconnectFromServer()
    if socket.state() != QLocalSocket.LocalSocketState.UnconnectedState:
        socket.waitForDisconnected(CONNECT_MS)
    return True


class InstanceServer(QObject):
    received = pyqtSignal(str)

    def __init__(self, parent: QObject | None, name: str):
        super().__init__(parent)
        self.name = name
        self._server = QLocalServer(self)
        self._sockets: set[QLocalSocket] = set()
        self._server.newConnection.connect(self._accept)

    def listen(self) -> bool:
        QLocalServer.removeServer(self.name)        # a socket file left behind by a crashed instance
        return self._server.listen(self.name)

    def close(self) -> None:
        self._server.close()
        for socket in list(self._sockets):
            socket.disconnectFromServer()
            socket.deleteLater()
        self._sockets.clear()

    def _accept(self) -> None:
        while self._server.hasPendingConnections():
            socket = self._server.nextPendingConnection()
            self._sockets.add(socket)
            socket.readyRead.connect(lambda s=socket: self._read(s))
            socket.disconnected.connect(lambda s=socket: self._remove_socket(s))
            if socket.bytesAvailable():
                self._read(socket)

    def _remove_socket(self, socket: QLocalSocket) -> None:
        self._sockets.discard(socket)
        socket.deleteLater()

    def _read(self, socket: QLocalSocket) -> None:
        while socket.canReadLine():
            line = bytes(socket.readLine()).decode("utf-8", errors="replace").strip()
            if line:
                self.received.emit(line)


def raise_window(window: QWidget) -> None:
    if window.isMinimized():
        window.showNormal()
    window.show()
    window.raise_()
    window.activateWindow()


def already_running(app_id: str) -> bool:
    """True when this app already runs for this user; it has been asked to show its window."""
    token = os.environ.get("XDG_ACTIVATION_TOKEN", "")
    return forward(f"{SHOW} {token}".strip(), server_name(app_id))


def serve(app_id: str, window: QWidget) -> InstanceServer:
    """Listen for later launches of *app_id*; each one brings *window* to the front."""
    server = InstanceServer(window, server_name(app_id))

    def on_message(message: str) -> None:
        command, _, token = message.partition(" ")
        if command == SHOW:
            if token:
                os.environ["XDG_ACTIVATION_TOKEN"] = token      # Qt's Wayland plugin activates with it
            raise_window(window)

    server.received.connect(on_message)
    server.listen()
    return server
