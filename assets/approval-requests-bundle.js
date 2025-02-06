import { r as reactExports, s as styled, d as Field, a as MediaInput, k as debounce, j as jsxRuntimeExports, e as Label, al as SvgSearchStroke, g as Combobox, O as Option, B as Tag, am as Ellipsis, G as getColorV8, A as Anchor, an as Table, ao as Head, ap as HeaderRow, aq as HeaderCell, ar as Body, as as Row, at as Cell, ad as MD, au as Spinner, av as XXL, a4 as reactDomExports, a5 as ThemeProviders, a6 as createTheme, ah as ErrorBoundary, a9 as Grid, ab as Row$1, aa as Col, c as useNotify, F as Field$1, L as Label$1, T as Textarea, M as Message, Z as Button, aw as Breadcrumb } from 'shared';

function useSearchApprovalRequests() {
    const [approvalRequests, setApprovalRequests] = reactExports.useState([]);
    const [error, setError] = reactExports.useState(null);
    const [isLoading, setIsLoading] = reactExports.useState(false);
    const [approvalRequestStatus, setApprovalRequestStatus] = reactExports.useState("any");
    reactExports.useEffect(() => {
        const fetchApprovalRequests = async () => {
            setIsLoading(true);
            try {
                const currentUserRequest = await fetch("/api/v2/users/me.json");
                if (!currentUserRequest.ok) {
                    throw new Error("Error fetching current user data");
                }
                const currentUser = await currentUserRequest.json();
                // TODO: can be any ULID, the API was implemented this way for future proofing, we will likely need to update the route in the UI to match
                const approvalWorkflowInstanceId = "01JJQFNX5ADZ6PRQCFWRDNKZRD";
                const response = await fetch(`/api/v2/approval_workflow_instances/${approvalWorkflowInstanceId}/approval_requests/search${approvalRequestStatus === "any"
                    ? ""
                    : `?status=${approvalRequestStatus}`}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "X-CSRF-Token": currentUser.user.authenticity_token,
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setApprovalRequests(data.approval_requests);
                }
                else {
                    throw new Error("Error fetching approval requests");
                }
            }
            catch (error) {
                setError(error);
            }
            finally {
                setIsLoading(false);
            }
        };
        fetchApprovalRequests();
    }, [approvalRequestStatus]);
    return {
        approvalRequests,
        errorFetchingApprovalRequests: error,
        approvalRequestStatus,
        setApprovalRequestStatus,
        isLoading: isLoading,
    };
}

const FiltersContainer = styled.div `
  display: flex;
  gap: ${(props) => props.theme.space.base * 17}px; /* 68px */
  align-items: flex-end;

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    flex-direction: column;
    align-items: normal;
    gap: ${(props) => props.theme.space.base * 4}px; /* 16px */
  }
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
const ApprovalRequestStatusInputMap = {
    any: "Any",
    active: "Decision pending",
    approved: "Approved",
    rejected: "Denied",
    withdrawn: "Withdrawn",
};
function ApprovalRequestListFilters({ approvalRequestStatus, setApprovalRequestStatus, setSearchTerm, }) {
    const handleChange = reactExports.useCallback((changes) => {
        if (!changes.selectionValue) {
            return;
        }
        setApprovalRequestStatus(changes.selectionValue);
        setSearchTerm(""); // Reset search term when changing status
    }, [setApprovalRequestStatus]);
    const debouncedSetSearchTerm = reactExports.useMemo(() => debounce((value) => setSearchTerm(value), 300), [setSearchTerm]);
    const handleSearch = reactExports.useCallback((event) => {
        debouncedSetSearchTerm(event.target.value);
    }, [debouncedSetSearchTerm]);
    return (jsxRuntimeExports.jsxs(FiltersContainer, { children: [jsxRuntimeExports.jsxs(SearchField, { children: [jsxRuntimeExports.jsx(Label, { hidden: true, children: "Search approval requests" }), jsxRuntimeExports.jsx(StyledMediaInput, { start: jsxRuntimeExports.jsx(SvgSearchStroke, {}), placeholder: "Search approval requests", onChange: handleSearch })] }), jsxRuntimeExports.jsxs(DropdownFilterField, { children: [jsxRuntimeExports.jsx(Label, { children: "Status:" }), jsxRuntimeExports.jsxs(Combobox, { isEditable: false, onChange: handleChange, selectionValue: approvalRequestStatus, inputValue: ApprovalRequestStatusInputMap[approvalRequestStatus], children: [jsxRuntimeExports.jsx(Option, { value: "any", label: "Any" }), jsxRuntimeExports.jsx(Option, { value: "active", label: "Decision pending" }), jsxRuntimeExports.jsx(Option, { value: "approved", label: "Approved" }), jsxRuntimeExports.jsx(Option, { value: "rejected", label: "Denied" }), jsxRuntimeExports.jsx(Option, { value: "withdrawn", label: "Withdrawn" })] })] })] }));
}
var ApprovalRequestListFilters$1 = reactExports.memo(ApprovalRequestListFilters);

const APPROVAL_REQUEST_STATES = {
    ACTIVE: "active",
    APPROVED: "approved",
    REJECTED: "rejected",
    // CLARIFICATION_REQUESTED: "clarification_requested",
    WITHDRAWN: "withdrawn",
};
const DEFAULT_STATUS_CONFIG = { hue: "grey", label: "Unknown status" };
const statusTagConfig = {
    [APPROVAL_REQUEST_STATES.ACTIVE]: { hue: "blue", label: "Decision pending" },
    [APPROVAL_REQUEST_STATES.APPROVED]: { hue: "green", label: "Approved" },
    [APPROVAL_REQUEST_STATES.REJECTED]: { hue: "red", label: "Denied" },
    // [APPROVAL_REQUEST_STATES.CLARIFICATION_REQUESTED]: {
    //   hue: "yellow",
    //   label: "Info needed",
    // },
    [APPROVAL_REQUEST_STATES.WITHDRAWN]: { hue: "grey", label: "Withdrawn" },
};
function ApprovalStatusTag({ status }) {
    const config = statusTagConfig[status] || DEFAULT_STATUS_CONFIG;
    return (jsxRuntimeExports.jsx(Tag, { hue: config.hue, children: jsxRuntimeExports.jsx(Ellipsis, { children: config.label }) }));
}
var ApprovalStatusTag$1 = reactExports.memo(ApprovalStatusTag);

const formatApprovalRequestDate = (timestamp, locale, monthFormat = "long") => {
    const date = new Date(timestamp);
    return `${date.toLocaleDateString(locale, {
        month: monthFormat,
        day: "numeric",
        year: "numeric",
    })} ${date.toLocaleTimeString(locale, {
        hour: "2-digit",
        minute: "2-digit",
    })}`;
};

const ApprovalRequestAnchor = styled(Anchor) `
  &:visited {
    color: ${(props) => getColorV8("blue", 600, props.theme)};
  }
`;
function ApprovalRequestListTable({ requests, helpCenterPath, baseLocale, }) {
    return (jsxRuntimeExports.jsxs(Table, { size: "large", children: [jsxRuntimeExports.jsx(Head, { children: jsxRuntimeExports.jsxs(HeaderRow, { children: [jsxRuntimeExports.jsx(HeaderCell, { width: "40%", isTruncated: true, children: "Subject" }), jsxRuntimeExports.jsx(HeaderCell, { isTruncated: true, children: "Requester" }), jsxRuntimeExports.jsx(HeaderCell, { isTruncated: true, children: "Sent by" }), jsxRuntimeExports.jsx(HeaderCell, { isTruncated: true, children: "Sent on" }), jsxRuntimeExports.jsx(HeaderCell, { isTruncated: true, children: "Approval status" })] }) }), jsxRuntimeExports.jsx(Body, { children: requests.map((request) => (jsxRuntimeExports.jsxs(Row, { children: [jsxRuntimeExports.jsx(Cell, { isTruncated: true, children: jsxRuntimeExports.jsx(ApprovalRequestAnchor, { href: `${helpCenterPath}/approval_requests/${request.id}`, children: request.subject }) }), jsxRuntimeExports.jsx(Cell, { isTruncated: true, children: request.requester_name }), jsxRuntimeExports.jsx(Cell, { isTruncated: true, children: request.created_by_name }), jsxRuntimeExports.jsx(Cell, { isTruncated: true, children: formatApprovalRequestDate(request.created_at, baseLocale, "short") }), jsxRuntimeExports.jsx(Cell, { isTruncated: true, children: jsxRuntimeExports.jsx(ApprovalStatusTag$1, { status: request.status }) })] }, request.id))) })] }));
}
var ApprovalRequestListTable$1 = reactExports.memo(ApprovalRequestListTable);

const Container$2 = styled.div `
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.space.lg};
  margin-top: ${(props) => props.theme.space.xl}; /* 40px */
`;
const LoadingContainer$1 = styled.div `
  display: flex;
  justify-content: center;
  align-items: center;
`;
const NoApprovalRequestsText = styled(MD) `
  color: ${(props) => getColorV8("grey", 600, props.theme)};
`;
function ApprovalRequestListPage({ baseLocale, helpCenterPath, }) {
    const [searchTerm, setSearchTerm] = reactExports.useState("");
    const { approvalRequests, errorFetchingApprovalRequests: error, approvalRequestStatus, setApprovalRequestStatus, isLoading, } = useSearchApprovalRequests();
    const filteredRequests = reactExports.useMemo(() => {
        if (!searchTerm)
            return approvalRequests;
        const term = searchTerm.toLowerCase();
        return approvalRequests.filter((request) => request.subject.toLowerCase().includes(term));
    }, [approvalRequests, searchTerm]);
    if (error) {
        throw error;
    }
    if (isLoading) {
        return (jsxRuntimeExports.jsx(LoadingContainer$1, { children: jsxRuntimeExports.jsx(Spinner, { size: "64" }) }));
    }
    return (jsxRuntimeExports.jsxs(Container$2, { children: [jsxRuntimeExports.jsx(XXL, { isBold: true, children: "Approval requests" }), jsxRuntimeExports.jsx(ApprovalRequestListFilters$1, { approvalRequestStatus: approvalRequestStatus, setApprovalRequestStatus: setApprovalRequestStatus, setSearchTerm: setSearchTerm }), approvalRequests.length === 0 ? (jsxRuntimeExports.jsx(NoApprovalRequestsText, { children: "No approval requests found." })) : (jsxRuntimeExports.jsx(ApprovalRequestListTable$1, { requests: filteredRequests, baseLocale: baseLocale, helpCenterPath: helpCenterPath }))] }));
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
function ApprovalRequestDetails({ approvalRequest, baseLocale, }) {
    return (jsxRuntimeExports.jsxs(Container$1, { children: [jsxRuntimeExports.jsx(ApprovalRequestHeader, { isBold: true, children: "Approval request details" }), jsxRuntimeExports.jsxs(DetailRow, { children: [jsxRuntimeExports.jsx(Col, { size: 4, children: jsxRuntimeExports.jsx(FieldLabel$1, { children: "Sent by" }) }), jsxRuntimeExports.jsx(Col, { size: 8, children: jsxRuntimeExports.jsx(MD, { children: approvalRequest.created_by_user.name }) })] }), jsxRuntimeExports.jsxs(DetailRow, { children: [jsxRuntimeExports.jsx(Col, { size: 4, children: jsxRuntimeExports.jsx(FieldLabel$1, { children: "Sent on" }) }), jsxRuntimeExports.jsx(Col, { size: 8, children: jsxRuntimeExports.jsx(MD, { children: formatApprovalRequestDate(approvalRequest.created_at, baseLocale) }) })] }), jsxRuntimeExports.jsxs(DetailRow, { children: [jsxRuntimeExports.jsx(Col, { size: 4, children: jsxRuntimeExports.jsx(FieldLabel$1, { children: "Approver" }) }), jsxRuntimeExports.jsx(Col, { size: 8, children: jsxRuntimeExports.jsx(MD, { children: approvalRequest.assignee_user.name }) })] }), jsxRuntimeExports.jsxs(DetailRow, { children: [jsxRuntimeExports.jsx(Col, { size: 4, children: jsxRuntimeExports.jsx(FieldLabel$1, { children: "Status" }) }), jsxRuntimeExports.jsx(Col, { size: 8, children: jsxRuntimeExports.jsx(MD, { children: jsxRuntimeExports.jsx(ApprovalStatusTag$1, { status: approvalRequest.status }) }) })] }), approvalRequest.decided_at && (jsxRuntimeExports.jsxs(DetailRow, { children: [jsxRuntimeExports.jsx(Col, { size: 4, children: jsxRuntimeExports.jsx(FieldLabel$1, { children: "Decided" }) }), jsxRuntimeExports.jsx(Col, { size: 8, children: jsxRuntimeExports.jsx(MD, { children: formatApprovalRequestDate(approvalRequest.decided_at, baseLocale) }) })] })), approvalRequest.decision_notes.length > 0 && (jsxRuntimeExports.jsxs(DetailRow, { children: [jsxRuntimeExports.jsx(Col, { size: 4, children: jsxRuntimeExports.jsx(FieldLabel$1, { children: "Comment" }) }), jsxRuntimeExports.jsx(Col, { size: 8, children: jsxRuntimeExports.jsx(MD, { children: approvalRequest.decision_notes[0] }) })] }))] }));
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
const NULL_VALUE_PLACEHOLDER = "-";
function CustomFieldValue({ value, }) {
    if (Array.isArray(value) && value.length > 0) {
        return (jsxRuntimeExports.jsx(MD, { children: value.map((val) => (jsxRuntimeExports.jsx(MultiselectTag, { hue: "grey", children: val }, val))) }));
    }
    if (typeof value === "boolean") {
        return jsxRuntimeExports.jsx(MD, { children: value ? "Yes" : "No" });
    }
    if (!value || (Array.isArray(value) && value.length === 0)) {
        return jsxRuntimeExports.jsx(MD, { children: NULL_VALUE_PLACEHOLDER });
    }
    return jsxRuntimeExports.jsx(MD, { children: value });
}
function ApprovalTicketDetails({ ticket }) {
    return (jsxRuntimeExports.jsxs(TicketContainer, { children: [jsxRuntimeExports.jsx(TicketDetailsHeader, { isBold: true, children: "Ticket Details" }), jsxRuntimeExports.jsxs(CustomFieldsGrid, { children: [jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx(FieldLabel, { children: "Requester" }), jsxRuntimeExports.jsx(MD, { children: ticket.requester.name })] }), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx(FieldLabel, { children: "ID" }), jsxRuntimeExports.jsx(MD, { children: ticket.id })] }), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx(FieldLabel, { children: "Priority" }), jsxRuntimeExports.jsx(MD, { children: ticket.priority })] }), ticket.custom_fields.map((field) => (jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx(FieldLabel, { children: field.title_in_portal }), jsxRuntimeExports.jsx(CustomFieldValue, { value: field.value })] }, String(field.id))))] })] }));
}
var ApprovalTicketDetails$1 = reactExports.memo(ApprovalTicketDetails);

async function submitApprovalDecision(approvalWorkflowInstanceId, approvalRequestId, decision, decisionNote) {
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
                notes: decisionNote,
            }),
        });
        return response;
    }
    catch (error) {
        console.error("Error submitting approval decision:", error);
        throw error;
    }
}

const PENDING_APPROVAL_STATUS = {
    APPROVED: "APPROVED",
    REJECTED: "REJECTED",
};
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
function ApproverActions({ approvalRequestId, approvalWorkflowInstanceId, setApprovalRequest, }) {
    const notify = useNotify();
    const [comment, setComment] = reactExports.useState("");
    const [pendingStatus, setPendingStatus] = reactExports.useState(null);
    const [isSubmitting, setIsSubmitting] = reactExports.useState(false);
    const [showValidation, setShowValidation] = reactExports.useState(false);
    const isCommentValid = pendingStatus !== PENDING_APPROVAL_STATUS.REJECTED || comment.trim() !== "";
    const shouldShowValidationError = showValidation && !isCommentValid;
    const handleApproveRequestClick = reactExports.useCallback(() => {
        setPendingStatus(PENDING_APPROVAL_STATUS.APPROVED);
        setShowValidation(false);
    }, []);
    const handleDenyRequestClick = reactExports.useCallback(() => {
        setPendingStatus(PENDING_APPROVAL_STATUS.REJECTED);
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
            const decision = pendingStatus === PENDING_APPROVAL_STATUS.APPROVED
                ? "approved"
                : "rejected";
            const response = await submitApprovalDecision(approvalWorkflowInstanceId, approvalRequestId, decision, comment);
            if (response.ok) {
                const data = await response.json();
                setApprovalRequest(data.approval_request);
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
        const fieldLabel = pendingStatus === PENDING_APPROVAL_STATUS.APPROVED
            ? "Additional note"
            : "Reason for denial* (Required)";
        return (jsxRuntimeExports.jsxs(CommentSection, { children: [jsxRuntimeExports.jsxs(Field$1, { children: [jsxRuntimeExports.jsx(Label$1, { children: fieldLabel }), jsxRuntimeExports.jsx(Textarea, { minRows: 5, value: comment, onChange: handleInputValueChange, disabled: isSubmitting, validation: shouldShowValidationError ? "error" : undefined }), shouldShowValidationError && (jsxRuntimeExports.jsx(Message, { validation: "error", children: "Enter a reason for denial" }))] }), jsxRuntimeExports.jsxs(ButtonContainer, { children: [jsxRuntimeExports.jsx(Button, { isPrimary: pendingStatus === PENDING_APPROVAL_STATUS.APPROVED, onClick: handleSubmitDecisionClick, disabled: isSubmitting, children: pendingStatus === PENDING_APPROVAL_STATUS.APPROVED
                                ? "Submit approval"
                                : "Submit denial" }), jsxRuntimeExports.jsx(Button, { onClick: handleCancelClick, disabled: isSubmitting, children: "Cancel" })] })] }));
    }
    return (jsxRuntimeExports.jsxs(ButtonContainer, { children: [jsxRuntimeExports.jsx(Button, { isPrimary: true, onClick: handleApproveRequestClick, children: "Approve request" }), jsxRuntimeExports.jsx(Button, { onClick: handleDenyRequestClick, children: "Deny request" })] }));
}
var ApproverActions$1 = reactExports.memo(ApproverActions);

function useApprovalRequest(approvalWorkflowInstanceId, approvalRequestId) {
    const [approvalRequest, setApprovalRequest] = reactExports.useState();
    const [error, setError] = reactExports.useState(null);
    const [isLoading, setIsLoading] = reactExports.useState(false);
    reactExports.useEffect(() => {
        const fetchApprovalRequest = async () => {
            setIsLoading(true);
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
            finally {
                setIsLoading(false);
            }
        };
        fetchApprovalRequest();
    }, [approvalRequestId, approvalWorkflowInstanceId]);
    return {
        approvalRequest,
        errorFetchingApprovalRequest: error,
        isLoading,
        setApprovalRequest,
    };
}

const StyledBreadcrumb = styled(Breadcrumb) `
  margin-top: ${(props) => props.theme.space.lg}; /* 32px */
`;
const BreadcrumbAnchor = styled(Anchor) `
  &:visited {
    color: ${(props) => getColorV8("blue", 600, props.theme)};
  }
`;
function ApprovalRequestBreadcrumbs({ organizations, helpCenterPath, }) {
    const defaultOrganizationName = organizations.length > 0 ? organizations[0]?.name : null;
    if (defaultOrganizationName) {
        return (jsxRuntimeExports.jsxs(StyledBreadcrumb, { children: [jsxRuntimeExports.jsx(BreadcrumbAnchor, { href: helpCenterPath, children: defaultOrganizationName }), jsxRuntimeExports.jsx(BreadcrumbAnchor, { href: `${helpCenterPath}/approval_requests`, children: "Approval requests" })] }));
    }
    return (jsxRuntimeExports.jsx(StyledBreadcrumb, { children: jsxRuntimeExports.jsx(BreadcrumbAnchor, { href: `${helpCenterPath}/approval_requests`, children: "Approval requests" }) }));
}
var ApprovalRequestBreadcrumbs$1 = reactExports.memo(ApprovalRequestBreadcrumbs);

const Container = styled.div `
  display: flex;
  flex-direction: row;
  margin-top: ${(props) => props.theme.space.xl}; /* 40px */
  margin-bottom: ${(props) => props.theme.space.lg}; /* 32px */

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    flex-direction: column;
    margin-bottom: ${(props) => props.theme.space.xl}; /* 40px */
  }
`;
const LoadingContainer = styled.div `
  display: flex;
  justify-content: center;
  align-items: center;
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
function ApprovalRequestPage({ approvalWorkflowInstanceId, approvalRequestId, baseLocale, helpCenterPath, organizations, userId, }) {
    const { approvalRequest, setApprovalRequest, errorFetchingApprovalRequest: error, isLoading, } = useApprovalRequest(approvalWorkflowInstanceId, approvalRequestId);
    if (error) {
        throw error;
    }
    if (isLoading) {
        return (jsxRuntimeExports.jsx(LoadingContainer, { children: jsxRuntimeExports.jsx(Spinner, { size: "64" }) }));
    }
    const showApproverActions = userId === approvalRequest?.assignee_user?.id &&
        approvalRequest?.status === "active";
    return (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsx(ApprovalRequestBreadcrumbs$1, { helpCenterPath: helpCenterPath, organizations: organizations }), jsxRuntimeExports.jsxs(Container, { children: [jsxRuntimeExports.jsxs(LeftColumn, { children: [jsxRuntimeExports.jsx(XXL, { isBold: true, children: approvalRequest?.subject }), jsxRuntimeExports.jsx(MD, { children: approvalRequest?.message }), approvalRequest?.ticket_details && (jsxRuntimeExports.jsx(ApprovalTicketDetails$1, { ticket: approvalRequest.ticket_details }))] }), jsxRuntimeExports.jsx(RightColumn, { children: approvalRequest && (jsxRuntimeExports.jsx(ApprovalRequestDetails$1, { approvalRequest: approvalRequest, baseLocale: baseLocale })) })] }), showApproverActions && (jsxRuntimeExports.jsx(ApproverActions$1, { approvalWorkflowInstanceId: approvalWorkflowInstanceId, approvalRequestId: approvalRequestId, setApprovalRequest: setApprovalRequest }))] }));
}
var ApprovalRequestPage$1 = reactExports.memo(ApprovalRequestPage);

async function renderApprovalRequest(container, settings, props, helpCenterPath) {
    reactDomExports.render(jsxRuntimeExports.jsx(ThemeProviders, { theme: createTheme(settings), children: jsxRuntimeExports.jsx(ErrorBoundary, { helpCenterPath: helpCenterPath, children: jsxRuntimeExports.jsx(ApprovalRequestPage$1, { ...props, helpCenterPath: helpCenterPath }) }) }), container);
}

export { renderApprovalRequest, renderApprovalRequestList };
