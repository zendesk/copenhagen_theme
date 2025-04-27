import { parse, parseISO } from "date-fns";
import {
  supportedLanguages,
  localeToLoad,
  getLocale,
  parseAndValidateDate,
} from "./datePickerLanguageParser";

describe("datePickerLanguageParser", () => {
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
      expect(localeToLoad("en-001")).toEqual("en-gb");
      expect(localeToLoad("en-150")).toEqual("en-gb");
      expect(localeToLoad("en-au")).toEqual("en-gb");
      expect(localeToLoad("en-my")).toEqual("en-gb");
      expect(localeToLoad("en-ph")).toEqual("en-gb");
      expect(localeToLoad("en-se")).toEqual("en-gb");
      expect(localeToLoad("es-419")).toEqual("es");
      expect(localeToLoad("es-es")).toEqual("es");
      expect(localeToLoad("it-ch")).toEqual("it");
      expect(localeToLoad("fr-ca")).toEqual("fr");
      expect(localeToLoad("nl-be")).toEqual("nl");
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

    it("considers long format dates in short format en valid", async () => {
      const locale = await getLocale("en-001");
      const parseResult = parseAndValidateDate("6/03/2026", locale);

      expect(parseResult.toString()).toContain("Mar 06 2026");
    });

    it("considers long format dates in short format en au valid", async () => {
      const locale = await getLocale("en-au");
      const parseResult = parseAndValidateDate("2026-06-03", locale);

      expect(parseResult.toString()).toContain("Jun 03 2026");
    });

    it("considers long format dates in japanese valid", async () => {
      const locale = await getLocale("ja");
      const parseResult = parseAndValidateDate("2025年3月15日", locale);

      expect(parseResult.toString()).toContain("Mar 15 2025");
    });
  });
});
