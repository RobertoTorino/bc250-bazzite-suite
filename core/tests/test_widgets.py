# SPDX-License-Identifier: GPL-3.0-or-later
from __future__ import annotations

from PyQt6 import sip
from PyQt6.QtCore import QPoint
from PyQt6.QtWidgets import QPushButton, QTableWidget, QTableWidgetItem, QWidget

from bc250_core import theme
from bc250_core.widgets import (
    MetricBox, RoundedToolTip, StatusPill, Terminal, TextDialog, accent_button, hide_tooltip, set_button_active,
    show_tooltip,
)


def test_status_pill_colours(qapp):
    pill = StatusPill()
    assert pill.text() == "Unknown"
    assert theme.GREY in pill.styleSheet()
    pill.set_status("Active", "ok", "tip")
    assert (pill.text(), pill.toolTip()) == ("Active", "tip")
    assert theme.GREEN in pill.styleSheet()
    pill.set_status("?", "no-such-kind")
    assert theme.GREY in pill.styleSheet()


def test_metric_box(qapp):
    box = MetricBox("GPU clock", theme.PURPLE)
    box.set_value("1800 MHz", "now")
    assert (box.value.text(), box.caption.text(), box.toolTip()) == ("1800 MHz", "GPU clock", "now")


def test_set_button_active_keeps_height(qapp):
    button = QPushButton("Stress test")
    height = button.sizeHint().height()
    set_button_active(button, True)
    assert theme.ACTIVE_RED in button.styleSheet()
    assert button.height() == height and button.minimumHeight() == button.maximumHeight() == height
    set_button_active(button, False)
    assert button.styleSheet() == ""


def test_accent_button(qapp):
    assert theme.ACCENT in accent_button("Apply").styleSheet()


def test_terminal_follows_end_only_when_at_end(qapp):
    term = Terminal()
    term.resize(300, 100)
    term.show()
    term.set_text("\n".join(map(str, range(200))))
    bar = term.verticalScrollBar()
    bar.setValue(bar.maximum())
    term.set_text("\n".join(map(str, range(400))))
    assert bar.value() == bar.maximum()
    bar.setValue(0)
    term.set_text("\n".join(map(str, range(600))))
    assert bar.value() == 0


def test_text_dialog(qapp):
    dialog = TextDialog("journal", "line 1\nline 2")
    assert dialog.terminal.toPlainText() == "line 1\nline 2"
    assert dialog.terminal.isReadOnly()


def test_tooltip_follows_window_and_survives_its_deletion(qapp):
    tip = RoundedToolTip(qapp)
    first = QWidget()
    first.show()
    tip.show_text(QPoint(10, 10), "hello", first)
    assert tip.popup.parentWidget() is first.window()     # Wayland: parented to the hovered window
    assert tip.popup.isVisible() and tip.label.text() == "hello"
    tip.hide()
    assert not tip.popup.isVisible()
    first.deleteLater()
    qapp.processEvents()
    qapp.sendPostedEvents(None, 0)
    second = QWidget()
    second.show()
    tip.show_text(QPoint(10, 10), "again", second)        # rebuilt when it died with the first window
    assert not sip.isdeleted(tip.popup)
    assert tip.popup.parentWidget() is second
    tip.show_text(QPoint(10, 10), "", second)
    assert not tip.popup.isVisible()


def test_long_tooltip_wraps(qapp):
    tip = RoundedToolTip(qapp)
    owner = QWidget()
    owner.show()
    tip.show_text(QPoint(0, 0), "word " * 200, owner)
    assert tip.label.wordWrap() and tip.label.width() == RoundedToolTip.MAX_WIDTH


def test_item_view_tooltip_text(qapp):
    table = QTableWidget(1, 1)
    item = QTableWidgetItem("x")
    item.setToolTip("cell tip")
    table.setItem(0, 0, item)
    table.resize(200, 100)
    table.show()
    rect = table.visualItemRect(item)
    text, area = RoundedToolTip._text_at(table.viewport(), rect.center())
    assert text == "cell tip" and area == rect


def test_manual_tooltip_uses_installed_instance(qapp, monkeypatch):
    tip = RoundedToolTip(qapp)
    monkeypatch.setattr(RoundedToolTip, "_instance", tip)
    owner = QWidget()
    owner.show()
    show_tooltip(QPoint(5, 5), "chart value", owner)
    assert tip.popup.isVisible() and tip.label.text() == "chart value"
    hide_tooltip()
    assert not tip.popup.isVisible()
