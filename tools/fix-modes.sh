#!/usr/bin/env bash
# SPDX-License-Identifier: GPL-3.0-or-later
# Marks every shell script in the git index as executable (mode 100755).
#
# Git for Windows runs with core.fileMode=false, so a script added from Windows is recorded as 100644 and a Linux
# checkout (or a release tarball) gets a script that `./install.sh` cannot run. This sets the bit in the index
# itself, which works the same on Windows and Linux. Run it after `git add`, before committing; CI fails when a
# script is missing the bit. Only the index changes: nothing is committed.
set -euo pipefail
cd "$(git rev-parse --show-toplevel)"

missing=$(git ls-files -s -- '*.sh' | awk '$1 != "100755" { print $4 }')
if [[ -z "$missing" ]]; then
    echo "All tracked .sh files are already executable."
    exit 0
fi
printf '%s\n' "$missing" | tr '\n' '\0' | xargs -0 git update-index --chmod=+x --
printf 'Marked executable:\n%s\n' "$missing"
