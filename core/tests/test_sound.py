# SPDX-License-Identifier: GPL-3.0-or-later
"""The volume the desktop remembers per application (sound.py): WirePlumber's stream-properties as the owner's
board writes it (24-10-2026), and the words a manager shows for it."""

from __future__ import annotations

from bc250_core import sound


def test_the_volume_bazzite_remembers(tmp_path):
    """A line per stream, the volume and mute as JSON; a space in an application's name is a backslash and an s."""
    state = tmp_path / "stream-properties"
    assert sound.stream_sound("RPCS3", state) is None
    state.write_text('[stream-properties]\n'
                     'Output/Audio:media.role:Notification={"volume":1.000000, "channelVolumes":[1.0, 1.0], "mute":false}\n'
                     'Output/Audio:application.name:Google\\sChrome={"volume":1.000000, "mute":false}\n'
                     'Output/Audio:application.name:shadPS4={"volume":1.000000, "channelMap":["FL", "FR"], "mute":true}\n'
                     'Output/Audio:application.name:RPCS3={"volume":0.700000, "mute":false, "channelVolumes":[0.7, 0.7]}\n'
                     'Input/Audio:application.name:RPCS3={"volume":1.000000, "mute":true}\n'
                     'Output/Audio:application.name:Broken=not json\n')
    assert sound.stream_sound("RPCS3", state) == (0.7, False)
    assert sound.stream_sound("shadPS4", state) == (1.0, True)
    assert sound.stream_sound("Google Chrome", state) == (1.0, False)
    assert sound.stream_sound("PCSX2", state) is None and sound.stream_sound("Broken", state) is None
    assert sound.stream_properties().name == "stream-properties" and sound.stream_properties().parent.name == "wireplumber"


def test_the_state_home(monkeypatch, tmp_path):
    monkeypatch.setenv("XDG_STATE_HOME", str(tmp_path))
    assert sound.stream_properties() == tmp_path / "wireplumber" / "stream-properties"
    monkeypatch.delenv("XDG_STATE_HOME")
    assert sound.state_home().name == "state"


def test_the_words():
    assert sound.describe("PCSX2", None) == ("— (PCSX2 has not played yet)", "")
    assert sound.describe("PCSX2", (0.7, False)) == ("70 %", "")
    assert sound.describe("PCSX2", (1.0, True)) == ("Muted", sound.muted_text("PCSX2"))
    assert sound.describe("PCSX2", (0.0, False)) == ("0 %", sound.down_text("PCSX2"))
    assert "unmute PCSX2 in the sound applet" in sound.muted_text("PCSX2")
    assert "turn PCSX2 up" in sound.down_text("PCSX2") and "PCSX2's own volume" in sound.tip("PCSX2")
