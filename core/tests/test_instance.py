# SPDX-License-Identifier: GPL-3.0-or-later
"""Single instance: forwarding to a listener, nobody-there detection, and a second launch raising the window."""

from __future__ import annotations

import os
import time

from PyQt6.QtCore import QCoreApplication
from PyQt6.QtWidgets import QWidget

from bc250_core import instance


def pump_until(predicate, seconds: float = 10) -> bool:
    end = time.monotonic() + seconds
    while time.monotonic() < end and not predicate():
        QCoreApplication.processEvents()
        time.sleep(0.01)
    return predicate()


def test_server_name_is_per_app_and_user():
    assert instance.server_name("bc250-x") != instance.server_name("bc250-y")
    assert instance.server_name("bc250-x").startswith("bc250-x-")


def test_nobody_running(qapp):
    assert not instance.already_running(f"bc250-test-nobody-{os.getpid()}")


def test_forward_reaches_listener(qapp):
    name = f"bc250-test-{os.getpid()}"
    server = instance.InstanceServer(None, name)
    assert server.listen()
    got = []
    server.received.connect(got.append)
    assert instance.forward("show", name) and instance.forward("show token-1", name)
    assert pump_until(lambda: len(got) == 2)
    assert got == ["show", "show token-1"]
    server.close()


def test_second_launch_raises_the_window(qapp, monkeypatch):
    app_id = f"bc250-test-app-{os.getpid()}"
    window = QWidget()
    raised = []
    monkeypatch.setattr(instance, "raise_window", raised.append)
    server = instance.serve(app_id, window)
    monkeypatch.setenv("XDG_ACTIVATION_TOKEN", "abc")
    assert instance.already_running(app_id)                    # what a second launch does
    assert pump_until(lambda: raised == [window])
    assert os.environ["XDG_ACTIVATION_TOKEN"] == "abc"         # handed on for Wayland's activation
    server.close()
    window.close()
