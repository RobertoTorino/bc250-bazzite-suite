#!/usr/bin/env bash
# SPDX-License-Identifier: GPL-3.0-or-later
# End to end from release tarballs: build the bazzite-test, governor and portal releases with build_release.py,
# install the portal from its tarball (which installs the bundled bazzite-test release build), and let the
# portal's release code fetch and verify the governor release the way it would from GitHub.
# Runs with the shims from shims.sh (CI, or WSL on Windows).
set -u
SUITE=$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)
T=/tmp/bc250-release-test
# shellcheck source=tools/installer-tests/shims.sh
source "$(dirname "${BASH_SOURCE[0]}")/shims.sh" "$T"; set +e
fail=0
check() { if eval "$2"; then echo "  ok   $1"; else echo "  FAIL $1"; fail=1; fi; }
D=$XDG_DATA_HOME
ver() { tr -d '[:space:]' < "$SUITE/$1/VERSION"; }
BT="bazzite-test-v$(ver apps/bazzite-test)"; GOV="governor-v$(ver apps/governor)"; PORTAL="portal-v$(ver portal)"
export SOURCE_DATE_EPOCH=1790000000

echo "== 1. build the releases"
mkdir -p "$T/dist"
for tag in "$BT" "$GOV"; do
    /usr/bin/python3 "$SUITE/tools/build_release.py" "$tag" "$T/build-$tag" > "$T/build.log" 2>&1 || { cat "$T/build.log"; fail=1; }
    cp "$T/build-$tag/$tag.tar.gz" "$T/dist/"
done
/usr/bin/python3 "$SUITE/tools/build_release.py" "$PORTAL" "$T/build-portal" --bundle "$T/build-$BT" > "$T/build.log" 2>&1 || { cat "$T/build.log"; fail=1; }
cat "$T/build-$BT/SHA256SUMS" "$T/build-$GOV/SHA256SUMS" > "$T/dist/SHA256SUMS"
check "three tarballs" "[ -f $T/dist/$BT.tar.gz ] && [ -f $T/dist/$GOV.tar.gz ] && [ -f $T/build-portal/$PORTAL.tar.gz ]"
check "sums verify" "(cd $T/dist && sha256sum --check --quiet SHA256SUMS) && (cd $T/build-portal && sha256sum --check --quiet SHA256SUMS)"

echo "== 2. install the portal from its tarball"
mkdir -p "$T/dl" && tar -xzf "$T/build-portal/$PORTAL.tar.gz" -C "$T/dl"
check "install.sh executable in the tarball" "[ -x $T/dl/$PORTAL/install.sh ] && [ -x $T/dl/$PORTAL/bundled/$BT/install.sh ]"
(cd /tmp && "$T/dl/$PORTAL/install.sh" > "$T/install.log" 2>&1); rc=$?
check "exit 0" "[ $rc -eq 0 ]"
check "bazzite-test is a release build" "[ -f $T/opt/bc250-bazzite-test/bc250_gui/_build_info.py ]"
check "its engine hash matches" "grep -q \"\$(sha256sum < $T/opt/bc250-bazzite-test/test-bazzite.sh | cut -d' ' -f1)\" $T/opt/bc250-bazzite-test/bc250_gui/_build_info.py"
check "no 'not a release build' note" "! grep -q 'not a release build' $T/install.log"
check "record has the bundled tag" "grep -q \"\\\"bazzite-test\\\": \\\"$BT\\\"\" $D/bc250-bazzite-suite/portal/installed.json"
check "portal from the release" "[ -f $T/opt/bc250-bazzite-suite/bc250_core/__init__.py ] && [ ! -d $T/opt/bc250-bazzite-suite/bundled ]"

echo "== 3. the installed portal fetches and verifies the governor release"
cat > "$T/fetch.py" <<'PY'
import shutil, sys
from pathlib import Path
from bc250_portal import MANIFEST
from bc250_portal.manifest import load
from bc250_portal.sources import Sources, SourceError
dist = Path(sys.argv[1])
def download(url, dest):                     # serve the "GitHub release" from the dist folder
    shutil.copy(dist / url.rsplit("/", 1)[1], dest)
entry = next(e for e in load(MANIFEST) if e.key == "governor")
folder = Sources(Path(sys.argv[2]), download=download).prepare(entry)
print(folder)
assert (folder / "install.sh").is_file() and (folder / "bc250_governor" / "__main__.py").is_file()
data = bytearray((dist / entry.asset).read_bytes())
data[len(data) // 2] ^= 0xFF                                                       # tamper
(dist / entry.asset).write_bytes(bytes(data))
try:
    Sources(Path(sys.argv[2]) / "again", download=download).prepare(entry)
except SourceError as exc:
    print("refused:", exc)
else:
    sys.exit("a tampered tarball was accepted")
PY
PYTHONPATH="$T/opt/bc250-bazzite-suite" /usr/bin/python3 "$T/fetch.py" "$T/dist" "$T/work" > "$T/fetch.log" 2>&1; rc=$?
check "fetched, verified, unpacked; tampered copy refused" "[ $rc -eq 0 ] && grep -q 'refused:' $T/fetch.log"
check "governor installer runs from the fetched folder" "(cd $T/work/$GOV && bash install.sh --help >/dev/null 2>&1)"

[ $fail -eq 0 ] && echo "ALL OK" || for l in "$T"/*.log; do echo "--- $l"; cat "$l"; done
exit $fail
