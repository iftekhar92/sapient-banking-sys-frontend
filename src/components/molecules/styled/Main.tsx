import styled, { css } from "styled-components";

const Main = styled.main`
  ${(props) => css`
    width: 100%;
    background-color: ${props.theme.solidColors.white};

    .container {
      display: flex;
      flex-direction: column;
      z-index: ${props.theme.zIndices.innerContainer};

      .inner-content {
        display: flex;
        flex-direction: row;
        height: calc(100vh - 70px);
        overflow: auto;
      }
    }
  `}
`;

export default Main;
