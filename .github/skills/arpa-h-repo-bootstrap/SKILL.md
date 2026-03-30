---
name: arpa-h-repo-bootstrap
description: "ARPA-H repo bootstrap — devcontainer, .gitignore, GitHub Actions security, and environment file setup. Use when creating or updating any ARPA-H internal repo's foundational configuration. Examines the repo's language stack, frameworks, tooling, and services, then generates a complete devcontainer config with ARPA-H standard extensions, validates .gitignore coverage, enforces GitHub Actions SHA pinning, and wires up environment file conventions. Use for: new repo setup, adding Codespaces support, updating devcontainer to match current stack, adding missing extensions, auditing repo hygiene."
---

# ARPA-H GitHub Repo Setup

## Overview

This skill produces a complete `.devcontainer/devcontainer.json` for any ARPA-H repo by
combining two things:
1. **Stack discovery** — what the repo actually needs (language runtime, tools, services)
2. **ARPA-H standard layer** — extensions and settings that are always included regardless of stack

---

## Step 1 — Discover the Stack

Check for an existing `PLAN.md` at the repo root first — it may already capture stack decisions and open questions, use it to seed and refine discovery rather than starting from scratch.

Examine the repo before writing anything. Check for the following signals:

### Language / Runtime
| Signal | Conclusion |
|--------|-----------|
| `package.json` at root | Node.js project — read `engines.node` for version, default to LTS (20) |
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

## Step 3 — Apply ARPA-H Standard Extensions

These extensions are **always included** in every ARPA-H devcontainer, regardless of stack.
Merge them with any stack-specific extensions discovered in Step 1.

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
