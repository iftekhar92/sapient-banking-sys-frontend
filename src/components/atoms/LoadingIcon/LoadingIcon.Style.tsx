import styled, { css } from "styled-components";
import { animationsKeyframes } from "../Animations/Animations";

const loadingIconStyles = styled.div`
  ${(props) => css`
    ${animationsKeyframes};
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: ${props.theme.zIndices.loader};

    .loading-icon {
      display: block;
      width: 35px;
      height: 35px;
      background: transparent;
      border: 4px solid ${props.theme.solidColors.lightGray5};
      border-bottom-color: ${props.theme.solidColors.blue6};
      border-radius: 50%;
      transition: all 0.7s ease-in-out;
      animation: spin1 0.75s linear infinite;
      margin: auto;
    }
  `}
`;

export default loadingIconStyles;
