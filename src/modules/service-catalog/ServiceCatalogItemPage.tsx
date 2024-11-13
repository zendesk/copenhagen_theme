import { XXXL } from "@zendeskgarden/react-typography";
import type { ServiceCatalogItem } from "./data-types/ServiceCatalogItem";
import styled from "styled-components";
import { Button } from "@zendeskgarden/react-buttons";
import { useState } from "react";
import ChevronUp from "@zendeskgarden/svg-icons/src/16/chevron-up-fill.svg";
import ChevronDown from "@zendeskgarden/svg-icons/src/16/chevron-down-fill.svg";
import { getColorV8 } from "@zendeskgarden/react-theming";
import { useTranslation } from "react-i18next";
import { useItemFormFields } from "./components/useItemFormFields";
import { ItemRequestForm } from "./components/service-catalog-item/ItemRequestForm";
import type { Organization } from "../ticket-fields";

const ItemTitle = styled(XXXL)`
  font-weight: ${(props) => props.theme.fontWeights.semibold};
`;

const CollapsibleDescription = styled.div<{ expanded: boolean }>`
  font-size: ${(props) => props.theme.fontSizes.md};
  text-align: left;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: ${(props) => (props.expanded ? "none" : 3)};
  overflow: hidden;
  margin-top: ${(props) => props.theme.space.md};
  padding-right: ${(props) => props.theme.space.xl};

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    padding-right: 0;
  }
`;
const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: ${(props) => props.theme.space.xxl};

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    flex-direction: column;
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

const DescriptionWrapper = styled.div`
  border-bottom: ${(props) => props.theme.borders.sm}
    ${(props) => getColorV8("grey", 300, props.theme)};
  padding-bottom: ${(props) => props.theme.space.lg};
  margin-right: ${(props) => props.theme.space.xl};

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    margin-right: 0;
  }
`;

const FromFieldsWrapper = styled.div`
  margin-right: ${(props) => props.theme.space.xl};

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    margin-right: 0;
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

const ToggleButton = styled(Button)`
  margin-top: ${(props) => props.theme.space.sm};
  font-size: ${(props) => props.theme.fontSizes.md};
  &:hover {
    text-decoration: none;
  }
`;

const ButtonWrapper = styled.div`
  padding: ${(props) => props.theme.space.lg};
  border: ${(props) => props.theme.borders.sm}
    ${(props) => getColorV8("grey", 300, props.theme)};
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    position: sticky;
    top: 0;
    background: ${(props) => props.theme.colors.background};
    padding: ${(props) => props.theme.space.lg};
    border: none;
    border-top: ${(props) => props.theme.borders.sm}
      ${(props) => getColorV8("grey", 300, props.theme)};
    width: 100vw;
    left: 0;
    right: 0;
  }
`;

export interface ServiceCatalogItemPageProps {
  serviceCatalogItem: ServiceCatalogItem;
  baseLocale: string;
  hasAtMentions: boolean;
  userRole: string;
  userId: number;
  brandId: number;
  organizations: Array<Organization>;
  wysiwyg: boolean;
}

export function ServiceCatalogItemPage({
  serviceCatalogItem,
  baseLocale,
  hasAtMentions,
  userRole,
  organizations,
  userId,
  brandId,
}: ServiceCatalogItemPageProps) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const { requestFields, handleChange } = useItemFormFields(
    serviceCatalogItem,
    baseLocale
  );
  const { t } = useTranslation();
  const defaultOrganizationId =
    organizations.length > 0 && organizations[0]?.id
      ? organizations[0]?.id?.toString()
      : null;

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Container>
      <LeftColumn>
        <DescriptionWrapper>
          <ItemTitle tag="h1">{serviceCatalogItem.name}</ItemTitle>
          <CollapsibleDescription expanded={isExpanded}>
            {serviceCatalogItem.description}
          </CollapsibleDescription>
          <ToggleButton isLink onClick={toggleDescription}>
            {isExpanded
              ? t("service-catalog.item.read-less", "Read less")
              : t("service-catalog.item.read-more", "Read more")}
            <Button.EndIcon>
              {isExpanded ? <ChevronUp /> : <ChevronDown />}
            </Button.EndIcon>
          </ToggleButton>
        </DescriptionWrapper>
        <FromFieldsWrapper>
          <ItemRequestForm
            requestFields={requestFields}
            baseLocale={baseLocale}
            hasAtMentions={hasAtMentions}
            userRole={userRole}
            userId={userId}
            brandId={brandId}
            defaultOrganizationId={defaultOrganizationId}
            handleChange={handleChange}
          />
        </FromFieldsWrapper>
      </LeftColumn>
      <RightColumn>
        <ButtonWrapper>
          <Button isPrimary size="large" isStretched>
            {t("service-catalog.item.submit-button", "Submit request")}
          </Button>
        </ButtonWrapper>
      </RightColumn>
    </Container>
  );
}
