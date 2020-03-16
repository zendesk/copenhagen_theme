#!/bin/sh

# EXIT ON ERROR
set -e

# UPDATE MANIFEST VERSION
NEW_VERSION=$1
mv manifest.json manifest.temp.json
jq -r '.version |= "'${NEW_VERSION}'"' manifest.temp.json > manifest.json
rm manifest.temp.json