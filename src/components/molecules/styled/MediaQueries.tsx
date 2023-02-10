import { css } from "styled-components";

interface ObjectKeys {
  [key: string | number]: string | number;
}

interface breakpoints extends ObjectKeys {
  normalPhoneUp: number;
  smallTabletUp: number;
  tabletUp: number;
  desktopUp: number;
  lgDesktopUp: number;
  xLgDesktopUp: number;
  xxLgDesktopUp: number;
}

const definedBreakpoints: breakpoints = {
  // Numerical values will result in a min-width query
  normalPhoneUp: 350,
  smallTabletUp: 600,
  tabletUp: 768,
  desktopUp: 900,
  lgDesktopUp: 1100,
  xLgDesktopUp: 1400,
  xxLgDesktopUp: 1600,
};

const mq = Object.keys(definedBreakpoints).reduce(
  (accumulator: { [key: string]: any }, label: string) => {
    const prefix =
      typeof definedBreakpoints[label] === "string" ? "" : "min-width:";
    const suffix = typeof definedBreakpoints[label] === "string" ? "" : "px";
    const query =
      typeof definedBreakpoints[label] === "string"
        ? definedBreakpoints[label]
        : `(${prefix + definedBreakpoints[label] + suffix})`;

    accumulator[label] = (styles: any) => css`
      @media screen and ${query} {
        ${styles};
      }
    `;
    return accumulator;
  },
  {}
);

export default mq;
