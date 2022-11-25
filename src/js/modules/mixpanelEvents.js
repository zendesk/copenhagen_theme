export const mixpanelEvents = {
  init() {
    this.CLASS_NAMES = {
      pageview: 'mxp-pgv-event',
      click: 'mxp-click-event',
      search: 'mxp-sch-event',
      scroll: 'mxp-sll-event'
    };

    this.cacheDOM();
  },

  cacheDOM() {
    this.clickEventsTriggers = document.querySelectorAll(`.${this.CLASS_NAMES.click}`);
    this.pageviewEventTrigger = document.querySelector(`.${this.CLASS_NAMES.pageview}`);
    this.searchEventTrigger = document.querySelector(`.${this.CLASS_NAMES.search}`);
    this.scrollEventTrigger = document.querySelector(`.${this.CLASS_NAMES.scroll}`);

    this.articleIframe = document.querySelector('.article__content iframe');

    this.themeHasEvents = parseInt(window.sessionStorage.getItem('mxp_events')) === 1;

    this.bindEvents();
  },

  bindEvents() {
    if (this.themeHasEvents) {
      this.setupMixpanel();
    }
  },

  setupMixpanel() {
    console.log('mixpanel setup...');

    if (this.pageviewEventTrigger) {
      this.pageViewEvent();
    }

    if (this.searchEventTrigger) {
      this.searchEvent();
    }

    if (this.articleIframe) {
      this.videoEvent();
    }

    if (this.scrollEventTrigger) {
      this.attachScrollEvent();
    }

    if (this.clickEventsTriggers.length) {
      this.clickEventsTriggers.forEach((element) => {
        element.addEventListener('click', () => this.clickEvent(element));
      });
    }
  },

  pageViewEvent() {
    const eventName = this.pageviewEventTrigger.dataset['event'] || null;

    console.log('send pageview event', eventName);
  },

  clickEvent(element) {
    const eventName = element.dataset['event'] || null;
    const eventParam = element.dataset['param'] || null;

    console.log('send click event', eventName, eventParam);
  },

  searchEvent() {
    const searchURL = new URLSearchParams(window.location.search);
    const searchTerm = searchURL.get('query');

    const hasSearchResults = document.querySelector('.section__results');
    const eventType = hasSearchResults ? 'success' : 'error';
    const eventName = `w_all_faq_home_search_${eventType}`;

    console.log('send search event', eventName, searchTerm);
  },

  videoEvent() {
    document.body.addEventListener('click', () => {
      const { activeElement } = document;

      if (activeElement.tagName.toLowerCase() === 'iframe') {
        const eventName = 'w_all_faq_article_video_view';
        const eventParams = { title: document.querySelector('.article__title ').innerText };

        console.log('send video event', eventName, eventParams);
      }
    });
  },

  attachScrollEvent() {
    this.scrollDestination = this.scrollEventTrigger.dataset['scroll'];
    this.scrollElement = document.querySelector(`.${this.scrollDestination}`);
    this.scrollElementOffsetTop = this.scrollElement.offsetTop;

    this.scrollListener = () => this.calculateScroll();

    window.addEventListener('scroll', this.scrollListener);
  },

  calculateScroll() {
    const scrollTop = window.pageYOffset;

    if (scrollTop >= this.scrollElementOffsetTop / 2) {
      this.sendScrollEvent();
    }
  },

  sendScrollEvent() {
    console.log('send scroll event', 'w_all_faq_category_pg_scroll_end');

    window.removeEventListener('scroll', this.scrollListener);
  }
};
