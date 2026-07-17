import { useCallback, useRef } from "react";
import { notify } from "../../../shared";

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

  return useCallback(
    (ref: HTMLTextAreaElement | null) => {
      if (hasWysiwyg && ref && !isInitializedRef.current) {
        isInitializedRef.current = true;

        void (async () => {
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

              notify({ type, title, message });
            }
          );
        })();
      }
    },
    [hasWysiwyg, baseLocale, hasAtMentions, userRole, brandId]
  );
}
