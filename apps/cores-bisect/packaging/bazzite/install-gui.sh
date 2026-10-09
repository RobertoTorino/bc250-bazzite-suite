#!/usr/bin/env bash
# Self-install for Bazzite (and any other immutable/rpm-ostree-based desktop): sets up
# bc250_cores_gui in a private venv under ~/.local, with a launcher, .desktop entry and icon.
# Nothing here touches rpm-ostree or needs root - only "Install"/"Uninstall" inside the GUI itself
# run bc250-cores-unlock.sh through sudo, same as the venv steps done by hand in the manual.
#
# Names are distinct from bc250-cu-bisect's GUI (bc250-unlock-gui), so both can be installed.
#
# Usage: run from inside a clone (or release archive) of this repo:
#   bash packaging/bazzite/install-gui.sh
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

for f in bc250_cores_gui/__main__.py bc250-cores-unlock.sh images/bc250-cores-bisect.png requirements.txt VERSION; do
  if [ ! -e "$REPO_ROOT/$f" ]; then
    echo "error: $f not found under $REPO_ROOT - run this from a clone of bc250-cores-bisect" >&2
    exit 1
  fi
done

DATA_HOME="${XDG_DATA_HOME:-$HOME/.local/share}"
BIN_HOME="${XDG_BIN_HOME:-$HOME/.local/bin}"
APP_DIR="$DATA_HOME/bc250-cores-unlock-gui"
APP_SRC="$APP_DIR/app"
VENV_DIR="$APP_DIR/venv"
LAUNCHER="$BIN_HOME/bc250-cores-unlock-gui"
DESKTOP_FILE="$DATA_HOME/applications/bc250-cores-unlock.desktop"
ICON_DIR="$DATA_HOME/icons/hicolor/512x512/apps"
ICON_FILE="$ICON_DIR/bc250-cores-unlock.png"

echo "==> Copying app files to $APP_SRC"
rm -rf "$APP_SRC"
mkdir -p "$APP_SRC/images"
cp -R "$REPO_ROOT/bc250_cores_gui" "$APP_SRC/"
rm -rf "$APP_SRC/bc250_cores_gui/__pycache__"
cp "$REPO_ROOT/bc250-cores-unlock.sh" "$APP_SRC/bc250-cores-unlock.sh"
chmod +x "$APP_SRC/bc250-cores-unlock.sh"
cp "$REPO_ROOT/requirements.txt" "$REPO_ROOT/VERSION" "$APP_SRC/"
cp "$REPO_ROOT/images/bc250-cores-bisect.png" "$APP_SRC/images/"

echo "==> Creating venv in $VENV_DIR"
python3 -m venv "$VENV_DIR"
"$VENV_DIR/bin/pip" install --quiet --upgrade pip
"$VENV_DIR/bin/pip" install --quiet -r "$APP_SRC/requirements.txt"

echo "==> Installing launcher: $LAUNCHER"
mkdir -p "$BIN_HOME"
cat > "$LAUNCHER" <<EOF
#!/usr/bin/env bash
cd "$APP_SRC" && exec "$VENV_DIR/bin/python" -m bc250_cores_gui --script "$APP_SRC/bc250-cores-unlock.sh" "\$@"
EOF
chmod +x "$LAUNCHER"

echo "==> Installing desktop entry and icon"
mkdir -p "$(dirname "$DESKTOP_FILE")" "$ICON_DIR"
cp "$REPO_ROOT/images/bc250-cores-bisect.png" "$ICON_FILE"
# Use the icon's absolute path rather than the bare theme name: Bazzite's gamescope/Big Picture
# session (and some freshly-logged-in desktop sessions) look up app icons before the hicolor
# icon cache is rebuilt, which otherwise leaves a blank placeholder in the launcher.
sed -e "s#^Exec=.*#Exec=$LAUNCHER#" -e "s#^Icon=.*#Icon=$ICON_FILE#" \
  "$REPO_ROOT/packaging/common/bc250-cores-unlock.desktop" > "$DESKTOP_FILE"

command -v update-desktop-database >/dev/null 2>&1 && update-desktop-database "$DATA_HOME/applications" >/dev/null 2>&1 || true
command -v gtk-update-icon-cache >/dev/null 2>&1 && gtk-update-icon-cache -f -t "$DATA_HOME/icons/hicolor" >/dev/null 2>&1 || true

cat <<EOF

Done. BC-250 Cores Unlock is installed for your user account only:
  - app + venv: $APP_DIR
  - launcher:   $LAUNCHER
  - menu entry: $DESKTOP_FILE

Launch it from your app menu, or run: $LAUNCHER
To remove it again: bash "$SCRIPT_DIR/uninstall-gui.sh"
EOF
