# SPDX-License-Identifier: GPL-3.0-or-later
"""RPCS3's own folder (userdata.py): vfs.yml and games.yml as RPCS3 0.0.43 writes them, its drives where they were
moved, and the firmware's version as RPCS3 shows it."""

from __future__ import annotations

from conftest import write_rpcs3_files

from bc250_rpcs3_manager import userdata


def test_rpcs3s_folder_follows_xdg_config_home(tmp_path):
    assert userdata.rpcs3_home() == tmp_path / "config" / "rpcs3"


def test_vfs_yml_and_the_default_drives(rpcs3_files):
    vfs = userdata.read_map(rpcs3_files / "vfs.yml")
    assert vfs["/dev_hdd0/"] == "$(EmulatorDir)dev_hdd0/" and vfs["$(EmulatorDir)"] == ""
    assert "/dev_usb***/" not in vfs and "Path" not in vfs                       # the nested map is left out
    assert userdata.drive(rpcs3_files, vfs, "/dev_hdd0/") == rpcs3_files / "dev_hdd0"
    assert userdata.drive(rpcs3_files, vfs, "/dev_flash/") == rpcs3_files / "dev_flash"
    assert userdata.drive(rpcs3_files, {}, "/games/") == rpcs3_files / "games"     # no vfs.yml: RPCS3's defaults


def test_drives_moved_elsewhere(tmp_path):
    home = write_rpcs3_files(tmp_path / "rpcs3", vfs=(
        "$(EmulatorDir): /run/media/ssd/rpcs3\n/dev_hdd0/: '/mnt/games/PS3 hdd0/'\n"
        '/dev_flash/: "$(EmulatorDir)flash/"\n'))
    vfs = userdata.read_map(home / "vfs.yml")
    assert str(userdata.drive(home, vfs, "/dev_hdd0/")) == "/mnt/games/PS3 hdd0"
    assert str(userdata.drive(home, vfs, "/dev_flash/")) == "/run/media/ssd/rpcs3/flash"
    assert str(userdata.drive(home, vfs, "/games/")) == "/run/media/ssd/rpcs3/games"


def test_games_yml(tmp_path):
    home = write_rpcs3_files(tmp_path / "rpcs3", games={"BLUS30443": "/run/media/games/PS3/Demon's Souls/",
                                                        "BLES00932": "'/games/it''s: here/'"})
    assert userdata.known_games(home) == {"BLUS30443": "/run/media/games/PS3/Demon's Souls/",
                                          "BLES00932": "/games/it's: here/"}
    assert userdata.known_games(tmp_path / "none") == {}
    (home / "games.yml").write_bytes(b"\xff\xfe")
    assert userdata.known_games(home) == {}                                       # not text: nothing, no error


def test_the_firmware_version(tmp_path):
    flash = tmp_path / "dev_flash"
    assert userdata.firmware_version(flash) == ""
    version = flash / "vsh" / "etc" / "version.txt"
    version.parent.mkdir(parents=True)
    for text, shown in (("release:04.9200:\nbuild:...", "4.92"), ("release:04.9000:", "4.90"),
                        ("release:04.8900:", "4.89"), ("release:00.3100:", "0.31"), ("nonsense", ""),
                        ("release:x.y:", "")):
        version.write_text(text)
        assert userdata.firmware_version(flash) == shown, text
