import { FETCH_ALL_CATEGORY } from "../../constants/category";
import { fetchAllCategory } from "../../services/category";

export const actFetchAllCategoryRequest = () => {
  return async (dispatch) => {
    const categories = await fetchAllCategory("category");
    dispatch(actFetchAllCategory(categories));
  };
};

const actFetchAllCategory = (categories) => {
  return {
    type: FETCH_ALL_CATEGORY,
    categories,
  };
};
