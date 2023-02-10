import styled, { css } from "styled-components";

const logoStyle = styled.div`
  ${(props) => css`
    max-height: 100%;

    .text-logo {
      font-size: ${props.theme.fontSize.fontSizeH1};
      padding: 0;
      margin: 0;
      color: ${props.theme.solidColors.white};
    }

    .logo {
      height: 50px;
    }
  `};
`;

export default logoStyle;
