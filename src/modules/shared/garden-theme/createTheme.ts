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
            color: #ffffff;
            background-color: #ff0000;
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
  palette: { /* see API for details */ },
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
    md: "20px",
    lg: "32px",
    xl: "40px",
    xxl: "48px"
  }
  };
}
