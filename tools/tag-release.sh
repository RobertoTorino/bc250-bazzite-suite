#!/usr/bin/env bash
# SPDX-License-Identifier: GPL-3.0-or-later
# Tags release commits and pushes the tags, but only when they can be built: HEAD must hold each tag's version
# (the bump is committed), have no uncommitted changes in that folder, and be pushed to origin/main. A plain
# `git tag` tags whatever HEAD is, also a commit from before the bump, which release.yml then refuses.
#
#   tools/tag-release.sh portal-v0.9.5
#   tools/tag-release.sh governor-v0.1.1 helixsr-v0.2.1
set -euo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")/.."

die() { printf '\033[1;31mERROR:\033[0m %s\n' "$1" >&2; exit 1; }
info() { printf '\033[1;35m==>\033[0m %s\n' "$1"; }

[ $# -gt 0 ] || die "Usage: $0 <name>-v<x.y.z> [...], for example $0 portal-v0.9.5"

for tag in "$@"; do
    [[ $tag =~ ^([a-z0-9-]+)-v([0-9]+\.[0-9]+\.[0-9]+)$ ]] || die "$tag is not <name>-v<x.y.z>."
    name=${BASH_REMATCH[1]} version=${BASH_REMATCH[2]}
    if [ "$name" = portal ]; then dir=portal; else dir=apps/$name; fi
    [ -f "$dir/VERSION" ] || die "$tag: there is no $dir/VERSION."
    committed=$(git show "HEAD:$dir/VERSION" 2>/dev/null | tr -d '[:space:]')
    if [ "$committed" != "$version" ]; then
        if [ "$(tr -d '[:space:]' <"$dir/VERSION")" = "$version" ]; then
            die "$tag: the bump to $version is not committed yet (HEAD has $dir/VERSION $committed). Commit it, push, then run this again."
        fi
        die "$tag: HEAD has $dir/VERSION $committed, not $version."
    fi
    git diff --quiet HEAD -- "$dir" ||
        die "$tag: $dir has changes that are not committed (git status $dir). Commit them first: the tag gets only what is committed."
    git rev-parse -q --verify "refs/tags/$tag" >/dev/null &&
        die "$tag exists already. To move it: git tag -d $tag && git push origin :refs/tags/$tag"
done

git fetch -q origin main || die "Could not reach origin to check that HEAD is pushed."
git merge-base --is-ancestor HEAD origin/main ||
    die "HEAD ($(git rev-parse --short HEAD)) is not on origin/main yet: git push first, then run this again."

for tag in "$@"; do
    git tag "$tag"
    git push -q origin "$tag"
    info "Tagged $(git rev-parse --short HEAD) as $tag and pushed it: release.yml builds it now."
done
