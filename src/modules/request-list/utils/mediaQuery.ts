import type { FlattenSimpleInterpolation } from "styled-components";
import styled, { css } from "styled-components";

const breakpoint = {
  mobile: 768,
  desktop: 1024,
};

const query = {
  mobile: `(max-width: ${breakpoint.mobile}px)`,
  desktop: `(min-width: ${breakpoint.mobile + 1}px)`,
};

export const media = {
  mobile: (template: TemplateStringsArray): FlattenSimpleInterpolation =>
    css`
      @media screen and ${query.mobile} {
        ${css(template)}
      }
    `,
  desktop: (template: TemplateStringsArray): FlattenSimpleInterpolation =>
    css`
      @media screen and ${query.desktop} {
        ${css(template)}
      }
    `,
};

export const Mobile = styled.div`
  ${media.desktop`display: none;`}
`;

export const Desktop = styled.div`
  ${media.mobile`display: none;`}
`;

export const isMobile = (): boolean => matchMedia(query.mobile).matches;

export const isDesktop = (): boolean => matchMedia(query.desktop).matches;
