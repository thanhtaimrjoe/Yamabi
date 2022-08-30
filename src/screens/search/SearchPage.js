import React, { useEffect } from "react";
import { Col, Layout, Row, Typography } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
//actions
import { actFetchAllCategoryRequest } from "../../redux/actions/categories";
import { actClearProduct, actFetchAllProductByProductNameRequest } from "../../redux/actions/products";
//components
import HomeHeader from "../../components/home/HomeHeader";
import ProductList from '../../components/home/ProductList';

const {Content} = Layout;
const {Title} = Typography;

function SearchPage(props) {
  //params
  const params = useParams();
  //navigate
  const navigate = useNavigate();
  //redux - state
  const categories = useSelector((state) => state.categories);
  const products = useSelector((state) => state.products);
  //redux - dispatch
  const dispatch = useDispatch();
  //action - clear products
  const clearProduct = () => dispatch(actClearProduct());
  //action - fetch all categories
  const fetchAllCategory = () => dispatch(actFetchAllCategoryRequest());
  //action - fetch all pro
  const fetchAllProductByProductName = (searchValue) => dispatch(actFetchAllProductByProductNameRequest(searchValue))

  useEffect(() => {
    clearProduct();
    fetchAllCategory();
    fetchAllProductByProductName(params.searchValue)
    // eslint-disable-next-line
  }, [params]);

  const onShowProductDetail = (productID) => {
    navigate(`/product/${productID}`);
  };

  return (
    <Layout>
      <HomeHeader categories={categories} />
      <Content>
        <Row justify="center" className="content-background">
          <Col span={17}>
            <Title level={4} className="title-padding">
            Search Results for: {params.searchValue}
            </Title>
            <ProductList
              products={products}
              onShowProductDetail={onShowProductDetail}
            />
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}

export default SearchPage;
