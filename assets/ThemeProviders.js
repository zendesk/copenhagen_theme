import { E as DEFAULT_THEME, G as Ne, r as reactExports, s as styled, j as jsxRuntimeExports, J as ThemeProvider, K as ToastProvider } from 'vendor';

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

const ModalContainerContext = reactExports.createContext(null);

// z-index needs to be higher than the z-index of the navbar,
const ModalContainer = styled.div `
  z-index: 2147483647;
  position: fixed;
`;
function ModalContainerProvider({ children, }) {
    const [container, setContainer] = reactExports.useState();
    const containerRefCallback = (element) => {
        setContainer(element);
    };
    return (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsx(ModalContainer, { ref: containerRefCallback }), container && (jsxRuntimeExports.jsx(ModalContainerContext.Provider, { value: container, children: children }))] }));
}

function ThemeProviders({ children }) {
    return (jsxRuntimeExports.jsx(ThemeProvider, { theme: theme, children: jsxRuntimeExports.jsx(ToastProvider, { zIndex: 2147483647, children: jsxRuntimeExports.jsx(ModalContainerProvider, { children: children }) }) }));
}

export { ModalContainerContext as M, ThemeProviders as T, setupGardenTheme as s };
