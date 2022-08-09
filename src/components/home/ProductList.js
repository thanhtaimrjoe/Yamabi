import React from "react";
//ant design
import { Row } from "antd";
import ProductCard from "./ProductCard";

function ProductList(props) {
  //props
  const { products } = props;

  const onShowProductDetail = (productID) => {
    props.onShowProductDetail(productID);
  };

  const showListProduct = () => {
    var result = "";
    result = products.map((product, index) => {
      return (
        <ProductCard
          key={index}
          product={product}
          onShowProductDetail={onShowProductDetail}
        />
      );
    });
    return result;
  };

  return (
    <Row gutter={[16, 16]} style={{ padding: "15px" }}>
      {showListProduct()}
    </Row>
  );
}

export default ProductList;
