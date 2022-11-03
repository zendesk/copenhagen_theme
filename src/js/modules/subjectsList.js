import { debounce } from '../helpers/debounce';

export const subjectsList = {
  init() {
    this.SCROLL_TIMEOUT = 250;
    this.HEADER_HEIGHT = document.querySelector('.header').innerHeight;

    this.CLASS_NAMES = {
      list: 'subjects-list',
      listItem: 'subjects-list__item',
      listItemActive: 'subjects-list__item--active',
      sectionArticles: 'section__articles'
    };

    this.cacheDOM();
  },

  cacheDOM() {
    this.list = document.querySelector(`.${this.CLASS_NAMES.list}`);
    this.sections = document.querySelectorAll(`.${this.CLASS_NAMES.sectionArticles} section`);
    this.current = null;

    this.bindEvents();
  },

  bindEvents() {
    if (this.list && this.sections) {
      this.setFirstItemActive();

      window.addEventListener('scroll', () => this.updateActiveItem());
    }
  },

  setFirstItemActive() {
    const item = this.list.querySelector(`.${this.CLASS_NAMES.listItem}`);
    const firstSection = document.querySelector(`.${this.CLASS_NAMES.sectionArticles} section`);

    item.classList.add(this.CLASS_NAMES.listItemActive);
    this.current = firstSection.getAttribute('id');
  },

  updateActiveItem() {
    const scrollTop = window.pageYOffset;
    const activeListItem = this.list.querySelector(`.${this.CLASS_NAMES.listItemActive}`);
    const nextActive = this.list.querySelector(
      `.${this.CLASS_NAMES.listItem}[data-section="${this.current}"]`
    );

    this.sections.forEach((section) => {
      const offsetTop = section.offsetTop;

      if (scrollTop >= offsetTop) {
        this.current = section['id'];
      }
    });

    activeListItem.classList.remove(this.CLASS_NAMES.listItemActive);
    nextActive.classList.add(this.CLASS_NAMES.listItemActive);
  }
};
