import { useCallback, useEffect, useMemo, useState } from "react";
import type {
  ServiceCatalogItem,
  AssetOption,
  AssetTypeOption,
} from "../data-types/ServiceCatalogItem";
import type { TicketField } from "../../ticket-fields/data-types/TicketField";
import type { TicketFieldObject } from "../../ticket-fields/data-types/TicketFieldObject";
import type { EndUserCondition } from "../../ticket-fields/data-types/EndUserCondition";
import { getCustomObjectKey } from "../../ticket-fields/fields/LookupField";
import { getVisibleFields } from "../../ticket-fields/getVisibleFields";
import linkifyStr from "linkify-string";
import type { AssetConfig } from "../data-types/Assets";
import { ASSET_TYPE_KEY, ASSET_KEY } from "../constants";
import { sanitizeFieldDescription } from "../utils/sanitize";
import { applyPrefillToFields } from "../utils/applyPrefillToFields";
import { useQueryStringPrefill } from "./useQueryStringPrefill";

const processAssetConfig = (
  assetTypeOption?: AssetTypeOption,
  assetOption?: AssetOption
): AssetConfig => {
  const isHidden = assetTypeOption?.is_hidden ?? false;
  const assetTypeIds = assetTypeOption?.asset_type_ids ?? [];

  return {
    assetTypeIds,
    assetIds: assetOption?.asset_filter_ids ?? [],
    isAssetTypeHidden: isHidden,
    assetTypeHiddenValue: isHidden && assetTypeIds[0] ? assetTypeIds[0] : "",
    assetTypeLabel: assetTypeOption?.name,
    assetTypeDescription: assetTypeOption?.description ?? undefined,
    assetTypeIsRequired: assetTypeOption?.is_required || false,
    assetLabel: assetOption?.name,
    assetDescription: assetOption?.description ?? undefined,
    assetIsRequired: assetOption?.is_required || false,
  };
};

const getFieldValue = (field: TicketField) => {
  if (field.type === "tagger") {
    return (
      field.custom_field_options.find((option) => option.default)?.value ?? null
    );
  }
  return null;
};

const formatField = (field: TicketField): TicketFieldObject => {
  const {
    id,
    type,
    description,
    title_in_portal,
    custom_field_options,
    required_in_portal,
    relationship_target_type,
    relationship_filter,
  } = field;

  const sanitizedDescription = sanitizeFieldDescription(
    linkifyStr(description)
  );

  return {
    id,
    type,
    name: `custom_fields_${id}`,
    description: sanitizedDescription,
    label: title_in_portal,
    options: custom_field_options,
    required: required_in_portal,
    relationship_target_type,
    relationship_filter,
    error: null,
    value: getFieldValue(field),
  };
};

const HIDDEN_SERVICE_CATALOG_LOOKUP_KEYS = [
  "standard::service_catalog_item",
  "standard::service_catalog_category",
];

const isAssociatedLookupField = (field: TicketField) => {
  const customObjectKey = getCustomObjectKey(
    field.relationship_target_type as string
  );
  return customObjectKey === "standard::service_catalog_item";
};

const isCategoryLookupField = (field: TicketField) => {
  const customObjectKey = getCustomObjectKey(
    field.relationship_target_type as string
  );
  return customObjectKey === "standard::service_catalog_category";
};

const isHiddenServiceCatalogLookup = (field: TicketField) => {
  const customObjectKey = getCustomObjectKey(
    field.relationship_target_type as string
  );
  return HIDDEN_SERVICE_CATALOG_LOOKUP_KEYS.includes(customObjectKey);
};

const enrichFieldsWithAssetConfig = (
  fields: TicketFieldObject[],
  assetConfig: AssetConfig
): TicketFieldObject[] => {
  return fields.map((field) => {
    if (field.relationship_target_type === ASSET_TYPE_KEY) {
      return {
        ...field,
        label: assetConfig.assetTypeLabel || field.label,
        description: sanitizeFieldDescription(
          assetConfig.assetTypeDescription || field.description
        ),
        required: assetConfig.assetTypeIsRequired || field.required,
      };
    }
    if (field.relationship_target_type === ASSET_KEY) {
      return {
        ...field,
        label: assetConfig.assetLabel || field.label,
        description: sanitizeFieldDescription(
          assetConfig.assetDescription || field.description
        ),
        required: assetConfig.assetIsRequired || field.required,
      };
    }
    return field;
  });
};

interface FetchTicketFieldsResult {
  requestFields: TicketFieldObject[];
  associatedLookupField: TicketFieldObject | null;
  categoryLookupField: TicketFieldObject | null;
  endUserConditions: EndUserCondition[];
}

const fetchTicketFields = async (
  form_id: string,
  baseLocale: string
): Promise<FetchTicketFieldsResult> => {
  const [formResponse, fieldsResponse] = await Promise.all([
    fetch(`/api/v2/ticket_forms/${form_id}`),
    fetch(`/api/v2/ticket_fields?locale=${baseLocale}`),
  ]);

  if (!formResponse.ok) {
    throw new Error("Error fetching form data");
  }
  if (!fieldsResponse.ok) {
    throw new Error("Error fetching fields data");
  }

  const formData = await formResponse.json();
  const fieldsData = await fieldsResponse.json();

  if (!formData.ticket_form.active) {
    throw new Error("Associated ticket form is not active");
  }

  const ticketForm = formData.ticket_form;
  const ids = ticketForm.ticket_field_ids;
  const endUserConditions = ticketForm.end_user_conditions || [];

  const ticketFieldsData = fieldsData.ticket_fields;
  let associatedLookupField: TicketFieldObject | null = null;
  let categoryLookupField: TicketFieldObject | null = null;

  const requestFields = ids
    .map((id: number) => {
      const ticketField = ticketFieldsData.find(
        (field: TicketField) => field.id === id
      );

      if (
        ticketField &&
        ticketField.type !== "subject" &&
        ticketField.type !== "description" &&
        ticketField.active &&
        ticketField.editable_in_portal
      ) {
        if (
          ticketField.type === "lookup" &&
          isHiddenServiceCatalogLookup(ticketField)
        ) {
          if (isAssociatedLookupField(ticketField)) {
            associatedLookupField = ticketField;
          } else if (isCategoryLookupField(ticketField)) {
            categoryLookupField = ticketField;
          }
          return null;
        }
        return formatField(ticketField);
      }
      return null;
    })
    .filter(Boolean);

  if (!associatedLookupField) {
    throw new Error("Associated lookup field not found");
  }

  return {
    requestFields,
    associatedLookupField,
    categoryLookupField,
    endUserConditions,
  };
};

export function useItemFormFields(
  serviceCatalogItem: ServiceCatalogItem | undefined,
  baseLocale: string
) {
  const [allRequestFields, setAllRequestFields] = useState<TicketFieldObject[]>(
    []
  );
  const [endUserConditions, setEndUserConditions] = useState<
    EndUserCondition[]
  >([]);
  const [associatedLookupField, setAssociatedLookupField] =
    useState<TicketFieldObject | null>();
  const [categoryLookupField, setCategoryLookupField] =
    useState<TicketFieldObject | null>(null);
  const [error, setError] = useState<unknown>(null);
  const [isRequestFieldsLoading, setIsRequestFieldsLoading] = useState(false);
  const [assetConfig, setAssetConfig] = useState<AssetConfig>({
    assetTypeIds: [],
    assetIds: [],
    isAssetTypeHidden: false,
    assetTypeHiddenValue: "",
    assetTypeIsRequired: false,
    assetIsRequired: false,
  });

  // Option details are embedded on the item response, so the asset config can
  // be derived synchronously — no separate option-record fetches.
  const assetConfigFromItem = useMemo(
    () =>
      processAssetConfig(
        serviceCatalogItem?.asset_type_option,
        serviceCatalogItem?.asset_option
      ),
    [serviceCatalogItem]
  );

  // Prefill (PDSC-954) is applied to the full field set before visibility is
  // computed, so a prefilled parent reveals its conditional children.
  const prefill = useQueryStringPrefill();

  useEffect(() => {
    if (!serviceCatalogItem?.form_id) return;

    let alive = true;

    const fetchAllData = async () => {
      setIsRequestFieldsLoading(true);
      setError(null);

      try {
        const ticketFieldsResult = await fetchTicketFields(
          serviceCatalogItem.form_id,
          baseLocale
        );

        if (!alive) return;

        const {
          requestFields,
          associatedLookupField,
          categoryLookupField,
          endUserConditions,
        } = ticketFieldsResult;

        const processedAssetConfig = assetConfigFromItem;
        setAssetConfig(processedAssetConfig);
        setAssociatedLookupField(associatedLookupField);
        setCategoryLookupField(categoryLookupField);
        setEndUserConditions(endUserConditions);

        const enrichedFields = enrichFieldsWithAssetConfig(
          requestFields,
          processedAssetConfig
        );
        const prefilledFields = applyPrefillToFields(enrichedFields, prefill);
        setAllRequestFields(prefilledFields);
      } catch (error) {
        if (alive) {
          setError(error);
        }
      } finally {
        if (alive) {
          setIsRequestFieldsLoading(false);
        }
      }
    };

    fetchAllData();

    return () => {
      alive = false;
    };
  }, [baseLocale, serviceCatalogItem?.form_id, assetConfigFromItem, prefill]);

  const handleChange = useCallback(
    (field: TicketFieldObject, value: TicketFieldObject["value"]) => {
      const updatedFields = allRequestFields.map((ticketField) =>
        ticketField.name === field.name
          ? { ...ticketField, value, error: null }
          : ticketField
      );

      setAllRequestFields(updatedFields);
    },
    [allRequestFields]
  );

  const requestFields = getVisibleFields(allRequestFields, endUserConditions);

  return {
    requestFields,
    associatedLookupField,
    categoryLookupField,
    error,
    setRequestFields: setAllRequestFields,
    handleChange,
    isRequestFieldsLoading,
    assetTypeHiddenValue: assetConfig.assetTypeHiddenValue,
    isAssetTypeHidden: assetConfig.isAssetTypeHidden,
    assetTypeIds: assetConfig.assetTypeIds,
    assetIds: assetConfig.assetIds,
  };
}
