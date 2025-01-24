import { render } from "react-dom";

import ApprovalRequestPage from "./ApprovalRequestPage";
import type { ApprovalRequestPageProps } from "./ApprovalRequestPage";
import { createTheme, ThemeProviders } from "../shared";
import type { Settings } from "../shared";
import { ErrorBoundary } from "../shared/error-boundary/ErrorBoundary";

export async function renderApprovalRequest(
  container: HTMLElement,
  settings: Settings,
  props: ApprovalRequestPageProps,
  helpCenterPath: string
) {
  render(
    <ThemeProviders theme={createTheme(settings)}>
      <ErrorBoundary helpCenterPath={helpCenterPath}>
        <ApprovalRequestPage {...props} />
      </ErrorBoundary>
    </ThemeProviders>,
    container
  );
}
