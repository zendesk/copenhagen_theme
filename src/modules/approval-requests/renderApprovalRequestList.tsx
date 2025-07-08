import { render } from "react-dom";
import ApprovalRequestListPage from "./ApprovalRequestListPage";
import type { ApprovalRequestListPageProps } from "./ApprovalRequestListPage";
import {
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
  props: ApprovalRequestListPageProps,
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
        <ApprovalRequestListPage {...props} helpCenterPath={helpCenterPath} />
      </ErrorBoundary>
    </ThemeProviders>,
    container
  );
}
