import React from "react";
//style
import "../../styles/Home.css";
//ant design
import { Layout, Row, Col, Card, Typography } from "antd";
import HomeHeader from "../../components/home/HomeHeader";

const { Content, Footer } = Layout;
const { Text } = Typography;

const products = [
  {
    title: "Europe Street beat",
    image:
      "https://firebasestorage.googleapis.com/v0/b/yama-98f64.appspot.com/o/products%2F1a4fdef0-e39f-11ec-a51a-4fbbf64d3ebb?alt=media&token=5a8dd37a-c7e4-4c75-bad2-d4b6196e3903",
    description: "www.instagram.com",
  },
  {
    title: "Europe Street beat",
    image:
      "https://firebasestorage.googleapis.com/v0/b/yama-98f64.appspot.com/o/products%2F1a4fdef0-e39f-11ec-a51a-4fbbf64d3ebb?alt=media&token=5a8dd37a-c7e4-4c75-bad2-d4b6196e3903",
    description: "www.instagram.com",
  },
  {
    title: "Europe Street beat",
    image:
      "https://firebasestorage.googleapis.com/v0/b/yama-98f64.appspot.com/o/products%2F1a4fdef0-e39f-11ec-a51a-4fbbf64d3ebb?alt=media&token=5a8dd37a-c7e4-4c75-bad2-d4b6196e3903",
    description: "www.instagram.com",
  },
  {
    title: "Europe Street beat",
    image:
      "https://firebasestorage.googleapis.com/v0/b/yama-98f64.appspot.com/o/products%2F1a4fdef0-e39f-11ec-a51a-4fbbf64d3ebb?alt=media&token=5a8dd37a-c7e4-4c75-bad2-d4b6196e3903",
    description: "www.instagram.com",
  },
  {
    title: "Europe Street beat",
    image:
      "https://firebasestorage.googleapis.com/v0/b/yama-98f64.appspot.com/o/products%2F1a4fdef0-e39f-11ec-a51a-4fbbf64d3ebb?alt=media&token=5a8dd37a-c7e4-4c75-bad2-d4b6196e3903",
    description: "www.instagram.com",
  },
];

function HomePage(props) {
  const showProducts = () => {
    var result = "";
    result = products.map((product, index) => {
      return (
        <Col style={{ backgroundColor: "purple" }}>
          <Card
            hoverable
            style={{ width: 150 }}
            cover={<img alt="example" src={product.image} />}
            bodyStyle={{ padding: "5px 0px 5px 0px" }}
          >
            <Text>{product.title}</Text>
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
          <Col span={15} style={{ backgroundColor: "yellow" }}>
            <Row gutter={[16, 16]} justify="center">
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
