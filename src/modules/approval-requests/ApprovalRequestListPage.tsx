import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export interface ApprovalRequestListPageProps {}

export function ApprovalRequestListPage() {
  return (
    <Container>
      <h2>Approval Request List Page</h2>
    </Container>
  );
}
