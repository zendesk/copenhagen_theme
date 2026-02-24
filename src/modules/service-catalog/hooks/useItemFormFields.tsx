import { useCallback, useEffect, useState } from "react";
import type { ServiceCatalogItem } from "../data-types/ServiceCatalogItem";
import type { TicketField } from "../../ticket-fields/data-types/TicketField";
import type { TicketFieldObject } from "../../ticket-fields/data-types/TicketFieldObject";
import type { EndUserCondition } from "../../ticket-fields/data-types/EndUserCondition";
import { getCustomObjectKey } from "../../ticket-fields/fields/LookupField";
import { getVisibleFields } from "../../ticket-fields/getVisibleFields";
import linkifyStr from "linkify-string";
import { useAssetDataFetchers } from "./useAssetDataFetchers";
import type {
  AssetTypeOptionData,
  AssetOptionData,
  AssetConfig,
} from "../data-types/Assets";

const ASSET_TYPE_KEY = "zen:custom_object:standard::itam_asset_type";
const ASSET_KEY = "zen:custom_object:standard::itam_asset";

const processAssetConfig = (
  assetTypeData?: AssetTypeOptionData,
  assetData?: AssetOptionData
): AssetConfig => {
  let assetTypeIdsList: string[] = [];
  if (assetTypeData?.assetTypeIds) {
    const raw = assetTypeData.assetTypeIds;
    if (Array.isArray(raw)) {
      assetTypeIdsList = raw.map(String);
    } else if (typeof raw === "string") {
      assetTypeIdsList = raw.split(",");
    }
    assetTypeIdsList = assetTypeIdsList.map((s) => s.trim()).filter(Boolean);
  }

  let assetIdsList: string[] = [];
  if (assetData?.assetIds) {
    const raw = assetData.assetIds;
    if (typeof raw === "string") {
      assetIdsList = raw.split(",");
    } else if (Array.isArray(raw)) {
      assetIdsList = raw.map(String);
    }
    assetIdsList = assetIdsList.map((s) => s.trim()).filter(Boolean);
  }

  const isHidden = !!assetTypeData?.isHiddenAssetsType;

  return {
    assetTypeIds: assetTypeIdsList,
    assetIds: assetIdsList,
    isAssetTypeHidden: isHidden,
    assetTypeHiddenValue:
      isHidden && assetTypeIdsList[0] ? assetTypeIdsList[0] : "",
    assetTypeLabel: assetTypeData?.assetTypeName,
    assetTypeDescription: assetTypeData?.assetTypeDescription,
    assetTypeIsRequired: assetTypeData?.isRequired || false,
    assetLabel: assetData?.assetName,
    assetDescription: assetData?.assetDescription,
    assetIsRequired: assetData?.isRequired || false,
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

  const sanitizedDescription = linkifyStr(description);

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
        description: assetConfig.assetTypeDescription || field.description,
        required: assetConfig.assetTypeIsRequired || field.required,
      };
    }
    if (field.relationship_target_type === ASSET_KEY) {
      return {
        ...field,
        label: assetConfig.assetLabel || field.label,
        description: assetConfig.assetDescription || field.description,
        required: assetConfig.assetIsRequired || field.required,
      };
    }
    return field;
  });
};

interface FetchTicketFieldsResult {
  requestFields: TicketFieldObject[];
  associatedLookupField: TicketFieldObject | null;
  endUserConditions: EndUserCondition[];
}

const fetchTicketFields = async (
  form_id: number,
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

  return { requestFields, associatedLookupField, endUserConditions };
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

  const assetOptionId =
    serviceCatalogItem?.custom_object_fields?.["standard::asset_option"];
  const assetTypeOptionId =
    serviceCatalogItem?.custom_object_fields?.["standard::asset_type_option"];

  const { fetchAssets, fetchAssetTypes } = useAssetDataFetchers(
    assetOptionId ?? "",
    assetTypeOptionId ?? ""
  );

  useEffect(() => {
    if (!serviceCatalogItem?.form_id) return;

    let alive = true;

    const fetchAllData = async () => {
      setIsRequestFieldsLoading(true);
      setError(null);

      try {
        const [ticketFieldsResult, assetTypeData, assetData] =
          await Promise.all([
            fetchTicketFields(serviceCatalogItem.form_id, baseLocale),
            fetchAssetTypes(),
            fetchAssets(),
          ]);

        if (!alive) return;

        const { requestFields, associatedLookupField, endUserConditions } =
          ticketFieldsResult;

        const processedAssetConfig = processAssetConfig(
          assetTypeData,
          assetData
        );
        setAssetConfig(processedAssetConfig);
        setAssociatedLookupField(associatedLookupField);
        setEndUserConditions(endUserConditions);

        const enrichedFields = enrichFieldsWithAssetConfig(
          requestFields,
          processedAssetConfig
        );
        setAllRequestFields(enrichedFields);
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
  }, [baseLocale, serviceCatalogItem?.form_id, fetchAssets, fetchAssetTypes]);

  const handleChange = useCallback(
    (field: TicketFieldObject, value: TicketFieldObject["value"]) => {
      const updatedFields = allRequestFields.map((ticketField) =>
        ticketField.name === field.name
          ? { ...ticketField, value }
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
