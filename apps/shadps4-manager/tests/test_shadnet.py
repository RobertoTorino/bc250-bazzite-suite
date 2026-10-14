# SPDX-License-Identifier: GPL-3.0-or-later
"""shadNet's protocol (shadnet.py) against a fake server: the requests as shadPS4 0.19.0 sends them, the answers and
errors, a server that is not shadNet or another version, and the server address and name rules."""

from __future__ import annotations

import pytest
from conftest import FakeShadNet

from bc250_shadps4_manager import shadnet
from bc250_shadps4_manager.shadnet import Server, ShadNetError

SERVER = Server("srv.example", 31313)


def test_create_an_account():
    fake = FakeShadNet()
    shadnet.create_account(SERVER, "Player_1", "pässword", "me@example.com", connect=fake.connect)
    assert fake.addresses == [("srv.example", 31313)]
    # Without a key none is sent, as protobuf leaves out an empty field.
    assert fake.requests == [(shadnet.CREATE, {1: "Player_1", 2: "pässword", 4: "me@example.com"})]
    keyed = FakeShadNet()
    shadnet.create_account(SERVER, "Player_1", "x", "me@example.com", "s3cret", connect=keyed.connect)
    assert keyed.requests[0][1][5] == "s3cret"


@pytest.mark.parametrize("error, says", [(23, "registration key"), (11, "name is taken"),
                                         (13, "email address exists"), (99, "error 99")])
def test_the_server_refuses_an_account(error, says):
    with pytest.raises(ShadNetError, match=says):
        shadnet.create_account(SERVER, "Player_1", "x", "me@example.com", connect=FakeShadNet(error).connect)


def test_try_a_sign_in():
    fake = FakeShadNet()
    shadnet.try_sign_in(SERVER, "Player_1", "secret", connect=fake.connect)
    assert fake.requests == [(shadnet.LOGIN, {1: "Player_1", 2: "secret"})]
    with pytest.raises(ShadNetError, match="password is wrong"):
        shadnet.try_sign_in(SERVER, "Player_1", "nope", connect=FakeShadNet(8).connect)


def test_not_shadnet_another_version_or_no_server():
    with pytest.raises(ShadNetError, match="not a shadNet server"):
        shadnet.try_sign_in(SERVER, "Player_1", "x", connect=FakeShadNet(first=1).connect)
    with pytest.raises(ShadNetError, match="another shadNet version"):
        shadnet.try_sign_in(SERVER, "Player_1", "x", connect=FakeShadNet(version=2).connect)

    def refused(address, timeout):
        raise ConnectionRefusedError(111, "Connection refused")
    with pytest.raises(ShadNetError, match="could not be reached: Connection refused"):
        shadnet.try_sign_in(SERVER, "Player_1", "x", connect=refused)


def test_a_packet_as_shadps4_builds_it():
    assert shadnet.packet(shadnet.LOGIN, 1, b"\x0a\x01a") == (
        b"\x00" + b"\x00\x00" + (15 + 4 + 3).to_bytes(4, "little") + (1).to_bytes(8, "little")
        + (3).to_bytes(4, "little") + b"\x0a\x01a")


def test_server_address_and_name():
    assert shadnet.parse_server("srv.shadps4.net:31313") == Server("srv.shadps4.net", 31313)
    assert shadnet.parse_server(" 192.168.1.20 ") == Server("192.168.1.20", 31313)
    for wrong in ("", ":31313", "host:port", "host:70000", "my host:31313"):
        with pytest.raises(ShadNetError):
            shadnet.parse_server(wrong)
    assert shadnet.check_npid("Player_1") == "" and shadnet.check_npid("a-b") == ""
    assert shadnet.check_npid("ab") and shadnet.check_npid("seventeen_letters") and shadnet.check_npid("a b c")
