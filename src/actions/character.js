import { CLEAN_CHARACTERS, FETCH_CHARACTERS } from "../constants/ActionTypes";
import { fetchCharactersByID } from "../utils/character";

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
