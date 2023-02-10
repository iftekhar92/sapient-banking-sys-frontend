import styled, { css } from "styled-components";

type ModalStyleProps = {
  width?: string;
};

const ModalStyle = styled.div<ModalStyleProps>`
  ${(props) => css`
    z-index: ${props.theme.zIndices.modal};
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(45, 52, 57, 0.7);
    display: flex;

    .modal-container {
      padding: ${props.theme.specing.spaceL};
      width: ${props.width || "30em"};
      align-self: center;
      margin: auto;
      background-color: #fff;
      max-height: calc(100vh - 70px);
      overflow-y: scroll;
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      .close {
        position: absolute;
        top: 10px;
        right: 10px;
      }
      .modal-btn {
        width:fit-content;
      }
      .content {
        // margin: ${props.theme.specing.spaceL} 0;
        max-height: calc(100vh - 110px);
        display: flex;
        flex-direction: column;
      }
      .btn {
        display: flex;
      }
    }
  `}
`;

export default ModalStyle;
