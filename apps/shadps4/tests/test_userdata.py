# SPDX-License-Identifier: GPL-3.0-or-later
"""shadPS4's own folder (userdata.py): config.json as shadPS4 0.19.0 and 0.20.0 write it, the system modules, and the
users with their shadNet accounts, read and written as shadPS4 writes them."""

from __future__ import annotations

import json

import pytest

from shadps4_manager import userdata

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


def test_the_users_and_shadnet(shad_files):
    users = userdata.read_users(shad_files)
    assert [(u.user_id, u.name, u.shadnet) for u in users] == [
        (1000, "shadPS4", False), (1001, "shadPS4-2", False), (1002, "shadPS4-3", False), (1003, "shadPS4-4", False)]
    config = userdata.read_config(shad_files)
    assert not userdata.shadnet_on(config) and userdata.shadnet_server(config) == "srv.shadps4.net:31313"
    assert userdata.shadnet_server({}) == "srv.shadps4.net:31313" and userdata.read_users(shad_files / "none") == []


def test_saving_shadnet_changes_only_its_settings(shad_files):
    config_before = json.loads((shad_files / "config.json").read_text())
    users_before = json.loads((shad_files / "users.json").read_text())
    userdata.save_shadnet(shad_files, 1001, "Player_1", "secret", "me@example.com", True, "192.168.1.20:31313")
    config = json.loads((shad_files / "config.json").read_text())
    users = json.loads((shad_files / "users.json").read_text())
    config_before["General"].update(shad_net_enabled=True, shadnet_server="192.168.1.20:31313")
    users_before["Users"]["user"][1].update(shadnet_npid="Player_1", shadnet_password="secret",
                                            shadnet_email="me@example.com", shadnet_enabled=True)
    assert config == config_before and users == users_before
    for name in ("config.json", "users.json"):                                    # written as shadPS4 writes them
        text = (shad_files / name).read_text()
        assert text == json.dumps(json.loads(text), indent=2) and not text.endswith("\n")
    assert sorted(p.name for p in shad_files.iterdir()) == ["config.json", "users.json"]   # no temporary file left
    assert [u.npid for u in userdata.read_users(shad_files)] == ["", "Player_1", "", ""]
    # Off for that user, and no other user has it on: shadPS4's own switch goes off too.
    userdata.save_shadnet(shad_files, 1001, "Player_1", "secret", "me@example.com", False, "192.168.1.20:31313")
    assert not userdata.shadnet_on(userdata.read_config(shad_files))


def test_saving_shadnet_before_shadps4_ran_or_for_no_user(tmp_path, shad_files):
    with pytest.raises(userdata.UserDataError, match="has not run yet"):
        userdata.save_shadnet(tmp_path / "none", 1000, "Player_1", "x", "", True, "srv:1")
    with pytest.raises(userdata.UserDataError, match="no user 5"):
        userdata.save_shadnet(shad_files, 5, "Player_1", "x", "", True, "srv:1")
    (shad_files / "users.json").write_text("{not json")
    with pytest.raises(userdata.UserDataError, match="could not be read"):
        userdata.save_shadnet(shad_files, 1000, "Player_1", "x", "", True, "srv:1")


def test_shadnet_in_the_network_section(shad_files):
    """shadPS4 0.20.0 keeps shadNet's settings in Network and takes them from General only while Network does not
    have them; once it saved its config, General has none."""
    config = json.loads((shad_files / "config.json").read_text())
    assert userdata.shadnet_server({"General": {"shadnet_server": "old:1"}, "Network": {}}) == "old:1"
    general = config["General"]
    config["Network"] = {"connected_to_network": False, "shad_net_enabled": general.pop("shad_net_enabled"),
                         "shadnet_server": general.pop("shadnet_server"), "p2p_port": 3658}
    (shad_files / "config.json").write_text(json.dumps(config, indent=2))
    userdata.save_shadnet(shad_files, 1000, "Player_1", "secret", "", True, "192.168.1.20:31313")
    saved = json.loads((shad_files / "config.json").read_text())
    config["Network"].update(shad_net_enabled=True, shadnet_server="192.168.1.20:31313")
    assert saved == config and "shadnet_server" not in saved["General"]
    assert userdata.shadnet_on(saved) and userdata.shadnet_server(saved) == "192.168.1.20:31313"


def test_whether_shadps4_runs(tmp_path):
    for pid, name in (("1", "systemd"), ("20", "bash"), ("self", "python3")):
        (tmp_path / pid).mkdir()
        (tmp_path / pid / "comm").write_text(name + "\n")
    assert not userdata.shadps4_running(tmp_path)
    for name in ("shadps4", "Shadps4-sdl.App"):                                   # the program, or its AppImage
        (tmp_path / "30").mkdir(exist_ok=True)
        (tmp_path / "30" / "comm").write_text(name + "\n")
        assert userdata.shadps4_running(tmp_path)
