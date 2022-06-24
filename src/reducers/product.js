import {
  CLEAN_PRODUCT,
  DELETE_PRODUCT,
  FETCH_PRODUCT_INFO,
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
    default:
      return state;
  }
};
export default myReducers;
