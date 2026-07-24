export const AttachmentsInputName = "attachments" as const;

export const ASSET_TYPE_KEY = "zen:custom_object:standard::itam_asset_type";
export const ASSET_KEY = "zen:custom_object:standard::itam_asset";

// Marker class added to <html> when the page is in preview mode. CSS in
// styles/_service_catalog.scss uses it to hide product chrome (admin shell,
// trial banners) so admins can see the page exactly as end-users would.
// IMPORTANT: keep in sync with the inline script in templates/service_page.hbs.
export const PREVIEW_MODE_HTML_CLASS = "is-service-catalog-preview";

// Query parameter that drives preview mode. When present and equal to "true",
// the inline script in templates/service_page.hbs adds the marker class to
// <html> synchronously, before first paint, eliminating the chrome flicker.
export const PREVIEW_MODE_QUERY_PARAM = "preview";
export const PREVIEW_MODE_QUERY_PARAM_VALUE = "true";

// Query-string prefill (PDSC-954): /services/123?tf_456=value prefills fields.
export const PREFILL_FIELD_PREFIX = "tf_";

// URLs longer than this skip prefill entirely (same limit as Help Center).
export const MAX_PREFILL_URL_LENGTH = 2048;

export const PREFILL_ALLOWED_BOOLEAN_VALUES = ["true", "false"] as const;

// Kept identical to the Help Center prefill whitelist.
export const PREFILL_ALLOWED_HTML_TAGS = [
  "pre",
  "strong",
  "b",
  "p",
  "blockquote",
  "ul",
  "ol",
  "li",
  "h2",
  "h3",
  "h4",
  "i",
  "em",
  "br",
];

// Fields targetable by name (tf_priority, tf_type) instead of numeric id.
export const PREFILL_SYSTEM_FIELD_ALIASES: Record<string, string[]> = {
  priority: ["priority", "basic_priority"],
  type: ["tickettype"],
};
