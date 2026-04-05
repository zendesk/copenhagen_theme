document.addEventListener("DOMContentLoaded", () => {
  // Dynamic copyright year
  const legalCopy = document.querySelector(".footer-legal-copy");
  if (legalCopy) {
    legalCopy.textContent = legalCopy.textContent.replace(
      /\b\d{4}\b/,
      new Date().getFullYear()
    );
  }

  const MOBILE_BREAKPOINT = 768;

  function isMobile() {
    return window.innerWidth < MOBILE_BREAKPOINT;
  }

  const columns = document.querySelectorAll(".footer-column");
  if (!columns.length) return;

  columns.forEach((column, i) => {
    const title = column.querySelector(".footer-title");
    const links = column.querySelector(".footer-links");
    if (!title || !links) return;

    // Give each links list a stable id
    const id = `footer-links-${i}`;
    links.id = id;

    // Replace the h2 text with a button on mobile
    function init() {
      if (!isMobile()) return;
      if (title.dataset.accordionInit) return;
      title.dataset.accordionInit = "1";

      title.setAttribute("aria-expanded", "false");
      title.setAttribute("aria-controls", id);
      title.style.cursor = "pointer";

      title.addEventListener("click", () => {
        const expanded = title.getAttribute("aria-expanded") === "true";
        title.setAttribute("aria-expanded", String(!expanded));
        links.classList.toggle("is-open", !expanded);
      });
    }

    init();
  });

  // Re-init on resize in case user rotates device
  let lastWidth = window.innerWidth;
  window.addEventListener("resize", () => {
    if (window.innerWidth === lastWidth) return;
    lastWidth = window.innerWidth;
    columns.forEach((column, i) => {
      const title = column.querySelector(".footer-title");
      const links = column.querySelector(".footer-links");
      if (!title || !links) return;

      if (!isMobile()) {
        // Restore open state on desktop
        links.classList.remove("is-open");
        title.removeAttribute("aria-expanded");
      } else if (!title.dataset.accordionInit) {
        // Late init if resized to mobile
        const id = `footer-links-${i}`;
        links.id = id;
        title.dataset.accordionInit = "1";
        title.setAttribute("aria-expanded", "false");
        title.setAttribute("aria-controls", id);
        title.addEventListener("click", () => {
          const expanded = title.getAttribute("aria-expanded") === "true";
          title.setAttribute("aria-expanded", String(!expanded));
          links.classList.toggle("is-open", !expanded);
        });
      }
    });
  });
});
