import { D as DEFAULT_THEME, j as jsxRuntimeExports, h as ThemeProvider } from 'vendor';

let theme = DEFAULT_THEME;
function setupGardenTheme(callback) {
    theme = callback(DEFAULT_THEME);
}
function ComponentProviders({ children }) {
    return jsxRuntimeExports.jsx(ThemeProvider, { theme: theme, children: children });
}

export { ComponentProviders, setupGardenTheme };
