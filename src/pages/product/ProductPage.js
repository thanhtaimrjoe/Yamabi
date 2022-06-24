import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Dropdown,
  Input,
  Layout,
  Menu,
  Space,
  notification,
} from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  actAddNewProductRequest,
  actFetchProductsRequest,
} from "../../actions/product";
import { actFetchCategoriesRequest } from "../../actions/category";
import MenuBar from "../../components/menu-bar/MenuBar";
import ProductModal from "../../components/modal/ProductModal";
import ProductTable from "../../components/product-table/ProductTable";

const { Content } = Layout;
const { Search } = Input;

function ProductPage(props) {
  //state
  const [searchParam, setSearchParam] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);

  //redux - state
  const categories = useSelector((state) => state.categories);
  var products = useSelector((state) => state.products);
  //redux - actions
  const dispatch = useDispatch();
  const fetchCategories = () => dispatch(actFetchCategoriesRequest());
  const fetchProducts = () => dispatch(actFetchProductsRequest());
  const addNewProduct = (product, file) =>
    dispatch(actAddNewProductRequest(product, file));

  useEffect(() => {
    if (categories) {
      fetchCategories();
    }
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //search
  const onSearch = (value) => {
    setSearchParam(value);
  };

  //menu click
  const onMenuClick = (event) => {
    console.log("click", event);
  };

  //close dialog
  const onCloseDialog = () => {
    setIsModalVisible(false);
  };

  //add
  const onSave = (product, file) => {
    addNewProduct(product, file);
    setIsModalVisible(false);
    notification["success"]({
      message: "Success",
      description: `Add ${product.name} product successfully`,
    });
  };

  //filter array
  if (searchParam) {
    products = products.filter((product) => {
      return product.name.indexOf(searchParam) !== -1;
    });
  }

  //show create dialog
  const onShowCreateDialog = () => {
    setIsModalVisible(true);
  };

  //menu drop-down
  const menu = (
    <Menu
      onClick={onMenuClick}
      items={[
        {
          key: "1",
          label: "1st item",
        },
        {
          key: "2",
          label: "2nd item",
        },
        {
          key: "3",
          label: "3rd  item",
        },
      ]}
    />
  );

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
            onClick={onShowCreateDialog}
          >
            Create
          </Button>
          <Dropdown.Button size="large" overlay={menu}>
            Sort
          </Dropdown.Button>
        </Space>
        <ProductTable products={products} />
        {isModalVisible && (
          <ProductModal
            isModalVisible={isModalVisible}
            onCloseDialog={onCloseDialog}
            onSave={onSave}
          />
        )}
      </Content>
    </Layout>
  );
}

export default ProductPage;
