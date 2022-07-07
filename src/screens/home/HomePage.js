import React from "react";
//style
import "../../styles/Home.css";
//ant design
import { Layout, Menu, Input, Space, Row, Col, Button, Card } from "antd";

const { Header, Content, Footer } = Layout;
const { Search } = Input;
const { Meta } = Card;

function HomePage(props) {
  const menus = [
    {
      label: "Sport",
      key: "item1",
    },
    {
      label: "Romance",
      key: "item2",
    },
    {
      label: "Action",
      key: "item3",
    },
    {
      label: "Honor",
      key: "item4",
    },
  ];

  const onSearch = (value) => {
    console.log("Search", value);
  };

  return (
    <Layout>
      <Header
        style={{ padding: "0px", height: "auto", backgroundColor: "white" }}
      >
        <Row className="row-menu-title">
          <Col span={18}>
            <Space className="space-menu-title">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/yama-98f64.appspot.com/o/materials%2Frestaurant.png?alt=media&token=c67e5e83-a039-4846-9fc2-73143558e270"
                className="logo"
                alt="haha"
              />
              <Search
                placeholder="Search anime..."
                onSearch={onSearch}
                className="search"
                size="large"
                style={{ width: "500px" }}
              />
              <Space>
                <Button>Sign In</Button>
                <Button>Create new account</Button>
              </Space>
            </Space>
          </Col>
        </Row>
        <Menu
          className="menu"
          mode="horizontal"
          defaultChecked={["item1"]}
          items={menus}
        />
      </Header>
      <Content>
        <Row className="content-row">
          <Col span={20}>
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
