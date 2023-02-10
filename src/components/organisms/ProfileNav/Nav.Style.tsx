import styled, { css } from "styled-components";

const navStyle = styled.nav`
  ${(props) => css`
    background-color: ${props.theme.solidColors.blue8};
    color: ${props.theme.solidColors.white};
    padding: 0;
    margin: 0;

    ul {
      margin: 0;
      padding: 0;

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
