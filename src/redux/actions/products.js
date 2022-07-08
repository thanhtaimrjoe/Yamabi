import { FETCH_ALL_PRODUCT } from "../../constants/product";
import { fetchAllProduct } from "../../services/product";

export const actFetchAllProductRequest = () => {
  return async (dispatch) => {
    const products = await fetchAllProduct("product");
    dispatch(actFetchAllProduct(products));
  };
};

const actFetchAllProduct = (products) => {
  return {
    type: FETCH_ALL_PRODUCT,
    products,
  };
};
