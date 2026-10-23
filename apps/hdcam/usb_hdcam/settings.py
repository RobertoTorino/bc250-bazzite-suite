# SPDX-License-Identifier: GPL-3.0-or-later
"""The app's settings, shared by the window and the load service (python -m usb_hdcam --load --auto)."""

from __future__ import annotations

import json

from bc250_core.settings import SettingsStore

VIEWS = {"both": "Whole frame", "left": "Left half", "right": "Right half"}
# The app's defaults over the camera's own: in its default Shutter Priority the PS5 HD Camera keeps the
# picture dark even in a well-lit room (mean luma 48 of 255, 24 % near black), in Auto Mode (V4L2's 0) it is 111
# (owner's board, 23-10-2026; the owner's choice of default).
CONTROL_DEFAULTS = {"auto_exposure": 0}
BANDWIDTH_NAMES = {"reduced": "Reduced: works on more USB controllers, such as the BC-250's",
                   "full": "Full: every mode at every rate, if the USB controller allows it"}


class CameraSettings(SettingsStore):
    DEFAULTS = {"autoload": True,           # the load service sends the firmware when the camera is plugged in
                "bandwidth": "reduced",     # loader.BANDWIDTHS: the video endpoint the firmware is sent with
                "mode": "",                 # the preview's mode, "<width>x<height>@<fps>"; "": the camera's default
                "view": "both",             # VIEWS: what the preview shows of a stereo mode
                "controls": ""}             # JSON {control key: value}: the picture settings the user chose

    def controls(self) -> dict[str, int]:
        """The picture settings to set: the user's, over the app's CONTROL_DEFAULTS."""
        try:
            chosen = json.loads(self.get("controls") or "{}")
        except ValueError:
            chosen = {}
        if not isinstance(chosen, dict):
            chosen = {}
        return {**CONTROL_DEFAULTS, **{str(key): value for key, value in chosen.items() if isinstance(value, int)}}

    def set_controls(self, chosen: dict[str, int]) -> None:
        self.set("controls", json.dumps(chosen, sort_keys=True) if chosen else "")
