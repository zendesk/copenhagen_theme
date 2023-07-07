import { D as DEFAULT_THEME, a as React, T as ThemeProvider } from 'vendor';

let theme = DEFAULT_THEME;
function setupGardenTheme(callback) {
  theme = callback(DEFAULT_THEME);
}
function ComponentProviders({
  children
}) {
  return /*#__PURE__*/React.createElement(ThemeProvider, {
    theme: theme
  }, children);
}

export { ComponentProviders, setupGardenTheme };
