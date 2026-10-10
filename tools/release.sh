#!/usr/bin/env bash
# SPDX-License-Identifier: GPL-3.0-or-later
# Opens the release front end (tools/release_ui.py) with the dev venv of this OS, as ./test.sh picks it.
# It only edits files; committing, tagging and pushing stay with you.
set -euo pipefail
cd "$(dirname "$0")/.."

PY=${PYTHON:-}
if [[ -z "$PY" ]]; then
    case "$(uname -s)" in
        MINGW*|MSYS*|CYGWIN*) candidates=(.venv-windows/Scripts/python.exe .venv/Scripts/python.exe) ;;
        *)                    candidates=(.venv-linux/bin/python .venv/bin/python) ;;
    esac
    for candidate in "${candidates[@]}"; do
        [[ -x "$candidate" ]] && PY="$PWD/$candidate" && break
    done
fi
[[ -n "$PY" ]] || { echo "No venv for this OS: see CLAUDE.md or ./test.sh for how to create one." >&2; exit 1; }
exec "$PY" tools/release_ui.py "$@"
