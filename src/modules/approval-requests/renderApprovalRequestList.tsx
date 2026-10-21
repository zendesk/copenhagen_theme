import { render } from "react-dom";
import { createTranslationLoader } from "../shared/i18n/createTranslationLoader";
import ApprovalRequestListPage from "./ApprovalRequestListPage";
import type { ApprovalRequestListPageProps } from "./ApprovalRequestListPage";
import {
  sharedTranslations,
  createTheme,
  ThemeProviders,
  initI18next,
  loadTranslations,
} from "../shared";
import type { Settings } from "../shared";
import { ErrorBoundary } from "../shared/error-boundary/ErrorBoundary";

export async function renderApprovalRequestList(
  container: HTMLElement,
  settings: Settings,
  props: ApprovalRequestListPageProps & { locale: string },
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
        <ApprovalRequestListPage {...props} helpCenterPath={helpCenterPath} />
      </ErrorBoundary>
    </ThemeProviders>,
    container
  );
}
