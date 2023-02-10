import React from "react";

import InputStyle from "./Input.Style";

type Props = {
  customClass?: string;
  type: "text" | "email" | "password" | "number" | "file" | "hidden";
  rest: any;
  isDisabled?: boolean;
  areaLabel?: string;
};

const Input: React.FC<Props> = (props) => {
  const { customClass, rest, type, isDisabled, areaLabel } = props;
  return (
    <InputStyle
      type={type}
      area-label={areaLabel}
      className={`form-control ${customClass}`}
      {...rest}
      readOnly={isDisabled}
    />
  );
};

Input.defaultProps = {
  customClass: "",
  rest: {},
  type: "text",
  isDisabled: false,
  areaLabel: "",
};

export default Input;
