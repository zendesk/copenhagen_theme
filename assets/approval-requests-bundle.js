import { s as styled, j as jsxRuntimeExports, a7 as reactDomExports, a8 as ThemeProviders, a9 as createTheme } from 'shared';

const Container$1 = styled.div `
  display: flex;
  flex-direction: column;
`;
function ApprovalRequestListPage() {
    return (jsxRuntimeExports.jsx(Container$1, { children: jsxRuntimeExports.jsx("h2", { children: "Approval Request List Page" }) }));
}

async function renderApprovalRequestList(container, settings, props) {
    console.log("renderApprovalRequestList", container, settings, props);
    reactDomExports.render(jsxRuntimeExports.jsx(ThemeProviders, { theme: createTheme(settings), children: jsxRuntimeExports.jsx(ApprovalRequestListPage, { ...props }) }), container);
}

const Container = styled.div `
  display: flex;
  flex-direction: column;
`;
function ApprovalRequestPage() {
    return (jsxRuntimeExports.jsx(Container, { children: jsxRuntimeExports.jsx("h2", { children: "Approval Request Page" }) }));
}

async function renderApprovalRequest(container, settings, props) {
    console.log("renderApprovalRequest");
    reactDomExports.render(jsxRuntimeExports.jsx(ThemeProviders, { theme: createTheme(settings), children: jsxRuntimeExports.jsx(ApprovalRequestPage, { ...props }) }), container);
}

export { renderApprovalRequest, renderApprovalRequestList };
