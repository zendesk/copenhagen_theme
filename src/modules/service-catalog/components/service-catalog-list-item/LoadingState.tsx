import { Col, Grid, Row } from "@zendeskgarden/react-grid";
import { Skeleton } from "@zendeskgarden/react-loaders";
import { getColorV8 } from "@zendeskgarden/react-theming";
import { MD, SM } from "@zendeskgarden/react-typography";
import styled from "styled-components";

const SkeletonItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.space.sm};
  height: 100%;
  border-radius: ${(props) => props.theme.borderRadii.md};
  padding: ${(props) => props.theme.space.md};
  border: ${(props) => props.theme.borders.sm}
    ${(props) => getColorV8("grey", 300, props.theme)};
`;

const TextSkeleton = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.space.xxs};
  margin-bottom: ${(props) => props.theme.space.md};
`;

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
    <SkeletonItem>
      <Skeleton width="40px" height="40px" />
      <TextSkeleton>
        <MD>
          <Skeleton width="75%" />
        </MD>
        <SM>
          <Skeleton width="90%" />
        </SM>
        <SM>
          <Skeleton width="50%" />
        </SM>
      </TextSkeleton>
    </SkeletonItem>
  </StyledCol>
);

export const LoadingState = () => {
  return (
    <StyledGrid>
      <Row wrap="wrap">
        <SkeletonCol />
        <SkeletonCol />
        <SkeletonCol />
      </Row>
    </StyledGrid>
  );
};
