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

### Session: April 28, 2026 — GitHub Copilot MCP Registry debugging

#### Context

We diagnosed why the Figma MCP server was showing `This MCP Server is disabled because it is configured to be disabled in the Editor. Please check your settings.` and why `MCP: List Servers` was empty.

#### Findings

- The ARPA-H org Copilot policy (`chat.mcp.access`) is set to **Registry only** — this is correct and intentional. All MCP servers in `mcp.json` must have a name that exactly matches a server ID in the registry or they are blocked.
- The registry is hosted on **Azure API Center**: `https://arpah-api-center.data.eastus.azure-apicenter.ms`
- The registry **data endpoint** (`/workspaces/default/apis`) is working and contains 5 approved servers: `figma-mcp`, `azure-mcp`, `github-mcp`, `atlassian-rovo-mcp`, `microsoft-docs-mcp`
- The **discovery endpoint** that GitHub Copilot / VS Code queries (`GET /v0.1/servers`) returns **HTTP 404** — this means the Azure API Center MCP discovery feature has not been activated yet. Without a working `/v0.1/servers`, VS Code cannot validate any server name against the registry and blocks everything.
- `.vscode/mcp.json` server name was corrected from `figma` → `figma-mcp` to match the registry ID exactly. This is the right value for when the registry is fixed.

#### What's blocking

**The `/v0.1/servers` endpoint on Azure API Center needs to be activated.** Until it returns the server list, the Registry only policy will block all `mcp.json` servers.

#### Action required (must be done in Azure Portal by an org admin)

1. Go to [portal.azure.com](https://portal.azure.com) → resource `arpah-api-center`
2. Follow the [Register and discover remote MCP servers in Azure API Center](https://learn.microsoft.com/azure/api-center/register-discover-mcp-server) guide to enable MCP server discovery
3. Verify **anonymous access** is enabled in the API Center visibility settings (required so GitHub Copilot can read the registry without a client certificate)
4. Verify the endpoint `https://arpah-api-center.data.eastus.azure-apicenter.ms/v0.1/servers` returns a JSON list with the 5 servers

#### After the endpoint is fixed

- No code changes needed in this repo — `.vscode/mcp.json` already has the correct server name (`figma-mcp`) and URL (`https://mcp.figma.com/mcp`)
- Reload the VS Code window — `figma-mcp` will appear in `MCP: List Servers`, the disabled message will clear
- Start the server → VS Code will open a browser OAuth flow for Figma — complete the login (see AGENTS.md: uses browser OAuth, never API tokens)

#### State of this repo

- `.vscode/mcp.json` — server renamed to `figma-mcp` (committed needed)
- No other files changed in this session

---

### Session: April 29, 2026 — Registry proxy deployed, MCP unblocked, docs updated

#### What changed

- **New proxy deployed:** `https://apis.arpa-h.gov` — a gunicorn-backed proxy fronting Azure API Center. `GET https://apis.arpa-h.gov/v0.1/servers` now returns HTTP 200 with the correct JSON array of 5 approved servers.
- **Registry verified working:** `curl https://apis.arpa-h.gov/v0.1/servers` returns all 5 server entries. CORS OPTIONS preflight returns HTTP 200.
- **MCP now fully functional** in this Codespace once the window is reloaded and `figma-mcp` started.

#### Docs updated

- [x] `arpa-h-repo-bootstrap/SKILL.md` — added **"ARPA-H MCP Registry — Policy and Configuration"** section: documents the Registry only policy, the `https://apis.arpa-h.gov` registry URL, all 5 approved server IDs with their URLs, discovery flow via MCP: List Servers, and per-server auth method. Explicitly forbids creating `.vscode/mcp.json` — a workspace mcp.json suppresses the registry list in VS Code.
- [x] `README.md` — updated "Updating Skills from Figma" section: replaced mcp.json config block with MCP: List Servers discovery flow, added Registry only policy explanation, noted that creating mcp.json suppresses the registry list.
- [x] `.vscode/mcp.json` — **deleted**. A workspace mcp.json causes VS Code to validate each listed server before showing the registry list; any hiccup suppresses the entire list. The registry list in VS Code is the correct discovery mechanism.

#### Still outstanding

**Verification confirmed** ✓ — After deleting `.vscode/mcp.json` and fixing CORS on the proxy, the MCP registry list loads correctly in VS Code. Approved servers appear in MCP: List Servers without the disabled error.

- [x] **Commit everything** — `arpa-h-web-design/`, `README.md`, `arpa-h-repo-bootstrap/SKILL.md`, deleted `.vscode/mcp.json`, and `PLAN.md`. See commit `fix(mcp): align figma-mcp server id with ARPA-H registry and document MCP policy`.
- [x] **Logo SVG** (`arpa-h-web-design/assets/images/arpa-h-logo.svg`) — full horizontal lockup confirmed present. viewBox `0 0 1132.84 314.39`. SKILL.md Assets table already references it correctly.
- [ ] **Re-extraction cadence** — decide how often the skill is refreshed against Figma (e.g., on each NEXUS design system release) and whether to automate it via a GitHub Action or keep it a manual process.
- [ ] **Consumer repo adoption** — once the skill is on `main`, it will sync to all consumer repos listed in `.github/subtree-consumers.json`. Verify that repos building public-facing ARPA-H web properties (e.g., `arpa-h-static-site-template`, `arpah-web-infra`) are in the consumer list and that their build tooling can consume `globals.css` and `tokens.json`.

---

### Session: April 30, 2026 — Deep component documentation from Figma MCP

#### Context

The SKILL.md was rewritten with a USWDS-first architecture and accurate published component inventory (16 sets from Figma MCP). However, detailed per-component documentation (variant specs, sub-components, styling details, CSS) was missing. Started deep-diving into individual Figma pages via the MCP to create full specs.

#### Completed

- [x] **Button** — Full `### Button` section in SKILL.md (variant matrix, styling per Kind, sizing, states, icon type, related components). Full CSS in `components.css` (`.usa-button`/`.btn` overrides, 4 kinds, large size, focus/disabled, icon sizing, `.btn-icon-only`, `.btn-group`).
- [x] **Card** — Full `### Card` section in SKILL.md (4 kinds × 3 sizes × 2 states, structural anatomy, 11 sub-components with category variants). Full CSS in `components.css` (`.card` variants, `.card-image`, `.card-content`, `.card-metadata`, `.card-title`, `.card-tag-*` sub-components, `.card-date-author`, `.card-nav`).
- [x] **Footer** — Full `### Footer` section in SKILL.md (Public + Solutions variants, structural diagram, typography, sub-components, nav columns, mobile adaptations). Full CSS in `components.css` (`.nexus-footer-*` classes, responsive mobile breakpoint).

#### In Progress — Component Deep-Dive Plan

For each remaining component page: get metadata → get design context → get code connect → write `### Section` in SKILL.md + CSS in `components.css`.

**Batch 1 — Published + complex (high priority):**

- [ ] Alert (node `6365:10906`) — 5 states × Simple × Nested, close/icon toggles
- [ ] Site Alert (node `6365:6366`) — Standard/Expanded/Slim × Nested
- [ ] Navigation (need node ID) — Public Site + Solutions Portal mega menu

**Batch 2 — Published + simpler (medium priority):**

- [ ] Pagination (need node ID) — Steps/controls
- [ ] Quote Block (need node ID) — Styled blockquote
- [ ] Radio Button (need node ID) — Radio input + Radio Label
- [ ] Loading Spinner (need node ID) — Animated indicator

**Batch 3 — Page-only, form cluster (medium priority):**

- [ ] Text Input (node `6365:6428`) — Already has basic CSS
- [ ] Checkbox (need node ID) — Single/group
- [ ] Toggle (need node ID) — On/off switch
- [ ] File Input (need node ID) — Upload control
- [ ] Validation (need node ID) — Error/hint messages
- [ ] Form Elements (need node ID) — General wrapper/fieldset

**Batch 4 — Page-only, navigation/content (medium priority):**

- [ ] Accordion (need node ID) — Expand/collapse
- [ ] Breadcrumb (need node ID) — Navigation trail
- [ ] Links (need node ID) — Inline/standalone link styles
- [ ] Search (need node ID) — Search input/bar
- [ ] Tag (node `6365:6576`) — Already has basic CSS
- [ ] Prose (need node ID) — Rich text content

**Batch 5 — Page-only, remaining (lower priority):**

- [ ] Multiselect (need node ID) — Multi-option dropdown
- [ ] Process List (need node ID) — Numbered step list
- [ ] Progress Indicator (need node ID) — Progress bar/stepper

#### Known Page Node IDs

| Page | Node ID | Source |
| ------ | --------- | -------- |
| Button | `3416:19608` (component instance) | Figma MCP |
| Card | `6820:150` | Figma MCP |
| Footer | `6472:10311` | User provided |
| Alert | `6365:10906` (component instance) | Figma MCP |
| Site Alert | `6365:6366` | Figma MCP |
| Tag | `6365:6576` | Figma MCP |
| Text Input | `6365:6428` | Figma MCP |

#### Node IDs still needed

Navigation, Pagination, Quote Block, Radio Button, Loading Spinner, Checkbox, Toggle, File Input, Validation, Form Elements, Accordion, Breadcrumb, Links, Search, Prose, Multiselect, Process List, Progress Indicator

#### Approach per component

1. `get_metadata` on the page node → discover component frames and variant symbols
2. `get_design_context` on primary variant → get full rendered code with styles
3. `get_context_for_code_connect` → get variant properties, descendants, slot structure
4. Write `### ComponentName` section in SKILL.md with:
   - Variant matrix table
   - ASCII structural diagram
   - Styling specs table
   - Sub-component table (if applicable)
   - State behavior
5. Write CSS classes in `components.css` covering all variants and sub-components
6. Update component inventory table entry to reference the new section
