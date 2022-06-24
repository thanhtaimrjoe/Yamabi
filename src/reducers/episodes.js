import { CLEAN_EPISODES, FETCH_EPISODES } from "../constants/ActionTypes";
var initialState = [];

const myReducers = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_EPISODES:
      return action.episodes;
    case CLEAN_EPISODES:
      state = initialState;
      return state;
    default:
      return state;
  }
};
export default myReducers;
