import styled, { css } from "styled-components";

const TitleStyle = styled.h1`
  ${(props) => css`
    font-size: ${props.theme.fontSize.fontSizeSH1};
    color: ${props.theme.solidColors.black3};
    padding: 0;
    margin: 0;
  `};
`;

export default TitleStyle;
