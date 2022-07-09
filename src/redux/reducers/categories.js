import { FETCH_ALL_CATEGORY } from "../../constants/category";

var initialState = [];

const myReducers = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_CATEGORY:
      return action.categories;
    default:
      return state;
  }
};
export default myReducers;
