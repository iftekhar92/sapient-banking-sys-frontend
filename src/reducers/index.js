import userReducer from "./User/UserReducer";
import modalReducer from "./Modal/ModalReducer";
import messageReducer from "./Message/MessageReducer";

const reducerWithMiddleWare = ({ user, modal, message }, action) => {
  console.log("action: ", action);
  return {
    user: userReducer(action, user),
    modal: modalReducer(action, modal),
    message: messageReducer(action, message),
  };
};

export default reducerWithMiddleWare;
