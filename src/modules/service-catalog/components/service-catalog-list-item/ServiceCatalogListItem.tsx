import type { ServiceCatalogItem } from "../../data-types/ServiceCatalogItem";
import ShapesIcon from "@zendeskgarden/svg-icons/src/16/shapes-fill.svg";
import styled from "styled-components";
import { getColorV8 } from "@zendeskgarden/react-theming";

const StyledItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  gap: ${(props) => props.theme.space.sm};
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: ${(props) => props.theme.borderRadii.md};
  cursor: pointer;
  padding: ${(props) => props.theme.space.md};
  word-break: break-word;
  border: ${(props) => props.theme.borders.sm}
    ${(props) => getColorV8("grey", 300, props.theme)};
  &:hover {
    border: ${(props) => props.theme.borders.sm};
    border-color: ${(props) => getColorV8("blue", 600, props.theme)} !important;
    background-color: ${(props) =>
      getColorV8("white", 100, props.theme)} !important;
  }
`;

const ItemTitle = styled.div`
  text-align: left;
  font-size: ${(props) => props.theme.fontSizes.md};
  font-weight: ${(props) => props.theme.fontWeights.semibold};
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2; /* Limit to 2 lines */
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
`;

const ItemDescription = styled.p`
  font-size: ${(props) => props.theme.fontSizes.sm};
  text-align: left;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3; /* Limit to 3 lines */
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${(props) => props.theme.space.base}
}
`;

const StyledSpan = styled.span`
  display: block;
  color: ${(props) => getColorV8("grey", 600, props.theme)};
`;

const StyledShapesIcon = styled(ShapesIcon)`
  height: ${(props) => props.theme.iconSizes.md};
  width: ${(props) => props.theme.iconSizes.md};
`;

const ServiceCatalogListItem = ({
  serviceItem,
}: {
  serviceItem: ServiceCatalogItem;
}) => {
  return (
    <StyledItem>
      <StyledSpan>
        <StyledShapesIcon />
      </StyledSpan>
      <StyledDiv>
        <ItemTitle>{serviceItem.name}</ItemTitle>
        <ItemDescription>{serviceItem.description}</ItemDescription>
      </StyledDiv>
    </StyledItem>
  );
};

export default ServiceCatalogListItem;
