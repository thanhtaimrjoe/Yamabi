import React from "react";
import { Menu, Typography } from "antd";
import { Link } from "react-router-dom";

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
  const showMenus = () => {
    var result = null;
    if (menus.length > 0) {
      result = menus.map((menu, index) => {
        return (
          <Menu.Item key={index}>
            <Link to={menu.to}>{menu.name}</Link>
          </Menu.Item>
        );
      });
    }
    return result;
  };

  return (
    <Menu theme="dark" mode="horizontal">
      {showMenus()}
    </Menu>
  );
}

export default MenuBar;
