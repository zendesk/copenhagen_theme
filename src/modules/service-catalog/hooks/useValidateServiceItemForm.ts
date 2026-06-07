import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import type { TicketFieldObject } from "../../ticket-fields/data-types/TicketFieldObject";
import type { Attachment } from "../../ticket-fields/data-types/AttachmentsField";
import type { AttachmentsOption } from "../data-types/Attachments";
import { ASSET_TYPE_KEY, ASSET_KEY } from "../constants";

export interface ValidationErrors {
  attachments: string | null;
  assetType: string | null;
  asset: string | null;
}

export interface ValidationResult {
  hasError: boolean;
  errors: ValidationErrors;
}

function isAssetTypeField(field: TicketFieldObject): boolean {
  return field.relationship_target_type === ASSET_TYPE_KEY;
}

function isAssetField(field: TicketFieldObject): boolean {
  return field.relationship_target_type === ASSET_KEY;
}

function hasFieldValue(field: TicketFieldObject): boolean {
  const { value } = field;

  if (Array.isArray(value)) {
    return value.length > 0;
  }

  return value !== undefined && value !== null && value !== "";
}

export function useValidateServiceItemForm(
  attachmentsOption: AttachmentsOption | undefined
) {
  const { t } = useTranslation();

  const validate = useCallback(
    (
      fields: TicketFieldObject[],
      attachments: Attachment[]
    ): ValidationResult => {
      const errors: ValidationErrors = {
        attachments: null,
        assetType: null,
        asset: null,
      };

      if (attachmentsOption) {
        const isRequired =
          attachmentsOption.custom_object_fields["standard::is_required"];

        if (isRequired && attachments.length === 0) {
          errors.attachments = t(
            "service-catalog.attachments-required-error",
            "Upload a file to continue."
          );
        }
      }

      for (const field of fields) {
        if (field.required && !hasFieldValue(field)) {
          if (isAssetTypeField(field)) {
            errors.assetType = t(
              "service-catalog.asset-type-required-error",
              "Select an asset type"
            );
          } else if (isAssetField(field)) {
            errors.asset = t(
              "service-catalog.asset-required-error",
              "Select an asset"
            );
          }
        }
      }

      const hasError = Boolean(
        errors.attachments || errors.assetType || errors.asset
      );

      return { hasError, errors };
    },
    [attachmentsOption, t]
  );

  return { validate };
}
