import React, { useState } from "react";
import isBase64 from "is-base64";
import { CgProfile } from "react-icons/cg";
import { FiImage } from "react-icons/fi";

import ImageStlye from "./Image.Stlye";

type Props = {
  src?: string;
  name?: string;
  customClass?: string;
  hasBorder?: boolean;
  areaLabel?: string;
  svgWidth?:number;
};

const Image: React.FC<Props> = (props) => {
  const [isOnError, setOnError] = useState(false);
  const { src, name, customClass, hasBorder, areaLabel } = props;
  let imgSrc = "CgProfile";
  if (src) {
    if (isBase64(src, { mimeRequired: true })) {
      imgSrc = src;
    } else {
      imgSrc = src;
    }
  }

  if (isOnError) {
    switch (imgSrc) {
      case "CgProfile":
        return <CgProfile size={props.svgWidth} />;
      case "FiImage":
        return <FiImage size={props.svgWidth} />;
      default:
        return <>{name}</>;
    }
  }

  return (
    <ImageStlye
      src={imgSrc}
      alt={name}
      area-label={areaLabel}
      className={`${customClass} ${hasBorder ? "with-border" : ""}`}
      onError={() => setOnError(true)}
    />
  );
};

Image.defaultProps = {
  src: "",
  name: "",
  customClass: "",
  hasBorder: false,
  areaLabel: "",
  svgWidth: 50
};

export default Image;
