import { render } from "react-dom";

import { ApprovalRequestListPage } from "./ApprovalRequestListPage";
import type { ApprovalRequestListPageProps } from "./ApprovalRequestListPage";

import { createTheme, ThemeProviders } from "../shared";
import type { Settings } from "../shared";

export async function renderApprovalRequestList(
  container: HTMLElement,
  settings: Settings,
  props: ApprovalRequestListPageProps,
  helpCenterPath: string
) {
  render(
    <ThemeProviders theme={createTheme(settings)}>
      {/* MKTODO: add ErrorBoundary from shared once service catalog PR is merged */}
      <ApprovalRequestListPage {...props} helpCenterPath={helpCenterPath} />
    </ThemeProviders>,
    container
  );
}
