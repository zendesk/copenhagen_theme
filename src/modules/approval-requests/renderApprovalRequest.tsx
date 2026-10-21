import { render } from "react-dom";
import { createTranslationLoader } from "../shared/i18n/createTranslationLoader";

import ApprovalRequestPage from "./ApprovalRequestPage";
import type { ApprovalRequestPageProps } from "./ApprovalRequestPage";
import {
  sharedTranslations,
  createTheme,
  ThemeProviders,
  initI18next,
  loadTranslations,
} from "../shared";
import type { Settings } from "../shared";
import { ErrorBoundary } from "../shared/error-boundary/ErrorBoundary";

export async function renderApprovalRequest(
  container: HTMLElement,
  settings: Settings,
  props: ApprovalRequestPageProps & { locale: string },
  helpCenterPath: string
) {
  const { baseLocale, locale } = props;
  initI18next(baseLocale);
  await loadTranslations(locale, baseLocale, [
    createTranslationLoader(
      "approval-requests",
      (locale) => import(`./translations/locales/${locale}.json`)
    ),
    sharedTranslations,
  ]);

  render(
    <ThemeProviders theme={createTheme(settings)}>
      <ErrorBoundary helpCenterPath={helpCenterPath}>
        <ApprovalRequestPage {...props} helpCenterPath={helpCenterPath} />
      </ErrorBoundary>
    </ThemeProviders>,
    container
  );
}
