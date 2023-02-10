import React from "react";

import RadioStyle from "./Radio.Style";

type Props = {
  customClass?: string;
  type: "radio";
  rest: any;
  isDisabled?: boolean;
  areaLabel?: string;
  value?: any;
};

const Radio: React.FC<Props> = (props) => {
  const { customClass, value, rest, type, isDisabled, areaLabel } = props;
  return (
    <RadioStyle
      type={type}
      area-label={areaLabel}
      className={`form-control ${customClass}`}
      value={value}
      {...rest}
      readOnly={isDisabled}
    />
  );
};

Radio.defaultProps = {
  customClass: "",
  rest: {},
  isDisabled: false,
  areaLabel: "",
  value: "",
};

export default Radio;
