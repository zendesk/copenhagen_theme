import Dropdown from "./Dropdown";

// Drodowns

window.addEventListener("DOMContentLoaded", () => {
  const dropdowns = [];
  const dropdownToggles = document.querySelectorAll(".dropdown-toggle");

  dropdownToggles.forEach((toggle) => {
    const menu = toggle.nextElementSibling;
    if (menu && menu.classList.contains("dropdown-menu")) {
      dropdowns.push(new Dropdown(toggle, menu));
    }
  });

  document.addEventListener("click", (event) => {
    dropdowns.forEach((dropdown) => {
      if (!dropdown.toggle.contains(event.target)) {
        dropdown.dismiss();
      }
    });
  });
});
