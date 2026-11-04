import { useEffect } from "react";
import type { RefObject } from "react";

/* VoiceOver announces the page as soon as it starts rendering and resets its
   cursor to the top of the page, discarding any focus set before its page-load
   sweep completes. Moving focus only after the page has fully loaded plus a
   short delay makes VoiceOver respect the focused element. */
const FOCUS_DELAY_MS = 100;

interface UseFocusFirstFieldInError {
  formRef: RefObject<HTMLFormElement | null>;
  errorAlertRef?: RefObject<HTMLElement | null>;
}

/**
 * After a failed submission the page re-renders with server-side validation errors.
 * This hook moves focus to the first field in error so that keyboard and screen
 * reader users are made aware of the errors instead of having to search the page
 * for them (WCAG 2.4.3 Focus Order, 1.3.1 Info and Relationships).
 *
 * Garden renders each field validation message with role="alert" and an id ending
 * in `--message`, while the id of the associated control ends in `--input`. If no
 * field-level error is found, focus is moved to the form-level error alert.
 */
export function useFocusFirstFieldInError({
  formRef,
  errorAlertRef,
}: UseFocusFirstFieldInError): void {
  useEffect(() => {
    const form = formRef.current;

    if (!form) {
      return;
    }

    const moveFocus = () => {
      /* The user may have started interacting while the page was still loading.
         In that case do not steal focus. */
      if (document.activeElement !== document.body) {
        return;
      }

      const firstErrorMessage = form.querySelector<HTMLElement>(
        '[role="alert"][id$="--message"]'
      );

      if (firstErrorMessage) {
        const fieldControl = document.getElementById(
          firstErrorMessage.id.replace(/--message$/, "--input")
        );

        if (fieldControl) {
          fieldControl.focus();

          /* Rich text editors hide the original control, which then cannot receive
             focus. Fall back to focusing the error message so the error is still
             announced. */
          if (document.activeElement !== fieldControl) {
            focusAlert(firstErrorMessage);
          }

          return;
        }
      }

      focusAlert(errorAlertRef?.current ?? null);
    };

    let focusTimer: ReturnType<typeof setTimeout>;

    const onWindowLoad = () => {
      focusTimer = setTimeout(moveFocus, FOCUS_DELAY_MS);
    };

    if (document.readyState === "complete") {
      onWindowLoad();
    } else {
      window.addEventListener("load", onWindowLoad);
    }

    return () => {
      window.removeEventListener("load", onWindowLoad);
      clearTimeout(focusTimer);
    };
  }, [formRef, errorAlertRef]);
}

function focusAlert(alert: HTMLElement | null): void {
  if (alert) {
    alert.setAttribute("tabindex", "-1");
    alert.focus();
  }
}
