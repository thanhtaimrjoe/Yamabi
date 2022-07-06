import { combineReducers } from "redux";
import user from "./reducers/user";

const myReducers = combineReducers({
  user,
});

export default myReducers;
