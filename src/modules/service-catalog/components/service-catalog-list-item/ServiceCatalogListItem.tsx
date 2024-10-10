import type { ServiceCatalogItem } from "../../data-types/ServiceCatalogItem";
import { Tiles } from "@zendeskgarden/react-forms";
import ShapesIcon from "@zendeskgarden/svg-icons/src/16/shapes-fill.svg";
import styled from "styled-components";
import { getColorV8 } from "@zendeskgarden/react-theming";

const StyledTiles = styled(Tiles.Tile)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  max-height: 164px;
  height: 164px;
  overflow: hidden;

  &:hover {
    border: 1px solid;
    border-color: ${(props) => getColorV8("blue", 600, props.theme)} !important;
    background-color: ${(props) =>
      getColorV8("white", 100, props.theme)} !important;
  }
`;

const StyledTilesDescription = styled(Tiles.Description)`
  text-align: left;
  display: -webkit-box; /* Enable flexbox layout */
  -webkit-box-orient: vertical; /* Set orientation to vertical */
  -webkit-line-clamp: 2; /* Limit to 2 lines */
  overflow: hidden; /* Hide overflow text */
  text-overflow: ellipsis; /* Add ellipsis for overflow text */
  width: 100%; /* Use full width of the parent */
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
}
`;

const ServiceCatalogListItem = ({
  serviceItem,
}: {
  serviceItem: ServiceCatalogItem;
}) => {
  return (
    <Tiles name="service-catalog">
      <StyledTiles value={serviceItem.id} onClick={(e) => e.preventDefault()}>
        <Tiles.Icon>
          <ShapesIcon />
        </Tiles.Icon>
        <StyledDiv>
          <Tiles.Label>{serviceItem.name}</Tiles.Label>
          <StyledTilesDescription>
            {serviceItem.description}
          </StyledTilesDescription>
        </StyledDiv>
      </StyledTiles>
    </Tiles>
  );
};

export default ServiceCatalogListItem;
