import React from "react";
import parse, { domToReact } from "html-react-parser";

import MessageStyle from "./Message.Style";
import Anchor from "../../atoms/Anchor/Anchor";

type Props = {
  children: any;
  customClass?: string;
};

const options: any = {
  replace: (domNode: { attribs: any; children: any }) => {
    if (domNode?.attribs?.id === "reset-password") {
      return (
        <>
          <Anchor
            isExternal={true}
            href={`/set-password/${domNode?.attribs?.class}`}
            customClass="link-text"
          >
            here
          </Anchor>{" "}
          {domToReact(domNode.children, options)}
        </>
      );
    }
  },
};

const Message: React.FC<Props> = ({ children, customClass = "" }) => {
  return (
    <MessageStyle className={customClass}>
      {parse(children, options)}
    </MessageStyle>
  );
};

export default Message;
