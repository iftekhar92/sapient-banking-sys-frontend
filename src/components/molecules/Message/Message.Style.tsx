import styled, { css } from "styled-components";

type StyledMessageProps = {
  className?: string;
};

const StyledMessage = styled.div<StyledMessageProps>`
  ${(props) => css`
    margin: ${props.theme.specing.spaceXxs} 0 0 0;
    padding: ${props.theme.specing.spaceXxs};
    font-size: ${props.theme.fontSize.fontSizeSmall};
    &.error {
      color: ${props.theme.solidColors.red};
      font-size: ${props.theme.fontSize.fontSizeXXSmall};
      padding-left: 0;
      padding-top: 0;
      &.bg {
        font-size: ${props.theme.fontSize.fontSizeSmall};
        background-color: ${props.theme.colors.error.bg};
        margin-bottom: ${props.theme.specing.spaceS};
        border-radius: ${props.theme.borderRadius.borderRadius};
        border: ${props.theme.colors.error.border};
        color: ${props.theme.colors.error.color};
        padding: ${props.theme.specing.spaceXxs};
      }
    }
    &.info {
      color: ${props.theme.solidColors.white};
      background-color: ${props.theme.solidColors.yellow};
      margin-bottom: ${props.theme.specing.spaceS};
    }
    &.success {
      color: ${props.theme.solidColors.green};
      margin-bottom: ${props.theme.specing.spaceS};

      &.bg {
        background-color: ${props.theme.colors.success.bg};
        margin-bottom: ${props.theme.specing.spaceS};
        border-radius: ${props.theme.borderRadius.borderRadius};
        border: ${props.theme.colors.success.border};
        color: ${props.theme.colors.success.color};
        padding: ${props.theme.specing.spaceXxs};
      }

    }
    &.icon-with-text {
      display: flex;
      flex-direction: row;
      svg {
        max-width: ${props.theme.icons.iconM};
        max-height: ${props.theme.icons.iconM};
        width: 100%;
        height: 100%;
        margin-right: ${props.theme.specing.spaceXxxs};
      }
    }
  `}
`;

export default StyledMessage;
