import React from "react";

import LabelStyle from "./Label.Style";

interface Props {
  children: React.ReactNode;
  htmlFor: string;
  areaLabel?: string;
}

const Label: React.FC<Props> = ({ children, htmlFor, areaLabel }) => {
  return (
    <LabelStyle area-label={areaLabel} isRequired={true} htmlFor={htmlFor}>
      {children}
    </LabelStyle>
  );
};

Label.defaultProps = {
  areaLabel: "",
};

export default Label;
