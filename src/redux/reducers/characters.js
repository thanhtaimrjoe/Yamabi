import { FETCH_CHARACTERS_BY_PRODUCT_ID } from "../../constants/character";

var initialState = [];

const myReducers = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CHARACTERS_BY_PRODUCT_ID:
      return action.characters;
    default:
      return state;
  }
};
export default myReducers;
