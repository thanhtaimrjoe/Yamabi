import { combineReducers } from "redux";
import user from "./reducers/user";
import products from "./reducers/products";
import product from "./reducers/product";
import categories from "./reducers/categories";
import episodes from "./reducers/episodes";
import characters from "./reducers/characters";

const myReducers = combineReducers({
  user,
  products,
  product,
  categories,
  episodes,
  characters,
});

export default myReducers;
