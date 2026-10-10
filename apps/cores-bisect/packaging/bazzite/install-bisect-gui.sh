#!/usr/bin/env bash
# SPDX-License-Identifier: GPL-3.0-or-later

# Self-install for Bazzite (and any other immutable/rpm-ostree-based desktop): sets up
# bc250_cores_bisect_gui in a private venv under ~/.local, with a launcher, .desktop entry and
# icon. Nothing here touches rpm-ostree or needs root - the GUI itself only assembles a command
# line and starts bc250-cores-bisect.sh in a terminal, same as running it by hand (see the manual).
#
# Names are distinct from the unlock GUI (bc250-cores-unlock-gui), so both can be installed.
#
# Usage: run from inside a clone (or release archive) of this repo:
#   bash packaging/bazzite/install-bisect-gui.sh
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

for f in bc250_cores_bisect_gui/__main__.py bc250-cores-bisect.sh images/bc250-cores-bisect.png requirements.txt VERSION; do
  if [ ! -e "$REPO_ROOT/$f" ]; then
    echo "error: $f not found under $REPO_ROOT - run this from a clone of bc250-cores-bisect" >&2
    exit 1
  fi
done

DATA_HOME="${XDG_DATA_HOME:-$HOME/.local/share}"
BIN_HOME="${XDG_BIN_HOME:-$HOME/.local/bin}"
APP_DIR="$DATA_HOME/bc250-cores-bisect-gui"
APP_SRC="$APP_DIR/app"
VENV_DIR="$APP_DIR/venv"
LAUNCHER="$BIN_HOME/bc250-cores-bisect-gui"
DESKTOP_FILE="$DATA_HOME/applications/bc250-cores-bisect.desktop"
ICON_DIR="$DATA_HOME/icons/hicolor/512x512/apps"
ICON_FILE="$ICON_DIR/bc250-cores-bisect.png"

echo "==> Copying app files to $APP_SRC"
rm -rf "$APP_SRC"
mkdir -p "$APP_SRC/images"
cp -R "$REPO_ROOT/bc250_cores_bisect_gui" "$APP_SRC/"
rm -rf "$APP_SRC/bc250_cores_bisect_gui/__pycache__"
cp "$REPO_ROOT/bc250-cores-bisect.sh" "$APP_SRC/bc250-cores-bisect.sh"
chmod +x "$APP_SRC/bc250-cores-bisect.sh"
cp "$REPO_ROOT/requirements.txt" "$REPO_ROOT/VERSION" "$APP_SRC/"
cp "$REPO_ROOT/images/bc250-cores-bisect.png" "$APP_SRC/images/"

echo "==> Creating venv in $VENV_DIR"
python3 -m venv "$VENV_DIR"
"$VENV_DIR/bin/pip" install --quiet --upgrade pip
"$VENV_DIR/bin/pip" install --quiet -r "$APP_SRC/requirements.txt"

echo "==> Checking PyQt6 can actually be imported in this venv"
if ! "$VENV_DIR/bin/python" -c "from PyQt6.QtWidgets import QApplication" 2>"$APP_DIR/import-check.log"; then
  echo "error: PyQt6 installed but failed to import - see $APP_DIR/import-check.log" >&2
  echo "       this is usually a missing system Qt/X11 library (e.g. libxcb-cursor0)." >&2
  cat "$APP_DIR/import-check.log" >&2
  exit 1
fi
rm -f "$APP_DIR/import-check.log"

echo "==> Installing launcher: $LAUNCHER"
mkdir -p "$BIN_HOME"
cat > "$LAUNCHER" <<EOF
#!/usr/bin/env bash
# Launched from a menu there is no terminal to see a crash on, so stdout/stderr always go to a log
# file too - check it first if the app ever fails to start (e.g. a bouncing launcher icon that
# never shows a window).
LOG="$APP_DIR/launch.log"
cd "$APP_SRC" && exec "$VENV_DIR/bin/python" -m bc250_cores_bisect_gui --script "$APP_SRC/bc250-cores-bisect.sh" "\$@" >"\$LOG" 2>&1
EOF
chmod +x "$LAUNCHER"

echo "==> Installing desktop entry and icon"
mkdir -p "$(dirname "$DESKTOP_FILE")" "$ICON_DIR"
cp "$REPO_ROOT/images/bc250-cores-bisect.png" "$ICON_FILE"
# Use the icon's absolute path rather than the bare theme name: Bazzite's gamescope/Big Picture
# session (and some freshly-logged-in desktop sessions) look up app icons before the hicolor
# icon cache is rebuilt, which otherwise leaves a blank placeholder in the launcher.
sed -e "s#^Exec=.*#Exec=$LAUNCHER#" -e "s#^Icon=.*#Icon=$ICON_FILE#" \
  "$REPO_ROOT/packaging/common/bc250-cores-bisect.desktop" > "$DESKTOP_FILE"

command -v update-desktop-database >/dev/null 2>&1 && update-desktop-database "$DATA_HOME/applications" >/dev/null 2>&1 || true
command -v gtk-update-icon-cache >/dev/null 2>&1 && gtk-update-icon-cache -f -t "$DATA_HOME/icons/hicolor" >/dev/null 2>&1 || true
command -v kbuildsycoca6 >/dev/null 2>&1 && kbuildsycoca6 --noincremental >/dev/null 2>&1 || true
command -v kbuildsycoca5 >/dev/null 2>&1 && kbuildsycoca5 --noincremental >/dev/null 2>&1 || true

cat <<EOF

Done. BC-250 Cores Bisect setup GUI is installed for your user account only:
  - app + venv: $APP_DIR
  - launcher:   $LAUNCHER
  - menu entry: $DESKTOP_FILE

Launch it from your app menu, or run: $LAUNCHER
If it ever fails to open (e.g. a bouncing launcher icon that never shows a window), check:
  $APP_DIR/launch.log
To remove it again: bash "$SCRIPT_DIR/uninstall-bisect-gui.sh"
EOF
