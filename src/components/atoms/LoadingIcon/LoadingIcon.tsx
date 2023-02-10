import React from "react";

import LoadingIconStyles from "./LoadingIcon.Style";

const LoadingIcon: React.FC = () => {
  return (
    <LoadingIconStyles className="loading-icon-container">
      <div className="loading-icon" />
    </LoadingIconStyles>
  );
};

export default LoadingIcon;
