import { Z as DEFAULT_THEME, _ as Ne, r as reactExports, s as styled, j as jsxRuntimeExports, a0 as ThemeProvider, a1 as ToastProvider } from 'vendor-bundle';

function createTheme(settings) {
    return {
        ...DEFAULT_THEME,
        rtl: document.dir === "rtl",
        colors: {
            ...DEFAULT_THEME.colors,
            foreground: settings.text_color,
            primaryHue: settings.brand_color,
        },
        components: {
            "buttons.anchor": Ne `
        color: ${settings.link_color};

        :hover,
        :active,
        :focus {
          color: ${settings.hover_link_color};
        }

        &:visited {
          color: ${settings.visited_link_color};
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

function ThemeProviders({ theme, children, }) {
    return (jsxRuntimeExports.jsx(ThemeProvider, { theme: theme, children: jsxRuntimeExports.jsx(ToastProvider, { zIndex: 2147483647, children: jsxRuntimeExports.jsx(ModalContainerProvider, { children: children }) }) }));
}

const FLASH_NOTIFICATIONS_KEY = "HC_FLASH_NOTIFICATIONS";

function addFlashNotification(notification) {
    try {
        const currentValue = window.sessionStorage.getItem(FLASH_NOTIFICATIONS_KEY);
        const notifications = currentValue
            ? JSON.parse(currentValue)
            : [];
        notifications.push(notification);
        window.sessionStorage.setItem(FLASH_NOTIFICATIONS_KEY, JSON.stringify(notifications));
    }
    catch (e) {
        console.error("Cannot add flash notification", e);
    }
}

export { FLASH_NOTIFICATIONS_KEY as F, ModalContainerContext as M, ThemeProviders as T, addFlashNotification as a, createTheme as c };
