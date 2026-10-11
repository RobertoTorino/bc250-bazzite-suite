#!/usr/bin/env bash
# SPDX-License-Identifier: GPL-3.0-or-later
# Exercise the dependency checker's install, staged release and uninstall paths with the shared installer shims.
set -u
SUITE=$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)
T=/tmp/bc250-dependency-checker-test
# shellcheck source=tools/installer-tests/shims.sh
source "$(dirname "${BASH_SOURCE[0]}")/shims.sh" "$T"; set +e
fail=0
check() { if eval "$2"; then echo "  ok   $1"; else echo "  FAIL $1"; fail=1; fi; }
D=$XDG_DATA_HOME
APP=bc250-portal-dependency-checker
A=$D/$APP/app
printf '#!/bin/sh\necho "sudo called: $*" >&2\nexit 1\n' > "$T/shims/sudo"

echo "== 1. install from the suite checkout"
bash "$SUITE/apps/dependency-checker/install.sh" > "$T/log1" 2>&1; rc=$?
check "exit 0" "[ $rc -eq 0 ]"
check "no sudo used" "! grep -q 'sudo called' $T/log1 && [ -z \"\$(ls -A $T/opt)\" ]"
check "app copied" "[ -f $A/portal_dependency_checker/__main__.py ] && [ -f $A/images/portal-dependency-checker.png ]"
check "core bundled from checkout" "[ -f $A/bc250_core/theme.py ]"
check "no tests or caches copied" "[ ! -d $A/tests ] && ! find $A -name __pycache__ | grep -q ."
check "shared venv marker" "[ -f $D/bc250-bazzite-suite/venv-users/$APP ]"
check "launcher uses module" "grep -qF ' -m portal_dependency_checker' $HOME/.local/bin/$APP"
check "menu entry" "grep -qx 'Exec=$HOME/.local/bin/$APP' $D/applications/$APP.desktop"

echo "== 2. install a staged release without the Desktop icon"
rm -rf "$T/stage"; /usr/bin/python3 "$SUITE/tools/stage_app.py" dependency-checker "$T/stage" > /dev/null
check "manual bundled" "[ -f $T/stage/MANUAL.md ]"
echo "# release marker" >> "$T/stage/bc250_core/__init__.py"
bash "$T/stage/install.sh" --no-desktop-shortcut > "$T/log2" 2>&1; rc=$?
check "exit 0" "[ $rc -eq 0 ]"
check "the release's own core used" "grep -q 'release marker' $A/bc250_core/__init__.py"
check "desktop icon removed" "[ ! -e $HOME/Desktop/$APP.desktop ]"

echo "== 3. uninstall while another suite app still uses the venv"
touch "$D/bc250-bazzite-suite/venv-users/bc250-bazzite-test"
bash "$T/stage/install.sh" --uninstall > "$T/log3" 2>&1; rc=$?
check "exit 0" "[ $rc -eq 0 ]"
check "app gone and venv kept" "[ ! -e $D/$APP ] && [ -x $D/bc250-bazzite-suite/venv/bin/python ]"
check "own marker gone" "[ ! -e $D/bc250-bazzite-suite/venv-users/$APP ]"

echo "== 4. purge as the last venv user"
rm "$D/bc250-bazzite-suite/venv-users/bc250-bazzite-test"
mkdir -p "$XDG_CONFIG_HOME/$APP" && touch "$XDG_CONFIG_HOME/$APP/$APP.ini"
bash "$SUITE/apps/dependency-checker/install.sh" > "$T/log4" 2>&1 &&
    bash "$SUITE/apps/dependency-checker/install.sh" --uninstall --purge >> "$T/log4" 2>&1; rc=$?
check "exit 0" "[ $rc -eq 0 ]"
check "venv and settings removed" "[ ! -e $D/bc250-bazzite-suite/venv ] && [ ! -e $XDG_CONFIG_HOME/$APP ]"

[ $fail -eq 0 ] && echo "ALL OK" || for n in 1 2 3 4; do echo "--- log$n"; cat "$T/log$n"; done
exit $fail
