# SPDX-License-Identifier: AGPL-3.0-or-later
"""sound.py and sound_out.py: the buffer between the stream and the sound card (order, silence, dropping the oldest
when it piles up), the device the sink reads, and the player without an audio output (as on CI)."""

from __future__ import annotations

from PyQt6.QtCore import QIODevice
from PyQt6.QtMultimedia import QAudioDevice

from bc250_console_link import sound_out
from bc250_console_link.sound import SoundBuffer

TEN_MS = 480 * 4                        # 48 kHz stereo, 16 bits


def test_reads_in_order_and_whole_samples():
    buffer = SoundBuffer()
    buffer.push(bytes(range(8)))
    assert buffer.read(6) == bytes(range(4))                    # 6 rounds down to one stereo sample of 4 bytes
    assert buffer.read(100) == bytes(range(4, 8))
    assert buffer.buffered == 0


def test_empty_gives_silence_of_at_most_10_ms():
    buffer = SoundBuffer()
    assert buffer.read(100_000) == bytes(TEN_MS)
    assert buffer.read(8) == bytes(8) and buffer.silence_bytes == TEN_MS + 8


def test_piling_up_drops_the_oldest():
    buffer = SoundBuffer(max_ms=100, target_ms=40)
    for i in range(11):                                          # 110 ms: over the 100 ms
        buffer.push(bytes([i]) * TEN_MS)
    assert buffer.buffered == 4 * TEN_MS and buffer.dropped_bytes == 7 * TEN_MS
    assert buffer.read(TEN_MS) == bytes([7]) * TEN_MS            # the newest 40 ms are kept


def test_device_reads_the_buffer(qapp):
    buffer = SoundBuffer()
    device = sound_out.SoundDevice(buffer)
    assert device.open(QIODevice.OpenModeFlag.ReadOnly) and device.isSequential()
    buffer.push(b"\x01\x02\x03\x04")
    assert device.read(4) == b"\x01\x02\x03\x04"
    assert device.read(4) == bytes(4)                            # nothing left: silence


def test_player_without_an_audio_output(qapp, monkeypatch):
    monkeypatch.setattr(sound_out.QMediaDevices, "defaultAudioOutput", staticmethod(lambda: QAudioDevice()))
    player = sound_out.SoundPlayer()
    player.push(bytes(TEN_MS), 48000, 2)                         # the first push starts the sink (here: cannot)
    qapp.processEvents()
    assert player.error == "no audio output" and player.buffer is None
    player.push(bytes(TEN_MS), 48000, 2)                         # later sound is dropped, not queued
    player.stop()
