export interface TranslationModule {
  default: Record<string, string>;
}

export interface TranslationLoader {
  readonly name: string;
  readonly importLocale: (locale: string) => Promise<TranslationModule>;
}

export function createTranslationLoader(
  name: string,
  importLocale: TranslationLoader["importLocale"]
): TranslationLoader {
  return { name, importLocale };
}
