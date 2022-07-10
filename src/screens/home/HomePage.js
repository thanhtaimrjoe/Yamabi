import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProductList from "../../components/home/ProductList";
import {useLocation} from 'react-router-dom';
//style
import "../../styles/Home.css";
//ant design
import { Layout, Row } from "antd";
import HomeHeader from "../../components/home/HomeHeader";
//actions
import { actFetchAllCategoryRequest } from "../../redux/actions/categories";
import { actClearProduct } from "../../redux/actions/products";

const { Content, Footer } = Layout;

function HomePage(props) {
  //location
  const location = useLocation();
  //redux - state
  const categories = useSelector((state) => state.categories);
  //redux - dispatch
  const dispatch = useDispatch();
  //action - fetch all categories
  const fetchAllCategory = () => dispatch(actFetchAllCategoryRequest());
  //action - clear products
  const clearProduct = () => dispatch(actClearProduct());
  //fetch categoryID in URL
  const [categoryID, setCategoryID] = useState('/');
  const [categoryName, setCategoryName] = useState();

  useEffect(() => {
    clearProduct();
    fetchAllCategory();
    if (location.pathname.length > 1) {
      const result = findCategoryNameByID(location.pathname.slice(10))
      setCategoryID(location.pathname.slice(10));
      setCategoryName(result);
    } else {
      setCategoryID('/');
      setCategoryName(null)
    }
    // eslint-disable-next-line
  }, [categoryID, location]);

  const findCategoryNameByID = (id) => {
    var result = '';
    result = categories.map((category) => {
      if (category.id === id) {
        return category.name;
      }
    })
    return result;
  }

  return (
    <Layout>
      <HomeHeader categories={categories} />
      <Content>
        <Row className="content-row" justify="center">
          <ProductList categoryID={categoryID} categoryName={categoryName} />
        </Row>
      </Content>
    </Layout>
  );
}

export default HomePage;
