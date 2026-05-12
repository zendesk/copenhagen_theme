import { Grid } from "@zendeskgarden/react-grid";
import styled from "styled-components";
import { ServiceCatalogListItemSkeleton } from "./ServiceCatalogListItemSkeleton";

const StyledGrid = styled(Grid)`
  padding: 0;
`;

const StyledCol = styled(Grid.Col)`
  @media (min-width: 0px) {
    margin-bottom: ${(props) => props.theme.space.md};
  }
`;

const DEFAULT_SKELETON_COUNT = 8;

interface LoadingStateProps {
  count?: number;
}

export const LoadingState = ({
  count = DEFAULT_SKELETON_COUNT,
}: LoadingStateProps) => {
  const safeCount = Math.max(1, count);

  return (
    <StyledGrid>
      <Grid.Row wrap="wrap">
        {Array.from({ length: safeCount }, (_, index) => (
          <StyledCol key={index} xs={12} sm={6} md={4} lg={3}>
            <ServiceCatalogListItemSkeleton />
          </StyledCol>
        ))}
      </Grid.Row>
    </StyledGrid>
  );
};
