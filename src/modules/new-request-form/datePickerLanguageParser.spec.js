import { parse, parseISO } from "date-fns";
import {
  supportedLanguages,
  localeToLoad,
  getLocale,
  parseAndValidateDate,
} from "./datePickerLanguageParser";

describe("dateFnsLocalesMapper", () => {
  describe("supportedLanguages", () => {
    it("imports all items successfully", async () => {
      for (var key in supportedLanguages) {
        const locale = await getLocale(key);

        expect(locale).not.toBe(null);
        expect(locale).toBeDefined();
        expect(locale.formatLong).toBeDefined();
      }
    });
  });

  describe("localeToLoad", () => {
    it("returns a close match when specific locales are not available", () => {
      expect(localeToLoad("en-gb")).toEqual("en-150");
      expect(localeToLoad("es-419")).toEqual("es");
      expect(localeToLoad("fr-ca")).toEqual("fr");
      expect(localeToLoad("es-es")).toEqual("es");
      expect(localeToLoad("nb")).toEqual("no");
      expect(localeToLoad("pt-br")).toEqual("pt");
    });

    it("returns the default locale when given an unavailable locale", () => {
      expect(localeToLoad("fil")).toEqual("en-us");
    });
  });

  describe("parseAndValidateDate", () => {
    it("considers long format dates in french valid", async () => {
      const locale = await getLocale("fr");
      const parseResult = parseAndValidateDate("6 avril 2026", locale);

      expect(parseResult.toString()).toContain("Apr 06 2026");
    });

    it("considers long format dates in en-gb valid", async () => {
      const locale = await getLocale("en-gb");
      const parseResult = parseAndValidateDate("6 march 2026", locale);

      expect(parseResult.toString()).toContain("Mar 06 2026");
    });

    it("considers long format dates in japanese valid", async () => {
      const locale = await getLocale("ja");
      const parseResult = parseAndValidateDate("2025年3月15日", locale);

      expect(parseResult.toString()).toContain("Mar 15 2025");
    });
  });
});
