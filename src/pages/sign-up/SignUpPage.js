import React from "react";
import {
  Layout,
  Form,
  Input,
  Row,
  Col,
  Button,
  Typography,
  DatePicker,
  Radio,
} from "antd";
import { Link } from "react-router-dom";
import BackgroundImage from "../../assets/backgroundImg.jpg";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";

function SignUpPage(props) {
  const { Content } = Layout;
  const { Title } = Typography;

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
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input
                size="large"
                prefix={<MailOutlined />}
                placeholder="Email"
              />
            </Form.Item>
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

            <Form.Item
              name="confirmPassword"
              validateStatus="error"
              help="Password doesn't match!"
            >
              <Input.Password
                size="large"
                prefix={<LockOutlined />}
                placeholder="Confirm Password"
              />
            </Form.Item>

            <Form.Item
              name="birthday"
              rules={[
                { required: true, message: "Please choose your birthday!" },
              ]}
            >
              <DatePicker size="large" placeholder="Select birthday" />
            </Form.Item>

            <Form.Item name="radio-group">
              <Radio.Group>
                <Radio value="a">Male</Radio>
                <Radio value="b">Female</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                size="large"
                htmlType="submit"
                style={{ width: "100%" }}
              >
                Create new account
              </Button>
            </Form.Item>
          </Form>
          <Title level={5} style={{ textAlign: "center" }}>
            Already have an account? <Link to={"/"}>Sign In</Link>
          </Title>
        </Col>
      </Row>
    </Content>
  );
}

export default SignUpPage;
