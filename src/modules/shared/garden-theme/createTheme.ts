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
    rtl: document.dir === "rtl",
    colors: {
      ...DEFAULT_THEME.colors,
      background: "#FFFFFF",
      foreground: "#0f172a",
      primaryHue: "#515ba5",
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
  };
}
