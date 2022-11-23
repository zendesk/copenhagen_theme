export const chat = {
  init() {
    this.CLASS_NAMES = {
      toggleChat: 'toggle-chat'
    };

    this.cacheDOM();
  },

  cacheDOM() {
    this.actionTriggers = document.querySelectorAll(`.${this.CLASS_NAMES.toggleChat}`);
    this.isChatOpen = false;

    this.themeHasWidget = parseInt(window.sessionStorage.getItem('ze_chat_enabled')) === 1;
    this.widgetIntegrationId = window.sessionStorage.getItem('ze_chat_integration_id');

    this.bindEvents();
  },

  bindEvents() {
    if (this.themeHasWidget) {
      this.initChatWidget();

      window.Smooch.on('widget:opened', () => {
        if (!this.hasConversations()) {
          this.createNewConversation();
        }
      });

      if (this.actionTriggers.length) {
        this.actionTriggers.forEach((trigger) => {
          trigger.addEventListener('click', () => this.openChatWidget());
        });
      }
    }
  },

  initChatWidget() {
    window.Smooch.init({
      integrationId: this.widgetIntegrationId,
      locale: 'pt-BR',
      canUserSeeConversationList: true,
      menuItems: {
        imageUpload: true,
        fileUpload: true,
        shareLocation: false
      },
      customText: {
        inputPlaceholder: 'Digite uma mensagem...',
        messageIndicatorTitlePlural: '({count}) novas mensagens',
        messageIndicatorTitleSingular: '({count}) nova mensagem',
        messageRelativeTimeDay: '{value}d atrás',
        messageRelativeTimeHour: '{value}h atrás',
        messageRelativeTimeJustNow: 'Agora há pouco',
        messageRelativeTimeMinute: '{value}m atrás',
        messageDelivered: 'Entregue',
        messageSeen: 'Visto',
        messageSending: 'Enviando...',
        uploadDocument: 'Arquivo',
        uploadPhoto: 'Imagem',
        formFieldSelectPlaceholderFallback: 'Escolha uma opção'
      }
    });
  },

  openChatWidget() {
    window.Smooch.open();
    this.isChatOpen = true;
  },

  closeChatWidget() {
    window.Smooch.close();
    this.isChatOpen = false;
  },

  createNewConversation() {
    window.Smooch.createConversation({});
  },

  hasConversations() {
    return !!Smooch.getConversations().length;
  }
};
