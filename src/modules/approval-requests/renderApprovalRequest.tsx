import { createRoot } from "react-dom/client";

import ApprovalRequestPage from "./ApprovalRequestPage";
import type { ApprovalRequestPageProps } from "./ApprovalRequestPage";
import {
  createTheme,
  ThemeProviders,
  initI18next,
  loadTranslations,
  normalizeHelpCenterPath,
} from "../shared";
import type { Settings } from "../shared";
import { ErrorBoundary } from "../shared/error-boundary/ErrorBoundary";

export async function renderApprovalRequest(
  container: HTMLElement,
  settings: Settings,
  props: ApprovalRequestPageProps,
  helpCenterPath: string
) {
  const { baseLocale } = props;
  const safeHelpCenterPath = normalizeHelpCenterPath(helpCenterPath);
  initI18next(baseLocale);
  await loadTranslations(baseLocale, [
    () => import(`./translations/locales/${baseLocale}.json`),
    () => import(`../shared/translations/locales/${baseLocale}.json`),
  ]);

  createRoot(container).render(
    <ThemeProviders theme={createTheme(settings)}>
      <ErrorBoundary helpCenterPath={safeHelpCenterPath}>
        <ApprovalRequestPage {...props} helpCenterPath={safeHelpCenterPath} />
      </ErrorBoundary>
    </ThemeProviders>
  );
}
