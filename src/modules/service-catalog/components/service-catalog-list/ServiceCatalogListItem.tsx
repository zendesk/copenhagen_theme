import type { ServiceCatalogItem } from "../../data-types/ServiceCatalogItem";
import ShapesIcon from "@zendeskgarden/svg-icons/src/16/shapes-fill.svg";
import styled from "styled-components";
import { getColorV8 } from "@zendeskgarden/react-theming";
import { Avatar } from "@zendeskgarden/react-avatars";

const ItemContainer = styled.a`
  display: flex;
  flex-direction: column;
  height: 100%;
  border-radius: ${(props) => props.theme.borderRadii.md};
  padding: ${(props) => props.theme.space.md};
  border: ${(props) => props.theme.borders.sm}
    ${(props) => getColorV8("grey", 300, props.theme)};
  color: ${(props) => props.theme.colors.foreground};

  &:hover {
    border-color: ${(props) => props.theme.colors.primaryHue};
  }

  &:hover,
  &:visited {
    text-decoration: none;
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
  color: ${(props) => props.theme.colors.foreground};
`;

const StyledAvatar = styled(Avatar)`
  background-color: ${(props) => getColorV8("grey", 100, props.theme)};
  margin-bottom: ${(props) => props.theme.space.sm};

  && > svg {
    width: 16px;
    height: 16px;
    color: ${(props) => getColorV8("grey", 600, props.theme)};
  }
`;

const ServiceCatalogListItem = ({
  serviceItem,
  helpCenterPath,
}: {
  serviceItem: ServiceCatalogItem;
  helpCenterPath: string;
}) => {
  return (
    <ItemContainer
      data-testid="service-catalog-list-item-container"
      href={`${helpCenterPath}/services/${serviceItem.id}`}
    >
      <StyledAvatar size="medium" isSystem>
        {serviceItem.thumbnail_url ? (
          <img src={serviceItem.thumbnail_url} alt="" />
        ) : (
          <ShapesIcon aria-hidden="true" />
        )}
      </StyledAvatar>
      <TextContainer>
        <ItemTitle>{serviceItem.name}</ItemTitle>
        <ItemDescription>{serviceItem.description}</ItemDescription>
      </TextContainer>
    </ItemContainer>
  );
};

export default ServiceCatalogListItem;
