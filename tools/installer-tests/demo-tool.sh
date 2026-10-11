#!/usr/bin/env bash
# SPDX-License-Identifier: GPL-3.0-or-later
# Exercise apps/demo-tool/install.sh without network or root; its recording folder survives uninstall.
set -u
SUITE=$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)
T=/tmp/bc250-demo-tool-test
# shellcheck source=tools/installer-tests/shims.sh
source "$(dirname "${BASH_SOURCE[0]}")/shims.sh" "$T"; set +e
fail=0
check() { if eval "$2"; then echo "  ok   $1"; else echo "  FAIL $1"; fail=1; fi; }
APP=simple-demo-tool
L=$HOME/.local/bin/$APP
M=$XDG_DATA_HOME/applications/$APP.desktop
R=$HOME/SimpleVideoToolRecordings
DESKTOP_DIR=$(xdg-user-dir DESKTOP 2>/dev/null || echo "$HOME/Desktop")
I=$DESKTOP_DIR/$APP.desktop

echo "== 1. install"
bash "$SUITE/apps/demo-tool/install.sh" > "$T/install.log" 2>&1; rc=$?
check "exit 0" "[ $rc -eq 0 ]"
check "launcher and menu entry" "[ -x $L ] && grep -qx 'Exec=$L' $M"
check "nested package and icons installed" "[ -f $XDG_DATA_HOME/$APP/simple_demo_tool/__main__.py ] && [ -f $XDG_DATA_HOME/$APP/images/simple-demo-tool.png ]"
check "desktop shortcut" "[ -x $I ]"
check "recordings folder created" "[ -d $R ]"
printf 'keep this recording\n' > "$R/keep.mkv"

echo "== 2. uninstall"
bash "$SUITE/apps/demo-tool/install.sh" --uninstall > "$T/uninstall.log" 2>&1; rc=$?
check "exit 0" "[ $rc -eq 0 ]"
check "app launchers and files removed" "[ ! -e $L ] && [ ! -e $M ] && [ ! -e $I ] && [ ! -e $XDG_DATA_HOME/$APP ]"
check "recordings remain" "[ -f $R/keep.mkv ]"

[ $fail -eq 0 ] && echo "ALL OK" || { cat "$T/install.log" "$T/uninstall.log"; exit 1; }
