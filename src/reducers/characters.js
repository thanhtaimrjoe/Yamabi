import {
  ADD_NEW_CHARACTER,
  CLEAN_CHARACTERS,
  DELETE_CHARACTER,
  FETCH_CHARACTERS,
  UPDATE_CHARACTER,
} from "../constants/ActionTypes";
var initialState = [];

const findIndex = (characters, characterID) => {
  var result = -1;
  // eslint-disable-next-line
  characters.map((character, index) => {
    if (character.characterID === characterID) {
      result = index;
    }
  });
  return result;
};

var index = -1;
const myReducers = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CHARACTERS:
      return action.characters;
    case CLEAN_CHARACTERS:
      state = initialState;
      return state;
    case ADD_NEW_CHARACTER:
      state.push(action.newCharacter);
      return [...state];
    case DELETE_CHARACTER:
      var { deletedCharacter } = action;
      index = findIndex(state, deletedCharacter.characterID);
      if (index !== -1) {
        state.splice(index, 1);
      }
      return [...state];
    case UPDATE_CHARACTER:
      var { updatedCharacter } = action;
      index = findIndex(state, updatedCharacter.characterID);
      if (index !== -1) {
        state[index] = updatedCharacter;
      }
      return [...state];
    default:
      return state;
  }
};
export default myReducers;
