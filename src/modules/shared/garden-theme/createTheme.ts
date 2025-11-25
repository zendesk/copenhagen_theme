import type { IButtonProps } from "@zendeskgarden/react-buttons";
import type { IGardenTheme } from "@zendeskgarden/react-theming";
import { DEFAULT_THEME, getColor } from "@zendeskgarden/react-theming";
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

const createAccessibleFormControlStyle = (isWrapper: boolean) => {
  const invalidSelector = isWrapper
    ? ':has(input[aria-invalid="true"])'
    : '[aria-invalid="true"]';

  return css`
    /* Boost default border contrast - use :not() to preserve validation colors */
    &:not(${invalidSelector}) {
      border-color: ${(p) =>
        getColor({
          theme: p.theme,
          variable: "border.default",
          dark: { offset: -100 },
          light: { offset: 300 },
        })};
    }

    /* Enhanced hover state */
    &:hover:not(${invalidSelector}) {
      border-color: ${(p) =>
        getColor({
          theme: p.theme,
          variable: "border.primaryEmphasis",
          dark: { offset: -100 },
          light: { offset: 100 },
        })};
    }
  `;
};

const accessibleFormInputStyle = createAccessibleFormControlStyle(false);
const accessibleFormWrapperStyle = createAccessibleFormControlStyle(true);

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
      "forms.input": accessibleFormInputStyle,
      "forms.textarea": accessibleFormInputStyle,
      "forms.faux_input": accessibleFormInputStyle,
      "dropdowns.combobox.trigger": accessibleFormWrapperStyle,
    },
  };
}
