import { describe, expect, it } from "@jest/globals";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const commentForms = [
  ["templates/article_page.hbs", "article-comment-body-label"],
  ["templates/community_post_page.hbs", "community-comment-body-label"],
  ["templates/request_page.hbs", "request-comment-body-label"],
];

describe("comment form labels", () => {
  it.each(commentForms)(
    "%s renders a visible label associated with its rich-text editor",
    (templatePath, labelId) => {
      const template = readFileSync(resolve(templatePath), "utf8");

      expect(template).toContain(
        `{{label 'body' id='${labelId}' class='comment-label'}}`
      );
      expect(template).toContain(
        `{{wysiwyg 'body' aria-labelledby='${labelId}'`
      );
    }
  );

  it("keeps comment labels visible above their editors", () => {
    const styles = readFileSync(resolve("styles/_comments.scss"), "utf8");

    expect(styles).toContain(`&-label {
    display: block;
    font-size: $font-size-small;
    margin-bottom: 10px;
  }`);
  });
});
