#!/usr/bin/env bash
set -euo pipefail

# ── Bun ──────────────────────────────────────────────────────────────────────
# Install via the official installer (downloads binary from GitHub Releases).
# The oven-sh GHCR devcontainer feature is NOT used: a feature pull failure is
# fatal to the entire container build before any feature installs.
# npm install -g bun is NOT used: it would run a postinstall script, defeating
# the supply chain hardening that is the whole point of adopting bun.
echo ""
echo "── Installing bun ──"
if ! command -v bun &>/dev/null; then
  curl -fsSL https://bun.sh/install | bash
  export PATH="$HOME/.bun/bin:$PATH"
fi

# ── Clean stale git LFS hooks ─────────────────────────────────────────────────
# The base image has no git-lfs and no LFS attributes are declared.
echo ""
echo "── Cleaning stale git LFS hooks ──"
grep -qr 'filter=lfs' .gitattributes 2>/dev/null || \
  rm -f .git/hooks/pre-push .git/hooks/post-commit .git/hooks/post-checkout .git/hooks/post-merge

# ── Git hooks ─────────────────────────────────────────────────────────────────
echo ""
echo "── Wiring versioned git hooks ──"
git config core.hooksPath .devcontainer/hooks
chmod +x .devcontainer/hooks/*
