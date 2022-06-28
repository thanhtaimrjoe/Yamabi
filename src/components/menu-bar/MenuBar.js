import React from "react";
import { Link, useLocation } from "react-router-dom";
//ant design
import { Layout, Typography, Menu } from "antd";

const { Header } = Layout;
const { Title } = Typography;

//array
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
  //location
  var location = useLocation();

  //show items
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
