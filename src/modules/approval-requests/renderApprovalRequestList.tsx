import { render } from "react-dom";
import ApprovalRequestListPage from "./ApprovalRequestListPage";
import type { ApprovalRequestListPageProps } from "./ApprovalRequestListPage";
import { createTheme, ThemeProviders } from "../shared";
import type { Settings } from "../shared";
import { ErrorBoundary } from "../shared/error-boundary/ErrorBoundary";

export async function renderApprovalRequestList(
  container: HTMLElement,
  settings: Settings,
  props: ApprovalRequestListPageProps,
  helpCenterPath: string
) {
  render(
    <ThemeProviders theme={createTheme(settings)}>
      <ErrorBoundary helpCenterPath={helpCenterPath}>
        <ApprovalRequestListPage {...props} helpCenterPath={helpCenterPath} />
      </ErrorBoundary>
    </ThemeProviders>,
    container
  );
}
