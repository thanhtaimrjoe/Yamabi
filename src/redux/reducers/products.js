import { FETCH_ALL_PRODUCT } from "../../constants/product";

var initialState = [];

const myReducers = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_PRODUCT:
      return action.products;
    default:
      return state;
  }
};
export default myReducers;
