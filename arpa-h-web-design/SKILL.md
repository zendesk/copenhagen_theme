---
name: arpa-h-web-design
description: >
  Design system reference for the NEXUS Design System (Figma file ZbjllSrYpVdkdyioGVuNx2).
  NEXUS layers on top of USWDS — every project must install @uswds/uswds for grid, reset,
  utilities, and the .gov banner. Use when building, reviewing, or discussing ARPA-H web UI —
  covers colors, typography, spacing, components, variables, and layout conventions extracted
  directly from Figma.
applyTo: "**/*.{ts,tsx,js,jsx,css,scss,html}"
---

# NEXUS Design System — Full Reference

Extracted from Figma file **ZbjllSrYpVdkdyioGVuNx2** ("📍 NEXUS Design System")  
Last extracted: April 30, 2026

**Architecture:** USWDS provides the foundation (grid, reset, utilities, `.gov` banner, base component HTML + accessibility). NEXUS layers brand tokens and visual overrides on top — colors, typography, corner radius, elevation, and component-level styling. Every NEXUS component maps to a USWDS base component. When building, start with USWDS HTML structure and apply NEXUS tokens/classes on top.

---

## Assets

All assets are included for offline reference. **When building on a native stack (Drupal, Svelte, Astro, Next.js, etc.), prefer the upstream sources listed below** — those are versioned with your stack and managed through your package manager. The copies here serve as offline reference, local development fallback, and design context for agents.

### Unique to NEXUS (always use these)

| File | Purpose |
|------|---------|
| [assets/styles/globals.css](./assets/styles/globals.css) | All NEXUS design tokens as CSS custom properties. Not part of USWDS — covers NEXUS brand colors (indigo/cyan/navy), Poppins typography scale, alias tokens, spacing, corner radius, and elevation shadows. Import first in every app. |
| [assets/images/arpa-h-logomark.svg](./assets/images/arpa-h-logomark.svg) | ARPA-H hexagon "H" logomark — full color (Navy `#001b5e`, Blue `#1176d6`, Cyan `#52daf2`). viewBox `0 0 287.8 314.39`. Light backgrounds. |
| [assets/images/arpa-h-logomark-navy.svg](./assets/images/arpa-h-logomark-navy.svg) | Logomark — flat Navy `#001b5e`. viewBox `0 0 287.79 314.39`. Single-color, light/white backgrounds. |
| [assets/images/arpa-h-logomark-black.svg](./assets/images/arpa-h-logomark-black.svg) | Logomark — flat black (inherits `currentColor`). viewBox `0 0 287.79 314.39`. Print / greyscale. |
| [assets/images/arpa-h-logomark-white.svg](./assets/images/arpa-h-logomark-white.svg) | Logomark — flat white `#fff`. viewBox `0 0 287.79 314.39`. Dark or colored backgrounds. |
| [assets/images/arpa-h-logomark-reverse.svg](./assets/images/arpa-h-logomark-reverse.svg) | Logomark — reverse colorway (body `#09349d`, white H, Blue/Cyan accents). viewBox `0 0 287.8 314.39`. Dark/navy/indigo backgrounds. |
| [assets/images/arpa-h-logo.svg](./assets/images/arpa-h-logo.svg) | Full horizontal logo lockup (mark + "ARPA-H" wordmark) — full color. Figma: `Logo=full-color` (also `Logo=thematic` — identical asset). viewBox `0 0 1132.84 314.39`. Light backgrounds. |
| [assets/images/arpa-h-logo-navy.svg](./assets/images/arpa-h-logo-navy.svg) | Full logo lockup — flat Navy `#001b5e`. Figma: `Logo=one-color-navy`. viewBox `0 0 1132.81 314.39`. Single-color, light/white backgrounds. |
| [assets/images/arpa-h-logo-black.svg](./assets/images/arpa-h-logo-black.svg) | Full logo lockup — flat black (inherits `currentColor`). Figma: `Logo=black`. viewBox `0 0 1132.81 314.39`. Print / greyscale. |
| [assets/images/arpa-h-logo-white.svg](./assets/images/arpa-h-logo-white.svg) | Full logo lockup — flat white `#fff`. Figma: `Logo=white`. viewBox `0 0 1132.81 314.39`. Dark or colored backgrounds. |
| [assets/images/arpa-h-logo-reverse.svg](./assets/images/arpa-h-logo-reverse.svg) | Full logo lockup — reverse colorway (white wordmark, reverse mark). Figma: `Logo=full-color-reverse`. viewBox `0 0 1132.84 314.39`. Dark/navy/indigo backgrounds. |
| [assets/styles/components.css](./assets/styles/components.css) | NEXUS visual overrides for USWDS components (Button, Alert, Text Input, Tag, Card, Nav Header, Pagination, Spinner). Layered on top of USWDS base styles — requires both USWDS core CSS and `globals.css` loaded first. |
| [assets/tokens.json](./assets/tokens.json) | All NEXUS tokens in W3C Design Token format. Use with Style Dictionary, Theo, or any token pipeline. |
| [assets/fonts/poppins-*.woff2](./assets/fonts/) | Poppins 300–700 (latin + latin-ext). **Not bundled with USWDS** — must be added separately. Used for all display text, h1, and h2. |

**Logo selection guide:**

| Context | Recommended file |
|---------|-----------------|
| Light / white background (default) | `arpa-h-logo.svg` (full color horizontal lockup) |
| Light / white, single-color constraint | `arpa-h-logo-navy.svg` |
| Dark / navy / indigo background | `arpa-h-logo-reverse.svg` |
| Dark background, flat white only | `arpa-h-logo-white.svg` |
| Print / greyscale | `arpa-h-logo-black.svg` |
| Icon / favicon / tight space (mark only) | `arpa-h-logomark.svg` → `-navy`, `-white`, `-reverse`, `-black` variants as above |

**Logo usage rules (verbatim from Figma Foundations — Logo Usage, node `73:25169`):**
- **Full color** — primary variation; use wherever possible, ideally on white or very light backgrounds.
- **Full color reverse** — use on black or very dark backgrounds.
- **Black** — use when full color is not an option, on a light background, or over an image.
- **White** — use when the full color logo is not legible, on a dark background, or over an image.
- **Navy** — use as an alternative to the black logo.
- **Dynamic / Thematic** — follows the full color logo; adapts to Figma's light and dark mode. Figma component variant name is `Logo=thematic`. In production code use `arpa-h-logo.svg` (same visual as full color).

**Clear space & minimum size (Figma Foundations — Clear Space & Sizing, node `73:25186`):**
- Clear space: a minimum equal to **50% of the logo's height** must be maintained on all sides.
- Minimum width: **100 px** for digital communications.

**ARPA-H Hexagon shape (Figma Foundations — Shape, node `73:25218`):**
- Standalone decorative element (`Shape=Default`, component key `535:2675`) — may be scaled freely.
- Use whenever the ARPA-H hexagon motif is needed without the full logotype.
- When used for signature image thumbnails, **stroke width must remain at 6**.
- Not included as a standalone SVG asset; pull directly from the NEXUS Figma file or extract the hexagon path from `arpa-h-logomark.svg`.

### Also available offline (prefer upstream in live stacks)

| File | Upstream source | Notes |
|------|----------------|-------|
| [assets/images/sprite.svg](./assets/images/sprite.svg) | `@uswds/uswds` npm package — `dist/img/sprite.svg` | Drupal USWDS theme, Astro/Svelte/Next apps using `@uswds/uswds` already have this. Use the copy here for offline reference or environments without npm. |
| [assets/fonts/public-sans-*.woff2](./assets/fonts/) | `@uswds/uswds` npm package — `dist/fonts/` | Bundled with USWDS. Use the copy here for fully air-gapped environments only. |
| [assets/fonts/roboto-mono-*.woff2](./assets/fonts/) | `@uswds/uswds` npm package — `dist/fonts/` | Bundled with USWDS. Same guidance as Public Sans. |
| [assets/fonts/fonts.css](./assets/fonts/fonts.css) | Google Fonts CDN (online) or the WOFF2 files above (offline) | `@font-face` declarations for all three families. Only needed when not using USWDS's own font loading. |

**Icon usage (all stacks):**
```html
<svg class="icon" aria-hidden="true" focusable="false" width="24" height="24">
  <use href="assets/images/sprite.svg#close"></use>
</svg>
```
```css
.icon { display: inline-block; width: 1.5rem; height: 1.5rem; fill: currentColor; }
```

**Setup — native stack (Drupal / Svelte / Astro / Next.js with `@uswds/uswds`):**
```html
<!-- Poppins only — not in USWDS -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<!-- NEXUS tokens -->
<link rel="stylesheet" href="assets/styles/globals.css">
<link rel="stylesheet" href="assets/styles/components.css">
<!-- sprite.svg and Public Sans/Roboto Mono come from your USWDS installation -->
```

**Setup — fully offline / air-gapped:**
```html
<link rel="stylesheet" href="assets/fonts/fonts.css">
<link rel="stylesheet" href="assets/styles/globals.css">
<link rel="stylesheet" href="assets/styles/components.css">
```

```tsx
// React / Next.js (offline)
import './assets/fonts/fonts.css';
import './assets/styles/globals.css';
import './assets/styles/components.css';
```

**Setup — Google Fonts CDN (requires internet):**
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Public+Sans:wght@300;400;500;600;700&family=Roboto+Mono:wght@400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/styles/globals.css">
<link rel="stylesheet" href="assets/styles/components.css">
```

---

## Prerequisites — USWDS

NEXUS is a **layer on top of USWDS (US Web Design System)**, not a replacement. Every ARPA-H web project must install USWDS core for grid, reset/normalize, utilities, and the required `.gov` banner. NEXUS provides the brand tokens, typography, and component-level overrides.

### Required: `@uswds/uswds` npm package

```bash
npm install @uswds/uswds @uswds/compile
```

### What USWDS provides (do not skip)

| Concern | USWDS source | Why it's required |
|---------|-------------|-------------------|
| CSS reset / normalize | `uswds-core` | Consistent cross-browser baseline |
| Grid system | `uswds-core` (`usa-grid`, `usa-layout-grid`) | NEXUS does not define its own grid; breakpoints align with USWDS |
| `.gov` banner | `usa-banner` partial | Legally required on all `.gov` sites |
| Utility classes | `uswds-core` (`usa-sr-only`, `usa-prose`, layout helpers) | Accessibility and layout primitives |
| Icon sprite | `dist/img/sprite.svg` | System icon set (offline copy in `assets/images/sprite.svg`) |
| Public Sans + Roboto Mono fonts | `dist/fonts/` | Body and monospace type (offline copies in `assets/fonts/`) |

### What NEXUS adds on top

| Concern | NEXUS source | Notes |
|---------|-------------|-------|
| Brand colors, alias tokens, spacing, radius, elevation | `globals.css` | CSS custom properties — import after USWDS core |
| Poppins font | `assets/fonts/` or Google Fonts CDN | Display + h1/h2 — **not bundled with USWDS** |
| Component styles (Button, Alert, Card, etc.) | `components.css` | Overrides USWDS component visuals to match NEXUS brand |

### Sass integration (Drupal / build-step stacks)

Include USWDS core but **exclude USWDS component partials** that NEXUS overrides:

```scss
// theme.scss — load order matters

// 1. USWDS core (reset, grid, utilities, fonts)
@forward "uswds-core";

// 2. USWDS components you still need as-is
@forward "usa-banner";          // required .gov banner

// 3. Do NOT forward these — NEXUS components.css replaces them:
//    usa-button, usa-alert, usa-card, usa-tag, usa-pagination, etc.

// 4. NEXUS layers (loaded as plain CSS or @import)
//    globals.css → components.css
```

### No-build stacks (static HTML, Twig without Sass)

```html
<!-- 1. USWDS compiled CSS (core + banner only) -->
<link rel="stylesheet" href="/path/to/uswds-core.css">

<!-- 2. Fonts — Poppins is not in USWDS -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">

<!-- 3. NEXUS tokens + components (after USWDS so overrides win) -->
<link rel="stylesheet" href="assets/styles/globals.css">
<link rel="stylesheet" href="assets/styles/components.css">
```

### Load order summary

```
USWDS core (reset + grid + utilities + banner)
  ↓
globals.css (NEXUS design tokens as CSS custom properties)
  ↓
components.css (NEXUS component overrides)
  ↓
Poppins font (Google Fonts CDN or self-hosted woff2)
```

If the load order is wrong — especially if `globals.css` loads before USWDS core — custom properties may resolve correctly but USWDS utility classes and grid will be missing.

---

## Table of Contents

1. [File Structure / Pages](#file-structure--pages)
2. [Color Styles (Paint Styles)](#color-styles-paint-styles)
3. [Typography / Text Styles](#typography--text-styles)
4. [Effect Styles (Shadows)](#effect-styles-shadows)
5. [Transparency & Blur](#transparency--blur)
6. [Design Variables & Tokens](#design-variables--tokens)
   - [Primitive Colors](#primitive-colors)
   - [Alias Tokens](#alias-tokens)
   - [Spacing Primitives](#spacing-primitives)
   - [Breakpoints](#breakpoints)
   - [Corner Radius](#corner-radius)
   - [Typography Variables](#typography-variables)
7. [Components](#components)
8. [Layout & Grid Conventions](#layout--grid-conventions)

---

## File Structure / Pages

| Page | Purpose |
|------|---------|
| Table of Contents | Navigation overview |
| Getting Started | Onboarding documentation |
| Release Notes | Changelog |
| Foundations | Foundations canvas (`73:20609`) — nine sub-pages |
| ↳ Logo | Logo variants, usage rules, clear space & sizing, ARPA-H hexagon shape |
| ↳ Color | Brand, accent, and semantic color ramps |
| ↳ Typography | Type families, scale tokens, responsive line heights |
| ↳ System Type Styles | Visual reference for all NEXUS text styles (Display, Heading, Body, Action) |
| ↳ Elevation | Drop shadow scale (`elevation/shadow-1` – `shadow-5`) and focus ring |
| ↳ Corner Radius | Corner radius tokens |
| ↳ Spacing | USWDS spacing scale and breakpoint tokens |
| ↳ Icons | System icon set (USWDS sprite) |
| ↳ Transparency & Blur 🆕 | Transparent surface token and 5 px blur — WIP |
| Components | Main component index |
| ↳ Accordion | Accordion component |
| ↳ Alert | Alert/notification component |
| ↳ Breadcrumb ✅ | Breadcrumb navigation (complete) |
| ↳ Button ✅ | Button component (complete) |
| ↳ Button Group | Button group component |
| ↳ Card | Card component |
| ↳ Checkbox | Checkbox input |
| ↳ File Input | File upload input |
| ↳ Footer | Site footer |
| ↳ Form Elements ⚠️ | Form elements (in progress) |
| ↳ Links | Link styles |
| ↳ Loading Spinner | Loading indicator |
| ↳ Multiselect | Multi-select dropdown |
| ↳ Navigation | Site navigation |
| ↳ Pagination ✅ | Pagination (complete) |
| ↳ Process List | Step/process list |
| ↳ Progress Indicator | Progress bar/indicator |
| ↳ Prose ✅ | Rich text/prose styles (complete) |
| ↳ Quote Block | Blockquote component |
| ↳ Radio Button | Radio input |
| ↳ Search | Search input/bar |
| ↳ Site Alert | Site-wide alert banner |
| ↳ Tag | Tag/badge component |
| ↳ Toggle | Toggle switch |
| ↳ Text Input | Text input field |
| ↳ Validation | Form validation states |
| ↳ USWDS Banner | US Web Design System banner |
| System Symbols | Icons and symbols library |
| Cover | Cover/title page |

---

## Color Styles (Paint Styles)

### Gradient Styles

12 linear gradient styles named `gradient/gradient-1` through `gradient/gradient-12`.  
(Exact gradient stops are defined on canvas; reference the Figma file for specific stop values.)

### Hover Overlay Styles

| Name | Color | Opacity | Use |
|------|-------|---------|-----|
| `hover/bg-dark-15` | `#ffffff` | 15% | White overlay for dark backgrounds |
| `hover/bg-light-10` | `#000334` (Indigo) | 10% | Dark overlay for light backgrounds |
| `hover/bg-light-5` | `#000334` (Indigo) | 5% | Subtle dark overlay for light backgrounds |

> **Note:** Solid brand colors are defined as **design variables** (see section below), not as paint styles. Use the variable collection tokens for all fills.

---

## Typography / Text Styles

### Font Families

| Role | Family |
|------|--------|
| Primary (Display & Headings lg/md) | **Poppins** |
| Secondary (Headings sm–xs, Body, Action) | **Public Sans** |
| Monospace (Code, Descriptors) | **Roboto Mono** |

### Display

| Style Name | Family | Weight | Size | Line Height | Letter Spacing | Paragraph Spacing |
|-----------|--------|--------|------|------------|----------------|-------------------|
| `display/regular` (large) | Poppins | SemiBold | 80px | 80px (1.0) | −1px | 40px |
| `display/regular` (medium) | Poppins | SemiBold | 40px | 46px (1.15) | −1px | 20px |

### Headings

| Style Name | HTML Tag | Family | Weight | Size (Desktop) | Line Height | Letter Spacing | Paragraph Spacing |
|-----------|----------|--------|--------|---------------|------------|----------------|-------------------|
| `heading/heading-lg` | h1 | Poppins | Medium | 48px | 55.2px (1.15) | −1px | 24px |
| `heading/heading-md` | h2 | Poppins | Medium | 36px | 41.4px (1.15) | −0.5px | 18px |
| `heading/heading-sm` | h3 | Public Sans | Medium | 32px | 36.8px (1.15) | −0.5px | 16px |
| `heading/title-lg` | h4 | Public Sans | Medium | 28px | 32.2px (1.15) | −0.5px | 14px |
| `heading/title-md` | h5 | Public Sans | Medium | 24px | 32.4px (1.35) | −0.5px | 12px |
| `heading/title-sm` | h6 | Public Sans | Medium | 20px | 27px (1.35) | −0.5px | 10px |

### Body

| Style Name | Family | Weight | Size | Line Height | Letter Spacing | Paragraph Spacing |
|-----------|--------|--------|------|------------|----------------|-------------------|
| `body/body-2xl` | Public Sans | Light | 24px | 36px (1.5) | −0.5px | 36px |
| `body/body-xl` | Public Sans | Light | 20px | 30px (1.5) | −0.5px | 24px |
| `body/body-lg` | Public Sans | Regular | 18px | 27px (1.5) | 0 | 20px |
| `body/body-md` | Public Sans | Regular | 16px | 24px (1.5) | 0 | 18px |
| `body/body-sm` | Public Sans | Regular | 14px | 21px (1.5) | 0 | 16px |
| `body/body-xs` | Public Sans | Regular | 12px | 18px (1.5) | 0 | 12px |

### Action (Button/Link Labels)

| Style Name | Family | Weight | Size | Line Height |
|-----------|--------|--------|------|------------|
| `action/action-lg/regular-24` | Public Sans | Regular | 20px | 24px |
| `action/action-lg/regular-18` | Public Sans | Regular | 20px | 18px |
| `action/action-md/regular-20` | Public Sans | Regular | 18px | 20px |
| `action/action-md/regular-16` | Public Sans | Regular | 18px | 16px |

### Document / Descriptors (Internal/Figma Use)

| Style Name | Family | Weight | Size | Line Height |
|-----------|--------|--------|------|------------|
| `document/descriptor-md-bold` | Roboto Mono | Bold | 12px | 14px |
| `document/descriptor-md` | Roboto Mono | Regular | 12px | 14px |
| `document/descriptor-sm-bold` | Roboto Mono | Bold | 10px | 12px |
| `document/descriptor-sm` | Roboto Mono | Regular | 10px | 12px |
| `document/description-xs` | Roboto Mono | Regular | 8px | 10px |

---

## Effect Styles (Shadows)

### Elevation Shadows

All elevation shadows use `rgba(0,0,0,0.10)` (10% black).

| Style Name | Type | X Offset | Y Offset | Blur Radius | Spread |
|-----------|------|----------|----------|------------|--------|
| `elevation/shadow-1` | Drop Shadow | 0 | 1px | 4px | 0 |
| `elevation/shadow-2` | Drop Shadow | 0 | 4px | 8px | 0 |
| `elevation/shadow-3` | Drop Shadow | 0 | 8px | 12px | 0 |
| `elevation/shadow-4` | Drop Shadow | 0 | 12px | 24px | 0 |
| `elevation/shadow-5` | Drop Shadow | 0 | 16px | 32px | 0 |

### State Shadows

| Style Name | Type | Color | X | Y | Blur | Spread | Use |
|-----------|------|-------|---|---|------|--------|-----|
| `state/focused` | Drop Shadow | `rgba(9,87,190,1.0)` (#0957be) | 0 | 0 | 3px | 1px | Focus ring (accessibility) |

---

## Transparency & Blur

> **Status:** Work In Progress in Figma (Foundations › Transparency & Blur, node `6501:7240`). Token value and blur radius are confirmed.

Used to create depth, hierarchy, and visual focus — especially in overlays, modals, cards, and navigation surfaces. Blur is paired with transparency to reduce visual noise while maintaining legibility.

### Transparent Surface Token

| Token | CSS variable | Value |
|-------|-------------|-------|
| `surface/card-transparent` | `--surface/card-transparent` | `rgba(243, 245, 248, 0.70)` |

> cool-grey-50 (`#f3f5f8`) at 70% opacity.

### Standard Backdrop Blur

The standard blur radius for transparent surfaces is **5 px**:

```css
.nexus-transparent-surface {
  background: var(--surface/card-transparent, rgba(243, 245, 248, 0.70));
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px); /* Safari */
}
```

Apply to: tags, cards, and background overlay surfaces.

---

## Design Variables & Tokens

### Primitive Colors

#### Indigo (Primary Brand)

| Token | Hex |
|-------|-----|
| `color/indigo/indigo-50` | `#d4d5dd` |
| `color/indigo/indigo-100` | `#aaabbb` |
| `color/indigo/indigo-200` | `#808199` |
| `color/indigo/indigo-300` | `#555778` |
| `color/indigo/indigo-400` | `#2a2d56` |
| `color/indigo/indigo-neutral` | `#000334` |
| `color/indigo/indigo-600` | `#00022b` |
| `color/indigo/indigo-700` | `#000223` |
| `color/indigo/indigo-800` | `#00011a` |
| `color/indigo/indigo-900` | `#000111` |
| `color/indigo/indigo-1000` | `#000009` |

#### Cyan (Secondary Brand)

| Token | Hex |
|-------|-----|
| `color/cyan/cyan-50` | `#e2f9fd` |
| `color/cyan/cyan-100` | `#c5f3fb` |
| `color/cyan/cyan-200` | `#a8ecf8` |
| `color/cyan/cyan-300` | `#8ce6f6` |
| `color/cyan/cyan-400` | `#6fe0f4` |
| `color/cyan/cyan-neutral` | `#52daf2` |
| `color/cyan/cyan-600` | `#44b6ca` |
| `color/cyan/cyan-700` | `#3791a1` |
| `color/cyan/cyan-800` | `#296d79` |
| `color/cyan/cyan-900` | `#1b4951` |
| `color/cyan/teal-1000` | `#0e2428` |

#### Navy (Tertiary Brand)

| Token | Hex |
|-------|-----|
| `color/navy/navy-50` | `#d4d9e4` |
| `color/navy/navy-100` | `#aab3c9` |
| `color/navy/navy-200` | `#808dae` |
| `color/navy/navy-300` | `#556794` |
| `color/navy/navy-400` | `#2a4179` |
| `color/navy/navy-neutral` | `#001b5e` |
| `color/navy/navy-600` | `#00164e` |
| `color/navy/navy-700` | `#00123f` |
| `color/navy/navy-800` | `#000d2f` |
| `color/navy/navy-900` | `#00091f` |
| `color/navy/navy-1000` | `#000410` |

#### Blue (Accent Cool / Info)

| Token | Hex |
|-------|-----|
| `color/blue/blue-50` | `#e6f5fc` |
| `color/blue/blue-100` | `#cdeafa` |
| `color/blue/blue-200` | `#b4e0f7` |
| `color/blue/blue-300` | `#9bd6f5` |
| `color/blue/blue-400` | `#65c4ee` |
| `color/blue/blue-neutral` | `#2fb1e6` |
| `color/blue/blue-600` | `#1c84d2` |
| `color/blue/blue-700` | `#0957be` |
| `color/blue/blue-800` | `#07418f` |
| `color/blue/blue-900` | `#042c5f` |
| `color/blue/blue-1000` | `#021630` |

#### Violet (Accent Cooler)

| Token | Hex |
|-------|-----|
| `color/violet/violet-50` | `#edecf8` |
| `color/violet/violet-100` | `#dbd8f1` |
| `color/violet/violet-200` | `#cac5eb` |
| `color/violet/violet-300` | `#b8b2e4` |
| `color/violet/violet-400` | `#887adb` |
| `color/violet/violet-neutral` | `#5842d2` |
| `color/violet/violet-600` | `#4535a7` |
| `color/violet/violet-700` | `#33287c` |
| `color/violet/violet-800` | `#261e5d` |
| `color/violet/violet-900` | `#19143e` |
| `color/violet/violet-1000` | `#0d0a1f` |

#### Turquoise (Accent Warm)

| Token | Hex |
|-------|-----|
| `color/turquoise/turquoise-50` | `#eafaf8` |
| `color/turquoise/turquoise-100` | `#d6f5f2` |
| `color/turquoise/turquoise-200` | `#c1f1eb` |
| `color/turquoise/turquoise-300` | `#adece5` |
| `color/turquoise/turquoise-400` | `#6be7d8` |
| `color/turquoise/turquoise-neutral` | `#29e1cb` |
| `color/turquoise/turquoise-600` | `#20b3a1` |
| `color/turquoise/turquoise-700` | `#188478` |
| `color/turquoise/turquoise-800` | `#12635a` |
| `color/turquoise/turquoise-900` | `#0c423c` |

#### Pink (Accent Warmer)

| Token | Hex |
|-------|-----|
| `color/pink/pink-50` | `#feeff6` |
| `color/pink/pink-100` | `#fde0ed` |
| `color/pink/pink-200` | `#fdd0e5` |
| `color/pink/pink-300` | `#fcc1dc` |
| `color/pink/pink-400` | `#fd82ba` |
| `color/pink/pink-neutral` | `#fd4497` |
| `color/pink/pink-600` | `#c93678` |
| `color/pink/pink-700` | `#942859` |
| `color/pink/pink-800` | `#6f1e43` |
| `color/pink/pink-900` | `#4a142d` |
| `color/pink/pink-1000` | `#250a16` |

#### Cool Grey (Interface / Neutral)

| Token | Hex |
|-------|-----|
| `color/cool-grey/cool-grey-0` | `#ffffff` |
| `color/cool-grey/cool-grey-50` | `#f3f5f8` |
| `color/cool-grey/cool-grey-100` | `#e5eaf0` |
| `color/cool-grey/cool-grey-200` | `#d7dee8` |
| `color/cool-grey/cool-grey-300` | `#ccd5e1` |
| `color/cool-grey/cool-grey-400` | `#bac2cc` |
| `color/cool-grey/cool-grey-neutral` | `#959ba3` |
| `color/cool-grey/cool-grey-600` | `#6f747a` |
| `color/cool-grey/cool-grey-700` | `#4a4d52` |
| `color/cool-grey/cool-grey-800` | `#252729` |
| `color/cool-grey/cool-grey-900` | `#131314` |
| `color/cool-grey/cool-grey-1000` | `#000000` |

#### Green (Success)

| Token | Hex |
|-------|-----|
| `color/green/green-50` | `#dee6d7` |
| `color/green/green-100` | `#becdaf` |
| `color/green/green-200` | `#9eb487` |
| `color/green/green-300` | `#7d9b5e` |
| `color/green/green-400` | `#5d8236` |
| `color/green/green-neutral` | `#3c690e` |
| `color/green/green-600` | `#32570c` |
| `color/green/green-700` | `#284609` |
| `color/green/green-800` | `#1e3507` |
| `color/green/green-900` | `#142305` |
| `color/green/green-1000` | `#0a1202` |

#### Yellow (Warning)

| Token | Hex |
|-------|-----|
| `color/yellow/yellow-50` | `#fdf3df` |
| `color/yellow/yellow-100` | `#fbe8bf` |
| `color/yellow/yellow-200` | `#f9dca0` |
| `color/yellow/yellow-300` | `#f7d080` |
| `color/yellow/yellow-400` | `#f5c560` |
| `color/yellow/yellow-neutral` | `#f3b940` |
| `color/yellow/yellow-600` | `#ca9a35` |
| `color/yellow/yellow-700` | `#a27b2b` |
| `color/yellow/yellow-800` | `#7a5d20` |
| `color/yellow/yellow-900` | `#513e15` |
| `color/yellow/yellow-1000` | `#291f0b` |

#### Red (Error)

| Token | Hex |
|-------|-----|
| `color/red/red-50` | `#f4dcd9` |
| `color/red/red-100` | `#eab9b4` |
| `color/red/red-200` | `#df968e` |
| `color/red/red-300` | `#d47368` |
| `color/red/red-400` | `#ca5043` |
| `color/red/red-neutral` | `#bf2d1d` |
| `color/red/red-600` | `#9f2518` |
| `color/red/red-700` | `#7f1e13` |
| `color/red/red-800` | `#60170f` |
| `color/red/red-900` | `#400f0a` |
| `color/red/red-1000` | `#200805` |

---

### Alias Tokens

Alias tokens are semantic references that map to primitives. Use these in components, not raw primitives.

#### Brand

| Alias Token | References |
|------------|-----------|
| `Brand/primary` | `{color/indigo/indigo-neutral}` → `#000334` |
| `Brand/primary-light` | `{color/indigo/indigo-400}` → `#2a2d56` |
| `Brand/primary-dark` | `{color/indigo/indigo-600}` → `#00022b` |
| `Brand/secondary` | `{color/cyan/cyan-neutral}` → `#52daf2` |
| `Brand/secondary-light` | `{color/cyan/cyan-400}` → `#6fe0f4` |
| `Brand/secondary-dark` | `{color/cyan/cyan-600}` → `#44b6ca` |
| `Brand/tertiary` | `{color/navy/navy-neutral}` → `#001b5e` |
| `Brand/tertiary-light` | `{color/navy/navy-400}` → `#2a4179` |
| `Brand/tertiary-dark` | `{color/navy/navy-600}` → `#00164e` |
| `Brand/white` | `{color/cool-grey/cool-grey-0}` → `#ffffff` |

#### Logo

| Alias Token | Hex | Notes |
|------------|-----|-------|
| `Logo/logo-blue-dark` | `#09349d` | Dark logo blue |
| `Logo/logo-blue` | `#1176d6` | Mid logo blue |
| `Logo/logo-blue-light` | `#52daf2` | Light logo blue (matches cyan-neutral) |

#### Accent

| Alias Token | References |
|------------|-----------|
| `Accent/accent-cool-light` | `{color/blue/blue-300}` → `#9bd6f5` |
| `Accent/accent-cool` | `{color/blue/blue-neutral}` → `#2fb1e6` |
| `Accent/accent-cool-dark` | `{color/blue/blue-700}` → `#0957be` |
| `Accent/accent-cooler-light` | `{color/violet/violet-300}` → `#b8b2e4` |
| `Accent/accent-cooler` | `{color/violet/violet-neutral}` → `#5842d2` |
| `Accent/accent-cooler-dark` | `{color/violet/violet-700}` → `#33287c` |
| `Accent/accent-warm-light` | `{color/turquoise/turquoise-300}` → `#adece5` |
| `Accent/accent-warm` | `{color/turquoise/turquoise-neutral}` → `#29e1cb` |
| `Accent/accent-warm-dark` | `{color/turquoise/turquoise-700}` → `#188478` |
| `Accent/accent-warmer-light` | `{color/pink/pink-300}` → `#fcc1dc` |
| `Accent/accent-warmer` | `{color/pink/pink-neutral}` → `#fd4497` |
| `Accent/accent-warmer-dark` | `{color/pink/pink-700}` → `#942859` |

#### Interface (Neutral Scale)

| Alias Token | References | Hex |
|------------|-----------|-----|
| `Interface/ui-5` | `{color/cool-grey/cool-grey-50}` | `#f3f5f8` |
| `Interface/ui-10` | `{color/cool-grey/cool-grey-100}` | `#e5eaf0` |
| `Interface/ui-20` | `{color/cool-grey/cool-grey-200}` | `#d7dee8` |
| `Interface/ui-30` | `{color/cool-grey/cool-grey-300}` | `#ccd5e1` |
| `Interface/ui-40` | `{color/cool-grey/cool-grey-400}` | `#bac2cc` |
| `Interface/ui-50` | `{color/cool-grey/cool-grey-neutral}` | `#959ba3` |
| `Interface/ui-60` | `{color/cool-grey/cool-grey-600}` | `#6f747a` |
| `Interface/ui-70` | `{color/cool-grey/cool-grey-700}` | `#4a4d52` |
| `Interface/ui-80` | `{color/cool-grey/cool-grey-800}` | `#252729` |
| `Interface/ui-90` | `{color/cool-grey/cool-grey-900}` | `#131314` |
| `Interface/black` | `{color/cool-grey/cool-grey-1000}` | `#000000` |

#### Feedback (Semantic State Colors)

| Alias Token | References | Hex |
|------------|-----------|-----|
| `Feedback/info` | `{color/blue/blue-700}` | `#0957be` |
| `Feedback/info-light` | `{color/blue/blue-100}` | `#cdeafa` |
| `Feedback/success` | `{color/green/green-neutral}` | `#3c690e` |
| `Feedback/success-light` | `{color/green/green-50}` | `#dee6d7` |
| `Feedback/warning` | `{color/yellow/yellow-neutral}` | `#f3b940` |
| `Feedback/warning-light` | `{color/yellow/yellow-50}` | `#fdf3df` |
| `Feedback/warning-dark` | `{color/yellow/yellow-800}` | `#7a5d20` |
| `Feedback/error` | `{color/red/red-neutral}` | `#bf2d1d` |
| `Feedback/error-light` | `{color/red/red-50}` | `#f4dcd9` |
| `Feedback/error-dark` | `{color/red/red-700}` | `#7f1e13` |

---

### Spacing Primitives

The spacing scale follows the USWDS spacing system. All values are in pixels.

| Token | Value (px) |
|-------|-----------|
| `spacing/1px` | 1 |
| `spacing/2px` | 2 |
| `spacing/05` | 4 |
| `spacing/1` | 8 |
| `spacing/105` | 12 |
| `spacing/2` | 16 |
| `spacing/205` | 20 |
| `spacing/3` | 24 |
| `spacing/4` | 32 |
| `spacing/5` | 40 |
| `spacing/6` | 48 |
| `spacing/7` | 56 |
| `spacing/8` | 64 |
| `spacing/9` | 72 |
| `spacing/10` | 80 |
| `spacing/15` | 120 |
| `spacing/card` | 160 |
| `spacing/card-lg` | 240 |

---

### Breakpoints

Breakpoints are encoded as spacing values (also used as layout width references).

| Token | Value (px) | Breakpoint |
|-------|-----------|-----------|
| `spacing/mobile` | 320 | Mobile |
| `spacing/mobile-lg` | 480 | Mobile Large |
| `spacing/tablet` | 640 | Tablet |
| `spacing/tablet-lg` | 880 | Tablet Large |
| `spacing/desktop` | 1024 | Desktop |
| `spacing/desktop-lg` | 1200 | Desktop Large |
| `spacing/widescreen` | 1400 | Widescreen |

---

### Corner Radius

| Token | Value (px) |
|-------|-----------|
| `corner-radius/none` | 0 |
| `corner-radius/xs` | 2 |
| `corner-radius/sm` | 4 |
| `corner-radius/smed` | 6 |
| `corner-radius/md` | 8 |
| `corner-radius/lg` | 16 |
| `corner-radius/xl` | 24 |
| `corner-radius/2xl` | 32 |
| `corner-radius/3xl` | 48 |
| `corner-radius/round` | 1000 (pill) |

---

### Typography Variables

**Collection: Typography** — has Desktop and Mobile modes.

#### Font Families

| Token | Value |
|-------|-------|
| `font/font-family/primary` | Poppins |
| `font/font-family/secondary` | Public Sans |
| `font/font-family/mono` | Roboto Mono |

#### Font Weights

| Token | Value |
|-------|-------|
| `font/font-weight/thin` | Thin |
| `font/font-weight/extralight` | ExtraLight |
| `font/font-weight/light` | Light |
| `font/font-weight/regular` | Regular |
| `font/font-weight/medium` | Medium |
| `font/font-weight/semibold` | SemiBold |
| `font/font-weight/bold` | Bold |
| `font/font-weight/extrabold` | ExtraBold |
| `font/font-weight/black` | Black |

#### Font Sizes (Desktop → Mobile)

| Token | Desktop | Mobile |
|-------|---------|--------|
| `font/font-size/3xs` | 12px | 12px |
| `font/font-size/2xs` | 14px | 14px |
| `font/font-size/xs` | 16px | 16px |
| `font/font-size/sm` | 18px | 18px |
| `font/font-size/md` | 20px | 20px |
| `font/font-size/lg` | 24px | 24px |
| `font/font-size/xl` | 28px | 22.4px |
| `font/font-size/2xl` | 32px | 25.6px |
| `font/font-size/3xl` | 36px | 28.8px |
| `font/font-size/4xl` | 40px | 32px |
| `font/font-size/5xl` | 48px | 38.4px |
| `font/font-size/6xl` | 80px | 64px |

#### Letter Spacing

| Token | Value |
|-------|-------|
| `font/letter-spacing/neg-2` | −2px |
| `font/letter-spacing/neg-1` | −1px |
| `font/letter-spacing/neg-05` | −0.5px |
| `font/letter-spacing/auto` | 0 |
| `font/letter-spacing/pos-05` | 0.5px |
| `font/letter-spacing/pos-1` | 1px |
| `font/letter-spacing/pos-2` | 2px |

#### Line Height Scale

| Token | Value |
|-------|-------|
| `Calculated Line Height/height-1` | 1.0 |
| `Calculated Line Height/height-2` | 1.15 |
| `Calculated Line Height/height-3` | 1.35 |
| `Calculated Line Height/height-4` | 1.5 |
| `Calculated Line Height/height-5` | 1.62 |
| `Calculated Line Height/height-6` | 1.75 |

#### Responsive Line Heights (Desktop → Mobile)

| Token | Desktop | Mobile |
|-------|---------|--------|
| `font/line-height/display/display-1` | 80px | 64px |
| `font/line-height/display/display-2` | 46px | 36.8px |
| `font/line-height/heading/h1` | 55.2px | 44.2px |
| `font/line-height/heading/h2` | 41.4px | 33.1px |
| `font/line-height/heading/h3` | 36.8px | 29.4px |
| `font/line-height/heading/h4` | 32.2px | 25.8px |
| `font/line-height/heading/h5` | 32.4px | 32.4px |
| `font/line-height/heading/h6` | 27px | 27px |
| `font/line-height/body/body-2xl` | 36px | 36px |
| `font/line-height/body/body-xl` | 30px | 30px |
| `font/line-height/body/body-lg` | 27px | 12px |
| `font/line-height/body/body-md` | 24px | 24px |
| `font/line-height/body/body-sm` | 21px | 21px |
| `font/line-height/body/body-xs` | 18px | 18px |
| `font/line-height/action/action-1` | 24px | 24px |
| `font/line-height/action/action-2` | 20px | 20px |
| `font/line-height/action/action-3` | 16px | 16px |

---

## Components

NEXUS components are styled on top of **USWDS (US Web Design System)** base components. Every NEXUS component has a corresponding USWDS component underneath — USWDS provides the structural HTML, accessibility, and behavior; NEXUS overrides the visual appearance (colors, typography, radius, spacing) to match the ARPA-H brand.

Components exist in three tiers:

1. **Published library component** — fully designed in Figma and published to the NEXUS shared library. These have complete variant definitions and are ready for production use.
2. **Page-level spec** — a Figma page exists with specs and annotations, but the component is not yet published to the library. Use the USWDS base component and apply NEXUS tokens from `globals.css` and `components.css`.
3. **USWDS only** — no NEXUS customization exists yet. Use stock USWDS.

### Component Inventory — USWDS → NEXUS Mapping

| Component | USWDS base | NEXUS status | NEXUS library key | Notes |
|-----------|-----------|-------------|-------------------|-------|
| **Button** | `usa-button` | ✅ Published | `47e5ad4d…` | Variants: Primary, Secondary, Outline, Unstyled. Sizes: Default, Large. States: Default, Hover, Focused, Disabled. Types: Text Only, With Icon. Pill shape (`radius-round`), cyan primary bg. |
| **Button Group** | `usa-button-group` | ✅ Published | `5bb79a9e…` | Grouped button sets |
| **Icon Button** | `usa-button` (icon variant) | ✅ Published | `b3935913…` | Button with icon only + drop shadow |
| **Search Button** | `usa-search` (button) | ✅ Published | `105b3155…` | Search input submit button |
| **Alert** | `usa-alert` | ✅ Published | `fc007075…` | Variants: Info, Neutral, Success, Warning, Error. Options: Simple/Full, Show/Hide Icon, Show/Hide Close, Nested. Rounded corners (`radius-lg`), NEXUS feedback colors. |
| **Site Alert** | `usa-site-alert` | ✅ Published | `de75ab14…` | Full-width site-level banner variant |
| **Navigation (Public)** | `usa-nav` | ✅ Published | `b3cebf62…` | Public site header navigation with mega menu |
| **Navigation (Solutions)** | `usa-nav` | ✅ Published | `a2b94ebb…` | Solutions Portal variant |
| **Footer (Public)** | `usa-footer` | ✅ Published | `f0043000…` | Public site footer |
| **Footer (Solutions)** | `usa-footer` | ✅ Published | `2407256a…` | Solutions Portal footer variant |
| **Pagination** | `usa-pagination` | ✅ Published | `d9080a9a…` | Pagination steps/controls |
| **Quote Block** | `usa-blockquote` | ✅ Published | `b7bed23a…` | Styled blockquote |
| **Loading Spinner** | — (no USWDS equivalent) | ✅ Published | `1ce752e0…` | NEXUS-specific animated loading indicator |
| **Radio Button** | `usa-radio` | ✅ Published | `aac0ee24…` | Single-select radio inputs |
| **Radio Label** | `usa-radio__label` | ✅ Published | `6183d9a3…` | Radio input label styling |
| **Icon** | USWDS sprite system | ✅ Published | `c1223e88…` | NEXUS icon component wrapping USWDS sprite |
| **Accordion** | `usa-accordion` | 📄 Page only | — | Expand/collapse panels. Use USWDS accordion + NEXUS tokens. |
| **Breadcrumb** | `usa-breadcrumb` | 📄 Page only (✅ spec complete) | — | Navigation trail. Page spec is complete. |
| **Card** | `usa-card` | 📄 Page only | — | Content card container. Apply NEXUS radius + elevation tokens. |
| **Checkbox** | `usa-checkbox` | 📄 Page only | — | Single/group checkbox inputs |
| **File Input** | `usa-file-input` | 📄 Page only | — | File upload control |
| **Form Elements** | `usa-form`, `usa-fieldset` | 📄 Page only (⚠️ needs review) | — | General form wrapper/fieldset |
| **Links** | `usa-link` | 📄 Page only | — | Inline and standalone link styles. NEXUS uses `--color-link` (#0957be) with underline animation. |
| **Multiselect** | `usa-combo-box` | 📄 Page only | — | Multi-option dropdown |
| **Process List** | `usa-process-list` | 📄 Page only | — | Numbered step list |
| **Progress Indicator** | `usa-step-indicator` | 📄 Page only | — | Progress bar/stepper |
| **Prose** | `usa-prose` | 📄 Page only (✅ spec complete) | — | Rich text content styles |
| **Search** | `usa-search` | 📄 Page only | — | Search input/bar. Search Button is published separately. |
| **Tag** | `usa-tag` | 📄 Page only | — | Label/badge chips. Apply NEXUS transparent surface for glass effect. |
| **Text Input** | `usa-input` | 📄 Page only | — | Border: 1px `--color-ui-40`. Radius: `--radius-md` (8px). Focus: `--shadow-focus`. |
| **Toggle** | `usa-toggle` | 📄 Page only | — | On/off toggle switch |
| **Validation** | `usa-error-message`, `usa-hint` | 📄 Page only | — | Inline form error/hint messages |
| **USWDS Banner** | `usa-banner` | 🏛️ USWDS only | — | Required `.gov` banner. **Do not override** — use stock USWDS. |

### Published Library Component Sets (Figma)

Full list of UI component sets published to the 📍 NEXUS Design System library:

| Component Set | Component Key | Variants / Notes |
|--------------|--------------|-----------------|
| Button | `47e5ad4d7adb07908bffb23f642a8f0693d30988` | Kind × Size × Type × Disabled × State |
| Button Group | `5bb79a9e6c8b308214e11b4eb550ad391e1344cc` | Grouped actions |
| Icon Button Drop Shadow | `b3935913d9e2e67be521e7d258abb595d114ac16` | Icon-only with elevation |
| Search Button | `105b31557acc94ec60528372bb38a05e67c166da` | Search submit |
| Alert | `fc007075e4ad11d810733ecb6ed9fd9b6b637ab1` | State × Simple × Nested, close/icon toggles |
| Site Alert | `de75ab148ace0d9dd6e968db39cc3474606180ca` | Full-width banner variant |
| Navigation / Public Site | `b3cebf6293410901f1f76be61a914dbd6fedf94b` | Header nav + mega menu |
| Navigation / Solutions Portal | `a2b94ebbe86de6bd014a1f4e7467af4c148fd96b` | Solutions variant |
| Footer / Public Site | `f0043000ec93d6ca5174b4415b3335b1a5b19af9` | Public site footer |
| Footer / Solutions Portal | `2407256a9043a76075015a56bb5ab39cabc09514` | Solutions footer variant |
| Pagination Steps | `d9080a9a1cd65dd1f66a1333758cd05bfb5e07a3` | Page navigation |
| Quote Block | `b7bed23a97f692401c3163ddf71de16b7449ef09` | Styled blockquote |
| Loading Spinner 2 | `1ce752e08894f72aeafc8a2eff0319844ec684b5` | Animated spinner |
| Radio Button | `aac0ee24fa809f9f1f407394b5f0abf7f42e6225` | Radio input |
| Radio Label | `6183d9a36e5cefc5ac18a9bc3f4d9c134e3c9694` | Radio label styling |
| Icon | `c1223e8821eb78ca7b2d95d4fa007df78d4c598e` | Icon wrapper |

### Component Implementation Guide

**For published components (✅):** The USWDS structural HTML is the base. Apply NEXUS classes from `components.css` or reference the Figma component directly via the MCP (`get_design_context` with the component key).

**For page-only components (📄):** Start with the stock USWDS component HTML. Then:
1. Load `globals.css` for token overrides (colors, spacing, radius)
2. Load `components.css` for any NEXUS-specific class overrides
3. Reference the Figma page for visual details not captured in CSS (layout, specific spacing, responsive behavior)

**For USWDS-only components (🏛️):** Use stock USWDS. The `.gov` banner (`usa-banner`) must never be visually modified.

### Key NEXUS Visual Departures from Stock USWDS

| Property | Stock USWDS | NEXUS Override |
|----------|------------|----------------|
| Button shape | Rectangle with small radius | Pill (`border-radius: 1000px`) |
| Button primary color | Blue (`#0050d8`) | Cyan (`#52daf2`) with indigo text (`#000334`) |
| Alert corners | Square | Rounded (`border-radius: 16px`) |
| Alert colors | USWDS blue/green/gold/red | NEXUS feedback tokens (info `#0957be`, success `#3c690e`, warning `#7a5d20`, error `#bf2d1d`) |
| Input corners | Square | Rounded (`border-radius: 8px`) |
| Focus ring | USWDS outline | Box shadow (`0 0 0 1px #0957be, 0 0 3px 1px #0957be`) |
| Typography | Source Sans Pro | Poppins (display/h1-h2) + Public Sans (h3-h6/body) |
| Spacing | USWDS spacing scale | Same scale, same values — NEXUS aligns exactly |

---

## Layout & Grid Conventions

### Breakpoint System (USWDS-aligned)

| Name | Width |
|------|-------|
| Mobile | 320px |
| Mobile LG | 480px |
| Tablet | 640px |
| Tablet LG | 880px |
| Desktop | 1024px |
| Desktop LG | 1200px |
| Widescreen | 1400px |

### Spacing Scale Conventions

The spacing system is a USWDS-derived 8px base grid:

- **Base unit**: 8px (`spacing/1`)
- **Half unit**: 4px (`spacing/05`)
- **Quarter unit**: 2px (use `corner-radius/xs`)
- **Common padding**: `spacing/2` (16px), `spacing/3` (24px), `spacing/4` (32px)
- **Section gaps**: `spacing/5` (40px) – `spacing/10` (80px)
- **Large whitespace**: `spacing/15` (120px)

### Typography Responsive Scaling

Heading and display sizes scale down on mobile using an approximate **0.8× multiplier**:
- `h1`: 48px desktop → ~38px mobile
- `h2`: 36px desktop → ~29px mobile
- `h3`: 32px desktop → ~26px mobile
- Display: 80px desktop → 64px mobile

Body sizes do **not** scale between desktop and mobile.

### Font Pairing Rule

- **Display + h1/h2**: Poppins (SemiBold/Medium) — use for hero sections and major headings
- **h3 through h6**: Public Sans (Medium) — section titles, card titles
- **Body copy**: Public Sans (Regular/Light) — all prose content
- **Code / Labels**: Roboto Mono — monospaced descriptors, code blocks

### Shadow / Elevation Usage

| Level | Token | Typical Use |
|-------|-------|------------|
| 1 | `elevation/shadow-1` | Subtle card lift |
| 2 | `elevation/shadow-2` | Cards, dropdowns |
| 3 | `elevation/shadow-3` | Modals, popovers |
| 4 | `elevation/shadow-4` | Elevated panels |
| 5 | `elevation/shadow-5` | Drawers, sidebars |
| Focus | `state/focused` | Keyboard focus ring (blue, `#0957be`) |

### Focus Ring Convention

All interactive elements must use the `state/focused` drop shadow as the focus indicator:  
`box-shadow: 0 0 0 1px #0957be, 0 0 3px 1px #0957be;` (spread 1, blur 3, color `#0957be`)

This ensures WCAG 2.4.7 compliance across the system.
