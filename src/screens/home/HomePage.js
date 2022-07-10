import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProductList from "../../components/home/ProductList";
import { useLocation } from "react-router-dom";
//style
import "../../styles/Home.css";
//ant design
import { Layout, Row } from "antd";
import HomeHeader from "../../components/home/HomeHeader";
//actions
import { actFetchAllCategoryRequest } from "../../redux/actions/categories";
import {
  actClearProduct,
  actFetchAllProductByCategoryIDRequest,
} from "../../redux/actions/products";

const { Content } = Layout;

function HomePage(props) {
  //location
  const location = useLocation();
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
  const [categoryName, setCategoryName] = useState();

  useEffect(() => {
    clearProduct();
    fetchAllCategory();
    if (location.pathname.length > 1) {
      const result = findCategoryNameByID(location.pathname.slice(10));
      setCategoryName(result);
      fetchAllProductByCategoryID(location.pathname.slice(10));
    } else {
      fetchAllProductByCategoryID("f93b6be0-e307-11ec-8a7c-57956d2a10bd");
      setCategoryName(null);
    }
    // eslint-disable-next-line
  }, [location]);

  const findCategoryNameByID = (id) => {
    const result = categories.map(
      (category) => category.id === id && category.name
    );
    return result;
  };

  return (
    <Layout>
      <HomeHeader categories={categories} />
      <Content>
        <Row className="content-row" justify="center">
          <ProductList products={products} categoryName={categoryName} />
        </Row>
      </Content>
    </Layout>
  );
}

export default HomePage;
