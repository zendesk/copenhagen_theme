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

window.addEventListener('scroll', function() {
  const navbar = document.getElementById('headerInner');
  const scrollThreshold = 200; 

  if (window.scrollY > scrollThreshold) {
    navbar.classList.add('shrink');
  } else {
    navbar.classList.remove('shrink');
  }
});

// announcement
document.addEventListener('DOMContentLoaded', async function () {

  const label = 'announcement';
  const showArticleBody = true;
  const locale = document.querySelector('html').getAttribute('lang').toLowerCase();
  const url = `/api/v2/help_center/${locale}/articles.json?label_names=${label}`;
  const data = await (await fetch(url)).json();
  const articles = (data && data.articles) || [];

  for (let i = 0; i < articles.length; i++) {
    const url = articles[i].html_url;
    const title = articles[i].title;
    const body = articles[i].body;

    const html = `
      <div class="announcement-box">
        <div class="announcement-inner">
          <i class="far fa-bullhorn fa-rotate-by" style="--fa-rotate-angle: -30deg; margin-right: 1rem;"></i>
          
          <div class="announcement-body">
            <span class="announcement-title">
              <a href="${url}">${title}</a>
            </span>
            ${showArticleBody ? body : ''}
          </div>
        </div>
        
        <button type="button" aria-label="Close" class="announcement-close">
          <i focusable="false" aria-hidden="true" class="x-icon far fa-times"></i>
        </button>
      </div>
    `

    document.querySelector('.announcement').insertAdjacentHTML('beforeend', html)
  }
})

document.addEventListener('click', function (event) {
  if (event.target.matches('.announcement-close')) {
    event.preventDefault()
    event.target.parentElement.remove()
  }
})
