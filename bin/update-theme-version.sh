#!/bin/sh

# EXIT ON ERROR
set -e

# UPDATE MANIFEST VERSION
version=$(node -p "require('./package.json').version")
major=0
minor=0
patch=0

# break down the version number into it's components
regex="([0-9]+).([0-9]+).([0-9]+)"
if [[ $version =~ $regex ]]; then
  major="${BASH_REMATCH[1]}"
  minor="${BASH_REMATCH[2]}"
  patch="${BASH_REMATCH[3]}"
fi

# increment minor number
minor=$((minor+1))

NEW_VERSION="${major}.${minor}.${patch}"

mv dist/manifest.json dist/manifest.temp.json
jq -r '.version |= "'${NEW_VERSION}'"' dist/manifest.temp.json > dist/manifest.json
rm dist/manifest.temp.json