import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
//style
import "../../styles/Home.css";
//ant design
import { Col, Layout, Row, Typography } from "antd";
import HomeHeader from "../../components/home/HomeHeader";
//actions
import { actFetchAllCategoryRequest } from "../../redux/actions/categories";
import {
  actClearProduct,
  actFetchAllProductRequest,
} from "../../redux/actions/products";
import ProductList from "../../components/home/ProductList";

const { Content } = Layout;
const { Title } = Typography;

function HomePage(props) {
  //state
  const [popular, setPopular] = useState([]);
  //redux - state
  const categories = useSelector((state) => state.categories);
  //redux - product
  const products = useSelector((state) => state.products);
  //redux - dispatch
  const dispatch = useDispatch();
  //action - fetch all categories
  const fetchAllCategory = () => dispatch(actFetchAllCategoryRequest());
  //action - clear products
  const clearProduct = () => dispatch(actClearProduct());
  //action - fetch all product
  const fetchAllProduct = () => dispatch(actFetchAllProductRequest());

  useEffect(() => {
    clearProduct();
    fetchAllCategory();
    fetchAllProduct();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setPopular([]);
    if (products.length > 0) {
      setPopular(products.slice(0, 12));
    }
    //eslint-disable-next-line
  }, [products]);

  return (
    <Layout>
      <HomeHeader categories={categories} />
      <Content>
        <Row justify="center" className="content-background">
          <Col span={17}>
            <Title level={4} className="title-padding">
              Popular
            </Title>
            <ProductList products={popular} />
            <Title level={4} className="title-padding">
              New arrival
            </Title>
            <ProductList products={products} />
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}

export default HomePage;
