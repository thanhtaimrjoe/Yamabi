import { FETCH_CHARACTERS_BY_PRODUCT_ID } from "../../constants/character";
import { fetchCharactersByID } from "../../services/character";

export const actFetchCharactersByProductIDRequest = (productID) => {
  return async (dispatch) => {
    const result = await fetchCharactersByID("character", productID);
    dispatch(actFetchCharactersByProductID(result));
  };
};

const actFetchCharactersByProductID = (characters) => {
  return {
    type: FETCH_CHARACTERS_BY_PRODUCT_ID,
    characters,
  };
};
