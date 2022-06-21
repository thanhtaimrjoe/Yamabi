import React from "react";

function CategoryList(props) {
  return (
    <div>
      <table className="table table-striped table-hover border">
        <thead>
          <tr>
            <th>No</th>
            <th>ID</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>{props.children}</tbody>
      </table>
    </div>
  );
}

export default CategoryList;
