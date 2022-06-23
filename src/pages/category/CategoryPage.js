import React, { useEffect, useState } from "react";
import {
  actAddNewCategoryRequest,
  actDeleteCategoryRequest,
  actFetchCategoriesRequest,
  actUpdateCategoryRequest,
} from "../../actions/category";
import { useDispatch, useSelector } from "react-redux";
import CategoryModal from "../../components/modal/CategoryModal";
import { Layout, Modal, Button, Space } from "antd";
import CategoryTable from "../../components/category-table/CategoryTable";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import MenuBar from "../../components/menu-bar/MenuBar";

const { Content } = Layout;
const { confirm } = Modal;

function CategoryPage(props) {
  //state
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [categoryInfo, setCategoryInfo] = useState();

  //redux - state
  const categories = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  //redux - fetch
  const fetchCategories = () => dispatch(actFetchCategoriesRequest());
  //redux - update
  const updateCategory = (category, file) =>
    dispatch(actUpdateCategoryRequest(category, file));
  //redux - add
  const addNewCategory = (category, file) =>
    dispatch(actAddNewCategoryRequest(category, file));
  //redux - delete
  const deleteCategory = (category) =>
    dispatch(actDeleteCategoryRequest(category));

  useEffect(() => {
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //update dialog
  const onShowCategoryInfo = (category) => {
    setCategoryInfo(category);
    setIsModalVisible(true);
  };

  //create dialog
  const onShowCategoryDialog = () => {
    setCategoryInfo(null);
    setIsModalVisible(true);
  };

  //close dialog
  const onCloseDialog = () => {
    setIsModalVisible(false);
  };

  //update or add
  const onSave = (category, file) => {
    if (categoryInfo) {
      updateCategory(category, file);
    } else {
      addNewCategory(category, file);
    }
    setIsModalVisible(false);
  };

  //delete
  const onDeleteCategory = (category) => {
    confirm({
      title: "Do you want to delete this item?",
      icon: <ExclamationCircleOutlined />,
      content: "This action can not undo",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: () => {
        deleteCategory(category);
      },
    });
  };

  return (
    <Layout>
      <MenuBar />
      <Content style={{ padding: "0 50px", minHeight: "93vh" }}>
        <Space style={{ margin: "15px 0 15px 0" }}>
          <Button type="primary" onClick={onShowCategoryDialog}>
            Create new category
          </Button>
        </Space>
        <div className="site-layout-content">
          <CategoryTable
            categories={categories}
            onShowCategoryInfo={onShowCategoryInfo}
            onDeleteCategory={onDeleteCategory}
          />
          {isModalVisible && (
            <CategoryModal
              categoryInfo={categoryInfo}
              isModalVisible={isModalVisible}
              onCloseDialog={onCloseDialog}
              onSave={onSave}
            />
          )}
        </div>
      </Content>
    </Layout>
  );
}

export default CategoryPage;
