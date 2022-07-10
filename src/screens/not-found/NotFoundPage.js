import { Button, Layout, Result } from "antd";
import React from "react";

import { Content } from "antd/lib/layout/layout";
import { useNavigate } from "react-router-dom";

function NotFoundPage(props) {
  //router
  const navigate = useNavigate();

  //navigate to home page
  const onBackHome = () => {
    navigate("/");
  };

  return (
    <Layout>
      {/* <MenuBar /> */}
      <Content style={{ height: "93vh" }}>
        <Result
          status="404"
          title="404"
          subTitle="Sorry, the page you visited does not exist."
          extra={
            <Button type="primary" onClick={onBackHome}>
              Back Home
            </Button>
          }
        />
      </Content>
    </Layout>
  );
}

export default NotFoundPage;
