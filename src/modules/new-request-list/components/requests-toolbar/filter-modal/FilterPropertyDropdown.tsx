import {
  Item,
  Label,
  Field,
  Dropdown,
  Autocomplete,
} from "@zendeskgarden/react-dropdowns.legacy";
import { useDropdownFilter } from "../../../hooks/useDropdownFilter";
import { useTranslation } from "react-i18next";
import { FieldError } from "./FieldError";
import type { FormErrors } from "./FormState";
import { ModalMenu } from "../../modal-menu/ModalMenu";
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

  const { dropdownProps, renderItems } = useDropdownFilter(
    filterProperties,
    "label"
  );

  return (
    <Dropdown
      {...dropdownProps}
      selectedItem={selectedProperty}
      onSelect={onSelect}
      downshiftProps={{
        defaultHighlightedIndex: 0,
        itemToString: (property: FilterProperty) => `${property?.identifier}`,
      }}
    >
      <Field>
        <Label>
          {t("guide-requests-app.filters-modal.select-filter", "Select filter")}
        </Label>
        <Autocomplete validation={errors.ticketField ? "error" : undefined}>
          {selectedProperty?.label}
        </Autocomplete>
        <FieldError errors={errors} field="ticketField" />
      </Field>
      <ModalMenu>
        {renderItems((property) => (
          <Item key={property.identifier} value={property}>
            {property.label}
          </Item>
        ))}
      </ModalMenu>
    </Dropdown>
  );
}
