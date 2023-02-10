import styled, { css } from "styled-components";

type Props = {
  heightType: "narrow" | "wide";
  widthType: "full" | "small";
  color?: string;
};

const HrStyle = styled.hr<Props>`
  ${(props) => css`
    border-top: none;
    border-left: none;
    border-right: none;
    border-bottom: ${props.heightType === "narrow" ? "1px" : "5px"} solid
      ${props.theme.solidColors[props.color || "blue8"]};
    width: ${props.widthType === "full" ? "100%" : "70px"};
    margin: 0;
    padding: 0;
  `};
`;

export default HrStyle;
