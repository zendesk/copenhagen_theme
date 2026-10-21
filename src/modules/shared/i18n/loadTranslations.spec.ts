import i18next from "i18next";
import { createTranslationLoader } from "./createTranslationLoader";
import { initI18next } from "./initI18next";
import { loadTranslations } from "./loadTranslations";

function source(name: string, locales: Record<string, Record<string, string>>) {
  return createTranslationLoader(
    name,
    jest.fn(async (locale: string) => {
      const translations = locales[locale];
      if (!translations) {
        throw new Error(`Unknown variable dynamic import: ${locale}`);
      }
      return { default: translations };
    })
  );
}

beforeEach(() => {
  initI18next("fr");
  jest.spyOn(console, "error").mockImplementation(() => undefined);
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe("loadTranslations", () => {
  it("loads translations when the requested and base locales are the same", async () => {
    initI18next("en-us");
    const form = source("new-request-form", {
      "en-us": { submit: "Submit a request" },
    });
    const fields = source("ticket-fields", {
      "en-us": { subject: "Subject" },
    });

    await loadTranslations("en-us", "en-us", [form, fields]);

    expect(i18next.t("submit")).toBe("Submit a request");
    expect(i18next.t("subject")).toBe("Subject");
  });

  it("prefers Canadian French and uses base French for sources without it", async () => {
    const form = source("new-request-form", {
      "fr-ca": { submit: "Soumettre une demande" },
      fr: { submit: "Envoyer une demande" },
    });
    const fields = source("ticket-fields", { fr: { subject: "Sujet" } });
    const shared = source("shared", {
      "fr-ca": { cancel: "Annuler la demande" },
      fr: { cancel: "Annuler" },
    });

    await loadTranslations("fr-CA", "fr", [form, fields, shared]);

    expect(i18next.language).toBe("fr");
    expect(i18next.t("submit")).toBe("Soumettre une demande");
    expect(i18next.t("subject")).toBe("Sujet");
    expect(i18next.t("cancel")).toBe("Annuler la demande");
    expect(console.error).not.toHaveBeenCalled();
  });

  it("keeps English defaults when neither locale loads, without losing other sources", async () => {
    const form = source("new-request-form", {
      "en-us": { submit: "Submit a request" },
    });
    const fields = source("ticket-fields", { fr: { subject: "Sujet" } });
    const shared = source("shared", { fr: { cancel: "Annuler" } });

    await loadTranslations("fr-ca", "fr", [fields, form, shared]);

    expect(i18next.t("submit", "Submit a request")).toBe("Submit a request");
    expect(i18next.t("subject")).toBe("Sujet");
    expect(i18next.t("cancel")).toBe("Annuler");
    expect(jest.mocked(form.importLocale).mock.calls).toEqual([
      ["fr-ca"],
      ["fr"],
    ]);
    expect(console.error).toHaveBeenCalledWith(
      "Cannot load translations for new-request-form (locale: fr-ca, base locale: fr)",
      expect.any(Error)
    );
  });

  it("uses base French if the Canadian French bundle fails to download", async () => {
    const fields = source("ticket-fields", {
      "fr-ca": { subject: "Sujet de la demande" },
      fr: { subject: "Sujet" },
    });
    jest
      .mocked(fields.importLocale)
      .mockRejectedValueOnce(new Error("Translation bundle download failed"));

    await loadTranslations("fr-ca", "fr", [fields]);

    expect(i18next.t("subject")).toBe("Sujet");
    expect(console.error).not.toHaveBeenCalled();
  });

  it("does not retry the same locale when its import fails", async () => {
    const fields = source("ticket-fields", {});

    await loadTranslations("fr", "fr", [fields]);

    expect(fields.importLocale).toHaveBeenCalledTimes(1);
    expect(i18next.t("subject", "Subject")).toBe("Subject");
    expect(console.error).toHaveBeenCalledWith(
      "Cannot load translations for ticket-fields (locale: fr, base locale: fr)",
      expect.any(Error)
    );
  });

  it("loads sources in parallel while preserving declared translation precedence", async () => {
    let finishForm!: (value: { default: Record<string, string> }) => void;
    const formImport = jest.fn(
      () =>
        new Promise<{ default: Record<string, string> }>((resolve) => {
          finishForm = resolve;
        })
    );
    const form = createTranslationLoader("new-request-form", formImport);
    const shared = source("shared", { fr: { cancel: "Annuler" } });

    const loading = loadTranslations("fr", "fr", [form, shared]);

    expect(formImport).toHaveBeenCalled();
    expect(shared.importLocale).toHaveBeenCalled();
    await Promise.resolve();
    finishForm({ default: { cancel: "Annuler la demande" } });
    await loading;

    expect(i18next.t("cancel")).toBe("Annuler");
  });
});
