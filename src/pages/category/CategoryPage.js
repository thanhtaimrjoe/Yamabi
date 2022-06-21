import React, { useEffect, useState } from "react";
import Menu from "../../components/menu/Menu";
import {
  actAddNewCategoryRequest,
  actDeleteCategoryRequest,
  actFetchCategoriesRequest,
  actUpdateCategoryRequest,
} from "../../actions/category";
import { useDispatch, useSelector } from "react-redux";
import CategoryItem from "../../components/category-item/CategoryItem";
import CategoryList from "../../components/category-list/CategoryList";
import CategoryModal from "../../components/modal/CategoryModal";

function CategoryPage(props) {
  //state
  const [showModal, setShowModal] = useState(false);
  const [categoryInfo, setCategoryInfo] = useState();

  //redux
  const categories = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  //fetch
  const fetchCategories = () => dispatch(actFetchCategoriesRequest());
  //update
  const updateCategory = (category, file) =>
    dispatch(actUpdateCategoryRequest(category, file));
  //add new
  const addNewCategory = (category, file) =>
    dispatch(actAddNewCategoryRequest(category, file));
  //delete
  const deleteCategory = (category) =>
    dispatch(actDeleteCategoryRequest(category));

  useEffect(() => {
    fetchCategories();
  }, []);

  const onShowCategoryInfo = (category) => {
    setCategoryInfo(category);
    setShowModal(true);
  };

  const onShowCategoryDialog = () => {
    setCategoryInfo(null);
    setShowModal(true);
  };

  const onCloseForm = () => {
    setShowModal(false);
  };

  const onSave = (category, file) => {
    if (categoryInfo) {
      updateCategory(category, file);
    } else {
      addNewCategory(category, file);
    }
    setShowModal(false);
  };

  //delete category from table
  const onDeleteCategory = (category) => {
    if (window.confirm("Are you sure you want delete?")) {
      deleteCategory(category);
    }
  };

  const showCategories = () => {
    var result = null;
    if (categories.length > 0) {
      result = categories.map((category, index) => {
        return (
          <CategoryItem
            key={index}
            index={index}
            category={category}
            onShowCategoryInfo={onShowCategoryInfo}
            onDeleteCategory={onDeleteCategory}
          />
        );
      });
    }
    return result;
  };

  return (
    <div>
      <Menu />
      <div className="d-flex flex-column align-items-center mt-5">
        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
          <button
            type="button"
            className="btn btn-primary mb-3"
            onClick={onShowCategoryDialog}
          >
            Add new category
          </button>
          <CategoryList>{showCategories()}</CategoryList>
        </div>
      </div>
      {showModal ? (
        <CategoryModal
          categoryInfo={categoryInfo}
          onCloseForm={onCloseForm}
          onSave={onSave}
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default CategoryPage;
