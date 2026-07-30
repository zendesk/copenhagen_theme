/*
 * Corrects a specific class of broken navigation produced by Zendesk's
 * *native* instant-search widget (the `<zd-autocomplete>` /
 * `<zd-autocomplete-multibrand>` custom elements rendered by the platform's
 * own `{{search instant=true}}` helper output — used on both
 * service_list_page.hbs and service_page.hbs — this is separate from, and
 * not to be confused with, our own custom src/svcSearch.js hero/mini search
 * widget).
 *
 * That native widget's backing search API returns service-catalog
 * suggestions with a *relative* URL missing its leading slash, e.g.:
 *
 *   { "type": "service_catalog_item", "url": "hc/services/<id>", ... }
 *
 * and the widget renders `<a href="{{url}}">` directly from that value. The
 * browser resolves that relative href against whatever directory the user
 * happened to be in when they clicked it, so the resulting broken path
 * differs by page:
 *
 *   - from /hc/<locale>/services            -> /hc/<locale>/hc/services/<id>
 *   - from /hc/<locale>/services/<other-id> -> /hc/<locale>/services/hc/services/<id>
 *
 * In both cases a *second* `/hc/` segment appears somewhere after the
 * legitimate leading `/hc/<locale>/` prefix — something that can never
 * happen in a real Help Center path, since `/hc/` only ever appears once,
 * right at the start. getCorrectedHelpCenterPath() below finds the LAST
 * `/hc/` occurrence (to also self-heal any further-compounded case) and
 * treats everything after it as the widget's real intended destination,
 * reconstructed under the current locale.
 *
 * We can't patch the widget's markup or intercept its clicks: its DOM lives
 * inside closed shadow roots (`element.shadowRoot` is `null`, and per spec
 * `event.composedPath()` doesn't reveal nodes inside a closed shadow tree to
 * listeners outside it), and it's platform code we don't control or bundle.
 *
 * The *primary* fix lives in templates/document_head.hbs: a tiny inline
 * `<script>`, duplicating just this check, runs synchronously at the very
 * top of `<head>` (before any `<body>` content is parsed/painted), so the
 * redirect happens with no visible flash of the broken page. This module is
 * the tested, canonical implementation of that same logic (see
 * fixDuplicatedHelpCenterPath.spec.js) and also ships in script.js as a
 * defense-in-depth fallback in case the inline guard is ever skipped. Keep
 * both copies of the algorithm in sync if it ever changes.
 */

export function getCorrectedHelpCenterPath(pathname) {
  if (!pathname) return null;
  var firstSegmentMatch = /^\/hc\/([^/]+)\//.exec(pathname);
  if (!firstSegmentMatch) return null;
  var locale = firstSegmentMatch[1];
  var lastHcIndex = pathname.lastIndexOf("/hc/");
  if (lastHcIndex <= 0) return null;
  var rest = pathname.slice(lastHcIndex + "/hc/".length);
  if (!rest) return null;
  var corrected = "/hc/" + locale + "/" + rest;
  return corrected === pathname ? null : corrected;
}

(function redirectIfDuplicatedHelpCenterPath() {
  // Fallback only - the inline guard in document_head.hbs handles this
  // first, with no flash, on every real page load. This still runs in case
  // that inline script is ever skipped.
  var corrected = getCorrectedHelpCenterPath(window.location.pathname);
  if (!corrected) return;
  window.location.replace(
    corrected + window.location.search + window.location.hash
  );
})();
