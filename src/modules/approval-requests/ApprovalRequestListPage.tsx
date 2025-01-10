import { useEffect, useState } from "react";
import styled from "styled-components";
import { XXL } from "@zendeskgarden/react-typography";
import {
  Table,
  Head,
  Row,
  Cell,
  Body,
  HeaderRow,
  HeaderCell,
} from "@zendeskgarden/react-tables";
import SearchIcon from "@zendeskgarden/svg-icons/src/16/search-stroke.svg";
import {
  Field,
  Label,
  Combobox,
  Option,
} from "@zendeskgarden/react-dropdowns.next";
import { MediaInput } from "@zendeskgarden/react-forms";
import { fetchMockSearchApprovalRequestList } from "./mockApi";
import type { MockSearchApprovalRequest } from "./types";
import { Anchor } from "@zendeskgarden/react-buttons";
import { getColorV8 } from "@zendeskgarden/react-theming";
import { ApprovalStatusTag } from "./components/approval-request/ApprovalStatusTag";
import { formatApprovalRequestDate } from "./utils";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.space.lg};
`;

const FiltersContainer = styled.div`
  display: flex;
  gap: ${(props) => props.theme.space.base * 17}px; /* 68px */
  align-items: flex-end;
`;

const SearchField = styled(Field)`
  flex: 3;
`;

const StyledMediaInput = styled(MediaInput)`
  border-radius: 25px;
`;

const DropdownFilterField = styled(Field)`
  flex: 1;
`;

const ApprovalRequestAnchor = styled(Anchor)`
  &:visited {
    color: ${(props) => getColorV8("blue", 600, props.theme)};
  }
`;

export interface ApprovalRequestListPageProps {
  helpCenterPath: string;
}

export function ApprovalRequestListPage({
  helpCenterPath,
}: ApprovalRequestListPageProps) {
  const [requests, setRequests] = useState<MockSearchApprovalRequest[]>([]);
  const [status, setStatus] = useState("pending");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchMockSearchApprovalRequestList();
        setRequests(data);
        setStatus("resolved");
      } catch (error) {
        setStatus("error");
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (status === "pending") {
    return <Container>Loading...</Container>;
  }

  return (
    <Container>
      <XXL isBold>Approval requests</XXL>
      <FiltersContainer>
        <SearchField>
          <Label hidden>Search approval requests</Label>
          <StyledMediaInput
            start={<SearchIcon />}
            placeholder="Search approval requests"
          />
        </SearchField>
        <DropdownFilterField>
          <Label>Status:</Label>
          <Combobox isEditable={false}>
            <Option value="ALL" label="Any" />
            <Option value="PENDING" isSelected label="Decision pending" />
            <Option
              value="CLARIFICATION_REQUESTED"
              label="Clarification Needed"
            />
            <Option value="APPROVED" label="Approved" />
            <Option value="REJECTED" label="Denied" />
            <Option value="WITHDRAWN" label="Withdrawn" />
          </Combobox>
        </DropdownFilterField>
      </FiltersContainer>
      <Table size="large">
        <Head>
          <HeaderRow>
            <HeaderCell width="40%">Subject</HeaderCell>
            <HeaderCell>Requester</HeaderCell>
            <HeaderCell>Sent by</HeaderCell>
            <HeaderCell>Sent on</HeaderCell>
            <HeaderCell>Approval status</HeaderCell>
          </HeaderRow>
        </Head>
        <Body>
          {requests.map((request) => (
            <Row key={request.id}>
              <Cell>
                <ApprovalRequestAnchor
                  href={`${helpCenterPath}/approval_requests/${request.id}`}
                >
                  {request.subject}
                </ApprovalRequestAnchor>
              </Cell>
              <Cell>{request.requester_name}</Cell>
              <Cell>{request.created_by_name}</Cell>
              <Cell>
                {formatApprovalRequestDate(request.created_at, "short")}
              </Cell>
              <Cell>
                <ApprovalStatusTag status={request.status} />
              </Cell>
            </Row>
          ))}
        </Body>
      </Table>
    </Container>
  );
}
