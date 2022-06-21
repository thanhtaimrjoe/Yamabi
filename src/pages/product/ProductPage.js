import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actFetchProductsRequest } from "../../actions/product";
import MenuBar from "../../components/menu/MenuBar";
import ProductItem from "../../components/product-item/ProductItem";
import ProductList from "../../components/product-list/ProductList";

function ProductPage(props) {
  //redux
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const fetchProducts = () => dispatch(actFetchProductsRequest());

  useEffect(() => {
    fetchProducts();
  }, []);

  const showProducts = () => {
    var result = null;
    if (products.length > 0) {
      result = products.map((product, index) => {
        return <ProductItem key={index} index={index} product={product} />;
      });
    }
    return result;
  };
  return (
    <div>
      <MenuBar />
      <div className="d-flex flex-column align-items-center mt-5">
        <div className="col-xs-9 col-sm-9 col-md-9 col-lg-9">
          <button type="button" className="btn btn-primary mb-3">
            Add new product
          </button>
          <ProductList>{showProducts()}</ProductList>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
