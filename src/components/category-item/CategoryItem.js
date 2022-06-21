import React from "react";

function CategoryItem(props) {
  const { index, category } = props;

  const onShowCategoryInfo = () => {
    props.onShowCategoryInfo(category);
  };

  const onDeleteCategory = () => {
    props.onDeleteCategory(category);
  };

  return (
    <tr>
      <td>{index + 1}</td>
      <td>{category.id}</td>
      <td>{category.name}</td>
      <td>
        <button
          type="button"
          className="btn btn-warning me-2"
          onClick={onShowCategoryInfo}
        >
          Edit
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={onDeleteCategory}
        >
          Remove
        </button>
      </td>
    </tr>
  );
}

export default CategoryItem;
