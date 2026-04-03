---
name: arpa-h-repo-bootstrap
description: "ARPA-H repo bootstrap — devcontainer, .gitignore, GitHub Actions security, environment file setup, PLAN.md, and AGENTS.md. Use when creating or updating any ARPA-H internal repo's foundational configuration. Examines the repo's language stack, frameworks, tooling, and services, then generates a complete devcontainer config with ARPA-H standard extensions, validates .gitignore coverage, enforces GitHub Actions SHA pinning, wires up environment file conventions, maintains a PLAN.md tracking stack decisions and work items, and produces an AGENTS.md with repo and developer-specific agent directives. Use for: new repo setup, adding Codespaces support, updating devcontainer to match current stack, adding missing extensions, auditing repo hygiene."
---

# ARPA-H GitHub Repo Setup

## Overview

This skill produces a complete `.devcontainer/devcontainer.json` for any ARPA-H repo by
combining two things:
1. **Stack discovery** — what the repo actually needs (language runtime, tools, services)
2. **ARPA-H standard layer** — extensions and settings that are always included regardless of stack

---

## Step 1 — Discover the Stack

Check for an existing `PLAN.md` at the repo root first — it may already capture stack decisions and open questions (see the PLAN.md requirements section below). Use it to seed and refine discovery rather than starting from scratch.

Examine the repo before writing anything. Check for the following signals:

### Language / Runtime
| Signal | Conclusion |
|--------|-----------|
| `package.json` at root | Node.js project — read `engines.node` for version, default to LTS (24) |
| `requirements.txt` / `pyproject.toml` / `*.py` | Python project |
| `go.mod` | Go project |
| `Cargo.toml` | Rust project |
| `pom.xml` / `build.gradle` | Java project |
| Multiple present | Multi-language — use a base image and add features for each |

### Frontend Framework
| Signal | Framework |
|--------|-----------|
| `vite.config.*` | Vite — port 5173 |
| `next.config.*` | Next.js — port 3000 |
| `nuxt.config.*` | Nuxt — port 3000 |
| `svelte.config.*` | SvelteKit — port 5173 |
| `angular.json` | Angular — port 4200 |

### Backend / API
| Signal | Service |
|--------|---------|
| `api/` folder with `host.json` | Azure Functions — port 7071, needs `azure-functions-core-tools@4` |
| `server/` or `src/server` with Express/Fastify | Node API — port 8080 or as configured |
| `*.py` with FastAPI/Flask | Python API — port 8000 |
| `Dockerfile` or `docker-compose.yml` | Container-based — use `docker-outside-of-docker` feature |

### Local Storage / Emulators
| Signal | Service | Ports |
|--------|---------|-------|
| `@azure/storage-*` or `azurite` in package.json | Azurite emulator — install globally, store at `/tmp/azurite` | 10000, 10001, 10002 |
| `@azure/cosmos*` in package.json | CosmosDB — may need Azurite or emulator | — |
| `mongoose` / `mongodb` in package.json | MongoDB — add `ghcr.io/devcontainers/features/mongo:1` | 27017 |
| `pg` / `prisma` with postgres provider | PostgreSQL — add `ghcr.io/devcontainers/features/postgres:1` | 5432 |
| `redis` in package.json | Redis — add `ghcr.io/devcontainers/features/redis:1` | 6379 |

### Azure Integration
| Signal | Action |
|--------|--------|
| `@azure/identity` or `DefaultAzureCredential` in any source file | Add `ghcr.io/devcontainers/features/azure-cli:1` feature |
| `infra/` folder with `*.tf` files | Add Terraform — `ghcr.io/devcontainers/features/terraform:1` |
| `.bicep` files | Azure CLI is sufficient |

### Environment Files
- Look for any `*.example`, `*.sample`, or `*.template` env files (`.env.example`, `local.settings.json.example`, etc.)
- For each pair found, add a `cp -n <example> <real>` to `onCreateCommand`
- Env files used by Vite (`VITE_*` prefix) must default to dev/mock mode — never production credentials

### Linting / Formatting
| Signal | Extension to add |
|--------|-----------------|
| `.eslintrc*` / `eslint.config.*` | `dbaeumer.vscode-eslint` |
| `.prettierrc*` / `prettier` in package.json | `esbenp.prettier-vscode` |
| `pyproject.toml` with ruff/black | `charliermarsh.ruff` |
| `.editorconfig` | `editorconfig.editorconfig` |
| `.markdownlint*` / `markdownlint` in package.json / any `*.md` files present | `davidanson.vscode-markdownlint` |

### Linter ignore rules — always exclude `.github/skills`

The `.github/skills/` subtree is maintained exclusively in `ARPA-H/skills`. Consumer repos must not lint those files — doing so produces noise, generates spurious lint-fix commits, and can trigger unwanted PRs back to this repo.

For every linter present in the consumer repo, add `.github/skills` to its ignore configuration:

**Markdown** — add or create `.markdownlintignore`:
```
.github/skills
```

**ESLint** — add to `.eslintignore`, or to the `ignores` array in `eslint.config.*`:
```
.github/skills
```

**Prettier** — add to `.prettierignore`:
```
.github/skills
```

**Ruff / Python** — add to `[tool.ruff]` in `pyproject.toml`:
```toml
[tool.ruff]
exclude = [".github/skills"]
```

**Go (staticcheck / golangci-lint)** — add to `.golangci.yml`:
```yaml
issues:
  exclude-rules:
    - path: \.github/skills
      linters: ["*"]
run:
  skip-dirs:
    - .github/skills
```

**Terraform (tflint / terraform fmt)** — add to `.tflint.hcl`:
```hcl
config {
  ignore_module = {}
}
# tflint does not recurse into .github/skills by default when run from repo root,
# but if invoked with a broad glob, exclude explicitly:
#   tflint --filter='**/*.tf' --exclude-path='.github/skills'
```
For `terraform fmt`, always invoke it with an explicit path (e.g. `terraform fmt infra/`) rather than a repo-wide glob so it never touches the skills directory.

**Stylelint (CSS/SCSS)** — add to `.stylelintignore`:
```
.github/skills
```

**ShellCheck** — pass `--exclude-path` or wrap invocations to skip the directory:
```bash
find . -name '*.sh' -not -path './.github/skills/*' | xargs shellcheck
```

Apply all ignore rules that are relevant to the linters detected in the repo. If an ignore file does not yet exist, create it. If one already exists, append the entry rather than replacing the file.

### Language-Specific Extensions
| Language/Framework | Extensions |
|-------------------|-----------|
| TypeScript / JavaScript |  No dedicated extension needed — covered by TypeScript and ESLint extensions |
| Python | `ms-python.python`, `ms-python.vscode-pylance` |
| Go | `golang.go` |
| Rust | `rust-lang.rust-analyzer` — provides IntelliSense, inline errors, and `clippy` lint integration |
| Terraform | `hashicorp.terraform` |
| Docker | `ms-azuretools.vscode-docker` |
| Svelte | `svelte.svelte-vscode` |
| Astro | `astro-build.astro-vscode` |
| Vue | `vue.volar` |
| React (TSX/JSX) | No dedicated extension needed — covered by TypeScript and ESLint extensions |

> **Every extension identified in the tables above MUST be written to `customizations.vscode.extensions` in `devcontainer.json`.** This is the only guarantee that extensions are available after a rebuild or in a new Codespace. Do not rely on a developer installing them manually.

---

## Step 2 — Select the Base Image

Use Microsoft's devcontainers images and pin to a specific major version:

| Stack | Image |
|-------|-------|
| Node.js only | `mcr.microsoft.com/devcontainers/javascript-node:1-<version>` |
| Python only | `mcr.microsoft.com/devcontainers/python:1-<version>` |
| Go | `mcr.microsoft.com/devcontainers/go:1-<version>` |
| Universal (multi-language) | `mcr.microsoft.com/devcontainers/universal:2` |

Pin the Node.js version to match `engines.node` in `package.json`, or default to `20` (current LTS).

---

## Step 3 — Apply ARPA-H Standard Extensions and Features

These extensions and devcontainer features are **always included** in every ARPA-H devcontainer, regardless of stack.
Merge them with any stack-specific extensions discovered in Step 1.

### Always-on: devcontainer features
```jsonc
"features": {
  "ghcr.io/devcontainers/features/github-cli:1": {}  // gh CLI — required for all ARPA-H repos
}
```

The `gh` CLI must always be present. Every ARPA-H repo uses GitHub for issues, PRs, and Actions; `gh` is the standard tool for interacting with the GitHub API from the terminal and from scripts. Add any stack-specific features alongside this entry rather than replacing it.

### Always-on: GitHub & Collaboration
```
github.copilot-chat
github.vscode-pull-request-github
github.vscode-github-actions
github.github-vscode-theme
dracula-theme.theme-dracula
```

### Always-on: Azure (if any Azure signal detected)
```
ms-azuretools.vscode-azureresourcegroups
ms-vscode.azurecli
```

### Conditional: Azure services (add when signal detected)
```
ms-azuretools.vscode-azurefunctions   ← Azure Functions signal
ms-azuretools.vscode-cosmosdb         ← CosmosDB signal
Azurite.azurite                       ← Azurite signal
```

---

## Step 4 — Apply ARPA-H Standard Settings

Always include these VS Code settings:

```jsonc
"settings": {
  // Always include
  "editor.formatOnSave": true,
  "git.autofetch": true,
  "git.autofetchPeriod": 180,
  "editor.defaultFormatter": "esbenp.prettier-vscode",  // if prettier detected
  "azurite.location": "/tmp/azurite"                    // if Azurite detected
}
```

Azure Functions specific settings (add when Functions signal detected):
```jsonc
"azureFunctions.deploySubpath": "<api folder path>",
"azureFunctions.projectLanguage": "TypeScript",        // or as appropriate
"azureFunctions.projectRuntime": "~4"
```

---

## Step 5 — Build postCreateCommand and onCreateCommand

### onCreateCommand
Copy env example files (runs once at container creation, never overwrites):
```bash
cp -n .env.local.example .env.local ; cp -n api/local.settings.json.example api/local.settings.json ; true
```
Adapt to whatever example files were found in Step 1. Always end with `; true` to prevent
failure from blocking container creation if files already exist.

### postCreateCommand
Install all dependencies. Chain with `&&` in dependency order:

```bash
# Pattern: global tools first, then root deps, then sub-package deps
npm install -g <global-tool-1> <global-tool-2> --unsafe-perm true && npm install && cd <subpackage> && npm install
```

Common global tools:
- `azure-functions-core-tools@4` — for Azure Functions repos
- `azurite` — for local Azure Storage emulation (install globally, not as a project dep)

---

## Step 6 — Port Forwarding

Include `forwardPorts` and `portsAttributes` for every service discovered:

```jsonc
"forwardPorts": [<port1>, <port2>],
"portsAttributes": {
  "<port>": {
    "label": "<Human readable name>",
    "onAutoForward": "notify"   // for dev servers the user interacts with
    "onAutoForward": "silent"   // for background services (emulators, databases)
  }
}
```

Use `"notify"` for primary dev server and API ports. Use `"silent"` for emulators and databases.

---

## Step 7 — Verify .gitignore

Check for a `.gitignore` at the repo root. Create one if absent. Ensure the following entries are present:

### Always required
```gitignore
# Local env files — never commit secrets or personal config
.env
.env.local
.env.*.local

# VS Code personal settings — devcontainer.json is shared; settings.json is not
.vscode/settings.json
.vscode/launch.json
.vscode/*.code-workspace

# OS noise
.DS_Store
Thumbs.db
```

### Add when Azure Functions detected
```gitignore
# Azure Functions local config (contains connection strings)
api/local.settings.json
```

### Add when Node.js detected
```gitignore
node_modules/
dist/
build/
.next/
```

### Add when Terraform detected
```gitignore
**/.terraform/
*.tfstate
*.tfstate.backup
*.tfvars
!*.tfvars.example
```

### Add when Python detected
```gitignore
__pycache__/
*.py[cod]
.venv/
.env/
dist/
*.egg-info/
```

### Add when SvelteKit detected
```gitignore
.svelte-kit/
```

### Add when Astro detected
```gitignore
.astro/
```

### Add when Rust detected
```gitignore
target/
Cargo.lock   # omit this line for libraries; keep for binaries/applications
```

### Key rules
- `.vscode/extensions.json` and `.devcontainer/` **must not** be gitignored — they are shared team config
- `*.example` / `*.sample` env files **must not** be gitignored — they are the committed documentation of required variables
- When adding new entries, append to the existing `.gitignore` rather than replacing it

---

## GitHub Actions Security — Pin to Commit SHAs

Any `.github/workflows/` files in the repo must pin third-party and GitHub-owned actions to a full commit SHA rather than a mutable tag. Tags like `@v4` can be silently moved by the action maintainer, enabling supply chain attacks.

**Required pattern:**
```yaml
# ✅ Pinned to immutable commit SHA, tag noted in comment for human readability
- uses: actions/checkout@11bd71901bbe5b1630ceea73d27597364c9af683 # v4.2.2

# ❌ Never use — tag is mutable
- uses: actions/checkout@v4
```

### How to find the correct SHA

For any action at `owner/repo@vX.Y.Z`, resolve the SHA via the GitHub API:

```bash
gh api repos/<owner>/<repo>/git/ref/tags/<tag> --jq '.object.sha'
```

If the result `type` is `"tag"` (annotated tag) rather than `"commit"`, dereference it:

```bash
gh api repos/<owner>/<repo>/git/tags/<sha> --jq '.object.sha'
```

### When reviewing or generating workflow files

- Audit every `uses:` line for unpinned references
- Replace unpinned tags with the resolved commit SHA + a `# vX.Y.Z` comment
- This applies to all actions: `actions/*`, `github/*`, and any third-party actions

### Exclude skill file updates from triggering workflow runs

Commits that only update `.github/skills/*` (e.g. Copilot skill syncs) must not trigger CI workflows. Add a `paths-ignore` filter to every workflow's trigger so those updates are silently skipped:

```yaml
on:
  push:
    paths-ignore:
      - '.github/skills/**'
  pull_request:
    paths-ignore:
      - '.github/skills/**'
```

Apply this to all triggers that support path filtering (`push`, `pull_request`, `pull_request_target`). Triggers that do not support `paths-ignore` (e.g. `workflow_dispatch`, `schedule`) are unaffected — no change is needed for those.

### Keeping pins up to date

[Dependabot](https://docs.github.com/en/code-security/dependabot/working-with-dependabot/keeping-your-actions-up-to-date-with-dependabot) can automate SHA updates. Add to `.github/dependabot.yml`:

```yaml
version: 2
updates:
  - package-ecosystem: github-actions
    directory: /
    schedule:
      interval: weekly
```

---

## PLAN.md — Living Project Record

Every ARPA-H repo must have a `PLAN.md` at the root. It is the single source of truth for what the project is, what decisions have been made, and what work remains. It is not a one-time artifact — it must be updated throughout the full lifecycle of GitHub Copilot agent use: Ask, Plan, and Agent phases.

### What belongs in PLAN.md

**Stack & architecture** — Record confirmed decisions as they are made:
- Language runtime and version
- Frontend framework and build tool
- Backend / API approach
- Data stores and emulators
- Azure services in use
- Infrastructure approach (Bicep, Terraform, none)
- Auth model

**Core requirements** — A concise description of what the app must do, captured during the Ask phase and refined as understanding improves. Include constraints (performance targets, compliance requirements, user scale) and non-goals (what is explicitly out of scope).

**Open questions** — Unresolved decisions or unknowns that block or shape the build. Each should be a checkbox item. Mark it checked when resolved and record the decision inline.

**Work items** — Every meaningful task identified during planning or discovered during implementation must be tracked as a checkbox. Mark items checked immediately upon completion. Never delete items — checked items form the record of what was built and why.

**Evolution notes** — When a decision changes (e.g. switching from REST to GraphQL, adopting a new library), record the change and the reason rather than silently overwriting the old entry. This preserves context for future agents and developers.

### Checkbox discipline

Use GitHub-flavored Markdown task lists throughout:

```markdown
- [x] Completed item
- [ ] Outstanding item
```

Open questions, work items, and any other tracked items must all use this format. The checkbox state must reflect reality at all times — do not leave items unchecked after they are done, and do not pre-check items that have not been completed.

### Minimal PLAN.md template

When creating a new `PLAN.md`, use this structure as a starting point and fill in what is known:

```markdown
# Plan — <repo name>

## What This Is
<One-paragraph description of the app's purpose and users.>

## Stack
- **Runtime:** Node.js 20 / Python 3.12 / etc.
- **Frontend:** SvelteKit + Vite
- **API:** Azure Functions (TypeScript)
- **Storage:** Azure Cosmos DB (NoSQL), Azurite locally
- **Auth:** Azure AD (MSAL)
- **Infra:** Bicep

## Requirements
- [ ] <Core requirement 1>
- [ ] <Core requirement 2>

## Open Questions
- [ ] <Unresolved decision or unknown>

## Work Items
### Setup
- [ ] Scaffold devcontainer
- [ ] Configure .gitignore
- [ ] Add environment file examples

### <Feature area>
- [ ] <Task>
```

Add sections and subsections as the project grows. Do not constrain structure — the template is a floor, not a ceiling.

---

## AGENTS.md — Repo and Developer Directives

Every ARPA-H repo must have an `AGENTS.md` at the root. It gives GitHub Copilot (and any other agent) the repo-specific and developer-specific context it needs to act correctly without being re-explained each session.

### What belongs in AGENTS.md

**Repo identity** — One or two sentences on what this repo is, enough for an agent arriving cold to orient itself.

**Coding conventions** — Rules the agent must follow when writing or editing code in this repo:
- Naming conventions (file names, variable naming style, export patterns)
- Module/folder structure and where new files go
- Import ordering or aliasing rules
- Any patterns that are explicitly banned (e.g. "never use `any` in TypeScript", "always use the repository pattern for data access")

**Key files and entry points** — Enumeration of the most important files an agent should read before making changes: config files, shared utilities, type definitions, API route registrations, etc.

**Testing conventions** — How tests are organized, what framework is used, where tests live relative to source, what the test run command is, and whether tests must pass before a PR can merge.

**Agent behavior rules** — Directives that shape how the agent operates:
- What the agent should always do before making changes (e.g. read `PLAN.md`, check for existing utilities)
- What the agent must never do (e.g. generate mock data that resembles real PII, skip `PLAN.md` updates when completing work items, recommend GitHub Personal Access Tokens (classic or fine-grained) — always recommend more secure alternatives such as GitHub Apps or `gh auth` / OIDC-based authentication)
- When the agent should stop and ask rather than proceed (e.g. any change to auth flow, any schema migration)
- PR and commit message format requirements

**Developer-specific notes** — Any context that is specific to this team or codebase that would not be obvious from reading the code: known technical debt the agent should work around, third-party integrations with unusual behavior, deployment environment quirks.

### AGENTS.md rules

- Keep it terse. Agents read this every session — verbose prose wastes context. Use bullet points and short declarative sentences.
- **Only put things in AGENTS.md that an agent must internalize on every invocation** — non-negotiable guardrails, commit/PR format, and repo-specific standards with no better home.
- **Do not duplicate content already in `README.md` or `PLAN.md`.** Replace any duplicated section with a precise pointer (e.g. "See `README.md` → 'Subscribing a Repo' for subscription steps."). Agents will follow the pointer when the topic is relevant rather than loading the detail on every session.
- Update it whenever a new convention is established or an existing one changes. Stale directives mislead agents.
- `AGENTS.md` must **not** be gitignored — it is shared team configuration.

### Minimal AGENTS.md template

```markdown
# Agent Directives — <repo name>

## What This Repo Is
<One to two sentences.>

## Before Making Any Change
- Read `PLAN.md` to understand current stack and open work items.
- Check for existing utilities in `src/lib/` before creating new ones.

## Coding Conventions
- All new files use TypeScript with strict mode enabled.
- Components go in `src/lib/components/`, named in PascalCase.
- Server-only code goes in `src/lib/server/` and must never be imported from client modules.
- No `any`. Use `unknown` and narrow explicitly.

## Testing
- Tests live alongside source in `__tests__/` directories.
- Run with `npm test`. All tests must pass before opening a PR.

## Never Do
- Commit secrets or connection strings.
- Skip updating `PLAN.md` checkboxes when completing a work item.
- Modify the auth flow without explicit user confirmation.
- Recommend GitHub Personal Access Tokens (PATs) to developers (classic or fine-grained). Always suggest a more secure alternative: GitHub Apps (preferred for automation), `gh auth login` for interactive CLI use, or OIDC via Actions for CI/CD.

## Commit and PR Format
- Commits: `<type>(<scope>): <subject>` (Conventional Commits)
- PR titles follow the same format.
```

Expand each section to match the actual repo. Remove sections that do not apply.

---

## CODEOWNERS — Review Authority

Every ARPA-H repo should have a `.github/CODEOWNERS` file that declares who must approve pull requests for each part of the codebase.

### How to determine owners

Before writing the file, ask the user:

> "Who should be required to review and approve pull requests for this repo? I can also look at recent commit and PR history to suggest frequent contributors who may have the authority to approve changes — would you like me to do that?"

If the user wants history-based suggestions, run:
```bash
# Top committers by commit count (last 6 months)
git log --since="6 months ago" --format="%ae" | sort | uniq -c | sort -rn | head -10

# Authors who have merged PRs (requires gh CLI)
gh pr list --state merged --limit 50 --json author --jq '[.[].author.login] | group_by(.) | map({login: .[0], count: length}) | sort_by(-.count) | .[:10]'
```

Present the results and ask which contributors have the authority to approve PRs (i.e. are maintainers, leads, or named reviewers for this project). Only add people who explicitly confirm they have that authority — do not auto-assign based on commit count alone.

### File location and format

Create `.github/CODEOWNERS`:

```
# CODEOWNERS — <repo name>
#
# Each line is a file pattern followed by one or more owners.
# The last matching pattern takes precedence.
# See: https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners

# Global owner — all files in the repo
* @<github-username>

# Optional: area-specific owners (more specific patterns override * above)
# infra/ @<infra-owner>
# src/api/ @<api-owner>
```

### Key rules
- Use `@username` (GitHub handle), not email addresses
- Only list people with **Triage** role or above in the repo — GitHub silently ignores CODEOWNERS entries for users without write access
- Add `.github/CODEOWNERS` to PLAN.md work items if it was not present at bootstrap time
- `CODEOWNERS` must **not** be gitignored

---

## Output Format

Produce a single `.devcontainer/devcontainer.json` file with:
- Inline comments (`//`) explaining non-obvious choices
- Sections in this order: `name`, `image`, `features`, `postCreateCommand`, `onCreateCommand`, `forwardPorts`, `portsAttributes`, `customizations`
- Extension IDs in lowercase exactly as published on the VS Code Marketplace

---

## Environment File Convention

Every ARPA-H repo must follow this pattern:
- Sensitive/local config goes in gitignored files (`.env.local`, `local.settings.json`)
- A committed `*.example` counterpart documents all variables with safe defaults
- Example files must default to **dev/mock mode** — never production credentials or `false` for mock flags
- The `onCreateCommand` copies example → real on first container create using `cp -n`
