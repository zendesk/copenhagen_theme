import { D as DEFAULT_THEME, v as Ne, j as jsxRuntimeExports, w as ThemeProvider, x as ToastProvider } from 'vendor';

let theme = DEFAULT_THEME;
function setupGardenTheme({ textColor, brandColor, linkColor, hoverLinkColor, visitedLinkColor, }) {
    theme = {
        ...DEFAULT_THEME,
        colors: {
            ...DEFAULT_THEME.colors,
            foreground: textColor,
            primaryHue: brandColor,
        },
        components: {
            "buttons.anchor": Ne `
        color: ${linkColor};

        :hover,
        :active,
        :focus {
          color: ${hoverLinkColor};
        }

        &:visited {
          color: ${visitedLinkColor};
        }
      `,
        },
    };
}
function ComponentProviders({ children }) {
    return (jsxRuntimeExports.jsx(ThemeProvider, { theme: theme, children: jsxRuntimeExports.jsx(ToastProvider, { zIndex: 2147483647, children: children }) }));
}

export { ComponentProviders, setupGardenTheme };
