import { FETCH_CHARACTERS } from "../constants/ActionTypes";
var initialState = [];

const myReducers = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CHARACTERS:
      return action.characters;
    default:
      return state;
  }
};
export default myReducers;
