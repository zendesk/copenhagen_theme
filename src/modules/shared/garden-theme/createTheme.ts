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
      background: settings.background_color,
      foreground: settings.text_color,
      primaryHue: settings.brand_color,
    },
    components: {
      "buttons.anchor": css`
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
      "buttons.button": css`
        ${(props: IButtonProps) =>
          props.isPrimary &&
          css`
            color: ${settings.brand_text_color};
          `}
      `,
    },
  };
}
