/**
 * Filters and maps lighthouse results for a simplified output
 * If an error should be ignored, it will be converted into a warning
 */
const UrlPattern = require("url-pattern");
const config = require("./config");
const { ERROR, WARNING, SKIPPED, SUCCESS, UNKNOWN } = require("./constants");

function shouldIgnoreError(auditId, url, selector) {
  const path = new URL(url).pathname;

  return config.custom.ignore[auditId]?.some((ignore) => {
    const pattern = new UrlPattern(ignore.path);
    return Boolean(pattern.match(path)) && selector === ignore.selector;
  });
}

function processResults(lhr) {
  const url = lhr.mainDocumentUrl;
  const pageScore = lhr.categories.accessibility.score;

  const audits = Object.values(lhr.audits)
    // filter and flatten data
    .map(({ id, title, description, score, details }) => {
      const newItem = {
        id,
        url,
        title,
        description,
        score,
      };

      return details === undefined || details.items.length === 0
        ? newItem
        : details.items.map((item) => ({
            ...newItem,
            selector: item.node.selector,
            snippet: item.node.snippet,
            explanation: item.node.explanation,
          }));
    })
    .flat()
    // map lighthouse score to a result
    .map(({ score, ...audit }) => {
      const newItem = { ...audit };

      switch (score) {
        case 1:
          newItem.result = SUCCESS;
          break;
        case 0:
          newItem.result = shouldIgnoreError(
            audit.id,
            audit.url,
            audit.selector
          )
            ? WARNING
            : ERROR;
          break;
        case null:
          newItem.result = SKIPPED;
          break;
        default:
          console.error(`Error: unexpected score for audit ${audit.id}`);
          newItem.result = UNKNOWN;
      }

      return newItem;
    });

  return {
    audits,
    stats: {
      success: audits.filter((audit) => audit.result === SUCCESS).length,
      error: audits.filter((audit) => audit.result === ERROR).length,
      skipped: audits.filter((audit) => audit.result === SKIPPED).length,
      warning: audits.filter((audit) => audit.result === WARNING).length,
      unknown: audits.filter((audit) => audit.result === UNKNOWN).length,
      score: pageScore
    },
  };
}

module.exports = processResults;
