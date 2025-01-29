import { s as styled, r as reactExports, d as Field, a as MediaInput, j as jsxRuntimeExports, e as Label, al as SvgSearchStroke, g as Combobox, O as Option, B as Tag, G as getColorV8, A as Anchor, am as Table, an as Head, ao as HeaderRow, ap as HeaderCell, aq as Body, ar as Row, as as Cell, at as XXL, a4 as reactDomExports, a5 as ThemeProviders, a6 as createTheme, ah as ErrorBoundary, a9 as Grid, ad as MD, ab as Row$1, aa as Col, c as useNotify, F as Field$1, L as Label$1, T as Textarea, M as Message, Z as Button } from 'shared';

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
var ApprovalRequestListFilters$1 = reactExports.memo(ApprovalRequestListFilters);

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
var ApprovalStatusTag$1 = reactExports.memo(ApprovalStatusTag);

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
    return (jsxRuntimeExports.jsxs(Table, { size: "large", children: [jsxRuntimeExports.jsx(Head, { children: jsxRuntimeExports.jsxs(HeaderRow, { children: [jsxRuntimeExports.jsx(HeaderCell, { width: "40%", children: "Subject" }), jsxRuntimeExports.jsx(HeaderCell, { children: "Requester" }), jsxRuntimeExports.jsx(HeaderCell, { children: "Sent by" }), jsxRuntimeExports.jsx(HeaderCell, { children: "Sent on" }), jsxRuntimeExports.jsx(HeaderCell, { children: "Approval status" })] }) }), jsxRuntimeExports.jsx(Body, { children: requests.map((request) => (jsxRuntimeExports.jsxs(Row, { children: [jsxRuntimeExports.jsx(Cell, { children: jsxRuntimeExports.jsx(ApprovalRequestAnchor, { href: `${helpCenterPath}/approval_requests/${request.id}`, children: request.subject }) }), jsxRuntimeExports.jsx(Cell, { children: request.requester_name }), jsxRuntimeExports.jsx(Cell, { children: request.created_by_name }), jsxRuntimeExports.jsx(Cell, { children: formatApprovalRequestDate(request.created_at, "short") }), jsxRuntimeExports.jsx(Cell, { children: jsxRuntimeExports.jsx(ApprovalStatusTag$1, { status: request.status }) })] }, request.id))) })] }));
}
var ApprovalRequestListTable$1 = reactExports.memo(ApprovalRequestListTable);

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
    return (jsxRuntimeExports.jsxs(Container$2, { children: [jsxRuntimeExports.jsx(XXL, { isBold: true, children: "Approval requests" }), jsxRuntimeExports.jsx(ApprovalRequestListFilters$1, {}), jsxRuntimeExports.jsx(ApprovalRequestListTable$1, { requests: requests, helpCenterPath: helpCenterPath })] }));
}
var ApprovalRequestListPage$1 = reactExports.memo(ApprovalRequestListPage);

async function renderApprovalRequestList(container, settings, props, helpCenterPath) {
    reactDomExports.render(jsxRuntimeExports.jsx(ThemeProviders, { theme: createTheme(settings), children: jsxRuntimeExports.jsx(ErrorBoundary, { helpCenterPath: helpCenterPath, children: jsxRuntimeExports.jsx(ApprovalRequestListPage$1, { ...props, helpCenterPath: helpCenterPath }) }) }), container);
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
    return (jsxRuntimeExports.jsxs(Container$1, { children: [jsxRuntimeExports.jsx(ApprovalRequestHeader, { isBold: true, children: "Approval request details" }), jsxRuntimeExports.jsxs(DetailRow, { children: [jsxRuntimeExports.jsx(Col, { size: 4, children: jsxRuntimeExports.jsx(FieldLabel$1, { children: "Sent by" }) }), jsxRuntimeExports.jsx(Col, { size: 8, children: jsxRuntimeExports.jsx(MD, { children: approvalRequest.created_by_user.name }) })] }), jsxRuntimeExports.jsxs(DetailRow, { children: [jsxRuntimeExports.jsx(Col, { size: 4, children: jsxRuntimeExports.jsx(FieldLabel$1, { children: "Sent on" }) }), jsxRuntimeExports.jsx(Col, { size: 8, children: jsxRuntimeExports.jsx(MD, { children: formatApprovalRequestDate(approvalRequest.created_at) }) })] }), jsxRuntimeExports.jsxs(DetailRow, { children: [jsxRuntimeExports.jsx(Col, { size: 4, children: jsxRuntimeExports.jsx(FieldLabel$1, { children: "Approver" }) }), jsxRuntimeExports.jsx(Col, { size: 8, children: jsxRuntimeExports.jsx(MD, { children: approvalRequest.assignee_user.name }) })] }), jsxRuntimeExports.jsxs(DetailRow, { children: [jsxRuntimeExports.jsx(Col, { size: 4, children: jsxRuntimeExports.jsx(FieldLabel$1, { children: "Status" }) }), jsxRuntimeExports.jsx(Col, { size: 8, children: jsxRuntimeExports.jsx(MD, { children: jsxRuntimeExports.jsx(ApprovalStatusTag$1, { status: approvalRequest.status }) }) })] })] }));
}
var ApprovalRequestDetails$1 = reactExports.memo(ApprovalRequestDetails);

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
const MultiselectTag = styled(Tag) `
  margin-right: ${(props) => props.theme.space.xxs}; /* 4px */
`;
const CustomFieldsGrid = styled.div `
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${(props) => props.theme.space.md}; /* 20px */
  margin-top: ${(props) => props.theme.space.md}; /* 20px */

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;
function CustomFieldValue({ value, }) {
    if (Array.isArray(value)) {
        return (jsxRuntimeExports.jsx(MD, { children: value.map((val) => (jsxRuntimeExports.jsx(MultiselectTag, { hue: "grey", children: val }, val))) }));
    }
    if (typeof value === "boolean") {
        return jsxRuntimeExports.jsx(MD, { children: value ? "Yes" : "No" });
    }
    return jsxRuntimeExports.jsx(MD, { children: value });
}
function ApprovalTicketDetails({ ticket }) {
    return (jsxRuntimeExports.jsxs(TicketContainer, { children: [jsxRuntimeExports.jsx(TicketDetailsHeader, { isBold: true, children: "Ticket Details" }), jsxRuntimeExports.jsxs(CustomFieldsGrid, { children: [jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx(FieldLabel, { children: "Requester" }), jsxRuntimeExports.jsx(MD, { children: ticket.requester.name })] }), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx(FieldLabel, { children: "ID" }), jsxRuntimeExports.jsx(MD, { children: ticket.id })] }), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx(FieldLabel, { children: "Priority" }), jsxRuntimeExports.jsx(MD, { children: ticket.priority })] }), ticket.custom_fields.map((field) => (jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx(FieldLabel, { children: field.title_in_portal }), jsxRuntimeExports.jsx(CustomFieldValue, { value: field.value })] }, String(field.id))))] })] }));
}
var ApprovalTicketDetails$1 = reactExports.memo(ApprovalTicketDetails);

async function submitApprovalDecision(approvalWorkflowInstanceId, approvalRequestId, decision) {
    try {
        const currentUserRequest = await fetch("/api/v2/users/me.json");
        if (!currentUserRequest.ok) {
            throw new Error("Error fetching current user data");
        }
        const currentUser = await currentUserRequest.json();
        const response = await fetch(`/api/v2/approval_workflow_instances/${approvalWorkflowInstanceId}/approval_requests/${approvalRequestId}/decision`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-Token": currentUser.user.authenticity_token,
            },
            body: JSON.stringify({
                status: decision,
            }),
        });
        return response;
    }
    catch (error) {
        console.error("Error submitting approval decision:", error);
        throw error;
    }
}

const ButtonContainer = styled.div `
  display: flex;
  flex-direction: row;
  gap: ${(props) => props.theme.space.md}; /* 20px */

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    flex-direction: column;
    gap: ${(props) => props.theme.space.base * 4}px; /* 16px */
  }
`;
const CommentSection = styled.div `
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.space.lg}; /* 32px */
`;
function ApproverActions({ approvalRequestId, approvalWorkflowInstanceId, }) {
    const notify = useNotify();
    const [comment, setComment] = reactExports.useState("");
    const [pendingStatus, setPendingStatus] = reactExports.useState(null);
    const [isSubmitting, setIsSubmitting] = reactExports.useState(false);
    const [showValidation, setShowValidation] = reactExports.useState(false);
    const isCommentValid = pendingStatus !== "REJECTED" || comment.trim() !== "";
    const shouldShowValidationError = showValidation && !isCommentValid;
    const handleApproveRequestClick = reactExports.useCallback(() => {
        setPendingStatus("APPROVED");
        setShowValidation(false);
    }, []);
    const handleDenyRequestClick = reactExports.useCallback(() => {
        setPendingStatus("REJECTED");
        setShowValidation(false);
    }, []);
    const handleInputValueChange = reactExports.useCallback((e) => {
        setComment(e.target.value);
    }, []);
    const handleCancelClick = reactExports.useCallback(() => {
        setPendingStatus(null);
        setComment("");
        setShowValidation(false);
    }, []);
    const handleSubmitDecisionClick = async () => {
        setShowValidation(true);
        if (!pendingStatus || !isCommentValid)
            return;
        setIsSubmitting(true);
        try {
            const decision = pendingStatus === "APPROVED" ? "approved" : "rejected";
            const response = await submitApprovalDecision(approvalWorkflowInstanceId, approvalRequestId, decision);
            if (response.ok) {
                const notificationTitle = decision === "approved" ? "Approval submitted" : "Denial submitted";
                notify({
                    type: "success",
                    title: notificationTitle,
                    message: "",
                });
            }
            else {
                throw new Error(`Failed to submit ${decision} decision`);
            }
        }
        catch (error) {
            notify({
                type: "error",
                title: "Error submitting decision",
                message: "Please try again later",
            });
        }
        finally {
            setIsSubmitting(false);
        }
    };
    if (pendingStatus) {
        const fieldLabel = pendingStatus === "APPROVED"
            ? "Additional note"
            : "Reason for denial* (Required)";
        return (jsxRuntimeExports.jsxs(CommentSection, { children: [jsxRuntimeExports.jsxs(Field$1, { children: [jsxRuntimeExports.jsx(Label$1, { children: fieldLabel }), jsxRuntimeExports.jsx(Textarea, { minRows: 5, value: comment, onChange: handleInputValueChange, disabled: isSubmitting, validation: shouldShowValidationError ? "error" : undefined }), shouldShowValidationError && (jsxRuntimeExports.jsx(Message, { validation: "error", children: "Enter a reason for denial" }))] }), jsxRuntimeExports.jsxs(ButtonContainer, { children: [jsxRuntimeExports.jsx(Button, { isPrimary: pendingStatus === "APPROVED", onClick: handleSubmitDecisionClick, disabled: isSubmitting, children: pendingStatus === "APPROVED" ? "Submit approval" : "Submit denial" }), jsxRuntimeExports.jsx(Button, { onClick: handleCancelClick, disabled: isSubmitting, children: "Cancel" })] })] }));
    }
    return (jsxRuntimeExports.jsxs(ButtonContainer, { children: [jsxRuntimeExports.jsx(Button, { isPrimary: true, onClick: handleApproveRequestClick, children: "Approve request" }), jsxRuntimeExports.jsx(Button, { onClick: handleDenyRequestClick, children: "Deny request" })] }));
}
var ApproverActions$1 = reactExports.memo(ApproverActions);

function useApprovalRequest(approvalWorkflowInstanceId, approvalRequestId) {
    const [approvalRequest, setApprovalRequest] = reactExports.useState();
    const [error, setError] = reactExports.useState(null);
    reactExports.useEffect(() => {
        const fetchApprovalRequest = async () => {
            try {
                const response = await fetch(`/api/v2/approval_workflow_instances/${approvalWorkflowInstanceId}/approval_requests/${approvalRequestId}`);
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
    }, [approvalRequestId, approvalWorkflowInstanceId]);
    return { approvalRequest, errorFetchingApprovalRequest: error };
}

const Container = styled.div `
  display: flex;
  flex-direction: row;
  margin-bottom: ${(props) => props.theme.space.lg}; /* 32px */

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    flex-direction: column;
    margin-bottom: ${(props) => props.theme.space.xl}; /* 40px */
  }
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

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    margin-right: 0;
    margin-bottom: ${(props) => props.theme.space.lg};
  }
`;
const RightColumn = styled.div `
  flex: 1;
  margin-left: ${(props) => props.theme.space.xl};

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    margin-left: 0;
  }
`;
function ApprovalRequestPage({ approvalWorkflowInstanceId, approvalRequestId, userId, }) {
    const { approvalRequest, errorFetchingApprovalRequest: error } = useApprovalRequest(approvalWorkflowInstanceId, approvalRequestId);
    if (error) {
        throw error;
    }
    // MKTODO: add loading state
    const showApproverActions = userId === approvalRequest?.assignee_user?.id;
    // MKTODO: uncomment when the correct status is returning
    // && approvalRequest?.status === "ACTIVE";
    return (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsxs(Container, { children: [jsxRuntimeExports.jsxs(LeftColumn, { children: [jsxRuntimeExports.jsx(XXL, { isBold: true, children: approvalRequest?.subject }), jsxRuntimeExports.jsx(MD, { children: approvalRequest?.message }), approvalRequest?.ticket_details && (jsxRuntimeExports.jsx(ApprovalTicketDetails$1, { ticket: approvalRequest.ticket_details }))] }), jsxRuntimeExports.jsx(RightColumn, { children: approvalRequest && (jsxRuntimeExports.jsx(ApprovalRequestDetails$1, { approvalRequest: approvalRequest })) })] }), showApproverActions && (jsxRuntimeExports.jsx(ApproverActions$1, { approvalWorkflowInstanceId: approvalWorkflowInstanceId, approvalRequestId: approvalRequestId }))] }));
}
var ApprovalRequestPage$1 = reactExports.memo(ApprovalRequestPage);

async function renderApprovalRequest(container, settings, props, helpCenterPath) {
    reactDomExports.render(jsxRuntimeExports.jsx(ThemeProviders, { theme: createTheme(settings), children: jsxRuntimeExports.jsx(ErrorBoundary, { helpCenterPath: helpCenterPath, children: jsxRuntimeExports.jsx(ApprovalRequestPage$1, { ...props }) }) }), container);
}

export { renderApprovalRequest, renderApprovalRequestList };
