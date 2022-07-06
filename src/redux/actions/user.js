import { signIn } from "../../services/user";
import { CLEAR_USER, SIGN_IN } from "../../constants/user";

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
