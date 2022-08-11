import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
//style
import "../../styles/Menu.css";
//ant design
import { Button, Col, Input, Layout, Menu, Row, Space } from "antd";

const { Header } = Layout;
const { Search } = Input;

function HomeHeader(props) {
  //props
  const { categories } = props;
  //navigate
  const navigate = useNavigate();
  //location
  const location = useLocation();

  //menu list
  if (categories) {
    var menuList = [];
    menuList.push({
      label: "Home",
      key: "/",
    });
    categories.map((category) =>
      menuList.push({
        label: category.name,
        key: `/category/${category.id}`,
      })
    );
  }

  const onSearch = (value) => {
    console.log("Search", value);
  };

  const onMenuClick = (event) => {
    navigate(event.key);
  };

  const onNavigateToHomePage = () => {
    navigate("/");
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
              onClick={onNavigateToHomePage}
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
      {categories && (
        <Menu
          className="menu"
          mode="horizontal"
          defaultSelectedKeys={[`${location.pathname}`]}
          items={menuList}
          onClick={onMenuClick}
        />
      )}
    </Header>
  );
}

export default HomeHeader;
