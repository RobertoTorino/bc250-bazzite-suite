# SPDX-License-Identifier: GPL-3.0-or-later
from __future__ import annotations

import pytest

from bc250_portal import MANIFEST
from bc250_portal.manifest import ManifestError, load, parse, parse_checkout
from conftest import SUITE

MINIMAL = """
[apps.cu-bisect]
name = "CU"
summary = "s"
tag = "cu-bisect-v1.2.3"
install = ["bash a.sh"]
uninstall = ["bash b.sh"]
detect = ["~/.local/bin/x"]
launch = [["Bisect", "~/.local/bin/x"], ["Unlock", "~/.local/bin/y"]]

[apps.bazzite-test]
name = "BT"
summary = "s"
tag = "bazzite-test-v0.1.0"
required = true
install = ["bash install.sh"]
uninstall = ["bash install.sh --uninstall"]
detect = ["~/.local/bin/bt"]
"""


def test_required_first_then_file_order():
    entries = parse(MINIMAL)
    assert [e.key for e in entries] == ["bazzite-test", "cu-bisect"]
    cu = entries[1]
    assert (cu.version, cu.asset) == ("1.2.3", "cu-bisect-v1.2.3.tar.gz")
    assert cu.launch == (("Bisect", "~/.local/bin/x"), ("Unlock", "~/.local/bin/y"))
    assert not cu.required and not cu.changes_board and cu.sha256 == ""


@pytest.mark.parametrize("change, message", [
    (('tag = "cu-bisect-v1.2.3"', 'tag = "cores-bisect-v1.2.3"'), "is not cu-bisect-v"),
    (('tag = "cu-bisect-v1.2.3"', 'tag = "cu-bisect-v1.2"'), "is not cu-bisect-v"),
    (('install = ["bash a.sh"]', 'install = []'), "must not be empty"),
    (('install = ["bash a.sh"]', 'install = "bash a.sh"'), "list of non-empty strings"),
    (('launch = [["Bisect", "~/.local/bin/x"], ["Unlock", "~/.local/bin/y"]]', 'launch = [["Bisect"]]'), "pairs"),
    (("required = true", "required = false"), "required app"),
    (('name = "CU"', 'name = ""'), "non-empty name"),
])
def test_rejects(change, message):
    with pytest.raises(ManifestError, match=message):
        parse(MINIMAL.replace(*change, 1))


def test_short_name_for_the_tile():
    assert parse(MINIMAL)[1].short == ""
    assert parse(MINIMAL.replace('name = "CU"', 'name = "CU"\nshort = "C-U"', 1))[1].short == "C-U"
    with pytest.raises(ManifestError, match="short must be a string"):
        parse(MINIMAL.replace('name = "CU"', 'name = "CU"\nshort = 1', 1))


def test_bad_sha_and_toml():
    with pytest.raises(ManifestError, match="sha256"):
        parse(MINIMAL.replace('summary = "s"\ntag = "cu', 'summary = "s"\nsha256 = "abc"\ntag = "cu', 1))
    with pytest.raises(ManifestError, match="not valid TOML"):
        parse("[apps")


def test_shipped_manifest_lists_every_app_with_bazzite_test_first():
    entries = load(MANIFEST)
    assert entries[0].key == "bazzite-test" and entries[0].required
    assert sum(e.required for e in entries) == 1
    apps = {p.name for p in (SUITE / "apps").iterdir() if p.is_dir() and not (p / ".standalone").is_file()}
    assert {e.key for e in entries} == apps


def test_shipped_manifest_install_scripts_exist():
    for entry in load(MANIFEST):
        for command in (*entry.install, *entry.uninstall):
            script = command.split()[-1] if command.split()[-1].endswith(".sh") else \
                [w for w in command.split() if w.endswith(".sh")][0]
            assert (SUITE / "apps" / entry.key / script).is_file(), f"{entry.key}: {command}"


def test_board_changing_apps_are_marked():
    marked = {e.key for e in load(MANIFEST) if e.changes_board}
    assert {"cu-bisect", "cores-bisect", "gpu-oc-bisect", "persistent-acpi", "governor"} <= marked
    assert "bazzite-test" not in marked


CHECKOUT = """
[checkout.gui]
name = "GUI"
summary = "s"
install = ["bash install.sh"]
uninstall = ["bash install.sh --uninstall"]
detect = ["~/.local/bin/gui"]
"""


def test_checkout_tables_are_development_apps_in_a_folder():
    (gui,) = parse_checkout(MINIMAL + CHECKOUT)
    assert gui.checkout_only and gui.development and gui.tag == "" and gui.version == ""
    assert gui.folder == "apps/gui"                                         # the default
    (moved,) = parse_checkout(CHECKOUT.replace('summary = "s"', 'summary = "s"\nfolder = "tools/x/gui"'))
    assert moved.folder == "tools/x/gui"
    assert [e.key for e in parse(MINIMAL + CHECKOUT)] == ["bazzite-test", "cu-bisect"]   # never pinned


@pytest.mark.parametrize("extra, message", [
    ('tag = "gui-v0.1.0"', "never released"),
    ('folder = "../outside"', "inside the checkout"),
    ('folder = "/abs"', "inside the checkout"),
])
def test_checkout_tables_reject(extra, message):
    with pytest.raises(ManifestError, match=message):
        parse_checkout(CHECKOUT.replace('summary = "s"', f'summary = "s"\n{extra}'))


def test_folder_only_for_checkout_tables():
    with pytest.raises(ManifestError, match="only for"):
        parse(MINIMAL.replace('summary = "s"\ntag = "cu', 'summary = "s"\nfolder = "x"\ntag = "cu', 1))
