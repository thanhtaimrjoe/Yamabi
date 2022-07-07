import React from "react";
//style
import "../../styles/Home.css";
//ant design
import { Layout, Menu, Input, Space, Row, Col, Button } from "antd";

const { Header, Content, Footer } = Layout;
const { Search } = Input;

function HomePage(props) {
  const menus = [
    {
      label: "Category",
      key: "item1",
    },
    {
      label: "item2",
      key: "item2",
    },
  ];

  const onSearch = (value) => {
    console.log("Search", value);
  };

  return (
    <Layout>
      <Header className="header">
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
        <p>Hello world</p>
      </Content>
      <Footer>
        <p>Sponsor by Google</p>
      </Footer>
    </Layout>
  );
}

export default HomePage;
