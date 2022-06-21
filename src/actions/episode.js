import { FETCH_EPISODES } from "../constants/ActionTypes";
import { fetchEpisodesByID } from "../utils/firebaseAction";

export const actFetchEpisodesRequest = (productID) => {
  return async (dispatch) => {
    const result = await fetchEpisodesByID("episode", productID);
    dispatch(actFetchEpisodes(result));
  };
};

export const actFetchEpisodes = (episodes) => {
  return {
    type: FETCH_EPISODES,
    episodes,
  };
};
