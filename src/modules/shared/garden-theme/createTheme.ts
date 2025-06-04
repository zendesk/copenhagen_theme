import type { IButtonProps } from "@zendeskgarden/react-buttons";
import type { IGardenTheme } from "@zendeskgarden/react-theming";
import { DEFAULT_THEME } from "@zendeskgarden/react-theming";
import { css } from "styled-components";

export interface Settings {
  background_color: string;
  text_color: string;
  brand_color: string;
  brand_text_color: string;
  link_color: string;
  hover_link_color: string;
  visited_link_color: string;
}

export function createTheme(settings: Settings): IGardenTheme {
  return {



    ...DEFAULT_THEME,



  borders: {
    sm: "1px solid",
    md: "3px solid"
  },
  borderRadii: {
    sm: "2px",
    md: "4px"
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
    dangerHue: "red",
    warningHue: "yellow",
    successHue: "green",
    neutralHue: "grey",
    chromeHue: "kale",
    variables: {
      dark: {
        background: {
          default: "neutralHue.1100",
          raised: "neutralHue.1000",
          recessed: "neutralHue.1200",
          subtle: "neutralHue.1000",
          emphasis: "neutralHue.600",
          success: "successHue.1000",
          warning: "warningHue.1000",
          danger: "dangerHue.1000",
          primaryEmphasis: "primaryHue.600",
          successEmphasis: "successHue.600",
          warningEmphasis: "warningHue.600",
          dangerEmphasis: "dangerHue.600",
          disabled: "rgba(neutralHue.500, 100)"
        },
        border: {
          default: "neutralHue.800",
          emphasis: "neutralHue.600",
          subtle: "neutralHue.900",
          success: "successHue.900",
          warning: "warningHue.900",
          danger: "dangerHue.900",
          primaryEmphasis: "primaryHue.600",
          successEmphasis: "successHue.600",
          warningEmphasis: "warningHue.600",
          dangerEmphasis: "dangerHue.600",
          disabled: "neutralHue.800"
        },
        foreground: {
          default: "neutralHue.300",
          subtle: "neutralHue.500",
          onEmphasis: "neutralHue.1100",
          primary: "primaryHue.600",
          success: "successHue.400",
          warning: "warningHue.400",
          danger: "dangerHue.400",
          successEmphasis: "successHue.300",
          warningEmphasis: "warningHue.300",
          dangerEmphasis: "dangerHue.300",
          disabled: "neutralHue.700"
        },
        shadow: {
          small: "rgba(neutralHue.1200, 1100)",
          medium: "rgba(neutralHue.1200, 800)",
          large: "rgba(neutralHue.1200, 1000)"
        }
      },
      light: {
        background: {
          default: "palette.white",
          raised: "palette.white",
          recessed: "neutralHue.100",
          subtle: "neutralHue.100",
          emphasis: "neutralHue.700",
          success: "successHue.100",
          warning: "warningHue.100",
          danger: "dangerHue.100",
          primaryEmphasis: "primaryHue.700",
          successEmphasis: "successHue.700",
          warningEmphasis: "warningHue.700",
          dangerEmphasis: "dangerHue.700",
          disabled: "rgba(neutralHue.700, 100)"
        },
        border: {
          default: "neutralHue.300",
          emphasis: "neutralHue.600",
          subtle: "neutralHue.200",
          success: "successHue.300",
          warning: "warningHue.300",
          danger: "dangerHue.300",
          primaryEmphasis: "primaryHue.700",
          successEmphasis: "successHue.700",
          warningEmphasis: "warningHue.700",
          dangerEmphasis: "dangerHue.700",
          disabled: "neutralHue.300"
        },
        foreground: {
          default: "neutralHue.900",
          subtle: "neutralHue.700",
          onEmphasis: "palette.white",
          primary: "primaryHue.700",
          success: "successHue.700",
          warning: "warningHue.700",
          danger: "dangerHue.700",
          successEmphasis: "successHue.900",
          warningEmphasis: "warningHue.900",
          dangerEmphasis: "dangerHue.900",
          disabled: "neutralHue.600"
        },
        shadow: {
          small: "rgba(neutralHue.1200, 200)",
          medium: "rgba(neutralHue.1200, 200)",
          large: "rgba(neutralHue.1200, 200)"
        }
      }
    }
  },
  components: {
      "buttons.anchor": css`
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
      "buttons.button": css`
        ${(props: IButtonProps) =>
          props.isPrimary &&
          css`
            color: #515ba5;
          `}
      `,
    },
  fonts: {
    mono: "SFMono-Regular,Consolas,\"Liberation Mono\",Menlo,Courier,monospace",
    system: "Quicksand, Arial, Helvetica, sans-serif"
  },
  fontSizes: {
    xs: "10px",
    sm: "12px",
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
  opacity: {
    100: 0.08,
    200: 0.16,
    300: 0.24,
    400: 0.32,
    500: 0.4,
    600: 0.48,
    700: 0.56,
    800: 0.64,
    900: 0.72,
    1000: 0.8,
    1100: 0.88,
    1200: 0.96
  },
  palette: { /* see API for details */ },
  rtl: document.dir === "rtl",
  shadowWidths: {
    xs: "1px",
    sm: "2px",
    md: "3px"
  },
  shadows: {
    xs: " => expression",
    sm: " => expression",
    md: " => expression",
    lg: "(e,t,n) => expression"
  },
  space: {
    base: 4,
    xxs: "4px",
    xs: "8px",
    sm: "12px",
    md: "20px",
    lg: "32px",
    xl: "40px",
    xxl: "48px"
  }








  };
}
