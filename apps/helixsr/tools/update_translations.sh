#!/usr/bin/env bash
# SPDX-License-Identifier: GPL-3.0-or-later
# Refresh the translation sources from the code and compile them.
#   tools/update_translations.sh          # update every translations/*.ts (new strings appear as "unfinished") and build the .qm files
#   tools/update_translations.sh de       # also create translations/bc250_bazzite_helixsr_de.ts if it does not exist yet
# Needs pylupdate6 from PyQt6 (in the project's python/ venv or on PATH).
set -euo pipefail
cd "$(dirname "$0")/.."
PY=python3; [ -x python/bin/python ] && PY=python/bin/python
LUPDATE=pylupdate6; [ -x python/bin/pylupdate6 ] && LUPDATE=python/bin/pylupdate6
dir=bc250_bazzite_helixsr/translations
for code in "$@"; do
  f="$dir/bc250_bazzite_helixsr_$code.ts"
  [ -e "$f" ] || printf '<?xml version="1.0" encoding="utf-8"?>\n<!DOCTYPE TS>\n<TS version="2.1" language="%s">\n</TS>\n' "$code" > "$f"
done
for f in "$dir"/bc250_bazzite_helixsr_*.ts; do
  "$LUPDATE" --no-obsolete --no-summary bc250_bazzite_helixsr/*.py -ts "$f"
done
"$PY" tools/compile_translations.py
