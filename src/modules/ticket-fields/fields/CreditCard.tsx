import {
  Field as GardenField,
  Hint,
  Label,
  MediaInput,
  Message,
} from "@zendeskgarden/react-forms";
import type { TicketFieldObject } from "../data-types/TicketFieldObject";
import { Span } from "@zendeskgarden/react-typography";
import { useTranslation } from "react-i18next";
import CreditCardIcon from "@zendeskgarden/svg-icons/src/16/credit-card-stroke.svg";
import styled from "styled-components";

interface CreditCardProps {
  field: TicketFieldObject;
  onChange: (value: string) => void;
}

/**
 * When there is an error in the credit card field, the backend returns a redacted value with the last 4 digits prefixed with some Xs.
 * This function removes the Xs from the value and returns the last 4 digits of the credit card
 *
 * @param value The value returned by the backend with last 4 digits prefixed with some Xs
 * @returns The last 4 digits of the credit card
 */
function getLastDigits(value: string): string {
  return value ? value.replaceAll("X", "") : "";
}

const DigitsHintSpan = styled(Span)`
  margin-inline-start: ${(props) => props.theme.space.xxs};
  font-weight: ${(props) => props.theme.fontWeights.medium};
`;

export function CreditCard({ field, onChange }: CreditCardProps): JSX.Element {
  const { t } = useTranslation();
  const { label, error, value, name, required, description } = field;
  const digits = getLastDigits(value as string);

  return (
    <GardenField>
      <Label>
        {label}
        {required && <Span aria-hidden="true">*</Span>}
        <DigitsHintSpan>
          {t(
            "cph-theme-ticket-fields.credit-card-digits-hint",
            "(Last 4 digits)"
          )}
        </DigitsHintSpan>
      </Label>
      {description && (
        <Hint dangerouslySetInnerHTML={{ __html: description }} />
      )}
      <MediaInput
        start={<CreditCardIcon />}
        name={name}
        type="text"
        value={digits}
        onChange={(e) => onChange(e.target.value)}
        validation={error ? "error" : undefined}
        required={required}
        maxLength={4}
        placeholder="XXXX"
      />
      {error && <Message validation="error">{error}</Message>}
    </GardenField>
  );
}
