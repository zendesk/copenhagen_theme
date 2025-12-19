import type { HCData } from "./data-types/hc/HCData";
import { ShadowRootContainer } from "@zendesk/garden-shadow";
import {
  createGardenTheme,
  ModalContainerProvider,
} from "@zendesk/guide-garden-theming";
import { ThemeProvider } from "@zendeskgarden/react-theming";
import ReactDOM from "react-dom";
import List from "./components/requests-list/RequestsList";
import { PushNotificationContext } from "./contexts/PushNotification";
import { initI18next, loadTranslations } from "./i18n";
import { ErrorBoundary } from "./components/error-boundary/ErrorBoundary";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const inCypress = (window as any).Cypress;

export default async function RequestListApp(
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

  await loadTranslations(locale, [() => import(`../locales/${locale}.json`)]);

  const helpCenterPath = `/hc/${locale}`;

  ReactDOM.render(
    <ShadowRootContainer
      mode={inCypress ? "open" : "closed"}
      data-test-id={inCypress ? "guide-requests-app" : undefined}
    >
      <ThemeProvider theme={createGardenTheme(data.user.rtl, settings)}>
        <ErrorBoundary helpCenterPath={helpCenterPath}>
          <PushNotificationContext.Provider value={pushNotification}>
            <ModalContainerProvider>
              <List
                locale={locale}
                customStatusesEnabled={hasCustomStatusesEnabled}
              />
            </ModalContainerProvider>
          </PushNotificationContext.Provider>
        </ErrorBoundary>
      </ThemeProvider>
    </ShadowRootContainer>,
    container
  );
}
