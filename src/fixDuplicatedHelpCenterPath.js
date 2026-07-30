/*
 * Corrects a specific class of broken navigation produced by Zendesk's
 * *native* instant-search widget (the `<zd-autocomplete>` /
 * `<zd-autocomplete-multibrand>` custom elements rendered by the platform's
 * own `{{search instant=true}}` helper output on service_list_page.hbs —
 * this is separate from, and not to be confused with, our own custom
 * src/svcSearch.js hero/mini search widget).
 *
 * That native widget's backing search API returns service-catalog
 * suggestions with a *relative* URL missing its leading slash, e.g.:
 *
 *   { "type": "service_catalog_item", "url": "hc/services/<id>", ... }
 *
 * and the widget renders `<a href="{{url}}">` directly from that value.
 * When a user is on a page served at `/hc/<locale>/services` and clicks
 * such a suggestion, the browser resolves the relative href against the
 * current directory, producing `/hc/<locale>/hc/services/<id>` (a 404)
 * instead of `/hc/<locale>/services/<id>`.
 *
 * We can't patch the widget's markup or intercept its clicks: its DOM lives
 * inside closed shadow roots (`element.shadowRoot` is `null`, and per spec
 * `event.composedPath()` doesn't reveal nodes inside a closed shadow tree to
 * listeners outside it), and it's platform code we don't control or bundle.
 *
 * Instead, this module self-heals on arrival: it detects the resulting
 * duplicated `/hc/<locale>/hc/` segment in the URL and redirects to the
 * corrected path. `/hc/` only ever appears once, at the very start of a
 * real Help Center path, so this pattern is unambiguous and safe to rewrite
 * unconditionally, regardless of which route or widget produced it.
 */

const DUPLICATED_HC_SEGMENT = /^(\/hc\/[^/]+)\/hc\/(.+)$/;

export function getCorrectedHelpCenterPath(pathname) {
  const match = DUPLICATED_HC_SEGMENT.exec(pathname || "");
  return match ? `${match[1]}/${match[2]}` : null;
}

(function redirectIfDuplicatedHelpCenterPath() {
  var corrected = getCorrectedHelpCenterPath(window.location.pathname);
  if (!corrected) return;
  // Run as early as possible (no DOM readiness needed) and use replace()
  // so the broken URL doesn't linger in browser history.
  window.location.replace(
    corrected + window.location.search + window.location.hash
  );
})();
