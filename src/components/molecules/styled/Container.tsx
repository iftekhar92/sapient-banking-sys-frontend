import styled, { css } from "styled-components";
import mq from "./MediaQueries";

const Container = styled.div`
  ${(props) => css`
    display: flex;
    flex-direction: column;
    margin: ${props.theme.specing.spaceXxxs};
    &.no-margin {
      margin: 0;
    }
    &.right-side {
      width: 98%;
      ${mq.smallTabletUp(css`
        width: 85%;
      `)};
    }
    .align-center {
      flex-direction: row;
      justify-content: center;
    }
    .icon-with-link {
      svg {
        margin-right: ${props.theme.specing.spaceXxxs};
      }
    }
  `};
`;

export default Container;
