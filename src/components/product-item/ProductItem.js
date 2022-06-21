import React from "react";

function ProductItem(props) {
  const { index, product } = props;
  return (
    <tr>
      <td>{index + 1}</td>
      <td>{product.categoryName}</td>
      <td>{product.productID}</td>
      <td>
        <a
          href={`/product/${product.productID}`}
          style={{ textDecoration: "none" }}
        >
          {product.name}
        </a>
      </td>
      <td>
        <button type="button" className="btn btn-primary">
          See detail
        </button>
      </td>
    </tr>
  );
}

export default ProductItem;
