import styled, { css } from "styled-components";

type StyledHeadingProps = {
  color?: string;
  padding?: string;
  align?: string;
};

export const HeadingH1 = styled.h1<StyledHeadingProps>`
  ${(props) => css`
    font-size: ${props.theme.fontSize.fontSizeH1};
    color: ${props.color || props.theme.solidColors.black};
    padding: ${props.padding || props.theme.specing.spaceS};
    margin: 0;
    display: flex;
    align-items: ${props.align || "center"};
    justify-content: ${props.align || "center"};
    svg{
      margin-left: ${props.theme.specing.spaceXxxs};
    }
  `};
`;

export const HeadingH2 = styled.h2<StyledHeadingProps>`
  ${(props) => css`
    font-size: ${props.theme.fontSize.fontSizeH2};
    color: ${props.color || props.theme.solidColors.black};
    padding: ${props.padding || props.theme.specing.spaceXs};
    margin: 0;
    display: flex;
    align-items: ${props.align || "center"};
    justify-content: ${props.align || "center"};
    svg{
      margin-left: ${props.theme.specing.spaceXxxs};
    }
  `};
`;
export const HeadingH3 = styled.h3<StyledHeadingProps>`
  ${(props) => css`
    font-size: ${props.theme.fontSize.fontSizeH3};
    color: ${props.color || props.theme.solidColors.black};
    padding: ${props.padding || props.theme.specing.spaceXxs};
    margin: 0;
    display: flex;
    align-items: ${props.align || "center"};
    justify-content: ${props.align || "center"};
    svg{
      margin-left: ${props.theme.specing.spaceXxxs};
    }
  `};
`;
export const HeadingH4 = styled.h4<StyledHeadingProps>`
  ${(props) => css`
    font-size: ${props.theme.fontSize.fontSizeH4};
    color: ${props.color || props.theme.solidColors.black};
    padding: ${props.padding || props.theme.specing.spaceXxs};
    margin: 0;
    display: flex;
    align-items: ${props.align || "center"};
    justify-content: ${props.align || "center"};
    svg{
      margin-left: ${props.theme.specing.spaceXxxs};
    }
  `};
`;
export const HeadingH5 = styled.h5<StyledHeadingProps>`
  ${(props) => css`
    font-size: ${props.theme.fontSize.fontSizeH5};
    color: ${props.color || props.theme.solidColors.black};
    padding: ${props.padding || props.theme.specing.spaceXxs};
    margin: 0;
    display: flex;
    align-items: ${props.align || "center"};
    justify-content: ${props.align || "center"};
    svg{
      margin-left: ${props.theme.specing.spaceXxxs};
    }
  `};
`;
export const HeadingH6 = styled.h6<StyledHeadingProps>`
  ${(props) => css`
    font-size: ${props.theme.fontSize.fontSizeH6};
    color: ${props.color || props.theme.solidColors.black};
    padding: ${props.padding || props.theme.specing.spaceXxs};
    margin: 0;
    display: flex;
    align-items: ${props.align || "center"};
    justify-content: ${props.align || "center"};
    svg{
      margin-left: ${props.theme.specing.spaceXxxs};
    }
  `};
`;
export const BodyText = styled.p<StyledHeadingProps>`
  ${(props) => css`
    font-size: ${props.theme.fontSize.fontSizeBody};
    color: ${props.color || props.theme.solidColors.black};
    padding: ${props.padding || props.theme.specing.spaceXxxs};
    margin: 0;
    display: flex;
    align-items: ${props.align || "center"};
    justify-content: ${props.align || "center"};
    svg{
      margin-left: ${props.theme.specing.spaceXxxs};
    }
  `};
`;
export const SmallText = styled.p<StyledHeadingProps>`
  ${(props) => css`
    font-size: ${props.theme.fontSize.fontSizeSmall};
    color: ${props.color || props.theme.solidColors.black};
    padding: ${props.padding || props.theme.specing.spaceXxxs};
    margin: 0;
    display: flex;
    align-items: ${props.align || "center"};
    justify-content: ${props.align || "center"};
    svg{
      margin-left: ${props.theme.specing.spaceXxxs};
    }
  `};
`;
export const SmallXText = styled.p<StyledHeadingProps>`
  ${(props) => css`
    font-size: ${props.theme.fontSize.fontSizeXsmall};
    color: ${props.color || props.theme.solidColors.black};
    padding: ${props.padding || props.theme.specing.spaceXxxs};
    margin: 0;
    display: flex;
    align-items: ${props.align || "center"};
    justify-content: ${props.align || "center"};
    svg{
      margin-left: ${props.theme.specing.spaceXxxs};
    }
  `};
`;