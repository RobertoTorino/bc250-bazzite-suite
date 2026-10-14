# SPDX-License-Identifier: GPL-3.0-or-later
"""shadPS4's own folder (userdata.py): config.json as shadPS4 0.19.0 writes it, and the system modules."""

from __future__ import annotations

import json

from bc250_shadps4_manager import userdata

# The part of a config.json written by shadPS4 0.19.0 that the app reads (two game folders, one switched off).
CONFIG = {"General": {"install_dirs": [{"enabled": True, "path": "/run/media/games/PS4"},
                                       {"enabled": False, "path": "/old/games"}],
                      "addon_install_dir": "", "sys_modules_dir": "", "volume_slider": 100},
          "GPU": {"full_screen_mode": "Windowed"}}


def test_game_folders_and_module_folder(tmp_path):
    home = tmp_path / "shadPS4"
    assert userdata.read_config(home) == {}
    home.mkdir()
    (home / "config.json").write_text(json.dumps(CONFIG))
    config = userdata.read_config(home)
    assert [str(p) for p in userdata.game_folders(config)] == ["/run/media/games/PS4"]
    assert userdata.modules_folder(home, config) == home / "sys_modules"
    config["General"]["sys_modules_dir"] = "/data/modules"
    assert str(userdata.modules_folder(home, config)) == "/data/modules"


def test_a_config_that_is_not_what_was_expected(tmp_path):
    (tmp_path / "config.json").write_text("{not json")
    assert userdata.read_config(tmp_path) == {}
    (tmp_path / "config.json").write_text("[]")
    assert userdata.read_config(tmp_path) == {}
    for general in ({"install_dirs": "x"}, {"install_dirs": [5, {"path": 3}, {"path": ""}]}, "x"):
        assert userdata.game_folders({"General": general}) == []
    assert userdata.modules_folder(tmp_path, {"General": {"sys_modules_dir": 5}}) == tmp_path / "sys_modules"


def test_modules(tmp_path):
    folder = tmp_path / "sys_modules"
    none = userdata.check_modules(folder)
    assert none.needed == () and none.missing == userdata.NEEDED and not none.complete
    folder.mkdir()
    for name in ("libSceJson.sprx", "libSceNgs2.sprx", "notes.txt"):
        (folder / name).touch()
    some = userdata.check_modules(folder)
    assert some.needed == ("libSceJson.sprx",) and some.optional == ("libSceNgs2.sprx",)
    assert len(some.missing) == len(userdata.NEEDED) - 1
    for name in userdata.NEEDED:
        (folder / name).touch()
    assert userdata.check_modules(folder).complete
    assert not set(userdata.NEEDED) & set(userdata.OPTIONAL) and len(userdata.NEEDED) + len(userdata.OPTIONAL) == 34
