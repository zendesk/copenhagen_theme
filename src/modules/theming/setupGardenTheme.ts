import { DEFAULT_THEME } from "@zendeskgarden/react-theming";
import { css } from "styled-components";

export let theme = DEFAULT_THEME;

interface SetupGardenThemeProps {
  textColor: string;
  brandColor: string;
  linkColor: string;
  hoverLinkColor: string;
  visitedLinkColor: string;
}

export function setupGardenTheme({
  textColor,
  brandColor,
  linkColor,
  hoverLinkColor,
  visitedLinkColor,
}: SetupGardenThemeProps) {
  theme = {
    ...DEFAULT_THEME,
    colors: {
      ...DEFAULT_THEME.colors,
      foreground: textColor,
      primaryHue: brandColor,
    },
    components: {
      "buttons.anchor": css`
        color: ${linkColor};

        :hover,
        :active,
        :focus {
          color: ${hoverLinkColor};
        }

        &:visited {
          color: ${visitedLinkColor};
        }
      `,
    },
  };
}
