import React from "react";
//style
import "../../styles/Home.css";
//ant design
import { Button, Col, Input, Layout, Menu, Row, Space } from "antd";

const { Header } = Layout;
const { Search } = Input;

function HomeHeader(props) {
  //list menu items
  const menus = [
    {
      label: "Home",
      key: "home",
    },
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
  );
}

export default HomeHeader;
