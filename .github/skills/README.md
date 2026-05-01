# skills

Agentic coding skills for GitHub Copilot, maintained centrally by ARPA-H and distributed to every consumer repo via `git subtree`. Each skill is a structured instruction file that teaches GitHub Copilot how to handle a specific domain — devcontainer setup, design system implementation, and more. When skills improve here, every downstream repo gets the update automatically.

---

## How It Works

```text
┌──────────────────────────────────────────────────────────────┐
│  ARPA-H/skills (this repo)                                   │
│  Source of truth. Changes here deploy immediately to all     │
│  consumers — no review gate on the downstream push.          │
└──────────────┬───────────────────────────────────────────────┘
               │  git subtree push
               ▼  (GitHub Actions, on push to main)
┌──────────────────────────────────────────────────────────────┐
│  Consumer repo (e.g. ARPA-H/designator)                      │
│  Skills live at a prefix — e.g. .github/skills/              │
│                                                              │
│  Changes made here to skill files open a PR back to skills.  │
│  A human reviews before anything merges to main.             │
└──────────────────────────────────────────────────────────────┘
```

### Downstream (skills → consumers)

On every push to `main`, the [sync-to-consumers workflow](.github/workflows/sync-to-consumers.yml) reads [`.github/subtree-consumers.json`](.github/subtree-consumers.json), clones each registered repo, and runs `git subtree pull --squash` to apply the latest skills content at that repo's configured prefix. No PR — changes land on the consumer's default branch immediately so all repos operate from current standards.

### Upstream (consumers → skills)

When a developer edits skill files inside a consumer repo (under the subtree prefix), the [consumer-sync-back template workflow](.github/workflows/consumer-sync-back.template.yml) — which must be copied into the consumer repo — extracts those commits and opens a PR against `skills` main for review. A maintainer reviews and merges, which immediately triggers the downstream sync above, propagating the change to every other consumer.

---

## Subscribing a Repo

### Path 1 — Using GitHub Copilot (recommended)

Open GitHub Copilot in this repo and ask it to add your consumer repo. For example:

> "Add `ARPA-H/your-repo` as a skills consumer with prefix `.github/skills` on branch `main`."

Copilot will add the entry to [`.github/subtree-consumers.json`](.github/subtree-consumers.json), and walk you through the remaining steps (copying the sync-back workflow, adding the secret, and running the initial `git subtree add` in your consumer repo).

---

### Path 2 — By hand using `git subtree`

#### Initial setup (one time per consumer repo)

```bash
# From the root of the consumer repo
git subtree add \
  --prefix .github/skills \
  https://github.com/ARPA-H/skills.git \
  main \
  --squash
```

This copies the full contents of `skills` into `.github/skills/` and records the relationship in your commit history. Adjust the prefix to wherever you want the skills to live.

#### Register the consumer

Add an entry to [`.github/subtree-consumers.json`](.github/subtree-consumers.json) in this repo:

```json
[
  {
    "repo": "ARPA-H/your-repo",
    "prefix": ".github/skills",
    "branch": "main"
  }
]
```

#### Copy the sync-back workflow

Copy [`.github/workflows/consumer-sync-back.template.yml`](.github/workflows/consumer-sync-back.template.yml) into `.github/workflows/` of the consumer repo. Update the `paths` filter and `PREFIX` variable if your subtree prefix differs from `.github/skills`.

#### Add the secret

Add a secret named `SKILLS_SUBTREE_SYNC_TOKEN` to **both** repos — the ARPA-H GitHub App `insert name here` installation token with `contents: write` and `pull_requests: write` on all repos involved.

---

## Registering New Skills

1. Author a PR with a new skill directory to this repo's root (e.g. `my-new-skill/`)
2. Place a `SKILL.md` inside it following the frontmatter convention used by existing skills (see below)
3. Optionally provide any supporting assets for the skill in an `assets` directory.
4. Commit and push to `main` — the sync workflow will distribute it to all consumers immediately

GitHub Copilot discovers skills automatically when a consumer repo's `AGENTS.md` (or equivalent) references the `.github/skills/` directory, or when a developer asks that a skill be used, refresh their current repo, etc.

---

## Skills Reference

### `arpa-h-repo-bootstrap`

**File:** [arpa-h-repo-bootstrap/SKILL.md](arpa-h-repo-bootstrap/SKILL.md)

Generates a complete, production-ready `.devcontainer/devcontainer.json` for any ARPA-H repo. Rather than maintaining devcontainer configs by hand — which drift out of date and vary between repos — this skill teaches GitHub Copilot to examine a repo's actual stack and produce a config that is both stack-correct and ARPA-H-standard.

**What it does:**

- **Stack discovery** — reads `package.json`, `pyproject.toml`, `*.tf`, `Dockerfile`, and other signals to identify languages, frameworks, services, and tooling. Checks for an existing `PLAN.md` to seed its understanding.
- **Base image selection** — picks the correct Microsoft devcontainers image and pins the runtime version to match what the repo requires.
- **Azure integration** — automatically adds the Azure CLI, Azure Functions Core Tools, Azurite storage emulator, and relevant VS Code extensions when Azure signals are detected.
- **ARPA-H standard extension layer** — always includes GitHub Copilot Chat, GitHub Actions, the ARPA-H GitHub theme, and collaboration tooling regardless of stack.
- **Environment file setup** — discovers `*.example` and `*.template` env files and generates `onCreateCommand` copy steps so new contributors get working local config immediately — defaulting to dev/mock mode, never production credentials.
- **`.gitignore` validation** — audits and patches the repo's `.gitignore` to ensure secrets, personal settings, build outputs, and OS noise are excluded.
- **Port forwarding** — configures `forwardPorts` and `portsAttributes` for every detected service with correct `notify`/`silent` settings.

**Why it matters:** Devcontainers are the contract between a repo and its contributors. An incorrect or missing config means inconsistent environments, broken onboarding, and security gaps from accidentally committed secrets. This skill ensures every ARPA-H repo meets the same baseline.

---

### `arpa-h-internal-design`

**File:** [arpa-h-internal-design/SKILL.md](arpa-h-internal-design/SKILL.md)  
**Assets:** [arpa-h-internal-design/assets/globals.css](arpa-h-internal-design/assets/globals.css)

Defines the ARPA-H internal application design system — a stack-agnostic visual language that applies equally to React, Svelte, Vue, or any other frontend framework. Rather than each internal app developing its own aesthetic, this skill enforces a shared, accessible, and semantically consistent UI across all ARPA-H tooling.

**What it covers:**

- **Color tokens** — a 11-step monochrome neutral scale anchored to a dark background, plus four semantic accent colors (hot pink for warnings/collisions, teal for active records, lavender for inactive, deep navy for header brand text). All defined as CSS custom properties in `globals.css`.
- **Design philosophy** — monochrome dark base with an intentionally inverted white header. Color is used only for semantic signaling, never decoration. All interactive elements must meet WCAG AA contrast.
- **Layout shell** — 48px white header with brand link and user area, full-viewport flex column, 1200px max-width centered main content area.
- **Typography** — Segoe UI / system-ui stack, 16px base, six clearly defined size/weight roles from page title (28px/600) down to micro text (11px/400 italic).
- **Semantic color rules** — non-negotiable mappings: active records use teal, inactive records use lavender, collisions and data warnings use hot pink, delete actions use neutral styling (never red or pink — hot pink is reserved for data warnings, not UI actions).
- **Component behavioral specs** — detailed specs for primary/ghost buttons, sortable/filterable data tables with floating popover filters, record status badges, cards/panels, the sign-in page, notes/audit timelines, and dialogs with proper focus trapping.
- **Interaction states** — consistent hover (lighten one step), pressed (darken one step), focus ring (2px white with offset), disabled, and selected states for all interactive elements.

**Why it matters:** Internal tooling that looks and behaves consistently reduces cognitive load for ARPA-H staff who use multiple apps. Centralizing these rules in a skill means GitHub Copilot applies them automatically when building new UI — preventing drift, accessibility regressions, and the ad-hoc color choices that accumulate over time.

---

### `arpa-h-web-design`

**File:** [arpa-h-web-design/SKILL.md](arpa-h-web-design/SKILL.md)  
**Assets:** [arpa-h-web-design/assets/](arpa-h-web-design/assets/)

Full reference implementation of the **NEXUS Design System** — the ARPA-H public-facing web design system that layers branded visual overrides on top of **USWDS (US Web Design System)**. Extracted from Figma file `ZbjllSrYpVdkdyioGVuNx2` via the Figma MCP server. Applies to any ARPA-H public web property regardless of stack (Drupal, Astro, Svelte, Next.js, static HTML).

**Architecture:** USWDS provides the foundation — grid, CSS reset, utilities, base component HTML + accessibility, fonts, icon sprite, and the legally required `.gov` banner. NEXUS layers brand tokens and visual overrides on top. Every NEXUS component maps to a USWDS base component (`usa-button` → NEXUS Button, `usa-alert` → NEXUS Alert, etc.).

**What it covers:**

- **Prerequisites & USWDS integration** — documents `@uswds/uswds` as a required dependency, what USWDS provides vs. what NEXUS adds, Sass integration guidance, no-build stack guidance, and the required load order (USWDS core → `globals.css` → `components.css` → Poppins).
- **Design tokens** — all NEXUS tokens as CSS custom properties (`globals.css`) and W3C Design Token JSON (`tokens.json`). Covers 11 color primitive palettes, brand/feedback/accent alias tokens, 8px-grid spacing scale, corner radius scale, typography scale, and elevation shadows. Not duplicated by USWDS — these are NEXUS-specific values.
- **Typography** — three-family system: Poppins (display, h1–h2), Public Sans (h3–body–action), Roboto Mono (code). Full size/weight/line-height/letter-spacing scale with responsive mobile overrides. Public Sans and Roboto Mono come from USWDS; Poppins WOFF2 files are included as they are NEXUS-only.
- **Component reference CSS** — `components.css` provides visual overrides for USWDS components: Button (4 variants, 2 sizes), Alert (5 states), Text Input, Tag/Badge, Card, Site Alert banner, Nav Header, Pagination, and Loading Spinner.
- **Component inventory with USWDS mapping** — 27 components categorized in three tiers: ✅ Published (16 Figma library component sets with full variant definitions), 📄 Page-only (Figma specs exist, use USWDS base + NEXUS tokens), 🏛️ USWDS-only (use stock, don't override — e.g. `.gov` banner).
- **Key visual departures** — documents exactly where NEXUS diverges from stock USWDS: pill-shaped buttons, cyan primary color, rounded alert corners, `border-radius: 8px` inputs, box-shadow focus ring, Poppins display typography.
- **Logo** — full set of ARPA-H logomark and lockup SVGs in 5 color variants each, with usage rules, clear space requirements, and minimum sizing.
- **Icon sprite** — full `@uswds/uswds` `sprite.svg` (245 icons) included for offline reference. Native-stack apps should use the copy from their USWDS installation.
- **Self-hosted fonts** — 24 WOFF2 files for air-gapped environments. Native-stack apps using `@uswds/uswds` already have Public Sans and Roboto Mono; only Poppins must be added separately.
- **Layout conventions** — USWDS-aligned breakpoint system (320px–1400px), 8px spacing grid, container widths, and section spacing rules.

**What it does not replace:** USWDS itself. NEXUS is a branded layer on top of USWDS — apps still depend on `@uswds/uswds` for grid, reset, utilities, base component structure, accessibility, and the icon sprite. This skill provides the NEXUS-specific delta and teaches Copilot to always start with USWDS HTML, then apply NEXUS overrides.

**Why it matters:** ARPA-H public web properties span multiple stacks and teams. Without a central reference, NEXUS tokens, Poppins usage, and brand color application diverge rapidly. This skill ensures GitHub Copilot applies correct NEXUS values — not raw USWDS defaults — when generating or reviewing any ARPA-H public UI, and that it always installs USWDS as the required foundation.

---

## Updating Skills from Figma

The `arpa-h-web-design` skill was extracted directly from the NEXUS Design System Figma file using the **Figma MCP server** — a Model Context Protocol integration that lets GitHub Copilot query Figma design data in real time. Follow these steps to re-run or extend that extraction.

### Prerequisites

- VS Code with the **GitHub Copilot Chat** extension
- The **Figma for VS Code** extension (`figma.figma-vscode-extension`) — already listed in `.devcontainer/devcontainer.json`
- A Figma account with access to the NEXUS file (`ZbjllSrYpVdkdyioGVuNx2`)
- This repo open in a devcontainer or locally

### 1. Start the Figma MCP server

**ARPA-H MCP policy:** The ARPA-H GitHub organization enforces **"Registry only"** MCP access. VS Code fetches the list of approved MCP servers from the ARPA-H registry at `https://apis.arpa-h.gov` — only servers in that registry are permitted to run. No repo configuration is needed.

To start the Figma MCP server:

1. Open the Command Palette (`Cmd/Ctrl+Shift+P`) → **"MCP: List Servers"**
2. VS Code loads the approved server list from the ARPA-H registry
3. Find `figma-mcp` in the list and click **Start**
4. Complete the browser OAuth flow (see step 2 below)

**Do not create a `.vscode/mcp.json` file.** A workspace `mcp.json` intercepts VS Code's registry discovery and can suppress the server list entirely. The registry list in VS Code is the correct mechanism.

**Critical:** `mcp.figma.com` uses **OAuth browser sign-in only** — it does not accept Figma Personal Access Tokens (PATs) or `Authorization: Bearer` headers.

### 2. Authenticate via OAuth

The Figma MCP server requires a one-time browser sign-in per session:

1. Click **Start** on `figma-mcp` in the MCP: List Servers panel (from step 1)
2. A browser window opens to `figma.com` — sign in with your Figma account
3. Authorize the VS Code MCP connection when prompted
4. Return to VS Code — the server status should now show as running

Alternatively, simply open GitHub Copilot Chat and ask a Figma-related question; VS Code will prompt you to start the server automatically if it isn't running.

> **Session scope:** Authentication persists for the VS Code session but does not survive a full devcontainer rebuild. Re-authenticate after rebuilds using the steps above.

### 3. Query the design file

With the server running, use GitHub Copilot Chat in **Agent mode** with natural language queries against the NEXUS file key `ZbjllSrYpVdkdyioGVuNx2`. Examples:

```text
Extract all color styles from Figma file ZbjllSrYpVdkdyioGVuNx2
```

```text
Get the design variables and token collections from ZbjllSrYpVdkdyioGVuNx2
```

```text
Search the NEXUS design system for the Button component
```

```text
Get the full design context for node 3556:18705 in file ZbjllSrYpVdkdyioGVuNx2
```

Copilot uses the following MCP tools internally — you don't call these directly, but they're useful to know for troubleshooting:

| Tool | Purpose |
| ---- | ------- |
| `mcp_figma_get_metadata` | File structure, page list, component counts |
| `mcp_figma_get_variable_defs` | Design token/variable collections |
| `mcp_figma_search_design_system` | Search components by name |
| `mcp_figma_get_design_context` | Full design spec for a specific node ID |
| `mcp_figma_get_code_connect_suggestions` | Code Connect mappings (needed before `get_design_context` on some nodes) |
| `mcp_figma_send_code_connect_mappings` | Send empty mappings `[]` to proceed past the Code Connect prompt |

### 4. Code Connect prompt workaround

Some nodes return a scripted prompt asking whether you want to set up Code Connect before showing design context. When this happens:

1. Copilot will ask: *"Do you want to set up Code Connect for this component?"*
2. Answer **"Yes"** (this triggers `get_code_connect_suggestions`)
3. Since there are no codebase components to map, Copilot will call `send_code_connect_mappings` with `mappings: []`
4. The full design context is then returned

This is normal behavior — it does not require any codebase changes.

### 5. Re-extracting specific sections

When updating the skill after Figma changes, target only what changed:

- **Color/token changes** → ask Copilot to re-extract variable collections, then update `assets/globals.css` and `assets/tokens.json`
- **New or changed components** → search the NEXUS library for the component, get design context for the affected node IDs, update the Components section of `SKILL.md` and `assets/components.css`
- **Typography changes** → re-extract text styles, update the Typography section of `SKILL.md` and `--font-*` vars in `globals.css`
- **New published components** → search the library (`mcp_figma_search_design_system` with the NEXUS library key), add to the Published Library Component Sets table, and move from 📄 Page-only to ✅ Published in the inventory

NEXUS library key (for `includeLibraryKeys` filter):

```
lk-db0b80242252e76656cbbc09f7fa00abc5eed62900182e42fdeb55c81fbd40620fbf377eb05aa53faadf15eccc2e91216f3a2c5a71ddef9026fa00c35f3ebc25
```

Node IDs for key components (from the current extraction):

| Component | Node ID | Component Key (if published) |
| --------- | ------- | ---------------------------- |
| Button | `3556:18705` | `47e5ad4d7adb07908bffb23f642a8f0693d30988` |
| Alert | `6365:11047` | `fc007075e4ad11d810733ecb6ed9fd9b6b637ab1` |
| Site Alert | `6365:6366` | `de75ab148ace0d9dd6e968db39cc3474606180ca` |
| Navigation (Public) | `6713:1644` | `b3cebf6293410901f1f76be61a914dbd6fedf94b` |
| Footer (Public) | — | `f0043000ec93d6ca5174b4415b3335b1a5b19af9` |
| Pagination | `3404:13833` | `d9080a9a1cd65dd1f66a1333758cd05bfb5e07a3` |
| Quote Block | — | `b7bed23a97f692401c3163ddf71de16b7449ef09` |
| Loading Spinner | `6724:860` | `1ce752e08894f72aeafc8a2eff0319844ec684b5` |
| Radio Button | — | `aac0ee24fa809f9f1f407394b5f0abf7f42e6225` |
| Icon | — | `c1223e8821eb78ca7b2d95d4fa007df78d4c598e` |
| Web Elements (Logo) | `83:10580` | — (page only) |
| Text Input | `6365:6428` | — (page only) |
| Tag | `6365:6576` | — (page only) |
| Card | `6820:150` | — (page only) |
