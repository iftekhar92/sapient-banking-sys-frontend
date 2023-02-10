import { modal } from "../../libs/initialState";
import { ON_CLOSE_MODAL, ON_OPEN_MODAL } from "../../constants";

const modalReducer = (
  action: { type: string; payload: any },
  state = modal
) => {
  switch (action.type) {
    case ON_CLOSE_MODAL:
      return { ...modal };
    case ON_OPEN_MODAL:
      return { ...action.payload };
    default:
      return state;
  }
};

export default modalReducer;
