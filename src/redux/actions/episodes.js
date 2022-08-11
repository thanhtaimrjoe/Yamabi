import { FETCH_EPISODES_BY_PRODUCT_ID } from "../../constants/episode";
import { fetchEpisodesByID } from "../../services/episode";

export const actFetchEpisodesByProductIDRequest = (productID) => {
  return async (dispatch) => {
    const result = await fetchEpisodesByID("episode", productID);
    dispatch(actFetchEpisodesByProductID(result));
  };
};

const actFetchEpisodesByProductID = (episodes) => {
  return {
    type: FETCH_EPISODES_BY_PRODUCT_ID,
    episodes,
  };
};
