import { combineReducers } from "redux";
import user from "./reducers/user";
import products from "./reducers/products";

const myReducers = combineReducers({
  user,
  products,
});

export default myReducers;
