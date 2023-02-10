import React from "react";
import { AiOutlineClose } from "react-icons/ai";

import ModalStyle from "./Modal.Style";
import { useStateValue } from "../../../contextWrapper/ContextWrapper";

const Modal: React.FC = () => {
  const [state] = useStateValue();
  const {
    modal: { isOpen, isCloseIcon, content, buttons, onClose, width },
  } = state;
  if (!isOpen) return <></>;
  return (
    <ModalStyle width={width}>
      <div className="modal-container">
        {isCloseIcon && (
          <div className="close">
            <AiOutlineClose size={20} onClick={onClose} />
          </div>
        )}
        {content && <div className="content">{content}</div>}
        {buttons && <div className="btn">{buttons}</div>}
      </div>
    </ModalStyle>
  );
};

export default Modal;
