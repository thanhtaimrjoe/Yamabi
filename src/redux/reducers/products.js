import {
  CLEAR_PRODUCTS,
  FETCH_ALL_PRODUCT,
  FETCH_ALL_PRODUCT_BY_CATEGORY_ID,
} from "../../constants/product";

var initialState = [];

const myReducers = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_PRODUCT_BY_CATEGORY_ID:
      return action.products;
    case CLEAR_PRODUCTS:
      return initialState;
    case FETCH_ALL_PRODUCT:
      return action.products;
    default:
      return state;
  }
};
export default myReducers;
