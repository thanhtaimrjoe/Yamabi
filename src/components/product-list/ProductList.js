import React from "react";

function ProductList(props) {
  return (
    <div>
      <table className="table table-striped table-hover border">
        <thead>
          <tr>
            <th>No</th>
            <th>Category</th>
            <th>ID</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>{props.children}</tbody>
      </table>
    </div>
  );
}

export default ProductList;
