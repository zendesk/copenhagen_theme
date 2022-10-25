import { menu } from './modules/menu';
import { collapse } from './modules/collapse';

(() => {
  const app = {
    init() {
      menu.init();
      collapse.init();
    }
  };

  document.addEventListener('DOMContentLoaded', app.init);
})();
