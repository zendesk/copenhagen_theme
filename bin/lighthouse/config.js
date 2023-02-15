/**
 * Sets lighthouse configuration
 */
module.exports = {
  lighthouse: {
    extends: "lighthouse:default",
    settings: {
      maxWaitForLoad: 10000,
      onlyCategories: ["accessibility"],
      disableFullPageScreenshot: true,
    },
  },
  // custom properties
  custom: {
    // turn audit errors into warnings
    ignore: {
      tabindex: [
        {
          path: "*",
          selector: "body.community-enabled > a.skip-navigation",
        },
      ],
      "aria-allowed-attr": [
        {
          path: "/hc/:locale/community/posts/new",
          selector:
            "div#main-content > form.new_community_post > div.form-field > a.nesty-input",
        },
      ],
    },
  },
};
