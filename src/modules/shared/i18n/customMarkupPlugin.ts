import type { PostProcessorModule } from "i18next";

const RANGE_REGEX = /{{#(\w+)}}(.*?){{\/\1}}/g;
const SELF_CLOSING_REGEX = /{{#(\w+)\/}}/g;

/**
 * Custom i18next post processor to replace range placeholders to HTML tags.
 *
 * For example, `{{#strong}}Hello{{/strong}}` will be converted to `<strong>Hello</strong>`,
 * and `{{#br/}}` will be converted to `<br/>`.
 *
 * The first format is used in our translations strings, while the second format is the one
 * used in the Trans component from the `react-i18next` library.
 */
export const customMarkupPlugin: PostProcessorModule = {
  type: "postProcessor",
  name: "customMarkup",
  process(value: string) {
    return value
      .replace(RANGE_REGEX, "<$1>$2</$1>")
      .replace(SELF_CLOSING_REGEX, "<$1/>");
  },
};
