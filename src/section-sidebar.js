document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.getElementById("section-sidebar");
  if (!sidebar) return;

  const container = sidebar.closest("[data-section-id]");
  const currentSectionId = container?.dataset.sectionId;
  if (!currentSectionId) return;

  const locale = (document.documentElement.lang || "en-us").toLowerCase();

  // Populate category title from breadcrumbs (second-to-last item)
  const categoryTitleEl = document.getElementById("section-category-title");
  if (categoryTitleEl) {
    const breadcrumbItems = document.querySelectorAll(".breadcrumbs li");
    const categoryItem = breadcrumbItems[breadcrumbItems.length - 2];
    const categoryName = categoryItem?.querySelector("a")?.textContent?.trim()
      ?? categoryItem?.textContent?.trim();
    if (categoryName) categoryTitleEl.textContent = categoryName;
  }

  fetch(`/api/v2/help_center/${locale}/sections/${currentSectionId}.json`)
    .then((r) => r.json())
    .then(({ section }) => {
      const categoryId = section.category_id;
      return fetch(
        `/api/v2/help_center/${locale}/categories/${categoryId}/sections.json?per_page=100&sort_by=position`
      );
    })
    .then((r) => r.json())
    .then(({ sections }) => {
      if (!sections || sections.length < 2) return;

      sidebar.innerHTML = sections
        .map((s) => {
          const isActive = String(s.id) === String(currentSectionId);
          if (isActive) {
            return `<div class="section-nav-item section-nav-item--active"><span>${s.name}</span></div>`;
          }
          return `<a href="${s.html_url}" class="section-nav-item"><span>${s.name}</span></a>`;
        })
        .join("");
    })
    .catch(() => {
      // sidebar stays empty on error — page remains fully functional
    });
});
