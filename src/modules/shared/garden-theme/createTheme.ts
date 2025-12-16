import type { IButtonProps } from "@zendeskgarden/react-buttons";
import type { IGardenTheme } from "@zendeskgarden/react-theming";
import {
  DEFAULT_THEME,
  getColor,
  focusStyles,
} from "@zendeskgarden/react-theming";
import { css } from "styled-components";
import { normalizeColorForGarden } from "./normalizeColorForGarden";

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
    /* Boost default & hover border contrast - use :not() to preserve validation colors */
    &:not(${invalidSelector}),
    &:hover:not(${invalidSelector}) {
      border-color: ${(p) =>
        getColor({
          theme: p.theme,
          variable: "border.default",
          dark: { offset: -100 },
          light: { offset: 300 },
        })};
    }

    /* Change focus indicator color to color in neutral hue */
    ${(p) =>
      focusStyles({
        theme: p.theme,
        selector: `&:focus-visible, &:focus-within:not([aria-disabled="true"])`,
        color: {
          variable: "border.default",
          dark: { offset: -100 },
          light: { offset: 600 },
        },
        styles: {
          borderColor: getColor({
            theme: p.theme,
            variable: "border.default",
            dark: { offset: -200 },
            light: { offset: 400 },
          }),
        },
      })}
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
      primaryHue: normalizeColorForGarden(settings.brand_color),
      variables: {
        ...DEFAULT_THEME.colors.variables,
        light: {
          ...DEFAULT_THEME.colors.variables.light,
          background: {
            ...DEFAULT_THEME.colors.variables.light.background,
            default: normalizeColorForGarden(settings.background_color),
          },
          foreground: {
            ...DEFAULT_THEME.colors.variables.light.foreground,
            default: normalizeColorForGarden(settings.text_color),
          },
        },
      },
    },
    components: {
      "buttons.anchor": css`
        color: ${normalizeColorForGarden(settings.link_color)};

        :hover,
        :active,
        :focus {
          color: ${normalizeColorForGarden(settings.hover_link_color)};
        }

        &:visited {
          color: ${normalizeColorForGarden(settings.visited_link_color)};
        }
      `,
      "buttons.button": css`
        ${(props: IButtonProps) =>
          props.isPrimary &&
          css`
            color: ${normalizeColorForGarden(settings.brand_text_color)};
          `}
      `,
      "forms.input": accessibleFormInputStyle,
      "forms.textarea": accessibleFormInputStyle,
      "forms.faux_input": accessibleFormInputStyle,
      "dropdowns.combobox.trigger": accessibleFormWrapperStyle,
    },
  };
}
