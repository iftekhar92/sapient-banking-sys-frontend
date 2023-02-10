import React from "react";
import { Link } from "react-router-dom";

import { Styled, StyledExternal } from "./Anchor.Style";

type Props = {
  customClass?: string;
  wrapperCustomClass?: string;
  children: React.ReactNode | string;
  isExternal?: boolean;
  href: string;
  dataSetType?: string;
  dataSetResource?: string;
  ariaLabel?: string;
  callback?: (event: React.MouseEvent<HTMLElement>) => void;
};

const Anchor: React.FC<Props> = ({
  customClass,
  wrapperCustomClass,
  children,
  isExternal,
  href,
  dataSetType,
  dataSetResource,
  ariaLabel,
  callback,
}) => {
  if (isExternal) {
    return (
      <StyledExternal
        className={`${customClass ? customClass : ""}`}
        href={href}
        data-action-type={dataSetType}
        data-resource={dataSetResource}
        aria-label={ariaLabel}
        title={ariaLabel}
        onClick={callback}
      >
        {children}
      </StyledExternal>
    );
  }
  return (
    <Styled className={`${wrapperCustomClass ? wrapperCustomClass : ""}`}>
      <Link
        to={href}
        className={`${customClass ? customClass : ""}`}
        data-action-type={dataSetType}
        data-resource={dataSetResource}
        area-label={ariaLabel}
        title={ariaLabel}
        onClick={callback}
      >
        {children}
      </Link>
    </Styled>
  );
};

Anchor.defaultProps = {
  customClass: "",
  wrapperCustomClass: "",
  children: "",
  isExternal: false,
  href: "#",
  dataSetType: "",
  dataSetResource: "",
  ariaLabel: "",
  callback: () => {},
};

export default Anchor;
