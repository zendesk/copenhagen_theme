import {
  useToast,
  Close,
  Notification,
  Title,
} from "@zendeskgarden/react-notifications";
import type { ToastNotification } from "./ToastNotification";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Anchor } from "@zendeskgarden/react-buttons";
import styled from "styled-components";

const StyledLink = styled(Anchor)`
  text-decoration: underline;
  display: block;
  margin-top: ${props => props.theme.space.xxs}px;
`;

export const useNotify = () => {
  const { addToast } = useToast();
  const { t } = useTranslation();

  const notify = useCallback(
    ({ title, message, type, link }: ToastNotification) => {
      addToast(({ close }) => (
        <Notification type={type}>
          {title && <Title>{title}</Title>}
            {message}
            {link && (
              <StyledLink href={link.href}>
                {link.text}
              </StyledLink>
            )}
          <Close
            aria-label={t("cph-theme-shared.close-label", "Close")}
            onClick={close}
          />
        </Notification>
      ));
    },
    [addToast, t]
  );

  return notify;
};
