# SPDX-License-Identifier: GPL-3.0-or-later
"""The PlayStation history page's content: every console with its lifetime totals, its pictures
(images/consoles/<name>.webp) and a short note on its legacy. The text and numbers are the Android app's
(Dialogs.kt, HistoryDialog)."""

from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path
from urllib.parse import quote

from . import CONSOLES_DIR

UPDATED = "2026-08-23"                  # when the totals were last checked against the internet
IMAGE_SEARCH = "https://www.google.com/search?q={query}&tbm=isch"


@dataclass(frozen=True)
class Console:
    name: str                           # with its launch year, as the page shows it
    sold: str
    titles: str                         # the title count and, after a line break, a note
    images: tuple[str, ...]             # picture names, without .webp
    legacy: str


CONSOLES = (
    Console("PlayStation (1994)", "102.4M sold", "3,168 titles", ("ps1", "ps1_netyaroze", "ps_one"),
            "The console that started it all, bringing CD-ROM gaming to the mainstream and launching iconic "
            "series like Resident Evil, Tekken, and Final Fantasy VII."),
    Console("PlayStation 2 (2000)", "160M sold",
            "3,482 titles,\nNatively backward compatible with more than 99% of the entire physical PS1 disc library.",
            ("ps2", "ps2_blue", "ps2_blue_network_adapter", "ps2_gold", "ps2_white", "ps2_transparent_blue",
             "ps2_slim"),
            "The best-selling console ever made. It helped popularize DVD playback and built one of the most "
            "influential game libraries in history."),
    Console("Sony PSX (2003)", "160M sold",
            "3,482 titles,\nNatively backward compatible with more than 99% of the entire physical PS1 disc library.",
            ("psx_desr",),
            "A hybrid consumer electronics device released by Sony in Japan on December 13, 2003. It uniquely "
            "combined a fully functional PlayStation 2 console with a digital video recorder (DVR) and television "
            "tuner. PS2's Emotion Engine CPU and Graphics Synthesizer was integrated into the device. With an "
            "internal IDE hard drives of 160GB for the 5000 series and 250GB for the 7000 series, allowing users "
            "to record television broadcasts and burn them onto writable DVDs. It was the very first Sony device "
            "to feature the XrossMediaBar (XMB) graphical user interface, which later became the standard menu "
            "system for the PlayStation Portable (PSP) and PlayStation 3 (PS3). Japan Exclusive: High launch "
            "prices (79,800 to 99,800 yen) and hardware reliability issues led to sluggish long-term sales, "
            "prompting Sony to cancel planned international releases."),
    Console("PlayStation Portable (2004)", "82.5M sold",
            "2,277 titles\nDigital library of PS1 Classics with over 1,300 digital PS1 legacy games.",
            ("psp", "pspgo", "pspgo_white"),
            "Sony's first handheld delivered console-style experiences on the go, multimedia features, and "
            "standout titles like God of War: Chains of Olympus and Crisis Core."),
    Console("PlayStation 3 (2006)", "87.4M sold",
            "5,156 titles\nNatively runs almost 100% of physical PlayStation 1 discs. Launch 20GB and 60GB models "
            "with 4 front USB ports run over 99% of the PS2's title catalog.",
            ("ps3", "ps3_slim", "ps3_superslim"),
            "A major leap into the HD era, introducing Blu-ray, the PlayStation Network, and landmark games such "
            "as Uncharted, Demon’s Souls, and The Last of Us."),
    Console("PlayStation Vita (2011)", "13.5M sold",
            "1,732 titles\nBackward compatibility with digital PSP games and digital PS1 Classics (PSN).",
            ("psv", "psvita_blue", "psvtv"),
            "A powerful handheld with an OLED screen, dual analog sticks, and a passionate fanbase. It became "
            "especially loved for indie games, JRPGs, and remote play."),
    Console("PlayStation 4 (2013)", "117M sold", "11,947 titles", ("ps4", "ps4_pro", "ps4_slim"),
            "A hugely successful generation focused on players, strong first-party exclusives, and a refined "
            "online ecosystem with hits like Bloodborne, God of War, and Spider-Man."),
    Console("PlayStation 5 (2020)", "95.1M sold", "4,761 titles,\n12,160 backward compatible titles",
            ("ps5", "ps5_digital", "ps5_pro", "ps5_pro_box"),
            "The current generation, defined by ultra-fast SSD storage, haptic feedback, adaptive triggers, and "
            "visually advanced games with ray tracing and high frame rates."),
    Console("PlayStation Portal (2023)", "2M sold (2024)", "Has streaming capabilities for PS5 console games",
            ("psportal",),
            "A handheld remote-play accessory designed exclusively for the PlayStation 5. Streams games directly "
            "from a local PS5 console over Wi-Fi, rather than running games natively on the device itself. "
            "Features an 8-inch LCD screen capable of 1080p resolution at 60 frames per second. It requires a "
            "stable internet connection, an active PS5 console to host the game and does not support Bluetooth "
            "audio requiring PlayStation Link wireless or a 3.5mm wired jack."),
)


def image_path(name: str, folder: Path = CONSOLES_DIR) -> Path:
    return folder / f"{name}.webp"


def search_url(query: str) -> str:
    """Pictures of a console on the web, as the Android app's history opened them."""
    return IMAGE_SEARCH.format(query=quote(query))


def missing_images(folder: Path = CONSOLES_DIR) -> list[str]:
    return [name for console in CONSOLES for name in console.images if not image_path(name, folder).is_file()]
