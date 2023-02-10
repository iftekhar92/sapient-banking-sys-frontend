import styled, { css } from "styled-components";

export const TextStyle = styled.p`
  ${(props) => css`
    font-size: ${props.theme.fontSize.fontSizeBody};
    color: ${props.theme.solidColors.black3};
    padding: 0;
    margin: 0;
  `};
`;
