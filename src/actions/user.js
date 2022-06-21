import { CLEAR_USER, GET_USER } from "../constants/ActionTypes";
import { checkUser } from "../utils/firebaseAction";

export const actCheckUserRequest = (user) => {
  return async (dispatch) => {
    const result = await checkUser("user", user);
    dispatch(actFetchUser(result));
  };
};

export const actFetchUser = (user) => {
  return {
    type: GET_USER,
    user,
  };
};

export const actClearUser = () => {
  return {
    type: CLEAR_USER,
  };
};
