import { ENTER, ESCAPE, SPACE, UP, DOWN, TAB } from "./Keys";

export default function Dropdown(toggle, menu) {
  this.toggle = toggle;
  this.menu = menu;

  this.menuPlacement = {
    top: menu.classList.contains("dropdown-menu-top"),
    end: menu.classList.contains("dropdown-menu-end"),
  };

  this.toggle.addEventListener("click", this.clickHandler.bind(this));
  this.toggle.addEventListener("keydown", this.toggleKeyHandler.bind(this));
  this.menu.addEventListener("keydown", this.menuKeyHandler.bind(this));
}

Dropdown.prototype = {
  get isExpanded() {
    return this.menu.getAttribute("aria-expanded") === "true";
  },

  get menuItems() {
    return Array.prototype.slice.call(
      this.menu.querySelectorAll("[role='menuitem']")
    );
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

  focusNextMenuItem: function (currentItem) {
    if (!this.menuItems.length) return;

    var currentIndex = this.menuItems.indexOf(currentItem);
    var nextIndex =
      currentIndex === this.menuItems.length - 1 || currentIndex < 0
        ? 0
        : currentIndex + 1;

    this.menuItems[nextIndex].focus();
  },

  focusPreviousMenuItem: function (currentItem) {
    if (!this.menuItems.length) return;

    var currentIndex = this.menuItems.indexOf(currentItem);
    var previousIndex =
      currentIndex <= 0 ? this.menuItems.length - 1 : currentIndex - 1;

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
  },
};
