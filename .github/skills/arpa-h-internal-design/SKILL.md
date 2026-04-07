---
name: arpa-h-internal-design
description: "ARPA-H Internal App Design System. Use when building, extending, or restyling any internal ARPA-H web application UI. Covers color tokens, layout conventions, typography, semantic color rules, and component behavior specs. Stack-agnostic — applies to React, Svelte, Vue, or any other frontend framework."
---

# ARPA-H Internal App Design System

## Design Philosophy

- **Monochrome dark base.** The UI uses a single grayscale ramp as its foundation. Color is used only for semantic signaling — never for decoration.
- **Inverted header.** The top title bar is intentionally white on a dark-page background, creating a crisp containment boundary. It uses the full window width. `assets/arpa-h.svg` is used as the logo within the size of the header.
- **Sparse accent use.** Hot pink and teal/lavender are reserved for status meaning. Overusing them dilutes their signal.
- **Accessibility first.** All interactive elements must meet WCAG AA contrast on their background. Disabled states use the muted foreground token.

---

## Color Tokens

Define these as CSS custom properties (or equivalent) in every app. The starter file is at [assets/globals.css](./assets/globals.css).

### Neutral Scale (dark → light)

| Token name              | Hex       | Primary use                        |
|-------------------------|-----------|------------------------------------|
| `--color-void`          | `#000000` | True black — not used as a surface |
| `--color-near-black`    | `#131314` | Inverted backgrounds, tooltips     |
| `--color-bg-page`       | `#4A4D52` | Main page / body fill              |
| `--color-bg-card`       | `#6F747A` | Cards, panels, raised surfaces     |
| `--color-bg-elevated`   | `#959BA3` | Popovers, dropdowns, modals        |
| `--color-muted-3`       | `#BAC2CC` | Muted foreground, borders          |
| `--color-muted-2`       | `#CCD5E1` | Secondary muted text               |
| `--color-muted-1`       | `#D7DEE8` | Hover foreground states            |
| `--color-subtle`        | `#E5EAF0` | Secondary body text                |
| `--color-faint`         | `#F3F5F8` | Pressed body text                  |
| `--color-white`         | `#FFFFFF` | Primary text, header background    |

### Semantic Accent Colors

| Token name                    | Hex       | Meaning — use ONLY for this        |
|-------------------------------|-----------|------------------------------------|
| `--color-status-warning`      | `#FD4497` | Collision / duplicate / warning    |
| `--color-status-warning-soft` | `#FCC1DC` | Secondary warning text             |
| `--color-active`              | `#ADECE5` | Active record, active filter state |
| `--color-inactive`            | `#B8B2E4` | Inactive / departed record         |

### Header Colors (intentionally inverted)

| Token name          | Hex       | Use                               |
|---------------------|-----------|-----------------------------------|
| `--color-header-bg` | `#FFFFFF` | Header/nav bar background         |
| `--color-header-fg` | `#000334` | Header brand text and icons       |

---

## Layout

### Shell Structure

```text
┌─────────────────────────────────────────────────┐
│  HEADER — 48px tall, white bg (#FFFFFF)         │
│  [Brand icon + "App Name"]     [User area]      │
├─────────────────────────────────────────────────┤
│                                                 │
│  MAIN — flex: 1, max-width 1200px, centered     │
│  padding: 24px horizontal                       │
│                                                 │
└─────────────────────────────────────────────────┘
```

- Full-viewport height via flexbox column on the root element.
- Header uses `justify-content: space-between` with `align-items: center`.
- Brand area is a link (left side): icon + app name, no underline, `--color-header-fg`.
- User area (right side): avatar + username + ghost sign-out icon button.

### Spacing Scale

Map to a 4px base unit:

| Name | Value |
|------|-------|
| XS   | 4px   |
| S    | 8px   |
| M    | 12px  |
| L    | 16px  |
| XL   | 24px  |
| XXL  | 32px  |

---

## Typography

- **Font stack:** `'Segoe UI', system-ui, Arial, sans-serif`
- **Color scheme:** dark (set `color-scheme: dark` on `:root`)
- **Base:** `font-size: 16px`, `line-height: 1.5`, `font-weight: 400`
- **Body color:** `#FFFFFF`

### Size / Weight Scale

| Role               | Size  | Weight     |
|--------------------|-------|------------|
| Page title (H1)    | 28px  | 600        |
| Section title (H3) | 20px  | 600        |
| Primary body       | 16px  | 400        |
| Secondary body     | 14px  | 400        |
| Labels / captions  | 12px  | 400        |
| Micro / edited     | 11px  | 400 italic |

---

## Semantic Color Rules

These rules are non-negotiable — they define the visual language of ARPA-H internal apps.

### Active vs. Inactive Records

- **Active** record title and status badge: `--color-active` (`#ADECE5`, muted teal)
- **Inactive / departed** record title and status badge: `--color-inactive` (`#B8B2E4`, soft lavender)
- Badge text color (on both): `--color-near-black` (`#131314`) for legibility

### Collisions / Warnings

- Any detected duplicate, collision, or data integrity warning uses `--color-status-warning` (`#FD4497`) — hot pink
- Warning icon and primary warning text: `#FD4497`
- Secondary / descriptive warning text: `#FCC1DC`
- Warning is shown inline above the affected content with a ⚠ prefix

### Table Links

- Name/identifier links within data tables: `--color-active` (`#ADECE5`) default
- On hover: `--color-status-warning-soft` (`#FCC1DC`)
- No underline at rest; underline on focus for accessibility

### Active Filter Indicators

- A column filter icon that has an active (non-empty) filter is colored `--color-active` (`#ADECE5`)
- Inactive filter icon uses the default muted foreground

### Dev Mode Badge

- Background: `#252729` (near-black surface)
- Text: `#FD4497` (hot pink)
- Border: `1px solid #FD4497`
- Appears in the header user area only in development/preview environments

---

## Component Behavioral Specs

Described functionally — implement with whatever component primitives your framework provides.

### Buttons

| Variant          | Rest state                          | Hover                    | Pressed                  |
|------------------|-------------------------------------|--------------------------|--------------------------|
| **Primary**      | `--color-bg-card` bg, white text    | `--color-bg-elevated` bg | `--color-bg-page` bg     |
| **Ghost/subtle** | No bg, no border                    | `--color-bg-card` bg     | `--color-bg-page` bg     |
| **Disabled**     | Any variant, text `--color-muted-3` | No change on hover       | —                        |

### Data Table

- Sortable column headers: clicking a header toggles ascending/descending sort
- Each sortable column header contains a small ghost icon button for per-column text filtering
- The filter button opens a floating popover anchored to the button; the popover traps keyboard focus
- Clicking the filter button must not trigger the sort handler (stop event propagation)
- A global text search bar (320px wide) sits above the table
- Status column uses a dropdown filter with options: All / Active / Inactive
- No special row background for collision rows; the warning is surfaced via inline icon in the name cell

### Record Status Badge

- Pill-shaped, filled (solid background)
- Active: `--color-active` bg (`#ADECE5`), `--color-near-black` text
- Inactive: `--color-inactive` bg (`#B8B2E4`), `--color-near-black` text

### Cards / Panels

- Background: `--color-bg-card` (`#6F747A`)
- Section title inside the card: 20px semibold
- Field layout inside cards: 2-column grid with 24px gap
- Field structure: label (12px, `--color-muted-3`) above value (16px, white)

### Sign-In Page

- Full-viewport centered layout (`flex`, `align-items: center`, `justify-content: center`)
- Background: `--color-bg-page` (matches app background — no contrast shift)
- Centered card: 360px wide, 32px padding, text centered
- Card contains: large app icon (48px) + app name (large semibold) + subtitle (muted) + primary CTA button
- CTA: "Sign in with Microsoft" — primary button variant, large size

### Notes / Audit Timeline

- Each entry: horizontal flex row, icon/avatar on left, text content on right
- Author name: 12px muted (`--color-muted-3`)
- Edited timestamp: 11px muted italic
- Edit and delete action buttons appear on the right of the note, ghost/subtle variant, icon-only
- Delete requires a confirmation dialog before executing

### Dialogs / Modals

- Trap focus while open
- Actions row: destructive action (delete) uses default/secondary styling — do NOT use red or pink for delete buttons (hot pink is reserved for data warnings, not UI actions)
- Cancel is always present alongside the primary action

---

## Interaction States (all interactive elements)

| State        | Treatment                                                   |
|--------------|-------------------------------------------------------------|
| Hover        | Lighten background one step up the neutral scale            |
| Pressed      | Darken background one step down the neutral scale           |
| Focus        | Visible focus ring — `2px solid #FFFFFF` with 2px offset    |
| Disabled     | Text: `--color-muted-3`; no hover or pressed response       |
| Selected     | Border/stroke becomes `#FFFFFF`; text becomes white         |
