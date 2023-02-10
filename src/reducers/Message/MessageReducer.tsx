import { message } from '../../libs/initialState';
import { SET_MESSAGE } from '../../constants';

const messageReducer = (action: {type: string, payload?:any}, state = message) => {
  switch (action.type) {
    case SET_MESSAGE:
      return { ...action.payload };
    default:
      return state;
  }
};

export default messageReducer;
