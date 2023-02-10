import styled, { css } from "styled-components";

import mq from "./MediaQueries";

type Props = {
  hasBorder?: boolean;
  hasShadow?: boolean;
};

const SubHeader = styled.div<Props>`
  ${(props) => css`
    display: flex;
    flex-direction: column;
    border: none;
    padding: ${props.theme.specing.spaceXxs};
    justify-content: space-between;
    ${props.hasBorder &&
    css`
      border-bottom: 1px solid ${props.theme.solidColors.blue8};
    `};
    ${mq.tabletUp(css`
      flex-direction: row;
    `)};
    ${props.hasShadow &&
    css`
      box-shadow: ${props.theme.shadow.light};
      padding: ${props.theme.specing.spaceXxs};
      margin: ${props.theme.specing.spaceXxs};
    `};
  `}
`;

export default SubHeader;
