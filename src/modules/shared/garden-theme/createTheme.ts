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
      primaryHue: settings.brand_color,
      variables: {
        ...DEFAULT_THEME.colors.variables,
        light: {
          ...DEFAULT_THEME.colors.variables.light,
          background: {
            ...DEFAULT_THEME.colors.variables.light.background,
            default: settings.background_color,
          },
          foreground: {
            ...DEFAULT_THEME.colors.variables.light.foreground,
            default: settings.text_color,
          },
        },
      },
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
