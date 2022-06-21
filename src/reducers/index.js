import { combineReducers } from "redux";
import user from "./user";
import categories from "./categories";
import products from "./products";
import product from "./product";
import episodes from "./episodes";
import characters from "./characters";

const myReducers = combineReducers({
  user,
  categories,
  products,
  product,
  episodes,
  characters,
});

export default myReducers;
