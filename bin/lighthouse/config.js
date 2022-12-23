/**
 * Sets lighthouse configuration
 */
module.exports = {
  lighthouse: {
    extends: "lighthouse:default",
    settings: {
      maxWaitForLoad: 10000,
      onlyCategories: ["accessibility"],
      skipAudits: ["full-page-screenshot"],
    },
  },
  // custom properties
  custom: {
    // turn some audit errors into warnings
    ignore: {
      tabindex: [
        {
          path: "*",
          selector: "body.community-enabled > a.skip-navigation",
        },
      ],
    },
  },
};
