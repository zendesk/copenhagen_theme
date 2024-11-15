import type { ServiceCatalogItem } from "../../data-types/ServiceCatalogItem";
import ShapesIcon from "@zendeskgarden/svg-icons/src/16/shapes-fill.svg";
import styled from "styled-components";
import { getColorV8 } from "@zendeskgarden/react-theming";

const ItemContainer = styled.a`
  display: flex;
  flex-direction: column;
  height: 100%;
  border-radius: ${(props) => props.theme.borderRadii.md};
  padding: ${(props) => props.theme.space.md};
  border: ${(props) => props.theme.borders.sm}
    ${(props) => getColorV8("grey", 300, props.theme)};
  color: ${(props) => getColorV8("grey", 800, props.theme)};

  &:hover {
    text-decoration: none;
    border: ${(props) => props.theme.borders.sm};
    border-color: ${(props) => getColorV8("blue", 600, props.theme)};
  }

  &:visited {
    text-decoration: none;
    color: ${(props) => getColorV8("grey", 800, props.theme)};
  }
`;

const ItemTitle = styled.div`
  font-size: ${(props) => props.theme.fontSizes.md};
  font-weight: ${(props) => props.theme.fontWeights.semibold};
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  word-break: break-word;
`;

const ItemDescription = styled.div`
  font-size: ${(props) => props.theme.fontSizes.sm};
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  word-break: break-word;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${(props) => props.theme.space.xxs};
`;

const IconContainer = styled.div`
  color: ${(props) => getColorV8("grey", 600, props.theme)};
  background-color: ${(props) => getColorV8("grey", 100, props.theme)};
  margin-bottom: ${(props) => props.theme.space.sm};
  width: ${(props) => props.theme.space.xl};
  height: ${(props) => props.theme.space.xl};
  text-align: center;
  align-content: center;
`;

const ServiceCatalogListItem = ({
  serviceItem,
}: {
  serviceItem: ServiceCatalogItem;
}) => {
  return (
    <ItemContainer href={`/hc/en-us/services/${serviceItem.id}`}>
      <IconContainer>
        <ShapesIcon />
      </IconContainer>
      <TextContainer>
        <ItemTitle>{serviceItem.name}</ItemTitle>
        <ItemDescription>{serviceItem.description}</ItemDescription>
      </TextContainer>
    </ItemContainer>
  );
};

export default ServiceCatalogListItem;
