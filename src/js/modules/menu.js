import { debounce } from '../helpers/debounce';
import { viewports } from '../../../tokens';

export const menu = {
  init() {
    this.RESIZE_TIMEOUT = 350;

    this.CLASS_NAMES = {
      responsiveMenu: 'menu__responsive',
      responsiveMenuActive: 'menu__responsive--active',

      hamburger: 'header__hamburger',
      hamburgerActive: 'header__hamburger--open',

      menuItem: 'menu__item',
      menuItemActive: 'menu__item--active',

      submenu: 'menu__submenu',
      submenuActive: 'menu__submenu--active'
    };

    this.cacheDOM();
  },

  cacheDOM() {
    this.hamburger = document.querySelector(`.${this.CLASS_NAMES.hamburger}`);
    this.responsiveMenu = document.querySelector(`.${this.CLASS_NAMES.responsiveMenu}`);
    this.menuItemSpan = document.querySelectorAll(`.${this.CLASS_NAMES.menuItem} > span`);

    this.bindEvents();
  },

  bindEvents() {
    if (this.hamburger && this.responsiveMenu) {
      this.hamburger.addEventListener('click', () => this.toggleResponsiveMenu());

      window.addEventListener(
        'resize',
        debounce(() => {
          if (window.innerWidth >= parseInt(viewports.desktop)) {
            this.closeHamburger();
            this.closeResponsiveMenu();
          }
        }, this.RESIZE_TIMEOUT)
      );
    }

    if (this.menuItemSpan.length) {
      this.menuItemSpan.forEach((span) => {
        span.addEventListener('click', () => {
          const submenu = span.nextElementSibling;
          const menuItem = span.parentElement;

          this.toggleSubmenu(submenu, menuItem);
        });
      });
    }
  },

  closeHamburger() {
    this.hamburger.classList.remove(this.CLASS_NAMES.hamburgerActive);
  },

  closeResponsiveMenu() {
    this.responsiveMenu.classList.remove(this.CLASS_NAMES.responsiveMenuActive);
    document.querySelector('body').classList.remove('no-overflow');
  },

  toggleResponsiveMenu() {
    if (this.hamburger.classList.contains(this.CLASS_NAMES.hamburgerActive)) {
      this.closeHamburger();
      this.closeResponsiveMenu();
    } else {
      this.hamburger.classList.add(this.CLASS_NAMES.hamburgerActive);
      this.responsiveMenu.classList.add(this.CLASS_NAMES.responsiveMenuActive);
      document.querySelector('body').classList.add('no-overflow');
    }
  },

  toggleSubmenu(submenu, menuItem) {
    if (this.submenu.classList.contains(this.CLASS_NAMES.submenuActive)) {
      this.submenu.classList.remove(this.CLASS_NAMES.submenuActive);
      this.menuItem.classList.remove(this.CLASS_NAMES.menuItemActive);
    } else {
      this.submenu.classList.add(this.CLASS_NAMES.submenuActive);
      this.menuItem.classList.add(this.CLASS_NAMES.menuItemActive);
    }
  }
};
