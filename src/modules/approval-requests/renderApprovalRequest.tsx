import { render } from "react-dom";

import { ApprovalRequestPage } from "./ApprovalRequestPage";
import type { ApprovalRequestPageProps } from "./ApprovalRequestPage";

import { createTheme, ThemeProviders } from "../shared";
import type { Settings } from "../shared";

export async function renderApprovalRequest(
  container: HTMLElement,
  settings: Settings,
  props: ApprovalRequestPageProps
) {
  console.log("renderApprovalRequest");
  render(
    <ThemeProviders theme={createTheme(settings)}>
      {/* MKTODO: add ErrorBoundary from shared once service catalog PR is merged */}
      <ApprovalRequestPage {...props} />
    </ThemeProviders>,
    container
  );
}
