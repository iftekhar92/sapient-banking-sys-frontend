import styled from "styled-components";

import settings from "../../../theme/settings";

export const StyledExternal = styled.a`
  text-decoration: none;
  font-size: ${settings.fontSize.fontSizeSmall};
  color: ${settings.solidColors.blue};
  &.align-center {
    text-align: center;
  }
  &:hover {
    cursor: pointer;
    color: ${settings.solidColors.blue};
  }
`;

export const Styled = styled.span`
  display: flex;
  &.align-center {
    justify-content: center;
  }
  a {
    text-decoration: none;
    font-size: ${settings.fontSize.fontSizeSmall};
    color: ${settings.solidColors.blue};

    &.align-center {
      text-align: center;
    }
    &:hover {
      cursor: pointer;
      color: ${settings.solidColors.blue};
    }
  }
`;
