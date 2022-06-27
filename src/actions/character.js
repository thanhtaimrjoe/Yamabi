import {
  ADD_NEW_CHARACTER,
  CLEAN_CHARACTERS,
  DELETE_CHARACTER,
  FETCH_CHARACTERS,
  UPDATE_CHARACTER,
} from "../constants/ActionTypes";
import {
  addNewCharacter,
  deleteCharacter,
  fetchCharactersByID,
  updateCharacter,
} from "../utils/character";

export const actFetchCharactersRequest = (productID) => {
  return async (dispatch) => {
    const result = await fetchCharactersByID("character", productID);
    dispatch(actFetchCharacters(result));
  };
};

export const actFetchCharacters = (characters) => {
  return {
    type: FETCH_CHARACTERS,
    characters,
  };
};

export const actCleanCharacters = () => {
  return {
    type: CLEAN_CHARACTERS,
  };
};

export const actAddNewCharacterRequest = (character, file, docID) => {
  return async (dispatch) => {
    const newCharacter = await addNewCharacter(
      "character",
      character,
      file,
      docID
    );
    dispatch(actAddNewCharacter(newCharacter));
  };
};

export const actAddNewCharacter = (newCharacter) => {
  return {
    type: ADD_NEW_CHARACTER,
    newCharacter,
  };
};

export const actDeleteCharacterRequest = (character) => {
  return async (dispatch) => {
    const deletedCharacter = await deleteCharacter("character", character);
    dispatch(actDeleteCharacter(deletedCharacter));
  };
};

export const actDeleteCharacter = (deletedCharacter) => {
  return {
    type: DELETE_CHARACTER,
    deletedCharacter,
  };
};

export const actUpdateCharacterRequest = (character, file) => {
  return async (dispatch) => {
    const updatedCharacter = await updateCharacter(
      "character",
      character,
      file
    );
    dispatch(actUpdateCharacter(updatedCharacter));
  };
};

export const actUpdateCharacter = (updatedCharacter) => {
  return {
    type: UPDATE_CHARACTER,
    updatedCharacter,
  };
};
