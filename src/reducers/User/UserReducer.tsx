import { user } from '../../libs/initialState';
import { SET_USER_LOGGED_IN } from '../../constants';

const userReducer = (action: {type: string, payload:any}, state = user) => {
  switch (action.type) {
    case SET_USER_LOGGED_IN:
      return { ...action.payload };
    default:
      return state;
  }
};

export default userReducer;
