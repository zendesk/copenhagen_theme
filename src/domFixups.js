/*
 * Global DOM fix-ups that were previously inline <script> blocks in
 * templates/document_head.hbs. Kept here so they live in the built script.js
 * (source of truth) instead of the template head.
 *
 * ES2015 only (no async/await) — this file is bundled into script.js.
 */

// ---------------------------------------------------------------------------
// 1. Neutralize the current-page breadcrumb link.
//    Zendesk renders the active breadcrumb as <a href="#" aria-current="page">;
//    clicking it navigates to "#", which blanks the page. It represents the
//    page you are already on, so it should not navigate at all. Removing the
//    href makes navigation impossible for both mouse and keyboard; the matching
//    `pointer-events: none` rule in _breadcrumbs.scss is a visual backstop.
//
//    (Replaces the former inline version, which ran a body-wide
//    MutationObserver forever on every DOM mutation.)
// ---------------------------------------------------------------------------
(function () {
  var SEL = 'nav[aria-label="Breadcrumb"] a, .breadcrumbs a';

  function isDead(a) {
    if (!a) return false;
    var href = a.getAttribute("href");
    return (
      a.getAttribute("aria-current") === "page" ||
      href === "#" ||
      href === "" ||
      href === null
    );
  }

  function neutralize() {
    var links = document.querySelectorAll(SEL);
    for (var i = 0; i < links.length; i++) {
      var a = links[i];
      if (!isDead(a)) continue;
      if (a.hasAttribute("href")) {
        a.setAttribute("data-dead-href", a.getAttribute("href"));
        a.removeAttribute("href");
      }
      a.setAttribute("role", "link");
      a.setAttribute("aria-disabled", "true");
    }
  }

  if (document.readyState !== "loading") {
    neutralize();
  } else {
    document.addEventListener("DOMContentLoaded", neutralize);
  }
})();

// ---------------------------------------------------------------------------
// 2. Hide any element whose only text is literally "empty".
//    This is a placeholder that can leak into the rendered page. Adding the
//    `.svc-empty-hidden` class (styled in _svc-tokens.scss) hides it without an
//    inline style.
//    TODO: find and fix the source that emits "empty" so this can be removed.
// ---------------------------------------------------------------------------
(function () {
  function hideEmpty() {
    var els = document.querySelectorAll("a, li, div");
    for (var i = 0; i < els.length; i++) {
      if (els[i].textContent.trim().toLowerCase() === "empty") {
        els[i].classList.add("svc-empty-hidden");
      }
    }
  }

  if (document.readyState !== "loading") {
    hideEmpty();
  } else {
    document.addEventListener("DOMContentLoaded", hideEmpty);
  }
})();

// ---------------------------------------------------------------------------
// 3. Wire the pink search-pill button (templates/search_results.hbs) to
//    submit the native search, matching native <button type="submit"> behavior.
//    Previously an inline <script> in that template; moved here per the
//    "don't re-add inline scripts" rule documented in document_head.hbs.
// ---------------------------------------------------------------------------
(function () {
  function wireSearchPillButton() {
    var btn = document.getElementById("svc-search-pill-btn");
    if (!btn || btn.dataset.svcWired === "1") return;
    var pill = btn.closest(".svc-search-pill");
    if (!pill) return;
    btn.dataset.svcWired = "1";
    btn.addEventListener("click", function () {
      var input = pill.querySelector(
        'input[type="search"], input[type="text"], input:not([type])'
      );
      if (!input) return;
      var form = input.form || input.closest("form");
      if (form) {
        if (typeof form.requestSubmit === "function") form.requestSubmit();
        else form.submit();
      } else {
        input.focus();
        input.dispatchEvent(
          new KeyboardEvent("keydown", {
            key: "Enter",
            code: "Enter",
            keyCode: 13,
            which: 13,
            bubbles: true,
          })
        );
      }
    });
  }

  if (document.readyState !== "loading") {
    wireSearchPillButton();
  } else {
    document.addEventListener("DOMContentLoaded", wireSearchPillButton);
  }
})();
