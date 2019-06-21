const ENDPOINTS = {
  test: "https://status-app-test.jstor.org/components/",
  prod: "https://status-app.jstor.org/components/"
};
const defaultConfig = {
  environment: "test",
  webClient: fetch.bind(window),
  timerInterval: /* ms */ 1000 * /* s */ 30
};

function StatusPage(identifier, config = {}) {
  if (!identifier) {
    throw new Error("Missing `identifier`");
  }

  config = Object.assign({}, defaultConfig, config);

  let clearId = null;
  const url = ENDPOINTS[config.environment] + identifier;

  return {
    get() {
      return config.webClient(url).then(response => response.json());
    },
    subscribe(handler) {
      if (clearId) {
        throw new Error("You cannot subscribe more than once.");
      }

      const trigger = () => {
        var data, error;
        this.get()
          .then(response => (data = response))
          .catch(response => (error = response))
          .finally(() => {
            clearId = setTimeout(trigger, defaultConfig.timerInterval);
            handler(error, data);
          });
      };

      trigger();
    },
    unsubscribe() {
      clearTimeout(clearId);
      clearId = null;
    }
  };
}