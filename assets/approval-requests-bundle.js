import { s as styled, d as Field, E as MediaInput, j as jsxRuntimeExports, e as Label, ab as SvgSearchStroke, h as Combobox, O as Option, z as Tag, J as getColorV8, A as Anchor, ac as Table, ad as Head, ae as HeaderRow, af as HeaderCell, ag as Body, ah as Row, ai as Cell, r as reactExports, aj as XXL, a7 as reactDomExports, a8 as ThemeProviders, a9 as createTheme, ak as Grid, al as MD, am as Row$1, an as Col, F as Field$1, L as Label$1, b as Textarea, a0 as Button } from 'shared';

const fetchMockSearchApprovalRequestList = async () => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return [
        {
            id: 1,
            subject: "Approval required for figma access request",
            requester_name: "John Doe",
            created_by_name: "Henry Martin",
            created_at: "2024-01-15T10:00:00Z",
            status: "PENDING",
        },
        {
            id: 2,
            subject: "Approval required for Pendo access request",
            requester_name: "Jane Smith",
            created_by_name: "Henry Martin",
            created_at: "2024-01-14T15:30:00Z",
            status: "PENDING",
        },
        {
            id: 3,
            subject: "Approval required for AWS access",
            requester_name: "Mike Johnson",
            created_by_name: "Henry Martin",
            created_at: "2024-01-13T09:15:00Z",
            status: "CLARIFICATION_REQUESTED",
        },
    ];
};

const FiltersContainer = styled.div `
  display: flex;
  gap: ${(props) => props.theme.space.base * 17}px; /* 68px */
  align-items: flex-end;
`;
const SearchField = styled(Field) `
  flex: 3;
`;
const StyledMediaInput = styled(MediaInput) `
  border-radius: 25px;
`;
const DropdownFilterField = styled(Field) `
  flex: 1;
`;
function ApprovalRequestListFilters() {
    return (jsxRuntimeExports.jsxs(FiltersContainer, { children: [jsxRuntimeExports.jsxs(SearchField, { children: [jsxRuntimeExports.jsx(Label, { hidden: true, children: "Search approval requests" }), jsxRuntimeExports.jsx(StyledMediaInput, { start: jsxRuntimeExports.jsx(SvgSearchStroke, {}), placeholder: "Search approval requests" })] }), jsxRuntimeExports.jsxs(DropdownFilterField, { children: [jsxRuntimeExports.jsx(Label, { children: "Status:" }), jsxRuntimeExports.jsxs(Combobox, { isEditable: false, children: [jsxRuntimeExports.jsx(Option, { value: "ALL", isSelected: true, label: "Any" }), jsxRuntimeExports.jsx(Option, { value: "PENDING", label: "Decision pending" }), jsxRuntimeExports.jsx(Option, { value: "CLARIFICATION_REQUESTED", label: "Info needed" }), jsxRuntimeExports.jsx(Option, { value: "APPROVED", label: "Approved" }), jsxRuntimeExports.jsx(Option, { value: "REJECTED", label: "Denied" }), jsxRuntimeExports.jsx(Option, { value: "WITHDRAWN", label: "Withdrawn" })] })] })] }));
}

const APPROVAL_REQUEST_STATES = {
    PENDING: "PENDING",
    APPROVED: "APPROVED",
    REJECTED: "REJECTED",
    CLARIFICATION_REQUESTED: "CLARIFICATION_REQUESTED",
    WITHDRAWN: "WITHDRAWN",
};
const DEFAULT_STATUS_CONFIG = { hue: "grey", label: "Unknown status" };
const statusTagConfig = {
    [APPROVAL_REQUEST_STATES.PENDING]: { hue: "blue", label: "Decision pending" },
    [APPROVAL_REQUEST_STATES.APPROVED]: { hue: "green", label: "Approved" },
    [APPROVAL_REQUEST_STATES.REJECTED]: { hue: "red", label: "Denied" },
    [APPROVAL_REQUEST_STATES.CLARIFICATION_REQUESTED]: {
        hue: "yellow",
        label: "Info needed",
    },
    [APPROVAL_REQUEST_STATES.WITHDRAWN]: { hue: "grey", label: "Withdrawn" },
};
function ApprovalStatusTag({ status }) {
    const config = statusTagConfig[status] ||
        DEFAULT_STATUS_CONFIG;
    return jsxRuntimeExports.jsx(Tag, { hue: config.hue, children: config.label });
}

// MKTODO: update to proper locale
const formatApprovalRequestDate = (timestamp, monthFormat = "long") => {
    const date = new Date(timestamp);
    return `${date.toLocaleDateString("en-US", {
        month: monthFormat,
        day: "numeric",
        year: "numeric",
    })} ${date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
    })}`;
};

const ApprovalRequestAnchor = styled(Anchor) `
  &:visited {
    color: ${(props) => getColorV8("blue", 600, props.theme)};
  }
`;
function ApprovalRequestListTable({ requests, helpCenterPath, }) {
    return (jsxRuntimeExports.jsxs(Table, { size: "large", children: [jsxRuntimeExports.jsx(Head, { children: jsxRuntimeExports.jsxs(HeaderRow, { children: [jsxRuntimeExports.jsx(HeaderCell, { width: "40%", children: "Subject" }), jsxRuntimeExports.jsx(HeaderCell, { children: "Requester" }), jsxRuntimeExports.jsx(HeaderCell, { children: "Sent by" }), jsxRuntimeExports.jsx(HeaderCell, { children: "Sent on" }), jsxRuntimeExports.jsx(HeaderCell, { children: "Approval status" })] }) }), jsxRuntimeExports.jsx(Body, { children: requests.map((request) => (jsxRuntimeExports.jsxs(Row, { children: [jsxRuntimeExports.jsx(Cell, { children: jsxRuntimeExports.jsx(ApprovalRequestAnchor, { href: `${helpCenterPath}/approval_requests/${request.id}`, children: request.subject }) }), jsxRuntimeExports.jsx(Cell, { children: request.requester_name }), jsxRuntimeExports.jsx(Cell, { children: request.created_by_name }), jsxRuntimeExports.jsx(Cell, { children: formatApprovalRequestDate(request.created_at, "short") }), jsxRuntimeExports.jsx(Cell, { children: jsxRuntimeExports.jsx(ApprovalStatusTag, { status: request.status }) })] }, request.id))) })] }));
}

const Container$2 = styled.div `
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.space.lg};
`;
function ApprovalRequestListPage({ helpCenterPath, }) {
    const [requests, setRequests] = reactExports.useState([]);
    const [status, setStatus] = reactExports.useState("pending");
    reactExports.useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchMockSearchApprovalRequestList();
                setRequests(data);
                setStatus("resolved");
            }
            catch (error) {
                setStatus("error");
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);
    if (status === "pending") {
        return jsxRuntimeExports.jsx(Container$2, { children: "Loading..." });
    }
    return (jsxRuntimeExports.jsxs(Container$2, { children: [jsxRuntimeExports.jsx(XXL, { isBold: true, children: "Approval requests" }), jsxRuntimeExports.jsx(ApprovalRequestListFilters, {}), jsxRuntimeExports.jsx(ApprovalRequestListTable, { requests: requests, helpCenterPath: helpCenterPath })] }));
}

async function renderApprovalRequestList(container, settings, props, helpCenterPath) {
    reactDomExports.render(jsxRuntimeExports.jsx(ThemeProviders, { theme: createTheme(settings), children: jsxRuntimeExports.jsx(ApprovalRequestListPage, { ...props, helpCenterPath: helpCenterPath }) }), container);
}

const Container$1 = styled(Grid) `
  padding: ${(props) => props.theme.space.base * 6}px; /* 24px */
  background: ${(props) => getColorV8("grey", 100, props.theme)};
  border-radius: ${(props) => props.theme.borderRadii.md}; /* 4px */
`;
const ApprovalRequestHeader = styled(MD) `
  margin-bottom: ${(props) => props.theme.space.base * 4}px; /* 16px */
`;
const FieldLabel$1 = styled(MD) `
  color: ${(props) => getColorV8("grey", 600, props.theme)};
`;
const DetailRow = styled(Row$1) `
  margin-bottom: ${(props) => props.theme.space.sm}; /* 8px */

  &:last-child {
    margin-bottom: 0;
  }
`;
function ApprovalRequestDetails({ approvalRequest, }) {
    return (jsxRuntimeExports.jsxs(Container$1, { children: [jsxRuntimeExports.jsx(ApprovalRequestHeader, { isBold: true, children: "Approval request details" }), jsxRuntimeExports.jsxs(DetailRow, { children: [jsxRuntimeExports.jsx(Col, { size: 4, children: jsxRuntimeExports.jsx(FieldLabel$1, { children: "Sent by" }) }), jsxRuntimeExports.jsx(Col, { size: 8, children: jsxRuntimeExports.jsx(MD, { children: approvalRequest.created_by_user.name }) })] }), jsxRuntimeExports.jsxs(DetailRow, { children: [jsxRuntimeExports.jsx(Col, { size: 4, children: jsxRuntimeExports.jsx(FieldLabel$1, { children: "Sent on" }) }), jsxRuntimeExports.jsx(Col, { size: 8, children: jsxRuntimeExports.jsx(MD, { children: formatApprovalRequestDate(approvalRequest.created_at) }) })] }), jsxRuntimeExports.jsxs(DetailRow, { children: [jsxRuntimeExports.jsx(Col, { size: 4, children: jsxRuntimeExports.jsx(FieldLabel$1, { children: "Approver" }) }), jsxRuntimeExports.jsx(Col, { size: 8, children: jsxRuntimeExports.jsx(MD, { children: approvalRequest.assignee_user.name }) })] }), jsxRuntimeExports.jsxs(DetailRow, { children: [jsxRuntimeExports.jsx(Col, { size: 4, children: jsxRuntimeExports.jsx(FieldLabel$1, { children: "Status" }) }), jsxRuntimeExports.jsx(Col, { size: 8, children: jsxRuntimeExports.jsx(MD, { children: jsxRuntimeExports.jsx(ApprovalStatusTag, { status: approvalRequest.status }) }) })] })] }));
}

const TicketContainer = styled(Grid) `
  padding: ${(props) => props.theme.space.md}; /* 20px */
  border: ${(props) => props.theme.borders.sm}
    ${(props) => getColorV8("grey", 300, props.theme)};
  border-radius: ${(props) => props.theme.borderRadii.md}; /* 4px */
`;
const TicketDetailsHeader = styled(MD) `
  margin-bottom: ${(props) => props.theme.space.md}; /* 20px */
`;
const FieldLabel = styled(MD) `
  color: ${(props) => getColorV8("grey", 600, props.theme)};
`;
const CustomFieldsGrid = styled.div `
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${(props) => props.theme.space.md}; /* 20px */
  margin-top: ${(props) => props.theme.space.md}; /* 20px */
`;
function ApprovalTicketDetails({ ticket }) {
    return (jsxRuntimeExports.jsxs(TicketContainer, { children: [jsxRuntimeExports.jsx(TicketDetailsHeader, { isBold: true, children: "Ticket Details" }), jsxRuntimeExports.jsxs(Row$1, { children: [jsxRuntimeExports.jsxs(Col, { size: 4, children: [jsxRuntimeExports.jsx(FieldLabel, { children: "Requester" }), jsxRuntimeExports.jsx(MD, { children: ticket.requester.name })] }), jsxRuntimeExports.jsxs(Col, { size: 4, children: [jsxRuntimeExports.jsx(FieldLabel, { children: "ID" }), jsxRuntimeExports.jsx(MD, { children: ticket.id })] }), jsxRuntimeExports.jsxs(Col, { size: 4, children: [jsxRuntimeExports.jsx(FieldLabel, { children: "Priority" }), jsxRuntimeExports.jsx(MD, { children: ticket.priority })] })] }), jsxRuntimeExports.jsx(CustomFieldsGrid, { children: ticket.custom_fields.map((field) => (jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx(FieldLabel, { children: field.title_in_portal }), jsxRuntimeExports.jsx(MD, { children: field.value })] }, field.id))) })] }));
}

const ButtonContainer = styled.div `
  display: flex;
  flex-direction: row;
  gap: ${(props) => props.theme.space.md}; /* 20px */
`;
const CommentSection = styled.div `
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.space.lg}; /* 32px */
`;
function ApproverActions() {
    const [comment, setComment] = reactExports.useState("");
    const [pendingStatus, setPendingStatus] = reactExports.useState(null);
    const handleApproveRequestClick = reactExports.useCallback(() => {
        setPendingStatus("APPROVED");
    }, []);
    const handleDenyRequestClick = reactExports.useCallback(() => {
        setPendingStatus("REJECTED");
    }, []);
    const handleInputValueChange = reactExports.useCallback((e) => {
        setComment(e.target.value);
    }, []);
    const handleCancelClick = reactExports.useCallback(() => {
        setPendingStatus(null);
        setComment("");
    }, []);
    if (pendingStatus) {
        return (jsxRuntimeExports.jsxs(CommentSection, { children: [jsxRuntimeExports.jsxs(Field$1, { children: [jsxRuntimeExports.jsx(Label$1, { children: "Additional note" }), jsxRuntimeExports.jsx(Textarea, { minRows: 5, value: comment, onChange: handleInputValueChange })] }), jsxRuntimeExports.jsxs(ButtonContainer, { children: [jsxRuntimeExports.jsx(Button, { isPrimary: pendingStatus === "APPROVED", children: pendingStatus === "APPROVED" ? "Submit approval" : "Submit denial" }), jsxRuntimeExports.jsx(Button, { onClick: handleCancelClick, children: "Cancel" })] })] }));
    }
    return (jsxRuntimeExports.jsxs(ButtonContainer, { children: [jsxRuntimeExports.jsx(Button, { isPrimary: true, onClick: handleApproveRequestClick, children: "Approve request" }), jsxRuntimeExports.jsx(Button, { onClick: handleDenyRequestClick, children: "Deny request" })] }));
}

function useApprovalRequest(approvalRequestId) {
    const [approvalRequest, setApprovalRequest] = reactExports.useState();
    const [error, setError] = reactExports.useState(null);
    reactExports.useEffect(() => {
        const fetchApprovalRequest = async () => {
            try {
                const response = await fetch(`/api/v2/approval_workflow_instances/${approvalRequestId}/approval_requests/${approvalRequestId}`);
                if (response.ok) {
                    const data = await response.json();
                    setApprovalRequest(data.approval_request);
                }
                else {
                    throw new Error("Error fetching approval request");
                }
            }
            catch (error) {
                setError(error);
            }
        };
        fetchApprovalRequest();
    }, [approvalRequestId]);
    return { approvalRequest, errorFetchingApprovalRequest: error };
}

const Container = styled.div `
  display: flex;
  flex-direction: row;
`;
const LeftColumn = styled.div `
  flex: 2;
  display: grid;
  grid-template-rows: auto;
  margin-right: ${(props) => props.theme.space.xl};

  & > *:first-child {
    margin-bottom: ${(props) => props.theme.space.base * 4}px; /* 16px */
  }

  & > *:not(:first-child) {
    margin-bottom: ${(props) => props.theme.space.lg}; /* 32px */
  }

  & > *:last-child {
    margin-bottom: 0;
  }

  // MKTODO: add media query for mobile
`;
const RightColumn = styled.div `
  flex: 1;
  margin-left: ${(props) => props.theme.space.xl};

  // MKTODO: add media query for mobile
`;
function ApprovalRequestPage({ approvalRequestId, userId, }) {
    const { approvalRequest } = useApprovalRequest(approvalRequestId);
    const showApproverActions = userId === approvalRequest?.assignee_user?.id &&
        approvalRequest?.status === "ACTIVE";
    // MKTODO: handle error state
    // if (status === "pending") {
    //   // MKTODO: build out loading state with Skeleton components
    //   return <Container>Loading...</Container>;
    // }(
    return (jsxRuntimeExports.jsxs(Container, { children: [jsxRuntimeExports.jsxs(LeftColumn, { children: [jsxRuntimeExports.jsx(XXL, { isBold: true, children: approvalRequest?.subject }), jsxRuntimeExports.jsx(MD, { children: approvalRequest?.message }), approvalRequest?.ticket_details && (jsxRuntimeExports.jsx(ApprovalTicketDetails, { ticket: approvalRequest.ticket_details })), showApproverActions && jsxRuntimeExports.jsx(ApproverActions, {})] }), jsxRuntimeExports.jsx(RightColumn, { children: approvalRequest && (jsxRuntimeExports.jsx(ApprovalRequestDetails, { approvalRequest: approvalRequest })) })] }));
}

async function renderApprovalRequest(container, settings, props) {
    reactDomExports.render(jsxRuntimeExports.jsx(ThemeProviders, { theme: createTheme(settings), children: jsxRuntimeExports.jsx(ApprovalRequestPage, { ...props }) }), container);
}

export { renderApprovalRequest, renderApprovalRequestList };
