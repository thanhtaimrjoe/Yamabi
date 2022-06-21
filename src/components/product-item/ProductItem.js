import React from "react";

function ProductItem(props) {
  const { index, product } = props;
  return (
    <tr>
      <td>{index + 1}</td>
      <td>{product.categoryName}</td>
      <td>{product.productID}</td>
      <td>{product.name}</td>
      <td>
        <a
          href={`/product/${product.productID}`}
          style={{ textDecoration: "none" }}
        >
          See detail
        </a>
      </td>
    </tr>
  );
}

export default ProductItem;
