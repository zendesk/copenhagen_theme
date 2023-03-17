(function(){'use strict';// Key map
const ENTER = 13;
const ESCAPE = 27;
const SPACE = 32;
const UP = 38;
const DOWN = 40;
const TAB = 9;function toggleNavigation(toggle, menu) {
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
  menuButton.addEventListener("click", event => {
    event.stopPropagation();
    toggleNavigation(menuButton, menuList);
  });
  menuList.addEventListener("keyup", event => {
    if (event.keyCode === ESCAPE) {
      event.stopPropagation();
      closeNavigation(menuButton, menuList);
    }
  });

  // Toggles expanded aria to collapsible elements
  const collapsible = document.querySelectorAll(".collapsible-nav, .collapsible-sidebar");
  collapsible.forEach(element => {
    const toggle = element.querySelector(".collapsible-nav-toggle, .collapsible-sidebar-toggle");
    element.addEventListener("click", () => {
      toggleNavigation(toggle, element);
    });
    element.addEventListener("keyup", event => {
      console.log("escape");
      if (event.keyCode === ESCAPE) {
        closeNavigation(toggle, element);
      }
    });
  });

  // If multibrand search has more than 5 help centers or categories collapse the list
  const multibrandFilterLists = document.querySelectorAll(".multibrand-filter-list");
  multibrandFilterLists.forEach(filter => {
    if (filter.children.length > 6) {
      // Display the show more button
      const trigger = filter.querySelector(".see-all-filters");
      trigger.setAttribute("aria-hidden", false);

      // Add event handler for click
      trigger.addEventListener("click", event => {
        event.stopPropagation();
        trigger.parentNode.removeChild(trigger);
        filter.classList.remove("multibrand-filter-list--collapsed");
      });
    }
  });
});function Dropdown$1(toggle, menu) {
  this.toggle = toggle;
  this.menu = menu;
  this.menuPlacement = {
    top: menu.classList.contains("dropdown-menu-top"),
    end: menu.classList.contains("dropdown-menu-end")
  };
  this.toggle.addEventListener("click", this.clickHandler.bind(this));
  this.toggle.addEventListener("keydown", this.toggleKeyHandler.bind(this));
  this.menu.addEventListener("keydown", this.menuKeyHandler.bind(this));
}
Dropdown$1.prototype = {
  get isExpanded() {
    return this.menu.getAttribute("aria-expanded") === "true";
  },
  get menuItems() {
    return Array.prototype.slice.call(this.menu.querySelectorAll("[role='menuitem']"));
  },
  dismiss: function () {
    if (!this.isExpanded) return;
    this.menu.setAttribute("aria-expanded", false);
    this.menu.classList.remove("dropdown-menu-end", "dropdown-menu-top");
  },
  open: function () {
    if (this.isExpanded) return;
    this.menu.setAttribute("aria-expanded", true);
    this.handleOverflow();
  },
  handleOverflow: function () {
    var rect = this.menu.getBoundingClientRect();
    var overflow = {
      right: rect.left < 0 || rect.left + rect.width > window.innerWidth,
      bottom: rect.top < 0 || rect.top + rect.height > window.innerHeight
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
  focusNextMenuItem: function (currentItem) {
    if (!this.menuItems.length) return;
    var currentIndex = this.menuItems.indexOf(currentItem);
    var nextIndex = currentIndex === this.menuItems.length - 1 || currentIndex < 0 ? 0 : currentIndex + 1;
    this.menuItems[nextIndex].focus();
  },
  focusPreviousMenuItem: function (currentItem) {
    if (!this.menuItems.length) return;
    var currentIndex = this.menuItems.indexOf(currentItem);
    var previousIndex = currentIndex <= 0 ? this.menuItems.length - 1 : currentIndex - 1;
    this.menuItems[previousIndex].focus();
  },
  clickHandler: function () {
    if (this.isExpanded) {
      this.dismiss();
    } else {
      this.open();
    }
  },
  toggleKeyHandler: function (e) {
    switch (e.keyCode) {
      case ENTER:
      case SPACE:
      case DOWN:
        e.preventDefault();
        this.open();
        this.focusNextMenuItem();
        break;
      case UP:
        e.preventDefault();
        this.open();
        this.focusPreviousMenuItem();
        break;
      case ESCAPE:
        this.dismiss();
        this.toggle.focus();
        break;
    }
  },
  menuKeyHandler: function (e) {
    var firstItem = this.menuItems[0];
    var lastItem = this.menuItems[this.menuItems.length - 1];
    var currentElement = e.target;
    switch (e.keyCode) {
      case ESCAPE:
        this.dismiss();
        this.toggle.focus();
        break;
      case DOWN:
        e.preventDefault();
        this.focusNextMenuItem(currentElement);
        break;
      case UP:
        e.preventDefault();
        this.focusPreviousMenuItem(currentElement);
        break;
      case TAB:
        if (e.shiftKey) {
          if (currentElement === firstItem) {
            this.dismiss();
          } else {
            e.preventDefault();
            this.focusPreviousMenuItem(currentElement);
          }
        } else if (currentElement === lastItem) {
          this.dismiss();
        } else {
          e.preventDefault();
          this.focusNextMenuItem(currentElement);
        }
        break;
      case ENTER:
      case SPACE:
        e.preventDefault();
        currentElement.click();
        break;
    }
  }
};// Drodowns

window.addEventListener("DOMContentLoaded", () => {
  const dropdowns = [];
  const dropdownToggles = document.querySelectorAll(".dropdown-toggle");
  dropdownToggles.forEach(toggle => {
    const menu = toggle.nextElementSibling;
    if (menu && menu.classList.contains("dropdown-menu")) {
      dropdowns.push(new Dropdown$1(toggle, menu));
    }
  });
  document.addEventListener("click", event => {
    dropdowns.forEach(dropdown => {
      if (!dropdown.toggle.contains(event.target)) {
        dropdown.dismiss();
      }
    });
  });
});// Share

window.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".share a");
  links.forEach(anchor => {
    anchor.addEventListener("click", event => {
      event.preventDefault();
      window.open(anchor.href, "", "height = 500, width = 500");
    });
  });
});// Vanilla JS debounce function, by Josh W. Comeau:
// https://www.joshwcomeau.com/snippets/javascript/debounce/
function debounce$3(callback, wait) {
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
  event.target.closest(searchFormSelector).classList.remove(searchFormFilledClassName);
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
const toggleClearSearchButtonAvailability = debounce$3(event => {
  const form = event.target.closest(searchFormSelector);
  form.classList.toggle(searchFormFilledClassName, event.target.value.length > 0);
}, 200);

// Search

window.addEventListener("DOMContentLoaded", () => {
  // Set up clear functionality for the search field
  const searchForms = [...document.querySelectorAll(searchFormSelector)];
  const searchInputs = searchForms.map(form => form.querySelector("input[type='search']"));
  searchInputs.forEach(input => {
    appendClearSearchButton(input, input.closest(searchFormSelector));
    input.addEventListener("keyup", clearSearchInputOnKeypress);
    input.addEventListener("keyup", toggleClearSearchButtonAvailability);
  });
});const key$1 = "returnFocusTo";
function saveFocus() {
  const activeElementId = document.activeElement.getAttribute("id");
  sessionStorage.setItem(key$1, "#" + activeElementId);
}
function returnFocus() {
  const returnFocusTo = sessionStorage.getItem(key$1);
  if (returnFocusTo) {
    sessionStorage.removeItem("returnFocusTo");
    const returnFocusToEl = document.querySelector(returnFocusTo);
    returnFocusToEl && returnFocusToEl.focus && returnFocusToEl.focus();
  }
}// Forms

window.addEventListener("DOMContentLoaded", () => {
  // In some cases we should preserve focus after page reload
  returnFocus();

  // show form controls when the textarea receives focus or back button is used and value exists
  const commentContainerTextarea = document.querySelector(".comment-container textarea");
  const commentContainerFormControls = document.querySelector(".comment-form-controls, .comment-ccs");
  if (commentContainerTextarea) {
    commentContainerTextarea.addEventListener("focus", function focusCommentContainerTextarea() {
      commentContainerFormControls.style.display = "block";
      commentContainerTextarea.removeEventListener("focus", focusCommentContainerTextarea);
    });
    if (commentContainerTextarea.value !== "") {
      commentContainerFormControls.style.display = "block";
    }
  }

  // Expand Request comment form when Add to conversation is clicked
  const showRequestCommentContainerTrigger = document.querySelector(".request-container .comment-container .comment-show-container");
  const requestCommentFields = document.querySelectorAll(".request-container .comment-container .comment-fields");
  const requestCommentSubmit = document.querySelector(".request-container .comment-container .request-submit-comment");
  if (showRequestCommentContainerTrigger) {
    showRequestCommentContainerTrigger.addEventListener("click", () => {
      showRequestCommentContainerTrigger.style.display = "none";
      Array.prototype.forEach.call(requestCommentFields, element => {
        element.style.display = "block";
      });
      requestCommentSubmit.style.display = "inline-block";
      if (commentContainerTextarea) {
        commentContainerTextarea.focus();
      }
    });
  }

  // Mark as solved button
  const requestMarkAsSolvedButton = document.querySelector(".request-container .mark-as-solved:not([data-disabled])");
  const requestMarkAsSolvedCheckbox = document.querySelector(".request-container .comment-container input[type=checkbox]");
  const requestCommentSubmitButton = document.querySelector(".request-container .comment-container input[type=submit]");
  if (requestMarkAsSolvedButton) {
    requestMarkAsSolvedButton.addEventListener("click", () => {
      requestMarkAsSolvedCheckbox.setAttribute("checked", true);
      requestCommentSubmitButton.disabled = true;
      requestMarkAsSolvedButton.setAttribute("data-disabled", true);
      requestMarkAsSolvedButton.form.submit();
    });
  }

  // Change Mark as solved text according to whether comment is filled
  const requestCommentTextarea = document.querySelector(".request-container .comment-container textarea");
  const usesWysiwyg = requestCommentTextarea && requestCommentTextarea.dataset.helper === "wysiwyg";
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
          requestMarkAsSolvedButton.innerText = requestMarkAsSolvedButton.getAttribute("data-solve-translation");
        }
        requestCommentSubmitButton.disabled = true;
      } else {
        if (requestMarkAsSolvedButton) {
          requestMarkAsSolvedButton.innerText = requestMarkAsSolvedButton.getAttribute("data-solve-and-submit-translation");
        }
        requestCommentSubmitButton.disabled = false;
      }
    });
  }

  // Disable submit button if textarea is empty
  if (requestCommentTextarea && isEmpty(requestCommentTextarea.value)) {
    requestCommentSubmitButton.disabled = true;
  }
  const selects = document.querySelectorAll("#request-status-select, #request-organization-select");
  selects.forEach(element => {
    element.addEventListener("change", event => {
      event.stopPropagation();
      saveFocus();
      element.form.submit();
    });
  });

  // Submit requests filter form on search in the request list page
  const quickSearch = document.querySelector("#quick-search");
  if (quickSearch) {
    quickSearch.addEventListener("keyup", event => {
      if (event.keyCode === ENTER) {
        event.stopPropagation();
        saveFocus();
        quickSearch.form.submit();
      }
    });
  }

  // Submit organization form in the request page
  const requestOrganisationSelect = document.querySelector("#request-organization select");
  if (requestOrganisationSelect) {
    requestOrganisationSelect.addEventListener("change", () => {
      requestOrganisationSelect.form.submit();
    });
  }

  // If there are any error notifications below an input field, focus that field
  const notificationElm = document.querySelector(".notification-error");
  if (notificationElm && notificationElm.previousElementSibling && typeof notificationElm.previousElementSibling.focus === "function") {
    notificationElm.previousElementSibling.focus();
  }
});var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}var reactExports = {};
var react = {
  get exports(){ return reactExports; },
  set exports(v){ reactExports = v; },
};var react_production_min = {};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var l$3 = Symbol.for("react.element"),
  n$3 = Symbol.for("react.portal"),
  p$3 = Symbol.for("react.fragment"),
  q$3 = Symbol.for("react.strict_mode"),
  r$2 = Symbol.for("react.profiler"),
  t$2 = Symbol.for("react.provider"),
  u$1 = Symbol.for("react.context"),
  v$4 = Symbol.for("react.forward_ref"),
  w$3 = Symbol.for("react.suspense"),
  x$3 = Symbol.for("react.memo"),
  y$3 = Symbol.for("react.lazy"),
  z$4 = Symbol.iterator;
function A$3(a) {
  if (null === a || "object" !== typeof a) return null;
  a = z$4 && a[z$4] || a["@@iterator"];
  return "function" === typeof a ? a : null;
}
var B$3 = {
    isMounted: function () {
      return !1;
    },
    enqueueForceUpdate: function () {},
    enqueueReplaceState: function () {},
    enqueueSetState: function () {}
  },
  C$3 = Object.assign,
  D$3 = {};
function E$3(a, b, e) {
  this.props = a;
  this.context = b;
  this.refs = D$3;
  this.updater = e || B$3;
}
E$3.prototype.isReactComponent = {};
E$3.prototype.setState = function (a, b) {
  if ("object" !== typeof a && "function" !== typeof a && null != a) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, a, b, "setState");
};
E$3.prototype.forceUpdate = function (a) {
  this.updater.enqueueForceUpdate(this, a, "forceUpdate");
};
function F$2() {}
F$2.prototype = E$3.prototype;
function G$3(a, b, e) {
  this.props = a;
  this.context = b;
  this.refs = D$3;
  this.updater = e || B$3;
}
var H$3 = G$3.prototype = new F$2();
H$3.constructor = G$3;
C$3(H$3, E$3.prototype);
H$3.isPureReactComponent = !0;
var I$3 = Array.isArray,
  J$1 = Object.prototype.hasOwnProperty,
  K$2 = {
    current: null
  },
  L$2 = {
    key: !0,
    ref: !0,
    __self: !0,
    __source: !0
  };
function M$2(a, b, e) {
  var d,
    c = {},
    k = null,
    h = null;
  if (null != b) for (d in void 0 !== b.ref && (h = b.ref), void 0 !== b.key && (k = "" + b.key), b) J$1.call(b, d) && !L$2.hasOwnProperty(d) && (c[d] = b[d]);
  var g = arguments.length - 2;
  if (1 === g) c.children = e;else if (1 < g) {
    for (var f = Array(g), m = 0; m < g; m++) f[m] = arguments[m + 2];
    c.children = f;
  }
  if (a && a.defaultProps) for (d in g = a.defaultProps, g) void 0 === c[d] && (c[d] = g[d]);
  return {
    $$typeof: l$3,
    type: a,
    key: k,
    ref: h,
    props: c,
    _owner: K$2.current
  };
}
function N$2(a, b) {
  return {
    $$typeof: l$3,
    type: a.type,
    key: b,
    ref: a.ref,
    props: a.props,
    _owner: a._owner
  };
}
function O$1(a) {
  return "object" === typeof a && null !== a && a.$$typeof === l$3;
}
function escape(a) {
  var b = {
    "=": "=0",
    ":": "=2"
  };
  return "$" + a.replace(/[=:]/g, function (a) {
    return b[a];
  });
}
var P$1 = /\/+/g;
function Q$2(a, b) {
  return "object" === typeof a && null !== a && null != a.key ? escape("" + a.key) : b.toString(36);
}
function R$1(a, b, e, d, c) {
  var k = typeof a;
  if ("undefined" === k || "boolean" === k) a = null;
  var h = !1;
  if (null === a) h = !0;else switch (k) {
    case "string":
    case "number":
      h = !0;
      break;
    case "object":
      switch (a.$$typeof) {
        case l$3:
        case n$3:
          h = !0;
      }
  }
  if (h) return h = a, c = c(h), a = "" === d ? "." + Q$2(h, 0) : d, I$3(c) ? (e = "", null != a && (e = a.replace(P$1, "$&/") + "/"), R$1(c, b, e, "", function (a) {
    return a;
  })) : null != c && (O$1(c) && (c = N$2(c, e + (!c.key || h && h.key === c.key ? "" : ("" + c.key).replace(P$1, "$&/") + "/") + a)), b.push(c)), 1;
  h = 0;
  d = "" === d ? "." : d + ":";
  if (I$3(a)) for (var g = 0; g < a.length; g++) {
    k = a[g];
    var f = d + Q$2(k, g);
    h += R$1(k, b, e, f, c);
  } else if (f = A$3(a), "function" === typeof f) for (a = f.call(a), g = 0; !(k = a.next()).done;) k = k.value, f = d + Q$2(k, g++), h += R$1(k, b, e, f, c);else if ("object" === k) throw b = String(a), Error("Objects are not valid as a React child (found: " + ("[object Object]" === b ? "object with keys {" + Object.keys(a).join(", ") + "}" : b) + "). If you meant to render a collection of children, use an array instead.");
  return h;
}
function S$2(a, b, e) {
  if (null == a) return a;
  var d = [],
    c = 0;
  R$1(a, d, "", "", function (a) {
    return b.call(e, a, c++);
  });
  return d;
}
function T$2(a) {
  if (-1 === a._status) {
    var b = a._result;
    b = b();
    b.then(function (b) {
      if (0 === a._status || -1 === a._status) a._status = 1, a._result = b;
    }, function (b) {
      if (0 === a._status || -1 === a._status) a._status = 2, a._result = b;
    });
    -1 === a._status && (a._status = 0, a._result = b);
  }
  if (1 === a._status) return a._result.default;
  throw a._result;
}
var U$2 = {
    current: null
  },
  V$2 = {
    transition: null
  },
  W$2 = {
    ReactCurrentDispatcher: U$2,
    ReactCurrentBatchConfig: V$2,
    ReactCurrentOwner: K$2
  };
react_production_min.Children = {
  map: S$2,
  forEach: function (a, b, e) {
    S$2(a, function () {
      b.apply(this, arguments);
    }, e);
  },
  count: function (a) {
    var b = 0;
    S$2(a, function () {
      b++;
    });
    return b;
  },
  toArray: function (a) {
    return S$2(a, function (a) {
      return a;
    }) || [];
  },
  only: function (a) {
    if (!O$1(a)) throw Error("React.Children.only expected to receive a single React element child.");
    return a;
  }
};
react_production_min.Component = E$3;
react_production_min.Fragment = p$3;
react_production_min.Profiler = r$2;
react_production_min.PureComponent = G$3;
react_production_min.StrictMode = q$3;
react_production_min.Suspense = w$3;
react_production_min.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = W$2;
react_production_min.cloneElement = function (a, b, e) {
  if (null === a || void 0 === a) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + a + ".");
  var d = C$3({}, a.props),
    c = a.key,
    k = a.ref,
    h = a._owner;
  if (null != b) {
    void 0 !== b.ref && (k = b.ref, h = K$2.current);
    void 0 !== b.key && (c = "" + b.key);
    if (a.type && a.type.defaultProps) var g = a.type.defaultProps;
    for (f in b) J$1.call(b, f) && !L$2.hasOwnProperty(f) && (d[f] = void 0 === b[f] && void 0 !== g ? g[f] : b[f]);
  }
  var f = arguments.length - 2;
  if (1 === f) d.children = e;else if (1 < f) {
    g = Array(f);
    for (var m = 0; m < f; m++) g[m] = arguments[m + 2];
    d.children = g;
  }
  return {
    $$typeof: l$3,
    type: a.type,
    key: c,
    ref: k,
    props: d,
    _owner: h
  };
};
react_production_min.createContext = function (a) {
  a = {
    $$typeof: u$1,
    _currentValue: a,
    _currentValue2: a,
    _threadCount: 0,
    Provider: null,
    Consumer: null,
    _defaultValue: null,
    _globalName: null
  };
  a.Provider = {
    $$typeof: t$2,
    _context: a
  };
  return a.Consumer = a;
};
react_production_min.createElement = M$2;
react_production_min.createFactory = function (a) {
  var b = M$2.bind(null, a);
  b.type = a;
  return b;
};
react_production_min.createRef = function () {
  return {
    current: null
  };
};
react_production_min.forwardRef = function (a) {
  return {
    $$typeof: v$4,
    render: a
  };
};
react_production_min.isValidElement = O$1;
react_production_min.lazy = function (a) {
  return {
    $$typeof: y$3,
    _payload: {
      _status: -1,
      _result: a
    },
    _init: T$2
  };
};
react_production_min.memo = function (a, b) {
  return {
    $$typeof: x$3,
    type: a,
    compare: void 0 === b ? null : b
  };
};
react_production_min.startTransition = function (a) {
  var b = V$2.transition;
  V$2.transition = {};
  try {
    a();
  } finally {
    V$2.transition = b;
  }
};
react_production_min.unstable_act = function () {
  throw Error("act(...) is not supported in production builds of React.");
};
react_production_min.useCallback = function (a, b) {
  return U$2.current.useCallback(a, b);
};
react_production_min.useContext = function (a) {
  return U$2.current.useContext(a);
};
react_production_min.useDebugValue = function () {};
react_production_min.useDeferredValue = function (a) {
  return U$2.current.useDeferredValue(a);
};
react_production_min.useEffect = function (a, b) {
  return U$2.current.useEffect(a, b);
};
react_production_min.useId = function () {
  return U$2.current.useId();
};
react_production_min.useImperativeHandle = function (a, b, e) {
  return U$2.current.useImperativeHandle(a, b, e);
};
react_production_min.useInsertionEffect = function (a, b) {
  return U$2.current.useInsertionEffect(a, b);
};
react_production_min.useLayoutEffect = function (a, b) {
  return U$2.current.useLayoutEffect(a, b);
};
react_production_min.useMemo = function (a, b) {
  return U$2.current.useMemo(a, b);
};
react_production_min.useReducer = function (a, b, e) {
  return U$2.current.useReducer(a, b, e);
};
react_production_min.useRef = function (a) {
  return U$2.current.useRef(a);
};
react_production_min.useState = function (a) {
  return U$2.current.useState(a);
};
react_production_min.useSyncExternalStore = function (a, b, e) {
  return U$2.current.useSyncExternalStore(a, b, e);
};
react_production_min.useTransition = function () {
  return U$2.current.useTransition();
};
react_production_min.version = "18.2.0";(function (module) {

	{
	  module.exports = react_production_min;
	}
} (react));

var React = /*@__PURE__*/getDefaultExportFromCjs(reactExports);var reactDomExports = {};
var reactDom = {
  get exports(){ return reactDomExports; },
  set exports(v){ reactDomExports = v; },
};var reactDom_production_min = {};var schedulerExports = {};
var scheduler = {
  get exports(){ return schedulerExports; },
  set exports(v){ schedulerExports = v; },
};var scheduler_production_min = {};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

(function (exports) {

	function f(a, b) {
	  var c = a.length;
	  a.push(b);
	  a: for (; 0 < c;) {
	    var d = c - 1 >>> 1,
	      e = a[d];
	    if (0 < g(e, b)) a[d] = b, a[c] = e, c = d;else break a;
	  }
	}
	function h(a) {
	  return 0 === a.length ? null : a[0];
	}
	function k(a) {
	  if (0 === a.length) return null;
	  var b = a[0],
	    c = a.pop();
	  if (c !== b) {
	    a[0] = c;
	    a: for (var d = 0, e = a.length, w = e >>> 1; d < w;) {
	      var m = 2 * (d + 1) - 1,
	        C = a[m],
	        n = m + 1,
	        x = a[n];
	      if (0 > g(C, c)) n < e && 0 > g(x, C) ? (a[d] = x, a[n] = c, d = n) : (a[d] = C, a[m] = c, d = m);else if (n < e && 0 > g(x, c)) a[d] = x, a[n] = c, d = n;else break a;
	    }
	  }
	  return b;
	}
	function g(a, b) {
	  var c = a.sortIndex - b.sortIndex;
	  return 0 !== c ? c : a.id - b.id;
	}
	if ("object" === typeof performance && "function" === typeof performance.now) {
	  var l = performance;
	  exports.unstable_now = function () {
	    return l.now();
	  };
	} else {
	  var p = Date,
	    q = p.now();
	  exports.unstable_now = function () {
	    return p.now() - q;
	  };
	}
	var r = [],
	  t = [],
	  u = 1,
	  v = null,
	  y = 3,
	  z = !1,
	  A = !1,
	  B = !1,
	  D = "function" === typeof setTimeout ? setTimeout : null,
	  E = "function" === typeof clearTimeout ? clearTimeout : null,
	  F = "undefined" !== typeof setImmediate ? setImmediate : null;
	"undefined" !== typeof navigator && void 0 !== navigator.scheduling && void 0 !== navigator.scheduling.isInputPending && navigator.scheduling.isInputPending.bind(navigator.scheduling);
	function G(a) {
	  for (var b = h(t); null !== b;) {
	    if (null === b.callback) k(t);else if (b.startTime <= a) k(t), b.sortIndex = b.expirationTime, f(r, b);else break;
	    b = h(t);
	  }
	}
	function H(a) {
	  B = !1;
	  G(a);
	  if (!A) if (null !== h(r)) A = !0, I(J);else {
	    var b = h(t);
	    null !== b && K(H, b.startTime - a);
	  }
	}
	function J(a, b) {
	  A = !1;
	  B && (B = !1, E(L), L = -1);
	  z = !0;
	  var c = y;
	  try {
	    G(b);
	    for (v = h(r); null !== v && (!(v.expirationTime > b) || a && !M());) {
	      var d = v.callback;
	      if ("function" === typeof d) {
	        v.callback = null;
	        y = v.priorityLevel;
	        var e = d(v.expirationTime <= b);
	        b = exports.unstable_now();
	        "function" === typeof e ? v.callback = e : v === h(r) && k(r);
	        G(b);
	      } else k(r);
	      v = h(r);
	    }
	    if (null !== v) var w = !0;else {
	      var m = h(t);
	      null !== m && K(H, m.startTime - b);
	      w = !1;
	    }
	    return w;
	  } finally {
	    v = null, y = c, z = !1;
	  }
	}
	var N = !1,
	  O = null,
	  L = -1,
	  P = 5,
	  Q = -1;
	function M() {
	  return exports.unstable_now() - Q < P ? !1 : !0;
	}
	function R() {
	  if (null !== O) {
	    var a = exports.unstable_now();
	    Q = a;
	    var b = !0;
	    try {
	      b = O(!0, a);
	    } finally {
	      b ? S() : (N = !1, O = null);
	    }
	  } else N = !1;
	}
	var S;
	if ("function" === typeof F) S = function () {
	  F(R);
	};else if ("undefined" !== typeof MessageChannel) {
	  var T = new MessageChannel(),
	    U = T.port2;
	  T.port1.onmessage = R;
	  S = function () {
	    U.postMessage(null);
	  };
	} else S = function () {
	  D(R, 0);
	};
	function I(a) {
	  O = a;
	  N || (N = !0, S());
	}
	function K(a, b) {
	  L = D(function () {
	    a(exports.unstable_now());
	  }, b);
	}
	exports.unstable_IdlePriority = 5;
	exports.unstable_ImmediatePriority = 1;
	exports.unstable_LowPriority = 4;
	exports.unstable_NormalPriority = 3;
	exports.unstable_Profiling = null;
	exports.unstable_UserBlockingPriority = 2;
	exports.unstable_cancelCallback = function (a) {
	  a.callback = null;
	};
	exports.unstable_continueExecution = function () {
	  A || z || (A = !0, I(J));
	};
	exports.unstable_forceFrameRate = function (a) {
	  0 > a || 125 < a ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : P = 0 < a ? Math.floor(1E3 / a) : 5;
	};
	exports.unstable_getCurrentPriorityLevel = function () {
	  return y;
	};
	exports.unstable_getFirstCallbackNode = function () {
	  return h(r);
	};
	exports.unstable_next = function (a) {
	  switch (y) {
	    case 1:
	    case 2:
	    case 3:
	      var b = 3;
	      break;
	    default:
	      b = y;
	  }
	  var c = y;
	  y = b;
	  try {
	    return a();
	  } finally {
	    y = c;
	  }
	};
	exports.unstable_pauseExecution = function () {};
	exports.unstable_requestPaint = function () {};
	exports.unstable_runWithPriority = function (a, b) {
	  switch (a) {
	    case 1:
	    case 2:
	    case 3:
	    case 4:
	    case 5:
	      break;
	    default:
	      a = 3;
	  }
	  var c = y;
	  y = a;
	  try {
	    return b();
	  } finally {
	    y = c;
	  }
	};
	exports.unstable_scheduleCallback = function (a, b, c) {
	  var d = exports.unstable_now();
	  "object" === typeof c && null !== c ? (c = c.delay, c = "number" === typeof c && 0 < c ? d + c : d) : c = d;
	  switch (a) {
	    case 1:
	      var e = -1;
	      break;
	    case 2:
	      e = 250;
	      break;
	    case 5:
	      e = 1073741823;
	      break;
	    case 4:
	      e = 1E4;
	      break;
	    default:
	      e = 5E3;
	  }
	  e = c + e;
	  a = {
	    id: u++,
	    callback: b,
	    priorityLevel: a,
	    startTime: c,
	    expirationTime: e,
	    sortIndex: -1
	  };
	  c > d ? (a.sortIndex = c, f(t, a), null === h(r) && a === h(t) && (B ? (E(L), L = -1) : B = !0, K(H, c - d))) : (a.sortIndex = e, f(r, a), A || z || (A = !0, I(J)));
	  return a;
	};
	exports.unstable_shouldYield = M;
	exports.unstable_wrapCallback = function (a) {
	  var b = y;
	  return function () {
	    var c = y;
	    y = b;
	    try {
	      return a.apply(this, arguments);
	    } finally {
	      y = c;
	    }
	  };
	};
} (scheduler_production_min));(function (module) {

	{
	  module.exports = scheduler_production_min;
	}
} (scheduler));/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var aa = reactExports,
  ca = schedulerExports;
function p$2(a) {
  for (var b = "https://reactjs.org/docs/error-decoder.html?invariant=" + a, c = 1; c < arguments.length; c++) b += "&args[]=" + encodeURIComponent(arguments[c]);
  return "Minified React error #" + a + "; visit " + b + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var da = new Set(),
  ea = {};
function fa(a, b) {
  ha(a, b);
  ha(a + "Capture", b);
}
function ha(a, b) {
  ea[a] = b;
  for (a = 0; a < b.length; a++) da.add(b[a]);
}
var ia = !("undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement),
  ja = Object.prototype.hasOwnProperty,
  ka = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
  la = {},
  ma = {};
function oa(a) {
  if (ja.call(ma, a)) return !0;
  if (ja.call(la, a)) return !1;
  if (ka.test(a)) return ma[a] = !0;
  la[a] = !0;
  return !1;
}
function pa(a, b, c, d) {
  if (null !== c && 0 === c.type) return !1;
  switch (typeof b) {
    case "function":
    case "symbol":
      return !0;
    case "boolean":
      if (d) return !1;
      if (null !== c) return !c.acceptsBooleans;
      a = a.toLowerCase().slice(0, 5);
      return "data-" !== a && "aria-" !== a;
    default:
      return !1;
  }
}
function qa(a, b, c, d) {
  if (null === b || "undefined" === typeof b || pa(a, b, c, d)) return !0;
  if (d) return !1;
  if (null !== c) switch (c.type) {
    case 3:
      return !b;
    case 4:
      return !1 === b;
    case 5:
      return isNaN(b);
    case 6:
      return isNaN(b) || 1 > b;
  }
  return !1;
}
function v$3(a, b, c, d, e, f, g) {
  this.acceptsBooleans = 2 === b || 3 === b || 4 === b;
  this.attributeName = d;
  this.attributeNamespace = e;
  this.mustUseProperty = c;
  this.propertyName = a;
  this.type = b;
  this.sanitizeURL = f;
  this.removeEmptyString = g;
}
var z$3 = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function (a) {
  z$3[a] = new v$3(a, 0, !1, a, null, !1, !1);
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function (a) {
  var b = a[0];
  z$3[b] = new v$3(b, 1, !1, a[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function (a) {
  z$3[a] = new v$3(a, 2, !1, a.toLowerCase(), null, !1, !1);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function (a) {
  z$3[a] = new v$3(a, 2, !1, a, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function (a) {
  z$3[a] = new v$3(a, 3, !1, a.toLowerCase(), null, !1, !1);
});
["checked", "multiple", "muted", "selected"].forEach(function (a) {
  z$3[a] = new v$3(a, 3, !0, a, null, !1, !1);
});
["capture", "download"].forEach(function (a) {
  z$3[a] = new v$3(a, 4, !1, a, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function (a) {
  z$3[a] = new v$3(a, 6, !1, a, null, !1, !1);
});
["rowSpan", "start"].forEach(function (a) {
  z$3[a] = new v$3(a, 5, !1, a.toLowerCase(), null, !1, !1);
});
var ra = /[\-:]([a-z])/g;
function sa(a) {
  return a[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function (a) {
  var b = a.replace(ra, sa);
  z$3[b] = new v$3(b, 1, !1, a, null, !1, !1);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function (a) {
  var b = a.replace(ra, sa);
  z$3[b] = new v$3(b, 1, !1, a, "http://www.w3.org/1999/xlink", !1, !1);
});
["xml:base", "xml:lang", "xml:space"].forEach(function (a) {
  var b = a.replace(ra, sa);
  z$3[b] = new v$3(b, 1, !1, a, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function (a) {
  z$3[a] = new v$3(a, 1, !1, a.toLowerCase(), null, !1, !1);
});
z$3.xlinkHref = new v$3("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
["src", "href", "action", "formAction"].forEach(function (a) {
  z$3[a] = new v$3(a, 1, !1, a.toLowerCase(), null, !0, !0);
});
function ta(a, b, c, d) {
  var e = z$3.hasOwnProperty(b) ? z$3[b] : null;
  if (null !== e ? 0 !== e.type : d || !(2 < b.length) || "o" !== b[0] && "O" !== b[0] || "n" !== b[1] && "N" !== b[1]) qa(b, c, e, d) && (c = null), d || null === e ? oa(b) && (null === c ? a.removeAttribute(b) : a.setAttribute(b, "" + c)) : e.mustUseProperty ? a[e.propertyName] = null === c ? 3 === e.type ? !1 : "" : c : (b = e.attributeName, d = e.attributeNamespace, null === c ? a.removeAttribute(b) : (e = e.type, c = 3 === e || 4 === e && !0 === c ? "" : "" + c, d ? a.setAttributeNS(d, b, c) : a.setAttribute(b, c)));
}
var ua = aa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
  va = Symbol.for("react.element"),
  wa = Symbol.for("react.portal"),
  ya = Symbol.for("react.fragment"),
  za = Symbol.for("react.strict_mode"),
  Aa = Symbol.for("react.profiler"),
  Ba = Symbol.for("react.provider"),
  Ca = Symbol.for("react.context"),
  Da = Symbol.for("react.forward_ref"),
  Ea = Symbol.for("react.suspense"),
  Fa = Symbol.for("react.suspense_list"),
  Ga = Symbol.for("react.memo"),
  Ha = Symbol.for("react.lazy");
var Ia = Symbol.for("react.offscreen");
var Ja = Symbol.iterator;
function Ka(a) {
  if (null === a || "object" !== typeof a) return null;
  a = Ja && a[Ja] || a["@@iterator"];
  return "function" === typeof a ? a : null;
}
var A$2 = Object.assign,
  La;
function Ma(a) {
  if (void 0 === La) try {
    throw Error();
  } catch (c) {
    var b = c.stack.trim().match(/\n( *(at )?)/);
    La = b && b[1] || "";
  }
  return "\n" + La + a;
}
var Na = !1;
function Oa(a, b) {
  if (!a || Na) return "";
  Na = !0;
  var c = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    if (b) {
      if (b = function () {
        throw Error();
      }, Object.defineProperty(b.prototype, "props", {
        set: function () {
          throw Error();
        }
      }), "object" === typeof Reflect && Reflect.construct) {
        try {
          Reflect.construct(b, []);
        } catch (l) {
          var d = l;
        }
        Reflect.construct(a, [], b);
      } else {
        try {
          b.call();
        } catch (l) {
          d = l;
        }
        a.call(b.prototype);
      }
    } else {
      try {
        throw Error();
      } catch (l) {
        d = l;
      }
      a();
    }
  } catch (l) {
    if (l && d && "string" === typeof l.stack) {
      for (var e = l.stack.split("\n"), f = d.stack.split("\n"), g = e.length - 1, h = f.length - 1; 1 <= g && 0 <= h && e[g] !== f[h];) h--;
      for (; 1 <= g && 0 <= h; g--, h--) if (e[g] !== f[h]) {
        if (1 !== g || 1 !== h) {
          do if (g--, h--, 0 > h || e[g] !== f[h]) {
            var k = "\n" + e[g].replace(" at new ", " at ");
            a.displayName && k.includes("<anonymous>") && (k = k.replace("<anonymous>", a.displayName));
            return k;
          } while (1 <= g && 0 <= h);
        }
        break;
      }
    }
  } finally {
    Na = !1, Error.prepareStackTrace = c;
  }
  return (a = a ? a.displayName || a.name : "") ? Ma(a) : "";
}
function Pa(a) {
  switch (a.tag) {
    case 5:
      return Ma(a.type);
    case 16:
      return Ma("Lazy");
    case 13:
      return Ma("Suspense");
    case 19:
      return Ma("SuspenseList");
    case 0:
    case 2:
    case 15:
      return a = Oa(a.type, !1), a;
    case 11:
      return a = Oa(a.type.render, !1), a;
    case 1:
      return a = Oa(a.type, !0), a;
    default:
      return "";
  }
}
function Qa(a) {
  if (null == a) return null;
  if ("function" === typeof a) return a.displayName || a.name || null;
  if ("string" === typeof a) return a;
  switch (a) {
    case ya:
      return "Fragment";
    case wa:
      return "Portal";
    case Aa:
      return "Profiler";
    case za:
      return "StrictMode";
    case Ea:
      return "Suspense";
    case Fa:
      return "SuspenseList";
  }
  if ("object" === typeof a) switch (a.$$typeof) {
    case Ca:
      return (a.displayName || "Context") + ".Consumer";
    case Ba:
      return (a._context.displayName || "Context") + ".Provider";
    case Da:
      var b = a.render;
      a = a.displayName;
      a || (a = b.displayName || b.name || "", a = "" !== a ? "ForwardRef(" + a + ")" : "ForwardRef");
      return a;
    case Ga:
      return b = a.displayName || null, null !== b ? b : Qa(a.type) || "Memo";
    case Ha:
      b = a._payload;
      a = a._init;
      try {
        return Qa(a(b));
      } catch (c) {}
  }
  return null;
}
function Ra(a) {
  var b = a.type;
  switch (a.tag) {
    case 24:
      return "Cache";
    case 9:
      return (b.displayName || "Context") + ".Consumer";
    case 10:
      return (b._context.displayName || "Context") + ".Provider";
    case 18:
      return "DehydratedFragment";
    case 11:
      return a = b.render, a = a.displayName || a.name || "", b.displayName || ("" !== a ? "ForwardRef(" + a + ")" : "ForwardRef");
    case 7:
      return "Fragment";
    case 5:
      return b;
    case 4:
      return "Portal";
    case 3:
      return "Root";
    case 6:
      return "Text";
    case 16:
      return Qa(b);
    case 8:
      return b === za ? "StrictMode" : "Mode";
    case 22:
      return "Offscreen";
    case 12:
      return "Profiler";
    case 21:
      return "Scope";
    case 13:
      return "Suspense";
    case 19:
      return "SuspenseList";
    case 25:
      return "TracingMarker";
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
      if ("function" === typeof b) return b.displayName || b.name || null;
      if ("string" === typeof b) return b;
  }
  return null;
}
function Sa(a) {
  switch (typeof a) {
    case "boolean":
    case "number":
    case "string":
    case "undefined":
      return a;
    case "object":
      return a;
    default:
      return "";
  }
}
function Ta(a) {
  var b = a.type;
  return (a = a.nodeName) && "input" === a.toLowerCase() && ("checkbox" === b || "radio" === b);
}
function Ua(a) {
  var b = Ta(a) ? "checked" : "value",
    c = Object.getOwnPropertyDescriptor(a.constructor.prototype, b),
    d = "" + a[b];
  if (!a.hasOwnProperty(b) && "undefined" !== typeof c && "function" === typeof c.get && "function" === typeof c.set) {
    var e = c.get,
      f = c.set;
    Object.defineProperty(a, b, {
      configurable: !0,
      get: function () {
        return e.call(this);
      },
      set: function (a) {
        d = "" + a;
        f.call(this, a);
      }
    });
    Object.defineProperty(a, b, {
      enumerable: c.enumerable
    });
    return {
      getValue: function () {
        return d;
      },
      setValue: function (a) {
        d = "" + a;
      },
      stopTracking: function () {
        a._valueTracker = null;
        delete a[b];
      }
    };
  }
}
function Va(a) {
  a._valueTracker || (a._valueTracker = Ua(a));
}
function Wa(a) {
  if (!a) return !1;
  var b = a._valueTracker;
  if (!b) return !0;
  var c = b.getValue();
  var d = "";
  a && (d = Ta(a) ? a.checked ? "true" : "false" : a.value);
  a = d;
  return a !== c ? (b.setValue(a), !0) : !1;
}
function Xa(a) {
  a = a || ("undefined" !== typeof document ? document : void 0);
  if ("undefined" === typeof a) return null;
  try {
    return a.activeElement || a.body;
  } catch (b) {
    return a.body;
  }
}
function Ya(a, b) {
  var c = b.checked;
  return A$2({}, b, {
    defaultChecked: void 0,
    defaultValue: void 0,
    value: void 0,
    checked: null != c ? c : a._wrapperState.initialChecked
  });
}
function Za(a, b) {
  var c = null == b.defaultValue ? "" : b.defaultValue,
    d = null != b.checked ? b.checked : b.defaultChecked;
  c = Sa(null != b.value ? b.value : c);
  a._wrapperState = {
    initialChecked: d,
    initialValue: c,
    controlled: "checkbox" === b.type || "radio" === b.type ? null != b.checked : null != b.value
  };
}
function ab(a, b) {
  b = b.checked;
  null != b && ta(a, "checked", b, !1);
}
function bb(a, b) {
  ab(a, b);
  var c = Sa(b.value),
    d = b.type;
  if (null != c) {
    if ("number" === d) {
      if (0 === c && "" === a.value || a.value != c) a.value = "" + c;
    } else a.value !== "" + c && (a.value = "" + c);
  } else if ("submit" === d || "reset" === d) {
    a.removeAttribute("value");
    return;
  }
  b.hasOwnProperty("value") ? cb(a, b.type, c) : b.hasOwnProperty("defaultValue") && cb(a, b.type, Sa(b.defaultValue));
  null == b.checked && null != b.defaultChecked && (a.defaultChecked = !!b.defaultChecked);
}
function db(a, b, c) {
  if (b.hasOwnProperty("value") || b.hasOwnProperty("defaultValue")) {
    var d = b.type;
    if (!("submit" !== d && "reset" !== d || void 0 !== b.value && null !== b.value)) return;
    b = "" + a._wrapperState.initialValue;
    c || b === a.value || (a.value = b);
    a.defaultValue = b;
  }
  c = a.name;
  "" !== c && (a.name = "");
  a.defaultChecked = !!a._wrapperState.initialChecked;
  "" !== c && (a.name = c);
}
function cb(a, b, c) {
  if ("number" !== b || Xa(a.ownerDocument) !== a) null == c ? a.defaultValue = "" + a._wrapperState.initialValue : a.defaultValue !== "" + c && (a.defaultValue = "" + c);
}
var eb = Array.isArray;
function fb(a, b, c, d) {
  a = a.options;
  if (b) {
    b = {};
    for (var e = 0; e < c.length; e++) b["$" + c[e]] = !0;
    for (c = 0; c < a.length; c++) e = b.hasOwnProperty("$" + a[c].value), a[c].selected !== e && (a[c].selected = e), e && d && (a[c].defaultSelected = !0);
  } else {
    c = "" + Sa(c);
    b = null;
    for (e = 0; e < a.length; e++) {
      if (a[e].value === c) {
        a[e].selected = !0;
        d && (a[e].defaultSelected = !0);
        return;
      }
      null !== b || a[e].disabled || (b = a[e]);
    }
    null !== b && (b.selected = !0);
  }
}
function gb(a, b) {
  if (null != b.dangerouslySetInnerHTML) throw Error(p$2(91));
  return A$2({}, b, {
    value: void 0,
    defaultValue: void 0,
    children: "" + a._wrapperState.initialValue
  });
}
function hb(a, b) {
  var c = b.value;
  if (null == c) {
    c = b.children;
    b = b.defaultValue;
    if (null != c) {
      if (null != b) throw Error(p$2(92));
      if (eb(c)) {
        if (1 < c.length) throw Error(p$2(93));
        c = c[0];
      }
      b = c;
    }
    null == b && (b = "");
    c = b;
  }
  a._wrapperState = {
    initialValue: Sa(c)
  };
}
function ib(a, b) {
  var c = Sa(b.value),
    d = Sa(b.defaultValue);
  null != c && (c = "" + c, c !== a.value && (a.value = c), null == b.defaultValue && a.defaultValue !== c && (a.defaultValue = c));
  null != d && (a.defaultValue = "" + d);
}
function jb(a) {
  var b = a.textContent;
  b === a._wrapperState.initialValue && "" !== b && null !== b && (a.value = b);
}
function kb(a) {
  switch (a) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function lb(a, b) {
  return null == a || "http://www.w3.org/1999/xhtml" === a ? kb(b) : "http://www.w3.org/2000/svg" === a && "foreignObject" === b ? "http://www.w3.org/1999/xhtml" : a;
}
var mb,
  nb = function (a) {
    return "undefined" !== typeof MSApp && MSApp.execUnsafeLocalFunction ? function (b, c, d, e) {
      MSApp.execUnsafeLocalFunction(function () {
        return a(b, c, d, e);
      });
    } : a;
  }(function (a, b) {
    if ("http://www.w3.org/2000/svg" !== a.namespaceURI || "innerHTML" in a) a.innerHTML = b;else {
      mb = mb || document.createElement("div");
      mb.innerHTML = "<svg>" + b.valueOf().toString() + "</svg>";
      for (b = mb.firstChild; a.firstChild;) a.removeChild(a.firstChild);
      for (; b.firstChild;) a.appendChild(b.firstChild);
    }
  });
function ob(a, b) {
  if (b) {
    var c = a.firstChild;
    if (c && c === a.lastChild && 3 === c.nodeType) {
      c.nodeValue = b;
      return;
    }
  }
  a.textContent = b;
}
var pb = {
    animationIterationCount: !0,
    aspectRatio: !0,
    borderImageOutset: !0,
    borderImageSlice: !0,
    borderImageWidth: !0,
    boxFlex: !0,
    boxFlexGroup: !0,
    boxOrdinalGroup: !0,
    columnCount: !0,
    columns: !0,
    flex: !0,
    flexGrow: !0,
    flexPositive: !0,
    flexShrink: !0,
    flexNegative: !0,
    flexOrder: !0,
    gridArea: !0,
    gridRow: !0,
    gridRowEnd: !0,
    gridRowSpan: !0,
    gridRowStart: !0,
    gridColumn: !0,
    gridColumnEnd: !0,
    gridColumnSpan: !0,
    gridColumnStart: !0,
    fontWeight: !0,
    lineClamp: !0,
    lineHeight: !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    tabSize: !0,
    widows: !0,
    zIndex: !0,
    zoom: !0,
    fillOpacity: !0,
    floodOpacity: !0,
    stopOpacity: !0,
    strokeDasharray: !0,
    strokeDashoffset: !0,
    strokeMiterlimit: !0,
    strokeOpacity: !0,
    strokeWidth: !0
  },
  qb = ["Webkit", "ms", "Moz", "O"];
Object.keys(pb).forEach(function (a) {
  qb.forEach(function (b) {
    b = b + a.charAt(0).toUpperCase() + a.substring(1);
    pb[b] = pb[a];
  });
});
function rb(a, b, c) {
  return null == b || "boolean" === typeof b || "" === b ? "" : c || "number" !== typeof b || 0 === b || pb.hasOwnProperty(a) && pb[a] ? ("" + b).trim() : b + "px";
}
function sb(a, b) {
  a = a.style;
  for (var c in b) if (b.hasOwnProperty(c)) {
    var d = 0 === c.indexOf("--"),
      e = rb(c, b[c], d);
    "float" === c && (c = "cssFloat");
    d ? a.setProperty(c, e) : a[c] = e;
  }
}
var tb = A$2({
  menuitem: !0
}, {
  area: !0,
  base: !0,
  br: !0,
  col: !0,
  embed: !0,
  hr: !0,
  img: !0,
  input: !0,
  keygen: !0,
  link: !0,
  meta: !0,
  param: !0,
  source: !0,
  track: !0,
  wbr: !0
});
function ub(a, b) {
  if (b) {
    if (tb[a] && (null != b.children || null != b.dangerouslySetInnerHTML)) throw Error(p$2(137, a));
    if (null != b.dangerouslySetInnerHTML) {
      if (null != b.children) throw Error(p$2(60));
      if ("object" !== typeof b.dangerouslySetInnerHTML || !("__html" in b.dangerouslySetInnerHTML)) throw Error(p$2(61));
    }
    if (null != b.style && "object" !== typeof b.style) throw Error(p$2(62));
  }
}
function vb(a, b) {
  if (-1 === a.indexOf("-")) return "string" === typeof b.is;
  switch (a) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return !1;
    default:
      return !0;
  }
}
var wb = null;
function xb(a) {
  a = a.target || a.srcElement || window;
  a.correspondingUseElement && (a = a.correspondingUseElement);
  return 3 === a.nodeType ? a.parentNode : a;
}
var yb = null,
  zb = null,
  Ab = null;
function Bb(a) {
  if (a = Cb(a)) {
    if ("function" !== typeof yb) throw Error(p$2(280));
    var b = a.stateNode;
    b && (b = Db(b), yb(a.stateNode, a.type, b));
  }
}
function Eb(a) {
  zb ? Ab ? Ab.push(a) : Ab = [a] : zb = a;
}
function Fb() {
  if (zb) {
    var a = zb,
      b = Ab;
    Ab = zb = null;
    Bb(a);
    if (b) for (a = 0; a < b.length; a++) Bb(b[a]);
  }
}
function Gb(a, b) {
  return a(b);
}
function Hb() {}
var Ib = !1;
function Jb(a, b, c) {
  if (Ib) return a(b, c);
  Ib = !0;
  try {
    return Gb(a, b, c);
  } finally {
    if (Ib = !1, null !== zb || null !== Ab) Hb(), Fb();
  }
}
function Kb(a, b) {
  var c = a.stateNode;
  if (null === c) return null;
  var d = Db(c);
  if (null === d) return null;
  c = d[b];
  a: switch (b) {
    case "onClick":
    case "onClickCapture":
    case "onDoubleClick":
    case "onDoubleClickCapture":
    case "onMouseDown":
    case "onMouseDownCapture":
    case "onMouseMove":
    case "onMouseMoveCapture":
    case "onMouseUp":
    case "onMouseUpCapture":
    case "onMouseEnter":
      (d = !d.disabled) || (a = a.type, d = !("button" === a || "input" === a || "select" === a || "textarea" === a));
      a = !d;
      break a;
    default:
      a = !1;
  }
  if (a) return null;
  if (c && "function" !== typeof c) throw Error(p$2(231, b, typeof c));
  return c;
}
var Lb = !1;
if (ia) try {
  var Mb = {};
  Object.defineProperty(Mb, "passive", {
    get: function () {
      Lb = !0;
    }
  });
  window.addEventListener("test", Mb, Mb);
  window.removeEventListener("test", Mb, Mb);
} catch (a) {
  Lb = !1;
}
function Nb(a, b, c, d, e, f, g, h, k) {
  var l = Array.prototype.slice.call(arguments, 3);
  try {
    b.apply(c, l);
  } catch (m) {
    this.onError(m);
  }
}
var Ob = !1,
  Pb = null,
  Qb = !1,
  Rb = null,
  Sb = {
    onError: function (a) {
      Ob = !0;
      Pb = a;
    }
  };
function Tb(a, b, c, d, e, f, g, h, k) {
  Ob = !1;
  Pb = null;
  Nb.apply(Sb, arguments);
}
function Ub(a, b, c, d, e, f, g, h, k) {
  Tb.apply(this, arguments);
  if (Ob) {
    if (Ob) {
      var l = Pb;
      Ob = !1;
      Pb = null;
    } else throw Error(p$2(198));
    Qb || (Qb = !0, Rb = l);
  }
}
function Vb(a) {
  var b = a,
    c = a;
  if (a.alternate) for (; b.return;) b = b.return;else {
    a = b;
    do b = a, 0 !== (b.flags & 4098) && (c = b.return), a = b.return; while (a);
  }
  return 3 === b.tag ? c : null;
}
function Wb(a) {
  if (13 === a.tag) {
    var b = a.memoizedState;
    null === b && (a = a.alternate, null !== a && (b = a.memoizedState));
    if (null !== b) return b.dehydrated;
  }
  return null;
}
function Xb(a) {
  if (Vb(a) !== a) throw Error(p$2(188));
}
function Yb(a) {
  var b = a.alternate;
  if (!b) {
    b = Vb(a);
    if (null === b) throw Error(p$2(188));
    return b !== a ? null : a;
  }
  for (var c = a, d = b;;) {
    var e = c.return;
    if (null === e) break;
    var f = e.alternate;
    if (null === f) {
      d = e.return;
      if (null !== d) {
        c = d;
        continue;
      }
      break;
    }
    if (e.child === f.child) {
      for (f = e.child; f;) {
        if (f === c) return Xb(e), a;
        if (f === d) return Xb(e), b;
        f = f.sibling;
      }
      throw Error(p$2(188));
    }
    if (c.return !== d.return) c = e, d = f;else {
      for (var g = !1, h = e.child; h;) {
        if (h === c) {
          g = !0;
          c = e;
          d = f;
          break;
        }
        if (h === d) {
          g = !0;
          d = e;
          c = f;
          break;
        }
        h = h.sibling;
      }
      if (!g) {
        for (h = f.child; h;) {
          if (h === c) {
            g = !0;
            c = f;
            d = e;
            break;
          }
          if (h === d) {
            g = !0;
            d = f;
            c = e;
            break;
          }
          h = h.sibling;
        }
        if (!g) throw Error(p$2(189));
      }
    }
    if (c.alternate !== d) throw Error(p$2(190));
  }
  if (3 !== c.tag) throw Error(p$2(188));
  return c.stateNode.current === c ? a : b;
}
function Zb(a) {
  a = Yb(a);
  return null !== a ? $b(a) : null;
}
function $b(a) {
  if (5 === a.tag || 6 === a.tag) return a;
  for (a = a.child; null !== a;) {
    var b = $b(a);
    if (null !== b) return b;
    a = a.sibling;
  }
  return null;
}
var ac = ca.unstable_scheduleCallback,
  bc = ca.unstable_cancelCallback,
  cc = ca.unstable_shouldYield,
  dc = ca.unstable_requestPaint,
  B$2 = ca.unstable_now,
  ec = ca.unstable_getCurrentPriorityLevel,
  fc = ca.unstable_ImmediatePriority,
  gc = ca.unstable_UserBlockingPriority,
  hc = ca.unstable_NormalPriority,
  ic = ca.unstable_LowPriority,
  jc = ca.unstable_IdlePriority,
  kc = null,
  lc = null;
function mc(a) {
  if (lc && "function" === typeof lc.onCommitFiberRoot) try {
    lc.onCommitFiberRoot(kc, a, void 0, 128 === (a.current.flags & 128));
  } catch (b) {}
}
var oc = Math.clz32 ? Math.clz32 : nc,
  pc = Math.log,
  qc = Math.LN2;
function nc(a) {
  a >>>= 0;
  return 0 === a ? 32 : 31 - (pc(a) / qc | 0) | 0;
}
var rc = 64,
  sc = 4194304;
function tc(a) {
  switch (a & -a) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return a & 4194240;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return a & 130023424;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 1073741824;
    default:
      return a;
  }
}
function uc(a, b) {
  var c = a.pendingLanes;
  if (0 === c) return 0;
  var d = 0,
    e = a.suspendedLanes,
    f = a.pingedLanes,
    g = c & 268435455;
  if (0 !== g) {
    var h = g & ~e;
    0 !== h ? d = tc(h) : (f &= g, 0 !== f && (d = tc(f)));
  } else g = c & ~e, 0 !== g ? d = tc(g) : 0 !== f && (d = tc(f));
  if (0 === d) return 0;
  if (0 !== b && b !== d && 0 === (b & e) && (e = d & -d, f = b & -b, e >= f || 16 === e && 0 !== (f & 4194240))) return b;
  0 !== (d & 4) && (d |= c & 16);
  b = a.entangledLanes;
  if (0 !== b) for (a = a.entanglements, b &= d; 0 < b;) c = 31 - oc(b), e = 1 << c, d |= a[c], b &= ~e;
  return d;
}
function vc(a, b) {
  switch (a) {
    case 1:
    case 2:
    case 4:
      return b + 250;
    case 8:
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return b + 5E3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return -1;
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function wc(a, b) {
  for (var c = a.suspendedLanes, d = a.pingedLanes, e = a.expirationTimes, f = a.pendingLanes; 0 < f;) {
    var g = 31 - oc(f),
      h = 1 << g,
      k = e[g];
    if (-1 === k) {
      if (0 === (h & c) || 0 !== (h & d)) e[g] = vc(h, b);
    } else k <= b && (a.expiredLanes |= h);
    f &= ~h;
  }
}
function xc(a) {
  a = a.pendingLanes & -1073741825;
  return 0 !== a ? a : a & 1073741824 ? 1073741824 : 0;
}
function yc() {
  var a = rc;
  rc <<= 1;
  0 === (rc & 4194240) && (rc = 64);
  return a;
}
function zc(a) {
  for (var b = [], c = 0; 31 > c; c++) b.push(a);
  return b;
}
function Ac(a, b, c) {
  a.pendingLanes |= b;
  536870912 !== b && (a.suspendedLanes = 0, a.pingedLanes = 0);
  a = a.eventTimes;
  b = 31 - oc(b);
  a[b] = c;
}
function Bc(a, b) {
  var c = a.pendingLanes & ~b;
  a.pendingLanes = b;
  a.suspendedLanes = 0;
  a.pingedLanes = 0;
  a.expiredLanes &= b;
  a.mutableReadLanes &= b;
  a.entangledLanes &= b;
  b = a.entanglements;
  var d = a.eventTimes;
  for (a = a.expirationTimes; 0 < c;) {
    var e = 31 - oc(c),
      f = 1 << e;
    b[e] = 0;
    d[e] = -1;
    a[e] = -1;
    c &= ~f;
  }
}
function Cc(a, b) {
  var c = a.entangledLanes |= b;
  for (a = a.entanglements; c;) {
    var d = 31 - oc(c),
      e = 1 << d;
    e & b | a[d] & b && (a[d] |= b);
    c &= ~e;
  }
}
var C$2 = 0;
function Dc(a) {
  a &= -a;
  return 1 < a ? 4 < a ? 0 !== (a & 268435455) ? 16 : 536870912 : 4 : 1;
}
var Ec,
  Fc,
  Gc,
  Hc,
  Ic,
  Jc = !1,
  Kc = [],
  Lc = null,
  Mc = null,
  Nc = null,
  Oc = new Map(),
  Pc = new Map(),
  Qc = [],
  Rc = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function Sc(a, b) {
  switch (a) {
    case "focusin":
    case "focusout":
      Lc = null;
      break;
    case "dragenter":
    case "dragleave":
      Mc = null;
      break;
    case "mouseover":
    case "mouseout":
      Nc = null;
      break;
    case "pointerover":
    case "pointerout":
      Oc.delete(b.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      Pc.delete(b.pointerId);
  }
}
function Tc(a, b, c, d, e, f) {
  if (null === a || a.nativeEvent !== f) return a = {
    blockedOn: b,
    domEventName: c,
    eventSystemFlags: d,
    nativeEvent: f,
    targetContainers: [e]
  }, null !== b && (b = Cb(b), null !== b && Fc(b)), a;
  a.eventSystemFlags |= d;
  b = a.targetContainers;
  null !== e && -1 === b.indexOf(e) && b.push(e);
  return a;
}
function Uc(a, b, c, d, e) {
  switch (b) {
    case "focusin":
      return Lc = Tc(Lc, a, b, c, d, e), !0;
    case "dragenter":
      return Mc = Tc(Mc, a, b, c, d, e), !0;
    case "mouseover":
      return Nc = Tc(Nc, a, b, c, d, e), !0;
    case "pointerover":
      var f = e.pointerId;
      Oc.set(f, Tc(Oc.get(f) || null, a, b, c, d, e));
      return !0;
    case "gotpointercapture":
      return f = e.pointerId, Pc.set(f, Tc(Pc.get(f) || null, a, b, c, d, e)), !0;
  }
  return !1;
}
function Vc(a) {
  var b = Wc(a.target);
  if (null !== b) {
    var c = Vb(b);
    if (null !== c) if (b = c.tag, 13 === b) {
      if (b = Wb(c), null !== b) {
        a.blockedOn = b;
        Ic(a.priority, function () {
          Gc(c);
        });
        return;
      }
    } else if (3 === b && c.stateNode.current.memoizedState.isDehydrated) {
      a.blockedOn = 3 === c.tag ? c.stateNode.containerInfo : null;
      return;
    }
  }
  a.blockedOn = null;
}
function Xc(a) {
  if (null !== a.blockedOn) return !1;
  for (var b = a.targetContainers; 0 < b.length;) {
    var c = Yc(a.domEventName, a.eventSystemFlags, b[0], a.nativeEvent);
    if (null === c) {
      c = a.nativeEvent;
      var d = new c.constructor(c.type, c);
      wb = d;
      c.target.dispatchEvent(d);
      wb = null;
    } else return b = Cb(c), null !== b && Fc(b), a.blockedOn = c, !1;
    b.shift();
  }
  return !0;
}
function Zc(a, b, c) {
  Xc(a) && c.delete(b);
}
function $c() {
  Jc = !1;
  null !== Lc && Xc(Lc) && (Lc = null);
  null !== Mc && Xc(Mc) && (Mc = null);
  null !== Nc && Xc(Nc) && (Nc = null);
  Oc.forEach(Zc);
  Pc.forEach(Zc);
}
function ad(a, b) {
  a.blockedOn === b && (a.blockedOn = null, Jc || (Jc = !0, ca.unstable_scheduleCallback(ca.unstable_NormalPriority, $c)));
}
function bd(a) {
  function b(b) {
    return ad(b, a);
  }
  if (0 < Kc.length) {
    ad(Kc[0], a);
    for (var c = 1; c < Kc.length; c++) {
      var d = Kc[c];
      d.blockedOn === a && (d.blockedOn = null);
    }
  }
  null !== Lc && ad(Lc, a);
  null !== Mc && ad(Mc, a);
  null !== Nc && ad(Nc, a);
  Oc.forEach(b);
  Pc.forEach(b);
  for (c = 0; c < Qc.length; c++) d = Qc[c], d.blockedOn === a && (d.blockedOn = null);
  for (; 0 < Qc.length && (c = Qc[0], null === c.blockedOn);) Vc(c), null === c.blockedOn && Qc.shift();
}
var cd = ua.ReactCurrentBatchConfig,
  dd = !0;
function ed(a, b, c, d) {
  var e = C$2,
    f = cd.transition;
  cd.transition = null;
  try {
    C$2 = 1, fd(a, b, c, d);
  } finally {
    C$2 = e, cd.transition = f;
  }
}
function gd(a, b, c, d) {
  var e = C$2,
    f = cd.transition;
  cd.transition = null;
  try {
    C$2 = 4, fd(a, b, c, d);
  } finally {
    C$2 = e, cd.transition = f;
  }
}
function fd(a, b, c, d) {
  if (dd) {
    var e = Yc(a, b, c, d);
    if (null === e) hd(a, b, d, id, c), Sc(a, d);else if (Uc(e, a, b, c, d)) d.stopPropagation();else if (Sc(a, d), b & 4 && -1 < Rc.indexOf(a)) {
      for (; null !== e;) {
        var f = Cb(e);
        null !== f && Ec(f);
        f = Yc(a, b, c, d);
        null === f && hd(a, b, d, id, c);
        if (f === e) break;
        e = f;
      }
      null !== e && d.stopPropagation();
    } else hd(a, b, d, null, c);
  }
}
var id = null;
function Yc(a, b, c, d) {
  id = null;
  a = xb(d);
  a = Wc(a);
  if (null !== a) if (b = Vb(a), null === b) a = null;else if (c = b.tag, 13 === c) {
    a = Wb(b);
    if (null !== a) return a;
    a = null;
  } else if (3 === c) {
    if (b.stateNode.current.memoizedState.isDehydrated) return 3 === b.tag ? b.stateNode.containerInfo : null;
    a = null;
  } else b !== a && (a = null);
  id = a;
  return null;
}
function jd(a) {
  switch (a) {
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "auxclick":
    case "dblclick":
    case "dragend":
    case "dragstart":
    case "drop":
    case "focusin":
    case "focusout":
    case "input":
    case "invalid":
    case "keydown":
    case "keypress":
    case "keyup":
    case "mousedown":
    case "mouseup":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "ratechange":
    case "reset":
    case "resize":
    case "seeked":
    case "submit":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "volumechange":
    case "change":
    case "selectionchange":
    case "textInput":
    case "compositionstart":
    case "compositionend":
    case "compositionupdate":
    case "beforeblur":
    case "afterblur":
    case "beforeinput":
    case "blur":
    case "fullscreenchange":
    case "focus":
    case "hashchange":
    case "popstate":
    case "select":
    case "selectstart":
      return 1;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "mousemove":
    case "mouseout":
    case "mouseover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "scroll":
    case "toggle":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
      return 4;
    case "message":
      switch (ec()) {
        case fc:
          return 1;
        case gc:
          return 4;
        case hc:
        case ic:
          return 16;
        case jc:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var kd = null,
  ld = null,
  md = null;
function nd() {
  if (md) return md;
  var a,
    b = ld,
    c = b.length,
    d,
    e = "value" in kd ? kd.value : kd.textContent,
    f = e.length;
  for (a = 0; a < c && b[a] === e[a]; a++);
  var g = c - a;
  for (d = 1; d <= g && b[c - d] === e[f - d]; d++);
  return md = e.slice(a, 1 < d ? 1 - d : void 0);
}
function od(a) {
  var b = a.keyCode;
  "charCode" in a ? (a = a.charCode, 0 === a && 13 === b && (a = 13)) : a = b;
  10 === a && (a = 13);
  return 32 <= a || 13 === a ? a : 0;
}
function pd() {
  return !0;
}
function qd() {
  return !1;
}
function rd(a) {
  function b(b, d, e, f, g) {
    this._reactName = b;
    this._targetInst = e;
    this.type = d;
    this.nativeEvent = f;
    this.target = g;
    this.currentTarget = null;
    for (var c in a) a.hasOwnProperty(c) && (b = a[c], this[c] = b ? b(f) : f[c]);
    this.isDefaultPrevented = (null != f.defaultPrevented ? f.defaultPrevented : !1 === f.returnValue) ? pd : qd;
    this.isPropagationStopped = qd;
    return this;
  }
  A$2(b.prototype, {
    preventDefault: function () {
      this.defaultPrevented = !0;
      var a = this.nativeEvent;
      a && (a.preventDefault ? a.preventDefault() : "unknown" !== typeof a.returnValue && (a.returnValue = !1), this.isDefaultPrevented = pd);
    },
    stopPropagation: function () {
      var a = this.nativeEvent;
      a && (a.stopPropagation ? a.stopPropagation() : "unknown" !== typeof a.cancelBubble && (a.cancelBubble = !0), this.isPropagationStopped = pd);
    },
    persist: function () {},
    isPersistent: pd
  });
  return b;
}
var sd = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function (a) {
      return a.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  },
  td = rd(sd),
  ud = A$2({}, sd, {
    view: 0,
    detail: 0
  }),
  vd = rd(ud),
  wd,
  xd,
  yd,
  Ad = A$2({}, ud, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: zd,
    button: 0,
    buttons: 0,
    relatedTarget: function (a) {
      return void 0 === a.relatedTarget ? a.fromElement === a.srcElement ? a.toElement : a.fromElement : a.relatedTarget;
    },
    movementX: function (a) {
      if ("movementX" in a) return a.movementX;
      a !== yd && (yd && "mousemove" === a.type ? (wd = a.screenX - yd.screenX, xd = a.screenY - yd.screenY) : xd = wd = 0, yd = a);
      return wd;
    },
    movementY: function (a) {
      return "movementY" in a ? a.movementY : xd;
    }
  }),
  Bd = rd(Ad),
  Cd = A$2({}, Ad, {
    dataTransfer: 0
  }),
  Dd = rd(Cd),
  Ed = A$2({}, ud, {
    relatedTarget: 0
  }),
  Fd = rd(Ed),
  Gd = A$2({}, sd, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }),
  Hd = rd(Gd),
  Id = A$2({}, sd, {
    clipboardData: function (a) {
      return "clipboardData" in a ? a.clipboardData : window.clipboardData;
    }
  }),
  Jd = rd(Id),
  Kd = A$2({}, sd, {
    data: 0
  }),
  Ld = rd(Kd),
  Md = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified"
  },
  Nd = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta"
  },
  Od = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
function Pd(a) {
  var b = this.nativeEvent;
  return b.getModifierState ? b.getModifierState(a) : (a = Od[a]) ? !!b[a] : !1;
}
function zd() {
  return Pd;
}
var Qd = A$2({}, ud, {
    key: function (a) {
      if (a.key) {
        var b = Md[a.key] || a.key;
        if ("Unidentified" !== b) return b;
      }
      return "keypress" === a.type ? (a = od(a), 13 === a ? "Enter" : String.fromCharCode(a)) : "keydown" === a.type || "keyup" === a.type ? Nd[a.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: zd,
    charCode: function (a) {
      return "keypress" === a.type ? od(a) : 0;
    },
    keyCode: function (a) {
      return "keydown" === a.type || "keyup" === a.type ? a.keyCode : 0;
    },
    which: function (a) {
      return "keypress" === a.type ? od(a) : "keydown" === a.type || "keyup" === a.type ? a.keyCode : 0;
    }
  }),
  Rd = rd(Qd),
  Sd = A$2({}, Ad, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0
  }),
  Td = rd(Sd),
  Ud = A$2({}, ud, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: zd
  }),
  Vd = rd(Ud),
  Wd = A$2({}, sd, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }),
  Xd = rd(Wd),
  Yd = A$2({}, Ad, {
    deltaX: function (a) {
      return "deltaX" in a ? a.deltaX : "wheelDeltaX" in a ? -a.wheelDeltaX : 0;
    },
    deltaY: function (a) {
      return "deltaY" in a ? a.deltaY : "wheelDeltaY" in a ? -a.wheelDeltaY : "wheelDelta" in a ? -a.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }),
  Zd = rd(Yd),
  $d = [9, 13, 27, 32],
  ae$1 = ia && "CompositionEvent" in window,
  be$1 = null;
ia && "documentMode" in document && (be$1 = document.documentMode);
var ce$1 = ia && "TextEvent" in window && !be$1,
  de$1 = ia && (!ae$1 || be$1 && 8 < be$1 && 11 >= be$1),
  ee$1 = String.fromCharCode(32),
  fe$1 = !1;
function ge$1(a, b) {
  switch (a) {
    case "keyup":
      return -1 !== $d.indexOf(b.keyCode);
    case "keydown":
      return 229 !== b.keyCode;
    case "keypress":
    case "mousedown":
    case "focusout":
      return !0;
    default:
      return !1;
  }
}
function he$1(a) {
  a = a.detail;
  return "object" === typeof a && "data" in a ? a.data : null;
}
var ie$1 = !1;
function je$1(a, b) {
  switch (a) {
    case "compositionend":
      return he$1(b);
    case "keypress":
      if (32 !== b.which) return null;
      fe$1 = !0;
      return ee$1;
    case "textInput":
      return a = b.data, a === ee$1 && fe$1 ? null : a;
    default:
      return null;
  }
}
function ke$1(a, b) {
  if (ie$1) return "compositionend" === a || !ae$1 && ge$1(a, b) ? (a = nd(), md = ld = kd = null, ie$1 = !1, a) : null;
  switch (a) {
    case "paste":
      return null;
    case "keypress":
      if (!(b.ctrlKey || b.altKey || b.metaKey) || b.ctrlKey && b.altKey) {
        if (b.char && 1 < b.char.length) return b.char;
        if (b.which) return String.fromCharCode(b.which);
      }
      return null;
    case "compositionend":
      return de$1 && "ko" !== b.locale ? null : b.data;
    default:
      return null;
  }
}
var le$1 = {
  color: !0,
  date: !0,
  datetime: !0,
  "datetime-local": !0,
  email: !0,
  month: !0,
  number: !0,
  password: !0,
  range: !0,
  search: !0,
  tel: !0,
  text: !0,
  time: !0,
  url: !0,
  week: !0
};
function me(a) {
  var b = a && a.nodeName && a.nodeName.toLowerCase();
  return "input" === b ? !!le$1[a.type] : "textarea" === b ? !0 : !1;
}
function ne$1(a, b, c, d) {
  Eb(d);
  b = oe$1(b, "onChange");
  0 < b.length && (c = new td("onChange", "change", null, c, d), a.push({
    event: c,
    listeners: b
  }));
}
var pe$1 = null,
  qe$1 = null;
function re$1(a) {
  se$1(a, 0);
}
function te$1(a) {
  var b = ue(a);
  if (Wa(b)) return a;
}
function ve$1(a, b) {
  if ("change" === a) return b;
}
var we$1 = !1;
if (ia) {
  var xe$1;
  if (ia) {
    var ye$1 = ("oninput" in document);
    if (!ye$1) {
      var ze$1 = document.createElement("div");
      ze$1.setAttribute("oninput", "return;");
      ye$1 = "function" === typeof ze$1.oninput;
    }
    xe$1 = ye$1;
  } else xe$1 = !1;
  we$1 = xe$1 && (!document.documentMode || 9 < document.documentMode);
}
function Ae$1() {
  pe$1 && (pe$1.detachEvent("onpropertychange", Be$1), qe$1 = pe$1 = null);
}
function Be$1(a) {
  if ("value" === a.propertyName && te$1(qe$1)) {
    var b = [];
    ne$1(b, qe$1, a, xb(a));
    Jb(re$1, b);
  }
}
function Ce(a, b, c) {
  "focusin" === a ? (Ae$1(), pe$1 = b, qe$1 = c, pe$1.attachEvent("onpropertychange", Be$1)) : "focusout" === a && Ae$1();
}
function De$1(a) {
  if ("selectionchange" === a || "keyup" === a || "keydown" === a) return te$1(qe$1);
}
function Ee$1(a, b) {
  if ("click" === a) return te$1(b);
}
function Fe$1(a, b) {
  if ("input" === a || "change" === a) return te$1(b);
}
function Ge(a, b) {
  return a === b && (0 !== a || 1 / a === 1 / b) || a !== a && b !== b;
}
var He = "function" === typeof Object.is ? Object.is : Ge;
function Ie(a, b) {
  if (He(a, b)) return !0;
  if ("object" !== typeof a || null === a || "object" !== typeof b || null === b) return !1;
  var c = Object.keys(a),
    d = Object.keys(b);
  if (c.length !== d.length) return !1;
  for (d = 0; d < c.length; d++) {
    var e = c[d];
    if (!ja.call(b, e) || !He(a[e], b[e])) return !1;
  }
  return !0;
}
function Je(a) {
  for (; a && a.firstChild;) a = a.firstChild;
  return a;
}
function Ke(a, b) {
  var c = Je(a);
  a = 0;
  for (var d; c;) {
    if (3 === c.nodeType) {
      d = a + c.textContent.length;
      if (a <= b && d >= b) return {
        node: c,
        offset: b - a
      };
      a = d;
    }
    a: {
      for (; c;) {
        if (c.nextSibling) {
          c = c.nextSibling;
          break a;
        }
        c = c.parentNode;
      }
      c = void 0;
    }
    c = Je(c);
  }
}
function Le$1(a, b) {
  return a && b ? a === b ? !0 : a && 3 === a.nodeType ? !1 : b && 3 === b.nodeType ? Le$1(a, b.parentNode) : "contains" in a ? a.contains(b) : a.compareDocumentPosition ? !!(a.compareDocumentPosition(b) & 16) : !1 : !1;
}
function Me$1() {
  for (var a = window, b = Xa(); b instanceof a.HTMLIFrameElement;) {
    try {
      var c = "string" === typeof b.contentWindow.location.href;
    } catch (d) {
      c = !1;
    }
    if (c) a = b.contentWindow;else break;
    b = Xa(a.document);
  }
  return b;
}
function Ne$1(a) {
  var b = a && a.nodeName && a.nodeName.toLowerCase();
  return b && ("input" === b && ("text" === a.type || "search" === a.type || "tel" === a.type || "url" === a.type || "password" === a.type) || "textarea" === b || "true" === a.contentEditable);
}
function Oe$1(a) {
  var b = Me$1(),
    c = a.focusedElem,
    d = a.selectionRange;
  if (b !== c && c && c.ownerDocument && Le$1(c.ownerDocument.documentElement, c)) {
    if (null !== d && Ne$1(c)) if (b = d.start, a = d.end, void 0 === a && (a = b), "selectionStart" in c) c.selectionStart = b, c.selectionEnd = Math.min(a, c.value.length);else if (a = (b = c.ownerDocument || document) && b.defaultView || window, a.getSelection) {
      a = a.getSelection();
      var e = c.textContent.length,
        f = Math.min(d.start, e);
      d = void 0 === d.end ? f : Math.min(d.end, e);
      !a.extend && f > d && (e = d, d = f, f = e);
      e = Ke(c, f);
      var g = Ke(c, d);
      e && g && (1 !== a.rangeCount || a.anchorNode !== e.node || a.anchorOffset !== e.offset || a.focusNode !== g.node || a.focusOffset !== g.offset) && (b = b.createRange(), b.setStart(e.node, e.offset), a.removeAllRanges(), f > d ? (a.addRange(b), a.extend(g.node, g.offset)) : (b.setEnd(g.node, g.offset), a.addRange(b)));
    }
    b = [];
    for (a = c; a = a.parentNode;) 1 === a.nodeType && b.push({
      element: a,
      left: a.scrollLeft,
      top: a.scrollTop
    });
    "function" === typeof c.focus && c.focus();
    for (c = 0; c < b.length; c++) a = b[c], a.element.scrollLeft = a.left, a.element.scrollTop = a.top;
  }
}
var Pe = ia && "documentMode" in document && 11 >= document.documentMode,
  Qe = null,
  Re$1 = null,
  Se$1 = null,
  Te$1 = !1;
function Ue(a, b, c) {
  var d = c.window === c ? c.document : 9 === c.nodeType ? c : c.ownerDocument;
  Te$1 || null == Qe || Qe !== Xa(d) || (d = Qe, "selectionStart" in d && Ne$1(d) ? d = {
    start: d.selectionStart,
    end: d.selectionEnd
  } : (d = (d.ownerDocument && d.ownerDocument.defaultView || window).getSelection(), d = {
    anchorNode: d.anchorNode,
    anchorOffset: d.anchorOffset,
    focusNode: d.focusNode,
    focusOffset: d.focusOffset
  }), Se$1 && Ie(Se$1, d) || (Se$1 = d, d = oe$1(Re$1, "onSelect"), 0 < d.length && (b = new td("onSelect", "select", null, b, c), a.push({
    event: b,
    listeners: d
  }), b.target = Qe)));
}
function Ve$1(a, b) {
  var c = {};
  c[a.toLowerCase()] = b.toLowerCase();
  c["Webkit" + a] = "webkit" + b;
  c["Moz" + a] = "moz" + b;
  return c;
}
var We$1 = {
    animationend: Ve$1("Animation", "AnimationEnd"),
    animationiteration: Ve$1("Animation", "AnimationIteration"),
    animationstart: Ve$1("Animation", "AnimationStart"),
    transitionend: Ve$1("Transition", "TransitionEnd")
  },
  Xe = {},
  Ye$1 = {};
ia && (Ye$1 = document.createElement("div").style, "AnimationEvent" in window || (delete We$1.animationend.animation, delete We$1.animationiteration.animation, delete We$1.animationstart.animation), "TransitionEvent" in window || delete We$1.transitionend.transition);
function Ze(a) {
  if (Xe[a]) return Xe[a];
  if (!We$1[a]) return a;
  var b = We$1[a],
    c;
  for (c in b) if (b.hasOwnProperty(c) && c in Ye$1) return Xe[a] = b[c];
  return a;
}
var $e = Ze("animationend"),
  af = Ze("animationiteration"),
  bf = Ze("animationstart"),
  cf = Ze("transitionend"),
  df = new Map(),
  ef = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function ff(a, b) {
  df.set(a, b);
  fa(b, [a]);
}
for (var gf = 0; gf < ef.length; gf++) {
  var hf = ef[gf],
    jf = hf.toLowerCase(),
    kf = hf[0].toUpperCase() + hf.slice(1);
  ff(jf, "on" + kf);
}
ff($e, "onAnimationEnd");
ff(af, "onAnimationIteration");
ff(bf, "onAnimationStart");
ff("dblclick", "onDoubleClick");
ff("focusin", "onFocus");
ff("focusout", "onBlur");
ff(cf, "onTransitionEnd");
ha("onMouseEnter", ["mouseout", "mouseover"]);
ha("onMouseLeave", ["mouseout", "mouseover"]);
ha("onPointerEnter", ["pointerout", "pointerover"]);
ha("onPointerLeave", ["pointerout", "pointerover"]);
fa("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
fa("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
fa("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
fa("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
fa("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
fa("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var lf = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),
  mf = new Set("cancel close invalid load scroll toggle".split(" ").concat(lf));
function nf(a, b, c) {
  var d = a.type || "unknown-event";
  a.currentTarget = c;
  Ub(d, b, void 0, a);
  a.currentTarget = null;
}
function se$1(a, b) {
  b = 0 !== (b & 4);
  for (var c = 0; c < a.length; c++) {
    var d = a[c],
      e = d.event;
    d = d.listeners;
    a: {
      var f = void 0;
      if (b) for (var g = d.length - 1; 0 <= g; g--) {
        var h = d[g],
          k = h.instance,
          l = h.currentTarget;
        h = h.listener;
        if (k !== f && e.isPropagationStopped()) break a;
        nf(e, h, l);
        f = k;
      } else for (g = 0; g < d.length; g++) {
        h = d[g];
        k = h.instance;
        l = h.currentTarget;
        h = h.listener;
        if (k !== f && e.isPropagationStopped()) break a;
        nf(e, h, l);
        f = k;
      }
    }
  }
  if (Qb) throw a = Rb, Qb = !1, Rb = null, a;
}
function D$2(a, b) {
  var c = b[of];
  void 0 === c && (c = b[of] = new Set());
  var d = a + "__bubble";
  c.has(d) || (pf(b, a, 2, !1), c.add(d));
}
function qf(a, b, c) {
  var d = 0;
  b && (d |= 4);
  pf(c, a, d, b);
}
var rf = "_reactListening" + Math.random().toString(36).slice(2);
function sf(a) {
  if (!a[rf]) {
    a[rf] = !0;
    da.forEach(function (b) {
      "selectionchange" !== b && (mf.has(b) || qf(b, !1, a), qf(b, !0, a));
    });
    var b = 9 === a.nodeType ? a : a.ownerDocument;
    null === b || b[rf] || (b[rf] = !0, qf("selectionchange", !1, b));
  }
}
function pf(a, b, c, d) {
  switch (jd(b)) {
    case 1:
      var e = ed;
      break;
    case 4:
      e = gd;
      break;
    default:
      e = fd;
  }
  c = e.bind(null, b, c, a);
  e = void 0;
  !Lb || "touchstart" !== b && "touchmove" !== b && "wheel" !== b || (e = !0);
  d ? void 0 !== e ? a.addEventListener(b, c, {
    capture: !0,
    passive: e
  }) : a.addEventListener(b, c, !0) : void 0 !== e ? a.addEventListener(b, c, {
    passive: e
  }) : a.addEventListener(b, c, !1);
}
function hd(a, b, c, d, e) {
  var f = d;
  if (0 === (b & 1) && 0 === (b & 2) && null !== d) a: for (;;) {
    if (null === d) return;
    var g = d.tag;
    if (3 === g || 4 === g) {
      var h = d.stateNode.containerInfo;
      if (h === e || 8 === h.nodeType && h.parentNode === e) break;
      if (4 === g) for (g = d.return; null !== g;) {
        var k = g.tag;
        if (3 === k || 4 === k) if (k = g.stateNode.containerInfo, k === e || 8 === k.nodeType && k.parentNode === e) return;
        g = g.return;
      }
      for (; null !== h;) {
        g = Wc(h);
        if (null === g) return;
        k = g.tag;
        if (5 === k || 6 === k) {
          d = f = g;
          continue a;
        }
        h = h.parentNode;
      }
    }
    d = d.return;
  }
  Jb(function () {
    var d = f,
      e = xb(c),
      g = [];
    a: {
      var h = df.get(a);
      if (void 0 !== h) {
        var k = td,
          n = a;
        switch (a) {
          case "keypress":
            if (0 === od(c)) break a;
          case "keydown":
          case "keyup":
            k = Rd;
            break;
          case "focusin":
            n = "focus";
            k = Fd;
            break;
          case "focusout":
            n = "blur";
            k = Fd;
            break;
          case "beforeblur":
          case "afterblur":
            k = Fd;
            break;
          case "click":
            if (2 === c.button) break a;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            k = Bd;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            k = Dd;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            k = Vd;
            break;
          case $e:
          case af:
          case bf:
            k = Hd;
            break;
          case cf:
            k = Xd;
            break;
          case "scroll":
            k = vd;
            break;
          case "wheel":
            k = Zd;
            break;
          case "copy":
          case "cut":
          case "paste":
            k = Jd;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            k = Td;
        }
        var t = 0 !== (b & 4),
          J = !t && "scroll" === a,
          x = t ? null !== h ? h + "Capture" : null : h;
        t = [];
        for (var w = d, u; null !== w;) {
          u = w;
          var F = u.stateNode;
          5 === u.tag && null !== F && (u = F, null !== x && (F = Kb(w, x), null != F && t.push(tf(w, F, u))));
          if (J) break;
          w = w.return;
        }
        0 < t.length && (h = new k(h, n, null, c, e), g.push({
          event: h,
          listeners: t
        }));
      }
    }
    if (0 === (b & 7)) {
      a: {
        h = "mouseover" === a || "pointerover" === a;
        k = "mouseout" === a || "pointerout" === a;
        if (h && c !== wb && (n = c.relatedTarget || c.fromElement) && (Wc(n) || n[uf])) break a;
        if (k || h) {
          h = e.window === e ? e : (h = e.ownerDocument) ? h.defaultView || h.parentWindow : window;
          if (k) {
            if (n = c.relatedTarget || c.toElement, k = d, n = n ? Wc(n) : null, null !== n && (J = Vb(n), n !== J || 5 !== n.tag && 6 !== n.tag)) n = null;
          } else k = null, n = d;
          if (k !== n) {
            t = Bd;
            F = "onMouseLeave";
            x = "onMouseEnter";
            w = "mouse";
            if ("pointerout" === a || "pointerover" === a) t = Td, F = "onPointerLeave", x = "onPointerEnter", w = "pointer";
            J = null == k ? h : ue(k);
            u = null == n ? h : ue(n);
            h = new t(F, w + "leave", k, c, e);
            h.target = J;
            h.relatedTarget = u;
            F = null;
            Wc(e) === d && (t = new t(x, w + "enter", n, c, e), t.target = u, t.relatedTarget = J, F = t);
            J = F;
            if (k && n) b: {
              t = k;
              x = n;
              w = 0;
              for (u = t; u; u = vf(u)) w++;
              u = 0;
              for (F = x; F; F = vf(F)) u++;
              for (; 0 < w - u;) t = vf(t), w--;
              for (; 0 < u - w;) x = vf(x), u--;
              for (; w--;) {
                if (t === x || null !== x && t === x.alternate) break b;
                t = vf(t);
                x = vf(x);
              }
              t = null;
            } else t = null;
            null !== k && wf(g, h, k, t, !1);
            null !== n && null !== J && wf(g, J, n, t, !0);
          }
        }
      }
      a: {
        h = d ? ue(d) : window;
        k = h.nodeName && h.nodeName.toLowerCase();
        if ("select" === k || "input" === k && "file" === h.type) var na = ve$1;else if (me(h)) {
          if (we$1) na = Fe$1;else {
            na = De$1;
            var xa = Ce;
          }
        } else (k = h.nodeName) && "input" === k.toLowerCase() && ("checkbox" === h.type || "radio" === h.type) && (na = Ee$1);
        if (na && (na = na(a, d))) {
          ne$1(g, na, c, e);
          break a;
        }
        xa && xa(a, h, d);
        "focusout" === a && (xa = h._wrapperState) && xa.controlled && "number" === h.type && cb(h, "number", h.value);
      }
      xa = d ? ue(d) : window;
      switch (a) {
        case "focusin":
          if (me(xa) || "true" === xa.contentEditable) Qe = xa, Re$1 = d, Se$1 = null;
          break;
        case "focusout":
          Se$1 = Re$1 = Qe = null;
          break;
        case "mousedown":
          Te$1 = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          Te$1 = !1;
          Ue(g, c, e);
          break;
        case "selectionchange":
          if (Pe) break;
        case "keydown":
        case "keyup":
          Ue(g, c, e);
      }
      var $a;
      if (ae$1) b: {
        switch (a) {
          case "compositionstart":
            var ba = "onCompositionStart";
            break b;
          case "compositionend":
            ba = "onCompositionEnd";
            break b;
          case "compositionupdate":
            ba = "onCompositionUpdate";
            break b;
        }
        ba = void 0;
      } else ie$1 ? ge$1(a, c) && (ba = "onCompositionEnd") : "keydown" === a && 229 === c.keyCode && (ba = "onCompositionStart");
      ba && (de$1 && "ko" !== c.locale && (ie$1 || "onCompositionStart" !== ba ? "onCompositionEnd" === ba && ie$1 && ($a = nd()) : (kd = e, ld = "value" in kd ? kd.value : kd.textContent, ie$1 = !0)), xa = oe$1(d, ba), 0 < xa.length && (ba = new Ld(ba, a, null, c, e), g.push({
        event: ba,
        listeners: xa
      }), $a ? ba.data = $a : ($a = he$1(c), null !== $a && (ba.data = $a))));
      if ($a = ce$1 ? je$1(a, c) : ke$1(a, c)) d = oe$1(d, "onBeforeInput"), 0 < d.length && (e = new Ld("onBeforeInput", "beforeinput", null, c, e), g.push({
        event: e,
        listeners: d
      }), e.data = $a);
    }
    se$1(g, b);
  });
}
function tf(a, b, c) {
  return {
    instance: a,
    listener: b,
    currentTarget: c
  };
}
function oe$1(a, b) {
  for (var c = b + "Capture", d = []; null !== a;) {
    var e = a,
      f = e.stateNode;
    5 === e.tag && null !== f && (e = f, f = Kb(a, c), null != f && d.unshift(tf(a, f, e)), f = Kb(a, b), null != f && d.push(tf(a, f, e)));
    a = a.return;
  }
  return d;
}
function vf(a) {
  if (null === a) return null;
  do a = a.return; while (a && 5 !== a.tag);
  return a ? a : null;
}
function wf(a, b, c, d, e) {
  for (var f = b._reactName, g = []; null !== c && c !== d;) {
    var h = c,
      k = h.alternate,
      l = h.stateNode;
    if (null !== k && k === d) break;
    5 === h.tag && null !== l && (h = l, e ? (k = Kb(c, f), null != k && g.unshift(tf(c, k, h))) : e || (k = Kb(c, f), null != k && g.push(tf(c, k, h))));
    c = c.return;
  }
  0 !== g.length && a.push({
    event: b,
    listeners: g
  });
}
var xf = /\r\n?/g,
  yf = /\u0000|\uFFFD/g;
function zf(a) {
  return ("string" === typeof a ? a : "" + a).replace(xf, "\n").replace(yf, "");
}
function Af(a, b, c) {
  b = zf(b);
  if (zf(a) !== b && c) throw Error(p$2(425));
}
function Bf() {}
var Cf = null,
  Df = null;
function Ef(a, b) {
  return "textarea" === a || "noscript" === a || "string" === typeof b.children || "number" === typeof b.children || "object" === typeof b.dangerouslySetInnerHTML && null !== b.dangerouslySetInnerHTML && null != b.dangerouslySetInnerHTML.__html;
}
var Ff = "function" === typeof setTimeout ? setTimeout : void 0,
  Gf = "function" === typeof clearTimeout ? clearTimeout : void 0,
  Hf = "function" === typeof Promise ? Promise : void 0,
  Jf = "function" === typeof queueMicrotask ? queueMicrotask : "undefined" !== typeof Hf ? function (a) {
    return Hf.resolve(null).then(a).catch(If);
  } : Ff;
function If(a) {
  setTimeout(function () {
    throw a;
  });
}
function Kf(a, b) {
  var c = b,
    d = 0;
  do {
    var e = c.nextSibling;
    a.removeChild(c);
    if (e && 8 === e.nodeType) if (c = e.data, "/$" === c) {
      if (0 === d) {
        a.removeChild(e);
        bd(b);
        return;
      }
      d--;
    } else "$" !== c && "$?" !== c && "$!" !== c || d++;
    c = e;
  } while (c);
  bd(b);
}
function Lf(a) {
  for (; null != a; a = a.nextSibling) {
    var b = a.nodeType;
    if (1 === b || 3 === b) break;
    if (8 === b) {
      b = a.data;
      if ("$" === b || "$!" === b || "$?" === b) break;
      if ("/$" === b) return null;
    }
  }
  return a;
}
function Mf(a) {
  a = a.previousSibling;
  for (var b = 0; a;) {
    if (8 === a.nodeType) {
      var c = a.data;
      if ("$" === c || "$!" === c || "$?" === c) {
        if (0 === b) return a;
        b--;
      } else "/$" === c && b++;
    }
    a = a.previousSibling;
  }
  return null;
}
var Nf = Math.random().toString(36).slice(2),
  Of = "__reactFiber$" + Nf,
  Pf = "__reactProps$" + Nf,
  uf = "__reactContainer$" + Nf,
  of = "__reactEvents$" + Nf,
  Qf = "__reactListeners$" + Nf,
  Rf = "__reactHandles$" + Nf;
function Wc(a) {
  var b = a[Of];
  if (b) return b;
  for (var c = a.parentNode; c;) {
    if (b = c[uf] || c[Of]) {
      c = b.alternate;
      if (null !== b.child || null !== c && null !== c.child) for (a = Mf(a); null !== a;) {
        if (c = a[Of]) return c;
        a = Mf(a);
      }
      return b;
    }
    a = c;
    c = a.parentNode;
  }
  return null;
}
function Cb(a) {
  a = a[Of] || a[uf];
  return !a || 5 !== a.tag && 6 !== a.tag && 13 !== a.tag && 3 !== a.tag ? null : a;
}
function ue(a) {
  if (5 === a.tag || 6 === a.tag) return a.stateNode;
  throw Error(p$2(33));
}
function Db(a) {
  return a[Pf] || null;
}
var Sf = [],
  Tf = -1;
function Uf(a) {
  return {
    current: a
  };
}
function E$2(a) {
  0 > Tf || (a.current = Sf[Tf], Sf[Tf] = null, Tf--);
}
function G$2(a, b) {
  Tf++;
  Sf[Tf] = a.current;
  a.current = b;
}
var Vf = {},
  H$2 = Uf(Vf),
  Wf = Uf(!1),
  Xf = Vf;
function Yf(a, b) {
  var c = a.type.contextTypes;
  if (!c) return Vf;
  var d = a.stateNode;
  if (d && d.__reactInternalMemoizedUnmaskedChildContext === b) return d.__reactInternalMemoizedMaskedChildContext;
  var e = {},
    f;
  for (f in c) e[f] = b[f];
  d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = b, a.__reactInternalMemoizedMaskedChildContext = e);
  return e;
}
function Zf(a) {
  a = a.childContextTypes;
  return null !== a && void 0 !== a;
}
function $f() {
  E$2(Wf);
  E$2(H$2);
}
function ag(a, b, c) {
  if (H$2.current !== Vf) throw Error(p$2(168));
  G$2(H$2, b);
  G$2(Wf, c);
}
function bg(a, b, c) {
  var d = a.stateNode;
  b = b.childContextTypes;
  if ("function" !== typeof d.getChildContext) return c;
  d = d.getChildContext();
  for (var e in d) if (!(e in b)) throw Error(p$2(108, Ra(a) || "Unknown", e));
  return A$2({}, c, d);
}
function cg(a) {
  a = (a = a.stateNode) && a.__reactInternalMemoizedMergedChildContext || Vf;
  Xf = H$2.current;
  G$2(H$2, a);
  G$2(Wf, Wf.current);
  return !0;
}
function dg(a, b, c) {
  var d = a.stateNode;
  if (!d) throw Error(p$2(169));
  c ? (a = bg(a, b, Xf), d.__reactInternalMemoizedMergedChildContext = a, E$2(Wf), E$2(H$2), G$2(H$2, a)) : E$2(Wf);
  G$2(Wf, c);
}
var eg = null,
  fg = !1,
  gg = !1;
function hg(a) {
  null === eg ? eg = [a] : eg.push(a);
}
function ig(a) {
  fg = !0;
  hg(a);
}
function jg() {
  if (!gg && null !== eg) {
    gg = !0;
    var a = 0,
      b = C$2;
    try {
      var c = eg;
      for (C$2 = 1; a < c.length; a++) {
        var d = c[a];
        do d = d(!0); while (null !== d);
      }
      eg = null;
      fg = !1;
    } catch (e) {
      throw null !== eg && (eg = eg.slice(a + 1)), ac(fc, jg), e;
    } finally {
      C$2 = b, gg = !1;
    }
  }
  return null;
}
var kg = [],
  lg = 0,
  mg = null,
  ng = 0,
  og = [],
  pg = 0,
  qg = null,
  rg = 1,
  sg = "";
function tg(a, b) {
  kg[lg++] = ng;
  kg[lg++] = mg;
  mg = a;
  ng = b;
}
function ug(a, b, c) {
  og[pg++] = rg;
  og[pg++] = sg;
  og[pg++] = qg;
  qg = a;
  var d = rg;
  a = sg;
  var e = 32 - oc(d) - 1;
  d &= ~(1 << e);
  c += 1;
  var f = 32 - oc(b) + e;
  if (30 < f) {
    var g = e - e % 5;
    f = (d & (1 << g) - 1).toString(32);
    d >>= g;
    e -= g;
    rg = 1 << 32 - oc(b) + e | c << e | d;
    sg = f + a;
  } else rg = 1 << f | c << e | d, sg = a;
}
function vg(a) {
  null !== a.return && (tg(a, 1), ug(a, 1, 0));
}
function wg(a) {
  for (; a === mg;) mg = kg[--lg], kg[lg] = null, ng = kg[--lg], kg[lg] = null;
  for (; a === qg;) qg = og[--pg], og[pg] = null, sg = og[--pg], og[pg] = null, rg = og[--pg], og[pg] = null;
}
var xg = null,
  yg = null,
  I$2 = !1,
  zg = null;
function Ag(a, b) {
  var c = Bg(5, null, null, 0);
  c.elementType = "DELETED";
  c.stateNode = b;
  c.return = a;
  b = a.deletions;
  null === b ? (a.deletions = [c], a.flags |= 16) : b.push(c);
}
function Cg(a, b) {
  switch (a.tag) {
    case 5:
      var c = a.type;
      b = 1 !== b.nodeType || c.toLowerCase() !== b.nodeName.toLowerCase() ? null : b;
      return null !== b ? (a.stateNode = b, xg = a, yg = Lf(b.firstChild), !0) : !1;
    case 6:
      return b = "" === a.pendingProps || 3 !== b.nodeType ? null : b, null !== b ? (a.stateNode = b, xg = a, yg = null, !0) : !1;
    case 13:
      return b = 8 !== b.nodeType ? null : b, null !== b ? (c = null !== qg ? {
        id: rg,
        overflow: sg
      } : null, a.memoizedState = {
        dehydrated: b,
        treeContext: c,
        retryLane: 1073741824
      }, c = Bg(18, null, null, 0), c.stateNode = b, c.return = a, a.child = c, xg = a, yg = null, !0) : !1;
    default:
      return !1;
  }
}
function Dg(a) {
  return 0 !== (a.mode & 1) && 0 === (a.flags & 128);
}
function Eg(a) {
  if (I$2) {
    var b = yg;
    if (b) {
      var c = b;
      if (!Cg(a, b)) {
        if (Dg(a)) throw Error(p$2(418));
        b = Lf(c.nextSibling);
        var d = xg;
        b && Cg(a, b) ? Ag(d, c) : (a.flags = a.flags & -4097 | 2, I$2 = !1, xg = a);
      }
    } else {
      if (Dg(a)) throw Error(p$2(418));
      a.flags = a.flags & -4097 | 2;
      I$2 = !1;
      xg = a;
    }
  }
}
function Fg(a) {
  for (a = a.return; null !== a && 5 !== a.tag && 3 !== a.tag && 13 !== a.tag;) a = a.return;
  xg = a;
}
function Gg(a) {
  if (a !== xg) return !1;
  if (!I$2) return Fg(a), I$2 = !0, !1;
  var b;
  (b = 3 !== a.tag) && !(b = 5 !== a.tag) && (b = a.type, b = "head" !== b && "body" !== b && !Ef(a.type, a.memoizedProps));
  if (b && (b = yg)) {
    if (Dg(a)) throw Hg(), Error(p$2(418));
    for (; b;) Ag(a, b), b = Lf(b.nextSibling);
  }
  Fg(a);
  if (13 === a.tag) {
    a = a.memoizedState;
    a = null !== a ? a.dehydrated : null;
    if (!a) throw Error(p$2(317));
    a: {
      a = a.nextSibling;
      for (b = 0; a;) {
        if (8 === a.nodeType) {
          var c = a.data;
          if ("/$" === c) {
            if (0 === b) {
              yg = Lf(a.nextSibling);
              break a;
            }
            b--;
          } else "$" !== c && "$!" !== c && "$?" !== c || b++;
        }
        a = a.nextSibling;
      }
      yg = null;
    }
  } else yg = xg ? Lf(a.stateNode.nextSibling) : null;
  return !0;
}
function Hg() {
  for (var a = yg; a;) a = Lf(a.nextSibling);
}
function Ig() {
  yg = xg = null;
  I$2 = !1;
}
function Jg(a) {
  null === zg ? zg = [a] : zg.push(a);
}
var Kg = ua.ReactCurrentBatchConfig;
function Lg(a, b) {
  if (a && a.defaultProps) {
    b = A$2({}, b);
    a = a.defaultProps;
    for (var c in a) void 0 === b[c] && (b[c] = a[c]);
    return b;
  }
  return b;
}
var Mg = Uf(null),
  Ng = null,
  Og = null,
  Pg = null;
function Qg() {
  Pg = Og = Ng = null;
}
function Rg(a) {
  var b = Mg.current;
  E$2(Mg);
  a._currentValue = b;
}
function Sg(a, b, c) {
  for (; null !== a;) {
    var d = a.alternate;
    (a.childLanes & b) !== b ? (a.childLanes |= b, null !== d && (d.childLanes |= b)) : null !== d && (d.childLanes & b) !== b && (d.childLanes |= b);
    if (a === c) break;
    a = a.return;
  }
}
function Tg(a, b) {
  Ng = a;
  Pg = Og = null;
  a = a.dependencies;
  null !== a && null !== a.firstContext && (0 !== (a.lanes & b) && (Ug = !0), a.firstContext = null);
}
function Vg(a) {
  var b = a._currentValue;
  if (Pg !== a) if (a = {
    context: a,
    memoizedValue: b,
    next: null
  }, null === Og) {
    if (null === Ng) throw Error(p$2(308));
    Og = a;
    Ng.dependencies = {
      lanes: 0,
      firstContext: a
    };
  } else Og = Og.next = a;
  return b;
}
var Wg = null;
function Xg(a) {
  null === Wg ? Wg = [a] : Wg.push(a);
}
function Yg(a, b, c, d) {
  var e = b.interleaved;
  null === e ? (c.next = c, Xg(b)) : (c.next = e.next, e.next = c);
  b.interleaved = c;
  return Zg(a, d);
}
function Zg(a, b) {
  a.lanes |= b;
  var c = a.alternate;
  null !== c && (c.lanes |= b);
  c = a;
  for (a = a.return; null !== a;) a.childLanes |= b, c = a.alternate, null !== c && (c.childLanes |= b), c = a, a = a.return;
  return 3 === c.tag ? c.stateNode : null;
}
var $g = !1;
function ah(a) {
  a.updateQueue = {
    baseState: a.memoizedState,
    firstBaseUpdate: null,
    lastBaseUpdate: null,
    shared: {
      pending: null,
      interleaved: null,
      lanes: 0
    },
    effects: null
  };
}
function bh(a, b) {
  a = a.updateQueue;
  b.updateQueue === a && (b.updateQueue = {
    baseState: a.baseState,
    firstBaseUpdate: a.firstBaseUpdate,
    lastBaseUpdate: a.lastBaseUpdate,
    shared: a.shared,
    effects: a.effects
  });
}
function ch(a, b) {
  return {
    eventTime: a,
    lane: b,
    tag: 0,
    payload: null,
    callback: null,
    next: null
  };
}
function dh(a, b, c) {
  var d = a.updateQueue;
  if (null === d) return null;
  d = d.shared;
  if (0 !== (K$1 & 2)) {
    var e = d.pending;
    null === e ? b.next = b : (b.next = e.next, e.next = b);
    d.pending = b;
    return Zg(a, c);
  }
  e = d.interleaved;
  null === e ? (b.next = b, Xg(d)) : (b.next = e.next, e.next = b);
  d.interleaved = b;
  return Zg(a, c);
}
function eh(a, b, c) {
  b = b.updateQueue;
  if (null !== b && (b = b.shared, 0 !== (c & 4194240))) {
    var d = b.lanes;
    d &= a.pendingLanes;
    c |= d;
    b.lanes = c;
    Cc(a, c);
  }
}
function fh(a, b) {
  var c = a.updateQueue,
    d = a.alternate;
  if (null !== d && (d = d.updateQueue, c === d)) {
    var e = null,
      f = null;
    c = c.firstBaseUpdate;
    if (null !== c) {
      do {
        var g = {
          eventTime: c.eventTime,
          lane: c.lane,
          tag: c.tag,
          payload: c.payload,
          callback: c.callback,
          next: null
        };
        null === f ? e = f = g : f = f.next = g;
        c = c.next;
      } while (null !== c);
      null === f ? e = f = b : f = f.next = b;
    } else e = f = b;
    c = {
      baseState: d.baseState,
      firstBaseUpdate: e,
      lastBaseUpdate: f,
      shared: d.shared,
      effects: d.effects
    };
    a.updateQueue = c;
    return;
  }
  a = c.lastBaseUpdate;
  null === a ? c.firstBaseUpdate = b : a.next = b;
  c.lastBaseUpdate = b;
}
function gh(a, b, c, d) {
  var e = a.updateQueue;
  $g = !1;
  var f = e.firstBaseUpdate,
    g = e.lastBaseUpdate,
    h = e.shared.pending;
  if (null !== h) {
    e.shared.pending = null;
    var k = h,
      l = k.next;
    k.next = null;
    null === g ? f = l : g.next = l;
    g = k;
    var m = a.alternate;
    null !== m && (m = m.updateQueue, h = m.lastBaseUpdate, h !== g && (null === h ? m.firstBaseUpdate = l : h.next = l, m.lastBaseUpdate = k));
  }
  if (null !== f) {
    var q = e.baseState;
    g = 0;
    m = l = k = null;
    h = f;
    do {
      var r = h.lane,
        y = h.eventTime;
      if ((d & r) === r) {
        null !== m && (m = m.next = {
          eventTime: y,
          lane: 0,
          tag: h.tag,
          payload: h.payload,
          callback: h.callback,
          next: null
        });
        a: {
          var n = a,
            t = h;
          r = b;
          y = c;
          switch (t.tag) {
            case 1:
              n = t.payload;
              if ("function" === typeof n) {
                q = n.call(y, q, r);
                break a;
              }
              q = n;
              break a;
            case 3:
              n.flags = n.flags & -65537 | 128;
            case 0:
              n = t.payload;
              r = "function" === typeof n ? n.call(y, q, r) : n;
              if (null === r || void 0 === r) break a;
              q = A$2({}, q, r);
              break a;
            case 2:
              $g = !0;
          }
        }
        null !== h.callback && 0 !== h.lane && (a.flags |= 64, r = e.effects, null === r ? e.effects = [h] : r.push(h));
      } else y = {
        eventTime: y,
        lane: r,
        tag: h.tag,
        payload: h.payload,
        callback: h.callback,
        next: null
      }, null === m ? (l = m = y, k = q) : m = m.next = y, g |= r;
      h = h.next;
      if (null === h) if (h = e.shared.pending, null === h) break;else r = h, h = r.next, r.next = null, e.lastBaseUpdate = r, e.shared.pending = null;
    } while (1);
    null === m && (k = q);
    e.baseState = k;
    e.firstBaseUpdate = l;
    e.lastBaseUpdate = m;
    b = e.shared.interleaved;
    if (null !== b) {
      e = b;
      do g |= e.lane, e = e.next; while (e !== b);
    } else null === f && (e.shared.lanes = 0);
    hh |= g;
    a.lanes = g;
    a.memoizedState = q;
  }
}
function ih(a, b, c) {
  a = b.effects;
  b.effects = null;
  if (null !== a) for (b = 0; b < a.length; b++) {
    var d = a[b],
      e = d.callback;
    if (null !== e) {
      d.callback = null;
      d = c;
      if ("function" !== typeof e) throw Error(p$2(191, e));
      e.call(d);
    }
  }
}
var jh = new aa.Component().refs;
function kh(a, b, c, d) {
  b = a.memoizedState;
  c = c(d, b);
  c = null === c || void 0 === c ? b : A$2({}, b, c);
  a.memoizedState = c;
  0 === a.lanes && (a.updateQueue.baseState = c);
}
var nh = {
  isMounted: function (a) {
    return (a = a._reactInternals) ? Vb(a) === a : !1;
  },
  enqueueSetState: function (a, b, c) {
    a = a._reactInternals;
    var d = L$1(),
      e = lh(a),
      f = ch(d, e);
    f.payload = b;
    void 0 !== c && null !== c && (f.callback = c);
    b = dh(a, f, e);
    null !== b && (mh(b, a, e, d), eh(b, a, e));
  },
  enqueueReplaceState: function (a, b, c) {
    a = a._reactInternals;
    var d = L$1(),
      e = lh(a),
      f = ch(d, e);
    f.tag = 1;
    f.payload = b;
    void 0 !== c && null !== c && (f.callback = c);
    b = dh(a, f, e);
    null !== b && (mh(b, a, e, d), eh(b, a, e));
  },
  enqueueForceUpdate: function (a, b) {
    a = a._reactInternals;
    var c = L$1(),
      d = lh(a),
      e = ch(c, d);
    e.tag = 2;
    void 0 !== b && null !== b && (e.callback = b);
    b = dh(a, e, d);
    null !== b && (mh(b, a, d, c), eh(b, a, d));
  }
};
function oh(a, b, c, d, e, f, g) {
  a = a.stateNode;
  return "function" === typeof a.shouldComponentUpdate ? a.shouldComponentUpdate(d, f, g) : b.prototype && b.prototype.isPureReactComponent ? !Ie(c, d) || !Ie(e, f) : !0;
}
function ph(a, b, c) {
  var d = !1,
    e = Vf;
  var f = b.contextType;
  "object" === typeof f && null !== f ? f = Vg(f) : (e = Zf(b) ? Xf : H$2.current, d = b.contextTypes, f = (d = null !== d && void 0 !== d) ? Yf(a, e) : Vf);
  b = new b(c, f);
  a.memoizedState = null !== b.state && void 0 !== b.state ? b.state : null;
  b.updater = nh;
  a.stateNode = b;
  b._reactInternals = a;
  d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = e, a.__reactInternalMemoizedMaskedChildContext = f);
  return b;
}
function qh(a, b, c, d) {
  a = b.state;
  "function" === typeof b.componentWillReceiveProps && b.componentWillReceiveProps(c, d);
  "function" === typeof b.UNSAFE_componentWillReceiveProps && b.UNSAFE_componentWillReceiveProps(c, d);
  b.state !== a && nh.enqueueReplaceState(b, b.state, null);
}
function rh(a, b, c, d) {
  var e = a.stateNode;
  e.props = c;
  e.state = a.memoizedState;
  e.refs = jh;
  ah(a);
  var f = b.contextType;
  "object" === typeof f && null !== f ? e.context = Vg(f) : (f = Zf(b) ? Xf : H$2.current, e.context = Yf(a, f));
  e.state = a.memoizedState;
  f = b.getDerivedStateFromProps;
  "function" === typeof f && (kh(a, b, f, c), e.state = a.memoizedState);
  "function" === typeof b.getDerivedStateFromProps || "function" === typeof e.getSnapshotBeforeUpdate || "function" !== typeof e.UNSAFE_componentWillMount && "function" !== typeof e.componentWillMount || (b = e.state, "function" === typeof e.componentWillMount && e.componentWillMount(), "function" === typeof e.UNSAFE_componentWillMount && e.UNSAFE_componentWillMount(), b !== e.state && nh.enqueueReplaceState(e, e.state, null), gh(a, c, e, d), e.state = a.memoizedState);
  "function" === typeof e.componentDidMount && (a.flags |= 4194308);
}
function sh(a, b, c) {
  a = c.ref;
  if (null !== a && "function" !== typeof a && "object" !== typeof a) {
    if (c._owner) {
      c = c._owner;
      if (c) {
        if (1 !== c.tag) throw Error(p$2(309));
        var d = c.stateNode;
      }
      if (!d) throw Error(p$2(147, a));
      var e = d,
        f = "" + a;
      if (null !== b && null !== b.ref && "function" === typeof b.ref && b.ref._stringRef === f) return b.ref;
      b = function (a) {
        var b = e.refs;
        b === jh && (b = e.refs = {});
        null === a ? delete b[f] : b[f] = a;
      };
      b._stringRef = f;
      return b;
    }
    if ("string" !== typeof a) throw Error(p$2(284));
    if (!c._owner) throw Error(p$2(290, a));
  }
  return a;
}
function th(a, b) {
  a = Object.prototype.toString.call(b);
  throw Error(p$2(31, "[object Object]" === a ? "object with keys {" + Object.keys(b).join(", ") + "}" : a));
}
function uh(a) {
  var b = a._init;
  return b(a._payload);
}
function vh(a) {
  function b(b, c) {
    if (a) {
      var d = b.deletions;
      null === d ? (b.deletions = [c], b.flags |= 16) : d.push(c);
    }
  }
  function c(c, d) {
    if (!a) return null;
    for (; null !== d;) b(c, d), d = d.sibling;
    return null;
  }
  function d(a, b) {
    for (a = new Map(); null !== b;) null !== b.key ? a.set(b.key, b) : a.set(b.index, b), b = b.sibling;
    return a;
  }
  function e(a, b) {
    a = wh(a, b);
    a.index = 0;
    a.sibling = null;
    return a;
  }
  function f(b, c, d) {
    b.index = d;
    if (!a) return b.flags |= 1048576, c;
    d = b.alternate;
    if (null !== d) return d = d.index, d < c ? (b.flags |= 2, c) : d;
    b.flags |= 2;
    return c;
  }
  function g(b) {
    a && null === b.alternate && (b.flags |= 2);
    return b;
  }
  function h(a, b, c, d) {
    if (null === b || 6 !== b.tag) return b = xh(c, a.mode, d), b.return = a, b;
    b = e(b, c);
    b.return = a;
    return b;
  }
  function k(a, b, c, d) {
    var f = c.type;
    if (f === ya) return m(a, b, c.props.children, d, c.key);
    if (null !== b && (b.elementType === f || "object" === typeof f && null !== f && f.$$typeof === Ha && uh(f) === b.type)) return d = e(b, c.props), d.ref = sh(a, b, c), d.return = a, d;
    d = yh(c.type, c.key, c.props, null, a.mode, d);
    d.ref = sh(a, b, c);
    d.return = a;
    return d;
  }
  function l(a, b, c, d) {
    if (null === b || 4 !== b.tag || b.stateNode.containerInfo !== c.containerInfo || b.stateNode.implementation !== c.implementation) return b = zh(c, a.mode, d), b.return = a, b;
    b = e(b, c.children || []);
    b.return = a;
    return b;
  }
  function m(a, b, c, d, f) {
    if (null === b || 7 !== b.tag) return b = Ah(c, a.mode, d, f), b.return = a, b;
    b = e(b, c);
    b.return = a;
    return b;
  }
  function q(a, b, c) {
    if ("string" === typeof b && "" !== b || "number" === typeof b) return b = xh("" + b, a.mode, c), b.return = a, b;
    if ("object" === typeof b && null !== b) {
      switch (b.$$typeof) {
        case va:
          return c = yh(b.type, b.key, b.props, null, a.mode, c), c.ref = sh(a, null, b), c.return = a, c;
        case wa:
          return b = zh(b, a.mode, c), b.return = a, b;
        case Ha:
          var d = b._init;
          return q(a, d(b._payload), c);
      }
      if (eb(b) || Ka(b)) return b = Ah(b, a.mode, c, null), b.return = a, b;
      th(a, b);
    }
    return null;
  }
  function r(a, b, c, d) {
    var e = null !== b ? b.key : null;
    if ("string" === typeof c && "" !== c || "number" === typeof c) return null !== e ? null : h(a, b, "" + c, d);
    if ("object" === typeof c && null !== c) {
      switch (c.$$typeof) {
        case va:
          return c.key === e ? k(a, b, c, d) : null;
        case wa:
          return c.key === e ? l(a, b, c, d) : null;
        case Ha:
          return e = c._init, r(a, b, e(c._payload), d);
      }
      if (eb(c) || Ka(c)) return null !== e ? null : m(a, b, c, d, null);
      th(a, c);
    }
    return null;
  }
  function y(a, b, c, d, e) {
    if ("string" === typeof d && "" !== d || "number" === typeof d) return a = a.get(c) || null, h(b, a, "" + d, e);
    if ("object" === typeof d && null !== d) {
      switch (d.$$typeof) {
        case va:
          return a = a.get(null === d.key ? c : d.key) || null, k(b, a, d, e);
        case wa:
          return a = a.get(null === d.key ? c : d.key) || null, l(b, a, d, e);
        case Ha:
          var f = d._init;
          return y(a, b, c, f(d._payload), e);
      }
      if (eb(d) || Ka(d)) return a = a.get(c) || null, m(b, a, d, e, null);
      th(b, d);
    }
    return null;
  }
  function n(e, g, h, k) {
    for (var l = null, m = null, u = g, w = g = 0, x = null; null !== u && w < h.length; w++) {
      u.index > w ? (x = u, u = null) : x = u.sibling;
      var n = r(e, u, h[w], k);
      if (null === n) {
        null === u && (u = x);
        break;
      }
      a && u && null === n.alternate && b(e, u);
      g = f(n, g, w);
      null === m ? l = n : m.sibling = n;
      m = n;
      u = x;
    }
    if (w === h.length) return c(e, u), I$2 && tg(e, w), l;
    if (null === u) {
      for (; w < h.length; w++) u = q(e, h[w], k), null !== u && (g = f(u, g, w), null === m ? l = u : m.sibling = u, m = u);
      I$2 && tg(e, w);
      return l;
    }
    for (u = d(e, u); w < h.length; w++) x = y(u, e, w, h[w], k), null !== x && (a && null !== x.alternate && u.delete(null === x.key ? w : x.key), g = f(x, g, w), null === m ? l = x : m.sibling = x, m = x);
    a && u.forEach(function (a) {
      return b(e, a);
    });
    I$2 && tg(e, w);
    return l;
  }
  function t(e, g, h, k) {
    var l = Ka(h);
    if ("function" !== typeof l) throw Error(p$2(150));
    h = l.call(h);
    if (null == h) throw Error(p$2(151));
    for (var u = l = null, m = g, w = g = 0, x = null, n = h.next(); null !== m && !n.done; w++, n = h.next()) {
      m.index > w ? (x = m, m = null) : x = m.sibling;
      var t = r(e, m, n.value, k);
      if (null === t) {
        null === m && (m = x);
        break;
      }
      a && m && null === t.alternate && b(e, m);
      g = f(t, g, w);
      null === u ? l = t : u.sibling = t;
      u = t;
      m = x;
    }
    if (n.done) return c(e, m), I$2 && tg(e, w), l;
    if (null === m) {
      for (; !n.done; w++, n = h.next()) n = q(e, n.value, k), null !== n && (g = f(n, g, w), null === u ? l = n : u.sibling = n, u = n);
      I$2 && tg(e, w);
      return l;
    }
    for (m = d(e, m); !n.done; w++, n = h.next()) n = y(m, e, w, n.value, k), null !== n && (a && null !== n.alternate && m.delete(null === n.key ? w : n.key), g = f(n, g, w), null === u ? l = n : u.sibling = n, u = n);
    a && m.forEach(function (a) {
      return b(e, a);
    });
    I$2 && tg(e, w);
    return l;
  }
  function J(a, d, f, h) {
    "object" === typeof f && null !== f && f.type === ya && null === f.key && (f = f.props.children);
    if ("object" === typeof f && null !== f) {
      switch (f.$$typeof) {
        case va:
          a: {
            for (var k = f.key, l = d; null !== l;) {
              if (l.key === k) {
                k = f.type;
                if (k === ya) {
                  if (7 === l.tag) {
                    c(a, l.sibling);
                    d = e(l, f.props.children);
                    d.return = a;
                    a = d;
                    break a;
                  }
                } else if (l.elementType === k || "object" === typeof k && null !== k && k.$$typeof === Ha && uh(k) === l.type) {
                  c(a, l.sibling);
                  d = e(l, f.props);
                  d.ref = sh(a, l, f);
                  d.return = a;
                  a = d;
                  break a;
                }
                c(a, l);
                break;
              } else b(a, l);
              l = l.sibling;
            }
            f.type === ya ? (d = Ah(f.props.children, a.mode, h, f.key), d.return = a, a = d) : (h = yh(f.type, f.key, f.props, null, a.mode, h), h.ref = sh(a, d, f), h.return = a, a = h);
          }
          return g(a);
        case wa:
          a: {
            for (l = f.key; null !== d;) {
              if (d.key === l) {
                if (4 === d.tag && d.stateNode.containerInfo === f.containerInfo && d.stateNode.implementation === f.implementation) {
                  c(a, d.sibling);
                  d = e(d, f.children || []);
                  d.return = a;
                  a = d;
                  break a;
                } else {
                  c(a, d);
                  break;
                }
              } else b(a, d);
              d = d.sibling;
            }
            d = zh(f, a.mode, h);
            d.return = a;
            a = d;
          }
          return g(a);
        case Ha:
          return l = f._init, J(a, d, l(f._payload), h);
      }
      if (eb(f)) return n(a, d, f, h);
      if (Ka(f)) return t(a, d, f, h);
      th(a, f);
    }
    return "string" === typeof f && "" !== f || "number" === typeof f ? (f = "" + f, null !== d && 6 === d.tag ? (c(a, d.sibling), d = e(d, f), d.return = a, a = d) : (c(a, d), d = xh(f, a.mode, h), d.return = a, a = d), g(a)) : c(a, d);
  }
  return J;
}
var Bh = vh(!0),
  Ch = vh(!1),
  Dh = {},
  Eh = Uf(Dh),
  Fh = Uf(Dh),
  Gh = Uf(Dh);
function Hh(a) {
  if (a === Dh) throw Error(p$2(174));
  return a;
}
function Ih(a, b) {
  G$2(Gh, b);
  G$2(Fh, a);
  G$2(Eh, Dh);
  a = b.nodeType;
  switch (a) {
    case 9:
    case 11:
      b = (b = b.documentElement) ? b.namespaceURI : lb(null, "");
      break;
    default:
      a = 8 === a ? b.parentNode : b, b = a.namespaceURI || null, a = a.tagName, b = lb(b, a);
  }
  E$2(Eh);
  G$2(Eh, b);
}
function Jh() {
  E$2(Eh);
  E$2(Fh);
  E$2(Gh);
}
function Kh(a) {
  Hh(Gh.current);
  var b = Hh(Eh.current);
  var c = lb(b, a.type);
  b !== c && (G$2(Fh, a), G$2(Eh, c));
}
function Lh(a) {
  Fh.current === a && (E$2(Eh), E$2(Fh));
}
var M$1 = Uf(0);
function Mh(a) {
  for (var b = a; null !== b;) {
    if (13 === b.tag) {
      var c = b.memoizedState;
      if (null !== c && (c = c.dehydrated, null === c || "$?" === c.data || "$!" === c.data)) return b;
    } else if (19 === b.tag && void 0 !== b.memoizedProps.revealOrder) {
      if (0 !== (b.flags & 128)) return b;
    } else if (null !== b.child) {
      b.child.return = b;
      b = b.child;
      continue;
    }
    if (b === a) break;
    for (; null === b.sibling;) {
      if (null === b.return || b.return === a) return null;
      b = b.return;
    }
    b.sibling.return = b.return;
    b = b.sibling;
  }
  return null;
}
var Nh = [];
function Oh() {
  for (var a = 0; a < Nh.length; a++) Nh[a]._workInProgressVersionPrimary = null;
  Nh.length = 0;
}
var Ph = ua.ReactCurrentDispatcher,
  Qh = ua.ReactCurrentBatchConfig,
  Rh = 0,
  N$1 = null,
  O = null,
  P = null,
  Sh = !1,
  Th = !1,
  Uh = 0,
  Vh = 0;
function Q$1() {
  throw Error(p$2(321));
}
function Wh(a, b) {
  if (null === b) return !1;
  for (var c = 0; c < b.length && c < a.length; c++) if (!He(a[c], b[c])) return !1;
  return !0;
}
function Xh(a, b, c, d, e, f) {
  Rh = f;
  N$1 = b;
  b.memoizedState = null;
  b.updateQueue = null;
  b.lanes = 0;
  Ph.current = null === a || null === a.memoizedState ? Yh : Zh;
  a = c(d, e);
  if (Th) {
    f = 0;
    do {
      Th = !1;
      Uh = 0;
      if (25 <= f) throw Error(p$2(301));
      f += 1;
      P = O = null;
      b.updateQueue = null;
      Ph.current = $h;
      a = c(d, e);
    } while (Th);
  }
  Ph.current = ai;
  b = null !== O && null !== O.next;
  Rh = 0;
  P = O = N$1 = null;
  Sh = !1;
  if (b) throw Error(p$2(300));
  return a;
}
function bi() {
  var a = 0 !== Uh;
  Uh = 0;
  return a;
}
function ci() {
  var a = {
    memoizedState: null,
    baseState: null,
    baseQueue: null,
    queue: null,
    next: null
  };
  null === P ? N$1.memoizedState = P = a : P = P.next = a;
  return P;
}
function di() {
  if (null === O) {
    var a = N$1.alternate;
    a = null !== a ? a.memoizedState : null;
  } else a = O.next;
  var b = null === P ? N$1.memoizedState : P.next;
  if (null !== b) P = b, O = a;else {
    if (null === a) throw Error(p$2(310));
    O = a;
    a = {
      memoizedState: O.memoizedState,
      baseState: O.baseState,
      baseQueue: O.baseQueue,
      queue: O.queue,
      next: null
    };
    null === P ? N$1.memoizedState = P = a : P = P.next = a;
  }
  return P;
}
function ei(a, b) {
  return "function" === typeof b ? b(a) : b;
}
function fi(a) {
  var b = di(),
    c = b.queue;
  if (null === c) throw Error(p$2(311));
  c.lastRenderedReducer = a;
  var d = O,
    e = d.baseQueue,
    f = c.pending;
  if (null !== f) {
    if (null !== e) {
      var g = e.next;
      e.next = f.next;
      f.next = g;
    }
    d.baseQueue = e = f;
    c.pending = null;
  }
  if (null !== e) {
    f = e.next;
    d = d.baseState;
    var h = g = null,
      k = null,
      l = f;
    do {
      var m = l.lane;
      if ((Rh & m) === m) null !== k && (k = k.next = {
        lane: 0,
        action: l.action,
        hasEagerState: l.hasEagerState,
        eagerState: l.eagerState,
        next: null
      }), d = l.hasEagerState ? l.eagerState : a(d, l.action);else {
        var q = {
          lane: m,
          action: l.action,
          hasEagerState: l.hasEagerState,
          eagerState: l.eagerState,
          next: null
        };
        null === k ? (h = k = q, g = d) : k = k.next = q;
        N$1.lanes |= m;
        hh |= m;
      }
      l = l.next;
    } while (null !== l && l !== f);
    null === k ? g = d : k.next = h;
    He(d, b.memoizedState) || (Ug = !0);
    b.memoizedState = d;
    b.baseState = g;
    b.baseQueue = k;
    c.lastRenderedState = d;
  }
  a = c.interleaved;
  if (null !== a) {
    e = a;
    do f = e.lane, N$1.lanes |= f, hh |= f, e = e.next; while (e !== a);
  } else null === e && (c.lanes = 0);
  return [b.memoizedState, c.dispatch];
}
function gi(a) {
  var b = di(),
    c = b.queue;
  if (null === c) throw Error(p$2(311));
  c.lastRenderedReducer = a;
  var d = c.dispatch,
    e = c.pending,
    f = b.memoizedState;
  if (null !== e) {
    c.pending = null;
    var g = e = e.next;
    do f = a(f, g.action), g = g.next; while (g !== e);
    He(f, b.memoizedState) || (Ug = !0);
    b.memoizedState = f;
    null === b.baseQueue && (b.baseState = f);
    c.lastRenderedState = f;
  }
  return [f, d];
}
function hi() {}
function ii(a, b) {
  var c = N$1,
    d = di(),
    e = b(),
    f = !He(d.memoizedState, e);
  f && (d.memoizedState = e, Ug = !0);
  d = d.queue;
  ji(ki.bind(null, c, d, a), [a]);
  if (d.getSnapshot !== b || f || null !== P && P.memoizedState.tag & 1) {
    c.flags |= 2048;
    li(9, mi.bind(null, c, d, e, b), void 0, null);
    if (null === R) throw Error(p$2(349));
    0 !== (Rh & 30) || ni(c, b, e);
  }
  return e;
}
function ni(a, b, c) {
  a.flags |= 16384;
  a = {
    getSnapshot: b,
    value: c
  };
  b = N$1.updateQueue;
  null === b ? (b = {
    lastEffect: null,
    stores: null
  }, N$1.updateQueue = b, b.stores = [a]) : (c = b.stores, null === c ? b.stores = [a] : c.push(a));
}
function mi(a, b, c, d) {
  b.value = c;
  b.getSnapshot = d;
  oi(b) && pi(a);
}
function ki(a, b, c) {
  return c(function () {
    oi(b) && pi(a);
  });
}
function oi(a) {
  var b = a.getSnapshot;
  a = a.value;
  try {
    var c = b();
    return !He(a, c);
  } catch (d) {
    return !0;
  }
}
function pi(a) {
  var b = Zg(a, 1);
  null !== b && mh(b, a, 1, -1);
}
function qi(a) {
  var b = ci();
  "function" === typeof a && (a = a());
  b.memoizedState = b.baseState = a;
  a = {
    pending: null,
    interleaved: null,
    lanes: 0,
    dispatch: null,
    lastRenderedReducer: ei,
    lastRenderedState: a
  };
  b.queue = a;
  a = a.dispatch = ri.bind(null, N$1, a);
  return [b.memoizedState, a];
}
function li(a, b, c, d) {
  a = {
    tag: a,
    create: b,
    destroy: c,
    deps: d,
    next: null
  };
  b = N$1.updateQueue;
  null === b ? (b = {
    lastEffect: null,
    stores: null
  }, N$1.updateQueue = b, b.lastEffect = a.next = a) : (c = b.lastEffect, null === c ? b.lastEffect = a.next = a : (d = c.next, c.next = a, a.next = d, b.lastEffect = a));
  return a;
}
function si() {
  return di().memoizedState;
}
function ti(a, b, c, d) {
  var e = ci();
  N$1.flags |= a;
  e.memoizedState = li(1 | b, c, void 0, void 0 === d ? null : d);
}
function ui(a, b, c, d) {
  var e = di();
  d = void 0 === d ? null : d;
  var f = void 0;
  if (null !== O) {
    var g = O.memoizedState;
    f = g.destroy;
    if (null !== d && Wh(d, g.deps)) {
      e.memoizedState = li(b, c, f, d);
      return;
    }
  }
  N$1.flags |= a;
  e.memoizedState = li(1 | b, c, f, d);
}
function vi(a, b) {
  return ti(8390656, 8, a, b);
}
function ji(a, b) {
  return ui(2048, 8, a, b);
}
function wi(a, b) {
  return ui(4, 2, a, b);
}
function xi(a, b) {
  return ui(4, 4, a, b);
}
function yi(a, b) {
  if ("function" === typeof b) return a = a(), b(a), function () {
    b(null);
  };
  if (null !== b && void 0 !== b) return a = a(), b.current = a, function () {
    b.current = null;
  };
}
function zi(a, b, c) {
  c = null !== c && void 0 !== c ? c.concat([a]) : null;
  return ui(4, 4, yi.bind(null, b, a), c);
}
function Ai() {}
function Bi(a, b) {
  var c = di();
  b = void 0 === b ? null : b;
  var d = c.memoizedState;
  if (null !== d && null !== b && Wh(b, d[1])) return d[0];
  c.memoizedState = [a, b];
  return a;
}
function Ci(a, b) {
  var c = di();
  b = void 0 === b ? null : b;
  var d = c.memoizedState;
  if (null !== d && null !== b && Wh(b, d[1])) return d[0];
  a = a();
  c.memoizedState = [a, b];
  return a;
}
function Di(a, b, c) {
  if (0 === (Rh & 21)) return a.baseState && (a.baseState = !1, Ug = !0), a.memoizedState = c;
  He(c, b) || (c = yc(), N$1.lanes |= c, hh |= c, a.baseState = !0);
  return b;
}
function Ei(a, b) {
  var c = C$2;
  C$2 = 0 !== c && 4 > c ? c : 4;
  a(!0);
  var d = Qh.transition;
  Qh.transition = {};
  try {
    a(!1), b();
  } finally {
    C$2 = c, Qh.transition = d;
  }
}
function Fi() {
  return di().memoizedState;
}
function Gi(a, b, c) {
  var d = lh(a);
  c = {
    lane: d,
    action: c,
    hasEagerState: !1,
    eagerState: null,
    next: null
  };
  if (Hi(a)) Ii(b, c);else if (c = Yg(a, b, c, d), null !== c) {
    var e = L$1();
    mh(c, a, d, e);
    Ji(c, b, d);
  }
}
function ri(a, b, c) {
  var d = lh(a),
    e = {
      lane: d,
      action: c,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
  if (Hi(a)) Ii(b, e);else {
    var f = a.alternate;
    if (0 === a.lanes && (null === f || 0 === f.lanes) && (f = b.lastRenderedReducer, null !== f)) try {
      var g = b.lastRenderedState,
        h = f(g, c);
      e.hasEagerState = !0;
      e.eagerState = h;
      if (He(h, g)) {
        var k = b.interleaved;
        null === k ? (e.next = e, Xg(b)) : (e.next = k.next, k.next = e);
        b.interleaved = e;
        return;
      }
    } catch (l) {} finally {}
    c = Yg(a, b, e, d);
    null !== c && (e = L$1(), mh(c, a, d, e), Ji(c, b, d));
  }
}
function Hi(a) {
  var b = a.alternate;
  return a === N$1 || null !== b && b === N$1;
}
function Ii(a, b) {
  Th = Sh = !0;
  var c = a.pending;
  null === c ? b.next = b : (b.next = c.next, c.next = b);
  a.pending = b;
}
function Ji(a, b, c) {
  if (0 !== (c & 4194240)) {
    var d = b.lanes;
    d &= a.pendingLanes;
    c |= d;
    b.lanes = c;
    Cc(a, c);
  }
}
var ai = {
    readContext: Vg,
    useCallback: Q$1,
    useContext: Q$1,
    useEffect: Q$1,
    useImperativeHandle: Q$1,
    useInsertionEffect: Q$1,
    useLayoutEffect: Q$1,
    useMemo: Q$1,
    useReducer: Q$1,
    useRef: Q$1,
    useState: Q$1,
    useDebugValue: Q$1,
    useDeferredValue: Q$1,
    useTransition: Q$1,
    useMutableSource: Q$1,
    useSyncExternalStore: Q$1,
    useId: Q$1,
    unstable_isNewReconciler: !1
  },
  Yh = {
    readContext: Vg,
    useCallback: function (a, b) {
      ci().memoizedState = [a, void 0 === b ? null : b];
      return a;
    },
    useContext: Vg,
    useEffect: vi,
    useImperativeHandle: function (a, b, c) {
      c = null !== c && void 0 !== c ? c.concat([a]) : null;
      return ti(4194308, 4, yi.bind(null, b, a), c);
    },
    useLayoutEffect: function (a, b) {
      return ti(4194308, 4, a, b);
    },
    useInsertionEffect: function (a, b) {
      return ti(4, 2, a, b);
    },
    useMemo: function (a, b) {
      var c = ci();
      b = void 0 === b ? null : b;
      a = a();
      c.memoizedState = [a, b];
      return a;
    },
    useReducer: function (a, b, c) {
      var d = ci();
      b = void 0 !== c ? c(b) : b;
      d.memoizedState = d.baseState = b;
      a = {
        pending: null,
        interleaved: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: a,
        lastRenderedState: b
      };
      d.queue = a;
      a = a.dispatch = Gi.bind(null, N$1, a);
      return [d.memoizedState, a];
    },
    useRef: function (a) {
      var b = ci();
      a = {
        current: a
      };
      return b.memoizedState = a;
    },
    useState: qi,
    useDebugValue: Ai,
    useDeferredValue: function (a) {
      return ci().memoizedState = a;
    },
    useTransition: function () {
      var a = qi(!1),
        b = a[0];
      a = Ei.bind(null, a[1]);
      ci().memoizedState = a;
      return [b, a];
    },
    useMutableSource: function () {},
    useSyncExternalStore: function (a, b, c) {
      var d = N$1,
        e = ci();
      if (I$2) {
        if (void 0 === c) throw Error(p$2(407));
        c = c();
      } else {
        c = b();
        if (null === R) throw Error(p$2(349));
        0 !== (Rh & 30) || ni(d, b, c);
      }
      e.memoizedState = c;
      var f = {
        value: c,
        getSnapshot: b
      };
      e.queue = f;
      vi(ki.bind(null, d, f, a), [a]);
      d.flags |= 2048;
      li(9, mi.bind(null, d, f, c, b), void 0, null);
      return c;
    },
    useId: function () {
      var a = ci(),
        b = R.identifierPrefix;
      if (I$2) {
        var c = sg;
        var d = rg;
        c = (d & ~(1 << 32 - oc(d) - 1)).toString(32) + c;
        b = ":" + b + "R" + c;
        c = Uh++;
        0 < c && (b += "H" + c.toString(32));
        b += ":";
      } else c = Vh++, b = ":" + b + "r" + c.toString(32) + ":";
      return a.memoizedState = b;
    },
    unstable_isNewReconciler: !1
  },
  Zh = {
    readContext: Vg,
    useCallback: Bi,
    useContext: Vg,
    useEffect: ji,
    useImperativeHandle: zi,
    useInsertionEffect: wi,
    useLayoutEffect: xi,
    useMemo: Ci,
    useReducer: fi,
    useRef: si,
    useState: function () {
      return fi(ei);
    },
    useDebugValue: Ai,
    useDeferredValue: function (a) {
      var b = di();
      return Di(b, O.memoizedState, a);
    },
    useTransition: function () {
      var a = fi(ei)[0],
        b = di().memoizedState;
      return [a, b];
    },
    useMutableSource: hi,
    useSyncExternalStore: ii,
    useId: Fi,
    unstable_isNewReconciler: !1
  },
  $h = {
    readContext: Vg,
    useCallback: Bi,
    useContext: Vg,
    useEffect: ji,
    useImperativeHandle: zi,
    useInsertionEffect: wi,
    useLayoutEffect: xi,
    useMemo: Ci,
    useReducer: gi,
    useRef: si,
    useState: function () {
      return gi(ei);
    },
    useDebugValue: Ai,
    useDeferredValue: function (a) {
      var b = di();
      return null === O ? b.memoizedState = a : Di(b, O.memoizedState, a);
    },
    useTransition: function () {
      var a = gi(ei)[0],
        b = di().memoizedState;
      return [a, b];
    },
    useMutableSource: hi,
    useSyncExternalStore: ii,
    useId: Fi,
    unstable_isNewReconciler: !1
  };
function Ki(a, b) {
  try {
    var c = "",
      d = b;
    do c += Pa(d), d = d.return; while (d);
    var e = c;
  } catch (f) {
    e = "\nError generating stack: " + f.message + "\n" + f.stack;
  }
  return {
    value: a,
    source: b,
    stack: e,
    digest: null
  };
}
function Li(a, b, c) {
  return {
    value: a,
    source: null,
    stack: null != c ? c : null,
    digest: null != b ? b : null
  };
}
function Mi(a, b) {
  try {
    console.error(b.value);
  } catch (c) {
    setTimeout(function () {
      throw c;
    });
  }
}
var Ni = "function" === typeof WeakMap ? WeakMap : Map;
function Oi(a, b, c) {
  c = ch(-1, c);
  c.tag = 3;
  c.payload = {
    element: null
  };
  var d = b.value;
  c.callback = function () {
    Pi || (Pi = !0, Qi = d);
    Mi(a, b);
  };
  return c;
}
function Ri(a, b, c) {
  c = ch(-1, c);
  c.tag = 3;
  var d = a.type.getDerivedStateFromError;
  if ("function" === typeof d) {
    var e = b.value;
    c.payload = function () {
      return d(e);
    };
    c.callback = function () {
      Mi(a, b);
    };
  }
  var f = a.stateNode;
  null !== f && "function" === typeof f.componentDidCatch && (c.callback = function () {
    Mi(a, b);
    "function" !== typeof d && (null === Si ? Si = new Set([this]) : Si.add(this));
    var c = b.stack;
    this.componentDidCatch(b.value, {
      componentStack: null !== c ? c : ""
    });
  });
  return c;
}
function Ti(a, b, c) {
  var d = a.pingCache;
  if (null === d) {
    d = a.pingCache = new Ni();
    var e = new Set();
    d.set(b, e);
  } else e = d.get(b), void 0 === e && (e = new Set(), d.set(b, e));
  e.has(c) || (e.add(c), a = Ui.bind(null, a, b, c), b.then(a, a));
}
function Vi(a) {
  do {
    var b;
    if (b = 13 === a.tag) b = a.memoizedState, b = null !== b ? null !== b.dehydrated ? !0 : !1 : !0;
    if (b) return a;
    a = a.return;
  } while (null !== a);
  return null;
}
function Wi(a, b, c, d, e) {
  if (0 === (a.mode & 1)) return a === b ? a.flags |= 65536 : (a.flags |= 128, c.flags |= 131072, c.flags &= -52805, 1 === c.tag && (null === c.alternate ? c.tag = 17 : (b = ch(-1, 1), b.tag = 2, dh(c, b, 1))), c.lanes |= 1), a;
  a.flags |= 65536;
  a.lanes = e;
  return a;
}
var Xi = ua.ReactCurrentOwner,
  Ug = !1;
function Yi(a, b, c, d) {
  b.child = null === a ? Ch(b, null, c, d) : Bh(b, a.child, c, d);
}
function Zi(a, b, c, d, e) {
  c = c.render;
  var f = b.ref;
  Tg(b, e);
  d = Xh(a, b, c, d, f, e);
  c = bi();
  if (null !== a && !Ug) return b.updateQueue = a.updateQueue, b.flags &= -2053, a.lanes &= ~e, $i(a, b, e);
  I$2 && c && vg(b);
  b.flags |= 1;
  Yi(a, b, d, e);
  return b.child;
}
function aj(a, b, c, d, e) {
  if (null === a) {
    var f = c.type;
    if ("function" === typeof f && !bj(f) && void 0 === f.defaultProps && null === c.compare && void 0 === c.defaultProps) return b.tag = 15, b.type = f, cj(a, b, f, d, e);
    a = yh(c.type, null, d, b, b.mode, e);
    a.ref = b.ref;
    a.return = b;
    return b.child = a;
  }
  f = a.child;
  if (0 === (a.lanes & e)) {
    var g = f.memoizedProps;
    c = c.compare;
    c = null !== c ? c : Ie;
    if (c(g, d) && a.ref === b.ref) return $i(a, b, e);
  }
  b.flags |= 1;
  a = wh(f, d);
  a.ref = b.ref;
  a.return = b;
  return b.child = a;
}
function cj(a, b, c, d, e) {
  if (null !== a) {
    var f = a.memoizedProps;
    if (Ie(f, d) && a.ref === b.ref) if (Ug = !1, b.pendingProps = d = f, 0 !== (a.lanes & e)) 0 !== (a.flags & 131072) && (Ug = !0);else return b.lanes = a.lanes, $i(a, b, e);
  }
  return dj(a, b, c, d, e);
}
function ej(a, b, c) {
  var d = b.pendingProps,
    e = d.children,
    f = null !== a ? a.memoizedState : null;
  if ("hidden" === d.mode) {
    if (0 === (b.mode & 1)) b.memoizedState = {
      baseLanes: 0,
      cachePool: null,
      transitions: null
    }, G$2(fj, gj), gj |= c;else {
      if (0 === (c & 1073741824)) return a = null !== f ? f.baseLanes | c : c, b.lanes = b.childLanes = 1073741824, b.memoizedState = {
        baseLanes: a,
        cachePool: null,
        transitions: null
      }, b.updateQueue = null, G$2(fj, gj), gj |= a, null;
      b.memoizedState = {
        baseLanes: 0,
        cachePool: null,
        transitions: null
      };
      d = null !== f ? f.baseLanes : c;
      G$2(fj, gj);
      gj |= d;
    }
  } else null !== f ? (d = f.baseLanes | c, b.memoizedState = null) : d = c, G$2(fj, gj), gj |= d;
  Yi(a, b, e, c);
  return b.child;
}
function hj(a, b) {
  var c = b.ref;
  if (null === a && null !== c || null !== a && a.ref !== c) b.flags |= 512, b.flags |= 2097152;
}
function dj(a, b, c, d, e) {
  var f = Zf(c) ? Xf : H$2.current;
  f = Yf(b, f);
  Tg(b, e);
  c = Xh(a, b, c, d, f, e);
  d = bi();
  if (null !== a && !Ug) return b.updateQueue = a.updateQueue, b.flags &= -2053, a.lanes &= ~e, $i(a, b, e);
  I$2 && d && vg(b);
  b.flags |= 1;
  Yi(a, b, c, e);
  return b.child;
}
function ij(a, b, c, d, e) {
  if (Zf(c)) {
    var f = !0;
    cg(b);
  } else f = !1;
  Tg(b, e);
  if (null === b.stateNode) jj(a, b), ph(b, c, d), rh(b, c, d, e), d = !0;else if (null === a) {
    var g = b.stateNode,
      h = b.memoizedProps;
    g.props = h;
    var k = g.context,
      l = c.contextType;
    "object" === typeof l && null !== l ? l = Vg(l) : (l = Zf(c) ? Xf : H$2.current, l = Yf(b, l));
    var m = c.getDerivedStateFromProps,
      q = "function" === typeof m || "function" === typeof g.getSnapshotBeforeUpdate;
    q || "function" !== typeof g.UNSAFE_componentWillReceiveProps && "function" !== typeof g.componentWillReceiveProps || (h !== d || k !== l) && qh(b, g, d, l);
    $g = !1;
    var r = b.memoizedState;
    g.state = r;
    gh(b, d, g, e);
    k = b.memoizedState;
    h !== d || r !== k || Wf.current || $g ? ("function" === typeof m && (kh(b, c, m, d), k = b.memoizedState), (h = $g || oh(b, c, h, d, r, k, l)) ? (q || "function" !== typeof g.UNSAFE_componentWillMount && "function" !== typeof g.componentWillMount || ("function" === typeof g.componentWillMount && g.componentWillMount(), "function" === typeof g.UNSAFE_componentWillMount && g.UNSAFE_componentWillMount()), "function" === typeof g.componentDidMount && (b.flags |= 4194308)) : ("function" === typeof g.componentDidMount && (b.flags |= 4194308), b.memoizedProps = d, b.memoizedState = k), g.props = d, g.state = k, g.context = l, d = h) : ("function" === typeof g.componentDidMount && (b.flags |= 4194308), d = !1);
  } else {
    g = b.stateNode;
    bh(a, b);
    h = b.memoizedProps;
    l = b.type === b.elementType ? h : Lg(b.type, h);
    g.props = l;
    q = b.pendingProps;
    r = g.context;
    k = c.contextType;
    "object" === typeof k && null !== k ? k = Vg(k) : (k = Zf(c) ? Xf : H$2.current, k = Yf(b, k));
    var y = c.getDerivedStateFromProps;
    (m = "function" === typeof y || "function" === typeof g.getSnapshotBeforeUpdate) || "function" !== typeof g.UNSAFE_componentWillReceiveProps && "function" !== typeof g.componentWillReceiveProps || (h !== q || r !== k) && qh(b, g, d, k);
    $g = !1;
    r = b.memoizedState;
    g.state = r;
    gh(b, d, g, e);
    var n = b.memoizedState;
    h !== q || r !== n || Wf.current || $g ? ("function" === typeof y && (kh(b, c, y, d), n = b.memoizedState), (l = $g || oh(b, c, l, d, r, n, k) || !1) ? (m || "function" !== typeof g.UNSAFE_componentWillUpdate && "function" !== typeof g.componentWillUpdate || ("function" === typeof g.componentWillUpdate && g.componentWillUpdate(d, n, k), "function" === typeof g.UNSAFE_componentWillUpdate && g.UNSAFE_componentWillUpdate(d, n, k)), "function" === typeof g.componentDidUpdate && (b.flags |= 4), "function" === typeof g.getSnapshotBeforeUpdate && (b.flags |= 1024)) : ("function" !== typeof g.componentDidUpdate || h === a.memoizedProps && r === a.memoizedState || (b.flags |= 4), "function" !== typeof g.getSnapshotBeforeUpdate || h === a.memoizedProps && r === a.memoizedState || (b.flags |= 1024), b.memoizedProps = d, b.memoizedState = n), g.props = d, g.state = n, g.context = k, d = l) : ("function" !== typeof g.componentDidUpdate || h === a.memoizedProps && r === a.memoizedState || (b.flags |= 4), "function" !== typeof g.getSnapshotBeforeUpdate || h === a.memoizedProps && r === a.memoizedState || (b.flags |= 1024), d = !1);
  }
  return kj(a, b, c, d, f, e);
}
function kj(a, b, c, d, e, f) {
  hj(a, b);
  var g = 0 !== (b.flags & 128);
  if (!d && !g) return e && dg(b, c, !1), $i(a, b, f);
  d = b.stateNode;
  Xi.current = b;
  var h = g && "function" !== typeof c.getDerivedStateFromError ? null : d.render();
  b.flags |= 1;
  null !== a && g ? (b.child = Bh(b, a.child, null, f), b.child = Bh(b, null, h, f)) : Yi(a, b, h, f);
  b.memoizedState = d.state;
  e && dg(b, c, !0);
  return b.child;
}
function lj(a) {
  var b = a.stateNode;
  b.pendingContext ? ag(a, b.pendingContext, b.pendingContext !== b.context) : b.context && ag(a, b.context, !1);
  Ih(a, b.containerInfo);
}
function mj(a, b, c, d, e) {
  Ig();
  Jg(e);
  b.flags |= 256;
  Yi(a, b, c, d);
  return b.child;
}
var nj = {
  dehydrated: null,
  treeContext: null,
  retryLane: 0
};
function oj(a) {
  return {
    baseLanes: a,
    cachePool: null,
    transitions: null
  };
}
function pj(a, b, c) {
  var d = b.pendingProps,
    e = M$1.current,
    f = !1,
    g = 0 !== (b.flags & 128),
    h;
  (h = g) || (h = null !== a && null === a.memoizedState ? !1 : 0 !== (e & 2));
  if (h) f = !0, b.flags &= -129;else if (null === a || null !== a.memoizedState) e |= 1;
  G$2(M$1, e & 1);
  if (null === a) {
    Eg(b);
    a = b.memoizedState;
    if (null !== a && (a = a.dehydrated, null !== a)) return 0 === (b.mode & 1) ? b.lanes = 1 : "$!" === a.data ? b.lanes = 8 : b.lanes = 1073741824, null;
    g = d.children;
    a = d.fallback;
    return f ? (d = b.mode, f = b.child, g = {
      mode: "hidden",
      children: g
    }, 0 === (d & 1) && null !== f ? (f.childLanes = 0, f.pendingProps = g) : f = qj(g, d, 0, null), a = Ah(a, d, c, null), f.return = b, a.return = b, f.sibling = a, b.child = f, b.child.memoizedState = oj(c), b.memoizedState = nj, a) : rj(b, g);
  }
  e = a.memoizedState;
  if (null !== e && (h = e.dehydrated, null !== h)) return sj(a, b, g, d, h, e, c);
  if (f) {
    f = d.fallback;
    g = b.mode;
    e = a.child;
    h = e.sibling;
    var k = {
      mode: "hidden",
      children: d.children
    };
    0 === (g & 1) && b.child !== e ? (d = b.child, d.childLanes = 0, d.pendingProps = k, b.deletions = null) : (d = wh(e, k), d.subtreeFlags = e.subtreeFlags & 14680064);
    null !== h ? f = wh(h, f) : (f = Ah(f, g, c, null), f.flags |= 2);
    f.return = b;
    d.return = b;
    d.sibling = f;
    b.child = d;
    d = f;
    f = b.child;
    g = a.child.memoizedState;
    g = null === g ? oj(c) : {
      baseLanes: g.baseLanes | c,
      cachePool: null,
      transitions: g.transitions
    };
    f.memoizedState = g;
    f.childLanes = a.childLanes & ~c;
    b.memoizedState = nj;
    return d;
  }
  f = a.child;
  a = f.sibling;
  d = wh(f, {
    mode: "visible",
    children: d.children
  });
  0 === (b.mode & 1) && (d.lanes = c);
  d.return = b;
  d.sibling = null;
  null !== a && (c = b.deletions, null === c ? (b.deletions = [a], b.flags |= 16) : c.push(a));
  b.child = d;
  b.memoizedState = null;
  return d;
}
function rj(a, b) {
  b = qj({
    mode: "visible",
    children: b
  }, a.mode, 0, null);
  b.return = a;
  return a.child = b;
}
function tj(a, b, c, d) {
  null !== d && Jg(d);
  Bh(b, a.child, null, c);
  a = rj(b, b.pendingProps.children);
  a.flags |= 2;
  b.memoizedState = null;
  return a;
}
function sj(a, b, c, d, e, f, g) {
  if (c) {
    if (b.flags & 256) return b.flags &= -257, d = Li(Error(p$2(422))), tj(a, b, g, d);
    if (null !== b.memoizedState) return b.child = a.child, b.flags |= 128, null;
    f = d.fallback;
    e = b.mode;
    d = qj({
      mode: "visible",
      children: d.children
    }, e, 0, null);
    f = Ah(f, e, g, null);
    f.flags |= 2;
    d.return = b;
    f.return = b;
    d.sibling = f;
    b.child = d;
    0 !== (b.mode & 1) && Bh(b, a.child, null, g);
    b.child.memoizedState = oj(g);
    b.memoizedState = nj;
    return f;
  }
  if (0 === (b.mode & 1)) return tj(a, b, g, null);
  if ("$!" === e.data) {
    d = e.nextSibling && e.nextSibling.dataset;
    if (d) var h = d.dgst;
    d = h;
    f = Error(p$2(419));
    d = Li(f, d, void 0);
    return tj(a, b, g, d);
  }
  h = 0 !== (g & a.childLanes);
  if (Ug || h) {
    d = R;
    if (null !== d) {
      switch (g & -g) {
        case 4:
          e = 2;
          break;
        case 16:
          e = 8;
          break;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          e = 32;
          break;
        case 536870912:
          e = 268435456;
          break;
        default:
          e = 0;
      }
      e = 0 !== (e & (d.suspendedLanes | g)) ? 0 : e;
      0 !== e && e !== f.retryLane && (f.retryLane = e, Zg(a, e), mh(d, a, e, -1));
    }
    uj();
    d = Li(Error(p$2(421)));
    return tj(a, b, g, d);
  }
  if ("$?" === e.data) return b.flags |= 128, b.child = a.child, b = vj.bind(null, a), e._reactRetry = b, null;
  a = f.treeContext;
  yg = Lf(e.nextSibling);
  xg = b;
  I$2 = !0;
  zg = null;
  null !== a && (og[pg++] = rg, og[pg++] = sg, og[pg++] = qg, rg = a.id, sg = a.overflow, qg = b);
  b = rj(b, d.children);
  b.flags |= 4096;
  return b;
}
function wj(a, b, c) {
  a.lanes |= b;
  var d = a.alternate;
  null !== d && (d.lanes |= b);
  Sg(a.return, b, c);
}
function xj(a, b, c, d, e) {
  var f = a.memoizedState;
  null === f ? a.memoizedState = {
    isBackwards: b,
    rendering: null,
    renderingStartTime: 0,
    last: d,
    tail: c,
    tailMode: e
  } : (f.isBackwards = b, f.rendering = null, f.renderingStartTime = 0, f.last = d, f.tail = c, f.tailMode = e);
}
function yj(a, b, c) {
  var d = b.pendingProps,
    e = d.revealOrder,
    f = d.tail;
  Yi(a, b, d.children, c);
  d = M$1.current;
  if (0 !== (d & 2)) d = d & 1 | 2, b.flags |= 128;else {
    if (null !== a && 0 !== (a.flags & 128)) a: for (a = b.child; null !== a;) {
      if (13 === a.tag) null !== a.memoizedState && wj(a, c, b);else if (19 === a.tag) wj(a, c, b);else if (null !== a.child) {
        a.child.return = a;
        a = a.child;
        continue;
      }
      if (a === b) break a;
      for (; null === a.sibling;) {
        if (null === a.return || a.return === b) break a;
        a = a.return;
      }
      a.sibling.return = a.return;
      a = a.sibling;
    }
    d &= 1;
  }
  G$2(M$1, d);
  if (0 === (b.mode & 1)) b.memoizedState = null;else switch (e) {
    case "forwards":
      c = b.child;
      for (e = null; null !== c;) a = c.alternate, null !== a && null === Mh(a) && (e = c), c = c.sibling;
      c = e;
      null === c ? (e = b.child, b.child = null) : (e = c.sibling, c.sibling = null);
      xj(b, !1, e, c, f);
      break;
    case "backwards":
      c = null;
      e = b.child;
      for (b.child = null; null !== e;) {
        a = e.alternate;
        if (null !== a && null === Mh(a)) {
          b.child = e;
          break;
        }
        a = e.sibling;
        e.sibling = c;
        c = e;
        e = a;
      }
      xj(b, !0, c, null, f);
      break;
    case "together":
      xj(b, !1, null, null, void 0);
      break;
    default:
      b.memoizedState = null;
  }
  return b.child;
}
function jj(a, b) {
  0 === (b.mode & 1) && null !== a && (a.alternate = null, b.alternate = null, b.flags |= 2);
}
function $i(a, b, c) {
  null !== a && (b.dependencies = a.dependencies);
  hh |= b.lanes;
  if (0 === (c & b.childLanes)) return null;
  if (null !== a && b.child !== a.child) throw Error(p$2(153));
  if (null !== b.child) {
    a = b.child;
    c = wh(a, a.pendingProps);
    b.child = c;
    for (c.return = b; null !== a.sibling;) a = a.sibling, c = c.sibling = wh(a, a.pendingProps), c.return = b;
    c.sibling = null;
  }
  return b.child;
}
function zj(a, b, c) {
  switch (b.tag) {
    case 3:
      lj(b);
      Ig();
      break;
    case 5:
      Kh(b);
      break;
    case 1:
      Zf(b.type) && cg(b);
      break;
    case 4:
      Ih(b, b.stateNode.containerInfo);
      break;
    case 10:
      var d = b.type._context,
        e = b.memoizedProps.value;
      G$2(Mg, d._currentValue);
      d._currentValue = e;
      break;
    case 13:
      d = b.memoizedState;
      if (null !== d) {
        if (null !== d.dehydrated) return G$2(M$1, M$1.current & 1), b.flags |= 128, null;
        if (0 !== (c & b.child.childLanes)) return pj(a, b, c);
        G$2(M$1, M$1.current & 1);
        a = $i(a, b, c);
        return null !== a ? a.sibling : null;
      }
      G$2(M$1, M$1.current & 1);
      break;
    case 19:
      d = 0 !== (c & b.childLanes);
      if (0 !== (a.flags & 128)) {
        if (d) return yj(a, b, c);
        b.flags |= 128;
      }
      e = b.memoizedState;
      null !== e && (e.rendering = null, e.tail = null, e.lastEffect = null);
      G$2(M$1, M$1.current);
      if (d) break;else return null;
    case 22:
    case 23:
      return b.lanes = 0, ej(a, b, c);
  }
  return $i(a, b, c);
}
var Aj, Bj, Cj, Dj;
Aj = function (a, b) {
  for (var c = b.child; null !== c;) {
    if (5 === c.tag || 6 === c.tag) a.appendChild(c.stateNode);else if (4 !== c.tag && null !== c.child) {
      c.child.return = c;
      c = c.child;
      continue;
    }
    if (c === b) break;
    for (; null === c.sibling;) {
      if (null === c.return || c.return === b) return;
      c = c.return;
    }
    c.sibling.return = c.return;
    c = c.sibling;
  }
};
Bj = function () {};
Cj = function (a, b, c, d) {
  var e = a.memoizedProps;
  if (e !== d) {
    a = b.stateNode;
    Hh(Eh.current);
    var f = null;
    switch (c) {
      case "input":
        e = Ya(a, e);
        d = Ya(a, d);
        f = [];
        break;
      case "select":
        e = A$2({}, e, {
          value: void 0
        });
        d = A$2({}, d, {
          value: void 0
        });
        f = [];
        break;
      case "textarea":
        e = gb(a, e);
        d = gb(a, d);
        f = [];
        break;
      default:
        "function" !== typeof e.onClick && "function" === typeof d.onClick && (a.onclick = Bf);
    }
    ub(c, d);
    var g;
    c = null;
    for (l in e) if (!d.hasOwnProperty(l) && e.hasOwnProperty(l) && null != e[l]) if ("style" === l) {
      var h = e[l];
      for (g in h) h.hasOwnProperty(g) && (c || (c = {}), c[g] = "");
    } else "dangerouslySetInnerHTML" !== l && "children" !== l && "suppressContentEditableWarning" !== l && "suppressHydrationWarning" !== l && "autoFocus" !== l && (ea.hasOwnProperty(l) ? f || (f = []) : (f = f || []).push(l, null));
    for (l in d) {
      var k = d[l];
      h = null != e ? e[l] : void 0;
      if (d.hasOwnProperty(l) && k !== h && (null != k || null != h)) if ("style" === l) {
        if (h) {
          for (g in h) !h.hasOwnProperty(g) || k && k.hasOwnProperty(g) || (c || (c = {}), c[g] = "");
          for (g in k) k.hasOwnProperty(g) && h[g] !== k[g] && (c || (c = {}), c[g] = k[g]);
        } else c || (f || (f = []), f.push(l, c)), c = k;
      } else "dangerouslySetInnerHTML" === l ? (k = k ? k.__html : void 0, h = h ? h.__html : void 0, null != k && h !== k && (f = f || []).push(l, k)) : "children" === l ? "string" !== typeof k && "number" !== typeof k || (f = f || []).push(l, "" + k) : "suppressContentEditableWarning" !== l && "suppressHydrationWarning" !== l && (ea.hasOwnProperty(l) ? (null != k && "onScroll" === l && D$2("scroll", a), f || h === k || (f = [])) : (f = f || []).push(l, k));
    }
    c && (f = f || []).push("style", c);
    var l = f;
    if (b.updateQueue = l) b.flags |= 4;
  }
};
Dj = function (a, b, c, d) {
  c !== d && (b.flags |= 4);
};
function Ej(a, b) {
  if (!I$2) switch (a.tailMode) {
    case "hidden":
      b = a.tail;
      for (var c = null; null !== b;) null !== b.alternate && (c = b), b = b.sibling;
      null === c ? a.tail = null : c.sibling = null;
      break;
    case "collapsed":
      c = a.tail;
      for (var d = null; null !== c;) null !== c.alternate && (d = c), c = c.sibling;
      null === d ? b || null === a.tail ? a.tail = null : a.tail.sibling = null : d.sibling = null;
  }
}
function S$1(a) {
  var b = null !== a.alternate && a.alternate.child === a.child,
    c = 0,
    d = 0;
  if (b) for (var e = a.child; null !== e;) c |= e.lanes | e.childLanes, d |= e.subtreeFlags & 14680064, d |= e.flags & 14680064, e.return = a, e = e.sibling;else for (e = a.child; null !== e;) c |= e.lanes | e.childLanes, d |= e.subtreeFlags, d |= e.flags, e.return = a, e = e.sibling;
  a.subtreeFlags |= d;
  a.childLanes = c;
  return b;
}
function Fj(a, b, c) {
  var d = b.pendingProps;
  wg(b);
  switch (b.tag) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return S$1(b), null;
    case 1:
      return Zf(b.type) && $f(), S$1(b), null;
    case 3:
      d = b.stateNode;
      Jh();
      E$2(Wf);
      E$2(H$2);
      Oh();
      d.pendingContext && (d.context = d.pendingContext, d.pendingContext = null);
      if (null === a || null === a.child) Gg(b) ? b.flags |= 4 : null === a || a.memoizedState.isDehydrated && 0 === (b.flags & 256) || (b.flags |= 1024, null !== zg && (Gj(zg), zg = null));
      Bj(a, b);
      S$1(b);
      return null;
    case 5:
      Lh(b);
      var e = Hh(Gh.current);
      c = b.type;
      if (null !== a && null != b.stateNode) Cj(a, b, c, d, e), a.ref !== b.ref && (b.flags |= 512, b.flags |= 2097152);else {
        if (!d) {
          if (null === b.stateNode) throw Error(p$2(166));
          S$1(b);
          return null;
        }
        a = Hh(Eh.current);
        if (Gg(b)) {
          d = b.stateNode;
          c = b.type;
          var f = b.memoizedProps;
          d[Of] = b;
          d[Pf] = f;
          a = 0 !== (b.mode & 1);
          switch (c) {
            case "dialog":
              D$2("cancel", d);
              D$2("close", d);
              break;
            case "iframe":
            case "object":
            case "embed":
              D$2("load", d);
              break;
            case "video":
            case "audio":
              for (e = 0; e < lf.length; e++) D$2(lf[e], d);
              break;
            case "source":
              D$2("error", d);
              break;
            case "img":
            case "image":
            case "link":
              D$2("error", d);
              D$2("load", d);
              break;
            case "details":
              D$2("toggle", d);
              break;
            case "input":
              Za(d, f);
              D$2("invalid", d);
              break;
            case "select":
              d._wrapperState = {
                wasMultiple: !!f.multiple
              };
              D$2("invalid", d);
              break;
            case "textarea":
              hb(d, f), D$2("invalid", d);
          }
          ub(c, f);
          e = null;
          for (var g in f) if (f.hasOwnProperty(g)) {
            var h = f[g];
            "children" === g ? "string" === typeof h ? d.textContent !== h && (!0 !== f.suppressHydrationWarning && Af(d.textContent, h, a), e = ["children", h]) : "number" === typeof h && d.textContent !== "" + h && (!0 !== f.suppressHydrationWarning && Af(d.textContent, h, a), e = ["children", "" + h]) : ea.hasOwnProperty(g) && null != h && "onScroll" === g && D$2("scroll", d);
          }
          switch (c) {
            case "input":
              Va(d);
              db(d, f, !0);
              break;
            case "textarea":
              Va(d);
              jb(d);
              break;
            case "select":
            case "option":
              break;
            default:
              "function" === typeof f.onClick && (d.onclick = Bf);
          }
          d = e;
          b.updateQueue = d;
          null !== d && (b.flags |= 4);
        } else {
          g = 9 === e.nodeType ? e : e.ownerDocument;
          "http://www.w3.org/1999/xhtml" === a && (a = kb(c));
          "http://www.w3.org/1999/xhtml" === a ? "script" === c ? (a = g.createElement("div"), a.innerHTML = "<script>\x3c/script>", a = a.removeChild(a.firstChild)) : "string" === typeof d.is ? a = g.createElement(c, {
            is: d.is
          }) : (a = g.createElement(c), "select" === c && (g = a, d.multiple ? g.multiple = !0 : d.size && (g.size = d.size))) : a = g.createElementNS(a, c);
          a[Of] = b;
          a[Pf] = d;
          Aj(a, b, !1, !1);
          b.stateNode = a;
          a: {
            g = vb(c, d);
            switch (c) {
              case "dialog":
                D$2("cancel", a);
                D$2("close", a);
                e = d;
                break;
              case "iframe":
              case "object":
              case "embed":
                D$2("load", a);
                e = d;
                break;
              case "video":
              case "audio":
                for (e = 0; e < lf.length; e++) D$2(lf[e], a);
                e = d;
                break;
              case "source":
                D$2("error", a);
                e = d;
                break;
              case "img":
              case "image":
              case "link":
                D$2("error", a);
                D$2("load", a);
                e = d;
                break;
              case "details":
                D$2("toggle", a);
                e = d;
                break;
              case "input":
                Za(a, d);
                e = Ya(a, d);
                D$2("invalid", a);
                break;
              case "option":
                e = d;
                break;
              case "select":
                a._wrapperState = {
                  wasMultiple: !!d.multiple
                };
                e = A$2({}, d, {
                  value: void 0
                });
                D$2("invalid", a);
                break;
              case "textarea":
                hb(a, d);
                e = gb(a, d);
                D$2("invalid", a);
                break;
              default:
                e = d;
            }
            ub(c, e);
            h = e;
            for (f in h) if (h.hasOwnProperty(f)) {
              var k = h[f];
              "style" === f ? sb(a, k) : "dangerouslySetInnerHTML" === f ? (k = k ? k.__html : void 0, null != k && nb(a, k)) : "children" === f ? "string" === typeof k ? ("textarea" !== c || "" !== k) && ob(a, k) : "number" === typeof k && ob(a, "" + k) : "suppressContentEditableWarning" !== f && "suppressHydrationWarning" !== f && "autoFocus" !== f && (ea.hasOwnProperty(f) ? null != k && "onScroll" === f && D$2("scroll", a) : null != k && ta(a, f, k, g));
            }
            switch (c) {
              case "input":
                Va(a);
                db(a, d, !1);
                break;
              case "textarea":
                Va(a);
                jb(a);
                break;
              case "option":
                null != d.value && a.setAttribute("value", "" + Sa(d.value));
                break;
              case "select":
                a.multiple = !!d.multiple;
                f = d.value;
                null != f ? fb(a, !!d.multiple, f, !1) : null != d.defaultValue && fb(a, !!d.multiple, d.defaultValue, !0);
                break;
              default:
                "function" === typeof e.onClick && (a.onclick = Bf);
            }
            switch (c) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                d = !!d.autoFocus;
                break a;
              case "img":
                d = !0;
                break a;
              default:
                d = !1;
            }
          }
          d && (b.flags |= 4);
        }
        null !== b.ref && (b.flags |= 512, b.flags |= 2097152);
      }
      S$1(b);
      return null;
    case 6:
      if (a && null != b.stateNode) Dj(a, b, a.memoizedProps, d);else {
        if ("string" !== typeof d && null === b.stateNode) throw Error(p$2(166));
        c = Hh(Gh.current);
        Hh(Eh.current);
        if (Gg(b)) {
          d = b.stateNode;
          c = b.memoizedProps;
          d[Of] = b;
          if (f = d.nodeValue !== c) if (a = xg, null !== a) switch (a.tag) {
            case 3:
              Af(d.nodeValue, c, 0 !== (a.mode & 1));
              break;
            case 5:
              !0 !== a.memoizedProps.suppressHydrationWarning && Af(d.nodeValue, c, 0 !== (a.mode & 1));
          }
          f && (b.flags |= 4);
        } else d = (9 === c.nodeType ? c : c.ownerDocument).createTextNode(d), d[Of] = b, b.stateNode = d;
      }
      S$1(b);
      return null;
    case 13:
      E$2(M$1);
      d = b.memoizedState;
      if (null === a || null !== a.memoizedState && null !== a.memoizedState.dehydrated) {
        if (I$2 && null !== yg && 0 !== (b.mode & 1) && 0 === (b.flags & 128)) Hg(), Ig(), b.flags |= 98560, f = !1;else if (f = Gg(b), null !== d && null !== d.dehydrated) {
          if (null === a) {
            if (!f) throw Error(p$2(318));
            f = b.memoizedState;
            f = null !== f ? f.dehydrated : null;
            if (!f) throw Error(p$2(317));
            f[Of] = b;
          } else Ig(), 0 === (b.flags & 128) && (b.memoizedState = null), b.flags |= 4;
          S$1(b);
          f = !1;
        } else null !== zg && (Gj(zg), zg = null), f = !0;
        if (!f) return b.flags & 65536 ? b : null;
      }
      if (0 !== (b.flags & 128)) return b.lanes = c, b;
      d = null !== d;
      d !== (null !== a && null !== a.memoizedState) && d && (b.child.flags |= 8192, 0 !== (b.mode & 1) && (null === a || 0 !== (M$1.current & 1) ? 0 === T$1 && (T$1 = 3) : uj()));
      null !== b.updateQueue && (b.flags |= 4);
      S$1(b);
      return null;
    case 4:
      return Jh(), Bj(a, b), null === a && sf(b.stateNode.containerInfo), S$1(b), null;
    case 10:
      return Rg(b.type._context), S$1(b), null;
    case 17:
      return Zf(b.type) && $f(), S$1(b), null;
    case 19:
      E$2(M$1);
      f = b.memoizedState;
      if (null === f) return S$1(b), null;
      d = 0 !== (b.flags & 128);
      g = f.rendering;
      if (null === g) {
        if (d) Ej(f, !1);else {
          if (0 !== T$1 || null !== a && 0 !== (a.flags & 128)) for (a = b.child; null !== a;) {
            g = Mh(a);
            if (null !== g) {
              b.flags |= 128;
              Ej(f, !1);
              d = g.updateQueue;
              null !== d && (b.updateQueue = d, b.flags |= 4);
              b.subtreeFlags = 0;
              d = c;
              for (c = b.child; null !== c;) f = c, a = d, f.flags &= 14680066, g = f.alternate, null === g ? (f.childLanes = 0, f.lanes = a, f.child = null, f.subtreeFlags = 0, f.memoizedProps = null, f.memoizedState = null, f.updateQueue = null, f.dependencies = null, f.stateNode = null) : (f.childLanes = g.childLanes, f.lanes = g.lanes, f.child = g.child, f.subtreeFlags = 0, f.deletions = null, f.memoizedProps = g.memoizedProps, f.memoizedState = g.memoizedState, f.updateQueue = g.updateQueue, f.type = g.type, a = g.dependencies, f.dependencies = null === a ? null : {
                lanes: a.lanes,
                firstContext: a.firstContext
              }), c = c.sibling;
              G$2(M$1, M$1.current & 1 | 2);
              return b.child;
            }
            a = a.sibling;
          }
          null !== f.tail && B$2() > Hj && (b.flags |= 128, d = !0, Ej(f, !1), b.lanes = 4194304);
        }
      } else {
        if (!d) if (a = Mh(g), null !== a) {
          if (b.flags |= 128, d = !0, c = a.updateQueue, null !== c && (b.updateQueue = c, b.flags |= 4), Ej(f, !0), null === f.tail && "hidden" === f.tailMode && !g.alternate && !I$2) return S$1(b), null;
        } else 2 * B$2() - f.renderingStartTime > Hj && 1073741824 !== c && (b.flags |= 128, d = !0, Ej(f, !1), b.lanes = 4194304);
        f.isBackwards ? (g.sibling = b.child, b.child = g) : (c = f.last, null !== c ? c.sibling = g : b.child = g, f.last = g);
      }
      if (null !== f.tail) return b = f.tail, f.rendering = b, f.tail = b.sibling, f.renderingStartTime = B$2(), b.sibling = null, c = M$1.current, G$2(M$1, d ? c & 1 | 2 : c & 1), b;
      S$1(b);
      return null;
    case 22:
    case 23:
      return Ij(), d = null !== b.memoizedState, null !== a && null !== a.memoizedState !== d && (b.flags |= 8192), d && 0 !== (b.mode & 1) ? 0 !== (gj & 1073741824) && (S$1(b), b.subtreeFlags & 6 && (b.flags |= 8192)) : S$1(b), null;
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(p$2(156, b.tag));
}
function Jj(a, b) {
  wg(b);
  switch (b.tag) {
    case 1:
      return Zf(b.type) && $f(), a = b.flags, a & 65536 ? (b.flags = a & -65537 | 128, b) : null;
    case 3:
      return Jh(), E$2(Wf), E$2(H$2), Oh(), a = b.flags, 0 !== (a & 65536) && 0 === (a & 128) ? (b.flags = a & -65537 | 128, b) : null;
    case 5:
      return Lh(b), null;
    case 13:
      E$2(M$1);
      a = b.memoizedState;
      if (null !== a && null !== a.dehydrated) {
        if (null === b.alternate) throw Error(p$2(340));
        Ig();
      }
      a = b.flags;
      return a & 65536 ? (b.flags = a & -65537 | 128, b) : null;
    case 19:
      return E$2(M$1), null;
    case 4:
      return Jh(), null;
    case 10:
      return Rg(b.type._context), null;
    case 22:
    case 23:
      return Ij(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var Kj = !1,
  U$1 = !1,
  Lj = "function" === typeof WeakSet ? WeakSet : Set,
  V$1 = null;
function Mj(a, b) {
  var c = a.ref;
  if (null !== c) if ("function" === typeof c) try {
    c(null);
  } catch (d) {
    W$1(a, b, d);
  } else c.current = null;
}
function Nj(a, b, c) {
  try {
    c();
  } catch (d) {
    W$1(a, b, d);
  }
}
var Oj = !1;
function Pj(a, b) {
  Cf = dd;
  a = Me$1();
  if (Ne$1(a)) {
    if ("selectionStart" in a) var c = {
      start: a.selectionStart,
      end: a.selectionEnd
    };else a: {
      c = (c = a.ownerDocument) && c.defaultView || window;
      var d = c.getSelection && c.getSelection();
      if (d && 0 !== d.rangeCount) {
        c = d.anchorNode;
        var e = d.anchorOffset,
          f = d.focusNode;
        d = d.focusOffset;
        try {
          c.nodeType, f.nodeType;
        } catch (F) {
          c = null;
          break a;
        }
        var g = 0,
          h = -1,
          k = -1,
          l = 0,
          m = 0,
          q = a,
          r = null;
        b: for (;;) {
          for (var y;;) {
            q !== c || 0 !== e && 3 !== q.nodeType || (h = g + e);
            q !== f || 0 !== d && 3 !== q.nodeType || (k = g + d);
            3 === q.nodeType && (g += q.nodeValue.length);
            if (null === (y = q.firstChild)) break;
            r = q;
            q = y;
          }
          for (;;) {
            if (q === a) break b;
            r === c && ++l === e && (h = g);
            r === f && ++m === d && (k = g);
            if (null !== (y = q.nextSibling)) break;
            q = r;
            r = q.parentNode;
          }
          q = y;
        }
        c = -1 === h || -1 === k ? null : {
          start: h,
          end: k
        };
      } else c = null;
    }
    c = c || {
      start: 0,
      end: 0
    };
  } else c = null;
  Df = {
    focusedElem: a,
    selectionRange: c
  };
  dd = !1;
  for (V$1 = b; null !== V$1;) if (b = V$1, a = b.child, 0 !== (b.subtreeFlags & 1028) && null !== a) a.return = b, V$1 = a;else for (; null !== V$1;) {
    b = V$1;
    try {
      var n = b.alternate;
      if (0 !== (b.flags & 1024)) switch (b.tag) {
        case 0:
        case 11:
        case 15:
          break;
        case 1:
          if (null !== n) {
            var t = n.memoizedProps,
              J = n.memoizedState,
              x = b.stateNode,
              w = x.getSnapshotBeforeUpdate(b.elementType === b.type ? t : Lg(b.type, t), J);
            x.__reactInternalSnapshotBeforeUpdate = w;
          }
          break;
        case 3:
          var u = b.stateNode.containerInfo;
          1 === u.nodeType ? u.textContent = "" : 9 === u.nodeType && u.documentElement && u.removeChild(u.documentElement);
          break;
        case 5:
        case 6:
        case 4:
        case 17:
          break;
        default:
          throw Error(p$2(163));
      }
    } catch (F) {
      W$1(b, b.return, F);
    }
    a = b.sibling;
    if (null !== a) {
      a.return = b.return;
      V$1 = a;
      break;
    }
    V$1 = b.return;
  }
  n = Oj;
  Oj = !1;
  return n;
}
function Qj(a, b, c) {
  var d = b.updateQueue;
  d = null !== d ? d.lastEffect : null;
  if (null !== d) {
    var e = d = d.next;
    do {
      if ((e.tag & a) === a) {
        var f = e.destroy;
        e.destroy = void 0;
        void 0 !== f && Nj(b, c, f);
      }
      e = e.next;
    } while (e !== d);
  }
}
function Rj(a, b) {
  b = b.updateQueue;
  b = null !== b ? b.lastEffect : null;
  if (null !== b) {
    var c = b = b.next;
    do {
      if ((c.tag & a) === a) {
        var d = c.create;
        c.destroy = d();
      }
      c = c.next;
    } while (c !== b);
  }
}
function Sj(a) {
  var b = a.ref;
  if (null !== b) {
    var c = a.stateNode;
    switch (a.tag) {
      case 5:
        a = c;
        break;
      default:
        a = c;
    }
    "function" === typeof b ? b(a) : b.current = a;
  }
}
function Tj(a) {
  var b = a.alternate;
  null !== b && (a.alternate = null, Tj(b));
  a.child = null;
  a.deletions = null;
  a.sibling = null;
  5 === a.tag && (b = a.stateNode, null !== b && (delete b[Of], delete b[Pf], delete b[of], delete b[Qf], delete b[Rf]));
  a.stateNode = null;
  a.return = null;
  a.dependencies = null;
  a.memoizedProps = null;
  a.memoizedState = null;
  a.pendingProps = null;
  a.stateNode = null;
  a.updateQueue = null;
}
function Uj(a) {
  return 5 === a.tag || 3 === a.tag || 4 === a.tag;
}
function Vj(a) {
  a: for (;;) {
    for (; null === a.sibling;) {
      if (null === a.return || Uj(a.return)) return null;
      a = a.return;
    }
    a.sibling.return = a.return;
    for (a = a.sibling; 5 !== a.tag && 6 !== a.tag && 18 !== a.tag;) {
      if (a.flags & 2) continue a;
      if (null === a.child || 4 === a.tag) continue a;else a.child.return = a, a = a.child;
    }
    if (!(a.flags & 2)) return a.stateNode;
  }
}
function Wj(a, b, c) {
  var d = a.tag;
  if (5 === d || 6 === d) a = a.stateNode, b ? 8 === c.nodeType ? c.parentNode.insertBefore(a, b) : c.insertBefore(a, b) : (8 === c.nodeType ? (b = c.parentNode, b.insertBefore(a, c)) : (b = c, b.appendChild(a)), c = c._reactRootContainer, null !== c && void 0 !== c || null !== b.onclick || (b.onclick = Bf));else if (4 !== d && (a = a.child, null !== a)) for (Wj(a, b, c), a = a.sibling; null !== a;) Wj(a, b, c), a = a.sibling;
}
function Xj(a, b, c) {
  var d = a.tag;
  if (5 === d || 6 === d) a = a.stateNode, b ? c.insertBefore(a, b) : c.appendChild(a);else if (4 !== d && (a = a.child, null !== a)) for (Xj(a, b, c), a = a.sibling; null !== a;) Xj(a, b, c), a = a.sibling;
}
var X$1 = null,
  Yj = !1;
function Zj(a, b, c) {
  for (c = c.child; null !== c;) ak(a, b, c), c = c.sibling;
}
function ak(a, b, c) {
  if (lc && "function" === typeof lc.onCommitFiberUnmount) try {
    lc.onCommitFiberUnmount(kc, c);
  } catch (h) {}
  switch (c.tag) {
    case 5:
      U$1 || Mj(c, b);
    case 6:
      var d = X$1,
        e = Yj;
      X$1 = null;
      Zj(a, b, c);
      X$1 = d;
      Yj = e;
      null !== X$1 && (Yj ? (a = X$1, c = c.stateNode, 8 === a.nodeType ? a.parentNode.removeChild(c) : a.removeChild(c)) : X$1.removeChild(c.stateNode));
      break;
    case 18:
      null !== X$1 && (Yj ? (a = X$1, c = c.stateNode, 8 === a.nodeType ? Kf(a.parentNode, c) : 1 === a.nodeType && Kf(a, c), bd(a)) : Kf(X$1, c.stateNode));
      break;
    case 4:
      d = X$1;
      e = Yj;
      X$1 = c.stateNode.containerInfo;
      Yj = !0;
      Zj(a, b, c);
      X$1 = d;
      Yj = e;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (!U$1 && (d = c.updateQueue, null !== d && (d = d.lastEffect, null !== d))) {
        e = d = d.next;
        do {
          var f = e,
            g = f.destroy;
          f = f.tag;
          void 0 !== g && (0 !== (f & 2) ? Nj(c, b, g) : 0 !== (f & 4) && Nj(c, b, g));
          e = e.next;
        } while (e !== d);
      }
      Zj(a, b, c);
      break;
    case 1:
      if (!U$1 && (Mj(c, b), d = c.stateNode, "function" === typeof d.componentWillUnmount)) try {
        d.props = c.memoizedProps, d.state = c.memoizedState, d.componentWillUnmount();
      } catch (h) {
        W$1(c, b, h);
      }
      Zj(a, b, c);
      break;
    case 21:
      Zj(a, b, c);
      break;
    case 22:
      c.mode & 1 ? (U$1 = (d = U$1) || null !== c.memoizedState, Zj(a, b, c), U$1 = d) : Zj(a, b, c);
      break;
    default:
      Zj(a, b, c);
  }
}
function bk(a) {
  var b = a.updateQueue;
  if (null !== b) {
    a.updateQueue = null;
    var c = a.stateNode;
    null === c && (c = a.stateNode = new Lj());
    b.forEach(function (b) {
      var d = ck.bind(null, a, b);
      c.has(b) || (c.add(b), b.then(d, d));
    });
  }
}
function dk(a, b) {
  var c = b.deletions;
  if (null !== c) for (var d = 0; d < c.length; d++) {
    var e = c[d];
    try {
      var f = a,
        g = b,
        h = g;
      a: for (; null !== h;) {
        switch (h.tag) {
          case 5:
            X$1 = h.stateNode;
            Yj = !1;
            break a;
          case 3:
            X$1 = h.stateNode.containerInfo;
            Yj = !0;
            break a;
          case 4:
            X$1 = h.stateNode.containerInfo;
            Yj = !0;
            break a;
        }
        h = h.return;
      }
      if (null === X$1) throw Error(p$2(160));
      ak(f, g, e);
      X$1 = null;
      Yj = !1;
      var k = e.alternate;
      null !== k && (k.return = null);
      e.return = null;
    } catch (l) {
      W$1(e, b, l);
    }
  }
  if (b.subtreeFlags & 12854) for (b = b.child; null !== b;) ek(b, a), b = b.sibling;
}
function ek(a, b) {
  var c = a.alternate,
    d = a.flags;
  switch (a.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      dk(b, a);
      fk(a);
      if (d & 4) {
        try {
          Qj(3, a, a.return), Rj(3, a);
        } catch (t) {
          W$1(a, a.return, t);
        }
        try {
          Qj(5, a, a.return);
        } catch (t) {
          W$1(a, a.return, t);
        }
      }
      break;
    case 1:
      dk(b, a);
      fk(a);
      d & 512 && null !== c && Mj(c, c.return);
      break;
    case 5:
      dk(b, a);
      fk(a);
      d & 512 && null !== c && Mj(c, c.return);
      if (a.flags & 32) {
        var e = a.stateNode;
        try {
          ob(e, "");
        } catch (t) {
          W$1(a, a.return, t);
        }
      }
      if (d & 4 && (e = a.stateNode, null != e)) {
        var f = a.memoizedProps,
          g = null !== c ? c.memoizedProps : f,
          h = a.type,
          k = a.updateQueue;
        a.updateQueue = null;
        if (null !== k) try {
          "input" === h && "radio" === f.type && null != f.name && ab(e, f);
          vb(h, g);
          var l = vb(h, f);
          for (g = 0; g < k.length; g += 2) {
            var m = k[g],
              q = k[g + 1];
            "style" === m ? sb(e, q) : "dangerouslySetInnerHTML" === m ? nb(e, q) : "children" === m ? ob(e, q) : ta(e, m, q, l);
          }
          switch (h) {
            case "input":
              bb(e, f);
              break;
            case "textarea":
              ib(e, f);
              break;
            case "select":
              var r = e._wrapperState.wasMultiple;
              e._wrapperState.wasMultiple = !!f.multiple;
              var y = f.value;
              null != y ? fb(e, !!f.multiple, y, !1) : r !== !!f.multiple && (null != f.defaultValue ? fb(e, !!f.multiple, f.defaultValue, !0) : fb(e, !!f.multiple, f.multiple ? [] : "", !1));
          }
          e[Pf] = f;
        } catch (t) {
          W$1(a, a.return, t);
        }
      }
      break;
    case 6:
      dk(b, a);
      fk(a);
      if (d & 4) {
        if (null === a.stateNode) throw Error(p$2(162));
        e = a.stateNode;
        f = a.memoizedProps;
        try {
          e.nodeValue = f;
        } catch (t) {
          W$1(a, a.return, t);
        }
      }
      break;
    case 3:
      dk(b, a);
      fk(a);
      if (d & 4 && null !== c && c.memoizedState.isDehydrated) try {
        bd(b.containerInfo);
      } catch (t) {
        W$1(a, a.return, t);
      }
      break;
    case 4:
      dk(b, a);
      fk(a);
      break;
    case 13:
      dk(b, a);
      fk(a);
      e = a.child;
      e.flags & 8192 && (f = null !== e.memoizedState, e.stateNode.isHidden = f, !f || null !== e.alternate && null !== e.alternate.memoizedState || (gk = B$2()));
      d & 4 && bk(a);
      break;
    case 22:
      m = null !== c && null !== c.memoizedState;
      a.mode & 1 ? (U$1 = (l = U$1) || m, dk(b, a), U$1 = l) : dk(b, a);
      fk(a);
      if (d & 8192) {
        l = null !== a.memoizedState;
        if ((a.stateNode.isHidden = l) && !m && 0 !== (a.mode & 1)) for (V$1 = a, m = a.child; null !== m;) {
          for (q = V$1 = m; null !== V$1;) {
            r = V$1;
            y = r.child;
            switch (r.tag) {
              case 0:
              case 11:
              case 14:
              case 15:
                Qj(4, r, r.return);
                break;
              case 1:
                Mj(r, r.return);
                var n = r.stateNode;
                if ("function" === typeof n.componentWillUnmount) {
                  d = r;
                  c = r.return;
                  try {
                    b = d, n.props = b.memoizedProps, n.state = b.memoizedState, n.componentWillUnmount();
                  } catch (t) {
                    W$1(d, c, t);
                  }
                }
                break;
              case 5:
                Mj(r, r.return);
                break;
              case 22:
                if (null !== r.memoizedState) {
                  hk(q);
                  continue;
                }
            }
            null !== y ? (y.return = r, V$1 = y) : hk(q);
          }
          m = m.sibling;
        }
        a: for (m = null, q = a;;) {
          if (5 === q.tag) {
            if (null === m) {
              m = q;
              try {
                e = q.stateNode, l ? (f = e.style, "function" === typeof f.setProperty ? f.setProperty("display", "none", "important") : f.display = "none") : (h = q.stateNode, k = q.memoizedProps.style, g = void 0 !== k && null !== k && k.hasOwnProperty("display") ? k.display : null, h.style.display = rb("display", g));
              } catch (t) {
                W$1(a, a.return, t);
              }
            }
          } else if (6 === q.tag) {
            if (null === m) try {
              q.stateNode.nodeValue = l ? "" : q.memoizedProps;
            } catch (t) {
              W$1(a, a.return, t);
            }
          } else if ((22 !== q.tag && 23 !== q.tag || null === q.memoizedState || q === a) && null !== q.child) {
            q.child.return = q;
            q = q.child;
            continue;
          }
          if (q === a) break a;
          for (; null === q.sibling;) {
            if (null === q.return || q.return === a) break a;
            m === q && (m = null);
            q = q.return;
          }
          m === q && (m = null);
          q.sibling.return = q.return;
          q = q.sibling;
        }
      }
      break;
    case 19:
      dk(b, a);
      fk(a);
      d & 4 && bk(a);
      break;
    case 21:
      break;
    default:
      dk(b, a), fk(a);
  }
}
function fk(a) {
  var b = a.flags;
  if (b & 2) {
    try {
      a: {
        for (var c = a.return; null !== c;) {
          if (Uj(c)) {
            var d = c;
            break a;
          }
          c = c.return;
        }
        throw Error(p$2(160));
      }
      switch (d.tag) {
        case 5:
          var e = d.stateNode;
          d.flags & 32 && (ob(e, ""), d.flags &= -33);
          var f = Vj(a);
          Xj(a, f, e);
          break;
        case 3:
        case 4:
          var g = d.stateNode.containerInfo,
            h = Vj(a);
          Wj(a, h, g);
          break;
        default:
          throw Error(p$2(161));
      }
    } catch (k) {
      W$1(a, a.return, k);
    }
    a.flags &= -3;
  }
  b & 4096 && (a.flags &= -4097);
}
function ik(a, b, c) {
  V$1 = a;
  jk(a);
}
function jk(a, b, c) {
  for (var d = 0 !== (a.mode & 1); null !== V$1;) {
    var e = V$1,
      f = e.child;
    if (22 === e.tag && d) {
      var g = null !== e.memoizedState || Kj;
      if (!g) {
        var h = e.alternate,
          k = null !== h && null !== h.memoizedState || U$1;
        h = Kj;
        var l = U$1;
        Kj = g;
        if ((U$1 = k) && !l) for (V$1 = e; null !== V$1;) g = V$1, k = g.child, 22 === g.tag && null !== g.memoizedState ? kk(e) : null !== k ? (k.return = g, V$1 = k) : kk(e);
        for (; null !== f;) V$1 = f, jk(f), f = f.sibling;
        V$1 = e;
        Kj = h;
        U$1 = l;
      }
      lk(a);
    } else 0 !== (e.subtreeFlags & 8772) && null !== f ? (f.return = e, V$1 = f) : lk(a);
  }
}
function lk(a) {
  for (; null !== V$1;) {
    var b = V$1;
    if (0 !== (b.flags & 8772)) {
      var c = b.alternate;
      try {
        if (0 !== (b.flags & 8772)) switch (b.tag) {
          case 0:
          case 11:
          case 15:
            U$1 || Rj(5, b);
            break;
          case 1:
            var d = b.stateNode;
            if (b.flags & 4 && !U$1) if (null === c) d.componentDidMount();else {
              var e = b.elementType === b.type ? c.memoizedProps : Lg(b.type, c.memoizedProps);
              d.componentDidUpdate(e, c.memoizedState, d.__reactInternalSnapshotBeforeUpdate);
            }
            var f = b.updateQueue;
            null !== f && ih(b, f, d);
            break;
          case 3:
            var g = b.updateQueue;
            if (null !== g) {
              c = null;
              if (null !== b.child) switch (b.child.tag) {
                case 5:
                  c = b.child.stateNode;
                  break;
                case 1:
                  c = b.child.stateNode;
              }
              ih(b, g, c);
            }
            break;
          case 5:
            var h = b.stateNode;
            if (null === c && b.flags & 4) {
              c = h;
              var k = b.memoizedProps;
              switch (b.type) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  k.autoFocus && c.focus();
                  break;
                case "img":
                  k.src && (c.src = k.src);
              }
            }
            break;
          case 6:
            break;
          case 4:
            break;
          case 12:
            break;
          case 13:
            if (null === b.memoizedState) {
              var l = b.alternate;
              if (null !== l) {
                var m = l.memoizedState;
                if (null !== m) {
                  var q = m.dehydrated;
                  null !== q && bd(q);
                }
              }
            }
            break;
          case 19:
          case 17:
          case 21:
          case 22:
          case 23:
          case 25:
            break;
          default:
            throw Error(p$2(163));
        }
        U$1 || b.flags & 512 && Sj(b);
      } catch (r) {
        W$1(b, b.return, r);
      }
    }
    if (b === a) {
      V$1 = null;
      break;
    }
    c = b.sibling;
    if (null !== c) {
      c.return = b.return;
      V$1 = c;
      break;
    }
    V$1 = b.return;
  }
}
function hk(a) {
  for (; null !== V$1;) {
    var b = V$1;
    if (b === a) {
      V$1 = null;
      break;
    }
    var c = b.sibling;
    if (null !== c) {
      c.return = b.return;
      V$1 = c;
      break;
    }
    V$1 = b.return;
  }
}
function kk(a) {
  for (; null !== V$1;) {
    var b = V$1;
    try {
      switch (b.tag) {
        case 0:
        case 11:
        case 15:
          var c = b.return;
          try {
            Rj(4, b);
          } catch (k) {
            W$1(b, c, k);
          }
          break;
        case 1:
          var d = b.stateNode;
          if ("function" === typeof d.componentDidMount) {
            var e = b.return;
            try {
              d.componentDidMount();
            } catch (k) {
              W$1(b, e, k);
            }
          }
          var f = b.return;
          try {
            Sj(b);
          } catch (k) {
            W$1(b, f, k);
          }
          break;
        case 5:
          var g = b.return;
          try {
            Sj(b);
          } catch (k) {
            W$1(b, g, k);
          }
      }
    } catch (k) {
      W$1(b, b.return, k);
    }
    if (b === a) {
      V$1 = null;
      break;
    }
    var h = b.sibling;
    if (null !== h) {
      h.return = b.return;
      V$1 = h;
      break;
    }
    V$1 = b.return;
  }
}
var mk = Math.ceil,
  nk = ua.ReactCurrentDispatcher,
  ok = ua.ReactCurrentOwner,
  pk = ua.ReactCurrentBatchConfig,
  K$1 = 0,
  R = null,
  Y$1 = null,
  Z$1 = 0,
  gj = 0,
  fj = Uf(0),
  T$1 = 0,
  qk = null,
  hh = 0,
  rk = 0,
  sk = 0,
  tk = null,
  uk = null,
  gk = 0,
  Hj = Infinity,
  vk = null,
  Pi = !1,
  Qi = null,
  Si = null,
  wk = !1,
  xk = null,
  yk = 0,
  zk = 0,
  Ak = null,
  Bk = -1,
  Ck = 0;
function L$1() {
  return 0 !== (K$1 & 6) ? B$2() : -1 !== Bk ? Bk : Bk = B$2();
}
function lh(a) {
  if (0 === (a.mode & 1)) return 1;
  if (0 !== (K$1 & 2) && 0 !== Z$1) return Z$1 & -Z$1;
  if (null !== Kg.transition) return 0 === Ck && (Ck = yc()), Ck;
  a = C$2;
  if (0 !== a) return a;
  a = window.event;
  a = void 0 === a ? 16 : jd(a.type);
  return a;
}
function mh(a, b, c, d) {
  if (50 < zk) throw zk = 0, Ak = null, Error(p$2(185));
  Ac(a, c, d);
  if (0 === (K$1 & 2) || a !== R) a === R && (0 === (K$1 & 2) && (rk |= c), 4 === T$1 && Dk(a, Z$1)), Ek(a, d), 1 === c && 0 === K$1 && 0 === (b.mode & 1) && (Hj = B$2() + 500, fg && jg());
}
function Ek(a, b) {
  var c = a.callbackNode;
  wc(a, b);
  var d = uc(a, a === R ? Z$1 : 0);
  if (0 === d) null !== c && bc(c), a.callbackNode = null, a.callbackPriority = 0;else if (b = d & -d, a.callbackPriority !== b) {
    null != c && bc(c);
    if (1 === b) 0 === a.tag ? ig(Fk.bind(null, a)) : hg(Fk.bind(null, a)), Jf(function () {
      0 === (K$1 & 6) && jg();
    }), c = null;else {
      switch (Dc(d)) {
        case 1:
          c = fc;
          break;
        case 4:
          c = gc;
          break;
        case 16:
          c = hc;
          break;
        case 536870912:
          c = jc;
          break;
        default:
          c = hc;
      }
      c = Gk(c, Hk.bind(null, a));
    }
    a.callbackPriority = b;
    a.callbackNode = c;
  }
}
function Hk(a, b) {
  Bk = -1;
  Ck = 0;
  if (0 !== (K$1 & 6)) throw Error(p$2(327));
  var c = a.callbackNode;
  if (Ik() && a.callbackNode !== c) return null;
  var d = uc(a, a === R ? Z$1 : 0);
  if (0 === d) return null;
  if (0 !== (d & 30) || 0 !== (d & a.expiredLanes) || b) b = Jk(a, d);else {
    b = d;
    var e = K$1;
    K$1 |= 2;
    var f = Kk();
    if (R !== a || Z$1 !== b) vk = null, Hj = B$2() + 500, Lk(a, b);
    do try {
      Mk();
      break;
    } catch (h) {
      Nk(a, h);
    } while (1);
    Qg();
    nk.current = f;
    K$1 = e;
    null !== Y$1 ? b = 0 : (R = null, Z$1 = 0, b = T$1);
  }
  if (0 !== b) {
    2 === b && (e = xc(a), 0 !== e && (d = e, b = Ok(a, e)));
    if (1 === b) throw c = qk, Lk(a, 0), Dk(a, d), Ek(a, B$2()), c;
    if (6 === b) Dk(a, d);else {
      e = a.current.alternate;
      if (0 === (d & 30) && !Pk(e) && (b = Jk(a, d), 2 === b && (f = xc(a), 0 !== f && (d = f, b = Ok(a, f))), 1 === b)) throw c = qk, Lk(a, 0), Dk(a, d), Ek(a, B$2()), c;
      a.finishedWork = e;
      a.finishedLanes = d;
      switch (b) {
        case 0:
        case 1:
          throw Error(p$2(345));
        case 2:
          Qk(a, uk, vk);
          break;
        case 3:
          Dk(a, d);
          if ((d & 130023424) === d && (b = gk + 500 - B$2(), 10 < b)) {
            if (0 !== uc(a, 0)) break;
            e = a.suspendedLanes;
            if ((e & d) !== d) {
              L$1();
              a.pingedLanes |= a.suspendedLanes & e;
              break;
            }
            a.timeoutHandle = Ff(Qk.bind(null, a, uk, vk), b);
            break;
          }
          Qk(a, uk, vk);
          break;
        case 4:
          Dk(a, d);
          if ((d & 4194240) === d) break;
          b = a.eventTimes;
          for (e = -1; 0 < d;) {
            var g = 31 - oc(d);
            f = 1 << g;
            g = b[g];
            g > e && (e = g);
            d &= ~f;
          }
          d = e;
          d = B$2() - d;
          d = (120 > d ? 120 : 480 > d ? 480 : 1080 > d ? 1080 : 1920 > d ? 1920 : 3E3 > d ? 3E3 : 4320 > d ? 4320 : 1960 * mk(d / 1960)) - d;
          if (10 < d) {
            a.timeoutHandle = Ff(Qk.bind(null, a, uk, vk), d);
            break;
          }
          Qk(a, uk, vk);
          break;
        case 5:
          Qk(a, uk, vk);
          break;
        default:
          throw Error(p$2(329));
      }
    }
  }
  Ek(a, B$2());
  return a.callbackNode === c ? Hk.bind(null, a) : null;
}
function Ok(a, b) {
  var c = tk;
  a.current.memoizedState.isDehydrated && (Lk(a, b).flags |= 256);
  a = Jk(a, b);
  2 !== a && (b = uk, uk = c, null !== b && Gj(b));
  return a;
}
function Gj(a) {
  null === uk ? uk = a : uk.push.apply(uk, a);
}
function Pk(a) {
  for (var b = a;;) {
    if (b.flags & 16384) {
      var c = b.updateQueue;
      if (null !== c && (c = c.stores, null !== c)) for (var d = 0; d < c.length; d++) {
        var e = c[d],
          f = e.getSnapshot;
        e = e.value;
        try {
          if (!He(f(), e)) return !1;
        } catch (g) {
          return !1;
        }
      }
    }
    c = b.child;
    if (b.subtreeFlags & 16384 && null !== c) c.return = b, b = c;else {
      if (b === a) break;
      for (; null === b.sibling;) {
        if (null === b.return || b.return === a) return !0;
        b = b.return;
      }
      b.sibling.return = b.return;
      b = b.sibling;
    }
  }
  return !0;
}
function Dk(a, b) {
  b &= ~sk;
  b &= ~rk;
  a.suspendedLanes |= b;
  a.pingedLanes &= ~b;
  for (a = a.expirationTimes; 0 < b;) {
    var c = 31 - oc(b),
      d = 1 << c;
    a[c] = -1;
    b &= ~d;
  }
}
function Fk(a) {
  if (0 !== (K$1 & 6)) throw Error(p$2(327));
  Ik();
  var b = uc(a, 0);
  if (0 === (b & 1)) return Ek(a, B$2()), null;
  var c = Jk(a, b);
  if (0 !== a.tag && 2 === c) {
    var d = xc(a);
    0 !== d && (b = d, c = Ok(a, d));
  }
  if (1 === c) throw c = qk, Lk(a, 0), Dk(a, b), Ek(a, B$2()), c;
  if (6 === c) throw Error(p$2(345));
  a.finishedWork = a.current.alternate;
  a.finishedLanes = b;
  Qk(a, uk, vk);
  Ek(a, B$2());
  return null;
}
function Rk(a, b) {
  var c = K$1;
  K$1 |= 1;
  try {
    return a(b);
  } finally {
    K$1 = c, 0 === K$1 && (Hj = B$2() + 500, fg && jg());
  }
}
function Sk(a) {
  null !== xk && 0 === xk.tag && 0 === (K$1 & 6) && Ik();
  var b = K$1;
  K$1 |= 1;
  var c = pk.transition,
    d = C$2;
  try {
    if (pk.transition = null, C$2 = 1, a) return a();
  } finally {
    C$2 = d, pk.transition = c, K$1 = b, 0 === (K$1 & 6) && jg();
  }
}
function Ij() {
  gj = fj.current;
  E$2(fj);
}
function Lk(a, b) {
  a.finishedWork = null;
  a.finishedLanes = 0;
  var c = a.timeoutHandle;
  -1 !== c && (a.timeoutHandle = -1, Gf(c));
  if (null !== Y$1) for (c = Y$1.return; null !== c;) {
    var d = c;
    wg(d);
    switch (d.tag) {
      case 1:
        d = d.type.childContextTypes;
        null !== d && void 0 !== d && $f();
        break;
      case 3:
        Jh();
        E$2(Wf);
        E$2(H$2);
        Oh();
        break;
      case 5:
        Lh(d);
        break;
      case 4:
        Jh();
        break;
      case 13:
        E$2(M$1);
        break;
      case 19:
        E$2(M$1);
        break;
      case 10:
        Rg(d.type._context);
        break;
      case 22:
      case 23:
        Ij();
    }
    c = c.return;
  }
  R = a;
  Y$1 = a = wh(a.current, null);
  Z$1 = gj = b;
  T$1 = 0;
  qk = null;
  sk = rk = hh = 0;
  uk = tk = null;
  if (null !== Wg) {
    for (b = 0; b < Wg.length; b++) if (c = Wg[b], d = c.interleaved, null !== d) {
      c.interleaved = null;
      var e = d.next,
        f = c.pending;
      if (null !== f) {
        var g = f.next;
        f.next = e;
        d.next = g;
      }
      c.pending = d;
    }
    Wg = null;
  }
  return a;
}
function Nk(a, b) {
  do {
    var c = Y$1;
    try {
      Qg();
      Ph.current = ai;
      if (Sh) {
        for (var d = N$1.memoizedState; null !== d;) {
          var e = d.queue;
          null !== e && (e.pending = null);
          d = d.next;
        }
        Sh = !1;
      }
      Rh = 0;
      P = O = N$1 = null;
      Th = !1;
      Uh = 0;
      ok.current = null;
      if (null === c || null === c.return) {
        T$1 = 1;
        qk = b;
        Y$1 = null;
        break;
      }
      a: {
        var f = a,
          g = c.return,
          h = c,
          k = b;
        b = Z$1;
        h.flags |= 32768;
        if (null !== k && "object" === typeof k && "function" === typeof k.then) {
          var l = k,
            m = h,
            q = m.tag;
          if (0 === (m.mode & 1) && (0 === q || 11 === q || 15 === q)) {
            var r = m.alternate;
            r ? (m.updateQueue = r.updateQueue, m.memoizedState = r.memoizedState, m.lanes = r.lanes) : (m.updateQueue = null, m.memoizedState = null);
          }
          var y = Vi(g);
          if (null !== y) {
            y.flags &= -257;
            Wi(y, g, h, f, b);
            y.mode & 1 && Ti(f, l, b);
            b = y;
            k = l;
            var n = b.updateQueue;
            if (null === n) {
              var t = new Set();
              t.add(k);
              b.updateQueue = t;
            } else n.add(k);
            break a;
          } else {
            if (0 === (b & 1)) {
              Ti(f, l, b);
              uj();
              break a;
            }
            k = Error(p$2(426));
          }
        } else if (I$2 && h.mode & 1) {
          var J = Vi(g);
          if (null !== J) {
            0 === (J.flags & 65536) && (J.flags |= 256);
            Wi(J, g, h, f, b);
            Jg(Ki(k, h));
            break a;
          }
        }
        f = k = Ki(k, h);
        4 !== T$1 && (T$1 = 2);
        null === tk ? tk = [f] : tk.push(f);
        f = g;
        do {
          switch (f.tag) {
            case 3:
              f.flags |= 65536;
              b &= -b;
              f.lanes |= b;
              var x = Oi(f, k, b);
              fh(f, x);
              break a;
            case 1:
              h = k;
              var w = f.type,
                u = f.stateNode;
              if (0 === (f.flags & 128) && ("function" === typeof w.getDerivedStateFromError || null !== u && "function" === typeof u.componentDidCatch && (null === Si || !Si.has(u)))) {
                f.flags |= 65536;
                b &= -b;
                f.lanes |= b;
                var F = Ri(f, h, b);
                fh(f, F);
                break a;
              }
          }
          f = f.return;
        } while (null !== f);
      }
      Tk(c);
    } catch (na) {
      b = na;
      Y$1 === c && null !== c && (Y$1 = c = c.return);
      continue;
    }
    break;
  } while (1);
}
function Kk() {
  var a = nk.current;
  nk.current = ai;
  return null === a ? ai : a;
}
function uj() {
  if (0 === T$1 || 3 === T$1 || 2 === T$1) T$1 = 4;
  null === R || 0 === (hh & 268435455) && 0 === (rk & 268435455) || Dk(R, Z$1);
}
function Jk(a, b) {
  var c = K$1;
  K$1 |= 2;
  var d = Kk();
  if (R !== a || Z$1 !== b) vk = null, Lk(a, b);
  do try {
    Uk();
    break;
  } catch (e) {
    Nk(a, e);
  } while (1);
  Qg();
  K$1 = c;
  nk.current = d;
  if (null !== Y$1) throw Error(p$2(261));
  R = null;
  Z$1 = 0;
  return T$1;
}
function Uk() {
  for (; null !== Y$1;) Vk(Y$1);
}
function Mk() {
  for (; null !== Y$1 && !cc();) Vk(Y$1);
}
function Vk(a) {
  var b = Wk(a.alternate, a, gj);
  a.memoizedProps = a.pendingProps;
  null === b ? Tk(a) : Y$1 = b;
  ok.current = null;
}
function Tk(a) {
  var b = a;
  do {
    var c = b.alternate;
    a = b.return;
    if (0 === (b.flags & 32768)) {
      if (c = Fj(c, b, gj), null !== c) {
        Y$1 = c;
        return;
      }
    } else {
      c = Jj(c, b);
      if (null !== c) {
        c.flags &= 32767;
        Y$1 = c;
        return;
      }
      if (null !== a) a.flags |= 32768, a.subtreeFlags = 0, a.deletions = null;else {
        T$1 = 6;
        Y$1 = null;
        return;
      }
    }
    b = b.sibling;
    if (null !== b) {
      Y$1 = b;
      return;
    }
    Y$1 = b = a;
  } while (null !== b);
  0 === T$1 && (T$1 = 5);
}
function Qk(a, b, c) {
  var d = C$2,
    e = pk.transition;
  try {
    pk.transition = null, C$2 = 1, Xk(a, b, c, d);
  } finally {
    pk.transition = e, C$2 = d;
  }
  return null;
}
function Xk(a, b, c, d) {
  do Ik(); while (null !== xk);
  if (0 !== (K$1 & 6)) throw Error(p$2(327));
  c = a.finishedWork;
  var e = a.finishedLanes;
  if (null === c) return null;
  a.finishedWork = null;
  a.finishedLanes = 0;
  if (c === a.current) throw Error(p$2(177));
  a.callbackNode = null;
  a.callbackPriority = 0;
  var f = c.lanes | c.childLanes;
  Bc(a, f);
  a === R && (Y$1 = R = null, Z$1 = 0);
  0 === (c.subtreeFlags & 2064) && 0 === (c.flags & 2064) || wk || (wk = !0, Gk(hc, function () {
    Ik();
    return null;
  }));
  f = 0 !== (c.flags & 15990);
  if (0 !== (c.subtreeFlags & 15990) || f) {
    f = pk.transition;
    pk.transition = null;
    var g = C$2;
    C$2 = 1;
    var h = K$1;
    K$1 |= 4;
    ok.current = null;
    Pj(a, c);
    ek(c, a);
    Oe$1(Df);
    dd = !!Cf;
    Df = Cf = null;
    a.current = c;
    ik(c);
    dc();
    K$1 = h;
    C$2 = g;
    pk.transition = f;
  } else a.current = c;
  wk && (wk = !1, xk = a, yk = e);
  f = a.pendingLanes;
  0 === f && (Si = null);
  mc(c.stateNode);
  Ek(a, B$2());
  if (null !== b) for (d = a.onRecoverableError, c = 0; c < b.length; c++) e = b[c], d(e.value, {
    componentStack: e.stack,
    digest: e.digest
  });
  if (Pi) throw Pi = !1, a = Qi, Qi = null, a;
  0 !== (yk & 1) && 0 !== a.tag && Ik();
  f = a.pendingLanes;
  0 !== (f & 1) ? a === Ak ? zk++ : (zk = 0, Ak = a) : zk = 0;
  jg();
  return null;
}
function Ik() {
  if (null !== xk) {
    var a = Dc(yk),
      b = pk.transition,
      c = C$2;
    try {
      pk.transition = null;
      C$2 = 16 > a ? 16 : a;
      if (null === xk) var d = !1;else {
        a = xk;
        xk = null;
        yk = 0;
        if (0 !== (K$1 & 6)) throw Error(p$2(331));
        var e = K$1;
        K$1 |= 4;
        for (V$1 = a.current; null !== V$1;) {
          var f = V$1,
            g = f.child;
          if (0 !== (V$1.flags & 16)) {
            var h = f.deletions;
            if (null !== h) {
              for (var k = 0; k < h.length; k++) {
                var l = h[k];
                for (V$1 = l; null !== V$1;) {
                  var m = V$1;
                  switch (m.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Qj(8, m, f);
                  }
                  var q = m.child;
                  if (null !== q) q.return = m, V$1 = q;else for (; null !== V$1;) {
                    m = V$1;
                    var r = m.sibling,
                      y = m.return;
                    Tj(m);
                    if (m === l) {
                      V$1 = null;
                      break;
                    }
                    if (null !== r) {
                      r.return = y;
                      V$1 = r;
                      break;
                    }
                    V$1 = y;
                  }
                }
              }
              var n = f.alternate;
              if (null !== n) {
                var t = n.child;
                if (null !== t) {
                  n.child = null;
                  do {
                    var J = t.sibling;
                    t.sibling = null;
                    t = J;
                  } while (null !== t);
                }
              }
              V$1 = f;
            }
          }
          if (0 !== (f.subtreeFlags & 2064) && null !== g) g.return = f, V$1 = g;else b: for (; null !== V$1;) {
            f = V$1;
            if (0 !== (f.flags & 2048)) switch (f.tag) {
              case 0:
              case 11:
              case 15:
                Qj(9, f, f.return);
            }
            var x = f.sibling;
            if (null !== x) {
              x.return = f.return;
              V$1 = x;
              break b;
            }
            V$1 = f.return;
          }
        }
        var w = a.current;
        for (V$1 = w; null !== V$1;) {
          g = V$1;
          var u = g.child;
          if (0 !== (g.subtreeFlags & 2064) && null !== u) u.return = g, V$1 = u;else b: for (g = w; null !== V$1;) {
            h = V$1;
            if (0 !== (h.flags & 2048)) try {
              switch (h.tag) {
                case 0:
                case 11:
                case 15:
                  Rj(9, h);
              }
            } catch (na) {
              W$1(h, h.return, na);
            }
            if (h === g) {
              V$1 = null;
              break b;
            }
            var F = h.sibling;
            if (null !== F) {
              F.return = h.return;
              V$1 = F;
              break b;
            }
            V$1 = h.return;
          }
        }
        K$1 = e;
        jg();
        if (lc && "function" === typeof lc.onPostCommitFiberRoot) try {
          lc.onPostCommitFiberRoot(kc, a);
        } catch (na) {}
        d = !0;
      }
      return d;
    } finally {
      C$2 = c, pk.transition = b;
    }
  }
  return !1;
}
function Yk(a, b, c) {
  b = Ki(c, b);
  b = Oi(a, b, 1);
  a = dh(a, b, 1);
  b = L$1();
  null !== a && (Ac(a, 1, b), Ek(a, b));
}
function W$1(a, b, c) {
  if (3 === a.tag) Yk(a, a, c);else for (; null !== b;) {
    if (3 === b.tag) {
      Yk(b, a, c);
      break;
    } else if (1 === b.tag) {
      var d = b.stateNode;
      if ("function" === typeof b.type.getDerivedStateFromError || "function" === typeof d.componentDidCatch && (null === Si || !Si.has(d))) {
        a = Ki(c, a);
        a = Ri(b, a, 1);
        b = dh(b, a, 1);
        a = L$1();
        null !== b && (Ac(b, 1, a), Ek(b, a));
        break;
      }
    }
    b = b.return;
  }
}
function Ui(a, b, c) {
  var d = a.pingCache;
  null !== d && d.delete(b);
  b = L$1();
  a.pingedLanes |= a.suspendedLanes & c;
  R === a && (Z$1 & c) === c && (4 === T$1 || 3 === T$1 && (Z$1 & 130023424) === Z$1 && 500 > B$2() - gk ? Lk(a, 0) : sk |= c);
  Ek(a, b);
}
function Zk(a, b) {
  0 === b && (0 === (a.mode & 1) ? b = 1 : (b = sc, sc <<= 1, 0 === (sc & 130023424) && (sc = 4194304)));
  var c = L$1();
  a = Zg(a, b);
  null !== a && (Ac(a, b, c), Ek(a, c));
}
function vj(a) {
  var b = a.memoizedState,
    c = 0;
  null !== b && (c = b.retryLane);
  Zk(a, c);
}
function ck(a, b) {
  var c = 0;
  switch (a.tag) {
    case 13:
      var d = a.stateNode;
      var e = a.memoizedState;
      null !== e && (c = e.retryLane);
      break;
    case 19:
      d = a.stateNode;
      break;
    default:
      throw Error(p$2(314));
  }
  null !== d && d.delete(b);
  Zk(a, c);
}
var Wk;
Wk = function (a, b, c) {
  if (null !== a) {
    if (a.memoizedProps !== b.pendingProps || Wf.current) Ug = !0;else {
      if (0 === (a.lanes & c) && 0 === (b.flags & 128)) return Ug = !1, zj(a, b, c);
      Ug = 0 !== (a.flags & 131072) ? !0 : !1;
    }
  } else Ug = !1, I$2 && 0 !== (b.flags & 1048576) && ug(b, ng, b.index);
  b.lanes = 0;
  switch (b.tag) {
    case 2:
      var d = b.type;
      jj(a, b);
      a = b.pendingProps;
      var e = Yf(b, H$2.current);
      Tg(b, c);
      e = Xh(null, b, d, a, e, c);
      var f = bi();
      b.flags |= 1;
      "object" === typeof e && null !== e && "function" === typeof e.render && void 0 === e.$$typeof ? (b.tag = 1, b.memoizedState = null, b.updateQueue = null, Zf(d) ? (f = !0, cg(b)) : f = !1, b.memoizedState = null !== e.state && void 0 !== e.state ? e.state : null, ah(b), e.updater = nh, b.stateNode = e, e._reactInternals = b, rh(b, d, a, c), b = kj(null, b, d, !0, f, c)) : (b.tag = 0, I$2 && f && vg(b), Yi(null, b, e, c), b = b.child);
      return b;
    case 16:
      d = b.elementType;
      a: {
        jj(a, b);
        a = b.pendingProps;
        e = d._init;
        d = e(d._payload);
        b.type = d;
        e = b.tag = $k(d);
        a = Lg(d, a);
        switch (e) {
          case 0:
            b = dj(null, b, d, a, c);
            break a;
          case 1:
            b = ij(null, b, d, a, c);
            break a;
          case 11:
            b = Zi(null, b, d, a, c);
            break a;
          case 14:
            b = aj(null, b, d, Lg(d.type, a), c);
            break a;
        }
        throw Error(p$2(306, d, ""));
      }
      return b;
    case 0:
      return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Lg(d, e), dj(a, b, d, e, c);
    case 1:
      return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Lg(d, e), ij(a, b, d, e, c);
    case 3:
      a: {
        lj(b);
        if (null === a) throw Error(p$2(387));
        d = b.pendingProps;
        f = b.memoizedState;
        e = f.element;
        bh(a, b);
        gh(b, d, null, c);
        var g = b.memoizedState;
        d = g.element;
        if (f.isDehydrated) {
          if (f = {
            element: d,
            isDehydrated: !1,
            cache: g.cache,
            pendingSuspenseBoundaries: g.pendingSuspenseBoundaries,
            transitions: g.transitions
          }, b.updateQueue.baseState = f, b.memoizedState = f, b.flags & 256) {
            e = Ki(Error(p$2(423)), b);
            b = mj(a, b, d, c, e);
            break a;
          } else if (d !== e) {
            e = Ki(Error(p$2(424)), b);
            b = mj(a, b, d, c, e);
            break a;
          } else for (yg = Lf(b.stateNode.containerInfo.firstChild), xg = b, I$2 = !0, zg = null, c = Ch(b, null, d, c), b.child = c; c;) c.flags = c.flags & -3 | 4096, c = c.sibling;
        } else {
          Ig();
          if (d === e) {
            b = $i(a, b, c);
            break a;
          }
          Yi(a, b, d, c);
        }
        b = b.child;
      }
      return b;
    case 5:
      return Kh(b), null === a && Eg(b), d = b.type, e = b.pendingProps, f = null !== a ? a.memoizedProps : null, g = e.children, Ef(d, e) ? g = null : null !== f && Ef(d, f) && (b.flags |= 32), hj(a, b), Yi(a, b, g, c), b.child;
    case 6:
      return null === a && Eg(b), null;
    case 13:
      return pj(a, b, c);
    case 4:
      return Ih(b, b.stateNode.containerInfo), d = b.pendingProps, null === a ? b.child = Bh(b, null, d, c) : Yi(a, b, d, c), b.child;
    case 11:
      return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Lg(d, e), Zi(a, b, d, e, c);
    case 7:
      return Yi(a, b, b.pendingProps, c), b.child;
    case 8:
      return Yi(a, b, b.pendingProps.children, c), b.child;
    case 12:
      return Yi(a, b, b.pendingProps.children, c), b.child;
    case 10:
      a: {
        d = b.type._context;
        e = b.pendingProps;
        f = b.memoizedProps;
        g = e.value;
        G$2(Mg, d._currentValue);
        d._currentValue = g;
        if (null !== f) if (He(f.value, g)) {
          if (f.children === e.children && !Wf.current) {
            b = $i(a, b, c);
            break a;
          }
        } else for (f = b.child, null !== f && (f.return = b); null !== f;) {
          var h = f.dependencies;
          if (null !== h) {
            g = f.child;
            for (var k = h.firstContext; null !== k;) {
              if (k.context === d) {
                if (1 === f.tag) {
                  k = ch(-1, c & -c);
                  k.tag = 2;
                  var l = f.updateQueue;
                  if (null !== l) {
                    l = l.shared;
                    var m = l.pending;
                    null === m ? k.next = k : (k.next = m.next, m.next = k);
                    l.pending = k;
                  }
                }
                f.lanes |= c;
                k = f.alternate;
                null !== k && (k.lanes |= c);
                Sg(f.return, c, b);
                h.lanes |= c;
                break;
              }
              k = k.next;
            }
          } else if (10 === f.tag) g = f.type === b.type ? null : f.child;else if (18 === f.tag) {
            g = f.return;
            if (null === g) throw Error(p$2(341));
            g.lanes |= c;
            h = g.alternate;
            null !== h && (h.lanes |= c);
            Sg(g, c, b);
            g = f.sibling;
          } else g = f.child;
          if (null !== g) g.return = f;else for (g = f; null !== g;) {
            if (g === b) {
              g = null;
              break;
            }
            f = g.sibling;
            if (null !== f) {
              f.return = g.return;
              g = f;
              break;
            }
            g = g.return;
          }
          f = g;
        }
        Yi(a, b, e.children, c);
        b = b.child;
      }
      return b;
    case 9:
      return e = b.type, d = b.pendingProps.children, Tg(b, c), e = Vg(e), d = d(e), b.flags |= 1, Yi(a, b, d, c), b.child;
    case 14:
      return d = b.type, e = Lg(d, b.pendingProps), e = Lg(d.type, e), aj(a, b, d, e, c);
    case 15:
      return cj(a, b, b.type, b.pendingProps, c);
    case 17:
      return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Lg(d, e), jj(a, b), b.tag = 1, Zf(d) ? (a = !0, cg(b)) : a = !1, Tg(b, c), ph(b, d, e), rh(b, d, e, c), kj(null, b, d, !0, a, c);
    case 19:
      return yj(a, b, c);
    case 22:
      return ej(a, b, c);
  }
  throw Error(p$2(156, b.tag));
};
function Gk(a, b) {
  return ac(a, b);
}
function al(a, b, c, d) {
  this.tag = a;
  this.key = c;
  this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null;
  this.index = 0;
  this.ref = null;
  this.pendingProps = b;
  this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null;
  this.mode = d;
  this.subtreeFlags = this.flags = 0;
  this.deletions = null;
  this.childLanes = this.lanes = 0;
  this.alternate = null;
}
function Bg(a, b, c, d) {
  return new al(a, b, c, d);
}
function bj(a) {
  a = a.prototype;
  return !(!a || !a.isReactComponent);
}
function $k(a) {
  if ("function" === typeof a) return bj(a) ? 1 : 0;
  if (void 0 !== a && null !== a) {
    a = a.$$typeof;
    if (a === Da) return 11;
    if (a === Ga) return 14;
  }
  return 2;
}
function wh(a, b) {
  var c = a.alternate;
  null === c ? (c = Bg(a.tag, b, a.key, a.mode), c.elementType = a.elementType, c.type = a.type, c.stateNode = a.stateNode, c.alternate = a, a.alternate = c) : (c.pendingProps = b, c.type = a.type, c.flags = 0, c.subtreeFlags = 0, c.deletions = null);
  c.flags = a.flags & 14680064;
  c.childLanes = a.childLanes;
  c.lanes = a.lanes;
  c.child = a.child;
  c.memoizedProps = a.memoizedProps;
  c.memoizedState = a.memoizedState;
  c.updateQueue = a.updateQueue;
  b = a.dependencies;
  c.dependencies = null === b ? null : {
    lanes: b.lanes,
    firstContext: b.firstContext
  };
  c.sibling = a.sibling;
  c.index = a.index;
  c.ref = a.ref;
  return c;
}
function yh(a, b, c, d, e, f) {
  var g = 2;
  d = a;
  if ("function" === typeof a) bj(a) && (g = 1);else if ("string" === typeof a) g = 5;else a: switch (a) {
    case ya:
      return Ah(c.children, e, f, b);
    case za:
      g = 8;
      e |= 8;
      break;
    case Aa:
      return a = Bg(12, c, b, e | 2), a.elementType = Aa, a.lanes = f, a;
    case Ea:
      return a = Bg(13, c, b, e), a.elementType = Ea, a.lanes = f, a;
    case Fa:
      return a = Bg(19, c, b, e), a.elementType = Fa, a.lanes = f, a;
    case Ia:
      return qj(c, e, f, b);
    default:
      if ("object" === typeof a && null !== a) switch (a.$$typeof) {
        case Ba:
          g = 10;
          break a;
        case Ca:
          g = 9;
          break a;
        case Da:
          g = 11;
          break a;
        case Ga:
          g = 14;
          break a;
        case Ha:
          g = 16;
          d = null;
          break a;
      }
      throw Error(p$2(130, null == a ? a : typeof a, ""));
  }
  b = Bg(g, c, b, e);
  b.elementType = a;
  b.type = d;
  b.lanes = f;
  return b;
}
function Ah(a, b, c, d) {
  a = Bg(7, a, d, b);
  a.lanes = c;
  return a;
}
function qj(a, b, c, d) {
  a = Bg(22, a, d, b);
  a.elementType = Ia;
  a.lanes = c;
  a.stateNode = {
    isHidden: !1
  };
  return a;
}
function xh(a, b, c) {
  a = Bg(6, a, null, b);
  a.lanes = c;
  return a;
}
function zh(a, b, c) {
  b = Bg(4, null !== a.children ? a.children : [], a.key, b);
  b.lanes = c;
  b.stateNode = {
    containerInfo: a.containerInfo,
    pendingChildren: null,
    implementation: a.implementation
  };
  return b;
}
function bl(a, b, c, d, e) {
  this.tag = b;
  this.containerInfo = a;
  this.finishedWork = this.pingCache = this.current = this.pendingChildren = null;
  this.timeoutHandle = -1;
  this.callbackNode = this.pendingContext = this.context = null;
  this.callbackPriority = 0;
  this.eventTimes = zc(0);
  this.expirationTimes = zc(-1);
  this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0;
  this.entanglements = zc(0);
  this.identifierPrefix = d;
  this.onRecoverableError = e;
  this.mutableSourceEagerHydrationData = null;
}
function cl(a, b, c, d, e, f, g, h, k) {
  a = new bl(a, b, c, h, k);
  1 === b ? (b = 1, !0 === f && (b |= 8)) : b = 0;
  f = Bg(3, null, null, b);
  a.current = f;
  f.stateNode = a;
  f.memoizedState = {
    element: d,
    isDehydrated: c,
    cache: null,
    transitions: null,
    pendingSuspenseBoundaries: null
  };
  ah(f);
  return a;
}
function dl(a, b, c) {
  var d = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
  return {
    $$typeof: wa,
    key: null == d ? null : "" + d,
    children: a,
    containerInfo: b,
    implementation: c
  };
}
function el(a) {
  if (!a) return Vf;
  a = a._reactInternals;
  a: {
    if (Vb(a) !== a || 1 !== a.tag) throw Error(p$2(170));
    var b = a;
    do {
      switch (b.tag) {
        case 3:
          b = b.stateNode.context;
          break a;
        case 1:
          if (Zf(b.type)) {
            b = b.stateNode.__reactInternalMemoizedMergedChildContext;
            break a;
          }
      }
      b = b.return;
    } while (null !== b);
    throw Error(p$2(171));
  }
  if (1 === a.tag) {
    var c = a.type;
    if (Zf(c)) return bg(a, c, b);
  }
  return b;
}
function fl(a, b, c, d, e, f, g, h, k) {
  a = cl(c, d, !0, a, e, f, g, h, k);
  a.context = el(null);
  c = a.current;
  d = L$1();
  e = lh(c);
  f = ch(d, e);
  f.callback = void 0 !== b && null !== b ? b : null;
  dh(c, f, e);
  a.current.lanes = e;
  Ac(a, e, d);
  Ek(a, d);
  return a;
}
function gl(a, b, c, d) {
  var e = b.current,
    f = L$1(),
    g = lh(e);
  c = el(c);
  null === b.context ? b.context = c : b.pendingContext = c;
  b = ch(f, g);
  b.payload = {
    element: a
  };
  d = void 0 === d ? null : d;
  null !== d && (b.callback = d);
  a = dh(e, b, g);
  null !== a && (mh(a, e, g, f), eh(a, e, g));
  return g;
}
function hl(a) {
  a = a.current;
  if (!a.child) return null;
  switch (a.child.tag) {
    case 5:
      return a.child.stateNode;
    default:
      return a.child.stateNode;
  }
}
function il(a, b) {
  a = a.memoizedState;
  if (null !== a && null !== a.dehydrated) {
    var c = a.retryLane;
    a.retryLane = 0 !== c && c < b ? c : b;
  }
}
function jl(a, b) {
  il(a, b);
  (a = a.alternate) && il(a, b);
}
function kl() {
  return null;
}
var ll = "function" === typeof reportError ? reportError : function (a) {
  console.error(a);
};
function ml(a) {
  this._internalRoot = a;
}
nl.prototype.render = ml.prototype.render = function (a) {
  var b = this._internalRoot;
  if (null === b) throw Error(p$2(409));
  gl(a, b, null, null);
};
nl.prototype.unmount = ml.prototype.unmount = function () {
  var a = this._internalRoot;
  if (null !== a) {
    this._internalRoot = null;
    var b = a.containerInfo;
    Sk(function () {
      gl(null, a, null, null);
    });
    b[uf] = null;
  }
};
function nl(a) {
  this._internalRoot = a;
}
nl.prototype.unstable_scheduleHydration = function (a) {
  if (a) {
    var b = Hc();
    a = {
      blockedOn: null,
      target: a,
      priority: b
    };
    for (var c = 0; c < Qc.length && 0 !== b && b < Qc[c].priority; c++);
    Qc.splice(c, 0, a);
    0 === c && Vc(a);
  }
};
function ol(a) {
  return !(!a || 1 !== a.nodeType && 9 !== a.nodeType && 11 !== a.nodeType);
}
function pl(a) {
  return !(!a || 1 !== a.nodeType && 9 !== a.nodeType && 11 !== a.nodeType && (8 !== a.nodeType || " react-mount-point-unstable " !== a.nodeValue));
}
function ql() {}
function rl(a, b, c, d, e) {
  if (e) {
    if ("function" === typeof d) {
      var f = d;
      d = function () {
        var a = hl(g);
        f.call(a);
      };
    }
    var g = fl(b, d, a, 0, null, !1, !1, "", ql);
    a._reactRootContainer = g;
    a[uf] = g.current;
    sf(8 === a.nodeType ? a.parentNode : a);
    Sk();
    return g;
  }
  for (; e = a.lastChild;) a.removeChild(e);
  if ("function" === typeof d) {
    var h = d;
    d = function () {
      var a = hl(k);
      h.call(a);
    };
  }
  var k = cl(a, 0, !1, null, null, !1, !1, "", ql);
  a._reactRootContainer = k;
  a[uf] = k.current;
  sf(8 === a.nodeType ? a.parentNode : a);
  Sk(function () {
    gl(b, k, c, d);
  });
  return k;
}
function sl(a, b, c, d, e) {
  var f = c._reactRootContainer;
  if (f) {
    var g = f;
    if ("function" === typeof e) {
      var h = e;
      e = function () {
        var a = hl(g);
        h.call(a);
      };
    }
    gl(b, g, a, e);
  } else g = rl(c, b, a, e, d);
  return hl(g);
}
Ec = function (a) {
  switch (a.tag) {
    case 3:
      var b = a.stateNode;
      if (b.current.memoizedState.isDehydrated) {
        var c = tc(b.pendingLanes);
        0 !== c && (Cc(b, c | 1), Ek(b, B$2()), 0 === (K$1 & 6) && (Hj = B$2() + 500, jg()));
      }
      break;
    case 13:
      Sk(function () {
        var b = Zg(a, 1);
        if (null !== b) {
          var c = L$1();
          mh(b, a, 1, c);
        }
      }), jl(a, 1);
  }
};
Fc = function (a) {
  if (13 === a.tag) {
    var b = Zg(a, 134217728);
    if (null !== b) {
      var c = L$1();
      mh(b, a, 134217728, c);
    }
    jl(a, 134217728);
  }
};
Gc = function (a) {
  if (13 === a.tag) {
    var b = lh(a),
      c = Zg(a, b);
    if (null !== c) {
      var d = L$1();
      mh(c, a, b, d);
    }
    jl(a, b);
  }
};
Hc = function () {
  return C$2;
};
Ic = function (a, b) {
  var c = C$2;
  try {
    return C$2 = a, b();
  } finally {
    C$2 = c;
  }
};
yb = function (a, b, c) {
  switch (b) {
    case "input":
      bb(a, c);
      b = c.name;
      if ("radio" === c.type && null != b) {
        for (c = a; c.parentNode;) c = c.parentNode;
        c = c.querySelectorAll("input[name=" + JSON.stringify("" + b) + '][type="radio"]');
        for (b = 0; b < c.length; b++) {
          var d = c[b];
          if (d !== a && d.form === a.form) {
            var e = Db(d);
            if (!e) throw Error(p$2(90));
            Wa(d);
            bb(d, e);
          }
        }
      }
      break;
    case "textarea":
      ib(a, c);
      break;
    case "select":
      b = c.value, null != b && fb(a, !!c.multiple, b, !1);
  }
};
Gb = Rk;
Hb = Sk;
var tl = {
    usingClientEntryPoint: !1,
    Events: [Cb, ue, Db, Eb, Fb, Rk]
  },
  ul = {
    findFiberByHostInstance: Wc,
    bundleType: 0,
    version: "18.2.0",
    rendererPackageName: "react-dom"
  };
var vl = {
  bundleType: ul.bundleType,
  version: ul.version,
  rendererPackageName: ul.rendererPackageName,
  rendererConfig: ul.rendererConfig,
  overrideHookState: null,
  overrideHookStateDeletePath: null,
  overrideHookStateRenamePath: null,
  overrideProps: null,
  overridePropsDeletePath: null,
  overridePropsRenamePath: null,
  setErrorHandler: null,
  setSuspenseHandler: null,
  scheduleUpdate: null,
  currentDispatcherRef: ua.ReactCurrentDispatcher,
  findHostInstanceByFiber: function (a) {
    a = Zb(a);
    return null === a ? null : a.stateNode;
  },
  findFiberByHostInstance: ul.findFiberByHostInstance || kl,
  findHostInstancesForRefresh: null,
  scheduleRefresh: null,
  scheduleRoot: null,
  setRefreshHandler: null,
  getCurrentFiber: null,
  reconcilerVersion: "18.2.0-next-9e3b772b8-20220608"
};
if ("undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) {
  var wl = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!wl.isDisabled && wl.supportsFiber) try {
    kc = wl.inject(vl), lc = wl;
  } catch (a) {}
}
reactDom_production_min.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = tl;
reactDom_production_min.createPortal = function (a, b) {
  var c = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
  if (!ol(b)) throw Error(p$2(200));
  return dl(a, b, null, c);
};
reactDom_production_min.createRoot = function (a, b) {
  if (!ol(a)) throw Error(p$2(299));
  var c = !1,
    d = "",
    e = ll;
  null !== b && void 0 !== b && (!0 === b.unstable_strictMode && (c = !0), void 0 !== b.identifierPrefix && (d = b.identifierPrefix), void 0 !== b.onRecoverableError && (e = b.onRecoverableError));
  b = cl(a, 1, !1, null, null, c, !1, d, e);
  a[uf] = b.current;
  sf(8 === a.nodeType ? a.parentNode : a);
  return new ml(b);
};
reactDom_production_min.findDOMNode = function (a) {
  if (null == a) return null;
  if (1 === a.nodeType) return a;
  var b = a._reactInternals;
  if (void 0 === b) {
    if ("function" === typeof a.render) throw Error(p$2(188));
    a = Object.keys(a).join(",");
    throw Error(p$2(268, a));
  }
  a = Zb(b);
  a = null === a ? null : a.stateNode;
  return a;
};
reactDom_production_min.flushSync = function (a) {
  return Sk(a);
};
reactDom_production_min.hydrate = function (a, b, c) {
  if (!pl(b)) throw Error(p$2(200));
  return sl(null, a, b, !0, c);
};
reactDom_production_min.hydrateRoot = function (a, b, c) {
  if (!ol(a)) throw Error(p$2(405));
  var d = null != c && c.hydratedSources || null,
    e = !1,
    f = "",
    g = ll;
  null !== c && void 0 !== c && (!0 === c.unstable_strictMode && (e = !0), void 0 !== c.identifierPrefix && (f = c.identifierPrefix), void 0 !== c.onRecoverableError && (g = c.onRecoverableError));
  b = fl(b, null, a, 1, null != c ? c : null, e, !1, f, g);
  a[uf] = b.current;
  sf(a);
  if (d) for (a = 0; a < d.length; a++) c = d[a], e = c._getVersion, e = e(c._source), null == b.mutableSourceEagerHydrationData ? b.mutableSourceEagerHydrationData = [c, e] : b.mutableSourceEagerHydrationData.push(c, e);
  return new nl(b);
};
reactDom_production_min.render = function (a, b, c) {
  if (!pl(b)) throw Error(p$2(200));
  return sl(null, a, b, !1, c);
};
reactDom_production_min.unmountComponentAtNode = function (a) {
  if (!pl(a)) throw Error(p$2(40));
  return a._reactRootContainer ? (Sk(function () {
    sl(null, null, a, !1, function () {
      a._reactRootContainer = null;
      a[uf] = null;
    });
  }), !0) : !1;
};
reactDom_production_min.unstable_batchedUpdates = Rk;
reactDom_production_min.unstable_renderSubtreeIntoContainer = function (a, b, c, d) {
  if (!pl(c)) throw Error(p$2(200));
  if (null == a || void 0 === a._reactInternals) throw Error(p$2(38));
  return sl(a, b, c, !1, d);
};
reactDom_production_min.version = "18.2.0-next-9e3b772b8-20220608";(function (module) {

	function checkDCE() {
	  /* global __REACT_DEVTOOLS_GLOBAL_HOOK__ */
	  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === 'undefined' || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== 'function') {
	    return;
	  }
	  try {
	    // Verify that the code above has been dead code eliminated (DCE'd).
	    __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
	  } catch (err) {
	    // DevTools shouldn't crash React, no matter what.
	    // We should still report in case we break this code.
	    console.error(err);
	  }
	}
	{
	  // DCE check should happen before ReactDOM bundle executes so that
	  // DevTools can report bad minification during injection.
	  checkDCE();
	  module.exports = reactDom_production_min;
	}
} (reactDom));

var ReactDOM = /*@__PURE__*/getDefaultExportFromCjs(reactDomExports);var reactIsExports$1 = {};
var reactIs$2 = {
  get exports(){ return reactIsExports$1; },
  set exports(v){ reactIsExports$1 = v; },
};var reactIs_production_min$1 = {};/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var b$2 = "function" === typeof Symbol && Symbol.for,
  c$1 = b$2 ? Symbol.for("react.element") : 60103,
  d$1 = b$2 ? Symbol.for("react.portal") : 60106,
  e$2 = b$2 ? Symbol.for("react.fragment") : 60107,
  f$1 = b$2 ? Symbol.for("react.strict_mode") : 60108,
  g$2 = b$2 ? Symbol.for("react.profiler") : 60114,
  h$1 = b$2 ? Symbol.for("react.provider") : 60109,
  k$2 = b$2 ? Symbol.for("react.context") : 60110,
  l$2 = b$2 ? Symbol.for("react.async_mode") : 60111,
  m$1 = b$2 ? Symbol.for("react.concurrent_mode") : 60111,
  n$2 = b$2 ? Symbol.for("react.forward_ref") : 60112,
  p$1 = b$2 ? Symbol.for("react.suspense") : 60113,
  q$2 = b$2 ? Symbol.for("react.suspense_list") : 60120,
  r$1 = b$2 ? Symbol.for("react.memo") : 60115,
  t$1 = b$2 ? Symbol.for("react.lazy") : 60116,
  v$2 = b$2 ? Symbol.for("react.block") : 60121,
  w$2 = b$2 ? Symbol.for("react.fundamental") : 60117,
  x$2 = b$2 ? Symbol.for("react.responder") : 60118,
  y$2 = b$2 ? Symbol.for("react.scope") : 60119;
function z$2(a) {
  if ("object" === typeof a && null !== a) {
    var u = a.$$typeof;
    switch (u) {
      case c$1:
        switch (a = a.type, a) {
          case l$2:
          case m$1:
          case e$2:
          case g$2:
          case f$1:
          case p$1:
            return a;
          default:
            switch (a = a && a.$$typeof, a) {
              case k$2:
              case n$2:
              case t$1:
              case r$1:
              case h$1:
                return a;
              default:
                return u;
            }
        }
      case d$1:
        return u;
    }
  }
}
function A$1(a) {
  return z$2(a) === m$1;
}
reactIs_production_min$1.AsyncMode = l$2;
reactIs_production_min$1.ConcurrentMode = m$1;
reactIs_production_min$1.ContextConsumer = k$2;
reactIs_production_min$1.ContextProvider = h$1;
reactIs_production_min$1.Element = c$1;
reactIs_production_min$1.ForwardRef = n$2;
reactIs_production_min$1.Fragment = e$2;
reactIs_production_min$1.Lazy = t$1;
reactIs_production_min$1.Memo = r$1;
reactIs_production_min$1.Portal = d$1;
reactIs_production_min$1.Profiler = g$2;
reactIs_production_min$1.StrictMode = f$1;
reactIs_production_min$1.Suspense = p$1;
reactIs_production_min$1.isAsyncMode = function (a) {
  return A$1(a) || z$2(a) === l$2;
};
reactIs_production_min$1.isConcurrentMode = A$1;
reactIs_production_min$1.isContextConsumer = function (a) {
  return z$2(a) === k$2;
};
reactIs_production_min$1.isContextProvider = function (a) {
  return z$2(a) === h$1;
};
reactIs_production_min$1.isElement = function (a) {
  return "object" === typeof a && null !== a && a.$$typeof === c$1;
};
reactIs_production_min$1.isForwardRef = function (a) {
  return z$2(a) === n$2;
};
reactIs_production_min$1.isFragment = function (a) {
  return z$2(a) === e$2;
};
reactIs_production_min$1.isLazy = function (a) {
  return z$2(a) === t$1;
};
reactIs_production_min$1.isMemo = function (a) {
  return z$2(a) === r$1;
};
reactIs_production_min$1.isPortal = function (a) {
  return z$2(a) === d$1;
};
reactIs_production_min$1.isProfiler = function (a) {
  return z$2(a) === g$2;
};
reactIs_production_min$1.isStrictMode = function (a) {
  return z$2(a) === f$1;
};
reactIs_production_min$1.isSuspense = function (a) {
  return z$2(a) === p$1;
};
reactIs_production_min$1.isValidElementType = function (a) {
  return "string" === typeof a || "function" === typeof a || a === e$2 || a === m$1 || a === g$2 || a === f$1 || a === p$1 || a === q$2 || "object" === typeof a && null !== a && (a.$$typeof === t$1 || a.$$typeof === r$1 || a.$$typeof === h$1 || a.$$typeof === k$2 || a.$$typeof === n$2 || a.$$typeof === w$2 || a.$$typeof === x$2 || a.$$typeof === y$2 || a.$$typeof === v$2);
};
reactIs_production_min$1.typeOf = z$2;(function (module) {

	{
	  module.exports = reactIs_production_min$1;
	}
} (reactIs$2));function stylis_min(W) {
  function M(d, c, e, h, a) {
    for (var m = 0, b = 0, v = 0, n = 0, q, g, x = 0, K = 0, k, u = k = q = 0, l = 0, r = 0, I = 0, t = 0, B = e.length, J = B - 1, y, f = '', p = '', F = '', G = '', C; l < B;) {
      g = e.charCodeAt(l);
      l === J && 0 !== b + n + v + m && (0 !== b && (g = 47 === b ? 10 : 47), n = v = m = 0, B++, J++);
      if (0 === b + n + v + m) {
        if (l === J && (0 < r && (f = f.replace(N, '')), 0 < f.trim().length)) {
          switch (g) {
            case 32:
            case 9:
            case 59:
            case 13:
            case 10:
              break;
            default:
              f += e.charAt(l);
          }
          g = 59;
        }
        switch (g) {
          case 123:
            f = f.trim();
            q = f.charCodeAt(0);
            k = 1;
            for (t = ++l; l < B;) {
              switch (g = e.charCodeAt(l)) {
                case 123:
                  k++;
                  break;
                case 125:
                  k--;
                  break;
                case 47:
                  switch (g = e.charCodeAt(l + 1)) {
                    case 42:
                    case 47:
                      a: {
                        for (u = l + 1; u < J; ++u) {
                          switch (e.charCodeAt(u)) {
                            case 47:
                              if (42 === g && 42 === e.charCodeAt(u - 1) && l + 2 !== u) {
                                l = u + 1;
                                break a;
                              }
                              break;
                            case 10:
                              if (47 === g) {
                                l = u + 1;
                                break a;
                              }
                          }
                        }
                        l = u;
                      }
                  }
                  break;
                case 91:
                  g++;
                case 40:
                  g++;
                case 34:
                case 39:
                  for (; l++ < J && e.charCodeAt(l) !== g;) {}
              }
              if (0 === k) break;
              l++;
            }
            k = e.substring(t, l);
            0 === q && (q = (f = f.replace(ca, '').trim()).charCodeAt(0));
            switch (q) {
              case 64:
                0 < r && (f = f.replace(N, ''));
                g = f.charCodeAt(1);
                switch (g) {
                  case 100:
                  case 109:
                  case 115:
                  case 45:
                    r = c;
                    break;
                  default:
                    r = O;
                }
                k = M(c, r, k, g, a + 1);
                t = k.length;
                0 < A && (r = X(O, f, I), C = H(3, k, r, c, D, z, t, g, a, h), f = r.join(''), void 0 !== C && 0 === (t = (k = C.trim()).length) && (g = 0, k = ''));
                if (0 < t) switch (g) {
                  case 115:
                    f = f.replace(da, ea);
                  case 100:
                  case 109:
                  case 45:
                    k = f + '{' + k + '}';
                    break;
                  case 107:
                    f = f.replace(fa, '$1 $2');
                    k = f + '{' + k + '}';
                    k = 1 === w || 2 === w && L('@' + k, 3) ? '@-webkit-' + k + '@' + k : '@' + k;
                    break;
                  default:
                    k = f + k, 112 === h && (k = (p += k, ''));
                } else k = '';
                break;
              default:
                k = M(c, X(c, f, I), k, h, a + 1);
            }
            F += k;
            k = I = r = u = q = 0;
            f = '';
            g = e.charCodeAt(++l);
            break;
          case 125:
          case 59:
            f = (0 < r ? f.replace(N, '') : f).trim();
            if (1 < (t = f.length)) switch (0 === u && (q = f.charCodeAt(0), 45 === q || 96 < q && 123 > q) && (t = (f = f.replace(' ', ':')).length), 0 < A && void 0 !== (C = H(1, f, c, d, D, z, p.length, h, a, h)) && 0 === (t = (f = C.trim()).length) && (f = '\x00\x00'), q = f.charCodeAt(0), g = f.charCodeAt(1), q) {
              case 0:
                break;
              case 64:
                if (105 === g || 99 === g) {
                  G += f + e.charAt(l);
                  break;
                }
              default:
                58 !== f.charCodeAt(t - 1) && (p += P(f, q, g, f.charCodeAt(2)));
            }
            I = r = u = q = 0;
            f = '';
            g = e.charCodeAt(++l);
        }
      }
      switch (g) {
        case 13:
        case 10:
          47 === b ? b = 0 : 0 === 1 + q && 107 !== h && 0 < f.length && (r = 1, f += '\x00');
          0 < A * Y && H(0, f, c, d, D, z, p.length, h, a, h);
          z = 1;
          D++;
          break;
        case 59:
        case 125:
          if (0 === b + n + v + m) {
            z++;
            break;
          }
        default:
          z++;
          y = e.charAt(l);
          switch (g) {
            case 9:
            case 32:
              if (0 === n + m + b) switch (x) {
                case 44:
                case 58:
                case 9:
                case 32:
                  y = '';
                  break;
                default:
                  32 !== g && (y = ' ');
              }
              break;
            case 0:
              y = '\\0';
              break;
            case 12:
              y = '\\f';
              break;
            case 11:
              y = '\\v';
              break;
            case 38:
              0 === n + b + m && (r = I = 1, y = '\f' + y);
              break;
            case 108:
              if (0 === n + b + m + E && 0 < u) switch (l - u) {
                case 2:
                  112 === x && 58 === e.charCodeAt(l - 3) && (E = x);
                case 8:
                  111 === K && (E = K);
              }
              break;
            case 58:
              0 === n + b + m && (u = l);
              break;
            case 44:
              0 === b + v + n + m && (r = 1, y += '\r');
              break;
            case 34:
            case 39:
              0 === b && (n = n === g ? 0 : 0 === n ? g : n);
              break;
            case 91:
              0 === n + b + v && m++;
              break;
            case 93:
              0 === n + b + v && m--;
              break;
            case 41:
              0 === n + b + m && v--;
              break;
            case 40:
              if (0 === n + b + m) {
                if (0 === q) switch (2 * x + 3 * K) {
                  case 533:
                    break;
                  default:
                    q = 1;
                }
                v++;
              }
              break;
            case 64:
              0 === b + v + n + m + u + k && (k = 1);
              break;
            case 42:
            case 47:
              if (!(0 < n + m + v)) switch (b) {
                case 0:
                  switch (2 * g + 3 * e.charCodeAt(l + 1)) {
                    case 235:
                      b = 47;
                      break;
                    case 220:
                      t = l, b = 42;
                  }
                  break;
                case 42:
                  47 === g && 42 === x && t + 2 !== l && (33 === e.charCodeAt(t + 2) && (p += e.substring(t, l + 1)), y = '', b = 0);
              }
          }
          0 === b && (f += y);
      }
      K = x;
      x = g;
      l++;
    }
    t = p.length;
    if (0 < t) {
      r = c;
      if (0 < A && (C = H(2, p, r, d, D, z, t, h, a, h), void 0 !== C && 0 === (p = C).length)) return G + p + F;
      p = r.join(',') + '{' + p + '}';
      if (0 !== w * E) {
        2 !== w || L(p, 2) || (E = 0);
        switch (E) {
          case 111:
            p = p.replace(ha, ':-moz-$1') + p;
            break;
          case 112:
            p = p.replace(Q, '::-webkit-input-$1') + p.replace(Q, '::-moz-$1') + p.replace(Q, ':-ms-input-$1') + p;
        }
        E = 0;
      }
    }
    return G + p + F;
  }
  function X(d, c, e) {
    var h = c.trim().split(ia);
    c = h;
    var a = h.length,
      m = d.length;
    switch (m) {
      case 0:
      case 1:
        var b = 0;
        for (d = 0 === m ? '' : d[0] + ' '; b < a; ++b) {
          c[b] = Z(d, c[b], e).trim();
        }
        break;
      default:
        var v = b = 0;
        for (c = []; b < a; ++b) {
          for (var n = 0; n < m; ++n) {
            c[v++] = Z(d[n] + ' ', h[b], e).trim();
          }
        }
    }
    return c;
  }
  function Z(d, c, e) {
    var h = c.charCodeAt(0);
    33 > h && (h = (c = c.trim()).charCodeAt(0));
    switch (h) {
      case 38:
        return c.replace(F, '$1' + d.trim());
      case 58:
        return d.trim() + c.replace(F, '$1' + d.trim());
      default:
        if (0 < 1 * e && 0 < c.indexOf('\f')) return c.replace(F, (58 === d.charCodeAt(0) ? '' : '$1') + d.trim());
    }
    return d + c;
  }
  function P(d, c, e, h) {
    var a = d + ';',
      m = 2 * c + 3 * e + 4 * h;
    if (944 === m) {
      d = a.indexOf(':', 9) + 1;
      var b = a.substring(d, a.length - 1).trim();
      b = a.substring(0, d).trim() + b + ';';
      return 1 === w || 2 === w && L(b, 1) ? '-webkit-' + b + b : b;
    }
    if (0 === w || 2 === w && !L(a, 1)) return a;
    switch (m) {
      case 1015:
        return 97 === a.charCodeAt(10) ? '-webkit-' + a + a : a;
      case 951:
        return 116 === a.charCodeAt(3) ? '-webkit-' + a + a : a;
      case 963:
        return 110 === a.charCodeAt(5) ? '-webkit-' + a + a : a;
      case 1009:
        if (100 !== a.charCodeAt(4)) break;
      case 969:
      case 942:
        return '-webkit-' + a + a;
      case 978:
        return '-webkit-' + a + '-moz-' + a + a;
      case 1019:
      case 983:
        return '-webkit-' + a + '-moz-' + a + '-ms-' + a + a;
      case 883:
        if (45 === a.charCodeAt(8)) return '-webkit-' + a + a;
        if (0 < a.indexOf('image-set(', 11)) return a.replace(ja, '$1-webkit-$2') + a;
        break;
      case 932:
        if (45 === a.charCodeAt(4)) switch (a.charCodeAt(5)) {
          case 103:
            return '-webkit-box-' + a.replace('-grow', '') + '-webkit-' + a + '-ms-' + a.replace('grow', 'positive') + a;
          case 115:
            return '-webkit-' + a + '-ms-' + a.replace('shrink', 'negative') + a;
          case 98:
            return '-webkit-' + a + '-ms-' + a.replace('basis', 'preferred-size') + a;
        }
        return '-webkit-' + a + '-ms-' + a + a;
      case 964:
        return '-webkit-' + a + '-ms-flex-' + a + a;
      case 1023:
        if (99 !== a.charCodeAt(8)) break;
        b = a.substring(a.indexOf(':', 15)).replace('flex-', '').replace('space-between', 'justify');
        return '-webkit-box-pack' + b + '-webkit-' + a + '-ms-flex-pack' + b + a;
      case 1005:
        return ka.test(a) ? a.replace(aa, ':-webkit-') + a.replace(aa, ':-moz-') + a : a;
      case 1e3:
        b = a.substring(13).trim();
        c = b.indexOf('-') + 1;
        switch (b.charCodeAt(0) + b.charCodeAt(c)) {
          case 226:
            b = a.replace(G, 'tb');
            break;
          case 232:
            b = a.replace(G, 'tb-rl');
            break;
          case 220:
            b = a.replace(G, 'lr');
            break;
          default:
            return a;
        }
        return '-webkit-' + a + '-ms-' + b + a;
      case 1017:
        if (-1 === a.indexOf('sticky', 9)) break;
      case 975:
        c = (a = d).length - 10;
        b = (33 === a.charCodeAt(c) ? a.substring(0, c) : a).substring(d.indexOf(':', 7) + 1).trim();
        switch (m = b.charCodeAt(0) + (b.charCodeAt(7) | 0)) {
          case 203:
            if (111 > b.charCodeAt(8)) break;
          case 115:
            a = a.replace(b, '-webkit-' + b) + ';' + a;
            break;
          case 207:
          case 102:
            a = a.replace(b, '-webkit-' + (102 < m ? 'inline-' : '') + 'box') + ';' + a.replace(b, '-webkit-' + b) + ';' + a.replace(b, '-ms-' + b + 'box') + ';' + a;
        }
        return a + ';';
      case 938:
        if (45 === a.charCodeAt(5)) switch (a.charCodeAt(6)) {
          case 105:
            return b = a.replace('-items', ''), '-webkit-' + a + '-webkit-box-' + b + '-ms-flex-' + b + a;
          case 115:
            return '-webkit-' + a + '-ms-flex-item-' + a.replace(ba, '') + a;
          default:
            return '-webkit-' + a + '-ms-flex-line-pack' + a.replace('align-content', '').replace(ba, '') + a;
        }
        break;
      case 973:
      case 989:
        if (45 !== a.charCodeAt(3) || 122 === a.charCodeAt(4)) break;
      case 931:
      case 953:
        if (!0 === la.test(d)) return 115 === (b = d.substring(d.indexOf(':') + 1)).charCodeAt(0) ? P(d.replace('stretch', 'fill-available'), c, e, h).replace(':fill-available', ':stretch') : a.replace(b, '-webkit-' + b) + a.replace(b, '-moz-' + b.replace('fill-', '')) + a;
        break;
      case 962:
        if (a = '-webkit-' + a + (102 === a.charCodeAt(5) ? '-ms-' + a : '') + a, 211 === e + h && 105 === a.charCodeAt(13) && 0 < a.indexOf('transform', 10)) return a.substring(0, a.indexOf(';', 27) + 1).replace(ma, '$1-webkit-$2') + a;
    }
    return a;
  }
  function L(d, c) {
    var e = d.indexOf(1 === c ? ':' : '{'),
      h = d.substring(0, 3 !== c ? e : 10);
    e = d.substring(e + 1, d.length - 1);
    return R(2 !== c ? h : h.replace(na, '$1'), e, c);
  }
  function ea(d, c) {
    var e = P(c, c.charCodeAt(0), c.charCodeAt(1), c.charCodeAt(2));
    return e !== c + ';' ? e.replace(oa, ' or ($1)').substring(4) : '(' + c + ')';
  }
  function H(d, c, e, h, a, m, b, v, n, q) {
    for (var g = 0, x = c, w; g < A; ++g) {
      switch (w = S[g].call(B, d, x, e, h, a, m, b, v, n, q)) {
        case void 0:
        case !1:
        case !0:
        case null:
          break;
        default:
          x = w;
      }
    }
    if (x !== c) return x;
  }
  function T(d) {
    switch (d) {
      case void 0:
      case null:
        A = S.length = 0;
        break;
      default:
        if ('function' === typeof d) S[A++] = d;else if ('object' === typeof d) for (var c = 0, e = d.length; c < e; ++c) {
          T(d[c]);
        } else Y = !!d | 0;
    }
    return T;
  }
  function U(d) {
    d = d.prefix;
    void 0 !== d && (R = null, d ? 'function' !== typeof d ? w = 1 : (w = 2, R = d) : w = 0);
    return U;
  }
  function B(d, c) {
    var e = d;
    33 > e.charCodeAt(0) && (e = e.trim());
    V = e;
    e = [V];
    if (0 < A) {
      var h = H(-1, c, e, e, D, z, 0, 0, 0, 0);
      void 0 !== h && 'string' === typeof h && (c = h);
    }
    var a = M(O, e, c, 0, 0);
    0 < A && (h = H(-2, a, e, e, D, z, a.length, 0, 0, 0), void 0 !== h && (a = h));
    V = '';
    E = 0;
    z = D = 1;
    return a;
  }
  var ca = /^\0+/g,
    N = /[\0\r\f]/g,
    aa = /: */g,
    ka = /zoo|gra/,
    ma = /([,: ])(transform)/g,
    ia = /,\r+?/g,
    F = /([\t\r\n ])*\f?&/g,
    fa = /@(k\w+)\s*(\S*)\s*/,
    Q = /::(place)/g,
    ha = /:(read-only)/g,
    G = /[svh]\w+-[tblr]{2}/,
    da = /\(\s*(.*)\s*\)/g,
    oa = /([\s\S]*?);/g,
    ba = /-self|flex-/g,
    na = /[^]*?(:[rp][el]a[\w-]+)[^]*/,
    la = /stretch|:\s*\w+\-(?:conte|avail)/,
    ja = /([^-])(image-set\()/,
    z = 1,
    D = 1,
    E = 0,
    w = 1,
    O = [],
    S = [],
    A = 0,
    R = null,
    Y = 0,
    V = '';
  B.use = T;
  B.set = U;
  void 0 !== W && U(W);
  return B;
}var unitlessKeys = {
  animationIterationCount: 1,
  borderImageOutset: 1,
  borderImageSlice: 1,
  borderImageWidth: 1,
  boxFlex: 1,
  boxFlexGroup: 1,
  boxOrdinalGroup: 1,
  columnCount: 1,
  columns: 1,
  flex: 1,
  flexGrow: 1,
  flexPositive: 1,
  flexShrink: 1,
  flexNegative: 1,
  flexOrder: 1,
  gridRow: 1,
  gridRowEnd: 1,
  gridRowSpan: 1,
  gridRowStart: 1,
  gridColumn: 1,
  gridColumnEnd: 1,
  gridColumnSpan: 1,
  gridColumnStart: 1,
  msGridRow: 1,
  msGridRowSpan: 1,
  msGridColumn: 1,
  msGridColumnSpan: 1,
  fontWeight: 1,
  lineHeight: 1,
  opacity: 1,
  order: 1,
  orphans: 1,
  tabSize: 1,
  widows: 1,
  zIndex: 1,
  zoom: 1,
  WebkitLineClamp: 1,
  // SVG-related properties
  fillOpacity: 1,
  floodOpacity: 1,
  stopOpacity: 1,
  strokeDasharray: 1,
  strokeDashoffset: 1,
  strokeMiterlimit: 1,
  strokeOpacity: 1,
  strokeWidth: 1
};function memoize(fn) {
  var cache = Object.create(null);
  return function (arg) {
    if (cache[arg] === undefined) cache[arg] = fn(arg);
    return cache[arg];
  };
}var reactPropsRegex = /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|download|draggable|encType|enterKeyHint|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/; // https://esbench.com/bench/5bfee68a4cd7e6009ef61d23

var isPropValid = /* #__PURE__ */memoize(function (prop) {
  return reactPropsRegex.test(prop) || prop.charCodeAt(0) === 111
  /* o */ && prop.charCodeAt(1) === 110
  /* n */ && prop.charCodeAt(2) < 91;
}
/* Z+1 */);var reactIs$1 = reactIsExports$1;

/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
var REACT_STATICS = {
  childContextTypes: true,
  contextType: true,
  contextTypes: true,
  defaultProps: true,
  displayName: true,
  getDefaultProps: true,
  getDerivedStateFromError: true,
  getDerivedStateFromProps: true,
  mixins: true,
  propTypes: true,
  type: true
};
var KNOWN_STATICS = {
  name: true,
  length: true,
  prototype: true,
  caller: true,
  callee: true,
  arguments: true,
  arity: true
};
var FORWARD_REF_STATICS = {
  '$$typeof': true,
  render: true,
  defaultProps: true,
  displayName: true,
  propTypes: true
};
var MEMO_STATICS = {
  '$$typeof': true,
  compare: true,
  defaultProps: true,
  displayName: true,
  propTypes: true,
  type: true
};
var TYPE_STATICS = {};
TYPE_STATICS[reactIs$1.ForwardRef] = FORWARD_REF_STATICS;
TYPE_STATICS[reactIs$1.Memo] = MEMO_STATICS;
function getStatics(component) {
  // React v16.11 and below
  if (reactIs$1.isMemo(component)) {
    return MEMO_STATICS;
  } // React v16.12 and above

  return TYPE_STATICS[component['$$typeof']] || REACT_STATICS;
}
var defineProperty$3 = Object.defineProperty;
var getOwnPropertyNames = Object.getOwnPropertyNames;
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var getPrototypeOf = Object.getPrototypeOf;
var objectPrototype = Object.prototype;
function hoistNonReactStatics(targetComponent, sourceComponent, blacklist) {
  if (typeof sourceComponent !== 'string') {
    // don't hoist over string (html) components
    if (objectPrototype) {
      var inheritedComponent = getPrototypeOf(sourceComponent);
      if (inheritedComponent && inheritedComponent !== objectPrototype) {
        hoistNonReactStatics(targetComponent, inheritedComponent, blacklist);
      }
    }
    var keys = getOwnPropertyNames(sourceComponent);
    if (getOwnPropertySymbols) {
      keys = keys.concat(getOwnPropertySymbols(sourceComponent));
    }
    var targetStatics = getStatics(targetComponent);
    var sourceStatics = getStatics(sourceComponent);
    for (var i = 0; i < keys.length; ++i) {
      var key = keys[i];
      if (!KNOWN_STATICS[key] && !(blacklist && blacklist[key]) && !(sourceStatics && sourceStatics[key]) && !(targetStatics && targetStatics[key])) {
        var descriptor = getOwnPropertyDescriptor(sourceComponent, key);
        try {
          // Avoid failures from read-only properties
          defineProperty$3(targetComponent, key, descriptor);
        } catch (e) {}
      }
    }
  }
  return targetComponent;
}
var hoistNonReactStatics_cjs = hoistNonReactStatics;function v$1() {
  return (v$1 = Object.assign || function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }).apply(this, arguments);
}
var y$1 = function (e, t) {
    for (var n = [e[0]], r = 0, o = t.length; r < o; r += 1) n.push(t[r], e[r + 1]);
    return n;
  },
  g$1 = function (t) {
    return null !== t && "object" == typeof t && "[object Object]" === (t.toString ? t.toString() : Object.prototype.toString.call(t)) && !reactIsExports$1.typeOf(t);
  },
  S = Object.freeze([]),
  w$1 = Object.freeze({});
function E$1(e) {
  return "function" == typeof e;
}
function b$1(e) {
  return e.displayName || e.name || "Component";
}
function _(e) {
  return e && "string" == typeof e.styledComponentId;
}
var N = "undefined" != typeof process && void 0 !== process.env && (process.env.REACT_APP_SC_ATTR || process.env.SC_ATTR) || "data-styled",
  C$1 = "undefined" != typeof window && "HTMLElement" in window,
  I$1 = Boolean("boolean" == typeof SC_DISABLE_SPEEDY ? SC_DISABLE_SPEEDY : "undefined" != typeof process && void 0 !== process.env && (void 0 !== process.env.REACT_APP_SC_DISABLE_SPEEDY && "" !== process.env.REACT_APP_SC_DISABLE_SPEEDY ? "false" !== process.env.REACT_APP_SC_DISABLE_SPEEDY && process.env.REACT_APP_SC_DISABLE_SPEEDY : void 0 !== process.env.SC_DISABLE_SPEEDY && "" !== process.env.SC_DISABLE_SPEEDY ? "false" !== process.env.SC_DISABLE_SPEEDY && process.env.SC_DISABLE_SPEEDY : "production" !== "production"));
function D$1(e) {
  for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++) n[r - 1] = arguments[r];
  throw new Error("An error occurred. See https://git.io/JUIaE#" + e + " for more information." + (n.length > 0 ? " Args: " + n.join(", ") : "")) ;
}
var j = function () {
    function e(e) {
      this.groupSizes = new Uint32Array(512), this.length = 512, this.tag = e;
    }
    var t = e.prototype;
    return t.indexOfGroup = function (e) {
      for (var t = 0, n = 0; n < e; n++) t += this.groupSizes[n];
      return t;
    }, t.insertRules = function (e, t) {
      if (e >= this.groupSizes.length) {
        for (var n = this.groupSizes, r = n.length, o = r; e >= o;) (o <<= 1) < 0 && D$1(16, "" + e);
        this.groupSizes = new Uint32Array(o), this.groupSizes.set(n), this.length = o;
        for (var s = r; s < o; s++) this.groupSizes[s] = 0;
      }
      for (var i = this.indexOfGroup(e + 1), a = 0, c = t.length; a < c; a++) this.tag.insertRule(i, t[a]) && (this.groupSizes[e]++, i++);
    }, t.clearGroup = function (e) {
      if (e < this.length) {
        var t = this.groupSizes[e],
          n = this.indexOfGroup(e),
          r = n + t;
        this.groupSizes[e] = 0;
        for (var o = n; o < r; o++) this.tag.deleteRule(n);
      }
    }, t.getGroup = function (e) {
      var t = "";
      if (e >= this.length || 0 === this.groupSizes[e]) return t;
      for (var n = this.groupSizes[e], r = this.indexOfGroup(e), o = r + n, s = r; s < o; s++) t += this.tag.getRule(s) + "/*!sc*/\n";
      return t;
    }, e;
  }(),
  T = new Map(),
  x$1 = new Map(),
  k$1 = 1,
  V = function (e) {
    if (T.has(e)) return T.get(e);
    for (; x$1.has(k$1);) k$1++;
    var t = k$1++;
    return T.set(e, t), x$1.set(t, e), t;
  },
  z$1 = function (e) {
    return x$1.get(e);
  },
  B$1 = function (e, t) {
    t >= k$1 && (k$1 = t + 1), T.set(e, t), x$1.set(t, e);
  },
  M = "style[" + N + '][data-styled-version="5.3.9"]',
  G$1 = new RegExp("^" + N + '\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)'),
  L = function (e, t, n) {
    for (var r, o = n.split(","), s = 0, i = o.length; s < i; s++) (r = o[s]) && e.registerName(t, r);
  },
  F$1 = function (e, t) {
    for (var n = (t.textContent || "").split("/*!sc*/\n"), r = [], o = 0, s = n.length; o < s; o++) {
      var i = n[o].trim();
      if (i) {
        var a = i.match(G$1);
        if (a) {
          var c = 0 | parseInt(a[1], 10),
            u = a[2];
          0 !== c && (B$1(u, c), L(e, u, a[3]), e.getTag().insertRules(c, r)), r.length = 0;
        } else r.push(i);
      }
    }
  },
  Y = function () {
    return "undefined" != typeof __webpack_nonce__ ? __webpack_nonce__ : null;
  },
  q$1 = function (e) {
    var t = document.head,
      n = e || t,
      r = document.createElement("style"),
      o = function (e) {
        for (var t = e.childNodes, n = t.length; n >= 0; n--) {
          var r = t[n];
          if (r && 1 === r.nodeType && r.hasAttribute(N)) return r;
        }
      }(n),
      s = void 0 !== o ? o.nextSibling : null;
    r.setAttribute(N, "active"), r.setAttribute("data-styled-version", "5.3.9");
    var i = Y();
    return i && r.setAttribute("nonce", i), n.insertBefore(r, s), r;
  },
  H$1 = function () {
    function e(e) {
      var t = this.element = q$1(e);
      t.appendChild(document.createTextNode("")), this.sheet = function (e) {
        if (e.sheet) return e.sheet;
        for (var t = document.styleSheets, n = 0, r = t.length; n < r; n++) {
          var o = t[n];
          if (o.ownerNode === e) return o;
        }
        D$1(17);
      }(t), this.length = 0;
    }
    var t = e.prototype;
    return t.insertRule = function (e, t) {
      try {
        return this.sheet.insertRule(t, e), this.length++, !0;
      } catch (e) {
        return !1;
      }
    }, t.deleteRule = function (e) {
      this.sheet.deleteRule(e), this.length--;
    }, t.getRule = function (e) {
      var t = this.sheet.cssRules[e];
      return void 0 !== t && "string" == typeof t.cssText ? t.cssText : "";
    }, e;
  }(),
  $ = function () {
    function e(e) {
      var t = this.element = q$1(e);
      this.nodes = t.childNodes, this.length = 0;
    }
    var t = e.prototype;
    return t.insertRule = function (e, t) {
      if (e <= this.length && e >= 0) {
        var n = document.createTextNode(t),
          r = this.nodes[e];
        return this.element.insertBefore(n, r || null), this.length++, !0;
      }
      return !1;
    }, t.deleteRule = function (e) {
      this.element.removeChild(this.nodes[e]), this.length--;
    }, t.getRule = function (e) {
      return e < this.length ? this.nodes[e].textContent : "";
    }, e;
  }(),
  W = function () {
    function e(e) {
      this.rules = [], this.length = 0;
    }
    var t = e.prototype;
    return t.insertRule = function (e, t) {
      return e <= this.length && (this.rules.splice(e, 0, t), this.length++, !0);
    }, t.deleteRule = function (e) {
      this.rules.splice(e, 1), this.length--;
    }, t.getRule = function (e) {
      return e < this.length ? this.rules[e] : "";
    }, e;
  }(),
  U = C$1,
  J = {
    isServer: !C$1,
    useCSSOMInjection: !I$1
  },
  X = function () {
    function e(e, t, n) {
      void 0 === e && (e = w$1), void 0 === t && (t = {}), this.options = v$1({}, J, {}, e), this.gs = t, this.names = new Map(n), this.server = !!e.isServer, !this.server && C$1 && U && (U = !1, function (e) {
        for (var t = document.querySelectorAll(M), n = 0, r = t.length; n < r; n++) {
          var o = t[n];
          o && "active" !== o.getAttribute(N) && (F$1(e, o), o.parentNode && o.parentNode.removeChild(o));
        }
      }(this));
    }
    e.registerId = function (e) {
      return V(e);
    };
    var t = e.prototype;
    return t.reconstructWithOptions = function (t, n) {
      return void 0 === n && (n = !0), new e(v$1({}, this.options, {}, t), this.gs, n && this.names || void 0);
    }, t.allocateGSInstance = function (e) {
      return this.gs[e] = (this.gs[e] || 0) + 1;
    }, t.getTag = function () {
      return this.tag || (this.tag = (n = (t = this.options).isServer, r = t.useCSSOMInjection, o = t.target, e = n ? new W(o) : r ? new H$1(o) : new $(o), new j(e)));
      var e, t, n, r, o;
    }, t.hasNameForId = function (e, t) {
      return this.names.has(e) && this.names.get(e).has(t);
    }, t.registerName = function (e, t) {
      if (V(e), this.names.has(e)) this.names.get(e).add(t);else {
        var n = new Set();
        n.add(t), this.names.set(e, n);
      }
    }, t.insertRules = function (e, t, n) {
      this.registerName(e, t), this.getTag().insertRules(V(e), n);
    }, t.clearNames = function (e) {
      this.names.has(e) && this.names.get(e).clear();
    }, t.clearRules = function (e) {
      this.getTag().clearGroup(V(e)), this.clearNames(e);
    }, t.clearTag = function () {
      this.tag = void 0;
    }, t.toString = function () {
      return function (e) {
        for (var t = e.getTag(), n = t.length, r = "", o = 0; o < n; o++) {
          var s = z$1(o);
          if (void 0 !== s) {
            var i = e.names.get(s),
              a = t.getGroup(o);
            if (i && a && i.size) {
              var c = N + ".g" + o + '[id="' + s + '"]',
                u = "";
              void 0 !== i && i.forEach(function (e) {
                e.length > 0 && (u += e + ",");
              }), r += "" + a + c + '{content:"' + u + '"}/*!sc*/\n';
            }
          }
        }
        return r;
      }(this);
    }, e;
  }(),
  Z = /(a)(d)/gi,
  K = function (e) {
    return String.fromCharCode(e + (e > 25 ? 39 : 97));
  };
function Q(e) {
  var t,
    n = "";
  for (t = Math.abs(e); t > 52; t = t / 52 | 0) n = K(t % 52) + n;
  return (K(t % 52) + n).replace(Z, "$1-$2");
}
var ee = function (e, t) {
    for (var n = t.length; n;) e = 33 * e ^ t.charCodeAt(--n);
    return e;
  },
  te = function (e) {
    return ee(5381, e);
  };
function ne(e) {
  for (var t = 0; t < e.length; t += 1) {
    var n = e[t];
    if (E$1(n) && !_(n)) return !1;
  }
  return !0;
}
var re = te("5.3.9"),
  oe = function () {
    function e(e, t, n) {
      this.rules = e, this.staticRulesId = "", this.isStatic = (void 0 === n || n.isStatic) && ne(e), this.componentId = t, this.baseHash = ee(re, t), this.baseStyle = n, X.registerId(t);
    }
    return e.prototype.generateAndInjectStyles = function (e, t, n) {
      var r = this.componentId,
        o = [];
      if (this.baseStyle && o.push(this.baseStyle.generateAndInjectStyles(e, t, n)), this.isStatic && !n.hash) {
        if (this.staticRulesId && t.hasNameForId(r, this.staticRulesId)) o.push(this.staticRulesId);else {
          var s = _e(this.rules, e, t, n).join(""),
            i = Q(ee(this.baseHash, s) >>> 0);
          if (!t.hasNameForId(r, i)) {
            var a = n(s, "." + i, void 0, r);
            t.insertRules(r, i, a);
          }
          o.push(i), this.staticRulesId = i;
        }
      } else {
        for (var c = this.rules.length, u = ee(this.baseHash, n.hash), l = "", d = 0; d < c; d++) {
          var h = this.rules[d];
          if ("string" == typeof h) l += h;else if (h) {
            var p = _e(h, e, t, n),
              f = Array.isArray(p) ? p.join("") : p;
            u = ee(u, f + d), l += f;
          }
        }
        if (l) {
          var m = Q(u >>> 0);
          if (!t.hasNameForId(r, m)) {
            var v = n(l, "." + m, void 0, r);
            t.insertRules(r, m, v);
          }
          o.push(m);
        }
      }
      return o.join(" ");
    }, e;
  }(),
  se = /^\s*\/\/.*$/gm,
  ie = [":", "[", ".", "#"];
function ae(e) {
  var t,
    n,
    r,
    o,
    s = void 0 === e ? w$1 : e,
    i = s.options,
    a = void 0 === i ? w$1 : i,
    c = s.plugins,
    u = void 0 === c ? S : c,
    l = new stylis_min(a),
    d = [],
    p = function (e) {
      function t(t) {
        if (t) try {
          e(t + "}");
        } catch (e) {}
      }
      return function (n, r, o, s, i, a, c, u, l, d) {
        switch (n) {
          case 1:
            if (0 === l && 64 === r.charCodeAt(0)) return e(r + ";"), "";
            break;
          case 2:
            if (0 === u) return r + "/*|*/";
            break;
          case 3:
            switch (u) {
              case 102:
              case 112:
                return e(o[0] + r), "";
              default:
                return r + (0 === d ? "/*|*/" : "");
            }
          case -2:
            r.split("/*|*/}").forEach(t);
        }
      };
    }(function (e) {
      d.push(e);
    }),
    f = function (e, r, s) {
      return 0 === r && -1 !== ie.indexOf(s[n.length]) || s.match(o) ? e : "." + t;
    };
  function m(e, s, i, a) {
    void 0 === a && (a = "&");
    var c = e.replace(se, ""),
      u = s && i ? i + " " + s + " { " + c + " }" : c;
    return t = a, n = s, r = new RegExp("\\" + n + "\\b", "g"), o = new RegExp("(\\" + n + "\\b){2,}"), l(i || !s ? "" : s, u);
  }
  return l.use([].concat(u, [function (e, t, o) {
    2 === e && o.length && o[0].lastIndexOf(n) > 0 && (o[0] = o[0].replace(r, f));
  }, p, function (e) {
    if (-2 === e) {
      var t = d;
      return d = [], t;
    }
  }])), m.hash = u.length ? u.reduce(function (e, t) {
    return t.name || D$1(15), ee(e, t.name);
  }, 5381).toString() : "", m;
}
var ce = /*#__PURE__*/React.createContext();
  ce.Consumer;
  var le = /*#__PURE__*/React.createContext(),
  de = (le.Consumer, new X()),
  he = ae();
function pe() {
  return reactExports.useContext(ce) || de;
}
function fe() {
  return reactExports.useContext(le) || he;
}
var ve = function () {
    function e(e, t) {
      var n = this;
      this.inject = function (e, t) {
        void 0 === t && (t = he);
        var r = n.name + t.hash;
        e.hasNameForId(n.id, r) || e.insertRules(n.id, r, t(n.rules, r, "@keyframes"));
      }, this.toString = function () {
        return D$1(12, String(n.name));
      }, this.name = e, this.id = "sc-keyframes-" + e, this.rules = t;
    }
    return e.prototype.getName = function (e) {
      return void 0 === e && (e = he), this.name + e.hash;
    }, e;
  }(),
  ye = /([A-Z])/,
  ge = /([A-Z])/g,
  Se = /^ms-/,
  we = function (e) {
    return "-" + e.toLowerCase();
  };
function Ee(e) {
  return ye.test(e) ? e.replace(ge, we).replace(Se, "-ms-") : e;
}
var be = function (e) {
  return null == e || !1 === e || "" === e;
};
function _e(e, n, r, o) {
  if (Array.isArray(e)) {
    for (var s, i = [], a = 0, c = e.length; a < c; a += 1) "" !== (s = _e(e[a], n, r, o)) && (Array.isArray(s) ? i.push.apply(i, s) : i.push(s));
    return i;
  }
  if (be(e)) return "";
  if (_(e)) return "." + e.styledComponentId;
  if (E$1(e)) {
    if ("function" != typeof (l = e) || l.prototype && l.prototype.isReactComponent || !n) return e;
    var u = e(n);
    return _e(u, n, r, o);
  }
  var l;
  return e instanceof ve ? r ? (e.inject(r, o), e.getName(o)) : e : g$1(e) ? function e(t, n) {
    var r,
      o,
      s = [];
    for (var i in t) t.hasOwnProperty(i) && !be(t[i]) && (Array.isArray(t[i]) && t[i].isCss || E$1(t[i]) ? s.push(Ee(i) + ":", t[i], ";") : g$1(t[i]) ? s.push.apply(s, e(t[i], i)) : s.push(Ee(i) + ": " + (r = i, null == (o = t[i]) || "boolean" == typeof o || "" === o ? "" : "number" != typeof o || 0 === o || r in unitlessKeys ? String(o).trim() : o + "px") + ";"));
    return n ? [n + " {"].concat(s, ["}"]) : s;
  }(e) : e.toString();
}
var Ne = function (e) {
  return Array.isArray(e) && (e.isCss = !0), e;
};
function Ae(e) {
  for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++) n[r - 1] = arguments[r];
  return E$1(e) || g$1(e) ? Ne(_e(y$1(S, [e].concat(n)))) : 0 === n.length && 1 === e.length && "string" == typeof e[0] ? e : Ne(_e(y$1(e, n)));
}
var Oe = function (e, t, n) {
    return void 0 === n && (n = w$1), e.theme !== n.theme && e.theme || t || n.theme;
  },
  Re = /[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g,
  De = /(^-|-$)/g;
function je(e) {
  return e.replace(Re, "-").replace(De, "");
}
var Te = function (e) {
  return Q(te(e) >>> 0);
};
function xe(e) {
  return "string" == typeof e && ("production" === "production" );
}
var ke = function (e) {
    return "function" == typeof e || "object" == typeof e && null !== e && !Array.isArray(e);
  },
  Ve = function (e) {
    return "__proto__" !== e && "constructor" !== e && "prototype" !== e;
  };
function ze(e, t, n) {
  var r = e[n];
  ke(t) && ke(r) ? Be(r, t) : e[n] = t;
}
function Be(e) {
  for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++) n[r - 1] = arguments[r];
  for (var o = 0, s = n; o < s.length; o++) {
    var i = s[o];
    if (ke(i)) for (var a in i) Ve(a) && ze(e, i[a], a);
  }
  return e;
}
var Me = /*#__PURE__*/React.createContext();
  Me.Consumer;
function Le(e) {
  var t = reactExports.useContext(Me),
    n = reactExports.useMemo(function () {
      return function (e, t) {
        if (!e) return D$1(14);
        if (E$1(e)) {
          var n = e(t);
          return n ;
        }
        return Array.isArray(e) || "object" != typeof e ? D$1(8) : t ? v$1({}, t, {}, e) : e;
      }(e.theme, t);
    }, [e.theme, t]);
  return e.children ? /*#__PURE__*/React.createElement(Me.Provider, {
    value: n
  }, e.children) : null;
}
var Fe = {};
function Ye(e, t, n) {
  var o = _(e),
    i = !xe(e),
    a = t.attrs,
    c = void 0 === a ? S : a,
    d = t.componentId,
    h = void 0 === d ? function (e, t) {
      var n = "string" != typeof e ? "sc" : je(e);
      Fe[n] = (Fe[n] || 0) + 1;
      var r = n + "-" + Te("5.3.9" + n + Fe[n]);
      return t ? t + "-" + r : r;
    }(t.displayName, t.parentComponentId) : d,
    p = t.displayName,
    y = void 0 === p ? function (e) {
      return xe(e) ? "styled." + e : "Styled(" + b$1(e) + ")";
    }(e) : p,
    g = t.displayName && t.componentId ? je(t.displayName) + "-" + t.componentId : t.componentId || h,
    N = o && e.attrs ? Array.prototype.concat(e.attrs, c).filter(Boolean) : c,
    A = t.shouldForwardProp;
  o && e.shouldForwardProp && (A = t.shouldForwardProp ? function (n, r, o) {
    return e.shouldForwardProp(n, r, o) && t.shouldForwardProp(n, r, o);
  } : e.shouldForwardProp);
  var C,
    I = new oe(n, g, o ? e.componentStyle : void 0),
    P = I.isStatic && 0 === c.length,
    O = function (e, t) {
      return function (e, t, n, r) {
        var o = e.attrs,
          i = e.componentStyle,
          a = e.defaultProps,
          c = e.foldedComponentIds,
          d = e.shouldForwardProp,
          h = e.styledComponentId,
          p = e.target;
        var m = function (e, t, n) {
            void 0 === e && (e = w$1);
            var r = v$1({}, t, {
                theme: e
              }),
              o = {};
            return n.forEach(function (e) {
              var t,
                n,
                s,
                i = e;
              for (t in E$1(i) && (i = i(r)), i) r[t] = o[t] = "className" === t ? (n = o[t], s = i[t], n && s ? n + " " + s : n || s) : i[t];
            }), [r, o];
          }(Oe(t, reactExports.useContext(Me), a) || w$1, t, o),
          y = m[0],
          g = m[1],
          S = function (e, t, n, r) {
            var o = pe(),
              s = fe(),
              i = t ? e.generateAndInjectStyles(w$1, o, s) : e.generateAndInjectStyles(n, o, s);
            return i;
          }(i, r, y),
          b = n,
          _ = g.$as || t.$as || g.as || t.as || p,
          N = xe(_),
          A = g !== t ? v$1({}, t, {}, g) : t,
          C = {};
        for (var I in A) "$" !== I[0] && "as" !== I && ("forwardedAs" === I ? C.as = A[I] : (d ? d(I, isPropValid, _) : !N || isPropValid(I)) && (C[I] = A[I]));
        return t.style && g.style !== t.style && (C.style = v$1({}, t.style, {}, g.style)), C.className = Array.prototype.concat(c, h, S !== h ? S : null, t.className, g.className).filter(Boolean).join(" "), C.ref = b, /*#__PURE__*/reactExports.createElement(_, C);
      }(C, e, t, P);
    };
  return O.displayName = y, (C = /*#__PURE__*/React.forwardRef(O)).attrs = N, C.componentStyle = I, C.displayName = y, C.shouldForwardProp = A, C.foldedComponentIds = o ? Array.prototype.concat(e.foldedComponentIds, e.styledComponentId) : S, C.styledComponentId = g, C.target = o ? e.target : e, C.withComponent = function (e) {
    var r = t.componentId,
      o = function (e, t) {
        if (null == e) return {};
        var n,
          r,
          o = {},
          s = Object.keys(e);
        for (r = 0; r < s.length; r++) n = s[r], t.indexOf(n) >= 0 || (o[n] = e[n]);
        return o;
      }(t, ["componentId"]),
      s = r && r + "-" + (xe(e) ? e : je(b$1(e)));
    return Ye(e, v$1({}, o, {
      attrs: N,
      componentId: s
    }), n);
  }, Object.defineProperty(C, "defaultProps", {
    get: function () {
      return this._foldedDefaultProps;
    },
    set: function (t) {
      this._foldedDefaultProps = o ? Be({}, e.defaultProps, t) : t;
    }
  }), Object.defineProperty(C, "toString", {
    value: function () {
      return "." + C.styledComponentId;
    }
  }), i && hoistNonReactStatics_cjs(C, e, {
    attrs: !0,
    componentStyle: !0,
    displayName: !0,
    foldedComponentIds: !0,
    shouldForwardProp: !0,
    styledComponentId: !0,
    target: !0,
    withComponent: !0
  }), C;
}
var qe = function (e) {
  return function e(t, r, o) {
    if (void 0 === o && (o = w$1), !reactIsExports$1.isValidElementType(r)) return D$1(1, String(r));
    var s = function () {
      return t(r, o, Ae.apply(void 0, arguments));
    };
    return s.withConfig = function (n) {
      return e(t, r, v$1({}, o, {}, n));
    }, s.attrs = function (n) {
      return e(t, r, v$1({}, o, {
        attrs: Array.prototype.concat(o.attrs, n).filter(Boolean)
      }));
    }, s;
  }(Ye, e);
};
["a", "abbr", "address", "area", "article", "aside", "audio", "b", "base", "bdi", "bdo", "big", "blockquote", "body", "br", "button", "canvas", "caption", "cite", "code", "col", "colgroup", "data", "datalist", "dd", "del", "details", "dfn", "dialog", "div", "dl", "dt", "em", "embed", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "iframe", "img", "input", "ins", "kbd", "keygen", "label", "legend", "li", "link", "main", "map", "mark", "marquee", "menu", "menuitem", "meta", "meter", "nav", "noscript", "object", "ol", "optgroup", "option", "output", "p", "param", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "script", "section", "select", "small", "source", "span", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "textarea", "tfoot", "th", "thead", "time", "title", "tr", "track", "u", "ul", "var", "video", "wbr", "circle", "clipPath", "defs", "ellipse", "foreignObject", "g", "image", "line", "linearGradient", "marker", "mask", "path", "pattern", "polygon", "polyline", "radialGradient", "rect", "stop", "svg", "text", "textPath", "tspan"].forEach(function (e) {
  qe[e] = qe(e);
});
function We(e) {
  for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++) n[r - 1] = arguments[r];
  var o = Ae.apply(void 0, [e].concat(n)).join(""),
    s = Te(o);
  return new ve(s, o);
}
var styled = qe;var propTypesExports = {};
var propTypes = {
  get exports(){ return propTypesExports; },
  set exports(v){ propTypesExports = v; },
};/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var ReactPropTypesSecret$1 = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';
var ReactPropTypesSecret_1 = ReactPropTypesSecret$1;/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var ReactPropTypesSecret = ReactPropTypesSecret_1;
function emptyFunction() {}
function emptyFunctionWithReset() {}
emptyFunctionWithReset.resetWarningCache = emptyFunction;
var factoryWithThrowingShims = function () {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }
    var err = new Error('Calling PropTypes validators directly is not supported by the `prop-types` package. ' + 'Use PropTypes.checkPropTypes() to call them. ' + 'Read more at http://fb.me/use-check-prop-types');
    err.name = 'Invariant Violation';
    throw err;
  }
  shim.isRequired = shim;
  function getShim() {
    return shim;
  }
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bigint: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,
    any: shim,
    arrayOf: getShim,
    element: shim,
    elementType: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim,
    checkPropTypes: emptyFunctionWithReset,
    resetWarningCache: emptyFunction
  };
  ReactPropTypes.PropTypes = ReactPropTypes;
  return ReactPropTypes;
};/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

{
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  propTypes.exports = factoryWithThrowingShims();
}/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */
const INPUT_TYPES_WHITE_LIST = {
  text: true,
  search: true,
  url: true,
  tel: true,
  email: true,
  password: true,
  number: true,
  date: true,
  month: true,
  week: true,
  time: true,
  datetime: true,
  'datetime-local': true
};
function useFocusVisible(_temp) {
  let {
    scope,
    relativeDocument,
    className = 'garden-focus-visible',
    dataAttribute = 'data-garden-focus-visible'
  } = _temp === void 0 ? {} : _temp;
  if (!scope) {
    throw new Error('Error: the useFocusVisible() hook requires a "scope" property');
  }
  const hadKeyboardEvent = reactExports.useRef(false);
  const hadFocusVisibleRecently = reactExports.useRef(false);
  const hadFocusVisibleRecentlyTimeout = reactExports.useRef();
  reactExports.useEffect(() => {
    let environment = relativeDocument;
    if (!environment) {
      environment = document;
    }
    const isValidFocusTarget = el => {
      if (el && el !== scope.current && el.nodeName !== 'HTML' && el.nodeName !== 'BODY' && 'classList' in el && 'contains' in el.classList) {
        return true;
      }
      return false;
    };
    const focusTriggersKeyboardModality = el => {
      const type = el.type;
      const tagName = el.tagName;
      if (tagName === 'INPUT' && INPUT_TYPES_WHITE_LIST[type] && !el.readOnly) {
        return true;
      }
      if (tagName === 'TEXTAREA' && !el.readOnly) {
        return true;
      }
      if (el.isContentEditable) {
        return true;
      }
      return false;
    };
    const isFocused = el => {
      if (el && (el.classList.contains(className) || el.hasAttribute(dataAttribute))) {
        return true;
      }
      return false;
    };
    const addFocusVisibleClass = el => {
      if (isFocused(el)) {
        return;
      }
      el && el.classList.add(className);
      el && el.setAttribute(dataAttribute, 'true');
    };
    const removeFocusVisibleClass = el => {
      el.classList.remove(className);
      el.removeAttribute(dataAttribute);
    };
    const onKeyDown = e => {
      if (e.metaKey || e.altKey || e.ctrlKey) {
        return;
      }
      if (isValidFocusTarget(environment.activeElement)) {
        addFocusVisibleClass(environment.activeElement);
      }
      hadKeyboardEvent.current = true;
    };
    const onPointerDown = () => {
      hadKeyboardEvent.current = false;
    };
    const onFocus = e => {
      if (!isValidFocusTarget(e.target)) {
        return;
      }
      if (hadKeyboardEvent.current || focusTriggersKeyboardModality(e.target)) {
        addFocusVisibleClass(e.target);
      }
    };
    const onBlur = e => {
      if (!isValidFocusTarget(e.target)) {
        return;
      }
      if (isFocused(e.target)) {
        hadFocusVisibleRecently.current = true;
        clearTimeout(hadFocusVisibleRecentlyTimeout.current);
        const timeoutId = setTimeout(() => {
          hadFocusVisibleRecently.current = false;
          clearTimeout(hadFocusVisibleRecentlyTimeout.current);
        }, 100);
        hadFocusVisibleRecentlyTimeout.current = Number(timeoutId);
        removeFocusVisibleClass(e.target);
      }
    };
    const onInitialPointerMove = e => {
      const nodeName = e.target.nodeName;
      if (nodeName && nodeName.toLowerCase() === 'html') {
        return;
      }
      hadKeyboardEvent.current = false;
      removeInitialPointerMoveListeners();
    };
    const addInitialPointerMoveListeners = () => {
      environment.addEventListener('mousemove', onInitialPointerMove);
      environment.addEventListener('mousedown', onInitialPointerMove);
      environment.addEventListener('mouseup', onInitialPointerMove);
      environment.addEventListener('pointermove', onInitialPointerMove);
      environment.addEventListener('pointerdown', onInitialPointerMove);
      environment.addEventListener('pointerup', onInitialPointerMove);
      environment.addEventListener('touchmove', onInitialPointerMove);
      environment.addEventListener('touchstart', onInitialPointerMove);
      environment.addEventListener('touchend', onInitialPointerMove);
    };
    const removeInitialPointerMoveListeners = () => {
      environment.removeEventListener('mousemove', onInitialPointerMove);
      environment.removeEventListener('mousedown', onInitialPointerMove);
      environment.removeEventListener('mouseup', onInitialPointerMove);
      environment.removeEventListener('pointermove', onInitialPointerMove);
      environment.removeEventListener('pointerdown', onInitialPointerMove);
      environment.removeEventListener('pointerup', onInitialPointerMove);
      environment.removeEventListener('touchmove', onInitialPointerMove);
      environment.removeEventListener('touchstart', onInitialPointerMove);
      environment.removeEventListener('touchend', onInitialPointerMove);
    };
    const onVisibilityChange = () => {
      if (environment.visibilityState === 'hidden') {
        if (hadFocusVisibleRecently.current) {
          hadKeyboardEvent.current = true;
        }
      }
    };
    const currentScope = scope.current;
    if (!environment || !currentScope) {
      return;
    }
    environment.addEventListener('keydown', onKeyDown, true);
    environment.addEventListener('mousedown', onPointerDown, true);
    environment.addEventListener('pointerdown', onPointerDown, true);
    environment.addEventListener('touchstart', onPointerDown, true);
    environment.addEventListener('visibilitychange', onVisibilityChange, true);
    addInitialPointerMoveListeners();
    currentScope && currentScope.addEventListener('focus', onFocus, true);
    currentScope && currentScope.addEventListener('blur', onBlur, true);
    return () => {
      environment.removeEventListener('keydown', onKeyDown);
      environment.removeEventListener('mousedown', onPointerDown);
      environment.removeEventListener('pointerdown', onPointerDown);
      environment.removeEventListener('touchstart', onPointerDown);
      environment.removeEventListener('visibilityChange', onVisibilityChange);
      removeInitialPointerMoveListeners();
      currentScope && currentScope.removeEventListener('focus', onFocus);
      currentScope && currentScope.removeEventListener('blur', onBlur);
      clearTimeout(hadFocusVisibleRecentlyTimeout.current);
    };
  }, [relativeDocument, scope, className, dataAttribute]);
}
({
  children: propTypesExports.func,
  render: propTypesExports.func,
  relativeDocument: propTypesExports.object,
  className: propTypesExports.string,
  dataAttribute: propTypesExports.string
});/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */
function composeEventHandlers$1() {
  for (var _len = arguments.length, fns = new Array(_len), _key = 0; _key < _len; _key++) {
    fns[_key] = arguments[_key];
  }
  return function (event) {
    for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }
    return fns.some(fn => {
      fn && fn(event, ...args);
      return event && event.defaultPrevented;
    });
  };
}
function getControlledValue() {
  for (var _len = arguments.length, values = new Array(_len), _key = 0; _key < _len; _key++) {
    values[_key] = arguments[_key];
  }
  for (const value of values) {
    if (value !== undefined) {
      return value;
    }
  }
  return undefined;
}
const KEY_CODES = {
  ALT: 18,
  ASTERISK: 170,
  BACKSPACE: 8,
  COMMA: 188,
  DELETE: 46,
  DOWN: 40,
  END: 35,
  ENTER: 13,
  ESCAPE: 27,
  HOME: 36,
  LEFT: 37,
  NUMPAD_ADD: 107,
  NUMPAD_DECIMAL: 110,
  NUMPAD_DIVIDE: 111,
  NUMPAD_ENTER: 108,
  NUMPAD_MULTIPLY: 106,
  NUMPAD_SUBTRACT: 109,
  PAGE_DOWN: 34,
  PAGE_UP: 33,
  PERIOD: 190,
  RIGHT: 39,
  SHIFT: 16,
  SPACE: 32,
  TAB: 9,
  UP: 38
};
const KEYS$1 = {
  ALT: 'Alt',
  ASTERISK: '*',
  BACKSPACE: 'Backspace',
  COMMA: ',',
  DELETE: 'Delete',
  DOWN: 'ArrowDown',
  END: 'End',
  ENTER: 'Enter',
  ESCAPE: 'Escape',
  HOME: 'Home',
  LEFT: 'ArrowLeft',
  NUMPAD_ADD: 'Add',
  NUMPAD_DECIMAL: 'Decimal',
  NUMPAD_DIVIDE: 'Divide',
  NUMPAD_ENTER: 'Enter',
  NUMPAD_MULTIPLY: 'Multiply',
  NUMPAD_SUBTRACT: 'Subtract',
  PAGE_DOWN: 'PageDown',
  PAGE_UP: 'PageUp',
  PERIOD: '.',
  RIGHT: 'ArrowRight',
  SHIFT: 'Shift',
  SPACE: ' ',
  TAB: 'Tab',
  UNIDENTIFIED: 'Unidentified',
  UP: 'ArrowUp'
};
var DocumentPosition$1;
(function (DocumentPosition) {
  DocumentPosition[DocumentPosition["DISCONNECTED"] = 1] = "DISCONNECTED";
  DocumentPosition[DocumentPosition["PRECEDING"] = 2] = "PRECEDING";
  DocumentPosition[DocumentPosition["FOLLOWING"] = 4] = "FOLLOWING";
  DocumentPosition[DocumentPosition["CONTAINS"] = 8] = "CONTAINS";
  DocumentPosition[DocumentPosition["CONTAINED_BY"] = 16] = "CONTAINED_BY";
  DocumentPosition[DocumentPosition["IMPLEMENTATION_SPECIFIC"] = 32] = "IMPLEMENTATION_SPECIFIC";
})(DocumentPosition$1 || (DocumentPosition$1 = {}));function _extends$x() {
  _extends$x = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends$x.apply(this, arguments);
}function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  _setPrototypeOf(subClass, superClass);
}function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}function _construct(Parent, args, Class) {
  if (_isNativeReflectConstruct()) {
    _construct = Reflect.construct.bind();
  } else {
    _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) _setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }
  return _construct.apply(null, arguments);
}function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? new Map() : undefined;
  _wrapNativeSuper = function _wrapNativeSuper(Class) {
    if (Class === null || !_isNativeFunction(Class)) return Class;
    if (typeof Class !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }
    if (typeof _cache !== "undefined") {
      if (_cache.has(Class)) return _cache.get(Class);
      _cache.set(Class, Wrapper);
    }
    function Wrapper() {
      return _construct(Class, arguments, _getPrototypeOf(this).constructor);
    }
    Wrapper.prototype = Object.create(Class.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return _setPrototypeOf(Wrapper, Class);
  };
  return _wrapNativeSuper(Class);
}function last() {
  var _ref;
  return _ref = arguments.length - 1, _ref < 0 || arguments.length <= _ref ? undefined : arguments[_ref];
}
function negation(a) {
  return -a;
}
function addition(a, b) {
  return a + b;
}
function subtraction(a, b) {
  return a - b;
}
function multiplication(a, b) {
  return a * b;
}
function division(a, b) {
  return a / b;
}
function max() {
  return Math.max.apply(Math, arguments);
}
function min() {
  return Math.min.apply(Math, arguments);
}
function comma() {
  return Array.of.apply(Array, arguments);
}
var defaultSymbols = {
  symbols: {
    '*': {
      infix: {
        symbol: '*',
        f: multiplication,
        notation: 'infix',
        precedence: 4,
        rightToLeft: 0,
        argCount: 2
      },
      symbol: '*',
      regSymbol: '\\*'
    },
    '/': {
      infix: {
        symbol: '/',
        f: division,
        notation: 'infix',
        precedence: 4,
        rightToLeft: 0,
        argCount: 2
      },
      symbol: '/',
      regSymbol: '/'
    },
    '+': {
      infix: {
        symbol: '+',
        f: addition,
        notation: 'infix',
        precedence: 2,
        rightToLeft: 0,
        argCount: 2
      },
      prefix: {
        symbol: '+',
        f: last,
        notation: 'prefix',
        precedence: 3,
        rightToLeft: 0,
        argCount: 1
      },
      symbol: '+',
      regSymbol: '\\+'
    },
    '-': {
      infix: {
        symbol: '-',
        f: subtraction,
        notation: 'infix',
        precedence: 2,
        rightToLeft: 0,
        argCount: 2
      },
      prefix: {
        symbol: '-',
        f: negation,
        notation: 'prefix',
        precedence: 3,
        rightToLeft: 0,
        argCount: 1
      },
      symbol: '-',
      regSymbol: '-'
    },
    ',': {
      infix: {
        symbol: ',',
        f: comma,
        notation: 'infix',
        precedence: 1,
        rightToLeft: 0,
        argCount: 2
      },
      symbol: ',',
      regSymbol: ','
    },
    '(': {
      prefix: {
        symbol: '(',
        f: last,
        notation: 'prefix',
        precedence: 0,
        rightToLeft: 0,
        argCount: 1
      },
      symbol: '(',
      regSymbol: '\\('
    },
    ')': {
      postfix: {
        symbol: ')',
        f: undefined,
        notation: 'postfix',
        precedence: 0,
        rightToLeft: 0,
        argCount: 1
      },
      symbol: ')',
      regSymbol: '\\)'
    },
    min: {
      func: {
        symbol: 'min',
        f: min,
        notation: 'func',
        precedence: 0,
        rightToLeft: 0,
        argCount: 1
      },
      symbol: 'min',
      regSymbol: 'min\\b'
    },
    max: {
      func: {
        symbol: 'max',
        f: max,
        notation: 'func',
        precedence: 0,
        rightToLeft: 0,
        argCount: 1
      },
      symbol: 'max',
      regSymbol: 'max\\b'
    }
  }
};
var defaultSymbolMap = defaultSymbols;
/**
 * Create an error file out of errors.md for development and a simple web link to the full errors
 * in production mode.
 * @private
 */

var PolishedError = /*#__PURE__*/function (_Error) {
  _inheritsLoose(PolishedError, _Error);
  function PolishedError(code) {
    var _this;
    {
      _this = _Error.call(this, "An error occurred. See https://github.com/styled-components/polished/blob/main/src/internalHelpers/errors.md#" + code + " for more information.") || this;
    }
    return _assertThisInitialized(_this);
  }
  return PolishedError;
}( /*#__PURE__*/_wrapNativeSuper(Error));
var unitRegExp = /((?!\w)a|na|hc|mc|dg|me[r]?|xe|ni(?![a-zA-Z])|mm|cp|tp|xp|q(?!s)|hv|xamv|nimv|wv|sm|s(?!\D|$)|ged|darg?|nrut)/g; // Merges additional math functionality into the defaults.

function mergeSymbolMaps(additionalSymbols) {
  var symbolMap = {};
  symbolMap.symbols = additionalSymbols ? _extends$x({}, defaultSymbolMap.symbols, additionalSymbols.symbols) : _extends$x({}, defaultSymbolMap.symbols);
  return symbolMap;
}
function exec(operators, values) {
  var _ref;
  var op = operators.pop();
  values.push(op.f.apply(op, (_ref = []).concat.apply(_ref, values.splice(-op.argCount))));
  return op.precedence;
}
function calculate(expression, additionalSymbols) {
  var symbolMap = mergeSymbolMaps(additionalSymbols);
  var match;
  var operators = [symbolMap.symbols['('].prefix];
  var values = [];
  var pattern = new RegExp(
  // Pattern for numbers
  "\\d+(?:\\.\\d+)?|" +
  // ...and patterns for individual operators/function names
  Object.keys(symbolMap.symbols).map(function (key) {
    return symbolMap.symbols[key];
  }) // longer symbols should be listed first
  // $FlowFixMe
  .sort(function (a, b) {
    return b.symbol.length - a.symbol.length;
  }) // $FlowFixMe
  .map(function (val) {
    return val.regSymbol;
  }).join('|') + "|(\\S)", 'g');
  pattern.lastIndex = 0; // Reset regular expression object

  var afterValue = false;
  do {
    match = pattern.exec(expression);
    var _ref2 = match || [')', undefined],
      token = _ref2[0],
      bad = _ref2[1];
    var notNumber = symbolMap.symbols[token];
    var notNewValue = notNumber && !notNumber.prefix && !notNumber.func;
    var notAfterValue = !notNumber || !notNumber.postfix && !notNumber.infix; // Check for syntax errors:

    if (bad || (afterValue ? notAfterValue : notNewValue)) {
      throw new PolishedError(37, match ? match.index : expression.length, expression);
    }
    if (afterValue) {
      // We either have an infix or postfix operator (they should be mutually exclusive)
      var curr = notNumber.postfix || notNumber.infix;
      do {
        var prev = operators[operators.length - 1];
        if ((curr.precedence - prev.precedence || prev.rightToLeft) > 0) break; // Apply previous operator, since it has precedence over current one
      } while (exec(operators, values)); // Exit loop after executing an opening parenthesis or function

      afterValue = curr.notation === 'postfix';
      if (curr.symbol !== ')') {
        operators.push(curr); // Postfix always has precedence over any operator that follows after it

        if (afterValue) exec(operators, values);
      }
    } else if (notNumber) {
      // prefix operator or function
      operators.push(notNumber.prefix || notNumber.func);
      if (notNumber.func) {
        // Require an opening parenthesis
        match = pattern.exec(expression);
        if (!match || match[0] !== '(') {
          throw new PolishedError(38, match ? match.index : expression.length, expression);
        }
      }
    } else {
      // number
      values.push(+token);
      afterValue = true;
    }
  } while (match && operators.length);
  if (operators.length) {
    throw new PolishedError(39, match ? match.index : expression.length, expression);
  } else if (match) {
    throw new PolishedError(40, match ? match.index : expression.length, expression);
  } else {
    return values.pop();
  }
}
function reverseString(str) {
  return str.split('').reverse().join('');
}
/**
 * Helper for doing math with CSS Units. Accepts a formula as a string. All values in the formula must have the same unit (or be unitless). Supports complex formulas utliziing addition, subtraction, multiplication, division, square root, powers, factorial, min, max, as well as parentheses for order of operation.
 *
 *In cases where you need to do calculations with mixed units where one unit is a [relative length unit](https://developer.mozilla.org/en-US/docs/Web/CSS/length#Relative_length_units), you will want to use [CSS Calc](https://developer.mozilla.org/en-US/docs/Web/CSS/calc).
 *
 * *warning* While we've done everything possible to ensure math safely evalutes formulas expressed as strings, you should always use extreme caution when passing `math` user provided values.
 * @example
 * // Styles as object usage
 * const styles = {
 *   fontSize: math('12rem + 8rem'),
 *   fontSize: math('(12px + 2px) * 3'),
 *   fontSize: math('3px^2 + sqrt(4)'),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   fontSize: ${math('12rem + 8rem')};
 *   fontSize: ${math('(12px + 2px) * 3')};
 *   fontSize: ${math('3px^2 + sqrt(4)')};
 * `
 *
 * // CSS as JS Output
 *
 * div: {
 *   fontSize: '20rem',
 *   fontSize: '42px',
 *   fontSize: '11px',
 * }
 */

function math(formula, additionalSymbols) {
  var reversedFormula = reverseString(formula);
  var formulaMatch = reversedFormula.match(unitRegExp); // Check that all units are the same

  if (formulaMatch && !formulaMatch.every(function (unit) {
    return unit === formulaMatch[0];
  })) {
    throw new PolishedError(41);
  }
  var cleanFormula = reverseString(reversedFormula.replace(unitRegExp, ''));
  return "" + calculate(cleanFormula, additionalSymbols) + (formulaMatch ? reverseString(formulaMatch[0]) : '');
}

/**
 * Check if a string ends with something
 * @private
 */
function endsWith(string, suffix) {
  return string.substr(-suffix.length) === suffix;
}
var cssRegex$1 = /^([+-]?(?:\d+|\d*\.\d+))([a-z]*|%)$/;
/**
 * Returns a given CSS value minus its unit of measure.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   '--dimension': stripUnit('100px')
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   --dimension: ${stripUnit('100px')};
 * `
 *
 * // CSS in JS Output
 *
 * element {
 *   '--dimension': 100
 * }
 */

function stripUnit(value) {
  if (typeof value !== 'string') return value;
  var matchedValue = value.match(cssRegex$1);
  return matchedValue ? parseFloat(value) : value;
}

/**
 * Factory function that creates pixel-to-x converters
 * @private
 */

var pxtoFactory = function pxtoFactory(to) {
  return function (pxval, base) {
    if (base === void 0) {
      base = '16px';
    }
    var newPxval = pxval;
    var newBase = base;
    if (typeof pxval === 'string') {
      if (!endsWith(pxval, 'px')) {
        throw new PolishedError(69, to, pxval);
      }
      newPxval = stripUnit(pxval);
    }
    if (typeof base === 'string') {
      if (!endsWith(base, 'px')) {
        throw new PolishedError(70, to, base);
      }
      newBase = stripUnit(base);
    }
    if (typeof newPxval === 'string') {
      throw new PolishedError(71, pxval, to);
    }
    if (typeof newBase === 'string') {
      throw new PolishedError(72, base, to);
    }
    return "" + newPxval / newBase + to;
  };
};
var pixelsto = pxtoFactory;

/**
 * Convert pixel value to ems. The default base value is 16px, but can be changed by passing a
 * second argument to the function.
 * @function
 * @param {string|number} pxval
 * @param {string|number} [base='16px']
 * @example
 * // Styles as object usage
 * const styles = {
 *   'height': em('16px')
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   height: ${em('16px')}
 * `
 *
 * // CSS in JS Output
 *
 * element {
 *   'height': '1em'
 * }
 */

var em = /*#__PURE__*/pixelsto('em');
var em$1 = em;
var cssRegex = /^([+-]?(?:\d+|\d*\.\d+))([a-z]*|%)$/;
/**
 * Returns a given CSS value and its unit as elements of an array.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   '--dimension': getValueAndUnit('100px')[0],
 *   '--unit': getValueAndUnit('100px')[1],
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   --dimension: ${getValueAndUnit('100px')[0]};
 *   --unit: ${getValueAndUnit('100px')[1]};
 * `
 *
 * // CSS in JS Output
 *
 * element {
 *   '--dimension': 100,
 *   '--unit': 'px',
 * }
 */

function getValueAndUnit(value) {
  if (typeof value !== 'string') return [value, ''];
  var matchedValue = value.match(cssRegex);
  if (matchedValue) return [parseFloat(value), matchedValue[2]];
  return [value, undefined];
}

/**
 * CSS to hide content visually but remain accessible to screen readers.
 * from [HTML5 Boilerplate](https://github.com/h5bp/html5-boilerplate/blob/9a176f57af1cfe8ec70300da4621fb9b07e5fa31/src/css/main.css#L121)
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   ...hideVisually(),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   ${hideVisually()};
 * `
 *
 * // CSS as JS Output
 *
 * 'div': {
 *   'border': '0',
 *   'clip': 'rect(0 0 0 0)',
 *   'height': '1px',
 *   'margin': '-1px',
 *   'overflow': 'hidden',
 *   'padding': '0',
 *   'position': 'absolute',
 *   'whiteSpace': 'nowrap',
 *   'width': '1px',
 * }
 */
function hideVisually() {
  return {
    border: '0',
    clip: 'rect(0 0 0 0)',
    height: '1px',
    margin: '-1px',
    overflow: 'hidden',
    padding: '0',
    position: 'absolute',
    whiteSpace: 'nowrap',
    width: '1px'
  };
}
function colorToInt(color) {
  return Math.round(color * 255);
}
function convertToInt(red, green, blue) {
  return colorToInt(red) + "," + colorToInt(green) + "," + colorToInt(blue);
}
function hslToRgb(hue, saturation, lightness, convert) {
  if (convert === void 0) {
    convert = convertToInt;
  }
  if (saturation === 0) {
    // achromatic
    return convert(lightness, lightness, lightness);
  } // formulae from https://en.wikipedia.org/wiki/HSL_and_HSV

  var huePrime = (hue % 360 + 360) % 360 / 60;
  var chroma = (1 - Math.abs(2 * lightness - 1)) * saturation;
  var secondComponent = chroma * (1 - Math.abs(huePrime % 2 - 1));
  var red = 0;
  var green = 0;
  var blue = 0;
  if (huePrime >= 0 && huePrime < 1) {
    red = chroma;
    green = secondComponent;
  } else if (huePrime >= 1 && huePrime < 2) {
    red = secondComponent;
    green = chroma;
  } else if (huePrime >= 2 && huePrime < 3) {
    green = chroma;
    blue = secondComponent;
  } else if (huePrime >= 3 && huePrime < 4) {
    green = secondComponent;
    blue = chroma;
  } else if (huePrime >= 4 && huePrime < 5) {
    red = secondComponent;
    blue = chroma;
  } else if (huePrime >= 5 && huePrime < 6) {
    red = chroma;
    blue = secondComponent;
  }
  var lightnessModification = lightness - chroma / 2;
  var finalRed = red + lightnessModification;
  var finalGreen = green + lightnessModification;
  var finalBlue = blue + lightnessModification;
  return convert(finalRed, finalGreen, finalBlue);
}
var namedColorMap = {
  aliceblue: 'f0f8ff',
  antiquewhite: 'faebd7',
  aqua: '00ffff',
  aquamarine: '7fffd4',
  azure: 'f0ffff',
  beige: 'f5f5dc',
  bisque: 'ffe4c4',
  black: '000',
  blanchedalmond: 'ffebcd',
  blue: '0000ff',
  blueviolet: '8a2be2',
  brown: 'a52a2a',
  burlywood: 'deb887',
  cadetblue: '5f9ea0',
  chartreuse: '7fff00',
  chocolate: 'd2691e',
  coral: 'ff7f50',
  cornflowerblue: '6495ed',
  cornsilk: 'fff8dc',
  crimson: 'dc143c',
  cyan: '00ffff',
  darkblue: '00008b',
  darkcyan: '008b8b',
  darkgoldenrod: 'b8860b',
  darkgray: 'a9a9a9',
  darkgreen: '006400',
  darkgrey: 'a9a9a9',
  darkkhaki: 'bdb76b',
  darkmagenta: '8b008b',
  darkolivegreen: '556b2f',
  darkorange: 'ff8c00',
  darkorchid: '9932cc',
  darkred: '8b0000',
  darksalmon: 'e9967a',
  darkseagreen: '8fbc8f',
  darkslateblue: '483d8b',
  darkslategray: '2f4f4f',
  darkslategrey: '2f4f4f',
  darkturquoise: '00ced1',
  darkviolet: '9400d3',
  deeppink: 'ff1493',
  deepskyblue: '00bfff',
  dimgray: '696969',
  dimgrey: '696969',
  dodgerblue: '1e90ff',
  firebrick: 'b22222',
  floralwhite: 'fffaf0',
  forestgreen: '228b22',
  fuchsia: 'ff00ff',
  gainsboro: 'dcdcdc',
  ghostwhite: 'f8f8ff',
  gold: 'ffd700',
  goldenrod: 'daa520',
  gray: '808080',
  green: '008000',
  greenyellow: 'adff2f',
  grey: '808080',
  honeydew: 'f0fff0',
  hotpink: 'ff69b4',
  indianred: 'cd5c5c',
  indigo: '4b0082',
  ivory: 'fffff0',
  khaki: 'f0e68c',
  lavender: 'e6e6fa',
  lavenderblush: 'fff0f5',
  lawngreen: '7cfc00',
  lemonchiffon: 'fffacd',
  lightblue: 'add8e6',
  lightcoral: 'f08080',
  lightcyan: 'e0ffff',
  lightgoldenrodyellow: 'fafad2',
  lightgray: 'd3d3d3',
  lightgreen: '90ee90',
  lightgrey: 'd3d3d3',
  lightpink: 'ffb6c1',
  lightsalmon: 'ffa07a',
  lightseagreen: '20b2aa',
  lightskyblue: '87cefa',
  lightslategray: '789',
  lightslategrey: '789',
  lightsteelblue: 'b0c4de',
  lightyellow: 'ffffe0',
  lime: '0f0',
  limegreen: '32cd32',
  linen: 'faf0e6',
  magenta: 'f0f',
  maroon: '800000',
  mediumaquamarine: '66cdaa',
  mediumblue: '0000cd',
  mediumorchid: 'ba55d3',
  mediumpurple: '9370db',
  mediumseagreen: '3cb371',
  mediumslateblue: '7b68ee',
  mediumspringgreen: '00fa9a',
  mediumturquoise: '48d1cc',
  mediumvioletred: 'c71585',
  midnightblue: '191970',
  mintcream: 'f5fffa',
  mistyrose: 'ffe4e1',
  moccasin: 'ffe4b5',
  navajowhite: 'ffdead',
  navy: '000080',
  oldlace: 'fdf5e6',
  olive: '808000',
  olivedrab: '6b8e23',
  orange: 'ffa500',
  orangered: 'ff4500',
  orchid: 'da70d6',
  palegoldenrod: 'eee8aa',
  palegreen: '98fb98',
  paleturquoise: 'afeeee',
  palevioletred: 'db7093',
  papayawhip: 'ffefd5',
  peachpuff: 'ffdab9',
  peru: 'cd853f',
  pink: 'ffc0cb',
  plum: 'dda0dd',
  powderblue: 'b0e0e6',
  purple: '800080',
  rebeccapurple: '639',
  red: 'f00',
  rosybrown: 'bc8f8f',
  royalblue: '4169e1',
  saddlebrown: '8b4513',
  salmon: 'fa8072',
  sandybrown: 'f4a460',
  seagreen: '2e8b57',
  seashell: 'fff5ee',
  sienna: 'a0522d',
  silver: 'c0c0c0',
  skyblue: '87ceeb',
  slateblue: '6a5acd',
  slategray: '708090',
  slategrey: '708090',
  snow: 'fffafa',
  springgreen: '00ff7f',
  steelblue: '4682b4',
  tan: 'd2b48c',
  teal: '008080',
  thistle: 'd8bfd8',
  tomato: 'ff6347',
  turquoise: '40e0d0',
  violet: 'ee82ee',
  wheat: 'f5deb3',
  white: 'fff',
  whitesmoke: 'f5f5f5',
  yellow: 'ff0',
  yellowgreen: '9acd32'
};
/**
 * Checks if a string is a CSS named color and returns its equivalent hex value, otherwise returns the original color.
 * @private
 */

function nameToHex(color) {
  if (typeof color !== 'string') return color;
  var normalizedColorName = color.toLowerCase();
  return namedColorMap[normalizedColorName] ? "#" + namedColorMap[normalizedColorName] : color;
}
var hexRegex = /^#[a-fA-F0-9]{6}$/;
var hexRgbaRegex = /^#[a-fA-F0-9]{8}$/;
var reducedHexRegex = /^#[a-fA-F0-9]{3}$/;
var reducedRgbaHexRegex = /^#[a-fA-F0-9]{4}$/;
var rgbRegex = /^rgb\(\s*(\d{1,3})\s*(?:,)?\s*(\d{1,3})\s*(?:,)?\s*(\d{1,3})\s*\)$/i;
var rgbaRegex = /^rgb(?:a)?\(\s*(\d{1,3})\s*(?:,)?\s*(\d{1,3})\s*(?:,)?\s*(\d{1,3})\s*(?:,|\/)\s*([-+]?\d*[.]?\d+[%]?)\s*\)$/i;
var hslRegex = /^hsl\(\s*(\d{0,3}[.]?[0-9]+(?:deg)?)\s*(?:,)?\s*(\d{1,3}[.]?[0-9]?)%\s*(?:,)?\s*(\d{1,3}[.]?[0-9]?)%\s*\)$/i;
var hslaRegex = /^hsl(?:a)?\(\s*(\d{0,3}[.]?[0-9]+(?:deg)?)\s*(?:,)?\s*(\d{1,3}[.]?[0-9]?)%\s*(?:,)?\s*(\d{1,3}[.]?[0-9]?)%\s*(?:,|\/)\s*([-+]?\d*[.]?\d+[%]?)\s*\)$/i;
/**
 * Returns an RgbColor or RgbaColor object. This utility function is only useful
 * if want to extract a color component. With the color util `toColorString` you
 * can convert a RgbColor or RgbaColor object back to a string.
 *
 * @example
 * // Assigns `{ red: 255, green: 0, blue: 0 }` to color1
 * const color1 = parseToRgb('rgb(255, 0, 0)');
 * // Assigns `{ red: 92, green: 102, blue: 112, alpha: 0.75 }` to color2
 * const color2 = parseToRgb('hsla(210, 10%, 40%, 0.75)');
 */

function parseToRgb(color) {
  if (typeof color !== 'string') {
    throw new PolishedError(3);
  }
  var normalizedColor = nameToHex(color);
  if (normalizedColor.match(hexRegex)) {
    return {
      red: parseInt("" + normalizedColor[1] + normalizedColor[2], 16),
      green: parseInt("" + normalizedColor[3] + normalizedColor[4], 16),
      blue: parseInt("" + normalizedColor[5] + normalizedColor[6], 16)
    };
  }
  if (normalizedColor.match(hexRgbaRegex)) {
    var alpha = parseFloat((parseInt("" + normalizedColor[7] + normalizedColor[8], 16) / 255).toFixed(2));
    return {
      red: parseInt("" + normalizedColor[1] + normalizedColor[2], 16),
      green: parseInt("" + normalizedColor[3] + normalizedColor[4], 16),
      blue: parseInt("" + normalizedColor[5] + normalizedColor[6], 16),
      alpha: alpha
    };
  }
  if (normalizedColor.match(reducedHexRegex)) {
    return {
      red: parseInt("" + normalizedColor[1] + normalizedColor[1], 16),
      green: parseInt("" + normalizedColor[2] + normalizedColor[2], 16),
      blue: parseInt("" + normalizedColor[3] + normalizedColor[3], 16)
    };
  }
  if (normalizedColor.match(reducedRgbaHexRegex)) {
    var _alpha = parseFloat((parseInt("" + normalizedColor[4] + normalizedColor[4], 16) / 255).toFixed(2));
    return {
      red: parseInt("" + normalizedColor[1] + normalizedColor[1], 16),
      green: parseInt("" + normalizedColor[2] + normalizedColor[2], 16),
      blue: parseInt("" + normalizedColor[3] + normalizedColor[3], 16),
      alpha: _alpha
    };
  }
  var rgbMatched = rgbRegex.exec(normalizedColor);
  if (rgbMatched) {
    return {
      red: parseInt("" + rgbMatched[1], 10),
      green: parseInt("" + rgbMatched[2], 10),
      blue: parseInt("" + rgbMatched[3], 10)
    };
  }
  var rgbaMatched = rgbaRegex.exec(normalizedColor.substring(0, 50));
  if (rgbaMatched) {
    return {
      red: parseInt("" + rgbaMatched[1], 10),
      green: parseInt("" + rgbaMatched[2], 10),
      blue: parseInt("" + rgbaMatched[3], 10),
      alpha: parseFloat("" + rgbaMatched[4]) > 1 ? parseFloat("" + rgbaMatched[4]) / 100 : parseFloat("" + rgbaMatched[4])
    };
  }
  var hslMatched = hslRegex.exec(normalizedColor);
  if (hslMatched) {
    var hue = parseInt("" + hslMatched[1], 10);
    var saturation = parseInt("" + hslMatched[2], 10) / 100;
    var lightness = parseInt("" + hslMatched[3], 10) / 100;
    var rgbColorString = "rgb(" + hslToRgb(hue, saturation, lightness) + ")";
    var hslRgbMatched = rgbRegex.exec(rgbColorString);
    if (!hslRgbMatched) {
      throw new PolishedError(4, normalizedColor, rgbColorString);
    }
    return {
      red: parseInt("" + hslRgbMatched[1], 10),
      green: parseInt("" + hslRgbMatched[2], 10),
      blue: parseInt("" + hslRgbMatched[3], 10)
    };
  }
  var hslaMatched = hslaRegex.exec(normalizedColor.substring(0, 50));
  if (hslaMatched) {
    var _hue = parseInt("" + hslaMatched[1], 10);
    var _saturation = parseInt("" + hslaMatched[2], 10) / 100;
    var _lightness = parseInt("" + hslaMatched[3], 10) / 100;
    var _rgbColorString = "rgb(" + hslToRgb(_hue, _saturation, _lightness) + ")";
    var _hslRgbMatched = rgbRegex.exec(_rgbColorString);
    if (!_hslRgbMatched) {
      throw new PolishedError(4, normalizedColor, _rgbColorString);
    }
    return {
      red: parseInt("" + _hslRgbMatched[1], 10),
      green: parseInt("" + _hslRgbMatched[2], 10),
      blue: parseInt("" + _hslRgbMatched[3], 10),
      alpha: parseFloat("" + hslaMatched[4]) > 1 ? parseFloat("" + hslaMatched[4]) / 100 : parseFloat("" + hslaMatched[4])
    };
  }
  throw new PolishedError(5);
}
function rgbToHsl(color) {
  // make sure rgb are contained in a set of [0, 255]
  var red = color.red / 255;
  var green = color.green / 255;
  var blue = color.blue / 255;
  var max = Math.max(red, green, blue);
  var min = Math.min(red, green, blue);
  var lightness = (max + min) / 2;
  if (max === min) {
    // achromatic
    if (color.alpha !== undefined) {
      return {
        hue: 0,
        saturation: 0,
        lightness: lightness,
        alpha: color.alpha
      };
    } else {
      return {
        hue: 0,
        saturation: 0,
        lightness: lightness
      };
    }
  }
  var hue;
  var delta = max - min;
  var saturation = lightness > 0.5 ? delta / (2 - max - min) : delta / (max + min);
  switch (max) {
    case red:
      hue = (green - blue) / delta + (green < blue ? 6 : 0);
      break;
    case green:
      hue = (blue - red) / delta + 2;
      break;
    default:
      // blue case
      hue = (red - green) / delta + 4;
      break;
  }
  hue *= 60;
  if (color.alpha !== undefined) {
    return {
      hue: hue,
      saturation: saturation,
      lightness: lightness,
      alpha: color.alpha
    };
  }
  return {
    hue: hue,
    saturation: saturation,
    lightness: lightness
  };
}

/**
 * Returns an HslColor or HslaColor object. This utility function is only useful
 * if want to extract a color component. With the color util `toColorString` you
 * can convert a HslColor or HslaColor object back to a string.
 *
 * @example
 * // Assigns `{ hue: 0, saturation: 1, lightness: 0.5 }` to color1
 * const color1 = parseToHsl('rgb(255, 0, 0)');
 * // Assigns `{ hue: 128, saturation: 1, lightness: 0.5, alpha: 0.75 }` to color2
 * const color2 = parseToHsl('hsla(128, 100%, 50%, 0.75)');
 */
function parseToHsl(color) {
  // Note: At a later stage we can optimize this function as right now a hsl
  // color would be parsed converted to rgb values and converted back to hsl.
  return rgbToHsl(parseToRgb(color));
}

/**
 * Reduces hex values if possible e.g. #ff8866 to #f86
 * @private
 */
var reduceHexValue = function reduceHexValue(value) {
  if (value.length === 7 && value[1] === value[2] && value[3] === value[4] && value[5] === value[6]) {
    return "#" + value[1] + value[3] + value[5];
  }
  return value;
};
var reduceHexValue$1 = reduceHexValue;
function numberToHex(value) {
  var hex = value.toString(16);
  return hex.length === 1 ? "0" + hex : hex;
}
function colorToHex(color) {
  return numberToHex(Math.round(color * 255));
}
function convertToHex(red, green, blue) {
  return reduceHexValue$1("#" + colorToHex(red) + colorToHex(green) + colorToHex(blue));
}
function hslToHex(hue, saturation, lightness) {
  return hslToRgb(hue, saturation, lightness, convertToHex);
}

/**
 * Returns a string value for the color. The returned result is the smallest possible hex notation.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: hsl(359, 0.75, 0.4),
 *   background: hsl({ hue: 360, saturation: 0.75, lightness: 0.4 }),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${hsl(359, 0.75, 0.4)};
 *   background: ${hsl({ hue: 360, saturation: 0.75, lightness: 0.4 })};
 * `
 *
 * // CSS in JS Output
 *
 * element {
 *   background: "#b3191c";
 *   background: "#b3191c";
 * }
 */
function hsl(value, saturation, lightness) {
  if (typeof value === 'number' && typeof saturation === 'number' && typeof lightness === 'number') {
    return hslToHex(value, saturation, lightness);
  } else if (typeof value === 'object' && saturation === undefined && lightness === undefined) {
    return hslToHex(value.hue, value.saturation, value.lightness);
  }
  throw new PolishedError(1);
}

/**
 * Returns a string value for the color. The returned result is the smallest possible rgba or hex notation.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: hsla(359, 0.75, 0.4, 0.7),
 *   background: hsla({ hue: 360, saturation: 0.75, lightness: 0.4, alpha: 0,7 }),
 *   background: hsla(359, 0.75, 0.4, 1),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${hsla(359, 0.75, 0.4, 0.7)};
 *   background: ${hsla({ hue: 360, saturation: 0.75, lightness: 0.4, alpha: 0,7 })};
 *   background: ${hsla(359, 0.75, 0.4, 1)};
 * `
 *
 * // CSS in JS Output
 *
 * element {
 *   background: "rgba(179,25,28,0.7)";
 *   background: "rgba(179,25,28,0.7)";
 *   background: "#b3191c";
 * }
 */
function hsla(value, saturation, lightness, alpha) {
  if (typeof value === 'number' && typeof saturation === 'number' && typeof lightness === 'number' && typeof alpha === 'number') {
    return alpha >= 1 ? hslToHex(value, saturation, lightness) : "rgba(" + hslToRgb(value, saturation, lightness) + "," + alpha + ")";
  } else if (typeof value === 'object' && saturation === undefined && lightness === undefined && alpha === undefined) {
    return value.alpha >= 1 ? hslToHex(value.hue, value.saturation, value.lightness) : "rgba(" + hslToRgb(value.hue, value.saturation, value.lightness) + "," + value.alpha + ")";
  }
  throw new PolishedError(2);
}

/**
 * Returns a string value for the color. The returned result is the smallest possible hex notation.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: rgb(255, 205, 100),
 *   background: rgb({ red: 255, green: 205, blue: 100 }),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${rgb(255, 205, 100)};
 *   background: ${rgb({ red: 255, green: 205, blue: 100 })};
 * `
 *
 * // CSS in JS Output
 *
 * element {
 *   background: "#ffcd64";
 *   background: "#ffcd64";
 * }
 */
function rgb(value, green, blue) {
  if (typeof value === 'number' && typeof green === 'number' && typeof blue === 'number') {
    return reduceHexValue$1("#" + numberToHex(value) + numberToHex(green) + numberToHex(blue));
  } else if (typeof value === 'object' && green === undefined && blue === undefined) {
    return reduceHexValue$1("#" + numberToHex(value.red) + numberToHex(value.green) + numberToHex(value.blue));
  }
  throw new PolishedError(6);
}

/**
 * Returns a string value for the color. The returned result is the smallest possible rgba or hex notation.
 *
 * Can also be used to fade a color by passing a hex value or named CSS color along with an alpha value.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: rgba(255, 205, 100, 0.7),
 *   background: rgba({ red: 255, green: 205, blue: 100, alpha: 0.7 }),
 *   background: rgba(255, 205, 100, 1),
 *   background: rgba('#ffffff', 0.4),
 *   background: rgba('black', 0.7),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${rgba(255, 205, 100, 0.7)};
 *   background: ${rgba({ red: 255, green: 205, blue: 100, alpha: 0.7 })};
 *   background: ${rgba(255, 205, 100, 1)};
 *   background: ${rgba('#ffffff', 0.4)};
 *   background: ${rgba('black', 0.7)};
 * `
 *
 * // CSS in JS Output
 *
 * element {
 *   background: "rgba(255,205,100,0.7)";
 *   background: "rgba(255,205,100,0.7)";
 *   background: "#ffcd64";
 *   background: "rgba(255,255,255,0.4)";
 *   background: "rgba(0,0,0,0.7)";
 * }
 */
function rgba(firstValue, secondValue, thirdValue, fourthValue) {
  if (typeof firstValue === 'string' && typeof secondValue === 'number') {
    var rgbValue = parseToRgb(firstValue);
    return "rgba(" + rgbValue.red + "," + rgbValue.green + "," + rgbValue.blue + "," + secondValue + ")";
  } else if (typeof firstValue === 'number' && typeof secondValue === 'number' && typeof thirdValue === 'number' && typeof fourthValue === 'number') {
    return fourthValue >= 1 ? rgb(firstValue, secondValue, thirdValue) : "rgba(" + firstValue + "," + secondValue + "," + thirdValue + "," + fourthValue + ")";
  } else if (typeof firstValue === 'object' && secondValue === undefined && thirdValue === undefined && fourthValue === undefined) {
    return firstValue.alpha >= 1 ? rgb(firstValue.red, firstValue.green, firstValue.blue) : "rgba(" + firstValue.red + "," + firstValue.green + "," + firstValue.blue + "," + firstValue.alpha + ")";
  }
  throw new PolishedError(7);
}
var isRgb = function isRgb(color) {
  return typeof color.red === 'number' && typeof color.green === 'number' && typeof color.blue === 'number' && (typeof color.alpha !== 'number' || typeof color.alpha === 'undefined');
};
var isRgba = function isRgba(color) {
  return typeof color.red === 'number' && typeof color.green === 'number' && typeof color.blue === 'number' && typeof color.alpha === 'number';
};
var isHsl = function isHsl(color) {
  return typeof color.hue === 'number' && typeof color.saturation === 'number' && typeof color.lightness === 'number' && (typeof color.alpha !== 'number' || typeof color.alpha === 'undefined');
};
var isHsla = function isHsla(color) {
  return typeof color.hue === 'number' && typeof color.saturation === 'number' && typeof color.lightness === 'number' && typeof color.alpha === 'number';
};
/**
 * Converts a RgbColor, RgbaColor, HslColor or HslaColor object to a color string.
 * This util is useful in case you only know on runtime which color object is
 * used. Otherwise we recommend to rely on `rgb`, `rgba`, `hsl` or `hsla`.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: toColorString({ red: 255, green: 205, blue: 100 }),
 *   background: toColorString({ red: 255, green: 205, blue: 100, alpha: 0.72 }),
 *   background: toColorString({ hue: 240, saturation: 1, lightness: 0.5 }),
 *   background: toColorString({ hue: 360, saturation: 0.75, lightness: 0.4, alpha: 0.72 }),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${toColorString({ red: 255, green: 205, blue: 100 })};
 *   background: ${toColorString({ red: 255, green: 205, blue: 100, alpha: 0.72 })};
 *   background: ${toColorString({ hue: 240, saturation: 1, lightness: 0.5 })};
 *   background: ${toColorString({ hue: 360, saturation: 0.75, lightness: 0.4, alpha: 0.72 })};
 * `
 *
 * // CSS in JS Output
 * element {
 *   background: "#ffcd64";
 *   background: "rgba(255,205,100,0.72)";
 *   background: "#00f";
 *   background: "rgba(179,25,25,0.72)";
 * }
 */

function toColorString(color) {
  if (typeof color !== 'object') throw new PolishedError(8);
  if (isRgba(color)) return rgba(color);
  if (isRgb(color)) return rgb(color);
  if (isHsla(color)) return hsla(color);
  if (isHsl(color)) return hsl(color);
  throw new PolishedError(8);
}

// Type definitions taken from https://github.com/gcanti/flow-static-land/blob/master/src/Fun.js
// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line no-redeclare
function curried(f, length, acc) {
  return function fn() {
    // eslint-disable-next-line prefer-rest-params
    var combined = acc.concat(Array.prototype.slice.call(arguments));
    return combined.length >= length ? f.apply(this, combined) : curried(f, length, combined);
  };
} // eslint-disable-next-line no-redeclare

function curry(f) {
  // eslint-disable-line no-redeclare
  return curried(f, f.length, []);
}
function guard(lowerBoundary, upperBoundary, value) {
  return Math.max(lowerBoundary, Math.min(upperBoundary, value));
}

/**
 * Returns a string value for the darkened color.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: darken(0.2, '#FFCD64'),
 *   background: darken('0.2', 'rgba(255,205,100,0.7)'),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${darken(0.2, '#FFCD64')};
 *   background: ${darken('0.2', 'rgba(255,205,100,0.7)')};
 * `
 *
 * // CSS in JS Output
 *
 * element {
 *   background: "#ffbd31";
 *   background: "rgba(255,189,49,0.7)";
 * }
 */

function darken(amount, color) {
  if (color === 'transparent') return color;
  var hslColor = parseToHsl(color);
  return toColorString(_extends$x({}, hslColor, {
    lightness: guard(0, 1, hslColor.lightness - parseFloat(amount))
  }));
} // prettier-ignore

var curriedDarken = /*#__PURE__*/curry
/* ::<number | string, string, string> */(darken);
var curriedDarken$1 = curriedDarken;

/**
 * Returns a string value for the lightened color.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: lighten(0.2, '#CCCD64'),
 *   background: lighten('0.2', 'rgba(204,205,100,0.7)'),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${lighten(0.2, '#FFCD64')};
 *   background: ${lighten('0.2', 'rgba(204,205,100,0.7)')};
 * `
 *
 * // CSS in JS Output
 *
 * element {
 *   background: "#e5e6b1";
 *   background: "rgba(229,230,177,0.7)";
 * }
 */

function lighten(amount, color) {
  if (color === 'transparent') return color;
  var hslColor = parseToHsl(color);
  return toColorString(_extends$x({}, hslColor, {
    lightness: guard(0, 1, hslColor.lightness + parseFloat(amount))
  }));
} // prettier-ignore

var curriedLighten = /*#__PURE__*/curry
/* ::<number | string, string, string> */(lighten);
var curriedLighten$1 = curriedLighten;/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */
function _extends$w() {
  _extends$w = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends$w.apply(this, arguments);
}
const PALETTE = {
  black: '#000',
  white: '#fff',
  product: {
    support: '#00a656',
    message: '#37b8af',
    explore: '#30aabc',
    gather: '#f6c8be',
    guide: '#ff6224',
    connect: '#ff6224',
    chat: '#f79a3e',
    talk: '#efc93d',
    sell: '#c38f00'
  },
  grey: {
    100: '#f8f9f9',
    200: '#e9ebed',
    300: '#d8dcde',
    400: '#c2c8cc',
    500: '#87929d',
    600: '#68737d',
    700: '#49545c',
    800: '#2f3941'
  },
  blue: {
    100: '#edf7ff',
    200: '#cee2f2',
    300: '#adcce4',
    400: '#5293c7',
    500: '#337fbd',
    600: '#1f73b7',
    700: '#144a75',
    800: '#0f3554'
  },
  red: {
    100: '#fff0f1',
    200: '#f5d5d8',
    300: '#f5b5ba',
    400: '#e35b66',
    500: '#d93f4c',
    600: '#cc3340',
    700: '#8c232c',
    800: '#681219'
  },
  yellow: {
    100: '#fff7ed',
    200: '#ffeedb',
    300: '#fed6a8',
    400: '#ffb057',
    500: '#f79a3e',
    600: '#ed8f1c',
    700: '#ad5918',
    800: '#703815'
  },
  green: {
    100: '#edf8f4',
    200: '#d1e8df',
    300: '#aecfc2',
    400: '#5eae91',
    500: '#228f67',
    600: '#038153',
    700: '#186146',
    800: '#0b3b29'
  },
  kale: {
    100: '#f5fcfc',
    200: '#daeded',
    300: '#bdd9d7',
    400: '#90bbbb',
    500: '#467b7c',
    600: '#17494d',
    700: '#03363d',
    800: '#012b30'
  },
  fuschia: {
    400: '#d653c2',
    600: '#a81897',
    M400: '#cf62a8',
    M600: '#a8458c'
  },
  pink: {
    400: '#ec4d63',
    600: '#d42054',
    M400: '#d57287',
    M600: '#b23a5d'
  },
  crimson: {
    400: '#e34f32',
    600: '#c72a1c',
    M400: '#cc6c5b',
    M600: '#b24a3c'
  },
  orange: {
    400: '#de701d',
    600: '#bf5000',
    M400: '#d4772c',
    M600: '#b35827'
  },
  lemon: {
    400: '#ffd424',
    600: '#ffbb10',
    M400: '#e7a500',
    M600: '#c38f00'
  },
  lime: {
    400: '#43b324',
    600: '#2e8200',
    M400: '#519e2d',
    M600: '#47782c'
  },
  mint: {
    400: '#00a656',
    600: '#058541',
    M400: '#299c66',
    M600: '#2e8057'
  },
  teal: {
    400: '#02a191',
    600: '#028079',
    M400: '#2d9e8f',
    M600: '#3c7873'
  },
  azure: {
    400: '#3091ec',
    600: '#1371d6',
    M400: '#5f8dcf',
    M600: '#3a70b2'
  },
  royal: {
    400: '#5d7df5',
    600: '#3353e2',
    M400: '#7986d8',
    M600: '#4b61c3'
  },
  purple: {
    400: '#b552e2',
    600: '#6a27b8',
    M400: '#b072cc',
    M600: '#9358b0'
  }
};
const BASE = 4;
const borderRadii = {
  sm: `${BASE / 2}px`,
  md: `${BASE}px`
};
const borderStyles = {
  solid: 'solid'
};
const borderWidths = {
  sm: '1px',
  md: '3px'
};
const borders = {
  sm: `${borderWidths.sm} ${borderStyles.solid}`,
  md: `${borderWidths.md} ${borderStyles.solid}`
};
const breakpoints = {
  xs: '0px',
  sm: `${BASE * 144}px`,
  md: `${BASE * 192}px`,
  lg: `${BASE * 248}px`,
  xl: `${BASE * 300}px`
};
const colors = {
  background: PALETTE.white,
  foreground: PALETTE.grey[800],
  primaryHue: 'blue',
  dangerHue: 'red',
  warningHue: 'yellow',
  successHue: 'green',
  neutralHue: 'grey',
  chromeHue: 'kale'
};
const fonts = {
  mono: ['SFMono-Regular', 'Consolas', '"Liberation Mono"', 'Menlo', 'Courier', 'monospace'].join(','),
  system: ['system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'Oxygen-Sans', 'Ubuntu', 'Cantarell', '"Helvetica Neue"', 'Arial', 'sans-serif'].join(',')
};
const fontSizes = {
  xs: '10px',
  sm: '12px',
  md: '14px',
  lg: '18px',
  xl: '22px',
  xxl: '26px',
  xxxl: '36px'
};
const fontWeights = {
  thin: 100,
  extralight: 200,
  light: 300,
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
  black: 900
};
const iconSizes = {
  sm: '12px',
  md: '16px',
  lg: '26px'
};
const lineHeights = {
  sm: `${BASE * 4}px`,
  md: `${BASE * 5}px`,
  lg: `${BASE * 6}px`,
  xl: `${BASE * 7}px`,
  xxl: `${BASE * 8}px`,
  xxxl: `${BASE * 11}px`
};
const palette = {
  ...PALETTE
};
delete palette.product;
const shadowWidths = {
  sm: '2px',
  md: '3px'
};
const shadows = {
  sm: color => `0 0 0 ${shadowWidths.sm} ${color}`,
  md: color => `0 0 0 ${shadowWidths.md} ${color}`,
  lg: (offsetY, blurRadius, color) => `0 ${offsetY} ${blurRadius} 0 ${color}`
};
const space = {
  base: BASE,
  xxs: `${BASE}px`,
  xs: `${BASE * 2}px`,
  sm: `${BASE * 3}px`,
  md: `${BASE * 5}px`,
  lg: `${BASE * 8}px`,
  xl: `${BASE * 10}px`,
  xxl: `${BASE * 12}px`
};
const DEFAULT_THEME = {
  borders,
  borderRadii,
  borderStyles,
  borderWidths,
  breakpoints,
  colors: {
    base: 'light',
    ...colors
  },
  components: {},
  fonts,
  fontSizes,
  fontWeights,
  iconSizes,
  lineHeights,
  palette,
  rtl: false,
  shadowWidths,
  shadows,
  space
};
const useDocument = theme => {
  const [controlledDocument, setControlledDocument] = reactExports.useState();
  reactExports.useEffect(() => {
    if (theme && theme.document) {
      setControlledDocument(theme.document);
    } else {
      setControlledDocument(document);
    }
  }, [theme]);
  return controlledDocument;
};
const ThemeProvider = _ref => {
  let {
    theme,
    focusVisibleRef,
    children,
    ...other
  } = _ref;
  const scopeRef = reactExports.useRef(null);
  const relativeDocument = useDocument(theme);
  const controlledScopeRef = focusVisibleRef === null ? /*#__PURE__*/React.createRef() : getControlledValue(focusVisibleRef, scopeRef);
  useFocusVisible({
    scope: controlledScopeRef,
    relativeDocument
  });
  return /*#__PURE__*/React.createElement(Le, _extends$w({
    theme: theme
  }, other), focusVisibleRef === undefined ? /*#__PURE__*/React.createElement("div", {
    ref: scopeRef
  }, children) : children);
};
ThemeProvider.defaultProps = {
  theme: DEFAULT_THEME
};
function retrieveComponentStyles(componentId, props) {
  const components = props.theme && props.theme.components;
  if (!components) {
    return undefined;
  }
  const componentStyles = components[componentId];
  if (typeof componentStyles === 'function') {
    return componentStyles(props);
  }
  return componentStyles;
}
const DEFAULT_SHADE = 600;
const adjust = (color, expected, actual) => {
  if (expected !== actual) {
    const amount = Math.abs(expected - actual) / 100 * 0.05;
    return expected > actual ? curriedDarken$1(amount, color) : curriedLighten$1(amount, color);
  }
  return color;
};
function getColor(hue) {
  let shade = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_SHADE;
  let theme = arguments.length > 2 ? arguments[2] : undefined;
  let transparency = arguments.length > 3 ? arguments[3] : undefined;
  let retVal;
  if (isNaN(shade)) {
    return undefined;
  }
  const palette = theme && theme.palette ? theme.palette : DEFAULT_THEME.palette;
  const colors = theme && theme.colors ? theme.colors : DEFAULT_THEME.colors;
  let _hue;
  if (typeof hue === 'string') {
    _hue = colors[hue] || hue;
  } else {
    _hue = hue;
  }
  if (Object.prototype.hasOwnProperty.call(palette, _hue)) {
    _hue = palette[_hue];
  }
  if (typeof _hue === 'object') {
    retVal = _hue[shade];
    if (!retVal) {
      const _shade = Object.keys(_hue).map(hueKey => parseInt(hueKey, 10)).reduce((previous, current) => {
        return Math.abs(current - shade) < Math.abs(previous - shade) ? current : previous;
      });
      retVal = adjust(_hue[_shade], shade, _shade);
    }
  } else {
    retVal = adjust(_hue, shade, DEFAULT_SHADE);
  }
  if (transparency) {
    retVal = rgba(retVal, transparency);
  }
  return retVal;
}
function getLineHeight(height, fontSize) {
  const [heightValue, heightUnit] = getValueAndUnit(height.toString());
  const [fontSizeValue, fontSizeUnit] = getValueAndUnit(fontSize.toString());
  const PIXELS = 'px';
  if (heightUnit && heightUnit !== PIXELS) {
    throw new Error(`Unexpected \`height\` with '${heightUnit}' units.`);
  }
  if (fontSizeUnit && fontSizeUnit !== PIXELS) {
    throw new Error(`Unexpected \`fontSize\` with '${fontSizeUnit}' units.`);
  }
  return heightValue / fontSizeValue;
}
const exponentialSymbols = {
  symbols: {
    sqrt: {
      func: {
        symbol: 'sqrt',
        f: a => Math.sqrt(a),
        notation: 'func',
        precedence: 0,
        rightToLeft: 0,
        argCount: 1
      },
      symbol: 'sqrt',
      regSymbol: 'sqrt\\b'
    }
  }
};
const animationStyles$1 = (position, modifier) => {
  const property = position.split('-')[0];
  const animationName = We(["0%,66%{", ":2px;border:transparent;}"], property);
  return Ae(["&", "::before,&", "::after{animation:0.3s ease-in-out ", ";}"], modifier, modifier, animationName);
};
const positionStyles$1 = (position, size, inset) => {
  const margin = math(`${size} / -2`);
  const placement = math(`${margin} + ${inset}`);
  let clipPath;
  let positionCss;
  let propertyRadius;
  if (position.startsWith('top')) {
    propertyRadius = 'border-bottom-right-radius';
    clipPath = 'polygon(100% 0, 100% 1px, 1px 100%, 0 100%, 0 0)';
    positionCss = Ae(["top:", ";right:", ";left:", ";margin-left:", ";"], placement, position === 'top-right' && size, position === 'top' ? '50%' : position === 'top-left' && size, position === 'top' && margin);
  } else if (position.startsWith('right')) {
    propertyRadius = 'border-bottom-left-radius';
    clipPath = 'polygon(100% 0, 100% 100%, calc(100% - 1px) 100%, 0 1px, 0 0)';
    positionCss = Ae(["top:", ";right:", ";bottom:", ";margin-top:", ";"], position === 'right' ? '50%' : position === 'right-top' && size, placement, position === 'right-bottom' && size, position === 'right' && margin);
  } else if (position.startsWith('bottom')) {
    propertyRadius = 'border-top-left-radius';
    clipPath = 'polygon(100% 0, calc(100% - 1px) 0, 0 calc(100% - 1px), 0 100%, 100% 100%)';
    positionCss = Ae(["right:", ";bottom:", ";left:", ";margin-left:", ";"], position === 'bottom-right' && size, placement, position === 'bottom' ? '50%' : position === 'bottom-left' && size, position === 'bottom' && margin);
  } else if (position.startsWith('left')) {
    propertyRadius = 'border-top-right-radius';
    clipPath = 'polygon(0 100%, 100% 100%, 100% calc(100% - 1px), 1px 0, 0 0)';
    positionCss = Ae(["top:", ";bottom:", ";left:", ";margin-top:", ";"], position === 'left' ? '50%' : position === 'left-top' && size, size, placement, position === 'left' && margin);
  }
  return Ae(["&::before{", ":100%;clip-path:", ";}&::before,&::after{", "}"], propertyRadius, clipPath, positionCss);
};
function arrowStyles(position) {
  let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  const size = options.size || '6px';
  const inset = options.inset || '0';
  const squareSize = math(`${size} * 2 / sqrt(2)`, exponentialSymbols);
  return Ae(["position:relative;&::before{border-width:inherit;border-style:inherit;border-color:transparent;background-clip:content-box;}&::after{z-index:-1;border:inherit;box-shadow:inherit;}&::before,&::after{position:absolute;transform:rotate(45deg);background-color:inherit;box-sizing:inherit;width:", ";height:", ";content:'';}", ";", ";"], squareSize, squareSize, positionStyles$1(position, squareSize, inset), options.animationModifier && animationStyles$1(position, options.animationModifier));
}
const useText = (component, props, name, text) => {
  const value = props[name];
  return reactExports.useMemo(() => {
    if (name === 'children') {
      throw new Error('Error: `children` is not a valid `getText` prop.');
    } else if (value === null || value === '') {
      throw new Error(component.displayName ? `Error: you must provide a valid \`${name}\` text value for <${component.displayName}>.` : `Error: you must provide a valid \`${name}\` text value.`);
    } else if (value === undefined) {
      return text;
    }
    return value;
  }, [component.displayName, value, name, text]);
};
const animationStyles = (position, options) => {
  const theme = options.theme || DEFAULT_THEME;
  let translateValue = `${theme.space.base * 5}px`;
  let transformFunction;
  if (position === 'top') {
    transformFunction = 'translateY';
  } else if (position === 'right') {
    transformFunction = 'translateX';
    translateValue = `-${translateValue}`;
  } else if (position === 'bottom') {
    transformFunction = 'translateY';
    translateValue = `-${translateValue}`;
  } else {
    transformFunction = 'translateX';
  }
  const animationName = We(["0%{transform:", "(", ");}"], transformFunction, translateValue);
  return Ae(["&", " ", "{animation:0.2s cubic-bezier(0.15,0.85,0.35,1.2) ", ";}"], options.animationModifier, options.childSelector || '> *', animationName);
};
const hiddenStyles$1 = options => {
  const transition = 'opacity 0.2s ease-in-out, 0.2s visibility 0s linear';
  return Ae(["transition:", ";visibility:hidden;opacity:0;"], options.animationModifier && transition);
};
function menuStyles(position) {
  let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  const theme = options.theme || DEFAULT_THEME;
  let marginProperty;
  if (position === 'top') {
    marginProperty = 'margin-bottom';
  } else if (position === 'right') {
    marginProperty = 'margin-left';
  } else if (position === 'bottom') {
    marginProperty = 'margin-top';
  } else {
    marginProperty = 'margin-right';
  }
  return Ae(["position:absolute;z-index:", ";", ":", ";line-height:0;font-size:0.01px;& ", "{display:inline-block;position:relative;margin:0;box-sizing:border-box;border:", " ", ";border-radius:", ";box-shadow:", ";background-color:", ";cursor:default;padding:0;text-align:", ";white-space:normal;font-size:", ";font-weight:", ";direction:", ";:focus{outline:none;}}", ";", ";"], options.zIndex || 0, marginProperty, options.margin, options.childSelector || '> *', theme.borders.sm, getColor('neutralHue', 300, theme), theme.borderRadii.md, theme.shadows.lg(`${theme.space.base * 5}px`, `${theme.space.base * 7.5}px`, getColor('chromeHue', 600, theme, 0.15)), theme.colors.background, theme.rtl ? 'right' : 'left', theme.fontSizes.md, theme.fontWeights.regular, theme.rtl && 'rtl', options.animationModifier && animationStyles(position, options), options.hidden && hiddenStyles$1(options));
}function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}var reactIsExports = {};
var reactIs = {
  get exports(){ return reactIsExports; },
  set exports(v){ reactIsExports = v; },
};var reactIs_production_min = {};/** @license React v17.0.2
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var b = 60103,
  c = 60106,
  d = 60107,
  e$1 = 60108,
  f = 60114,
  g = 60109,
  h = 60110,
  k = 60112,
  l$1 = 60113,
  m = 60120,
  n$1 = 60115,
  p = 60116,
  q = 60121,
  r = 60122,
  u = 60117,
  v = 60129,
  w = 60131;
if ("function" === typeof Symbol && Symbol.for) {
  var x = Symbol.for;
  b = x("react.element");
  c = x("react.portal");
  d = x("react.fragment");
  e$1 = x("react.strict_mode");
  f = x("react.profiler");
  g = x("react.provider");
  h = x("react.context");
  k = x("react.forward_ref");
  l$1 = x("react.suspense");
  m = x("react.suspense_list");
  n$1 = x("react.memo");
  p = x("react.lazy");
  q = x("react.block");
  r = x("react.server.block");
  u = x("react.fundamental");
  v = x("react.debug_trace_mode");
  w = x("react.legacy_hidden");
}
function y(a) {
  if ("object" === typeof a && null !== a) {
    var t = a.$$typeof;
    switch (t) {
      case b:
        switch (a = a.type, a) {
          case d:
          case f:
          case e$1:
          case l$1:
          case m:
            return a;
          default:
            switch (a = a && a.$$typeof, a) {
              case h:
              case k:
              case p:
              case n$1:
              case g:
                return a;
              default:
                return t;
            }
        }
      case c:
        return t;
    }
  }
}
var z = g,
  A = b,
  B = k,
  C = d,
  D = p,
  E = n$1,
  F = c,
  G = f,
  H = e$1,
  I = l$1;
reactIs_production_min.ContextConsumer = h;
reactIs_production_min.ContextProvider = z;
reactIs_production_min.Element = A;
reactIs_production_min.ForwardRef = B;
reactIs_production_min.Fragment = C;
reactIs_production_min.Lazy = D;
reactIs_production_min.Memo = E;
reactIs_production_min.Portal = F;
reactIs_production_min.Profiler = G;
reactIs_production_min.StrictMode = H;
reactIs_production_min.Suspense = I;
reactIs_production_min.isAsyncMode = function () {
  return !1;
};
reactIs_production_min.isConcurrentMode = function () {
  return !1;
};
reactIs_production_min.isContextConsumer = function (a) {
  return y(a) === h;
};
reactIs_production_min.isContextProvider = function (a) {
  return y(a) === g;
};
reactIs_production_min.isElement = function (a) {
  return "object" === typeof a && null !== a && a.$$typeof === b;
};
reactIs_production_min.isForwardRef = function (a) {
  return y(a) === k;
};
reactIs_production_min.isFragment = function (a) {
  return y(a) === d;
};
reactIs_production_min.isLazy = function (a) {
  return y(a) === p;
};
reactIs_production_min.isMemo = function (a) {
  return y(a) === n$1;
};
reactIs_production_min.isPortal = function (a) {
  return y(a) === c;
};
reactIs_production_min.isProfiler = function (a) {
  return y(a) === f;
};
reactIs_production_min.isStrictMode = function (a) {
  return y(a) === e$1;
};
reactIs_production_min.isSuspense = function (a) {
  return y(a) === l$1;
};
reactIs_production_min.isValidElementType = function (a) {
  return "string" === typeof a || "function" === typeof a || a === d || a === f || a === v || a === e$1 || a === l$1 || a === m || a === w || "object" === typeof a && null !== a && (a.$$typeof === p || a.$$typeof === n$1 || a.$$typeof === g || a.$$typeof === h || a.$$typeof === k || a.$$typeof === u || a.$$typeof === q || a[0] === r) ? !0 : !1;
};
reactIs_production_min.typeOf = y;(function (module) {

	{
	  module.exports = reactIs_production_min;
	}
} (reactIs));let e = e => "object" == typeof e && null != e && 1 === e.nodeType,
  t = (e, t) => (!t || "hidden" !== e) && "visible" !== e && "clip" !== e,
  n = (e, n) => {
    if (e.clientHeight < e.scrollHeight || e.clientWidth < e.scrollWidth) {
      let l = getComputedStyle(e, null);
      return t(l.overflowY, n) || t(l.overflowX, n) || (e => {
        let t = (e => {
          if (!e.ownerDocument || !e.ownerDocument.defaultView) return null;
          try {
            return e.ownerDocument.defaultView.frameElement;
          } catch (e) {
            return null;
          }
        })(e);
        return !!t && (t.clientHeight < e.scrollHeight || t.clientWidth < e.scrollWidth);
      })(e);
    }
    return !1;
  },
  l = (e, t, n, l, i, o, r, d) => o < e && r > t || o > e && r < t ? 0 : o <= e && d <= n || r >= t && d >= n ? o - e - l : r > t && d < n || o < e && d > n ? r - t + i : 0,
  i = e => {
    let t = e.parentElement;
    return null == t ? e.getRootNode().host || null : t;
  };
var o = (t, o) => {
  var r, d, h, f, u, s;
  if ("undefined" == typeof document) return [];
  let {
      scrollMode: a,
      block: c,
      inline: g,
      boundary: m,
      skipOverflowHiddenElements: p
    } = o,
    w = "function" == typeof m ? m : e => e !== m;
  if (!e(t)) throw new TypeError("Invalid target");
  let W = document.scrollingElement || document.documentElement,
    H = [],
    b = t;
  for (; e(b) && w(b);) {
    if (b = i(b), b === W) {
      H.push(b);
      break;
    }
    null != b && b === document.body && n(b) && !n(document.documentElement) || null != b && n(b, p) && H.push(b);
  }
  let v = null != (d = null == (r = window.visualViewport) ? void 0 : r.width) ? d : innerWidth,
    y = null != (f = null == (h = window.visualViewport) ? void 0 : h.height) ? f : innerHeight,
    E = null != (u = window.scrollX) ? u : pageXOffset,
    M = null != (s = window.scrollY) ? s : pageYOffset,
    {
      height: x,
      width: I,
      top: C,
      right: R,
      bottom: T,
      left: V
    } = t.getBoundingClientRect(),
    k = "start" === c || "nearest" === c ? C : "end" === c ? T : C + x / 2,
    B = "center" === g ? V + I / 2 : "end" === g ? R : V,
    D = [];
  for (let e = 0; e < H.length; e++) {
    let t = H[e],
      {
        height: n,
        width: i,
        top: o,
        right: r,
        bottom: d,
        left: h
      } = t.getBoundingClientRect();
    if ("if-needed" === a && C >= 0 && V >= 0 && T <= y && R <= v && C >= o && T <= d && V >= h && R <= r) return D;
    let f = getComputedStyle(t),
      u = parseInt(f.borderLeftWidth, 10),
      s = parseInt(f.borderTopWidth, 10),
      m = parseInt(f.borderRightWidth, 10),
      p = parseInt(f.borderBottomWidth, 10),
      w = 0,
      b = 0,
      O = "offsetWidth" in t ? t.offsetWidth - t.clientWidth - u - m : 0,
      X = "offsetHeight" in t ? t.offsetHeight - t.clientHeight - s - p : 0,
      Y = "offsetWidth" in t ? 0 === t.offsetWidth ? 0 : i / t.offsetWidth : 0,
      L = "offsetHeight" in t ? 0 === t.offsetHeight ? 0 : n / t.offsetHeight : 0;
    if (W === t) w = "start" === c ? k : "end" === c ? k - y : "nearest" === c ? l(M, M + y, y, s, p, M + k, M + k + x, x) : k - y / 2, b = "start" === g ? B : "center" === g ? B - v / 2 : "end" === g ? B - v : l(E, E + v, v, u, m, E + B, E + B + I, I), w = Math.max(0, w + M), b = Math.max(0, b + E);else {
      w = "start" === c ? k - o - s : "end" === c ? k - d + p + X : "nearest" === c ? l(o, d, n, s, p + X, k, k + x, x) : k - (o + n / 2) + X / 2, b = "start" === g ? B - h - u : "center" === g ? B - (h + i / 2) + O / 2 : "end" === g ? B - r + m + O : l(h, r, i, u, m + O, B, B + I, I);
      let {
        scrollLeft: e,
        scrollTop: f
      } = t;
      w = Math.max(0, Math.min(f + w / L, t.scrollHeight - n / L + X)), b = Math.max(0, Math.min(e + b / Y, t.scrollWidth - i / Y + O)), k += f - w, B += e - b;
    }
    D.push({
      el: t,
      top: w,
      left: b
    });
  }
  return D;
};/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var __assign = function () {
  __assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};var idCounter = 0;

/**
 * Accepts a parameter and returns it if it's a function
 * or a noop function if it's not. This allows us to
 * accept a callback, but not worry about it if it's not
 * passed.
 * @param {Function} cb the callback
 * @return {Function} a function
 */
function cbToCb(cb) {
  return typeof cb === 'function' ? cb : noop;
}
function noop() {}

/**
 * Scroll node into view if necessary
 * @param {HTMLElement} node the element that should scroll into view
 * @param {HTMLElement} menuNode the menu element of the component
 */
function scrollIntoView(node, menuNode) {
  if (!node) {
    return;
  }
  var actions = o(node, {
    boundary: menuNode,
    block: 'nearest',
    scrollMode: 'if-needed'
  });
  actions.forEach(function (_ref) {
    var el = _ref.el,
      top = _ref.top,
      left = _ref.left;
    el.scrollTop = top;
    el.scrollLeft = left;
  });
}

/**
 * @param {HTMLElement} parent the parent node
 * @param {HTMLElement} child the child node
 * @param {Window} environment The window context where downshift renders.
 * @return {Boolean} whether the parent is the child or the child is in the parent
 */
function isOrContainsNode(parent, child, environment) {
  var result = parent === child || child instanceof environment.Node && parent.contains && parent.contains(child);
  return result;
}

/**
 * Simple debounce implementation. Will call the given
 * function once after the time given has passed since
 * it was last called.
 * @param {Function} fn the function to call after the time
 * @param {Number} time the time to wait
 * @return {Function} the debounced function
 */
function debounce$2(fn, time) {
  var timeoutId;
  function cancel() {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  }
  function wrapper() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    cancel();
    timeoutId = setTimeout(function () {
      timeoutId = null;
      fn.apply(void 0, args);
    }, time);
  }
  wrapper.cancel = cancel;
  return wrapper;
}

/**
 * This is intended to be used to compose event handlers.
 * They are executed in order until one of them sets
 * `event.preventDownshiftDefault = true`.
 * @param {...Function} fns the event handler functions
 * @return {Function} the event handler to add to an element
 */
function callAllEventHandlers() {
  for (var _len2 = arguments.length, fns = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    fns[_key2] = arguments[_key2];
  }
  return function (event) {
    for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      args[_key3 - 1] = arguments[_key3];
    }
    return fns.some(function (fn) {
      if (fn) {
        fn.apply(void 0, [event].concat(args));
      }
      return event.preventDownshiftDefault || event.hasOwnProperty('nativeEvent') && event.nativeEvent.preventDownshiftDefault;
    });
  };
}
function handleRefs() {
  for (var _len4 = arguments.length, refs = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
    refs[_key4] = arguments[_key4];
  }
  return function (node) {
    refs.forEach(function (ref) {
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    });
  };
}

/**
 * This generates a unique ID for an instance of Downshift
 * @return {String} the unique ID
 */
function generateId() {
  return String(idCounter++);
}

/**
 * Default implementation for status message. Only added when menu is open.
 * Will specify if there are results in the list, and if so, how many,
 * and what keys are relevant.
 *
 * @param {Object} param the downshift state and other relevant properties
 * @return {String} the a11y status message
 */
function getA11yStatusMessage$1(_ref2) {
  var isOpen = _ref2.isOpen,
    resultCount = _ref2.resultCount,
    previousResultCount = _ref2.previousResultCount;
  if (!isOpen) {
    return '';
  }
  if (!resultCount) {
    return 'No results are available.';
  }
  if (resultCount !== previousResultCount) {
    return resultCount + " result" + (resultCount === 1 ? ' is' : 's are') + " available, use up and down arrow keys to navigate. Press Enter key to select.";
  }
  return '';
}

/**
 * Takes an argument and if it's an array, returns the first item in the array
 * otherwise returns the argument
 * @param {*} arg the maybe-array
 * @param {*} defaultValue the value if arg is falsey not defined
 * @return {*} the arg or it's first item
 */
function unwrapArray$1(arg, defaultValue) {
  arg = Array.isArray(arg) ? /* istanbul ignore next (preact) */arg[0] : arg;
  if (!arg && defaultValue) {
    return defaultValue;
  } else {
    return arg;
  }
}

/**
 * @param {Object} element (P)react element
 * @return {Boolean} whether it's a DOM element
 */
function isDOMElement(element) {
  // then we assume this is react
  return typeof element.type === 'string';
}

/**
 * @param {Object} element (P)react element
 * @return {Object} the props
 */
function getElementProps(element) {
  return element.props;
}
var stateKeys = ['highlightedIndex', 'inputValue', 'isOpen', 'selectedItem', 'type'];
/**
 * @param {Object} state the state object
 * @return {Object} state that is relevant to downshift
 */
function pickState(state) {
  if (state === void 0) {
    state = {};
  }
  var result = {};
  stateKeys.forEach(function (k) {
    if (state.hasOwnProperty(k)) {
      result[k] = state[k];
    }
  });
  return result;
}

/**
 * This will perform a shallow merge of the given state object
 * with the state coming from props
 * (for the controlled component scenario)
 * This is used in state updater functions so they're referencing
 * the right state regardless of where it comes from.
 *
 * @param {Object} state The state of the component/hook.
 * @param {Object} props The props that may contain controlled values.
 * @returns {Object} The merged controlled state.
 */
function getState(state, props) {
  return Object.keys(state).reduce(function (prevState, key) {
    prevState[key] = isControlledProp(props, key) ? props[key] : state[key];
    return prevState;
  }, {});
}

/**
 * This determines whether a prop is a "controlled prop" meaning it is
 * state which is controlled by the outside of this component rather
 * than within this component.
 *
 * @param {Object} props The props that may contain controlled values.
 * @param {String} key the key to check
 * @return {Boolean} whether it is a controlled controlled prop
 */
function isControlledProp(props, key) {
  return props[key] !== undefined;
}

/**
 * Normalizes the 'key' property of a KeyboardEvent in IE/Edge
 * @param {Object} event a keyboardEvent object
 * @return {String} keyboard key
 */
function normalizeArrowKey(event) {
  var key = event.key,
    keyCode = event.keyCode;
  /* istanbul ignore next (ie) */
  if (keyCode >= 37 && keyCode <= 40 && key.indexOf('Arrow') !== 0) {
    return "Arrow" + key;
  }
  return key;
}

/**
 * Returns the new index in the list, in a circular way. If next value is out of bonds from the total,
 * it will wrap to either 0 or itemCount - 1.
 *
 * @param {number} moveAmount Number of positions to move. Negative to move backwards, positive forwards.
 * @param {number} baseIndex The initial position to move from.
 * @param {number} itemCount The total number of items.
 * @param {Function} getItemNodeFromIndex Used to check if item is disabled.
 * @param {boolean} circular Specify if navigation is circular. Default is true.
 * @returns {number} The new index after the move.
 */
function getNextWrappingIndex(moveAmount, baseIndex, itemCount, getItemNodeFromIndex, circular) {
  if (circular === void 0) {
    circular = true;
  }
  if (itemCount === 0) {
    return -1;
  }
  var itemsLastIndex = itemCount - 1;
  if (typeof baseIndex !== 'number' || baseIndex < 0 || baseIndex >= itemCount) {
    baseIndex = moveAmount > 0 ? -1 : itemsLastIndex + 1;
  }
  var newIndex = baseIndex + moveAmount;
  if (newIndex < 0) {
    newIndex = circular ? itemsLastIndex : 0;
  } else if (newIndex > itemsLastIndex) {
    newIndex = circular ? 0 : itemsLastIndex;
  }
  var nonDisabledNewIndex = getNextNonDisabledIndex(moveAmount, newIndex, itemCount, getItemNodeFromIndex, circular);
  if (nonDisabledNewIndex === -1) {
    return baseIndex >= itemCount ? -1 : baseIndex;
  }
  return nonDisabledNewIndex;
}

/**
 * Returns the next index in the list of an item that is not disabled.
 *
 * @param {number} moveAmount Number of positions to move. Negative to move backwards, positive forwards.
 * @param {number} baseIndex The initial position to move from.
 * @param {number} itemCount The total number of items.
 * @param {Function} getItemNodeFromIndex Used to check if item is disabled.
 * @param {boolean} circular Specify if navigation is circular. Default is true.
 * @returns {number} The new index. Returns baseIndex if item is not disabled. Returns next non-disabled item otherwise. If no non-disabled found it will return -1.
 */
function getNextNonDisabledIndex(moveAmount, baseIndex, itemCount, getItemNodeFromIndex, circular) {
  var currentElementNode = getItemNodeFromIndex(baseIndex);
  if (!currentElementNode || !currentElementNode.hasAttribute('disabled')) {
    return baseIndex;
  }
  if (moveAmount > 0) {
    for (var index = baseIndex + 1; index < itemCount; index++) {
      if (!getItemNodeFromIndex(index).hasAttribute('disabled')) {
        return index;
      }
    }
  } else {
    for (var _index = baseIndex - 1; _index >= 0; _index--) {
      if (!getItemNodeFromIndex(_index).hasAttribute('disabled')) {
        return _index;
      }
    }
  }
  if (circular) {
    return moveAmount > 0 ? getNextNonDisabledIndex(1, 0, itemCount, getItemNodeFromIndex, false) : getNextNonDisabledIndex(-1, itemCount - 1, itemCount, getItemNodeFromIndex, false);
  }
  return -1;
}

/**
 * Checks if event target is within the downshift elements.
 *
 * @param {EventTarget} target Target to check.
 * @param {HTMLElement[]} downshiftElements The elements that form downshift (list, toggle button etc).
 * @param {Window} environment The window context where downshift renders.
 * @param {boolean} checkActiveElement Whether to also check activeElement.
 *
 * @returns {boolean} Whether or not the target is within downshift elements.
 */
function targetWithinDownshift(target, downshiftElements, environment, checkActiveElement) {
  if (checkActiveElement === void 0) {
    checkActiveElement = true;
  }
  return downshiftElements.some(function (contextNode) {
    return contextNode && (isOrContainsNode(contextNode, target, environment) || checkActiveElement && isOrContainsNode(contextNode, environment.document.activeElement, environment));
  });
}
var cleanupStatus = debounce$2(function (documentProp) {
  getStatusDiv(documentProp).textContent = '';
}, 500);

/**
 * @param {String} status the status message
 * @param {Object} documentProp document passed by the user.
 */
function setStatus(status, documentProp) {
  var div = getStatusDiv(documentProp);
  if (!status) {
    return;
  }
  div.textContent = status;
  cleanupStatus(documentProp);
}

/**
 * Get the status node or create it if it does not already exist.
 * @param {Object} documentProp document passed by the user.
 * @return {HTMLElement} the status node.
 */
function getStatusDiv(documentProp) {
  if (documentProp === void 0) {
    documentProp = document;
  }
  var statusDiv = documentProp.getElementById('a11y-status-message');
  if (statusDiv) {
    return statusDiv;
  }
  statusDiv = documentProp.createElement('div');
  statusDiv.setAttribute('id', 'a11y-status-message');
  statusDiv.setAttribute('role', 'status');
  statusDiv.setAttribute('aria-live', 'polite');
  statusDiv.setAttribute('aria-relevant', 'additions text');
  Object.assign(statusDiv.style, {
    border: '0',
    clip: 'rect(0 0 0 0)',
    height: '1px',
    margin: '-1px',
    overflow: 'hidden',
    padding: '0',
    position: 'absolute',
    width: '1px'
  });
  documentProp.body.appendChild(statusDiv);
  return statusDiv;
}
var unknown = 0;
var mouseUp = 1;
var itemMouseEnter = 2;
var keyDownArrowUp = 3;
var keyDownArrowDown = 4;
var keyDownEscape = 5;
var keyDownEnter = 6;
var keyDownHome = 7;
var keyDownEnd = 8;
var clickItem = 9;
var blurInput = 10;
var changeInput = 11;
var keyDownSpaceButton = 12;
var clickButton = 13;
var blurButton = 14;
var controlledPropUpdatedSelectedItem = 15;
var touchEnd = 16;
var stateChangeTypes$3 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  unknown: unknown,
  mouseUp: mouseUp,
  itemMouseEnter: itemMouseEnter,
  keyDownArrowUp: keyDownArrowUp,
  keyDownArrowDown: keyDownArrowDown,
  keyDownEscape: keyDownEscape,
  keyDownEnter: keyDownEnter,
  keyDownHome: keyDownHome,
  keyDownEnd: keyDownEnd,
  clickItem: clickItem,
  blurInput: blurInput,
  changeInput: changeInput,
  keyDownSpaceButton: keyDownSpaceButton,
  clickButton: clickButton,
  blurButton: blurButton,
  controlledPropUpdatedSelectedItem: controlledPropUpdatedSelectedItem,
  touchEnd: touchEnd
});
var _excluded$4 = ["refKey", "ref"],
  _excluded2$3 = ["onClick", "onPress", "onKeyDown", "onKeyUp", "onBlur"],
  _excluded3$2 = ["onKeyDown", "onBlur", "onChange", "onInput", "onChangeText"],
  _excluded4$1 = ["refKey", "ref"],
  _excluded5 = ["onMouseMove", "onMouseDown", "onClick", "onPress", "index", "item"];
var Downshift = /*#__PURE__*/function () {
  var Downshift = /*#__PURE__*/function (_Component) {
    _inheritsLoose(Downshift, _Component);
    function Downshift(_props) {
      var _this;
      _this = _Component.call(this, _props) || this;
      // fancy destructuring + defaults + aliases
      // this basically says each value of state should either be set to
      // the initial value or the default value if the initial value is not provided
      _this.id = _this.props.id || "downshift-" + generateId();
      _this.menuId = _this.props.menuId || _this.id + "-menu";
      _this.labelId = _this.props.labelId || _this.id + "-label";
      _this.inputId = _this.props.inputId || _this.id + "-input";
      _this.getItemId = _this.props.getItemId || function (index) {
        return _this.id + "-item-" + index;
      };
      _this.input = null;
      _this.items = [];
      // itemCount can be changed asynchronously
      // from within downshift (so it can't come from a prop)
      // this is why we store it as an instance and use
      // getItemCount rather than just use items.length
      // (to support windowing + async)
      _this.itemCount = null;
      _this.previousResultCount = 0;
      _this.timeoutIds = [];
      /**
       * @param {Function} fn the function to call after the time
       * @param {Number} time the time to wait
       */
      _this.internalSetTimeout = function (fn, time) {
        var id = setTimeout(function () {
          _this.timeoutIds = _this.timeoutIds.filter(function (i) {
            return i !== id;
          });
          fn();
        }, time);
        _this.timeoutIds.push(id);
      };
      _this.setItemCount = function (count) {
        _this.itemCount = count;
      };
      _this.unsetItemCount = function () {
        _this.itemCount = null;
      };
      _this.setHighlightedIndex = function (highlightedIndex, otherStateToSet) {
        if (highlightedIndex === void 0) {
          highlightedIndex = _this.props.defaultHighlightedIndex;
        }
        if (otherStateToSet === void 0) {
          otherStateToSet = {};
        }
        otherStateToSet = pickState(otherStateToSet);
        _this.internalSetState(_extends$x({
          highlightedIndex: highlightedIndex
        }, otherStateToSet));
      };
      _this.clearSelection = function (cb) {
        _this.internalSetState({
          selectedItem: null,
          inputValue: '',
          highlightedIndex: _this.props.defaultHighlightedIndex,
          isOpen: _this.props.defaultIsOpen
        }, cb);
      };
      _this.selectItem = function (item, otherStateToSet, cb) {
        otherStateToSet = pickState(otherStateToSet);
        _this.internalSetState(_extends$x({
          isOpen: _this.props.defaultIsOpen,
          highlightedIndex: _this.props.defaultHighlightedIndex,
          selectedItem: item,
          inputValue: _this.props.itemToString(item)
        }, otherStateToSet), cb);
      };
      _this.selectItemAtIndex = function (itemIndex, otherStateToSet, cb) {
        var item = _this.items[itemIndex];
        if (item == null) {
          return;
        }
        _this.selectItem(item, otherStateToSet, cb);
      };
      _this.selectHighlightedItem = function (otherStateToSet, cb) {
        return _this.selectItemAtIndex(_this.getState().highlightedIndex, otherStateToSet, cb);
      };
      // any piece of our state can live in two places:
      // 1. Uncontrolled: it's internal (this.state)
      //    We will call this.setState to update that state
      // 2. Controlled: it's external (this.props)
      //    We will call this.props.onStateChange to update that state
      //
      // In addition, we'll call this.props.onChange if the
      // selectedItem is changed.
      _this.internalSetState = function (stateToSet, cb) {
        var isItemSelected, onChangeArg;
        var onStateChangeArg = {};
        var isStateToSetFunction = typeof stateToSet === 'function';

        // we want to call `onInputValueChange` before the `setState` call
        // so someone controlling the `inputValue` state gets notified of
        // the input change as soon as possible. This avoids issues with
        // preserving the cursor position.
        // See https://github.com/downshift-js/downshift/issues/217 for more info.
        if (!isStateToSetFunction && stateToSet.hasOwnProperty('inputValue')) {
          _this.props.onInputValueChange(stateToSet.inputValue, _extends$x({}, _this.getStateAndHelpers(), stateToSet));
        }
        return _this.setState(function (state) {
          state = _this.getState(state);
          var newStateToSet = isStateToSetFunction ? stateToSet(state) : stateToSet;

          // Your own function that could modify the state that will be set.
          newStateToSet = _this.props.stateReducer(state, newStateToSet);

          // checks if an item is selected, regardless of if it's different from
          // what was selected before
          // used to determine if onSelect and onChange callbacks should be called
          isItemSelected = newStateToSet.hasOwnProperty('selectedItem');
          // this keeps track of the object we want to call with setState
          var nextState = {};
          // we need to call on change if the outside world is controlling any of our state
          // and we're trying to update that state. OR if the selection has changed and we're
          // trying to update the selection
          if (isItemSelected && newStateToSet.selectedItem !== state.selectedItem) {
            onChangeArg = newStateToSet.selectedItem;
          }
          newStateToSet.type = newStateToSet.type || unknown;
          Object.keys(newStateToSet).forEach(function (key) {
            // onStateChangeArg should only have the state that is
            // actually changing
            if (state[key] !== newStateToSet[key]) {
              onStateChangeArg[key] = newStateToSet[key];
            }
            // the type is useful for the onStateChangeArg
            // but we don't actually want to set it in internal state.
            // this is an undocumented feature for now... Not all internalSetState
            // calls support it and I'm not certain we want them to yet.
            // But it enables users controlling the isOpen state to know when
            // the isOpen state changes due to mouseup events which is quite handy.
            if (key === 'type') {
              return;
            }
            newStateToSet[key];
            // if it's coming from props, then we don't care to set it internally
            if (!isControlledProp(_this.props, key)) {
              nextState[key] = newStateToSet[key];
            }
          });

          // if stateToSet is a function, then we weren't able to call onInputValueChange
          // earlier, so we'll call it now that we know what the inputValue state will be.
          if (isStateToSetFunction && newStateToSet.hasOwnProperty('inputValue')) {
            _this.props.onInputValueChange(newStateToSet.inputValue, _extends$x({}, _this.getStateAndHelpers(), newStateToSet));
          }
          return nextState;
        }, function () {
          // call the provided callback if it's a function
          cbToCb(cb)();

          // only call the onStateChange and onChange callbacks if
          // we have relevant information to pass them.
          var hasMoreStateThanType = Object.keys(onStateChangeArg).length > 1;
          if (hasMoreStateThanType) {
            _this.props.onStateChange(onStateChangeArg, _this.getStateAndHelpers());
          }
          if (isItemSelected) {
            _this.props.onSelect(stateToSet.selectedItem, _this.getStateAndHelpers());
          }
          if (onChangeArg !== undefined) {
            _this.props.onChange(onChangeArg, _this.getStateAndHelpers());
          }
          // this is currently undocumented and therefore subject to change
          // We'll try to not break it, but just be warned.
          _this.props.onUserAction(onStateChangeArg, _this.getStateAndHelpers());
        });
      };
      //////////////////////////// ROOT
      _this.rootRef = function (node) {
        return _this._rootNode = node;
      };
      _this.getRootProps = function (_temp, _temp2) {
        var _extends2;
        var _ref = _temp === void 0 ? {} : _temp,
          _ref$refKey = _ref.refKey,
          refKey = _ref$refKey === void 0 ? 'ref' : _ref$refKey,
          ref = _ref.ref,
          rest = _objectWithoutPropertiesLoose(_ref, _excluded$4);
        var _ref2 = _temp2 === void 0 ? {} : _temp2,
          _ref2$suppressRefErro = _ref2.suppressRefError,
          suppressRefError = _ref2$suppressRefErro === void 0 ? false : _ref2$suppressRefErro;
        // this is used in the render to know whether the user has called getRootProps.
        // It uses that to know whether to apply the props automatically
        _this.getRootProps.called = true;
        _this.getRootProps.refKey = refKey;
        _this.getRootProps.suppressRefError = suppressRefError;
        var _this$getState = _this.getState(),
          isOpen = _this$getState.isOpen;
        return _extends$x((_extends2 = {}, _extends2[refKey] = handleRefs(ref, _this.rootRef), _extends2.role = 'combobox', _extends2['aria-expanded'] = isOpen, _extends2['aria-haspopup'] = 'listbox', _extends2['aria-owns'] = isOpen ? _this.menuId : null, _extends2['aria-labelledby'] = _this.labelId, _extends2), rest);
      };
      //\\\\\\\\\\\\\\\\\\\\\\\\\\ ROOT
      _this.keyDownHandlers = {
        ArrowDown: function ArrowDown(event) {
          var _this2 = this;
          event.preventDefault();
          if (this.getState().isOpen) {
            var amount = event.shiftKey ? 5 : 1;
            this.moveHighlightedIndex(amount, {
              type: keyDownArrowDown
            });
          } else {
            this.internalSetState({
              isOpen: true,
              type: keyDownArrowDown
            }, function () {
              var itemCount = _this2.getItemCount();
              if (itemCount > 0) {
                var _this2$getState = _this2.getState(),
                  highlightedIndex = _this2$getState.highlightedIndex;
                var nextHighlightedIndex = getNextWrappingIndex(1, highlightedIndex, itemCount, function (index) {
                  return _this2.getItemNodeFromIndex(index);
                });
                _this2.setHighlightedIndex(nextHighlightedIndex, {
                  type: keyDownArrowDown
                });
              }
            });
          }
        },
        ArrowUp: function ArrowUp(event) {
          var _this3 = this;
          event.preventDefault();
          if (this.getState().isOpen) {
            var amount = event.shiftKey ? -5 : -1;
            this.moveHighlightedIndex(amount, {
              type: keyDownArrowUp
            });
          } else {
            this.internalSetState({
              isOpen: true,
              type: keyDownArrowUp
            }, function () {
              var itemCount = _this3.getItemCount();
              if (itemCount > 0) {
                var _this3$getState = _this3.getState(),
                  highlightedIndex = _this3$getState.highlightedIndex;
                var nextHighlightedIndex = getNextWrappingIndex(-1, highlightedIndex, itemCount, function (index) {
                  return _this3.getItemNodeFromIndex(index);
                });
                _this3.setHighlightedIndex(nextHighlightedIndex, {
                  type: keyDownArrowUp
                });
              }
            });
          }
        },
        Enter: function Enter(event) {
          if (event.which === 229) {
            return;
          }
          var _this$getState2 = this.getState(),
            isOpen = _this$getState2.isOpen,
            highlightedIndex = _this$getState2.highlightedIndex;
          if (isOpen && highlightedIndex != null) {
            event.preventDefault();
            var item = this.items[highlightedIndex];
            var itemNode = this.getItemNodeFromIndex(highlightedIndex);
            if (item == null || itemNode && itemNode.hasAttribute('disabled')) {
              return;
            }
            this.selectHighlightedItem({
              type: keyDownEnter
            });
          }
        },
        Escape: function Escape(event) {
          event.preventDefault();
          this.reset(_extends$x({
            type: keyDownEscape
          }, !this.state.isOpen && {
            selectedItem: null,
            inputValue: ''
          }));
        }
      };
      //////////////////////////// BUTTON
      _this.buttonKeyDownHandlers = _extends$x({}, _this.keyDownHandlers, {
        ' ': function _(event) {
          event.preventDefault();
          this.toggleMenu({
            type: keyDownSpaceButton
          });
        }
      });
      _this.inputKeyDownHandlers = _extends$x({}, _this.keyDownHandlers, {
        Home: function Home(event) {
          var _this4 = this;
          var _this$getState3 = this.getState(),
            isOpen = _this$getState3.isOpen;
          if (!isOpen) {
            return;
          }
          event.preventDefault();
          var itemCount = this.getItemCount();
          if (itemCount <= 0 || !isOpen) {
            return;
          }

          // get next non-disabled starting downwards from 0 if that's disabled.
          var newHighlightedIndex = getNextNonDisabledIndex(1, 0, itemCount, function (index) {
            return _this4.getItemNodeFromIndex(index);
          }, false);
          this.setHighlightedIndex(newHighlightedIndex, {
            type: keyDownHome
          });
        },
        End: function End(event) {
          var _this5 = this;
          var _this$getState4 = this.getState(),
            isOpen = _this$getState4.isOpen;
          if (!isOpen) {
            return;
          }
          event.preventDefault();
          var itemCount = this.getItemCount();
          if (itemCount <= 0 || !isOpen) {
            return;
          }

          // get next non-disabled starting upwards from last index if that's disabled.
          var newHighlightedIndex = getNextNonDisabledIndex(-1, itemCount - 1, itemCount, function (index) {
            return _this5.getItemNodeFromIndex(index);
          }, false);
          this.setHighlightedIndex(newHighlightedIndex, {
            type: keyDownEnd
          });
        }
      });
      _this.getToggleButtonProps = function (_temp3) {
        var _ref3 = _temp3 === void 0 ? {} : _temp3,
          onClick = _ref3.onClick;
        _ref3.onPress;
        var onKeyDown = _ref3.onKeyDown,
          onKeyUp = _ref3.onKeyUp,
          onBlur = _ref3.onBlur,
          rest = _objectWithoutPropertiesLoose(_ref3, _excluded2$3);
        var _this$getState5 = _this.getState(),
          isOpen = _this$getState5.isOpen;
        var enabledEventHandlers = {
          onClick: callAllEventHandlers(onClick, _this.buttonHandleClick),
          onKeyDown: callAllEventHandlers(onKeyDown, _this.buttonHandleKeyDown),
          onKeyUp: callAllEventHandlers(onKeyUp, _this.buttonHandleKeyUp),
          onBlur: callAllEventHandlers(onBlur, _this.buttonHandleBlur)
        };
        var eventHandlers = rest.disabled ? {} : enabledEventHandlers;
        return _extends$x({
          type: 'button',
          role: 'button',
          'aria-label': isOpen ? 'close menu' : 'open menu',
          'aria-haspopup': true,
          'data-toggle': true
        }, eventHandlers, rest);
      };
      _this.buttonHandleKeyUp = function (event) {
        // Prevent click event from emitting in Firefox
        event.preventDefault();
      };
      _this.buttonHandleKeyDown = function (event) {
        var key = normalizeArrowKey(event);
        if (_this.buttonKeyDownHandlers[key]) {
          _this.buttonKeyDownHandlers[key].call(_assertThisInitialized(_this), event);
        }
      };
      _this.buttonHandleClick = function (event) {
        event.preventDefault();
        // handle odd case for Safari and Firefox which
        // don't give the button the focus properly.
        /* istanbul ignore if (can't reasonably test this) */
        if (_this.props.environment.document.activeElement === _this.props.environment.document.body) {
          event.target.focus();
        }
        // to simplify testing components that use downshift, we'll not wrap this in a setTimeout
        // if the NODE_ENV is test. With the proper build system, this should be dead code eliminated
        // when building for production and should therefore have no impact on production code.
        {
          // Ensure that toggle of menu occurs after the potential blur event in iOS
          _this.internalSetTimeout(function () {
            return _this.toggleMenu({
              type: clickButton
            });
          });
        }
      };
      _this.buttonHandleBlur = function (event) {
        var blurTarget = event.target; // Save blur target for comparison with activeElement later
        // Need setTimeout, so that when the user presses Tab, the activeElement is the next focused element, not body element
        _this.internalSetTimeout(function () {
          if (!_this.isMouseDown && (_this.props.environment.document.activeElement == null || _this.props.environment.document.activeElement.id !== _this.inputId) && _this.props.environment.document.activeElement !== blurTarget // Do nothing if we refocus the same element again (to solve issue in Safari on iOS)
          ) {
            _this.reset({
              type: blurButton
            });
          }
        });
      };
      //\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ BUTTON
      /////////////////////////////// LABEL
      _this.getLabelProps = function (props) {
        return _extends$x({
          htmlFor: _this.inputId,
          id: _this.labelId
        }, props);
      };
      //\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ LABEL
      /////////////////////////////// INPUT
      _this.getInputProps = function (_temp4) {
        var _ref4 = _temp4 === void 0 ? {} : _temp4,
          onKeyDown = _ref4.onKeyDown,
          onBlur = _ref4.onBlur,
          onChange = _ref4.onChange,
          onInput = _ref4.onInput;
        _ref4.onChangeText;
        var rest = _objectWithoutPropertiesLoose(_ref4, _excluded3$2);
        var onChangeKey;
        var eventHandlers = {};

        /* istanbul ignore next (preact) */
        {
          onChangeKey = 'onChange';
        }
        var _this$getState6 = _this.getState(),
          inputValue = _this$getState6.inputValue,
          isOpen = _this$getState6.isOpen,
          highlightedIndex = _this$getState6.highlightedIndex;
        if (!rest.disabled) {
          var _eventHandlers;
          eventHandlers = (_eventHandlers = {}, _eventHandlers[onChangeKey] = callAllEventHandlers(onChange, onInput, _this.inputHandleChange), _eventHandlers.onKeyDown = callAllEventHandlers(onKeyDown, _this.inputHandleKeyDown), _eventHandlers.onBlur = callAllEventHandlers(onBlur, _this.inputHandleBlur), _eventHandlers);
        }
        return _extends$x({
          'aria-autocomplete': 'list',
          'aria-activedescendant': isOpen && typeof highlightedIndex === 'number' && highlightedIndex >= 0 ? _this.getItemId(highlightedIndex) : null,
          'aria-controls': isOpen ? _this.menuId : null,
          'aria-labelledby': _this.labelId,
          // https://developer.mozilla.org/en-US/docs/Web/Security/Securing_your_site/Turning_off_form_autocompletion
          // revert back since autocomplete="nope" is ignored on latest Chrome and Opera
          autoComplete: 'off',
          value: inputValue,
          id: _this.inputId
        }, eventHandlers, rest);
      };
      _this.inputHandleKeyDown = function (event) {
        var key = normalizeArrowKey(event);
        if (key && _this.inputKeyDownHandlers[key]) {
          _this.inputKeyDownHandlers[key].call(_assertThisInitialized(_this), event);
        }
      };
      _this.inputHandleChange = function (event) {
        _this.internalSetState({
          type: changeInput,
          isOpen: true,
          inputValue: event.target.value,
          highlightedIndex: _this.props.defaultHighlightedIndex
        });
      };
      _this.inputHandleBlur = function () {
        // Need setTimeout, so that when the user presses Tab, the activeElement is the next focused element, not the body element
        _this.internalSetTimeout(function () {
          var downshiftButtonIsActive = _this.props.environment.document && !!_this.props.environment.document.activeElement && !!_this.props.environment.document.activeElement.dataset && _this.props.environment.document.activeElement.dataset.toggle && _this._rootNode && _this._rootNode.contains(_this.props.environment.document.activeElement);
          if (!_this.isMouseDown && !downshiftButtonIsActive) {
            _this.reset({
              type: blurInput
            });
          }
        });
      };
      //\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ INPUT
      /////////////////////////////// MENU
      _this.menuRef = function (node) {
        _this._menuNode = node;
      };
      _this.getMenuProps = function (_temp5, _temp6) {
        var _extends3;
        var _ref5 = _temp5 === void 0 ? {} : _temp5,
          _ref5$refKey = _ref5.refKey,
          refKey = _ref5$refKey === void 0 ? 'ref' : _ref5$refKey,
          ref = _ref5.ref,
          props = _objectWithoutPropertiesLoose(_ref5, _excluded4$1);
        var _ref6 = _temp6 === void 0 ? {} : _temp6,
          _ref6$suppressRefErro = _ref6.suppressRefError,
          suppressRefError = _ref6$suppressRefErro === void 0 ? false : _ref6$suppressRefErro;
        _this.getMenuProps.called = true;
        _this.getMenuProps.refKey = refKey;
        _this.getMenuProps.suppressRefError = suppressRefError;
        return _extends$x((_extends3 = {}, _extends3[refKey] = handleRefs(ref, _this.menuRef), _extends3.role = 'listbox', _extends3['aria-labelledby'] = props && props['aria-label'] ? null : _this.labelId, _extends3.id = _this.menuId, _extends3), props);
      };
      //\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ MENU
      /////////////////////////////// ITEM
      _this.getItemProps = function (_temp7) {
        var _enabledEventHandlers;
        var _ref7 = _temp7 === void 0 ? {} : _temp7,
          onMouseMove = _ref7.onMouseMove,
          onMouseDown = _ref7.onMouseDown,
          onClick = _ref7.onClick;
        _ref7.onPress;
        var index = _ref7.index,
          _ref7$item = _ref7.item,
          item = _ref7$item === void 0 ? /* istanbul ignore next */undefined  : _ref7$item,
          rest = _objectWithoutPropertiesLoose(_ref7, _excluded5);
        if (index === undefined) {
          _this.items.push(item);
          index = _this.items.indexOf(item);
        } else {
          _this.items[index] = item;
        }
        var onSelectKey = 'onClick';
        var customClickHandler = onClick;
        var enabledEventHandlers = (_enabledEventHandlers = {
          // onMouseMove is used over onMouseEnter here. onMouseMove
          // is only triggered on actual mouse movement while onMouseEnter
          // can fire on DOM changes, interrupting keyboard navigation
          onMouseMove: callAllEventHandlers(onMouseMove, function () {
            if (index === _this.getState().highlightedIndex) {
              return;
            }
            _this.setHighlightedIndex(index, {
              type: itemMouseEnter
            });

            // We never want to manually scroll when changing state based
            // on `onMouseMove` because we will be moving the element out
            // from under the user which is currently scrolling/moving the
            // cursor
            _this.avoidScrolling = true;
            _this.internalSetTimeout(function () {
              return _this.avoidScrolling = false;
            }, 250);
          }),
          onMouseDown: callAllEventHandlers(onMouseDown, function (event) {
            // This prevents the activeElement from being changed
            // to the item so it can remain with the current activeElement
            // which is a more common use case.
            event.preventDefault();
          })
        }, _enabledEventHandlers[onSelectKey] = callAllEventHandlers(customClickHandler, function () {
          _this.selectItemAtIndex(index, {
            type: clickItem
          });
        }), _enabledEventHandlers);

        // Passing down the onMouseDown handler to prevent redirect
        // of the activeElement if clicking on disabled items
        var eventHandlers = rest.disabled ? {
          onMouseDown: enabledEventHandlers.onMouseDown
        } : enabledEventHandlers;
        return _extends$x({
          id: _this.getItemId(index),
          role: 'option',
          'aria-selected': _this.getState().highlightedIndex === index
        }, eventHandlers, rest);
      };
      //\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ ITEM
      _this.clearItems = function () {
        _this.items = [];
      };
      _this.reset = function (otherStateToSet, cb) {
        if (otherStateToSet === void 0) {
          otherStateToSet = {};
        }
        otherStateToSet = pickState(otherStateToSet);
        _this.internalSetState(function (_ref8) {
          var selectedItem = _ref8.selectedItem;
          return _extends$x({
            isOpen: _this.props.defaultIsOpen,
            highlightedIndex: _this.props.defaultHighlightedIndex,
            inputValue: _this.props.itemToString(selectedItem)
          }, otherStateToSet);
        }, cb);
      };
      _this.toggleMenu = function (otherStateToSet, cb) {
        if (otherStateToSet === void 0) {
          otherStateToSet = {};
        }
        otherStateToSet = pickState(otherStateToSet);
        _this.internalSetState(function (_ref9) {
          var isOpen = _ref9.isOpen;
          return _extends$x({
            isOpen: !isOpen
          }, isOpen && {
            highlightedIndex: _this.props.defaultHighlightedIndex
          }, otherStateToSet);
        }, function () {
          var _this$getState7 = _this.getState(),
            isOpen = _this$getState7.isOpen,
            highlightedIndex = _this$getState7.highlightedIndex;
          if (isOpen) {
            if (_this.getItemCount() > 0 && typeof highlightedIndex === 'number') {
              _this.setHighlightedIndex(highlightedIndex, otherStateToSet);
            }
          }
          cbToCb(cb)();
        });
      };
      _this.openMenu = function (cb) {
        _this.internalSetState({
          isOpen: true
        }, cb);
      };
      _this.closeMenu = function (cb) {
        _this.internalSetState({
          isOpen: false
        }, cb);
      };
      _this.updateStatus = debounce$2(function () {
        var state = _this.getState();
        var item = _this.items[state.highlightedIndex];
        var resultCount = _this.getItemCount();
        var status = _this.props.getA11yStatusMessage(_extends$x({
          itemToString: _this.props.itemToString,
          previousResultCount: _this.previousResultCount,
          resultCount: resultCount,
          highlightedItem: item
        }, state));
        _this.previousResultCount = resultCount;
        setStatus(status, _this.props.environment.document);
      }, 200);
      var _this$props = _this.props,
        defaultHighlightedIndex = _this$props.defaultHighlightedIndex,
        _this$props$initialHi = _this$props.initialHighlightedIndex,
        _highlightedIndex = _this$props$initialHi === void 0 ? defaultHighlightedIndex : _this$props$initialHi,
        defaultIsOpen = _this$props.defaultIsOpen,
        _this$props$initialIs = _this$props.initialIsOpen,
        _isOpen = _this$props$initialIs === void 0 ? defaultIsOpen : _this$props$initialIs,
        _this$props$initialIn = _this$props.initialInputValue,
        _inputValue = _this$props$initialIn === void 0 ? '' : _this$props$initialIn,
        _this$props$initialSe = _this$props.initialSelectedItem,
        _selectedItem = _this$props$initialSe === void 0 ? null : _this$props$initialSe;
      var _state = _this.getState({
        highlightedIndex: _highlightedIndex,
        isOpen: _isOpen,
        inputValue: _inputValue,
        selectedItem: _selectedItem
      });
      if (_state.selectedItem != null && _this.props.initialInputValue === undefined) {
        _state.inputValue = _this.props.itemToString(_state.selectedItem);
      }
      _this.state = _state;
      return _this;
    }
    var _proto = Downshift.prototype;
    /**
     * Clear all running timeouts
     */
    _proto.internalClearTimeouts = function internalClearTimeouts() {
      this.timeoutIds.forEach(function (id) {
        clearTimeout(id);
      });
      this.timeoutIds = [];
    }

    /**
     * Gets the state based on internal state or props
     * If a state value is passed via props, then that
     * is the value given, otherwise it's retrieved from
     * stateToMerge
     *
     * @param {Object} stateToMerge defaults to this.state
     * @return {Object} the state
     */;
    _proto.getState = function getState$1(stateToMerge) {
      if (stateToMerge === void 0) {
        stateToMerge = this.state;
      }
      return getState(stateToMerge, this.props);
    };
    _proto.getItemCount = function getItemCount() {
      // things read better this way. They're in priority order:
      // 1. `this.itemCount`
      // 2. `this.props.itemCount`
      // 3. `this.items.length`
      var itemCount = this.items.length;
      if (this.itemCount != null) {
        itemCount = this.itemCount;
      } else if (this.props.itemCount !== undefined) {
        itemCount = this.props.itemCount;
      }
      return itemCount;
    };
    _proto.getItemNodeFromIndex = function getItemNodeFromIndex(index) {
      return this.props.environment.document.getElementById(this.getItemId(index));
    };
    _proto.scrollHighlightedItemIntoView = function scrollHighlightedItemIntoView() {
      /* istanbul ignore else (react-native) */
      {
        var node = this.getItemNodeFromIndex(this.getState().highlightedIndex);
        this.props.scrollIntoView(node, this._menuNode);
      }
    };
    _proto.moveHighlightedIndex = function moveHighlightedIndex(amount, otherStateToSet) {
      var _this6 = this;
      var itemCount = this.getItemCount();
      var _this$getState8 = this.getState(),
        highlightedIndex = _this$getState8.highlightedIndex;
      if (itemCount > 0) {
        var nextHighlightedIndex = getNextWrappingIndex(amount, highlightedIndex, itemCount, function (index) {
          return _this6.getItemNodeFromIndex(index);
        });
        this.setHighlightedIndex(nextHighlightedIndex, otherStateToSet);
      }
    };
    _proto.getStateAndHelpers = function getStateAndHelpers() {
      var _this$getState9 = this.getState(),
        highlightedIndex = _this$getState9.highlightedIndex,
        inputValue = _this$getState9.inputValue,
        selectedItem = _this$getState9.selectedItem,
        isOpen = _this$getState9.isOpen;
      var itemToString = this.props.itemToString;
      var id = this.id;
      var getRootProps = this.getRootProps,
        getToggleButtonProps = this.getToggleButtonProps,
        getLabelProps = this.getLabelProps,
        getMenuProps = this.getMenuProps,
        getInputProps = this.getInputProps,
        getItemProps = this.getItemProps,
        openMenu = this.openMenu,
        closeMenu = this.closeMenu,
        toggleMenu = this.toggleMenu,
        selectItem = this.selectItem,
        selectItemAtIndex = this.selectItemAtIndex,
        selectHighlightedItem = this.selectHighlightedItem,
        setHighlightedIndex = this.setHighlightedIndex,
        clearSelection = this.clearSelection,
        clearItems = this.clearItems,
        reset = this.reset,
        setItemCount = this.setItemCount,
        unsetItemCount = this.unsetItemCount,
        setState = this.internalSetState;
      return {
        // prop getters
        getRootProps: getRootProps,
        getToggleButtonProps: getToggleButtonProps,
        getLabelProps: getLabelProps,
        getMenuProps: getMenuProps,
        getInputProps: getInputProps,
        getItemProps: getItemProps,
        // actions
        reset: reset,
        openMenu: openMenu,
        closeMenu: closeMenu,
        toggleMenu: toggleMenu,
        selectItem: selectItem,
        selectItemAtIndex: selectItemAtIndex,
        selectHighlightedItem: selectHighlightedItem,
        setHighlightedIndex: setHighlightedIndex,
        clearSelection: clearSelection,
        clearItems: clearItems,
        setItemCount: setItemCount,
        unsetItemCount: unsetItemCount,
        setState: setState,
        // props
        itemToString: itemToString,
        // derived
        id: id,
        // state
        highlightedIndex: highlightedIndex,
        inputValue: inputValue,
        isOpen: isOpen,
        selectedItem: selectedItem
      };
    };
    _proto.componentDidMount = function componentDidMount() {
      var _this7 = this;

      /* istanbul ignore if (react-native) */
      {
        // this.isMouseDown helps us track whether the mouse is currently held down.
        // This is useful when the user clicks on an item in the list, but holds the mouse
        // down long enough for the list to disappear (because the blur event fires on the input)
        // this.isMouseDown is used in the blur handler on the input to determine whether the blur event should
        // trigger hiding the menu.
        var onMouseDown = function onMouseDown() {
          _this7.isMouseDown = true;
        };
        var onMouseUp = function onMouseUp(event) {
          _this7.isMouseDown = false;
          // if the target element or the activeElement is within a downshift node
          // then we don't want to reset downshift
          var contextWithinDownshift = targetWithinDownshift(event.target, [_this7._rootNode, _this7._menuNode], _this7.props.environment);
          if (!contextWithinDownshift && _this7.getState().isOpen) {
            _this7.reset({
              type: mouseUp
            }, function () {
              return _this7.props.onOuterClick(_this7.getStateAndHelpers());
            });
          }
        };
        // Touching an element in iOS gives focus and hover states, but touching out of
        // the element will remove hover, and persist the focus state, resulting in the
        // blur event not being triggered.
        // this.isTouchMove helps us track whether the user is tapping or swiping on a touch screen.
        // If the user taps outside of Downshift, the component should be reset,
        // but not if the user is swiping
        var onTouchStart = function onTouchStart() {
          _this7.isTouchMove = false;
        };
        var onTouchMove = function onTouchMove() {
          _this7.isTouchMove = true;
        };
        var onTouchEnd = function onTouchEnd(event) {
          var contextWithinDownshift = targetWithinDownshift(event.target, [_this7._rootNode, _this7._menuNode], _this7.props.environment, false);
          if (!_this7.isTouchMove && !contextWithinDownshift && _this7.getState().isOpen) {
            _this7.reset({
              type: touchEnd
            }, function () {
              return _this7.props.onOuterClick(_this7.getStateAndHelpers());
            });
          }
        };
        var environment = this.props.environment;
        environment.addEventListener('mousedown', onMouseDown);
        environment.addEventListener('mouseup', onMouseUp);
        environment.addEventListener('touchstart', onTouchStart);
        environment.addEventListener('touchmove', onTouchMove);
        environment.addEventListener('touchend', onTouchEnd);
        this.cleanup = function () {
          _this7.internalClearTimeouts();
          _this7.updateStatus.cancel();
          environment.removeEventListener('mousedown', onMouseDown);
          environment.removeEventListener('mouseup', onMouseUp);
          environment.removeEventListener('touchstart', onTouchStart);
          environment.removeEventListener('touchmove', onTouchMove);
          environment.removeEventListener('touchend', onTouchEnd);
        };
      }
    };
    _proto.shouldScroll = function shouldScroll(prevState, prevProps) {
      var _ref10 = this.props.highlightedIndex === undefined ? this.getState() : this.props,
        currentHighlightedIndex = _ref10.highlightedIndex;
      var _ref11 = prevProps.highlightedIndex === undefined ? prevState : prevProps,
        prevHighlightedIndex = _ref11.highlightedIndex;
      var scrollWhenOpen = currentHighlightedIndex && this.getState().isOpen && !prevState.isOpen;
      var scrollWhenNavigating = currentHighlightedIndex !== prevHighlightedIndex;
      return scrollWhenOpen || scrollWhenNavigating;
    };
    _proto.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
      if (isControlledProp(this.props, 'selectedItem') && this.props.selectedItemChanged(prevProps.selectedItem, this.props.selectedItem)) {
        this.internalSetState({
          type: controlledPropUpdatedSelectedItem,
          inputValue: this.props.itemToString(this.props.selectedItem)
        });
      }
      if (!this.avoidScrolling && this.shouldScroll(prevState, prevProps)) {
        this.scrollHighlightedItemIntoView();
      }

      /* istanbul ignore else (react-native) */
      {
        this.updateStatus();
      }
    };
    _proto.componentWillUnmount = function componentWillUnmount() {
      this.cleanup(); // avoids memory leak
    };

    _proto.render = function render() {
      var children = unwrapArray$1(this.props.children, noop);
      // because the items are rerendered every time we call the children
      // we clear this out each render and it will be populated again as
      // getItemProps is called.
      this.clearItems();
      // we reset this so we know whether the user calls getRootProps during
      // this render. If they do then we don't need to do anything,
      // if they don't then we need to clone the element they return and
      // apply the props for them.
      this.getRootProps.called = false;
      this.getRootProps.refKey = undefined;
      this.getRootProps.suppressRefError = undefined;
      // we do something similar for getMenuProps
      this.getMenuProps.called = false;
      this.getMenuProps.refKey = undefined;
      this.getMenuProps.suppressRefError = undefined;
      // we do something similar for getLabelProps
      this.getLabelProps.called = false;
      // and something similar for getInputProps
      this.getInputProps.called = false;
      var element = unwrapArray$1(children(this.getStateAndHelpers()));
      if (!element) {
        return null;
      }
      if (this.getRootProps.called || this.props.suppressRefError) {
        return element;
      } else if (isDOMElement(element)) {
        // they didn't apply the root props, but we can clone
        // this and apply the props ourselves
        return /*#__PURE__*/reactExports.cloneElement(element, this.getRootProps(getElementProps(element)));
      }

      /* istanbul ignore next */
      return undefined;
    };
    return Downshift;
  }(reactExports.Component);
  Downshift.defaultProps = {
    defaultHighlightedIndex: null,
    defaultIsOpen: false,
    getA11yStatusMessage: getA11yStatusMessage$1,
    itemToString: function itemToString(i) {
      if (i == null) {
        return '';
      }
      return String(i);
    },
    onStateChange: noop,
    onInputValueChange: noop,
    onUserAction: noop,
    onChange: noop,
    onSelect: noop,
    onOuterClick: noop,
    selectedItemChanged: function selectedItemChanged(prevItem, item) {
      return prevItem !== item;
    },
    environment: /* istanbul ignore next (ssr) */
    typeof window === 'undefined' ? {} : window,
    stateReducer: function stateReducer(state, stateToSet) {
      return stateToSet;
    },
    suppressRefError: false,
    scrollIntoView: scrollIntoView
  };
  Downshift.stateChangeTypes = stateChangeTypes$3;
  return Downshift;
}();
var Downshift$1 = Downshift;

/**
 * Default state reducer that returns the changes.
 *
 * @param {Object} s state.
 * @param {Object} a action with changes.
 * @returns {Object} changes.
 */
function stateReducer$1(s, a) {
  return a.changes;
}

/**
 * Returns a message to be added to aria-live region when item is selected.
 *
 * @param {Object} selectionParameters Parameters required to build the message.
 * @returns {string} The a11y message.
 */
function getA11ySelectionMessage(selectionParameters) {
  var selectedItem = selectionParameters.selectedItem,
    itemToStringLocal = selectionParameters.itemToString;
  return selectedItem ? itemToStringLocal(selectedItem) + " has been selected." : '';
}

/**
 * Debounced call for updating the a11y message.
 */
debounce$2(function (getA11yMessage, document) {
  setStatus(getA11yMessage(), document);
}, 200);
function itemToString(item) {
  return item ? String(item) : '';
}
var defaultProps$3 = {
  itemToString: itemToString,
  stateReducer: stateReducer$1,
  getA11ySelectionMessage: getA11ySelectionMessage,
  scrollIntoView: scrollIntoView,
  environment: /* istanbul ignore next (ssr) */
  typeof window === 'undefined' ? {} : window
};
({
  items: propTypesExports.array.isRequired,
  itemToString: propTypesExports.func,
  getA11yStatusMessage: propTypesExports.func,
  getA11ySelectionMessage: propTypesExports.func,
  highlightedIndex: propTypesExports.number,
  defaultHighlightedIndex: propTypesExports.number,
  initialHighlightedIndex: propTypesExports.number,
  isOpen: propTypesExports.bool,
  defaultIsOpen: propTypesExports.bool,
  initialIsOpen: propTypesExports.bool,
  selectedItem: propTypesExports.any,
  initialSelectedItem: propTypesExports.any,
  defaultSelectedItem: propTypesExports.any,
  id: propTypesExports.string,
  labelId: propTypesExports.string,
  menuId: propTypesExports.string,
  getItemId: propTypesExports.func,
  toggleButtonId: propTypesExports.string,
  stateReducer: propTypesExports.func,
  onSelectedItemChange: propTypesExports.func,
  onHighlightedIndexChange: propTypesExports.func,
  onStateChange: propTypesExports.func,
  onIsOpenChange: propTypesExports.func,
  environment: propTypesExports.shape({
    addEventListener: propTypesExports.func,
    removeEventListener: propTypesExports.func,
    document: propTypesExports.shape({
      getElementById: propTypesExports.func,
      activeElement: propTypesExports.any,
      body: propTypesExports.any
    })
  })
});
/**
 * Default implementation for status message. Only added when menu is open.
 * Will specift if there are results in the list, and if so, how many,
 * and what keys are relevant.
 *
 * @param {Object} param the downshift state and other relevant properties
 * @return {String} the a11y status message
 */
function getA11yStatusMessage(_a) {
  var isOpen = _a.isOpen,
    resultCount = _a.resultCount,
    previousResultCount = _a.previousResultCount;
  if (!isOpen) {
    return '';
  }
  if (!resultCount) {
    return 'No results are available.';
  }
  if (resultCount !== previousResultCount) {
    return "".concat(resultCount, " result").concat(resultCount === 1 ? ' is' : 's are', " available, use up and down arrow keys to navigate. Press Enter or Space Bar keys to select.");
  }
  return '';
}
__assign(__assign({}, defaultProps$3), {
  getA11yStatusMessage: getA11yStatusMessage
});
({
  items: propTypesExports.array.isRequired,
  itemToString: propTypesExports.func,
  selectedItemChanged: propTypesExports.func,
  getA11yStatusMessage: propTypesExports.func,
  getA11ySelectionMessage: propTypesExports.func,
  highlightedIndex: propTypesExports.number,
  defaultHighlightedIndex: propTypesExports.number,
  initialHighlightedIndex: propTypesExports.number,
  isOpen: propTypesExports.bool,
  defaultIsOpen: propTypesExports.bool,
  initialIsOpen: propTypesExports.bool,
  selectedItem: propTypesExports.any,
  initialSelectedItem: propTypesExports.any,
  defaultSelectedItem: propTypesExports.any,
  inputValue: propTypesExports.string,
  defaultInputValue: propTypesExports.string,
  initialInputValue: propTypesExports.string,
  id: propTypesExports.string,
  labelId: propTypesExports.string,
  menuId: propTypesExports.string,
  getItemId: propTypesExports.func,
  inputId: propTypesExports.string,
  toggleButtonId: propTypesExports.string,
  stateReducer: propTypesExports.func,
  onSelectedItemChange: propTypesExports.func,
  onHighlightedIndexChange: propTypesExports.func,
  onStateChange: propTypesExports.func,
  onIsOpenChange: propTypesExports.func,
  onInputValueChange: propTypesExports.func,
  environment: propTypesExports.shape({
    addEventListener: propTypesExports.func,
    removeEventListener: propTypesExports.func,
    document: propTypesExports.shape({
      getElementById: propTypesExports.func,
      activeElement: propTypesExports.any,
      body: propTypesExports.any
    })
  })
});
_extends$x({}, defaultProps$3, {
  selectedItemChanged: function selectedItemChanged(prevItem, item) {
    return prevItem !== item;
  },
  getA11yStatusMessage: getA11yStatusMessage$1
});

/**
 * Returns a message to be added to aria-live region when item is removed.
 *
 * @param {Object} selectionParameters Parameters required to build the message.
 * @returns {string} The a11y message.
 */
function getA11yRemovalMessage(selectionParameters) {
  var removedSelectedItem = selectionParameters.removedSelectedItem,
    itemToStringLocal = selectionParameters.itemToString;
  return itemToStringLocal(removedSelectedItem) + " has been removed.";
}
({
  selectedItems: propTypesExports.array,
  initialSelectedItems: propTypesExports.array,
  defaultSelectedItems: propTypesExports.array,
  itemToString: propTypesExports.func,
  getA11yRemovalMessage: propTypesExports.func,
  stateReducer: propTypesExports.func,
  activeIndex: propTypesExports.number,
  initialActiveIndex: propTypesExports.number,
  defaultActiveIndex: propTypesExports.number,
  onActiveIndexChange: propTypesExports.func,
  onSelectedItemsChange: propTypesExports.func,
  keyNavigationNext: propTypesExports.string,
  keyNavigationPrevious: propTypesExports.string,
  environment: propTypesExports.shape({
    addEventListener: propTypesExports.func,
    removeEventListener: propTypesExports.func,
    document: propTypesExports.shape({
      getElementById: propTypesExports.func,
      activeElement: propTypesExports.any,
      body: propTypesExports.any
    })
  })
});
({
  itemToString: defaultProps$3.itemToString,
  stateReducer: defaultProps$3.stateReducer,
  environment: defaultProps$3.environment,
  getA11yRemovalMessage: getA11yRemovalMessage,
  keyNavigationNext: 'ArrowRight',
  keyNavigationPrevious: 'ArrowLeft'
});function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
}function _toPrimitive(input, hint) {
  if (_typeof(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (_typeof(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return _typeof(key) === "symbol" ? key : String(key);
}function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}var toStr$3 = Object.prototype.toString;
var isArguments$2 = function isArguments(value) {
  var str = toStr$3.call(value);
  var isArgs = str === '[object Arguments]';
  if (!isArgs) {
    isArgs = str !== '[object Array]' && value !== null && typeof value === 'object' && typeof value.length === 'number' && value.length >= 0 && toStr$3.call(value.callee) === '[object Function]';
  }
  return isArgs;
};var implementation$9;
var hasRequiredImplementation;

function requireImplementation () {
	if (hasRequiredImplementation) return implementation$9;
	hasRequiredImplementation = 1;

	var keysShim;
	if (!Object.keys) {
	  // modified from https://github.com/es-shims/es5-shim
	  var has = Object.prototype.hasOwnProperty;
	  var toStr = Object.prototype.toString;
	  var isArgs = isArguments$2; // eslint-disable-line global-require
	  var isEnumerable = Object.prototype.propertyIsEnumerable;
	  var hasDontEnumBug = !isEnumerable.call({
	    toString: null
	  }, 'toString');
	  var hasProtoEnumBug = isEnumerable.call(function () {}, 'prototype');
	  var dontEnums = ['toString', 'toLocaleString', 'valueOf', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'constructor'];
	  var equalsConstructorPrototype = function (o) {
	    var ctor = o.constructor;
	    return ctor && ctor.prototype === o;
	  };
	  var excludedKeys = {
	    $applicationCache: true,
	    $console: true,
	    $external: true,
	    $frame: true,
	    $frameElement: true,
	    $frames: true,
	    $innerHeight: true,
	    $innerWidth: true,
	    $onmozfullscreenchange: true,
	    $onmozfullscreenerror: true,
	    $outerHeight: true,
	    $outerWidth: true,
	    $pageXOffset: true,
	    $pageYOffset: true,
	    $parent: true,
	    $scrollLeft: true,
	    $scrollTop: true,
	    $scrollX: true,
	    $scrollY: true,
	    $self: true,
	    $webkitIndexedDB: true,
	    $webkitStorageInfo: true,
	    $window: true
	  };
	  var hasAutomationEqualityBug = function () {
	    /* global window */
	    if (typeof window === 'undefined') {
	      return false;
	    }
	    for (var k in window) {
	      try {
	        if (!excludedKeys['$' + k] && has.call(window, k) && window[k] !== null && typeof window[k] === 'object') {
	          try {
	            equalsConstructorPrototype(window[k]);
	          } catch (e) {
	            return true;
	          }
	        }
	      } catch (e) {
	        return true;
	      }
	    }
	    return false;
	  }();
	  var equalsConstructorPrototypeIfNotBuggy = function (o) {
	    /* global window */
	    if (typeof window === 'undefined' || !hasAutomationEqualityBug) {
	      return equalsConstructorPrototype(o);
	    }
	    try {
	      return equalsConstructorPrototype(o);
	    } catch (e) {
	      return false;
	    }
	  };
	  keysShim = function keys(object) {
	    var isObject = object !== null && typeof object === 'object';
	    var isFunction = toStr.call(object) === '[object Function]';
	    var isArguments = isArgs(object);
	    var isString = isObject && toStr.call(object) === '[object String]';
	    var theKeys = [];
	    if (!isObject && !isFunction && !isArguments) {
	      throw new TypeError('Object.keys called on a non-object');
	    }
	    var skipProto = hasProtoEnumBug && isFunction;
	    if (isString && object.length > 0 && !has.call(object, 0)) {
	      for (var i = 0; i < object.length; ++i) {
	        theKeys.push(String(i));
	      }
	    }
	    if (isArguments && object.length > 0) {
	      for (var j = 0; j < object.length; ++j) {
	        theKeys.push(String(j));
	      }
	    } else {
	      for (var name in object) {
	        if (!(skipProto && name === 'prototype') && has.call(object, name)) {
	          theKeys.push(String(name));
	        }
	      }
	    }
	    if (hasDontEnumBug) {
	      var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);
	      for (var k = 0; k < dontEnums.length; ++k) {
	        if (!(skipConstructor && dontEnums[k] === 'constructor') && has.call(object, dontEnums[k])) {
	          theKeys.push(dontEnums[k]);
	        }
	      }
	    }
	    return theKeys;
	  };
	}
	implementation$9 = keysShim;
	return implementation$9;
}var slice$1 = Array.prototype.slice;
var isArgs = isArguments$2;
var origKeys = Object.keys;
var keysShim = origKeys ? function keys(o) {
  return origKeys(o);
} : requireImplementation();
var originalKeys = Object.keys;
keysShim.shim = function shimObjectKeys() {
  if (Object.keys) {
    var keysWorksWithArguments = function () {
      // Safari 5.0 bug
      var args = Object.keys(arguments);
      return args && args.length === arguments.length;
    }(1, 2);
    if (!keysWorksWithArguments) {
      Object.keys = function keys(object) {
        // eslint-disable-line func-name-matching
        if (isArgs(object)) {
          return originalKeys(slice$1.call(object));
        }
        return originalKeys(object);
      };
    }
  } else {
    Object.keys = keysShim;
  }
  return Object.keys || keysShim;
};
var objectKeys$1 = keysShim;/* eslint complexity: [2, 18], max-statements: [2, 33] */
var shams$1 = function hasSymbols() {
  if (typeof Symbol !== 'function' || typeof Object.getOwnPropertySymbols !== 'function') {
    return false;
  }
  if (typeof Symbol.iterator === 'symbol') {
    return true;
  }
  var obj = {};
  var sym = Symbol('test');
  var symObj = Object(sym);
  if (typeof sym === 'string') {
    return false;
  }
  if (Object.prototype.toString.call(sym) !== '[object Symbol]') {
    return false;
  }
  if (Object.prototype.toString.call(symObj) !== '[object Symbol]') {
    return false;
  }

  // temp disabled per https://github.com/ljharb/object.assign/issues/17
  // if (sym instanceof Symbol) { return false; }
  // temp disabled per https://github.com/WebReflection/get-own-property-symbols/issues/4
  // if (!(symObj instanceof Symbol)) { return false; }

  // if (typeof Symbol.prototype.toString !== 'function') { return false; }
  // if (String(sym) !== Symbol.prototype.toString.call(sym)) { return false; }

  var symVal = 42;
  obj[sym] = symVal;
  for (sym in obj) {
    return false;
  } // eslint-disable-line no-restricted-syntax, no-unreachable-loop
  if (typeof Object.keys === 'function' && Object.keys(obj).length !== 0) {
    return false;
  }
  if (typeof Object.getOwnPropertyNames === 'function' && Object.getOwnPropertyNames(obj).length !== 0) {
    return false;
  }
  var syms = Object.getOwnPropertySymbols(obj);
  if (syms.length !== 1 || syms[0] !== sym) {
    return false;
  }
  if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) {
    return false;
  }
  if (typeof Object.getOwnPropertyDescriptor === 'function') {
    var descriptor = Object.getOwnPropertyDescriptor(obj, sym);
    if (descriptor.value !== symVal || descriptor.enumerable !== true) {
      return false;
    }
  }
  return true;
};var hasSymbols$3 = shams$1;
var shams = function hasToStringTagShams() {
  return hasSymbols$3() && !!Symbol.toStringTag;
};var origSymbol = typeof Symbol !== 'undefined' && Symbol;
var hasSymbolSham = shams$1;
var hasSymbols$2 = function hasNativeSymbols() {
  if (typeof origSymbol !== 'function') {
    return false;
  }
  if (typeof Symbol !== 'function') {
    return false;
  }
  if (typeof origSymbol('foo') !== 'symbol') {
    return false;
  }
  if (typeof Symbol('bar') !== 'symbol') {
    return false;
  }
  return hasSymbolSham();
};/* eslint no-invalid-this: 1 */
var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
var slice = Array.prototype.slice;
var toStr$2 = Object.prototype.toString;
var funcType = '[object Function]';
var implementation$8 = function bind(that) {
  var target = this;
  if (typeof target !== 'function' || toStr$2.call(target) !== funcType) {
    throw new TypeError(ERROR_MESSAGE + target);
  }
  var args = slice.call(arguments, 1);
  var bound;
  var binder = function () {
    if (this instanceof bound) {
      var result = target.apply(this, args.concat(slice.call(arguments)));
      if (Object(result) === result) {
        return result;
      }
      return this;
    } else {
      return target.apply(that, args.concat(slice.call(arguments)));
    }
  };
  var boundLength = Math.max(0, target.length - args.length);
  var boundArgs = [];
  for (var i = 0; i < boundLength; i++) {
    boundArgs.push('$' + i);
  }
  bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this,arguments); }')(binder);
  if (target.prototype) {
    var Empty = function Empty() {};
    Empty.prototype = target.prototype;
    bound.prototype = new Empty();
    Empty.prototype = null;
  }
  return bound;
};var implementation$7 = implementation$8;
var functionBind = Function.prototype.bind || implementation$7;var bind$1 = functionBind;
var src = bind$1.call(Function.call, Object.prototype.hasOwnProperty);var undefined$1;
var $SyntaxError = SyntaxError;
var $Function = Function;
var $TypeError = TypeError;

// eslint-disable-next-line consistent-return
var getEvalledConstructor = function (expressionSyntax) {
  try {
    return $Function('"use strict"; return (' + expressionSyntax + ').constructor;')();
  } catch (e) {}
};
var $gOPD$1 = Object.getOwnPropertyDescriptor;
if ($gOPD$1) {
  try {
    $gOPD$1({}, '');
  } catch (e) {
    $gOPD$1 = null; // this is IE 8, which has a broken gOPD
  }
}

var throwTypeError = function () {
  throw new $TypeError();
};
var ThrowTypeError = $gOPD$1 ? function () {
  try {
    // eslint-disable-next-line no-unused-expressions, no-caller, no-restricted-properties
    arguments.callee; // IE 8 does not throw here
    return throwTypeError;
  } catch (calleeThrows) {
    try {
      // IE 8 throws on Object.getOwnPropertyDescriptor(arguments, '')
      return $gOPD$1(arguments, 'callee').get;
    } catch (gOPDthrows) {
      return throwTypeError;
    }
  }
}() : throwTypeError;
var hasSymbols$1 = hasSymbols$2();
var getProto$1 = Object.getPrototypeOf || function (x) {
  return x.__proto__;
}; // eslint-disable-line no-proto

var needsEval = {};
var TypedArray = typeof Uint8Array === 'undefined' ? undefined$1 : getProto$1(Uint8Array);
var INTRINSICS = {
  '%AggregateError%': typeof AggregateError === 'undefined' ? undefined$1 : AggregateError,
  '%Array%': Array,
  '%ArrayBuffer%': typeof ArrayBuffer === 'undefined' ? undefined$1 : ArrayBuffer,
  '%ArrayIteratorPrototype%': hasSymbols$1 ? getProto$1([][Symbol.iterator]()) : undefined$1,
  '%AsyncFromSyncIteratorPrototype%': undefined$1,
  '%AsyncFunction%': needsEval,
  '%AsyncGenerator%': needsEval,
  '%AsyncGeneratorFunction%': needsEval,
  '%AsyncIteratorPrototype%': needsEval,
  '%Atomics%': typeof Atomics === 'undefined' ? undefined$1 : Atomics,
  '%BigInt%': typeof BigInt === 'undefined' ? undefined$1 : BigInt,
  '%BigInt64Array%': typeof BigInt64Array === 'undefined' ? undefined$1 : BigInt64Array,
  '%BigUint64Array%': typeof BigUint64Array === 'undefined' ? undefined$1 : BigUint64Array,
  '%Boolean%': Boolean,
  '%DataView%': typeof DataView === 'undefined' ? undefined$1 : DataView,
  '%Date%': Date,
  '%decodeURI%': decodeURI,
  '%decodeURIComponent%': decodeURIComponent,
  '%encodeURI%': encodeURI,
  '%encodeURIComponent%': encodeURIComponent,
  '%Error%': Error,
  '%eval%': eval,
  // eslint-disable-line no-eval
  '%EvalError%': EvalError,
  '%Float32Array%': typeof Float32Array === 'undefined' ? undefined$1 : Float32Array,
  '%Float64Array%': typeof Float64Array === 'undefined' ? undefined$1 : Float64Array,
  '%FinalizationRegistry%': typeof FinalizationRegistry === 'undefined' ? undefined$1 : FinalizationRegistry,
  '%Function%': $Function,
  '%GeneratorFunction%': needsEval,
  '%Int8Array%': typeof Int8Array === 'undefined' ? undefined$1 : Int8Array,
  '%Int16Array%': typeof Int16Array === 'undefined' ? undefined$1 : Int16Array,
  '%Int32Array%': typeof Int32Array === 'undefined' ? undefined$1 : Int32Array,
  '%isFinite%': isFinite,
  '%isNaN%': isNaN,
  '%IteratorPrototype%': hasSymbols$1 ? getProto$1(getProto$1([][Symbol.iterator]())) : undefined$1,
  '%JSON%': typeof JSON === 'object' ? JSON : undefined$1,
  '%Map%': typeof Map === 'undefined' ? undefined$1 : Map,
  '%MapIteratorPrototype%': typeof Map === 'undefined' || !hasSymbols$1 ? undefined$1 : getProto$1(new Map()[Symbol.iterator]()),
  '%Math%': Math,
  '%Number%': Number,
  '%Object%': Object,
  '%parseFloat%': parseFloat,
  '%parseInt%': parseInt,
  '%Promise%': typeof Promise === 'undefined' ? undefined$1 : Promise,
  '%Proxy%': typeof Proxy === 'undefined' ? undefined$1 : Proxy,
  '%RangeError%': RangeError,
  '%ReferenceError%': ReferenceError,
  '%Reflect%': typeof Reflect === 'undefined' ? undefined$1 : Reflect,
  '%RegExp%': RegExp,
  '%Set%': typeof Set === 'undefined' ? undefined$1 : Set,
  '%SetIteratorPrototype%': typeof Set === 'undefined' || !hasSymbols$1 ? undefined$1 : getProto$1(new Set()[Symbol.iterator]()),
  '%SharedArrayBuffer%': typeof SharedArrayBuffer === 'undefined' ? undefined$1 : SharedArrayBuffer,
  '%String%': String,
  '%StringIteratorPrototype%': hasSymbols$1 ? getProto$1(''[Symbol.iterator]()) : undefined$1,
  '%Symbol%': hasSymbols$1 ? Symbol : undefined$1,
  '%SyntaxError%': $SyntaxError,
  '%ThrowTypeError%': ThrowTypeError,
  '%TypedArray%': TypedArray,
  '%TypeError%': $TypeError,
  '%Uint8Array%': typeof Uint8Array === 'undefined' ? undefined$1 : Uint8Array,
  '%Uint8ClampedArray%': typeof Uint8ClampedArray === 'undefined' ? undefined$1 : Uint8ClampedArray,
  '%Uint16Array%': typeof Uint16Array === 'undefined' ? undefined$1 : Uint16Array,
  '%Uint32Array%': typeof Uint32Array === 'undefined' ? undefined$1 : Uint32Array,
  '%URIError%': URIError,
  '%WeakMap%': typeof WeakMap === 'undefined' ? undefined$1 : WeakMap,
  '%WeakRef%': typeof WeakRef === 'undefined' ? undefined$1 : WeakRef,
  '%WeakSet%': typeof WeakSet === 'undefined' ? undefined$1 : WeakSet
};
try {
  null.error; // eslint-disable-line no-unused-expressions
} catch (e) {
  // https://github.com/tc39/proposal-shadowrealm/pull/384#issuecomment-1364264229
  var errorProto = getProto$1(getProto$1(e));
  INTRINSICS['%Error.prototype%'] = errorProto;
}
var doEval = function doEval(name) {
  var value;
  if (name === '%AsyncFunction%') {
    value = getEvalledConstructor('async function () {}');
  } else if (name === '%GeneratorFunction%') {
    value = getEvalledConstructor('function* () {}');
  } else if (name === '%AsyncGeneratorFunction%') {
    value = getEvalledConstructor('async function* () {}');
  } else if (name === '%AsyncGenerator%') {
    var fn = doEval('%AsyncGeneratorFunction%');
    if (fn) {
      value = fn.prototype;
    }
  } else if (name === '%AsyncIteratorPrototype%') {
    var gen = doEval('%AsyncGenerator%');
    if (gen) {
      value = getProto$1(gen.prototype);
    }
  }
  INTRINSICS[name] = value;
  return value;
};
var LEGACY_ALIASES = {
  '%ArrayBufferPrototype%': ['ArrayBuffer', 'prototype'],
  '%ArrayPrototype%': ['Array', 'prototype'],
  '%ArrayProto_entries%': ['Array', 'prototype', 'entries'],
  '%ArrayProto_forEach%': ['Array', 'prototype', 'forEach'],
  '%ArrayProto_keys%': ['Array', 'prototype', 'keys'],
  '%ArrayProto_values%': ['Array', 'prototype', 'values'],
  '%AsyncFunctionPrototype%': ['AsyncFunction', 'prototype'],
  '%AsyncGenerator%': ['AsyncGeneratorFunction', 'prototype'],
  '%AsyncGeneratorPrototype%': ['AsyncGeneratorFunction', 'prototype', 'prototype'],
  '%BooleanPrototype%': ['Boolean', 'prototype'],
  '%DataViewPrototype%': ['DataView', 'prototype'],
  '%DatePrototype%': ['Date', 'prototype'],
  '%ErrorPrototype%': ['Error', 'prototype'],
  '%EvalErrorPrototype%': ['EvalError', 'prototype'],
  '%Float32ArrayPrototype%': ['Float32Array', 'prototype'],
  '%Float64ArrayPrototype%': ['Float64Array', 'prototype'],
  '%FunctionPrototype%': ['Function', 'prototype'],
  '%Generator%': ['GeneratorFunction', 'prototype'],
  '%GeneratorPrototype%': ['GeneratorFunction', 'prototype', 'prototype'],
  '%Int8ArrayPrototype%': ['Int8Array', 'prototype'],
  '%Int16ArrayPrototype%': ['Int16Array', 'prototype'],
  '%Int32ArrayPrototype%': ['Int32Array', 'prototype'],
  '%JSONParse%': ['JSON', 'parse'],
  '%JSONStringify%': ['JSON', 'stringify'],
  '%MapPrototype%': ['Map', 'prototype'],
  '%NumberPrototype%': ['Number', 'prototype'],
  '%ObjectPrototype%': ['Object', 'prototype'],
  '%ObjProto_toString%': ['Object', 'prototype', 'toString'],
  '%ObjProto_valueOf%': ['Object', 'prototype', 'valueOf'],
  '%PromisePrototype%': ['Promise', 'prototype'],
  '%PromiseProto_then%': ['Promise', 'prototype', 'then'],
  '%Promise_all%': ['Promise', 'all'],
  '%Promise_reject%': ['Promise', 'reject'],
  '%Promise_resolve%': ['Promise', 'resolve'],
  '%RangeErrorPrototype%': ['RangeError', 'prototype'],
  '%ReferenceErrorPrototype%': ['ReferenceError', 'prototype'],
  '%RegExpPrototype%': ['RegExp', 'prototype'],
  '%SetPrototype%': ['Set', 'prototype'],
  '%SharedArrayBufferPrototype%': ['SharedArrayBuffer', 'prototype'],
  '%StringPrototype%': ['String', 'prototype'],
  '%SymbolPrototype%': ['Symbol', 'prototype'],
  '%SyntaxErrorPrototype%': ['SyntaxError', 'prototype'],
  '%TypedArrayPrototype%': ['TypedArray', 'prototype'],
  '%TypeErrorPrototype%': ['TypeError', 'prototype'],
  '%Uint8ArrayPrototype%': ['Uint8Array', 'prototype'],
  '%Uint8ClampedArrayPrototype%': ['Uint8ClampedArray', 'prototype'],
  '%Uint16ArrayPrototype%': ['Uint16Array', 'prototype'],
  '%Uint32ArrayPrototype%': ['Uint32Array', 'prototype'],
  '%URIErrorPrototype%': ['URIError', 'prototype'],
  '%WeakMapPrototype%': ['WeakMap', 'prototype'],
  '%WeakSetPrototype%': ['WeakSet', 'prototype']
};
var bind = functionBind;
var hasOwn = src;
var $concat = bind.call(Function.call, Array.prototype.concat);
var $spliceApply = bind.call(Function.apply, Array.prototype.splice);
var $replace = bind.call(Function.call, String.prototype.replace);
var $strSlice = bind.call(Function.call, String.prototype.slice);
var $exec$1 = bind.call(Function.call, RegExp.prototype.exec);

/* adapted from https://github.com/lodash/lodash/blob/4.17.15/dist/lodash.js#L6735-L6744 */
var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
var reEscapeChar = /\\(\\)?/g; /** Used to match backslashes in property paths. */
var stringToPath = function stringToPath(string) {
  var first = $strSlice(string, 0, 1);
  var last = $strSlice(string, -1);
  if (first === '%' && last !== '%') {
    throw new $SyntaxError('invalid intrinsic syntax, expected closing `%`');
  } else if (last === '%' && first !== '%') {
    throw new $SyntaxError('invalid intrinsic syntax, expected opening `%`');
  }
  var result = [];
  $replace(string, rePropName, function (match, number, quote, subString) {
    result[result.length] = quote ? $replace(subString, reEscapeChar, '$1') : number || match;
  });
  return result;
};
/* end adaptation */

var getBaseIntrinsic = function getBaseIntrinsic(name, allowMissing) {
  var intrinsicName = name;
  var alias;
  if (hasOwn(LEGACY_ALIASES, intrinsicName)) {
    alias = LEGACY_ALIASES[intrinsicName];
    intrinsicName = '%' + alias[0] + '%';
  }
  if (hasOwn(INTRINSICS, intrinsicName)) {
    var value = INTRINSICS[intrinsicName];
    if (value === needsEval) {
      value = doEval(intrinsicName);
    }
    if (typeof value === 'undefined' && !allowMissing) {
      throw new $TypeError('intrinsic ' + name + ' exists, but is not available. Please file an issue!');
    }
    return {
      alias: alias,
      name: intrinsicName,
      value: value
    };
  }
  throw new $SyntaxError('intrinsic ' + name + ' does not exist!');
};
var getIntrinsic = function GetIntrinsic(name, allowMissing) {
  if (typeof name !== 'string' || name.length === 0) {
    throw new $TypeError('intrinsic name must be a non-empty string');
  }
  if (arguments.length > 1 && typeof allowMissing !== 'boolean') {
    throw new $TypeError('"allowMissing" argument must be a boolean');
  }
  if ($exec$1(/^%?[^%]*%?$/, name) === null) {
    throw new $SyntaxError('`%` may not be present anywhere but at the beginning and end of the intrinsic name');
  }
  var parts = stringToPath(name);
  var intrinsicBaseName = parts.length > 0 ? parts[0] : '';
  var intrinsic = getBaseIntrinsic('%' + intrinsicBaseName + '%', allowMissing);
  var intrinsicRealName = intrinsic.name;
  var value = intrinsic.value;
  var skipFurtherCaching = false;
  var alias = intrinsic.alias;
  if (alias) {
    intrinsicBaseName = alias[0];
    $spliceApply(parts, $concat([0, 1], alias));
  }
  for (var i = 1, isOwn = true; i < parts.length; i += 1) {
    var part = parts[i];
    var first = $strSlice(part, 0, 1);
    var last = $strSlice(part, -1);
    if ((first === '"' || first === "'" || first === '`' || last === '"' || last === "'" || last === '`') && first !== last) {
      throw new $SyntaxError('property names with quotes must have matching quotes');
    }
    if (part === 'constructor' || !isOwn) {
      skipFurtherCaching = true;
    }
    intrinsicBaseName += '.' + part;
    intrinsicRealName = '%' + intrinsicBaseName + '%';
    if (hasOwn(INTRINSICS, intrinsicRealName)) {
      value = INTRINSICS[intrinsicRealName];
    } else if (value != null) {
      if (!(part in value)) {
        if (!allowMissing) {
          throw new $TypeError('base intrinsic for ' + name + ' exists, but the property is not available.');
        }
        return void undefined$1;
      }
      if ($gOPD$1 && i + 1 >= parts.length) {
        var desc = $gOPD$1(value, part);
        isOwn = !!desc;

        // By convention, when a data property is converted to an accessor
        // property to emulate a data property that does not suffer from
        // the override mistake, that accessor's getter is marked with
        // an `originalValue` property. Here, when we detect this, we
        // uphold the illusion by pretending to see that original data
        // property, i.e., returning the value rather than the getter
        // itself.
        if (isOwn && 'get' in desc && !('originalValue' in desc.get)) {
          value = desc.get;
        } else {
          value = value[part];
        }
      } else {
        isOwn = hasOwn(value, part);
        value = value[part];
      }
      if (isOwn && !skipFurtherCaching) {
        INTRINSICS[intrinsicRealName] = value;
      }
    }
  }
  return value;
};var callBindExports = {};
var callBind$3 = {
  get exports(){ return callBindExports; },
  set exports(v){ callBindExports = v; },
};(function (module) {

	var bind = functionBind;
	var GetIntrinsic = getIntrinsic;
	var $apply = GetIntrinsic('%Function.prototype.apply%');
	var $call = GetIntrinsic('%Function.prototype.call%');
	var $reflectApply = GetIntrinsic('%Reflect.apply%', true) || bind.call($call, $apply);
	var $gOPD = GetIntrinsic('%Object.getOwnPropertyDescriptor%', true);
	var $defineProperty = GetIntrinsic('%Object.defineProperty%', true);
	var $max = GetIntrinsic('%Math.max%');
	if ($defineProperty) {
	  try {
	    $defineProperty({}, 'a', {
	      value: 1
	    });
	  } catch (e) {
	    // IE 8 has a broken defineProperty
	    $defineProperty = null;
	  }
	}
	module.exports = function callBind(originalFunction) {
	  var func = $reflectApply(bind, $call, arguments);
	  if ($gOPD && $defineProperty) {
	    var desc = $gOPD(func, 'length');
	    if (desc.configurable) {
	      // original length, plus the receiver, minus any additional arguments (after the receiver)
	      $defineProperty(func, 'length', {
	        value: 1 + $max(0, originalFunction.length - (arguments.length - 1))
	      });
	    }
	  }
	  return func;
	};
	var applyBind = function applyBind() {
	  return $reflectApply(bind, $apply, arguments);
	};
	if ($defineProperty) {
	  $defineProperty(module.exports, 'apply', {
	    value: applyBind
	  });
	} else {
	  module.exports.apply = applyBind;
	}
} (callBind$3));var GetIntrinsic$1 = getIntrinsic;
var callBind$2 = callBindExports;
var $indexOf = callBind$2(GetIntrinsic$1('String.prototype.indexOf'));
var callBound$2 = function callBoundIntrinsic(name, allowMissing) {
  var intrinsic = GetIntrinsic$1(name, !!allowMissing);
  if (typeof intrinsic === 'function' && $indexOf(name, '.prototype.') > -1) {
    return callBind$2(intrinsic);
  }
  return intrinsic;
};var hasToStringTag$2 = shams();
var callBound$1 = callBound$2;
var $toString$1 = callBound$1('Object.prototype.toString');
var isStandardArguments = function isArguments(value) {
  if (hasToStringTag$2 && value && typeof value === 'object' && Symbol.toStringTag in value) {
    return false;
  }
  return $toString$1(value) === '[object Arguments]';
};
var isLegacyArguments = function isArguments(value) {
  if (isStandardArguments(value)) {
    return true;
  }
  return value !== null && typeof value === 'object' && typeof value.length === 'number' && value.length >= 0 && $toString$1(value) !== '[object Array]' && $toString$1(value.callee) === '[object Function]';
};
var supportsStandardArguments = function () {
  return isStandardArguments(arguments);
}();
isStandardArguments.isLegacyArguments = isLegacyArguments; // for tests

var isArguments$1 = supportsStandardArguments ? isStandardArguments : isLegacyArguments;var GetIntrinsic = getIntrinsic;
var $defineProperty = GetIntrinsic('%Object.defineProperty%', true);
var hasPropertyDescriptors$1 = function hasPropertyDescriptors() {
  if ($defineProperty) {
    try {
      $defineProperty({}, 'a', {
        value: 1
      });
      return true;
    } catch (e) {
      // IE 8 has a broken defineProperty
      return false;
    }
  }
  return false;
};
hasPropertyDescriptors$1.hasArrayLengthDefineBug = function hasArrayLengthDefineBug() {
  // node v0.6 has a bug where array lengths can be Set but not Defined
  if (!hasPropertyDescriptors$1()) {
    return null;
  }
  try {
    return $defineProperty([], 'length', {
      value: 1
    }).length !== 1;
  } catch (e) {
    // In Firefox 4-22, defining length on an array throws an exception.
    return true;
  }
};
var hasPropertyDescriptors_1 = hasPropertyDescriptors$1;var keys = objectKeys$1;
var hasSymbols = typeof Symbol === 'function' && typeof Symbol('foo') === 'symbol';
var toStr$1 = Object.prototype.toString;
var concat = Array.prototype.concat;
var origDefineProperty = Object.defineProperty;
var isFunction$1 = function (fn) {
  return typeof fn === 'function' && toStr$1.call(fn) === '[object Function]';
};
var hasPropertyDescriptors = hasPropertyDescriptors_1();
var supportsDescriptors$2 = origDefineProperty && hasPropertyDescriptors;
var defineProperty$2 = function (object, name, value, predicate) {
  if (name in object) {
    if (predicate === true) {
      if (object[name] === value) {
        return;
      }
    } else if (!isFunction$1(predicate) || !predicate()) {
      return;
    }
  }
  if (supportsDescriptors$2) {
    origDefineProperty(object, name, {
      configurable: true,
      enumerable: false,
      value: value,
      writable: true
    });
  } else {
    object[name] = value; // eslint-disable-line no-param-reassign
  }
};

var defineProperties = function (object, map) {
  var predicates = arguments.length > 2 ? arguments[2] : {};
  var props = keys(map);
  if (hasSymbols) {
    props = concat.call(props, Object.getOwnPropertySymbols(map));
  }
  for (var i = 0; i < props.length; i += 1) {
    defineProperty$2(object, props[i], map[props[i]], predicates[props[i]]);
  }
};
defineProperties.supportsDescriptors = !!supportsDescriptors$2;
var defineProperties_1 = defineProperties;var numberIsNaN = function (value) {
  return value !== value;
};
var implementation$6 = function is(a, b) {
  if (a === 0 && b === 0) {
    return 1 / a === 1 / b;
  }
  if (a === b) {
    return true;
  }
  if (numberIsNaN(a) && numberIsNaN(b)) {
    return true;
  }
  return false;
};var implementation$5 = implementation$6;
var polyfill$2 = function getPolyfill() {
  return typeof Object.is === 'function' ? Object.is : implementation$5;
};var getPolyfill$3 = polyfill$2;
var define$2 = defineProperties_1;
var shim$3 = function shimObjectIs() {
  var polyfill = getPolyfill$3();
  define$2(Object, {
    is: polyfill
  }, {
    is: function testObjectIs() {
      return Object.is !== polyfill;
    }
  });
  return polyfill;
};var define$1 = defineProperties_1;
var callBind$1 = callBindExports;
var implementation$4 = implementation$6;
var getPolyfill$2 = polyfill$2;
var shim$2 = shim$3;
var polyfill$1 = callBind$1(getPolyfill$2(), Object);
define$1(polyfill$1, {
  getPolyfill: getPolyfill$2,
  implementation: implementation$4,
  shim: shim$2
});
var objectIs = polyfill$1;var callBound = callBound$2;
var hasToStringTag$1 = shams();
var has;
var $exec;
var isRegexMarker;
var badStringifier;
if (hasToStringTag$1) {
  has = callBound('Object.prototype.hasOwnProperty');
  $exec = callBound('RegExp.prototype.exec');
  isRegexMarker = {};
  var throwRegexMarker = function () {
    throw isRegexMarker;
  };
  badStringifier = {
    toString: throwRegexMarker,
    valueOf: throwRegexMarker
  };
  if (typeof Symbol.toPrimitive === 'symbol') {
    badStringifier[Symbol.toPrimitive] = throwRegexMarker;
  }
}
var $toString = callBound('Object.prototype.toString');
var gOPD$2 = Object.getOwnPropertyDescriptor;
var regexClass = '[object RegExp]';
var isRegex$1 = hasToStringTag$1
// eslint-disable-next-line consistent-return
? function isRegex(value) {
  if (!value || typeof value !== 'object') {
    return false;
  }
  var descriptor = gOPD$2(value, 'lastIndex');
  var hasLastIndexDataProperty = descriptor && has(descriptor, 'value');
  if (!hasLastIndexDataProperty) {
    return false;
  }
  try {
    $exec(value, badStringifier);
  } catch (e) {
    return e === isRegexMarker;
  }
} : function isRegex(value) {
  // In older browsers, typeof regex incorrectly returns 'function'
  if (!value || typeof value !== 'object' && typeof value !== 'function') {
    return false;
  }
  return $toString(value) === regexClass;
};var implementationExports$1 = {};
var implementation$3 = {
  get exports(){ return implementationExports$1; },
  set exports(v){ implementationExports$1 = v; },
};var functionsHaveNames = function functionsHaveNames() {
  return typeof function f() {}.name === 'string';
};
var gOPD$1 = Object.getOwnPropertyDescriptor;
if (gOPD$1) {
  try {
    gOPD$1([], 'length');
  } catch (e) {
    // IE 8 has a broken gOPD
    gOPD$1 = null;
  }
}
functionsHaveNames.functionsHaveConfigurableNames = function functionsHaveConfigurableNames() {
  if (!functionsHaveNames() || !gOPD$1) {
    return false;
  }
  var desc = gOPD$1(function () {}, 'name');
  return !!desc && !!desc.configurable;
};
var $bind = Function.prototype.bind;
functionsHaveNames.boundFunctionsHaveNames = function boundFunctionsHaveNames() {
  return functionsHaveNames() && typeof $bind === 'function' && function f() {}.bind().name !== '';
};
var functionsHaveNames_1 = functionsHaveNames;(function (module) {

	var functionsHaveConfigurableNames = functionsHaveNames_1.functionsHaveConfigurableNames();
	var $Object = Object;
	var $TypeError = TypeError;
	module.exports = function flags() {
	  if (this != null && this !== $Object(this)) {
	    throw new $TypeError('RegExp.prototype.flags getter called on non-object');
	  }
	  var result = '';
	  if (this.hasIndices) {
	    result += 'd';
	  }
	  if (this.global) {
	    result += 'g';
	  }
	  if (this.ignoreCase) {
	    result += 'i';
	  }
	  if (this.multiline) {
	    result += 'm';
	  }
	  if (this.dotAll) {
	    result += 's';
	  }
	  if (this.unicode) {
	    result += 'u';
	  }
	  if (this.sticky) {
	    result += 'y';
	  }
	  return result;
	};
	if (functionsHaveConfigurableNames && Object.defineProperty) {
	  Object.defineProperty(module.exports, 'name', {
	    value: 'get flags'
	  });
	}
} (implementation$3));var implementation$2 = implementationExports$1;
var supportsDescriptors$1 = defineProperties_1.supportsDescriptors;
var $gOPD = Object.getOwnPropertyDescriptor;
var polyfill = function getPolyfill() {
  if (supportsDescriptors$1 && /a/mig.flags === 'gim') {
    var descriptor = $gOPD(RegExp.prototype, 'flags');
    if (descriptor && typeof descriptor.get === 'function' && typeof RegExp.prototype.dotAll === 'boolean' && typeof RegExp.prototype.hasIndices === 'boolean') {
      /* eslint getter-return: 0 */
      var calls = '';
      var o = {};
      Object.defineProperty(o, 'hasIndices', {
        get: function () {
          calls += 'd';
        }
      });
      Object.defineProperty(o, 'sticky', {
        get: function () {
          calls += 'y';
        }
      });
      if (calls === 'dy') {
        return descriptor.get;
      }
    }
  }
  return implementation$2;
};var supportsDescriptors = defineProperties_1.supportsDescriptors;
var getPolyfill$1 = polyfill;
var gOPD = Object.getOwnPropertyDescriptor;
var defineProperty$1 = Object.defineProperty;
var TypeErr = TypeError;
var getProto = Object.getPrototypeOf;
var regex = /a/;
var shim$1 = function shimFlags() {
  if (!supportsDescriptors || !getProto) {
    throw new TypeErr('RegExp.prototype.flags requires a true ES5 environment that supports property descriptors');
  }
  var polyfill = getPolyfill$1();
  var proto = getProto(regex);
  var descriptor = gOPD(proto, 'flags');
  if (!descriptor || descriptor.get !== polyfill) {
    defineProperty$1(proto, 'flags', {
      configurable: true,
      enumerable: false,
      get: polyfill
    });
  }
  return polyfill;
};var define = defineProperties_1;
var callBind = callBindExports;
var implementation$1 = implementationExports$1;
var getPolyfill = polyfill;
var shim = shim$1;
var flagsBound = callBind(getPolyfill());
define(flagsBound, {
  getPolyfill: getPolyfill,
  implementation: implementation$1,
  shim: shim
});
var regexp_prototype_flags = flagsBound;var getDay = Date.prototype.getDay;
var tryDateObject = function tryDateGetDayCall(value) {
  try {
    getDay.call(value);
    return true;
  } catch (e) {
    return false;
  }
};
var toStr = Object.prototype.toString;
var dateClass = '[object Date]';
var hasToStringTag = shams();
var isDateObject = function isDateObject(value) {
  if (typeof value !== 'object' || value === null) {
    return false;
  }
  return hasToStringTag ? tryDateObject(value) : toStr.call(value) === dateClass;
};var objectKeys = objectKeys$1;
var isArguments = isArguments$1;
var is = objectIs;
var isRegex = isRegex$1;
var flags = regexp_prototype_flags;
var isDate = isDateObject;
var getTime = Date.prototype.getTime;
function deepEqual(actual, expected, options) {
  var opts = options || {};

  // 7.1. All identical values are equivalent, as determined by ===.
  if (opts.strict ? is(actual, expected) : actual === expected) {
    return true;
  }

  // 7.3. Other pairs that do not both pass typeof value == 'object', equivalence is determined by ==.
  if (!actual || !expected || typeof actual !== 'object' && typeof expected !== 'object') {
    return opts.strict ? is(actual, expected) : actual == expected;
  }

  /*
   * 7.4. For all other Object pairs, including Array objects, equivalence is
   * determined by having the same number of owned properties (as verified
   * with Object.prototype.hasOwnProperty.call), the same set of keys
   * (although not necessarily the same order), equivalent values for every
   * corresponding key, and an identical 'prototype' property. Note: this
   * accounts for both named and indexed properties on Arrays.
   */
  // eslint-disable-next-line no-use-before-define
  return objEquiv(actual, expected, opts);
}
function isUndefinedOrNull(value) {
  return value === null || value === undefined;
}
function isBuffer(x) {
  if (!x || typeof x !== 'object' || typeof x.length !== 'number') {
    return false;
  }
  if (typeof x.copy !== 'function' || typeof x.slice !== 'function') {
    return false;
  }
  if (x.length > 0 && typeof x[0] !== 'number') {
    return false;
  }
  return true;
}
function objEquiv(a, b, opts) {
  /* eslint max-statements: [2, 50] */
  var i, key;
  if (typeof a !== typeof b) {
    return false;
  }
  if (isUndefinedOrNull(a) || isUndefinedOrNull(b)) {
    return false;
  }

  // an identical 'prototype' property.
  if (a.prototype !== b.prototype) {
    return false;
  }
  if (isArguments(a) !== isArguments(b)) {
    return false;
  }
  var aIsRegex = isRegex(a);
  var bIsRegex = isRegex(b);
  if (aIsRegex !== bIsRegex) {
    return false;
  }
  if (aIsRegex || bIsRegex) {
    return a.source === b.source && flags(a) === flags(b);
  }
  if (isDate(a) && isDate(b)) {
    return getTime.call(a) === getTime.call(b);
  }
  var aIsBuffer = isBuffer(a);
  var bIsBuffer = isBuffer(b);
  if (aIsBuffer !== bIsBuffer) {
    return false;
  }
  if (aIsBuffer || bIsBuffer) {
    // && would work too, because both are true or both false here
    if (a.length !== b.length) {
      return false;
    }
    for (i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) {
        return false;
      }
    }
    return true;
  }
  if (typeof a !== typeof b) {
    return false;
  }
  try {
    var ka = objectKeys(a);
    var kb = objectKeys(b);
  } catch (e) {
    // happens when one is a string literal and the other isn't
    return false;
  }
  // having the same number of owned properties (keys incorporates hasOwnProperty)
  if (ka.length !== kb.length) {
    return false;
  }

  // the same set of keys (although not necessarily the same order),
  ka.sort();
  kb.sort();
  // ~~~cheap key test
  for (i = ka.length - 1; i >= 0; i--) {
    if (ka[i] != kb[i]) {
      return false;
    }
  }
  // equivalent values for every corresponding key, and ~~~possibly expensive deep test
  for (i = ka.length - 1; i >= 0; i--) {
    key = ka[i];
    if (!deepEqual(a[key], b[key], opts)) {
      return false;
    }
  }
  return true;
}
var deepEqual_1 = deepEqual;/**!
 * @fileOverview Kickass library to create and place poppers near their reference elements.
 * @version 1.16.1
 * @license
 * Copyright (c) 2016 Federico Zivolo and contributors
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
var isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined' && typeof navigator !== 'undefined';
var timeoutDuration = function () {
  var longerTimeoutBrowsers = ['Edge', 'Trident', 'Firefox'];
  for (var i = 0; i < longerTimeoutBrowsers.length; i += 1) {
    if (isBrowser && navigator.userAgent.indexOf(longerTimeoutBrowsers[i]) >= 0) {
      return 1;
    }
  }
  return 0;
}();
function microtaskDebounce(fn) {
  var called = false;
  return function () {
    if (called) {
      return;
    }
    called = true;
    window.Promise.resolve().then(function () {
      called = false;
      fn();
    });
  };
}
function taskDebounce(fn) {
  var scheduled = false;
  return function () {
    if (!scheduled) {
      scheduled = true;
      setTimeout(function () {
        scheduled = false;
        fn();
      }, timeoutDuration);
    }
  };
}
var supportsMicroTasks = isBrowser && window.Promise;

/**
* Create a debounced version of a method, that's asynchronously deferred
* but called in the minimum time possible.
*
* @method
* @memberof Popper.Utils
* @argument {Function} fn
* @returns {Function}
*/
var debounce$1 = supportsMicroTasks ? microtaskDebounce : taskDebounce;

/**
 * Check if the given variable is a function
 * @method
 * @memberof Popper.Utils
 * @argument {Any} functionToCheck - variable to check
 * @returns {Boolean} answer to: is a function?
 */
function isFunction(functionToCheck) {
  var getType = {};
  return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}

/**
 * Get CSS computed property of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Eement} element
 * @argument {String} property
 */
function getStyleComputedProperty(element, property) {
  if (element.nodeType !== 1) {
    return [];
  }
  // NOTE: 1 DOM access here
  var window = element.ownerDocument.defaultView;
  var css = window.getComputedStyle(element, null);
  return property ? css[property] : css;
}

/**
 * Returns the parentNode or the host of the element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} parent
 */
function getParentNode(element) {
  if (element.nodeName === 'HTML') {
    return element;
  }
  return element.parentNode || element.host;
}

/**
 * Returns the scrolling parent of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} scroll parent
 */
function getScrollParent(element) {
  // Return body, `getScroll` will take care to get the correct `scrollTop` from it
  if (!element) {
    return document.body;
  }
  switch (element.nodeName) {
    case 'HTML':
    case 'BODY':
      return element.ownerDocument.body;
    case '#document':
      return element.body;
  }

  // Firefox want us to check `-x` and `-y` variations as well

  var _getStyleComputedProp = getStyleComputedProperty(element),
    overflow = _getStyleComputedProp.overflow,
    overflowX = _getStyleComputedProp.overflowX,
    overflowY = _getStyleComputedProp.overflowY;
  if (/(auto|scroll|overlay)/.test(overflow + overflowY + overflowX)) {
    return element;
  }
  return getScrollParent(getParentNode(element));
}

/**
 * Returns the reference node of the reference object, or the reference object itself.
 * @method
 * @memberof Popper.Utils
 * @param {Element|Object} reference - the reference element (the popper will be relative to this)
 * @returns {Element} parent
 */
function getReferenceNode(reference) {
  return reference && reference.referenceNode ? reference.referenceNode : reference;
}
var isIE11 = isBrowser && !!(window.MSInputMethodContext && document.documentMode);
var isIE10 = isBrowser && /MSIE 10/.test(navigator.userAgent);

/**
 * Determines if the browser is Internet Explorer
 * @method
 * @memberof Popper.Utils
 * @param {Number} version to check
 * @returns {Boolean} isIE
 */
function isIE(version) {
  if (version === 11) {
    return isIE11;
  }
  if (version === 10) {
    return isIE10;
  }
  return isIE11 || isIE10;
}

/**
 * Returns the offset parent of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} offset parent
 */
function getOffsetParent(element) {
  if (!element) {
    return document.documentElement;
  }
  var noOffsetParent = isIE(10) ? document.body : null;

  // NOTE: 1 DOM access here
  var offsetParent = element.offsetParent || null;
  // Skip hidden elements which don't have an offsetParent
  while (offsetParent === noOffsetParent && element.nextElementSibling) {
    offsetParent = (element = element.nextElementSibling).offsetParent;
  }
  var nodeName = offsetParent && offsetParent.nodeName;
  if (!nodeName || nodeName === 'BODY' || nodeName === 'HTML') {
    return element ? element.ownerDocument.documentElement : document.documentElement;
  }

  // .offsetParent will return the closest TH, TD or TABLE in case
  // no offsetParent is present, I hate this job...
  if (['TH', 'TD', 'TABLE'].indexOf(offsetParent.nodeName) !== -1 && getStyleComputedProperty(offsetParent, 'position') === 'static') {
    return getOffsetParent(offsetParent);
  }
  return offsetParent;
}
function isOffsetContainer(element) {
  var nodeName = element.nodeName;
  if (nodeName === 'BODY') {
    return false;
  }
  return nodeName === 'HTML' || getOffsetParent(element.firstElementChild) === element;
}

/**
 * Finds the root node (document, shadowDOM root) of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} node
 * @returns {Element} root node
 */
function getRoot(node) {
  if (node.parentNode !== null) {
    return getRoot(node.parentNode);
  }
  return node;
}

/**
 * Finds the offset parent common to the two provided nodes
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element1
 * @argument {Element} element2
 * @returns {Element} common offset parent
 */
function findCommonOffsetParent(element1, element2) {
  // This check is needed to avoid errors in case one of the elements isn't defined for any reason
  if (!element1 || !element1.nodeType || !element2 || !element2.nodeType) {
    return document.documentElement;
  }

  // Here we make sure to give as "start" the element that comes first in the DOM
  var order = element1.compareDocumentPosition(element2) & Node.DOCUMENT_POSITION_FOLLOWING;
  var start = order ? element1 : element2;
  var end = order ? element2 : element1;

  // Get common ancestor container
  var range = document.createRange();
  range.setStart(start, 0);
  range.setEnd(end, 0);
  var commonAncestorContainer = range.commonAncestorContainer;

  // Both nodes are inside #document

  if (element1 !== commonAncestorContainer && element2 !== commonAncestorContainer || start.contains(end)) {
    if (isOffsetContainer(commonAncestorContainer)) {
      return commonAncestorContainer;
    }
    return getOffsetParent(commonAncestorContainer);
  }

  // one of the nodes is inside shadowDOM, find which one
  var element1root = getRoot(element1);
  if (element1root.host) {
    return findCommonOffsetParent(element1root.host, element2);
  } else {
    return findCommonOffsetParent(element1, getRoot(element2).host);
  }
}

/**
 * Gets the scroll value of the given element in the given side (top and left)
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @argument {String} side `top` or `left`
 * @returns {number} amount of scrolled pixels
 */
function getScroll(element) {
  var side = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'top';
  var upperSide = side === 'top' ? 'scrollTop' : 'scrollLeft';
  var nodeName = element.nodeName;
  if (nodeName === 'BODY' || nodeName === 'HTML') {
    var html = element.ownerDocument.documentElement;
    var scrollingElement = element.ownerDocument.scrollingElement || html;
    return scrollingElement[upperSide];
  }
  return element[upperSide];
}

/*
 * Sum or subtract the element scroll values (left and top) from a given rect object
 * @method
 * @memberof Popper.Utils
 * @param {Object} rect - Rect object you want to change
 * @param {HTMLElement} element - The element from the function reads the scroll values
 * @param {Boolean} subtract - set to true if you want to subtract the scroll values
 * @return {Object} rect - The modifier rect object
 */
function includeScroll(rect, element) {
  var subtract = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var scrollTop = getScroll(element, 'top');
  var scrollLeft = getScroll(element, 'left');
  var modifier = subtract ? -1 : 1;
  rect.top += scrollTop * modifier;
  rect.bottom += scrollTop * modifier;
  rect.left += scrollLeft * modifier;
  rect.right += scrollLeft * modifier;
  return rect;
}

/*
 * Helper to detect borders of a given element
 * @method
 * @memberof Popper.Utils
 * @param {CSSStyleDeclaration} styles
 * Result of `getStyleComputedProperty` on the given element
 * @param {String} axis - `x` or `y`
 * @return {number} borders - The borders size of the given axis
 */

function getBordersSize(styles, axis) {
  var sideA = axis === 'x' ? 'Left' : 'Top';
  var sideB = sideA === 'Left' ? 'Right' : 'Bottom';
  return parseFloat(styles['border' + sideA + 'Width']) + parseFloat(styles['border' + sideB + 'Width']);
}
function getSize(axis, body, html, computedStyle) {
  return Math.max(body['offset' + axis], body['scroll' + axis], html['client' + axis], html['offset' + axis], html['scroll' + axis], isIE(10) ? parseInt(html['offset' + axis]) + parseInt(computedStyle['margin' + (axis === 'Height' ? 'Top' : 'Left')]) + parseInt(computedStyle['margin' + (axis === 'Height' ? 'Bottom' : 'Right')]) : 0);
}
function getWindowSizes(document) {
  var body = document.body;
  var html = document.documentElement;
  var computedStyle = isIE(10) && getComputedStyle(html);
  return {
    height: getSize('Height', body, html, computedStyle),
    width: getSize('Width', body, html, computedStyle)
  };
}
var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};
var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();
var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
};
var _extends$v = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};

/**
 * Given element offsets, generate an output similar to getBoundingClientRect
 * @method
 * @memberof Popper.Utils
 * @argument {Object} offsets
 * @returns {Object} ClientRect like output
 */
function getClientRect(offsets) {
  return _extends$v({}, offsets, {
    right: offsets.left + offsets.width,
    bottom: offsets.top + offsets.height
  });
}

/**
 * Get bounding client rect of given element
 * @method
 * @memberof Popper.Utils
 * @param {HTMLElement} element
 * @return {Object} client rect
 */
function getBoundingClientRect(element) {
  var rect = {};

  // IE10 10 FIX: Please, don't ask, the element isn't
  // considered in DOM in some circumstances...
  // This isn't reproducible in IE10 compatibility mode of IE11
  try {
    if (isIE(10)) {
      rect = element.getBoundingClientRect();
      var scrollTop = getScroll(element, 'top');
      var scrollLeft = getScroll(element, 'left');
      rect.top += scrollTop;
      rect.left += scrollLeft;
      rect.bottom += scrollTop;
      rect.right += scrollLeft;
    } else {
      rect = element.getBoundingClientRect();
    }
  } catch (e) {}
  var result = {
    left: rect.left,
    top: rect.top,
    width: rect.right - rect.left,
    height: rect.bottom - rect.top
  };

  // subtract scrollbar size from sizes
  var sizes = element.nodeName === 'HTML' ? getWindowSizes(element.ownerDocument) : {};
  var width = sizes.width || element.clientWidth || result.width;
  var height = sizes.height || element.clientHeight || result.height;
  var horizScrollbar = element.offsetWidth - width;
  var vertScrollbar = element.offsetHeight - height;

  // if an hypothetical scrollbar is detected, we must be sure it's not a `border`
  // we make this check conditional for performance reasons
  if (horizScrollbar || vertScrollbar) {
    var styles = getStyleComputedProperty(element);
    horizScrollbar -= getBordersSize(styles, 'x');
    vertScrollbar -= getBordersSize(styles, 'y');
    result.width -= horizScrollbar;
    result.height -= vertScrollbar;
  }
  return getClientRect(result);
}
function getOffsetRectRelativeToArbitraryNode(children, parent) {
  var fixedPosition = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var isIE10 = isIE(10);
  var isHTML = parent.nodeName === 'HTML';
  var childrenRect = getBoundingClientRect(children);
  var parentRect = getBoundingClientRect(parent);
  var scrollParent = getScrollParent(children);
  var styles = getStyleComputedProperty(parent);
  var borderTopWidth = parseFloat(styles.borderTopWidth);
  var borderLeftWidth = parseFloat(styles.borderLeftWidth);

  // In cases where the parent is fixed, we must ignore negative scroll in offset calc
  if (fixedPosition && isHTML) {
    parentRect.top = Math.max(parentRect.top, 0);
    parentRect.left = Math.max(parentRect.left, 0);
  }
  var offsets = getClientRect({
    top: childrenRect.top - parentRect.top - borderTopWidth,
    left: childrenRect.left - parentRect.left - borderLeftWidth,
    width: childrenRect.width,
    height: childrenRect.height
  });
  offsets.marginTop = 0;
  offsets.marginLeft = 0;

  // Subtract margins of documentElement in case it's being used as parent
  // we do this only on HTML because it's the only element that behaves
  // differently when margins are applied to it. The margins are included in
  // the box of the documentElement, in the other cases not.
  if (!isIE10 && isHTML) {
    var marginTop = parseFloat(styles.marginTop);
    var marginLeft = parseFloat(styles.marginLeft);
    offsets.top -= borderTopWidth - marginTop;
    offsets.bottom -= borderTopWidth - marginTop;
    offsets.left -= borderLeftWidth - marginLeft;
    offsets.right -= borderLeftWidth - marginLeft;

    // Attach marginTop and marginLeft because in some circumstances we may need them
    offsets.marginTop = marginTop;
    offsets.marginLeft = marginLeft;
  }
  if (isIE10 && !fixedPosition ? parent.contains(scrollParent) : parent === scrollParent && scrollParent.nodeName !== 'BODY') {
    offsets = includeScroll(offsets, parent);
  }
  return offsets;
}
function getViewportOffsetRectRelativeToArtbitraryNode(element) {
  var excludeScroll = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var html = element.ownerDocument.documentElement;
  var relativeOffset = getOffsetRectRelativeToArbitraryNode(element, html);
  var width = Math.max(html.clientWidth, window.innerWidth || 0);
  var height = Math.max(html.clientHeight, window.innerHeight || 0);
  var scrollTop = !excludeScroll ? getScroll(html) : 0;
  var scrollLeft = !excludeScroll ? getScroll(html, 'left') : 0;
  var offset = {
    top: scrollTop - relativeOffset.top + relativeOffset.marginTop,
    left: scrollLeft - relativeOffset.left + relativeOffset.marginLeft,
    width: width,
    height: height
  };
  return getClientRect(offset);
}

/**
 * Check if the given element is fixed or is inside a fixed parent
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @argument {Element} customContainer
 * @returns {Boolean} answer to "isFixed?"
 */
function isFixed(element) {
  var nodeName = element.nodeName;
  if (nodeName === 'BODY' || nodeName === 'HTML') {
    return false;
  }
  if (getStyleComputedProperty(element, 'position') === 'fixed') {
    return true;
  }
  var parentNode = getParentNode(element);
  if (!parentNode) {
    return false;
  }
  return isFixed(parentNode);
}

/**
 * Finds the first parent of an element that has a transformed property defined
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} first transformed parent or documentElement
 */

function getFixedPositionOffsetParent(element) {
  // This check is needed to avoid errors in case one of the elements isn't defined for any reason
  if (!element || !element.parentElement || isIE()) {
    return document.documentElement;
  }
  var el = element.parentElement;
  while (el && getStyleComputedProperty(el, 'transform') === 'none') {
    el = el.parentElement;
  }
  return el || document.documentElement;
}

/**
 * Computed the boundaries limits and return them
 * @method
 * @memberof Popper.Utils
 * @param {HTMLElement} popper
 * @param {HTMLElement} reference
 * @param {number} padding
 * @param {HTMLElement} boundariesElement - Element used to define the boundaries
 * @param {Boolean} fixedPosition - Is in fixed position mode
 * @returns {Object} Coordinates of the boundaries
 */
function getBoundaries(popper, reference, padding, boundariesElement) {
  var fixedPosition = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

  // NOTE: 1 DOM access here

  var boundaries = {
    top: 0,
    left: 0
  };
  var offsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, getReferenceNode(reference));

  // Handle viewport case
  if (boundariesElement === 'viewport') {
    boundaries = getViewportOffsetRectRelativeToArtbitraryNode(offsetParent, fixedPosition);
  } else {
    // Handle other cases based on DOM element used as boundaries
    var boundariesNode = void 0;
    if (boundariesElement === 'scrollParent') {
      boundariesNode = getScrollParent(getParentNode(reference));
      if (boundariesNode.nodeName === 'BODY') {
        boundariesNode = popper.ownerDocument.documentElement;
      }
    } else if (boundariesElement === 'window') {
      boundariesNode = popper.ownerDocument.documentElement;
    } else {
      boundariesNode = boundariesElement;
    }
    var offsets = getOffsetRectRelativeToArbitraryNode(boundariesNode, offsetParent, fixedPosition);

    // In case of HTML, we need a different computation
    if (boundariesNode.nodeName === 'HTML' && !isFixed(offsetParent)) {
      var _getWindowSizes = getWindowSizes(popper.ownerDocument),
        height = _getWindowSizes.height,
        width = _getWindowSizes.width;
      boundaries.top += offsets.top - offsets.marginTop;
      boundaries.bottom = height + offsets.top;
      boundaries.left += offsets.left - offsets.marginLeft;
      boundaries.right = width + offsets.left;
    } else {
      // for all the other DOM elements, this one is good
      boundaries = offsets;
    }
  }

  // Add paddings
  padding = padding || 0;
  var isPaddingNumber = typeof padding === 'number';
  boundaries.left += isPaddingNumber ? padding : padding.left || 0;
  boundaries.top += isPaddingNumber ? padding : padding.top || 0;
  boundaries.right -= isPaddingNumber ? padding : padding.right || 0;
  boundaries.bottom -= isPaddingNumber ? padding : padding.bottom || 0;
  return boundaries;
}
function getArea(_ref) {
  var width = _ref.width,
    height = _ref.height;
  return width * height;
}

/**
 * Utility used to transform the `auto` placement to the placement with more
 * available space.
 * @method
 * @memberof Popper.Utils
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function computeAutoPlacement(placement, refRect, popper, reference, boundariesElement) {
  var padding = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;
  if (placement.indexOf('auto') === -1) {
    return placement;
  }
  var boundaries = getBoundaries(popper, reference, padding, boundariesElement);
  var rects = {
    top: {
      width: boundaries.width,
      height: refRect.top - boundaries.top
    },
    right: {
      width: boundaries.right - refRect.right,
      height: boundaries.height
    },
    bottom: {
      width: boundaries.width,
      height: boundaries.bottom - refRect.bottom
    },
    left: {
      width: refRect.left - boundaries.left,
      height: boundaries.height
    }
  };
  var sortedAreas = Object.keys(rects).map(function (key) {
    return _extends$v({
      key: key
    }, rects[key], {
      area: getArea(rects[key])
    });
  }).sort(function (a, b) {
    return b.area - a.area;
  });
  var filteredAreas = sortedAreas.filter(function (_ref2) {
    var width = _ref2.width,
      height = _ref2.height;
    return width >= popper.clientWidth && height >= popper.clientHeight;
  });
  var computedPlacement = filteredAreas.length > 0 ? filteredAreas[0].key : sortedAreas[0].key;
  var variation = placement.split('-')[1];
  return computedPlacement + (variation ? '-' + variation : '');
}

/**
 * Get offsets to the reference element
 * @method
 * @memberof Popper.Utils
 * @param {Object} state
 * @param {Element} popper - the popper element
 * @param {Element} reference - the reference element (the popper will be relative to this)
 * @param {Element} fixedPosition - is in fixed position mode
 * @returns {Object} An object containing the offsets which will be applied to the popper
 */
function getReferenceOffsets(state, popper, reference) {
  var fixedPosition = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  var commonOffsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, getReferenceNode(reference));
  return getOffsetRectRelativeToArbitraryNode(reference, commonOffsetParent, fixedPosition);
}

/**
 * Get the outer sizes of the given element (offset size + margins)
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Object} object containing width and height properties
 */
function getOuterSizes(element) {
  var window = element.ownerDocument.defaultView;
  var styles = window.getComputedStyle(element);
  var x = parseFloat(styles.marginTop || 0) + parseFloat(styles.marginBottom || 0);
  var y = parseFloat(styles.marginLeft || 0) + parseFloat(styles.marginRight || 0);
  var result = {
    width: element.offsetWidth + y,
    height: element.offsetHeight + x
  };
  return result;
}

/**
 * Get the opposite placement of the given one
 * @method
 * @memberof Popper.Utils
 * @argument {String} placement
 * @returns {String} flipped placement
 */
function getOppositePlacement(placement) {
  var hash = {
    left: 'right',
    right: 'left',
    bottom: 'top',
    top: 'bottom'
  };
  return placement.replace(/left|right|bottom|top/g, function (matched) {
    return hash[matched];
  });
}

/**
 * Get offsets to the popper
 * @method
 * @memberof Popper.Utils
 * @param {Object} position - CSS position the Popper will get applied
 * @param {HTMLElement} popper - the popper element
 * @param {Object} referenceOffsets - the reference offsets (the popper will be relative to this)
 * @param {String} placement - one of the valid placement options
 * @returns {Object} popperOffsets - An object containing the offsets which will be applied to the popper
 */
function getPopperOffsets(popper, referenceOffsets, placement) {
  placement = placement.split('-')[0];

  // Get popper node sizes
  var popperRect = getOuterSizes(popper);

  // Add position, width and height to our offsets object
  var popperOffsets = {
    width: popperRect.width,
    height: popperRect.height
  };

  // depending by the popper placement we have to compute its offsets slightly differently
  var isHoriz = ['right', 'left'].indexOf(placement) !== -1;
  var mainSide = isHoriz ? 'top' : 'left';
  var secondarySide = isHoriz ? 'left' : 'top';
  var measurement = isHoriz ? 'height' : 'width';
  var secondaryMeasurement = !isHoriz ? 'height' : 'width';
  popperOffsets[mainSide] = referenceOffsets[mainSide] + referenceOffsets[measurement] / 2 - popperRect[measurement] / 2;
  if (placement === secondarySide) {
    popperOffsets[secondarySide] = referenceOffsets[secondarySide] - popperRect[secondaryMeasurement];
  } else {
    popperOffsets[secondarySide] = referenceOffsets[getOppositePlacement(secondarySide)];
  }
  return popperOffsets;
}

/**
 * Mimics the `find` method of Array
 * @method
 * @memberof Popper.Utils
 * @argument {Array} arr
 * @argument prop
 * @argument value
 * @returns index or -1
 */
function find(arr, check) {
  // use native find if supported
  if (Array.prototype.find) {
    return arr.find(check);
  }

  // use `filter` to obtain the same behavior of `find`
  return arr.filter(check)[0];
}

/**
 * Return the index of the matching object
 * @method
 * @memberof Popper.Utils
 * @argument {Array} arr
 * @argument prop
 * @argument value
 * @returns index or -1
 */
function findIndex(arr, prop, value) {
  // use native findIndex if supported
  if (Array.prototype.findIndex) {
    return arr.findIndex(function (cur) {
      return cur[prop] === value;
    });
  }

  // use `find` + `indexOf` if `findIndex` isn't supported
  var match = find(arr, function (obj) {
    return obj[prop] === value;
  });
  return arr.indexOf(match);
}

/**
 * Loop trough the list of modifiers and run them in order,
 * each of them will then edit the data object.
 * @method
 * @memberof Popper.Utils
 * @param {dataObject} data
 * @param {Array} modifiers
 * @param {String} ends - Optional modifier name used as stopper
 * @returns {dataObject}
 */
function runModifiers(modifiers, data, ends) {
  var modifiersToRun = ends === undefined ? modifiers : modifiers.slice(0, findIndex(modifiers, 'name', ends));
  modifiersToRun.forEach(function (modifier) {
    if (modifier['function']) {
      // eslint-disable-line dot-notation
      console.warn('`modifier.function` is deprecated, use `modifier.fn`!');
    }
    var fn = modifier['function'] || modifier.fn; // eslint-disable-line dot-notation
    if (modifier.enabled && isFunction(fn)) {
      // Add properties to offsets to make them a complete clientRect object
      // we do this before each modifier to make sure the previous one doesn't
      // mess with these values
      data.offsets.popper = getClientRect(data.offsets.popper);
      data.offsets.reference = getClientRect(data.offsets.reference);
      data = fn(data, modifier);
    }
  });
  return data;
}

/**
 * Updates the position of the popper, computing the new offsets and applying
 * the new style.<br />
 * Prefer `scheduleUpdate` over `update` because of performance reasons.
 * @method
 * @memberof Popper
 */
function update() {
  // if popper is destroyed, don't perform any further update
  if (this.state.isDestroyed) {
    return;
  }
  var data = {
    instance: this,
    styles: {},
    arrowStyles: {},
    attributes: {},
    flipped: false,
    offsets: {}
  };

  // compute reference element offsets
  data.offsets.reference = getReferenceOffsets(this.state, this.popper, this.reference, this.options.positionFixed);

  // compute auto placement, store placement inside the data object,
  // modifiers will be able to edit `placement` if needed
  // and refer to originalPlacement to know the original value
  data.placement = computeAutoPlacement(this.options.placement, data.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding);

  // store the computed placement inside `originalPlacement`
  data.originalPlacement = data.placement;
  data.positionFixed = this.options.positionFixed;

  // compute the popper offsets
  data.offsets.popper = getPopperOffsets(this.popper, data.offsets.reference, data.placement);
  data.offsets.popper.position = this.options.positionFixed ? 'fixed' : 'absolute';

  // run the modifiers
  data = runModifiers(this.modifiers, data);

  // the first `update` will call `onCreate` callback
  // the other ones will call `onUpdate` callback
  if (!this.state.isCreated) {
    this.state.isCreated = true;
    this.options.onCreate(data);
  } else {
    this.options.onUpdate(data);
  }
}

/**
 * Helper used to know if the given modifier is enabled.
 * @method
 * @memberof Popper.Utils
 * @returns {Boolean}
 */
function isModifierEnabled(modifiers, modifierName) {
  return modifiers.some(function (_ref) {
    var name = _ref.name,
      enabled = _ref.enabled;
    return enabled && name === modifierName;
  });
}

/**
 * Get the prefixed supported property name
 * @method
 * @memberof Popper.Utils
 * @argument {String} property (camelCase)
 * @returns {String} prefixed property (camelCase or PascalCase, depending on the vendor prefix)
 */
function getSupportedPropertyName(property) {
  var prefixes = [false, 'ms', 'Webkit', 'Moz', 'O'];
  var upperProp = property.charAt(0).toUpperCase() + property.slice(1);
  for (var i = 0; i < prefixes.length; i++) {
    var prefix = prefixes[i];
    var toCheck = prefix ? '' + prefix + upperProp : property;
    if (typeof document.body.style[toCheck] !== 'undefined') {
      return toCheck;
    }
  }
  return null;
}

/**
 * Destroys the popper.
 * @method
 * @memberof Popper
 */
function destroy() {
  this.state.isDestroyed = true;

  // touch DOM only if `applyStyle` modifier is enabled
  if (isModifierEnabled(this.modifiers, 'applyStyle')) {
    this.popper.removeAttribute('x-placement');
    this.popper.style.position = '';
    this.popper.style.top = '';
    this.popper.style.left = '';
    this.popper.style.right = '';
    this.popper.style.bottom = '';
    this.popper.style.willChange = '';
    this.popper.style[getSupportedPropertyName('transform')] = '';
  }
  this.disableEventListeners();

  // remove the popper if user explicitly asked for the deletion on destroy
  // do not use `remove` because IE11 doesn't support it
  if (this.options.removeOnDestroy) {
    this.popper.parentNode.removeChild(this.popper);
  }
  return this;
}

/**
 * Get the window associated with the element
 * @argument {Element} element
 * @returns {Window}
 */
function getWindow(element) {
  var ownerDocument = element.ownerDocument;
  return ownerDocument ? ownerDocument.defaultView : window;
}
function attachToScrollParents(scrollParent, event, callback, scrollParents) {
  var isBody = scrollParent.nodeName === 'BODY';
  var target = isBody ? scrollParent.ownerDocument.defaultView : scrollParent;
  target.addEventListener(event, callback, {
    passive: true
  });
  if (!isBody) {
    attachToScrollParents(getScrollParent(target.parentNode), event, callback, scrollParents);
  }
  scrollParents.push(target);
}

/**
 * Setup needed event listeners used to update the popper position
 * @method
 * @memberof Popper.Utils
 * @private
 */
function setupEventListeners(reference, options, state, updateBound) {
  // Resize event listener on window
  state.updateBound = updateBound;
  getWindow(reference).addEventListener('resize', state.updateBound, {
    passive: true
  });

  // Scroll event listener on scroll parents
  var scrollElement = getScrollParent(reference);
  attachToScrollParents(scrollElement, 'scroll', state.updateBound, state.scrollParents);
  state.scrollElement = scrollElement;
  state.eventsEnabled = true;
  return state;
}

/**
 * It will add resize/scroll events and start recalculating
 * position of the popper element when they are triggered.
 * @method
 * @memberof Popper
 */
function enableEventListeners() {
  if (!this.state.eventsEnabled) {
    this.state = setupEventListeners(this.reference, this.options, this.state, this.scheduleUpdate);
  }
}

/**
 * Remove event listeners used to update the popper position
 * @method
 * @memberof Popper.Utils
 * @private
 */
function removeEventListeners(reference, state) {
  // Remove resize event listener on window
  getWindow(reference).removeEventListener('resize', state.updateBound);

  // Remove scroll event listener on scroll parents
  state.scrollParents.forEach(function (target) {
    target.removeEventListener('scroll', state.updateBound);
  });

  // Reset state
  state.updateBound = null;
  state.scrollParents = [];
  state.scrollElement = null;
  state.eventsEnabled = false;
  return state;
}

/**
 * It will remove resize/scroll events and won't recalculate popper position
 * when they are triggered. It also won't trigger `onUpdate` callback anymore,
 * unless you call `update` method manually.
 * @method
 * @memberof Popper
 */
function disableEventListeners() {
  if (this.state.eventsEnabled) {
    cancelAnimationFrame(this.scheduleUpdate);
    this.state = removeEventListeners(this.reference, this.state);
  }
}

/**
 * Tells if a given input is a number
 * @method
 * @memberof Popper.Utils
 * @param {*} input to check
 * @return {Boolean}
 */
function isNumeric(n) {
  return n !== '' && !isNaN(parseFloat(n)) && isFinite(n);
}

/**
 * Set the style to the given popper
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element - Element to apply the style to
 * @argument {Object} styles
 * Object with a list of properties and values which will be applied to the element
 */
function setStyles(element, styles) {
  Object.keys(styles).forEach(function (prop) {
    var unit = '';
    // add unit if the value is numeric and is one of the following
    if (['width', 'height', 'top', 'right', 'bottom', 'left'].indexOf(prop) !== -1 && isNumeric(styles[prop])) {
      unit = 'px';
    }
    element.style[prop] = styles[prop] + unit;
  });
}

/**
 * Set the attributes to the given popper
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element - Element to apply the attributes to
 * @argument {Object} styles
 * Object with a list of properties and values which will be applied to the element
 */
function setAttributes(element, attributes) {
  Object.keys(attributes).forEach(function (prop) {
    var value = attributes[prop];
    if (value !== false) {
      element.setAttribute(prop, attributes[prop]);
    } else {
      element.removeAttribute(prop);
    }
  });
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} data.styles - List of style properties - values to apply to popper element
 * @argument {Object} data.attributes - List of attribute properties - values to apply to popper element
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The same data object
 */
function applyStyle(data) {
  // any property present in `data.styles` will be applied to the popper,
  // in this way we can make the 3rd party modifiers add custom styles to it
  // Be aware, modifiers could override the properties defined in the previous
  // lines of this modifier!
  setStyles(data.instance.popper, data.styles);

  // any property present in `data.attributes` will be applied to the popper,
  // they will be set as HTML attributes of the element
  setAttributes(data.instance.popper, data.attributes);

  // if arrowElement is defined and arrowStyles has some properties
  if (data.arrowElement && Object.keys(data.arrowStyles).length) {
    setStyles(data.arrowElement, data.arrowStyles);
  }
  return data;
}

/**
 * Set the x-placement attribute before everything else because it could be used
 * to add margins to the popper margins needs to be calculated to get the
 * correct popper offsets.
 * @method
 * @memberof Popper.modifiers
 * @param {HTMLElement} reference - The reference element used to position the popper
 * @param {HTMLElement} popper - The HTML element used as popper
 * @param {Object} options - Popper.js options
 */
function applyStyleOnLoad(reference, popper, options, modifierOptions, state) {
  // compute reference element offsets
  var referenceOffsets = getReferenceOffsets(state, popper, reference, options.positionFixed);

  // compute auto placement, store placement inside the data object,
  // modifiers will be able to edit `placement` if needed
  // and refer to originalPlacement to know the original value
  var placement = computeAutoPlacement(options.placement, referenceOffsets, popper, reference, options.modifiers.flip.boundariesElement, options.modifiers.flip.padding);
  popper.setAttribute('x-placement', placement);

  // Apply `position` to popper before anything else because
  // without the position applied we can't guarantee correct computations
  setStyles(popper, {
    position: options.positionFixed ? 'fixed' : 'absolute'
  });
  return options;
}

/**
 * @function
 * @memberof Popper.Utils
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Boolean} shouldRound - If the offsets should be rounded at all
 * @returns {Object} The popper's position offsets rounded
 *
 * The tale of pixel-perfect positioning. It's still not 100% perfect, but as
 * good as it can be within reason.
 * Discussion here: https://github.com/FezVrasta/popper.js/pull/715
 *
 * Low DPI screens cause a popper to be blurry if not using full pixels (Safari
 * as well on High DPI screens).
 *
 * Firefox prefers no rounding for positioning and does not have blurriness on
 * high DPI screens.
 *
 * Only horizontal placement and left/right values need to be considered.
 */
function getRoundedOffsets(data, shouldRound) {
  var _data$offsets = data.offsets,
    popper = _data$offsets.popper,
    reference = _data$offsets.reference;
  var round = Math.round,
    floor = Math.floor;
  var noRound = function noRound(v) {
    return v;
  };
  var referenceWidth = round(reference.width);
  var popperWidth = round(popper.width);
  var isVertical = ['left', 'right'].indexOf(data.placement) !== -1;
  var isVariation = data.placement.indexOf('-') !== -1;
  var sameWidthParity = referenceWidth % 2 === popperWidth % 2;
  var bothOddWidth = referenceWidth % 2 === 1 && popperWidth % 2 === 1;
  var horizontalToInteger = !shouldRound ? noRound : isVertical || isVariation || sameWidthParity ? round : floor;
  var verticalToInteger = !shouldRound ? noRound : round;
  return {
    left: horizontalToInteger(bothOddWidth && !isVariation && shouldRound ? popper.left - 1 : popper.left),
    top: verticalToInteger(popper.top),
    bottom: verticalToInteger(popper.bottom),
    right: horizontalToInteger(popper.right)
  };
}
var isFirefox = isBrowser && /Firefox/i.test(navigator.userAgent);

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function computeStyle(data, options) {
  var x = options.x,
    y = options.y;
  var popper = data.offsets.popper;

  // Remove this legacy support in Popper.js v2

  var legacyGpuAccelerationOption = find(data.instance.modifiers, function (modifier) {
    return modifier.name === 'applyStyle';
  }).gpuAcceleration;
  if (legacyGpuAccelerationOption !== undefined) {
    console.warn('WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!');
  }
  var gpuAcceleration = legacyGpuAccelerationOption !== undefined ? legacyGpuAccelerationOption : options.gpuAcceleration;
  var offsetParent = getOffsetParent(data.instance.popper);
  var offsetParentRect = getBoundingClientRect(offsetParent);

  // Styles
  var styles = {
    position: popper.position
  };
  var offsets = getRoundedOffsets(data, window.devicePixelRatio < 2 || !isFirefox);
  var sideA = x === 'bottom' ? 'top' : 'bottom';
  var sideB = y === 'right' ? 'left' : 'right';

  // if gpuAcceleration is set to `true` and transform is supported,
  //  we use `translate3d` to apply the position to the popper we
  // automatically use the supported prefixed version if needed
  var prefixedProperty = getSupportedPropertyName('transform');

  // now, let's make a step back and look at this code closely (wtf?)
  // If the content of the popper grows once it's been positioned, it
  // may happen that the popper gets misplaced because of the new content
  // overflowing its reference element
  // To avoid this problem, we provide two options (x and y), which allow
  // the consumer to define the offset origin.
  // If we position a popper on top of a reference element, we can set
  // `x` to `top` to make the popper grow towards its top instead of
  // its bottom.
  var left = void 0,
    top = void 0;
  if (sideA === 'bottom') {
    // when offsetParent is <html> the positioning is relative to the bottom of the screen (excluding the scrollbar)
    // and not the bottom of the html element
    if (offsetParent.nodeName === 'HTML') {
      top = -offsetParent.clientHeight + offsets.bottom;
    } else {
      top = -offsetParentRect.height + offsets.bottom;
    }
  } else {
    top = offsets.top;
  }
  if (sideB === 'right') {
    if (offsetParent.nodeName === 'HTML') {
      left = -offsetParent.clientWidth + offsets.right;
    } else {
      left = -offsetParentRect.width + offsets.right;
    }
  } else {
    left = offsets.left;
  }
  if (gpuAcceleration && prefixedProperty) {
    styles[prefixedProperty] = 'translate3d(' + left + 'px, ' + top + 'px, 0)';
    styles[sideA] = 0;
    styles[sideB] = 0;
    styles.willChange = 'transform';
  } else {
    // othwerise, we use the standard `top`, `left`, `bottom` and `right` properties
    var invertTop = sideA === 'bottom' ? -1 : 1;
    var invertLeft = sideB === 'right' ? -1 : 1;
    styles[sideA] = top * invertTop;
    styles[sideB] = left * invertLeft;
    styles.willChange = sideA + ', ' + sideB;
  }

  // Attributes
  var attributes = {
    'x-placement': data.placement
  };

  // Update `data` attributes, styles and arrowStyles
  data.attributes = _extends$v({}, attributes, data.attributes);
  data.styles = _extends$v({}, styles, data.styles);
  data.arrowStyles = _extends$v({}, data.offsets.arrow, data.arrowStyles);
  return data;
}

/**
 * Helper used to know if the given modifier depends from another one.<br />
 * It checks if the needed modifier is listed and enabled.
 * @method
 * @memberof Popper.Utils
 * @param {Array} modifiers - list of modifiers
 * @param {String} requestingName - name of requesting modifier
 * @param {String} requestedName - name of requested modifier
 * @returns {Boolean}
 */
function isModifierRequired(modifiers, requestingName, requestedName) {
  var requesting = find(modifiers, function (_ref) {
    var name = _ref.name;
    return name === requestingName;
  });
  var isRequired = !!requesting && modifiers.some(function (modifier) {
    return modifier.name === requestedName && modifier.enabled && modifier.order < requesting.order;
  });
  if (!isRequired) {
    var _requesting = '`' + requestingName + '`';
    var requested = '`' + requestedName + '`';
    console.warn(requested + ' modifier is required by ' + _requesting + ' modifier in order to work, be sure to include it before ' + _requesting + '!');
  }
  return isRequired;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function arrow(data, options) {
  var _data$offsets$arrow;

  // arrow depends on keepTogether in order to work
  if (!isModifierRequired(data.instance.modifiers, 'arrow', 'keepTogether')) {
    return data;
  }
  var arrowElement = options.element;

  // if arrowElement is a string, suppose it's a CSS selector
  if (typeof arrowElement === 'string') {
    arrowElement = data.instance.popper.querySelector(arrowElement);

    // if arrowElement is not found, don't run the modifier
    if (!arrowElement) {
      return data;
    }
  } else {
    // if the arrowElement isn't a query selector we must check that the
    // provided DOM node is child of its popper node
    if (!data.instance.popper.contains(arrowElement)) {
      console.warn('WARNING: `arrow.element` must be child of its popper element!');
      return data;
    }
  }
  var placement = data.placement.split('-')[0];
  var _data$offsets = data.offsets,
    popper = _data$offsets.popper,
    reference = _data$offsets.reference;
  var isVertical = ['left', 'right'].indexOf(placement) !== -1;
  var len = isVertical ? 'height' : 'width';
  var sideCapitalized = isVertical ? 'Top' : 'Left';
  var side = sideCapitalized.toLowerCase();
  var altSide = isVertical ? 'left' : 'top';
  var opSide = isVertical ? 'bottom' : 'right';
  var arrowElementSize = getOuterSizes(arrowElement)[len];

  //
  // extends keepTogether behavior making sure the popper and its
  // reference have enough pixels in conjunction
  //

  // top/left side
  if (reference[opSide] - arrowElementSize < popper[side]) {
    data.offsets.popper[side] -= popper[side] - (reference[opSide] - arrowElementSize);
  }
  // bottom/right side
  if (reference[side] + arrowElementSize > popper[opSide]) {
    data.offsets.popper[side] += reference[side] + arrowElementSize - popper[opSide];
  }
  data.offsets.popper = getClientRect(data.offsets.popper);

  // compute center of the popper
  var center = reference[side] + reference[len] / 2 - arrowElementSize / 2;

  // Compute the sideValue using the updated popper offsets
  // take popper margin in account because we don't have this info available
  var css = getStyleComputedProperty(data.instance.popper);
  var popperMarginSide = parseFloat(css['margin' + sideCapitalized]);
  var popperBorderSide = parseFloat(css['border' + sideCapitalized + 'Width']);
  var sideValue = center - data.offsets.popper[side] - popperMarginSide - popperBorderSide;

  // prevent arrowElement from being placed not contiguously to its popper
  sideValue = Math.max(Math.min(popper[len] - arrowElementSize, sideValue), 0);
  data.arrowElement = arrowElement;
  data.offsets.arrow = (_data$offsets$arrow = {}, defineProperty(_data$offsets$arrow, side, Math.round(sideValue)), defineProperty(_data$offsets$arrow, altSide, ''), _data$offsets$arrow);
  return data;
}

/**
 * Get the opposite placement variation of the given one
 * @method
 * @memberof Popper.Utils
 * @argument {String} placement variation
 * @returns {String} flipped placement variation
 */
function getOppositeVariation(variation) {
  if (variation === 'end') {
    return 'start';
  } else if (variation === 'start') {
    return 'end';
  }
  return variation;
}

/**
 * List of accepted placements to use as values of the `placement` option.<br />
 * Valid placements are:
 * - `auto`
 * - `top`
 * - `right`
 * - `bottom`
 * - `left`
 *
 * Each placement can have a variation from this list:
 * - `-start`
 * - `-end`
 *
 * Variations are interpreted easily if you think of them as the left to right
 * written languages. Horizontally (`top` and `bottom`), `start` is left and `end`
 * is right.<br />
 * Vertically (`left` and `right`), `start` is top and `end` is bottom.
 *
 * Some valid examples are:
 * - `top-end` (on top of reference, right aligned)
 * - `right-start` (on right of reference, top aligned)
 * - `bottom` (on bottom, centered)
 * - `auto-end` (on the side with more space available, alignment depends by placement)
 *
 * @static
 * @type {Array}
 * @enum {String}
 * @readonly
 * @method placements
 * @memberof Popper
 */
var placements = ['auto-start', 'auto', 'auto-end', 'top-start', 'top', 'top-end', 'right-start', 'right', 'right-end', 'bottom-end', 'bottom', 'bottom-start', 'left-end', 'left', 'left-start'];

// Get rid of `auto` `auto-start` and `auto-end`
var validPlacements = placements.slice(3);

/**
 * Given an initial placement, returns all the subsequent placements
 * clockwise (or counter-clockwise).
 *
 * @method
 * @memberof Popper.Utils
 * @argument {String} placement - A valid placement (it accepts variations)
 * @argument {Boolean} counter - Set to true to walk the placements counterclockwise
 * @returns {Array} placements including their variations
 */
function clockwise(placement) {
  var counter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var index = validPlacements.indexOf(placement);
  var arr = validPlacements.slice(index + 1).concat(validPlacements.slice(0, index));
  return counter ? arr.reverse() : arr;
}
var BEHAVIORS = {
  FLIP: 'flip',
  CLOCKWISE: 'clockwise',
  COUNTERCLOCKWISE: 'counterclockwise'
};

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function flip(data, options) {
  // if `inner` modifier is enabled, we can't use the `flip` modifier
  if (isModifierEnabled(data.instance.modifiers, 'inner')) {
    return data;
  }
  if (data.flipped && data.placement === data.originalPlacement) {
    // seems like flip is trying to loop, probably there's not enough space on any of the flippable sides
    return data;
  }
  var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, options.boundariesElement, data.positionFixed);
  var placement = data.placement.split('-')[0];
  var placementOpposite = getOppositePlacement(placement);
  var variation = data.placement.split('-')[1] || '';
  var flipOrder = [];
  switch (options.behavior) {
    case BEHAVIORS.FLIP:
      flipOrder = [placement, placementOpposite];
      break;
    case BEHAVIORS.CLOCKWISE:
      flipOrder = clockwise(placement);
      break;
    case BEHAVIORS.COUNTERCLOCKWISE:
      flipOrder = clockwise(placement, true);
      break;
    default:
      flipOrder = options.behavior;
  }
  flipOrder.forEach(function (step, index) {
    if (placement !== step || flipOrder.length === index + 1) {
      return data;
    }
    placement = data.placement.split('-')[0];
    placementOpposite = getOppositePlacement(placement);
    var popperOffsets = data.offsets.popper;
    var refOffsets = data.offsets.reference;

    // using floor because the reference offsets may contain decimals we are not going to consider here
    var floor = Math.floor;
    var overlapsRef = placement === 'left' && floor(popperOffsets.right) > floor(refOffsets.left) || placement === 'right' && floor(popperOffsets.left) < floor(refOffsets.right) || placement === 'top' && floor(popperOffsets.bottom) > floor(refOffsets.top) || placement === 'bottom' && floor(popperOffsets.top) < floor(refOffsets.bottom);
    var overflowsLeft = floor(popperOffsets.left) < floor(boundaries.left);
    var overflowsRight = floor(popperOffsets.right) > floor(boundaries.right);
    var overflowsTop = floor(popperOffsets.top) < floor(boundaries.top);
    var overflowsBottom = floor(popperOffsets.bottom) > floor(boundaries.bottom);
    var overflowsBoundaries = placement === 'left' && overflowsLeft || placement === 'right' && overflowsRight || placement === 'top' && overflowsTop || placement === 'bottom' && overflowsBottom;

    // flip the variation if required
    var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;

    // flips variation if reference element overflows boundaries
    var flippedVariationByRef = !!options.flipVariations && (isVertical && variation === 'start' && overflowsLeft || isVertical && variation === 'end' && overflowsRight || !isVertical && variation === 'start' && overflowsTop || !isVertical && variation === 'end' && overflowsBottom);

    // flips variation if popper content overflows boundaries
    var flippedVariationByContent = !!options.flipVariationsByContent && (isVertical && variation === 'start' && overflowsRight || isVertical && variation === 'end' && overflowsLeft || !isVertical && variation === 'start' && overflowsBottom || !isVertical && variation === 'end' && overflowsTop);
    var flippedVariation = flippedVariationByRef || flippedVariationByContent;
    if (overlapsRef || overflowsBoundaries || flippedVariation) {
      // this boolean to detect any flip loop
      data.flipped = true;
      if (overlapsRef || overflowsBoundaries) {
        placement = flipOrder[index + 1];
      }
      if (flippedVariation) {
        variation = getOppositeVariation(variation);
      }
      data.placement = placement + (variation ? '-' + variation : '');

      // this object contains `position`, we want to preserve it along with
      // any additional property we may add in the future
      data.offsets.popper = _extends$v({}, data.offsets.popper, getPopperOffsets(data.instance.popper, data.offsets.reference, data.placement));
      data = runModifiers(data.instance.modifiers, data, 'flip');
    }
  });
  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function keepTogether(data) {
  var _data$offsets = data.offsets,
    popper = _data$offsets.popper,
    reference = _data$offsets.reference;
  var placement = data.placement.split('-')[0];
  var floor = Math.floor;
  var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;
  var side = isVertical ? 'right' : 'bottom';
  var opSide = isVertical ? 'left' : 'top';
  var measurement = isVertical ? 'width' : 'height';
  if (popper[side] < floor(reference[opSide])) {
    data.offsets.popper[opSide] = floor(reference[opSide]) - popper[measurement];
  }
  if (popper[opSide] > floor(reference[side])) {
    data.offsets.popper[opSide] = floor(reference[side]);
  }
  return data;
}

/**
 * Converts a string containing value + unit into a px value number
 * @function
 * @memberof {modifiers~offset}
 * @private
 * @argument {String} str - Value + unit string
 * @argument {String} measurement - `height` or `width`
 * @argument {Object} popperOffsets
 * @argument {Object} referenceOffsets
 * @returns {Number|String}
 * Value in pixels, or original string if no values were extracted
 */
function toValue(str, measurement, popperOffsets, referenceOffsets) {
  // separate value from unit
  var split = str.match(/((?:\-|\+)?\d*\.?\d*)(.*)/);
  var value = +split[1];
  var unit = split[2];

  // If it's not a number it's an operator, I guess
  if (!value) {
    return str;
  }
  if (unit.indexOf('%') === 0) {
    var element = void 0;
    switch (unit) {
      case '%p':
        element = popperOffsets;
        break;
      case '%':
      case '%r':
      default:
        element = referenceOffsets;
    }
    var rect = getClientRect(element);
    return rect[measurement] / 100 * value;
  } else if (unit === 'vh' || unit === 'vw') {
    // if is a vh or vw, we calculate the size based on the viewport
    var size = void 0;
    if (unit === 'vh') {
      size = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    } else {
      size = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    }
    return size / 100 * value;
  } else {
    // if is an explicit pixel unit, we get rid of the unit and keep the value
    // if is an implicit unit, it's px, and we return just the value
    return value;
  }
}

/**
 * Parse an `offset` string to extrapolate `x` and `y` numeric offsets.
 * @function
 * @memberof {modifiers~offset}
 * @private
 * @argument {String} offset
 * @argument {Object} popperOffsets
 * @argument {Object} referenceOffsets
 * @argument {String} basePlacement
 * @returns {Array} a two cells array with x and y offsets in numbers
 */
function parseOffset(offset, popperOffsets, referenceOffsets, basePlacement) {
  var offsets = [0, 0];

  // Use height if placement is left or right and index is 0 otherwise use width
  // in this way the first offset will use an axis and the second one
  // will use the other one
  var useHeight = ['right', 'left'].indexOf(basePlacement) !== -1;

  // Split the offset string to obtain a list of values and operands
  // The regex addresses values with the plus or minus sign in front (+10, -20, etc)
  var fragments = offset.split(/(\+|\-)/).map(function (frag) {
    return frag.trim();
  });

  // Detect if the offset string contains a pair of values or a single one
  // they could be separated by comma or space
  var divider = fragments.indexOf(find(fragments, function (frag) {
    return frag.search(/,|\s/) !== -1;
  }));
  if (fragments[divider] && fragments[divider].indexOf(',') === -1) {
    console.warn('Offsets separated by white space(s) are deprecated, use a comma (,) instead.');
  }

  // If divider is found, we divide the list of values and operands to divide
  // them by ofset X and Y.
  var splitRegex = /\s*,\s*|\s+/;
  var ops = divider !== -1 ? [fragments.slice(0, divider).concat([fragments[divider].split(splitRegex)[0]]), [fragments[divider].split(splitRegex)[1]].concat(fragments.slice(divider + 1))] : [fragments];

  // Convert the values with units to absolute pixels to allow our computations
  ops = ops.map(function (op, index) {
    // Most of the units rely on the orientation of the popper
    var measurement = (index === 1 ? !useHeight : useHeight) ? 'height' : 'width';
    var mergeWithPrevious = false;
    return op
    // This aggregates any `+` or `-` sign that aren't considered operators
    // e.g.: 10 + +5 => [10, +, +5]
    .reduce(function (a, b) {
      if (a[a.length - 1] === '' && ['+', '-'].indexOf(b) !== -1) {
        a[a.length - 1] = b;
        mergeWithPrevious = true;
        return a;
      } else if (mergeWithPrevious) {
        a[a.length - 1] += b;
        mergeWithPrevious = false;
        return a;
      } else {
        return a.concat(b);
      }
    }, [])
    // Here we convert the string values into number values (in px)
    .map(function (str) {
      return toValue(str, measurement, popperOffsets, referenceOffsets);
    });
  });

  // Loop trough the offsets arrays and execute the operations
  ops.forEach(function (op, index) {
    op.forEach(function (frag, index2) {
      if (isNumeric(frag)) {
        offsets[index] += frag * (op[index2 - 1] === '-' ? -1 : 1);
      }
    });
  });
  return offsets;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @argument {Number|String} options.offset=0
 * The offset value as described in the modifier description
 * @returns {Object} The data object, properly modified
 */
function offset(data, _ref) {
  var offset = _ref.offset;
  var placement = data.placement,
    _data$offsets = data.offsets,
    popper = _data$offsets.popper,
    reference = _data$offsets.reference;
  var basePlacement = placement.split('-')[0];
  var offsets = void 0;
  if (isNumeric(+offset)) {
    offsets = [+offset, 0];
  } else {
    offsets = parseOffset(offset, popper, reference, basePlacement);
  }
  if (basePlacement === 'left') {
    popper.top += offsets[0];
    popper.left -= offsets[1];
  } else if (basePlacement === 'right') {
    popper.top += offsets[0];
    popper.left += offsets[1];
  } else if (basePlacement === 'top') {
    popper.left += offsets[0];
    popper.top -= offsets[1];
  } else if (basePlacement === 'bottom') {
    popper.left += offsets[0];
    popper.top += offsets[1];
  }
  data.popper = popper;
  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function preventOverflow(data, options) {
  var boundariesElement = options.boundariesElement || getOffsetParent(data.instance.popper);

  // If offsetParent is the reference element, we really want to
  // go one step up and use the next offsetParent as reference to
  // avoid to make this modifier completely useless and look like broken
  if (data.instance.reference === boundariesElement) {
    boundariesElement = getOffsetParent(boundariesElement);
  }

  // NOTE: DOM access here
  // resets the popper's position so that the document size can be calculated excluding
  // the size of the popper element itself
  var transformProp = getSupportedPropertyName('transform');
  var popperStyles = data.instance.popper.style; // assignment to help minification
  var top = popperStyles.top,
    left = popperStyles.left,
    transform = popperStyles[transformProp];
  popperStyles.top = '';
  popperStyles.left = '';
  popperStyles[transformProp] = '';
  var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, boundariesElement, data.positionFixed);

  // NOTE: DOM access here
  // restores the original style properties after the offsets have been computed
  popperStyles.top = top;
  popperStyles.left = left;
  popperStyles[transformProp] = transform;
  options.boundaries = boundaries;
  var order = options.priority;
  var popper = data.offsets.popper;
  var check = {
    primary: function primary(placement) {
      var value = popper[placement];
      if (popper[placement] < boundaries[placement] && !options.escapeWithReference) {
        value = Math.max(popper[placement], boundaries[placement]);
      }
      return defineProperty({}, placement, value);
    },
    secondary: function secondary(placement) {
      var mainSide = placement === 'right' ? 'left' : 'top';
      var value = popper[mainSide];
      if (popper[placement] > boundaries[placement] && !options.escapeWithReference) {
        value = Math.min(popper[mainSide], boundaries[placement] - (placement === 'right' ? popper.width : popper.height));
      }
      return defineProperty({}, mainSide, value);
    }
  };
  order.forEach(function (placement) {
    var side = ['left', 'top'].indexOf(placement) !== -1 ? 'primary' : 'secondary';
    popper = _extends$v({}, popper, check[side](placement));
  });
  data.offsets.popper = popper;
  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function shift(data) {
  var placement = data.placement;
  var basePlacement = placement.split('-')[0];
  var shiftvariation = placement.split('-')[1];

  // if shift shiftvariation is specified, run the modifier
  if (shiftvariation) {
    var _data$offsets = data.offsets,
      reference = _data$offsets.reference,
      popper = _data$offsets.popper;
    var isVertical = ['bottom', 'top'].indexOf(basePlacement) !== -1;
    var side = isVertical ? 'left' : 'top';
    var measurement = isVertical ? 'width' : 'height';
    var shiftOffsets = {
      start: defineProperty({}, side, reference[side]),
      end: defineProperty({}, side, reference[side] + reference[measurement] - popper[measurement])
    };
    data.offsets.popper = _extends$v({}, popper, shiftOffsets[shiftvariation]);
  }
  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function hide(data) {
  if (!isModifierRequired(data.instance.modifiers, 'hide', 'preventOverflow')) {
    return data;
  }
  var refRect = data.offsets.reference;
  var bound = find(data.instance.modifiers, function (modifier) {
    return modifier.name === 'preventOverflow';
  }).boundaries;
  if (refRect.bottom < bound.top || refRect.left > bound.right || refRect.top > bound.bottom || refRect.right < bound.left) {
    // Avoid unnecessary DOM access if visibility hasn't changed
    if (data.hide === true) {
      return data;
    }
    data.hide = true;
    data.attributes['x-out-of-boundaries'] = '';
  } else {
    // Avoid unnecessary DOM access if visibility hasn't changed
    if (data.hide === false) {
      return data;
    }
    data.hide = false;
    data.attributes['x-out-of-boundaries'] = false;
  }
  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function inner(data) {
  var placement = data.placement;
  var basePlacement = placement.split('-')[0];
  var _data$offsets = data.offsets,
    popper = _data$offsets.popper,
    reference = _data$offsets.reference;
  var isHoriz = ['left', 'right'].indexOf(basePlacement) !== -1;
  var subtractLength = ['top', 'left'].indexOf(basePlacement) === -1;
  popper[isHoriz ? 'left' : 'top'] = reference[basePlacement] - (subtractLength ? popper[isHoriz ? 'width' : 'height'] : 0);
  data.placement = getOppositePlacement(placement);
  data.offsets.popper = getClientRect(popper);
  return data;
}

/**
 * Modifier function, each modifier can have a function of this type assigned
 * to its `fn` property.<br />
 * These functions will be called on each update, this means that you must
 * make sure they are performant enough to avoid performance bottlenecks.
 *
 * @function ModifierFn
 * @argument {dataObject} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {dataObject} The data object, properly modified
 */

/**
 * Modifiers are plugins used to alter the behavior of your poppers.<br />
 * Popper.js uses a set of 9 modifiers to provide all the basic functionalities
 * needed by the library.
 *
 * Usually you don't want to override the `order`, `fn` and `onLoad` props.
 * All the other properties are configurations that could be tweaked.
 * @namespace modifiers
 */
var modifiers = {
  /**
   * Modifier used to shift the popper on the start or end of its reference
   * element.<br />
   * It will read the variation of the `placement` property.<br />
   * It can be one either `-end` or `-start`.
   * @memberof modifiers
   * @inner
   */
  shift: {
    /** @prop {number} order=100 - Index used to define the order of execution */
    order: 100,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: shift
  },
  /**
   * The `offset` modifier can shift your popper on both its axis.
   *
   * It accepts the following units:
   * - `px` or unit-less, interpreted as pixels
   * - `%` or `%r`, percentage relative to the length of the reference element
   * - `%p`, percentage relative to the length of the popper element
   * - `vw`, CSS viewport width unit
   * - `vh`, CSS viewport height unit
   *
   * For length is intended the main axis relative to the placement of the popper.<br />
   * This means that if the placement is `top` or `bottom`, the length will be the
   * `width`. In case of `left` or `right`, it will be the `height`.
   *
   * You can provide a single value (as `Number` or `String`), or a pair of values
   * as `String` divided by a comma or one (or more) white spaces.<br />
   * The latter is a deprecated method because it leads to confusion and will be
   * removed in v2.<br />
   * Additionally, it accepts additions and subtractions between different units.
   * Note that multiplications and divisions aren't supported.
   *
   * Valid examples are:
   * ```
   * 10
   * '10%'
   * '10, 10'
   * '10%, 10'
   * '10 + 10%'
   * '10 - 5vh + 3%'
   * '-10px + 5vh, 5px - 6%'
   * ```
   * > **NB**: If you desire to apply offsets to your poppers in a way that may make them overlap
   * > with their reference element, unfortunately, you will have to disable the `flip` modifier.
   * > You can read more on this at this [issue](https://github.com/FezVrasta/popper.js/issues/373).
   *
   * @memberof modifiers
   * @inner
   */
  offset: {
    /** @prop {number} order=200 - Index used to define the order of execution */
    order: 200,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: offset,
    /** @prop {Number|String} offset=0
     * The offset value as described in the modifier description
     */
    offset: 0
  },
  /**
   * Modifier used to prevent the popper from being positioned outside the boundary.
   *
   * A scenario exists where the reference itself is not within the boundaries.<br />
   * We can say it has "escaped the boundaries" — or just "escaped".<br />
   * In this case we need to decide whether the popper should either:
   *
   * - detach from the reference and remain "trapped" in the boundaries, or
   * - if it should ignore the boundary and "escape with its reference"
   *
   * When `escapeWithReference` is set to`true` and reference is completely
   * outside its boundaries, the popper will overflow (or completely leave)
   * the boundaries in order to remain attached to the edge of the reference.
   *
   * @memberof modifiers
   * @inner
   */
  preventOverflow: {
    /** @prop {number} order=300 - Index used to define the order of execution */
    order: 300,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: preventOverflow,
    /**
     * @prop {Array} [priority=['left','right','top','bottom']]
     * Popper will try to prevent overflow following these priorities by default,
     * then, it could overflow on the left and on top of the `boundariesElement`
     */
    priority: ['left', 'right', 'top', 'bottom'],
    /**
     * @prop {number} padding=5
     * Amount of pixel used to define a minimum distance between the boundaries
     * and the popper. This makes sure the popper always has a little padding
     * between the edges of its container
     */
    padding: 5,
    /**
     * @prop {String|HTMLElement} boundariesElement='scrollParent'
     * Boundaries used by the modifier. Can be `scrollParent`, `window`,
     * `viewport` or any DOM element.
     */
    boundariesElement: 'scrollParent'
  },
  /**
   * Modifier used to make sure the reference and its popper stay near each other
   * without leaving any gap between the two. Especially useful when the arrow is
   * enabled and you want to ensure that it points to its reference element.
   * It cares only about the first axis. You can still have poppers with margin
   * between the popper and its reference element.
   * @memberof modifiers
   * @inner
   */
  keepTogether: {
    /** @prop {number} order=400 - Index used to define the order of execution */
    order: 400,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: keepTogether
  },
  /**
   * This modifier is used to move the `arrowElement` of the popper to make
   * sure it is positioned between the reference element and its popper element.
   * It will read the outer size of the `arrowElement` node to detect how many
   * pixels of conjunction are needed.
   *
   * It has no effect if no `arrowElement` is provided.
   * @memberof modifiers
   * @inner
   */
  arrow: {
    /** @prop {number} order=500 - Index used to define the order of execution */
    order: 500,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: arrow,
    /** @prop {String|HTMLElement} element='[x-arrow]' - Selector or node used as arrow */
    element: '[x-arrow]'
  },
  /**
   * Modifier used to flip the popper's placement when it starts to overlap its
   * reference element.
   *
   * Requires the `preventOverflow` modifier before it in order to work.
   *
   * **NOTE:** this modifier will interrupt the current update cycle and will
   * restart it if it detects the need to flip the placement.
   * @memberof modifiers
   * @inner
   */
  flip: {
    /** @prop {number} order=600 - Index used to define the order of execution */
    order: 600,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: flip,
    /**
     * @prop {String|Array} behavior='flip'
     * The behavior used to change the popper's placement. It can be one of
     * `flip`, `clockwise`, `counterclockwise` or an array with a list of valid
     * placements (with optional variations)
     */
    behavior: 'flip',
    /**
     * @prop {number} padding=5
     * The popper will flip if it hits the edges of the `boundariesElement`
     */
    padding: 5,
    /**
     * @prop {String|HTMLElement} boundariesElement='viewport'
     * The element which will define the boundaries of the popper position.
     * The popper will never be placed outside of the defined boundaries
     * (except if `keepTogether` is enabled)
     */
    boundariesElement: 'viewport',
    /**
     * @prop {Boolean} flipVariations=false
     * The popper will switch placement variation between `-start` and `-end` when
     * the reference element overlaps its boundaries.
     *
     * The original placement should have a set variation.
     */
    flipVariations: false,
    /**
     * @prop {Boolean} flipVariationsByContent=false
     * The popper will switch placement variation between `-start` and `-end` when
     * the popper element overlaps its reference boundaries.
     *
     * The original placement should have a set variation.
     */
    flipVariationsByContent: false
  },
  /**
   * Modifier used to make the popper flow toward the inner of the reference element.
   * By default, when this modifier is disabled, the popper will be placed outside
   * the reference element.
   * @memberof modifiers
   * @inner
   */
  inner: {
    /** @prop {number} order=700 - Index used to define the order of execution */
    order: 700,
    /** @prop {Boolean} enabled=false - Whether the modifier is enabled or not */
    enabled: false,
    /** @prop {ModifierFn} */
    fn: inner
  },
  /**
   * Modifier used to hide the popper when its reference element is outside of the
   * popper boundaries. It will set a `x-out-of-boundaries` attribute which can
   * be used to hide with a CSS selector the popper when its reference is
   * out of boundaries.
   *
   * Requires the `preventOverflow` modifier before it in order to work.
   * @memberof modifiers
   * @inner
   */
  hide: {
    /** @prop {number} order=800 - Index used to define the order of execution */
    order: 800,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: hide
  },
  /**
   * Computes the style that will be applied to the popper element to gets
   * properly positioned.
   *
   * Note that this modifier will not touch the DOM, it just prepares the styles
   * so that `applyStyle` modifier can apply it. This separation is useful
   * in case you need to replace `applyStyle` with a custom implementation.
   *
   * This modifier has `850` as `order` value to maintain backward compatibility
   * with previous versions of Popper.js. Expect the modifiers ordering method
   * to change in future major versions of the library.
   *
   * @memberof modifiers
   * @inner
   */
  computeStyle: {
    /** @prop {number} order=850 - Index used to define the order of execution */
    order: 850,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: computeStyle,
    /**
     * @prop {Boolean} gpuAcceleration=true
     * If true, it uses the CSS 3D transformation to position the popper.
     * Otherwise, it will use the `top` and `left` properties
     */
    gpuAcceleration: true,
    /**
     * @prop {string} [x='bottom']
     * Where to anchor the X axis (`bottom` or `top`). AKA X offset origin.
     * Change this if your popper should grow in a direction different from `bottom`
     */
    x: 'bottom',
    /**
     * @prop {string} [x='left']
     * Where to anchor the Y axis (`left` or `right`). AKA Y offset origin.
     * Change this if your popper should grow in a direction different from `right`
     */
    y: 'right'
  },
  /**
   * Applies the computed styles to the popper element.
   *
   * All the DOM manipulations are limited to this modifier. This is useful in case
   * you want to integrate Popper.js inside a framework or view library and you
   * want to delegate all the DOM manipulations to it.
   *
   * Note that if you disable this modifier, you must make sure the popper element
   * has its position set to `absolute` before Popper.js can do its work!
   *
   * Just disable this modifier and define your own to achieve the desired effect.
   *
   * @memberof modifiers
   * @inner
   */
  applyStyle: {
    /** @prop {number} order=900 - Index used to define the order of execution */
    order: 900,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: applyStyle,
    /** @prop {Function} */
    onLoad: applyStyleOnLoad,
    /**
     * @deprecated since version 1.10.0, the property moved to `computeStyle` modifier
     * @prop {Boolean} gpuAcceleration=true
     * If true, it uses the CSS 3D transformation to position the popper.
     * Otherwise, it will use the `top` and `left` properties
     */
    gpuAcceleration: undefined
  }
};

/**
 * The `dataObject` is an object containing all the information used by Popper.js.
 * This object is passed to modifiers and to the `onCreate` and `onUpdate` callbacks.
 * @name dataObject
 * @property {Object} data.instance The Popper.js instance
 * @property {String} data.placement Placement applied to popper
 * @property {String} data.originalPlacement Placement originally defined on init
 * @property {Boolean} data.flipped True if popper has been flipped by flip modifier
 * @property {Boolean} data.hide True if the reference element is out of boundaries, useful to know when to hide the popper
 * @property {HTMLElement} data.arrowElement Node used as arrow by arrow modifier
 * @property {Object} data.styles Any CSS property defined here will be applied to the popper. It expects the JavaScript nomenclature (eg. `marginBottom`)
 * @property {Object} data.arrowStyles Any CSS property defined here will be applied to the popper arrow. It expects the JavaScript nomenclature (eg. `marginBottom`)
 * @property {Object} data.boundaries Offsets of the popper boundaries
 * @property {Object} data.offsets The measurements of popper, reference and arrow elements
 * @property {Object} data.offsets.popper `top`, `left`, `width`, `height` values
 * @property {Object} data.offsets.reference `top`, `left`, `width`, `height` values
 * @property {Object} data.offsets.arrow] `top` and `left` offsets, only one of them will be different from 0
 */

/**
 * Default options provided to Popper.js constructor.<br />
 * These can be overridden using the `options` argument of Popper.js.<br />
 * To override an option, simply pass an object with the same
 * structure of the `options` object, as the 3rd argument. For example:
 * ```
 * new Popper(ref, pop, {
 *   modifiers: {
 *     preventOverflow: { enabled: false }
 *   }
 * })
 * ```
 * @type {Object}
 * @static
 * @memberof Popper
 */
var Defaults = {
  /**
   * Popper's placement.
   * @prop {Popper.placements} placement='bottom'
   */
  placement: 'bottom',
  /**
   * Set this to true if you want popper to position it self in 'fixed' mode
   * @prop {Boolean} positionFixed=false
   */
  positionFixed: false,
  /**
   * Whether events (resize, scroll) are initially enabled.
   * @prop {Boolean} eventsEnabled=true
   */
  eventsEnabled: true,
  /**
   * Set to true if you want to automatically remove the popper when
   * you call the `destroy` method.
   * @prop {Boolean} removeOnDestroy=false
   */
  removeOnDestroy: false,
  /**
   * Callback called when the popper is created.<br />
   * By default, it is set to no-op.<br />
   * Access Popper.js instance with `data.instance`.
   * @prop {onCreate}
   */
  onCreate: function onCreate() {},
  /**
   * Callback called when the popper is updated. This callback is not called
   * on the initialization/creation of the popper, but only on subsequent
   * updates.<br />
   * By default, it is set to no-op.<br />
   * Access Popper.js instance with `data.instance`.
   * @prop {onUpdate}
   */
  onUpdate: function onUpdate() {},
  /**
   * List of modifiers used to modify the offsets before they are applied to the popper.
   * They provide most of the functionalities of Popper.js.
   * @prop {modifiers}
   */
  modifiers: modifiers
};

/**
 * @callback onCreate
 * @param {dataObject} data
 */

/**
 * @callback onUpdate
 * @param {dataObject} data
 */

// Utils
// Methods
var Popper$1 = function () {
  /**
   * Creates a new Popper.js instance.
   * @class Popper
   * @param {Element|referenceObject} reference - The reference element used to position the popper
   * @param {Element} popper - The HTML / XML element used as the popper
   * @param {Object} options - Your custom options to override the ones defined in [Defaults](#defaults)
   * @return {Object} instance - The generated Popper.js instance
   */
  function Popper(reference, popper) {
    var _this = this;
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    classCallCheck(this, Popper);
    this.scheduleUpdate = function () {
      return requestAnimationFrame(_this.update);
    };

    // make update() debounced, so that it only runs at most once-per-tick
    this.update = debounce$1(this.update.bind(this));

    // with {} we create a new object with the options inside it
    this.options = _extends$v({}, Popper.Defaults, options);

    // init state
    this.state = {
      isDestroyed: false,
      isCreated: false,
      scrollParents: []
    };

    // get reference and popper elements (allow jQuery wrappers)
    this.reference = reference && reference.jquery ? reference[0] : reference;
    this.popper = popper && popper.jquery ? popper[0] : popper;

    // Deep merge modifiers options
    this.options.modifiers = {};
    Object.keys(_extends$v({}, Popper.Defaults.modifiers, options.modifiers)).forEach(function (name) {
      _this.options.modifiers[name] = _extends$v({}, Popper.Defaults.modifiers[name] || {}, options.modifiers ? options.modifiers[name] : {});
    });

    // Refactoring modifiers' list (Object => Array)
    this.modifiers = Object.keys(this.options.modifiers).map(function (name) {
      return _extends$v({
        name: name
      }, _this.options.modifiers[name]);
    })
    // sort the modifiers by order
    .sort(function (a, b) {
      return a.order - b.order;
    });

    // modifiers have the ability to execute arbitrary code when Popper.js get inited
    // such code is executed in the same order of its modifier
    // they could add new properties to their options configuration
    // BE AWARE: don't add options to `options.modifiers.name` but to `modifierOptions`!
    this.modifiers.forEach(function (modifierOptions) {
      if (modifierOptions.enabled && isFunction(modifierOptions.onLoad)) {
        modifierOptions.onLoad(_this.reference, _this.popper, _this.options, modifierOptions, _this.state);
      }
    });

    // fire the first update to position the popper in the right place
    this.update();
    var eventsEnabled = this.options.eventsEnabled;
    if (eventsEnabled) {
      // setup event listeners, they will take care of update the position in specific situations
      this.enableEventListeners();
    }
    this.state.eventsEnabled = eventsEnabled;
  }

  // We can't use class properties because they don't get listed in the
  // class prototype and break stuff like Sinon stubs

  createClass(Popper, [{
    key: 'update',
    value: function update$$1() {
      return update.call(this);
    }
  }, {
    key: 'destroy',
    value: function destroy$$1() {
      return destroy.call(this);
    }
  }, {
    key: 'enableEventListeners',
    value: function enableEventListeners$$1() {
      return enableEventListeners.call(this);
    }
  }, {
    key: 'disableEventListeners',
    value: function disableEventListeners$$1() {
      return disableEventListeners.call(this);
    }

    /**
     * Schedules an update. It will run on the next UI update available.
     * @method scheduleUpdate
     * @memberof Popper
     */

    /**
     * Collection of utilities useful when writing custom modifiers.
     * Starting from version 1.7, this method is available only if you
     * include `popper-utils.js` before `popper.js`.
     *
     * **DEPRECATION**: This way to access PopperUtils is deprecated
     * and will be removed in v2! Use the PopperUtils module directly instead.
     * Due to the high instability of the methods contained in Utils, we can't
     * guarantee them to follow semver. Use them at your own risk!
     * @static
     * @private
     * @type {Object}
     * @deprecated since version 1.8
     * @member Utils
     * @memberof Popper
     */
  }]);

  return Popper;
}();

/**
 * The `referenceObject` is an object that provides an interface compatible with Popper.js
 * and lets you use it as replacement of a real DOM node.<br />
 * You can use this method to position a popper relatively to a set of coordinates
 * in case you don't have a DOM node to use as reference.
 *
 * ```
 * new Popper(referenceObject, popperNode);
 * ```
 *
 * NB: This feature isn't supported in Internet Explorer 10.
 * @name referenceObject
 * @property {Function} data.getBoundingClientRect
 * A function that returns a set of coordinates compatible with the native `getBoundingClientRect` method.
 * @property {number} data.clientWidth
 * An ES6 getter that will return the width of the virtual reference element.
 * @property {number} data.clientHeight
 * An ES6 getter that will return the height of the virtual reference element.
 */

Popper$1.Utils = (typeof window !== 'undefined' ? window : global).PopperUtils;
Popper$1.placements = placements;
Popper$1.Defaults = Defaults;
var PopperJS = Popper$1;var libExports = {};
var lib = {
  get exports(){ return libExports; },
  set exports(v){ libExports = v; },
};var implementationExports = {};
var implementation = {
  get exports(){ return implementationExports; },
  set exports(v){ implementationExports = v; },
};var key = '__global_unique_id__';
var gud = function () {
  return commonjsGlobal[key] = (commonjsGlobal[key] || 0) + 1;
};/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var warning = function () {};
var warning_1 = warning;(function (module, exports) {

	exports.__esModule = true;
	var _react = reactExports;
	_interopRequireDefault(_react);
	var _propTypes = propTypesExports;
	var _propTypes2 = _interopRequireDefault(_propTypes);
	var _gud = gud;
	var _gud2 = _interopRequireDefault(_gud);
	var _warning = warning_1;
	_interopRequireDefault(_warning);
	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : {
	    default: obj
	  };
	}
	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}
	function _possibleConstructorReturn(self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }
	  return call && (typeof call === "object" || typeof call === "function") ? call : self;
	}
	function _inherits(subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
	  }
	  subClass.prototype = Object.create(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      enumerable: false,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}
	var MAX_SIGNED_31_BIT_INT = 1073741823;

	// Inlined Object.is polyfill.
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
	function objectIs(x, y) {
	  if (x === y) {
	    return x !== 0 || 1 / x === 1 / y;
	  } else {
	    return x !== x && y !== y;
	  }
	}
	function createEventEmitter(value) {
	  var handlers = [];
	  return {
	    on: function on(handler) {
	      handlers.push(handler);
	    },
	    off: function off(handler) {
	      handlers = handlers.filter(function (h) {
	        return h !== handler;
	      });
	    },
	    get: function get() {
	      return value;
	    },
	    set: function set(newValue, changedBits) {
	      value = newValue;
	      handlers.forEach(function (handler) {
	        return handler(value, changedBits);
	      });
	    }
	  };
	}
	function onlyChild(children) {
	  return Array.isArray(children) ? children[0] : children;
	}
	function createReactContext(defaultValue, calculateChangedBits) {
	  var _Provider$childContex, _Consumer$contextType;
	  var contextProp = '__create-react-context-' + (0, _gud2.default)() + '__';
	  var Provider = function (_Component) {
	    _inherits(Provider, _Component);
	    function Provider() {
	      var _temp, _this, _ret;
	      _classCallCheck(this, Provider);
	      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }
	      return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.emitter = createEventEmitter(_this.props.value), _temp), _possibleConstructorReturn(_this, _ret);
	    }
	    Provider.prototype.getChildContext = function getChildContext() {
	      var _ref;
	      return _ref = {}, _ref[contextProp] = this.emitter, _ref;
	    };
	    Provider.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
	      if (this.props.value !== nextProps.value) {
	        var oldValue = this.props.value;
	        var newValue = nextProps.value;
	        var changedBits = void 0;
	        if (objectIs(oldValue, newValue)) {
	          changedBits = 0; // No change
	        } else {
	          changedBits = typeof calculateChangedBits === 'function' ? calculateChangedBits(oldValue, newValue) : MAX_SIGNED_31_BIT_INT;
	          changedBits |= 0;
	          if (changedBits !== 0) {
	            this.emitter.set(nextProps.value, changedBits);
	          }
	        }
	      }
	    };
	    Provider.prototype.render = function render() {
	      return this.props.children;
	    };
	    return Provider;
	  }(_react.Component);
	  Provider.childContextTypes = (_Provider$childContex = {}, _Provider$childContex[contextProp] = _propTypes2.default.object.isRequired, _Provider$childContex);
	  var Consumer = function (_Component2) {
	    _inherits(Consumer, _Component2);
	    function Consumer() {
	      var _temp2, _this2, _ret2;
	      _classCallCheck(this, Consumer);
	      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	        args[_key2] = arguments[_key2];
	      }
	      return _ret2 = (_temp2 = (_this2 = _possibleConstructorReturn(this, _Component2.call.apply(_Component2, [this].concat(args))), _this2), _this2.state = {
	        value: _this2.getValue()
	      }, _this2.onUpdate = function (newValue, changedBits) {
	        var observedBits = _this2.observedBits | 0;
	        if ((observedBits & changedBits) !== 0) {
	          _this2.setState({
	            value: _this2.getValue()
	          });
	        }
	      }, _temp2), _possibleConstructorReturn(_this2, _ret2);
	    }
	    Consumer.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
	      var observedBits = nextProps.observedBits;
	      this.observedBits = observedBits === undefined || observedBits === null ? MAX_SIGNED_31_BIT_INT // Subscribe to all changes by default
	      : observedBits;
	    };
	    Consumer.prototype.componentDidMount = function componentDidMount() {
	      if (this.context[contextProp]) {
	        this.context[contextProp].on(this.onUpdate);
	      }
	      var observedBits = this.props.observedBits;
	      this.observedBits = observedBits === undefined || observedBits === null ? MAX_SIGNED_31_BIT_INT // Subscribe to all changes by default
	      : observedBits;
	    };
	    Consumer.prototype.componentWillUnmount = function componentWillUnmount() {
	      if (this.context[contextProp]) {
	        this.context[contextProp].off(this.onUpdate);
	      }
	    };
	    Consumer.prototype.getValue = function getValue() {
	      if (this.context[contextProp]) {
	        return this.context[contextProp].get();
	      } else {
	        return defaultValue;
	      }
	    };
	    Consumer.prototype.render = function render() {
	      return onlyChild(this.props.children)(this.state.value);
	    };
	    return Consumer;
	  }(_react.Component);
	  Consumer.contextTypes = (_Consumer$contextType = {}, _Consumer$contextType[contextProp] = _propTypes2.default.object, _Consumer$contextType);
	  return {
	    Provider: Provider,
	    Consumer: Consumer
	  };
	}
	exports.default = createReactContext;
	module.exports = exports['default'];
} (implementation, implementationExports));(function (module, exports) {

	exports.__esModule = true;
	var _react = reactExports;
	var _react2 = _interopRequireDefault(_react);
	var _implementation = implementationExports;
	var _implementation2 = _interopRequireDefault(_implementation);
	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : {
	    default: obj
	  };
	}
	exports.default = _react2.default.createContext || _implementation2.default;
	module.exports = exports['default'];
} (lib, libExports));

var createContext = /*@__PURE__*/getDefaultExportFromCjs(libExports);var ManagerReferenceNodeContext = createContext();
var ManagerReferenceNodeSetterContext = createContext();
var Manager = /*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Manager, _React$Component);
  function Manager() {
    var _this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "referenceNode", void 0);
    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "setReferenceNode", function (newReferenceNode) {
      if (newReferenceNode && _this.referenceNode !== newReferenceNode) {
        _this.referenceNode = newReferenceNode;
        _this.forceUpdate();
      }
    });
    return _this;
  }
  var _proto = Manager.prototype;
  _proto.componentWillUnmount = function componentWillUnmount() {
    this.referenceNode = null;
  };
  _proto.render = function render() {
    return /*#__PURE__*/reactExports.createElement(ManagerReferenceNodeContext.Provider, {
      value: this.referenceNode
    }, /*#__PURE__*/reactExports.createElement(ManagerReferenceNodeSetterContext.Provider, {
      value: this.setReferenceNode
    }, this.props.children));
  };
  return Manager;
}(reactExports.Component);/**
 * Takes an argument and if it's an array, returns the first item in the array,
 * otherwise returns the argument. Used for Preact compatibility.
 */
var unwrapArray = function unwrapArray(arg) {
  return Array.isArray(arg) ? arg[0] : arg;
};
/**
 * Takes a maybe-undefined function and arbitrary args and invokes the function
 * only if it is defined.
 */

var safeInvoke = function safeInvoke(fn) {
  if (typeof fn === "function") {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    return fn.apply(void 0, args);
  }
};
/**
 * Sets a ref using either a ref callback or a ref object
 */

var setRef = function setRef(ref, node) {
  // if its a function call it
  if (typeof ref === "function") {
    return safeInvoke(ref, node);
  } // otherwise we should treat it as a ref object
  else if (ref != null) {
    ref.current = node;
  }
};var initialStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  opacity: 0,
  pointerEvents: 'none'
};
var initialArrowStyle = {};
var InnerPopper = /*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(InnerPopper, _React$Component);
  function InnerPopper() {
    var _this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      data: undefined,
      placement: undefined
    });
    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "popperInstance", void 0);
    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "popperNode", null);
    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "arrowNode", null);
    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "setPopperNode", function (popperNode) {
      if (!popperNode || _this.popperNode === popperNode) return;
      setRef(_this.props.innerRef, popperNode);
      _this.popperNode = popperNode;
      _this.updatePopperInstance();
    });
    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "setArrowNode", function (arrowNode) {
      _this.arrowNode = arrowNode;
    });
    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "updateStateModifier", {
      enabled: true,
      order: 900,
      fn: function fn(data) {
        var placement = data.placement;
        _this.setState({
          data: data,
          placement: placement
        });
        return data;
      }
    });
    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getOptions", function () {
      return {
        placement: _this.props.placement,
        eventsEnabled: _this.props.eventsEnabled,
        positionFixed: _this.props.positionFixed,
        modifiers: _extends$x({}, _this.props.modifiers, {
          arrow: _extends$x({}, _this.props.modifiers && _this.props.modifiers.arrow, {
            enabled: !!_this.arrowNode,
            element: _this.arrowNode
          }),
          applyStyle: {
            enabled: false
          },
          updateStateModifier: _this.updateStateModifier
        })
      };
    });
    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getPopperStyle", function () {
      return !_this.popperNode || !_this.state.data ? initialStyle : _extends$x({
        position: _this.state.data.offsets.popper.position
      }, _this.state.data.styles);
    });
    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getPopperPlacement", function () {
      return !_this.state.data ? undefined : _this.state.placement;
    });
    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getArrowStyle", function () {
      return !_this.arrowNode || !_this.state.data ? initialArrowStyle : _this.state.data.arrowStyles;
    });
    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getOutOfBoundariesState", function () {
      return _this.state.data ? _this.state.data.hide : undefined;
    });
    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "destroyPopperInstance", function () {
      if (!_this.popperInstance) return;
      _this.popperInstance.destroy();
      _this.popperInstance = null;
    });
    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "updatePopperInstance", function () {
      _this.destroyPopperInstance();
      var _assertThisInitialize = _assertThisInitialized(_assertThisInitialized(_this)),
        popperNode = _assertThisInitialize.popperNode;
      var referenceElement = _this.props.referenceElement;
      if (!referenceElement || !popperNode) return;
      _this.popperInstance = new PopperJS(referenceElement, popperNode, _this.getOptions());
    });
    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "scheduleUpdate", function () {
      if (_this.popperInstance) {
        _this.popperInstance.scheduleUpdate();
      }
    });
    return _this;
  }
  var _proto = InnerPopper.prototype;
  _proto.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
    // If the Popper.js options have changed, update the instance (destroy + create)
    if (this.props.placement !== prevProps.placement || this.props.referenceElement !== prevProps.referenceElement || this.props.positionFixed !== prevProps.positionFixed || !deepEqual_1(this.props.modifiers, prevProps.modifiers, {
      strict: true
    })) {
      this.updatePopperInstance();
    } else if (this.props.eventsEnabled !== prevProps.eventsEnabled && this.popperInstance) {
      this.props.eventsEnabled ? this.popperInstance.enableEventListeners() : this.popperInstance.disableEventListeners();
    } // A placement difference in state means popper determined a new placement
    // apart from the props value. By the time the popper element is rendered with
    // the new position Popper has already measured it, if the place change triggers
    // a size change it will result in a misaligned popper. So we schedule an update to be sure.

    if (prevState.placement !== this.state.placement) {
      this.scheduleUpdate();
    }
  };
  _proto.componentWillUnmount = function componentWillUnmount() {
    setRef(this.props.innerRef, null);
    this.destroyPopperInstance();
  };
  _proto.render = function render() {
    return unwrapArray(this.props.children)({
      ref: this.setPopperNode,
      style: this.getPopperStyle(),
      placement: this.getPopperPlacement(),
      outOfBoundaries: this.getOutOfBoundariesState(),
      scheduleUpdate: this.scheduleUpdate,
      arrowProps: {
        ref: this.setArrowNode,
        style: this.getArrowStyle()
      }
    });
  };
  return InnerPopper;
}(reactExports.Component);
_defineProperty(InnerPopper, "defaultProps", {
  placement: 'bottom',
  eventsEnabled: true,
  referenceElement: undefined,
  positionFixed: false
});
PopperJS.placements;
function Popper(_ref) {
  var referenceElement = _ref.referenceElement,
    props = _objectWithoutPropertiesLoose(_ref, ["referenceElement"]);
  return /*#__PURE__*/reactExports.createElement(ManagerReferenceNodeContext.Consumer, null, function (referenceNode) {
    return /*#__PURE__*/reactExports.createElement(InnerPopper, _extends$x({
      referenceElement: referenceElement !== undefined ? referenceElement : referenceNode
    }, props));
  });
}var InnerReference = /*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(InnerReference, _React$Component);
  function InnerReference() {
    var _this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "refHandler", function (node) {
      setRef(_this.props.innerRef, node);
      safeInvoke(_this.props.setReferenceNode, node);
    });
    return _this;
  }
  var _proto = InnerReference.prototype;
  _proto.componentWillUnmount = function componentWillUnmount() {
    setRef(this.props.innerRef, null);
  };
  _proto.render = function render() {
    warning_1(Boolean(this.props.setReferenceNode));
    return unwrapArray(this.props.children)({
      ref: this.refHandler
    });
  };
  return InnerReference;
}(reactExports.Component);
function Reference(props) {
  return /*#__PURE__*/reactExports.createElement(ManagerReferenceNodeSetterContext.Consumer, null, function (setReferenceNode) {
    return /*#__PURE__*/reactExports.createElement(InnerReference, _extends$x({
      setReferenceNode: setReferenceNode
    }, props));
  });
}/**
 * generates a UID factory
 * @internal
 * @example
 * const uid = generateUID();
 * uid(object) = 1;
 * uid(object) = 1;
 * uid(anotherObject) = 2;
 */
var generateUID$1 = function () {
  var counter = 1;
  var map = new WeakMap();
  /**
   * @borrows {uid}
   */
  var uid = function (item, index) {
    if (typeof item === 'number' || typeof item === 'string') {
      return index ? "idx-" + index : "val-" + item;
    }
    if (!map.has(item)) {
      map.set(item, counter++);
      return uid(item);
    }
    return 'uid' + map.get(item);
  };
  return uid;
};var createSource = function (prefix) {
  if (prefix === void 0) {
    prefix = '';
  }
  return {
    value: 1,
    prefix: prefix,
    uid: generateUID$1()
  };
};
var counter = createSource();
var source = /*#__PURE__*/reactExports.createContext(createSource());
var getId = function (source) {
  return source.value++;
};
var getPrefix = function (source) {
  return source ? source.prefix : '';
};var generateUID = function (context) {
  var quartz = context || counter;
  var prefix = getPrefix(quartz);
  var id = getId(quartz);
  var uid = prefix + id;
  var gen = function (item) {
    return uid + quartz.uid(item);
  };
  return {
    uid: uid,
    gen: gen
  };
};
var useUIDState = function () {
  // @ts-ignore
  return reactExports.useState(generateUID(reactExports.useContext(source)));
};
/**
 * returns an uid generator
 * @see {@link UIDConsumer}
 * @see https://github.com/thearnica/react-uid#hooks-168
 * @example
 * const uid = useUIDSeed();
 * return (
 *  <>
 *    <label for={seed('email')}>Email: </label>
 *    <input id={seed('email')} name="email" />
 *    {data.map(item => <div key={seed(item)}>...</div>
 *  </>
 * )
 */
var useUIDSeed = function () {
  var gen = useUIDState()[0].gen;
  return gen;
};/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */
function useField(idPrefix) {
  const seed = useUIDSeed();
  const prefix = reactExports.useMemo(() => idPrefix || seed(`field_${'2.1.2'}`), [idPrefix, seed]);
  const inputId = `${prefix}--input`;
  const labelId = `${prefix}--label`;
  const hintId = `${prefix}--hint`;
  const messageId = `${prefix}--message`;
  const getLabelProps = function (_temp) {
    let {
      id = labelId,
      htmlFor = inputId,
      ...other
    } = _temp === void 0 ? {} : _temp;
    return {
      id,
      htmlFor,
      'data-garden-container-id': 'containers.field',
      'data-garden-container-version': '2.1.2',
      ...other
    };
  };
  const getInputProps = function (_temp2, _temp3) {
    let {
      id = inputId,
      ...other
    } = _temp2 === void 0 ? {} : _temp2;
    let {
      isDescribed = false,
      hasMessage = false
    } = _temp3 === void 0 ? {} : _temp3;
    return {
      id,
      'aria-labelledby': labelId,
      'aria-describedby': isDescribed || hasMessage ? [].concat(isDescribed ? hintId : [], hasMessage ? messageId : []).join(' ') : null,
      ...other
    };
  };
  const getHintProps = function (_temp4) {
    let {
      id = hintId,
      ...other
    } = _temp4 === void 0 ? {} : _temp4;
    return {
      id,
      ...other
    };
  };
  const getMessageProps = function (_temp5) {
    let {
      id = messageId,
      ...other
    } = _temp5 === void 0 ? {} : _temp5;
    return {
      id,
      ...other
    };
  };
  return {
    getLabelProps,
    getInputProps,
    getHintProps,
    getMessageProps
  };
}
({
  children: propTypesExports.func,
  render: propTypesExports.func,
  id: propTypesExports.string
});function mergeRefs(refs) {
  return function (value) {
    refs.forEach(function (ref) {
      if (typeof ref === "function") {
        ref(value);
      } else if (ref != null) {
        ref.current = value;
      }
    });
  };
}/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
  nativeMin = Math.min;

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function () {
  return root.Date.now();
};

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
    lastThis,
    maxWait,
    result,
    timerId,
    lastCallTime,
    lastInvokeTime = 0,
    leading = false,
    maxing = false,
    trailing = true;
  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }
  function invokeFunc(time) {
    var args = lastArgs,
      thisArg = lastThis;
    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }
  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }
  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
      timeSinceLastInvoke = time - lastInvokeTime,
      result = wait - timeSinceLastCall;
    return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
  }
  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
      timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return lastCallTime === undefined || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
  }
  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }
  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }
  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }
  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }
  function debounced() {
    var time = now(),
      isInvoking = shouldInvoke(time);
    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;
    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' || isObjectLike(value) && objectToString.call(value) == symbolTag;
}

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? other + '' : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
}
var lodash_debounce = debounce;/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */
function composeEventHandlers() {
  for (var _len = arguments.length, fns = new Array(_len), _key = 0; _key < _len; _key++) {
    fns[_key] = arguments[_key];
  }
  return function (event) {
    for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }
    return fns.some(function (fn) {
      fn && fn.apply(void 0, [event].concat(args));
      return event && event.defaultPrevented;
    });
  };
}
var KEYS = {
  ALT: 'Alt',
  ASTERISK: '*',
  BACKSPACE: 'Backspace',
  COMMA: ',',
  DELETE: 'Delete',
  DOWN: 'ArrowDown',
  END: 'End',
  ENTER: 'Enter',
  ESCAPE: 'Escape',
  HOME: 'Home',
  LEFT: 'ArrowLeft',
  NUMPAD_ADD: 'Add',
  NUMPAD_DECIMAL: 'Decimal',
  NUMPAD_DIVIDE: 'Divide',
  NUMPAD_ENTER: 'Enter',
  NUMPAD_MULTIPLY: 'Multiply',
  NUMPAD_SUBTRACT: 'Subtract',
  PAGE_DOWN: 'PageDown',
  PAGE_UP: 'PageUp',
  PERIOD: '.',
  RIGHT: 'ArrowRight',
  SHIFT: 'Shift',
  SPACE: ' ',
  TAB: 'Tab',
  UNIDENTIFIED: 'Unidentified',
  UP: 'ArrowUp'
};
var DocumentPosition;
(function (DocumentPosition) {
  DocumentPosition[DocumentPosition["DISCONNECTED"] = 1] = "DISCONNECTED";
  DocumentPosition[DocumentPosition["PRECEDING"] = 2] = "PRECEDING";
  DocumentPosition[DocumentPosition["FOLLOWING"] = 4] = "FOLLOWING";
  DocumentPosition[DocumentPosition["CONTAINS"] = 8] = "CONTAINS";
  DocumentPosition[DocumentPosition["CONTAINED_BY"] = 16] = "CONTAINED_BY";
  DocumentPosition[DocumentPosition["IMPLEMENTATION_SPECIFIC"] = 32] = "IMPLEMENTATION_SPECIFIC";
})(DocumentPosition || (DocumentPosition = {}));
var ContainerOrientation;
(function (ContainerOrientation) {
  ContainerOrientation["HORIZONTAL"] = "horizontal";
  ContainerOrientation["VERTICAL"] = "vertical";
})(ContainerOrientation || (ContainerOrientation = {}));
const SLIDER_MIN = 0;
const SLIDER_MAX = 100;
const SLIDER_STEP = 1;
function useSlider(_ref) {
  let {
    trackRef,
    minThumbRef,
    maxThumbRef,
    min = SLIDER_MIN,
    max = SLIDER_MAX,
    defaultMinValue,
    defaultMaxValue,
    minValue,
    maxValue,
    onChange = () => undefined,
    step = SLIDER_STEP,
    jump = step,
    disabled,
    rtl,
    environment
  } = _ref;
  const doc = environment || document;
  const [trackRect, setTrackRect] = reactExports.useState({
    width: 0
  });
  const init = function (initMinValue, initMaxValue) {
    if (initMinValue === void 0) {
      initMinValue = min;
    }
    if (initMaxValue === void 0) {
      initMaxValue = max;
    }
    const retVal = {
      minValue: initMinValue < min ? min : initMinValue,
      maxValue: initMaxValue > max ? max : initMaxValue
    };
    if (retVal.maxValue < min) {
      retVal.maxValue = min;
    }
    if (retVal.minValue > retVal.maxValue) {
      retVal.minValue = retVal.maxValue;
    }
    return retVal;
  };
  const [state, setState] = reactExports.useState(init(defaultMinValue, defaultMaxValue));
  const isControlled = minValue !== undefined && minValue !== null || maxValue !== undefined && maxValue !== null;
  const position = isControlled ? init(minValue, maxValue) : state;
  const setPosition = isControlled ? onChange : setState;
  reactExports.useEffect(() => {
    const handleResize = lodash_debounce(() => {
      if (trackRef.current) {
        setTrackRect(trackRef.current.getBoundingClientRect());
      }
    }, 100);
    handleResize();
    const win = doc.defaultView || window;
    win.addEventListener('resize', handleResize);
    return () => {
      win.removeEventListener('resize', handleResize);
      handleResize.cancel();
    };
  }, [doc, trackRef]);
  const getTrackPosition = reactExports.useCallback(event => {
    let retVal = undefined;
    if (trackRect) {
      const offset = rtl ? trackRect.left + trackRect.width : trackRect.left;
      const mouseX = (event.pageX - offset) * (rtl ? -1 : 1);
      const x = (max - min) * mouseX / trackRect.width;
      const value = min + parseInt(x, 10);
      retVal = Math.floor(value / step) * step;
    }
    return retVal;
  }, [max, min, trackRect, rtl, step]);
  const setThumbPosition = reactExports.useCallback(thumb => value => {
    if (!disabled) {
      let newMinValue = position.minValue;
      let newMaxValue = position.maxValue;
      if (thumb === 'min') {
        if (value < min) {
          newMinValue = min;
        } else if (value > position.maxValue) {
          newMinValue = position.maxValue;
        } else {
          newMinValue = value;
        }
      } else if (thumb === 'max') {
        if (value > max) {
          newMaxValue = max;
        } else if (value < position.minValue) {
          newMaxValue = position.minValue;
        } else {
          newMaxValue = value;
        }
      }
      if (!isNaN(newMinValue) && !isNaN(newMaxValue)) {
        setPosition({
          minValue: newMinValue,
          maxValue: newMaxValue
        });
      }
    }
  }, [disabled, max, min, position.maxValue, position.minValue, setPosition]);
  const getTrackProps = reactExports.useCallback(function (_temp) {
    let {
      onMouseDown,
      ...other
    } = _temp === void 0 ? {} : _temp;
    const handleMouseDown = event => {
      if (!disabled && event.button === 0) {
        const value = getTrackPosition(event);
        if (value !== undefined) {
          const minOffset = Math.abs(position.minValue - value);
          const maxOffset = Math.abs(position.maxValue - value);
          if (minOffset <= maxOffset) {
            minThumbRef.current && minThumbRef.current.focus();
            setThumbPosition('min')(value);
          } else {
            maxThumbRef.current && maxThumbRef.current.focus();
            setThumbPosition('max')(value);
          }
        }
      }
    };
    return {
      'data-garden-container-id': 'containers.slider.track',
      'data-garden-container-version': '0.1.2',
      'aria-disabled': disabled,
      onMouseDown: composeEventHandlers(onMouseDown, handleMouseDown),
      ...other
    };
  }, [disabled, getTrackPosition, maxThumbRef, minThumbRef, position.maxValue, position.minValue, setThumbPosition]);
  const getThumbProps = reactExports.useCallback(thumb => _ref2 => {
    let {
      onKeyDown,
      onMouseDown,
      onTouchStart,
      ...other
    } = _ref2;
    const handleKeyDown = event => {
      if (!disabled) {
        let value;
        switch (event.key) {
          case KEYS.RIGHT:
            value = (thumb === 'min' ? position.minValue : position.maxValue) + (rtl ? -step : step);
            break;
          case KEYS.UP:
            value = (thumb === 'min' ? position.minValue : position.maxValue) + step;
            break;
          case KEYS.LEFT:
            value = (thumb === 'min' ? position.minValue : position.maxValue) - (rtl ? -step : step);
            break;
          case KEYS.DOWN:
            value = (thumb === 'min' ? position.minValue : position.maxValue) - step;
            break;
          case KEYS.PAGE_UP:
            value = (thumb === 'min' ? position.minValue : position.maxValue) + jump;
            break;
          case KEYS.PAGE_DOWN:
            value = (thumb === 'min' ? position.minValue : position.maxValue) - jump;
            break;
          case KEYS.HOME:
            value = min;
            break;
          case KEYS.END:
            value = max;
            break;
        }
        if (value !== undefined) {
          event.preventDefault();
          event.stopPropagation();
          setThumbPosition(thumb)(value);
        }
      }
    };
    const handleMouseMove = event => {
      const value = getTrackPosition(event);
      if (value !== undefined) {
        setThumbPosition(thumb)(value);
      }
    };
    const handleTouchMove = event => {
      const value = getTrackPosition(event.targetTouches[0]);
      if (value !== undefined) {
        setThumbPosition(thumb)(value);
      }
    };
    const handleMouseUp = () => {
      doc.removeEventListener('mousemove', handleMouseMove);
      doc.removeEventListener('mouseup', handleMouseUp);
    };
    const handleTouchEnd = () => {
      doc.removeEventListener('touchend', handleTouchEnd);
      doc.removeEventListener('touchmove', handleTouchMove);
    };
    const handleMouseDown = event => {
      if (!disabled && event.button === 0) {
        event.stopPropagation();
        doc.addEventListener('mousemove', handleMouseMove);
        doc.addEventListener('mouseup', handleMouseUp);
        event.target && event.target.focus();
      }
    };
    const handleTouchStart = event => {
      if (!disabled) {
        event.stopPropagation();
        doc.addEventListener('touchmove', handleTouchMove);
        doc.addEventListener('touchend', handleTouchEnd);
        event.target && event.target.focus();
      }
    };
    return {
      'data-garden-container-id': 'containers.slider.thumb',
      'data-garden-container-version': '0.1.2',
      role: 'slider',
      tabIndex: disabled ? -1 : 0,
      'aria-valuemin': thumb === 'min' ? min : position.minValue,
      'aria-valuemax': thumb === 'min' ? position.maxValue : max,
      'aria-valuenow': thumb === 'min' ? position.minValue : position.maxValue,
      onKeyDown: composeEventHandlers(onKeyDown, handleKeyDown),
      onMouseDown: composeEventHandlers(onMouseDown, handleMouseDown),
      onTouchStart: composeEventHandlers(onTouchStart, handleTouchStart),
      ...other
    };
  }, [doc, disabled, getTrackPosition, jump, max, min, position.maxValue, position.minValue, rtl, step, setThumbPosition]);
  return reactExports.useMemo(() => ({
    getTrackProps,
    getMinThumbProps: getThumbProps('min'),
    getMaxThumbProps: getThumbProps('max'),
    trackRect,
    minValue: position.minValue,
    maxValue: position.maxValue
  }), [getTrackProps, getThumbProps, position.minValue, position.maxValue, trackRect]);
}
({
  children: propTypesExports.func,
  render: propTypesExports.func,
  trackRef: propTypesExports.any.isRequired,
  minThumbRef: propTypesExports.any.isRequired,
  maxThumbRef: propTypesExports.any.isRequired,
  environment: propTypesExports.any,
  defaultMinValue: propTypesExports.number,
  defaultMaxValue: propTypesExports.number,
  minValue: propTypesExports.number,
  maxValue: propTypesExports.number,
  onChange: propTypesExports.func,
  min: propTypesExports.number,
  max: propTypesExports.number,
  step: propTypesExports.number,
  jump: propTypesExports.number,
  disabled: propTypesExports.bool,
  rtl: propTypesExports.bool
});/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */
function _extends$t() {
  _extends$t = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends$t.apply(this, arguments);
}
const FieldContext$1 = /*#__PURE__*/reactExports.createContext(undefined);
const useFieldContext$1 = () => {
  const fieldContext = reactExports.useContext(FieldContext$1);
  return fieldContext;
};
const COMPONENT_ID$K = 'forms.field';
const StyledField = styled.div.attrs({
  'data-garden-id': COMPONENT_ID$K,
  'data-garden-version': '8.63.2'
}).withConfig({
  displayName: "StyledField",
  componentId: "sc-12gzfsu-0"
})(["position:relative;direction:", ";margin:0;border:0;padding:0;font-size:0;", ";"], props => props.theme.rtl ? 'rtl' : 'ltr', props => retrieveComponentStyles(COMPONENT_ID$K, props));
StyledField.defaultProps = {
  theme: DEFAULT_THEME
};
const COMPONENT_ID$J = 'forms.fieldset';
const StyledFieldset = styled(StyledField).attrs({
  as: 'fieldset',
  'data-garden-id': COMPONENT_ID$J,
  'data-garden-version': '8.63.2'
}).withConfig({
  displayName: "StyledFieldset",
  componentId: "sc-1vr4mxv-0"
})(["", "{margin-top:", "px;}", ";"], StyledField, props => props.theme.space.base * (props.isCompact ? 1 : 2), props => retrieveComponentStyles(COMPONENT_ID$J, props));
StyledFieldset.defaultProps = {
  theme: DEFAULT_THEME
};
const COMPONENT_ID$I = 'forms.input_label';
const StyledLabel = styled.label.attrs({
  'data-garden-id': COMPONENT_ID$I,
  'data-garden-version': '8.63.2'
}).withConfig({
  displayName: "StyledLabel",
  componentId: "sc-2utmsz-0"
})(["direction:", ";vertical-align:middle;line-height:", ";color:", ";font-size:", ";font-weight:", ";&[hidden]{display:", ";vertical-align:", ";text-indent:", ";font-size:", ";", ";}", ";"], props => props.theme.rtl && 'rtl', props => getLineHeight(props.theme.space.base * 5, props.theme.fontSizes.md), props => props.theme.colors.foreground, props => props.theme.fontSizes.md, props => props.isRegular ? props.theme.fontWeights.regular : props.theme.fontWeights.semibold, props => props.isRadio ? 'inline-block' : 'inline', props => props.isRadio && 'top', props => props.isRadio && '-100%', props => props.isRadio && '0', props => !props.isRadio && hideVisually(), props => retrieveComponentStyles(COMPONENT_ID$I, props));
StyledLabel.defaultProps = {
  theme: DEFAULT_THEME
};
const COMPONENT_ID$H = 'forms.fieldset_legend';
const StyledLegend = styled(StyledLabel).attrs({
  as: 'legend',
  'data-garden-id': COMPONENT_ID$H,
  'data-garden-version': '8.63.2'
}).withConfig({
  displayName: "StyledLegend",
  componentId: "sc-6s0zwq-0"
})(["padding:0;", ";"], props => retrieveComponentStyles(COMPONENT_ID$H, props));
StyledLegend.defaultProps = {
  theme: DEFAULT_THEME
};
const COMPONENT_ID$G = 'forms.input_hint';
const StyledHint = styled.div.attrs({
  'data-garden-id': COMPONENT_ID$G,
  'data-garden-version': '8.63.2'
}).withConfig({
  displayName: "StyledHint",
  componentId: "sc-17c2wu8-0"
})(["direction:", ";display:block;vertical-align:middle;line-height:", ";color:", ";font-size:", ";", ";"], props => props.theme.rtl && 'rtl', props => getLineHeight(props.theme.space.base * 5, props.theme.fontSizes.md), props => getColor('neutralHue', 600, props.theme), props => props.theme.fontSizes.md, props => retrieveComponentStyles(COMPONENT_ID$G, props));
StyledHint.defaultProps = {
  theme: DEFAULT_THEME
};
var _g$2, _circle$5;
function _extends$s() {
  _extends$s = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends$s.apply(this, arguments);
}
var SvgAlertErrorStroke = function SvgAlertErrorStroke(props) {
  return /*#__PURE__*/reactExports.createElement("svg", _extends$s({
    xmlns: "http://www.w3.org/2000/svg",
    width: 16,
    height: 16,
    focusable: "false",
    viewBox: "0 0 16 16",
    "aria-hidden": "true"
  }, props), _g$2 || (_g$2 = /*#__PURE__*/reactExports.createElement("g", {
    fill: "none",
    stroke: "currentColor"
  }, /*#__PURE__*/reactExports.createElement("circle", {
    cx: 7.5,
    cy: 8.5,
    r: 7
  }), /*#__PURE__*/reactExports.createElement("path", {
    strokeLinecap: "round",
    d: "M7.5 4.5V9"
  }))), _circle$5 || (_circle$5 = /*#__PURE__*/reactExports.createElement("circle", {
    cx: 7.5,
    cy: 12,
    r: 1,
    fill: "currentColor"
  })));
};
var _path$n, _circle$4;
function _extends$r() {
  _extends$r = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends$r.apply(this, arguments);
}
var SvgAlertWarningStroke = function SvgAlertWarningStroke(props) {
  return /*#__PURE__*/reactExports.createElement("svg", _extends$r({
    xmlns: "http://www.w3.org/2000/svg",
    width: 16,
    height: 16,
    focusable: "false",
    viewBox: "0 0 16 16",
    "aria-hidden": "true"
  }, props), _path$n || (_path$n = /*#__PURE__*/reactExports.createElement("path", {
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round",
    d: "M.88 13.77L7.06 1.86c.19-.36.7-.36.89 0l6.18 11.91c.17.33-.07.73-.44.73H1.32c-.37 0-.61-.4-.44-.73zM7.5 6v3.5"
  })), _circle$4 || (_circle$4 = /*#__PURE__*/reactExports.createElement("circle", {
    cx: 7.5,
    cy: 12,
    r: 1,
    fill: "currentColor"
  })));
};
var _g$1;
function _extends$q() {
  _extends$q = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends$q.apply(this, arguments);
}
var SvgCheckCircleStroke$1 = function SvgCheckCircleStroke(props) {
  return /*#__PURE__*/reactExports.createElement("svg", _extends$q({
    xmlns: "http://www.w3.org/2000/svg",
    width: 16,
    height: 16,
    focusable: "false",
    viewBox: "0 0 16 16",
    "aria-hidden": "true"
  }, props), _g$1 || (_g$1 = /*#__PURE__*/reactExports.createElement("g", {
    fill: "none",
    stroke: "currentColor"
  }, /*#__PURE__*/reactExports.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M4 9l2.5 2.5 5-5"
  }), /*#__PURE__*/reactExports.createElement("circle", {
    cx: 7.5,
    cy: 8.5,
    r: 7
  }))));
};
const MessageIcon = _ref => {
  let {
    children,
    validation,
    ...props
  } = _ref;
  let retVal;
  if (validation === 'error') {
    retVal = /*#__PURE__*/React.createElement(SvgAlertErrorStroke, props);
  } else if (validation === 'success') {
    retVal = /*#__PURE__*/React.createElement(SvgCheckCircleStroke$1, props);
  } else if (validation === 'warning') {
    retVal = /*#__PURE__*/React.createElement(SvgAlertWarningStroke, props);
  } else {
    retVal = /*#__PURE__*/React.cloneElement(reactExports.Children.only(children));
  }
  return retVal;
};
const COMPONENT_ID$F = 'forms.input_message_icon';
const StyledMessageIcon = styled(MessageIcon).attrs({
  'data-garden-id': COMPONENT_ID$F,
  'data-garden-version': '8.63.2',
  'aria-hidden': null
}).withConfig({
  displayName: "StyledMessageIcon",
  componentId: "sc-1ph2gba-0"
})(["width:", ";height:", ";", ";"], props => props.theme.iconSizes.md, props => props.theme.iconSizes.md, props => retrieveComponentStyles(COMPONENT_ID$F, props));
StyledMessageIcon.defaultProps = {
  theme: DEFAULT_THEME
};
const validationStyles = props => {
  const rtl = props.theme.rtl;
  const padding = math(`${props.theme.space.base} * 2px + ${props.theme.iconSizes.md}`);
  let color;
  if (props.validation === 'error') {
    color = getColor('dangerHue', 600, props.theme);
  } else if (props.validation === 'success') {
    color = getColor('successHue', 600, props.theme);
  } else if (props.validation === 'warning') {
    color = getColor('warningHue', 700, props.theme);
  } else {
    color = getColor('neutralHue', 700, props.theme);
  }
  return Ae(["padding-", ":", ";color:", ";"], rtl ? 'right' : 'left', props.validation && padding, color);
};
const COMPONENT_ID$E = 'forms.input_message';
const StyledMessage = styled.div.attrs({
  'data-garden-id': COMPONENT_ID$E,
  'data-garden-version': '8.63.2'
}).withConfig({
  displayName: "StyledMessage",
  componentId: "sc-30hgg7-0"
})(["direction:", ";display:inline-block;position:relative;vertical-align:middle;line-height:", ";font-size:", ";", ";& ", "{position:absolute;top:-1px;", ":0;}", ":not([hidden]) + &{display:block;margin-top:", ";}", ";"], props => props.theme.rtl && 'rtl', props => getLineHeight(props.theme.iconSizes.md, props.theme.fontSizes.sm), props => props.theme.fontSizes.sm, props => validationStyles(props), StyledMessageIcon, props => props.theme.rtl ? 'right' : 'left', StyledLabel, props => math(`${props.theme.space.base} * 1px`), props => retrieveComponentStyles(COMPONENT_ID$E, props));
StyledMessage.defaultProps = {
  theme: DEFAULT_THEME
};
const COMPONENT_ID$D = 'forms.input';
const isInvalid = validation => {
  return validation === 'warning' || validation === 'error';
};
const colorStyles$b = props => {
  const SHADE = 600;
  const placeholderColor = getColor('neutralHue', SHADE - 200, props.theme);
  let borderColor;
  let hoverBorderColor;
  let focusBorderColor;
  if (props.validation) {
    let hue;
    if (props.validation === 'success') {
      hue = 'successHue';
    } else if (props.validation === 'warning') {
      hue = 'warningHue';
    } else if (props.validation === 'error') {
      hue = 'dangerHue';
    }
    borderColor = getColor(hue, SHADE, props.theme);
    hoverBorderColor = borderColor;
    focusBorderColor = borderColor;
  } else {
    borderColor = getColor('neutralHue', SHADE - 300, props.theme);
    hoverBorderColor = getColor('primaryHue', SHADE, props.theme);
    focusBorderColor = hoverBorderColor;
  }
  const boxShadow = `
    ${props.focusInset ? 'inset' : ''}
    ${props.theme.shadows.md(rgba(focusBorderColor, 0.35))}`;
  const readOnlyBackgroundColor = getColor('neutralHue', SHADE - 500, props.theme);
  const readOnlyBorderColor = getColor('neutralHue', SHADE - 300, props.theme);
  const disabledBackgroundColor = readOnlyBackgroundColor;
  const disabledBorderColor = getColor('neutralHue', SHADE - 400, props.theme);
  const disabledForegroundColor = getColor('neutralHue', SHADE - 200, props.theme);
  let controlledBorderColor = borderColor;
  if (props.isFocused) {
    controlledBorderColor = focusBorderColor;
  }
  if (props.isHovered) {
    controlledBorderColor = hoverBorderColor;
  }
  return Ae(["border-color:", ";box-shadow:", ";background-color:", ";color:", ";&::placeholder{color:", ";}&[readonly],&[aria-readonly='true']{border-color:", ";background-color:", ";}&:hover{border-color:", ";}&:focus,&[data-garden-focus-visible='true']{border-color:", ";box-shadow:", ";}&:disabled,&[aria-disabled='true']{border-color:", ";background-color:", ";color:", ";}"], controlledBorderColor, !props.isBare && props.isFocused && boxShadow, props.isBare ? 'transparent' : props.theme.colors.background, props.theme.colors.foreground, placeholderColor, readOnlyBorderColor, !props.isBare && readOnlyBackgroundColor, hoverBorderColor, focusBorderColor, !props.isBare && boxShadow, disabledBorderColor, !props.isBare && disabledBackgroundColor, disabledForegroundColor);
};
const sizeStyles$f = props => {
  const fontSize = props.theme.fontSizes.md;
  const paddingHorizontal = `${props.theme.space.base * 3}px`;
  let height;
  let paddingVertical;
  let browseFontSize;
  let swatchHeight;
  if (props.isCompact) {
    height = `${props.theme.space.base * 8}px`;
    paddingVertical = `${props.theme.space.base * 1.5}px`;
    browseFontSize = math(`${props.theme.fontSizes.sm} - 1`);
    swatchHeight = `${props.theme.space.base * 6}px`;
  } else {
    height = `${props.theme.space.base * 10}px`;
    paddingVertical = `${props.theme.space.base * 2.5}px`;
    browseFontSize = props.theme.fontSizes.sm;
    swatchHeight = `${props.theme.space.base * 7}px`;
  }
  const lineHeight = math(`${height} - (${paddingVertical} * 2) - (${props.theme.borderWidths.sm} * 2)`);
  const padding = props.isBare ? '0' : `${em$1(paddingVertical, fontSize)} ${em$1(paddingHorizontal, fontSize)}`;
  const swatchMarginVertical = math(`(${lineHeight} - ${swatchHeight}) / 2`);
  const swatchMarginHorizontal = math(`${paddingVertical} + ${swatchMarginVertical} - ${paddingHorizontal}`);
  return Ae(["padding:", ";min-height:", ";line-height:", ";font-size:", ";&::-ms-browse{font-size:", ";}&[type='date'],&[type='datetime-local'],&[type='file'],&[type='month'],&[type='time'],&[type='week']{max-height:", ";}&[type='file']{line-height:1;}@supports (-ms-ime-align:auto){&[type='color']{padding:", ";}}&::-moz-color-swatch{margin-top:", ";margin-left:", ";width:calc(100% + ", ");height:", ";}&::-webkit-color-swatch{margin:", " ", ";}", ":not([hidden]) + &&,", " + &&,", " + &&,&& + ", ",&& + ", "{margin-top:", "px;}"], padding, props.isBare ? '1em' : height, getLineHeight(lineHeight, fontSize), fontSize, browseFontSize, height, props.isCompact ? '0 2px' : '1px 3px', swatchMarginVertical, swatchMarginHorizontal, math(`${swatchMarginHorizontal} * -2`), swatchHeight, swatchMarginVertical, swatchMarginHorizontal, StyledLabel, StyledHint, StyledMessage, StyledHint, StyledMessage, props.theme.space.base * (props.isCompact ? 1 : 2));
};
const StyledTextInput = styled.input.attrs(props => ({
  'data-garden-id': COMPONENT_ID$D,
  'data-garden-version': '8.63.2',
  'aria-invalid': isInvalid(props.validation)
})).withConfig({
  displayName: "StyledTextInput",
  componentId: "sc-k12n8x-0"
})(["appearance:none;transition:border-color 0.25s ease-in-out,box-shadow 0.1s ease-in-out,background-color 0.25s ease-in-out,color 0.25s ease-in-out,z-index 0.25s ease-in-out;direction:", ";border:", ";border-radius:", ";width:100%;box-sizing:border-box;vertical-align:middle;font-family:inherit;&::-ms-browse{border-radius:", ";}&::-ms-clear,&::-ms-reveal{display:none;}&::-moz-color-swatch{border:none;border-radius:", ";}&::-webkit-color-swatch{border:none;border-radius:", ";}&::-webkit-color-swatch-wrapper{padding:0;}&::-webkit-clear-button,&::-webkit-inner-spin-button,&::-webkit-search-cancel-button,&::-webkit-search-results-button{display:none;}&::-webkit-datetime-edit{direction:", ";line-height:1;}&::placeholder{opacity:1;}&:invalid{box-shadow:none;}&[type='file']::-ms-value{display:none;}@media screen and (min--moz-device-pixel-ratio:0){&[type='number']{appearance:textfield;}}", ";&:focus{outline:none;}", ";&:disabled{cursor:default;}", ";"], props => props.theme.rtl && 'rtl', props => props.isBare ? 'none' : props.theme.borders.sm, props => props.isBare ? '0' : props.theme.borderRadii.md, props => props.theme.borderRadii.sm, props => props.theme.borderRadii.sm, props => props.theme.borderRadii.sm, props => props.theme.rtl && 'rtl', props => sizeStyles$f(props), props => colorStyles$b(props), props => retrieveComponentStyles(COMPONENT_ID$D, props));
StyledTextInput.defaultProps = {
  theme: DEFAULT_THEME
};
const COMPONENT_ID$C = 'forms.textarea';
const hiddenStyles = `
  visibility: hidden;
  position: absolute;
  overflow: hidden;
  height: 0;
  top: 0;
  left: 0;
  transform: translateZ(0);
`;
const StyledTextarea = styled(StyledTextInput).attrs({
  as: 'textarea',
  'data-garden-id': COMPONENT_ID$C,
  'data-garden-version': '8.63.2'
}).withConfig({
  displayName: "StyledTextarea",
  componentId: "sc-wxschl-0"
})(["resize:", ";overflow:auto;", ";", ";"], props => props.isResizable ? 'vertical' : 'none', props => props.isHidden && hiddenStyles, props => retrieveComponentStyles(COMPONENT_ID$C, props));
StyledTextarea.defaultProps = {
  theme: DEFAULT_THEME
};
const COMPONENT_ID$B = 'forms.media_figure';
const colorStyles$a = props => {
  let shade = 600;
  if (props.isDisabled) {
    shade = 400;
  } else if (props.isHovered || props.isFocused) {
    shade = 700;
  }
  return Ae(["color:", ";"], getColor('neutralHue', shade, props.theme));
};
const sizeStyles$e = props => {
  const size = props.theme.iconSizes.md;
  const marginFirst = `1px ${props.theme.space.base * 2}px auto 0`;
  const marginLast = `1px 0 auto ${props.theme.space.base * 2}px`;
  let margin;
  if (props.position === 'start') {
    margin = props.theme.rtl ? marginLast : marginFirst;
  } else {
    margin = props.theme.rtl ? marginFirst : marginLast;
  }
  return Ae(["margin:", ";width:", ";height:", ";"], margin, size, size);
};
const StyledTextMediaFigure = styled(_ref => {
  let {
    children,
    position,
    isHovered,
    isFocused,
    isDisabled,
    isRotated,
    theme,
    ...props
  } = _ref;
  return /*#__PURE__*/React.cloneElement(reactExports.Children.only(children), props);
}).attrs({
  'data-garden-id': COMPONENT_ID$B,
  'data-garden-version': '8.63.2'
}).withConfig({
  displayName: "StyledTextMediaFigure",
  componentId: "sc-1qepknj-0"
})(["transform:", ";transition:transform 0.25s ease-in-out,color 0.25s ease-in-out;", ";", " ", ";"], props => props.isRotated && `rotate(${props.theme.rtl ? '-' : '+'}180deg)`, props => colorStyles$a(props), props => sizeStyles$e(props), props => retrieveComponentStyles(COMPONENT_ID$B, props));
StyledTextMediaFigure.defaultProps = {
  theme: DEFAULT_THEME
};
const COMPONENT_ID$A = 'forms.faux_input';
const StyledTextFauxInput = styled(StyledTextInput).attrs(props => ({
  as: 'div',
  'aria-readonly': props.isReadOnly,
  'aria-disabled': props.isDisabled,
  'data-garden-id': COMPONENT_ID$A,
  'data-garden-version': '8.63.2'
})).withConfig({
  displayName: "StyledTextFauxInput",
  componentId: "sc-yqw7j9-0"
})(["display:", ";align-items:", ";cursor:", ";overflow:hidden;& > ", "{vertical-align:", ";}& > ", "{flex-shrink:", ";}", ";"], props => props.mediaLayout ? 'inline-flex' : 'inline-block', props => props.mediaLayout && 'baseline', props => props.mediaLayout && !props.isDisabled ? 'text' : 'default', StyledTextInput, props => !props.mediaLayout && 'baseline', StyledTextMediaFigure, props => props.mediaLayout && '0', props => retrieveComponentStyles(COMPONENT_ID$A, props));
StyledTextFauxInput.defaultProps = {
  theme: DEFAULT_THEME
};
const COMPONENT_ID$z = 'forms.media_input';
const StyledTextMediaInput = styled(StyledTextInput).attrs({
  'data-garden-id': COMPONENT_ID$z,
  'data-garden-version': '8.63.2',
  isBare: true
}).withConfig({
  displayName: "StyledTextMediaInput",
  componentId: "sc-12i9xfi-0"
})(["flex-grow:1;", ";"], props => retrieveComponentStyles(COMPONENT_ID$z, props));
StyledTextMediaInput.defaultProps = {
  theme: DEFAULT_THEME
};
const COMPONENT_ID$y = 'forms.input_group';
const positionStyles = props => {
  const topMargin = `${props.theme.space.base * (props.isCompact ? 1 : 2)}px`;
  return Ae(["", ":not([hidden]) + &&,", " + &&,", " + &&,&& + ", ",&& + ", "{margin-top:", ";}& > ", "{position:relative;flex:1 1 auto;margin-top:0;margin-bottom:0;width:auto;min-width:0;}"], StyledLabel, StyledHint, StyledMessage, StyledHint, StyledMessage, topMargin, StyledTextInput);
};
const itemStyles = props => {
  const startDirection = props.theme.rtl ? 'right' : 'left';
  const endDirection = props.theme.rtl ? 'left' : 'right';
  return Ae(["& > *{z-index:-1;}& > ", ":disabled{z-index:-2;}& > ", ":hover,& > button:hover,& > ", "[data-garden-focus-visible],& > button[data-garden-focus-visible],& > ", ":active,& > button:active{z-index:1;}& > button:disabled{border-top-width:0;border-bottom-width:0;}& > *:not(:first-child){margin-", ":-", ";}& > *:first-child:not(:last-child){border-top-", "-radius:0;border-bottom-", "-radius:0;}& > *:last-child:not(:first-child){border-top-", "-radius:0;border-bottom-", "-radius:0;}& > *:not(:first-child):not(:last-child){border-radius:0;}"], StyledTextInput, StyledTextInput, StyledTextInput, StyledTextInput, startDirection, props.theme.borderWidths.sm, endDirection, endDirection, startDirection, startDirection);
};
const StyledInputGroup = styled.div.attrs({
  'data-garden-id': COMPONENT_ID$y,
  'data-garden-version': '8.63.2'
}).withConfig({
  displayName: "StyledInputGroup",
  componentId: "sc-kjh1f0-0"
})(["display:inline-flex;position:relative;flex-wrap:nowrap;align-items:stretch;z-index:0;width:100%;", ";", ";", ";"], props => positionStyles(props), props => itemStyles(props), props => retrieveComponentStyles(COMPONENT_ID$y, props));
StyledInputGroup.defaultProps = {
  theme: DEFAULT_THEME
};
const COMPONENT_ID$x = 'forms.radio_label';
const sizeStyles$d = props => {
  const size = props.theme.space.base * 4;
  const padding = size + props.theme.space.base * 2;
  const lineHeight = props.theme.space.base * 5;
  return Ae(["padding-", ":", "px;&[hidden]{padding-", ":", "px;line-height:", "px;}"], props.theme.rtl ? 'right' : 'left', padding, props.theme.rtl ? 'right' : 'left', size, lineHeight);
};
const StyledRadioLabel = styled(StyledLabel).attrs({
  'data-garden-id': COMPONENT_ID$x,
  'data-garden-version': '8.63.2',
  isRadio: true
}).withConfig({
  displayName: "StyledRadioLabel",
  componentId: "sc-1aq2e5t-0"
})(["display:inline-block;position:relative;cursor:pointer;", ";", ";"], props => sizeStyles$d(props), props => retrieveComponentStyles(COMPONENT_ID$x, props));
StyledRadioLabel.defaultProps = {
  theme: DEFAULT_THEME
};
const COMPONENT_ID$w = 'forms.checkbox_label';
const StyledCheckLabel = styled(StyledRadioLabel).attrs({
  'data-garden-id': COMPONENT_ID$w,
  'data-garden-version': '8.63.2'
}).withConfig({
  displayName: "StyledCheckLabel",
  componentId: "sc-x7nr1-0"
})(["", ";"], props => retrieveComponentStyles(COMPONENT_ID$w, props));
StyledCheckLabel.defaultProps = {
  theme: DEFAULT_THEME
};
const COMPONENT_ID$v = 'forms.radio_hint';
const StyledRadioHint = styled(StyledHint).attrs({
  'data-garden-id': COMPONENT_ID$v,
  'data-garden-version': '8.63.2'
}).withConfig({
  displayName: "StyledRadioHint",
  componentId: "sc-eo8twg-0"
})(["padding-", ":", ";", ";"], props => props.theme.rtl ? 'right' : 'left', props => math(`${props.theme.space.base} * 6px`), props => retrieveComponentStyles(COMPONENT_ID$v, props));
StyledRadioHint.defaultProps = {
  theme: DEFAULT_THEME
};
const COMPONENT_ID$u = 'forms.checkbox_hint';
const StyledCheckHint = styled(StyledRadioHint).attrs({
  'data-garden-id': COMPONENT_ID$u,
  'data-garden-version': '8.63.2'
}).withConfig({
  displayName: "StyledCheckHint",
  componentId: "sc-1kl8e8c-0"
})(["", ";"], props => retrieveComponentStyles(COMPONENT_ID$u, props));
StyledCheckHint.defaultProps = {
  theme: DEFAULT_THEME
};
const COMPONENT_ID$t = 'forms.radio';
const colorStyles$9 = props => {
  const SHADE = 600;
  const borderColor = getColor('neutralHue', SHADE - 300, props.theme);
  const backgroundColor = props.theme.colors.background;
  const iconColor = backgroundColor;
  const hoverBackgroundColor = getColor('primaryHue', SHADE, props.theme, 0.08);
  const hoverBorderColor = getColor('primaryHue', SHADE, props.theme);
  const focusBorderColor = hoverBorderColor;
  const activeBackgroundColor = getColor('primaryHue', SHADE, props.theme, 0.2);
  const activeBorderColor = focusBorderColor;
  const boxShadow = props.theme.shadows.md(rgba(focusBorderColor, 0.35));
  const checkedBorderColor = focusBorderColor;
  const checkedBackgroundColor = checkedBorderColor;
  const checkedHoverBorderColor = getColor('primaryHue', SHADE + 100, props.theme);
  const checkedHoverBackgroundColor = checkedHoverBorderColor;
  const checkedActiveBorderColor = getColor('primaryHue', SHADE + 200, props.theme);
  const checkedActiveBackgroundColor = checkedActiveBorderColor;
  const disabledBackgroundColor = getColor('neutralHue', SHADE - 400, props.theme);
  return Ae(["& ~ ", "::before{border-color:", ";background-color:", ";}& ~ ", " > svg{color:", ";}& ~ ", ":hover::before{border-color:", ";background-color:", ";}&[data-garden-focus-visible='true'] ~ ", "::before{border-color:", ";box-shadow:", ";}& ~ ", ":active::before{border-color:", ";background-color:", ";}&:checked ~ ", "::before{border-color:", ";background-color:", ";}&:enabled:checked ~ ", ":hover::before{border-color:", ";background-color:", ";}&:enabled:checked ~ ", ":active::before{border-color:", ";background-color:", ";}&:disabled ~ ", "::before{border-color:transparent;background-color:", ";}"], StyledRadioLabel, borderColor, backgroundColor, StyledRadioLabel, iconColor, StyledRadioLabel, hoverBorderColor, hoverBackgroundColor, StyledRadioLabel, focusBorderColor, boxShadow, StyledRadioLabel, activeBorderColor, activeBackgroundColor, StyledRadioLabel, checkedBorderColor, checkedBackgroundColor, StyledRadioLabel, checkedHoverBorderColor, checkedHoverBackgroundColor, StyledRadioLabel, checkedActiveBorderColor, checkedActiveBackgroundColor, StyledRadioLabel, disabledBackgroundColor);
};
const sizeStyles$c = props => {
  const lineHeight = `${props.theme.space.base * 5}px`;
  const size = `${props.theme.space.base * 4}px`;
  const top = math(`(${lineHeight} - ${size}) / 2`);
  const iconSize = props.theme.iconSizes.sm;
  const iconPosition = math(`(${size} - ${iconSize}) / 2`);
  const iconTop = math(`${iconPosition} + ${top}`);
  const marginTop = `${props.theme.space.base * (props.isCompact ? 1 : 2)}px`;
  return Ae(["top:", ";width:", ";height:", ";& ~ ", "::before{top:", ";background-size:", ";width:", ";height:", ";box-sizing:border-box;}& ~ ", " > svg{top:", ";", ":", ";width:", ";height:", ";}&& ~ ", " ~ ", "{margin-top:", ";}"], top, size, size, StyledRadioLabel, top, props.theme.iconSizes.sm, size, size, StyledRadioLabel, iconTop, props.theme.rtl ? 'right' : 'left', iconPosition, iconSize, iconSize, StyledRadioLabel, StyledMessage, marginTop);
};
const StyledRadioInput = styled.input.attrs({
  'data-garden-id': COMPONENT_ID$t,
  'data-garden-version': '8.63.2',
  type: 'radio'
}).withConfig({
  displayName: "StyledRadioInput",
  componentId: "sc-qsavpv-0"
})(["position:absolute;opacity:0;margin:0;& ~ ", "::before{position:absolute;", ":0;transition:border-color .25s ease-in-out,box-shadow .1s ease-in-out,background-color .25s ease-in-out,color .25s ease-in-out;border:", ";border-radius:50%;background-repeat:no-repeat;background-position:center;content:'';}& ~ ", " > svg{position:absolute;}", ";&:focus ~ ", "::before{outline:none;}& ~ ", ":active::before{transition:border-color 0.1s ease-in-out,background-color 0.1s ease-in-out,color 0.1s ease-in-out;}", ";&:disabled ~ ", "{cursor:default;}", ";"], StyledRadioLabel, props => props.theme.rtl ? 'right' : 'left', props => props.theme.borders.sm, StyledRadioLabel, props => sizeStyles$c(props), StyledRadioLabel, StyledRadioLabel, props => colorStyles$9(props), StyledRadioLabel, props => retrieveComponentStyles(COMPONENT_ID$t, props));
StyledRadioInput.defaultProps = {
  theme: DEFAULT_THEME
};
const COMPONENT_ID$s = 'forms.checkbox';
const colorStyles$8 = props => {
  const SHADE = 600;
  const indeterminateBorderColor = getColor('primaryHue', SHADE, props.theme);
  const indeterminateBackgroundColor = indeterminateBorderColor;
  const indeterminateActiveBorderColor = getColor('primaryHue', SHADE + 100, props.theme);
  const indeterminateActiveBackgroundColor = indeterminateActiveBorderColor;
  const indeterminateDisabledBackgroundColor = getColor('neutralHue', SHADE - 400, props.theme);
  return Ae(["&:indeterminate ~ ", "::before{border-color:", ";background-color:", ";}&:enabled:indeterminate ~ ", ":active::before{border-color:", ";background-color:", ";}&:disabled:indeterminate ~ ", "::before{border-color:transparent;background-color:", ";}"], StyledCheckLabel, indeterminateBorderColor, indeterminateBackgroundColor, StyledCheckLabel, indeterminateActiveBorderColor, indeterminateActiveBackgroundColor, StyledCheckLabel, indeterminateDisabledBackgroundColor);
};
const StyledCheckInput = styled(StyledRadioInput).attrs({
  'data-garden-id': COMPONENT_ID$s,
  'data-garden-version': '8.63.2',
  type: 'checkbox'
}).withConfig({
  displayName: "StyledCheckInput",
  componentId: "sc-176jxxe-0"
})(["& ~ ", "::before{border-radius:", ";}", ";", ";"], StyledCheckLabel, props => props.theme.borderRadii.md, props => colorStyles$8(props), props => retrieveComponentStyles(COMPONENT_ID$s, props));
StyledCheckInput.defaultProps = {
  theme: DEFAULT_THEME
};
const COMPONENT_ID$r = 'forms.radio_message';
const StyledRadioMessage = styled(StyledMessage).attrs({
  'data-garden-id': COMPONENT_ID$r,
  'data-garden-version': '8.63.2'
}).withConfig({
  displayName: "StyledRadioMessage",
  componentId: "sc-1pmi0q8-0"
})(["padding-", ":", ";", ";"], props => props.theme.rtl ? 'right' : 'left', props => math(`${props.theme.space.base} * 6px`), props => retrieveComponentStyles(COMPONENT_ID$r, props));
StyledRadioMessage.defaultProps = {
  theme: DEFAULT_THEME
};
const COMPONENT_ID$q = 'forms.checkbox_message';
const StyledCheckMessage = styled(StyledRadioMessage).attrs({
  'data-garden-id': COMPONENT_ID$q,
  'data-garden-version': '8.63.2'
}).withConfig({
  displayName: "StyledCheckMessage",
  componentId: "sc-s4p6kd-0"
})(["", ";"], props => retrieveComponentStyles(COMPONENT_ID$q, props));
StyledCheckMessage.defaultProps = {
  theme: DEFAULT_THEME
};
var _path$m;
function _extends$p() {
  _extends$p = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends$p.apply(this, arguments);
}
var SvgCheckSmFill = function SvgCheckSmFill(props) {
  return /*#__PURE__*/reactExports.createElement("svg", _extends$p({
    xmlns: "http://www.w3.org/2000/svg",
    width: 12,
    height: 12,
    focusable: "false",
    viewBox: "0 0 12 12",
    "aria-hidden": "true"
  }, props), _path$m || (_path$m = /*#__PURE__*/reactExports.createElement("path", {
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M3 6l2 2 4-4"
  })));
};
const COMPONENT_ID$p = 'forms.check_svg';
const StyledCheckSvg = styled(SvgCheckSmFill).attrs({
  'data-garden-id': COMPONENT_ID$p,
  'data-garden-version': '8.63.2'
}).withConfig({
  displayName: "StyledCheckSvg",
  componentId: "sc-fvxetk-0"
})(["transition:opacity 0.25 ease-in-out;opacity:0;pointer-events:none;", ":checked ~ ", " > &{opacity:1;}", ":indeterminate ~ ", " > &{opacity:0;}", ";"], StyledCheckInput, StyledCheckLabel, StyledCheckInput, StyledCheckLabel, props => retrieveComponentStyles(COMPONENT_ID$p, props));
StyledCheckSvg.defaultProps = {
  theme: DEFAULT_THEME
};
var _path$l;
function _extends$o() {
  _extends$o = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends$o.apply(this, arguments);
}
var SvgDashFill = function SvgDashFill(props) {
  return /*#__PURE__*/reactExports.createElement("svg", _extends$o({
    xmlns: "http://www.w3.org/2000/svg",
    width: 12,
    height: 12,
    focusable: "false",
    viewBox: "0 0 12 12",
    "aria-hidden": "true"
  }, props), _path$l || (_path$l = /*#__PURE__*/reactExports.createElement("path", {
    stroke: "currentColor",
    strokeLinecap: "round",
    strokeWidth: 2,
    d: "M3 6h6"
  })));
};
const COMPONENT_ID$o = 'forms.dash_svg';
const StyledDashSvg = styled(SvgDashFill).attrs({
  'data-garden-id': COMPONENT_ID$o,
  'data-garden-version': '8.63.2'
}).withConfig({
  displayName: "StyledDashSvg",
  componentId: "sc-z3vq71-0"
})(["transition:opacity 0.25 ease-in-out;opacity:0;pointer-events:none;", ":indeterminate ~ ", " > &{opacity:1;}", ";"], StyledCheckInput, StyledCheckLabel, props => retrieveComponentStyles(COMPONENT_ID$o, props));
StyledDashSvg.defaultProps = {
  theme: DEFAULT_THEME
};
const COMPONENT_ID$n = 'forms.file_upload';
const colorStyles$7 = props => {
  const baseColor = getColor('primaryHue', 600, props.theme);
  const hoverColor = getColor('primaryHue', 700, props.theme);
  const activeColor = getColor('primaryHue', 800, props.theme);
  const disabledBackgroundColor = getColor('neutralHue', 200, props.theme);
  const disabledForegroundColor = getColor('neutralHue', 400, props.theme);
  const boxShadow = `inset ${props.theme.shadows.md(rgba(baseColor, 0.35))}`;
  return Ae(["border-color:", ";background-color:", ";color:", ";&:hover{border-color:", ";background-color:", ";color:", ";}&[data-garden-focus-visible]{box-shadow:", ";}&:active{border-color:", ";background-color:", ";color:", ";}&[aria-disabled='true']{border-color:", ";background-color:", ";color:", ";}"], props.isDragging ? activeColor : getColor('neutralHue', 600, props.theme), props.isDragging && rgba(baseColor, 0.2), props.isDragging ? activeColor : baseColor, hoverColor, rgba(baseColor, 0.08), hoverColor, boxShadow, activeColor, rgba(baseColor, 0.2), activeColor, disabledForegroundColor, disabledBackgroundColor, disabledForegroundColor);
};
const sizeStyles$b = props => {
  const marginTop = `${props.theme.space.base * (props.isCompact ? 1 : 2)}px`;
  const paddingHorizontal = `${props.isCompact ? 2 : 4}em`;
  const paddingVertical = math(`${props.theme.space.base * (props.isCompact ? 2.5 : 5)} - ${props.theme.borderWidths.sm}`);
  const fontSize = props.theme.fontSizes.md;
  const lineHeight = getLineHeight(props.theme.space.base * 5, fontSize);
  return Ae(["padding:", " ", ";min-width:4em;line-height:", ";font-size:", ";", ":not([hidden]) + &&,", " + &&,", " + &&,&& + ", ",&& + ", "{margin-top:", ";}"], paddingVertical, paddingHorizontal, lineHeight, fontSize, StyledLabel, StyledHint, StyledMessage, StyledHint, StyledMessage, marginTop);
};
const StyledFileUpload = styled.div.attrs({
  'data-garden-id': COMPONENT_ID$n,
  'data-garden-version': '8.63.2'
}).withConfig({
  displayName: "StyledFileUpload",
  componentId: "sc-1rodjgn-0"
})(["display:flex;align-items:center;justify-content:center;box-sizing:border-box;direction:", ";transition:border-color 0.25s ease-in-out,box-shadow 0.1s ease-in-out,background-color 0.25s ease-in-out,color 0.25s ease-in-out;border:dashed ", ";border-radius:", ";cursor:pointer;text-align:center;user-select:none;", ";&:focus{outline:none;}&[aria-disabled='true']{cursor:default;}", ";", ";"], props => props.theme.rtl ? 'rtl' : 'ltr', props => props.theme.borderWidths.sm, props => props.theme.borderRadii.md, sizeStyles$b, colorStyles$7, props => retrieveComponentStyles(COMPONENT_ID$n, props));
StyledFileUpload.defaultProps = {
  theme: DEFAULT_THEME
};
const COMPONENT_ID$m$1 = 'forms.file.close';
const StyledFileClose = styled.button.attrs({
  'data-garden-id': COMPONENT_ID$m$1,
  'data-garden-version': '8.63.2'
}).withConfig({
  displayName: "StyledFileClose",
  componentId: "sc-1m31jbf-0"
})(["display:flex;flex-shrink:0;align-items:center;justify-content:center;transition:opacity 0.25s ease-in-out;opacity:0.8;border:none;background:transparent;cursor:pointer;color:", ";appearance:none;&:hover{opacity:0.9;}&:focus{outline:none;}", ";"], props => props.theme.colors.foreground, props => retrieveComponentStyles(COMPONENT_ID$m$1, props));
StyledFileClose.defaultProps = {
  theme: DEFAULT_THEME
};
const COMPONENT_ID$l$1 = 'forms.file';
const colorStyles$6 = props => {
  let borderColor;
  let focusBorderColor;
  let foregroundColor;
  if (props.validation === 'success') {
    borderColor = getColor('successHue', 600, props.theme);
    focusBorderColor = borderColor;
    foregroundColor = borderColor;
  } else if (props.validation === 'error') {
    borderColor = getColor('dangerHue', 600, props.theme);
    focusBorderColor = borderColor;
    foregroundColor = borderColor;
  } else {
    borderColor = getColor('neutralHue', 300, props.theme);
    focusBorderColor = getColor('primaryHue', 600, props.theme);
    foregroundColor = props.theme.colors.foreground;
  }
  const boxShadow = `
    ${props.focusInset ? 'inset' : ''}
    ${props.theme.shadows.md(rgba(focusBorderColor, 0.35))}`;
  return `
    border-color: ${borderColor};
    color: ${foregroundColor};

    &:focus {
      box-shadow: ${boxShadow};
      border-color: ${focusBorderColor};
    }
  `;
};
const sizeStyles$a = props => {
  const size = `${props.theme.space.base * (props.isCompact ? 7 : 10)}px`;
  const spacing = `${props.theme.space.base * (props.isCompact ? 2 : 3)}px`;
  const fontSize = props.theme.fontSizes.md;
  const lineHeight = getLineHeight(props.theme.space.base * 5, fontSize);
  return `
    box-sizing: border-box;
    border: ${props.theme.borders.sm};
    border-radius: ${props.theme.borderRadii.md};
    padding: 0 ${spacing};
    height: ${size};
    line-height: ${lineHeight};
    font-size: ${fontSize};

    & > span {
      width: 100%;
    }

    & > ${StyledFileClose} {
      width: ${size};
      height: ${size};
      margin-${props.theme.rtl ? 'left' : 'right'}: -${spacing};
    }
  `;
};
const StyledFile = styled.div.attrs({
  'data-garden-id': COMPONENT_ID$l$1,
  'data-garden-version': '8.63.2'
}).withConfig({
  displayName: "StyledFile",
  componentId: "sc-195lzp1-0"
})(["display:flex;position:relative;flex-wrap:nowrap;align-items:center;", ";&:focus{outline:none;}", ";& > span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}& > [role='progressbar']{position:absolute;bottom:0;left:0;transition:opacity 0.2s ease-in-out;margin:0;border-top-left-radius:0;border-top-right-radius:0;width:100%;& > div{border-top-", "-radius:0;}}& > [role='progressbar'][aria-valuenow='0'],& > [role='progressbar'][aria-valuenow='100']{opacity:0;}", ";"], sizeStyles$a, colorStyles$6, props => props.theme.rtl ? 'right' : 'left', props => retrieveComponentStyles(COMPONENT_ID$l$1, props));
StyledFile.defaultProps = {
  theme: DEFAULT_THEME
};
const COMPONENT_ID$k$1 = 'forms.file.delete';
const StyledFileDelete = styled(StyledFileClose).attrs({
  'data-garden-id': COMPONENT_ID$k$1,
  'data-garden-version': '8.63.2'
}).withConfig({
  displayName: "StyledFileDelete",
  componentId: "sc-a8nnhx-0"
})(["color:", ";", ";"], props => getColor('dangerHue', 600, props.theme), props => retrieveComponentStyles(COMPONENT_ID$k$1, props));
StyledFileDelete.defaultProps = {
  theme: DEFAULT_THEME
};
const COMPONENT_ID$j$1 = 'forms.file.icon';
const StyledFileIcon = styled(_ref => {
  let {
    children,
    isCompact,
    theme,
    ...props
  } = _ref;
  return /*#__PURE__*/React.cloneElement(reactExports.Children.only(children), props);
}).attrs({
  'data-garden-id': COMPONENT_ID$j$1,
  'data-garden-version': '8.63.2'
}).withConfig({
  displayName: "StyledFileIcon",
  componentId: "sc-7b3q0c-0"
})(["flex-shrink:0;width:", ";margin-", ":", "px;", ";"], props => props.isCompact ? props.theme.iconSizes.sm : props.theme.iconSizes.md, props => props.theme.rtl ? 'left' : 'right', props => props.theme.space.base * 2, props => retrieveComponentStyles(COMPONENT_ID$j$1, props));
StyledFileIcon.defaultProps = {
  theme: DEFAULT_THEME
};
const COMPONENT_ID$i$1 = 'forms.file_list';
const StyledFileList = styled.ul.attrs({
  'data-garden-id': COMPONENT_ID$i$1,
  'data-garden-version': '8.63.2'
}).withConfig({
  displayName: "StyledFileList",
  componentId: "sc-gbahjg-0"
})(["margin:0;padding:0;list-style:none;", ";"], props => retrieveComponentStyles(COMPONENT_ID$i$1, props));
StyledFileList.defaultProps = {
  theme: DEFAULT_THEME
};
const COMPONENT_ID$h$1 = 'forms.file_list.item';
const StyledFileListItem = styled.li.attrs({
  'data-garden-id': COMPONENT_ID$h$1,
  'data-garden-version': '8.63.2'
}).withConfig({
  displayName: "StyledFileListItem",
  componentId: "sc-1ova3lo-0"
})(["&:not(:first-child),", " ~ ", " > &:first-child{margin-top:", "px;}", ";"], StyledFileUpload, StyledFileList, props => props.theme.space.base * 2, props => retrieveComponentStyles(COMPONENT_ID$h$1, props));
StyledFileListItem.defaultProps = {
  theme: DEFAULT_THEME
};
var _circle$3;
function _extends$n() {
  _extends$n = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends$n.apply(this, arguments);
}
var SvgCircleSmFill$1 = function SvgCircleSmFill(props) {
  return /*#__PURE__*/reactExports.createElement("svg", _extends$n({
    xmlns: "http://www.w3.org/2000/svg",
    width: 12,
    height: 12,
    focusable: "false",
    viewBox: "0 0 12 12",
    "aria-hidden": "true"
  }, props), _circle$3 || (_circle$3 = /*#__PURE__*/reactExports.createElement("circle", {
    cx: 6,
    cy: 6,
    r: 2,
    fill: "currentColor"
  })));
};
const COMPONENT_ID$g$1 = 'forms.radio_svg';
const StyledRadioSvg = styled(SvgCircleSmFill$1).attrs({
  'data-garden-id': COMPONENT_ID$g$1,
  'data-garden-version': '8.63.2'
}).withConfig({
  displayName: "StyledRadioSvg",
  componentId: "sc-1r1qtr1-0"
})(["transition:opacity 0.25 ease-in-out;opacity:0;", ":checked ~ ", " > &{opacity:1;}", ";"], StyledRadioInput, StyledRadioLabel, props => retrieveComponentStyles(COMPONENT_ID$g$1, props));
StyledRadioSvg.defaultProps = {
  theme: DEFAULT_THEME
};
const COMPONENT_ID$f$1 = 'forms.toggle_label';
const sizeStyles$9 = props => {
  const size = props.theme.space.base * 10;
  const padding = size + props.theme.space.base * 2;
  return Ae(["padding-", ":", "px;&[hidden]{padding-", ":", "px;}"], props.theme.rtl ? 'right' : 'left', padding, props.theme.rtl ? 'right' : 'left', size);
};
const StyledToggleLabel = styled(StyledCheckLabel).attrs({
  'data-garden-id': COMPONENT_ID$f$1,
  'data-garden-version': '8.63.2'
}).withConfig({
  displayName: "StyledToggleLabel",
  componentId: "sc-e0asdk-0"
})(["", ";", ";"], props => sizeStyles$9(props), props => retrieveComponentStyles(COMPONENT_ID$f$1, props));
StyledToggleLabel.defaultProps = {
  theme: DEFAULT_THEME
};
const COMPONENT_ID$e$1 = 'forms.toggle_hint';
const StyledToggleHint = styled(StyledHint).attrs({
  'data-garden-id': COMPONENT_ID$e$1,
  'data-garden-version': '8.63.2'
}).withConfig({
  displayName: "StyledToggleHint",
  componentId: "sc-nziggu-0"
})(["padding-", ":", ";", ";"], props => props.theme.rtl ? 'right' : 'left', props => math(`${props.theme.space.base} * 12px`), props => retrieveComponentStyles(COMPONENT_ID$e$1, props));
StyledToggleHint.defaultProps = {
  theme: DEFAULT_THEME
};
const COMPONENT_ID$d$1 = 'forms.toggle';
const colorStyles$5 = props => {
  const SHADE = 600;
  const backgroundColor = getColor('neutralHue', SHADE - 100, props.theme);
  const hoverBackgroundColor = getColor('neutralHue', SHADE, props.theme);
  const activeBackgroundColor = getColor('neutralHue', SHADE + 100, props.theme);
  return Ae(["& ~ ", "::before{background-color:", ";}&:enabled ~ ", ":hover::before{background-color:", ";}&:enabled ~ ", ":active::before{background-color:", ";}"], StyledToggleLabel, backgroundColor, StyledToggleLabel, hoverBackgroundColor, StyledToggleLabel, activeBackgroundColor);
};
const sizeStyles$8 = props => {
  const height = `${props.theme.space.base * 5}px`;
  const width = `${props.theme.space.base * 10}px`;
  const iconSize = props.theme.iconSizes.md;
  const iconPosition = math(`(${height} - ${iconSize}) / 2`);
  const checkedIconPosition = math(`${width} - ${iconSize} - ${iconPosition}`);
  return Ae(["top:0;width:", ";height:", ";& ~ ", "::before{width:", ";height:", ";}& ~ ", " > svg{top:", ";", ":", ";width:", ";height:", ";}&:checked ~ ", " > svg{", ":", ";}"], width, height, StyledToggleLabel, width, height, StyledToggleLabel, iconPosition, props.theme.rtl ? 'right' : 'left', iconPosition, iconSize, iconSize, StyledToggleLabel, props.theme.rtl ? 'right' : 'left', checkedIconPosition);
};
const StyledToggleInput = styled(StyledCheckInput).attrs({
  'data-garden-id': COMPONENT_ID$d$1,
  'data-garden-version': '8.63.2'
}).withConfig({
  displayName: "StyledToggleInput",
  componentId: "sc-sgp47s-0"
})(["& ~ ", "::before{top:0;transition:box-shadow .1s ease-in-out,background-color .15s ease-in-out,color .25s ease-in-out;border:none;border-radius:100px;}", ";", ";", ";"], StyledToggleLabel, props => sizeStyles$8(props), props => colorStyles$5(props), props => retrieveComponentStyles(COMPONENT_ID$d$1, props));
StyledToggleInput.defaultProps = {
  theme: DEFAULT_THEME
};
const COMPONENT_ID$c$1 = 'forms.toggle_message';
const StyledToggleMessage = styled(StyledMessage).attrs({
  'data-garden-id': COMPONENT_ID$c$1,
  'data-garden-version': '8.63.2'
}).withConfig({
  displayName: "StyledToggleMessage",
  componentId: "sc-13vuvl1-0"
})(["padding-", ":", ";& ", "{", ":", ";}", ";"], props => props.theme.rtl ? 'right' : 'left', props => math(`${props.theme.space.base} * 12px`), StyledMessageIcon, props => props.theme.rtl ? 'right' : 'left', props => math(`${props.theme.space.base} * 10px - ${props.theme.iconSizes.md}`), props => retrieveComponentStyles(COMPONENT_ID$c$1, props));
StyledToggleMessage.defaultProps = {
  theme: DEFAULT_THEME
};
var _circle$2;
function _extends$m() {
  _extends$m = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends$m.apply(this, arguments);
}
var SvgCircleSmFill = function SvgCircleSmFill(props) {
  return /*#__PURE__*/reactExports.createElement("svg", _extends$m({
    xmlns: "http://www.w3.org/2000/svg",
    width: 16,
    height: 16,
    focusable: "false",
    viewBox: "0 0 16 16",
    "aria-hidden": "true"
  }, props), _circle$2 || (_circle$2 = /*#__PURE__*/reactExports.createElement("circle", {
    cx: 8,
    cy: 8,
    r: 6,
    fill: "currentColor"
  })));
};
const COMPONENT_ID$b$1 = 'forms.toggle_svg';
const StyledToggleSvg = styled(SvgCircleSmFill).attrs({
  'data-garden-id': COMPONENT_ID$b$1,
  'data-garden-version': '8.63.2'
}).withConfig({
  displayName: "StyledToggleSvg",
  componentId: "sc-162xbyx-0"
})(["transition:all 0.15s ease-in-out;", ";"], props => retrieveComponentStyles(COMPONENT_ID$b$1, props));
StyledToggleSvg.defaultProps = {
  theme: DEFAULT_THEME
};
const COMPONENT_ID$a$1 = 'forms.select';
const colorStyles$4 = props => {
  const color = getColor('neutralHue', 700, props.theme);
  return Ae(["&:hover + ", ",&:focus + ", ",&[data-garden-focus-visible='true'] + ", "{color:", ";}"], StyledTextMediaFigure, StyledTextMediaFigure, StyledTextMediaFigure, color);
};
const sizeStyles$7 = props => {
  const padding = math(`${props.theme.iconSizes.md} + ${props.theme.space.base * 5}`);
  const iconVerticalPosition = `${props.theme.space.base * (props.isCompact ? 1.5 : 2.5) + 1}px`;
  const iconHorizontalPosition = `${props.theme.space.base * 3}px`;
  return Ae(["padding-", ":", ";& + ", "{top:", ";", ":", ";}"], props.theme.rtl ? 'left' : 'right', !props.isBare && padding, StyledTextMediaFigure, iconVerticalPosition, props.theme.rtl ? 'left' : 'right', iconHorizontalPosition);
};
const StyledSelect$1 = styled(StyledTextInput).attrs({
  'data-garden-id': COMPONENT_ID$a$1,
  'data-garden-version': '8.63.2',
  as: 'select'
}).withConfig({
  displayName: "StyledSelect",
  componentId: "sc-8xdxpt-0"
})(["cursor:pointer;text-overflow:ellipsis;", ";", ";&::-ms-expand{display:none;}&::-ms-value{background-color:transparent;color:inherit;}&:-moz-focusring{transition:none;text-shadow:0 0 0 ", ";color:transparent;}& + ", "{position:absolute;pointer-events:none;}"], props => sizeStyles$7(props), props => colorStyles$4(props), props => props.theme.colors.foreground, StyledTextMediaFigure);
StyledSelect$1.defaultProps = {
  theme: DEFAULT_THEME
};
const COMPONENT_ID$9$1 = 'forms.select_wrapper';
const StyledSelectWrapper = styled(StyledTextFauxInput).attrs({
  'data-garden-id': COMPONENT_ID$9$1,
  'data-garden-version': '8.63.2',
  isBare: true
}).withConfig({
  displayName: "StyledSelectWrapper",
  componentId: "sc-i7b6hw-0"
})(["position:relative;overflow:visible;"]);
StyledSelectWrapper.defaultProps = {
  theme: DEFAULT_THEME
};
const COMPONENT_ID$8$1 = 'forms.range';
const thumbStyles = function (styles) {
  let modifier = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  return `
    &${modifier}::-moz-range-thumb {
      ${styles}
    }

    &${modifier}::-ms-thumb {
      ${styles}
    }

    &${modifier}::-webkit-slider-thumb {
      ${styles}
    }
  `;
};
const trackStyles = function (styles) {
  let modifier = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  return `
    &${modifier}::-moz-range-track {
      ${styles}
    }

    &${modifier}::-ms-track {
      ${styles}
    }

    &${modifier}::-webkit-slider-runnable-track {
      ${styles}
    }
  `;
};
const trackLowerStyles = function (styles) {
  let modifier = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  return `
    &${modifier}::-moz-range-progress {
      ${styles}
    }

    &${modifier}::-ms-fill-lower {
      ${styles}
    }
  `;
};
const colorStyles$3 = props => {
  const SHADE = 600;
  const thumbBackgroundColor = getColor('primaryHue', SHADE, props.theme);
  const thumbBorderColor = thumbBackgroundColor;
  const thumbBoxShadow = props.theme.shadows.lg(math(`${props.theme.space.base} * 1px`), math(`${props.theme.space.base} * 2px`), getColor('neutralHue', SHADE + 200, props.theme, 0.24));
  const thumbActiveBackgroundColor = getColor('primaryHue', SHADE + 100, props.theme);
  const thumbActiveBorderColor = thumbBorderColor;
  const thumbDisabledBackgroundColor = getColor('neutralHue', SHADE - 300, props.theme);
  const thumbDisabledBorderColor = thumbDisabledBackgroundColor;
  const thumbFocusBoxShadow = props.theme.shadows.md(getColor('primaryHue', SHADE, props.theme, 0.35));
  const thumbHoverBackgroundColor = thumbActiveBackgroundColor;
  const thumbHoverBorderColor = thumbHoverBackgroundColor;
  const trackBackgroundColor = getColor('neutralHue', SHADE - 400, props.theme);
  const trackLowerBackgroundColor = props.hasLowerTrack ? thumbBackgroundColor : '';
  const trackBackgroundImage = props.hasLowerTrack ? `linear-gradient(${trackLowerBackgroundColor}, ${trackLowerBackgroundColor})` : '';
  const trackDisabledLowerBackgroundColor = props.hasLowerTrack ? thumbDisabledBackgroundColor : '';
  const trackDisabledBackgroundImage = props.hasLowerTrack ? `linear-gradient(${trackDisabledLowerBackgroundColor}, ${trackDisabledLowerBackgroundColor})` : '';
  return Ae(["", " ", " ", " ", " ", " ", " ", " ", " ", ""], trackStyles(`
      background-color: ${trackBackgroundColor};
      background-image: ${trackBackgroundImage}; /* provide means for styling lower range on WebKit */
    `), thumbStyles(`
      border-color: ${thumbBorderColor};
      box-shadow: ${thumbBoxShadow};
      background-color: ${thumbBackgroundColor};
    `), trackLowerStyles(`
      background-color: ${trackLowerBackgroundColor};
    `), thumbStyles(`
        transition:
          border-color .25s ease-in-out,
          background-color .25s ease-in-out;
        border-color: ${thumbHoverBorderColor};
        background-color: ${thumbHoverBackgroundColor};
      `, ':hover'), thumbStyles(`
        box-shadow: ${thumbFocusBoxShadow};
      `, '[data-garden-focus-visible="true"]'), thumbStyles(`
        border-color: ${thumbActiveBorderColor};
        background-color: ${thumbActiveBackgroundColor}
      `, ':active'), trackStyles(`
        background-image: ${trackDisabledBackgroundImage};
      `, ':disabled'), thumbStyles(`
        border-color: ${thumbDisabledBorderColor};
        box-shadow: none;
        background-color: ${thumbDisabledBackgroundColor};
      `, ':disabled'), trackLowerStyles(`
        background-color: ${trackDisabledLowerBackgroundColor}
      `, ':disabled'));
};
const sizeStyles$6 = props => {
  const thumbSize = math(`${props.theme.space.base} * 5px`);
  const trackHeight = math(`${props.theme.space.base} * 1.5px`);
  const trackBorderRadius = trackHeight;
  const trackMargin = math(`(${thumbSize} - ${trackHeight}) / 2 + ${props.theme.shadowWidths.md}`);
  const thumbMargin = math(`(${trackHeight} - ${thumbSize}) / 2`);
  return Ae(["", ":not([hidden]) + &,", " + &,", " + &,& + ", ",& + ", "{margin-top:", ";}", ";", " ", ""], StyledLabel, StyledHint, StyledMessage, StyledHint, StyledMessage, math(`${props.theme.space.base} * 2px`), trackStyles(`
      margin: ${trackMargin} 0;
      border-radius: ${trackBorderRadius};
      height: ${trackHeight};
    `), thumbStyles(`
      margin: ${thumbMargin} 0; /* reset for IE */
      width: ${thumbSize};
      height: ${thumbSize};
    `), trackLowerStyles(`
      border-top-${props.theme.rtl ? 'right' : 'left'}-radius: ${trackBorderRadius};
      border-bottom-${props.theme.rtl ? 'right' : 'left'}-radius: ${trackBorderRadius};
      height: ${trackHeight};
    `));
};
const StyledRangeInput = styled.input.attrs(props => ({
  'data-garden-id': COMPONENT_ID$8$1,
  'data-garden-version': '8.63.2',
  type: 'range',
  style: {
    backgroundSize: props.hasLowerTrack && props.backgroundSize
  }
})).withConfig({
  displayName: "StyledRangeInput",
  componentId: "sc-1iv2yqp-0"
})(["appearance:none;direction:", ";margin:0;background-color:inherit;cursor:pointer;padding:0;width:100%;vertical-align:middle;", " &::-webkit-slider-container,&::-webkit-slider-runnable-track{background-size:inherit;}", ";", " ", ";&::-moz-focus-outer{border:0;}&::-ms-tooltip{display:none;}&:focus{outline:none;}&:disabled{cursor:default;}", ";"], props => props.theme.rtl && 'rtl', props => trackStyles(`
      appearance: none;
      border-color: transparent; /* reset for IE */
      background-repeat: repeat-y;
      background-size: 0;
      background-position: ${props.theme.rtl ? '100% 100%' : '0% 0%'};
      width: 99.8%; /* fix for IE which cuts off the upper track's border radius */
      color: transparent; /* reset for IE */
      box-sizing: border-box; /* reset for IE */
    `), props => sizeStyles$6(props), props => thumbStyles(`
      appearance: none;
      transition: box-shadow .1s ease-in-out;
      border: ${props.theme.borders.md};
      border-radius: 100%;
      box-sizing: border-box;
    `), props => colorStyles$3(props), props => retrieveComponentStyles(COMPONENT_ID$8$1, props));
StyledRangeInput.defaultProps = {
  backgroundSize: '0%',
  hasLowerTrack: true,
  theme: DEFAULT_THEME
};
const COMPONENT_ID$7$1 = 'forms.slider';
const StyledSlider = styled.div.attrs({
  'data-garden-id': COMPONENT_ID$7$1,
  'data-garden-version': '8.63.2'
}).withConfig({
  displayName: "StyledSlider",
  componentId: "sc-1di437a-0"
})(["display:block;position:relative;z-index:0;cursor:pointer;height:", ";&[aria-disabled='true']{cursor:default;}", ":not([hidden]) + &,", " + &,", " + &,& + ", ",& + ", "{margin-top:", ";}", ";"], props => math(`(${props.theme.space.base} * 5px) + (${props.theme.shadowWidths.md} * 2)`), StyledLabel, StyledHint, StyledMessage, StyledHint, StyledMessage, props => math(`${props.theme.space.base} * 2px`), props => retrieveComponentStyles(COMPONENT_ID$7$1, props));
StyledSlider.defaultProps = {
  theme: DEFAULT_THEME
};
const COMPONENT_ID$6$1 = 'forms.slider_thumb';
const colorStyles$2 = props => {
  const SHADE = 600;
  const backgroundColor = getColor('primaryHue', SHADE, props.theme);
  const borderColor = backgroundColor;
  const boxShadow = props.theme.shadows.lg(math(`${props.theme.space.base} * 1px`), math(`${props.theme.space.base} * 2px`), getColor('neutralHue', SHADE + 200, props.theme, 0.24));
  const activeBackgroundColor = getColor('primaryHue', SHADE + 100, props.theme);
  const activeBorderColor = borderColor;
  const hoverBackgroundColor = activeBackgroundColor;
  const hoverBorderColor = hoverBackgroundColor;
  const focusBoxShadow = props.theme.shadows.md(getColor('primaryHue', SHADE, props.theme, 0.35));
  const disabledBackgroundColor = getColor('neutralHue', SHADE - 300, props.theme);
  const disabledBorderColor = disabledBackgroundColor;
  return Ae(["border-color:", ";box-shadow:", ";background-color:", ";&[data-garden-focus-visible='true']{box-shadow:", ";}&:hover,&[data-garden-hover='true']{border-color:", ";background-color:", ";}&:active,&[data-garden-active='true']{border-color:", ";background-color:", ";}&[aria-disabled='true']{border-color:", ";box-shadow:none;background-color:", ";}"], borderColor, boxShadow, backgroundColor, focusBoxShadow, hoverBorderColor, hoverBackgroundColor, activeBorderColor, activeBackgroundColor, disabledBorderColor, disabledBackgroundColor);
};
const sizeStyles$5 = props => {
  const size = math(`${props.theme.space.base} * 5px`);
  const marginTop = math(`${size} / -2`);
  return Ae(["margin-top:", ";width:", ";height:", ";"], marginTop, size, size);
};
const StyledSliderThumb = styled.div.attrs(props => ({
  'data-garden-id': COMPONENT_ID$6$1,
  'data-garden-version': '8.63.2',
  'aria-disabled': props.isDisabled
})).withConfig({
  displayName: "StyledSliderThumb",
  componentId: "sc-yspbwa-0"
})(["appearance:none;position:absolute;top:50%;", ":", ";transition:border-color 0.25s ease-in-out,box-shadow 0.1s ease-in-out,background-color 0.25s ease-in-out;z-index:1;border:", ";border-radius:100%;cursor:inherit;box-sizing:border-box;font-size:0;", ";&:focus{outline:none;}", ";", ";"], props => props.theme.rtl ? 'right' : 'left', props => math(`${props.position} * 1px`), props => props.theme.borders.md, props => sizeStyles$5(props), props => colorStyles$2(props), props => retrieveComponentStyles(COMPONENT_ID$6$1, props));
StyledSliderThumb.defaultProps = {
  position: 0,
  theme: DEFAULT_THEME
};
const COMPONENT_ID$5$1 = 'forms.slider_track';
const colorStyles$1 = props => {
  const SHADE = 600;
  const backgroundColor = getColor('neutralHue', SHADE - 400, props.theme);
  const backgroundImageColor = getColor('primaryHue', SHADE, props.theme);
  const disabledBackgroundColor = getColor('neutralHue', SHADE - 300, props.theme);
  return Ae(["background-color:", ";background-image:linear-gradient(", ",", ");&[aria-disabled='true']{background-image:linear-gradient(", ",", ");}"], backgroundColor, backgroundImageColor, backgroundImageColor, disabledBackgroundColor, disabledBackgroundColor);
};
const sizeStyles$4 = props => {
  const height = math(`${props.theme.space.base} * 1.5px`);
  const backgroundPosition = math(`${props.backgroundPosition} * 1px`);
  const backgroundSize = math(`${props.backgroundSize} * 1px`);
  const borderRadius = height;
  const marginTop = math(`${height} / -2`);
  const padding = math(`${props.theme.space.base} * 2.5px`);
  return Ae(["margin-top:", ";border-radius:", ";background-position:", ";background-size:", ";padding:0 ", ";"], marginTop, borderRadius, backgroundPosition, backgroundSize, padding);
};
const StyledSliderTrack = styled.div.attrs(props => ({
  'data-garden-id': COMPONENT_ID$5$1,
  'data-garden-version': '8.63.2',
  'aria-disabled': props.isDisabled
})).withConfig({
  displayName: "StyledSliderTrack",
  componentId: "sc-aw5m6g-0"
})(["position:absolute;top:50%;box-sizing:border-box;background-origin:content-box;background-repeat:repeat-y;width:100%;", ";", ";", ";"], props => sizeStyles$4(props), props => colorStyles$1(props), props => retrieveComponentStyles(COMPONENT_ID$5$1, props));
StyledSliderTrack.defaultProps = {
  backgroundSize: 0,
  backgroundPosition: 0,
  theme: DEFAULT_THEME
};
const COMPONENT_ID$4$1 = 'forms.slider_track_rail';
const sizeStyles$3 = props => {
  const height = math(`${props.theme.space.base} * 1.5px`);
  const margin = math(`${props.theme.space.base} * 2.5px`);
  return Ae(["margin:0 ", " 0 ", ";height:", ";"], props.theme.rtl ? `-${margin}` : margin, props.theme.rtl ? margin : `-${margin}`, height);
};
const StyledSliderTrackRail = styled.div.attrs({
  'data-garden-id': COMPONENT_ID$4$1,
  'data-garden-version': '8.63.2'
}).withConfig({
  displayName: "StyledSliderTrackRail",
  componentId: "sc-1o5owbd-0"
})(["position:relative;", ";", ";"], props => sizeStyles$3(props), props => retrieveComponentStyles(COMPONENT_ID$4$1, props));
StyledSliderTrackRail.defaultProps = {
  theme: DEFAULT_THEME
};
const COMPONENT_ID$3$1 = 'forms.tile_icon';
const sizeStyles$2 = props => {
  const iconSize = math(`${props.theme.iconSizes.md} * 2`);
  let position;
  let top;
  let horizontalValue;
  if (!props.isCentered) {
    position = 'absolute';
    top = `${props.theme.space.base * 6}px`;
    horizontalValue = `left: ${props.theme.space.base * 5}px`;
    if (props.theme.rtl) {
      horizontalValue = `right: ${props.theme.space.base * 5}px`;
    }
  }
  return Ae(["position:", ";top:", ";", ";& > *{width:", ";height:", ";}"], position, top, horizontalValue, iconSize, iconSize);
};
const StyledTileIcon = styled.span.attrs({
  'data-garden-id': COMPONENT_ID$3$1,
  'data-garden-version': '8.63.2'
}).withConfig({
  displayName: "StyledTileIcon",
  componentId: "sc-1wazhg4-0"
})(["display:block;transition:color 0.25s ease-in-out;text-align:center;line-height:0;", ";", ";"], props => sizeStyles$2(props), props => retrieveComponentStyles(COMPONENT_ID$3$1, props));
StyledTileIcon.defaultProps = {
  theme: DEFAULT_THEME
};
const COMPONENT_ID$2$1 = 'forms.tile';
const colorStyles = props => {
  const SHADE = 600;
  const iconColor = getColor('neutralHue', SHADE, props.theme);
  const color = getColor('neutralHue', SHADE + 200, props.theme);
  const borderColor = getColor('neutralHue', SHADE - 300, props.theme);
  const hoverBackgroundColor = getColor('primaryHue', SHADE, props.theme, 0.08);
  const hoverBorderColor = getColor('primaryHue', SHADE, props.theme);
  const focusBorderColor = hoverBorderColor;
  const focusBoxShadow = props.theme.shadows.md(rgba(focusBorderColor, 0.35));
  const activeBackgroundColor = getColor('primaryHue', SHADE, props.theme, 0.2);
  const activeBorderColor = focusBorderColor;
  const disabledBackgroundColor = getColor('neutralHue', SHADE - 500, props.theme);
  const disabledBorderColor = getColor('neutralHue', SHADE - 400, props.theme);
  const disabledColor = getColor('neutralHue', SHADE - 200, props.theme);
  const selectedBorderColor = focusBorderColor;
  const selectedBackgroundColor = selectedBorderColor;
  const selectedHoverBorderColor = getColor('primaryHue', SHADE + 100, props.theme);
  const selectedHoverBackgroundColor = selectedHoverBorderColor;
  const selectedActiveBorderColor = getColor('primaryHue', SHADE + 200, props.theme);
  const selectedActiveBackgroundColor = selectedActiveBorderColor;
  const selectedDisabledBackgroundColor = disabledBorderColor;
  return Ae(["border:", " ", ";border-color:", ";background-color:", ";color:", ";", "{color:", ";}&:focus{outline:none;}&:hover:not([aria-disabled='true']){border-color:", ";background-color:", ";", "{color:", ";}}&[data-garden-focus-visible='true']{border-color:", ";box-shadow:", ";}&:active:not([aria-disabled='true']){border-color:", ";background-color:", ";", "{color:", ";}}&[data-garden-selected='true']{border-color:", ";background-color:", ";color:", ";", "{color:", ";}}&[data-garden-selected='true']:not([aria-disabled='true']):hover{border-color:", ";background-color:", ";color:", ";", "{color:", ";}}&[data-garden-selected='true']:not([aria-disabled='true']):active{border-color:", ";background-color:", ";color:", ";", "{color:", ";}}&[aria-disabled='true']{border-color:", ";background-color:", ";color:", ";", "{color:", ";}}&[data-garden-selected='true'][aria-disabled='true']{background-color:", ";color:", ";", "{color:", ";}}"], props.theme.borders.sm, getColor('neutralHue', SHADE - 300, props.theme), borderColor, props.theme.colors.background, color, StyledTileIcon, iconColor, hoverBorderColor, hoverBackgroundColor, StyledTileIcon, color, focusBorderColor, focusBoxShadow, activeBorderColor, activeBackgroundColor, StyledTileIcon, color, selectedBorderColor, selectedBackgroundColor, props.theme.colors.background, StyledTileIcon, props.theme.colors.background, selectedHoverBorderColor, selectedHoverBackgroundColor, props.theme.colors.background, StyledTileIcon, props.theme.colors.background, selectedActiveBorderColor, selectedActiveBackgroundColor, props.theme.colors.background, StyledTileIcon, props.theme.colors.background, disabledBorderColor, disabledBackgroundColor, disabledColor, StyledTileIcon, disabledColor, selectedDisabledBackgroundColor, disabledColor, StyledTileIcon, disabledColor);
};
const StyledTile = styled.label.attrs(props => ({
  'data-garden-id': COMPONENT_ID$2$1,
  'data-garden-version': '8.63.2',
  'data-garden-focus-visible': props.isFocused,
  'data-garden-selected': props.isSelected
})).withConfig({
  displayName: "StyledTile",
  componentId: "sc-1jjvmxs-0"
})(["display:block;position:relative;transition:border-color .25s ease-in-out,box-shadow .1s ease-in-out,background-color .25s ease-in-out,color .25s ease-in-out;border-radius:", ";cursor:", ";padding:", "px;direction:", ";min-width:132px;word-break:break-word;", ";", ";"], props => props.theme.borderRadii.md, props => !props.isDisabled && 'pointer', props => props.theme.space.base * 5, props => props.theme.rtl && 'rtl', props => colorStyles(props), props => retrieveComponentStyles(COMPONENT_ID$2$1, props));
StyledTile.defaultProps = {
  theme: DEFAULT_THEME
};
const COMPONENT_ID$1$1 = 'forms.tile_description';
const sizeStyles$1 = props => {
  let marginDirection = 'left';
  let marginValue;
  if (props.theme.rtl) {
    marginDirection = 'right';
  }
  if (!props.isCentered) {
    marginValue = math(`(${props.theme.iconSizes.md} * 2) + ${props.theme.space.base * 5}px`);
  }
  return Ae(["margin-top:", "px;margin-", ":", ";"], props.theme.space.base, marginDirection, marginValue);
};
const StyledTileDescription = styled.span.attrs({
  'data-garden-id': COMPONENT_ID$1$1,
  'data-garden-version': '8.63.2'
}).withConfig({
  displayName: "StyledTileDescription",
  componentId: "sc-xfuu7u-0"
})(["display:block;text-align:", ";line-height:", ";font-size:", ";", ";", ";"], props => props.isCentered && 'center', props => getLineHeight(props.theme.space.base * 4, props.theme.fontSizes.sm), props => props.theme.fontSizes.sm, props => sizeStyles$1(props), props => retrieveComponentStyles(COMPONENT_ID$1$1, props));
StyledTileDescription.defaultProps = {
  theme: DEFAULT_THEME
};
const StyledTileInput = styled.input.withConfig({
  displayName: "StyledTileInput",
  componentId: "sc-1nq2m6q-0"
})(["position:absolute;border:0;clip:rect(1px,1px,1px,1px);padding:0;width:1px;height:1px;overflow:hidden;white-space:nowrap;"]);
StyledTileInput.defaultProps = {
  theme: DEFAULT_THEME
};
const COMPONENT_ID$L = 'forms.tile_label';
const sizeStyles$g = props => {
  let marginDirection = 'left';
  let marginTop = `${props.theme.space.base * 2}px`;
  let marginValue;
  if (props.theme.rtl) {
    marginDirection = 'right';
  }
  if (!props.isCentered) {
    marginValue = math(`(${props.theme.iconSizes.md} * 2) + ${props.theme.space.base * 5}px`);
    marginTop = '0';
  }
  return Ae(["margin-top:", ";margin-", ":", ";"], marginTop, marginDirection, marginValue);
};
const StyledTileLabel = styled.span.attrs({
  'data-garden-id': COMPONENT_ID$L,
  'data-garden-version': '8.63.2'
}).withConfig({
  displayName: "StyledTileLabel",
  componentId: "sc-1mypv27-0"
})(["display:block;text-align:", ";line-height:", ";font-size:", ";font-weight:", ";", ";", ";"], props => props.isCentered && 'center', props => getLineHeight(props.theme.space.base * 5, props.theme.fontSizes.md), props => props.theme.fontSizes.md, props => props.theme.fontWeights.semibold, props => sizeStyles$g(props), props => retrieveComponentStyles(COMPONENT_ID$L, props));
StyledTileLabel.defaultProps = {
  theme: DEFAULT_THEME
};
const Field$1 = /*#__PURE__*/React.forwardRef((props, ref) => {
  const [hasHint, setHasHint] = reactExports.useState(false);
  const [hasMessage, setHasMessage] = reactExports.useState(false);
  const [isLabelActive, setIsLabelActive] = reactExports.useState(false);
  const [isLabelHovered, setIsLabelHovered] = reactExports.useState(false);
  const multiThumbRangeRef = reactExports.useRef(null);
  const {
    getInputProps,
    getMessageProps,
    ...propGetters
  } = useField(props.id);
  const fieldProps = reactExports.useMemo(() => ({
    ...propGetters,
    getInputProps: function (options) {
      let describeOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return getInputProps(options, {
        ...describeOptions,
        isDescribed: hasHint,
        hasMessage
      });
    },
    getMessageProps: options => getMessageProps({
      role: 'alert',
      ...options
    }),
    isLabelActive,
    setIsLabelActive,
    isLabelHovered,
    setIsLabelHovered,
    hasHint,
    setHasHint,
    hasMessage,
    setHasMessage,
    multiThumbRangeRef
  }), [propGetters, getInputProps, getMessageProps, isLabelActive, isLabelHovered, hasHint, hasMessage]);
  return /*#__PURE__*/React.createElement(FieldContext$1.Provider, {
    value: fieldProps
  }, /*#__PURE__*/React.createElement(StyledField, _extends$t({}, props, {
    ref: ref
  })));
});
Field$1.displayName = 'Field';
const FieldsetContext = /*#__PURE__*/reactExports.createContext(undefined);
const useFieldsetContext = () => {
  const fieldsetContext = reactExports.useContext(FieldsetContext);
  return fieldsetContext;
};
const LegendComponent = /*#__PURE__*/reactExports.forwardRef((props, ref) => {
  const fieldsetContext = useFieldsetContext();
  return /*#__PURE__*/React.createElement(StyledLegend, _extends$t({}, props, fieldsetContext, {
    ref: ref
  }));
});
LegendComponent.displayName = 'Fieldset.Legend';
const Legend = LegendComponent;
const FieldsetComponent = /*#__PURE__*/reactExports.forwardRef((props, ref) => {
  const fieldsetContext = reactExports.useMemo(() => ({
    isCompact: props.isCompact
  }), [props.isCompact]);
  return /*#__PURE__*/React.createElement(FieldsetContext.Provider, {
    value: fieldsetContext
  }, /*#__PURE__*/React.createElement(StyledFieldset, _extends$t({}, props, {
    ref: ref
  })));
});
FieldsetComponent.displayName = 'Fieldset';
FieldsetComponent.propTypes = {
  isCompact: propTypesExports.bool
};
const Fieldset = FieldsetComponent;
Fieldset.Legend = Legend;
const InputContext = /*#__PURE__*/reactExports.createContext(undefined);
const useInputContext = () => {
  return reactExports.useContext(InputContext);
};
const Hint$1 = /*#__PURE__*/React.forwardRef((props, ref) => {
  const {
    hasHint,
    setHasHint,
    getHintProps
  } = useFieldContext$1() || {};
  const type = useInputContext();
  reactExports.useEffect(() => {
    if (!hasHint && setHasHint) {
      setHasHint(true);
    }
    return () => {
      if (hasHint && setHasHint) {
        setHasHint(false);
      }
    };
  }, [hasHint, setHasHint]);
  let HintComponent;
  if (type === 'checkbox') {
    HintComponent = StyledCheckHint;
  } else if (type === 'radio') {
    HintComponent = StyledRadioHint;
  } else if (type === 'toggle') {
    HintComponent = StyledToggleHint;
  } else {
    HintComponent = StyledHint;
  }
  let combinedProps = props;
  if (getHintProps) {
    combinedProps = getHintProps(combinedProps);
  }
  return /*#__PURE__*/React.createElement(HintComponent, _extends$t({
    ref: ref
  }, combinedProps));
});
Hint$1.displayName = 'Hint';
const Label$1 = /*#__PURE__*/React.forwardRef((props, ref) => {
  const fieldContext = useFieldContext$1();
  const fieldsetContext = useFieldsetContext();
  const type = useInputContext();
  let combinedProps = props;
  if (fieldContext) {
    combinedProps = fieldContext.getLabelProps(combinedProps);
    if (type === undefined) {
      const {
        setIsLabelActive,
        setIsLabelHovered,
        multiThumbRangeRef
      } = fieldContext;
      combinedProps = {
        ...combinedProps,
        onMouseUp: composeEventHandlers$1(props.onMouseUp, () => {
          setIsLabelActive(false);
        }),
        onMouseDown: composeEventHandlers$1(props.onMouseDown, () => {
          setIsLabelActive(true);
        }),
        onMouseEnter: composeEventHandlers$1(props.onMouseEnter, () => {
          setIsLabelHovered(true);
        }),
        onMouseLeave: composeEventHandlers$1(props.onMouseLeave, () => {
          setIsLabelHovered(false);
        }),
        onClick: composeEventHandlers$1(props.onClick, () => {
          multiThumbRangeRef.current && multiThumbRangeRef.current.focus();
        })
      };
    }
  }
  if (fieldsetContext) {
    combinedProps = {
      ...combinedProps,
      isRegular: combinedProps.isRegular === undefined ? true : combinedProps.isRegular
    };
  }
  if (type === 'radio') {
    return /*#__PURE__*/React.createElement(StyledRadioLabel, _extends$t({
      ref: ref
    }, combinedProps), /*#__PURE__*/React.createElement(StyledRadioSvg, null), props.children);
  } else if (type === 'checkbox') {
    const onLabelSelect = e => {
      const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
      if (fieldContext && isFirefox && e.target instanceof Element) {
        const inputId = e.target.getAttribute('for');
        if (!inputId) return;
        const input = document.getElementById(inputId);
        if (input && input.type === 'checkbox') {
          if (e.shiftKey) {
            input.click();
            input.checked = true;
          }
          input.focus();
        }
      }
    };
    combinedProps = {
      ...combinedProps,
      onClick: composeEventHandlers$1(combinedProps.onClick, onLabelSelect)
    };
    return /*#__PURE__*/React.createElement(StyledCheckLabel, _extends$t({
      ref: ref
    }, combinedProps), /*#__PURE__*/React.createElement(StyledCheckSvg, null), /*#__PURE__*/React.createElement(StyledDashSvg, null), props.children);
  } else if (type === 'toggle') {
    return /*#__PURE__*/React.createElement(StyledToggleLabel, _extends$t({
      ref: ref
    }, combinedProps), /*#__PURE__*/React.createElement(StyledToggleSvg, null), props.children);
  }
  return /*#__PURE__*/React.createElement(StyledLabel, _extends$t({
    ref: ref
  }, combinedProps));
});
Label$1.displayName = 'Label';
Label$1.propTypes = {
  isRegular: propTypesExports.bool
};
const VALIDATION = ['success', 'warning', 'error'];
const FILE_VALIDATION = ['success', 'error'];
const FILE_TYPE = ['pdf', 'zip', 'image', 'document', 'spreadsheet', 'presentation', 'generic'];
const Message$1 = /*#__PURE__*/React.forwardRef((_ref, ref) => {
  let {
    validation,
    validationLabel,
    children,
    ...props
  } = _ref;
  const {
    hasMessage,
    setHasMessage,
    getMessageProps
  } = useFieldContext$1() || {};
  const type = useInputContext();
  reactExports.useEffect(() => {
    if (!hasMessage && setHasMessage) {
      setHasMessage(true);
    }
    return () => {
      if (hasMessage && setHasMessage) {
        setHasMessage(false);
      }
    };
  }, [hasMessage, setHasMessage]);
  let MessageComponent;
  if (type === 'checkbox') {
    MessageComponent = StyledCheckMessage;
  } else if (type === 'radio') {
    MessageComponent = StyledRadioMessage;
  } else if (type === 'toggle') {
    MessageComponent = StyledToggleMessage;
  } else {
    MessageComponent = StyledMessage;
  }
  let combinedProps = {
    validation,
    validationLabel,
    ...props
  };
  if (getMessageProps) {
    combinedProps = getMessageProps(combinedProps);
  }
  const ariaLabel = useText(Message$1, combinedProps, 'validationLabel', validation);
  return /*#__PURE__*/React.createElement(MessageComponent, _extends$t({
    ref: ref
  }, combinedProps), validation && /*#__PURE__*/React.createElement(StyledMessageIcon, {
    validation: validation,
    "aria-label": ariaLabel
  }), children);
});
Message$1.displayName = 'Message';
Message$1.propTypes = {
  validation: propTypesExports.oneOf(VALIDATION),
  validationLabel: propTypesExports.string
};
const Checkbox = /*#__PURE__*/React.forwardRef((_ref, ref) => {
  let {
    indeterminate,
    children,
    ...props
  } = _ref;
  const fieldsetContext = useFieldsetContext();
  const fieldContext = useFieldContext$1();
  const inputRef = inputElement => {
    inputElement && (inputElement.indeterminate = indeterminate);
  };
  const combinedRef = inputElement => {
    [inputRef, ref].forEach(targetRef => {
      if (targetRef) {
        if (typeof targetRef === 'function') {
          targetRef(inputElement);
        } else {
          targetRef.current = inputElement;
        }
      }
    });
  };
  let combinedProps = {
    ref: combinedRef,
    ...props,
    ...fieldsetContext
  };
  if (fieldContext) {
    combinedProps = fieldContext.getInputProps(combinedProps);
  }
  return /*#__PURE__*/React.createElement(InputContext.Provider, {
    value: "checkbox"
  }, /*#__PURE__*/React.createElement(StyledCheckInput, combinedProps), children);
});
Checkbox.displayName = 'Checkbox';
Checkbox.propTypes = {
  isCompact: propTypesExports.bool,
  indeterminate: propTypesExports.bool
};
const InputGroupContext = /*#__PURE__*/reactExports.createContext(undefined);
const useInputGroupContext = () => {
  return reactExports.useContext(InputGroupContext);
};
const Input = /*#__PURE__*/React.forwardRef((_ref, ref) => {
  let {
    onSelect,
    ...props
  } = _ref;
  const fieldContext = useFieldContext$1();
  const inputGroupContext = useInputGroupContext();
  const onSelectHandler = props.readOnly ? composeEventHandlers$1(onSelect, event => {
    event.currentTarget.select();
  }) : onSelect;
  let combinedProps = {
    ref,
    onSelect: onSelectHandler,
    ...props
  };
  if (inputGroupContext) {
    combinedProps = {
      ...combinedProps,
      isCompact: inputGroupContext.isCompact || combinedProps.isCompact,
      focusInset: props.focusInset === undefined ? true : props.focusInset
    };
  }
  if (fieldContext) {
    combinedProps = fieldContext.getInputProps(combinedProps);
  }
  return /*#__PURE__*/React.createElement(StyledTextInput, combinedProps);
});
Input.propTypes = {
  isCompact: propTypesExports.bool,
  isBare: propTypesExports.bool,
  focusInset: propTypesExports.bool,
  validation: propTypesExports.oneOf(VALIDATION)
};
Input.displayName = 'Input';
const Radio = /*#__PURE__*/React.forwardRef((_ref, ref) => {
  let {
    children,
    ...props
  } = _ref;
  const fieldsetContext = useFieldsetContext();
  const fieldContext = useFieldContext$1();
  let combinedProps = {
    ref,
    ...props,
    ...fieldsetContext
  };
  if (fieldContext) {
    combinedProps = fieldContext.getInputProps(combinedProps);
  }
  return /*#__PURE__*/React.createElement(InputContext.Provider, {
    value: "radio"
  }, /*#__PURE__*/React.createElement(StyledRadioInput, combinedProps), children);
});
Radio.displayName = 'Radio';
Radio.propTypes = {
  isCompact: propTypesExports.bool
};
const Range = /*#__PURE__*/React.forwardRef((_ref, ref) => {
  let {
    hasLowerTrack,
    min,
    max,
    step,
    ...props
  } = _ref;
  const [backgroundSize, setBackgroundSize] = reactExports.useState('0');
  const rangeRef = reactExports.useRef();
  const fieldContext = useFieldContext$1();
  const updateBackgroundWidthFromInput = reactExports.useCallback(rangeTarget => {
    let relativeMax = max;
    const {
      value
    } = rangeTarget;
    if (parseFloat(relativeMax) < parseFloat(min)) {
      relativeMax = 100;
    }
    const percentage = 100 * (value - min) / (relativeMax - min);
    setBackgroundSize(`${percentage}%`);
  }, [max, min, step]);
  reactExports.useEffect(() => {
    updateBackgroundWidthFromInput(rangeRef.current);
  }, [rangeRef, updateBackgroundWidthFromInput, props.value]);
  const onChange = hasLowerTrack ? composeEventHandlers$1(props.onChange, event => {
    updateBackgroundWidthFromInput(event.target);
  }) : props.onChange;
  let combinedProps = {
    ref: mergeRefs([rangeRef, ref]),
    hasLowerTrack,
    min,
    max,
    step,
    backgroundSize,
    ...props,
    onChange
  };
  if (fieldContext) {
    combinedProps = fieldContext.getInputProps(combinedProps, {
      isDescribed: true
    });
  }
  return /*#__PURE__*/React.createElement(StyledRangeInput, combinedProps);
});
Range.defaultProps = {
  hasLowerTrack: true,
  min: 0,
  max: 100,
  step: 1
};
Range.displayName = 'Range';
const parseStyleValue = value => {
  return parseInt(value, 10) || 0;
};
const Textarea = /*#__PURE__*/React.forwardRef((_ref, ref) => {
  let {
    minRows,
    maxRows,
    style,
    onChange,
    onSelect,
    ...props
  } = _ref;
  const fieldContext = useFieldContext$1();
  const textAreaRef = reactExports.useRef();
  const shadowTextAreaRef = reactExports.useRef(null);
  const [state, setState] = reactExports.useState({
    overflow: false,
    height: 0
  });
  const isControlled = props.value !== null && props.value !== undefined;
  const isAutoResizable = (minRows !== undefined || maxRows !== undefined) && !props.isResizable;
  const calculateHeight = reactExports.useCallback(() => {
    if (!isAutoResizable) {
      return;
    }
    const textarea = textAreaRef.current;
    const computedStyle = window.getComputedStyle(textarea);
    const shadowTextArea = shadowTextAreaRef.current;
    shadowTextArea.style.width = computedStyle.width;
    shadowTextArea.value = textarea.value || textarea.placeholder || ' ';
    const boxSizing = computedStyle.boxSizing;
    const padding = parseStyleValue(computedStyle.paddingBottom) + parseStyleValue(computedStyle.paddingTop);
    const border = parseStyleValue(computedStyle.borderTopWidth) + parseStyleValue(computedStyle.borderBottomWidth);
    const innerHeight = shadowTextArea.scrollHeight - padding;
    shadowTextArea.value = 'x';
    const singleRowHeight = shadowTextArea.scrollHeight - padding;
    let outerHeight = innerHeight;
    if (minRows) {
      outerHeight = Math.max(Number(minRows) * singleRowHeight, outerHeight);
    }
    if (maxRows) {
      outerHeight = Math.min(Number(maxRows) * singleRowHeight, outerHeight);
    }
    outerHeight = Math.max(outerHeight, singleRowHeight);
    const updatedHeight = outerHeight + (boxSizing === 'border-box' ? padding + border : 0);
    const overflow = Math.abs(outerHeight - innerHeight) <= 1;
    setState(prevState => {
      if (updatedHeight > 0 && Math.abs((prevState.height || 0) - updatedHeight) > 1 || prevState.overflow !== overflow) {
        return {
          overflow,
          height: updatedHeight
        };
      }
      return prevState;
    });
  }, [maxRows, minRows, textAreaRef, isAutoResizable]);
  const onChangeHandler = reactExports.useCallback(e => {
    if (!isControlled) {
      calculateHeight();
    }
    if (onChange) {
      onChange(e);
    }
  }, [calculateHeight, isControlled, onChange]);
  const theme = reactExports.useContext(Me);
  const environment = useDocument(theme);
  reactExports.useEffect(() => {
    if (!isAutoResizable) {
      return undefined;
    }
    if (environment) {
      const win = environment.defaultView || window;
      const resizeHandler = lodash_debounce(calculateHeight);
      win.addEventListener('resize', resizeHandler);
      return () => {
        resizeHandler.cancel();
        win.removeEventListener('resize', resizeHandler);
      };
    }
    return undefined;
  }, [calculateHeight, isAutoResizable, environment]);
  reactExports.useLayoutEffect(() => {
    calculateHeight();
  });
  const computedStyle = {};
  if (isAutoResizable) {
    computedStyle.height = state.height;
    computedStyle.overflow = state.overflow ? 'hidden' : undefined;
  }
  const onSelectHandler = props.readOnly ? composeEventHandlers$1(onSelect, event => {
    event.currentTarget.select();
  }) : onSelect;
  let combinedProps = {
    ref: mergeRefs([textAreaRef, ref]),
    rows: minRows,
    onChange: onChangeHandler,
    onSelect: onSelectHandler,
    style: {
      ...computedStyle,
      ...style
    },
    ...props
  };
  if (fieldContext) {
    combinedProps = fieldContext.getInputProps(combinedProps, {
      isDescribed: true
    });
  }
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(StyledTextarea, combinedProps), isAutoResizable && /*#__PURE__*/React.createElement(StyledTextarea, {
    "aria-hidden": true,
    readOnly: true,
    isHidden: true,
    className: props.className,
    ref: shadowTextAreaRef,
    tabIndex: -1,
    isBare: props.isBare,
    isCompact: props.isCompact,
    style: style
  }));
});
Textarea.propTypes = {
  isCompact: propTypesExports.bool,
  isBare: propTypesExports.bool,
  focusInset: propTypesExports.bool,
  isResizable: propTypesExports.bool,
  minRows: propTypesExports.number,
  maxRows: propTypesExports.number,
  validation: propTypesExports.oneOf(VALIDATION)
};
Textarea.displayName = 'Textarea';
const Toggle = /*#__PURE__*/React.forwardRef((_ref, ref) => {
  let {
    children,
    ...props
  } = _ref;
  const fieldsetContext = useFieldsetContext();
  const fieldContext = useFieldContext$1();
  let combinedProps = {
    ref,
    ...props,
    ...fieldsetContext
  };
  if (fieldContext) {
    combinedProps = fieldContext.getInputProps(combinedProps);
  }
  return /*#__PURE__*/React.createElement(InputContext.Provider, {
    value: "toggle"
  }, /*#__PURE__*/React.createElement(StyledToggleInput, combinedProps), children);
});
Toggle.displayName = 'Toggle';
Toggle.propTypes = {
  isCompact: propTypesExports.bool
};
var _path$k;
function _extends$l() {
  _extends$l = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends$l.apply(this, arguments);
}
var SvgChevronDownStroke$1 = function SvgChevronDownStroke(props) {
  return /*#__PURE__*/reactExports.createElement("svg", _extends$l({
    xmlns: "http://www.w3.org/2000/svg",
    width: 16,
    height: 16,
    focusable: "false",
    viewBox: "0 0 16 16",
    "aria-hidden": "true"
  }, props), _path$k || (_path$k = /*#__PURE__*/reactExports.createElement("path", {
    fill: "currentColor",
    d: "M12.688 5.61a.5.5 0 01.69.718l-.066.062-5 4a.5.5 0 01-.542.054l-.082-.054-5-4a.5.5 0 01.55-.83l.074.05L8 9.359l4.688-3.75z"
  })));
};
const StartIconComponent = props => /*#__PURE__*/React.createElement(StyledTextMediaFigure, _extends$t({
  position: "start"
}, props));
StartIconComponent.displayName = 'FauxInput.StartIcon';
const StartIcon = StartIconComponent;
const EndIconComponent = props => /*#__PURE__*/React.createElement(StyledTextMediaFigure, _extends$t({
  position: "end"
}, props));
EndIconComponent.displayName = 'FauxInput.EndIcon';
const EndIcon = EndIconComponent;
const FauxInputComponent = /*#__PURE__*/reactExports.forwardRef((_ref, ref) => {
  let {
    onFocus,
    onBlur,
    disabled,
    readOnly,
    isFocused: controlledIsFocused,
    ...props
  } = _ref;
  const [isFocused, setIsFocused] = reactExports.useState(false);
  const onFocusHandler = composeEventHandlers$1(onFocus, () => {
    setIsFocused(true);
  });
  const onBlurHandler = composeEventHandlers$1(onBlur, () => {
    setIsFocused(false);
  });
  return /*#__PURE__*/React.createElement(StyledTextFauxInput, _extends$t({
    onFocus: onFocusHandler,
    onBlur: onBlurHandler,
    isFocused: controlledIsFocused === undefined ? isFocused : controlledIsFocused,
    isReadOnly: readOnly,
    isDisabled: disabled,
    tabIndex: disabled ? undefined : 0
  }, props, {
    ref: ref
  }));
});
FauxInputComponent.displayName = 'FauxInput';
FauxInputComponent.propTypes = {
  isCompact: propTypesExports.bool,
  isBare: propTypesExports.bool,
  focusInset: propTypesExports.bool,
  disabled: propTypesExports.bool,
  readOnly: propTypesExports.bool,
  validation: propTypesExports.oneOf(VALIDATION),
  isFocused: propTypesExports.bool,
  isHovered: propTypesExports.bool
};
const FauxInput = FauxInputComponent;
FauxInput.EndIcon = EndIcon;
FauxInput.StartIcon = StartIcon;
const Select$1 = /*#__PURE__*/React.forwardRef((_ref, ref) => {
  let {
    disabled,
    isCompact,
    ...props
  } = _ref;
  const fieldContext = useFieldContext$1();
  let combinedProps = {
    disabled,
    isCompact,
    ref,
    ...props
  };
  if (fieldContext) {
    combinedProps = fieldContext.getInputProps(combinedProps, {
      isDescribed: true
    });
  }
  return /*#__PURE__*/React.createElement(StyledSelectWrapper, {
    isCompact: isCompact
  }, /*#__PURE__*/React.createElement(StyledSelect$1, combinedProps), !props.isBare && /*#__PURE__*/React.createElement(FauxInput.EndIcon, {
    isDisabled: disabled
  }, /*#__PURE__*/React.createElement(SvgChevronDownStroke$1, null)));
});
Select$1.propTypes = {
  isCompact: propTypesExports.bool,
  isBare: propTypesExports.bool,
  focusInset: propTypesExports.bool,
  validation: propTypesExports.oneOf(VALIDATION)
};
Select$1.displayName = 'Select';
const MIN = 0;
const MAX = 100;
const MultiThumbRange = /*#__PURE__*/reactExports.forwardRef((_ref, ref) => {
  let {
    min = MIN,
    max = MAX,
    minValue,
    maxValue,
    disabled,
    step,
    jump,
    onChange,
    onMouseDown,
    ...props
  } = _ref;
  const theme = reactExports.useContext(Me);
  const environment = useDocument(theme);
  const trackRailRef = reactExports.useRef(null);
  const minThumbRef = reactExports.useRef(null);
  const maxThumbRef = reactExports.useRef(null);
  const {
    getTrackProps,
    getMinThumbProps,
    getMaxThumbProps,
    trackRect,
    minValue: updatedMinValue,
    maxValue: updatedMaxValue
  } = useSlider({
    trackRef: trackRailRef,
    minThumbRef,
    maxThumbRef,
    min,
    max,
    minValue,
    maxValue,
    onChange,
    step,
    jump,
    disabled,
    rtl: theme.rtl,
    environment
  });
  const {
    onMouseDown: onSliderMouseDown,
    ...trackProps
  } = getTrackProps({
    onMouseDown
  });
  const fieldContext = useFieldContext$1();
  const {
    isLabelHovered,
    isLabelActive,
    multiThumbRangeRef
  } = fieldContext || {};
  reactExports.useEffect(() => {
    if (multiThumbRangeRef) {
      multiThumbRangeRef.current = minThumbRef.current;
    }
  }, [multiThumbRangeRef]);
  const minPosition = (updatedMinValue - min) / (max - min) * trackRect.width;
  const maxPosition = (updatedMaxValue - min) / (max - min) * trackRect.width;
  const sliderBackgroundSize = Math.abs(maxPosition) - Math.abs(minPosition);
  return /*#__PURE__*/React.createElement(StyledSlider, _extends$t({
    ref: ref,
    onMouseDown: onSliderMouseDown
  }, props), /*#__PURE__*/React.createElement(StyledSliderTrack, {
    backgroundSize: sliderBackgroundSize,
    backgroundPosition: theme.rtl ? trackRect.width - maxPosition : minPosition,
    isDisabled: disabled
  }, /*#__PURE__*/React.createElement(StyledSliderTrackRail, _extends$t({}, trackProps, {
    ref: trackRailRef
  }), /*#__PURE__*/React.createElement(StyledSliderThumb, _extends$t({}, getMinThumbProps({
    'aria-label': updatedMinValue
  }), {
    isDisabled: disabled,
    position: minPosition,
    ref: minThumbRef,
    "data-garden-active": isLabelActive,
    "data-garden-hover": isLabelHovered
  })), /*#__PURE__*/React.createElement(StyledSliderThumb, _extends$t({}, getMaxThumbProps({
    'aria-label': updatedMaxValue
  }), {
    isDisabled: disabled,
    position: maxPosition,
    ref: maxThumbRef
  })))));
});
MultiThumbRange.displayName = 'MultiThumbRange';
MultiThumbRange.propTypes = {
  min: propTypesExports.number,
  max: propTypesExports.number,
  minValue: propTypesExports.number,
  maxValue: propTypesExports.number,
  step: propTypesExports.number,
  jump: propTypesExports.number,
  disabled: propTypesExports.bool,
  onChange: propTypesExports.func
};
MultiThumbRange.defaultProps = {
  min: MIN,
  max: MAX,
  step: 1
};
const TilesContext = /*#__PURE__*/reactExports.createContext(undefined);
const useTilesContext = () => {
  return reactExports.useContext(TilesContext);
};
const TileComponent = /*#__PURE__*/React.forwardRef((_ref, ref) => {
  let {
    children,
    value,
    disabled,
    ...props
  } = _ref;
  const [isFocused, setIsFocused] = reactExports.useState(false);
  const tilesContext = useTilesContext();
  const inputRef = reactExports.useRef(null);
  let inputProps;
  if (tilesContext) {
    inputProps = {
      name: tilesContext.name,
      checked: tilesContext.value === value,
      onChange: tilesContext.onChange
    };
  }
  return /*#__PURE__*/React.createElement(StyledTile, _extends$t({
    ref: ref,
    "aria-disabled": disabled,
    isDisabled: disabled,
    isFocused: isFocused,
    isSelected: tilesContext && tilesContext.value === value
  }, props), children, /*#__PURE__*/React.createElement(StyledTileInput, _extends$t({}, inputProps, {
    disabled: disabled,
    value: value,
    onBlur: () => setIsFocused(false),
    onFocus: e => {
      e.persist();
      setTimeout(() => {
        if (e.target.getAttribute('data-garden-focus-visible')) {
          setIsFocused(true);
        }
      }, 1);
    },
    type: "radio",
    ref: inputRef
  })));
});
TileComponent.displayName = 'Tiles.Tile';
TileComponent.propTypes = {
  value: propTypesExports.string,
  disabled: propTypesExports.bool
};
const Tile = TileComponent;
const DescriptionComponent = /*#__PURE__*/reactExports.forwardRef((props, ref) => {
  const tilesContext = useTilesContext();
  return /*#__PURE__*/React.createElement(StyledTileDescription, _extends$t({
    ref: ref,
    isCentered: tilesContext && tilesContext.isCentered
  }, props));
});
DescriptionComponent.displayName = 'Tiles.Description';
const Description = DescriptionComponent;
const IconComponent = /*#__PURE__*/reactExports.forwardRef((props, ref) => {
  const tileContext = useTilesContext();
  return /*#__PURE__*/React.createElement(StyledTileIcon, _extends$t({
    ref: ref,
    isCentered: tileContext && tileContext.isCentered
  }, props));
});
IconComponent.displayName = 'Tiles.Icon';
const Icon = IconComponent;
const LabelComponent = /*#__PURE__*/reactExports.forwardRef((props, forwardedRef) => {
  const [title, setTitle] = reactExports.useState('');
  const ref = reactExports.useRef();
  const tilesContext = useTilesContext();
  reactExports.useEffect(() => {
    if (ref.current) {
      setTitle(ref.current.textContent || undefined);
    }
  }, [ref]);
  return /*#__PURE__*/React.createElement(StyledTileLabel, _extends$t({
    ref: mergeRefs([ref, forwardedRef]),
    title: title,
    isCentered: tilesContext && tilesContext.isCentered
  }, props));
});
LabelComponent.displayName = 'Tiles.Label';
const Label$2 = LabelComponent;
const TilesComponent = /*#__PURE__*/reactExports.forwardRef((_ref, ref) => {
  let {
    onChange,
    value: controlledValue,
    name,
    isCentered,
    ...props
  } = _ref;
  const [value, setValue] = reactExports.useState(controlledValue);
  const handleOnChange = reactExports.useCallback(function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    setValue(args[0].target.value);
    if (onChange) {
      onChange(...args);
    }
  }, [onChange]);
  const selectedValue = getControlledValue(controlledValue, value);
  const tileContext = reactExports.useMemo(() => ({
    onChange: handleOnChange,
    value: selectedValue,
    name,
    isCentered
  }), [handleOnChange, selectedValue, name, isCentered]);
  return /*#__PURE__*/React.createElement(TilesContext.Provider, {
    value: tileContext
  }, /*#__PURE__*/React.createElement("div", _extends$t({
    ref: ref,
    role: "radiogroup"
  }, props)));
});
TilesComponent.displayName = 'Tiles';
TilesComponent.propTypes = {
  value: propTypesExports.string,
  onChange: propTypesExports.func,
  name: propTypesExports.string.isRequired,
  isCentered: propTypesExports.bool
};
TilesComponent.defaultProps = {
  isCentered: true
};
const Tiles = TilesComponent;
Tiles.Description = Description;
Tiles.Icon = Icon;
Tiles.Label = Label$2;
Tiles.Tile = Tile;
const InputGroup = /*#__PURE__*/React.forwardRef((_ref, ref) => {
  let {
    isCompact,
    ...props
  } = _ref;
  const contextValue = reactExports.useMemo(() => ({
    isCompact
  }), [isCompact]);
  return /*#__PURE__*/React.createElement(InputGroupContext.Provider, {
    value: contextValue
  }, /*#__PURE__*/React.createElement(StyledInputGroup, _extends$t({
    ref: ref,
    isCompact: isCompact
  }, props)));
});
InputGroup.displayName = 'InputGroup';
InputGroup.propTypes = {
  isCompact: propTypesExports.bool
};
const FileUpload = /*#__PURE__*/React.forwardRef((_ref, ref) => {
  let {
    disabled,
    ...props
  } = _ref;
  return /*#__PURE__*/React.createElement(StyledFileUpload, _extends$t({
    ref: ref,
    "aria-disabled": disabled
  }, props, {
    role: "button"
  }));
});
FileUpload.propTypes = {
  isDragging: propTypesExports.bool,
  isCompact: propTypesExports.bool,
  disabled: propTypesExports.bool
};
FileUpload.displayName = 'FileUpload';
const ItemComponent = /*#__PURE__*/reactExports.forwardRef((_ref, ref) => {
  let {
    ...props
  } = _ref;
  return /*#__PURE__*/React.createElement(StyledFileListItem, _extends$t({}, props, {
    ref: ref
  }));
});
ItemComponent.displayName = 'FileList.Item';
const Item$1 = ItemComponent;
const FileListComponent = /*#__PURE__*/reactExports.forwardRef((_ref, ref) => {
  let {
    ...props
  } = _ref;
  return /*#__PURE__*/React.createElement(StyledFileList, _extends$t({}, props, {
    ref: ref
  }));
});
FileListComponent.displayName = 'FileList';
const FileList = FileListComponent;
FileList.Item = Item$1;
var _path$j;
function _extends$k() {
  _extends$k = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends$k.apply(this, arguments);
}
var SvgXStroke$1 = function SvgXStroke(props) {
  return /*#__PURE__*/reactExports.createElement("svg", _extends$k({
    xmlns: "http://www.w3.org/2000/svg",
    width: 12,
    height: 12,
    focusable: "false",
    viewBox: "0 0 12 12",
    "aria-hidden": "true"
  }, props), _path$j || (_path$j = /*#__PURE__*/reactExports.createElement("path", {
    stroke: "currentColor",
    strokeLinecap: "round",
    d: "M3 9l6-6m0 6L3 3"
  })));
};
var _path$i;
function _extends$j() {
  _extends$j = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends$j.apply(this, arguments);
}
var SvgXStroke = function SvgXStroke(props) {
  return /*#__PURE__*/reactExports.createElement("svg", _extends$j({
    xmlns: "http://www.w3.org/2000/svg",
    width: 16,
    height: 16,
    focusable: "false",
    viewBox: "0 0 16 16",
    "aria-hidden": "true"
  }, props), _path$i || (_path$i = /*#__PURE__*/reactExports.createElement("path", {
    stroke: "currentColor",
    strokeLinecap: "round",
    d: "M3 13L13 3m0 10L3 3"
  })));
};
const FileContext = /*#__PURE__*/reactExports.createContext(undefined);
const useFileContext = () => {
  return reactExports.useContext(FileContext);
};
const CloseComponent = /*#__PURE__*/React.forwardRef((props, ref) => {
  const fileContext = useFileContext();
  const onMouseDown = composeEventHandlers$1(props.onMouseDown, event => event.preventDefault());
  const ariaLabel = useText(CloseComponent, props, 'aria-label', 'Close');
  return /*#__PURE__*/React.createElement(StyledFileClose, _extends$t({
    ref: ref,
    "aria-label": ariaLabel
  }, props, {
    type: "button",
    tabIndex: -1,
    onMouseDown: onMouseDown
  }), fileContext && fileContext.isCompact ? /*#__PURE__*/React.createElement(SvgXStroke$1, null) : /*#__PURE__*/React.createElement(SvgXStroke, null));
});
CloseComponent.displayName = 'File.Close';
const Close = CloseComponent;
var _path$h;
function _extends$i() {
  _extends$i = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends$i.apply(this, arguments);
}
var SvgTrashStroke$1 = function SvgTrashStroke(props) {
  return /*#__PURE__*/reactExports.createElement("svg", _extends$i({
    xmlns: "http://www.w3.org/2000/svg",
    width: 12,
    height: 12,
    focusable: "false",
    viewBox: "0 0 12 12",
    "aria-hidden": "true"
  }, props), _path$h || (_path$h = /*#__PURE__*/reactExports.createElement("path", {
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round",
    d: "M4.5 2.5V1c0-.3.2-.5.5-.5h2c.3 0 .5.2.5.5v1.5M2 2.5h8m-5.5 7V5m3 4.5V5m-5-.5V11c0 .3.2.5.5.5h6c.3 0 .5-.2.5-.5V4.5"
  })));
};
var _path$g;
function _extends$h() {
  _extends$h = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends$h.apply(this, arguments);
}
var SvgTrashStroke = function SvgTrashStroke(props) {
  return /*#__PURE__*/reactExports.createElement("svg", _extends$h({
    xmlns: "http://www.w3.org/2000/svg",
    width: 16,
    height: 16,
    focusable: "false",
    viewBox: "0 0 16 16",
    "aria-hidden": "true"
  }, props), _path$g || (_path$g = /*#__PURE__*/reactExports.createElement("path", {
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round",
    d: "M6.5 2.5V1c0-.3.2-.5.5-.5h2c.3 0 .5.2.5.5v1.5M3 2.5h10m-6.5 11v-8m3 8v-8m-6-1V15c0 .3.2.5.5.5h8c.3 0 .5-.2.5-.5V4.5"
  })));
};
const DeleteComponent = /*#__PURE__*/React.forwardRef((props, ref) => {
  const fileContext = useFileContext();
  const onMouseDown = composeEventHandlers$1(props.onMouseDown, event => event.preventDefault());
  const ariaLabel = useText(DeleteComponent, props, 'aria-label', 'Delete');
  return /*#__PURE__*/React.createElement(StyledFileDelete, _extends$t({
    ref: ref,
    "aria-label": ariaLabel
  }, props, {
    type: "button",
    tabIndex: -1,
    onMouseDown: onMouseDown
  }), fileContext && fileContext.isCompact ? /*#__PURE__*/React.createElement(SvgTrashStroke$1, null) : /*#__PURE__*/React.createElement(SvgTrashStroke, null));
});
DeleteComponent.displayName = 'File.Delete';
const Delete = DeleteComponent;
var _path$f, _rect$1;
function _extends$g() {
  _extends$g = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends$g.apply(this, arguments);
}
var SvgFilePdfStroke$1 = function SvgFilePdfStroke(props) {
  return /*#__PURE__*/reactExports.createElement("svg", _extends$g({
    xmlns: "http://www.w3.org/2000/svg",
    width: 12,
    height: 12,
    focusable: "false",
    viewBox: "0 0 12 12",
    "aria-hidden": "true"
  }, props), _path$f || (_path$f = /*#__PURE__*/reactExports.createElement("path", {
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round",
    d: "M10.5 3.21V11a.5.5 0 01-.5.5H2a.5.5 0 01-.5-.5V1A.5.5 0 012 .5h5.79a.5.5 0 01.35.15l2.21 2.21a.5.5 0 01.15.35zM7.5.5V3a.5.5 0 00.5.5h2.5m-7 6h5"
  })), _rect$1 || (_rect$1 = /*#__PURE__*/reactExports.createElement("rect", {
    width: 6,
    height: 3,
    x: 3,
    y: 5,
    fill: "currentColor",
    rx: 0.5,
    ry: 0.5
  })));
};
var _path$e;
function _extends$f() {
  _extends$f = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends$f.apply(this, arguments);
}
var SvgFileZipStroke$1 = function SvgFileZipStroke(props) {
  return /*#__PURE__*/reactExports.createElement("svg", _extends$f({
    xmlns: "http://www.w3.org/2000/svg",
    width: 12,
    height: 12,
    focusable: "false",
    viewBox: "0 0 12 12",
    "aria-hidden": "true"
  }, props), _path$e || (_path$e = /*#__PURE__*/reactExports.createElement("path", {
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round",
    d: "M4.5.5v8m0-6h1m-2 1h1m0 1h1m-2 1h1m0 1h1m-2 1h1m6-4.29V11c0 .28-.22.5-.5.5H2c-.28 0-.5-.22-.5-.5V1c0-.28.22-.5.5-.5h5.79c.13 0 .26.05.35.15l2.21 2.21c.1.09.15.21.15.35zM7.5.5V3c0 .28.22.5.5.5h2.5"
  })));
};
var _path$d, _circle$1;
function _extends$e() {
  _extends$e = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends$e.apply(this, arguments);
}
var SvgFileImageStroke$1 = function SvgFileImageStroke(props) {
  return /*#__PURE__*/reactExports.createElement("svg", _extends$e({
    xmlns: "http://www.w3.org/2000/svg",
    width: 12,
    height: 12,
    focusable: "false",
    viewBox: "0 0 12 12",
    "aria-hidden": "true"
  }, props), _path$d || (_path$d = /*#__PURE__*/reactExports.createElement("path", {
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M10.5 3.21V11c0 .28-.22.5-.5.5H2c-.28 0-.5-.22-.5-.5V1c0-.28.22-.5.5-.5h5.79c.13 0 .26.05.35.15l2.21 2.21c.1.09.15.21.15.35zM7.5.5V3c0 .28.22.5.5.5h2.5m-7 6L5 8l1.5 1.5 1-1 1 1"
  })), _circle$1 || (_circle$1 = /*#__PURE__*/reactExports.createElement("circle", {
    cx: 8,
    cy: 6,
    r: 1,
    fill: "currentColor"
  })));
};
var _path$c;
function _extends$d() {
  _extends$d = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends$d.apply(this, arguments);
}
var SvgFileDocumentStroke$1 = function SvgFileDocumentStroke(props) {
  return /*#__PURE__*/reactExports.createElement("svg", _extends$d({
    xmlns: "http://www.w3.org/2000/svg",
    width: 12,
    height: 12,
    focusable: "false",
    viewBox: "0 0 12 12",
    "aria-hidden": "true"
  }, props), _path$c || (_path$c = /*#__PURE__*/reactExports.createElement("path", {
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round",
    d: "M3.5 5.5h5m-5 2h5m-5 2h5m2-6.29V11c0 .28-.22.5-.5.5H2c-.28 0-.5-.22-.5-.5V1c0-.28.22-.5.5-.5h5.79c.13 0 .26.05.35.15l2.21 2.21c.1.09.15.21.15.35zM7.5.5V3c0 .28.22.5.5.5h2.5"
  })));
};
var _path$b;
function _extends$c() {
  _extends$c = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends$c.apply(this, arguments);
}
var SvgFileSpreadsheetStroke$1 = function SvgFileSpreadsheetStroke(props) {
  return /*#__PURE__*/reactExports.createElement("svg", _extends$c({
    xmlns: "http://www.w3.org/2000/svg",
    width: 12,
    height: 12,
    focusable: "false",
    viewBox: "0 0 12 12",
    "aria-hidden": "true"
  }, props), _path$b || (_path$b = /*#__PURE__*/reactExports.createElement("path", {
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round",
    d: "M3.5 5.5h1m-1 2h1m-1 2h1m2-4h2m-2 2h2m-2 2h2m2-6.29V11c0 .28-.22.5-.5.5H2c-.28 0-.5-.22-.5-.5V1c0-.28.22-.5.5-.5h5.79c.13 0 .26.05.35.15l2.21 2.21c.1.09.15.21.15.35zM7.5.5V3c0 .28.22.5.5.5h2.5"
  })));
};
var _path$a;
function _extends$b() {
  _extends$b = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends$b.apply(this, arguments);
}
var SvgFilePresentationStroke$1 = function SvgFilePresentationStroke(props) {
  return /*#__PURE__*/reactExports.createElement("svg", _extends$b({
    xmlns: "http://www.w3.org/2000/svg",
    width: 12,
    height: 12,
    focusable: "false",
    viewBox: "0 0 12 12",
    "aria-hidden": "true"
  }, props), _path$a || (_path$a = /*#__PURE__*/reactExports.createElement("path", {
    fill: "none",
    stroke: "currentColor",
    d: "M10.5 3.21V11c0 .28-.22.5-.5.5H2c-.28 0-.5-.22-.5-.5V1c0-.28.22-.5.5-.5h5.79c.13 0 .26.05.35.15l2.21 2.21c.1.09.15.21.15.35zM6 9.5h2c.28 0 .5-.22.5-.5V8c0-.28-.22-.5-.5-.5H6c-.28 0-.5.22-.5.5v1c0 .28.22.5.5.5zm-2-2h2c.28 0 .5-.22.5-.5V6c0-.28-.22-.5-.5-.5H4c-.28 0-.5.22-.5.5v1c0 .28.22.5.5.5zm3.5-7V3c0 .28.22.5.5.5h2.5"
  })));
};
var _path$9;
function _extends$a() {
  _extends$a = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends$a.apply(this, arguments);
}
var SvgFileGenericStroke$1 = function SvgFileGenericStroke(props) {
  return /*#__PURE__*/reactExports.createElement("svg", _extends$a({
    xmlns: "http://www.w3.org/2000/svg",
    width: 12,
    height: 12,
    focusable: "false",
    viewBox: "0 0 12 12",
    "aria-hidden": "true"
  }, props), _path$9 || (_path$9 = /*#__PURE__*/reactExports.createElement("path", {
    fill: "none",
    stroke: "currentColor",
    d: "M10.5 3.21V11c0 .28-.22.5-.5.5H2c-.28 0-.5-.22-.5-.5V1c0-.28.22-.5.5-.5h5.79c.13 0 .26.05.35.15l2.21 2.21c.1.09.15.21.15.35zM7.5.5V3c0 .28.22.5.5.5h2.5"
  })));
};
var _g;
function _extends$9() {
  _extends$9 = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends$9.apply(this, arguments);
}
var SvgCheckCircleStroke = function SvgCheckCircleStroke(props) {
  return /*#__PURE__*/reactExports.createElement("svg", _extends$9({
    xmlns: "http://www.w3.org/2000/svg",
    width: 12,
    height: 12,
    focusable: "false",
    viewBox: "0 0 12 12",
    "aria-hidden": "true"
  }, props), _g || (_g = /*#__PURE__*/reactExports.createElement("g", {
    fill: "none",
    stroke: "currentColor"
  }, /*#__PURE__*/reactExports.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M3.5 6l2 2L9 4.5"
  }), /*#__PURE__*/reactExports.createElement("circle", {
    cx: 6,
    cy: 6,
    r: 5.5
  }))));
};
var _path$8;
function _extends$8() {
  _extends$8 = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends$8.apply(this, arguments);
}
var SvgFileErrorStroke$1 = function SvgFileErrorStroke(props) {
  return /*#__PURE__*/reactExports.createElement("svg", _extends$8({
    xmlns: "http://www.w3.org/2000/svg",
    width: 12,
    height: 12,
    focusable: "false",
    viewBox: "0 0 12 12",
    "aria-hidden": "true"
  }, props), _path$8 || (_path$8 = /*#__PURE__*/reactExports.createElement("path", {
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round",
    d: "M10.5 3.21V11c0 .28-.22.5-.5.5H2c-.28 0-.5-.22-.5-.5V1c0-.28.22-.5.5-.5h5.79c.13 0 .26.05.35.15l2.21 2.21c.1.09.15.21.15.35zM7.5.5V3c0 .28.22.5.5.5h2.5M4 9.5l4-4m0 4l-4-4"
  })));
};
var _path$7, _rect;
function _extends$7() {
  _extends$7 = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends$7.apply(this, arguments);
}
var SvgFilePdfStroke = function SvgFilePdfStroke(props) {
  return /*#__PURE__*/reactExports.createElement("svg", _extends$7({
    xmlns: "http://www.w3.org/2000/svg",
    width: 16,
    height: 16,
    focusable: "false",
    viewBox: "0 0 16 16",
    "aria-hidden": "true"
  }, props), _path$7 || (_path$7 = /*#__PURE__*/reactExports.createElement("path", {
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round",
    d: "M14.5 4.2V15a.5.5 0 01-.5.5H2a.5.5 0 01-.5-.5V1A.5.5 0 012 .5h8.85a.5.5 0 01.36.15l3.15 3.2a.5.5 0 01.14.35zm-10 8.3h7m-7-2h7m-1-10V4a.5.5 0 00.5.5h3.5"
  })), _rect || (_rect = /*#__PURE__*/reactExports.createElement("rect", {
    width: 8,
    height: 2,
    x: 4,
    y: 7,
    fill: "currentColor",
    rx: 0.5,
    ry: 0.5
  })));
};
var _path$6;
function _extends$6() {
  _extends$6 = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends$6.apply(this, arguments);
}
var SvgFileZipStroke = function SvgFileZipStroke(props) {
  return /*#__PURE__*/reactExports.createElement("svg", _extends$6({
    xmlns: "http://www.w3.org/2000/svg",
    width: 16,
    height: 16,
    focusable: "false",
    viewBox: "0 0 16 16",
    "aria-hidden": "true"
  }, props), _path$6 || (_path$6 = /*#__PURE__*/reactExports.createElement("path", {
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round",
    d: "M6.5.5v11M5 2.5h1.5m0 1H8m-3 1h1.5m0 1H8m-3 1h1.5m0 1H8m-3 1h1.5m0 1H8m-3 1h1.5m8-6.3V15c0 .28-.22.5-.5.5H2c-.28 0-.5-.22-.5-.5V1c0-.28.22-.5.5-.5h8.85c.13 0 .26.05.36.15l3.15 3.2c.09.1.14.22.14.35zm-4-3.7V4c0 .28.22.5.5.5h3.5"
  })));
};
var _path$5, _circle;
function _extends$5$1() {
  _extends$5$1 = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends$5$1.apply(this, arguments);
}
var SvgFileImageStroke = function SvgFileImageStroke(props) {
  return /*#__PURE__*/reactExports.createElement("svg", _extends$5$1({
    xmlns: "http://www.w3.org/2000/svg",
    width: 16,
    height: 16,
    focusable: "false",
    viewBox: "0 0 16 16",
    "aria-hidden": "true"
  }, props), _path$5 || (_path$5 = /*#__PURE__*/reactExports.createElement("path", {
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round",
    d: "M14.5 4.2V15c0 .28-.22.5-.5.5H2c-.28 0-.5-.22-.5-.5V1c0-.28.22-.5.5-.5h8.85c.13 0 .26.05.36.15l3.15 3.2c.09.1.14.22.14.35zm-4-3.7V4c0 .28.22.5.5.5h3.5m-11 9l2.65-2.65c.2-.2.51-.2.71 0l1.79 1.79c.2.2.51.2.71 0l.79-.79c.2-.2.51-.2.71 0l1.65 1.65"
  })), _circle || (_circle = /*#__PURE__*/reactExports.createElement("circle", {
    cx: 10.5,
    cy: 8.5,
    r: 1.5,
    fill: "currentColor"
  })));
};
var _path$4$1;
function _extends$4$1() {
  _extends$4$1 = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends$4$1.apply(this, arguments);
}
var SvgFileDocumentStroke = function SvgFileDocumentStroke(props) {
  return /*#__PURE__*/reactExports.createElement("svg", _extends$4$1({
    xmlns: "http://www.w3.org/2000/svg",
    width: 16,
    height: 16,
    focusable: "false",
    viewBox: "0 0 16 16",
    "aria-hidden": "true"
  }, props), _path$4$1 || (_path$4$1 = /*#__PURE__*/reactExports.createElement("path", {
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round",
    d: "M4.5 7.5h7m-7 1.97h7m-7 2h7m3-7.27V15c0 .28-.22.5-.5.5H2c-.28 0-.5-.22-.5-.5V1c0-.28.22-.5.5-.5h8.85c.13 0 .26.05.36.15l3.15 3.2c.09.1.14.22.14.35zm-4-3.7V4c0 .28.22.5.5.5h3.5"
  })));
};
var _path$3$1;
function _extends$3$1() {
  _extends$3$1 = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends$3$1.apply(this, arguments);
}
var SvgFileSpreadsheetStroke = function SvgFileSpreadsheetStroke(props) {
  return /*#__PURE__*/reactExports.createElement("svg", _extends$3$1({
    xmlns: "http://www.w3.org/2000/svg",
    width: 16,
    height: 16,
    focusable: "false",
    viewBox: "0 0 16 16",
    "aria-hidden": "true"
  }, props), _path$3$1 || (_path$3$1 = /*#__PURE__*/reactExports.createElement("path", {
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round",
    d: "M4.5 7.5h2m-2 2h2m-2 2h2m2-4h3m-3 2h3m-3 2h3m3-7.3V15c0 .28-.22.5-.5.5H2c-.28 0-.5-.22-.5-.5V1c0-.28.22-.5.5-.5h8.85c.13 0 .26.05.36.15l3.15 3.2c.09.1.14.22.14.35zm-4-3.7V4c0 .28.22.5.5.5h3.5"
  })));
};
var _path$2$1;
function _extends$2$1() {
  _extends$2$1 = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends$2$1.apply(this, arguments);
}
var SvgFilePresentationStroke = function SvgFilePresentationStroke(props) {
  return /*#__PURE__*/reactExports.createElement("svg", _extends$2$1({
    xmlns: "http://www.w3.org/2000/svg",
    width: 16,
    height: 16,
    focusable: "false",
    viewBox: "0 0 16 16",
    "aria-hidden": "true"
  }, props), _path$2$1 || (_path$2$1 = /*#__PURE__*/reactExports.createElement("path", {
    fill: "none",
    stroke: "currentColor",
    d: "M14.5 4.2V15c0 .28-.22.5-.5.5H2c-.28 0-.5-.22-.5-.5V1c0-.28.22-.5.5-.5h8.85c.13 0 .26.05.36.15l3.15 3.2c.09.1.14.22.14.35zm-4-3.7V4c0 .28.22.5.5.5h3.5M7 9.5h4c.28 0 .5.22.5.5v3c0 .28-.22.5-.5.5H7c-.28 0-.5-.22-.5-.5v-3c0-.28.22-.5.5-.5zm-.5 2H5c-.28 0-.5-.22-.5-.5V8c0-.28.22-.5.5-.5h4c.28 0 .5.22.5.5v1.5"
  })));
};
var _path$1$1;
function _extends$1$1() {
  _extends$1$1 = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends$1$1.apply(this, arguments);
}
var SvgFileGenericStroke = function SvgFileGenericStroke(props) {
  return /*#__PURE__*/reactExports.createElement("svg", _extends$1$1({
    xmlns: "http://www.w3.org/2000/svg",
    width: 16,
    height: 16,
    focusable: "false",
    viewBox: "0 0 16 16",
    "aria-hidden": "true"
  }, props), _path$1$1 || (_path$1$1 = /*#__PURE__*/reactExports.createElement("path", {
    fill: "none",
    stroke: "currentColor",
    d: "M14.5 4.2V15c0 .28-.22.5-.5.5H2c-.28 0-.5-.22-.5-.5V1c0-.28.22-.5.5-.5h8.85c.13 0 .26.05.36.15l3.15 3.2c.09.1.14.22.14.35zm-4-3.7V4c0 .28.22.5.5.5h3.5"
  })));
};
var _path$o;
function _extends$u() {
  _extends$u = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends$u.apply(this, arguments);
}
var SvgFileErrorStroke = function SvgFileErrorStroke(props) {
  return /*#__PURE__*/reactExports.createElement("svg", _extends$u({
    xmlns: "http://www.w3.org/2000/svg",
    width: 16,
    height: 16,
    focusable: "false",
    viewBox: "0 0 16 16",
    "aria-hidden": "true"
  }, props), _path$o || (_path$o = /*#__PURE__*/reactExports.createElement("path", {
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round",
    d: "M14.5 4.205V15a.5.5 0 01-.5.5H2a.5.5 0 01-.5-.5V1A.5.5 0 012 .5h8.853a.5.5 0 01.356.15l3.148 3.204a.5.5 0 01.143.35zM10.5.5V4a.5.5 0 00.5.5h3.5m-9 8l5-5m0 5l-5-5"
  })));
};
const fileIconsDefault = {
  pdf: /*#__PURE__*/React.createElement(SvgFilePdfStroke, null),
  zip: /*#__PURE__*/React.createElement(SvgFileZipStroke, null),
  image: /*#__PURE__*/React.createElement(SvgFileImageStroke, null),
  document: /*#__PURE__*/React.createElement(SvgFileDocumentStroke, null),
  spreadsheet: /*#__PURE__*/React.createElement(SvgFileSpreadsheetStroke, null),
  presentation: /*#__PURE__*/React.createElement(SvgFilePresentationStroke, null),
  generic: /*#__PURE__*/React.createElement(SvgFileGenericStroke, null),
  success: /*#__PURE__*/React.createElement(SvgCheckCircleStroke$1, null),
  error: /*#__PURE__*/React.createElement(SvgFileErrorStroke, null)
};
const fileIconsCompact = {
  pdf: /*#__PURE__*/React.createElement(SvgFilePdfStroke$1, null),
  zip: /*#__PURE__*/React.createElement(SvgFileZipStroke$1, null),
  image: /*#__PURE__*/React.createElement(SvgFileImageStroke$1, null),
  document: /*#__PURE__*/React.createElement(SvgFileDocumentStroke$1, null),
  spreadsheet: /*#__PURE__*/React.createElement(SvgFileSpreadsheetStroke$1, null),
  presentation: /*#__PURE__*/React.createElement(SvgFilePresentationStroke$1, null),
  generic: /*#__PURE__*/React.createElement(SvgFileGenericStroke$1, null),
  success: /*#__PURE__*/React.createElement(SvgCheckCircleStroke, null),
  error: /*#__PURE__*/React.createElement(SvgFileErrorStroke$1, null)
};
const FileComponent = /*#__PURE__*/reactExports.forwardRef((_ref, ref) => {
  let {
    children,
    type,
    isCompact,
    focusInset,
    validation,
    ...props
  } = _ref;
  const fileContextValue = reactExports.useMemo(() => ({
    isCompact
  }), [isCompact]);
  const validationType = validation || type;
  return /*#__PURE__*/React.createElement(FileContext.Provider, {
    value: fileContextValue
  }, /*#__PURE__*/React.createElement(StyledFile, _extends$t({}, props, {
    isCompact: isCompact,
    focusInset: focusInset,
    validation: validation,
    ref: ref
  }), validationType && /*#__PURE__*/React.createElement(StyledFileIcon, {
    isCompact: isCompact
  }, isCompact ? fileIconsCompact[validationType] : fileIconsDefault[validationType]), reactExports.Children.map(children, child => typeof child === 'string' ? /*#__PURE__*/React.createElement("span", null, child) : child)));
});
FileComponent.displayName = 'File';
FileComponent.propTypes = {
  focusInset: propTypesExports.bool,
  isCompact: propTypesExports.bool,
  type: propTypesExports.oneOf(FILE_TYPE),
  validation: propTypesExports.oneOf(FILE_VALIDATION)
};
const File = FileComponent;
File.Close = Close;
File.Delete = Delete;
const MediaInput = /*#__PURE__*/React.forwardRef((_ref, ref) => {
  let {
    start,
    end,
    disabled,
    isCompact,
    isBare,
    focusInset,
    readOnly,
    validation,
    wrapperProps = {},
    wrapperRef,
    onSelect,
    ...props
  } = _ref;
  const fieldContext = useFieldContext$1();
  const inputRef = reactExports.useRef();
  const [isFocused, setIsFocused] = reactExports.useState(false);
  const [isHovered, setIsHovered] = reactExports.useState(false);
  const {
    onClick,
    onFocus,
    onBlur,
    onMouseOver,
    onMouseOut,
    ...otherWrapperProps
  } = wrapperProps;
  const onFauxInputClickHandler = composeEventHandlers$1(onClick, () => {
    inputRef.current && inputRef.current.focus();
  });
  const onFauxInputFocusHandler = composeEventHandlers$1(onFocus, () => {
    setIsFocused(true);
  });
  const onFauxInputBlurHandler = composeEventHandlers$1(onBlur, () => {
    setIsFocused(false);
  });
  const onFauxInputMouseOverHandler = composeEventHandlers$1(onMouseOver, () => {
    setIsHovered(true);
  });
  const onFauxInputMouseOutHandler = composeEventHandlers$1(onMouseOut, () => {
    setIsHovered(false);
  });
  const onSelectHandler = readOnly ? composeEventHandlers$1(onSelect, event => {
    event.currentTarget.select();
  }) : onSelect;
  let combinedProps = {
    disabled,
    readOnly,
    ref: mergeRefs([inputRef, ref]),
    onSelect: onSelectHandler,
    ...props
  };
  let isLabelHovered;
  if (fieldContext) {
    combinedProps = fieldContext.getInputProps(combinedProps, {
      isDescribed: true
    });
    isLabelHovered = fieldContext.isLabelHovered;
  }
  return /*#__PURE__*/React.createElement(FauxInput, _extends$t({
    tabIndex: null,
    onClick: onFauxInputClickHandler,
    onFocus: onFauxInputFocusHandler,
    onBlur: onFauxInputBlurHandler,
    onMouseOver: onFauxInputMouseOverHandler,
    onMouseOut: onFauxInputMouseOutHandler,
    disabled: disabled,
    isFocused: isFocused,
    isHovered: isHovered || isLabelHovered,
    isCompact: isCompact,
    isBare: isBare,
    focusInset: focusInset,
    readOnly: readOnly,
    validation: validation,
    mediaLayout: true
  }, otherWrapperProps, {
    ref: wrapperRef
  }), start && /*#__PURE__*/React.createElement(FauxInput.StartIcon, {
    isDisabled: disabled,
    isFocused: isFocused,
    isHovered: isHovered || isLabelHovered
  }, start), /*#__PURE__*/React.createElement(StyledTextMediaInput, combinedProps), end && /*#__PURE__*/React.createElement(FauxInput.EndIcon, {
    isDisabled: disabled,
    isFocused: isFocused,
    isHovered: isHovered || isLabelHovered
  }, end));
});
MediaInput.propTypes = {
  isCompact: propTypesExports.bool,
  isBare: propTypesExports.bool,
  focusInset: propTypesExports.bool,
  validation: propTypesExports.oneOf(VALIDATION),
  start: propTypesExports.node,
  end: propTypesExports.node,
  wrapperProps: propTypesExports.object,
  wrapperRef: propTypesExports.any
};
MediaInput.displayName = 'MediaInput';/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */
const stateReducer = (state, action) => {
  switch (action.type) {
    case 'END':
    case 'HOME':
    case 'FOCUS':
    case 'INCREMENT':
    case 'DECREMENT':
      {
        return {
          ...state,
          focusedItem: action.payload
        };
      }
    case 'MOUSE_SELECT':
      {
        return {
          ...state,
          selectedItem: action.payload,
          focusedItem: undefined
        };
      }
    case 'KEYBOARD_SELECT':
      {
        return {
          ...state,
          selectedItem: action.payload
        };
      }
    case 'EXIT_WIDGET':
      {
        return {
          ...state,
          focusedItem: undefined
        };
      }
    default:
      return state;
  }
};
const useSelection = function (_temp) {
  let {
    direction = 'horizontal',
    defaultFocusedIndex = 0,
    defaultSelectedIndex,
    rtl,
    selectedItem,
    focusedItem,
    onSelect,
    onFocus
  } = _temp === void 0 ? {} : _temp;
  const isSelectedItemControlled = selectedItem !== undefined;
  const isFocusedItemControlled = focusedItem !== undefined;
  const refs = [];
  const items = [];
  const [state, dispatch] = reactExports.useReducer(stateReducer, {
    selectedItem,
    focusedItem
  });
  const controlledFocusedItem = getControlledValue(focusedItem, state.focusedItem);
  const controlledSelectedItem = getControlledValue(selectedItem, state.selectedItem);
  reactExports.useEffect(() => {
    if (controlledFocusedItem !== undefined) {
      const focusedIndex = items.indexOf(controlledFocusedItem);
      refs[focusedIndex] && refs[focusedIndex].current.focus();
    }
  }, [controlledFocusedItem]);
  reactExports.useEffect(() => {
    if (selectedItem === undefined && defaultSelectedIndex !== undefined) {
      onSelect && onSelect(items[defaultSelectedIndex]);
      if (!isSelectedItemControlled) {
        dispatch({
          type: 'KEYBOARD_SELECT',
          payload: items[defaultSelectedIndex]
        });
      }
    }
  }, []);
  const getContainerProps = function (_temp2) {
    let {
      role = 'listbox',
      ...other
    } = _temp2 === void 0 ? {} : _temp2;
    return {
      role: role === null ? undefined : role,
      'data-garden-container-id': 'containers.selection',
      'data-garden-container-version': '2.0.2',
      ...other
    };
  };
  const getItemProps = _ref => {
    let {
      selectedAriaKey = 'aria-selected',
      role = 'option',
      onFocus: onFocusCallback,
      onKeyDown,
      onClick,
      item,
      focusRef,
      refKey = 'ref',
      ...other
    } = _ref;
    refs.push(focusRef);
    items.push(item);
    const isSelected = controlledSelectedItem === item;
    const isFocused = controlledFocusedItem === undefined ? isSelected : controlledFocusedItem === item;
    const tabIndex = isFocused || controlledSelectedItem === undefined && controlledFocusedItem === undefined && items.indexOf(item) === defaultFocusedIndex ? 0 : -1;
    const verticalDirection = direction === 'vertical' || direction === 'both';
    const horizontalDirection = direction === 'horizontal' || direction === 'both';
    const handleFocus = () => {
      onFocus && onFocus(item);
      if (!isFocusedItemControlled) {
        dispatch({
          type: 'FOCUS',
          payload: item
        });
      }
    };
    const handleClick = () => {
      onSelect && onSelect(item);
      onFocus && onFocus();
      if (!isSelectedItemControlled) {
        dispatch({
          type: 'MOUSE_SELECT',
          payload: item
        });
      }
    };
    const handleKeyDown = event => {
      let nextIndex;
      let currentIndex;
      if (isFocusedItemControlled) {
        currentIndex = items.indexOf(focusedItem);
      } else {
        currentIndex = items.indexOf(state.focusedItem || state.selectedItem);
      }
      const onIncrement = () => {
        nextIndex = currentIndex + 1;
        if (currentIndex === items.length - 1) {
          nextIndex = 0;
        }
        !isFocusedItemControlled && dispatch({
          type: 'INCREMENT',
          payload: items[nextIndex]
        });
        onFocus && onFocus(items[nextIndex]);
      };
      const onDecrement = () => {
        nextIndex = currentIndex - 1;
        if (currentIndex === 0) {
          nextIndex = items.length - 1;
        }
        !isFocusedItemControlled && dispatch({
          type: 'DECREMENT',
          payload: items[nextIndex]
        });
        onFocus && onFocus(items[nextIndex]);
      };
      const hasModifierKeyPressed = event.ctrlKey || event.metaKey || event.shiftKey || event.altKey;
      if (!hasModifierKeyPressed) {
        if (event.key === KEYS$1.UP && verticalDirection || event.key === KEYS$1.LEFT && horizontalDirection) {
          if (rtl && horizontalDirection) {
            onIncrement();
          } else {
            onDecrement();
          }
          event.preventDefault();
        } else if (event.key === KEYS$1.DOWN && verticalDirection || event.key === KEYS$1.RIGHT && horizontalDirection) {
          if (rtl && horizontalDirection) {
            onDecrement();
          } else {
            onIncrement();
          }
          event.preventDefault();
        } else if (event.key === KEYS$1.HOME) {
          if (!isFocusedItemControlled) {
            dispatch({
              type: 'HOME',
              payload: items[0]
            });
          }
          onFocus && onFocus(items[0]);
          event.preventDefault();
        } else if (event.key === KEYS$1.END) {
          if (!isFocusedItemControlled) {
            dispatch({
              type: 'END',
              payload: items[items.length - 1]
            });
          }
          onFocus && onFocus(items[items.length - 1]);
          event.preventDefault();
        } else if (event.key === KEYS$1.SPACE || event.key === KEYS$1.ENTER) {
          onSelect && onSelect(item);
          if (!isSelectedItemControlled) {
            dispatch({
              type: 'KEYBOARD_SELECT',
              payload: item
            });
          }
          event.preventDefault();
        }
      }
    };
    const onBlur = event => {
      if (event.target.tabIndex === 0) {
        if (!isFocusedItemControlled) {
          dispatch({
            type: 'EXIT_WIDGET'
          });
        }
        onFocus && onFocus();
      }
    };
    return {
      role: role === null ? undefined : role,
      tabIndex,
      [selectedAriaKey]: selectedAriaKey ? isSelected : undefined,
      [refKey]: focusRef,
      onFocus: composeEventHandlers$1(onFocusCallback, handleFocus),
      onClick: composeEventHandlers$1(onClick, handleClick),
      onKeyDown: composeEventHandlers$1(onKeyDown, handleKeyDown),
      onBlur,
      ...other
    };
  };
  return {
    focusedItem: controlledFocusedItem,
    selectedItem: controlledSelectedItem,
    getItemProps,
    getContainerProps
  };
};
({
  children: propTypesExports.func,
  render: propTypesExports.func,
  rtl: propTypesExports.bool,
  direction: propTypesExports.oneOf(['horizontal', 'vertical', 'both']),
  defaultFocusedIndex: propTypesExports.number,
  defaultSelectedIndex: propTypesExports.number,
  focusedItem: propTypesExports.any,
  selectedItem: propTypesExports.any,
  onSelect: propTypesExports.func,
  onFocus: propTypesExports.func
});/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */
function _extends$5() {
  _extends$5 = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends$5.apply(this, arguments);
}
const DropdownContext = /*#__PURE__*/React.createContext(undefined);
const useDropdownContext = () => {
  const dropdownContext = reactExports.useContext(DropdownContext);
  if (!dropdownContext) {
    throw new Error('This component must be rendered within a `Dropdown` component.');
  }
  return dropdownContext;
};
const REMOVE_ITEM_STATE_TYPE = 'REMOVE_ITEM';
const Dropdown = props => {
  const {
    children,
    isOpen,
    selectedItem,
    selectedItems,
    highlightedIndex,
    inputValue,
    onSelect,
    onStateChange,
    onInputValueChange,
    downshiftProps
  } = props;
  const itemIndexRef = reactExports.useRef(0);
  const previousItemRef = reactExports.useRef(undefined);
  const previousIndexRef = reactExports.useRef(undefined);
  const nextItemsHashRef = reactExports.useRef({});
  const containsMultiselectRef = reactExports.useRef(false);
  const itemSearchRegistry = reactExports.useRef([]);
  const [dropdownType, setDropdownType] = reactExports.useState('');
  const {
    rtl
  } = reactExports.useContext(Me);
  const hasMenuRef = reactExports.useRef(false);
  const popperReferenceElementRef = reactExports.useRef(null);
  const customGetInputProps = (_ref, downshift) => {
    let {
      onKeyDown,
      ...other
    } = _ref;
    return {
      onKeyDown: composeEventHandlers$1(onKeyDown, e => {
        const PREVIOUS_KEY = rtl ? KEY_CODES.RIGHT : KEY_CODES.LEFT;
        const NEXT_KEY = rtl ? KEY_CODES.LEFT : KEY_CODES.RIGHT;
        if (downshift.isOpen) {
          if (e.keyCode === PREVIOUS_KEY && previousIndexRef.current !== null && previousIndexRef.current !== undefined && !downshift.inputValue) {
            e.preventDefault();
            e.stopPropagation();
            downshift.selectItemAtIndex(previousIndexRef.current);
          }
          if (e.keyCode === NEXT_KEY) {
            const nextItemIndexes = Object.values(nextItemsHashRef.current);
            if (nextItemIndexes.includes(downshift.highlightedIndex)) {
              e.preventDefault();
              e.stopPropagation();
              downshift.selectItemAtIndex(downshift.highlightedIndex);
            }
          }
        } else if ((e.keyCode === KEY_CODES.ENTER || e.keyCode === KEY_CODES.SPACE) && !downshift.isOpen && dropdownType !== 'combobox') {
          e.preventDefault();
          e.stopPropagation();
          downshift.openMenu();
        }
      }),
      ...other
    };
  };
  const transformDownshift = _ref2 => {
    let {
      getInputProps,
      getToggleButtonProps,
      ...downshift
    } = _ref2;
    return {
      getInputProps: p => getInputProps(customGetInputProps(p, downshift)),
      getToggleButtonProps: p => getToggleButtonProps({
        'aria-label': undefined,
        ...p
      }),
      ...downshift
    };
  };
  return /*#__PURE__*/React.createElement(Manager, null, /*#__PURE__*/React.createElement(Downshift$1, _extends$5({
    suppressRefError: true,
    isOpen: isOpen,
    highlightedIndex: highlightedIndex,
    selectedItem: selectedItem || null,
    inputValue: inputValue,
    onInputValueChange: (inputVal, stateAndHelpers) => {
      if (onInputValueChange) {
        if (stateAndHelpers.isOpen) {
          onInputValueChange(inputVal, stateAndHelpers);
        } else if (dropdownType === 'multiselect') {
          onInputValueChange('', stateAndHelpers);
        }
      }
    },
    onStateChange: (changes, stateAndHelpers) => {
      if (dropdownType === 'autocomplete' && changes.isOpen === false && !changes.selectedItem) {
        onSelect && onSelect(selectedItem, stateAndHelpers);
      }
      if (Object.prototype.hasOwnProperty.call(changes, 'selectedItem') && changes.selectedItem !== null) {
        if (selectedItems) {
          const {
            itemToString
          } = stateAndHelpers;
          const existingItemIndex = selectedItems.findIndex(item => {
            return itemToString(item) === itemToString(changes.selectedItem);
          });
          const updatedSelectedItems = Array.from(selectedItems);
          if (existingItemIndex === -1) {
            updatedSelectedItems.splice(updatedSelectedItems.length, 0, changes.selectedItem);
          } else {
            updatedSelectedItems.splice(existingItemIndex, 1);
          }
          changes.selectedItems = updatedSelectedItems;
          delete changes.selectedItem;
          onSelect && onSelect(updatedSelectedItems, stateAndHelpers);
        } else {
          onSelect && onSelect(changes.selectedItem, stateAndHelpers);
        }
        if (dropdownType === 'multiselect') {
          stateAndHelpers.setState({
            inputValue: ''
          });
        }
      }
      onStateChange && onStateChange(changes, stateAndHelpers);
    },
    stateReducer: (_state, changes) => {
      switch (changes.type) {
        case Downshift$1.stateChangeTypes.changeInput:
          if (changes.inputValue === '' && dropdownType === 'combobox') {
            return {
              ...changes,
              isOpen: false
            };
          }
          return changes;
        default:
          return changes;
      }
    }
  }, downshiftProps), downshift => /*#__PURE__*/React.createElement(DropdownContext.Provider, {
    value: {
      hasMenuRef,
      itemIndexRef,
      previousItemRef,
      previousIndexRef,
      nextItemsHashRef,
      popperReferenceElementRef,
      selectedItems,
      downshift: transformDownshift(downshift),
      containsMultiselectRef,
      itemSearchRegistry,
      setDropdownType
    }
  }, children)));
};
Dropdown.propTypes = {
  isOpen: propTypesExports.bool,
  selectedItem: propTypesExports.any,
  selectedItems: propTypesExports.arrayOf(propTypesExports.any),
  highlightedIndex: propTypesExports.number,
  inputValue: propTypesExports.string,
  onSelect: propTypesExports.func,
  onStateChange: propTypesExports.func,
  downshiftProps: propTypesExports.object
};
function getPopperPlacement(gardenPlacement) {
  switch (gardenPlacement) {
    case 'end':
      return 'right';
    case 'end-top':
      return 'right-start';
    case 'end-bottom':
      return 'right-end';
    case 'start':
      return 'left';
    case 'start-top':
      return 'left-start';
    case 'start-bottom':
      return 'left-end';
    default:
      return gardenPlacement;
  }
}
function getRtlPopperPlacement(gardenPlacement) {
  const popperPlacement = getPopperPlacement(gardenPlacement);
  switch (popperPlacement) {
    case 'left':
      return 'right';
    case 'left-start':
      return 'right-start';
    case 'left-end':
      return 'right-end';
    case 'top-start':
      return 'top-end';
    case 'top-end':
      return 'top-start';
    case 'right':
      return 'left';
    case 'right-start':
      return 'left-start';
    case 'right-end':
      return 'left-end';
    case 'bottom-start':
      return 'bottom-end';
    case 'bottom-end':
      return 'bottom-start';
    default:
      return popperPlacement;
  }
}
function getArrowPosition(popperPlacement) {
  const arrowPositionMappings = {
    auto: 'top',
    top: 'bottom',
    'top-start': 'bottom-left',
    'top-end': 'bottom-right',
    right: 'left',
    'right-start': 'left-top',
    'right-end': 'left-bottom',
    bottom: 'top',
    'bottom-start': 'top-left',
    'bottom-end': 'top-right',
    left: 'right',
    'left-start': 'right-top',
    'left-end': 'right-bottom'
  };
  return popperPlacement ? arrowPositionMappings[popperPlacement] : 'top';
}
function getMenuPosition(popperPlacement) {
  if (popperPlacement === 'auto') {
    return 'bottom';
  }
  return popperPlacement ? popperPlacement.split('-')[0] : 'bottom';
}
const COMPONENT_ID$m = 'dropdowns.menu';
const StyledMenu = styled.ul.attrs(props => ({
  'data-garden-id': COMPONENT_ID$m,
  'data-garden-version': '8.63.2',
  className: props.isAnimated && 'is-animated'
})).withConfig({
  displayName: "StyledMenu",
  componentId: "sc-1vpttfd-0"
})(["position:static !important;max-height:", ";overflow-y:auto;", ";", ";"], props => props.maxHeight, props => props.hasArrow && arrowStyles(getArrowPosition(props.placement), {
  size: `${props.theme.space.base * 2}px`,
  inset: '2px',
  animationModifier: props.isAnimated ? '.is-animated' : undefined
}), props => retrieveComponentStyles(COMPONENT_ID$m, props));
StyledMenu.defaultProps = {
  theme: DEFAULT_THEME
};
const COMPONENT_ID$l = 'dropdowns.menu_wrapper';
const StyledMenuWrapper = styled.div.attrs(props => ({
  'data-garden-id': COMPONENT_ID$l,
  'data-garden-version': '8.63.2',
  className: props.isAnimated && 'is-animated'
})).withConfig({
  displayName: "StyledMenuWrapper",
  componentId: "sc-tiwdxz-0"
})(["", ";", ";"], props => menuStyles(getMenuPosition(props.placement), {
  theme: props.theme,
  hidden: props.isHidden,
  margin: `${props.theme.space.base * (props.hasArrow ? 2 : 1)}px`,
  zIndex: props.zIndex,
  animationModifier: props.isAnimated ? '.is-animated' : undefined
}), props => retrieveComponentStyles(COMPONENT_ID$l, props));
StyledMenuWrapper.defaultProps = {
  theme: DEFAULT_THEME
};
const COMPONENT_ID$k = 'dropdowns.separator';
const StyledSeparator = styled.li.attrs({
  'data-garden-id': COMPONENT_ID$k,
  'data-garden-version': '8.63.2',
  role: 'separator'
}).withConfig({
  displayName: "StyledSeparator",
  componentId: "sc-1mrnp18-0"
})(["display:block;margin:", "px 0;border-bottom:", ";", ";"], props => props.theme.space.base, props => `${props.theme.borders.sm} ${getColor('neutralHue', 200, props.theme)}`, props => retrieveComponentStyles(COMPONENT_ID$k, props));
StyledSeparator.defaultProps = {
  theme: DEFAULT_THEME
};
const COMPONENT_ID$j = 'dropdowns.item';
const getItemPaddingVertical = props => {
  if (props.isCompact) {
    return `${props.theme.space.base}px`;
  }
  return `${props.theme.space.base * 2}px`;
};
const getColorStyles = props => {
  let foregroundColor;
  let backgroundColor;
  if (props.disabled) {
    foregroundColor = getColor('neutralHue', 400, props.theme);
  } else if (props.isDanger) {
    foregroundColor = getColor('dangerHue', 600, props.theme);
    backgroundColor = props.isFocused ? rgba(foregroundColor, 0.08) : 'inherit';
  } else {
    foregroundColor = props.theme.colors.foreground;
    backgroundColor = props.isFocused ? getColor('primaryHue', 600, props.theme, 0.08) : 'inherit';
  }
  return Ae(["background-color:", ";color:", ";& a,& a:hover,& a:focus,& a:active{color:inherit;}"], backgroundColor, foregroundColor);
};
const StyledItem = styled.li.attrs(props => ({
  'data-garden-id': COMPONENT_ID$j,
  'data-garden-version': '8.63.2',
  'aria-disabled': props.disabled
})).withConfig({
  displayName: "StyledItem",
  componentId: "sc-1xeog7q-0"
})(["display:block;position:relative;z-index:0;cursor:", ";padding:", " ", "px;text-decoration:none;line-height:", "px;word-wrap:break-word;user-select:none;&:first-child{margin-top:", "px;}&:last-child{margin-bottom:", "px;}&:focus{outline:none;}& a,& a:hover,& a:focus,& a:active{text-decoration:none;}", ";", ";"], props => props.disabled ? 'default' : 'pointer', props => getItemPaddingVertical(props), props => props.theme.space.base * 9, props => props.theme.space.base * 5, props => props.theme.space.base, props => props.theme.space.base, props => getColorStyles(props), props => retrieveComponentStyles(COMPONENT_ID$j, props));
StyledItem.defaultProps = {
  theme: DEFAULT_THEME
};
const COMPONENT_ID$i = 'dropdowns.add_item';
const StyledAddItem = styled(StyledItem).attrs({
  'data-garden-id': COMPONENT_ID$i,
  'data-garden-version': '8.63.2'
}).withConfig({
  displayName: "StyledAddItem",
  componentId: "sc-ekqk50-0"
})(["color:", ";", ";"], props => !props.disabled && getColor('primaryHue', 600, props.theme), props => retrieveComponentStyles(COMPONENT_ID$i, props));
StyledAddItem.defaultProps = {
  theme: DEFAULT_THEME
};
const COMPONENT_ID$h = 'dropdowns.item_meta';
const StyledItemMeta = styled.span.attrs({
  'data-garden-id': COMPONENT_ID$h,
  'data-garden-version': '8.63.2'
}).withConfig({
  displayName: "StyledItemMeta",
  componentId: "sc-k6xy28-0"
})(["display:block;line-height:", "px;color:", ";font-size:", ";", ";"], props => props.theme.space.base * (props.isCompact ? 3 : 4), props => getColor('neutralHue', props.isDisabled ? 400 : 600, props.theme), props => props.theme.fontSizes.sm, props => retrieveComponentStyles(COMPONENT_ID$h, props));
StyledItemMeta.defaultProps = {
  theme: DEFAULT_THEME
};
const COMPONENT_ID$g = 'dropdowns.item_icon';
const getSizeStyles = props => {
  return Ae(["width:", ";height:calc(", "px + ", ");"], props.theme.iconSizes.md, props.theme.space.base * 5, math(`${getItemPaddingVertical(props)} * 2`));
};
const StyledItemIcon = styled.div.attrs({
  'data-garden-id': COMPONENT_ID$g,
  'data-garden-version': '8.63.2'
}).withConfig({
  displayName: "StyledItemIcon",
  componentId: "sc-1v0ty11-0"
})(["display:flex;position:absolute;top:0;", ":", "px;align-items:center;justify-content:center;transition:opacity 0.1s ease-in-out;opacity:", ";color:", ";", ";& > *{width:", ";height:", ";}"], props => props.theme.rtl ? 'right' : 'left', props => props.theme.space.base * 3, props => props.isVisible ? '1' : '0', props => props.isDisabled ? 'inherit' : getColor('primaryHue', 600, props.theme), props => getSizeStyles(props), props => props.theme.iconSizes.md, props => props.theme.iconSizes.md);
StyledItemIcon.defaultProps = {
  theme: DEFAULT_THEME
};
const COMPONENT_ID$f = 'dropdowns.next_item';
const StyledNextItem = styled(StyledItem).attrs({
  'data-garden-id': COMPONENT_ID$f,
  'data-garden-version': '8.63.2'
}).withConfig({
  displayName: "StyledNextItem",
  componentId: "sc-1bcygn5-0"
})(["", "{right:", ";left:", ";}", ";"], StyledItemIcon, props => props.theme.rtl ? 'auto' : `${props.theme.space.base * 3}px`, props => props.theme.rtl ? `${props.theme.space.base * 3}px` : 'auto', props => retrieveComponentStyles(COMPONENT_ID$f, props));
StyledNextItem.defaultProps = {
  theme: DEFAULT_THEME
};
var _path$4;
function _extends$4() {
  _extends$4 = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends$4.apply(this, arguments);
}
var SvgChevronRightStroke = function SvgChevronRightStroke(props) {
  return /*#__PURE__*/reactExports.createElement("svg", _extends$4({
    xmlns: "http://www.w3.org/2000/svg",
    width: 16,
    height: 16,
    focusable: "false",
    viewBox: "0 0 16 16",
    "aria-hidden": "true"
  }, props), _path$4 || (_path$4 = /*#__PURE__*/reactExports.createElement("path", {
    fill: "currentColor",
    d: "M5.61 3.312a.5.5 0 01.718-.69l.062.066 4 5a.5.5 0 01.054.542l-.054.082-4 5a.5.5 0 01-.83-.55l.05-.074L9.359 8l-3.75-4.688z"
  })));
};
const COMPONENT_ID$e = 'dropdowns.next_item_icon';
const NextIconComponent = _ref => {
  let {
    className
  } = _ref;
  return /*#__PURE__*/React.createElement(SvgChevronRightStroke, {
    "data-garden-id": COMPONENT_ID$e,
    "data-garden-version": '8.63.2',
    className: className
  });
};
const StyledNextIcon = styled(NextIconComponent).withConfig({
  displayName: "StyledNextIcon",
  componentId: "sc-1rinki2-0"
})(["transform:", ";color:", ";", ";"], props => props.theme.rtl && 'rotate(180deg)', props => props.isDisabled ? 'inherit' : getColor('neutralHue', 600, props.theme), props => retrieveComponentStyles(COMPONENT_ID$e, props));
StyledNextIcon.defaultProps = {
  theme: DEFAULT_THEME
};
const COMPONENT_ID$d = 'dropdowns.previous_item';
const StyledPreviousItem = styled(StyledItem).attrs({
  'data-garden-id': COMPONENT_ID$d,
  'data-garden-version': '8.63.2'
}).withConfig({
  displayName: "StyledPreviousItem",
  componentId: "sc-1nmdds9-0"
})(["font-weight:", ";", ";"], props => props.theme.fontWeights.semibold, props => retrieveComponentStyles(COMPONENT_ID$d, props));
StyledPreviousItem.defaultProps = {
  theme: DEFAULT_THEME
};
var _path$3;
function _extends$3() {
  _extends$3 = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends$3.apply(this, arguments);
}
var SvgChevronLeftStroke = function SvgChevronLeftStroke(props) {
  return /*#__PURE__*/reactExports.createElement("svg", _extends$3({
    xmlns: "http://www.w3.org/2000/svg",
    width: 16,
    height: 16,
    focusable: "false",
    viewBox: "0 0 16 16",
    "aria-hidden": "true"
  }, props), _path$3 || (_path$3 = /*#__PURE__*/reactExports.createElement("path", {
    fill: "currentColor",
    d: "M10.39 12.688a.5.5 0 01-.718.69l-.062-.066-4-5a.5.5 0 01-.054-.542l.054-.082 4-5a.5.5 0 01.83.55l-.05.074L6.641 8l3.75 4.688z"
  })));
};
const COMPONENT_ID$c = 'dropdowns.previous_item_icon';
const PreviousIconComponent = _ref => {
  let {
    className
  } = _ref;
  return /*#__PURE__*/React.createElement(SvgChevronLeftStroke, {
    "data-garden-id": COMPONENT_ID$c,
    "data-garden-version": '8.63.2',
    className: className
  });
};
const StyledPreviousIcon = styled(PreviousIconComponent).withConfig({
  displayName: "StyledPreviousIcon",
  componentId: "sc-czfwj7-0"
})(["transform:", ";color:", ";", ";"], props => props.theme.rtl && 'rotate(180deg)', props => props.isDisabled ? 'inherit' : getColor('neutralHue', 600, props.theme), props => retrieveComponentStyles(COMPONENT_ID$c, props));
StyledPreviousIcon.defaultProps = {
  theme: DEFAULT_THEME
};
const COMPONENT_ID$b = 'dropdowns.header_icon';
const StyledHeaderIcon = styled.div.attrs({
  'data-garden-id': COMPONENT_ID$b,
  'data-garden-version': '8.63.2'
}).withConfig({
  displayName: "StyledHeaderIcon",
  componentId: "sc-1fl6nsz-0"
})(["display:flex;position:absolute;top:0;bottom:0;align-items:center;justify-content:center;", ":", "px;color:", ";& > *{width:", ";height:", ";}", ";"], props => props.theme.rtl ? 'right' : 'left', props => props.theme.space.base * 3, props => getColor('neutralHue', 600, props.theme), props => props.theme.iconSizes.md, props => props.theme.iconSizes.md, props => retrieveComponentStyles(COMPONENT_ID$b, props));
StyledHeaderIcon.defaultProps = {
  theme: DEFAULT_THEME
};
const COMPONENT_ID$a = 'dropdowns.header_item';
const getHorizontalPadding = props => {
  if (props.hasIcon) {
    return undefined;
  }
  return `${props.theme.space.base * 3}px`;
};
const StyledHeaderItem = styled(StyledItem).attrs({
  'data-garden-id': COMPONENT_ID$a,
  'data-garden-version': '8.63.2'
}).withConfig({
  displayName: "StyledHeaderItem",
  componentId: "sc-137filx-0"
})(["cursor:default;padding-right:", ";padding-left:", ";font-weight:", ";", ";"], props => getHorizontalPadding(props), props => getHorizontalPadding(props), props => props.theme.fontWeights.semibold, props => retrieveComponentStyles(COMPONENT_ID$a, props));
StyledHeaderItem.defaultProps = {
  theme: DEFAULT_THEME
};
const COMPONENT_ID$9 = 'dropdowns.media_body';
const StyledMediaBody = styled.div.attrs({
  'data-garden-id': COMPONENT_ID$9,
  'data-garden-version': '8.63.2'
}).withConfig({
  displayName: "StyledMediaBody",
  componentId: "sc-36j7ef-0"
})(["display:block;overflow:hidden;padding-", ":", "px;", ";"], props => props.theme.rtl ? 'right' : 'left', props => props.theme.space.base * 2, props => retrieveComponentStyles(COMPONENT_ID$9, props));
StyledMediaBody.defaultProps = {
  theme: DEFAULT_THEME
};
const COMPONENT_ID$8 = 'dropdowns.media_figure';
const StyledMediaFigure = styled(_ref => {
  let {
    children,
    isCompact,
    theme,
    ...props
  } = _ref;
  return /*#__PURE__*/React.cloneElement(reactExports.Children.only(children), props);
}).attrs({
  'data-garden-id': COMPONENT_ID$8,
  'data-garden-version': '8.63.2'
}).withConfig({
  displayName: "StyledMediaFigure",
  componentId: "sc-2f2x8x-0"
})(["float:", ";margin-top:", "px !important;width:", ";height:", ";", ";"], props => props.theme.rtl ? 'right' : 'left', props => props.theme.space.base * 0.5, props => props.theme.iconSizes.md, props => props.theme.iconSizes.md, props => retrieveComponentStyles(COMPONENT_ID$8, props));
StyledMediaFigure.defaultProps = {
  theme: DEFAULT_THEME
};
const COMPONENT_ID$7 = 'dropdowns.media_item';
const StyledMediaItem = styled(StyledItem).attrs({
  'data-garden-id': COMPONENT_ID$7,
  'data-garden-version': '8.63.2'
}).withConfig({
  displayName: "StyledMediaItem",
  componentId: "sc-ikwshz-0"
})(["", ";"], props => retrieveComponentStyles(COMPONENT_ID$7, props));
StyledMediaItem.defaultProps = {
  theme: DEFAULT_THEME
};
const COMPONENT_ID$6 = 'dropdowns.faux_input';
const StyledFauxInput = styled(FauxInput).attrs(props => ({
  'data-garden-id': COMPONENT_ID$6,
  'data-garden-version': '8.63.2',
  mediaLayout: true,
  theme: props.theme
})).withConfig({
  displayName: "StyledFauxInput",
  componentId: "sc-1l592ed-0"
})(["cursor:", ";min-width:", "px;", ";"], props => !props.disabled && 'pointer', props => props.theme.space.base * (props.isCompact ? 25 : 36), props => retrieveComponentStyles(COMPONENT_ID$6, props));
StyledFauxInput.defaultProps = {
  theme: DEFAULT_THEME
};
const COMPONENT_ID$5 = 'dropdowns.input';
const hiddenStyling = Ae(["position:fixed;border:0;clip:rect(1px,1px,1px,1px);padding:0;width:1px;height:1px;overflow:hidden;white-space:nowrap;"]);
const StyledInput = styled(Input).attrs({
  'data-garden-id': COMPONENT_ID$5,
  'data-garden-version': '8.63.2',
  isBare: true
}).withConfig({
  displayName: "StyledInput",
  componentId: "sc-hzhvmp-0"
})(["", ";", ";"], props => props.isHidden && hiddenStyling, props => retrieveComponentStyles(COMPONENT_ID$5, props));
StyledInput.defaultProps = {
  theme: DEFAULT_THEME
};
const COMPONENT_ID$4 = 'dropdowns.select';
const StyledSelect = styled.div.attrs({
  'data-garden-id': COMPONENT_ID$4,
  'data-garden-version': '8.63.2'
}).withConfig({
  displayName: "StyledSelect",
  componentId: "sc-xifmwj-0"
})(["flex-grow:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;", ";"], props => retrieveComponentStyles(COMPONENT_ID$4, props));
StyledSelect.defaultProps = {
  theme: DEFAULT_THEME
};
const COMPONENT_ID$3 = 'dropdowns.multiselect_input';
const visibleStyling = props => {
  const margin = props.isVisible ? `${props.theme.space.base / 2}px` : 0;
  const minWidth = props.isVisible ? `${props.theme.space.base * 15}px` : 0;
  let height = '0';
  if (props.isVisible) {
    height = `${props.theme.space.base * (props.isCompact ? 5 : 8)}px`;
  }
  return Ae(["opacity:", ";margin:", ";width:", ";min-width:", ";height:", ";"], !props.isVisible && 0, margin, !props.isVisible && 0, minWidth, height);
};
const StyledMultiselectInput = styled(StyledInput).attrs({
  'data-garden-id': COMPONENT_ID$3,
  'data-garden-version': '8.63.2'
}).withConfig({
  displayName: "StyledMultiselectInput",
  componentId: "sc-1avnf6f-0"
})(["flex-basis:", "px;flex-grow:1;align-self:center;min-height:0;", ";", ";"], props => props.theme.space.base * 15, props => visibleStyling(props), props => retrieveComponentStyles(COMPONENT_ID$3, props));
StyledMultiselectInput.defaultProps = {
  theme: DEFAULT_THEME
};
const COMPONENT_ID$2 = 'dropdowns.multiselect_items_container';
const sizeStyles = props => {
  let margin;
  let padding;
  if (!props.isBare) {
    const marginVertical = props.isCompact ? `-${props.theme.space.base * 1.5}px` : `-${props.theme.space.base * 2.5}px`;
    margin = `${marginVertical} 0`;
    const paddingVertical = props.isCompact ? '3px' : '1px';
    const paddingEnd = `${props.theme.space.base}px`;
    padding = `${paddingVertical} ${props.theme.rtl ? 0 : paddingEnd} ${paddingVertical} ${props.theme.rtl ? paddingEnd : 0}`;
  }
  return Ae(["margin:", ";padding:", ";"], margin, padding);
};
const StyledMultiselectItemsContainer = styled.div.attrs({
  'data-garden-id': COMPONENT_ID$2,
  'data-garden-version': '8.63.2'
}).withConfig({
  displayName: "StyledMultiselectItemsContainer",
  componentId: "sc-1jzhet8-0"
})(["display:inline-flex;flex-grow:1;flex-wrap:wrap;min-width:0;", ";", ";"], props => sizeStyles(props), props => retrieveComponentStyles(COMPONENT_ID$2, props));
StyledMultiselectItemsContainer.defaultProps = {
  theme: DEFAULT_THEME
};
const COMPONENT_ID$1 = 'dropdowns.multiselect_item_wrapper';
const StyledMultiselectItemWrapper = styled.div.attrs({
  'data-garden-id': COMPONENT_ID$1,
  'data-garden-version': '8.63.2'
}).withConfig({
  displayName: "StyledMultiselectItemWrapper",
  componentId: "sc-1rb2bye-0"
})(["display:inline-flex;align-items:center;margin:", "px;max-width:100%;", ";"], props => props.theme.space.base / 2, props => retrieveComponentStyles(COMPONENT_ID$1, props));
StyledMultiselectItemWrapper.defaultProps = {
  theme: DEFAULT_THEME
};
const COMPONENT_ID = 'dropdowns.multiselect_more_anchor';
const StyledMultiselectMoreAnchor = styled.div.attrs({
  'data-garden-id': COMPONENT_ID,
  'data-garden-version': '8.63.2'
}).withConfig({
  displayName: "StyledMultiselectMoreAnchor",
  componentId: "sc-1m9v46e-0"
})(["display:inline-block;cursor:", ";padding:", "px 0;overflow:hidden;user-select:none;text-overflow:ellipsis;line-height:", ";white-space:nowrap;color:", ";:hover{text-decoration:", ";}", ";"], props => props.isDisabled ? 'default' : 'pointer', props => props.theme.space.base * (props.isCompact ? 0.75 : 1.5), props => props.isCompact ? '1em' : getLineHeight(props.theme.space.base * 5, props.theme.fontSizes.md), props => props.isDisabled ? getColor('neutralHue', 400, props.theme) : getColor('primaryHue', 600, props.theme), props => !props.isDisabled && 'underline', props => retrieveComponentStyles(COMPONENT_ID, props));
StyledMultiselectMoreAnchor.defaultProps = {
  theme: DEFAULT_THEME
};
({
  children: propTypesExports.any,
  refKey: propTypesExports.string
});
var _path$2;
function _extends$2() {
  _extends$2 = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends$2.apply(this, arguments);
}
var SvgChevronDownStroke = function SvgChevronDownStroke(props) {
  return /*#__PURE__*/reactExports.createElement("svg", _extends$2({
    xmlns: "http://www.w3.org/2000/svg",
    width: 16,
    height: 16,
    focusable: "false",
    viewBox: "0 0 16 16",
    "aria-hidden": "true"
  }, props), _path$2 || (_path$2 = /*#__PURE__*/reactExports.createElement("path", {
    fill: "currentColor",
    d: "M12.688 5.61a.5.5 0 01.69.718l-.066.062-5 4a.5.5 0 01-.542.054l-.082-.054-5-4a.5.5 0 01.55-.83l.074.05L8 9.359l4.688-3.75z"
  })));
};
const FieldContext = /*#__PURE__*/React.createContext(undefined);
const useFieldContext = () => {
  const fieldContext = reactExports.useContext(FieldContext);
  if (!fieldContext) {
    throw new Error('This component must be rendered within a `Field` component.');
  }
  return fieldContext;
};
const Autocomplete = /*#__PURE__*/reactExports.forwardRef((_ref, ref) => {
  let {
    children,
    inputRef: controlledInputRef,
    start,
    ...props
  } = _ref;
  const {
    popperReferenceElementRef,
    downshift: {
      getToggleButtonProps,
      getInputProps,
      getRootProps,
      isOpen
    },
    setDropdownType
  } = useDropdownContext();
  const {
    isLabelHovered
  } = useFieldContext();
  const inputRef = reactExports.useRef();
  const triggerRef = reactExports.useRef();
  const previousIsOpenRef = reactExports.useRef(isOpen);
  const [isHovered, setIsHovered] = reactExports.useState(false);
  const [isFocused, setIsFocused] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (inputRef.current && isOpen !== previousIsOpenRef.current) {
      inputRef.current.focus();
    }
    previousIsOpenRef.current = isOpen;
  }, [inputRef, isOpen]);
  const {
    type,
    onKeyDown,
    ...selectProps
  } = getToggleButtonProps(getRootProps({
    role: null,
    ...props,
    onKeyDown: e => {
      if (isOpen) {
        e.nativeEvent.preventDownshiftDefault = true;
      }
    },
    onMouseEnter: composeEventHandlers$1(props.onMouseEnter, () => setIsHovered(true)),
    onMouseLeave: composeEventHandlers$1(props.onMouseLeave, () => setIsHovered(false))
  }));
  const onSelectKeyDown = composeEventHandlers$1(props.onKeyDown, onKeyDown);
  const isContainerHovered = isLabelHovered && !isOpen;
  const isContainerFocused = isOpen || isFocused;
  reactExports.useEffect(() => {
    setDropdownType('autocomplete');
  }, [setDropdownType]);
  return /*#__PURE__*/React.createElement(Reference, null, _ref2 => {
    let {
      ref: popperReference
    } = _ref2;
    return /*#__PURE__*/React.createElement(StyledFauxInput, _extends$5({
      isHovered: isContainerHovered,
      isFocused: isContainerFocused,
      tabIndex: null,
      onKeyDown: onSelectKeyDown
    }, selectProps, {
      ref: selectRef => {
        popperReference(selectRef);
        mergeRefs([triggerRef, ref])(selectRef);
        popperReferenceElementRef.current = selectRef;
      }
    }), start && /*#__PURE__*/React.createElement(StyledFauxInput.StartIcon, {
      isHovered: isHovered || isLabelHovered && !isOpen,
      isFocused: isContainerFocused,
      isDisabled: props.disabled
    }, start), !isOpen && /*#__PURE__*/React.createElement(StyledSelect, null, children), /*#__PURE__*/React.createElement(StyledInput, getInputProps({
      isHidden: !isOpen,
      disabled: props.disabled,
      onFocus: () => {
        setIsFocused(true);
      },
      onBlur: () => {
        setIsFocused(false);
      },
      onClick: e => {
        if (isOpen) {
          e.nativeEvent.preventDownshiftDefault = true;
        }
      },
      role: 'combobox',
      ref: mergeRefs([inputRef, controlledInputRef || null])
    })), !props.isBare && /*#__PURE__*/React.createElement(StyledFauxInput.EndIcon, {
      isHovered: isHovered || isLabelHovered && !isOpen,
      isFocused: isContainerFocused,
      isDisabled: props.disabled,
      isRotated: isOpen
    }, /*#__PURE__*/React.createElement(SvgChevronDownStroke, null)));
  });
});
Autocomplete.displayName = 'Autocomplete';
Autocomplete.propTypes = {
  isCompact: propTypesExports.bool,
  isBare: propTypesExports.bool,
  disabled: propTypesExports.bool,
  focusInset: propTypesExports.bool,
  validation: propTypesExports.oneOf(VALIDATION)
};
const Combobox = /*#__PURE__*/reactExports.forwardRef((_ref, ref) => {
  let {
    isCompact,
    isBare,
    disabled,
    focusInset,
    placeholder,
    validation,
    inputRef: inputRefProp = null,
    start,
    end,
    ...props
  } = _ref;
  const {
    popperReferenceElementRef,
    downshift: {
      getToggleButtonProps,
      getInputProps,
      getRootProps,
      isOpen
    },
    setDropdownType
  } = useDropdownContext();
  const wrapperRef = reactExports.useRef();
  const inputRef = reactExports.useRef();
  const isOpenRef = reactExports.useRef(isOpen);
  const wrapperProps = getToggleButtonProps(getRootProps({
    role: null,
    type: null,
    onClick: event => {
      event.nativeEvent.preventDownshiftDefault = true;
    },
    ...props,
    onKeyDown: event => {
      event.nativeEvent.preventDownshiftDefault = true;
    }
  }));
  const inputProps = getInputProps({
    isCompact,
    isBare,
    disabled,
    focusInset,
    placeholder,
    validation,
    start,
    end,
    role: 'combobox',
    onKeyDown: event => {
      if (event.keyCode === KEY_CODES.SPACE || !isOpen && [KEY_CODES.DOWN, KEY_CODES.UP].includes(event.keyCode)) {
        event.nativeEvent.preventDownshiftDefault = true;
      }
    },
    onClick: event => {
      event.nativeEvent.preventDownshiftDefault = true;
    }
  });
  reactExports.useEffect(() => {
    if (inputRef.current && isOpen !== isOpenRef.current) {
      inputRef.current.focus();
    }
    isOpenRef.current = isOpen;
  }, [inputRef, isOpen]);
  reactExports.useEffect(() => {
    setDropdownType('combobox');
  }, [setDropdownType]);
  return /*#__PURE__*/React.createElement(Reference, null, _ref2 => {
    let {
      ref: popperReference
    } = _ref2;
    const wrapperRefProp = element => {
      popperReference(element);
      mergeRefs([wrapperRef, ref])(element);
      popperReferenceElementRef.current = element;
    };
    return /*#__PURE__*/React.createElement(MediaInput, _extends$5({}, inputProps, {
      wrapperProps: wrapperProps,
      wrapperRef: wrapperRefProp,
      ref: mergeRefs([inputRef, inputRefProp])
    }));
  });
});
Combobox.displayName = 'Combobox';
Combobox.propTypes = {
  isCompact: propTypesExports.bool,
  isBare: propTypesExports.bool,
  disabled: propTypesExports.bool,
  focusInset: propTypesExports.bool,
  placeholder: propTypesExports.string,
  validation: propTypesExports.oneOf(VALIDATION)
};
const Multiselect = /*#__PURE__*/React.forwardRef((_ref, ref) => {
  let {
    renderItem,
    placeholder,
    maxItems,
    renderShowMore,
    inputRef: externalInputRef = null,
    start,
    onKeyDown,
    ...props
  } = _ref;
  const {
    popperReferenceElementRef,
    selectedItems = [],
    containsMultiselectRef,
    previousIndexRef,
    downshift: {
      getToggleButtonProps,
      getRootProps,
      getInputProps,
      isOpen,
      closeMenu,
      inputValue,
      setState: setDownshiftState,
      itemToString
    },
    setDropdownType
  } = useDropdownContext();
  const {
    isLabelHovered
  } = useFieldContext();
  const inputRef = reactExports.useRef();
  const triggerRef = reactExports.useRef();
  const blurTimeoutRef = reactExports.useRef();
  const previousIsOpenRef = reactExports.useRef(undefined);
  const previousIsFocusedRef = reactExports.useRef(undefined);
  const [isHovered, setIsHovered] = reactExports.useState(false);
  const [isFocused, setIsFocused] = reactExports.useState(false);
  const [focusedItem, setFocusedItem] = reactExports.useState(undefined);
  const themeContext = reactExports.useContext(Me);
  const environment = useDocument(themeContext);
  const {
    getContainerProps,
    getItemProps
  } = useSelection({
    rtl: themeContext.rtl,
    focusedItem,
    selectedItem: undefined,
    onFocus: item => {
      setFocusedItem(item);
    }
  });
  reactExports.useEffect(() => {
    containsMultiselectRef.current = true;
    const tempRef = blurTimeoutRef;
    return () => {
      clearTimeout(tempRef.current);
    };
  }, []);
  reactExports.useEffect(() => {
    if (inputRef.current) {
      if (isOpen && !previousIsOpenRef.current) {
        inputRef.current.focus();
      } else if (isFocused && !previousIsFocusedRef.current && focusedItem === undefined) {
        inputRef.current.focus();
      }
    }
    previousIsOpenRef.current = isOpen;
    previousIsFocusedRef.current = isFocused;
  }, [isOpen, inputRef, isFocused, focusedItem]);
  reactExports.useEffect(() => {
    if (focusedItem !== undefined && isOpen) {
      closeMenu();
    }
  }, [focusedItem, isOpen, closeMenu]);
  const {
    type,
    ...selectProps
  } = getToggleButtonProps(getRootProps({
    tabIndex: props.disabled ? undefined : -1,
    onKeyDown: composeEventHandlers$1(onKeyDown, e => {
      if (isOpen) {
        e.nativeEvent.preventDownshiftDefault = true;
      } else if (!inputValue && e.keyCode === KEY_CODES.HOME) {
        setFocusedItem(selectedItems[0]);
        e.preventDefault();
      }
    }),
    onFocus: () => {
      setIsFocused(true);
    },
    onBlur: e => {
      const currentTarget = e.currentTarget;
      blurTimeoutRef.current = setTimeout(() => {
        if (environment && !currentTarget.contains(environment.activeElement)) {
          setIsFocused(false);
        }
      }, 0);
    },
    onMouseEnter: composeEventHandlers$1(props.onMouseEnter, () => setIsHovered(true)),
    onMouseLeave: composeEventHandlers$1(props.onMouseLeave, () => setIsHovered(false)),
    role: null,
    ...props
  }));
  const renderSelectableItem = reactExports.useCallback((item, index) => {
    const removeValue = () => {
      setDownshiftState({
        type: REMOVE_ITEM_STATE_TYPE,
        selectedItem: item
      });
      inputRef.current && inputRef.current.focus();
    };
    const renderedItem = renderItem({
      value: item,
      removeValue
    });
    const focusRef = /*#__PURE__*/React.createRef();
    const clonedChild = /*#__PURE__*/React.cloneElement(renderedItem, {
      ...getItemProps({
        item,
        focusRef,
        onKeyDown: e => {
          if (e.keyCode === KEY_CODES.DELETE || e.keyCode === KEY_CODES.BACKSPACE) {
            e.preventDefault();
            removeValue();
          }
          if (e.keyCode === KEY_CODES.END && !inputValue) {
            inputRef.current && inputRef.current.focus();
            e.preventDefault();
          }
          if (themeContext.rtl) {
            if (e.keyCode === KEY_CODES.RIGHT && index === 0) {
              e.preventDefault();
            }
            if (e.keyCode === KEY_CODES.LEFT && index === selectedItems.length - 1) {
              e.preventDefault();
              inputRef.current && inputRef.current.focus();
            }
          } else {
            if (e.keyCode === KEY_CODES.LEFT && index === 0) {
              e.preventDefault();
            }
            if (e.keyCode === KEY_CODES.RIGHT && index === selectedItems.length - 1) {
              e.preventDefault();
              inputRef.current && inputRef.current.focus();
            }
          }
        },
        onClick: e => {
          e.nativeEvent.preventDownshiftDefault = true;
        },
        tabIndex: -1
      }),
      size: props.isCompact ? 'medium' : 'large'
    });
    const key = `${itemToString(item)}-${index}`;
    return /*#__PURE__*/React.createElement(StyledMultiselectItemWrapper, {
      key: key
    }, clonedChild);
  }, [getItemProps, inputValue, renderItem, setDownshiftState, itemToString, selectedItems, props, inputRef, themeContext.rtl]);
  const items = reactExports.useMemo(() => {
    const itemValues = selectedItems || [];
    const output = [];
    for (let x = 0; x < itemValues.length; x++) {
      const item = itemValues[x];
      if (x < maxItems) {
        if (props.disabled) {
          const renderedItem = /*#__PURE__*/React.cloneElement(renderItem({
            value: item,
            removeValue: () => {
              return undefined;
            }
          }), {
            size: props.isCompact ? 'medium' : 'large'
          });
          output.push( /*#__PURE__*/React.createElement(StyledMultiselectItemWrapper, {
            key: x
          }, renderedItem));
        } else {
          output.push(renderSelectableItem(item, x));
        }
      } else if (!isFocused && !inputValue || props.disabled) {
        output.push( /*#__PURE__*/React.createElement(StyledMultiselectItemWrapper, {
          key: "more-anchor"
        }, /*#__PURE__*/React.createElement(StyledMultiselectMoreAnchor, {
          isCompact: props.isCompact,
          isDisabled: props.disabled
        }, renderShowMore ? renderShowMore(itemValues.length - x) : `+ ${itemValues.length - x} more`)));
        break;
      } else {
        output.push(renderSelectableItem(item, x));
      }
    }
    return output;
  }, [isFocused, props.disabled, renderSelectableItem, selectedItems, renderItem, inputValue, maxItems, renderShowMore, props.isCompact]);
  const isContainerHovered = isLabelHovered && !isOpen;
  const isContainerFocused = isOpen || isFocused;
  reactExports.useEffect(() => {
    setDropdownType('multiselect');
  }, [setDropdownType]);
  return /*#__PURE__*/React.createElement(Reference, null, _ref2 => {
    let {
      ref: popperReference
    } = _ref2;
    return /*#__PURE__*/React.createElement(StyledFauxInput, getContainerProps({
      ...selectProps,
      isHovered: isContainerHovered,
      isFocused: isContainerFocused,
      ref: selectRef => {
        popperReference(selectRef);
        mergeRefs([triggerRef, popperReferenceElementRef, ref])(selectRef);
      }
    }), start && /*#__PURE__*/React.createElement(StyledFauxInput.StartIcon, {
      isHovered: isHovered || isLabelHovered && !isOpen,
      isFocused: isContainerFocused,
      isDisabled: props.disabled
    }, start), /*#__PURE__*/React.createElement(StyledMultiselectItemsContainer, {
      isBare: props.isBare,
      isCompact: props.isCompact
    }, items, /*#__PURE__*/React.createElement(StyledMultiselectInput, getInputProps({
      disabled: props.disabled,
      onFocus: () => {
        setFocusedItem(undefined);
      },
      onClick: e => {
        if (inputValue && inputValue.length > 0 && isOpen) {
          e.nativeEvent.preventDownshiftDefault = true;
        }
      },
      onKeyDown: e => {
        if (!inputValue) {
          if (themeContext.rtl && e.keyCode === KEY_CODES.RIGHT && selectedItems.length > 0 && previousIndexRef.current === undefined) {
            setFocusedItem(selectedItems[selectedItems.length - 1]);
          } else if (!themeContext.rtl && e.keyCode === KEY_CODES.LEFT && selectedItems.length > 0 && previousIndexRef.current === undefined) {
            setFocusedItem(selectedItems[selectedItems.length - 1]);
          } else if (e.keyCode === KEY_CODES.BACKSPACE && selectedItems.length > 0) {
            setDownshiftState({
              type: REMOVE_ITEM_STATE_TYPE,
              selectedItem: selectedItems[selectedItems.length - 1]
            });
            e.nativeEvent.preventDownshiftDefault = true;
            e.preventDefault();
            e.stopPropagation();
          }
        }
      },
      isVisible: isFocused || inputValue || selectedItems.length === 0,
      isCompact: props.isCompact,
      role: 'combobox',
      ref: mergeRefs([inputRef, externalInputRef]),
      placeholder: selectedItems.length === 0 ? placeholder : undefined
    }))), !props.isBare && /*#__PURE__*/React.createElement(StyledFauxInput.EndIcon, {
      isHovered: isHovered || isLabelHovered && !isOpen,
      isFocused: isContainerFocused,
      isDisabled: props.disabled,
      isRotated: isOpen
    }, /*#__PURE__*/React.createElement(SvgChevronDownStroke, null)));
  });
});
Multiselect.propTypes = {
  isCompact: propTypesExports.bool,
  isBare: propTypesExports.bool,
  disabled: propTypesExports.bool,
  focusInset: propTypesExports.bool,
  renderItem: propTypesExports.func.isRequired,
  maxItems: propTypesExports.number,
  validation: propTypesExports.oneOf(['success', 'warning', 'error'])
};
Multiselect.defaultProps = {
  maxItems: 4
};
Multiselect.displayName = 'Multiselect';
const Select = /*#__PURE__*/React.forwardRef((_ref, ref) => {
  let {
    children,
    start,
    ...props
  } = _ref;
  const {
    popperReferenceElementRef,
    itemSearchRegistry,
    downshift: {
      getToggleButtonProps,
      getInputProps,
      isOpen,
      highlightedIndex,
      setHighlightedIndex,
      selectItemAtIndex,
      closeMenu
    }
  } = useDropdownContext();
  const {
    isLabelHovered
  } = useFieldContext();
  const [isHovered, setIsHovered] = reactExports.useState(false);
  const [isFocused, setIsFocused] = reactExports.useState(false);
  const hiddenInputRef = reactExports.useRef();
  const triggerRef = reactExports.useRef();
  const previousIsOpenRef = reactExports.useRef(undefined);
  const [searchString, setSearchString] = reactExports.useState('');
  const searchTimeoutRef = reactExports.useRef();
  const currentSearchIndexRef = reactExports.useRef(0);
  reactExports.useEffect(() => {
    if (hiddenInputRef.current && isOpen && !previousIsOpenRef.current) {
      hiddenInputRef.current.focus();
    }
    if (triggerRef.current && !isOpen && previousIsOpenRef.current) {
      triggerRef.current.focus();
    }
    previousIsOpenRef.current = isOpen;
  }, [isOpen, triggerRef]);
  reactExports.useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    searchTimeoutRef.current = window.setTimeout(() => {
      setSearchString('');
    }, 500);
    return () => {
      clearTimeout(searchTimeoutRef.current);
    };
  }, [searchString]);
  const searchItems = reactExports.useCallback((searchValue, startIndex, endIndex) => {
    for (let index = startIndex; index < endIndex; index++) {
      const itemTextValue = itemSearchRegistry.current[index];
      if (itemTextValue && itemTextValue.toUpperCase().indexOf(searchValue.toUpperCase()) === 0) {
        return index;
      }
    }
    return undefined;
  }, [itemSearchRegistry]);
  const onInputKeyDown = reactExports.useCallback(e => {
    if (e.keyCode === KEY_CODES.SPACE) {
      if (searchString) {
        e.preventDefault();
        e.stopPropagation();
      } else if (highlightedIndex !== null && highlightedIndex !== undefined) {
        e.preventDefault();
        e.stopPropagation();
        selectItemAtIndex(highlightedIndex);
        closeMenu();
      }
    }
    if ((e.keyCode < 48 || e.keyCode > 57) && (e.keyCode < 65 || e.keyCode > 90) && e.keyCode !== KEY_CODES.SPACE) {
      return;
    }
    const character = String.fromCharCode(e.which || e.keyCode);
    if (!character || character.length === 0) {
      return;
    }
    if (!searchString) {
      if (highlightedIndex === null || highlightedIndex === undefined) {
        currentSearchIndexRef.current = -1;
      } else {
        currentSearchIndexRef.current = highlightedIndex;
      }
    }
    const newSearchString = searchString + character;
    setSearchString(newSearchString);
    let matchingIndex = searchItems(newSearchString, currentSearchIndexRef.current + 1, itemSearchRegistry.current.length);
    if (matchingIndex === undefined) {
      matchingIndex = searchItems(newSearchString, 0, currentSearchIndexRef.current);
    }
    if (matchingIndex !== undefined) {
      setHighlightedIndex(matchingIndex);
    }
  }, [searchString, searchItems, itemSearchRegistry, highlightedIndex, selectItemAtIndex, closeMenu, setHighlightedIndex]);
  const {
    type,
    ...selectProps
  } = getToggleButtonProps({
    tabIndex: props.disabled ? undefined : 0,
    onMouseEnter: composeEventHandlers$1(props.onMouseEnter, () => setIsHovered(true)),
    onMouseLeave: composeEventHandlers$1(props.onMouseLeave, () => setIsHovered(false)),
    onFocus: composeEventHandlers$1(props.onFocus, () => setIsFocused(true)),
    onBlur: composeEventHandlers$1(props.onBlur, () => setIsFocused(false)),
    ...props
  });
  const isContainerHovered = isLabelHovered && !isOpen;
  const isContainerFocused = isFocused || isOpen;
  return /*#__PURE__*/React.createElement(Reference, null, _ref2 => {
    let {
      ref: popperReference
    } = _ref2;
    return /*#__PURE__*/React.createElement(StyledFauxInput, _extends$5({
      isHovered: isContainerHovered,
      isFocused: isContainerFocused
    }, selectProps, {
      role: "none",
      ref: selectRef => {
        popperReference(selectRef);
        mergeRefs([triggerRef, ref, popperReferenceElementRef])(selectRef);
      }
    }), start && /*#__PURE__*/React.createElement(StyledFauxInput.StartIcon, {
      isHovered: isHovered || isLabelHovered && !isOpen,
      isFocused: isContainerFocused,
      isDisabled: props.disabled
    }, start), /*#__PURE__*/React.createElement(StyledSelect, null, children), /*#__PURE__*/React.createElement(StyledInput, getInputProps({
      readOnly: true,
      isHidden: true,
      tabIndex: -1,
      ref: hiddenInputRef,
      value: '',
      onClick: e => {
        if (isOpen) {
          e.nativeEvent.preventDownshiftDefault = true;
        }
      },
      onKeyDown: onInputKeyDown
    })), !props.isBare && /*#__PURE__*/React.createElement(StyledFauxInput.EndIcon, {
      isHovered: isHovered || isLabelHovered && !isOpen,
      isFocused: isContainerFocused,
      isDisabled: props.disabled,
      isRotated: isOpen
    }, /*#__PURE__*/React.createElement(SvgChevronDownStroke, null)));
  });
});
Select.displayName = 'Select';
Select.propTypes = {
  isCompact: propTypesExports.bool,
  isBare: propTypesExports.bool,
  disabled: propTypesExports.bool,
  focusInset: propTypesExports.bool,
  validation: propTypesExports.oneOf(VALIDATION),
  start: propTypesExports.any
};
const Field = /*#__PURE__*/reactExports.forwardRef((props, fieldRef) => {
  const {
    downshift: {
      getRootProps
    }
  } = useDropdownContext();
  const [isLabelHovered, setIsLabelHovered] = reactExports.useState(false);
  const {
    ref
  } = getRootProps();
  const value = reactExports.useMemo(() => ({
    isLabelHovered,
    setIsLabelHovered
  }), [isLabelHovered, setIsLabelHovered]);
  return /*#__PURE__*/React.createElement(FieldContext.Provider, {
    value: value
  }, /*#__PURE__*/React.createElement(Field$1, _extends$5({
    ref: mergeRefs([ref, fieldRef])
  }, props)));
});
Field.displayName = 'Field';
const Hint = /*#__PURE__*/React.forwardRef((props, ref) => /*#__PURE__*/React.createElement(Hint$1, _extends$5({
  ref: ref
}, props)));
Hint.displayName = 'Hint';
const Label = /*#__PURE__*/React.forwardRef((_ref, ref) => {
  let {
    onMouseEnter,
    onMouseLeave,
    ...other
  } = _ref;
  const {
    downshift: {
      getLabelProps
    }
  } = useDropdownContext();
  const {
    setIsLabelHovered
  } = useFieldContext();
  const labelProps = getLabelProps({
    onMouseEnter: composeEventHandlers$1(onMouseEnter, () => {
      setIsLabelHovered(true);
    }),
    onMouseLeave: composeEventHandlers$1(onMouseLeave, () => {
      setIsLabelHovered(false);
    }),
    ...other
  });
  return /*#__PURE__*/React.createElement(Label$1, _extends$5({
    ref: ref
  }, labelProps));
});
Label.displayName = 'Label';
Label.propTypes = {
  isRegular: propTypesExports.bool
};
const Message = /*#__PURE__*/React.forwardRef((props, ref) => /*#__PURE__*/React.createElement(Message$1, _extends$5({
  ref: ref
}, props)));
Message.displayName = 'Message';
Message.propTypes = {
  validation: propTypesExports.oneOf(VALIDATION)
};
const SHARED_PLACEMENT = ['auto', 'top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end'];
const PLACEMENT = [...SHARED_PLACEMENT, 'end', 'end-top', 'end-bottom', 'start', 'start-top', 'start-bottom'];
const MenuContext = /*#__PURE__*/React.createContext(undefined);
const useMenuContext = () => {
  const menuContext = reactExports.useContext(MenuContext);
  if (!menuContext) {
    throw new Error('This component must be rendered within a `Menu` component.');
  }
  return menuContext;
};
const Menu = /*#__PURE__*/reactExports.forwardRef((props, menuRef) => {
  const {
    placement,
    popperModifiers,
    eventsEnabled,
    isAnimated,
    maxHeight,
    style: menuStyle,
    zIndex,
    isCompact,
    children,
    appendToNode,
    ...otherProps
  } = props;
  const {
    hasMenuRef,
    itemIndexRef,
    previousIndexRef,
    nextItemsHashRef,
    popperReferenceElementRef,
    itemSearchRegistry,
    downshift: {
      isOpen,
      getMenuProps
    }
  } = useDropdownContext();
  const scheduleUpdateRef = reactExports.useRef(undefined);
  reactExports.useEffect(() => {
    if (scheduleUpdateRef.current && isOpen) {
      scheduleUpdateRef.current();
    }
  });
  const [isVisible, setIsVisible] = reactExports.useState(isOpen);
  reactExports.useEffect(() => {
    let timeout;
    if (isOpen) {
      setIsVisible(true);
    } else if (isAnimated) {
      timeout = setTimeout(() => setIsVisible(false), 200);
    } else {
      setIsVisible(false);
    }
    return () => clearTimeout(timeout);
  }, [isOpen, isAnimated]);
  const themeContext = reactExports.useContext(Me);
  itemIndexRef.current = 0;
  nextItemsHashRef.current = {};
  previousIndexRef.current = undefined;
  itemSearchRegistry.current = [];
  const popperPlacement = themeContext.rtl ? getRtlPopperPlacement(placement) : getPopperPlacement(placement);
  return /*#__PURE__*/React.createElement(MenuContext.Provider, {
    value: {
      itemIndexRef,
      isCompact
    }
  }, /*#__PURE__*/React.createElement(Popper, {
    placement: popperPlacement,
    modifiers: popperModifiers,
    eventsEnabled: isOpen && eventsEnabled
  }, _ref => {
    let {
      ref,
      style,
      scheduleUpdate,
      placement: currentPlacement
    } = _ref;
    let computedStyle = menuStyle;
    scheduleUpdateRef.current = scheduleUpdate;
    if ((isOpen || isVisible) && popperReferenceElementRef.current && popperReferenceElementRef.current.getBoundingClientRect) {
      computedStyle = {
        width: popperReferenceElementRef.current.getBoundingClientRect().width,
        ...menuStyle
      };
    }
    const menuProps = getMenuProps({
      role: hasMenuRef.current ? 'menu' : 'listbox',
      placement: currentPlacement,
      isAnimated: isAnimated && (isOpen || isVisible),
      ...otherProps
    });
    const menu = /*#__PURE__*/React.createElement(StyledMenuWrapper, {
      ref: isOpen ? ref : undefined,
      hasArrow: menuProps.hasArrow,
      placement: menuProps.placement,
      style: style,
      isHidden: !isOpen,
      isAnimated: menuProps.isAnimated,
      zIndex: zIndex
    }, /*#__PURE__*/React.createElement(StyledMenu, _extends$5({
      ref: menuRef,
      isCompact: isCompact,
      maxHeight: maxHeight,
      style: computedStyle
    }, menuProps), (isOpen || isVisible) && children));
    return appendToNode ? /*#__PURE__*/reactDomExports.createPortal(menu, appendToNode) : menu;
  }));
});
Menu.displayName = 'Menu';
Menu.propTypes = {
  popperModifiers: propTypesExports.any,
  eventsEnabled: propTypesExports.bool,
  zIndex: propTypesExports.number,
  style: propTypesExports.object,
  placement: propTypesExports.oneOf(PLACEMENT),
  isAnimated: propTypesExports.bool,
  isCompact: propTypesExports.bool,
  hasArrow: propTypesExports.bool,
  maxHeight: propTypesExports.string
};
Menu.defaultProps = {
  placement: 'bottom-start',
  isAnimated: true,
  eventsEnabled: true,
  maxHeight: '400px',
  zIndex: 1000
};
const Separator = /*#__PURE__*/React.forwardRef((props, ref) => /*#__PURE__*/React.createElement(StyledSeparator, _extends$5({
  ref: ref
}, props)));
Separator.displayName = 'Separator';
var _path$1;
function _extends$1() {
  _extends$1 = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends$1.apply(this, arguments);
}
var SvgPlusStroke = function SvgPlusStroke(props) {
  return /*#__PURE__*/reactExports.createElement("svg", _extends$1({
    xmlns: "http://www.w3.org/2000/svg",
    width: 16,
    height: 16,
    focusable: "false",
    viewBox: "0 0 16 16",
    "aria-hidden": "true"
  }, props), _path$1 || (_path$1 = /*#__PURE__*/reactExports.createElement("path", {
    stroke: "currentColor",
    strokeLinecap: "round",
    d: "M7.5 2.5v12m6-6h-12"
  })));
};
var _path;
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
var SvgCheckLgStroke = function SvgCheckLgStroke(props) {
  return /*#__PURE__*/reactExports.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: 16,
    height: 16,
    focusable: "false",
    viewBox: "0 0 16 16",
    "aria-hidden": "true"
  }, props), _path || (_path = /*#__PURE__*/reactExports.createElement("path", {
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M1 9l4 4L15 3"
  })));
};
const ItemContext = /*#__PURE__*/React.createContext(undefined);
const useItemContext = () => {
  const context = reactExports.useContext(ItemContext);
  if (!context) {
    throw new Error('This component must be rendered within an `Item` component.');
  }
  return context;
};
const Item = /*#__PURE__*/React.forwardRef((_ref, forwardRef) => {
  let {
    value,
    disabled,
    isDanger,
    component = StyledItem,
    hasIcon,
    children,
    ...props
  } = _ref;
  const {
    selectedItems,
    hasMenuRef,
    itemSearchRegistry,
    downshift: {
      isOpen,
      selectedItem,
      highlightedIndex,
      getItemProps,
      setHighlightedIndex,
      itemToString
    }
  } = useDropdownContext();
  const {
    itemIndexRef,
    isCompact
  } = useMenuContext();
  const itemRef = reactExports.useRef();
  const Component = component;
  if ((value === undefined || value === null) && !disabled) {
    throw new Error('All Item components require a `value` prop');
  }
  const currentIndex = itemIndexRef.current;
  const isFocused = highlightedIndex === currentIndex;
  let isSelected;
  reactExports.useEffect(() => {
    if (!disabled && itemRef.current) {
      const itemTextValue = itemRef.current.innerText;
      if (itemTextValue) {
        itemSearchRegistry.current[currentIndex] = itemTextValue;
      }
    }
  });
  if (value) {
    if (selectedItems) {
      isSelected = selectedItems.some(item => {
        return itemToString(item) === itemToString(value);
      });
    } else {
      isSelected = itemToString(selectedItem) === itemToString(value);
    }
  } else {
    isSelected = false;
  }
  reactExports.useEffect(() => {
    if (isOpen && !disabled && !selectedItems && isSelected) {
      setHighlightedIndex(currentIndex);
    }
  }, [currentIndex, disabled, isOpen, isSelected, selectedItems, setHighlightedIndex]);
  const contextValue = reactExports.useMemo(() => ({
    isDisabled: disabled
  }), [disabled]);
  const ref = mergeRefs([itemRef, forwardRef]);
  if (disabled) {
    return /*#__PURE__*/React.createElement(ItemContext.Provider, {
      value: contextValue
    }, /*#__PURE__*/React.createElement(Component, _extends$5({
      ref: ref,
      disabled: disabled,
      isDanger: isDanger,
      isCompact: isCompact
    }, props), isSelected && !hasIcon && /*#__PURE__*/React.createElement(StyledItemIcon, {
      isCompact: isCompact,
      isVisible: isSelected,
      isDisabled: disabled
    }, /*#__PURE__*/React.createElement(SvgCheckLgStroke, null)), children));
  }
  itemIndexRef.current++;
  return /*#__PURE__*/React.createElement(ItemContext.Provider, {
    value: contextValue
  }, /*#__PURE__*/React.createElement(Component, getItemProps({
    item: value,
    isFocused,
    ref,
    isCompact,
    isDanger,
    ...(hasMenuRef.current && {
      role: 'menuitem',
      'aria-selected': null
    }),
    ...props
  }), isSelected && !hasIcon && /*#__PURE__*/React.createElement(StyledItemIcon, {
    isCompact: isCompact,
    isVisible: isSelected
  }, /*#__PURE__*/React.createElement(SvgCheckLgStroke, null)), children));
});
Item.displayName = 'Item';
Item.propTypes = {
  value: propTypesExports.any,
  disabled: propTypesExports.bool
};
const AddItemComponent = /*#__PURE__*/React.forwardRef((_ref, ref) => {
  let {
    children,
    disabled,
    ...props
  } = _ref;
  const {
    isCompact
  } = useMenuContext();
  return /*#__PURE__*/React.createElement(StyledAddItem, _extends$5({
    ref: ref,
    disabled: disabled
  }, props), /*#__PURE__*/React.createElement(StyledItemIcon, {
    isCompact: isCompact,
    isVisible: true,
    isDisabled: disabled
  }, /*#__PURE__*/React.createElement(SvgPlusStroke, null)), children);
});
const AddItem = /*#__PURE__*/React.forwardRef((props, ref) => /*#__PURE__*/React.createElement(Item, _extends$5({
  component: AddItemComponent,
  ref: ref
}, props, {
  hasIcon: true
})));
AddItem.displayName = 'AddItem';
AddItem.propTypes = {
  value: propTypesExports.any,
  disabled: propTypesExports.bool
};
const HeaderIcon = /*#__PURE__*/React.forwardRef((props, ref) => {
  const {
    isCompact
  } = useMenuContext();
  return /*#__PURE__*/React.createElement(StyledHeaderIcon, _extends$5({
    ref: ref,
    isCompact: isCompact
  }, props));
});
HeaderIcon.displayName = 'HeaderIcon';
const HeaderItem = /*#__PURE__*/React.forwardRef((props, ref) => {
  const {
    isCompact
  } = useMenuContext();
  return /*#__PURE__*/React.createElement(StyledHeaderItem, _extends$5({
    ref: ref,
    isCompact: isCompact
  }, props));
});
HeaderItem.displayName = 'HeaderItem';
const ItemMeta = /*#__PURE__*/React.forwardRef((props, ref) => {
  const {
    isCompact
  } = useMenuContext();
  const {
    isDisabled
  } = useItemContext();
  return /*#__PURE__*/React.createElement(StyledItemMeta, _extends$5({
    ref: ref,
    isCompact: isCompact,
    isDisabled: isDisabled
  }, props));
});
ItemMeta.displayName = 'ItemMeta';
const MediaBody = /*#__PURE__*/React.forwardRef((props, ref) => {
  const {
    isCompact
  } = useMenuContext();
  return /*#__PURE__*/React.createElement(StyledMediaBody, _extends$5({
    ref: ref,
    isCompact: isCompact
  }, props));
});
MediaBody.displayName = 'MediaBody';
const MediaItem = /*#__PURE__*/React.forwardRef((props, ref) => /*#__PURE__*/React.createElement(Item, _extends$5({
  component: StyledMediaItem,
  ref: ref
}, props)));
MediaItem.displayName = 'MediaItem';
MediaItem.propTypes = {
  value: propTypesExports.any,
  disabled: propTypesExports.bool
};
const NextItemComponent = /*#__PURE__*/React.forwardRef((_ref, ref) => {
  let {
    children,
    disabled,
    ...props
  } = _ref;
  const {
    isCompact
  } = useMenuContext();
  return /*#__PURE__*/React.createElement(StyledNextItem, _extends$5({
    ref: ref,
    disabled: disabled
  }, props), /*#__PURE__*/React.createElement(StyledItemIcon, {
    isCompact: isCompact,
    isDisabled: disabled,
    isVisible: true
  }, /*#__PURE__*/React.createElement(StyledNextIcon, {
    isDisabled: disabled
  })), children);
});
const NextItem = /*#__PURE__*/React.forwardRef((_ref2, ref) => {
  let {
    value,
    disabled,
    ...props
  } = _ref2;
  const {
    nextItemsHashRef,
    downshift: {
      itemToString
    }
  } = useDropdownContext();
  const {
    itemIndexRef
  } = useMenuContext();
  if (!disabled) {
    nextItemsHashRef.current[itemToString(value)] = itemIndexRef.current;
  }
  return /*#__PURE__*/React.createElement(Item, _extends$5({
    component: NextItemComponent,
    "aria-expanded": true,
    disabled: disabled,
    value: value,
    ref: ref
  }, props, {
    hasIcon: true
  }));
});
NextItem.displayName = 'NextItem';
NextItem.propTypes = {
  value: propTypesExports.any,
  disabled: propTypesExports.bool
};
const PreviousItemComponent = /*#__PURE__*/React.forwardRef((_ref, ref) => {
  let {
    children,
    disabled,
    ...props
  } = _ref;
  const {
    isCompact
  } = useMenuContext();
  return /*#__PURE__*/React.createElement(StyledPreviousItem, _extends$5({
    ref: ref,
    disabled: disabled
  }, props), /*#__PURE__*/React.createElement(StyledItemIcon, {
    isCompact: isCompact,
    isDisabled: disabled,
    isVisible: true
  }, /*#__PURE__*/React.createElement(StyledPreviousIcon, {
    isDisabled: disabled
  })), children);
});
const PreviousItem = /*#__PURE__*/React.forwardRef((_ref2, ref) => {
  let {
    value,
    disabled,
    ...props
  } = _ref2;
  const {
    previousIndexRef
  } = useDropdownContext();
  const {
    itemIndexRef
  } = useMenuContext();
  if (!disabled) {
    previousIndexRef.current = itemIndexRef.current;
  }
  return /*#__PURE__*/React.createElement(Item, _extends$5({
    component: PreviousItemComponent,
    "aria-expanded": true,
    value: value,
    disabled: disabled
  }, props, {
    ref: ref,
    hasIcon: true
  }));
});
PreviousItem.displayName = 'PreviousItem';
PreviousItem.propTypes = {
  value: propTypesExports.any,
  disabled: propTypesExports.bool
};const Theme = ({
  children
}) => {
  // Apply neutral theming for Garden components in modals
  const theme = () => ({
    ...DEFAULT_THEME,
    colors: {
      ...DEFAULT_THEME.colors,
      primaryHue: window.themeSettings.brandColor
    },
    borders: {
      sm: '1px solid #87929D',
      md: '5px solid #87929D'
    },
    components: {
      "dropdowns.faux_input": () => {
        return "border-color: #87929D";
      },
      "buttons.anchor": p => {
        const color = p.isDanger ? "#cc3340" : "#1F73B7"; // Guide-Blue
        return `color: ${color} !important;`;
      },
      "buttons.button": p => {
        if (p.isPrimary) return `background-color: black`;
        if (p.isNeutral) return `
            border-color: black !important;
            color: black !important;
          `;
        return `color: black !important`;
      },
      "modals.backdrop": `
        z-index: 2147483647; /* needs to be higher than the z-index of the navbar */
      `
    }
  });
  return /*#__PURE__*/React.createElement(ThemeProvider, {
    theme: theme
  }, children);
};
Theme.propTypes = {
  children: propTypesExports.node
};/* 
  [
    {label: '-', value: ''},
    {
      label: 'warm',
      options: [
        {label: 'Yellow', value: 'warm_yellow'},
        {label: 'red', value: 'warm_red'}
      ]
    },
    {
      label: 'cold',
      options: [
        {label: 'Blue', value: 'blue'},
        {label: 'Green', value: 'cold_green'}
      ]
    }
  ]
*/

const Nested = ({
  input,
  options,
  aria,
  initialValue
}) => {
  const [state, setState] = reactExports.useState({
    isOpen: false,
    tempSelectedItem: undefined,
    selectedItem: undefined
  });
  const [selectedItem, setSelectedItem] = reactExports.useState(initialValue || options[0]);
  return /*#__PURE__*/React.createElement(Theme, null, /*#__PURE__*/React.createElement(Dropdown, {
    isOpen: state.isOpen,
    onSelect: item => {
      if (!item.options && item !== "back") {
        setSelectedItem(item);
        input.value = item.value;
      }
    },
    onStateChange: (changes, stateAndHelpers) => {
      const updatedState = {};
      if (Object.hasOwn(changes, "isOpen")) {
        updatedState.isOpen = changes.selectedItem && changes.selectedItem.options || changes.selectedItem === "back" || changes.isOpen;
      }
      if (Object.hasOwn(changes, "selectedItem")) {
        updatedState.tempSelectedItem = changes.selectedItem === "back" ? undefined : changes.selectedItem;
        stateAndHelpers.setHighlightedIndex(1);
      }
      if (Object.keys(updatedState).length > 0) {
        setState(updatedState);
      }
    }
  }, /*#__PURE__*/React.createElement(Field, null, /*#__PURE__*/React.createElement(Select, null, selectedItem.label)), /*#__PURE__*/React.createElement(Menu, null, state.tempSelectedItem && state.tempSelectedItem.options ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(PreviousItem, {
    value: "back"
  }, "Back"), /*#__PURE__*/React.createElement(Separator, null), state.tempSelectedItem.options.map(option => option.options ? /*#__PURE__*/React.createElement(NextItem, {
    key: option.value,
    value: option
  }, option.label) : /*#__PURE__*/React.createElement(Item, {
    key: option.value,
    value: option
  }, option.label))) : options.map(option => option.options ? /*#__PURE__*/React.createElement(NextItem, {
    key: option.value,
    value: option
  }, option.label) : /*#__PURE__*/React.createElement(Item, {
    key: option.value,
    value: option
  }, option.label)))));
};
window.addEventListener("DOMContentLoaded", () => {
  const inputs = [...document.querySelectorAll("[data-tagger]")];
  console.log(inputs);
  const findOption = (arr, value) => {
    for (const obj of arr) {
      if (obj.value === value) return obj;
      if (obj.options) {
        const nestedObj = findOption(obj.options, value);
        if (nestedObj) return nestedObj;
      }
    }
  };
  inputs.forEach(input => {
    // Create root
    const container = document.createElement("div");
    input.parentNode.insertBefore(container, input.nextSibling);

    // Extract data
    const options = JSON.parse(input.getAttribute("data-tagger"));
    const aria = {
      required: input.getAttribute("aria-required"),
      labelledby: input.getAttribute("aria-labelledby"),
      describedby: input.getAttribute("aria-describedby")
    };
    const initialValue = findOption(options, input.value);
    console.log(initialValue);

    // Delete nesty
    const nestyInput = input.parentNode.querySelector(".nesty-input");
    nestyInput.remove();
    ReactDOM.render( /*#__PURE__*/React.createElement(Nested, {
      input: input,
      options: options,
      aria: aria,
      initialValue: initialValue
    }), container);
  });
});const TicketFormSelector = ({
  select,
  options,
  aria,
  initialValue
}) => {
  const [selectedItem, setSelectedItem] = reactExports.useState(options.find(option => option.value === initialValue));
  const onSelect = option => {
    setSelectedItem(option);
    window.location.assign(option.url);
  };
  return /*#__PURE__*/React.createElement(Theme, null, /*#__PURE__*/React.createElement(Dropdown, {
    selectedItem: selectedItem,
    onSelect: onSelect,
    downshiftProps: {
      itemToString: item => item && item.label
    }
  }, /*#__PURE__*/React.createElement(Field, null, /*#__PURE__*/React.createElement(Select, null, selectedItem.label)), /*#__PURE__*/React.createElement(Menu, null, options.map(option => /*#__PURE__*/React.createElement(Item, {
    key: option.value,
    value: option
  }, option.label)))));
};
window.addEventListener("DOMContentLoaded", () => {
  const formSelect = document.querySelector("#request_issue_type_select");
  if (!formSelect) return;

  // Create root
  const container = document.createElement("div");
  formSelect.parentNode.insertBefore(container, formSelect.nextSibling);
  const options = [...formSelect.options].map(option => ({
    label: option.text,
    value: option.value,
    url: option.dataset.url
  }));
  const aria = {
    label: formSelect.getAttribute("aria-label")
  };
  const initialValue = formSelect.value;

  // Delete nesty
  const nestyInput = formSelect.parentNode.querySelector(".nesty-input");
  nestyInput.remove();
  ReactDOM.render( /*#__PURE__*/React.createElement(TicketFormSelector, {
    select: formSelect,
    options: options,
    aria: aria,
    initialValue: initialValue
  }), container);
});const SelectDropdown = ({
  select,
  options,
  aria,
  initialValue
}) => {
  const [selectedItem, setSelectedItem] = reactExports.useState(options.find(option => option.value === initialValue));
  const onSelect = option => {
    setSelectedItem(option);
    select.value = option.value;
  };
  return /*#__PURE__*/React.createElement(Theme, null, /*#__PURE__*/React.createElement(Dropdown, {
    selectedItem: selectedItem,
    onSelect: onSelect,
    downshiftProps: {
      itemToString: item => item && item.label
    }
  }, /*#__PURE__*/React.createElement(Field, null, /*#__PURE__*/React.createElement(Select, null, selectedItem.label)), /*#__PURE__*/React.createElement(Menu, null, options.map(option => option.value !== "" && /*#__PURE__*/React.createElement(Item, {
    key: option.value,
    value: option
  }, option.label)))));
};
window.addEventListener("DOMContentLoaded", () => {
  const selects = [...document.querySelectorAll(".form-field select")];
  selects.forEach(select => {
    if (select.id === "request_issue_type_select") return;

    // Create root
    const container = document.createElement("div");
    select.parentNode.insertBefore(container, select.nextSibling);
    const options = [...select.options].map(option => ({
      label: option.text,
      value: option.value
    }));
    const aria = {
      required: select.getAttribute("aria-required"),
      describedby: select.getAttribute("aria-describedby")
    };
    const initialValue = select.value;

    // Delete nesty
    const nestyInput = select.parentNode.querySelector(".nesty-input");
    nestyInput.remove();
    ReactDOM.render( /*#__PURE__*/React.createElement(SelectDropdown, {
      select: select,
      options: options,
      aria: aria,
      initialValue: initialValue
    }), container);
  });
});})();