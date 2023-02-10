import styled, { css } from "styled-components";

const headerStyle = styled.div`
  ${(props) => css`
    z-index: ${props.theme.zIndices.header};
    background-color: ${props.theme.solidColors.blue};
    color: ${props.theme.solidColors.white};
    height: 50px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 1em;

    .nav-section {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }

    .top-nav {
      margin-left: 1em;
      position: relative;

      &__menu {
        margin-top: 40px;
        position: absolute;
        top: 0;
        right: -15px;

        &.profile {
          margin-top: 50px;
          right: 1px;
        }
      }
    }
  `}
`;

export default headerStyle;
