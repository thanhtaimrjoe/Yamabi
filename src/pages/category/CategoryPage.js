import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
//ant design
import {
  Layout,
  Modal,
  Button,
  Space,
  Input,
  notification,
  Row,
  Col,
} from "antd";
import { ExclamationCircleOutlined, PlusOutlined } from "@ant-design/icons";
//actions
import {
  actAddNewCategoryRequest,
  actDeleteCategoryRequest,
  actFetchCategoriesRequest,
  actUpdateCategoryRequest,
} from "../../actions/category";
//components
import MenuBar from "../../components/menu-bar/MenuBar";
import CategoryModal from "../../components/modal/CategoryModal";
import CategoryTable from "../../components/category-table/CategoryTable";
import useWindowDimensions from "../../components/dimension/Dimension";

const { Content } = Layout;
const { confirm } = Modal;
const { Search } = Input;

function CategoryPage(props) {
  //state
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [category, setCategory] = useState();
  const [searchParam, setSearchParam] = useState();

  const { width } = useWindowDimensions();

  //redux - state
  var categories = useSelector((state) => state.categories);
  //dispatch
  const dispatch = useDispatch();
  //redux - fetch category
  const fetchCategories = () => dispatch(actFetchCategoriesRequest());
  //redux - update category
  const updateCategory = (category, file) =>
    dispatch(actUpdateCategoryRequest(category, file));
  //redux - add category
  const addNewCategory = (category, file) =>
    dispatch(actAddNewCategoryRequest(category, file));
  //redux - delete category
  const deleteCategory = (category) =>
    dispatch(actDeleteCategoryRequest(category));

  useEffect(() => {
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //show category info
  const onShowCategoryInfo = (categoryInfo) => {
    setCategory(categoryInfo);
    setIsModalVisible(true);
  };

  //create category dialog
  const onShowCategoryDialog = () => {
    setCategory(null);
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
  const onSave = (categoryInfo, file) => {
    if (category) {
      updateCategory(categoryInfo, file);
    } else {
      addNewCategory(categoryInfo, file);
    }
    setIsModalVisible(false);
    notification["success"]({
      message: "Success",
      description: `Add ${categoryInfo.name} category successfully`,
    });
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

  //filter
  if (searchParam) {
    categories = categories.filter((category) => {
      return category.name.indexOf(searchParam) !== -1;
    });
  }

  return (
    <Layout>
      <MenuBar />
      <Content style={{ minHeight: "93vh" }}>
        <Row justify="center">
          <Col md={20}>
            <Space style={{ margin: "25px 0 25px 0" }}>
              <Search
                placeholder="Search category..."
                enterButton="Search"
                size="large"
                onSearch={onSearch}
                style={width > 576 ? { width: 500 } : null}
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
                category={category}
                isModalVisible={isModalVisible}
                onCloseDialog={onCloseDialog}
                onSave={onSave}
              />
            )}
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}

export default CategoryPage;
