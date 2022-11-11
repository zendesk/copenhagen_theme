import { menu } from './modules/menu';
import { collapse } from './modules/collapse';
import { subjectsList } from './modules/subjectsList';
import { chat } from './modules/chat';

(() => {
  const app = {
    init() {
      menu.init();
      collapse.init();
      subjectsList.init();
      chat.init();
    }
  };

  document.addEventListener('DOMContentLoaded', app.init);
})();
