import styled, { css } from "styled-components";

import mq from "../../molecules/styled/MediaQueries";

const InputStyle = styled.select`
  ${() => css`
    width: 100%;
    ${mq.smallTabletUp(css`
      width: 315px !important;
    `)};
  `};
  &.xsmall {
    ${mq.smallTabletUp(css`
      max-width: 265px !important;
    `)};
  }
`;

export default InputStyle;
