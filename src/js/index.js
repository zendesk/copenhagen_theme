import { menu } from './modules/menu';
import { collapse } from './modules/collapse';
import { subjectsList } from './modules/subjectsList';

(() => {
  const app = {
    init() {
      menu.init();
      collapse.init();
      subjectsList.init();
    }
  };

  document.addEventListener('DOMContentLoaded', app.init);
})();
