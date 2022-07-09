import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProductList from "../../components/home/ProductList";
//style
import "../../styles/Home.css";
//ant design
import { Layout, Row } from "antd";
import HomeHeader from "../../components/home/HomeHeader";
//actions
import { actFetchAllCategoryRequest } from "../../redux/actions/categories";

const { Content, Footer } = Layout;

function HomePage(props) {
  //redux - state
  const categories = useSelector((state) => state.categories);
  //redux - dispatch
  const dispatch = useDispatch();
  //action - fetch all categories
  const fetchAllCategory = () => dispatch(actFetchAllCategoryRequest());

  useEffect(() => {
    fetchAllCategory();
    // eslint-disable-next-line
  }, []);

  return (
    <Layout>
      <HomeHeader categories={categories} />
      <Content>
        <Row className="content-row" justify="center">
          <ProductList categoryID="e05c14d0-e307-11ec-8a7c-57956d2a10bd" />
        </Row>
      </Content>
      <Footer>
        <p>Sponsor by Google</p>
      </Footer>
    </Layout>
  );
}

export default HomePage;
