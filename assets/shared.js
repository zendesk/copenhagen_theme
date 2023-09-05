import { D as DEFAULT_THEME, j as jsxRuntimeExports, t as ThemeProvider, v as ToastProvider } from 'vendor';

let theme = DEFAULT_THEME;
function setupGardenTheme(callback) {
    theme = callback(DEFAULT_THEME);
}
function ComponentProviders({ children }) {
    return (jsxRuntimeExports.jsx(ThemeProvider, { theme: theme, children: jsxRuntimeExports.jsx(ToastProvider, { zIndex: 2147483647, children: children }) }));
}

export { ComponentProviders, setupGardenTheme };
