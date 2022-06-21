import {
  ADD_NEW_CATEGORY,
  DELETE_CATEGORY,
  FETCH_CATEGORIES,
  UPDATE_CATEGORY,
} from "../constants/ActionTypes";
var initialState = [];

const findIndex = (categories, categoryID) => {
  var result = -1;
  categories.map((category, index) => {
    if (category.id === categoryID) {
      result = index;
    }
  });
  return result;
};

const myReducers = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CATEGORIES:
      return action.categories;
    case UPDATE_CATEGORY:
      return [...state];
    case ADD_NEW_CATEGORY:
      state.push(action.newCategory);
      return [...state];
    case DELETE_CATEGORY:
      var { deletedCategory } = action;
      var index = findIndex(state, deletedCategory.id);
      if (index !== -1) {
        state.splice(index, 1);
      }
      return [...state];
    default:
      return state;
  }
};
export default myReducers;
