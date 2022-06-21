import { FETCH_CHARACTERS } from "../constants/ActionTypes";
import { fetchCharactersByID } from "../utils/firebaseAction";

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
