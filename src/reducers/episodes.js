import { FETCH_EPISODES } from "../constants/ActionTypes";
var initialState = [];

const myReducers = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_EPISODES:
      return action.episodes;
    default:
      return state;
  }
};
export default myReducers;
