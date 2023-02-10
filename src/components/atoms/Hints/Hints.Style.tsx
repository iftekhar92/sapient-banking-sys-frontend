import styled, { css } from "styled-components";

import settings from "../../../theme/settings";

type Props = {
  color?: string;
};

const HintsStyle = styled.span<Props>`
  ${(props) => css`
    margin: 0;
    padding: 0 0 ${settings.specing.spaceXxs} 0;
    font-size: ${settings.fontSize.fontSizeXsmall};
    color: ${props.color || settings.solidColors.blue8};
  `};
`;

export default HintsStyle;
