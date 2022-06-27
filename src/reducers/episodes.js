import {
  ADD_NEW_EPISODE,
  CLEAN_EPISODES,
  DELETE_EPISODE,
  FETCH_EPISODES,
} from "../constants/ActionTypes";
var initialState = [];

const findIndex = (episodes, episodeID) => {
  var result = -1;
  // eslint-disable-next-line
  episodes.map((episode, index) => {
    if (episode.episodeID === episodeID) {
      result = index;
    }
  });
  return result;
};

var index = -1;
const myReducers = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_EPISODES:
      return action.episodes;
    case CLEAN_EPISODES:
      state = initialState;
      return state;
    case ADD_NEW_EPISODE:
      state.push(action.newEpisode);
      return [...state];
    case DELETE_EPISODE:
      var { deletedEpisode } = action;
      index = findIndex(state, deletedEpisode.episodeID);
      if (index !== -1) {
        state.splice(index, 1);
      }
      return [...state];
    default:
      return state;
  }
};
export default myReducers;
