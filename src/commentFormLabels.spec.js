import { describe, expect, it } from "@jest/globals";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const commentForms = [
  ["templates/article_page.hbs", "article", "article-comment-body-label"],
  ["templates/community_post_page.hbs", "post", "community-comment-body-label"],
  ["templates/request_page.hbs", "request", "request-comment-body-label"],
];

describe("comment form labels", () => {
  it.each(commentForms)(
    "%s renders a unique visible label associated with its rich-text editor",
    (templatePath, entity, labelId) => {
      const template = readFileSync(resolve(templatePath), "utf8");
      const collapsedTemplate = template.replace(/\s+/g, " ");
      const uniqueLabelId = `(concat '${labelId}-' ${entity}.id)`;

      expect(collapsedTemplate).toContain(
        `<div id="{{concat '${labelId}-' ${entity}.id}}" class="comment-label"> {{label 'body'}} </div>`
      );
      expect(template).toContain(
        `{{wysiwyg 'body' aria-labelledby=${uniqueLabelId}`
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
