import React, { useState } from "react";

import LogoStyle from "./Logo.Style";
import Anchor from "../../atoms/Anchor/Anchor";

type Props = {
  name?: string;
  link: string;
  src: string;
};

const Logo: React.FC<Props> = ({ name, link, src }) => {
  const [isOnError, setOnError] = useState(false);
  return (
    <LogoStyle>
      {isOnError && (
        <Anchor href={link} ariaLabel="Logo">
          <h1 className="text-logo">{name}</h1>
        </Anchor>
      )}
      {!isOnError && (
        <Anchor href={link} ariaLabel="Logo">
          <img
            src={src}
            alt={name}
            className="logo"
            onError={() => setOnError(true)}
          />
        </Anchor>
      )}
    </LogoStyle>
  );
};

Logo.defaultProps = {
  name: "Logo",
  link: "/",
  src: "/images/logo.png",
};

export default Logo;
