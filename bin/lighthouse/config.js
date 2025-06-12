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
      "link-in-text-block": [
        {
          path: "/hc/:locale/community/topics/360000644279",
          selector:
            "li > section.striped-list-item > span.striped-list-info > a#title-360006766859",
        },
        {
          path: "/hc/:locale/community/topics/360000644279",
          selector:
            "li > section.striped-list-item > span.striped-list-info > a#title-360006766799",
        },
        {
          path: "/hc/:locale/community/posts",
          selector:
            "li > section.striped-list-item > span.striped-list-info > a#title-360006766799",
        },
        {
          path: "/hc/:locale/community/posts",
          selector:
            "li > section.striped-list-item > span.striped-list-info > a#title-360006766859",
        },
      ],
      "aria-allowed-attr": [
        {
          path: "/hc/:locale/community/posts/new",
          selector:
            "div#main-content > form.new_community_post > div.form-field > a.nesty-input",
        },
      ],
      "td-has-header": [
        {
          path: "/hc/:locale/subscriptions",
          selector: "main > div.container > div#main-content > table.table",
        },
      ],
      "label-content-name-mismatch": [
        {
          path: "/hc/:locale/articles/:id",
          selector:
            "footer > div.article-votes > div.article-votes-controls > button.button",
        },
      ],
      "target-size": [
        {
          path: "/hc/:locale/search",
          selector:
            "header > div.search-result-title-container > h2.search-result-title > a",
        },
        {
          path: "/hc/:locale/search",
          selector: "nav > ol.breadcrumbs > li > a",
        },
      ],
    },
  },
};
