import { combineReducers } from "redux";
import user from "./reducers/user";
import products from "./reducers/products";
import product from "./reducers/product";
import categories from "./reducers/categories";

const myReducers = combineReducers({
  user,
  products,
  product,
  categories,
});

export default myReducers;
