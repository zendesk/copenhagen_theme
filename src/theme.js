import React from "react";
import PropTypes from "prop-types";
import { ThemeProvider, DEFAULT_THEME } from "@zendeskgarden/react-theming";
import { css } from "styled-components";

const Theme = ({ children }) => {
  // Apply neutral theming for Garden components in modals
  const theme = () => ({
    ...DEFAULT_THEME,
    colors: {
      ...DEFAULT_THEME.colors,
      primaryHue: window.themeSettings.brandColor
    },
    borders: {
      sm: '1px solid #87929D',
      md: '5px solid #87929D',
    },
    components: {
      "dropdowns.faux_input": () => {
        return "border-color: #87929D";
      },
      "buttons.anchor": p => {
        const color = p.isDanger ? "#cc3340" : "#1F73B7"; // Guide-Blue
        return `color: ${color} !important;`;
      },
      "buttons.button": p => {
        if (p.isPrimary) return `background-color: black`;
        if (p.isNeutral)
          return `
            border-color: black !important;
            color: black !important;
          `;

        return `color: black !important`;
      },
      "modals.backdrop": `
        z-index: 2147483647; /* needs to be higher than the z-index of the navbar */
      `
    }
  });
  
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

Theme.propTypes = {
  children: PropTypes.node
};

export default Theme;
