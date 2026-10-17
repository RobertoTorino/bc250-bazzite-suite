#!/usr/bin/env bash
# SPDX-License-Identifier: GPL-3.0-or-later
# Exercise apps/helixsr/install.sh: install from the checkout, Desktop icon on and off, a staged release, an
# unknown option, and uninstall, which keeps the imported HelixSR payload. Runs with the shims from shims.sh (CI,
# or WSL on Windows).
set -u
SUITE=$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)
T=/tmp/bc250-helixsr-test
# shellcheck source=tools/installer-tests/shims.sh
source "$(dirname "${BASH_SOURCE[0]}")/shims.sh" "$T"; set +e
fail=0
check() { if eval "$2"; then echo "  ok   $1"; else echo "  FAIL $1"; fail=1; fi; }
D=$XDG_DATA_HOME
APP=bc250-bazzite-helixsr-gui
A=$D/$APP
printf '#!/bin/sh\necho "sudo called: $*" >&2\nexit 1\n' > "$T/shims/sudo"

echo "== 1. install from the suite checkout"
bash "$SUITE/apps/helixsr/install.sh" > "$T/log1" 2>&1; rc=$?
check "exit 0" "[ $rc -eq 0 ]"
check "no sudo used" "! grep -q 'sudo called' $T/log1"
check "app copied" "[ -f $A/helixsr_manager/__main__.py ] && [ -f $A/images/$APP.png ] && [ -f $A/requirements.txt ]"
check "no caches copied" "! find $A -name __pycache__ | grep -q ."
check "own venv" "[ -x $A/venv/bin/python ]"
check "launcher" "grep -qF 'cd \"$A\" && exec \"$A/venv/bin/python\" -m helixsr_manager' $HOME/.local/bin/$APP"
check "launcher executable" "[ -x $HOME/.local/bin/$APP ]"
check "menu entry" "grep -qx 'Exec=$HOME/.local/bin/$APP' $D/applications/$APP.desktop"
check "icon" "[ -f $D/icons/hicolor/512x512/apps/$APP.png ]"
check "desktop icon, executable" "[ -x $HOME/Desktop/$APP.desktop ]"

echo "== 2. reinstall without the Desktop icon"
bash "$SUITE/apps/helixsr/install.sh" --no-desktop-shortcut > "$T/log2" 2>&1; rc=$?
check "exit 0" "[ $rc -eq 0 ]"
check "desktop icon removed" "[ ! -e $HOME/Desktop/$APP.desktop ]"
check "menu entry kept" "[ -f $D/applications/$APP.desktop ]"

echo "== 3. install a staged release over it"
mkdir -p "$A/bc250_bazzite_helixsr"   # a copy installed before the package's rename
rm -rf "$T/stage"; /usr/bin/python3 "$SUITE/tools/stage_app.py" helixsr "$T/stage" > /dev/null
check "manual bundled" "[ -f $T/stage/MANUAL.md ]"
echo "# release marker" >> "$T/stage/helixsr_manager/__init__.py"
mkdir -p "$A/payload" && touch "$A/payload/HelixSR.dll"
bash "$T/stage/install.sh" > "$T/log3" 2>&1; rc=$?
check "exit 0" "[ $rc -eq 0 ]"
check "the release's files used" "grep -q 'release marker' $A/helixsr_manager/__init__.py"
check "the package before the rename removed" "[ ! -e $A/bc250_bazzite_helixsr ]"
check "payload kept" "[ -f $A/payload/HelixSR.dll ]"

echo "== 4. unknown option refused"
bash "$T/stage/install.sh" --bogus > "$T/log4" 2>&1; rc=$?
check "exit non-zero" "[ $rc -ne 0 ]"
check "says why" "grep -q 'unknown option: --bogus' $T/log4"

echo "== 5. uninstall keeps the imported payload"
bash "$T/stage/install.sh" --uninstall > "$T/log5" 2>&1; rc=$?
check "exit 0" "[ $rc -eq 0 ]"
check "app and venv gone" "[ ! -e $A/venv ] && [ ! -e $A/helixsr_manager ] && [ ! -e $A/bc250_bazzite_helixsr ] && [ ! -e $A/images ]"
check "payload kept" "[ -f $A/payload/HelixSR.dll ]"
check "says so" "grep -q 'payload in $A/payload' $T/log5"
check "launcher, menu entry, icons gone" "[ ! -e $HOME/.local/bin/$APP ] && [ ! -e $D/applications/$APP.desktop ] && [ ! -e $D/icons/hicolor/512x512/apps/$APP.png ] && [ ! -e $HOME/Desktop/$APP.desktop ]"
rm -rf "$A/payload"
bash "$T/stage/install.sh" --uninstall > "$T/log5b" 2>&1
check "without a payload the folder goes too" "[ ! -e $A ]"

echo "== 6. refusals, and uninstall --purge"
bash "$T/stage/install.sh" --purge > "$T/log6" 2>&1; rc=$?
check "--purge alone refused" "[ $rc -ne 0 ] && grep -q 'only goes with --uninstall' $T/log6"
fakeroot -- bash "$T/stage/install.sh" > "$T/log6" 2>&1; rc=$?
check "root refused" "[ $rc -ne 0 ] && grep -q 'not with sudo' $T/log6"
bash "$T/stage/install.sh" > "$T/log6" 2>&1
mkdir -p "$A/payload" "$XDG_CONFIG_HOME/$APP"
touch "$A/payload/HelixSR.dll" "$XDG_CONFIG_HOME/$APP/$APP.conf" "$XDG_CONFIG_HOME/$APP/deployments.json"
bash "$T/stage/install.sh" --uninstall --purge > "$T/log6" 2>&1; rc=$?
check "exit 0" "[ $rc -eq 0 ]"
check "payload and settings gone" "[ ! -e $A ] && [ ! -e $XDG_CONFIG_HOME/$APP/$APP.conf ]"
check "the list of deployed games kept" "[ -f $XDG_CONFIG_HOME/$APP/deployments.json ]"

[ $fail -eq 0 ] && echo "ALL OK" || for n in 1 2 3 4 5 6; do echo "--- log$n"; cat "$T/log$n"; done
exit $fail
