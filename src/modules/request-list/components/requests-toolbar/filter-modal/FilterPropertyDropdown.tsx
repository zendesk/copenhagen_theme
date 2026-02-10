import {
  Combobox,
  Field,
  Option,
} from "@zendeskgarden/react-dropdowns";
import { useDropdownFilter } from "../../../hooks/useDropdownFilter";
import { useTranslation } from "react-i18next";
import { FieldError } from "./FieldError";
import type { FormErrors } from "./FormState";
import { useModalContainer } from "../../../../shared/garden-theme/modal-container/useModalContainer";
import type { Organization, TicketField } from "../../../data-types";

const HIDDEN_FIELDS = [
  "description",
  "group",
  "assignee",
  "custom_status",
  "status",
  "subject",
  "priority",
  "tickettype",
  "lookup",
  "requester",
];

type FormFieldKey = "ticketField";

export interface FilterProperty {
  identifier: string;
  label: string;
}

interface FilterPropertyDropdownProps {
  ticketFields: TicketField[];
  organizations: Organization[];
  selectedProperty: FilterProperty | undefined;
  hasCustomStatuses: boolean;
  onSelect: (property: FilterProperty) => void;
  errors: FormErrors<FormFieldKey>;
}

export function FilterPropertyDropdown({
  ticketFields,
  organizations,
  selectedProperty,
  hasCustomStatuses,
  onSelect,
  errors,
}: FilterPropertyDropdownProps): JSX.Element {
  const { t } = useTranslation();
  const modalContainer = useModalContainer();

  const filterProperties: FilterProperty[] = [
    {
      identifier: "created_at",
      label: t("guide-requests-app.createdDate", "Created date"),
    },
    {
      identifier: "updated_at",
      label: t("guide-requests-app.updatedDate", "Updated date"),
    },
    hasCustomStatuses
      ? {
          identifier: "custom_status_id",
          label: t("guide-requests-app.status", "Status"),
        }
      : {
          identifier: "status",
          label: t("guide-requests-app.status", "Status"),
        },
    ...(organizations.length > 1
      ? [
          {
            identifier: "organization",
            label: t("guide-requests-app.organization", "Organization"),
          },
        ]
      : []),
    ...ticketFields
      .filter((field) => !HIDDEN_FIELDS.includes(field.type))
      .map(({ id, title_in_portal }) => ({
        identifier: String(id),
        label: title_in_portal,
      })),
  ];

  const { inputValue, onInputValueChange, matchingOptions, noMatchesOption } =
    useDropdownFilter(filterProperties, "label");

  const propertyByIdentifier = new Map(
    filterProperties.map((p) => [p.identifier, p])
  );

  return (
    <Field>
      <Field.Label>
        {t("guide-requests-app.filters-modal.select-filter", "Select filter")}
      </Field.Label>
      <Combobox
        isAutocomplete
        selectionValue={selectedProperty?.identifier ?? null}
        inputValue={selectedProperty?.label ?? inputValue}
        onChange={(changes) => {
          if (changes.selectionValue !== undefined) {
            const property = propertyByIdentifier.get(
              changes.selectionValue as string
            );
            if (property) {
              onSelect(property);
            }
          }
          if (changes.inputValue !== undefined) {
            onInputValueChange(changes.inputValue);
          }
        }}
        validation={errors.ticketField ? "error" : undefined}
        listboxAppendToNode={modalContainer}
      >
        {noMatchesOption ||
          matchingOptions.map((property) => (
            <Option
              key={property.identifier}
              label={property.label}
              value={property.identifier}
            />
          ))}
      </Combobox>
      <FieldError errors={errors} field="ticketField" />
    </Field>
  );
}
