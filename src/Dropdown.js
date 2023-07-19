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
