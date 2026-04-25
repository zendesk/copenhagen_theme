# ARPA-H/skills — Development Plan

## Session: April 25, 2026 — `arpa-h-web-design` skill

### Completed

- [x] Configure Figma MCP server in `.vscode/mcp.json` — OAuth-only, no auth headers
- [x] Add `figma.figma-vscode-extension` to `.devcontainer/devcontainer.json`
- [x] Authenticate Figma MCP via browser OAuth (Command Palette → "MCP: List Servers" → Start)
- [x] Extract full NEXUS Design System from Figma file `ZbjllSrYpVdkdyioGVuNx2`:
  - [x] 37-page file structure
  - [x] 10 color primitive palettes (indigo, cyan, navy, blue, violet, turquoise, pink, cool-grey, green, yellow, red)
  - [x] 23 text styles across Poppins / Public Sans / Roboto Mono
  - [x] 6 effect styles (shadow-1 through shadow-5 + focused state)
  - [x] 4 variable collections (Primitive Colors, Alias Tokens, Spacing, Corner Radius / Typography)
  - [x] 27 components with variant/prop tables
  - [x] Layout & grid conventions (12-column, 8 breakpoints, container widths)
- [x] Create `arpa-h-web-design/SKILL.md` — full NEXUS reference with YAML frontmatter
- [x] Create `arpa-h-web-design/assets/globals.css` — all NEXUS tokens as CSS custom properties
- [x] Create `arpa-h-web-design/assets/components.css` — reference CSS for 9 components
- [x] Create `arpa-h-web-design/assets/tokens.json` — W3C Design Token format
- [x] Copy `arpa-h-web-design/assets/arpa-h.svg` from `arpa-h-internal-design` skill
- [x] Download 24 WOFF2 font files (Poppins 300–700, Public Sans 300–700, Roboto Mono 400–500, latin + latin-ext)
- [x] Create `arpa-h-web-design/assets/fonts/fonts.css` — self-hosted `@font-face` declarations
- [x] Download authentic `@uswds/uswds` `sprite.svg` (245 icons, 71KB) from unpkg CDN
- [x] Document upstream vs. offline guidance in SKILL.md Assets section — native stacks use USWDS for sprite/Public Sans/Roboto Mono; only Poppins is NEXUS-only
- [x] Register `arpa-h-web-design` in `README.md` Skills Reference section
- [x] Document Figma MCP setup, OAuth flow, Code Connect workaround, and node ID reference in `README.md`
- [x] Confirm no files exceed 1MB — LFS not required
- [x] **`arpa-h-internal-design` parity check** — each skill intentionally maintains its own copy: the two design systems are independent and may diverge over time. No shared reference or sync mechanism is needed — each skill's `assets/` folder is the source of truth for that system.

### Open

- [ ] **Commit everything** — `arpa-h-web-design/`, `README.md`, and `.vscode/mcp.json` are all uncommitted. Per `AGENTS.md`, new skills should come in via a PR rather than a direct push to `main`. Recommended commit strategy:
  - Create branch `feat/arpa-h-web-design`
  - Commit with message: `feat(arpa-h-web-design): add NEXUS design system skill with self-contained assets`
  - Open PR against `main` for review before merge
- [ ] **Logo SVG** (`arpa-h-web-design/assets/arpa-h-logo.svg`) — horizontal lockup (logomark + "ARPA-H" wordmark). User will upload the file directly. Once received, save as `arpa-h-logo.svg` and update SKILL.md Assets table to list both `arpa-h-logomark.svg` (the standalone hexagon mark, currently `arpa-h.svg` — rename on receipt) and `arpa-h-logo.svg` (the full lockup).
- [ ] **Re-extraction cadence** — decide how often the skill is refreshed against Figma (e.g., on each NEXUS design system release) and whether to automate it via a GitHub Action or keep it a manual process.
- [ ] **Consumer repo adoption** — once the skill is on `main`, it will sync to all consumer repos listed in `.github/subtree-consumers.json`. Verify that repos building public-facing ARPA-H web properties (e.g., `arpa-h-static-site-template`, `arpah-web-infra`) are in the consumer list and that their build tooling can consume `globals.css` and `tokens.json`.
