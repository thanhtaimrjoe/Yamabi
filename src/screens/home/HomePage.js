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

  const showListCategory = () => {
    var result = "";
    result = categories.map((category, index) => {
      return <ProductList key={index} category={category} />;
    });
    return result;
  };

  return (
    <Layout>
      <HomeHeader />
      <Content>
        <Row className="content-row" justify="center">
          {showListCategory()}
        </Row>
      </Content>
      <Footer>
        <p>Sponsor by Google</p>
      </Footer>
    </Layout>
  );
}

export default HomePage;
