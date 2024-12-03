import styled from "styled-components";
import { TicketField } from "../../../ticket-fields";
import type { Field } from "../../../ticket-fields";
import { Button } from "@zendeskgarden/react-buttons";
import { getColorV8 } from "@zendeskgarden/react-theming";
import { useTranslation } from "react-i18next";
import { CollapsibleDescription } from "./CollapsibleDescription";
import type { ServiceCatalogItem } from "../../data-types/ServiceCatalogItem";

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
  margin-right: ${(props) => props.theme.space.xl};

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    margin-right: 0;
  }
`;

const ButtonWrapper = styled.div`
  flex: 1;
  margin-left: ${(props) => props.theme.space.xl};
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
    margin-left: 0;
  }
`;

const RightColumn = styled.div`
  flex: 1;
  margin-left: ${(props) => props.theme.space.xl};

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    position: sticky;
    bottom: 0;
    margin-left: 0;
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
  margin-right: ${(props) => props.theme.space.xl};

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    margin-right: 0;
  }
`;

interface ItemRequestFormProps {
  requestFields: Field[];
  serviceCatalogItem: ServiceCatalogItem;
  baseLocale: string;
  hasAtMentions: boolean;
  userRole: string;
  userId: number;
  brandId: number;
  defaultOrganizationId: string | null;
  handleChange: (
    field: Field,
    value: string | string[] | boolean | undefined
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
        />
        <FieldsContainer>
          {requestFields.map((field) => (
            <TicketField
              key={field.id}
              field={field}
              baseLocale={baseLocale}
              hasAtMentions={hasAtMentions}
              userRole={userRole}
              userId={userId}
              brandId={brandId}
              defaultOrganizationId={defaultOrganizationId}
              handleChange={handleChange}
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
