import React from "react";
//style
import "../../styles/Home.css";
//ant design
import { Layout, Row, Col, Card } from "antd";
import HomeHeader from "../../components/home/HomeHeader";

const { Content, Footer } = Layout;
const { Meta } = Card;

function HomePage(props) {
  return (
    <Layout>
      <HomeHeader />
      <Content>
        <Row className="content-row" justify="center">
          <Col span={20} style={{ backgroundColor: "yellow" }}>
            <Card
              hoverable
              style={{ width: 240 }}
              cover={
                <img
                  alt="example"
                  src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                />
              }
            >
              <Meta
                title="Europe Street beat"
                description="www.instagram.com"
              />
            </Card>
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
