# SPDX-License-Identifier: GPL-3.0-or-later
"""Single instance: forwarding to a listener, nobody-there detection, and a second launch raising the window."""

from __future__ import annotations

import os
import time

from PyQt6.QtCore import QCoreApplication, QEvent, QObject
from PyQt6.QtWidgets import QWidget

from bc250_core import instance


def dispose(*objects: QObject) -> None:
    """Delete Qt objects now, not when Python collects them at exit (that order can crash the interpreter)."""
    for obj in objects:
        obj.deleteLater()
    QCoreApplication.sendPostedEvents(None, QEvent.Type.DeferredDelete.value)
    QCoreApplication.processEvents()


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
    dispose(server)


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
    dispose(window)                                            # the server is the window's child


def test_first_launch_takes_the_lock(qapp):
    app_id = f"bc250-test-lock-{os.getpid()}"
    name = instance.server_name(app_id)
    assert not instance.already_running(app_id)                # the first: it runs and holds the lock
    assert name in instance._locks and instance._locks[name].isLocked()
    instance._locks.pop(name).unlock()


def test_launch_during_startup_waits_instead_of_opening_a_second_window(qapp, monkeypatch):
    from PyQt6.QtCore import QLockFile
    app_id = f"bc250-test-starting-{os.getpid()}"
    name = instance.server_name(app_id)
    starting = QLockFile(instance.lock_path(name))             # another launch, still building its window
    starting.setStaleLockTime(0)
    assert starting.tryLock(0)
    monkeypatch.setattr(instance, "STARTUP_WAIT_S", 0.3)
    began = time.monotonic()
    assert instance.already_running(app_id)                    # no socket yet: waits, still no second window
    assert time.monotonic() - began >= 0.3
    server = instance.InstanceServer(None, name)               # its socket is up now
    assert server.listen()
    monkeypatch.setattr(instance, "STARTUP_WAIT_S", 5)
    began = time.monotonic()
    assert instance.already_running(app_id) and time.monotonic() - began < 2
    server.close()
    dispose(server)
    starting.unlock()
