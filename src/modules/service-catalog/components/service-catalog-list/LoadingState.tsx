import { Col, Grid, Row } from "@zendeskgarden/react-grid";
import { Skeleton } from "@zendeskgarden/react-loaders";
import styled from "styled-components";

const StyledGrid = styled(Grid)`
  padding: 0;
`;

const StyledCol = styled(Col)`
  @media (min-width: 0px) {
    margin-bottom: ${(props) => props.theme.space.md};
  }
`;

const SkeletonCol = () => (
  <StyledCol xs={12} sm={6} md={4} lg={3}>
    <Skeleton width="100%" height="140px" />
  </StyledCol>
);

export const LoadingState = () => {
  return (
    <StyledGrid>
      <Row wrap="wrap">
        <SkeletonCol />
        <SkeletonCol />
        <SkeletonCol />
        <SkeletonCol />
      </Row>
    </StyledGrid>
  );
};
