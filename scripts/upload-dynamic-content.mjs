#!/usr/bin/env node
/**
 * Upload AZAL theme strings as Zendesk Dynamic Content items.
 *
 * Usage:
 *   node scripts/upload-dynamic-content.mjs \
 *     --email your@email.com \
 *     --token your_api_token
 *
 * The subdomain is read from ~/.zcli (azal).
 * Locale IDs are fetched from the API at runtime.
 *
 * Each key becomes a DC item named  hc_<key>
 * and is accessible in templates as  {{dc.hc_<key>}}
 */

import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const SUBDOMAIN = "azal";
const DC_PREFIX = "hc_";
const BASE_URL = `https://${SUBDOMAIN}.zendesk.com/api/v2`;

// Keys from our translation files that should become Dynamic Content items.
// These are the custom keys we added — NOT the Zendesk settings strings.
const CUSTOM_KEYS = [
  // Home page
  "home_breadcrumb_home",
  "home_breadcrumb_help_center",
  "home_hero_title",
  "home_search_tag_refunds",
  "home_search_tag_registration",
  "home_search_tag_contact",
  "home_updates_title",
  "home_trip_help_title",
  "home_trip_help_more",
  "home_trip_help_lost_baggage_title",
  "home_trip_help_lost_baggage_desc",
  "home_trip_help_complaints_title",
  "home_trip_help_complaints_desc",
  "home_trip_help_miles_title",
  "home_trip_help_miles_desc",
  "home_trip_help_certificate_title",
  "home_trip_help_certificate_desc",
  "home_trip_help_manage_title",
  "home_trip_help_manage_desc",
  "home_contact_title",
  "home_contact_submit_name",
  "home_contact_submit_desc",
  "home_contact_submit_btn",
  "home_contact_chat_name",
  "home_contact_chat_desc",
  "home_contact_chat_btn",
  "home_contact_whatsapp_name",
  "home_contact_whatsapp_desc",
  "home_contact_whatsapp_btn",
  // Footer column headings
  "footer_col_information",
  "footer_col_azal_miles",
  "footer_col_airline",
  "footer_col_corporate",
  // Footer — Information links
  "footer_info_baggage",
  "footer_info_baggage_url",
  "footer_info_fare_rules",
  "footer_info_fare_rules_url",
  "footer_info_children",
  "footer_info_children_url",
  "footer_info_pets",
  "footer_info_pets_url",
  "footer_info_unwanted",
  "footer_info_unwanted_url",
  "footer_info_overbooking",
  "footer_info_overbooking_url",
  "footer_info_prohibitions",
  "footer_info_prohibitions_url",
  "footer_info_carriage_rules",
  "footer_info_carriage_rules_url",
  "footer_info_pricing",
  "footer_info_pricing_url",
  // Footer — AZAL Miles links
  "footer_miles_about",
  "footer_miles_about_url",
  "footer_miles_earn",
  "footer_miles_earn_url",
  "footer_miles_join",
  "footer_miles_join_url",
  "footer_miles_signin",
  "footer_miles_signin_url",
  "footer_miles_rules",
  "footer_miles_rules_url",
  "footer_miles_faq",
  "footer_miles_faq_url",
  // Footer — Airline links
  "footer_airline_about",
  "footer_airline_about_url",
  "footer_airline_supervisory",
  "footer_airline_supervisory_url",
  "footer_airline_news",
  "footer_airline_news_url",
  "footer_airline_fleet",
  "footer_airline_fleet_url",
  "footer_airline_career",
  "footer_airline_career_url",
  "footer_airline_help_center",
  "footer_airline_write_us",
  "footer_airline_mobile",
  "footer_airline_mobile_url",
  // Footer — Corporate links
  "footer_corp_group",
  "footer_corp_group_url",
  "footer_corp_sales",
  "footer_corp_sales_url",
  "footer_corp_offices",
  "footer_corp_offices_url",
  "footer_corp_visiting",
  "footer_corp_visiting_url",
  "footer_corp_press",
  "footer_corp_press_url",
  "footer_corp_subdivisions",
  "footer_corp_subdivisions_url",
  "footer_corp_financial",
  "footer_corp_financial_url",
  "footer_corp_agents",
  "footer_corp_agents_url",
  "footer_corp_trafficking",
  "footer_corp_trafficking_url",
  // Footer bottom
  "footer_copyright",
  "footer_privacy",
  "footer_privacy_url",
];

// ---------------------------------------------------------------------------
// CLI args
// ---------------------------------------------------------------------------

function parseArgs() {
  const args = process.argv.slice(2);
  const get = (flag) => {
    const i = args.indexOf(flag);
    return i !== -1 ? args[i + 1] : null;
  };
  const email = get("--email");
  const token = get("--token");
  if (!email || !token) {
    console.error(
      "Usage: node scripts/upload-dynamic-content.mjs --email <email> --token <api_token>"
    );
    process.exit(1);
  }
  return { email, token };
}

// ---------------------------------------------------------------------------
// API helpers
// ---------------------------------------------------------------------------

function makeAuth(email, token) {
  return Buffer.from(`${email}/token:${token}`).toString("base64");
}

async function apiFetch(path, auth, options = {}) {
  const url = `${BASE_URL}${path}`;
  const res = await fetch(url, {
    ...options,
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`${options.method || "GET"} ${url} → ${res.status}: ${body}`);
  }
  return res.json();
}

// ---------------------------------------------------------------------------
// Fetch locale IDs for en-us, ru, az
// ---------------------------------------------------------------------------

async function getLocaleIds(auth) {
  const data = await apiFetch("/locales/public", auth);
  const locales = data.locales;
  const map = {};
  for (const l of locales) {
    map[l.locale] = l.id;
  }

  // Build a case-insensitive lookup
  const mapLower = {};
  for (const [code, id] of Object.entries(map)) {
    mapLower[code.toLowerCase()] = id;
  }

  const needed = { "en-us": null, ru: null, az: null };
  for (const code of Object.keys(needed)) {
    needed[code] = mapLower[code.toLowerCase()] ?? null;
    if (!needed[code]) {
      console.warn(`⚠  Locale "${code}" not found in account — will be skipped`);
    }
  }
  console.log("Locale IDs:", needed);
  return needed;
}

// ---------------------------------------------------------------------------
// Fetch existing DC items to allow upsert behaviour
// ---------------------------------------------------------------------------

async function getExistingItems(auth) {
  const existing = {};
  let url = "/dynamic_content/items?per_page=100";
  while (url) {
    const data = await apiFetch(url, auth);
    for (const item of data.items) {
      existing[item.name] = item;
    }
    // Handle pagination
    url = data.next_page ? data.next_page.replace(BASE_URL, "") : null;
  }
  console.log(`Found ${Object.keys(existing).length} existing DC items`);
  return existing;
}

// ---------------------------------------------------------------------------
// Load translation files
// ---------------------------------------------------------------------------

function loadTranslations() {
  const dir = join(dirname(fileURLToPath(import.meta.url)), "../translations/custom");
  const load = (file) => JSON.parse(readFileSync(join(dir, file), "utf8"));
  return {
    "en-us": load("en-us.json"),
    ru: load("ru.json"),
    az: load("az.json"),
  };
}

// ---------------------------------------------------------------------------
// Create or update a single DC item
// ---------------------------------------------------------------------------

async function upsertItem(auth, localeIds, translations, key, existingItems) {
  const dcName = `${DC_PREFIX}${key}`;
  const existing = existingItems[dcName];

  // Build variants array — only for locales that exist in the account
  const variants = [];
  for (const [locale, localeId] of Object.entries(localeIds)) {
    if (!localeId) continue;
    const content = translations[locale]?.[key];
    if (!content) {
      console.warn(`  ⚠  Missing translation: ${locale}/${key}`);
      continue;
    }
    variants.push({
      locale_id: localeId,
      content,
      default: locale === "en-us",
    });
  }

  if (variants.length === 0) {
    console.warn(`  ✗  Skipping ${dcName} — no variants to create`);
    return null;
  }

  if (existing) {
    // Update existing variants
    for (const variant of existing.variants) {
      const newVariant = variants.find((v) => v.locale_id === variant.locale_id);
      if (!newVariant) continue;
      await apiFetch(
        `/dynamic_content/items/${existing.id}/variants/${variant.id}`,
        auth,
        {
          method: "PUT",
          body: JSON.stringify({ variant: { content: newVariant.content } }),
        }
      );
    }
    // Create any variants that don't exist yet
    const existingLocaleIds = new Set(existing.variants.map((v) => v.locale_id));
    for (const variant of variants) {
      if (!existingLocaleIds.has(variant.locale_id)) {
        await apiFetch(
          `/dynamic_content/items/${existing.id}/variants`,
          auth,
          {
            method: "POST",
            body: JSON.stringify({ variant }),
          }
        );
      }
    }
    console.log(`  ✓  Updated: ${dcName}`);
    return existing;
  } else {
    // Create new item
    const enUsVariant = variants.find((v) => v.default);
    if (!enUsVariant) {
      console.warn(`  ✗  Skipping ${dcName} — no en-us default variant`);
      return null;
    }
    const data = await apiFetch("/dynamic_content/items", auth, {
      method: "POST",
      body: JSON.stringify({
        item: {
          name: dcName,
          default_locale_id: localeIds["en-us"],
          variants,
        },
      }),
    });
    console.log(`  ✓  Created: ${dcName}  →  {{dc.${DC_PREFIX}${key}}}`);
    return data.item;
  }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  const { email, token } = parseArgs();
  const auth = makeAuth(email, token);

  console.log(`\n🌐  Connecting to ${BASE_URL}\n`);

  const [localeIds, existingItems, translations] = await Promise.all([
    getLocaleIds(auth),
    getExistingItems(auth),
    Promise.resolve(loadTranslations()),
  ]);

  console.log(`\n📤  Uploading ${CUSTOM_KEYS.length} Dynamic Content items...\n`);

  const results = { created: 0, updated: 0, skipped: 0 };

  for (const key of CUSTOM_KEYS) {
    const dcName = `${DC_PREFIX}${key}`;
    const wasExisting = !!existingItems[dcName];
    const result = await upsertItem(auth, localeIds, translations, key, existingItems);
    if (result) {
      wasExisting ? results.updated++ : results.created++;
    } else {
      results.skipped++;
    }
  }

  console.log(`
✅  Done!
   Created:  ${results.created}
   Updated:  ${results.updated}
   Skipped:  ${results.skipped}

🔑  Use in templates as:  {{dc.hc_<key>}}
   Example:  {{dc.hc_home_hero_title}}
`);
}

main().catch((err) => {
  console.error("\n❌  Error:", err.message);
  process.exit(1);
});
