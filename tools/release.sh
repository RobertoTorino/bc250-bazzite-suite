#!/usr/bin/env bash
# SPDX-License-Identifier: GPL-3.0-or-later
# Starts the release front end, BC250 Suite Releases (apps/suite-releases), with the dev venv of this OS.
# It only edits files; committing, tagging and pushing stay with you.
#
#   tools/release.sh                              # open it (apps/suite-releases/run.sh)
#   tools/release.sh --list                       # the apps, their tags and what needs a release
#   tools/release.sh --install                    # app menu entry and Desktop icon (apps/suite-releases/install.sh)
#   tools/release.sh --install --no-desktop-shortcut
#   tools/release.sh --uninstall                  # remove them again
set -euo pipefail
APP="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd -P)/apps/suite-releases"
case "${1:-}" in
    --install) shift; exec bash "$APP/install.sh" "$@" ;;
    --uninstall) exec bash "$APP/install.sh" --uninstall ;;
    -h|--help) sed -n '3,10p' "$0" | sed 's/^# \{0,1\}//' ;;
    *) exec bash "$APP/run.sh" "$@" ;;
esac
