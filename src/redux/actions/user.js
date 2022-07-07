import { signIn, signUp } from "../../services/user";
import { CLEAR_USER, SIGN_IN, SIGN_UP } from "../../constants/user";

export const actSignInRequest = (user) => {
  return async (dispatch) => {
    const result = await signIn("user", user);
    dispatch(actSignIn(result));
  };
};

const actSignIn = (user) => {
  return {
    type: SIGN_IN,
    user,
  };
};

export const actClearUser = () => {
  return {
    type: CLEAR_USER,
  };
};

export const actSignUpRequest = (newUser) => {
  return async (dispatch) => {
    const result = await signUp("user", newUser);
    dispatch(actSignUp(result));
  };
};

const actSignUp = (newUser) => {
  return {
    type: SIGN_UP,
    newUser,
  };
};
