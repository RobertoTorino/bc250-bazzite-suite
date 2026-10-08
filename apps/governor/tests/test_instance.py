# SPDX-License-Identifier: GPL-3.0-or-later
"""Single-instance socket: forwarding to a listener, and nobody-there detection."""

from __future__ import annotations

import os

from PyQt6.QtCore import QCoreApplication

from bc250_governor import instance


def _pump(ms: int = 50) -> None:
    import time
    end = time.monotonic() + ms / 1000
    while time.monotonic() < end:
        QCoreApplication.processEvents()


def test_forward_without_listener(qapp):
    assert not instance.forward("show", name=f"bc250-test-nobody-{os.getpid()}")

def test_forward_reaches_listener(qapp):
    name = f"bc250-test-{os.getpid()}"
    server = instance.InstanceServer(name=name)
    assert server.listen()
    got = []
    server.received.connect(got.append)
    assert instance.forward(instance.SHOW, name=name)
    assert instance.forward(instance.PROFILE + "Quiet night", name=name)

    # Wait up to 10 seconds for both messages
    import time
    start = time.monotonic()
    while time.monotonic() - start < 10:
        _pump(ms=100)
        if len(got) == 2:
            break

    assert got == ["show", "profile Quiet night"]
    server.close()
    assert not instance.forward("show", name=name)


def test_listen_recovers_stale_socket(qapp):
    name = f"bc250-test-stale-{os.getpid()}"
    first = instance.InstanceServer(name=name)
    assert first.listen()
    # Simulate a crash: the server object goes away without close(), the socket file stays behind.
    first._server.newConnection.disconnect()
    second = instance.InstanceServer(name=name)
    assert second.listen()
    second.close()
    first.close()
