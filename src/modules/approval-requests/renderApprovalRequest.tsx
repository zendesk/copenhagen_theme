import { render } from "react-dom";

import ApprovalRequestPage from "./ApprovalRequestPage";
import type { ApprovalRequestPageProps } from "./ApprovalRequestPage";
import {
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
  props: ApprovalRequestPageProps,
  helpCenterPath: string
) {
  const { baseLocale } = props;
  initI18next(baseLocale);
  await loadTranslations(baseLocale, [
    () => import(`./translations/locales/${baseLocale}.json`),
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
