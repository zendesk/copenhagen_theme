import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export interface ApprovalRequestPageProps {}

export function ApprovalRequestPage() {
  return (
    <Container>
      <h2>Approval Request Page</h2>
    </Container>
  );
}
