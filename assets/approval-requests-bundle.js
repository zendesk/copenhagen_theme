import { s as styled, j as jsxRuntimeExports, a7 as reactDomExports, a8 as ThemeProviders, a9 as createTheme, z as Tag, J as getColorV8, ab as Grid, ac as MD, ad as Row, ae as Col, a0 as Button, r as reactExports, af as XXL } from 'shared';

const Container$2 = styled.div `
  display: flex;
  flex-direction: column;
`;
function ApprovalRequestListPage() {
    return (jsxRuntimeExports.jsx(Container$2, { children: jsxRuntimeExports.jsx("h2", { children: "Approval Request List Page" }) }));
}

async function renderApprovalRequestList(container, settings, props) {
    console.log("renderApprovalRequestList", container, settings, props);
    reactDomExports.render(jsxRuntimeExports.jsx(ThemeProviders, { theme: createTheme(settings), children: jsxRuntimeExports.jsx(ApprovalRequestListPage, { ...props }) }), container);
}

const fetchMockApprovalRequest = async () => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    return {
        id: 1234,
        subject: "New Laptop Request",
        message: "I need a new laptop for development work",
        status: "PENDING",
        created_at: "2023-07-20T10:00:00Z",
        assignee_user: {
            id: 101,
            name: "Jane Smith",
            photo: {
                content_url: "https://placekitten.com/100/100",
            },
        },
        created_by_user: {
            id: 102,
            name: "John Doe",
            photo: {
                content_url: "https://placekitten.com/101/101",
            },
        },
    };
};
const fetchMockTicket = async () => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    return {
        id: 5678,
        priority: "high",
        requester: {
            id: 102,
            name: "John Doe",
            photo: {
                content_url: "https://placekitten.com/101/101",
            },
        },
    };
};

const APPROVAL_REQUEST_STATES = {
    PENDING: "PENDING",
    APPROVED: "APPROVED",
    REJECTED: "REJECTED",
    CLARIFICATION_REQUESTED: "CLARIFICATION_REQUESTED",
};
const statusTagConfig = {
    [APPROVAL_REQUEST_STATES.PENDING]: { hue: "blue", label: "Decision pending" },
    [APPROVAL_REQUEST_STATES.APPROVED]: { hue: "green", label: "Approved" },
    [APPROVAL_REQUEST_STATES.REJECTED]: { hue: "red", label: "Denied" },
    [APPROVAL_REQUEST_STATES.CLARIFICATION_REQUESTED]: {
        hue: "grey",
        label: "Clarification Needed",
    },
};
function ApprovalStatusTag({ status }) {
    const { hue, label } = statusTagConfig[status];
    return jsxRuntimeExports.jsx(Tag, { hue: hue, children: label });
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
const DetailRow = styled(Row) `
  margin-bottom: ${(props) => props.theme.space.sm}; /* 8px */

  &:last-child {
    margin-bottom: 0;
  }
`;
const formatApprovalRequestDate = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    })} ${date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
    })}`;
};
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
function ApprovalTicketDetails({ ticket }) {
    return (jsxRuntimeExports.jsxs(TicketContainer, { children: [jsxRuntimeExports.jsx(TicketDetailsHeader, { isBold: true, children: "Ticket Details" }), jsxRuntimeExports.jsxs(Row, { children: [jsxRuntimeExports.jsxs(Col, { size: 4, children: [jsxRuntimeExports.jsx(FieldLabel, { children: "Requester" }), jsxRuntimeExports.jsx(MD, { children: ticket.requester.name })] }), jsxRuntimeExports.jsxs(Col, { size: 4, children: [jsxRuntimeExports.jsx(FieldLabel, { children: "ID" }), jsxRuntimeExports.jsx(MD, { children: ticket.id })] }), jsxRuntimeExports.jsxs(Col, { size: 4, children: [jsxRuntimeExports.jsx(FieldLabel, { children: "Priority" }), jsxRuntimeExports.jsx(MD, { children: ticket.priority })] })] })] }));
}

const ButtonContainer = styled.div `
  display: flex;
  flex-direction: row;
  gap: ${(props) => props.theme.space.md}; /* 20px */
`;
// interface ApproverActionsProps {}
function ApproverActions() {
    return (jsxRuntimeExports.jsxs(ButtonContainer, { children: [jsxRuntimeExports.jsx(Button, { isPrimary: true, children: "Approve request" }), jsxRuntimeExports.jsx(Button, { children: "Deny request" })] }));
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
function ApprovalRequestPage() {
    const [approvalRequest, setApprovalRequest] = reactExports.useState(null);
    const [ticket, setTicket] = reactExports.useState(null);
    const [status, setStatus] = reactExports.useState("pending");
    reactExports.useEffect(() => {
        const fetchData = async () => {
            try {
                const [approvalData, ticketData] = await Promise.all([
                    fetchMockApprovalRequest(),
                    fetchMockTicket(),
                ]);
                setApprovalRequest(approvalData);
                setTicket(ticketData);
            }
            catch (error) {
                setStatus("error");
                console.error("Error fetching data:", error);
            }
            finally {
                setStatus("resolved");
            }
        };
        fetchData();
    }, []);
    // MKTODO: handle error state
    if (status === "pending") {
        // MKTODO: build out loading state with Skeleton components
        return jsxRuntimeExports.jsx(Container, { children: "Loading..." });
    }
    return (jsxRuntimeExports.jsxs(Container, { children: [jsxRuntimeExports.jsxs(LeftColumn, { children: [jsxRuntimeExports.jsx(XXL, { isBold: true, children: approvalRequest?.subject }), jsxRuntimeExports.jsx(MD, { children: approvalRequest?.message }), ticket && jsxRuntimeExports.jsx(ApprovalTicketDetails, { ticket: ticket }), jsxRuntimeExports.jsx(ApproverActions, {})] }), jsxRuntimeExports.jsx(RightColumn, { children: approvalRequest && (jsxRuntimeExports.jsx(ApprovalRequestDetails, { approvalRequest: approvalRequest })) })] }));
}

async function renderApprovalRequest(container, settings, props) {
    reactDomExports.render(jsxRuntimeExports.jsx(ThemeProviders, { theme: createTheme(settings), children: jsxRuntimeExports.jsx(ApprovalRequestPage, { ...props }) }), container);
}

export { renderApprovalRequest, renderApprovalRequestList };
