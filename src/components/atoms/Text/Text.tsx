import React from "react";
import parse from "html-react-parser";

import { TextStyle } from "./Text.Style";

type Props = {
  children: any;
  customClass?: string;
};

const Text: React.FC<Props> = ({ children, customClass }) => (
  <TextStyle className={customClass}>{parse(children, {})}</TextStyle>
);

Text.defaultProps = {
  customClass: "",
};

export default Text;
