import {
  ADD_NEW_EPISODE,
  CLEAN_EPISODES,
  DELETE_EPISODE,
  FETCH_EPISODES,
  UPDATE_EPISODE,
} from "../constants/ActionTypes";
import {
  addNewEpisode,
  deleteEpisode,
  fetchEpisodesByID,
  updateEpisode,
} from "../utils/episode";

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

export const actAddNewEpisodeRequest = (episode, file, docID) => {
  return async (dispatch) => {
    const newEpisode = await addNewEpisode("episode", episode, file, docID);
    dispatch(actAddNewEpisode(newEpisode));
  };
};

export const actAddNewEpisode = (newEpisode) => {
  return {
    type: ADD_NEW_EPISODE,
    newEpisode,
  };
};

export const actDeleteEpisodeRequest = (episode) => {
  return async (dispatch) => {
    const deletedEpisode = await deleteEpisode("episode", episode);
    dispatch(actDeleteEpisode(deletedEpisode));
  };
};

export const actDeleteEpisode = (deletedEpisode) => {
  return {
    type: DELETE_EPISODE,
    deletedEpisode,
  };
};

export const actUpdateEpisodeRequest = (episode, file) => {
  return async (dispatch) => {
    const updatedEpisode = await updateEpisode("episode", episode, file);
    dispatch(actUpdateEpisode(updatedEpisode));
  };
};

export const actUpdateEpisode = (updatedEpisode) => {
  return {
    type: UPDATE_EPISODE,
    updatedEpisode,
  };
};
