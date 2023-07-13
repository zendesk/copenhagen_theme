const isPrintableChar = (str) => {
  return str.length === 1 && str.match(/^\S$/);
};

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

  const toggleId = this.toggle.getAttribute("id") || crypto.randomUUID();
  const menuId = this.menu.getAttribute("id") || crypto.randomUUID();

  this.toggle.setAttribute("id", toggleId);
  this.menu.setAttribute("id", menuId);

  this.toggle.setAttribute("aria-controls", menuId);
  this.menu.setAttribute("aria-labelledby", toggleId);

  this.menu.setAttribute("tabindex", -1);
}

Dropdown.prototype = {
  get isExpanded() {
    return this.toggle.getAttribute("aria-expanded") === "true";
  },

  get menuItems() {
    return Array.prototype.slice.call(
      this.menu.querySelectorAll("[role='menuitem']")
    );
  },

  dismiss: function () {
    if (!this.isExpanded) return;

    this.toggle.removeAttribute("aria-expanded");
    this.menu.classList.remove("dropdown-menu-end", "dropdown-menu-top");
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

  focusFirstMenuItem: function () {
    if (!this.menuItems.length) return;

    this.menuItems[0].focus();
  },

  focusLastMenuItem: function () {
    if (!this.menuItems.length) return;

    this.menuItems[this.menuItems.length - 1].focus();
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
      this.menuItems[index].focus();
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
    const currentElement = e.target;

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
