import { CLEAR_USER, SIGN_IN, SIGN_UP } from "../../constants/user";

var data = JSON.parse(localStorage.getItem("user"));

var initialState = data ? data : {};

const myReducers = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN:
      state = action.user;
      return state;
    case SIGN_UP:
      state = action.newUser;
      return state;
    case CLEAR_USER:
      return initialState;
    default:
      return state;
  }
};
export default myReducers;
