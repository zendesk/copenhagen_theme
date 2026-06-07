import { Skeleton } from "@zendeskgarden/react-loaders";
import { getColor } from "@zendeskgarden/react-theming";
import styled from "styled-components";

const SkeletonCard = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) =>
    getColor({ theme, hue: "grey", shade: 300 })};
  height: 100%;
  border-radius: ${(props) => props.theme.borderRadii.md};
  padding: ${(props) => props.theme.space.md};
  border: ${(props) => props.theme.borders.sm}
    ${({ theme }) => getColor({ theme, hue: "grey", shade: 300 })};
`;

export const ServiceCatalogListItemSkeleton = () => {
  return (
    <SkeletonCard
      aria-hidden="true"
      data-testid="service-catalog-list-item-skeleton"
    >
      <Skeleton width="100%" height="140px" />
    </SkeletonCard>
  );
};
