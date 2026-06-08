import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { GlobalAlert } from "@zendeskgarden/react-notifications";
import { getColor } from "@zendeskgarden/react-theming";
import { useTranslation } from "react-i18next";
import { Z_INDEX_ABOVE_NAVBAR } from "../../../shared/notifications/constants";

const StyledGlobalAlert = styled(GlobalAlert)`
  background: ${({ theme }) => getColor({ theme, hue: "blue", shade: 200 })};
  border-bottom: 1px solid
    ${({ theme }) => getColor({ theme, hue: "blue", shade: 300 })};
  color: ${({ theme }) => getColor({ theme, hue: "blue", shade: 700 })};
  box-shadow: none;

  svg {
    color: ${({ theme }) => getColor({ theme, hue: "blue", shade: 600 })};
  }
`;

const StyledGlobalAlertTitle = styled(GlobalAlert.Title)`
  color: ${({ theme }) => getColor({ theme, hue: "blue", shade: 800 })};
`;

export function PreviewModeBanner() {
  const { t } = useTranslation();
  const [portalHost, setPortalHost] = useState<HTMLDivElement | null>(null);
  const initialBodyPaddingTopRef = useRef<string>("");

  useEffect(() => {
    const host = document.createElement("div");
    host.setAttribute("data-preview-mode-banner-host", "true");
    host.style.position = "fixed";
    host.style.top = "0";
    host.style.left = "0";
    host.style.right = "0";
    host.style.zIndex = String(Z_INDEX_ABOVE_NAVBAR);

    initialBodyPaddingTopRef.current = document.body.style.paddingTop;

    document.body.prepend(host);
    setPortalHost(host);

    return () => {
      host.remove();
      document.body.style.paddingTop = initialBodyPaddingTopRef.current;
      setPortalHost(null);
    };
  }, []);

  useEffect(() => {
    if (!portalHost) {
      return;
    }

    let lastPadding = "";
    let animationFrameId: number | null = null;

    const applyLayout = () => {
      animationFrameId = null;
      const bannerHeight = portalHost.offsetHeight;
      const nextPadding = `${bannerHeight}px`;
      if (nextPadding !== lastPadding) {
        document.body.style.paddingTop = nextPadding;
        lastPadding = nextPadding;
      }
    };

    const scheduleApply = () => {
      if (animationFrameId !== null) {
        return;
      }
      animationFrameId = window.requestAnimationFrame(applyLayout);
    };

    applyLayout();

    let resizeObserver: ResizeObserver | undefined;
    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(scheduleApply);
      resizeObserver.observe(portalHost);
    }

    window.addEventListener("resize", scheduleApply);

    return () => {
      if (animationFrameId !== null) {
        window.cancelAnimationFrame(animationFrameId);
      }
      resizeObserver?.disconnect();
      window.removeEventListener("resize", scheduleApply);
      document.body.style.paddingTop = initialBodyPaddingTopRef.current;
    };
  }, [portalHost]);

  if (!portalHost) {
    return null;
  }

  return createPortal(
    <div data-testid="preview-mode-banner">
      <StyledGlobalAlert type="info">
        <GlobalAlert.Content>
          <StyledGlobalAlertTitle>
            {t("service-catalog.item.preview-mode.title", "Preview mode")}
          </StyledGlobalAlertTitle>
          {t(
            "service-catalog.item.preview-mode.message",
            "If you navigate away from this page or click on anything outside of this preview, you'll exit the preview mode."
          )}
        </GlobalAlert.Content>
      </StyledGlobalAlert>
    </div>,
    portalHost
  );
}
