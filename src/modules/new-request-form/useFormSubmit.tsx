import type { FormEventHandler } from "react";
import { useRef, useCallback } from "react";
import { fetchCsrfToken } from "./fetchCsrfToken";
import type { TicketFieldObject } from "../ticket-fields/data-types/TicketFieldObject";

interface UseFormSubmit {
  formRefCallback: (ref: HTMLFormElement) => void;
  handleSubmit: FormEventHandler<HTMLFormElement>;
}

/**
 * This hook creates a ref callback used to override the submit method of the form
 * that uses the callback.
 * Before submitting the form, it fetches the CSRF token from the backend and appends it to the form,
 * and redacts the value of the eventual credit card field
 * @param ticketFields array of ticket fields for the form
 * @returns a Ref callback and a submit handler
 */
export function useFormSubmit(
  ticketFields: TicketFieldObject[]
): UseFormSubmit {
  const initialized = useRef(false);
  const isSubmitting = useRef(false);

  const formRefCallback = useCallback(
    (ref: HTMLFormElement) => {
      if (ref && !initialized.current) {
        initialized.current = true;

        /* We are monkey patching the submit method of the form, since this behavior is what
           other scripts in Help Center are intercepting the submit event, stopping the event propagation and 
           calling the submit method directly */
        ref.submit = async () => {
          /* We are performing an async call to fetch the CSRF token and for this reason
           the submit is not immediate, and the user can click the submit button multiple times.
           We don't want to disable the submit button for A11Y, so we use the isSubmitting ref 
           to stop subsequent submits after the first one. */
          if (isSubmitting.current === false) {
            isSubmitting.current = true;
            const token = await fetchCsrfToken();
            const hiddenInput = document.createElement("input");
            hiddenInput.type = "hidden";
            hiddenInput.name = "authenticity_token";
            hiddenInput.value = token;
            ref.appendChild(hiddenInput);

            // The backend expects the credit card field to have a length at least of 13 characters.
            // We are prefixing the 4 digits with 9 Xs to make sure the value has the expected length
            const creditCardFields = ticketFields.filter(
              (field) => field.type === "partialcreditcard"
            );

            for (const creditCardField of creditCardFields) {
              const creditCardInput = ref.querySelector(
                `input[name="${creditCardField.name}"]`
              );
              if (
                creditCardInput &&
                creditCardInput instanceof HTMLInputElement &&
                creditCardInput.value.length === 4
              ) {
                creditCardInput.value = `XXXXXXXXX${creditCardInput.value}`;
              }
            }

            HTMLFormElement.prototype.submit.call(ref);
          }
        };
      }
    },
    [ticketFields]
  );

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    (e.target as HTMLFormElement).submit();
  };

  return { formRefCallback, handleSubmit };
}
