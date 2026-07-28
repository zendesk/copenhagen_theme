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

    if (menuButton && menuList) {
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
    }

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

    if (!this.toggle.hasAttribute("aria-haspopup")) {
      this.toggle.setAttribute("aria-haspopup", "true");
    }

    if (!this.toggle.hasAttribute("aria-expanded")) {
      this.toggle.setAttribute("aria-expanded", "false");
    }

    this.toggleIcon = this.toggle.querySelector(".dropdown-chevron-icon");
    if (this.toggleIcon) {
      this.toggleIcon.setAttribute("aria-hidden", "true");
    }

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

      this.toggle.setAttribute("aria-expanded", "false");
      this.menu.classList.remove("dropdown-menu-end", "dropdown-menu-top");
      this.focusedIndex = -1;
    },

    open: function () {
      if (this.isExpanded) return;

      this.toggle.setAttribute("aria-expanded", "true");
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
      input = event.target.previousElementSibling;
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
      if (returnFocusToEl && returnFocusToEl.focus) {
        returnFocusToEl.focus();
      }
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

    function isEmptyHtml(html) {
      const template = document.createElement("template");
      template.innerHTML = html;
      const hasImg = template.content.querySelector("img") !== null;
      const text = template.content.textContent || "";
      return !hasImg && isEmptyPlaintext(text);
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

  /*
   * Global DOM fix-ups that were previously inline <script> blocks in
   * templates/document_head.hbs. Kept here so they live in the built script.js
   * (source of truth) instead of the template head.
   *
   * ES2015 only (no async/await) — this file is bundled into script.js.
   */

  // ---------------------------------------------------------------------------
  // 1. Neutralize the current-page breadcrumb link.
  //    Zendesk renders the active breadcrumb as <a href="#" aria-current="page">;
  //    clicking it navigates to "#", which blanks the page. It represents the
  //    page you are already on, so it should not navigate at all. Removing the
  //    href makes navigation impossible for both mouse and keyboard; the matching
  //    `pointer-events: none` rule in _breadcrumbs.scss is a visual backstop.
  //
  //    (Replaces the former inline version, which ran a body-wide
  //    MutationObserver forever on every DOM mutation.)
  // ---------------------------------------------------------------------------
  (function () {
    var SEL = 'nav[aria-label="Breadcrumb"] a, .breadcrumbs a';

    function isDead(a) {
      if (!a) return false;
      var href = a.getAttribute("href");
      return (
        a.getAttribute("aria-current") === "page" ||
        href === "#" ||
        href === "" ||
        href === null
      );
    }

    function neutralize() {
      var links = document.querySelectorAll(SEL);
      for (var i = 0; i < links.length; i++) {
        var a = links[i];
        if (!isDead(a)) continue;
        if (a.hasAttribute("href")) {
          a.setAttribute("data-dead-href", a.getAttribute("href"));
          a.removeAttribute("href");
        }
        a.setAttribute("role", "link");
        a.setAttribute("aria-disabled", "true");
      }
    }

    if (document.readyState !== "loading") {
      neutralize();
    } else {
      document.addEventListener("DOMContentLoaded", neutralize);
    }
  })();

  // ---------------------------------------------------------------------------
  // 2. Hide any element whose only text is literally "empty".
  //    This is a placeholder that can leak into the rendered page. Adding the
  //    `.svc-empty-hidden` class (styled in _svc-tokens.scss) hides it without an
  //    inline style.
  //    TODO: find and fix the source that emits "empty" so this can be removed.
  // ---------------------------------------------------------------------------
  (function () {
    function hideEmpty() {
      var els = document.querySelectorAll("a, li, div");
      for (var i = 0; i < els.length; i++) {
        if (els[i].textContent.trim().toLowerCase() === "empty") {
          els[i].classList.add("svc-empty-hidden");
        }
      }
    }

    if (document.readyState !== "loading") {
      hideEmpty();
    } else {
      document.addEventListener("DOMContentLoaded", hideEmpty);
    }
  })();

  /*
   * Shared "live search" widget logic for the Service Catalog mini search
   * (service_page.hbs) and hero search (service_list_page.hbs).
   *
   * These two searches used to be ~300 lines of near-duplicated inline
   * <script> in each template (SYNONYMS map, esc/stripTags helpers, fetchJSON,
   * scoring/ranking, dropdown rendering, keyboard nav). That logic now lives
   * here (bundled into script.js, same approach as ./domFixups.js) and each
   * template instantiates it with the DOM ids/classes/copy that differ between
   * the two pages.
   *
   * `initSvcSearch` and `safeHref` are exposed on `window` (see bottom of this
   * file) because script.js is a classic (non-module) script whose load order
   * relative to a page's inline <script> tags isn't guaranteed by this theme.
   * Callers in the templates poll for `window.initSvcSearch` before invoking
   * it (same defensive approach as domFixups.js's DOMContentLoaded guard,
   * just generalized to "wait for script.js" instead of "wait for the DOM").
   *
   * i18n note: the strings below (group titles, badges, loading/empty states)
   * are ARPA-H-authored copy specific to this widget, not Zendesk Guide "stock"
   * strings. Per this repo's Curlybars `{{t}}` helper, only keys Help Center
   * itself exposes can be resolved that way (see AGENTS.md) — arbitrary new
   * keys defined in translations.yml are not resolvable from templates. That
   * pipeline only covers manifest.json settings-panel labels. Centralizing the
   * copy here (single source of truth, passed in via `strings`) removes the
   * duplication and makes a future proper localization pass a one-file change.
   */

  var DEFAULT_SYNONYMS = {
    laptop: ["device", "computer", "macbook", "hardware", "equipment"],
    computer: ["device", "laptop", "hardware", "equipment"],
    monitor: ["device", "peripheral", "hardware", "display"],
    keyboard: ["device", "peripheral", "hardware"],
    mouse: ["device", "peripheral", "hardware"],
    wifi: ["network", "internet", "wireless", "connection"],
    internet: ["network", "wifi", "connection"],
    vpn: ["network", "remote", "access", "connection"],
    email: ["outlook", "mailbox", "mail"],
    phone: ["mobile", "cell", "device", "telephone"],
    login: ["account", "password", "access", "sign in", "credentials"],
    signin: ["account", "password", "access", "login"],
    printer: ["print", "peripheral", "device"],
  };

  var DEFAULT_STRINGS = {
    searching: "Searching…",
    noMatches: "No matching services or resources.",
    seeAllResultsFor: "See all results for",
    recommendedServices: "Recommended services",
    selfHelpResources: "Self-Help Resources",
    serviceBadge: "Service",
    resourceBadge: "Resource",
    serviceCatalogFallback: "Service catalog",
    knowledgeArticleFallback: "Knowledge article",
    untitled: "Untitled",
  };

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function stripTags(s) {
    var d = document.createElement("div");
    d.innerHTML = s || "";
    return (d.textContent || "").trim();
  }

  /**
   * Restrict a URL to a safe scheme before it is inserted via innerHTML.
   * Defense in depth per the OWASP DOM-based XSS Prevention Cheat Sheet
   * (https://cheatsheetseries.owasp.org/cheatsheets/DOM_based_XSS_Prevention_Cheat_Sheet.html):
   * entity-escaping neutralizes markup breakout but not a `javascript:` URI, so
   * the scheme itself must also be validated. Relative URLs (no scheme, e.g.
   * "/hc/en-us/services/123") are always allowed; absolute URLs are allowed
   * only for http:/https:. Anything else (javascript:, data:, vbscript:, etc.)
   * falls back to `fallback` (default "#").
   */
  function safeHref(url, fallback) {
    var fb = fallback || "#";
    if (url == null) return fb;
    var str = String(url).trim();
    if (!str) return fb;
    // Strip control/whitespace characters that can be used to smuggle a scheme
    // past naive checks (e.g. "java\tscript:").
    // eslint-disable-next-line no-control-regex
    var stripped = str.replace(/[\x00-\x1f\x7f]/g, "");
    var schemeMatch = stripped.match(/^([a-zA-Z][a-zA-Z0-9+.-]*):/);
    if (!schemeMatch) return str; // no scheme => relative URL, safe
    var scheme = schemeMatch[1].toLowerCase();
    return scheme === "http" || scheme === "https" ? str : fb;
  }

  function initSvcSearch(options) {
    var formId = options.formId;
    var inputId = options.inputId;
    var resultsId = options.resultsId;
    var chipsId = options.chipsId;
    var chipSelector = options.chipSelector || ".svc-hero-chip";
    var resultPrefix = options.resultPrefix; // 'mr' (mini) or 'res' (hero)
    var iconSize = options.iconSize || 17;
    var gapPx = options.gapPx || 8;
    var synonyms = options.synonyms || DEFAULT_SYNONYMS;
    var strings = Object.assign({}, DEFAULT_STRINGS, options.strings || {});
    var fallbackHref = options.fallbackHref || "#";

    var form = document.getElementById(formId);
    var input = document.getElementById(inputId);
    var results = document.getElementById(resultsId);
    var chips = chipsId ? document.getElementById(chipsId) : null;
    if (!form || !input || !results) return;

    function cls(name) {
      return "svc-" + resultPrefix + "-" + name;
    }

    var HC_BASE = (location.pathname.match(/^\/hc\/[^/]+/) || ["/hc/en-us"])[0];
    var SERVICES_URL = HC_BASE + "/services";
    var SEARCH_PAGE = HC_BASE + "/search?query=";
    var MAX = 5;
    var timer = null;
    var token = 0;

    if (results.parentElement !== document.body)
      document.body.appendChild(results);

    var ICON_SERVICE =
      '<svg width="' +
      iconSize +
      '" height="' +
      iconSize +
      '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="12" rx="2"></rect><line x1="2" y1="20" x2="22" y2="20"></line></svg>';
    var ICON_DOC =
      '<svg width="' +
      iconSize +
      '" height="' +
      iconSize +
      '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>';

    function fetchJSON(url, tok) {
      return fetch(url, {
        headers: { Accept: "application/json" },
        credentials: "same-origin",
      })
        .then(function (r) {
          return r.ok ? r.json() : null;
        })
        .then(function (d) {
          return tok === token ? d : null;
        })
        .catch(function () {
          return null;
        });
    }

    var allServices = null;
    var servicesLoading = null;

    /* Cache the fetched catalog in sessionStorage so it loads once per session
       (TTL 30 min) instead of on every page load. Shared between the mini and
       hero searches. */
    var SVC_CACHE_KEY = "svcCatalogItems";
    var SVC_CACHE_TTL = 30 * 60 * 1000;
    function svcReadCache() {
      try {
        var c = JSON.parse(sessionStorage.getItem(SVC_CACHE_KEY) || "null");
        if (!c || !Array.isArray(c.items) || Date.now() - c.ts > SVC_CACHE_TTL)
          return null;
        return c.items;
      } catch {
        return null;
      }
    }
    function svcWriteCache(items) {
      try {
        sessionStorage.setItem(
          SVC_CACHE_KEY,
          JSON.stringify({ ts: Date.now(), items: items })
        );
      } catch {
        // sessionStorage may be unavailable (private browsing, quota, etc.);
        // caching is a pure optimization, so silently skip it.
      }
    }

    function normalizeItem(it) {
      var id = it.id || it.uuid || "";
      return {
        title: stripTags(it.name || it.title || strings.serviceBadge),
        desc: stripTags(it.description || ""),
        category: stripTags(
          it.category_name || (it.category && it.category.name) || ""
        ),
        href: safeHref(
          it.html_url || (id ? HC_BASE + "/services/" + id : SERVICES_URL),
          fallbackHref
        ),
      };
    }

    function loadAllServices() {
      if (allServices) return Promise.resolve(allServices);
      if (servicesLoading) return servicesLoading;
      var cached = svcReadCache();
      if (cached) {
        allServices = cached;
        return Promise.resolve(cached);
      }
      servicesLoading = fetchServicesPage(
        "/api/v2/help_center/service_catalog/items.json?page[size]=100",
        0,
        []
      ).then(function (out) {
        allServices = out;
        svcWriteCache(out);
        return out;
      });
      return servicesLoading;
    }

    // Recursively walks the paginated service catalog API (max 20 pages),
    // accumulating normalized items into `out`. Written as a plain Promise
    // chain (not async/await) to match this file's ES2015-only convention.
    function fetchServicesPage(url, guard, out) {
      if (!url || guard >= 20) return Promise.resolve(out);
      return fetch(url, {
        headers: { Accept: "application/json" },
        credentials: "same-origin",
      })
        .then(function (r) {
          return r.ok ? r.json() : null;
        })
        .then(function (data) {
          if (!data) return out;
          var arr =
            data.service_catalog_items ||
            data.items ||
            data.results ||
            data.records ||
            [];
          arr.forEach(function (it) {
            out.push(normalizeItem(it));
          });
          var nextUrl =
            data.meta && data.meta.has_more && data.links && data.links.next
              ? data.links.next
              : null;
          return fetchServicesPage(nextUrl, guard + 1, out);
        })
        .catch(function () {
          return out;
        });
    }

    function scoreService(svc, terms) {
      var title = svc.title.toLowerCase();
      var desc = svc.desc.toLowerCase();
      var cat = svc.category.toLowerCase();
      var score = 0;
      for (var i = 0; i < terms.length; i++) {
        var t = terms[i];
        if (!t) continue;
        if (title === t) score += 100;
        else if (title.indexOf(t) === 0) score += 50;
        else if (title.indexOf(t) !== -1) score += 30;
        if (desc.indexOf(t) !== -1) score += 10;
        if (cat.indexOf(t) !== -1) score += 15;
      }
      return score;
    }

    function buildTerms(q) {
      var base = q.toLowerCase().split(/\s+/).filter(Boolean);
      var terms = {};
      base.forEach(function (w) {
        terms[w] = 1;
      });
      base.forEach(function (w) {
        var key = w.replace(/[^a-z]/g, "");
        (synonyms[key] || []).forEach(function (s) {
          terms[s.toLowerCase()] = 1;
        });
      });
      return { primary: base, all: Object.keys(terms) };
    }

    function getServices(q) {
      return loadAllServices().then(function (list) {
        if (!list || !list.length) return [];
        var parts = buildTerms(q);
        var primary = parts.primary;
        var all = parts.all;
        var scored = list
          .map(function (svc) {
            return { svc: svc, score: scoreService(svc, primary) };
          })
          .filter(function (x) {
            return x.score > 0;
          });
        if (scored.length < 3 && all.length > primary.length) {
          var have = {};
          scored.forEach(function (x) {
            have[x.svc.href] = 1;
          });
          list.forEach(function (svc) {
            if (have[svc.href]) return;
            var s = scoreService(svc, all);
            if (s > 0) scored.push({ svc: svc, score: s - 5 });
          });
        }
        scored.sort(function (a, b) {
          return b.score - a.score;
        });
        return scored.slice(0, MAX).map(function (x) {
          return {
            title: x.svc.title,
            href: x.svc.href,
            sub:
              x.svc.category ||
              (x.svc.desc
                ? x.svc.desc.slice(0, 70)
                : strings.serviceCatalogFallback),
          };
        });
      });
    }

    function getDocs(q, tok) {
      var url =
        "/api/v2/help_center/articles/search.json?per_page=" +
        MAX +
        "&query=" +
        encodeURIComponent(q);
      return fetchJSON(url, tok).then(function (d) {
        if (!d) return [];
        return (d.results || []).slice(0, MAX).map(function (a) {
          return {
            title: stripTags(a.title) || strings.untitled,
            href: safeHref(
              a.html_url || SEARCH_PAGE + encodeURIComponent(q),
              fallbackHref
            ),
            sub: a.snippet
              ? stripTags(a.snippet).slice(0, 70)
              : strings.knowledgeArticleFallback,
          };
        });
      });
    }

    var optionSeq = 0;
    function group(title, groupCls, badge, icon, itemCls, items) {
      if (!items.length) return "";
      var html =
        '<div class="' +
        cls("group-header") +
        " " +
        groupCls +
        '">' +
        '<span class="' +
        cls("group-title") +
        '">' +
        esc(title) +
        "</span>" +
        '<span class="' +
        cls("group-count") +
        '">' +
        items.length +
        "</span></div>";
      items.forEach(function (it) {
        var optId = resultsId + "-opt-" + optionSeq++;
        html +=
          '<a id="' +
          optId +
          '" class="' +
          cls("item") +
          " " +
          itemCls +
          '" role="option" aria-selected="false" href="' +
          esc(it.href) +
          '">' +
          '<span class="' +
          cls("icon") +
          '" aria-hidden="true">' +
          icon +
          "</span>" +
          '<span class="' +
          cls("text") +
          '"><span class="' +
          cls("title") +
          '">' +
          esc(it.title) +
          "</span>" +
          '<span class="' +
          cls("sub") +
          '">' +
          esc(it.sub) +
          "</span></span>" +
          '<span class="' +
          cls("badge") +
          '">' +
          badge +
          "</span></a>";
      });
      return html;
    }

    function place() {
      var r = form.getBoundingClientRect();
      var m = 12;
      var w = Math.min(r.width, window.innerWidth - m * 2);
      var l = Math.min(Math.max(r.left, m), window.innerWidth - m - w);
      results.style.left = Math.round(l) + "px";
      results.style.width = Math.round(w) + "px";
      results.style.top = Math.round(r.bottom + gapPx) + "px";
    }
    function show(html) {
      results.innerHTML = html;
      results.hidden = false;
      place();
      input.setAttribute("aria-expanded", "true");
    }
    function hide() {
      results.hidden = true;
      results.innerHTML = "";
      input.setAttribute("aria-expanded", "false");
      input.removeAttribute("aria-activedescendant");
    }

    function run(q) {
      q = (q || "").trim();
      if (q.length < 2) {
        hide();
        return;
      }
      var tok = ++token;
      optionSeq = 0;
      show(
        '<div class="' + cls("loading") + '">' + esc(strings.searching) + "</div>"
      );
      Promise.all([getServices(q), getDocs(q, tok)]).then(function (res) {
        var services = res[0];
        var docs = res[1];
        if (tok !== token) return;
        optionSeq = 0;
        var html =
          group(
            strings.recommendedServices,
            cls("services"),
            strings.serviceBadge,
            ICON_SERVICE,
            cls("service"),
            services
          ) +
          group(
            strings.selfHelpResources,
            cls("docs"),
            strings.resourceBadge,
            ICON_DOC,
            cls("doc"),
            docs
          );
        if (!services.length && !docs.length) {
          html =
            '<div class="' +
            cls("empty") +
            '">' +
            esc(strings.noMatches) +
            "</div>";
        }
        html +=
          '<a class="' +
          cls("footer") +
          '" href="' +
          SEARCH_PAGE +
          encodeURIComponent(q) +
          '">' +
          esc(strings.seeAllResultsFor) +
          " &ldquo;" +
          esc(q) +
          "&rdquo;</a>";
        show(html);
      });
    }

    loadAllServices();

    input.addEventListener("input", function () {
      clearTimeout(timer);
      var q = input.value;
      timer = setTimeout(function () {
        run(q);
      }, 220);
    });
    input.addEventListener("focus", function () {
      if (input.value.trim().length >= 2 && results.innerHTML) {
        results.hidden = false;
        place();
      }
    });
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var q = input.value.trim();
      if (q) window.location.href = SEARCH_PAGE + encodeURIComponent(q);
    });

    if (chips) {
      chips.addEventListener("click", function (e) {
        var chip = e.target.closest && e.target.closest(chipSelector);
        if (!chip) return;
        var q = chip.getAttribute("data-q") || chip.textContent.trim();
        input.value = q;
        input.focus();
        run(q);
      });
    }

    input.addEventListener("keydown", function (e) {
      if (results.hidden) return;
      var items = Array.prototype.slice.call(
        results.querySelectorAll("." + cls("item"))
      );
      if (!items.length) return;
      var i = items.findIndex(function (el) {
        return el.classList.contains(cls("active"));
      });
      if (e.key === "ArrowDown") {
        e.preventDefault();
        i = (i + 1) % items.length;
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        i = (i - 1 + items.length) % items.length;
      } else if (e.key === "Enter" && i >= 0) {
        e.preventDefault();
        window.location.href = items[i].getAttribute("href");
        return;
      } else if (e.key === "Escape") {
        hide();
        return;
      } else {
        return;
      }
      items.forEach(function (el) {
        el.classList.remove(cls("active"));
        el.setAttribute("aria-selected", "false");
      });
      items[i].classList.add(cls("active"));
      items[i].setAttribute("aria-selected", "true");
      input.setAttribute("aria-activedescendant", items[i].id);
      items[i].scrollIntoView({ block: "nearest" });
    });

    document.addEventListener("click", function (e) {
      if (!form.contains(e.target) && !results.contains(e.target)) hide();
    });
    window.addEventListener(
      "scroll",
      function () {
        if (!results.hidden) place();
      },
      { passive: true }
    );
    window.addEventListener("resize", function () {
      if (!results.hidden) place();
    });
    input.addEventListener("blur", function () {
      // Give click-on-option a chance to navigate before we potentially hide.
      setTimeout(function () {
        if (document.activeElement !== input)
          input.removeAttribute("aria-activedescendant");
      }, 0);
    });
  }

  // Expose on `window` for the page-specific inline <script> blocks in
  // service_page.hbs / service_list_page.hbs to call — see the file header
  // comment for why this isn't a plain module import.
  if (typeof window !== "undefined") {
    window.initSvcSearch = initSvcSearch;
    window.svcSafeHref = safeHref;
  }

})();
