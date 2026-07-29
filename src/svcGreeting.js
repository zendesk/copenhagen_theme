/*
 * Shared "who is this user" name-resolution helper for the service-catalog
 * personalized greetings.
 *
 * Previously this fetch + alias/first-name parsing logic was copy-pasted
 * almost line-for-line inline in both templates/service_page.hbs and
 * templates/service_list_page.hbs (one ES5, one ES6, otherwise identical).
 * Centralized here — same rationale as src/svcSearch.js, which already
 * consolidated the duplicated search widget logic out of these same two
 * templates.
 *
 * Each page still composes its own greeting text/reveal-timing around the
 * resolved name (that part genuinely differs per page), so this module only
 * owns the "fetch the signed-in user and pick a real display name" part.
 *
 * ES2015 only — this file is bundled into script.js.
 */

function looksLikeAlias(v) {
  if (!v) return true;
  var s = String(v).trim();
  if (!s) return true;
  if (s.indexOf("@") !== -1) return true;
  if (/^[a-z0-9._-]+$/.test(s) && s.indexOf(" ") === -1) return true;
  return false;
}

function firstNameOf(name) {
  var s = String(name || "").trim();
  if (!s) return "";
  if (s.indexOf(",") !== -1) {
    var parts = s
      .split(",")
      .map(function (p) {
        return p.trim();
      })
      .filter(Boolean);
    if (parts.length >= 2) return parts[1].split(/\s+/)[0];
  }
  return s.split(/\s+/)[0];
}

// Fetches the signed-in user and calls back with their resolved first name
// (or "" if unavailable/anonymous/alias-only). Never rejects — network or
// parsing failures resolve to "" so callers don't need their own try/catch.
window.svcFetchFirstName = function (callback) {
  fetch("/api/v2/users/me.json", {
    headers: { Accept: "application/json" },
    credentials: "same-origin",
  })
    .then(function (r) {
      return r.ok ? r.json() : null;
    })
    .then(function (d) {
      var u = d && d.user;
      if (!u) {
        callback("");
        return;
      }
      var candidates = [
        u.name,
        u.details && u.details.name,
        u.user_fields &&
          (u.user_fields.full_name ||
            u.user_fields.preferred_name ||
            u.user_fields.first_name),
      ];
      var realName =
        candidates.find(function (c) {
          return !looksLikeAlias(c);
        }) || u.name;
      callback(firstNameOf(realName));
    })
    .catch(function () {
      callback("");
    });
};
