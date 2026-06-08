# AGENTS.md

This file provides guidance to AI coding agents when working with code in this repository.

## Overview

Copenhagen Theme is the default Zendesk Guide (Help Center) theme. It's a Curlybars-based theme with React components for complex UI elements, built using Rollup and SCSS.

## Common Commands

```bash
# Development (builds + watches + starts local preview)
yarn start

# Build for production
yarn build

# Run tests
yarn test

# Run a single test file
yarn test path/to/file.test.tsx

# Lint
yarn eslint src

# Extract i18n strings from source code
yarn i18n:extract
yarn i18n:extract --module=module-name

# Update translations from Zendesk translation system
yarn i18n:update-translations
yarn i18n:update-translations --module=module-name
```

**Note:** Preview requires Zendesk authentication. Run `yarn zcli login -i` first if needed.

## Architecture

### Build System
- **Rollup** compiles everything - outputs `script.js`, `style.css`, and ES module bundles in `assets/`
- **Do not edit** `script.js`, `style.css`, or files in `assets/` directly - they are generated
- ES2015 only for `script.js` (no Babel) - avoid newer JavaScript features in `src/*.js` files

### Directory Structure
- `templates/` - Curlybars templates (`.hbs`) for Help Center pages. Curlybars is a subset of Handlebars and may not support all Handlebars features.
- `src/` - JavaScript source
  - `src/*.js` - Legacy vanilla JS (bundled into `script.js` as IIFE)
  - `src/modules/` - React components (bundled as ES modules into `assets/`)
- `styles/` - SCSS files (compiled into `style.css`)
- `manifest.json` - Theme settings configuration

### React Modules
Located in `src/modules/`, bundled to `assets/*-bundle.js`:
- `new-request-form` - Ticket submission form
- `request-list` - User's requests page
- `service-catalog` - Service catalog pages
- `approval-requests` - Approval workflow UI
- `flash-notifications` - Toast notifications
- `shared/` - Shared utilities (Garden theme, i18n, error boundary)
- `ticket-fields/` - Reusable ticket field components

Modules are isolated - ESLint enforces that modules only import from `shared/`, `test/`, `ticket-fields/`, or `flash-notifications/`.

### Import Maps
React modules are loaded via import maps generated during build. The `document_head.hbs` template contains the import map mapping module names to asset URLs.

### i18n in React
Uses react-i18next with `.` separator for plurals (not `_`). Translation strings use:
```ts
const { t } = useTranslation();
t("key", "Default English value");
```
Translations stored in `src/modules/[module]/translations/`.

### Translations: what goes where
- `translations.yml` (repo root) is only for strings referenced by `manifest.json` (theme settings labels/descriptions shown in the Settings panel). Don't add template or React strings here.
- In Curlybars templates (`templates/*.hbs`), the `{{t "key"}}` helper only resolves keys that Help Center exposes to the theme's `t` helper. A new key must be added there first; defining it in `translations.yml` or a module's `translations/` folder does not make it available to `{{t}}`.
- React component strings live in `src/modules/[module]/translations/` and are loaded via `react-i18next` (see README for the extraction/update workflow).

## File Naming Conventions

- Folders in `src/`: kebab-case
- TypeScript/JavaScript files in `src/`: PascalCase or camelCase

## APIs

Use only public REST APIs documented at https://developer.zendesk.com/api-reference/
