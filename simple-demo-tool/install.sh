#!/usr/bin/env bash
# SPDX-License-Identifier: GPL-3.0-or-later
# Install or remove Simple Demo Tool for the current user.
set -euo pipefail

APP_ID="simple-demo-tool"
DATA_DIR="${XDG_DATA_HOME:-$HOME/.local/share}"
APP_DIR="$DATA_DIR/$APP_ID"
LAUNCHER="$HOME/.local/bin/$APP_ID"
MENU_ENTRY="$DATA_DIR/applications/$APP_ID.desktop"
DESKTOP_DIR=$(xdg-user-dir DESKTOP 2>/dev/null || echo "$HOME/Desktop")
DESKTOP_ICON="$DESKTOP_DIR/$APP_ID.desktop"
SRC=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd -P)

info() { printf '\033[1;35m==>\033[0m %s\n' "$1"; }
die() { printf '\033[1;31mERROR:\033[0m %s\n' "$1" >&2; exit 1; }

[ "$(id -u)" -ne 0 ] || die "Run this as your own user, not with sudo."
case "${1:-}" in
    "") ;;
    --uninstall)
        info "Removing Simple Demo Tool"
        rm -f "$LAUNCHER" "$MENU_ENTRY" "$DESKTOP_ICON"
        rm -rf -- "$APP_DIR"
        command -v update-desktop-database >/dev/null 2>&1 &&
            update-desktop-database -q "$DATA_DIR/applications" || true
        info "Simple Demo Tool is uninstalled."
        exit 0
        ;;
    -h|--help)
        printf 'Usage: %s [--uninstall]\n' "$0"
        exit 0
        ;;
    *)
        die "Unknown option: $1 (use --help)."
        ;;
esac

[ "$(uname -s)" = Linux ] || die "Simple Demo Tool runs on Linux (Bazzite) only."
[ -f "$SRC/VERSION" ] && [ -f "$SRC/requirements.txt" ] &&
    [ -f "$SRC/simple_demo_tool/__main__.py" ] &&
    [ -f "$SRC/images/simple-demo-tool.png" ] &&
    [ -f "$SRC/images/simple-demo-tool-128.png" ] ||
    die "Run install.sh from the complete Simple Demo Tool folder."
command -v python3 >/dev/null 2>&1 || die "python3 is not installed."
python3 -c 'import sys; raise SystemExit(sys.version_info < (3, 11))' ||
    die "Python 3.11 or newer is required."

info "Installing app files in $APP_DIR"
mkdir -p "$APP_DIR" "$HOME/.local/bin" "$DATA_DIR/applications" "$DESKTOP_DIR"
rm -rf -- "$APP_DIR/simple_demo_tool"
cp -R "$SRC/simple_demo_tool" "$APP_DIR/simple_demo_tool"
rm -rf -- "$APP_DIR/images"
cp -R "$SRC/images" "$APP_DIR/images"
cp "$SRC/requirements.txt" "$APP_DIR/requirements.txt"

VENV="$APP_DIR/venv"
if [ ! -x "$VENV/bin/python" ]; then
    python3 -m venv "$VENV" || die "Could not create the app's Python venv."
fi
info "Installing PyQt6 and the OBS WebSocket client in the app's own venv"
"$VENV/bin/python" -m pip install --disable-pip-version-check -r "$APP_DIR/requirements.txt"
"$VENV/bin/python" -c 'import PyQt6.QtWidgets, PyQt6.QtMultimedia, PyQt6.QtMultimediaWidgets, obsws_python, dbus_next' ||
    die "The app dependencies did not import successfully."

cat >"$LAUNCHER" <<EOF
#!/usr/bin/env bash
cd "$APP_DIR" || exit 1
exec "$VENV/bin/python" -m simple_demo_tool "\$@"
EOF
chmod 755 "$LAUNCHER"

DESKTOP_CONTENT="[Desktop Entry]
Type=Application
Version=1.0
Name=Simple Demo Tool
GenericName=Screen recording helper
Comment=Prepare and record a portal installation demo
Exec="$LAUNCHER"
Icon=$APP_DIR/images/simple-demo-tool.png
Terminal=false
Categories=Utility;AudioVideo;
Keywords=OBS;recording;Bazzite;demo;
StartupNotify=true"
printf '%s\n' "$DESKTOP_CONTENT" >"$MENU_ENTRY"
chmod 644 "$MENU_ENTRY"
printf '%s\n' "$DESKTOP_CONTENT" >"$DESKTOP_ICON"
chmod 755 "$DESKTOP_ICON"
command -v gio >/dev/null 2>&1 && gio set "$DESKTOP_ICON" metadata::trusted true 2>/dev/null || true
command -v update-desktop-database >/dev/null 2>&1 &&
    update-desktop-database -q "$DATA_DIR/applications" || true
info "Simple Demo Tool is installed. Start it from the desktop or app menu."
