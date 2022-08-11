import { FETCH_EPISODES_BY_PRODUCT_ID } from "../../constants/episode";

var initialState = [];

const myReducers = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_EPISODES_BY_PRODUCT_ID:
      return action.episodes;
    default:
      return state;
  }
};
export default myReducers;
