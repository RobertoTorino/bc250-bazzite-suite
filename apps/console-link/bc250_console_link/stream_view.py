# SPDX-License-Identifier: AGPL-3.0-or-later
"""The stream on screen: the decoded pictures (video.py) drawn with OpenGL, Y'CbCr to RGB in a shader, the
picture letterboxed in the window at its own aspect ratio.

Renderer holds the OpenGL part (textures, shader, drawing) and works in any current context, so the tests draw into
an offscreen framebuffer and read the pixels back. StreamView is the widget around it; StreamWindow the window with
the view and a status line, which plays the sound (sound_out.py) and ends the stream when it closes. OpenGL 2.0 and
GLSL 1.10, the compatibility profile QOpenGLWidget gets by default: the planes go up as luminance textures
(luminance-alpha for nv12's CbCr)."""

from __future__ import annotations

import time
from typing import Callable

from PyQt6.QtCore import QObject, Qt, QTimer, pyqtSignal
from PyQt6.QtGui import QCloseEvent, QKeyEvent, QMouseEvent, QOpenGLContext, QVector2D, QVector3D
from PyQt6.QtOpenGL import (QOpenGLShader, QOpenGLShaderProgram, QOpenGLVersionFunctionsFactory,
                            QOpenGLVersionProfile)
from PyQt6.QtOpenGLWidgets import QOpenGLWidget
from PyQt6.QtWidgets import QLabel, QVBoxLayout, QWidget

from .sound_out import SoundPlayer
from .video import Picture, PictureSlot, color_matrix

GL_TEXTURE_2D = 0x0DE1
GL_TEXTURE0 = 0x84C0
GL_LUMINANCE = 0x1909
GL_LUMINANCE_ALPHA = 0x190A
GL_UNSIGNED_BYTE = 0x1401
GL_UNPACK_ALIGNMENT = 0x0CF5
GL_TEXTURE_MIN_FILTER, GL_TEXTURE_MAG_FILTER = 0x2801, 0x2800
GL_TEXTURE_WRAP_S, GL_TEXTURE_WRAP_T = 0x2802, 0x2803
GL_LINEAR = 0x2601
GL_CLAMP_TO_EDGE = 0x812F
GL_COLOR_BUFFER_BIT = 0x4000
GL_TRIANGLE_STRIP = 0x0005

VERTEX = """#version 110
attribute vec2 position;
attribute vec2 texcoord;
varying vec2 uv;
void main() {
    uv = texcoord;
    gl_Position = vec4(position, 0.0, 1.0);
}
"""

# The chroma line: yuv420p has Cb and Cr in two textures, nv12 both in one (luminance and alpha).
FRAGMENT = """#version 110
uniform sampler2D plane_y;
uniform sampler2D plane_u;
uniform sampler2D plane_v;
uniform vec3 row_r;
uniform vec3 row_g;
uniform vec3 row_b;
uniform vec3 offset;
varying vec2 uv;
void main() {
    vec3 yuv = vec3(texture2D(plane_y, uv).r, %s);
    vec3 rgb = vec3(dot(row_r, yuv), dot(row_g, yuv), dot(row_b, yuv)) + offset;
    gl_FragColor = vec4(clamp(rgb, 0.0, 1.0), 1.0);
}
"""
CHROMA = {"yuv420p": "texture2D(plane_u, uv).r, texture2D(plane_v, uv).r", "nv12": "texture2D(plane_u, uv).ra"}

# A quad over the viewport; the picture's first row (texture row 0) at the top.
POSITIONS = [QVector2D(-1, -1), QVector2D(1, -1), QVector2D(-1, 1), QVector2D(1, 1)]
TEXCOORDS = [QVector2D(0, 1), QVector2D(1, 1), QVector2D(0, 0), QVector2D(1, 0)]


class RendererError(Exception):
    pass


def letterbox(picture: tuple[int, int], area: tuple[int, int]) -> tuple[int, int, int, int]:
    """The viewport (x, y, width, height; y from the bottom, as OpenGL counts) that shows a picture of that size
    whole and centred in the area, at its own aspect ratio."""
    pw, ph = picture
    aw, ah = area
    if pw <= 0 or ph <= 0 or aw <= 0 or ah <= 0:
        return 0, 0, max(aw, 0), max(ah, 0)
    if aw * ph >= ah * pw:              # the area is wider: bars left and right
        width, height = round(ah * pw / ph), ah
    else:
        width, height = aw, round(aw * ph / pw)
    return (aw - width) // 2, (ah - height) // 2, width, height


class Renderer:
    """Uploads pictures and draws the last one. initialize(), upload() and paint() need the context current."""

    def __init__(self):
        self.gl = None
        self.programs: dict[str, QOpenGLShaderProgram] = {}
        self.textures: list[int] = []
        self.sizes: list[tuple[int, int, int]] = []
        self.picture: Picture | None = None      # the last one uploaded, without its data

    def initialize(self, context: QOpenGLContext) -> None:
        profile = QOpenGLVersionProfile()
        profile.setVersion(2, 0)
        self.gl = QOpenGLVersionFunctionsFactory.get(profile, context)
        if self.gl is None or not self.gl.initializeOpenGLFunctions():
            raise RendererError("OpenGL 2.0 is not available")
        for name, chroma in CHROMA.items():
            program = QOpenGLShaderProgram()
            if not (program.addShaderFromSourceCode(QOpenGLShader.ShaderTypeBit.Vertex, VERTEX)
                    and program.addShaderFromSourceCode(QOpenGLShader.ShaderTypeBit.Fragment, FRAGMENT % chroma)
                    and program.link()):
                raise RendererError(f"the {name} shader does not build: {program.log()}")
            self.programs[name] = program
        self.textures = list(self.gl.glGenTextures(3))
        for texture in self.textures:
            self.gl.glBindTexture(GL_TEXTURE_2D, texture)
            for parameter, value in ((GL_TEXTURE_MIN_FILTER, GL_LINEAR), (GL_TEXTURE_MAG_FILTER, GL_LINEAR),
                                     (GL_TEXTURE_WRAP_S, GL_CLAMP_TO_EDGE), (GL_TEXTURE_WRAP_T, GL_CLAMP_TO_EDGE)):
                self.gl.glTexParameteri(GL_TEXTURE_2D, parameter, value)
        self.sizes = [(0, 0, 0)] * 3

    def upload(self, picture: Picture) -> None:
        gl = self.gl
        gl.glPixelStorei(GL_UNPACK_ALIGNMENT, 1)
        for i, plane in enumerate(picture.planes()):
            fmt = GL_LUMINANCE if plane.channels == 1 else GL_LUMINANCE_ALPHA
            gl.glBindTexture(GL_TEXTURE_2D, self.textures[i])
            size = (plane.width, plane.height, fmt)
            if self.sizes[i] != size:
                gl.glTexImage2D(GL_TEXTURE_2D, 0, fmt, plane.width, plane.height, 0, fmt, GL_UNSIGNED_BYTE,
                                plane.data)
                self.sizes[i] = size
            else:
                gl.glTexSubImage2D(GL_TEXTURE_2D, 0, 0, 0, plane.width, plane.height, fmt, GL_UNSIGNED_BYTE,
                                   plane.data)
        self.picture = Picture(picture.format, picture.width, picture.height, b"", picture.colorspace,
                               picture.full_range)

    def paint(self, width: int, height: int) -> None:
        """Into the current framebuffer of width × height pixels: black, and the last picture letterboxed."""
        gl = self.gl
        gl.glViewport(0, 0, width, height)
        gl.glClearColor(0.0, 0.0, 0.0, 1.0)
        gl.glClear(GL_COLOR_BUFFER_BIT)
        picture = self.picture
        if picture is None:
            return
        gl.glViewport(*letterbox((picture.width, picture.height), (width, height)))
        program = self.programs[picture.format]
        program.bind()
        matrix, offset = color_matrix(picture.matrix_name, picture.full_range)
        for name, row in (("row_r", 0), ("row_g", 1), ("row_b", 2)):
            program.setUniformValue(name, QVector3D(*matrix[row * 3:row * 3 + 3]))
        program.setUniformValue("offset", QVector3D(*offset))
        samplers = ["plane_y", "plane_u", "plane_v"][:3 if picture.format == "yuv420p" else 2]
        for unit, name in enumerate(samplers):
            gl.glActiveTexture(GL_TEXTURE0 + unit)
            gl.glBindTexture(GL_TEXTURE_2D, self.textures[unit])
            program.setUniformValue(name, unit)
        gl.glActiveTexture(GL_TEXTURE0)
        position, texcoord = program.attributeLocation("position"), program.attributeLocation("texcoord")
        program.enableAttributeArray(position)
        program.enableAttributeArray(texcoord)
        program.setAttributeArray(position, POSITIONS)
        program.setAttributeArray(texcoord, TEXCOORDS)
        gl.glDrawArrays(GL_TRIANGLE_STRIP, 0, 4)
        program.disableAttributeArray(position)
        program.disableAttributeArray(texcoord)
        program.release()


class PictureNotifier(QObject):
    """Tells the view, from the stream's thread, that a picture is waiting (a queued signal)."""
    arrived = pyqtSignal()


class StreamView(QOpenGLWidget):
    """Shows the newest picture of a PictureSlot; black until the first one."""

    def __init__(self, slot: PictureSlot, parent: QWidget | None = None):
        super().__init__(parent)
        self.slot = slot
        self.renderer = Renderer()
        self.error: str | None = None
        self.shown = 0
        self.setMinimumSize(320, 180)

    def initializeGL(self) -> None:
        try:
            self.renderer.initialize(self.context())
        except RendererError as error:
            self.error = str(error)

    def paintGL(self) -> None:
        if self.error is not None:
            return
        picture = self.slot.take()
        if picture is not None and picture.shown:
            self.renderer.upload(picture)
            self.shown += 1
        ratio = self.devicePixelRatioF()
        self.renderer.paint(round(self.width() * ratio), round(self.height() * ratio))


KEYS = "F11 full screen, Esc leaves it, M mutes; closing the window ends the stream"


class StreamWindow(QWidget):
    """The stream's window: the view and a status line under it, and the sound. F11 or a double click toggle full
    screen, Escape leaves it, M mutes the sound. Closing the window calls on_close, which ends the stream."""

    def __init__(self, title: str, on_close: Callable[[], None], parent: QWidget | None = None):
        super().__init__(parent, Qt.WindowType.Window)
        self.setWindowTitle(title)
        self.on_close = on_close
        self.slot = PictureSlot()
        self.sound = SoundPlayer(self)
        self.notifier = PictureNotifier()
        self.view = StreamView(self.slot)
        self.notifier.arrived.connect(self.view.update)
        self.status = QLabel("Starting the stream…")
        self.status.setContentsMargins(8, 4, 8, 4)
        lay = QVBoxLayout(self)
        lay.setContentsMargins(0, 0, 0, 0)
        lay.setSpacing(0)
        lay.addWidget(self.view, 1)
        lay.addWidget(self.status)
        self.setStyleSheet("background:#000; color:#ddd;")
        self.resize(1280, 760)
        self._counted = (time.monotonic(), 0)
        self.rate_timer = QTimer(self)
        self.rate_timer.timeout.connect(self._show_rate)
        self.rate_timer.start(1000)
        self.detail = ""

    def deliver(self, picture: Picture) -> None:
        """From the stream's thread: the newest picture."""
        if self.slot.put(picture):
            self.notifier.arrived.emit()

    def wanted(self) -> bool:
        return self.slot.wanted()

    def play(self, pcm: bytes, rate: int, channels: int) -> None:
        """From the stream's thread: the next 10 ms of sound."""
        self.sound.push(pcm, rate, channels)

    def _sound_text(self) -> str:
        if self.sound.error is not None:
            return f"no sound: {self.sound.error}"
        if self.sound.buffer is None:
            return ""
        return "sound muted (M)" if self.sound.muted else f"sound on {self.sound.output_name} (M mutes)"

    def set_detail(self, text: str) -> None:
        self.detail = text
        self._show_rate()

    def _show_rate(self) -> None:
        if self.view.error is not None:
            self.status.setText(f"The picture cannot be shown: {self.view.error}.")
            return
        now, shown = time.monotonic(), self.view.shown
        before, count = self._counted
        self._counted = (now, shown)
        picture = self.view.renderer.picture
        if picture is None:
            return
        fps = (shown - count) / max(now - before, 1e-6)
        parts = [f"{picture.width}×{picture.height}", f"{fps:.0f} pictures per second shown", self._sound_text(),
                 self.detail, KEYS]
        self.status.setText(" · ".join(part for part in parts if part))

    def bring_forward(self) -> None:
        """Asks the desktop to put the window in front and give it the keyboard: started from Steam's Big Picture,
        KDE otherwise opens it behind (owner's board, 13-10-2026). The desktop may still say no."""
        self.raise_()
        self.activateWindow()
        if self.windowHandle() is not None:
            self.windowHandle().requestActivate()

    def toggle_full_screen(self) -> None:
        if self.isFullScreen():
            self.showNormal()
            self.status.show()
        else:
            self.status.hide()
            self.showFullScreen()

    def keyPressEvent(self, event: QKeyEvent) -> None:
        if event.key() == Qt.Key.Key_F11:
            self.toggle_full_screen()
        elif event.key() == Qt.Key.Key_Escape and self.isFullScreen():
            self.toggle_full_screen()
        elif event.key() == Qt.Key.Key_M:
            self.sound.set_muted(not self.sound.muted)
            self._show_rate()
        else:
            super().keyPressEvent(event)

    def mouseDoubleClickEvent(self, event: QMouseEvent) -> None:
        self.toggle_full_screen()

    def closeEvent(self, event: QCloseEvent) -> None:
        self.rate_timer.stop()
        self.sound.stop()
        self.on_close()
        super().closeEvent(event)
