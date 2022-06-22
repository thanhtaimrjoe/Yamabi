import React, { useEffect, useState } from "react";
import {
  actAddNewCategoryRequest,
  actDeleteCategoryRequest,
  actFetchCategoriesRequest,
  actUpdateCategoryRequest,
} from "../../actions/category";
import { useDispatch, useSelector } from "react-redux";
import CategoryModal from "../../components/modal/CategoryModal";
import { Layout, Typography, Modal, Button, Space } from "antd";
import CategoryTable from "../../components/category-table/CategoryTable";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import MenuBar from "../../components/menu-bar/MenuBar";

const { Content, Footer } = Layout;
const { Title } = Typography;
const { confirm } = Modal;

function CategoryPage(props) {
  //state
  const [isModalVisible, setIsModalVisible] = useState(false);
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
    setIsModalVisible(true);
  };

  const onShowCategoryDialog = () => {
    setCategoryInfo(null);
    setIsModalVisible(true);
  };

  const onCloseForm = () => {
    setIsModalVisible(false);
  };

  const onSave = (category, file) => {
    if (categoryInfo) {
      updateCategory(category, file);
    } else {
      addNewCategory(category, file);
    }
    setIsModalVisible(false);
  };

  //delete category from table
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
      <Content style={{ padding: "0 50px" }}>
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
              onCloseForm={onCloseForm}
              onSave={onSave}
            />
          )}
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
  );
}

export default CategoryPage;
