# SPDX-License-Identifier: GPL-3.0-or-later
"""One running instance per user, reachable over a local socket.

A second launch does not start a second poller and tray icon: it hands its request to the running instance
(`forward`) and exits. Requests are one line each: `show` raises the window, `profile <name>` applies a saved
profile. This is what makes `bc250-governor-manager --profile <name>` usable as a desktop hotkey command.
"""

from __future__ import annotations

import os

from PyQt6.QtCore import QObject, pyqtSignal
from PyQt6.QtNetwork import QLocalServer, QLocalSocket

from . import APP_ID

SERVER_NAME = f"{APP_ID}-{os.getuid()}"
CONNECT_MS = 500
SHOW = "show"
PROFILE = "profile "


def forward(message: str, name: str = SERVER_NAME) -> bool:
    """Deliver `message` to a running instance; False when none is listening."""
    socket = QLocalSocket()
    socket.connectToServer(name)

    if not socket.waitForConnected(CONNECT_MS):
        return False

    payload = (message + "\n").encode("utf-8")

    if socket.write(payload) == -1:
        socket.abort()
        return False

    if not socket.waitForBytesWritten(CONNECT_MS):
        socket.abort()
        return False

    # Give the peer a chance to receive the complete request before
    # closing the connection.
    socket.disconnectFromServer()
    if socket.state() != QLocalSocket.LocalSocketState.UnconnectedState:
        socket.waitForDisconnected(CONNECT_MS)

    return True


class InstanceServer(QObject):
    received = pyqtSignal(str)

    def __init__(self, parent: QObject | None = None, name: str = SERVER_NAME):
        super().__init__(parent)
        self.name = name
        self._server = QLocalServer(self)
        self._sockets: set[QLocalSocket] = set()
        self._server.newConnection.connect(self._accept)

    def listen(self) -> bool:
        QLocalServer.removeServer(self.name)
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

            socket.readyRead.connect(
                lambda s=socket: self._read(s)
            )
            socket.disconnected.connect(
                lambda s=socket: self._remove_socket(s)
            )

            if socket.bytesAvailable():
                self._read(socket)

    def _remove_socket(self, socket: QLocalSocket) -> None:
        self._sockets.discard(socket)
        socket.deleteLater()

    def _read(self, socket: QLocalSocket) -> None:
        while socket.canReadLine():
            line = bytes(socket.readLine()).decode(
                "utf-8", errors="replace"
            ).strip()

            if line:
                self.received.emit(line)
