import styled, { css } from "styled-components";

type StyledLabelProps = {
  fontSize?: string;
  color?: string;
  isRequired?: boolean;
};

const Label = styled.label<StyledLabelProps>`
  ${(props) => css`
    font-size: ${props.fontSize || props.theme.fontSize.fontSizeXsmall};
    color: ${props.color || props.theme.colors.secondary.grey};
    padding: 0 0 ${props.theme.specing.spaceXxxs} 0;
    margin: 0;

    span {
      color: ${props.isRequired
        ? props.theme.solidColors.red
        : props.color || props.theme.colors.secondary.grey};
    }
  `};
`;

export default Label;
