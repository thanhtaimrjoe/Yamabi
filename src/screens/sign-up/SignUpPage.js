import React, { useState } from "react";
import { Link } from "react-router-dom";
//style
import "../../styles/SignUp.css";
//ant design
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
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";

const { Content } = Layout;
const { Title } = Typography;

function SignUpPage(props) {
  //state
  const [gender, setGender] = useState("male");

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Content>
      <Row justify="center" align="middle" className="sign-up-background">
        <Col span={7} className="sign-up-form">
          <Title level={2} className="sign-up-form-title">
            YAMABI
          </Title>
          <Form
            name="normal_login"
            initialValues={{ remember: true, gender: "male" }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              name="email"
              rules={[
                { type: "email", message: "Please input valid email" },
                { required: true, message: "Please input your email!" },
              ]}
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

            <Form.Item name="gender">
              <Radio.Group>
                <Radio value="male">Male</Radio>
                <Radio value="female">Female</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                size="large"
                htmlType="submit"
                className="sign-up-form-button"
              >
                Create new account
              </Button>
            </Form.Item>
          </Form>
          <Title level={5} className="sign-up-form-sign-in">
            Already have an account? <Link to={"/"}>Sign In</Link>
          </Title>
        </Col>
      </Row>
    </Content>
  );
}

export default SignUpPage;
