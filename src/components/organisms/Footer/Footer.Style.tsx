import styled, { css } from "styled-components";

export const FooterStyle = styled.footer`
  ${(props) => css`
    z-index: ${props.theme.zIndices.footer};
    height: 20px;
    background-color: ${props.theme.solidColors.black};
    color: ${props.theme.solidColors.white};
    text-align: center;
  `}
`;

export default FooterStyle;
