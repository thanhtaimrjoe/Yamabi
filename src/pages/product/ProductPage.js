import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
//ant design
import { FilterOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Dropdown,
  Input,
  Layout,
  Menu,
  Space,
  notification,
  Row,
  Col,
} from "antd";
import {
  actAddNewProductRequest,
  actFetchProductsRequest,
} from "../../actions/product";
//actions
import { actFetchCategoriesRequest } from "../../actions/category";
//components
import MenuBar from "../../components/menu-bar/MenuBar";
import ProductModal from "../../components/modal/ProductModal";
import ProductTable from "../../components/product-table/ProductTable";
import useWindowDimensions from "../../components/dimension/Dimension";

const { Content } = Layout;
const { Search } = Input;

function ProductPage(props) {
  //state
  const [searchParam, setSearchParam] = useState();
  const [categoryFilter, setCategoryFilter] = useState();
  const [isProductModalVisible, setIsProductModalVisible] = useState(false);

  const { width } = useWindowDimensions();

  //redux - state
  const categories = useSelector((state) => state.categories);
  var products = useSelector((state) => state.products);
  //dispatch
  const dispatch = useDispatch();
  //redux - fetch categories
  const fetchCategories = () => dispatch(actFetchCategoriesRequest());
  //redux - fetch products
  const fetchProducts = () => dispatch(actFetchProductsRequest());
  //redux - add new product
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
  const onMenuClick = (value) => {
    setCategoryFilter(value.key);
  };

  //close dialog
  const onCloseDialog = () => {
    setIsProductModalVisible(false);
  };

  //add new product
  const onProductSave = (product, file) => {
    addNewProduct(product, file);
    setIsProductModalVisible(false);
    notification["success"]({
      message: "Success",
      description: `Add ${product.name} product successfully`,
    });
  };

  //filter by search
  if (searchParam) {
    products = products.filter((product) => {
      return product.name.indexOf(searchParam) !== -1;
    });
  }

  //filter by category
  if (categoryFilter) {
    products = products.filter((product) => {
      return product.categoryID.indexOf(categoryFilter) !== -1;
    });
  }

  //show create product dialog
  const onShowCreateDialog = () => {
    setIsProductModalVisible(true);
  };

  //menu array
  const menu = (
    <Menu
      selectable
      onClick={onMenuClick}
      items={categories.map((category) => {
        return {
          key: category.id,
          label: category.name,
        };
      })}
    />
  );

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
                style={width > 768 ? { width: 500 } : null}
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
              <Dropdown overlay={menu} placement="bottomLeft">
                <Button size="large" icon={<FilterOutlined />}>
                  Filter
                </Button>
              </Dropdown>
            </Space>
            <ProductTable products={products} />
            {isProductModalVisible && (
              <ProductModal
                isProductModalVisible={isProductModalVisible}
                onCloseDialog={onCloseDialog}
                onProductSave={onProductSave}
              />
            )}
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}

export default ProductPage;
