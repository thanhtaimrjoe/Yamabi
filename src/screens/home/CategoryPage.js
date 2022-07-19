import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProductList from "../../components/home/ProductList";
import { useLocation } from "react-router-dom";
//style
import "../../styles/Home.css";
//ant design
import { Col, Layout, Row, Typography } from "antd";
import HomeHeader from "../../components/home/HomeHeader";
//actions
import { actFetchAllCategoryRequest } from "../../redux/actions/categories";
import {
  actClearProduct,
  actFetchAllProductByCategoryIDRequest,
} from "../../redux/actions/products";

const { Content } = Layout;
const { Title } = Typography;

function CategoryPage(props) {
  //location
  const location = useLocation();
  //state
  const [popular, setPopular] = useState([]);
  //redux - state
  const categories = useSelector((state) => state.categories);
  const products = useSelector((state) => state.products);
  //redux - dispatch
  const dispatch = useDispatch();
  //action - fetch all categories
  const fetchAllCategory = () => dispatch(actFetchAllCategoryRequest());
  //action - clear products
  const clearProduct = () => dispatch(actClearProduct());
  //action - fetch all product
  const fetchAllProductByCategoryID = (categoryID) =>
    dispatch(actFetchAllProductByCategoryIDRequest(categoryID));

  useEffect(() => {
    clearProduct();
    fetchAllCategory();
    if (location.pathname.length > 1) {
      fetchAllProductByCategoryID(location.pathname.slice(10));
    }
    // eslint-disable-next-line
  }, [location]);

  useEffect(() => {
    setPopular([]);
    if (products.length > 0) {
      var result = [];
      for (let index = 0; index < 2; index++) {
        var item = products[Math.floor(Math.random() * products.length)];
        result.push(item);
      }
      setPopular(result);
    }
    //eslint-disable-next-line
  }, [products]);

  return (
    <Layout>
      <HomeHeader categories={categories} />
      <Content>
        <Row className="content-row" justify="center">
          <Col span={17} style={{ backgroundColor: "yellow" }}>
            <Title level={4}>Popular</Title>
            <ProductList products={popular} />
            <Title level={4}>New arrival</Title>
            <ProductList products={products} />
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}

export default CategoryPage;
