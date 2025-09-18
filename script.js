(function () {
  'use strict';

  // Key map
  const ENTER = 13;
  const ESCAPE = 27;

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
          <p>
            <a href="${url}">${title}</a>
            ${body }
          </p>
        </div>
        
        <button type="button" aria-label="Close" class="announcement-close">
          <i focusable="false" aria-hidden="true" class="x-icon far fa-times"></i>
        </button>
      </div>
    `;

      document.querySelector('.announcement').insertAdjacentHTML('beforeend', html);
    }
  });

  document.addEventListener('click', function (event) {
    if (event.target.matches('.announcement-close')) {
      event.preventDefault();
      event.target.parentElement.remove();
    }
  });

  const isPrintableChar = (str) => {
    return str.length === 1 && str.match(/^\S$/);
  };

  function Dropdown(toggle, menu) {
    this.toggle = toggle;
    this.menu = menu;

    this.menuPlacement = {
      top: menu.classList.contains("dropdown-menu-top"),
      end: menu.classList.contains("dropdown-menu-end"),
    };

    this.toggle.addEventListener("click", this.clickHandler.bind(this));
    this.toggle.addEventListener("keydown", this.toggleKeyHandler.bind(this));
    this.menu.addEventListener("keydown", this.menuKeyHandler.bind(this));
    document.body.addEventListener("click", this.outsideClickHandler.bind(this));

    const toggleId = this.toggle.getAttribute("id") || crypto.randomUUID();
    const menuId = this.menu.getAttribute("id") || crypto.randomUUID();

    this.toggle.setAttribute("id", toggleId);
    this.menu.setAttribute("id", menuId);

    this.toggle.setAttribute("aria-controls", menuId);
    this.menu.setAttribute("aria-labelledby", toggleId);

    this.menu.setAttribute("tabindex", -1);
    this.menuItems.forEach((menuItem) => {
      menuItem.tabIndex = -1;
    });

    this.focusedIndex = -1;
  }

  Dropdown.prototype = {
    get isExpanded() {
      return this.toggle.getAttribute("aria-expanded") === "true";
    },

    get menuItems() {
      return Array.prototype.slice.call(
        this.menu.querySelectorAll("[role='menuitem'], [role='menuitemradio']")
      );
    },

    dismiss: function () {
      if (!this.isExpanded) return;

      this.toggle.removeAttribute("aria-expanded");
      this.menu.classList.remove("dropdown-menu-end", "dropdown-menu-top");
      this.focusedIndex = -1;
    },

    open: function () {
      if (this.isExpanded) return;

      this.toggle.setAttribute("aria-expanded", true);
      this.handleOverflow();
    },

    handleOverflow: function () {
      var rect = this.menu.getBoundingClientRect();

      var overflow = {
        right: rect.left < 0 || rect.left + rect.width > window.innerWidth,
        bottom: rect.top < 0 || rect.top + rect.height > window.innerHeight,
      };

      if (overflow.right || this.menuPlacement.end) {
        this.menu.classList.add("dropdown-menu-end");
      }

      if (overflow.bottom || this.menuPlacement.top) {
        this.menu.classList.add("dropdown-menu-top");
      }

      if (this.menu.getBoundingClientRect().top < 0) {
        this.menu.classList.remove("dropdown-menu-top");
      }
    },

    focusByIndex: function (index) {
      if (!this.menuItems.length) return;

      this.menuItems.forEach((item, itemIndex) => {
        if (itemIndex === index) {
          item.tabIndex = 0;
          item.focus();
        } else {
          item.tabIndex = -1;
        }
      });

      this.focusedIndex = index;
    },

    focusFirstMenuItem: function () {
      this.focusByIndex(0);
    },

    focusLastMenuItem: function () {
      this.focusByIndex(this.menuItems.length - 1);
    },

    focusNextMenuItem: function (currentItem) {
      if (!this.menuItems.length) return;

      const currentIndex = this.menuItems.indexOf(currentItem);
      const nextIndex = (currentIndex + 1) % this.menuItems.length;

      this.focusByIndex(nextIndex);
    },

    focusPreviousMenuItem: function (currentItem) {
      if (!this.menuItems.length) return;

      const currentIndex = this.menuItems.indexOf(currentItem);
      const previousIndex =
        currentIndex <= 0 ? this.menuItems.length - 1 : currentIndex - 1;

      this.focusByIndex(previousIndex);
    },

    focusByChar: function (currentItem, char) {
      char = char.toLowerCase();

      const itemChars = this.menuItems.map((menuItem) =>
        menuItem.textContent.trim()[0].toLowerCase()
      );

      const startIndex =
        (this.menuItems.indexOf(currentItem) + 1) % this.menuItems.length;

      // look up starting from current index
      let index = itemChars.indexOf(char, startIndex);

      // if not found, start from start
      if (index === -1) {
        index = itemChars.indexOf(char, 0);
      }

      if (index > -1) {
        this.focusByIndex(index);
      }
    },

    outsideClickHandler: function (e) {
      if (
        this.isExpanded &&
        !this.toggle.contains(e.target) &&
        !e.composedPath().includes(this.menu)
      ) {
        this.dismiss();
        this.toggle.focus();
      }
    },

    clickHandler: function (event) {
      event.stopPropagation();
      event.preventDefault();

      if (this.isExpanded) {
        this.dismiss();
        this.toggle.focus();
      } else {
        this.open();
        this.focusFirstMenuItem();
      }
    },

    toggleKeyHandler: function (e) {
      const key = e.key;

      switch (key) {
        case "Enter":
        case " ":
        case "ArrowDown":
        case "Down": {
          e.stopPropagation();
          e.preventDefault();

          this.open();
          this.focusFirstMenuItem();
          break;
        }
        case "ArrowUp":
        case "Up": {
          e.stopPropagation();
          e.preventDefault();

          this.open();
          this.focusLastMenuItem();
          break;
        }
        case "Esc":
        case "Escape": {
          e.stopPropagation();
          e.preventDefault();

          this.dismiss();
          this.toggle.focus();
          break;
        }
      }
    },

    menuKeyHandler: function (e) {
      const key = e.key;
      const currentElement = this.menuItems[this.focusedIndex];

      if (e.ctrlKey || e.altKey || e.metaKey) {
        return;
      }

      switch (key) {
        case "Esc":
        case "Escape": {
          e.stopPropagation();
          e.preventDefault();

          this.dismiss();
          this.toggle.focus();
          break;
        }
        case "ArrowDown":
        case "Down": {
          e.stopPropagation();
          e.preventDefault();

          this.focusNextMenuItem(currentElement);
          break;
        }
        case "ArrowUp":
        case "Up": {
          e.stopPropagation();
          e.preventDefault();
          this.focusPreviousMenuItem(currentElement);
          break;
        }
        case "Home":
        case "PageUp": {
          e.stopPropagation();
          e.preventDefault();
          this.focusFirstMenuItem();
          break;
        }
        case "End":
        case "PageDown": {
          e.stopPropagation();
          e.preventDefault();
          this.focusLastMenuItem();
          break;
        }
        case "Tab": {
          if (e.shiftKey) {
            e.stopPropagation();
            e.preventDefault();
            this.dismiss();
            this.toggle.focus();
          } else {
            this.dismiss();
          }
          break;
        }
        default: {
          if (isPrintableChar(key)) {
            e.stopPropagation();
            e.preventDefault();
            this.focusByChar(currentElement, key);
          }
        }
      }
    },
  };

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
  });

  // Share

  window.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll(".share a");
    links.forEach((anchor) => {
      anchor.addEventListener("click", (event) => {
        event.preventDefault();
        window.open(anchor.href, "", "height = 500, width = 500");
      });
    });
  });

  // Vanilla JS debounce function, by Josh W. Comeau:
  // https://www.joshwcomeau.com/snippets/javascript/debounce/
  function debounce(callback, wait) {
    let timeoutId = null;
    return (...args) => {
      window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        callback.apply(null, args);
      }, wait);
    };
  }

  // Define variables for search field
  let searchFormFilledClassName = "search-has-value";
  let searchFormSelector = "form[role='search']";

  // Clear the search input, and then return focus to it
  function clearSearchInput(event) {
    event.target
      .closest(searchFormSelector)
      .classList.remove(searchFormFilledClassName);

    let input;
    if (event.target.tagName === "INPUT") {
      input = event.target;
    } else if (event.target.tagName === "BUTTON") {
      input = event.target.parentNode.querySelector("input[type='search']");
    } else {
      input = event.target.closest("button").previousElementSibling;
    }
    input.value = "";
    input.focus();
  }

  // Have the search input and clear button respond
  // when someone presses the escape key, per:
  // https://twitter.com/adambsilver/status/1152452833234554880
  function clearSearchInputOnKeypress(event) {
    const searchInputDeleteKeys = ["Delete", "Escape"];
    if (searchInputDeleteKeys.includes(event.key)) {
      clearSearchInput(event);
    }
  }

  // Create an HTML button that all users -- especially keyboard users --
  // can interact with, to clear the search input.
  // To learn more about this, see:
  // https://adrianroselli.com/2019/07/ignore-typesearch.html#Delete
  // https://www.scottohara.me/blog/2022/02/19/custom-clear-buttons.html
  function buildClearSearchButton(inputId) {
    const button = document.createElement("button");
    button.setAttribute("type", "button");
    button.setAttribute("aria-controls", inputId);
    button.classList.add("clear-button");
    const buttonLabel = window.searchClearButtonLabelLocalized;
    const icon = `<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' focusable='false' role='img' viewBox='0 0 12 12' aria-label='${buttonLabel}'><path stroke='currentColor' stroke-linecap='round' stroke-width='2' d='M3 9l6-6m0 6L3 3'/></svg>`;
    button.innerHTML = icon;
    button.addEventListener("click", clearSearchInput);
    button.addEventListener("keyup", clearSearchInputOnKeypress);
    return button;
  }

  // Append the clear button to the search form
  function appendClearSearchButton(input, form) {
    const searchClearButton = buildClearSearchButton(input.id);
    form.append(searchClearButton);
    if (input.value.length > 0) {
      form.classList.add(searchFormFilledClassName);
    }
  }

  // Add a class to the search form when the input has a value;
  // Remove that class from the search form when the input doesn't have a value.
  // Do this on a delay, rather than on every keystroke.
  const toggleClearSearchButtonAvailability = debounce((event) => {
    const form = event.target.closest(searchFormSelector);
    form.classList.toggle(
      searchFormFilledClassName,
      event.target.value.length > 0
    );
  }, 200);

  // Search

  window.addEventListener("DOMContentLoaded", () => {
    // Set up clear functionality for the search field
    const searchForms = [...document.querySelectorAll(searchFormSelector)];
    const searchInputs = searchForms.map((form) =>
      form.querySelector("input[type='search']")
    );
    searchInputs.forEach((input) => {
      appendClearSearchButton(input, input.closest(searchFormSelector));
      input.addEventListener("keyup", clearSearchInputOnKeypress);
      input.addEventListener("keyup", toggleClearSearchButtonAvailability);
    });
  });

  const key = "returnFocusTo";

  function saveFocus() {
    const activeElementId = document.activeElement.getAttribute("id");
    sessionStorage.setItem(key, "#" + activeElementId);
  }

  function returnFocus() {
    const returnFocusTo = sessionStorage.getItem(key);
    if (returnFocusTo) {
      sessionStorage.removeItem("returnFocusTo");
      const returnFocusToEl = document.querySelector(returnFocusTo);
      returnFocusToEl && returnFocusToEl.focus && returnFocusToEl.focus();
    }
  }

  // Forms

  window.addEventListener("DOMContentLoaded", () => {
    // In some cases we should preserve focus after page reload
    returnFocus();

    // show form controls when the textarea receives focus or back button is used and value exists
    const commentContainerTextarea = document.querySelector(
      ".comment-container textarea"
    );
    const commentContainerFormControls = document.querySelector(
      ".comment-form-controls, .comment-ccs"
    );

    if (commentContainerTextarea) {
      commentContainerTextarea.addEventListener(
        "focus",
        function focusCommentContainerTextarea() {
          commentContainerFormControls.style.display = "block";
          commentContainerTextarea.removeEventListener(
            "focus",
            focusCommentContainerTextarea
          );
        }
      );

      if (commentContainerTextarea.value !== "") {
        commentContainerFormControls.style.display = "block";
      }
    }

    // Expand Request comment form when Add to conversation is clicked
    const showRequestCommentContainerTrigger = document.querySelector(
      ".request-container .comment-container .comment-show-container"
    );
    const requestCommentFields = document.querySelectorAll(
      ".request-container .comment-container .comment-fields"
    );
    const requestCommentSubmit = document.querySelector(
      ".request-container .comment-container .request-submit-comment"
    );

    if (showRequestCommentContainerTrigger) {
      showRequestCommentContainerTrigger.addEventListener("click", () => {
        showRequestCommentContainerTrigger.style.display = "none";
        Array.prototype.forEach.call(requestCommentFields, (element) => {
          element.style.display = "block";
        });
        requestCommentSubmit.style.display = "inline-block";

        if (commentContainerTextarea) {
          commentContainerTextarea.focus();
        }
      });
    }

    // Mark as solved button
    const requestMarkAsSolvedButton = document.querySelector(
      ".request-container .mark-as-solved:not([data-disabled])"
    );
    const requestMarkAsSolvedCheckbox = document.querySelector(
      ".request-container .comment-container input[type=checkbox]"
    );
    const requestCommentSubmitButton = document.querySelector(
      ".request-container .comment-container input[type=submit]"
    );

    if (requestMarkAsSolvedButton) {
      requestMarkAsSolvedButton.addEventListener("click", () => {
        requestMarkAsSolvedCheckbox.setAttribute("checked", true);
        requestCommentSubmitButton.disabled = true;
        requestMarkAsSolvedButton.setAttribute("data-disabled", true);
        requestMarkAsSolvedButton.form.submit();
      });
    }

    // Change Mark as solved text according to whether comment is filled
    const requestCommentTextarea = document.querySelector(
      ".request-container .comment-container textarea"
    );

    const usesWysiwyg =
      requestCommentTextarea &&
      requestCommentTextarea.dataset.helper === "wysiwyg";

    function isEmptyPlaintext(s) {
      return s.trim() === "";
    }

    function isEmptyHtml(xml) {
      const doc = new DOMParser().parseFromString(`<_>${xml}</_>`, "text/xml");
      const img = doc.querySelector("img");
      return img === null && isEmptyPlaintext(doc.children[0].textContent);
    }

    const isEmpty = usesWysiwyg ? isEmptyHtml : isEmptyPlaintext;

    if (requestCommentTextarea) {
      requestCommentTextarea.addEventListener("input", () => {
        if (isEmpty(requestCommentTextarea.value)) {
          if (requestMarkAsSolvedButton) {
            requestMarkAsSolvedButton.innerText =
              requestMarkAsSolvedButton.getAttribute("data-solve-translation");
          }
        } else {
          if (requestMarkAsSolvedButton) {
            requestMarkAsSolvedButton.innerText =
              requestMarkAsSolvedButton.getAttribute(
                "data-solve-and-submit-translation"
              );
          }
        }
      });
    }

    const selects = document.querySelectorAll(
      "#request-status-select, #request-organization-select"
    );

    selects.forEach((element) => {
      element.addEventListener("change", (event) => {
        event.stopPropagation();
        saveFocus();
        element.form.submit();
      });
    });

    // Submit requests filter form on search in the request list page
    const quickSearch = document.querySelector("#quick-search");
    if (quickSearch) {
      quickSearch.addEventListener("keyup", (event) => {
        if (event.keyCode === ENTER) {
          event.stopPropagation();
          saveFocus();
          quickSearch.form.submit();
        }
      });
    }

    // Submit organization form in the request page
    const requestOrganisationSelect = document.querySelector(
      "#request-organization select"
    );

    if (requestOrganisationSelect) {
      requestOrganisationSelect.addEventListener("change", () => {
        requestOrganisationSelect.form.submit();
      });

      requestOrganisationSelect.addEventListener("click", (e) => {
        // Prevents Ticket details collapsible-sidebar to close on mobile
        e.stopPropagation();
      });
    }

    // If there are any error notifications below an input field, focus that field
    const notificationElm = document.querySelector(".notification-error");
    if (
      notificationElm &&
      notificationElm.previousElementSibling &&
      typeof notificationElm.previousElementSibling.focus === "function"
    ) {
      notificationElm.previousElementSibling.focus();
    }
  });

  /* TABLE OF CONTENTS */
      
  document.addEventListener("DOMContentLoaded", function(event) {
      
      if (document.getElementsByClassName("table-of-contents").length > 0) {

          const headings = Array.from(document.getElementById("main-content").getElementsByTagName('h2', 'h3'));
          const tocContainer = document.querySelector(".table-of-contents");
          const tocOuterContainer = document.querySelector(".table-of-contents-container");
          const ul = document.createElement("ul");
          const mobileHeader = document.getElementById("tocHeading");

          window.onscroll = function() {
              if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
                  tocOuterContainer.classList.add("row");
              } else {
                  tocOuterContainer.classList.remove("row");
              }
          };

          ul.classList.add("collapsible-sidebar-body");
          tocContainer.appendChild(ul);
          headings.map((heading, index) => {
              var id = "";
              if (heading.id) {
                  id = heading.id;
              } else {
                  id = heading.innerText.toLowerCase().replaceAll(" ", "_");
                  heading.setAttribute("id", id);
              }
              var level = 1;
              if (heading.tagName == "H2") {
                  level = 1; 
              } else if (heading.tagName == "H3") {
                  level = 2;
              }
              var anchorElement = `<a href="#${id}">${heading.textContent}</a>`;
              if (index === 0) {
                  anchorElement = `<a href="#${id}" class="toc-level-${level} active current">${heading.textContent}</a>`;
              } else {
                  anchorElement = `<a href="#${id}" class="toc-level-${level}">${heading.textContent}</a>`;
              }
              var keyPointer = `<li>${anchorElement}</li>`;
              ul.insertAdjacentHTML("beforeend", keyPointer);
          });

          const tocAnchors = tocContainer.querySelectorAll("a");

          const obFunc = (entries) => {
              entries.forEach((entry) => {
                  if (entry.isIntersecting) {
                      const index = headings.indexOf(entry.target);
                      tocAnchors.forEach((tab) => {
                          tab.classList.remove("active", "current");
                      });
                      tocAnchors[index].classList.add("active", "current");
                      mobileHeader.innerText = tocAnchors[index].innerText;
                  }
              });
          };
          const obOption = {
              rootMargin: "0px 0% -20%",
              threshold: 1
          };

          const observer = new IntersectionObserver(obFunc, obOption);
          headings.forEach((hTwo) => observer.observe(hTwo));

      }

  });

  // Use the Lotus tab classes to avoid breaking existing articles, but we convert the script to javascript because jquery is a chonker

  document.addEventListener("DOMContentLoaded", () => {
    const setFocus = (tabs, tabIndex) => {
      const links = tabs.querySelectorAll(".tabs-link");
      const tabPanels = tabs.querySelectorAll(".tab");

      links.forEach((link, index) => {
        link.classList.toggle("is-active", index === tabIndex);
        link.setAttribute("tabindex", index === tabIndex ? "0" : "-1");
        link.setAttribute("aria-selected", index === tabIndex ? "true" : "false");
      });

      tabPanels.forEach((tab, index) => {
        tab.classList.toggle("is-hidden", index !== tabIndex);
      });
    };

    document.querySelectorAll(".tabs-menu").forEach(menu => {
      menu.setAttribute("role", "tablist");
    });

    document.querySelectorAll(".tabs-link").forEach((el, index) => {
      const text = el.textContent;
      const parentIndex = [...el.closest(".tabs").parentElement.children].indexOf(el.closest(".tabs"));
      const newLinkTag = document.createElement("a");

      [...el.attributes].forEach(attr => {
        newLinkTag.setAttribute(attr.name, attr.value);
      });

      newLinkTag.setAttribute("id", `tab-link-${parentIndex}${index}`);
      newLinkTag.setAttribute("aria-controls", `tab-content-${parentIndex}${index}`);
      newLinkTag.setAttribute("role", "tab");
      newLinkTag.setAttribute("href", `#tab-content-${parentIndex}${index}`);
      newLinkTag.setAttribute("aria-selected", index === 0);
      newLinkTag.textContent = text;

      el.replaceWith(newLinkTag);
    });

    document.querySelectorAll(".tab").forEach((el, index) => {
      const parentIndex = [...el.closest(".tabs").parentElement.children].indexOf(el.closest(".tabs"));
      el.setAttribute("id", `tab-content-${parentIndex}${index}`);
      el.setAttribute("aria-labelledby", `tab-link-${parentIndex}${index}`);
      el.setAttribute("role", "tabpanel");
    });

    document.addEventListener("click", (e) => {
      if (e.target.matches(".tabs-link")) {
        e.preventDefault();
        const tabs = e.target.closest(".tabs");
        const tabIndex = [...tabs.querySelectorAll(".tabs-link")].indexOf(e.target);
        setFocus(tabs, tabIndex);
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.target.matches(".tabs-link")) {
        const keys = {
          ArrowLeft: -1,
          ArrowUp: -1,
          ArrowRight: 1,
          ArrowDown: 1
        };

        if (keys.hasOwnProperty(e.key)) {
          const tabs = e.target.closest(".tabs");
          const tabLinks = [...tabs.querySelectorAll(".tabs-link")];
          let index = tabLinks.indexOf(e.target);

          index = (index + keys[e.key] + tabLinks.length) % tabLinks.length;
          tabLinks[index].focus();
          tabLinks[index].click();
          e.preventDefault();
        }
      }
    });
  });

  /* Request Status Filters */
      
  document.addEventListener("DOMContentLoaded", function(event) {
      
      if (document.getElementsByClassName("request-status-filters").length > 0) {

          const statuses = Array.from(document.getElementById("request-status-select").getElementsByTagName("option"));
          const statusSelect = document.getElementById("request-status-select");

       //   const headings = Array.from(document.getElementById("main-content").getElementsByTagName('h2', 'h3'));
          const rsfContainer = document.querySelector(".request-status-filters");
          const ul = document.createElement("ul");
          
          ul.classList.add("collapsible-sidebar-body");
          rsfContainer.appendChild(ul);
          statuses.map((status, index) => {
              // for each status, build a li with a styled link
              
              const id = status.value;
              const urlParams = new URLSearchParams(window.location.search);

              var anchorElement = `<a href="#${id}">${status.textContent}</a>`;

              if (urlParams.get('status') == id) {
                  anchorElement = `<a href="#" data-value="${id}" class="active current">${status.textContent}</a>`;
              } else {
                  anchorElement = `<a href="#" data-value="${id}">${status.textContent}</a>`;
              }
              var listItem = `<li>${anchorElement}</li>`;
              ul.insertAdjacentHTML("beforeend", listItem);
          });

          const rsfAnchors = rsfContainer.querySelectorAll("a");

          rsfAnchors.forEach((anchor) => {
              anchor.addEventListener("click", function(event) {
                  event.preventDefault();
                  statusSelect.value = this.dataset.value;
                  statusSelect.form.submit();
              });
          });
      }
  });

  // Use the Lotus accordion classes to avoid breaking existing articles, but we convert the script to javascript because jquery is a chonker

  // sliding functionality


  function slideToggle(element, duration = 300) {
    const computedStyle = window.getComputedStyle(element);
    const originalPaddingTop = computedStyle.paddingTop;
    const originalPaddingBottom = computedStyle.paddingBottom;

    // Cancel any in-flight animation on this element
    if (element._anim) {
      element._anim.cancel();
      element._anim = null;
    }

    const isHidden = element.style.display === "none" || computedStyle.display === "none";
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const easing = "ease-in-out";

    if (isHidden) {
      // OPEN
      element.style.display = "block";
      element.style.overflow = "hidden";

      // Measure with real padding in place
      element.style.height = "auto";
      const targetHeight = element.scrollHeight;

      // Start state: collapsed
      element.style.height = "0px";
      element.style.paddingTop = "0px";
      element.style.paddingBottom = "0px";

      if (prefersReduced) {
        // Jump to end state without animating
        element.style.height = "";
        element.style.paddingTop = originalPaddingTop;
        element.style.paddingBottom = originalPaddingBottom;
        element.style.overflow = "";
        return;
      }

      const anim = element.animate(
        [
          { height: "0px", paddingTop: "0px", paddingBottom: "0px" },
          { height: `${targetHeight}px`, paddingTop: originalPaddingTop, paddingBottom: originalPaddingBottom }
        ],
        { duration, easing, fill: "forwards" }
      );

      element._anim = anim;
      anim.onfinish = () => {
        // Lock in the final styles and clean up
        element.style.height = "";
        element.style.paddingTop = originalPaddingTop;
        element.style.paddingBottom = originalPaddingBottom;
        element.style.overflow = "";
        anim.cancel(); // release animation effect after committing
        element._anim = null;
      };
    } else {
      // CLOSE
      const targetHeight = element.scrollHeight;
      element.style.overflow = "hidden";
      element.style.height = `${targetHeight}px`;

      if (prefersReduced) {
        element.style.display = "none";
        element.style.height = "";
        element.style.paddingTop = "";
        element.style.paddingBottom = "";
        element.style.overflow = "";
        return;
      }

      const anim = element.animate(
        [
          { height: `${targetHeight}px`, paddingTop: originalPaddingTop, paddingBottom: originalPaddingBottom },
          { height: "0px", paddingTop: "0px", paddingBottom: "0px" }
        ],
        { duration, easing, fill: "forwards" }
      );

      element._anim = anim;
      anim.onfinish = () => {
        element.style.display = "none";
        element.style.height = "";
        element.style.paddingTop = "";
        element.style.paddingBottom = "";
        element.style.overflow = "";
        anim.cancel();
        element._anim = null;
      };
    }
  }


  /**
   * Accordions
   */

  function getSiblingIndex(element) {
    if (!element || !element.parentNode) {
      return -1; // Handle cases where the element or parent doesn't exist
    }

    const siblings = Array.from(element.parentNode.children);
    return siblings.indexOf(element);
  }


  document.addEventListener("DOMContentLoaded", function(event) {
    Array.from(document.getElementsByClassName("accordion__item"));
    const accordionTitles = Array.from(document.getElementsByClassName("accordion__item-title"));
    const accordionContents = Array.from(document.getElementsByClassName("accordion__item-content"));

    accordionTitles.forEach((el, index) => {
        const text = el.innerText;
        const newButtonTag = document.createElement("button");
        const parentIndex = getSiblingIndex(el.closest('.accordion'));

        var linkAttributes = el.attributes;

        for (let attribute of linkAttributes) {
            newButtonTag.setAttribute(attribute.name, attribute.value);
        }

        newButtonTag.setAttribute('aria-expanded', false);
        newButtonTag.setAttribute('aria-controls', `content-${parentIndex}-${index}`);
        newButtonTag.innerText = text;

        el.replaceWith(newButtonTag);
    });

    accordionContents.forEach((el, index) => {
        const parentIndex = getSiblingIndex(el.closest('.accordion'));
        el.setAttribute("id", `content-${parentIndex}-${index}`);
        el.style.display = "none";
        el.closest('.accordion__item').classList.add('collapsed');
    });


    const accordionTitlesButtons = Array.from(document.getElementsByClassName("accordion__item-title"));

    accordionTitlesButtons.forEach((el, index) => {
      el.addEventListener('click', (event) => {
        event.preventDefault();
        
        const isExpanded = event.currentTarget.getAttribute('aria-expanded') === "true";

        (event.currentTarget).classList.toggle('accordion__item-title--active');
        (event.currentTarget).closest('.accordion__item').classList.toggle('collapsed');
        slideToggle(
          (event.currentTarget).closest('.accordion__item').querySelector('.accordion__item-content'), 300
        );

        (event.currentTarget).setAttribute('aria-expanded', !isExpanded);

      });
    });
  });

  document.addEventListener("DOMContentLoaded", () => {
    // Initialize lightbox for images
    document.querySelectorAll(".image-with-lightbox").forEach(image => {
      image.addEventListener("click", event => {
        event.preventDefault();
        const img = image.querySelector("img");
        const lightbox = basicLightbox.create(`<img src="${image.href}" alt="${img.alt}">`);
        lightbox.show();
      });
    });

    // Initialize lightbox for videos
    document.querySelectorAll(".image-with-video-icon").forEach(video => {
      video.addEventListener("click", event => {
        event.preventDefault();
        const lightbox = basicLightbox.create(`
        <iframe src="${video.href}" frameborder="0" allowfullscreen></iframe>
      `);
        lightbox.show();
      });
    });
  });

})();
