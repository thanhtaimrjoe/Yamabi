import { combineReducers } from "redux";
import user from "./reducers/user";
import products from "./reducers/products";
import categories from "./reducers/categories";

const myReducers = combineReducers({
  user,
  products,
  categories,
});

export default myReducers;
