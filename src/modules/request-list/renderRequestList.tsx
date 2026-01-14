import type { HCData } from "./data-types/hc/HCData";
import { ShadowRootContainer } from "../shared/garden-shadow/src/shadow-root-container";
import { createTheme } from "../shared/garden-theme/createTheme";
import { ThemeProviders } from "../shared/garden-theme/ThemeProviders";
import ReactDOM from "react-dom";
import { RequestsList } from "./components/requests-list/RequestsList";
import { PushNotificationContext } from "./contexts/PushNotification";
import { initI18next, loadTranslations } from "../shared/i18n";
import { ErrorBoundary } from "../shared/error-boundary/ErrorBoundary";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const inCypress = (window as any).Cypress;

export async function renderRequestList(
  container: Element,
  data: HCData
): Promise<void> {
  const {
    theme: { settings },
    user: { locale },
    pushNotification,
    hasCustomStatusesEnabled,
  } = data;

  initI18next(locale);

  await loadTranslations(locale, [
    () => import(`./translations/locales/${locale}.json`),
    () => import(`../shared/translations/locales/${locale}.json`),
  ]);

  const helpCenterPath = `/hc/${locale}`;

  ReactDOM.render(
    <ShadowRootContainer
      mode={inCypress ? "open" : "closed"}
      data-test-id={inCypress ? "guide-requests-app" : undefined}
    >
      <ThemeProviders theme={createTheme(settings)}>
        <ErrorBoundary helpCenterPath={helpCenterPath}>
          <PushNotificationContext.Provider value={pushNotification}>
            <RequestsList
              locale={locale}
              customStatusesEnabled={hasCustomStatusesEnabled}
            />
          </PushNotificationContext.Provider>
        </ErrorBoundary>
      </ThemeProviders>
    </ShadowRootContainer>,
    container
  );
}
