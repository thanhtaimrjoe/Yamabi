import {
  CLEAR_PRODUCTS,
  FETCH_ALL_PRODUCT,
  FETCH_ALL_PRODUCT_BY_CATEGORY_ID,
  FETCH_PRODUCT_INFO,
} from "../../constants/product";
import {
  fetchAllProduct,
  fetchAllProductByCategoryID,
  fetchProductInfoByID,
} from "../../services/product";

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

export const actFetchProductInforByIDRequest = (productID) => {
  return async (dispatch) => {
    const result = await fetchProductInfoByID("product", productID);
    dispatch(actFetchProductInfo(result));
  };
};

const actFetchProductInfo = (product) => {
  return {
    type: FETCH_PRODUCT_INFO,
    product,
  };
};
