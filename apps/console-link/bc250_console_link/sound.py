# SPDX-License-Identifier: AGPL-3.0-or-later
"""The sound between the stream and the sound card, without Qt: the stream's thread pushes decoded PCM (16-bit,
interleaved, 10 ms per frame), the sound card's side reads it. Kept short on purpose: when more than max_ms piles up
(the card plays slower than the console sends, or the stream stalled and then caught up), the oldest is dropped
down to target_ms, so the sound stays with the picture instead of drifting behind it. Reading an empty buffer gives
silence, so the card keeps playing through a gap."""

from __future__ import annotations

import threading

MAX_MS = 100
TARGET_MS = 40


class SoundBuffer:
    def __init__(self, rate: int = 48000, channels: int = 2, max_ms: int = MAX_MS, target_ms: int = TARGET_MS):
        self.rate, self.channels = rate, channels
        self.frame_bytes = 2 * channels                     # one sample of every channel
        self.max_bytes = self._bytes(max_ms)
        self.target_bytes = self._bytes(target_ms)
        self._lock = threading.Lock()
        self._data = bytearray()
        self.dropped_bytes = 0
        self.silence_bytes = 0

    def _bytes(self, ms: int) -> int:
        return self.rate * ms // 1000 * self.frame_bytes

    def ms(self, size: int) -> float:
        return size / self.frame_bytes / self.rate * 1000

    @property
    def buffered(self) -> int:
        with self._lock:
            return len(self._data)

    def push(self, pcm: bytes) -> None:
        with self._lock:
            self._data += pcm
            if len(self._data) > self.max_bytes:
                drop = len(self._data) - self.target_bytes
                drop -= drop % self.frame_bytes
                del self._data[:drop]
                self.dropped_bytes += drop

    def read(self, size: int) -> bytes:
        """Up to *size* bytes, whole samples; silence when there is nothing (10 ms at most, so the card asks again
        soon and does not fill its own buffer with it)."""
        size -= size % self.frame_bytes
        with self._lock:
            if self._data:
                chunk = bytes(self._data[:size])
                del self._data[:len(chunk)]
                return chunk
        silence = min(size, self._bytes(10))
        self.silence_bytes += silence
        return bytes(silence)
