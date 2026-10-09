#!/usr/bin/env bash
# SPDX-License-Identifier: GPL-3.0-or-later
# Exercise portal/install.sh: from the checkout, from a release-shaped tree, uninstall and purge.
set -u
SUITE=$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)
T=/tmp/bc250-portal-test
# shellcheck source=tools/installer-tests/shims.sh
source "$(dirname "${BASH_SOURCE[0]}")/shims.sh" "$T"; set +e
fail=0
check() { if eval "$2"; then echo "  ok   $1"; else echo "  FAIL $1"; fail=1; fi; }
D=$XDG_DATA_HOME
logs=()

echo "== 1. install from the suite checkout"
bash "$SUITE/portal/install.sh" > "$T/log1" 2>&1; rc=$?; logs+=("$T/log1")
check "exit 0" "[ $rc -eq 0 ]"
check "portal in /opt" "[ -f $T/opt/bc250-bazzite-suite/bc250_portal/__main__.py ] && [ -f $T/opt/bc250-bazzite-suite/apps.toml ]"
check "portal symlink" "[ \"\$(readlink $T/opt/bc250-bazzite-suite)\" = bc250-bazzite-suite-v0.1.0 ]"
check "core bundled with portal" "[ -f $T/opt/bc250-bazzite-suite/bc250_core/platform.py ]"
check "no tests in /opt" "[ ! -d $T/opt/bc250-bazzite-suite/tests ]"
check "bazzite-test installed too" "[ -f $T/opt/bc250-bazzite-test/test-bazzite.sh ] && [ -x $HOME/.local/bin/bc250-bazzite-test ]"
check "both venv users" "[ -f $D/bc250-bazzite-suite/venv-users/bc250-bazzite-suite ] && [ -f $D/bc250-bazzite-suite/venv-users/bc250-bazzite-test ]"
check "portal launcher" "grep -qF 'm bc250_portal' $HOME/.local/bin/bc250-bazzite-suite"
check "desktop icons" "[ -x $HOME/Desktop/bc250-bazzite-suite.desktop ] && [ -x $HOME/Desktop/bc250-bazzite-test.desktop ]"
check "record says local" "grep -q '\"bazzite-test\": \"local\"' $D/bc250-bazzite-suite/portal/installed.json"
check "portal imports its bundled core" "(cd $T/opt/bc250-bazzite-suite && /usr/bin/python3 -c 'import bc250_core, os, sys; sys.exit(0 if os.path.abspath(bc250_core.__file__).startswith(\"$T/opt/bc250-bazzite-suite\") else 1)')"
check "manifest parses on Linux python" "(cd $T/opt/bc250-bazzite-suite && /usr/bin/python3 -c 'import tomllib; d=tomllib.load(open(\"apps.toml\",\"rb\")); assert list(d[\"apps\"])[0]==\"bazzite-test\"')"

echo "== 2. release-shaped tree: portal staged + bundled bazzite-test, no desktop icons"
R="$T/release/portal-v0.1.1"; rm -rf "$T/release"; mkdir -p "$T/release"
/usr/bin/python3 "$SUITE/tools/stage_app.py" portal "$R" > /dev/null
/usr/bin/python3 "$SUITE/tools/stage_app.py" bazzite-test "$R/bundled/bazzite-test-v0.1.0" > /dev/null
sed -i 's/^__version__ = "0.1.0"$/__version__ = "0.1.1"/' "$R/bc250_portal/__init__.py"
bash "$R/install.sh" --no-desktop-shortcut > "$T/log2" 2>&1; rc=$?; logs+=("$T/log2")
check "exit 0" "[ $rc -eq 0 ]"
check "new portal version, old removed" "[ \"\$(readlink $T/opt/bc250-bazzite-suite)\" = bc250-bazzite-suite-v0.1.1 ] && [ ! -d $T/opt/bc250-bazzite-suite-v0.1.0 ]"
check "bundled/ not copied to /opt" "[ ! -d $T/opt/bc250-bazzite-suite/bundled ]"
check "record has the bundled tag" "grep -q '\"bazzite-test\": \"bazzite-test-v0.1.0\"' $D/bc250-bazzite-suite/portal/installed.json"
check "desktop icons removed" "[ ! -e $HOME/Desktop/bc250-bazzite-suite.desktop ] && [ ! -e $HOME/Desktop/bc250-bazzite-test.desktop ]"

echo "== 3. uninstall keeps the venv for another suite app"
touch "$D/bc250-bazzite-suite/venv-users/bc250-governor-manager"
bash "$T/opt/bc250-bazzite-suite/install.sh" --uninstall > "$T/log3" 2>&1; rc=$?; logs+=("$T/log3")
check "exit 0" "[ $rc -eq 0 ]"
check "portal and bazzite-test gone from /opt" "[ -z \"\$(ls $T/opt)\" ]"
check "launchers gone" "[ ! -e $HOME/.local/bin/bc250-bazzite-suite ] && [ ! -e $HOME/.local/bin/bc250-bazzite-test ]"
check "venv kept, only governor left" "[ -x $D/bc250-bazzite-suite/venv/bin/python ] && [ \"\$(ls $D/bc250-bazzite-suite/venv-users)\" = bc250-governor-manager ]"
check "mentions what is left" "grep -q 'Still installed: bc250-governor-manager' $T/log3"
check "state kept without --purge" "[ -f $D/bc250-bazzite-suite/portal/installed.json ]"

echo "== 4. reinstall and purge as the last user"
rm "$D/bc250-bazzite-suite/venv-users/bc250-governor-manager"
mkdir -p "$T/log/bc250-bazzite-test" && touch "$T/log/bc250-bazzite-test/bc250-test-results-20260101-000000.log"
bash "$R/install.sh" > "$T/log4" 2>&1 && bash "$T/opt/bc250-bazzite-suite/install.sh" --uninstall --purge >> "$T/log4" 2>&1; rc=$?; logs+=("$T/log4")
check "exit 0" "[ $rc -eq 0 ]"
check "suite data dir gone" "[ ! -e $D/bc250-bazzite-suite ]"
check "bazzite-test results gone" "[ ! -e $T/log/bc250-bazzite-test ]"
check "/opt empty" "[ -z \"\$(ls $T/opt)\" ]"

[ $fail -eq 0 ] && echo "ALL OK" || for l in "${logs[@]}"; do echo "--- $l"; cat "$l"; done
exit $fail
