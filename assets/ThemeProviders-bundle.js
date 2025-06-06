import { a5 as DEFAULT_THEME, a6 as Ne, r as reactExports, s as styled, j as jsxRuntimeExports, a7 as ThemeProvider, a8 as ToastProvider } from 'shared';

const FLASH_NOTIFICATIONS_KEY = "HC_FLASH_NOTIFICATIONS";

function createTheme(settings) {
    return {
        ...DEFAULT_THEME,
        borders: {
            sm: "0px solid",
            md: "0px solid"
        },
        borderRadii: {
            sm: "0px",
            md: "0px"
        },
        borderWidths: {
            sm: "1px",
            md: "3px"
        },
        breakpoints: {
            xs: "0px",
            sm: "576px",
            md: "768px",
            lg: "992px",
            xl: "1200px"
        },
        colors: {
            background: "#FFFFFF",
            foreground: "#0f172a",
            primaryHue: "#515ba5",
            base: "light",
            dangerHue: "#b84c56",
            warningHue: "#f2c464",
            successHue: "#268460",
            neutralHue: "#68768b",
            chromeHue: "#515ba5",
        },
        components: {
            "buttons.anchor": Ne `
        color: #515ba5;

        :hover,
        :active,
        :focus {
          color: #2f3561;
        }

        &:visited {
          color: #2f3561;
        }
      `,
            "buttons.button": Ne `
        ${(props) => props.isPrimary &&
                Ne `
            color: #ffffff;
            background-color: #515ba5;
          `}
      `,
            "forms.faux_input": Ne `
            background-color: #f1f5f9;
            border: 0;
            border-radius: 0;

        :hover,
        :active,
        :focus {
          color: #2f3561;
        }

        &:visited {
          color: #2f3561;
        }
      `,
        },
        fonts: {
            mono: "SFMono-Regular,Consolas,\"Liberation Mono\",Menlo,Courier,monospace",
            system: "Quicksand, Arial, Helvetica, sans-serif"
        },
        fontSizes: {
            xs: "12px",
            sm: "14px",
            md: "16px",
            lg: "18px",
            xl: "22px",
            xxl: "26px",
            xxxl: "36px"
        },
        iconSizes: {
            sm: "12px",
            md: "16px",
            lg: "26px"
        },
        lineHeights: {
            sm: "16px",
            md: "25px",
            lg: "28px",
            xl: "32px",
            xxl: "44px",
            xxxl: "50px"
        },
        palette: { /* see API for details */},
        rtl: document.dir === "rtl",
        shadowWidths: {
            xs: "1px",
            sm: "2px",
            md: "3px"
        },
        space: {
            base: 4,
            xxs: "4px",
            xs: "8px",
            sm: "12px",
            md: "16px",
            lg: "32px",
            xl: "40px",
            xxl: "48px"
        }
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

export { FLASH_NOTIFICATIONS_KEY as F, ModalContainerContext as M, ThemeProviders as T, createTheme as c };
