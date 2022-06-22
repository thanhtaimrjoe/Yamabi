import React from "react";
import { Layout, Typography, Menu } from "antd";
import { Link, useLocation } from "react-router-dom";

const { Header } = Layout;
const { Title } = Typography;
const menus = [
  {
    name: "Category",
    to: "/home",
  },
  {
    name: "Product",
    to: "/product-list",
  },
];

function MenuBar(props) {
  var location = useLocation();
  const showMenus = () => {
    var result = null;
    if (menus.length > 0) {
      result = menus.map((menu, index) => {
        return (
          <Menu.Item key={menu.to}>
            <Link to={menu.to}>{menu.name}</Link>
          </Menu.Item>
        );
      });
    }
    return result;
  };

  return (
    <Header>
      <Title
        className="logo"
        style={{
          float: "left",
          color: "white",
          padding: "0 10px 0 10px",
          margin: "8px",
        }}
      >
        Yamabi
      </Title>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={[`${location.pathname}`]}
      >
        {showMenus()}
      </Menu>
    </Header>
  );
}

export default MenuBar;
