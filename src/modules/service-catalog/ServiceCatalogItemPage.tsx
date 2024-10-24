import { XXXL } from "@zendeskgarden/react-typography";
import type { ServiceCatalogItem } from "./data-types/ServiceCatalogItem";
import styled from "styled-components";
import { Button } from "@zendeskgarden/react-buttons";
import { useState } from "react";
import ChevronUp from "@zendeskgarden/svg-icons/src/16/chevron-up-fill.svg";
import ChevronDown from "@zendeskgarden/svg-icons/src/16/chevron-down-fill.svg";
import { getColorV8 } from "@zendeskgarden/react-theming";
import { useTranslation } from "react-i18next";

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
  text-overflow: ellipsis;
  width: 100%;
  margin-top: ${(props) => props.theme.space.md};
`;
const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 120px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const LeftColumn = styled.div`
  flex: 2;
  border-bottom: ${(props) => props.theme.borders.sm}
    ${(props) => getColorV8("grey", 300, props.theme)};
  padding-bottom: ${(props) => props.theme.space.lg};
`;

const RightColumn = styled.div`
  flex: 1;
`;

const ToggleButton = styled(Button)`
  margin-top: ${(props) => props.theme.space.sm};
  color: ${(props) => getColorV8("blue", 600, props.theme)};
  font-size: ${(props) => props.theme.fontSizes.md};
  &:hover {
    text-decoration: none;
    color: ${(props) => getColorV8("blue", 600, props.theme)};
  }
`;
interface ServiceCatalogItemPageProps {
  serviceCatalogItem: ServiceCatalogItem;
}

export function ServiceCatalogItemPage({
  serviceCatalogItem,
}: ServiceCatalogItemPageProps) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const { t } = useTranslation();

  const toogleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Container>
      <LeftColumn>
        <ItemTitle>{serviceCatalogItem.name}</ItemTitle>
        <CollapsibleDescription expanded={isExpanded}>
          {serviceCatalogItem.description}
        </CollapsibleDescription>
        <ToggleButton isLink onClick={toogleDescription}>
          {isExpanded
            ? t("service-catalog.item.read-less", "Read less")
            : t("service-catalog.item.read-more", "Read more")}
          <Button.EndIcon>
            {isExpanded ? <ChevronUp /> : <ChevronDown />}
          </Button.EndIcon>
        </ToggleButton>
      </LeftColumn>
      <RightColumn>
        {/* Placeholder for Request a service button */}
      </RightColumn>
    </Container>
  );
}
