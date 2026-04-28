#!/usr/bin/env bash
# Build production assets, then create a zip suitable for Guide Theming Center import.
# Excludes: node_modules, .git, env files, .yarn, coverage, existing zip output.

set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="${1:-$ROOT/azal-theme-pack.zip}"
STAGE="$(mktemp -d)"

cleanup() { rm -rf "$STAGE"; }
trap cleanup EXIT

cd "$ROOT"
NODE_ENV=production yarn build

rsync -a \
  --exclude 'node_modules' \
  --exclude '.git' \
  --exclude '.env' \
  --exclude '.env.*' \
  --exclude 'coverage' \
  --exclude '.DS_Store' \
  --exclude '.cursor' \
  --exclude '.yarn' \
  --exclude 'azal-theme-pack.zip' \
  --exclude '*.zip' \
  "./" "$STAGE/"

( cd "$STAGE" && zip -r -q "$OUT" . )
echo "Pack written: $OUT ($(du -h "$OUT" | cut -f1))"
