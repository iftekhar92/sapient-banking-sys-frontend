import React from "react";

import HrStyle from "./Hr.Style";

type Props = {
  heightType: "narrow" | "wide";
  widthType: "full" | "small";
  color?: string;
  ariaLabel?: string;
};

const Hr: React.FC<Props> = ({
  heightType = "narrow",
  widthType = "full",
  color = "blue8",
  ariaLabel,
}) => (
  <HrStyle
    aria-label={ariaLabel}
    heightType={heightType}
    widthType={widthType}
    color={color}
  />
);

Hr.defaultProps = {
  heightType: "narrow",
  widthType: "full",
  color: "blue8",
  ariaLabel: "",
};

export default Hr;
