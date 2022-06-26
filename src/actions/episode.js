import { ADD_NEW_EPISODE, CLEAN_EPISODES, FETCH_EPISODES } from "../constants/ActionTypes";
import { addNewEpisode, fetchEpisodesByID } from "../utils/episode";

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

export const actCleanEpisodes = () => {
  return {
    type: CLEAN_EPISODES,
  };
};

export const actAddNewEpisodeRequest = (episode, file) => {
  return async (dispatch) => {
    const newEpisode = await addNewEpisode("episode", episode, file);
    dispatch(actAddNewEpisode(newEpisode));
  };
};

export const actAddNewEpisode = (newEpisode) => {
  return {
    type: ADD_NEW_EPISODE,
    newEpisode
  };
};