# SPDX-License-Identifier: GPL-3.0-or-later
"""The preview says when the camera sends no picture: Qt reports no error when the stream cannot start."""

from __future__ import annotations

from usb_hdcam import preview


def test_no_picture_is_reported(qapp, monkeypatch):
    shown = preview.Preview()
    failures = []
    shown.failed.connect(failures.append)
    monkeypatch.setattr(preview, "_device", lambda node: None)
    assert not shown.start("/dev/video9", None) and "does not list" in failures[0]
    shown.camera = object.__new__(type("Camera", (), {"stop": lambda self: None, "deleteLater": lambda self: None}))
    shown.watchdog.start()
    shown._no_picture()
    assert failures[-1] == preview.NO_PICTURE and not shown.running and not shown.watchdog.isActive()
