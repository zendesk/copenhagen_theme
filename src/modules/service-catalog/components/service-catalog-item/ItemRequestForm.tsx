import styled from "styled-components";
import { useEffect, useState } from "react";
import { RequestFormField } from "../../../ticket-fields";
import { Button } from "@zendeskgarden/react-buttons";
import { getColorV8 } from "@zendeskgarden/react-theming";
import { useTranslation } from "react-i18next";
import type { ServiceCatalogItem } from "../../data-types/ServiceCatalogItem";
import { CollapsibleDescription } from "./CollapsibleDescription";
import type { TicketFieldObject } from "../../../ticket-fields/data-types/TicketFieldObject";
import type { CustomObjectRecord } from "../../../ticket-fields/data-types/CustomObjectRecord";
import { useAssetDataFetchers } from "../../../service-catalog/hooks/useAssetDataFetchers";

const Form = styled.form`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: ${(props) => props.theme.space.md};

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    flex-direction: column;
  }
`;

const FieldsContainer = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.space.md};
  margin-inline-end: ${(props) => props.theme.space.xl};

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    margin-inline-end: 0;
  }
`;

const ButtonWrapper = styled.div`
  flex: 1;
  margin-inline-start: ${(props) => props.theme.space.xl};
  padding: ${(props) => props.theme.space.lg};
  border: ${(props) => props.theme.borders.sm}
    ${(props) => getColorV8("grey", 300, props.theme)};
  height: fit-content;

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    position: sticky;
    top: 0;
    background: ${(props) => props.theme.colors.background};
    padding: ${(props) => props.theme.space.lg};
    border: none;
    border-top: ${(props) => props.theme.borders.sm}
      ${(props) => getColorV8("grey", 300, props.theme)};
    width: 100vw;
    margin-inline-start: 0;
  }
`;

const RightColumn = styled.div`
  flex: 1;
  margin-inline-start: ${(props) => props.theme.space.xl};

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    position: sticky;
    bottom: 0;
    margin-inline-start: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const LeftColumn = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.space.lg};
  margin-inline-end: ${(props) => props.theme.space.xl};
  min-width: 0;

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    margin-inline-end: 0;
  }
`;

export const ASSET_TYPE_KEY = "zen:custom_object:standard::itam_asset_type";
export const ASSET_KEY = "zen:custom_object:standard::itam_asset";

type AssetTypeState = { ids: string[]; hidden: boolean; ready: boolean };
type AssetState = { ids: string[]; ready: boolean };

const isAssetField = (f: TicketFieldObject) =>
  f.relationship_target_type === ASSET_KEY;
const isAssetTypeField = (f: TicketFieldObject) =>
  f.relationship_target_type === ASSET_TYPE_KEY;

interface ItemRequestFormProps {
  requestFields: TicketFieldObject[];
  serviceCatalogItem: ServiceCatalogItem;
  baseLocale: string;
  hasAtMentions: boolean;
  userRole: string;
  userId: number;
  brandId: number;
  defaultOrganizationId: string | null;
  handleChange: (
    field: TicketFieldObject,
    value: string | string[] | boolean | null
  ) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export function ItemRequestForm({
  requestFields,
  serviceCatalogItem,
  baseLocale,
  hasAtMentions,
  userRole,
  userId,
  brandId,
  defaultOrganizationId,
  handleChange,
  onSubmit,
}: ItemRequestFormProps) {
  const { t } = useTranslation();

  const assetOptionId =
    serviceCatalogItem?.custom_object_fields?.["standard::asset_option"];
  const assetTypeOptionId =
    serviceCatalogItem?.custom_object_fields?.["standard::asset_type_option"];

  const { fetchAssets, fetchAssetTypes } = useAssetDataFetchers(
    assetOptionId,
    assetTypeOptionId
  );

  const [assetTypeState, setAssetTypeState] = useState<AssetTypeState>({
    ids: [],
    hidden: false,
    ready: false,
  });
  const [assetState, setAssetState] = useState<AssetState>({
    ids: [],
    ready: false,
  });
  const [isHiddenAssetsType, setIsHiddenAssetsType] = useState(false);

  const hiddenValue =
    assetTypeState.hidden && assetTypeState.ids[0] ? assetTypeState.ids[0] : "";

  useEffect(() => {
    let alive = true;

    const initAssets = async () => {
      try {
        const res = await fetchAssetTypes();
        if (!alive) return;

        const hidden = !!res?.isHiddenAssetsType;
        const raw = res?.assetTypeIds;

        let ids: string[] = [];

        if (Array.isArray(raw)) {
          ids = raw.map(String);
        } else if (typeof raw === "string") {
          ids = raw.split(",");
        }

        ids = ids.map((s) => s.trim()).filter(Boolean);

        setAssetTypeState({ ids, hidden, ready: true });
        setIsHiddenAssetsType(hidden);
      } catch (e) {
        if (!alive) return;
        setAssetTypeState({ ids: [], hidden: false, ready: true });
      }

      try {
        const idsStr = await fetchAssets();
        if (!alive) return;

        let ids: string[] = [];

        if (typeof idsStr === "string") {
          ids = idsStr.split(",");
        } else if (Array.isArray(idsStr)) {
          ids = idsStr.map(String);
        }

        ids = ids.map((s) => s.trim()).filter(Boolean);

        setAssetState({ ids, ready: true });
      } catch (e) {
        if (!alive) return;
        setAssetState({ ids: [], ready: true });
      }
    };

    initAssets();

    return () => {
      alive = false;
    };
  }, [fetchAssetTypes, fetchAssets, handleChange]);

  const buildLookupFieldOptions = async (
    records: CustomObjectRecord[],
    field: TicketFieldObject
  ) => {
    if (!Array.isArray(records) || records.length === 0) return [];

    const options = records.map((rec) => {
      const base = { name: rec.name, value: rec.id };

      if (rec.custom_object_key === "standard::itam_asset") {
        const fields = (rec.custom_object_fields ?? {}) as {
          "standard::asset_type"?: string;
        };
        return {
          ...base,
          item_asset_type_id: fields["standard::asset_type"] ?? "",
        };
      }
      return { ...base, item_asset_type_id: "" };
    });

    if (isAssetTypeField(field)) {
      if (assetTypeState.hidden) return [];
      if (!assetTypeState.ids?.length) return [];
      return options.filter((o) => assetTypeState.ids.includes(o.value));
    }

    if (isAssetField(field)) {
      let list = options;
      if (assetState.ids?.length) {
        list = list.filter((o) =>
          assetState.ids.includes(o.item_asset_type_id ?? "")
        );
      }
      return list;
    }
    return options.map(({ name, value }) => ({ name, value }));
  };

  return (
    <Form onSubmit={onSubmit} noValidate>
      <LeftColumn>
        <CollapsibleDescription
          title={serviceCatalogItem.name}
          description={serviceCatalogItem.description}
          thumbnailUrl={serviceCatalogItem.thumbnail_url}
        />
        <FieldsContainer>
          {requestFields.map((field) => {
            if (isAssetTypeField(field) && isHiddenAssetsType) {
              return (
                <>
                  <input type="hidden" name={field.name} value={hiddenValue} />
                  <input type="hidden" name="isAssetTypeHidden" value="true" />
                </>
              );
            }
            return (
              <RequestFormField
                key={field.id}
                field={field}
                baseLocale={baseLocale}
                hasAtMentions={hasAtMentions}
                userRole={userRole}
                userId={userId}
                brandId={brandId}
                defaultOrganizationId={defaultOrganizationId}
                handleChange={handleChange}
                visibleFields={requestFields}
                buildLookupFieldOptions={buildLookupFieldOptions}
              />
            );
          })}
        </FieldsContainer>
      </LeftColumn>
      <RightColumn>
        <ButtonWrapper>
          <Button isPrimary size="large" isStretched type="submit">
            {t("service-catalog.item.submit-button", "Submit request")}
          </Button>
        </ButtonWrapper>
      </RightColumn>
    </Form>
  );
}
