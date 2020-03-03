#!/bin/sh

# EXIT ON ERROR
set -e

# FETCH MASTER
git fetch -q origin master

# GET MASTER MANIFEST VERSION
MASTER_VERSION=$(git show origin/master:manifest.json | jq -r  '.version')

# GET BRANCH MANIFEST VERSION
BRANCH_VERSION=$(jq -r  '.version' manifest.json)

# COMPARE VERSIONS
LOWER_VERSION=$(printf '%s\n' "$BRANCH_VERSION" "$MASTER_VERSION" | sort -V | head -n1)

echo "$MASTER_VERSION -> $BRANCH_VERSION"

if [ "$BRANCH_VERSION" = "$LOWER_VERSION" ]; then
    echo "Please bump the version inside manifest.json"
    exit 1;
else
    echo "Manifest version was bumped."
fi