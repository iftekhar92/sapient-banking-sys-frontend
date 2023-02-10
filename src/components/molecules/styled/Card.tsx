import styled, { css } from "styled-components";

type StyledCardProps = {
  maxWidth?: string;
  display?: string;
  flexDirection?: string;
  justifyContent?: string;
  alignItems?: string;
};

const Card = styled.div<StyledCardProps>`
  ${(props) => css`
    max-width: ${props.maxWidth};
    width: 100%;
    box-shadow: ${props.theme.shadow.light};
    padding: ${props.theme.specing.spaceS};
    display: ${props.display};
    flex-direction: ${props.flexDirection};
    justify-content: ${props.justifyContent};
    align-items: ${props.alignItems};
  `};
  form {
    width: 100%;
  }
`;

Card.defaultProps = {
  maxWidth: "400px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
};

export default Card;
