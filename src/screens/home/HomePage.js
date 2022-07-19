import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
//style
import "../../styles/Home.css";
//ant design
import { Layout, Row } from "antd";
import HomeHeader from "../../components/home/HomeHeader";
//actions
import { actFetchAllCategoryRequest } from "../../redux/actions/categories";
import { actClearProduct } from "../../redux/actions/products";

const { Content } = Layout;

function HomePage(props) {
  //redux - state
  const categories = useSelector((state) => state.categories);
  //redux - dispatch
  const dispatch = useDispatch();
  //action - fetch all categories
  const fetchAllCategory = () => dispatch(actFetchAllCategoryRequest());
  //action - clear products
  const clearProduct = () => dispatch(actClearProduct());

  useEffect(() => {
    clearProduct();
    fetchAllCategory();
    // eslint-disable-next-line
  }, []);

  return (
    <Layout>
      <HomeHeader categories={categories} />
      <Content>
        <Row className="content-row" justify="center">
          <p>Nothing :v</p>
        </Row>
      </Content>
    </Layout>
  );
}

export default HomePage;
