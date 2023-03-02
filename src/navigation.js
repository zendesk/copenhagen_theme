import { ESCAPE } from "./Keys";

function toggleNavigation(toggle, menu) {
  const isExpanded = menu.getAttribute("aria-expanded") === "true";
  menu.setAttribute("aria-expanded", !isExpanded);
  toggle.setAttribute("aria-expanded", !isExpanded);
}

function closeNavigation(toggle, menu) {
  menu.setAttribute("aria-expanded", false);
  toggle.setAttribute("aria-expanded", false);
  toggle.focus();
}

const menuButton = document.querySelector(".header .menu-button-mobile");
const menuList = document.querySelector("#user-nav-mobile");

menuButton.addEventListener("click", function (e) {
  e.stopPropagation();
  toggleNavigation(this, menuList);
});

menuList.addEventListener("keyup", function (e) {
  if (e.keyCode === ESCAPE) {
    e.stopPropagation();
    closeNavigation(menuButton, this);
  }
});

// Toggles expanded aria to collapsible elements
const collapsible = document.querySelectorAll(
  ".collapsible-nav, .collapsible-sidebar"
);

Array.prototype.forEach.call(collapsible, function (el) {
  const toggle = el.querySelector(
    ".collapsible-nav-toggle, .collapsible-sidebar-toggle"
  );

  el.addEventListener("click", function () {
    toggleNavigation(toggle, this);
  });

  el.addEventListener("keyup", function (e) {
    if (e.keyCode === ESCAPE) {
      closeNavigation(toggle, this);
    }
  });
});

// If multibrand search has more than 5 help centers or categories collapse the list
const multibrandFilterLists = document.querySelectorAll(
  ".multibrand-filter-list"
);
Array.prototype.forEach.call(multibrandFilterLists, function (filter) {
  if (filter.children.length > 6) {
    // Display the show more button
    const trigger = filter.querySelector(".see-all-filters");
    trigger.setAttribute("aria-hidden", false);

    // Add event handler for click
    trigger.addEventListener("click", function (e) {
      e.stopPropagation();
      trigger.parentNode.removeChild(trigger);
      filter.classList.remove("multibrand-filter-list--collapsed");
    });
  }
});
