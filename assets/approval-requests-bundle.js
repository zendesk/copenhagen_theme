import { r as reactExports, s as styled, g as Field, u as useTranslation, k as debounce, j as jsxRuntimeExports, M as MediaInput, a2 as SvgSearchStroke, h as Combobox, O as Option, q as Tag, ae as Ellipsis, w as getColor, ay as MD, A as Anchor, af as Table, aD as Spinner, aE as XXL, Y as initI18next, Z as loadTranslations, _ as reactDomExports, a0 as ThemeProviders, a1 as createTheme, ao as ErrorBoundary, a9 as Grid, b as Field$1, L as Avatar, f as Textarea, E as Button, n as notify, aF as Breadcrumb, aG as Col, aH as Row, aI as Label$1, aJ as Message, aK as SM, aL as differenceInSeconds, aM as differenceInMinutes, aN as isSameYear, aO as isSameDay$1, a4 as subDays, aP as SvgHeadsetFill, aQ as SvgCircleSmFill, X as Alert, aR as Title, aS as Close, H as getColorV8, aT as React } from 'shared';

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

const ORIGINATION_TYPES = {
    ACTION_FLOW: "ACTION_FLOW_ORIGINATION",
    API: "API_ORIGINATION",
};
const APPROVAL_REQUEST_STATES = {
    ACTIVE: "active",
    APPROVED: "approved",
    REJECTED: "rejected",
    WITHDRAWN: "withdrawn",
};
const APPROVAL_DECISION_ORIGINATIONS = {
    SLACK: "SLACK_ORIGINATION",
    UI: "UI_ORIGINATION",
};

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
const DropdownFilterField = styled(Field) `
  flex: 1;
`;
function ApprovalRequestListFilters({ approvalRequestStatus, setApprovalRequestStatus, setSearchTerm, }) {
    const { t } = useTranslation();
    const getStatusLabel = reactExports.useCallback((status) => {
        switch (status) {
            case "any":
                return t("approval-requests.list.status-dropdown.any", "Any");
            case "active":
                return t("approval-requests.status.decision-pending", "Decision pending");
            case "approved":
                return t("approval-requests.status.approved", "Approved");
            case "rejected":
                return t("approval-requests.status.denied", "Denied");
            case "withdrawn":
                return t("approval-requests.status.withdrawn", "Withdrawn");
        }
    }, [t]);
    const handleChange = reactExports.useCallback((changes) => {
        if (!changes.selectionValue) {
            return;
        }
        setApprovalRequestStatus(changes.selectionValue);
        setSearchTerm(""); // Reset search term when changing status
    }, [setApprovalRequestStatus, setSearchTerm]);
    const debouncedSetSearchTerm = reactExports.useMemo(() => debounce((value) => setSearchTerm(value), 300), [setSearchTerm]);
    const handleSearch = reactExports.useCallback((event) => {
        debouncedSetSearchTerm(event.target.value);
    }, [debouncedSetSearchTerm]);
    return (jsxRuntimeExports.jsxs(FiltersContainer, { children: [jsxRuntimeExports.jsxs(SearchField, { children: [jsxRuntimeExports.jsx(SearchField.Label, { hidden: true, children: t("approval-requests.list.search-placeholder", "Search approval requests") }), jsxRuntimeExports.jsx(MediaInput, { start: jsxRuntimeExports.jsx(SvgSearchStroke, {}), placeholder: t("approval-requests.list.search-placeholder", "Search approval requests"), onChange: handleSearch })] }), jsxRuntimeExports.jsxs(DropdownFilterField, { children: [jsxRuntimeExports.jsx(DropdownFilterField.Label, { children: t("approval-requests.list.status-dropdown.label_v2", "Status") }), jsxRuntimeExports.jsxs(Combobox, { isEditable: false, onChange: handleChange, selectionValue: approvalRequestStatus, inputValue: getStatusLabel(approvalRequestStatus), children: [jsxRuntimeExports.jsx(Option, { value: "any", label: t("approval-requests.list.status-dropdown.any", "Any") }), jsxRuntimeExports.jsx(Option, { value: APPROVAL_REQUEST_STATES.ACTIVE, label: t("approval-requests.status.decision-pending", "Decision pending") }), jsxRuntimeExports.jsx(Option, { value: APPROVAL_REQUEST_STATES.APPROVED, label: t("approval-requests.status.approved", "Approved") }), jsxRuntimeExports.jsx(Option, { value: APPROVAL_REQUEST_STATES.REJECTED, label: t("approval-requests.status.denied", "Denied") }), jsxRuntimeExports.jsx(Option, { value: APPROVAL_REQUEST_STATES.WITHDRAWN, label: t("approval-requests.status.withdrawn", "Withdrawn") })] })] })] }));
}
var ApprovalRequestListFilters$1 = reactExports.memo(ApprovalRequestListFilters);

const DEFAULT_STATUS_CONFIG = { hue: "grey", label: "Unknown status" };
function ApprovalStatusTag({ status }) {
    const { t } = useTranslation();
    const statusTagMap = {
        [APPROVAL_REQUEST_STATES.ACTIVE]: {
            hue: "blue",
            label: t("approval-requests.status.decision-pending", "Decision pending"),
        },
        [APPROVAL_REQUEST_STATES.APPROVED]: {
            hue: "green",
            label: t("approval-requests.status.approved", "Approved"),
        },
        [APPROVAL_REQUEST_STATES.REJECTED]: {
            hue: "red",
            label: t("approval-requests.status.denied", "Denied"),
        },
        [APPROVAL_REQUEST_STATES.WITHDRAWN]: {
            hue: "grey",
            label: t("approval-requests.status.withdrawn", "Withdrawn"),
        },
    };
    const config = statusTagMap[status] || DEFAULT_STATUS_CONFIG;
    return (jsxRuntimeExports.jsx(Tag, { hue: config.hue, children: jsxRuntimeExports.jsx(Ellipsis, { children: config.label }) }));
}
var ApprovalStatusTag$1 = reactExports.memo(ApprovalStatusTag);

const formatApprovalRequestDate = (timestamp, locale, monthFormat = "short") => {
    const date = new Date(timestamp);
    return `${date.toLocaleDateString(locale, {
        month: monthFormat,
        day: "numeric",
        year: "numeric",
    })} ${date.toLocaleTimeString(locale, {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    })}`;
};

const StyledMD = styled(MD) `
  color: ${({ theme }) => getColor({ theme, hue: "grey", shade: 600 })};
`;
function NoApprovalRequestsText() {
    const { t } = useTranslation();
    return (jsxRuntimeExports.jsx(StyledMD, { children: t("approval-requests.list.no-requests", "No approval requests found.") }));
}
var NoApprovalRequestsText$1 = reactExports.memo(NoApprovalRequestsText);

function getSentByLabel(approvalRequest, t) {
    if (approvalRequest.origination_type === ORIGINATION_TYPES.ACTION_FLOW) {
        return t("approval-requests.request.approval-request-details.sent-by-action-flow", "Action flow");
    }
    if (approvalRequest.origination_type === ORIGINATION_TYPES.API) {
        return t("approval-requests.request.approval-request-details.sent-by-api", "API");
    }
    // Handle both types: ApprovalRequest has created_by_user.name, SearchApprovalRequest has created_by_name
    if ("created_by_name" in approvalRequest) {
        return approvalRequest.created_by_name;
    }
    return approvalRequest.created_by_user.name;
}

const ApprovalRequestAnchor = styled(Anchor) `
  &:visited {
    color: ${({ theme }) => getColor({ theme, hue: "blue", shade: 600 })};
  }
`;
const sortableCellProps = {
    style: {
        paddingTop: "22px",
        paddingBottom: "22px",
    },
    isTruncated: true,
};
function ApprovalRequestListTable({ approvalRequests, helpCenterPath, baseLocale, sortDirection, onSortChange, }) {
    const { t } = useTranslation();
    const handleSortClick = () => {
        if (sortDirection === "asc") {
            onSortChange("desc");
        }
        else if (sortDirection === "desc") {
            onSortChange(undefined);
        }
        else {
            onSortChange("asc");
        }
    };
    return (jsxRuntimeExports.jsxs(Table, { size: "large", children: [jsxRuntimeExports.jsx(Table.Head, { children: jsxRuntimeExports.jsxs(Table.HeaderRow, { children: [jsxRuntimeExports.jsx(Table.HeaderCell, { width: "40%", isTruncated: true, children: t("approval-requests.list.table.subject", "Subject") }), jsxRuntimeExports.jsx(Table.HeaderCell, { isTruncated: true, children: t("approval-requests.list.table.requester", "Requester") }), jsxRuntimeExports.jsx(Table.HeaderCell, { isTruncated: true, children: t("approval-requests.list.table.sent-by", "Sent by") }), jsxRuntimeExports.jsx(Table.SortableCell, { onClick: handleSortClick, sort: sortDirection, cellProps: sortableCellProps, children: t("approval-requests.list.table.sent-on", "Sent on") }), jsxRuntimeExports.jsx(Table.HeaderCell, { isTruncated: true, children: t("approval-requests.list.table.approval-status", "Approval status") })] }) }), jsxRuntimeExports.jsx(Table.Body, { children: approvalRequests.length === 0 ? (jsxRuntimeExports.jsx(Table.Row, { children: jsxRuntimeExports.jsx(Table.Cell, { colSpan: 5, children: jsxRuntimeExports.jsx(NoApprovalRequestsText$1, {}) }) })) : (approvalRequests.map((approvalRequest) => (jsxRuntimeExports.jsxs(Table.Row, { children: [jsxRuntimeExports.jsx(Table.Cell, { isTruncated: true, children: jsxRuntimeExports.jsx(ApprovalRequestAnchor, { href: `${helpCenterPath}/approval_requests/${approvalRequest.id}`, children: approvalRequest.subject }) }), jsxRuntimeExports.jsx(Table.Cell, { isTruncated: true, children: approvalRequest.requester_name }), jsxRuntimeExports.jsx(Table.Cell, { isTruncated: true, children: getSentByLabel(approvalRequest, t) }), jsxRuntimeExports.jsx(Table.Cell, { isTruncated: true, children: formatApprovalRequestDate(approvalRequest.created_at, baseLocale) }), jsxRuntimeExports.jsx(Table.Cell, { isTruncated: true, children: jsxRuntimeExports.jsx(ApprovalStatusTag$1, { status: approvalRequest.status }) })] }, approvalRequest.id)))) })] }));
}
var ApprovalRequestListTable$1 = reactExports.memo(ApprovalRequestListTable);

const Container$4 = styled.div `
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
function ApprovalRequestListPage({ baseLocale, helpCenterPath, }) {
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = reactExports.useState("");
    const [sortDirection, setSortDirection] = reactExports.useState(undefined);
    const { approvalRequests, errorFetchingApprovalRequests: error, approvalRequestStatus, setApprovalRequestStatus, isLoading, } = useSearchApprovalRequests();
    const sortedAndFilteredApprovalRequests = reactExports.useMemo(() => {
        let results = [...approvalRequests];
        // Apply search filter
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            results = results.filter((request) => request.subject.toLowerCase().includes(term));
        }
        // Apply sorting
        if (sortDirection) {
            results.sort((a, b) => {
                const dateA = new Date(a.created_at).getTime();
                const dateB = new Date(b.created_at).getTime();
                return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
            });
        }
        return results;
    }, [approvalRequests, searchTerm, sortDirection]);
    if (error) {
        throw error;
    }
    if (isLoading) {
        return (jsxRuntimeExports.jsx(LoadingContainer$1, { children: jsxRuntimeExports.jsx(Spinner, { size: "64" }) }));
    }
    return (jsxRuntimeExports.jsxs(Container$4, { children: [jsxRuntimeExports.jsx(XXL, { isBold: true, children: t("approval-requests.list.header", "Approval requests") }), jsxRuntimeExports.jsx(ApprovalRequestListFilters$1, { approvalRequestStatus: approvalRequestStatus, setApprovalRequestStatus: setApprovalRequestStatus, setSearchTerm: setSearchTerm }), approvalRequests.length === 0 ? (jsxRuntimeExports.jsx(NoApprovalRequestsText$1, {})) : (jsxRuntimeExports.jsx(ApprovalRequestListTable$1, { approvalRequests: sortedAndFilteredApprovalRequests, baseLocale: baseLocale, helpCenterPath: helpCenterPath, sortDirection: sortDirection, onSortChange: setSortDirection }))] }));
}
var ApprovalRequestListPage$1 = reactExports.memo(ApprovalRequestListPage);

function __variableDynamicImportRuntime1__$1(path) {
  switch (path) {
    case '../shared/translations/locales/af.json': return import('shared').then(function (n) { return n.aU; });
    case '../shared/translations/locales/ar-x-pseudo.json': return import('shared').then(function (n) { return n.aV; });
    case '../shared/translations/locales/ar.json': return import('shared').then(function (n) { return n.aW; });
    case '../shared/translations/locales/az.json': return import('shared').then(function (n) { return n.aX; });
    case '../shared/translations/locales/be.json': return import('shared').then(function (n) { return n.aY; });
    case '../shared/translations/locales/bg.json': return import('shared').then(function (n) { return n.aZ; });
    case '../shared/translations/locales/bn.json': return import('shared').then(function (n) { return n.a_; });
    case '../shared/translations/locales/bs.json': return import('shared').then(function (n) { return n.a$; });
    case '../shared/translations/locales/ca.json': return import('shared').then(function (n) { return n.b0; });
    case '../shared/translations/locales/cs.json': return import('shared').then(function (n) { return n.b1; });
    case '../shared/translations/locales/cy.json': return import('shared').then(function (n) { return n.b2; });
    case '../shared/translations/locales/da.json': return import('shared').then(function (n) { return n.b3; });
    case '../shared/translations/locales/de-de.json': return import('shared').then(function (n) { return n.b4; });
    case '../shared/translations/locales/de-x-informal.json': return import('shared').then(function (n) { return n.b5; });
    case '../shared/translations/locales/de.json': return import('shared').then(function (n) { return n.b6; });
    case '../shared/translations/locales/el.json': return import('shared').then(function (n) { return n.b7; });
    case '../shared/translations/locales/en-001.json': return import('shared').then(function (n) { return n.b8; });
    case '../shared/translations/locales/en-150.json': return import('shared').then(function (n) { return n.b9; });
    case '../shared/translations/locales/en-au.json': return import('shared').then(function (n) { return n.ba; });
    case '../shared/translations/locales/en-ca.json': return import('shared').then(function (n) { return n.bb; });
    case '../shared/translations/locales/en-gb.json': return import('shared').then(function (n) { return n.bc; });
    case '../shared/translations/locales/en-my.json': return import('shared').then(function (n) { return n.bd; });
    case '../shared/translations/locales/en-ph.json': return import('shared').then(function (n) { return n.be; });
    case '../shared/translations/locales/en-se.json': return import('shared').then(function (n) { return n.bf; });
    case '../shared/translations/locales/en-us.json': return import('shared').then(function (n) { return n.bg; });
    case '../shared/translations/locales/en-x-dev.json': return import('shared').then(function (n) { return n.bh; });
    case '../shared/translations/locales/en-x-keys.json': return import('shared').then(function (n) { return n.bi; });
    case '../shared/translations/locales/en-x-obsolete.json': return import('shared').then(function (n) { return n.bj; });
    case '../shared/translations/locales/en-x-pseudo.json': return import('shared').then(function (n) { return n.bk; });
    case '../shared/translations/locales/en-x-test.json': return import('shared').then(function (n) { return n.bl; });
    case '../shared/translations/locales/es-419.json': return import('shared').then(function (n) { return n.bm; });
    case '../shared/translations/locales/es-ar.json': return import('shared').then(function (n) { return n.bn; });
    case '../shared/translations/locales/es-cl.json': return import('shared').then(function (n) { return n.bo; });
    case '../shared/translations/locales/es-es.json': return import('shared').then(function (n) { return n.bp; });
    case '../shared/translations/locales/es-mx.json': return import('shared').then(function (n) { return n.bq; });
    case '../shared/translations/locales/es-pe.json': return import('shared').then(function (n) { return n.br; });
    case '../shared/translations/locales/es.json': return import('shared').then(function (n) { return n.bs; });
    case '../shared/translations/locales/et.json': return import('shared').then(function (n) { return n.bt; });
    case '../shared/translations/locales/eu.json': return import('shared').then(function (n) { return n.bu; });
    case '../shared/translations/locales/fa-af.json': return import('shared').then(function (n) { return n.bv; });
    case '../shared/translations/locales/fa.json': return import('shared').then(function (n) { return n.bw; });
    case '../shared/translations/locales/fi.json': return import('shared').then(function (n) { return n.bx; });
    case '../shared/translations/locales/fil.json': return import('shared').then(function (n) { return n.by; });
    case '../shared/translations/locales/fo.json': return import('shared').then(function (n) { return n.bz; });
    case '../shared/translations/locales/fr-ca.json': return import('shared').then(function (n) { return n.bA; });
    case '../shared/translations/locales/fr-dz.json': return import('shared').then(function (n) { return n.bB; });
    case '../shared/translations/locales/fr-mu.json': return import('shared').then(function (n) { return n.bC; });
    case '../shared/translations/locales/fr.json': return import('shared').then(function (n) { return n.bD; });
    case '../shared/translations/locales/ga.json': return import('shared').then(function (n) { return n.bE; });
    case '../shared/translations/locales/he.json': return import('shared').then(function (n) { return n.bF; });
    case '../shared/translations/locales/hi.json': return import('shared').then(function (n) { return n.bG; });
    case '../shared/translations/locales/hr.json': return import('shared').then(function (n) { return n.bH; });
    case '../shared/translations/locales/hu.json': return import('shared').then(function (n) { return n.bI; });
    case '../shared/translations/locales/hy.json': return import('shared').then(function (n) { return n.bJ; });
    case '../shared/translations/locales/id.json': return import('shared').then(function (n) { return n.bK; });
    case '../shared/translations/locales/is.json': return import('shared').then(function (n) { return n.bL; });
    case '../shared/translations/locales/it-ch.json': return import('shared').then(function (n) { return n.bM; });
    case '../shared/translations/locales/it.json': return import('shared').then(function (n) { return n.bN; });
    case '../shared/translations/locales/ja.json': return import('shared').then(function (n) { return n.bO; });
    case '../shared/translations/locales/ka.json': return import('shared').then(function (n) { return n.bP; });
    case '../shared/translations/locales/kk.json': return import('shared').then(function (n) { return n.bQ; });
    case '../shared/translations/locales/kl-dk.json': return import('shared').then(function (n) { return n.bR; });
    case '../shared/translations/locales/km.json': return import('shared').then(function (n) { return n.bS; });
    case '../shared/translations/locales/ko.json': return import('shared').then(function (n) { return n.bT; });
    case '../shared/translations/locales/ku.json': return import('shared').then(function (n) { return n.bU; });
    case '../shared/translations/locales/ky.json': return import('shared').then(function (n) { return n.bV; });
    case '../shared/translations/locales/lt.json': return import('shared').then(function (n) { return n.bW; });
    case '../shared/translations/locales/lv.json': return import('shared').then(function (n) { return n.bX; });
    case '../shared/translations/locales/mk.json': return import('shared').then(function (n) { return n.bY; });
    case '../shared/translations/locales/mn.json': return import('shared').then(function (n) { return n.bZ; });
    case '../shared/translations/locales/ms.json': return import('shared').then(function (n) { return n.b_; });
    case '../shared/translations/locales/mt.json': return import('shared').then(function (n) { return n.b$; });
    case '../shared/translations/locales/my.json': return import('shared').then(function (n) { return n.c0; });
    case '../shared/translations/locales/ne.json': return import('shared').then(function (n) { return n.c1; });
    case '../shared/translations/locales/nl-be.json': return import('shared').then(function (n) { return n.c2; });
    case '../shared/translations/locales/nl.json': return import('shared').then(function (n) { return n.c3; });
    case '../shared/translations/locales/no.json': return import('shared').then(function (n) { return n.c4; });
    case '../shared/translations/locales/pl.json': return import('shared').then(function (n) { return n.c5; });
    case '../shared/translations/locales/pt-br.json': return import('shared').then(function (n) { return n.c6; });
    case '../shared/translations/locales/pt.json': return import('shared').then(function (n) { return n.c7; });
    case '../shared/translations/locales/ro-md.json': return import('shared').then(function (n) { return n.c8; });
    case '../shared/translations/locales/ro.json': return import('shared').then(function (n) { return n.c9; });
    case '../shared/translations/locales/ru.json': return import('shared').then(function (n) { return n.ca; });
    case '../shared/translations/locales/si.json': return import('shared').then(function (n) { return n.cb; });
    case '../shared/translations/locales/sk.json': return import('shared').then(function (n) { return n.cc; });
    case '../shared/translations/locales/sl.json': return import('shared').then(function (n) { return n.cd; });
    case '../shared/translations/locales/sq.json': return import('shared').then(function (n) { return n.ce; });
    case '../shared/translations/locales/sr-me.json': return import('shared').then(function (n) { return n.cf; });
    case '../shared/translations/locales/sr.json': return import('shared').then(function (n) { return n.cg; });
    case '../shared/translations/locales/sv.json': return import('shared').then(function (n) { return n.ch; });
    case '../shared/translations/locales/sw-ke.json': return import('shared').then(function (n) { return n.ci; });
    case '../shared/translations/locales/ta.json': return import('shared').then(function (n) { return n.cj; });
    case '../shared/translations/locales/th.json': return import('shared').then(function (n) { return n.ck; });
    case '../shared/translations/locales/tr.json': return import('shared').then(function (n) { return n.cl; });
    case '../shared/translations/locales/uk.json': return import('shared').then(function (n) { return n.cm; });
    case '../shared/translations/locales/ur-pk.json': return import('shared').then(function (n) { return n.cn; });
    case '../shared/translations/locales/ur.json': return import('shared').then(function (n) { return n.co; });
    case '../shared/translations/locales/uz.json': return import('shared').then(function (n) { return n.cp; });
    case '../shared/translations/locales/vi.json': return import('shared').then(function (n) { return n.cq; });
    case '../shared/translations/locales/zh-cn.json': return import('shared').then(function (n) { return n.cr; });
    case '../shared/translations/locales/zh-tw.json': return import('shared').then(function (n) { return n.cs; });
    default: return new Promise(function(resolve, reject) {
      (typeof queueMicrotask === 'function' ? queueMicrotask : setTimeout)(
        reject.bind(null, new Error("Unknown variable dynamic import: " + path))
      );
    })
   }
 }

function __variableDynamicImportRuntime0__$1(path) {
  switch (path) {
    case './translations/locales/af.json': return import('approval-requests-translations').then(function (n) { return n.a; });
    case './translations/locales/ar-x-pseudo.json': return import('approval-requests-translations').then(function (n) { return n.b; });
    case './translations/locales/ar.json': return import('approval-requests-translations').then(function (n) { return n.c; });
    case './translations/locales/az.json': return import('approval-requests-translations').then(function (n) { return n.d; });
    case './translations/locales/be.json': return import('approval-requests-translations').then(function (n) { return n.e; });
    case './translations/locales/bg.json': return import('approval-requests-translations').then(function (n) { return n.f; });
    case './translations/locales/bn.json': return import('approval-requests-translations').then(function (n) { return n.g; });
    case './translations/locales/bs.json': return import('approval-requests-translations').then(function (n) { return n.h; });
    case './translations/locales/ca.json': return import('approval-requests-translations').then(function (n) { return n.i; });
    case './translations/locales/cs.json': return import('approval-requests-translations').then(function (n) { return n.j; });
    case './translations/locales/cy.json': return import('approval-requests-translations').then(function (n) { return n.k; });
    case './translations/locales/da.json': return import('approval-requests-translations').then(function (n) { return n.l; });
    case './translations/locales/de-de.json': return import('approval-requests-translations').then(function (n) { return n.m; });
    case './translations/locales/de-x-informal.json': return import('approval-requests-translations').then(function (n) { return n.n; });
    case './translations/locales/de.json': return import('approval-requests-translations').then(function (n) { return n.o; });
    case './translations/locales/el.json': return import('approval-requests-translations').then(function (n) { return n.p; });
    case './translations/locales/en-001.json': return import('approval-requests-translations').then(function (n) { return n.q; });
    case './translations/locales/en-150.json': return import('approval-requests-translations').then(function (n) { return n.r; });
    case './translations/locales/en-au.json': return import('approval-requests-translations').then(function (n) { return n.s; });
    case './translations/locales/en-ca.json': return import('approval-requests-translations').then(function (n) { return n.t; });
    case './translations/locales/en-gb.json': return import('approval-requests-translations').then(function (n) { return n.u; });
    case './translations/locales/en-my.json': return import('approval-requests-translations').then(function (n) { return n.v; });
    case './translations/locales/en-ph.json': return import('approval-requests-translations').then(function (n) { return n.w; });
    case './translations/locales/en-se.json': return import('approval-requests-translations').then(function (n) { return n.x; });
    case './translations/locales/en-us.json': return import('approval-requests-translations').then(function (n) { return n.y; });
    case './translations/locales/en-x-dev.json': return import('approval-requests-translations').then(function (n) { return n.z; });
    case './translations/locales/en-x-keys.json': return import('approval-requests-translations').then(function (n) { return n.A; });
    case './translations/locales/en-x-obsolete.json': return import('approval-requests-translations').then(function (n) { return n.B; });
    case './translations/locales/en-x-pseudo.json': return import('approval-requests-translations').then(function (n) { return n.C; });
    case './translations/locales/en-x-test.json': return import('approval-requests-translations').then(function (n) { return n.D; });
    case './translations/locales/es-419.json': return import('approval-requests-translations').then(function (n) { return n.E; });
    case './translations/locales/es-ar.json': return import('approval-requests-translations').then(function (n) { return n.F; });
    case './translations/locales/es-cl.json': return import('approval-requests-translations').then(function (n) { return n.G; });
    case './translations/locales/es-es.json': return import('approval-requests-translations').then(function (n) { return n.H; });
    case './translations/locales/es-mx.json': return import('approval-requests-translations').then(function (n) { return n.I; });
    case './translations/locales/es-pe.json': return import('approval-requests-translations').then(function (n) { return n.J; });
    case './translations/locales/es.json': return import('approval-requests-translations').then(function (n) { return n.K; });
    case './translations/locales/et.json': return import('approval-requests-translations').then(function (n) { return n.L; });
    case './translations/locales/eu.json': return import('approval-requests-translations').then(function (n) { return n.M; });
    case './translations/locales/fa-af.json': return import('approval-requests-translations').then(function (n) { return n.N; });
    case './translations/locales/fa.json': return import('approval-requests-translations').then(function (n) { return n.O; });
    case './translations/locales/fi.json': return import('approval-requests-translations').then(function (n) { return n.P; });
    case './translations/locales/fil.json': return import('approval-requests-translations').then(function (n) { return n.Q; });
    case './translations/locales/fo.json': return import('approval-requests-translations').then(function (n) { return n.R; });
    case './translations/locales/fr-ca.json': return import('approval-requests-translations').then(function (n) { return n.S; });
    case './translations/locales/fr-dz.json': return import('approval-requests-translations').then(function (n) { return n.T; });
    case './translations/locales/fr-mu.json': return import('approval-requests-translations').then(function (n) { return n.U; });
    case './translations/locales/fr.json': return import('approval-requests-translations').then(function (n) { return n.V; });
    case './translations/locales/ga.json': return import('approval-requests-translations').then(function (n) { return n.W; });
    case './translations/locales/he.json': return import('approval-requests-translations').then(function (n) { return n.X; });
    case './translations/locales/hi.json': return import('approval-requests-translations').then(function (n) { return n.Y; });
    case './translations/locales/hr.json': return import('approval-requests-translations').then(function (n) { return n.Z; });
    case './translations/locales/hu.json': return import('approval-requests-translations').then(function (n) { return n._; });
    case './translations/locales/hy.json': return import('approval-requests-translations').then(function (n) { return n.$; });
    case './translations/locales/id.json': return import('approval-requests-translations').then(function (n) { return n.a0; });
    case './translations/locales/is.json': return import('approval-requests-translations').then(function (n) { return n.a1; });
    case './translations/locales/it-ch.json': return import('approval-requests-translations').then(function (n) { return n.a2; });
    case './translations/locales/it.json': return import('approval-requests-translations').then(function (n) { return n.a3; });
    case './translations/locales/ja.json': return import('approval-requests-translations').then(function (n) { return n.a4; });
    case './translations/locales/ka.json': return import('approval-requests-translations').then(function (n) { return n.a5; });
    case './translations/locales/kk.json': return import('approval-requests-translations').then(function (n) { return n.a6; });
    case './translations/locales/kl-dk.json': return import('approval-requests-translations').then(function (n) { return n.a7; });
    case './translations/locales/km.json': return import('approval-requests-translations').then(function (n) { return n.a8; });
    case './translations/locales/ko.json': return import('approval-requests-translations').then(function (n) { return n.a9; });
    case './translations/locales/ku.json': return import('approval-requests-translations').then(function (n) { return n.aa; });
    case './translations/locales/ky.json': return import('approval-requests-translations').then(function (n) { return n.ab; });
    case './translations/locales/lt.json': return import('approval-requests-translations').then(function (n) { return n.ac; });
    case './translations/locales/lv.json': return import('approval-requests-translations').then(function (n) { return n.ad; });
    case './translations/locales/mk.json': return import('approval-requests-translations').then(function (n) { return n.ae; });
    case './translations/locales/mn.json': return import('approval-requests-translations').then(function (n) { return n.af; });
    case './translations/locales/ms.json': return import('approval-requests-translations').then(function (n) { return n.ag; });
    case './translations/locales/mt.json': return import('approval-requests-translations').then(function (n) { return n.ah; });
    case './translations/locales/my.json': return import('approval-requests-translations').then(function (n) { return n.ai; });
    case './translations/locales/ne.json': return import('approval-requests-translations').then(function (n) { return n.aj; });
    case './translations/locales/nl-be.json': return import('approval-requests-translations').then(function (n) { return n.ak; });
    case './translations/locales/nl.json': return import('approval-requests-translations').then(function (n) { return n.al; });
    case './translations/locales/no.json': return import('approval-requests-translations').then(function (n) { return n.am; });
    case './translations/locales/pl.json': return import('approval-requests-translations').then(function (n) { return n.an; });
    case './translations/locales/pt-br.json': return import('approval-requests-translations').then(function (n) { return n.ao; });
    case './translations/locales/pt.json': return import('approval-requests-translations').then(function (n) { return n.ap; });
    case './translations/locales/ro-md.json': return import('approval-requests-translations').then(function (n) { return n.aq; });
    case './translations/locales/ro.json': return import('approval-requests-translations').then(function (n) { return n.ar; });
    case './translations/locales/ru.json': return import('approval-requests-translations').then(function (n) { return n.as; });
    case './translations/locales/si.json': return import('approval-requests-translations').then(function (n) { return n.at; });
    case './translations/locales/sk.json': return import('approval-requests-translations').then(function (n) { return n.au; });
    case './translations/locales/sl.json': return import('approval-requests-translations').then(function (n) { return n.av; });
    case './translations/locales/sq.json': return import('approval-requests-translations').then(function (n) { return n.aw; });
    case './translations/locales/sr-me.json': return import('approval-requests-translations').then(function (n) { return n.ax; });
    case './translations/locales/sr.json': return import('approval-requests-translations').then(function (n) { return n.ay; });
    case './translations/locales/sv.json': return import('approval-requests-translations').then(function (n) { return n.az; });
    case './translations/locales/sw-ke.json': return import('approval-requests-translations').then(function (n) { return n.aA; });
    case './translations/locales/ta.json': return import('approval-requests-translations').then(function (n) { return n.aB; });
    case './translations/locales/th.json': return import('approval-requests-translations').then(function (n) { return n.aC; });
    case './translations/locales/tr.json': return import('approval-requests-translations').then(function (n) { return n.aD; });
    case './translations/locales/uk.json': return import('approval-requests-translations').then(function (n) { return n.aE; });
    case './translations/locales/ur-pk.json': return import('approval-requests-translations').then(function (n) { return n.aF; });
    case './translations/locales/ur.json': return import('approval-requests-translations').then(function (n) { return n.aG; });
    case './translations/locales/uz.json': return import('approval-requests-translations').then(function (n) { return n.aH; });
    case './translations/locales/vi.json': return import('approval-requests-translations').then(function (n) { return n.aI; });
    case './translations/locales/zh-cn.json': return import('approval-requests-translations').then(function (n) { return n.aJ; });
    case './translations/locales/zh-tw.json': return import('approval-requests-translations').then(function (n) { return n.aK; });
    default: return new Promise(function(resolve, reject) {
      (typeof queueMicrotask === 'function' ? queueMicrotask : setTimeout)(
        reject.bind(null, new Error("Unknown variable dynamic import: " + path))
      );
    })
   }
 }
async function renderApprovalRequestList(container, settings, props, helpCenterPath) {
    const { baseLocale } = props;
    initI18next(baseLocale);
    await loadTranslations(baseLocale, [
        () => __variableDynamicImportRuntime0__$1(`./translations/locales/${baseLocale}.json`),
        () => __variableDynamicImportRuntime1__$1(`../shared/translations/locales/${baseLocale}.json`),
    ]);
    reactDomExports.render(jsxRuntimeExports.jsx(ThemeProviders, { theme: createTheme(settings), children: jsxRuntimeExports.jsx(ErrorBoundary, { helpCenterPath: helpCenterPath, children: jsxRuntimeExports.jsx(ApprovalRequestListPage$1, { ...props, helpCenterPath: helpCenterPath }) }) }), container);
}

const Container$3 = styled.div `
  border-top: ${({ theme }) => `1px solid ${getColor({ theme, hue: "grey", shade: 300 })}`};
  display: flex;
  flex-direction: column;
  padding-top: ${(props) => props.theme.space.base * 4}px; /* 16px */
`;
const PreviousDecisionTitle = styled(MD) `
  margin-bottom: ${(props) => props.theme.space.xxs}; /* 4px */
`;
const FieldLabel$2 = styled(MD) `
  color: ${({ theme }) => getColor({ theme, hue: "grey", shade: 600 })};
`;
function getPreviousDecisionFallbackLabel(status) {
    switch (status) {
        case APPROVAL_REQUEST_STATES.APPROVED:
            return "Approved";
        case APPROVAL_REQUEST_STATES.REJECTED:
            return "Rejected";
        default:
            return status;
    }
}
function ApprovalRequestPreviousDecision({ decision, baseLocale, }) {
    const { t } = useTranslation();
    return (jsxRuntimeExports.jsxs(Container$3, { children: [jsxRuntimeExports.jsx(PreviousDecisionTitle, { children: t("approval-requests.request.approval-request-details.previous-decision", "Previous decision") }), jsxRuntimeExports.jsxs(FieldLabel$2, { children: [t(`approval-requests.request.approval-request-details.${decision.status.toLowerCase()}`, getPreviousDecisionFallbackLabel(decision.status)), " ", formatApprovalRequestDate(decision.decided_at ?? "", baseLocale)] }), decision.decision_notes && (
            // eslint-disable-next-line @shopify/jsx-no-hardcoded-content
            jsxRuntimeExports.jsx(FieldLabel$2, { children: `"${decision.decision_notes}"` }))] }));
}
var ApprovalRequestPreviousDecision$1 = reactExports.memo(ApprovalRequestPreviousDecision);

function getDecisionOriginLabel(originationType, date, t) {
    if (originationType === APPROVAL_DECISION_ORIGINATIONS.SLACK) {
        return t("approval-requests.request.approval-request-details.via-slack", "{{date}} via Slack", { date });
    }
    if (originationType === APPROVAL_DECISION_ORIGINATIONS.UI) {
        return t("approval-requests.request.approval-request-details.via-zendesk", "{{date}} via Zendesk", { date });
    }
    return "";
}

const Container$2 = styled(Grid) `
  padding: ${(props) => props.theme.space.base * 6}px; /* 24px */
  margin-left: 0;
  background: ${({ theme }) => getColor({ theme, variable: "background.default" })};
  border-radius: ${(props) => props.theme.borderRadii.md}; /* 4px */
  max-width: 296px;

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    max-width: 100%;
  }
`;
const ApprovalRequestHeader = styled(MD) `
  margin-bottom: ${(props) => props.theme.space.base * 4}px; /* 16px */
`;
const WrappedText = styled(MD) `
  white-space: normal;
  overflow-wrap: break-word;
`;
const FieldLabel$1 = styled(MD) `
  color: ${({ theme }) => getColor({ theme, hue: "grey", shade: 600 })};
`;
const DetailRow = styled(Grid.Row) `
  margin-bottom: ${(props) => props.theme.space.sm}; /* 12px */

  &:last-child {
    margin-bottom: 0;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    flex-direction: column; /* stack columns vertically */

    > div {
      width: 100% !important; /* full width for each Col */
      max-width: 100% !important;
      flex: none !important;
      margin-bottom: ${(props) => props.theme.space.xxs}; /* 4px */
    }

    > div:last-child {
      margin-bottom: 0;
    }
  }
`;
function ApprovalRequestDetails({ approvalRequest, baseLocale, }) {
    const { t } = useTranslation();
    const shouldShowApprovalRequestComment = approvalRequest.status === APPROVAL_REQUEST_STATES.WITHDRAWN
        ? Boolean(approvalRequest.withdrawn_reason)
        : approvalRequest.decisions.length > 0;
    const shouldShowPreviousDecision = approvalRequest.status === APPROVAL_REQUEST_STATES.WITHDRAWN &&
        approvalRequest.decisions.length > 0;
    const formattedDecidedAt = approvalRequest.decided_at
        ? formatApprovalRequestDate(approvalRequest.decided_at, baseLocale)
        : "";
    // The `origination_type` field on decisions is only present when arturo `approvals_slack_notifications` is enabled
    const decisionOriginLabel = approvalRequest.status !== APPROVAL_REQUEST_STATES.WITHDRAWN
        ? getDecisionOriginLabel(approvalRequest.decisions[0]?.origination_type, formattedDecidedAt, t)
        : "";
    return (jsxRuntimeExports.jsxs(Container$2, { children: [jsxRuntimeExports.jsx(ApprovalRequestHeader, { isBold: true, children: t("approval-requests.request.approval-request-details.header", "Approval request details") }), jsxRuntimeExports.jsxs(DetailRow, { children: [jsxRuntimeExports.jsx(Grid.Col, { size: 4, children: jsxRuntimeExports.jsx(FieldLabel$1, { children: t("approval-requests.request.approval-request-details.sent-by", "Sent by") }) }), jsxRuntimeExports.jsx(Grid.Col, { size: 8, children: jsxRuntimeExports.jsx(WrappedText, { children: getSentByLabel(approvalRequest, t) }) })] }), jsxRuntimeExports.jsxs(DetailRow, { children: [jsxRuntimeExports.jsx(Grid.Col, { size: 4, children: jsxRuntimeExports.jsx(FieldLabel$1, { children: t("approval-requests.request.approval-request-details.sent-on", "Sent on") }) }), jsxRuntimeExports.jsx(Grid.Col, { size: 8, children: jsxRuntimeExports.jsx(MD, { children: formatApprovalRequestDate(approvalRequest.created_at, baseLocale) }) })] }), jsxRuntimeExports.jsxs(DetailRow, { children: [jsxRuntimeExports.jsx(Grid.Col, { size: 4, children: jsxRuntimeExports.jsx(FieldLabel$1, { children: t("approval-requests.request.approval-request-details.approver", "Approver") }) }), jsxRuntimeExports.jsx(Grid.Col, { size: 8, children: jsxRuntimeExports.jsx(WrappedText, { children: approvalRequest.assignee_user.name }) })] }), jsxRuntimeExports.jsxs(DetailRow, { children: [jsxRuntimeExports.jsx(Grid.Col, { size: 4, children: jsxRuntimeExports.jsx(FieldLabel$1, { children: t("approval-requests.request.approval-request-details.status", "Status") }) }), jsxRuntimeExports.jsx(Grid.Col, { size: 8, children: jsxRuntimeExports.jsx(MD, { children: jsxRuntimeExports.jsx(ApprovalStatusTag$1, { status: approvalRequest.status }) }) })] }), shouldShowApprovalRequestComment && (jsxRuntimeExports.jsxs(DetailRow, { children: [jsxRuntimeExports.jsx(Grid.Col, { size: 4, children: jsxRuntimeExports.jsx(FieldLabel$1, { children: t("approval-requests.request.approval-request-details.comment_v2", "Reason") }) }), jsxRuntimeExports.jsx(Grid.Col, { size: 8, children: jsxRuntimeExports.jsx(WrappedText, { children: approvalRequest.status === APPROVAL_REQUEST_STATES.WITHDRAWN
                                ? approvalRequest.withdrawn_reason
                                : approvalRequest.decisions[0]?.decision_notes ?? "-" }) })] })), approvalRequest.decided_at && (jsxRuntimeExports.jsxs(DetailRow, { children: [jsxRuntimeExports.jsx(Grid.Col, { size: 4, children: jsxRuntimeExports.jsx(FieldLabel$1, { children: t(approvalRequest.status === APPROVAL_REQUEST_STATES.WITHDRAWN
                                ? "approval-requests.request.approval-request-details.withdrawn-on"
                                : "approval-requests.request.approval-request-details.decided", approvalRequest.status === APPROVAL_REQUEST_STATES.WITHDRAWN
                                ? "Withdrawn on"
                                : "Decided") }) }), jsxRuntimeExports.jsx(Grid.Col, { size: 8, children: jsxRuntimeExports.jsx(WrappedText, { children: decisionOriginLabel || formattedDecidedAt }) })] })), shouldShowPreviousDecision && approvalRequest.decisions[0] && (jsxRuntimeExports.jsx(ApprovalRequestPreviousDecision$1, { decision: approvalRequest.decisions[0], baseLocale: baseLocale }))] }));
}
var ApprovalRequestDetails$1 = reactExports.memo(ApprovalRequestDetails);

const TicketContainer = styled(Grid) `
  padding: ${(props) => props.theme.space.md}; /* 20px */
  border: ${(props) => props.theme.borders.sm}
    ${({ theme }) => getColor({ theme, hue: "grey", shade: 300 })};
  border-radius: ${(props) => props.theme.borderRadii.md}; /* 4px */
`;
const TicketDetailsHeader = styled(MD) `
  margin-bottom: ${(props) => props.theme.space.md}; /* 20px */
`;
const FieldLabel = styled(MD) `
  color: ${({ theme }) => getColor({ theme, hue: "grey", shade: 600 })};
`;
const MultiselectTag = styled(Tag) `
  margin-inline-end: ${(props) => props.theme.space.xxs}; /* 4px */
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
    const { t } = useTranslation();
    if (Array.isArray(value) && value.length > 0) {
        return (jsxRuntimeExports.jsx(MD, { children: value.map((val) => (jsxRuntimeExports.jsx(MultiselectTag, { hue: "grey", children: val }, val))) }));
    }
    if (typeof value === "boolean") {
        return (jsxRuntimeExports.jsx(MD, { children: value
                ? t("approval-requests.request.ticket-details.checkbox-value.yes", "Yes")
                : t("approval-requests.request.ticket-details.checkbox-value.no", "No") }));
    }
    if (!value || (Array.isArray(value) && value.length === 0)) {
        return jsxRuntimeExports.jsx(MD, { children: NULL_VALUE_PLACEHOLDER });
    }
    return jsxRuntimeExports.jsx(MD, { children: value });
}
const TicketPriorityKeys = {
    Low: "approval-requests.request.ticket-details.priority_low",
    Normal: "approval-requests.request.ticket-details.priority_normal",
    High: "approval-requests.request.ticket-details.priority_high",
    Urgent: "approval-requests.request.ticket-details.priority_urgent",
};
function ApprovalTicketDetails({ ticket }) {
    const { t } = useTranslation();
    const displayPriority = TicketPriorityKeys[ticket.priority]
        ? t(TicketPriorityKeys[ticket.priority], ticket.priority)
        : ticket.priority;
    return (jsxRuntimeExports.jsxs(TicketContainer, { children: [jsxRuntimeExports.jsx(TicketDetailsHeader, { isBold: true, children: t("approval-requests.request.ticket-details.header", "Ticket details") }), jsxRuntimeExports.jsxs(CustomFieldsGrid, { children: [jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx(FieldLabel, { children: t("approval-requests.request.ticket-details.requester", "Requester") }), jsxRuntimeExports.jsx(MD, { children: ticket.requester.name })] }), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx(FieldLabel, { children: t("approval-requests.request.ticket-details.id", "ID") }), jsxRuntimeExports.jsx(MD, { children: ticket.id })] }), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx(FieldLabel, { children: t("approval-requests.request.ticket-details.priority", "Priority") }), jsxRuntimeExports.jsx(MD, { children: displayPriority })] }), ticket.custom_fields.map((field) => (jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx(FieldLabel, { children: field.title_in_portal }), jsxRuntimeExports.jsx(CustomFieldValue, { value: field.value })] }, String(field.id))))] })] }));
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
  margin-inline-start: ${(props) => props.hasAvatar ? "55px" : "0"}; // avatar width + margin + border

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    flex-direction: ${(props) => props.isSubmitButton ? "row-reverse" : "column"};
    gap: ${(props) => props.theme.space.base * 4}px; /* 16px */
  }
`;
const CommentSection = styled.div `
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.space.lg}; /* 32px */

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    gap: ${(props) => props.theme.space.base * 4}px; /* 16px */
  }
`;
const TextAreaContainer = styled.div `
  display: flex;
  gap: ${(props) => props.theme.space.base * 4}px; /* 16px */
  margin-top: ${(props) => props.theme.space.base * 6}px; /* 24px */
  align-items: flex-start;
`;
const TextAreaAndMessage = styled.div `
  display: flex;
  flex-direction: column;
  flex: 1;
`;
function ApproverActions({ approvalRequestId, approvalWorkflowInstanceId, setApprovalRequest, assigneeUser, }) {
    const { t } = useTranslation();
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
                ? APPROVAL_REQUEST_STATES.APPROVED
                : APPROVAL_REQUEST_STATES.REJECTED;
            const response = await submitApprovalDecision(approvalWorkflowInstanceId, approvalRequestId, decision, comment);
            if (response.ok) {
                const data = await response.json();
                setApprovalRequest(data.approval_request);
                const notificationTitle = decision === APPROVAL_REQUEST_STATES.APPROVED
                    ? t("approval-requests.request.notification.approval-submitted", "Approval submitted")
                    : t("approval-requests.request.notification.denial-submitted", "Denial submitted");
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
            ? t("approval-requests.request.approver-actions.additional-note-label", "Additional note")
            : t("approval-requests.request.approver-actions.denial-reason-label", "Reason for denial* (Required)");
        const shouldShowAvatar = Boolean(assigneeUser?.photo?.content_url);
        return (jsxRuntimeExports.jsxs(CommentSection, { children: [jsxRuntimeExports.jsxs(Field$1, { children: [jsxRuntimeExports.jsx(Field$1.Label, { children: fieldLabel }), jsxRuntimeExports.jsxs(TextAreaContainer, { children: [shouldShowAvatar && (jsxRuntimeExports.jsx(Avatar, { children: jsxRuntimeExports.jsx("img", { alt: "Assignee avatar", src: assigneeUser.photo.content_url ?? undefined }) })), jsxRuntimeExports.jsxs(TextAreaAndMessage, { children: [jsxRuntimeExports.jsx(Textarea, { minRows: 5, value: comment, onChange: handleInputValueChange, disabled: isSubmitting, validation: shouldShowValidationError ? "error" : undefined }), shouldShowValidationError && (jsxRuntimeExports.jsx(Field$1.Message, { validation: "error", children: t("approval-requests.request.approver-actions.denial-reason-validation", "Enter a reason for denial") }))] })] })] }), jsxRuntimeExports.jsxs(ButtonContainer, { hasAvatar: shouldShowAvatar, isSubmitButton: true, children: [jsxRuntimeExports.jsx(Button, { isPrimary: true, onClick: handleSubmitDecisionClick, disabled: isSubmitting, children: pendingStatus === PENDING_APPROVAL_STATUS.APPROVED
                                ? t("approval-requests.request.approver-actions.submit-approval", "Submit approval")
                                : t("approval-requests.request.approver-actions.submit-denial", "Submit denial") }), jsxRuntimeExports.jsx(Button, { onClick: handleCancelClick, disabled: isSubmitting, children: t("approval-requests.request.approver-actions.cancel", "Cancel") })] })] }));
    }
    return (jsxRuntimeExports.jsxs(ButtonContainer, { children: [jsxRuntimeExports.jsx(Button, { isPrimary: true, onClick: handleApproveRequestClick, children: t("approval-requests.request.approver-actions.approve-request", "Approve request") }), jsxRuntimeExports.jsx(Button, { onClick: handleDenyRequestClick, children: t("approval-requests.request.approver-actions.deny-request", "Deny request") })] }));
}
var ApproverActions$1 = reactExports.memo(ApproverActions);

function useApprovalRequest({ approvalWorkflowInstanceId, approvalRequestId, enablePolling, }) {
    const [approvalRequest, setApprovalRequest] = reactExports.useState();
    const [error, setError] = reactExports.useState(null);
    const [isLoading, setIsLoading] = reactExports.useState(false);
    const isInitialLoad = reactExports.useRef(true);
    const isTerminalStatus = !!approvalRequest?.status &&
        (approvalRequest?.status === "withdrawn" ||
            approvalRequest?.status === "approved" ||
            approvalRequest?.status === "rejected");
    const shouldPoll = enablePolling && !isTerminalStatus;
    const fetchApprovalRequest = reactExports.useCallback(async () => {
        if (isInitialLoad.current) {
            setIsLoading(true);
        }
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
            if (isInitialLoad.current) {
                setIsLoading(false);
                isInitialLoad.current = false;
            }
        }
    }, [approvalRequestId, approvalWorkflowInstanceId]);
    reactExports.useEffect(() => {
        fetchApprovalRequest();
    }, [approvalRequestId, approvalWorkflowInstanceId]);
    reactExports.useEffect(() => {
        if (shouldPoll) {
            const intervalId = setInterval(() => {
                fetchApprovalRequest();
            }, 10000);
            return () => {
                clearInterval(intervalId);
            };
        }
        return;
    }, [fetchApprovalRequest, shouldPoll]);
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
    color: ${({ theme }) => getColor({ theme, hue: "blue", shade: 600 })};
  }
`;
function ApprovalRequestBreadcrumbs({ organizations, helpCenterPath, }) {
    const { t } = useTranslation();
    const defaultOrganizationName = organizations.length > 0 ? organizations[0]?.name : null;
    if (defaultOrganizationName) {
        return (jsxRuntimeExports.jsxs(StyledBreadcrumb, { children: [jsxRuntimeExports.jsx(BreadcrumbAnchor, { href: helpCenterPath, children: defaultOrganizationName }), jsxRuntimeExports.jsx(BreadcrumbAnchor, { href: `${helpCenterPath}/approval_requests`, children: t("approval-requests.list.header", "Approval requests") })] }));
    }
    return (jsxRuntimeExports.jsx(StyledBreadcrumb, { children: jsxRuntimeExports.jsx(BreadcrumbAnchor, { href: `${helpCenterPath}/approval_requests`, children: t("approval-requests.list.header", "Approval requests") }) }));
}
var ApprovalRequestBreadcrumbs$1 = reactExports.memo(ApprovalRequestBreadcrumbs);

const useGetClarificationCopy = () => {
    const { t } = useTranslation();
    return {
        title: t("txt.approval_requests.clarification.title", "Comments"),
        description: t("txt.approval_requests.clarification.description", "Add notes or ask for additional information about this request"),
        comment_form_aria_label: t("txt.approval_requests.clarification.comment_form_aria_label", "Enter a comment to ask for additional information about this approval request"),
        submit_button: t("txt.approval_requests.clarification.submit_button", "Send"),
        cancel_button: t("txt.approval_requests.clarification.cancel_button", "Cancel"),
        validation_empty_input: t("txt.approval_requests.clarification.validation_empty_comment_error", "Enter a comment"),
    };
};

const MAX_COMMENTS = 40;
const NEAR_COMMENTS_LIMIT_THRESHOLD = 5;
const MAX_CHAR_COUNT = 500;
const WARNING_THRESHOLD = 10;
const DEFAULT_AVATAR_URL = "https://secure.gravatar.com/avatar/6d713fed56e4dd3e48f6b824b8789d7f?default=https%3A%2F%2Fassets.zendesk.com%2Fhc%2Fassets%2Fdefault_avatar.png&r=g";

const useCommentForm = ({ onSubmit, baseLocale, markAllCommentsAsRead, approvalRequestId, }) => {
    const textareaRef = reactExports.useRef(null);
    const buttonsContainerRef = reactExports.useRef(null);
    const [comment, setComment] = reactExports.useState("");
    const [commentValidation, setCommentValidation] = reactExports.useState();
    const [isInputFocused, setIsInputFocused] = reactExports.useState(false);
    const [charLimitMessage, setCharLimitMessage] = reactExports.useState("");
    const { t } = useTranslation();
    const validateComment = (value) => {
        const isValid = value.trim().length > 0;
        return isValid;
    };
    const handleCancel = () => {
        setComment("");
        setCommentValidation(undefined);
        setCharLimitMessage("");
        setIsInputFocused(false);
        // Blur textarea to remove focus; state update alone doesn’t blur DOM element.
        textareaRef.current?.blur();
    };
    const handleBlur = (e) => {
        // Ignore blur if focus is moving to the buttons to keep validation UI visible,
        // especially when the user submits an empty comment.
        const relatedTarget = e?.relatedTarget;
        if (relatedTarget &&
            (buttonsContainerRef.current?.contains(relatedTarget) ?? false)) {
            return;
        }
        setIsInputFocused(false);
    };
    const handleFocus = () => {
        setIsInputFocused(true);
    };
    const handleSubmit = reactExports.useCallback(async () => {
        const isValid = validateComment(comment);
        if (isValid) {
            try {
                await onSubmit(approvalRequestId, comment);
                markAllCommentsAsRead();
                // clear form
                handleCancel();
                return true;
            }
            catch (error) {
                console.error(error);
                return false;
            }
        }
        else {
            setCommentValidation("error");
            textareaRef.current?.focus();
            return false;
        }
    }, [comment, markAllCommentsAsRead, onSubmit]);
    const handleKeyDown = reactExports.useCallback(async (e) => {
        const allowedKeys = [
            "Backspace",
            "Delete",
            "ArrowLeft",
            "ArrowRight",
            "ArrowUp",
            "ArrowDown",
            "Tab",
            "Enter",
            "Escape",
            "Home",
            "End",
        ];
        const isCopyShortcut = (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "c";
        const isSelectAllShortcut = (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "a";
        const isCutShortcut = (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "x";
        const isUndoShortcut = (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "z";
        // Block input beyond max char count and allowed certain keys and shortcuts
        if (comment.length >= MAX_CHAR_COUNT &&
            !allowedKeys.includes(e.key) &&
            !isCopyShortcut &&
            !isSelectAllShortcut &&
            !isCutShortcut &&
            !isUndoShortcut) {
            e.preventDefault();
            return;
        }
        if (e.key === "Enter" && e.shiftKey === false) {
            e.preventDefault();
            await handleSubmit();
        }
        else if (e.key === "Escape") {
            e.preventDefault();
            handleCancel();
        }
    }, [comment.length, handleSubmit]);
    const handleChange = reactExports.useCallback((e) => {
        let input = e.target.value;
        // Only update state if input length is within max limit
        if (input.length > MAX_CHAR_COUNT) {
            input = input.substring(0, MAX_CHAR_COUNT);
        }
        setComment(input);
        setIsInputFocused(true);
        const charsLeft = MAX_CHAR_COUNT - input.length;
        if (charsLeft >= 0 && charsLeft <= WARNING_THRESHOLD) {
            const pluralRules = new Intl.PluralRules(baseLocale);
            const plural = pluralRules.select(charsLeft);
            setCommentValidation("warning");
            setCharLimitMessage(t(`txt.approval_requests.validation.characters_remaining.${plural}`, {
                numCharacters: charsLeft,
                defaultValue: `${charsLeft} character${plural === "one" ? "" : "s"} remaining`,
            }));
        }
        else if (commentValidation === "warning") {
            // Clear warning if no longer near limit and warning was previously shown
            setCommentValidation(undefined);
            setCharLimitMessage("");
        }
        // Clear error if user starts typing valid input after error was shown
        if (commentValidation === "error" && input.trim().length > 0) {
            setCommentValidation(undefined);
        }
    }, [baseLocale, commentValidation, t]);
    return {
        textareaRef,
        buttonsContainerRef,
        charLimitMessage,
        comment,
        commentValidation,
        isInputFocused,
        setComment,
        handleBlur,
        handleCancel,
        handleChange,
        handleFocus,
        handleKeyDown,
        handleSubmit,
    };
};

const useSubmitComment = () => {
    const [isLoading, setIsLoading] = reactExports.useState(false);
    const submitComment = async (approvalRequestId, comment) => {
        setIsLoading(true);
        try {
            const currentUserRequest = await fetch("/api/v2/users/me.json");
            if (!currentUserRequest.ok) {
                throw new Error("Error fetching current user data");
            }
            const currentUser = await currentUserRequest.json();
            const response = await fetch(`/api/v2/approval_clarification_flow_messages`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-Token": currentUser.user.authenticity_token,
                },
                body: JSON.stringify({
                    approval_request_id: approvalRequestId,
                    message: comment,
                }),
            });
            if (!response.ok) {
                throw new Error(`Failed to submit comment: ${response.status}`);
            }
            const data = await response.json();
            return { success: true, data: data.clarification_flow_messages };
        }
        finally {
            setIsLoading(false);
        }
    };
    return { submitComment, isLoading };
};

const FormContainer = styled(Grid) `
  margin-top: ${({ theme }) => theme.space.xs};
  padding-top: ${({ theme }) => theme.space.md};
`;
const AvatarCol$1 = styled(Col) `
  max-width: 55px;
`;
const ButtonsRow = styled(Row) `
  margin-top: 10px;
  margin-left: 55px;
`;
const CancelButton = styled(Button) `
  margin: 10px;
`;
function ClarificationCommentForm({ baseLocale, currentUserAvatarUrl, currentUserName, markAllCommentsAsRead, approvalRequestId, onUpdatedComments, }) {
    const { comment_form_aria_label, submit_button, cancel_button, validation_empty_input, } = useGetClarificationCopy();
    const { submitComment, isLoading = false } = useSubmitComment();
    const handleSubmitComment = async (approvalRequestId, comment) => {
        const result = await submitComment(approvalRequestId, comment);
        if (result.success && result.data) {
            onUpdatedComments(result.data);
        }
    };
    const { buttonsContainerRef, comment, commentValidation, charLimitMessage, handleBlur, handleCancel, handleFocus, handleKeyDown, handleSubmit, handleChange, isInputFocused, textareaRef, } = useCommentForm({
        onSubmit: handleSubmitComment,
        baseLocale,
        markAllCommentsAsRead,
        approvalRequestId,
    });
    return (jsxRuntimeExports.jsxs(FormContainer, { gutters: false, children: [jsxRuntimeExports.jsxs(Row, { children: [jsxRuntimeExports.jsx(AvatarCol$1, { children: jsxRuntimeExports.jsx(Avatar, { size: "small", children: jsxRuntimeExports.jsx("img", { alt: currentUserName, src: currentUserAvatarUrl ? currentUserAvatarUrl : DEFAULT_AVATAR_URL }) }) }), jsxRuntimeExports.jsx(Col, { children: jsxRuntimeExports.jsxs(Field$1, { children: [jsxRuntimeExports.jsx(Label$1, { hidden: true, children: comment_form_aria_label }), jsxRuntimeExports.jsx(Textarea, { ref: textareaRef, validation: commentValidation, minRows: isInputFocused || comment.trim().length > 0 ? 4 : 1, maxRows: 4, value: comment, onChange: handleChange, onKeyDown: handleKeyDown, onBlur: handleBlur, onFocus: handleFocus }), jsxRuntimeExports.jsx(Message, { validation: commentValidation, children: commentValidation === "error"
                                        ? validation_empty_input
                                        : commentValidation === "warning"
                                            ? charLimitMessage
                                            : null })] }) })] }), (isInputFocused || comment.trim().length > 0) && (jsxRuntimeExports.jsx(ButtonsRow, { ref: buttonsContainerRef, children: jsxRuntimeExports.jsxs(Col, { textAlign: "start", children: [jsxRuntimeExports.jsx(Button, { disabled: isLoading, onClick: handleSubmit, children: submit_button }), jsxRuntimeExports.jsx(CancelButton, { disabled: isLoading, onClick: handleCancel, isBasic: true, children: cancel_button })] }) }))] }));
}

const buildCommentEntityKey = (approvalRequestId, comment) => {
    return `zenGuide:approvalRequest:${approvalRequestId}:comment:${comment.id}`;
};

function useGetUnreadComments({ comments, currentUserId, approvalRequestId, }) {
    const storage = window.localStorage;
    const localStorageKey = `readComments:${currentUserId}:${approvalRequestId}`;
    const getLocalReadStates = reactExports.useCallback(() => {
        try {
            const stored = storage.getItem(localStorageKey);
            return stored ? JSON.parse(stored) : {};
        }
        catch {
            return {};
        }
    }, [localStorageKey, storage]);
    const setLocalReadStates = reactExports.useCallback((states) => {
        try {
            storage.setItem(localStorageKey, JSON.stringify(states));
        }
        catch {
            // Ignore storage errors
        }
    }, [localStorageKey, storage]);
    const [localReadStates, setLocalReadStatesState] = reactExports.useState(() => getLocalReadStates());
    // Re-sync local read states when approvalRequestId changes
    reactExports.useEffect(() => {
        setLocalReadStatesState(getLocalReadStates());
    }, [approvalRequestId, getLocalReadStates]);
    const markCommentAsVisible = (commentKey) => {
        const currentStates = { ...localReadStates };
        if (!currentStates[commentKey]?.visible) {
            currentStates[commentKey] = {
                ...currentStates[commentKey],
                visible: true,
                read: currentStates[commentKey]?.read ?? false,
            };
            setLocalReadStates(currentStates);
            setLocalReadStatesState(currentStates);
        }
    };
    const markAllCommentsAsRead = reactExports.useCallback(() => {
        setLocalReadStatesState((prev) => {
            const newStates = { ...prev };
            Object.keys(newStates).forEach((key) => {
                if (newStates[key]?.visible) {
                    newStates[key] = {
                        ...newStates[key],
                        read: true,
                    };
                }
            });
            setLocalReadStates(newStates);
            return newStates;
        });
    }, [setLocalReadStates]);
    // Compute unread comments filtering out current user's comments
    const { unreadComments, firstUnreadCommentKey } = reactExports.useMemo(() => {
        const filtered = comments.filter((comment) => String(comment.author.id) !== String(currentUserId));
        const unread = filtered.filter((comment) => {
            const key = buildCommentEntityKey(approvalRequestId, comment);
            const state = localReadStates[key];
            return !state?.read;
        });
        const firstUnreadKey = unread[0]
            ? buildCommentEntityKey(approvalRequestId, unread[0])
            : null;
        return { unreadComments: unread, firstUnreadCommentKey: firstUnreadKey };
    }, [comments, localReadStates, currentUserId, approvalRequestId]);
    return {
        firstUnreadCommentKey,
        markCommentAsVisible,
        markAllCommentsAsRead,
        unreadComments,
    };
}

const StyledNewCommentIndicator = styled.div `
  align-items: center;
  color: ${({ theme }) => getColor({ theme, hue: "red", shade: 600 })};
  display: flex;
  font-size: ${({ theme }) => theme.fontSizes.md};
  text-align: center;
  padding-top: ${({ theme }) => theme.space.sm};
  padding-bottom: ${({ theme }) => theme.space.xxs};

  &:before,
  &:after {
    content: "";
    flex: 1;
    border-bottom: 1px solid
      ${(props) => getColor({ theme: props.theme, hue: "red", shade: 600 })};
  }

  &:before {
    margin-right: 16px;
  }

  &:after {
    margin-left: 16px;
  }
`;
function NewCommentIndicator({ unreadCount }) {
    const { t } = useTranslation();
    return (jsxRuntimeExports.jsx(StyledNewCommentIndicator, { children: unreadCount === 1
            ? t("txt.approval_requests.clarification.new_comment_indicator", "New comment")
            : t("txt.approval_requests.clarification.new_comments_indicator", "New comments") }));
}

const observedElements = new Map();
let observer = null;
const getObserver = () => {
    if (observer)
        return observer;
    observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const elementCallback = observedElements.get(entry.target);
                if (elementCallback) {
                    elementCallback();
                    observer?.unobserve(entry.target);
                    observedElements.delete(entry.target);
                }
            }
        });
    }, { threshold: 1.0 });
    return observer;
};
const useIntersectionObserver = (ref, markCommentAsVisible) => {
    const observe = reactExports.useCallback(() => {
        const element = ref.current;
        if (!element)
            return;
        const ob = getObserver();
        observedElements.set(element, markCommentAsVisible);
        ob.observe(element);
    }, [ref, markCommentAsVisible]);
    const unobserve = reactExports.useCallback(() => {
        const element = ref.current;
        if (!element || !observer)
            return;
        observer.unobserve(element);
        observedElements.delete(element);
    }, [ref]);
    reactExports.useEffect(() => {
        observe();
        return () => unobserve();
    }, [observe, unobserve]);
};

const StyledTimestamp = styled(SM) `
  color: ${({ theme }) => getColor({ theme, hue: "grey", shade: 600 })};
  align-self: center;
  justify-content: center;
  padding-top: 1px;
`;
const isSameDay = (date1, date2) => isSameDay$1(date1, date2);
const isYesterday = (date, now) => {
    const yesterday = subDays(now, 1);
    return isSameDay$1(date, yesterday);
};
function detectHour12(locale) {
    const dtf = new Intl.DateTimeFormat(locale, { hour: "numeric" });
    const options = dtf.resolvedOptions();
    return options.hour12 ?? true;
}
const formatDate = (date, locale) => date.toLocaleDateString(locale, { month: "short", day: "2-digit" });
const formatDateWithYear = (date, locale) => date.toLocaleDateString(locale, {
    month: "short",
    day: "2-digit",
    year: "numeric",
});
const formatTime = (date, locale, hour12) => date.toLocaleTimeString(locale, {
    hour: "numeric",
    minute: "2-digit",
    hour12,
});
const RelativeTime = ({ eventTime, locale, }) => {
    const { t } = useTranslation();
    const hour12 = reactExports.useMemo(() => detectHour12(locale), [locale]);
    const now = new Date();
    const eventDate = new Date(eventTime);
    if (isNaN(eventDate.getTime()))
        return null;
    const elapsedSeconds = differenceInSeconds(now, eventDate);
    const elapsedMinutes = differenceInMinutes(now, eventDate);
    if (elapsedSeconds < 0 || elapsedSeconds < 60) {
        return (jsxRuntimeExports.jsx(StyledTimestamp, { children: (t("approval_request.clarification.timestamp_lessThanAMinuteAgo"),
                `< 1 minute ago`) }));
    }
    if (elapsedMinutes < 60) {
        const pluralRules = new Intl.PluralRules(locale);
        const plural = pluralRules.select(elapsedMinutes);
        return (jsxRuntimeExports.jsx(StyledTimestamp, { children: (t("approval_request.clarification.timestamp_minutesAgo", {
                count: elapsedMinutes,
                plural,
            }),
                `${elapsedMinutes} minute${plural === "one" ? "" : "s"} ago`) }));
    }
    const timeStr = formatTime(eventDate, locale, hour12);
    if (isSameDay(eventDate, now)) {
        return (jsxRuntimeExports.jsx(StyledTimestamp, { children: (t("approval_request.clarification.timestamp_todayAt", {
                time: timeStr,
            }),
                `Today at ${timeStr}`) }));
    }
    if (isYesterday(eventDate, now)) {
        return (jsxRuntimeExports.jsx(StyledTimestamp, { children: (t("approval_request.clarification.timestamp_yesterdayAt", {
                time: timeStr,
            }),
                `Yesterday at ${timeStr}`) }));
    }
    if (isSameYear(eventDate, now)) {
        const dateStr = formatDate(eventDate, locale);
        return (jsxRuntimeExports.jsx(StyledTimestamp, { children: (t("approval_request.clarification.timestamp_dateAt", {
                date: dateStr,
                time: timeStr,
            }),
                `${dateStr} at ${timeStr}`) }));
    }
    const dateStr = formatDateWithYear(eventDate, locale);
    return (jsxRuntimeExports.jsx(StyledTimestamp, { children: (t("approval_request.clarification.timestamp_dateAt", {
            date: dateStr,
            time: timeStr,
        }),
            `${dateStr} at ${timeStr}`) }));
};

const AvatarWrapper = styled.div `
  position: relative;
  display: inline-block;
`;
const HeadsetBadgeWrapper = styled.div `
  position: absolute;
  bottom: -3px;
  right: -3px;
  border-radius: 50%;
  width: 13px;
  height: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => getColor({ theme, hue: "grey", shade: 100 })};
  border: ${({ theme }) => theme.borders.sm};
`;
const HeadsetIcon = styled(SvgHeadsetFill) `
  width: 9px;
  height: 9px;
  color: ${({ theme }) => getColor({ theme, hue: "grey", shade: 900 })};
`;
const AvatarWithBadge = ({ name, photoUrl, size, }) => {
    return (jsxRuntimeExports.jsxs(AvatarWrapper, { children: [jsxRuntimeExports.jsx(Avatar, { size: size, children: jsxRuntimeExports.jsx("img", { alt: name, src: photoUrl ? photoUrl : DEFAULT_AVATAR_URL }) }), jsxRuntimeExports.jsx(HeadsetBadgeWrapper, { children: jsxRuntimeExports.jsx(HeadsetIcon, {}) })] }));
};

const MessageContainer = styled.div `
  margin-top: ${({ theme }) => theme.space.sm};
`;
const Body = styled.div `
  margin-top: ${({ theme }) => theme.space.xs};
`;
const AvatarCol = styled(Col) `
  max-width: 55px;
`;
const CircleWrapper = styled.span `
  padding: 0px 6px;
`;
const NameAndTimestampCol = styled(Col) `
  display: flex;
  flex-direction: row;
  align-items: start;
`;
const StyledCircle = styled(SvgCircleSmFill) `
  width: ${({ theme }) => theme.space.xs};
  height: ${({ theme }) => theme.space.xs};
  color: ${({ theme }) => getColor({ theme, hue: "grey", shade: 600 })};
`;
function ClarificationCommentComponent({ baseLocale, children, comment, commentKey, createdByUserId, markCommentAsVisible, }) {
    const containerRef = reactExports.useRef(null);
    const { author, created_at } = comment;
    const { avatar, name, id: authorId } = author;
    useIntersectionObserver(containerRef, () => markCommentAsVisible(commentKey));
    const isRequester = createdByUserId === authorId;
    return (jsxRuntimeExports.jsx(MessageContainer, { ref: containerRef, children: jsxRuntimeExports.jsx(Grid, { gutters: false, children: jsxRuntimeExports.jsxs(Row, { children: [jsxRuntimeExports.jsx(AvatarCol, { children: isRequester ? (jsxRuntimeExports.jsx(AvatarWithBadge, { photoUrl: avatar, size: "small", name: name })) : (jsxRuntimeExports.jsx(Avatar, { size: "small", children: jsxRuntimeExports.jsx("img", { alt: name, src: avatar ? avatar : DEFAULT_AVATAR_URL }) })) }), jsxRuntimeExports.jsxs(Col, { children: [jsxRuntimeExports.jsx(Row, { alignItems: "start", justifyContent: "start", children: jsxRuntimeExports.jsxs(NameAndTimestampCol, { children: [jsxRuntimeExports.jsx(MD, { isBold: true, children: name }), jsxRuntimeExports.jsx(CircleWrapper, { children: jsxRuntimeExports.jsx(StyledCircle, {}) }), created_at && (jsxRuntimeExports.jsx(RelativeTime, { eventTime: created_at, locale: baseLocale }))] }) }), jsxRuntimeExports.jsx(Body, { children: children })] })] }) }) }));
}
const ClarificationComment = reactExports.memo(ClarificationCommentComponent);

const StyledAlert = styled(Alert) `
  margin-top: ${({ theme }) => theme.space.md};
  padding: ${({ theme }) => theme.space.md} ${({ theme }) => theme.space.xl};
`;
const CommentLimitAlert = ({ approvalRequestId, commentCount, currentUserId, isTerminalStatus, }) => {
    const { t } = useTranslation();
    const alertDismissalKey = `nearLimitAlertDismissed_${currentUserId}_${approvalRequestId}`;
    const [nearLimitAlertVisible, setNearLimitAlertVisible] = reactExports.useState(() => {
        return localStorage.getItem(alertDismissalKey) !== "true";
    });
    const isAtMaxComments = commentCount >= MAX_COMMENTS;
    const isNearLimit = commentCount >= MAX_COMMENTS - NEAR_COMMENTS_LIMIT_THRESHOLD &&
        commentCount < MAX_COMMENTS &&
        nearLimitAlertVisible;
    const commentsRemaining = MAX_COMMENTS - commentCount;
    const handleCloseAlert = reactExports.useCallback(() => {
        localStorage.setItem(alertDismissalKey, "true");
        setNearLimitAlertVisible(false);
    }, [alertDismissalKey]);
    if (!isTerminalStatus) {
        if (isAtMaxComments) {
            return (jsxRuntimeExports.jsxs(StyledAlert, { type: "info", children: [jsxRuntimeExports.jsx(Title, { children: t("txt.approval_requests.clarification.max_comment_alert_title", "Comment limit reached") }), t("txt.approval_requests.clarification.max_comment_alert_message", "You can't add more comments, approvers can still approve or deny.")] }));
        }
        else if (isNearLimit) {
            return (jsxRuntimeExports.jsxs(StyledAlert, { type: "info", children: [jsxRuntimeExports.jsx(Title, { children: t("txt.approval_requests.clarification.near_comment_limit_alert_title", "Comment limit nearly reached") }), (t("txt.approval_requests.panel.single_approval_request.clarification.near_comment_limit_alert_message", {
                        current_count: commentCount,
                        remaining_count: commentsRemaining,
                    }),
                        `This request has ${commentCount} of 40 comments available. You have ${commentsRemaining} remaining.`), jsxRuntimeExports.jsx(Close, { onClick: handleCloseAlert, "aria-label": t("txt.approval_requests.panel.single_approval_request.clarification.close_alert_button_aria_label", "Close alert") })] }));
        }
    }
    return null;
};

const Container$1 = styled.div `
  display: flex;
  flex-direction: column;
  border-top: ${({ showCommentHeader, theme }) => showCommentHeader
    ? `1px solid ${getColor({ theme, hue: "grey", shade: 200 })}`
    : "none"};
  padding-top: 16px;
`;
const CommentListArea = styled.div `
  flex: 1 1 auto;
`;
const ClarificationContent = styled(MD) `
  padding: ${({ theme }) => theme.space.xxs} 0;
  overflow-wrap: break-word;
  white-space: normal;
`;
const TitleAndDescriptionContainer = styled.div `
  padding-bottom: 16px;
`;
const StyledDescription$1 = styled(MD) `
  padding-top: ${({ theme }) => theme.space.xxs};
  color: ${(props) => getColorV8("grey", 600, props.theme)};
`;
function ClarificationContainer({ approvalRequestId, baseLocale, clarificationFlowMessages, createdByUserId, currentUserAvatarUrl, currentUserId, currentUserName, hasUserViewedBefore, status, }) {
    const copy = useGetClarificationCopy();
    const [comments, setComments] = reactExports.useState(clarificationFlowMessages);
    const hasComments = comments && comments.length > 0;
    const isTerminalStatus = !!status &&
        (status === "withdrawn" || status === "approved" || status === "rejected");
    const canComment = !isTerminalStatus && comments.length < MAX_COMMENTS;
    const showCommentHeader = !isTerminalStatus || hasComments;
    const { unreadComments, firstUnreadCommentKey, markCommentAsVisible, markAllCommentsAsRead, } = useGetUnreadComments({
        comments,
        currentUserId,
        approvalRequestId,
    });
    reactExports.useEffect(() => {
        const handleBeforeUnload = () => {
            markAllCommentsAsRead();
        };
        window.addEventListener("beforeunload", handleBeforeUnload);
        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, [markAllCommentsAsRead]);
    const handleUpdatedComments = reactExports.useCallback((newComments) => {
        setComments(newComments);
    }, []);
    return (jsxRuntimeExports.jsxs(Container$1, { showCommentHeader: showCommentHeader, children: [showCommentHeader && (jsxRuntimeExports.jsxs(TitleAndDescriptionContainer, { children: [jsxRuntimeExports.jsx(MD, { isBold: true, children: copy.title }), canComment && (jsxRuntimeExports.jsx(StyledDescription$1, { children: copy.description }))] })), jsxRuntimeExports.jsx(CommentListArea, { "data-testid": "comment-list-area", children: hasComments &&
                    comments.map((comment) => {
                        const commentKey = buildCommentEntityKey(approvalRequestId, comment);
                        const isFirstUnread = commentKey === firstUnreadCommentKey;
                        const unreadCount = unreadComments.length;
                        return (jsxRuntimeExports.jsxs(React.Fragment, { children: [!isTerminalStatus &&
                                    unreadCount > 0 &&
                                    isFirstUnread &&
                                    hasUserViewedBefore && (jsxRuntimeExports.jsx(NewCommentIndicator, { unreadCount: unreadCount })), jsxRuntimeExports.jsx(ClarificationContent, { children: jsxRuntimeExports.jsx(ClarificationComment, { baseLocale: baseLocale, comment: comment, commentKey: commentKey, createdByUserId: createdByUserId, markCommentAsVisible: markCommentAsVisible, children: comment.message }) }, comment.id)] }, `${comment.id}`));
                    }) }), jsxRuntimeExports.jsx(CommentLimitAlert, { approvalRequestId: approvalRequestId, commentCount: comments.length, currentUserId: currentUserId, isTerminalStatus: isTerminalStatus }), canComment && (jsxRuntimeExports.jsx(ClarificationCommentForm, { baseLocale: baseLocale, currentUserAvatarUrl: currentUserAvatarUrl, currentUserName: currentUserName, markAllCommentsAsRead: markAllCommentsAsRead, approvalRequestId: approvalRequestId, onUpdatedComments: handleUpdatedComments }))] }));
}

/**
 * Hook that tracks whether a user has viewed a specific approval request before, using localStorage.
 */
function useUserViewedApprovalStatus({ approvalRequestId, currentUserId, }) {
    const isValid = approvalRequestId !== undefined;
    const storage = window.localStorage;
    const storageKey = `userViewedApproval:${currentUserId}:${approvalRequestId}`;
    const getViewedStatus = reactExports.useCallback(() => {
        if (!isValid)
            return false;
        try {
            return storage.getItem(storageKey) === "true";
        }
        catch {
            return false;
        }
    }, [isValid, storage, storageKey]);
    const [hasUserViewedBefore, setHasUserViewedBefore] = reactExports.useState(() => {
        return getViewedStatus();
    });
    const markUserViewed = reactExports.useCallback(() => {
        if (!isValid)
            return;
        try {
            storage.setItem(storageKey, "true");
            setHasUserViewedBefore(true);
        }
        catch {
            // ignore errors
        }
    }, [isValid, storage, storageKey]);
    reactExports.useEffect(() => {
        if (!isValid)
            return;
        setHasUserViewedBefore(getViewedStatus());
    }, [approvalRequestId, currentUserId, getViewedStatus, isValid]);
    return { hasUserViewedBefore, markUserViewed };
}

const Container = styled.div `
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-areas:
    "left right"
    "approverActions right"
    "clarification right";

  grid-gap: ${(props) => props.theme.space.lg};
  margin-top: ${(props) => props.theme.space.xl}; /* 40px */
  margin-bottom: ${(props) => props.theme.space.lg}; /* 32px */

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    grid-template-areas:
      "left"
      "right"
      "approverActions"
      "clarification";
    margin-bottom: ${(props) => props.theme.space.xl};
  }
`;
const LoadingContainer = styled.div `
  display: flex;
  justify-content: center;
  align-items: center;
`;
const LeftColumn = styled.div `
  grid-area: left;

  & > *:first-child {
    margin-bottom: ${(props) => props.theme.space.base * 4}px; /* 16px */
  }

  & > *:not(:first-child) {
    margin-bottom: ${(props) => props.theme.space.lg}; /* 32px */
  }

  & > *:last-child {
    margin-bottom: 0;
  }
`;
const RightColumn = styled.div `
  grid-area: right;
`;
const ClarificationArea = styled.div `
  grid-area: clarification;
`;
const ApproverActionsWrapper = styled.div `
  grid-area: approverActions;
  margin-top: ${(props) => props.theme.space.lg};
`;
const StyledDescription = styled(MD) `
  white-space: pre-wrap;
`;
function ApprovalRequestPage({ approvalWorkflowInstanceId, approvalRequestId, baseLocale, helpCenterPath, organizations, userId, userAvatarUrl, userName, }) {
    const { approvalRequest, setApprovalRequest, errorFetchingApprovalRequest: error, isLoading, } = useApprovalRequest({
        approvalWorkflowInstanceId: approvalWorkflowInstanceId,
        approvalRequestId: approvalRequestId,
        enablePolling: true,
    });
    const { hasUserViewedBefore, markUserViewed } = useUserViewedApprovalStatus({
        approvalRequestId: approvalRequest?.id,
        currentUserId: userId,
    });
    reactExports.useEffect(() => {
        const handleBeforeUnload = () => {
            markUserViewed();
        };
        window.addEventListener("beforeunload", handleBeforeUnload);
        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, [markUserViewed]);
    if (error) {
        throw error;
    }
    if (isLoading || !approvalRequest) {
        return (jsxRuntimeExports.jsx(LoadingContainer, { children: jsxRuntimeExports.jsx(Spinner, { size: "64" }) }));
    }
    const showApproverActions = userId === approvalRequest.assignee_user.id &&
        approvalRequest.status === "active";
    // The `clarification_flow_messages` field is only present when arturo `approvals_clarification_flow_end_users` is enabled
    const hasClarificationEnabled = approvalRequest?.clarification_flow_messages !== undefined;
    const collapsedMessage = approvalRequest.message.replace(/\n{3,}/g, "\n\n");
    return (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsx(ApprovalRequestBreadcrumbs$1, { helpCenterPath: helpCenterPath, organizations: organizations }), jsxRuntimeExports.jsxs(Container, { children: [jsxRuntimeExports.jsxs(LeftColumn, { children: [jsxRuntimeExports.jsx(XXL, { isBold: true, children: approvalRequest.subject }), jsxRuntimeExports.jsx(StyledDescription, { children: collapsedMessage }), approvalRequest.ticket_details && (jsxRuntimeExports.jsx(ApprovalTicketDetails$1, { ticket: approvalRequest.ticket_details }))] }), jsxRuntimeExports.jsx(RightColumn, { children: approvalRequest && (jsxRuntimeExports.jsx(ApprovalRequestDetails$1, { approvalRequest: approvalRequest, baseLocale: baseLocale })) }), showApproverActions && (jsxRuntimeExports.jsx(ApproverActionsWrapper, { children: jsxRuntimeExports.jsx(ApproverActions$1, { approvalWorkflowInstanceId: approvalWorkflowInstanceId, approvalRequestId: approvalRequestId, setApprovalRequest: setApprovalRequest, assigneeUser: approvalRequest.assignee_user }) })), hasClarificationEnabled && (jsxRuntimeExports.jsx(ClarificationArea, { children: jsxRuntimeExports.jsx(ClarificationContainer, { approvalRequestId: approvalRequest.id, baseLocale: baseLocale, clarificationFlowMessages: approvalRequest.clarification_flow_messages, createdByUserId: approvalRequest.created_by_user.id, currentUserAvatarUrl: userAvatarUrl, currentUserId: userId, currentUserName: userName, hasUserViewedBefore: hasUserViewedBefore, status: approvalRequest.status }, approvalRequest?.clarification_flow_messages?.length) }))] })] }));
}
var ApprovalRequestPage$1 = reactExports.memo(ApprovalRequestPage);

function __variableDynamicImportRuntime1__(path) {
  switch (path) {
    case '../shared/translations/locales/af.json': return import('shared').then(function (n) { return n.aU; });
    case '../shared/translations/locales/ar-x-pseudo.json': return import('shared').then(function (n) { return n.aV; });
    case '../shared/translations/locales/ar.json': return import('shared').then(function (n) { return n.aW; });
    case '../shared/translations/locales/az.json': return import('shared').then(function (n) { return n.aX; });
    case '../shared/translations/locales/be.json': return import('shared').then(function (n) { return n.aY; });
    case '../shared/translations/locales/bg.json': return import('shared').then(function (n) { return n.aZ; });
    case '../shared/translations/locales/bn.json': return import('shared').then(function (n) { return n.a_; });
    case '../shared/translations/locales/bs.json': return import('shared').then(function (n) { return n.a$; });
    case '../shared/translations/locales/ca.json': return import('shared').then(function (n) { return n.b0; });
    case '../shared/translations/locales/cs.json': return import('shared').then(function (n) { return n.b1; });
    case '../shared/translations/locales/cy.json': return import('shared').then(function (n) { return n.b2; });
    case '../shared/translations/locales/da.json': return import('shared').then(function (n) { return n.b3; });
    case '../shared/translations/locales/de-de.json': return import('shared').then(function (n) { return n.b4; });
    case '../shared/translations/locales/de-x-informal.json': return import('shared').then(function (n) { return n.b5; });
    case '../shared/translations/locales/de.json': return import('shared').then(function (n) { return n.b6; });
    case '../shared/translations/locales/el.json': return import('shared').then(function (n) { return n.b7; });
    case '../shared/translations/locales/en-001.json': return import('shared').then(function (n) { return n.b8; });
    case '../shared/translations/locales/en-150.json': return import('shared').then(function (n) { return n.b9; });
    case '../shared/translations/locales/en-au.json': return import('shared').then(function (n) { return n.ba; });
    case '../shared/translations/locales/en-ca.json': return import('shared').then(function (n) { return n.bb; });
    case '../shared/translations/locales/en-gb.json': return import('shared').then(function (n) { return n.bc; });
    case '../shared/translations/locales/en-my.json': return import('shared').then(function (n) { return n.bd; });
    case '../shared/translations/locales/en-ph.json': return import('shared').then(function (n) { return n.be; });
    case '../shared/translations/locales/en-se.json': return import('shared').then(function (n) { return n.bf; });
    case '../shared/translations/locales/en-us.json': return import('shared').then(function (n) { return n.bg; });
    case '../shared/translations/locales/en-x-dev.json': return import('shared').then(function (n) { return n.bh; });
    case '../shared/translations/locales/en-x-keys.json': return import('shared').then(function (n) { return n.bi; });
    case '../shared/translations/locales/en-x-obsolete.json': return import('shared').then(function (n) { return n.bj; });
    case '../shared/translations/locales/en-x-pseudo.json': return import('shared').then(function (n) { return n.bk; });
    case '../shared/translations/locales/en-x-test.json': return import('shared').then(function (n) { return n.bl; });
    case '../shared/translations/locales/es-419.json': return import('shared').then(function (n) { return n.bm; });
    case '../shared/translations/locales/es-ar.json': return import('shared').then(function (n) { return n.bn; });
    case '../shared/translations/locales/es-cl.json': return import('shared').then(function (n) { return n.bo; });
    case '../shared/translations/locales/es-es.json': return import('shared').then(function (n) { return n.bp; });
    case '../shared/translations/locales/es-mx.json': return import('shared').then(function (n) { return n.bq; });
    case '../shared/translations/locales/es-pe.json': return import('shared').then(function (n) { return n.br; });
    case '../shared/translations/locales/es.json': return import('shared').then(function (n) { return n.bs; });
    case '../shared/translations/locales/et.json': return import('shared').then(function (n) { return n.bt; });
    case '../shared/translations/locales/eu.json': return import('shared').then(function (n) { return n.bu; });
    case '../shared/translations/locales/fa-af.json': return import('shared').then(function (n) { return n.bv; });
    case '../shared/translations/locales/fa.json': return import('shared').then(function (n) { return n.bw; });
    case '../shared/translations/locales/fi.json': return import('shared').then(function (n) { return n.bx; });
    case '../shared/translations/locales/fil.json': return import('shared').then(function (n) { return n.by; });
    case '../shared/translations/locales/fo.json': return import('shared').then(function (n) { return n.bz; });
    case '../shared/translations/locales/fr-ca.json': return import('shared').then(function (n) { return n.bA; });
    case '../shared/translations/locales/fr-dz.json': return import('shared').then(function (n) { return n.bB; });
    case '../shared/translations/locales/fr-mu.json': return import('shared').then(function (n) { return n.bC; });
    case '../shared/translations/locales/fr.json': return import('shared').then(function (n) { return n.bD; });
    case '../shared/translations/locales/ga.json': return import('shared').then(function (n) { return n.bE; });
    case '../shared/translations/locales/he.json': return import('shared').then(function (n) { return n.bF; });
    case '../shared/translations/locales/hi.json': return import('shared').then(function (n) { return n.bG; });
    case '../shared/translations/locales/hr.json': return import('shared').then(function (n) { return n.bH; });
    case '../shared/translations/locales/hu.json': return import('shared').then(function (n) { return n.bI; });
    case '../shared/translations/locales/hy.json': return import('shared').then(function (n) { return n.bJ; });
    case '../shared/translations/locales/id.json': return import('shared').then(function (n) { return n.bK; });
    case '../shared/translations/locales/is.json': return import('shared').then(function (n) { return n.bL; });
    case '../shared/translations/locales/it-ch.json': return import('shared').then(function (n) { return n.bM; });
    case '../shared/translations/locales/it.json': return import('shared').then(function (n) { return n.bN; });
    case '../shared/translations/locales/ja.json': return import('shared').then(function (n) { return n.bO; });
    case '../shared/translations/locales/ka.json': return import('shared').then(function (n) { return n.bP; });
    case '../shared/translations/locales/kk.json': return import('shared').then(function (n) { return n.bQ; });
    case '../shared/translations/locales/kl-dk.json': return import('shared').then(function (n) { return n.bR; });
    case '../shared/translations/locales/km.json': return import('shared').then(function (n) { return n.bS; });
    case '../shared/translations/locales/ko.json': return import('shared').then(function (n) { return n.bT; });
    case '../shared/translations/locales/ku.json': return import('shared').then(function (n) { return n.bU; });
    case '../shared/translations/locales/ky.json': return import('shared').then(function (n) { return n.bV; });
    case '../shared/translations/locales/lt.json': return import('shared').then(function (n) { return n.bW; });
    case '../shared/translations/locales/lv.json': return import('shared').then(function (n) { return n.bX; });
    case '../shared/translations/locales/mk.json': return import('shared').then(function (n) { return n.bY; });
    case '../shared/translations/locales/mn.json': return import('shared').then(function (n) { return n.bZ; });
    case '../shared/translations/locales/ms.json': return import('shared').then(function (n) { return n.b_; });
    case '../shared/translations/locales/mt.json': return import('shared').then(function (n) { return n.b$; });
    case '../shared/translations/locales/my.json': return import('shared').then(function (n) { return n.c0; });
    case '../shared/translations/locales/ne.json': return import('shared').then(function (n) { return n.c1; });
    case '../shared/translations/locales/nl-be.json': return import('shared').then(function (n) { return n.c2; });
    case '../shared/translations/locales/nl.json': return import('shared').then(function (n) { return n.c3; });
    case '../shared/translations/locales/no.json': return import('shared').then(function (n) { return n.c4; });
    case '../shared/translations/locales/pl.json': return import('shared').then(function (n) { return n.c5; });
    case '../shared/translations/locales/pt-br.json': return import('shared').then(function (n) { return n.c6; });
    case '../shared/translations/locales/pt.json': return import('shared').then(function (n) { return n.c7; });
    case '../shared/translations/locales/ro-md.json': return import('shared').then(function (n) { return n.c8; });
    case '../shared/translations/locales/ro.json': return import('shared').then(function (n) { return n.c9; });
    case '../shared/translations/locales/ru.json': return import('shared').then(function (n) { return n.ca; });
    case '../shared/translations/locales/si.json': return import('shared').then(function (n) { return n.cb; });
    case '../shared/translations/locales/sk.json': return import('shared').then(function (n) { return n.cc; });
    case '../shared/translations/locales/sl.json': return import('shared').then(function (n) { return n.cd; });
    case '../shared/translations/locales/sq.json': return import('shared').then(function (n) { return n.ce; });
    case '../shared/translations/locales/sr-me.json': return import('shared').then(function (n) { return n.cf; });
    case '../shared/translations/locales/sr.json': return import('shared').then(function (n) { return n.cg; });
    case '../shared/translations/locales/sv.json': return import('shared').then(function (n) { return n.ch; });
    case '../shared/translations/locales/sw-ke.json': return import('shared').then(function (n) { return n.ci; });
    case '../shared/translations/locales/ta.json': return import('shared').then(function (n) { return n.cj; });
    case '../shared/translations/locales/th.json': return import('shared').then(function (n) { return n.ck; });
    case '../shared/translations/locales/tr.json': return import('shared').then(function (n) { return n.cl; });
    case '../shared/translations/locales/uk.json': return import('shared').then(function (n) { return n.cm; });
    case '../shared/translations/locales/ur-pk.json': return import('shared').then(function (n) { return n.cn; });
    case '../shared/translations/locales/ur.json': return import('shared').then(function (n) { return n.co; });
    case '../shared/translations/locales/uz.json': return import('shared').then(function (n) { return n.cp; });
    case '../shared/translations/locales/vi.json': return import('shared').then(function (n) { return n.cq; });
    case '../shared/translations/locales/zh-cn.json': return import('shared').then(function (n) { return n.cr; });
    case '../shared/translations/locales/zh-tw.json': return import('shared').then(function (n) { return n.cs; });
    default: return new Promise(function(resolve, reject) {
      (typeof queueMicrotask === 'function' ? queueMicrotask : setTimeout)(
        reject.bind(null, new Error("Unknown variable dynamic import: " + path))
      );
    })
   }
 }

function __variableDynamicImportRuntime0__(path) {
  switch (path) {
    case './translations/locales/af.json': return import('approval-requests-translations').then(function (n) { return n.a; });
    case './translations/locales/ar-x-pseudo.json': return import('approval-requests-translations').then(function (n) { return n.b; });
    case './translations/locales/ar.json': return import('approval-requests-translations').then(function (n) { return n.c; });
    case './translations/locales/az.json': return import('approval-requests-translations').then(function (n) { return n.d; });
    case './translations/locales/be.json': return import('approval-requests-translations').then(function (n) { return n.e; });
    case './translations/locales/bg.json': return import('approval-requests-translations').then(function (n) { return n.f; });
    case './translations/locales/bn.json': return import('approval-requests-translations').then(function (n) { return n.g; });
    case './translations/locales/bs.json': return import('approval-requests-translations').then(function (n) { return n.h; });
    case './translations/locales/ca.json': return import('approval-requests-translations').then(function (n) { return n.i; });
    case './translations/locales/cs.json': return import('approval-requests-translations').then(function (n) { return n.j; });
    case './translations/locales/cy.json': return import('approval-requests-translations').then(function (n) { return n.k; });
    case './translations/locales/da.json': return import('approval-requests-translations').then(function (n) { return n.l; });
    case './translations/locales/de-de.json': return import('approval-requests-translations').then(function (n) { return n.m; });
    case './translations/locales/de-x-informal.json': return import('approval-requests-translations').then(function (n) { return n.n; });
    case './translations/locales/de.json': return import('approval-requests-translations').then(function (n) { return n.o; });
    case './translations/locales/el.json': return import('approval-requests-translations').then(function (n) { return n.p; });
    case './translations/locales/en-001.json': return import('approval-requests-translations').then(function (n) { return n.q; });
    case './translations/locales/en-150.json': return import('approval-requests-translations').then(function (n) { return n.r; });
    case './translations/locales/en-au.json': return import('approval-requests-translations').then(function (n) { return n.s; });
    case './translations/locales/en-ca.json': return import('approval-requests-translations').then(function (n) { return n.t; });
    case './translations/locales/en-gb.json': return import('approval-requests-translations').then(function (n) { return n.u; });
    case './translations/locales/en-my.json': return import('approval-requests-translations').then(function (n) { return n.v; });
    case './translations/locales/en-ph.json': return import('approval-requests-translations').then(function (n) { return n.w; });
    case './translations/locales/en-se.json': return import('approval-requests-translations').then(function (n) { return n.x; });
    case './translations/locales/en-us.json': return import('approval-requests-translations').then(function (n) { return n.y; });
    case './translations/locales/en-x-dev.json': return import('approval-requests-translations').then(function (n) { return n.z; });
    case './translations/locales/en-x-keys.json': return import('approval-requests-translations').then(function (n) { return n.A; });
    case './translations/locales/en-x-obsolete.json': return import('approval-requests-translations').then(function (n) { return n.B; });
    case './translations/locales/en-x-pseudo.json': return import('approval-requests-translations').then(function (n) { return n.C; });
    case './translations/locales/en-x-test.json': return import('approval-requests-translations').then(function (n) { return n.D; });
    case './translations/locales/es-419.json': return import('approval-requests-translations').then(function (n) { return n.E; });
    case './translations/locales/es-ar.json': return import('approval-requests-translations').then(function (n) { return n.F; });
    case './translations/locales/es-cl.json': return import('approval-requests-translations').then(function (n) { return n.G; });
    case './translations/locales/es-es.json': return import('approval-requests-translations').then(function (n) { return n.H; });
    case './translations/locales/es-mx.json': return import('approval-requests-translations').then(function (n) { return n.I; });
    case './translations/locales/es-pe.json': return import('approval-requests-translations').then(function (n) { return n.J; });
    case './translations/locales/es.json': return import('approval-requests-translations').then(function (n) { return n.K; });
    case './translations/locales/et.json': return import('approval-requests-translations').then(function (n) { return n.L; });
    case './translations/locales/eu.json': return import('approval-requests-translations').then(function (n) { return n.M; });
    case './translations/locales/fa-af.json': return import('approval-requests-translations').then(function (n) { return n.N; });
    case './translations/locales/fa.json': return import('approval-requests-translations').then(function (n) { return n.O; });
    case './translations/locales/fi.json': return import('approval-requests-translations').then(function (n) { return n.P; });
    case './translations/locales/fil.json': return import('approval-requests-translations').then(function (n) { return n.Q; });
    case './translations/locales/fo.json': return import('approval-requests-translations').then(function (n) { return n.R; });
    case './translations/locales/fr-ca.json': return import('approval-requests-translations').then(function (n) { return n.S; });
    case './translations/locales/fr-dz.json': return import('approval-requests-translations').then(function (n) { return n.T; });
    case './translations/locales/fr-mu.json': return import('approval-requests-translations').then(function (n) { return n.U; });
    case './translations/locales/fr.json': return import('approval-requests-translations').then(function (n) { return n.V; });
    case './translations/locales/ga.json': return import('approval-requests-translations').then(function (n) { return n.W; });
    case './translations/locales/he.json': return import('approval-requests-translations').then(function (n) { return n.X; });
    case './translations/locales/hi.json': return import('approval-requests-translations').then(function (n) { return n.Y; });
    case './translations/locales/hr.json': return import('approval-requests-translations').then(function (n) { return n.Z; });
    case './translations/locales/hu.json': return import('approval-requests-translations').then(function (n) { return n._; });
    case './translations/locales/hy.json': return import('approval-requests-translations').then(function (n) { return n.$; });
    case './translations/locales/id.json': return import('approval-requests-translations').then(function (n) { return n.a0; });
    case './translations/locales/is.json': return import('approval-requests-translations').then(function (n) { return n.a1; });
    case './translations/locales/it-ch.json': return import('approval-requests-translations').then(function (n) { return n.a2; });
    case './translations/locales/it.json': return import('approval-requests-translations').then(function (n) { return n.a3; });
    case './translations/locales/ja.json': return import('approval-requests-translations').then(function (n) { return n.a4; });
    case './translations/locales/ka.json': return import('approval-requests-translations').then(function (n) { return n.a5; });
    case './translations/locales/kk.json': return import('approval-requests-translations').then(function (n) { return n.a6; });
    case './translations/locales/kl-dk.json': return import('approval-requests-translations').then(function (n) { return n.a7; });
    case './translations/locales/km.json': return import('approval-requests-translations').then(function (n) { return n.a8; });
    case './translations/locales/ko.json': return import('approval-requests-translations').then(function (n) { return n.a9; });
    case './translations/locales/ku.json': return import('approval-requests-translations').then(function (n) { return n.aa; });
    case './translations/locales/ky.json': return import('approval-requests-translations').then(function (n) { return n.ab; });
    case './translations/locales/lt.json': return import('approval-requests-translations').then(function (n) { return n.ac; });
    case './translations/locales/lv.json': return import('approval-requests-translations').then(function (n) { return n.ad; });
    case './translations/locales/mk.json': return import('approval-requests-translations').then(function (n) { return n.ae; });
    case './translations/locales/mn.json': return import('approval-requests-translations').then(function (n) { return n.af; });
    case './translations/locales/ms.json': return import('approval-requests-translations').then(function (n) { return n.ag; });
    case './translations/locales/mt.json': return import('approval-requests-translations').then(function (n) { return n.ah; });
    case './translations/locales/my.json': return import('approval-requests-translations').then(function (n) { return n.ai; });
    case './translations/locales/ne.json': return import('approval-requests-translations').then(function (n) { return n.aj; });
    case './translations/locales/nl-be.json': return import('approval-requests-translations').then(function (n) { return n.ak; });
    case './translations/locales/nl.json': return import('approval-requests-translations').then(function (n) { return n.al; });
    case './translations/locales/no.json': return import('approval-requests-translations').then(function (n) { return n.am; });
    case './translations/locales/pl.json': return import('approval-requests-translations').then(function (n) { return n.an; });
    case './translations/locales/pt-br.json': return import('approval-requests-translations').then(function (n) { return n.ao; });
    case './translations/locales/pt.json': return import('approval-requests-translations').then(function (n) { return n.ap; });
    case './translations/locales/ro-md.json': return import('approval-requests-translations').then(function (n) { return n.aq; });
    case './translations/locales/ro.json': return import('approval-requests-translations').then(function (n) { return n.ar; });
    case './translations/locales/ru.json': return import('approval-requests-translations').then(function (n) { return n.as; });
    case './translations/locales/si.json': return import('approval-requests-translations').then(function (n) { return n.at; });
    case './translations/locales/sk.json': return import('approval-requests-translations').then(function (n) { return n.au; });
    case './translations/locales/sl.json': return import('approval-requests-translations').then(function (n) { return n.av; });
    case './translations/locales/sq.json': return import('approval-requests-translations').then(function (n) { return n.aw; });
    case './translations/locales/sr-me.json': return import('approval-requests-translations').then(function (n) { return n.ax; });
    case './translations/locales/sr.json': return import('approval-requests-translations').then(function (n) { return n.ay; });
    case './translations/locales/sv.json': return import('approval-requests-translations').then(function (n) { return n.az; });
    case './translations/locales/sw-ke.json': return import('approval-requests-translations').then(function (n) { return n.aA; });
    case './translations/locales/ta.json': return import('approval-requests-translations').then(function (n) { return n.aB; });
    case './translations/locales/th.json': return import('approval-requests-translations').then(function (n) { return n.aC; });
    case './translations/locales/tr.json': return import('approval-requests-translations').then(function (n) { return n.aD; });
    case './translations/locales/uk.json': return import('approval-requests-translations').then(function (n) { return n.aE; });
    case './translations/locales/ur-pk.json': return import('approval-requests-translations').then(function (n) { return n.aF; });
    case './translations/locales/ur.json': return import('approval-requests-translations').then(function (n) { return n.aG; });
    case './translations/locales/uz.json': return import('approval-requests-translations').then(function (n) { return n.aH; });
    case './translations/locales/vi.json': return import('approval-requests-translations').then(function (n) { return n.aI; });
    case './translations/locales/zh-cn.json': return import('approval-requests-translations').then(function (n) { return n.aJ; });
    case './translations/locales/zh-tw.json': return import('approval-requests-translations').then(function (n) { return n.aK; });
    default: return new Promise(function(resolve, reject) {
      (typeof queueMicrotask === 'function' ? queueMicrotask : setTimeout)(
        reject.bind(null, new Error("Unknown variable dynamic import: " + path))
      );
    })
   }
 }
async function renderApprovalRequest(container, settings, props, helpCenterPath) {
    const { baseLocale } = props;
    initI18next(baseLocale);
    await loadTranslations(baseLocale, [
        () => __variableDynamicImportRuntime0__(`./translations/locales/${baseLocale}.json`),
        () => __variableDynamicImportRuntime1__(`../shared/translations/locales/${baseLocale}.json`),
    ]);
    reactDomExports.render(jsxRuntimeExports.jsx(ThemeProviders, { theme: createTheme(settings), children: jsxRuntimeExports.jsx(ErrorBoundary, { helpCenterPath: helpCenterPath, children: jsxRuntimeExports.jsx(ApprovalRequestPage$1, { ...props, helpCenterPath: helpCenterPath }) }) }), container);
}

export { renderApprovalRequest, renderApprovalRequestList };
