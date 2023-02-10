import styled, { css } from "styled-components";

type StyledContainerProps = {
  maxWidth?: string | "400px";
  alignCenter?: Boolean | true;
};

export const AdminWithoutLogInContainer = styled.div<StyledContainerProps>`
  ${(props) => css`
    max-width: ${props.maxWidth};
    width: 100%;
  `};
  ${(props) =>
    props.alignCenter &&
    css`
      display: flex;
      flex-direction: column;
      align-self: center;
      align-items: center;
    `};
    position: fixed;
     top: 50%;
     left: 50%;
     transform: translate(-50%, -50%);
`;
