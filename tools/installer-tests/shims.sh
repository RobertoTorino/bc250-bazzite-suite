#!/usr/bin/env bash
# SPDX-License-Identifier: GPL-3.0-or-later
# Shims for running the suite installers without root or network (CI, WSL). Usage: source shims.sh <root>
# sudo becomes fakeroot (chown root:root is faked); python3 -m venv makes a stub venv whose pip does nothing.
# Needs fakeroot. Everything happens under <root>: HOME, XDG folders and the /opt replacement.
set -e
ROOT=$1
rm -rf "$ROOT"; mkdir -p "$ROOT/shims" "$ROOT/home/Desktop" "$ROOT/opt"
cat > "$ROOT/shims/sudo" <<'X'
#!/bin/sh
# Pretend root: chown root:root is faked, files stay the test user's.
exec fakeroot -- "$@"
X
cat > "$ROOT/shims/python3" <<'X'
#!/bin/sh
# Real python3, except: venv/ensurepip check passes, and "-m venv DIR" makes a stub venv.
case "$*" in
  *"import venv, ensurepip"*) exit 0 ;;
  "-m venv "*) d=$3; mkdir -p "$d/bin"; cat > "$d/bin/python" <<'Y'
#!/bin/sh
# stub venv python: pip installs and import checks succeed without doing anything
case "$1" in -m|-c) exit 0 ;; esac
exec /usr/bin/python3 "$@"
Y
     chmod +x "$d/bin/python"; exit 0 ;;
esac
exec /usr/bin/python3 "$@"
X
chmod +x "$ROOT/shims/"*
export PATH="$ROOT/shims:$PATH" HOME="$ROOT/home" XDG_DATA_HOME="$ROOT/home/.local/share" \
       XDG_CONFIG_HOME="$ROOT/home/.config" BC250_OPT_DIR="$ROOT/opt"
