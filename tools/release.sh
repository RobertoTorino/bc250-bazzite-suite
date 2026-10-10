#!/usr/bin/env bash
# SPDX-License-Identifier: GPL-3.0-or-later
# Opens the release front end (tools/release_ui.py) with the dev venv of this OS, as ./test.sh picks it.
# It only edits files; committing, tagging and pushing stay with you.
#
#   tools/release.sh                              # open it
#   tools/release.sh --install                    # app menu entry and Desktop icon for this checkout (Linux)
#   tools/release.sh --install --no-desktop-shortcut
#   tools/release.sh --uninstall                  # remove them again
#
# The installed entry starts this script in this checkout, so it always runs the checkout's own tool and edits that
# checkout. It is not part of the portal. Moving the checkout needs --install again.
set -euo pipefail
cd "$(dirname "$0")/.."
REPO=$PWD

APP_ID="bc250-release"
APP_NAME="BC250 Suite Releases"
DATA_DIR="${XDG_DATA_HOME:-$HOME/.local/share}"
LAUNCHER="$HOME/.local/bin/$APP_ID"
MENU_ENTRY="$DATA_DIR/applications/$APP_ID.desktop"
DESKTOP_DIR=$(xdg-user-dir DESKTOP 2>/dev/null || echo "$HOME/Desktop")
DESKTOP_ICON="$DESKTOP_DIR/$APP_ID.desktop"
ICON="$REPO/tools/images/release-ui.png"

info() { printf '\033[1;35m==>\033[0m %s\n' "$1"; }
die()  { printf '\033[1;31mERROR:\033[0m %s\n' "$1" >&2; exit 1; }

find_python() {
    PY=${PYTHON:-}
    [[ -n "$PY" ]] && return
    case "$(uname -s)" in
        MINGW*|MSYS*|CYGWIN*) candidates=(.venv-windows/Scripts/python.exe .venv/Scripts/python.exe) ;;
        *)                    candidates=(.venv-linux/bin/python .venv/bin/python) ;;
    esac
    for candidate in "${candidates[@]}"; do
        [[ -x "$candidate" ]] && PY="$REPO/$candidate" && return
    done
    die "No venv for this OS: see CLAUDE.md or ./test.sh for how to create one."
}

install_entry() {
    local shortcut=$1
    [ "$(uname -s)" = Linux ] || die "--install makes a Linux app menu entry; on Windows run tools/release.sh."
    [ "$(id -u)" -ne 0 ] || die "Run this as your own user, not with sudo."
    [ -x .venv-linux/bin/python ] || [ -x .venv/bin/python ] || [ -n "${PYTHON:-}" ] ||
        info "Note: no .venv-linux yet; create it (see CLAUDE.md) before you start the tool."
    info "Creating the launcher $LAUNCHER"
    mkdir -p "$(dirname "$LAUNCHER")"
    cat >"$LAUNCHER" <<EOF
#!/usr/bin/env bash
# $APP_NAME launcher, written by tools/release.sh --install. Runs the tool of this checkout.
[ -x "$REPO/tools/release.sh" ] || { echo "No checkout in $REPO any more; run tools/release.sh --install again." >&2; exit 1; }
exec "$REPO/tools/release.sh" "\$@"
EOF
    chmod 755 "$LAUNCHER"
    local entry="[Desktop Entry]
Type=Application
Version=1.0
Name=$APP_NAME
GenericName=BC250 Bazzite Suite release tool
Comment=Versions, CHANGELOG entries, pins and portal bumps of a suite release ($REPO)
Exec=$LAUNCHER
Icon=$ICON
Terminal=false
Categories=Development;
Keywords=BC-250;release;version;portal;
StartupNotify=true
StartupWMClass=$APP_ID"
    info "Adding the app menu entry"
    mkdir -p "$(dirname "$MENU_ENTRY")"
    printf '%s\n' "$entry" >"$MENU_ENTRY"
    chmod 644 "$MENU_ENTRY"
    command -v update-desktop-database >/dev/null 2>&1 && update-desktop-database -q "$DATA_DIR/applications" || true
    if $shortcut && [ -d "$DESKTOP_DIR" ]; then
        info "Adding the Desktop icon"
        printf '%s\n' "$entry" >"$DESKTOP_ICON"
        # KDE and GNOME only start Desktop launchers that are executable (GNOME also wants them trusted).
        chmod 755 "$DESKTOP_ICON"
        command -v gio >/dev/null 2>&1 && gio set "$DESKTOP_ICON" metadata::trusted true 2>/dev/null || true
    elif ! $shortcut; then
        rm -f "$DESKTOP_ICON"
    fi
    info "Done. Start \"$APP_NAME\" from the app menu$($shortcut && echo ' or the Desktop'), or run: $APP_ID"
}

uninstall_entry() {
    info "Removing the launcher, the menu entry and the Desktop icon"
    rm -f "$LAUNCHER" "$MENU_ENTRY" "$DESKTOP_ICON"
    command -v update-desktop-database >/dev/null 2>&1 && update-desktop-database -q "$DATA_DIR/applications" || true
    info "$APP_NAME is uninstalled; the checkout and its tools stay."
}

case "${1:-}" in
    --install)
        shortcut=true
        [ "${2:-}" = --no-desktop-shortcut ] && shortcut=false
        install_entry "$shortcut" ;;
    --uninstall) uninstall_entry ;;
    -h|--help) sed -n '3,12p' "$0" | sed 's/^# \{0,1\}//' ;;
    *)
        find_python
        exec "$PY" tools/release_ui.py "$@" ;;
esac
