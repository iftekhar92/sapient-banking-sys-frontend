import React from "react";

import TextAreaStyle from "./TextArea.Style";

type Props = {
  customClass?: string;
  rest?: any;
  isDisabled?: boolean;
};

const TextArea: React.FC<Props> = ({ customClass, rest, isDisabled }) => (
  <TextAreaStyle
    className={`form-control ${customClass}`}
    {...rest}
    readOnly={isDisabled}
  />
);

TextArea.defaultProps = {
  customClass: "",
  rest: {},
  isDisabled: false,
};

export default TextArea;
