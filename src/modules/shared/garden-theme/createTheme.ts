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
        padding: 16px 38px;
        font-size: 0.875em;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.12s ease-in-out, border-color 0.12s ease-in-out, color 0.15s ease-in-out;
        display: inline-block;
        line-height: 1;
        text-align: center;
        margin: 0;
        border: 0;
        font-weight: 700;
        -webkit-user-select: none;
        -moz-user-select: none;
        user-select: none;
        white-space: nowrap;
        width: 100%;
        -webkit-touch-callout: none;

        ${(props: IButtonProps) =>
          props.isPrimary &&
          css`
            color: #ffffff;
            background-color: #515ba5;
            border-radius: 4px;
            :hover,
            :active,
            :focus {
            background-color: #3a3879;}
          `}
      `,
      "forms.faux_input": css`
        background-color: #f1f5f9;
        border: 0;
        border-radius: 0;
      `,
      'forms.input': css`
        background-color: #f1f5f9;
        border: 0;
        border-radius: 0;
      `,
      'typography.paragraph': css`
        margin-top: 0;
      `,
      'forms.file_upload': css`
        background-color: #f1f5f9;
          :hover,
          :active,
          :focus {
            background-color: #d2dae5;
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
    md: "16px",
    lg: "32px",
    xl: "40px",
    xxl: "48px"
  }
  };
}
