import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
//style
import "../../styles/Home.css";
//ant design
import { Layout, Row, Col, Card, Typography } from "antd";
import HomeHeader from "../../components/home/HomeHeader";
//actions
import { actFetchAllProductRequest } from "../../redux/actions/products";

const { Content, Footer } = Layout;
const { Title, Text } = Typography;

// const products = [
//   {
//     title: "Europe Street beat",
//     image:
//       "https://firebasestorage.googleapis.com/v0/b/yama-98f64.appspot.com/o/products%2F1a4fdef0-e39f-11ec-a51a-4fbbf64d3ebb?alt=media&token=5a8dd37a-c7e4-4c75-bad2-d4b6196e3903",
//     description: "www.instagram.com",
//   },
//   {
//     title: "Europe Street beat",
//     image:
//       "https://firebasestorage.googleapis.com/v0/b/yama-98f64.appspot.com/o/products%2F1a4fdef0-e39f-11ec-a51a-4fbbf64d3ebb?alt=media&token=5a8dd37a-c7e4-4c75-bad2-d4b6196e3903",
//     description: "www.instagram.com",
//   },
//   {
//     title: "Europe Street beat",
//     image:
//       "https://firebasestorage.googleapis.com/v0/b/yama-98f64.appspot.com/o/products%2F1a4fdef0-e39f-11ec-a51a-4fbbf64d3ebb?alt=media&token=5a8dd37a-c7e4-4c75-bad2-d4b6196e3903",
//     description: "www.instagram.com",
//   },
//   {
//     title: "Europe Street beat",
//     image:
//       "https://firebasestorage.googleapis.com/v0/b/yama-98f64.appspot.com/o/products%2F1a4fdef0-e39f-11ec-a51a-4fbbf64d3ebb?alt=media&token=5a8dd37a-c7e4-4c75-bad2-d4b6196e3903",
//     description: "www.instagram.com",
//   },
//   {
//     title: "Europe Street beat",
//     image:
//       "https://firebasestorage.googleapis.com/v0/b/yama-98f64.appspot.com/o/products%2F1a4fdef0-e39f-11ec-a51a-4fbbf64d3ebb?alt=media&token=5a8dd37a-c7e4-4c75-bad2-d4b6196e3903",
//     description: "www.instagram.com",
//   },
//   {
//     title: "Europe Street beat",
//     image:
//       "https://firebasestorage.googleapis.com/v0/b/yama-98f64.appspot.com/o/products%2F1a4fdef0-e39f-11ec-a51a-4fbbf64d3ebb?alt=media&token=5a8dd37a-c7e4-4c75-bad2-d4b6196e3903",
//     description: "www.instagram.com",
//   },
// ];

function HomePage(props) {
  //redux - state
  const products = useSelector((state) => state.products);
  //redux - dispatch
  const dispatch = useDispatch();
  //action - fetch all product
  const fetchAllProduct = () => dispatch(actFetchAllProductRequest());

  useEffect(() => {
    fetchAllProduct();
    // eslint-disable-next-line
  }, []);

  const showProducts = () => {
    var result = "";
    result = products.map((product, index) => {
      return (
        <Col style={{ backgroundColor: "purple" }}>
          <Card
            hoverable
            style={{ width: 170 }}
            cover={<img alt="example" height={270} src={product.image} />}
            bodyStyle={{ padding: "5px 0px 5px 0px" }}
          >
            <Text ellipsis={true}>{product.name}</Text>
          </Card>
        </Col>
      );
    });
    return result;
  };
  return (
    <Layout>
      <HomeHeader />
      <Content>
        <Row className="content-row" justify="center">
          <Col span={13} style={{ backgroundColor: "yellow" }}>
            <Title level={3}>１巻以上丸ごと無料で読める！</Title>
            <Row gutter={[16, 16]} style={{ padding: "15px" }}>
              {showProducts()}
            </Row>
          </Col>
        </Row>
      </Content>
      <Footer>
        <p>Sponsor by Google</p>
      </Footer>
    </Layout>
  );
}

export default HomePage;
