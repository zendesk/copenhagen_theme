import { j as jsxRuntimeExports, S as Span, a6 as reactDomExports } from 'shared';

function ServiceCatalog() {
    return jsxRuntimeExports.jsx(Span, { children: "Hello from module" });
}

async function renderServiceCatalog(container) {
    reactDomExports.render(jsxRuntimeExports.jsx(ServiceCatalog, {}), container);
}

export { renderServiceCatalog };
