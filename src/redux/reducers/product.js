import { FETCH_PRODUCT_INFO } from "../../constants/product";

var initialState = {};

const myReducers = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCT_INFO:
      return action.product;
    default:
      return state;
  }
};
export default myReducers;
