/*
 * Service-catalog list-page enhancements that used to be two separate inline
 * <script> blocks in templates/service_list_page.hbs ("Catalog enhancements"
 * and "Category-swap skeleton hiding"). Neither depends on server-rendered
 * Curlybars data, so — same rationale as src/domFixups.js — they belong here
 * instead of inline in the template.
 *
 * Both sections no-op on any page without #service-catalog-main-content, so
 * this file is safe to include globally (bundled into script.js for every
 * page) rather than only on the service list page.
 *
 * ES2015 only — this file is bundled into script.js.
 */

// ---------------------------------------------------------------------------
// 1. Tooltips for truncated card descriptions and category description text.
//    (This used to also strip the Zendesk service-catalog widget's own
//    "search within services" field so it wouldn't duplicate the page's hero
//    search. PR #69 intentionally restored that native in-catalog search box,
//    so this module no longer removes it — see PR description "Added native
//    search back into services page list to search within services".)
// ---------------------------------------------------------------------------
(function () {
  const main = document.getElementById("service-catalog-main-content");
  if (!main) return;

  const safeClosest = (el, sel) =>
    el && el.nodeType === 1 && typeof el.closest === "function"
      ? el.closest(sel)
      : null;
  const inSidebar = (el) =>
    !!safeClosest(el, '[data-test-id^="sidebar-category"]');

  const tip = document.createElement("div");
  tip.className = "svc-tooltip";
  tip.setAttribute("role", "tooltip");
  tip.style.left = "-9999px";
  tip.style.top = "-9999px";
  document.body.appendChild(tip);
  let hideTimer = null;

  function getCard(el) {
    if (!el || el.nodeType !== 1) return null;
    if (inSidebar(el)) return null;
    const card =
      safeClosest(el, 'a[href*="/services/"]') ||
      safeClosest(el, '[data-testid="service-catalog-list-item-container"]');
    if (!card || inSidebar(card)) return null;
    if (
      !safeClosest(card, 'a[href*="/services/"]') &&
      !card.querySelector('a[href*="/services/"]')
    )
      return null;
    return card;
  }
  function findDescEl(card) {
    if (!card || inSidebar(card) || typeof card.querySelectorAll !== "function")
      return null;
    const leaves = Array.from(card.querySelectorAll("div, p, span")).filter(
      (el) =>
        el &&
        !el.querySelector(
          "a, h1, h2, h3, h4, h5, h6, svg, img, button, div, p, span"
        ) &&
        (el.textContent || "").trim().length > 0
    );
    if (leaves.length < 2) return null;
    const heading = card.querySelector("h1,h2,h3,h4,h5,h6");
    const titleText = heading
      ? heading.textContent.trim()
      : leaves[0].textContent.trim();
    return (
      leaves.find((l) => {
        const t = l.textContent.trim();
        return t && t !== titleText;
      }) || null
    );
  }
  function descText(card) {
    const el = findDescEl(card);
    if (!el) return "";
    const t = el.textContent.trim();
    if (/^\d+$/.test(t)) return "";
    return t;
  }

  function hideDescriptions() {
    main
      .querySelectorAll(
        'a[href*="/services/"], [class*="card"], [class*="Card"]'
      )
      .forEach((card) => {
        if (inSidebar(card)) return;
        const el = findDescEl(card);
        if (el && !el.classList.contains("svc-desc-hidden"))
          el.classList.add("svc-desc-hidden");
      });
  }
  function positionTip(card) {
    const rect = card.getBoundingClientRect();
    tip.style.maxWidth = Math.max(180, Math.min(240, rect.width + 20)) + "px";
    const t = tip.getBoundingClientRect(),
      gap = 8;
    let left = Math.min(
      Math.max(rect.left, 12),
      window.innerWidth - t.width - 12
    );
    tip.style.setProperty(
      "--svc-arrow-left",
      Math.max(
        10,
        Math.min(t.width - 18, rect.left + rect.width / 2 - left - 4)
      ) + "px"
    );
    let top;
    if (window.innerHeight - rect.bottom > t.height + gap + 12) {
      top = rect.bottom + gap;
      tip.classList.add("svc-tooltip-below");
      tip.classList.remove("svc-tooltip-above");
    } else {
      top = rect.top - t.height - gap;
      tip.classList.add("svc-tooltip-above");
      tip.classList.remove("svc-tooltip-below");
    }
    tip.style.left = Math.round(left) + "px";
    tip.style.top = Math.round(top) + "px";
  }
  function showTip(card) {
    if (!card || inSidebar(card)) return;
    const d = descText(card);
    if (!d) return;
    clearTimeout(hideTimer);
    tip.textContent = d;
    tip.style.left = "-9999px";
    tip.style.top = "0px";
    requestAnimationFrame(() => {
      positionTip(card);
      requestAnimationFrame(() => tip.classList.add("svc-tooltip-visible"));
    });
  }
  function hideTip() {
    tip.classList.remove("svc-tooltip-visible");
    hideTimer = setTimeout(() => {
      tip.style.left = "-9999px";
    }, 200);
  }

  let userInteracted = false;
  ["pointerdown", "keydown", "mousemove"].forEach((evt) =>
    window.addEventListener(
      evt,
      () => {
        userInteracted = true;
      },
      { once: true, passive: true }
    )
  );

  main.addEventListener("mouseover", (e) => {
    const c = getCard(e.target);
    if (c) showTip(c);
  });
  main.addEventListener("mouseout", (e) => {
    const c = getCard(e.target),
      to = e.relatedTarget ? getCard(e.relatedTarget) : null;
    if (c && c !== to) hideTip();
  });
  main.addEventListener("focusin", (e) => {
    if (!userInteracted) return;
    const c = getCard(e.target);
    if (c) showTip(c);
  });
  main.addEventListener("focusout", (e) => {
    const c = getCard(e.target),
      to = e.relatedTarget ? getCard(e.relatedTarget) : null;
    if (c && c !== to) hideTip();
  });
  window.addEventListener("scroll", hideTip, { passive: true });
  window.addEventListener("resize", hideTip);

  const DESCRIPTIONS = {
    "all services":
      "Browse every service available from the Service Desk, or pick a category to narrow things down.",
    accessibility:
      "Request accessibility reviews and support to ensure content and tools work for everyone.",
    "account services":
      "Manage your accounts, access, passwords, and identity credentials like PIV cards.",
    "apps & tools":
      "Get access to, install, or troubleshoot the software applications and tools you use day to day.",
    aurora: "Support and requests related to the AURORA platform.",
    collaboration:
      "Tools and support for working together — chat, meetings, file sharing, and team spaces.",
    "devices & equipment":
      "Request, return, or get help with laptops, peripherals, and other hardware.",
    "event and room support":
      "Book and get technical support for conference rooms, events, and presentations.",
    "get help":
      "Report an issue or get support — outages, hardware and software problems, lost devices, security incidents, and more.",
    grace: "Support and requests related to the GRACE platform.",
    "help me learn":
      "Find training, certifications, and learning resources to build your skills.",
  };
  const DEFAULT_DESC =
    "Browse the services in this category and submit a request to the Service Desk.";
  function applyCategoryDescription() {
    const heading = Array.from(main.querySelectorAll("h1, h2, h3")).find(
      (h) => !inSidebar(h)
    );
    if (!heading) return;
    const text =
      DESCRIPTIONS[(heading.textContent || "").trim().toLowerCase()] ||
      DEFAULT_DESC;
    let desc = heading.parentElement
      ? heading.parentElement.querySelector(":scope > .svc-cat-description")
      : null;
    if (!desc) {
      desc = document.createElement("p");
      desc.className = "svc-cat-description";
      heading.insertAdjacentElement("afterend", desc);
    }
    if (desc.textContent !== text) desc.textContent = text;
  }

  function enhance() {
    [hideDescriptions, applyCategoryDescription].forEach((fn) => {
      try {
        fn();
      } catch (e) {
        console.warn("enhance step failed:", e);
      }
    });
  }
  enhance();
  new MutationObserver(enhance).observe(main, {
    childList: true,
    subtree: true,
  });
})();

// ---------------------------------------------------------------------------
// 2. Category-swap skeleton hiding: tag catalog grid cells that haven't
//    rendered their real link yet as skeletons so the CSS shimmer applies.
// ---------------------------------------------------------------------------
(function () {
  const main = document.getElementById("service-catalog-main-content");
  if (!main) return;

  const inSidebar = (el) =>
    !!(
      el &&
      el.nodeType === 1 &&
      typeof el.closest === "function" &&
      el.closest('[data-test-id^="sidebar-category"]')
    );

  function tagSkeletons() {
    const cells = main.querySelectorAll(
      '[data-testid="service-catalog-list-item-container"], [data-garden-id="grid.col"]'
    );
    cells.forEach((cell) => {
      if (cell.nodeType !== 1) return;
      if (inSidebar(cell)) return;
      const link = cell.querySelector('a[href*="/services/"]');
      const isSkeleton = !link || (link.textContent || "").trim().length === 0;
      cell.classList.toggle("svc-skeleton", isSkeleton);
    });
  }

  try {
    tagSkeletons();
  } catch (e) {
    console.warn("skeleton tag failed:", e);
  }
  new MutationObserver(() => {
    try {
      tagSkeletons();
    } catch (e) {
      console.warn("skeleton tag failed:", e);
    }
  }).observe(main, { childList: true, subtree: true });
})();
