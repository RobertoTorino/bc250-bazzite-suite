#!/usr/bin/env python3
# SPDX-License-Identifier: GPL-3.0-or-later
"""A video tour of the portal, for the wiki and YouTube: the real portal window from this checkout, driven by a
script and rendered frame by frame into an MP4 (H.264, 1920 x 1080, 30 fps, no sound).

    python3 tools/portal_tour.py [OUT.mp4] [--fps 30]

It runs offscreen in a temporary home folder: a few apps "installed" (their detect paths and records), one of them
behind its pinned release so the update notice shows, no network, and nothing from the machine it runs on (no user
or host names, no checkout path). The pointer, the clicks and the captions are drawn into the frames. Needs PyQt6
(the dev venv) and ffmpeg with libx264."""

from __future__ import annotations

import argparse
import json
import os
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

SUITE = Path(__file__).resolve().parents[1]
WIDTH, HEIGHT = 1920, 1080
SCALE = 1.2                                         # the window is 1600 x 900 at 120 %: readable on a phone too
INSTALLED = ("check", "gpu", "helixsr", "shadps4", "rpcs3", "cec", "package")
BEHIND = "shadps4"                                  # installed from an older release: the red dot and the notice


def prepare_home(home: Path) -> None:
    for var, sub in (("HOME", ""), ("XDG_DATA_HOME", ".local/share"), ("XDG_CONFIG_HOME", ".config"),
                     ("XDG_STATE_HOME", ".local/state"), ("XDG_CACHE_HOME", ".cache")):
        (home / sub).mkdir(parents=True, exist_ok=True)
        os.environ[var] = str(home / sub)
    os.environ["QT_QPA_PLATFORM"] = "offscreen"
    os.environ["QT_SCALE_FACTOR"] = str(SCALE)
    os.environ.pop("QT_SCREEN_SCALE_FACTORS", None)
    sys.path[:0] = [str(SUITE / "core"), str(SUITE / "portal")]


class Tour:
    def __init__(self, out: Path, fps: int, home: Path):
        from PyQt6.QtCore import QSettings
        from PyQt6.QtWidgets import QApplication

        from bc250_core.app import create_app
        from bc250_portal import INFO, MANIFEST, state_dir
        from bc250_portal.manifest import load, load_checkout
        from bc250_portal.sources import Records, Sources

        self.fps = fps
        self.home = home
        self.app = QApplication.instance() or create_app(INFO, [])
        for fmt in (QSettings.Format.NativeFormat, QSettings.Format.IniFormat):
            QSettings.setPath(fmt, QSettings.Scope.UserScope, str(home / ".config"))
        entries = load(MANIFEST)
        shown = entries + load_checkout(MANIFEST)
        records = {}
        for entry in entries:
            if entry.key in INSTALLED:
                for path in entry.detect:
                    target = Path(os.path.expanduser(os.path.expandvars(path)))
                    target.parent.mkdir(parents=True, exist_ok=True)
                    target.touch()
                records[entry.key] = entry.tag
                if entry.key == BEHIND:
                    major, minor, _ = entry.version.split(".")
                    records[entry.key] = f"{entry.key}-v{major}.{max(int(minor) - 1, 0)}.0"
        state_dir().mkdir(parents=True, exist_ok=True)
        (state_dir() / "installed.json").write_text(json.dumps(records), encoding="utf-8")
        from bc250_portal.main_window import MainWindow
        self.window = MainWindow(shown, Sources(state_dir() / "releases", checkout=None, download=None),
                                 Records(state_dir() / "installed.json"), desktop=home / "Desktop",
                                 menu=home / ".local/share/applications")
        self.window.setWindowTitle(INFO.display_name)
        self.window.move(0, 0)
        self.window.resize(round(WIDTH / SCALE), round(HEIGHT / SCALE))
        self.window.show()
        self.pump()
        self.pointer = (WIDTH * 0.55, HEIGHT * 0.6)
        self.click_at: tuple[float, float, int] | None = None
        self.caption = ""
        self.popup = None
        self.overlay = None                         # a whole frame drawn instead of the window (title cards)
        self.ffmpeg = subprocess.Popen(
            ["ffmpeg", "-loglevel", "error", "-y", "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{WIDTH}x{HEIGHT}",
             "-r", str(fps), "-i", "-", "-c:v", "libx264", "-preset", "slow", "-crf", "18", "-pix_fmt", "yuv420p",
             "-movflags", "+faststart", str(out)], stdin=subprocess.PIPE)

    # --- frames ---------------------------------------------------------------------------------------------
    def pump(self) -> None:
        for _ in range(3):
            self.app.processEvents()

    def frame(self):
        from PyQt6.QtCore import QPointF, QRectF, Qt
        from PyQt6.QtGui import QColor, QFont, QImage, QPainter, QPainterPath, QPen

        image = QImage(WIDTH, HEIGHT, QImage.Format.Format_RGB888)
        painter = QPainter(image)
        painter.setRenderHint(QPainter.RenderHint.Antialiasing)
        painter.setRenderHint(QPainter.RenderHint.SmoothPixmapTransform)
        if self.overlay is not None:
            painter.drawImage(0, 0, self.overlay)
        else:
            shot = self.window.grab()
            painter.drawPixmap(QRectF(0, 0, WIDTH, HEIGHT), shot, QRectF(shot.rect()))
            if self.popup is not None and self.popup.isVisible():
                menu = self.popup.grab()
                top_left = self.popup.pos() - self.window.pos()
                painter.drawPixmap(QRectF(top_left.x() * SCALE, top_left.y() * SCALE, menu.width(), menu.height()),
                                   menu, QRectF(menu.rect()))
            if self.click_at is not None:
                x, y, age = self.click_at
                radius = 12 + age * 3
                painter.setPen(QPen(QColor(255, 255, 255, max(0, 230 - age * 28)), 4))
                painter.setBrush(Qt.BrushStyle.NoBrush)
                painter.drawEllipse(QPointF(x, y), radius, radius)
                self.click_at = (x, y, age + 1) if age < 8 else None
            x, y = self.pointer
            arrow = QPainterPath()
            for i, (dx, dy) in enumerate(((0, 0), (0, 34), (9, 26), (15, 40), (21, 37), (15, 24), (27, 24))):
                (arrow.moveTo if i == 0 else arrow.lineTo)(x + dx, y + dy)
            arrow.closeSubpath()
            painter.setPen(QPen(QColor("black"), 2))
            painter.setBrush(QColor("white"))
            painter.drawPath(arrow)
        if self.caption:
            font = QFont(self.app.font())
            font.setPixelSize(34)
            font.setWeight(QFont.Weight.DemiBold)
            painter.setFont(font)
            box = painter.boundingRect(QRectF(0, 0, WIDTH - 360, 400),
                                       int(Qt.AlignmentFlag.AlignCenter) | int(Qt.TextFlag.TextWordWrap), self.caption)
            box = box.adjusted(-28, -18, 28, 18)
            box.moveCenter(QPointF(WIDTH / 2, HEIGHT - 70 - box.height() / 2))
            painter.setPen(Qt.PenStyle.NoPen)
            painter.setBrush(QColor(10, 14, 22, 215))
            painter.drawRoundedRect(box, 14, 14)
            painter.setPen(QColor("white"))
            painter.drawText(box, int(Qt.AlignmentFlag.AlignCenter) | int(Qt.TextFlag.TextWordWrap), self.caption)
        painter.end()
        return image

    def emit(self, image, count: int = 1) -> None:
        data = image.constBits().asstring(image.sizeInBytes())
        stride = image.bytesPerLine()
        if stride != WIDTH * 3:
            data = b"".join(data[row * stride: row * stride + WIDTH * 3] for row in range(HEIGHT))
        assert self.ffmpeg.stdin is not None
        for _ in range(count):
            self.ffmpeg.stdin.write(data)

    def hold(self, seconds: float) -> None:
        """The same picture for *seconds* (a click ring still fades out first)."""
        frames = round(seconds * self.fps)
        while self.click_at is not None and frames > 0:
            self.pump()
            self.emit(self.frame())
            frames -= 1
        self.pump()
        self.emit(self.frame(), max(frames, 0))

    def move(self, target: tuple[float, float], seconds: float = 0.8) -> None:
        start, frames = self.pointer, max(1, round(seconds * self.fps))
        for i in range(1, frames + 1):
            t = i / frames
            ease = t * t * (3 - 2 * t)
            self.pointer = (start[0] + (target[0] - start[0]) * ease, start[1] + (target[1] - start[1]) * ease)
            self.pump()
            self.emit(self.frame())

    def at(self, widget, fx: float = 0.5, fy: float = 0.5) -> tuple[float, float]:
        """Where a point of *widget* is in the video (fractions of its width and height)."""
        from PyQt6.QtCore import QPoint
        point = widget.mapTo(self.window, QPoint(round(widget.width() * fx), round(widget.height() * fy)))
        return point.x() * SCALE, point.y() * SCALE

    def tab_at(self, index: int) -> tuple[float, float]:
        from PyQt6.QtCore import QPoint
        bar = self.window.tabs.tabBar()
        point = bar.mapTo(self.window, bar.tabRect(index).center() + QPoint(0, 2))
        return point.x() * SCALE, point.y() * SCALE

    def click(self, action=None) -> None:
        self.click_at = (*self.pointer, 0)
        self.emit(self.frame(), 2)
        if action is not None:
            action()
        self.pump()

    def say(self, text: str) -> None:
        self.caption = text

    def fade(self, first, second, seconds: float = 0.6) -> None:
        from PyQt6.QtGui import QPainter
        frames = max(1, round(seconds * self.fps))
        for i in range(1, frames + 1):
            image = first.copy()
            painter = QPainter(image)
            painter.setOpacity(i / frames)
            painter.drawImage(0, 0, second)
            painter.end()
            self.emit(image)

    def card(self, title: str, lines: list[str]):
        """A title card in the theme's colours, with the portal's icon."""
        from PyQt6.QtCore import QRectF, Qt
        from PyQt6.QtGui import QColor, QFont, QImage, QPainter, QPalette, QPixmap

        from bc250_portal import LOGO_PATH
        image = QImage(WIDTH, HEIGHT, QImage.Format.Format_RGB888)
        image.fill(self.window.palette().color(QPalette.ColorRole.Window))
        painter = QPainter(image)
        painter.setRenderHint(QPainter.RenderHint.Antialiasing)
        painter.setRenderHint(QPainter.RenderHint.SmoothPixmapTransform)
        logo = QPixmap(str(LOGO_PATH))
        painter.drawPixmap(QRectF(WIDTH / 2 - 128, 190, 256, 256), logo, QRectF(logo.rect()))
        font = QFont(self.app.font())
        font.setPixelSize(76)
        font.setWeight(QFont.Weight.Bold)
        painter.setFont(font)
        text = self.window.palette().color(QPalette.ColorRole.WindowText)
        painter.setPen(text)
        painter.drawText(QRectF(0, 490, WIDTH, 110), int(Qt.AlignmentFlag.AlignCenter), title)
        font.setPixelSize(40)
        font.setWeight(QFont.Weight.Normal)
        painter.setFont(font)
        painter.setPen(QColor(text.red(), text.green(), text.blue(), 200))
        for i, line in enumerate(lines):
            painter.drawText(QRectF(0, 625 + i * 64, WIDTH, 60), int(Qt.AlignmentFlag.AlignCenter), line)
        painter.end()
        return image

    def finish(self) -> int:
        assert self.ffmpeg.stdin is not None
        self.ffmpeg.stdin.close()
        return self.ffmpeg.wait()

    # --- the tour -------------------------------------------------------------------------------------------
    def run(self) -> None:
        from bc250_core.appinfo import SUITE_MANUAL_URL
        from bc250_portal import __version__
        from bc250_portal.main_window import CATEGORY_HINTS
        from bc250_portal.manifest import CATEGORIES

        w = self.window
        title = self.card("BC250 Bazzite Suite", ["A tour of the portal", f"Portal {__version__}"])
        self.overlay = title
        self.emit(title, round(3.5 * self.fps))
        self.overlay = None
        self.fade(title, self.frame(), 0.8)

        self.say("The portal installs, updates and starts every app of the suite for the AMD BC-250 on Bazzite.")
        self.hold(3.5)
        self.say("Its header: the portal's icon and name, and where the apps install from.")
        self.move(self.at(w.logo))
        self.hold(3)
        for pill, text in ((w.refresh_pill, "Refresh looks again at which apps are installed."),
                           (w.icons_box, "Icons on Desktop: one icon per app on the Desktop, or only the portal's."),
                           (w.theme_pill, "The theme switcher: one look for every app in the suite."),
                           (w.wallpaper_pill, "And a wallpaper of your own behind the portal.")):
            self.say(text)
            self.move(self.at(pill), 0.6)
            self.hold(2.6)

        self.say("An app with a newer release gets a red dot, and the notice above the tabs names it.")
        self.move(self.at(w.notice, 0.2, 0.5))
        self.hold(3.5)
        first = w.cards["check"]
        self.say("Bazzite Test checks the board. It is always installed, as the first tile on Sustainable.")
        self.move(self.at(first, 0.5, 0.3))
        self.hold(3.5)
        self.say("Every tile installs, opens, updates and uninstalls its app; the installer runs in a terminal.")
        self.move(self.at(first, 0.5, 0.92))
        self.hold(3.5)
        board = next((c for k, c in w.cards.items() if c.entry.changes_board and c.isVisible()), None)
        if board is not None:
            self.say("Apps that change how the board runs carry a mark, and the portal asks first. "
                     "All of them are software-only and can be undone.")
            self.move(self.at(board, 0.5, 0.4))
            self.hold(4)

        self.say("")
        for index in range(1, w.tabs.count()):
            self.move(self.tab_at(index), 0.7)
            self.click(lambda i=index: w.tabs.setCurrentIndex(i))
            category = next(k for k, page in w.pages.items() if page is w.tabs.widget(index))
            self.say(f"{CATEGORIES[category]}: {CATEGORY_HINTS[category]}")
            self.hold(3.8)
        self.say("")
        self.move(self.tab_at(0), 0.7)
        self.click(lambda: w.tabs.setCurrentIndex(0))
        self.hold(0.6)

        self.say("The Wallpaper pill: your own picture, the example, one used before, or none.")
        self.move(self.at(w.wallpaper_pill))
        self.click(lambda: self.open_menu())
        self.hold(2.5)
        example = next(a for a in self.popup.actions() if a.text() == "Example wallpaper")
        self.move(self.at_action(example), 0.6)
        self.click(lambda: (self.popup.close(), w.example_wallpaper()))
        self.popup = None
        self.say("It fills the window, under a veil of the theme's colour so the text stays readable.")
        self.hold(3.5)
        self.say("")
        self.move(self.at(w.wallpaper_pill), 0.6)
        self.click(lambda: self.open_menu())
        slider = w.transparency_slider
        self.move(self.at_slider(slider, slider.value()), 0.7)
        self.say("Transparency sets that veil: more for a dark or busy picture, so the icons stand out.")
        self.hold(1)
        for target in (90, 25, 60):
            self.drag(slider, target, 1.6)
            self.hold(0.8)
        self.say("The window changes while you move it, and the portal remembers it.")
        self.hold(2)
        self.popup.close()
        self.popup = None
        self.pump()

        self.say("Gunmetal, Silver or Warm: each app takes the theme the next time it starts.")
        self.move(self.at(w.theme_pill))
        self.click(w._next_theme)
        self.hold(1.5)
        last = self.frame()
        for name in ("silver", "warm"):
            still = self.still(name)
            self.fade(last, still, 0.5)
            self.emit(still, round(2.2 * self.fps))
            last = still
        self.caption = ""
        end = self.card("BC250 Bazzite Suite", ["Everything about each app is in the wiki:",
                                               SUITE_MANUAL_URL.removeprefix("https://").rstrip("/")])
        self.fade(last, end, 0.8)
        self.emit(end, round(5 * self.fps))

    def open_menu(self) -> None:
        self.popup = self.window.wallpaper_menu()
        pill = self.window.wallpaper_pill
        self.popup.popup(pill.mapToGlobal(pill.rect().bottomLeft()))
        self.pump()

    def at_action(self, action) -> tuple[float, float]:
        rect = self.popup.actionGeometry(action)
        top_left = self.popup.pos() - self.window.pos()
        return (top_left.x() + rect.center().x()) * SCALE, (top_left.y() + rect.center().y()) * SCALE

    def at_slider(self, slider, value: int) -> tuple[float, float]:
        from PyQt6.QtCore import QPoint
        from PyQt6.QtWidgets import QStyle, QStyleOptionSlider
        option = QStyleOptionSlider()
        slider.initStyleOption(option)
        option.sliderPosition = value
        handle = slider.style().subControlRect(QStyle.ComplexControl.CC_Slider, option,
                                               QStyle.SubControl.SC_SliderHandle, slider)
        point = slider.mapToGlobal(handle.center()) - self.window.pos() + QPoint(0, 0)
        return point.x() * SCALE, point.y() * SCALE

    def drag(self, slider, target: int, seconds: float) -> None:
        start, frames = slider.value(), max(1, round(seconds * self.fps))
        for i in range(1, frames + 1):
            t = i / frames
            value = round(start + (target - start) * t * t * (3 - 2 * t))
            slider.setValue(value)
            self.pointer = self.at_slider(slider, value)
            self.pump()
            self.emit(self.frame())

    def still(self, theme: str):
        """The portal in another theme: a fresh process (the theme is read at start) renders one frame."""
        from PyQt6.QtGui import QImage
        out = self.home / f"still-{theme}.png"
        subprocess.run([sys.executable, __file__, "--still", theme, str(out)], check=True)
        return QImage(str(out)).convertToFormat(QImage.Format.Format_RGB888)


def render_still(theme: str, out: Path) -> None:
    with tempfile.TemporaryDirectory(prefix="portal-tour-") as folder:
        home = Path(folder)
        prepare_home(home)
        import importlib

        import bc250_core.theme
        bc250_core.theme.save_theme_name(theme)
        importlib.reload(bc250_core.theme)              # the theme is read when the module is imported
        tour = Tour(Path(os.devnull), 1, home)
        tour.ffmpeg.kill()
        tour.window.example_wallpaper()
        tour.say({"silver": "Silver", "warm": "Warm"}.get(theme, theme))
        tour.overlay = None
        tour.pointer = (-100, -100)
        tour.pump()
        tour.frame().save(str(out))


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    parser.add_argument("out", nargs="?", default="portal-tour.mp4")
    parser.add_argument("--fps", type=int, default=30)
    parser.add_argument("--still", nargs=2, metavar=("THEME", "PNG"), help=argparse.SUPPRESS)
    args = parser.parse_args()
    if args.still:
        render_still(args.still[0], Path(args.still[1]))
        return 0
    if not shutil.which("ffmpeg"):
        print("ffmpeg is needed", file=sys.stderr)
        return 1
    out = Path(args.out).resolve()
    with tempfile.TemporaryDirectory(prefix="portal-tour-") as folder:
        home = Path(folder)
        prepare_home(home)
        tour = Tour(out, args.fps, home)
        try:
            tour.run()
        finally:
            code = tour.finish()
    print(out if code == 0 else f"ffmpeg failed ({code})")
    return code


if __name__ == "__main__":
    # The video is written and the temporary home removed when main() returns. os._exit skips the interpreter's
    # shutdown, where Python destroys the Qt objects in no fixed order: that crashed now and then (exit code 139)
    # after a complete recording.
    try:
        status = main()
    except SystemExit as exc:                       # argparse: --help, or a wrong argument
        status = exc.code if isinstance(exc.code, int) else (0 if exc.code is None else 1)
    except BaseException:
        import traceback
        traceback.print_exc()
        status = 1
    sys.stdout.flush()
    sys.stderr.flush()
    os._exit(status)
