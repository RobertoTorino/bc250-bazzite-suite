# SPDX-License-Identifier: GPL-3.0-or-later
"""The volume the desktop remembers per application (sound.py): WirePlumber's stream-properties as the owner's
board writes it (24-10-2026), the words a manager shows for it, and Unmute."""

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
    assert "Unmute beside it in the Settings tab" in sound.muted_text("PCSX2")
    assert "turn PCSX2 up" in sound.down_text("PCSX2") and "PCSX2's own volume" in sound.tip("PCSX2")


class FakePulse:
    """pactl and paplay as PipeWire's PulseAudio interface answers them: the streams playing, a stream that comes
    when paplay starts (unless *comes* is False), and the mutes set, written to WirePlumber's file as it does."""

    def __init__(self, state, playing=(), comes=True, answer=0):
        self.state, self.comes, self.answer = state, comes, answer
        self.streams = [{"index": i, "properties": {"application.name": n}} for i, n in playing]
        self.calls, self.players = [], []

    def run(self, command, **kwargs):
        import json
        import subprocess
        self.calls.append(command[1:])
        if command[1:] == ["-f", "json", "list", "sink-inputs"]:
            return subprocess.CompletedProcess(command, 0, json.dumps(self.streams), "")
        if self.answer:
            return subprocess.CompletedProcess(command, self.answer, "", "Failure: No such entity")
        name = next(s["properties"]["application.name"] for s in self.streams if str(s["index"]) == command[2])
        self.state.write_text("[stream-properties]\nOutput/Audio:application.name:%s="
                              '{"volume":1.000000, "mute":%s}\n' % (name, "true" if command[3] == "1" else "false"))
        return subprocess.CompletedProcess(command, 0, "", "")

    def start(self, command, **kwargs):
        import wave
        self.players.append(command)
        with wave.open(command[2]) as silence:          # silence it is
            assert silence.readframes(10) == b"\0" * 40 and silence.getnframes() == 48000 * sound.SILENCE
        if self.comes:
            self.streams.append({"index": 99, "properties": {"application.name": command[1].split("=", 1)[1]}})

        class Player:
            def wait(self, timeout=None):
                return 0
        return Player()


def _muted(tmp_path, name="shadPS4"):
    state = tmp_path / "stream-properties"
    state.write_text('[stream-properties]\nOutput/Audio:application.name:%s={"volume":1.000000, "mute":true}\n' % name)
    return state


def test_unmute_without_a_stream_playing(tmp_path):
    """No stream of the emulator plays: a silent one is opened under its name (WirePlumber gives it the remembered
    mute), unmuted with pactl, and WirePlumber's stored value read back (the way proved on the board, 24-10-2026:
    2 s from muted to stored unmuted)."""
    state = _muted(tmp_path)
    pulse = FakePulse(state, playing=[(7, "Chromium")])
    assert sound.unmute("shadPS4", state, run=pulse.run, start=pulse.start, sleep=lambda s: None) == (1.0, False)
    assert [c[1] for c in pulse.players] == ["--client-name=shadPS4"]
    assert pulse.calls[-1] == ["set-sink-input-mute", "99", "0"]
    assert not any(c[:2] == ["set-sink-input-mute", "7"] for c in pulse.calls)          # another program's: not touched


def test_unmute_the_stream_that_plays(tmp_path):
    state = _muted(tmp_path, "RPCS3")
    pulse = FakePulse(state, playing=[(3, "RPCS3"), (4, "RPCS3")])
    assert sound.unmute("RPCS3", state, run=pulse.run, start=pulse.start, sleep=lambda s: None) == (1.0, False)
    assert pulse.players == [] and pulse.calls[1:] == [["set-sink-input-mute", "3", "0"],
                                                       ["set-sink-input-mute", "4", "0"]]


def test_unmute_says_what_went_wrong(tmp_path):
    import pytest
    state = _muted(tmp_path)
    with pytest.raises(sound.SoundError, match="No sound stream for shadPS4 came"):
        pulse = FakePulse(state, comes=False)
        sound.unmute("shadPS4", state, run=pulse.run, start=pulse.start, sleep=lambda s: None)
    with pytest.raises(sound.SoundError, match="pactl did not unmute shadPS4: Failure: No such entity"):
        pulse = FakePulse(state, playing=[(3, "shadPS4")], answer=1)
        sound.unmute("shadPS4", state, run=pulse.run, start=pulse.start, sleep=lambda s: None)

    def missing(command, **kwargs):
        raise FileNotFoundError(2, "No such file", command[0])
    with pytest.raises(sound.SoundError, match="pactl is not installed"):
        sound.unmute("shadPS4", state, run=missing, sleep=lambda s: None)
    assert sound.stream_sound("shadPS4", state) == (1.0, True)                          # still muted
