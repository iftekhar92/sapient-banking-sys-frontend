import React from "react";

import ButtonStyle from "./Button.Style";

type Props = {
  customClass?: string;
  children: React.ReactNode | string;
  buttonType?: "primary" | "secondary";
  dataSetType?: string;
  dataSetResource?: string;
  ariaLabel?: string;
  disabled?: boolean;
  callback?: (event: React.MouseEvent<HTMLElement>) => void;
};

const Button: React.FC<Props> = (props) => {
  const {
    customClass,
    children,
    buttonType,
    dataSetType,
    dataSetResource,
    ariaLabel,
    disabled,
    callback,
  } = props;
  return (
    <ButtonStyle
      className={`btn ${customClass ? customClass : ""}`}
      buttonType={buttonType}
      data-action-type={dataSetType}
      data-resource={dataSetResource}
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={callback}
    >
      {children}
    </ButtonStyle>
  );
};

Button.defaultProps = {
  customClass: "",
  children: "",
  buttonType: "primary",
  dataSetType: "",
  dataSetResource: "",
  ariaLabel: "",
  disabled: false,
  callback: () => {},
};

export default Button;
