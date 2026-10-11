# SPDX-License-Identifier: GPL-3.0-or-later
"""TV info: what the TV tells about itself over CEC. Only questions (Get CEC Version, Give OSD Name, …): nothing on
the TV changes. Each answer becomes one row of the TV Info window."""

from __future__ import annotations

import re
from dataclasses import dataclass, field
from typing import Callable

from . import cec
from .runner import Result

_REPLY_FIELD = re.compile(r"^\t(?P<key>[a-z][a-z-]*):\s*(?P<value>.+?)\s*$")
_CODE = re.compile(r"\s*\(0x[0-9a-f]+\)$")

# CEC vendor ids (IEEE OUIs) of common TVs and audio systems.
VENDORS = {
    0x0000F0: "Samsung", 0x00E091: "LG", 0x080046: "Sony", 0x00903E: "Philips", 0x008045: "Panasonic",
    0x000039: "Toshiba", 0x08001F: "Sharp", 0x00A0DE: "Yamaha", 0x0009B0: "Onkyo", 0x0005CD: "Denon",
    0x001582: "Pulse-Eight",
}


@dataclass(frozen=True)
class Reply:
    state: str                                      # "answer", "unsupported", "no reply", "no answer"
    fields: dict[str, str] = field(default_factory=dict)

    def get(self, key: str) -> str:
        return _CODE.sub("", self.fields.get(key, ""))


def parse_reply(text: str) -> Reply:
    """cec-ctl's output for one question: the fields of the reply, or why there is none."""
    if not cec.acked(text):
        return Reply("no answer")
    if "Feature Abort" in text:
        return Reply("unsupported")
    _head, received, tail = text.partition("Received from")
    if not received:
        return Reply("no reply")
    fields = {}
    for line in tail.splitlines():
        match = _REPLY_FIELD.match(line)
        if match and match["key"] not in fields:
            fields[match["key"]] = match["value"]
    return Reply("answer", fields)


def vendor_name(vendor: str) -> str:
    """ "0x6d746b, 7173227" -> the vendor's name, or the id as three letters when they spell something ("mtk")."""
    try:
        number = int(vendor.split(",")[0], 16)
    except ValueError:
        return vendor
    if number in VENDORS:
        return f"{VENDORS[number]} (0x{number:06x})"
    letters = number.to_bytes(3, "big")
    if letters.isalpha():
        return f'0x{number:06x} = "{letters.decode()}"'
    return f"0x{number:06x}"


def _version(text: str) -> str:
    """ "version-1-4" -> "1.4" """
    return text.removeprefix("version-").replace("-", ".")


QUESTIONS = (
    # key, label, cec-ctl arguments after "--to <tv>"
    ("version", "CEC version", ["--get-cec-version"]),
    ("power", "Power status", ["--give-device-power-status"]),
    ("name", "Its name and type", ["--give-osd-name"]),
    ("address", "", ["--give-physical-addr"]),
    ("vendor", "Vendor ID", ["--give-device-vendor-id"]),
    ("language", "Menu language", ["--get-menu-language"]),
    ("features", "CEC 2.0 feature list", ["--give-features"]),
    ("audio", "Volume and mute status", ["--give-audio-status"]),
)


def ask(run: Callable[[list[str]], Result], device: str) -> dict[str, Reply]:
    replies = {key: parse_reply(run([cec.CEC_CTL, "-d", device, "-s", "--to", str(cec.TV), *args]).out)
               for key, _label, args in QUESTIONS}
    tv_address = replies["address"].get("phys-addr") or "0.0.0.0"
    replies["latency"] = parse_reply(run([cec.CEC_CTL, "-d", device, "-s", "--to", str(cec.BROADCAST),
                                          "--request-current-latency", f"phys-addr={tv_address}"]).out)
    replies["receiver"] = parse_reply(run([cec.CEC_CTL, *cec.poll(device, cec.AUDIO_SYSTEM)]).out)
    return replies


LANGUAGES = {"eng": "English", "dut": "Dutch", "nld": "Dutch", "ger": "German", "deu": "German",
             "fre": "French", "fra": "French", "spa": "Spanish", "ita": "Italian"}


def _who(replies: dict[str, Reply]) -> str:
    """ 'name "Game", type TV, HDMI address 0.0.0.0' from the OSD name and the physical address replies."""
    name, kind = replies["name"].get("name"), replies["address"].get("prim-devtype")
    address = replies["address"].get("phys-addr")
    parts = [f'name "{name}"' if name else "", f"type {'TV' if kind == 'tv' else kind}" if kind else "",
             f"HDMI address {address}" if address else ""]
    return ", ".join(p for p in parts if p)


def rows(replies: dict[str, Reply]) -> list[tuple[str, str]]:
    """The TV Info table: (question, answer)."""
    def answer(key: str, text: Callable[[Reply], str], unsupported: str = "not supported",
               no_reply: str = "no answer") -> str:
        r = replies[key]
        if r.state == "answer":
            return text(r)
        return {"unsupported": unsupported, "no reply": no_reply}.get(r.state, "no answer (is the TV on?)")

    return [
        ("CEC version", answer("version", lambda r: _version(r.get("cec-version")) or "?")),
        ("Power status", answer("power", lambda r: f"yes ({r.get('pwr-state') or '?'})")),
        ("Its name and type", _who(replies) or answer("name", lambda r: "?")),
        ("Vendor ID", answer("vendor", lambda r: vendor_name(r.fields.get("vendor-id", "")))),
        ("Menu language", answer("language", lambda r: LANGUAGES.get(r.get("language"), r.get("language")))),
        ("CEC 2.0 feature list", answer("features", lambda r: "supported")),
        ("Volume and mute status", answer("audio", lambda r: "supported",
                                          "not supported (it does not report its volume)")),
        ("Lip-sync delay", answer("latency", lambda r: "supported", no_reply="no answer (a CEC 2.0 feature)")),
        # A poll brings no reply: it went through ("no reply") when a device took it.
        ("AV receiver or soundbar", "none connected" if replies["receiver"].state == "no answer" else "connected"),
    ]
