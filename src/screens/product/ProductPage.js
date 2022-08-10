import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useLocation } from "react-router-dom";
//components
import HomeHeader from "../../components/home/HomeHeader";
//actions
import { actFetchProductInforByIDRequest } from "../../redux/actions/products";
//ant design
import { Col, Image, Layout, Row, Space, Typography } from "antd";
//style
import "../../styles/Product.css";
import { useParams } from "react-router-dom";

const { Content } = Layout;
const { Text } = Typography;

function ProductPage(props) {
  //param
  const params = useParams();
  //redux - state
  const product = useSelector((state) => state.product);
  //redux - dispatch
  const dispatch = useDispatch();
  //action - fetch product infor by id
  const fetchProductInforByID = (productID) =>
    dispatch(actFetchProductInforByIDRequest(productID));

  useEffect(() => {
    fetchProductInforByID(params.id);
    // eslint-disable-next-line
  }, []);

  return (
    <Layout>
      <HomeHeader />
      <Content>
        <Row justify="center" className="content-background">
          <Col span={17} style={{ backgroundColor: "pink" }}>
            <Row style={{ backgroundColor: "yellow" }}>
              <Col>
                <Image src={product.image} height={250} />
              </Col>
              <Col>
                <Space
                  direction="vertical"
                  style={{ backgroundColor: "purple" }}
                >
                  <Text className="product-name">Naruto</Text>
                  <Text>Genres: アクション</Text>
                  <Text>Author: Eichiro Oda</Text>
                  <Text>Episodes: 13/13</Text>
                  <Text>Status: Complete</Text>
                </Space>
              </Col>
            </Row>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}

export default ProductPage;
