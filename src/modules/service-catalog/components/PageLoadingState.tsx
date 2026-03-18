import type React from "react";
import { Grid } from "@zendeskgarden/react-grid";
import { Skeleton } from "@zendeskgarden/react-loaders";
import styled from "styled-components";
import { SIDEBAR_WIDTH } from "../utils/categoryTreeUtils";

const SidebarContainer = styled.div`
  width: ${SIDEBAR_WIDTH}px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ContentContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${(props) => `${props.theme.space.base * 6}px`};
`;

const StyledGrid = styled(Grid)`
  padding: 0;
`;

const StyledCol = styled(Grid.Col)`
  @media (min-width: 0px) {
    margin-bottom: ${(props) => props.theme.space.md};
  }
`;

const SidebarSkeleton = () => (
  <SidebarContainer>
    <Skeleton width="100%" height="40px" />
    <Skeleton width="100%" height="40px" />
    <Skeleton width="100%" height="40px" />
    <Skeleton width="80%" height="40px" />
    <Skeleton width="80%" height="40px" />
    <Skeleton width="100%" height="40px" />
  </SidebarContainer>
);

const ContentSkeleton = () => (
  <ContentContainer>
    <Skeleton width="200px" height="28px" />
    <Skeleton width="320px" height="40px" />
    <Skeleton width="120px" height="20px" />
    <StyledGrid>
      <Grid.Row wrap="wrap">
        <StyledCol xs={12} sm={6} md={4} lg={3}>
          <Skeleton width="100%" height="140px" />
        </StyledCol>
        <StyledCol xs={12} sm={6} md={4} lg={3}>
          <Skeleton width="100%" height="140px" />
        </StyledCol>
        <StyledCol xs={12} sm={6} md={4} lg={3}>
          <Skeleton width="100%" height="140px" />
        </StyledCol>
        <StyledCol xs={12} sm={6} md={4} lg={3}>
          <Skeleton width="100%" height="140px" />
        </StyledCol>
      </Grid.Row>
    </StyledGrid>
  </ContentContainer>
);

export const PageLoadingState: React.FC = () => (
  <>
    <aside className="service-catalog-sidebar">
      <SidebarSkeleton />
    </aside>
    <main className="service-catalog-list">
      <ContentSkeleton />
    </main>
  </>
);
