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

// Navigation

window.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.querySelector(".header .menu-button-mobile");
  const menuList = document.querySelector("#user-nav-mobile");

  menuButton.addEventListener("click", (event) => {
    event.stopPropagation();
    toggleNavigation(menuButton, menuList);
  });

  menuList.addEventListener("keyup", (event) => {
    if (event.keyCode === ESCAPE) {
      event.stopPropagation();
      closeNavigation(menuButton, menuList);
    }
  });

  // Hide Skip to Web Widget button if Web Widget is not present
  const skipToWidgetButton = document.body.querySelector(".skip-to-web-widget");

  let webWidgetLoadingCounter = 20;
  let handleSkipToWidgetButtonIntervalId;
  const handleSkipToWidgetButtonIntervalDuration = 500;

  skipToWidgetButton.style.display = "none";

  const handleSkipToWidgetButton = () => {
    if ("zE" in window && window.zE("webWidget:get", "display") !== "hidden") {
      skipToWidgetButton.addEventListener("click", () =>
        window.zE(
          window.zE.widget === "classic" ? "webWidget" : "messenger",
          "open"
        )
      );
      skipToWidgetButton.style.display = "inline-block";
      clearInterval(handleSkipToWidgetButtonIntervalId);
    }
    if (webWidgetLoadingCounter-- <= 0) {
      clearInterval(handleSkipToWidgetButtonIntervalId);
    }
  };

  handleSkipToWidgetButtonIntervalId = setInterval(
    handleSkipToWidgetButton,
    handleSkipToWidgetButtonIntervalDuration
  );

  // Toggles expanded aria to collapsible elements
  const collapsible = document.querySelectorAll(
    ".collapsible-nav, .collapsible-sidebar"
  );

  collapsible.forEach((element) => {
    const toggle = element.querySelector(
      ".collapsible-nav-toggle, .collapsible-sidebar-toggle"
    );

    element.addEventListener("click", () => {
      toggleNavigation(toggle, element);
    });

    element.addEventListener("keyup", (event) => {
      console.log("escape");
      if (event.keyCode === ESCAPE) {
        closeNavigation(toggle, element);
      }
    });
  });

  // If multibrand search has more than 5 help centers or categories collapse the list
  const multibrandFilterLists = document.querySelectorAll(
    ".multibrand-filter-list"
  );
  multibrandFilterLists.forEach((filter) => {
    if (filter.children.length > 6) {
      // Display the show more button
      const trigger = filter.querySelector(".see-all-filters");
      trigger.setAttribute("aria-hidden", false);

      // Add event handler for click
      trigger.addEventListener("click", (event) => {
        event.stopPropagation();
        trigger.parentNode.removeChild(trigger);
        filter.classList.remove("multibrand-filter-list--collapsed");
      });
    }
  });
});
