import styled, { css } from "styled-components";

type StyledButtonProps = {
  buttonType?: "primary" | "secondary";
};

const StyledButton = styled.button<StyledButtonProps>`
  background-color: rgb(0, 0, 0);
  color: white;
  padding: 0.5em 1em;
  border: none;
  font-size: .9em;
  margin: 0.5em;
  &:hover {
    cursor: pointer;
  }
  &.disabled {
    background-color: grey !important;
  }

  ${props =>
    props.buttonType === "secondary" &&
    css`
      background-color: white;
      color: black;
      border: 1px solid black;
      &:hover {
        background-color: #e9e8e8;
      }
    `}
`;

export default StyledButton;
