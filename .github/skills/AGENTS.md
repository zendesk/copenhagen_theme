# Agent Directives — ARPA-H/skills

## What This Repo Is

Central source of truth for GitHub Copilot agentic skills distributed to all ARPA-H repos via `git subtree`. Read `README.md` for full orientation: how the sync model works, how to subscribe a new consumer repo, and how to author skills.

## Before Making Any Change

- Read `README.md` first.
- Check existing skills (`arpa-h-repo-bootstrap/`, `arpa-h-internal-design/`, `arpa-h-web-design/`) before creating new ones.

## Adding a New Consumer Repo

See `README.md` → "Subscribing a Repo" for both paths (Copilot-assisted and manual).

## Authoring Skills

See `README.md` → "Registering New Skills" for conventions and the required `SKILL.md` frontmatter format.

## Never Do

- Commit secrets, tokens, or connection strings anywhere in this repo.
- Edit skill files in a consumer repo and push them back here without going through the PR review process.
- Remove or rename a skill directory without checking `.github/subtree-consumers.json` — consumers that reference the old prefix will break.
- Use mutable Action tags in workflow files — always pin to a full commit SHA with the tag noted in a comment.

## MCP Servers

- **Figma MCP** (`https://mcp.figma.com/mcp`) is available via the ARPA-H MCP registry and uses **browser OAuth** — never API tokens or `Authorization` headers. To activate: Command Palette → **MCP: List Servers** → start `figma-mcp` → complete the browser OAuth flow. Do not create `.vscode/mcp.json` — it suppresses the registry list in VS Code.

## Commit and PR Format

- Commits: `<type>(<scope>): <subject>` (Conventional Commits)
- PR titles follow the same format.
- Skill changes must include a meaningful description of what changed and why in the PR body.
