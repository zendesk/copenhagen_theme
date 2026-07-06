import { Field } from "@zendeskgarden/react-forms";
import type { FormErrors } from "./FormState";
import { useTranslation } from "react-i18next";

interface FieldErrorProps<FieldKey extends string> {
  errors: FormErrors<FieldKey>;
  field: FieldKey;
}

export function FieldError<FieldKey extends string>({
  errors,
  field,
}: FieldErrorProps<FieldKey>): JSX.Element | null {
  const { t } = useTranslation();

  return errors[field] ? (
    <Field.Message
      validation="error"
      validationLabel={t("guide-requests-app.error-icon-label", "Error")}
    >
      {errors[field]}
    </Field.Message>
  ) : null;
}
