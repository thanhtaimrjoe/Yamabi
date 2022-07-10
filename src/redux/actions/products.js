import { CLEAR_PRODUCTS, FETCH_ALL_PRODUCT_BY_CATEGORY_ID } from "../../constants/product";
import { fetchAllProductByCategoryID } from "../../services/product";

export const actFetchAllProductByCategoryIDRequest = (categoryID) => {
  return async (dispatch) => {
    const products = await fetchAllProductByCategoryID("product", categoryID);
    dispatch(actFetchAllProductByCategoryID(products));
  };
};

const actFetchAllProductByCategoryID = (products) => {
  return {
    type: FETCH_ALL_PRODUCT_BY_CATEGORY_ID,
    products,
  };
};

export const actClearProduct = () => {
  return {
    type: CLEAR_PRODUCTS,
  };
};