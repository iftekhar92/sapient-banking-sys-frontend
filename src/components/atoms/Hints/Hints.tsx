import React from "react";

import HintsStyle from "./Hints.Style";

type Props = {
  children: React.ReactNode | string;
  customClass?: string;
  color?: string;
  ariaLabel?: string;
};

const Hints: React.FC<Props> = ({ children, customClass, color, ariaLabel }) =>
children ? (
    <HintsStyle className={customClass} aria-label={ariaLabel} color={color}>
      {children}
    </HintsStyle>
  ) : null;

Hints.defaultProps = {
  customClass: "",
  color: "",
  ariaLabel: "hints",
};

export default Hints;
