import {
  CLEAN_PRODUCT,
  DELETE_PRODUCT,
  FETCH_PRODUCT_INFO,
  UPDATE_PRODUCT,
} from "../constants/ActionTypes";
var initialState = {};

const myReducers = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCT_INFO:
      return action.product;
    case DELETE_PRODUCT:
      state = initialState;
      return state;
    case CLEAN_PRODUCT:
      state = initialState;
      return state;
    case UPDATE_PRODUCT:
      state = action.updatedProduct;
      return state;
    default:
      return state;
  }
};
export default myReducers;
