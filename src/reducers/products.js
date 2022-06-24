import { ADD_NEW_PRODUCT, FETCH_PRODUCTS } from "../constants/ActionTypes";
var initialState = [];

// const findIndex = (categories, productID) => {
//   var result = -1;
//   // eslint-disable-next-line
//   categories.map((category, index) => {
//     if (category.productID === productID) {
//       result = index;
//     }
//   });
//   return result;
// };

// var index = -1;
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
