import Dropdown from "./Dropdown";

const dropdowns = [];
const dropdownToggles = Array.prototype.slice.call(
  document.querySelectorAll(".dropdown-toggle")
);

dropdownToggles.forEach((toggle) => {
  const menu = toggle.nextElementSibling;
  if (menu && menu.classList.contains("dropdown-menu")) {
    dropdowns.push(new Dropdown(toggle, menu));
  }
});

document.addEventListener("click", (event) => {
  dropdowns.forEach(function (dropdown) {
    if (!dropdown.toggle.contains(event.target)) {
      dropdown.dismiss();
    }
  });
});
