import { FETCH_PRODUCTS } from "../constants/ActionTypes";
var initialState = [];

const myReducers = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return action.products;
    default:
      return state;
  }
};
export default myReducers;
