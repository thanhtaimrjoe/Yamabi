import React from "react";
import {
  Layout,
  Form,
  Input,
  Row,
  Col,
  Button,
  Checkbox,
  Typography,
} from "antd";
import BackgroundImage from "../../assets/backgroundImg.jpg";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Content } = Layout;
const { Title } = Typography;

function SignInPage(props) {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Content>
      <Row
        justify="center"
        align="middle"
        style={{ height: "100vh", backgroundImage: `url(${BackgroundImage})` }}
      >
        <Col
          span={7}
          style={{ padding: "20px 40px 20px 40px", backgroundColor: "white" }}
        >
          <Title level={2} style={{ textAlign: "center" }}>
            YAMABI
          </Title>
          <Form
            name="normal_login"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input
                size="large"
                prefix={<UserOutlined />}
                placeholder="Username"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password
                size="large"
                prefix={<LockOutlined />}
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Link to="/#" style={{ float: "right" }}>
                Forgot password
              </Link>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%" }}
              >
                Sign In
              </Button>
            </Form.Item>
          </Form>
          <Title level={5} style={{ textAlign: "center" }}>
            Don't have account?{" "}
            <Link to={"/sign-up"}>Create a new account</Link>
          </Title>
        </Col>
      </Row>
    </Content>
  );
}

export default SignInPage;
