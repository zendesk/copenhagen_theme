import { G as DEFAULT_THEME, J as Ne, r as reactExports, s as styled, j as jsxRuntimeExports, K as ThemeProvider, Q as ToastProvider } from 'vendor';

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

function useModalContainer() {
    const modalContainer = reactExports.useContext(ModalContainerContext);
    if (modalContainer === null) {
        throw new Error("useModalContainer should be used inside a ModalContainerProvider");
    }
    return modalContainer;
}

export { ThemeProviders as T, setupGardenTheme as s, useModalContainer as u };
