import { debounce } from '../helpers/debounce';
import { viewports } from '../../../tokens';

export const collapse = {
  init() {
    this.RESIZE_TIMEOUT = 100;

    this.CLASS_NAMES = {
      collapse: 'collapse'
    };

    this.cacheDOM();
  },

  cacheDOM() {
    this.collapseElement = document.querySelector(`.${this.CLASS_NAMES.collapse}`);

    this.bindEvents();
  },

  bindEvents() {
    this.setCollapseOpen();

    window.addEventListener(
      'resize',
      debounce(() => {
        this.setCollapseOpen();
      }, this.RESIZE_TIMEOUT)
    );
  },

  setCollapseOpen() {
    if (this.collapseElement) {
      if (window.innerWidth >= parseInt(viewports.desktop)) {
        this.collapseElement.setAttribute('open', true);
      } else {
        this.collapseElement.removeAttribute('open');
      }
    }
  }
};
