/*
 * Shared "reveal once the async content is ready" controller for the
 * service-catalog skeleton placeholders.
 *
 * Previously this MutationObserver + settle-timer + hard-timeout + bfcache
 * pattern was duplicated (with only the completion check and target/skeleton
 * ids differing) between templates/service_page.hbs (form skeleton) and
 * templates/service_list_page.hbs (catalog skeleton). Centralized here so
 * both pages configure the same controller instead of re-implementing it.
 *
 * ES2015 only — this file is bundled into script.js.
 */

// options:
//   targetId       (required) id of the element to observe for completion
//   skeletonId     (optional) id of the skeleton placeholder to hide/remove
//   readyClasses   (optional) array of classes added to <html> once revealed
//   isComplete(el) (required) returns true once `el` has its real content
//   settleMs       (optional, default 400) debounce after isComplete() first
//                  passes, so we don't reveal mid-render
//   hardCapMs      (optional, default 6000) reveal unconditionally by this
//                  point even if isComplete() never returns true
//   onReveal()     (optional) extra callback once revealed
window.initSvcRevealOnComplete = function (options) {
  var root = document.documentElement;
  var target = document.getElementById(options.targetId);
  if (!target) return;
  var skel = options.skeletonId
    ? document.getElementById(options.skeletonId)
    : null;

  var done = false;
  function reveal() {
    if (done) return;
    done = true;
    (options.readyClasses || []).forEach(function (c) {
      root.classList.add(c);
    });
    if (skel) {
      skel.classList.add(options.skeletonHideClass || "svc-skel-hide");
      setTimeout(function () {
        if (skel && skel.parentNode) skel.parentNode.removeChild(skel);
      }, 320);
    }
    if (options.onReveal) options.onReveal();
  }

  var settleTimer = null;
  function armSettle() {
    if (settleTimer) clearTimeout(settleTimer);
    settleTimer = setTimeout(reveal, options.settleMs || 400);
  }
  function check() {
    if (!done && options.isComplete(target)) armSettle();
  }

  check();
  var mo = new MutationObserver(check);
  mo.observe(target, { childList: true, subtree: true });
  (function stop() {
    if (done) mo.disconnect();
    else setTimeout(stop, 300);
  })();

  setTimeout(reveal, options.hardCapMs || 6000);

  window.addEventListener("pageshow", function (e) {
    if (e.persisted) reveal();
  });
};
