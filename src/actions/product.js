import {
  ADD_NEW_PRODUCT,
  CLEAN_PRODUCT,
  DELETE_PRODUCT,
  FETCH_PRODUCTS,
  FETCH_PRODUCT_INFO,
} from "../constants/ActionTypes";
import {
  addNewProduct,
  deleteProduct,
  fetchAllProduct,
  fetchProductInfoByID,
} from "../utils/product";

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

export const actAddNewProductRequest = (product, file) => {
  return async (dispatch) => {
    const newProduct = await addNewProduct("product", product, file);
    dispatch(actAddNewProduct(newProduct));
  };
};

export const actAddNewProduct = (newProduct) => {
  return {
    type: ADD_NEW_PRODUCT,
    newProduct,
  };
};

export const actDeleteProductRequest = (product) => {
  return async (dispatch) => {
    await deleteProduct("product", product);
    dispatch(actDeleteProduct());
  };
};

export const actDeleteProduct = () => {
  return {
    type: DELETE_PRODUCT,
  };
};

export const actCleanProduct = () => {
  return {
    type: CLEAN_PRODUCT,
  };
};
