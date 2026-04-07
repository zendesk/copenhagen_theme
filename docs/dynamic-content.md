# Dynamic Content & Custom Translations

## Overview

Zendesk's `{{t 'key'}}` helper only resolves keys defined in the theme settings panel (`translations/*.json`). It cannot be used for custom UI strings.

Custom strings in this theme are managed as **Zendesk Dynamic Content** items and referenced in templates with `{{dc 'hc_<key>'}}`.

---

## File structure

```
translations/
  custom/
    en-us.json   ← English strings (source of truth)
    ru.json      ← Russian translations
    az.json      ← Azerbaijani translations
  en-us.json     ← Zendesk settings panel strings only (do not add custom keys here)
  ru.json
  az.json

scripts/
  upload-dynamic-content.mjs   ← uploads custom strings to Zendesk DC API
```

---

## How it works

Each key in `translations/custom/*.json` becomes a Dynamic Content item in Zendesk named `hc_<key>` with variants for all three locales (en-us, ru, az).

In templates, reference them as:

```hbs
{{dc 'hc_home_hero_title'}}
{{dc 'hc_footer_copyright'}}
```

Zendesk automatically serves the correct locale variant at render time.

---

## Updating translations

1. Edit the relevant key in all three files under `translations/custom/`:
   - `en-us.json` — English
   - `ru.json` — Russian
   - `az.json` — Azerbaijani

2. Run the upload script (see below) to push changes to Zendesk.

> The script is an **upsert** — it updates existing items and creates new ones. It is safe to run multiple times.

---

## Adding a new string

1. Add the key to all three `translations/custom/*.json` files.

2. Add the key name (without the `hc_` prefix) to the `CUSTOM_KEYS` array in `scripts/upload-dynamic-content.mjs`.

3. Run the upload script.

4. Reference it in the template:
   ```hbs
   {{dc 'hc_your_new_key'}}
   ```

---

## Running the upload script

You need a Zendesk API token. Generate one at:
**Admin Center → Apps and Integrations → Zendesk API → API tokens**

```bash
node scripts/upload-dynamic-content.mjs \
  --email your@email.com \
  --token your_api_token
```

Expected output:

```
🌐  Connecting to https://azal.zendesk.com/api/v2

Locale IDs: { 'en-us': 1, ru: 27, az: 1355 }
Found 98 existing DC items

📤  Uploading 98 Dynamic Content items...

  ✓  Updated: hc_home_hero_title
  ✓  Updated: hc_footer_copyright
  ...

✅  Done!
   Created:  0
   Updated:  98
   Skipped:  0
```

---

## Key naming convention

All keys use the prefix `hc_` followed by a section and descriptor:

| Prefix | Section |
|--------|---------|
| `hc_home_` | Home page |
| `hc_footer_col_` | Footer column headings |
| `hc_footer_info_` | Footer — Information links |
| `hc_footer_miles_` | Footer — AZAL Miles links |
| `hc_footer_airline_` | Footer — Airline links |
| `hc_footer_corp_` | Footer — Corporate links |

URL keys follow their label key with a `_url` suffix:
```
hc_footer_info_baggage       → link text
hc_footer_info_baggage_url   → href value
```

---

## Important notes

- **Do not** add custom keys to `translations/en-us.json` (the root file). That file is for Zendesk settings panel strings only and will cause a validation error if unknown keys are added.
- The `{{dc 'key'}}` syntax is a helper call — **not** property access. `{{dc.key}}` is invalid and will throw a Curlybars validation error.
- Locale codes in Zendesk's API may be returned in mixed case (e.g. `en-US`). The upload script normalises these to lowercase for matching.
