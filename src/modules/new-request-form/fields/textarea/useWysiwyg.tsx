import { useCallback, useRef } from "react";
import {
  Close,
  Notification,
  Title,
  useToast,
} from "@zendeskgarden/react-notifications";
import { useTranslation } from "react-i18next";

interface UseWysiwygOptions {
  hasWysiwyg: boolean;
  baseLocale: string;
  hasAtMentions: boolean;
  userRole: string;
  brandId: number;
}

export function useWysiwyg({
  hasWysiwyg,
  baseLocale,
  hasAtMentions,
  userRole,
  brandId,
}: UseWysiwygOptions) {
  const isInitializedRef = useRef(false);
  const { addToast } = useToast();
  const { t } = useTranslation();

  return useCallback(
    async (ref: HTMLTextAreaElement) => {
      if (hasWysiwyg && ref && !isInitializedRef.current) {
        isInitializedRef.current = true;

        const { createEditor } = await import("@zendesk/help-center-wysiwyg");

        const editor = await createEditor(ref, {
          editorType: "supportRequests",
          hasAtMentions,
          userRole,
          brandId,
          baseLocale,
        });

        const notifications = editor.plugins.get("Notification");

        // Handle generic notifications and errors with "toast" notifications
        notifications.on(
          "show",
          (
            event: { stop: () => void },
            data: {
              message: Error | string;
              title: string;
              type: "warning" | "info" | "success";
            }
          ) => {
            event.stop(); // Prevent the default notification from being shown via window.alert

            const message =
              data.message instanceof Error
                ? data.message.message
                : data.message;

            const { type, title } = data;

            addToast(({ close }) => (
              <Notification type={type}>
                <Title>{title}</Title>
                {message}
                <Close
                  aria-label={t("new-request-form.close-label", "Close")}
                  onClick={close}
                />
              </Notification>
            ));
          }
        );
      }
    },
    [hasWysiwyg, baseLocale, hasAtMentions, userRole, brandId, addToast, t]
  );
}
