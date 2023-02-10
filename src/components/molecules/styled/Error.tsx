import styled, { css } from "styled-components";

const errorStyle = styled.div`
  ${(props) => css`
    width: 100%;

    .unauth,
    .error,
    .process {
      display: flex;
      flex-direction: row;
      align-items: center;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 300px;
      box-shadow: ${props.theme.shadow.light};
      padding: ${props.theme.specing.spaceS};

      .msg {
        padding-left: 0.5em;
      }
    }
  `};
`;

export default errorStyle;
