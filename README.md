# skills

Agentic coding skills for GitHub Copilot, maintained centrally by ARPA-H and distributed to every consumer repo via `git subtree`. Each skill is a structured instruction file that teaches GitHub Copilot how to handle a specific domain — devcontainer setup, design system implementation, and more. When skills improve here, every downstream repo gets the update automatically.

---

## How It Works

```
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

## Subscribing a Repo via `git subtree`

### Initial setup (one time per consumer repo)

```bash
# From the root of the consumer repo
git subtree add \
  --prefix .github/skills \
  https://github.com/ARPA-H/skills.git \
  main \
  --squash
```

This copies the full contents of `skills` into `.github/skills/` and records the relationship in your commit history. Adjust the prefix to wherever you want the skills to live.

### Register the consumer

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

### Copy the sync-back workflow

Copy [`.github/workflows/consumer-sync-back.template.yml`](.github/workflows/consumer-sync-back.template.yml) into `.github/workflows/` of the consumer repo. Update the `paths` filter and `PREFIX` variable if your subtree prefix differs from `.github/skills`.

### Add the secret

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
