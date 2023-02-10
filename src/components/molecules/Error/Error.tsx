import React from "react";
import { TbError404 } from "react-icons/tb";
import { FcProcess } from "react-icons/fc";
import { GrInsecure } from "react-icons/gr";

import ErrorStyle from "../styled/Error";

type Props = {
  message?: string;
  className: string;
  type: number;
};

const Error: React.FC<Props> = (props) => {
  const { type, className } = props;
  let msg = "Something went wrong";
  let IconComponent = TbError404;
  if (type === 404) {
    msg = props?.message || "Sorry, page not found!";
  }
  if (type === 200) {
    msg = props?.message || "Processing";
    IconComponent = FcProcess;
  }
  if (type === 201) {
    msg = props?.message || "Authentication failed!";
    IconComponent = GrInsecure;
  }

  return (
    <ErrorStyle>
      <div className={className}>
        <IconComponent size={30} title={className} />
        <div className="msg">{msg}</div>
      </div>
    </ErrorStyle>
  );
};

export default Error;
