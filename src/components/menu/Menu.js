import React from "react";
import { NavLink } from "react-router-dom";

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

function Menu(props) {
  const showMenus = (menus) => {
    var result = null;
    if (menus.length > 0) {
      result = menus.map((menu, index) => {
        return (
          <li key={index} className="nav-item">
            <NavLink
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
              to={menu.to}
            >
              {menu.name}
            </NavLink>
          </li>
        );
      });
    }
    return result;
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand">Yamabi</a>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav">{showMenus(menus)}</ul>
        </div>
      </div>
    </nav>
  );
}

export default Menu;
