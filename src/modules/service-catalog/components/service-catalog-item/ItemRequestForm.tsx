import styled from "styled-components";
import { RequestFormField } from "../../../ticket-fields";
import { Button } from "@zendeskgarden/react-buttons";
import { getColorV8 } from "@zendeskgarden/react-theming";
import { useTranslation } from "react-i18next";
import type { ServiceCatalogItem } from "../../data-types/ServiceCatalogItem";
import { CollapsibleDescription } from "./CollapsibleDescription";
import type { TicketFieldObject } from "../../../ticket-fields/data-types/TicketFieldObject";

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
  return (
    <Form onSubmit={onSubmit} noValidate>
      <LeftColumn>
        <CollapsibleDescription
          title={serviceCatalogItem.name}
          description={serviceCatalogItem.description}
          thumbnailUrl={serviceCatalogItem.thumbnail_url}
        />
        <FieldsContainer>
          {requestFields.map((field) => (
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
            />
          ))}
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
