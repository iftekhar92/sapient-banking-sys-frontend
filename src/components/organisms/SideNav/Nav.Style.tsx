import styled, { css } from "styled-components";
import mq from "../../molecules/styled/MediaQueries";

const navStyle = styled.nav`
  ${(props) => css`
    background-color: ${props.theme.solidColors.blue8};
    color: ${props.theme.solidColors.white};
    padding: 0;
    margin: 0;
    width: 60vw;
    ${mq.smallTabletUp(css`
      width: 15%;
    `)};

    ul {
      margin: 0;
      padding: 0;
      max-height: 400px;
      overflow-y: scroll;
      scrollbar-width: none; /* Firefox */
      -ms-overflow-style: none; /* Internet Explorer 10+ */
      &::-webkit-scrollbar {
        /* WebKit */
        width: 0;
        height: 0;
      }

      ${mq.smallTabletUp(css`
        max-height: 90vh;
      `)};

      li {
        border-bottom: 1px solid white;
        padding: 0.5em 0;

        a {
          color: ${props.theme.solidColors.white};
          margin: 0 2em 0 0.5em;
          display: flex;
          flex-direction: row;
          justify-content: start;
          align-items: center;

          span {
            margin-left: 0.25em;
          }
        }
      }
    }
  `}
`;

export default navStyle;
