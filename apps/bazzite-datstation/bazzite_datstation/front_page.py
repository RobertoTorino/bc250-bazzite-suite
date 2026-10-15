# SPDX-License-Identifier: GPL-3.0-or-later
"""The front page: one tile per feature, in a grid. A tile is a button with the feature's symbol (the shapes of
the controller's buttons for the first four), its name and one line on what it opens. The arrow keys move between
the tiles, so a controller through Steam Input (a D-pad as arrow keys, A as Enter) works as well as a mouse.

The symbols are characters every common font has (the geometric shapes, the multiplication sign, the star): the
Dingbats, the mathematical operators and the emoji fall back to another font, which a Qt platform without font
fallback (offscreen on Windows) draws as boxes, and the suite's portal draws its own glyphs for the same reason."""

from __future__ import annotations

from dataclasses import dataclass

from PyQt6.QtCore import Qt, pyqtSignal
from PyQt6.QtGui import QKeyEvent
from PyQt6.QtWidgets import QGridLayout, QLabel, QPushButton, QVBoxLayout, QWidget

from .style import label

COLUMNS = 3
TILE_WIDTH, TILE_HEIGHT = 260, 150
TRIANGLE, CIRCLE, CROSS, SQUARE = "#48B67E", "#E24C4C", "#5AA0FF", "#E07AB8"


@dataclass(frozen=True)
class Feature:
    key: str
    symbol: str
    colour: str
    name: str
    text: str


FEATURES = (
    Feature("quiz", "△", TRIANGLE, "PlayStation Quiz",
            "1,461 questions in 11 categories, against the clock. Perfect rounds earn trophies."),
    Feature("history", "○", CIRCLE, "PlayStation History",
            "Every console since 1994: what it sold, how many titles, and pictures of each model."),
    Feature("versions", "×", CROSS, "System Version History",
            "Every system software release, from the PS1 to the PS5 and the Portal."),
    Feature("regions", "□", SQUARE, "Region Codes Explained",
            "What the prefix of a title ID and the last digit of a model number say about the region."),
    Feature("guides", "◇", "#FFFFFF", "PlayStation User Guides",
            "Sony's online manuals for every PlayStation product, in your browser."),
    Feature("news", "◆", "#FFD166", "PS News",
            "The latest announcements from the PlayStation Blog, upcoming games and new releases."),
    Feature("scores", "★", "#FFD700", "Scores & Trophies",
            "Your best quiz scores and the trophies your perfect rounds earned."),
)
KEYS = tuple(feature.key for feature in FEATURES)


class Tile(QPushButton):
    def __init__(self, feature: Feature, parent: QWidget | None = None):
        super().__init__(parent)
        self.feature = feature
        self.setProperty("tile", True)
        self.setFixedSize(TILE_WIDTH, TILE_HEIGHT)
        self.setCursor(Qt.CursorShape.PointingHandCursor)
        self.setFocusPolicy(Qt.FocusPolicy.StrongFocus)
        self.setToolTip(f"Open {feature.name}")
        self.setAccessibleName(feature.name)
        layout = QVBoxLayout(self)
        layout.setContentsMargins(16, 12, 16, 12)
        layout.setSpacing(4)
        symbol = QLabel(feature.symbol)
        symbol.setStyleSheet(f"color:{feature.colour}; font-size:28px; font-weight:900;")
        name = QLabel(feature.name)
        name.setStyleSheet("color:white; font-size:16px; font-weight:800;")
        text = label(feature.text, muted=True, wrap=True)
        text.setStyleSheet("font-size:12px;")
        for widget in (symbol, name, text):
            widget.setAttribute(Qt.WidgetAttribute.WA_TransparentForMouseEvents)
            layout.addWidget(widget)
        layout.addStretch(1)


class FrontPage(QWidget):
    opened = pyqtSignal(str)            # a feature's key

    def __init__(self, parent: QWidget | None = None):
        super().__init__(parent)
        layout = QVBoxLayout(self)
        layout.setContentsMargins(0, 0, 0, 0)
        layout.setSpacing(12)
        layout.addWidget(label("What do you want to open?", title=True))
        grid = QGridLayout()
        grid.setHorizontalSpacing(16)
        grid.setVerticalSpacing(16)
        self.tiles: list[Tile] = []
        for n, feature in enumerate(FEATURES):
            tile = Tile(feature)
            tile.clicked.connect(lambda _checked=False, key=feature.key: self.opened.emit(key))
            grid.addWidget(tile, n // COLUMNS, n % COLUMNS)
            self.tiles.append(tile)
        grid.setColumnStretch(COLUMNS, 1)
        layout.addLayout(grid)
        layout.addStretch(1)

    def tile(self, key: str) -> Tile:
        return next(tile for tile in self.tiles if tile.feature.key == key)

    def focus_tile(self, key: str | None = None) -> None:
        (self.tile(key) if key else self.tiles[0]).setFocus(Qt.FocusReason.OtherFocusReason)

    def keyPressEvent(self, event: QKeyEvent) -> None:  # noqa: N802  (Qt's name)
        """Arrows move the focus through the grid; Enter and Space open the focused tile (a button's own)."""
        focused = self.focusWidget()
        if isinstance(focused, Tile):
            index = self.tiles.index(focused)
            moves = {Qt.Key.Key_Right: 1, Qt.Key.Key_Left: -1, Qt.Key.Key_Down: COLUMNS, Qt.Key.Key_Up: -COLUMNS}
            step = moves.get(event.key())
            if step is not None:
                target = index + step
                if 0 <= target < len(self.tiles):
                    self.tiles[target].setFocus(Qt.FocusReason.OtherFocusReason)
                event.accept()
                return
        super().keyPressEvent(event)
