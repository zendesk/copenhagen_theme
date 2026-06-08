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
