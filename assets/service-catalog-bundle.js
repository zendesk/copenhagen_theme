import { j as jsxRuntimeExports, S as Span, a6 as reactDomExports, a7 as ThemeProviders, a8 as createTheme } from 'shared';

function ServiceCatalog() {
    return jsxRuntimeExports.jsx(Span, { children: "Hello from module" });
}

async function renderServiceCatalog(container, settings) {
    reactDomExports.render(jsxRuntimeExports.jsx(ThemeProviders, { theme: createTheme(settings), children: jsxRuntimeExports.jsx(ServiceCatalog, {}) }), container);
}

export { renderServiceCatalog };
