import { FETCH_PRODUCTS, FETCH_PRODUCT_INFO } from "../constants/ActionTypes";
import { fetchAllProduct, fetchProductInfoByID } from "../utils/firebaseAction";

export const actFetchProductsRequest = () => {
  return async (dispatch) => {
    const result = await fetchAllProduct("product");
    dispatch(actFetchProducts(result));
  };
};

export const actFetchProducts = (products) => {
  return {
    type: FETCH_PRODUCTS,
    products,
  };
};

export const actFetchProductInforByIDRequest = (productID) => {
  return async (dispatch) => {
    const result = await fetchProductInfoByID("product", productID);
    dispatch(actFetchProduct(result));
  };
};

export const actFetchProduct = (product) => {
  return {
    type: FETCH_PRODUCT_INFO,
    product,
  };
};
