import { ADD_NEW_PRODUCT, FETCH_PRODUCTS } from "../constants/ActionTypes";

var initialState = [];

const myReducers = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return action.products;
    case ADD_NEW_PRODUCT:
      state.push(action.newProduct);
      return [...state];
    default:
      return state;
  }
};
export default myReducers;
