import styled, { css } from "styled-components";

const imageStyle = styled.img`
  ${(props) => css`
    max-height: 100%;
    padding: 0;
    margin: 0;

    &.with-border {
      border: 1px solid ${props.theme.solidColors.darkGray};
    }

    &.profile {
      width: ${props.theme.icons.iconXs};
      height: ${props.theme.icons.iconXs};
      &-list {
        img,
        svg {
          width: ${props.theme.icons.iconM};
          height: ${props.theme.icons.iconM};
        }
      }
    }

    &.Xsmall {
      width: ${props.theme.icons.iconXs};
      height: ${props.theme.icons.iconXs};
    }
    &.small {
      width: ${props.theme.icons.small};
      height: ${props.theme.icons.small};
    }
    &.iconM {
      width: ${props.theme.icons.iconM};
      height: ${props.theme.icons.iconM};
    }
    &.iconL {
      width: ${props.theme.icons.iconL};
      height: ${props.theme.icons.iconL};
    }
    &.iconXl {
      width: ${props.theme.icons.iconXl};
      height: ${props.theme.icons.iconXl};
    }
    &.setHeight {
      max-width: 100%;
      height: ${props.theme.icons.iconXl};
    }
    &.round {
      border-radius: ${props.theme.specing.spaceXxl};
    }
  `};
`;

export default imageStyle;
