import React, { useEffect, useState } from "react";
import {
  actAddNewCategoryRequest,
  actDeleteCategoryRequest,
  actFetchCategoriesRequest,
  actUpdateCategoryRequest,
} from "../../actions/category";
import { useDispatch, useSelector } from "react-redux";
import CategoryModal from "../../components/modal/CategoryModal";
import { Layout, Modal, Button, Space, Input } from "antd";
import CategoryTable from "../../components/category-table/CategoryTable";
import { ExclamationCircleOutlined, PlusOutlined } from "@ant-design/icons";
import MenuBar from "../../components/menu-bar/MenuBar";

const { Content } = Layout;
const { confirm } = Modal;
const { Search } = Input;

function CategoryPage(props) {
  //state
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [categoryInfo, setCategoryInfo] = useState();
  const [searchParam, setSearchParam] = useState();

  //redux - state
  var categories = useSelector((state) => state.categories);
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

  //search
  const onSearch = (value) => {
    setSearchParam(value);
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

  if (searchParam) {
    categories = categories.filter((category) => {
      return category.name.indexOf(searchParam) !== -1;
    });
  }

  return (
    <Layout>
      <MenuBar />
      <Content style={{ padding: "0 150px", minHeight: "93vh" }}>
        <Space style={{ margin: "25px 0 25px 0" }}>
          <Search
            placeholder="Search category..."
            enterButton="Search"
            size="large"
            style={{ width: 500 }}
            onSearch={onSearch}
          />
          <Button
            type="primary"
            danger
            size="large"
            icon={<PlusOutlined />}
            onClick={onShowCategoryDialog}
          >
            Create
          </Button>
        </Space>
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
      </Content>
    </Layout>
  );
}

export default CategoryPage;
