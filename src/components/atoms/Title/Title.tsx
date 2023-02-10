import React from "react";

import TitleStyle from "./Title.Style";

type Props = {
  children: React.ReactNode;
  customClass?: string;
};

const Title: React.FC<Props> = ({ children, customClass }) => (
  <TitleStyle className={customClass}>{children}</TitleStyle>
);

Title.defaultProps = {
  customClass: "",
};

export default Title;
